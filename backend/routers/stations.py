"""
Stations router: Kiosk workstation pairing, live heartbeats, exam state, and monitoring.
"""

from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Path
from database import get_db
from models import StationHeartbeat, StationRegister

router = APIRouter(prefix="/api/consultancies/{cid}/stations", tags=["Workstations"])

HEARTBEAT_TIMEOUT_SECONDS = 45

def station_row_to_dict(row) -> dict:
    d = dict(row)
    now = datetime.now(timezone.utc)
    
    # Calculate online / offline status
    last_hb_str = d.get("last_heartbeat")
    is_online = False
    if last_hb_str:
        try:
            # Handle ISO string with or without Z
            cleaned_time = last_hb_str.replace("Z", "+00:00")
            dt = datetime.fromisoformat(cleaned_time)
            diff = (now - dt).total_seconds()
            if diff < HEARTBEAT_TIMEOUT_SECONDS:
                is_online = True
        except Exception:
            pass

    status = d.get("status", "idle")
    if not is_online and status != "idle":
        status = "offline"

    return {
        "id": d["id"],
        "consultancyId": d.get("consultancy_id", ""),
        "name": d.get("station_name", d["id"]),
        "ipAddress": d.get("ip_address", "127.0.0.1"),
        "browser": d.get("browser", "Chrome"),
        "os": d.get("os", "Windows"),
        "status": status,
        "isOnline": is_online,
        "currentCandidate": d.get("current_candidate"),
        "candidateNumber": d.get("candidate_number"),
        "currentTestId": d.get("current_test_id"),
        "assignedTestId": d.get("current_test_id"),
        "currentModule": d.get("current_module"),
        "module": d.get("current_module"),
        "answersCount": d.get("answers_count", 0),
        "answeredCount": d.get("answers_count", 0),
        "currentQuestion": max(1, (d.get("answers_count") or 0) + 1),
        "totalQuestions": 40,
        "remainingSeconds": d.get("remaining_seconds", 0),
        "isActive": bool(d.get("is_active", 1)),
        "lastHeartbeat": d.get("last_heartbeat", "")
    }


@router.get("")
def list_stations(cid: str = Path(..., description="Consultancy ID")):
    """Get all registered workstations and live telemetry status for a branch."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM stations WHERE consultancy_id = ? ORDER BY station_name ASC, id ASC
    """, (cid,))
    rows = cursor.fetchall()
    conn.close()

    return [station_row_to_dict(r) for r in rows]


@router.post("/register")
def register_station(cid: str, body: StationRegister):
    """Register or pair a new workstation PC to this consultancy lab."""
    conn = get_db()
    cursor = conn.cursor()

    now_iso = datetime.now(timezone.utc).isoformat()

    cursor.execute("""
    INSERT INTO stations (
        id, consultancy_id, station_name, ip_address, browser, os,
        status, is_active, last_heartbeat, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, 'idle', 1, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        consultancy_id=excluded.consultancy_id,
        station_name=excluded.station_name,
        ip_address=excluded.ip_address,
        browser=excluded.browser,
        os=excluded.os,
        last_heartbeat=excluded.last_heartbeat
    """, (
        body.station_id,
        cid,
        body.station_name,
        body.ip_address or "127.0.0.1",
        body.browser or "Browser",
        body.os or "OS",
        now_iso,
        now_iso
    ))

    conn.commit()
    conn.close()
    return {"status": "success", "stationId": body.station_id, "message": "Station registered."}


@router.post("/heartbeat")
def receive_heartbeat(cid: str, hb: StationHeartbeat):
    """Ingest live heartbeat telemetry from a candidate workstation PC."""
    conn = get_db()
    cursor = conn.cursor()

    now_iso = datetime.now(timezone.utc).isoformat()
    name = hb.station_name or hb.station_id

    cursor.execute("""
    INSERT INTO stations (
        id, consultancy_id, station_name, ip_address, browser, os,
        status, current_candidate, candidate_number, current_test_id,
        current_module, answers_count, remaining_seconds, is_active,
        last_heartbeat, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        consultancy_id=excluded.consultancy_id,
        status=excluded.status,
        current_candidate=excluded.current_candidate,
        candidate_number=excluded.candidate_number,
        current_test_id=excluded.current_test_id,
        current_module=excluded.current_module,
        answers_count=excluded.answers_count,
        remaining_seconds=excluded.remaining_seconds,
        last_heartbeat=excluded.last_heartbeat
    """, (
        hb.station_id,
        cid,
        name,
        hb.ip_address or "127.0.0.1",
        hb.browser or "Browser",
        hb.os or "OS",
        hb.status,
        hb.current_candidate,
        hb.candidate_number,
        hb.current_test_id,
        hb.current_module,
        hb.answers_count,
        hb.remaining_seconds,
        now_iso,
        now_iso
    ))

    conn.commit()
    conn.close()
    return {"status": "ok", "timestamp": now_iso}


@router.post("/{station_id}/reset")
def reset_station(cid: str, station_id: str):
    """Reset a workstation PC back to idle state and clear candidate assignment."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    UPDATE stations SET
        status = 'idle',
        current_candidate = NULL,
        candidate_number = NULL,
        current_test_id = NULL,
        current_module = NULL,
        answers_count = 0,
        remaining_seconds = 0
    WHERE id = ? AND consultancy_id = ?
    """, (station_id, cid))
    conn.commit()
    conn.close()
    return {"status": "success", "message": f"Station {station_id} reset to idle."}


@router.delete("/{station_id}")
def delete_station(cid: str, station_id: str):
    """Remove workstation from the lab inventory."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM stations WHERE id = ? AND consultancy_id = ?", (station_id, cid))
    conn.commit()
    conn.close()
    return {"status": "success", "message": f"Station {station_id} deleted."}
