"""
Tests router: IELTS test catalog, questions, band calculator, and answer evaluation.
"""

import json
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Query, Body
from database import get_db
from models import TestSummary, BandCalculationRequest, BandCalculationResponse

router = APIRouter(prefix="/api/tests", tags=["Tests"])

def calculate_ielts_band(raw: int, module: str, test_type: str = "academic") -> float:
    raw = max(0, min(40, raw))
    mod = module.lower()
    
    if "listen" in mod:
        if raw >= 39: return 9.0
        if raw >= 37: return 8.5
        if raw >= 35: return 8.0
        if raw >= 32: return 7.5
        if raw >= 30: return 7.0
        if raw >= 26: return 6.5
        if raw >= 23: return 6.0
        if raw >= 18: return 5.5
        if raw >= 16: return 5.0
        if raw >= 13: return 4.5
        if raw >= 10: return 4.0
        if raw >= 6: return 3.5
        if raw >= 4: return 3.0
        if raw >= 2: return 2.5
        if raw >= 1: return 2.0
        return 1.0

    # Reading Academic
    if test_type.lower() == "academic" or "acad" in test_type.lower():
        if raw >= 39: return 9.0
        if raw >= 37: return 8.5
        if raw >= 35: return 8.0
        if raw >= 33: return 7.5
        if raw >= 30: return 7.0
        if raw >= 27: return 6.5
        if raw >= 23: return 6.0
        if raw >= 19: return 5.5
        if raw >= 15: return 5.0
        if raw >= 13: return 4.5
        if raw >= 10: return 4.0
        if raw >= 8: return 3.5
        if raw >= 6: return 3.0
        if raw >= 4: return 2.5
        if raw >= 2: return 2.0
        return 1.0
    else:
        # General Training Reading
        if raw >= 40: return 9.0
        if raw >= 39: return 8.5
        if raw >= 37: return 8.0
        if raw >= 36: return 7.5
        if raw >= 34: return 7.0
        if raw >= 32: return 6.5
        if raw >= 30: return 6.0
        if raw >= 27: return 5.5
        if raw >= 23: return 5.0
        if raw >= 19: return 4.5
        if raw >= 15: return 4.0
        if raw >= 12: return 3.5
        if raw >= 9: return 3.0
        if raw >= 6: return 2.5
        if raw >= 3: return 2.0
        return 1.0


@router.get("", response_model=List[TestSummary])
def get_all_tests(
    book: Optional[int] = Query(None, description="Filter by Cambridge book number e.g. 16, 18, 19"),
    module: Optional[str] = Query(None, description="Filter by module e.g. reading, listening, writing"),
    search: Optional[str] = Query(None, description="Search by test title")
):
    """Retrieve catalog of IELTS tests with optional filters."""
    conn = get_db()
    cursor = conn.cursor()

    query = "SELECT id, book, test_number, module, title, duration_minutes, audio_url, raw_json FROM tests WHERE 1=1"
    params = []

    if book is not None:
        query += " AND book = ?"
        params.append(book)
    if module is not None:
        query += " AND LOWER(module) = ?"
        params.append(module.lower())
    if search:
        query += " AND LOWER(title) LIKE ?"
        params.append(f"%{search.lower()}%")

    query += " ORDER BY book DESC, test_number ASC, module ASC"
    cursor.execute(query, params)
    rows = cursor.fetchall()

    results = []
    for r in rows:
        q_count = 0
        try:
            raw = json.loads(r["raw_json"])
            sections = raw.get("sections", [])
            for sec in sections:
                q_count += len(sec.get("questions", []))
        except Exception:
            pass

        results.append(TestSummary(
            id=r["id"],
            book=r["book"],
            testNumber=r["test_number"],
            module=r["module"],
            title=r["title"],
            durationMinutes=r["duration_minutes"],
            audioUrl=r["audio_url"],
            questionCount=q_count
        ))

    conn.close()
    return results


@router.get("/{test_id}")
def get_test_by_id(test_id: str):
    """Get complete test data including passages, questions, and options."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT raw_json FROM tests WHERE id = ?", (test_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail=f"Test '{test_id}' not found.")

    return json.loads(row["raw_json"])


@router.post("/calculate-band", response_model=BandCalculationResponse)
def calculate_band(req: BandCalculationRequest):
    """Calculate IELTS 9-band score from raw correct question count."""
    band = calculate_ielts_band(req.raw_score, req.module, req.test_type)
    
    desc_map = {
        9.0: "Expert User - Fluent with complete understanding",
        8.5: "Very Good User - Operational command with occasional inaccuracies",
        8.0: "Very Good User - Fully operational command with rare unsystematic errors",
        7.5: "Good User - Operational command with occasional inaccuracies",
        7.0: "Good User - Effective operational command with occasional inaccuracies",
        6.5: "Competent User - Effective command with some inaccuracies",
        6.0: "Competent User - Generally effective command despite some inaccuracies",
        5.5: "Modest User - Partial command, copes with overall meaning in most situations",
        5.0: "Modest User - Partial command, likely to make mistakes",
        4.5: "Limited User - Basic competence is limited to familiar situations",
        4.0: "Limited User - Basic competence limited to familiar situations with frequent errors",
        3.5: "Extremely Limited User - Conveys and understands only general meaning",
        3.0: "Extremely Limited User - Understands only general meaning in very familiar situations",
        2.5: "Intermittent User - Great difficulty understanding spoken and written English",
        2.0: "Intermittent User - No real communication possible except for isolated words",
        1.0: "Non User - Essentially has no ability to use the language"
    }

    return BandCalculationResponse(
        module=req.module,
        test_type=req.test_type,
        raw_score=req.raw_score,
        band_score=band,
        description=desc_map.get(band, "Assessed Band Score")
    )


@router.post("/evaluate-answers")
def evaluate_answers(
    test_id: str = Body(..., embed=True),
    answers: Dict[str, Any] = Body(..., embed=True)
):
    """
    Evaluates candidate answers against official answer keys in the test.
    Returns raw score, percentage, band score, and detailed per-question breakdown.
    """
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT raw_json, module FROM tests WHERE id = ?", (test_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail=f"Test '{test_id}' not found.")

    test_data = json.loads(row["raw_json"])
    module = row["module"]
    
    correct_count = 0
    total_questions = 0
    breakdown = []

    for section in test_data.get("sections", []):
        for question in section.get("questions", []):
            qid = question.get("id")
            official_answer = str(question.get("correctAnswer", "")).strip().lower()
            student_answer = str(answers.get(qid, "")).strip().lower()
            total_questions += 1

            is_correct = False
            # Check direct match or multiple acceptable variations (e.g. "A / B" or "centre;center")
            if official_answer:
                acceptable = [a.strip() for a in official_answer.replace(";", "/").split("/")]
                if student_answer in acceptable:
                    is_correct = True
            
            if is_correct:
                correct_count += 1

            breakdown.append({
                "questionId": qid,
                "questionNumber": question.get("questionNumber"),
                "studentAnswer": answers.get(qid, ""),
                "correctAnswer": question.get("correctAnswer"),
                "isCorrect": is_correct
            })

    band_score = calculate_ielts_band(correct_count, module)

    return {
        "testId": test_id,
        "module": module,
        "rawScore": correct_count,
        "totalQuestions": total_questions,
        "percentage": round((correct_count / max(1, total_questions)) * 100, 1),
        "bandScore": band_score,
        "breakdown": breakdown
    }
