"""
Lab Control router: Centralized test launch broadcast, live command dispatch, and SSE telemetry stream.
"""

import json
import asyncio
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, HTTPException, Query, Request
from fastapi.responses import StreamingResponse
from database import get_db
from models import LaunchTestRequest, LabCommandRequest

router = APIRouter(prefix="/api/consultancies/{cid}", tags=["Lab Control"])

# In-memory pub-sub subscribers for instant SSE push
SSE_SUBSCRIBERS: Dict[str, List[asyncio.Queue]] = {}

def notify_subscribers(cid: str, event_type: str, data: Any):
    """Push real-time event to all active SSE listener queues for this branch."""
    if cid in SSE_SUBSCRIBERS:
        payload = json.dumps({"type": event_type, "data": data, "timestamp": datetime.now(timezone.utc).isoformat()})
        dead_queues = []
        for q in SSE_SUBSCRIBERS[cid]:
            try:
                q.put_nowait(payload)
            except asyncio.QueueFull:
                dead_queues.append(q)
        for dq in dead_queues:
            if dq in SSE_SUBSCRIBERS[cid]:
                SSE_SUBSCRIBERS[cid].remove(dq)


@router.post("/launch")
def launch_test(cid: str, req: LaunchTestRequest):
    """
    Director launches a synchronized mock exam for the entire lab.
    Sets the authoritative active launch session and broadcasts to all workstations.
    """
    conn = get_db()
    cursor = conn.cursor()

    now_iso = datetime.now(timezone.utc).isoformat()

    cursor.execute("""
    INSERT INTO active_launches (
        consultancy_id, test_id, module, title, duration_minutes, exam_password, started_at, is_active, force_sync
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1)
    ON CONFLICT(consultancy_id) DO UPDATE SET
        test_id=excluded.test_id,
        module=excluded.module,
        title=excluded.title,
        duration_minutes=excluded.duration_minutes,
        exam_password=excluded.exam_password,
        started_at=excluded.started_at,
        is_active=1,
        force_sync=1
    """, (
        cid,
        req.test_id,
        req.module,
        req.title,
        req.duration_minutes,
        req.exam_password or "1234",
        now_iso
    ))

    conn.commit()
    conn.close()

    broadcast_data = {
        "testId": req.test_id,
        "module": req.module,
        "title": req.title,
        "durationMinutes": req.duration_minutes,
        "examPassword": req.exam_password,
        "startedAt": now_iso
    }
    notify_subscribers(cid, "TEST_LAUNCHED", broadcast_data)

    return {"status": "success", "message": f"Test '{req.title}' launched across all workstations.", "launch": broadcast_data}


@router.get("/active-launch")
def get_active_launch(cid: str):
    """Retrieve currently active test broadcast for workstations to sync."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM active_launches WHERE consultancy_id = ? AND is_active = 1
    """, (cid,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return {"isActive": False, "launch": None}

    return {
        "isActive": True,
        "launch": {
            "testId": row["test_id"],
            "module": row["module"],
            "title": row["title"],
            "durationMinutes": row["duration_minutes"],
            "examPassword": row["exam_password"],
            "startedAt": row["started_at"]
        }
    }


@router.post("/stop-launch")
def stop_active_launch(cid: str):
    """Director ends or cancels the current active mock exam session."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE active_launches SET is_active = 0 WHERE consultancy_id = ?", (cid,))
    conn.commit()
    conn.close()

    notify_subscribers(cid, "LAUNCH_STOPPED", {"consultancyId": cid})
    return {"status": "success", "message": "Active test session ended."}


@router.post("/command")
def dispatch_command(cid: str, cmd: LabCommandRequest):
    """
    Director dispatches live control command (e.g. PAUSE_EXAM, RESUME_EXAM, EXTEND_TIME, FORCE_SUBMIT).
    """
    conn = get_db()
    cursor = conn.cursor()

    now_iso = datetime.now(timezone.utc).isoformat()
    payload_str = json.dumps(cmd.payload or {})

    cursor.execute("""
    INSERT INTO lab_commands (consultancy_id, command_type, target_station, payload_json, created_at, is_consumed)
    VALUES (?, ?, ?, ?, ?, 0)
    """, (cid, cmd.command_type, cmd.target_station or "ALL", payload_str, now_iso))

    conn.commit()
    conn.close()

    command_event = {
        "command": cmd.command_type,
        "targetStation": cmd.target_station,
        "payload": cmd.payload or {},
        "timestamp": now_iso
    }
    notify_subscribers(cid, "COMMAND_DISPATCHED", command_event)

    return {"status": "success", "message": f"Command {cmd.command_type} dispatched.", "command": command_event}


@router.get("/pending-commands")
def get_pending_commands(
    cid: str,
    station_id: str = Query(..., description="Workstation ID checking for pending instructions"),
    mark_consumed: bool = Query(True, description="Mark retrieved commands as consumed")
):
    """Workstations poll this endpoint to consume pending commands."""
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT id, command_type, target_station, payload_json, created_at
    FROM lab_commands
    WHERE consultancy_id = ? AND is_consumed = 0 AND (target_station = 'ALL' OR target_station = ?)
    ORDER BY id ASC
    """, (cid, station_id))
    rows = cursor.fetchall()

    commands = []
    ids_to_consume = []
    for r in rows:
        ids_to_consume.append(r["id"])
        commands.append({
            "id": r["id"],
            "command": r["command_type"],
            "targetStation": r["target_station"],
            "payload": json.loads(r["payload_json"]) if r["payload_json"] else {},
            "createdAt": r["created_at"]
        })

    if mark_consumed and ids_to_consume:
        cursor.execute(f"""
        UPDATE lab_commands SET is_consumed = 1 WHERE id IN ({','.join(['?']*len(ids_to_consume))})
        """, ids_to_consume)
        conn.commit()

    conn.close()
    return {"commands": commands}


@router.get("/stream")
async def event_stream(cid: str, request: Request):
    """
    Server-Sent Events (SSE) live push channel.
    Connect here from the browser to receive instant zero-latency test launches and commands.
    """
    queue: asyncio.Queue = asyncio.Queue(maxsize=50)

    if cid not in SSE_SUBSCRIBERS:
        SSE_SUBSCRIBERS[cid] = []
    SSE_SUBSCRIBERS[cid].append(queue)

    async def event_generator():
        try:
            # Send initial connection confirmation
            yield f"event: connected\ndata: {json.dumps({'status': 'connected', 'consultancyId': cid})}\n\n"
            while True:
                # Check for client disconnect
                if await request.is_disconnected():
                    break
                try:
                    # Wait for message with keep-alive heartbeat every 15s
                    data = await asyncio.wait_for(queue.get(), timeout=15.0)
                    yield f"event: update\ndata: {data}\n\n"
                except asyncio.TimeoutError:
                    # Send comment to keep connection alive
                    yield ": ping\n\n"
        finally:
            if cid in SSE_SUBSCRIBERS and queue in SSE_SUBSCRIBERS[cid]:
                SSE_SUBSCRIBERS[cid].remove(queue)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )
