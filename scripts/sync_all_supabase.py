import os, json, urllib.request, urllib.error, ssl, sys

sys.stdout.reconfigure(encoding='utf-8')

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://vdcaqvdgmliljyhcgdfj.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_SECRET_KEY", "")
if not SUPABASE_KEY and os.path.exists(".env"):
    with open(".env", "r", encoding="utf-8") as ef:
        for line in ef:
            if line.startswith("SUPABASE_SECRET_KEY="):
                SUPABASE_KEY = line.split("=", 1)[1].strip()

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open("backend/data/tests.json", "r", encoding="utf-8") as f:
    all_tests = json.load(f)

print(f"Loaded {len(all_tests)} tests from backend/data/tests.json")

# 1. Upload master all-tests.json to Supabase Storage bucket 'ielts-mock-tests'
def upload_storage(bucket_path: str, data_bytes: bytes, content_type: str):
    url = f"{SUPABASE_URL}/storage/v1/object/ielts-mock-tests/{bucket_path}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": content_type,
        "x-upsert": "true"
    }
    req = urllib.request.Request(url, data=data_bytes, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=60) as resp:
            return True, resp.status
    except urllib.error.HTTPError as e:
        return False, f"HTTP {e.code}: {e.read().decode('utf-8', errors='ignore')}"
    except Exception as ex:
        return False, str(ex)

# Ensure bucket exists
try:
    b_url = f"{SUPABASE_URL}/storage/v1/bucket"
    b_data = json.dumps({"id": "ielts-mock-tests", "name": "ielts-mock-tests", "public": True}).encode("utf-8")
    b_req = urllib.request.Request(b_url, data=b_data, headers={
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }, method="POST")
    urllib.request.urlopen(b_req, context=ctx, timeout=15)
    print("[OK] Created public bucket ielts-mock-tests")
except Exception:
    pass

master_bytes = json.dumps(all_tests, ensure_ascii=False).encode("utf-8")
ok, status = upload_storage("all-tests.json", master_bytes, "application/json")
print(f"[Storage] all-tests.json ({len(master_bytes)//1024} KB): ok={ok}, status={status}")

# 2. Upsert into ielts_mock_tests table via REST API if table exists
rows = []
for t in all_tests:
    rows.append({
        "id": t["id"],
        "book": t["book"],
        "test_number": t["testNumber"],
        "module": t["module"],
        "title": t["title"],
        "duration_minutes": t["durationMinutes"],
        "audio_url": t.get("audioUrl"),
        "sections": t["sections"]
    })

rest_url = f"{SUPABASE_URL}/rest/v1/ielts_mock_tests?on_conflict=id"
for i in range(0, len(rows), 6):
    chunk = rows[i:i+6]
    req = urllib.request.Request(
        rest_url,
        data=json.dumps(chunk, ensure_ascii=False).encode("utf-8"),
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates"
        },
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            print(f"[Table] Upserted rows {i+1}..{min(i+6, len(rows))} (HTTP {resp.status})")
    except urllib.error.HTTPError as e:
        msg = e.read().decode("utf-8", errors="ignore")
        print(f"[Table] Info ({e.code}): {msg[:160]}")
        break

# 3. Upload Cambridge 17 audio files to Supabase Storage
for t in range(1, 5):
    for p in range(1, 5):
        fname = f"cam17-test{t}-part{p}.mp3"
        fpath = f"public/audio/{fname}"
        if os.path.exists(fpath):
            with open(fpath, "rb") as af:
                adata = af.read()
            ok, st = upload_storage(f"audio/{fname}", adata, "audio/mpeg")
            print(f"[Audio] audio/{fname} ({len(adata)//1024} KB): ok={ok}, status={st}")
