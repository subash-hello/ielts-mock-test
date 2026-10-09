---
title: Master IELTS AI Backend
emoji: 🎓
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
pinned: false
---

# Master IELTS AI — Backend & Telemetry Server

High-performance FastAPI production backend for the **Master IELTS Mock Test Platform & Computer Lab System**.

## 🌟 Key Features

- **60 Official Cambridge Tests**: Complete Reading, Listening, and Writing sections preloaded from Books 16, 18, 19, 20, and 21.
- **Kiosk Workstation Telemetry**: Real-time heartbeat tracking, candidate pairing, active section monitoring, and automatic offline detection.
- **Master Lab Control**: Synchronized multi-PC mock exam broadcasts, live command dispatch (`START_TEST`, `PAUSE_EXAM`, `RESUME_EXAM`, `EXTEND_TIME`, `FORCE_SUBMIT`).
- **Real-Time SSE Stream**: Server-Sent Events (`/api/consultancies/{cid}/stream`) for zero-latency browser push notifications.
- **Official IELTS 9-Band Scoring**: Raw-to-band conversion tables for Academic & General Training Reading and Listening.
- **AI Writing Examiner**: Band 1.0-9.0 evaluation with 4-criterion breakdown (Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range) and vocabulary upgrade suggestions.
- **TRF Generation & Export**: Candidate Official TRF records with CSV spreadsheet export.

---

## 🚀 API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Operational dashboard |
| `GET` | `/docs` | Interactive Swagger API documentation |
| `GET` | `/api/health` | Service health status & database counts |
| `GET` | `/api/tests` | List Cambridge mock tests |
| `GET` | `/api/tests/{test_id}` | Complete test content, passages, & questions |
| `POST` | `/api/tests/calculate-band` | Raw-to-band score calculator |
| `POST` | `/api/tests/evaluate-answers` | Evaluates candidate answers against answer keys |
| `GET` | `/api/consultancies` | List branches |
| `POST` | `/api/consultancies` | Register / update branch |
| `POST` | `/api/consultancies/{cid}/verify` | Verify candidate PIN or director password |
| `GET` | `/api/consultancies/{cid}/stations` | List live workstation telemetry |
| `POST` | `/api/consultancies/{cid}/stations/heartbeat` | Ingest station heartbeat |
| `POST` | `/api/consultancies/{cid}/launch` | Launch exam session across all lab PCs |
| `GET` | `/api/consultancies/{cid}/active-launch` | Fetch current active lab exam session |
| `POST` | `/api/consultancies/{cid}/command` | Dispatch live command to lab PCs |
| `GET` | `/api/consultancies/{cid}/stream` | Server-Sent Events (SSE) live push channel |
| `POST` | `/api/results` | Submit student test & generate TRF |
| `GET` | `/api/results/consultancy/{cid}` | View branch candidate results |
| `GET` | `/api/results/consultancy/{cid}/export.csv` | Download results CSV spreadsheet |
| `POST` | `/api/ai/grade-writing` | AI IELTS Writing evaluation & feedback |

---

## 🔒 Optional Environment Variables / Secrets

In your Hugging Face Space settings (**Settings > Variables and secrets**):

| Secret Name | Type | Description |
|---|---|---|
| `GEMINI_API_KEY` | Secret | (Optional) Enables Google Gemini 1.5 Flash for LLM essay grading. If omitted, the built-in IELTS heuristic evaluator handles scoring. |

---

## 💻 Running Locally

```bash
cd backend
pip install -r requirements.txt
python main.py
```
Backend will start at: `http://localhost:7860`
Interactive documentation: `http://localhost:7860/docs`
