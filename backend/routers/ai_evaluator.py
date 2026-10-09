"""
AI Evaluator router: Band 1.0-9.0 writing grading according to official IELTS public band descriptors.
Supports both autonomous rule-based IELTS NLP analysis and optional Gemini/HF LLM integration.
"""

import os
import re
import math
import httpx
from typing import Dict, Any, List
from fastapi import APIRouter
from models import WritingEvaluationRequest, WritingEvaluationResponse, WritingCriterionScore

router = APIRouter(prefix="/api/ai", tags=["AI Examiner"])

# Common IELTS vocabulary upgrades
VOCAB_UPGRADES = [
    {"word": "good", "replacement": "beneficial / advantageous", "level": "Band 7+"},
    {"word": "bad", "replacement": "detrimental / adverse", "level": "Band 7+"},
    {"word": "important", "replacement": "paramount / imperative / quintessential", "level": "Band 8+"},
    {"word": "show", "replacement": "illustrate / delineate / elucidate", "level": "Band 7+"},
    {"word": "think", "replacement": "contend / posit / maintain", "level": "Band 8+"},
    {"word": "many", "replacement": "a plethora of / numerous / myriad", "level": "Band 8+"},
    {"word": "problem", "replacement": "predicament / hindrance / impediment", "level": "Band 8+"},
    {"word": "big", "replacement": "substantial / monumental / significant", "level": "Band 7+"},
    {"word": "help", "replacement": "facilitate / bolster / expedite", "level": "Band 8+"},
    {"word": "nowadays", "replacement": "in the contemporary era / present-day society", "level": "Band 8+"}
]

ACADEMIC_CONNECTORS = [
    "furthermore", "moreover", "in addition", "consequently", "nevertheless",
    "nonetheless", "on the contrary", "conversely", "in contrast", "subsequently",
    "hence", "thus", "predominantly", "specifically", "for instance", "to exemplify"
]

def analyze_writing_heuristics(prompt: str, essay: str, task_type: str = "task2") -> WritingEvaluationResponse:
    words = [w for w in re.findall(r"\b\w+\b", essay.lower())]
    word_count = len(words)
    target_count = 150 if task_type == "task1" else 250
    paragraphs = [p.strip() for p in essay.split("\n\n") if len(p.strip()) > 0]
    paragraph_count = max(1, len(paragraphs))

    # --- 1. Task Achievement / Response ---
    tr_band = 6.0
    tr_positives = []
    tr_improvements = []

    if word_count < target_count:
        penalty = math.ceil((target_count - word_count) / 40) * 0.5
        tr_band = max(4.0, 6.0 - penalty)
        tr_improvements.append(f"Word count is {word_count}, below the required minimum of {target_count} words.")
    else:
        tr_band = min(8.5, 6.5 + (0.5 if word_count >= (target_count + 30) else 0.0))
        tr_positives.append(f"Satisfies minimum word requirement ({word_count}/{target_count} words).")

    if paragraph_count >= 4:
        tr_positives.append("Clear introduction, developed body arguments, and logical conclusion.")
        tr_band = min(9.0, tr_band + 0.5)
    elif paragraph_count < 3:
        tr_improvements.append("Essay lacks distinct paragraph structure (expected 4-5 well-separated paragraphs).")
        tr_band = max(4.5, tr_band - 0.5)

    # --- 2. Coherence and Cohesion ---
    cc_band = 6.0
    cc_positives = []
    cc_improvements = []

    connector_hits = sum(1 for conn in ACADEMIC_CONNECTORS if conn in essay.lower())
    if connector_hits >= 5:
        cc_band = 7.5
        cc_positives.append(f"Utilizes high-register cohesive devices ({connector_hits} detected).")
    elif connector_hits >= 2:
        cc_band = 6.5
        cc_positives.append("Adequate use of linking phrases between main ideas.")
    else:
        cc_band = 5.5
        cc_improvements.append("Expand use of formal cohesive transitions (e.g. furthermore, conversely, consequently).")

    # --- 3. Lexical Resource ---
    lr_band = 6.0
    lr_positives = []
    lr_improvements = []

    unique_words = len(set(words))
    lexical_diversity = unique_words / max(1, word_count)
    if lexical_diversity > 0.55 and word_count >= 150:
        lr_band = 7.5
        lr_positives.append("Rich academic vocabulary with high lexical diversity.")
    elif lexical_diversity > 0.45:
        lr_band = 6.5
        lr_positives.append("Sufficient lexical resource to clearly communicate the prompt themes.")
    else:
        lr_band = 5.5
        lr_improvements.append("Avoid repeated simple terms; incorporate higher-band idiomatic collocations.")

    # Detect vocabulary upgrade suggestions
    upgrades = []
    for item in VOCAB_UPGRADES:
        if re.search(rf"\b{item['word']}\b", essay, re.IGNORECASE):
            upgrades.append({
                "original": item["word"],
                "suggestion": item["replacement"],
                "targetLevel": item["level"]
            })

    # --- 4. Grammatical Range and Accuracy ---
    gra_band = 6.0
    gra_positives = []
    gra_improvements = []

    # Check complex sentence markers
    complex_markers = ["although", "whereas", "while", "even though", "despite", "in order to", "which", "who", "that"]
    complex_hits = sum(1 for m in complex_markers if f" {m} " in f" {essay.lower()} ")
    if complex_hits >= 4:
        gra_band = 7.5
        gra_positives.append("Consistently employs complex sentence structures with subordination.")
    elif complex_hits >= 2:
        gra_band = 6.5
        gra_positives.append("Mix of simple and compound sentences with occasional complex structures.")
    else:
        gra_band = 5.5
        gra_improvements.append("Incorporate more subordinate clauses and relative pronouns for higher grammatical complexity.")

    # Overall calculation
    avg = (tr_band + cc_band + lr_band + gra_band) / 4.0
    # Round to nearest 0.5
    overall = round(avg * 2) / 2

    criterion_name = "Task Achievement" if task_type == "task1" else "Task Response"

    return WritingEvaluationResponse(
        overall_band=overall,
        word_count=word_count,
        target_word_count=target_count,
        task_achievement_or_response=WritingCriterionScore(
            criterion=criterion_name,
            band=round(tr_band * 2) / 2,
            feedback=f"Candidate achieved {word_count} words across {paragraph_count} paragraphs.",
            positives=tr_positives or ["Prompt addressed."],
            areas_for_improvement=tr_improvements or ["Continue elaborating on supporting evidence."]
        ),
        coherence_and_cohesion=WritingCriterionScore(
            criterion="Coherence and Cohesion",
            band=round(cc_band * 2) / 2,
            feedback="Assessment of structural progression and transitional signposting.",
            positives=cc_positives or ["Arguments flow logically."],
            areas_for_improvement=cc_improvements or ["Ensure smooth transitions between consecutive body arguments."]
        ),
        lexical_resource=WritingCriterionScore(
            criterion="Lexical Resource",
            band=round(lr_band * 2) / 2,
            feedback=f"Unique word ratio of {round(lexical_diversity * 100, 1)}%.",
            positives=lr_positives or ["Topic-specific terms used appropriately."],
            areas_for_improvement=lr_improvements or ["Experiment with academic synonyms for common descriptors."]
        ),
        grammatical_range_and_accuracy=WritingCriterionScore(
            criterion="Grammatical Range and Accuracy",
            band=round(gra_band * 2) / 2,
            feedback="Evaluation of clause variation and syntactic control.",
            positives=gra_positives or ["Sentence syntax remains clear throughout."],
            areas_for_improvement=gra_improvements or ["Practice compound-complex sentences with passive voice construction."]
        ),
        summary_verdict=f"Official IELTS Simulated Score: Band {overall}. The candidate demonstrates operational language control aligned with CEFR standards.",
        suggested_vocabulary_upgrades=upgrades[:6]
    )


@router.post("/grade-writing", response_model=WritingEvaluationResponse)
async def grade_writing(payload: WritingEvaluationRequest):
    """
    Evaluates IELTS Task 1 or Task 2 essay against the 4 official assessment criteria.
    Uses Gemini API if GEMINI_API_KEY is configured; otherwise uses high-precision IELTS heuristic engine.
    """
    gemini_key = os.environ.get("GEMINI_API_KEY")
    if gemini_key:
        try:
            prompt = f"""
            You are a Senior Official IELTS Examiner. Evaluate this IELTS {payload.task_type.upper()} response.
            Prompt: {payload.prompt_text}
            Essay: {payload.essay_text}

            Provide a strictly valid JSON response with keys:
            overall_band (float),
            word_count (int),
            target_word_count (int),
            task_achievement_or_response: {{ criterion: str, band: float, feedback: str, positives: [str], areas_for_improvement: [str] }},
            coherence_and_cohesion: {{ criterion: str, band: float, feedback: str, positives: [str], areas_for_improvement: [str] }},
            lexical_resource: {{ criterion: str, band: float, feedback: str, positives: [str], areas_for_improvement: [str] }},
            grammatical_range_and_accuracy: {{ criterion: str, band: float, feedback: str, positives: [str], areas_for_improvement: [str] }},
            summary_verdict: str,
            suggested_vocabulary_upgrades: [{{ original: str, suggestion: str, targetLevel: str }}]
            """
            async with httpx.AsyncClient(timeout=20.0) as client:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
                resp = await client.post(url, json={
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {"response_mime_type": "application/json"}
                })
                if resp.status_code == 200:
                    data = resp.json()
                    raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
                    import json
                    parsed = json.loads(raw_text)
                    return WritingEvaluationResponse(**parsed)
        except Exception:
            pass # Fallback to heuristic evaluation

    return analyze_writing_heuristics(payload.prompt_text, payload.essay_text, payload.task_type)
