"""
Consultancies router: Consultancy branches, verification, credit tracking, and configuration.
"""

import json
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends
from database import get_db
from models import ConsultancyCreate, VerifyRequest

router = APIRouter(prefix="/api/consultancies", tags=["Consultancies"])

def row_to_dict(row) -> dict:
    d = dict(row)
    if "assigned_test_ids" in d and d["assigned_test_ids"]:
        try:
            d["assignedTestIds"] = json.loads(d["assigned_test_ids"])
        except Exception:
            d["assignedTestIds"] = []
    else:
        d["assignedTestIds"] = []

    # Map snake_case to camelCase for frontend compatibility
    d["branchCode"] = d.get("branch_code", "")
    d["accessCode"] = d.get("access_code", "")
    d["adminEmail"] = d.get("admin_email", "")
    d["examPassword"] = d.get("exam_password", "")
    d["adminPassword"] = d.get("admin_password", "")
    d["computerLimit"] = d.get("computer_limit", 20)
    d["testCredits"] = d.get("test_credits", 500)
    d["creditsUsed"] = d.get("credits_used", 0)
    d["createdAt"] = d.get("created_at", "")
    d["validUntil"] = d.get("valid_until", "")
    return d


@router.get("")
def list_consultancies():
    """Retrieve all registered consultancies and branches."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM consultancies ORDER BY name ASC")
    rows = cursor.fetchall()
    conn.close()
    return [row_to_dict(r) for r in rows]


@router.get("/{cid_or_code}")
def get_consultancy(cid_or_code: str):
    """Retrieve consultancy by ID or branch access code (case-insensitive)."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM consultancies 
    WHERE id = ? OR UPPER(branch_code) = UPPER(?) OR UPPER(access_code) = UPPER(?)
    """, (cid_or_code, cid_or_code, cid_or_code))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail=f"Consultancy '{cid_or_code}' not found.")

    return row_to_dict(row)


@router.post("")
def save_consultancy(c: ConsultancyCreate):
    """Create or update a consultancy branch."""
    conn = get_db()
    cursor = conn.cursor()

    cid = c.id if c.id else c.branch_code.lower().replace(" ", "-")
    now_iso = datetime.utcnow().isoformat() + "Z"

    cursor.execute("""
    INSERT INTO consultancies (
        id, name, branch, admin_email, phone, branch_code, access_code,
        exam_password, admin_password, status, computer_limit, test_credits,
        credits_used, created_at, valid_until, assigned_test_ids
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?, 0, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        name=excluded.name,
        branch=excluded.branch,
        admin_email=excluded.admin_email,
        phone=excluded.phone,
        branch_code=excluded.branch_code,
        access_code=excluded.access_code,
        exam_password=excluded.exam_password,
        admin_password=excluded.admin_password,
        computer_limit=excluded.computer_limit,
        test_credits=excluded.test_credits,
        assigned_test_ids=excluded.assigned_test_ids
    """, (
        cid,
        c.name,
        c.branch,
        c.admin_email or "",
        c.phone or "",
        c.branch_code,
        c.branch_code,
        c.exam_password,
        c.admin_password,
        c.computer_limit,
        c.test_credits,
        now_iso,
        "",
        json.dumps(c.assigned_test_ids or [])
    ))

    conn.commit()
    conn.close()
    return {"status": "success", "id": cid, "message": "Consultancy saved successfully."}


@router.post("/{cid_or_code}/verify")
def verify_credentials(cid_or_code: str, body: VerifyRequest):
    """Verify administrator password or candidate lab access password."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM consultancies 
    WHERE id = ? OR UPPER(branch_code) = UPPER(?) OR UPPER(access_code) = UPPER(?)
    """, (cid_or_code, cid_or_code, cid_or_code))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Branch not found.")

    data = row_to_dict(row)
    provided_password = body.password.strip()

    if body.role == "admin":
        if provided_password == data.get("adminPassword"):
            return {"authenticated": True, "role": "admin", "consultancy": data}
        raise HTTPException(status_code=401, detail="Invalid Director / Admin password.")
    else:
        # Candidate / Kiosk verify
        if provided_password == data.get("examPassword"):
            return {"authenticated": True, "role": "candidate", "consultancy": data}
        raise HTTPException(status_code=401, detail="Invalid Exam Access PIN.")


@router.post("/{cid}/use-credit")
def use_credit(cid: str):
    """Deduct 1 test credit when a student starts a mock exam."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT test_credits, credits_used FROM consultancies WHERE id = ?", (cid,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Consultancy not found.")

    available = row["test_credits"] - row["credits_used"]
    if available <= 0:
        conn.close()
        raise HTTPException(status_code=403, detail="Test credits exhausted. Please contact administrator.")

    cursor.execute("UPDATE consultancies SET credits_used = credits_used + 1 WHERE id = ?", (cid,))
    conn.commit()
    conn.close()
    return {"status": "success", "remainingCredits": available - 1}


@router.delete("/{cid}")
def delete_consultancy(cid: str):
    """Delete consultancy."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM consultancies WHERE id = ?", (cid,))
    conn.commit()
    conn.close()
    return {"status": "success", "message": f"Consultancy {cid} deleted."}
