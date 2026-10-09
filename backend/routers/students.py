"""
Students router: Manage registered students per consultancy branch.
"""

from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Query, Path
from pydantic import BaseModel
from database import get_db

router = APIRouter(prefix="/api/consultancies/{cid}/students", tags=["Students"])

class StudentCreate(BaseModel):
    id: Optional[str] = None
    candidate_number: Optional[str] = None
    full_name: str
    email: Optional[str] = ""
    phone: Optional[str] = ""
    target_band: Optional[float] = 0.0
    enrolled_date: Optional[str] = None
    tests_completed_count: Optional[int] = 0
    highest_band: Optional[float] = 0.0
    average_band: Optional[float] = 0.0
    latest_result_id: Optional[str] = None
    assigned_test_id: Optional[str] = None
    assigned_test_title: Optional[str] = None

def student_row_to_dict(row) -> dict:
    d = dict(row)
    return {
        "id": d["id"],
        "consultancyId": d.get("consultancy_id", ""),
        "candidateNumber": d.get("candidate_number") or d["id"],
        "fullName": d.get("full_name", ""),
        "email": d.get("email", ""),
        "phone": d.get("phone", ""),
        "targetBand": d.get("target_band", 0.0),
        "enrolledDate": d.get("enrolled_date", ""),
        "testsCompletedCount": d.get("tests_completed_count", 0),
        "highestBand": d.get("highest_band", 0.0),
        "averageBand": d.get("average_band", 0.0),
        "latestResultId": d.get("latest_result_id"),
        "assignedTestId": d.get("assigned_test_id"),
        "assignedTestTitle": d.get("assigned_test_title"),
        "updatedAt": d.get("updated_at", "")
    }

@router.get("")
def list_students(cid: str, search: Optional[str] = Query(None)):
    """List students enrolled in this consultancy branch."""
    conn = get_db()
    cursor = conn.cursor()

    query = "SELECT * FROM students WHERE consultancy_id = ?"
    params = [cid]

    if search:
        query += " AND (LOWER(full_name) LIKE ? OR LOWER(candidate_number) LIKE ? OR LOWER(email) LIKE ?)"
        term = f"%{search.lower()}%"
        params.extend([term, term, term])

    query += " ORDER BY full_name ASC"
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    return [student_row_to_dict(r) for r in rows]

@router.post("")
def save_student(cid: str, s: StudentCreate):
    """Enroll or update a student."""
    conn = get_db()
    cursor = conn.cursor()

    now_iso = datetime.now(timezone.utc).isoformat()
    sid = s.id or f"cand-{int(datetime.now().timestamp())}"
    cand_num = s.candidate_number or sid
    enrolled = s.enrolled_date or datetime.now().strftime("%Y-%m-%d")

    cursor.execute("""
    INSERT INTO students (
        id, consultancy_id, candidate_number, full_name, email, phone,
        target_band, enrolled_date, tests_completed_count, highest_band,
        average_band, latest_result_id, assigned_test_id, assigned_test_title, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        full_name=excluded.full_name,
        email=excluded.email,
        phone=excluded.phone,
        target_band=excluded.target_band,
        tests_completed_count=excluded.tests_completed_count,
        highest_band=excluded.highest_band,
        average_band=excluded.average_band,
        latest_result_id=excluded.latest_result_id,
        assigned_test_id=excluded.assigned_test_id,
        assigned_test_title=excluded.assigned_test_title,
        updated_at=excluded.updated_at
    """, (
        sid, cid, cand_num, s.full_name, s.email or "", s.phone or "",
        s.target_band or 0.0, enrolled, s.tests_completed_count or 0,
        s.highest_band or 0.0, s.average_band or 0.0, s.latest_result_id,
        s.assigned_test_id, s.assigned_test_title, now_iso
    ))

    conn.commit()
    conn.close()

    return {"status": "success", "id": sid, "candidateNumber": cand_num}

@router.delete("/{student_id}")
def delete_student(cid: str, student_id: str):
    """Delete student from branch records."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM students WHERE consultancy_id = ? AND (id = ? OR candidate_number = ?)", (cid, student_id, student_id))
    conn.commit()
    conn.close()
    return {"status": "success", "message": f"Student {student_id} removed."}
