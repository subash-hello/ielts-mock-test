"""
Results router: Candidate test submissions, scoring persistence, TRF reports, and CSV exports.
"""

import io
import csv
import json
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, Response
from database import get_db
from models import CandidateResultCreate

router = APIRouter(prefix="/api/results", tags=["Results"])

def result_row_to_dict(row) -> dict:
    d = dict(row)
    scores = {}
    if d.get("scores_json"):
        try:
            scores = json.loads(d["scores_json"])
        except Exception:
            pass

    return {
        "id": d["id"],
        "consultancyId": d.get("consultancy_id", ""),
        "consultancyName": scores.get("consultancyName", ""),
        "candidateName": d.get("candidate_name", ""),
        "candidateId": d.get("candidate_number") or d.get("candidate_name", ""),
        "candidateNumber": d.get("candidate_number", ""),
        "testId": d.get("test_id", ""),
        "testTitle": d.get("test_title", ""),
        "module": d.get("module", "reading"),
        "book": scores.get("book", 16),
        "testNumber": scores.get("testNumber", 1),
        "bandScore": d.get("overall_band", 0.0),
        "overallBand": d.get("overall_band", 0.0),
        "totalQuestions": scores.get("totalQuestions", 40),
        "correctCount": scores.get("correctCount", 0),
        "timeTakenSeconds": scores.get("timeTakenSeconds", 0),
        "answers": scores.get("answers", {}),
        "writingSubmission": scores.get("writingSubmission"),
        "scores": scores,
        "trfNumber": d.get("trf_number", ""),
        "completedAt": d.get("submitted_at", ""),
        "submittedAt": d.get("submitted_at", ""),
        "isPublished": True
    }


@router.post("")
def submit_result(result: CandidateResultCreate):
    """Save candidate test submission and generate unique official TRF number."""
    conn = get_db()
    cursor = conn.cursor()

    rid = result.id or str(uuid.uuid4())
    now_iso = datetime.now(timezone.utc).isoformat()
    trf = result.trf_number or f"TRF-{datetime.now().year}-{str(uuid.uuid4())[:8].upper()}"

    cursor.execute("""
    INSERT INTO candidate_results (
        id, consultancy_id, candidate_name, candidate_number, test_id,
        test_title, module, overall_band, scores_json, trf_number, submitted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        overall_band=excluded.overall_band,
        scores_json=excluded.scores_json,
        submitted_at=excluded.submitted_at
    """, (
        rid,
        result.consultancy_id,
        result.candidate_name,
        result.candidate_number or "",
        result.test_id,
        result.test_title,
        result.module,
        result.overall_band,
        json.dumps(result.scores),
        trf,
        now_iso
    ))

    conn.commit()
    conn.close()

    return {
        "status": "success",
        "resultId": rid,
        "trfNumber": trf,
        "overallBand": result.overall_band,
        "message": "Result recorded successfully."
    }


@router.get("/{result_id}")
def get_result(result_id: str):
    """Retrieve full candidate exam performance and TRF."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM candidate_results WHERE id = ? OR trf_number = ?", (result_id, result_id))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Result not found.")

    return result_row_to_dict(row)


@router.get("/consultancy/{cid}")
def get_consultancy_results(
    cid: str,
    module: Optional[str] = Query(None, description="Filter by module"),
    search: Optional[str] = Query(None, description="Search candidate name or number")
):
    """List all candidate results for a consultancy branch."""
    conn = get_db()
    cursor = conn.cursor()

    query = "SELECT * FROM candidate_results WHERE consultancy_id = ?"
    params = [cid]

    if module:
        query += " AND LOWER(module) = ?"
        params.append(module.lower())
    if search:
        query += " AND (LOWER(candidate_name) LIKE ? OR LOWER(candidate_number) LIKE ?)"
        params.append(f"%{search.lower()}%")
        params.append(f"%{search.lower()}%")

    query += " ORDER BY submitted_at DESC"
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    return [result_row_to_dict(r) for r in rows]


@router.get("/consultancy/{cid}/export.csv")
def export_consultancy_results_csv(cid: str):
    """Export all branch results as a downloadable CSV spreadsheet."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT candidate_name, candidate_number, test_title, module, overall_band, trf_number, submitted_at
    FROM candidate_results
    WHERE consultancy_id = ?
    ORDER BY submitted_at DESC
    """, (cid,))
    rows = cursor.fetchall()
    conn.close()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["Candidate Name", "Candidate ID", "Test Title", "Module", "Band Score", "TRF Number", "Date Submitted"])

    for r in rows:
        writer.writerow([
            r["candidate_name"],
            r["candidate_number"],
            r["test_title"],
            r["module"],
            r["overall_band"],
            r["trf_number"],
            r["submitted_at"]
        ])

    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=ielts_results_{cid}.csv"}
    )
