"""
Master IELTS AI - Production FastAPI Backend.
Deployment target: Hugging Face Spaces (Port 7860) / Docker / Local.
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse

from database import init_db, get_db
from routers import tests, consultancies, stations, lab_control, results, ai_evaluator, students

# Ensure DB initialized on import
try:
    init_db()
except Exception as e:
    print("[WARN] DB init on import:", e)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: ensure SQLite database schema and preloaded tests are seeded
    init_db()
    print("[OK] Master IELTS AI Database ready.")
    yield
    print("[INFO] Shutting down Master IELTS AI Backend...")


app = FastAPI(
    title="Master IELTS AI - Backend Engine",
    description="Official REST & Telemetry API for Computer-Delivered IELTS Lab & Mock Testing Platform.",
    version="2.0.0",
    lifespan=lifespan
)

# CORS configuration: Allow all origins so Vercel frontend, local dev, and kiosks connect seamlessly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(tests.router)
app.include_router(consultancies.router)
app.include_router(stations.router)
app.include_router(lab_control.router)
app.include_router(results.router)
app.include_router(students.router)
app.include_router(ai_evaluator.router)


@app.get("/api/health")
def health_check():
    """System health check and stats."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as count FROM tests")
    tests_count = cursor.fetchone()["count"]
    cursor.execute("SELECT COUNT(*) as count FROM consultancies")
    c_count = cursor.fetchone()["count"]
    cursor.execute("SELECT COUNT(*) as count FROM stations")
    s_count = cursor.fetchone()["count"]
    cursor.execute("SELECT COUNT(*) as count FROM candidate_results")
    r_count = cursor.fetchone()["count"]
    conn.close()

    return {
        "status": "healthy",
        "version": "2.0.0",
        "engine": "FastAPI on Hugging Face Spaces",
        "counts": {
            "tests": tests_count,
            "consultancies": c_count,
            "stations": s_count,
            "results": r_count
        }
    }


@app.get("/", response_class=HTMLResponse)
def index_page():
    """Interactive landing page and operational dashboard."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as count FROM tests")
    test_count = cursor.fetchone()["count"]
    cursor.execute("SELECT COUNT(*) as count FROM consultancies")
    c_count = cursor.fetchone()["count"]
    conn.close()

    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Master IELTS AI - Backend Server</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            body {{
                font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                background: #0f172a;
                color: #f8fafc;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 24px;
            }}
            .card {{
                background: #1e293b;
                border: 1px solid #334155;
                border-radius: 20px;
                padding: 40px;
                max-width: 640px;
                width: 100%;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                text-align: center;
            }}
            .badge {{
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(16, 185, 129, 0.15);
                color: #34d399;
                border: 1px solid rgba(16, 185, 129, 0.3);
                padding: 6px 14px;
                border-radius: 9999px;
                font-size: 13px;
                font-weight: 700;
                margin-bottom: 20px;
            }}
            .pulse {{
                width: 8px;
                height: 8px;
                background: #34d399;
                border-radius: 50%;
                box-shadow: 0 0 10px #34d399;
            }}
            h1 {{
                font-size: 28px;
                font-weight: 800;
                margin-bottom: 12px;
                background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }}
            p {{
                color: #94a3b8;
                font-size: 15px;
                line-height: 1.6;
                margin-bottom: 28px;
            }}
            .stats {{
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
                margin-bottom: 32px;
            }}
            .stat-box {{
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 12px;
                padding: 16px;
            }}
            .stat-number {{
                font-size: 28px;
                font-weight: 800;
                color: #38bdf8;
            }}
            .stat-label {{
                font-size: 12px;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-top: 4px;
            }}
            .links {{
                display: flex;
                gap: 12px;
                justify-content: center;
                flex-wrap: wrap;
            }}
            .btn {{
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 12px 24px;
                border-radius: 10px;
                font-weight: 700;
                font-size: 14px;
                text-decoration: none;
                transition: all 0.2s ease;
            }}
            .btn-primary {{
                background: #2563eb;
                color: white;
            }}
            .btn-primary:hover {{
                background: #1d4ed8;
            }}
            .btn-secondary {{
                background: #334155;
                color: #cbd5e1;
            }}
            .btn-secondary:hover {{
                background: #475569;
                color: white;
            }}
        </style>
    </head>
    <body>
        <div class="card">
            <div class="badge">
                <span class="pulse"></span>
                BACKEND RUNNING ONLINE
            </div>
            <h1>Master IELTS AI API Engine</h1>
            <p>High-performance FastAPI service powering Computer-Delivered IELTS Lab synchronization, candidate telemetry, and scoring engine.</p>
            
            <div class="stats">
                <div class="stat-box">
                    <div class="stat-number">{test_count}</div>
                    <div class="stat-label">Cambridge Tests Loaded</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">{c_count}</div>
                    <div class="stat-label">Lab Branches</div>
                </div>
            </div>

            <div class="links">
                <a href="/docs" class="btn btn-primary" target="_blank">Interactive API Docs (Swagger) &rarr;</a>
                <a href="/api/health" class="btn btn-secondary">System Health JSON</a>
            </div>
        </div>
    </body>
    </html>
    """


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 7860))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
