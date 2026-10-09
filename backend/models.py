"""
Pydantic data models and schemas for Master IELTS AI Backend.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# --- Tests ---
class TestSummary(BaseModel):
    id: str
    book: int
    testNumber: int
    module: str
    title: str
    durationMinutes: int
    audioUrl: Optional[str] = None
    questionCount: Optional[int] = 0

class BandCalculationRequest(BaseModel):
    module: str # "reading" or "listening"
    test_type: str = "academic" # "academic" or "general"
    raw_score: int

class BandCalculationResponse(BaseModel):
    module: str
    test_type: str
    raw_score: int
    band_score: float
    description: str

# --- Consultancies ---
class VerifyRequest(BaseModel):
    password: str
    role: str = "candidate" # "candidate" or "admin"

class ConsultancyCreate(BaseModel):
    id: Optional[str] = None
    name: str
    branch: str
    admin_email: Optional[str] = ""
    phone: Optional[str] = ""
    branch_code: str
    exam_password: str = "1234"
    admin_password: str = "admin123"
    computer_limit: int = 20
    test_credits: int = 500
    assigned_test_ids: Optional[List[str]] = []

# --- Stations ---
class StationHeartbeat(BaseModel):
    station_id: str
    station_name: Optional[str] = None
    consultancy_id: str
    status: str = "idle" # "idle", "testing", "paused", "completed"
    current_candidate: Optional[str] = None
    candidate_number: Optional[str] = None
    current_test_id: Optional[str] = None
    current_module: Optional[str] = None
    answers_count: int = 0
    remaining_seconds: int = 0
    ip_address: Optional[str] = None
    browser: Optional[str] = None
    os: Optional[str] = None

class StationRegister(BaseModel):
    station_id: str
    station_name: str
    consultancy_id: str
    ip_address: Optional[str] = None
    browser: Optional[str] = None
    os: Optional[str] = None

# --- Lab Control ---
class LaunchTestRequest(BaseModel):
    consultancy_id: str
    test_id: str
    module: str
    title: str
    duration_minutes: int = 60
    exam_password: Optional[str] = "1234"

class LabCommandRequest(BaseModel):
    consultancy_id: str
    command_type: str # "START_TEST", "PAUSE_EXAM", "RESUME_EXAM", "EXTEND_TIME", "FORCE_SUBMIT", "BROADCAST_MESSAGE"
    target_station: Optional[str] = "ALL" # "ALL" or specific station_id
    payload: Optional[Dict[str, Any]] = None

# --- Candidate Results ---
class CandidateResultCreate(BaseModel):
    id: Optional[str] = None
    consultancy_id: str
    candidate_name: str
    candidate_number: Optional[str] = None
    test_id: str
    test_title: str
    module: str
    overall_band: float
    scores: Dict[str, Any]
    trf_number: Optional[str] = None

# --- AI Evaluation ---
class WritingEvaluationRequest(BaseModel):
    task_type: str = "task2" # "task1" or "task2"
    prompt_text: str
    essay_text: str

class WritingCriterionScore(BaseModel):
    criterion: str
    band: float
    feedback: str
    positives: List[str]
    areas_for_improvement: List[str]

class WritingEvaluationResponse(BaseModel):
    overall_band: float
    word_count: int
    target_word_count: int
    task_achievement_or_response: WritingCriterionScore
    coherence_and_cohesion: WritingCriterionScore
    lexical_resource: WritingCriterionScore
    grammatical_range_and_accuracy: WritingCriterionScore
    summary_verdict: str
    suggested_vocabulary_upgrades: List[Dict[str, str]]
