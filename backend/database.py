"""
Database module for Master IELTS AI Backend.
Uses SQLite with automatic schema setup and JSON seeding.
"""

import sqlite3
import json
import os
from pathlib import Path
from typing import List, Dict, Any, Optional

DB_PATH = os.environ.get("IELTS_DB_PATH", str(Path(__file__).parent / "ielts.db"))
DATA_DIR = Path(__file__).parent / "data"

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initializes tables and seeds initial data if database is empty."""
    conn = get_db()
    cursor = conn.cursor()

    # 1. Tests table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tests (
        id TEXT PRIMARY KEY,
        book INTEGER,
        test_number INTEGER,
        module TEXT,
        title TEXT,
        duration_minutes INTEGER,
        audio_url TEXT,
        raw_json TEXT
    );
    """)

    # 2. Consultancies table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS consultancies (
        id TEXT PRIMARY KEY,
        name TEXT,
        branch TEXT,
        admin_email TEXT,
        phone TEXT,
        branch_code TEXT UNIQUE,
        access_code TEXT,
        exam_password TEXT,
        admin_password TEXT,
        status TEXT,
        computer_limit INTEGER,
        test_credits INTEGER,
        credits_used INTEGER,
        created_at TEXT,
        valid_until TEXT,
        assigned_test_ids TEXT
    );
    """)

    # 3. Stations table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS stations (
        id TEXT PRIMARY KEY,
        consultancy_id TEXT,
        station_name TEXT,
        ip_address TEXT,
        browser TEXT,
        os TEXT,
        status TEXT,
        current_candidate TEXT,
        candidate_number TEXT,
        current_test_id TEXT,
        current_module TEXT,
        answers_count INTEGER DEFAULT 0,
        remaining_seconds INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        last_heartbeat TEXT,
        created_at TEXT
    );
    """)

    # 4. Active Launches (central lab broadcast)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS active_launches (
        consultancy_id TEXT PRIMARY KEY,
        test_id TEXT,
        module TEXT,
        title TEXT,
        duration_minutes INTEGER,
        exam_password TEXT,
        started_at TEXT,
        is_active INTEGER DEFAULT 1,
        force_sync INTEGER DEFAULT 1
    );
    """)

    # 5. Candidate Results
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS candidate_results (
        id TEXT PRIMARY KEY,
        consultancy_id TEXT,
        candidate_name TEXT,
        candidate_number TEXT,
        test_id TEXT,
        test_title TEXT,
        module TEXT,
        overall_band REAL,
        scores_json TEXT,
        trf_number TEXT,
        submitted_at TEXT
    );
    """)

    # 6. Lab Commands (real-time instruction queue)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS lab_commands (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        consultancy_id TEXT,
        command_type TEXT,
        target_station TEXT,
        payload_json TEXT,
        created_at TEXT,
        is_consumed INTEGER DEFAULT 0
    );
    """)

    # 7. Students
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        consultancy_id TEXT,
        candidate_number TEXT,
        full_name TEXT,
        email TEXT,
        phone TEXT,
        target_band REAL DEFAULT 0,
        enrolled_date TEXT,
        tests_completed_count INTEGER DEFAULT 0,
        highest_band REAL DEFAULT 0,
        average_band REAL DEFAULT 0,
        latest_result_id TEXT,
        assigned_test_id TEXT,
        assigned_test_title TEXT,
        updated_at TEXT
    );
    """)

    conn.commit()

    # Seed data if empty
    seed_data(conn)
    conn.close()

def seed_data(conn: sqlite3.Connection):
    cursor = conn.cursor()

    # Check tests
    cursor.execute("SELECT COUNT(*) as count FROM tests")
    test_count = cursor.fetchone()["count"]
    if test_count == 0:
        tests_file = DATA_DIR / "tests.json"
        if tests_file.exists():
            with open(tests_file, "r", encoding="utf-8") as f:
                tests_data = json.load(f)
                for t in tests_data:
                    cursor.execute("""
                    INSERT OR REPLACE INTO tests (id, book, test_number, module, title, duration_minutes, audio_url, raw_json)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        t["id"],
                        t.get("book", 0),
                        t.get("testNumber", 0),
                        t.get("module", ""),
                        t.get("title", ""),
                        t.get("durationMinutes", 60),
                        t.get("audioUrl", ""),
                        json.dumps(t)
                    ))
            conn.commit()
            print(f"[OK] Database seeded with {len(tests_data)} IELTS tests.")

    # Check consultancies
    cursor.execute("SELECT COUNT(*) as count FROM consultancies")
    c_count = cursor.fetchone()["count"]
    if c_count == 0:
        c_file = DATA_DIR / "consultancies.json"
        if c_file.exists():
            with open(c_file, "r", encoding="utf-8") as f:
                c_data = json.load(f)
                for c in c_data:
                    cursor.execute("""
                    INSERT OR REPLACE INTO consultancies (
                        id, name, branch, admin_email, phone, branch_code, access_code,
                        exam_password, admin_password, status, computer_limit, test_credits,
                        credits_used, created_at, valid_until, assigned_test_ids
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        c["id"],
                        c["name"],
                        c["branch"],
                        c.get("adminEmail", ""),
                        c.get("phone", ""),
                        c.get("branchCode", c.get("accessCode", "")),
                        c.get("accessCode", ""),
                        c.get("examPassword", "1234"),
                        c.get("adminPassword", "admin123"),
                        c.get("status", "active"),
                        c.get("computerLimit", 20),
                        c.get("testCredits", 500),
                        c.get("creditsUsed", 0),
                        c.get("createdAt", ""),
                        c.get("validUntil", ""),
                        json.dumps(c.get("assignedTestIds", []))
                    ))
            conn.commit()
            print(f"[OK] Database seeded with {len(c_data)} Consultancies.")

    # Check stations
    cursor.execute("SELECT COUNT(*) as count FROM stations")
    s_count = cursor.fetchone()["count"]
    if s_count == 0:
        s_file = DATA_DIR / "stations.json"
        if s_file.exists():
            with open(s_file, "r", encoding="utf-8") as f:
                s_data = json.load(f)
                stations_list = []
                if isinstance(s_data, dict):
                    for cid_key, s_items in s_data.items():
                        if isinstance(s_items, list):
                            stations_list.extend(s_items)
                elif isinstance(s_data, list):
                    stations_list = s_data

                for s in stations_list:
                    cursor.execute("""
                    INSERT OR REPLACE INTO stations (
                        id, consultancy_id, station_name, ip_address, browser, os,
                        status, current_candidate, candidate_number, current_test_id,
                        current_module, answers_count, remaining_seconds, is_active,
                        last_heartbeat, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        s["id"],
                        s.get("consultancyId", "apex-global"),
                        s.get("name", s.get("id")),
                        s.get("ipAddress", "192.168.1.101"),
                        s.get("browser", "Chrome 124.0"),
                        s.get("os", "Windows 11 Pro"),
                        s.get("status", "idle"),
                        s.get("currentCandidate", None),
                        s.get("candidateNumber", None),
                        s.get("currentTestId", None),
                        s.get("currentModule", None),
                        s.get("answersCount", 0),
                        s.get("remainingSeconds", 0),
                        1 if s.get("isActive", True) else 0,
                        s.get("lastHeartbeat", ""),
                        s.get("createdAt", "")
                    ))
            conn.commit()
            print(f"[OK] Database seeded with {len(stations_list)} Stations.")
