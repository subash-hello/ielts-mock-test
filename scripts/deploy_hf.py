import os
import subprocess
import shutil
import tempfile
import time
import sys

sys.stdout.reconfigure(encoding='utf-8')

hf_repo = "https://huggingface.co/spaces/subash2064/ielts-mock-backend"
tmp_dir = os.path.join(tempfile.gettempdir(), f"hf_ielts_backend_sync_{int(time.time())}")
if os.path.exists(tmp_dir):
    shutil.rmtree(tmp_dir, ignore_errors=True)

print(f"Cloning {hf_repo} into {tmp_dir} ...")
res = subprocess.run(["git", "clone", "--depth", "1", hf_repo, tmp_dir], capture_output=True, text=True)
if res.returncode != 0:
    print("Clone stderr:", res.stderr)
    sys.exit(1)

for item in ["README.md", "Dockerfile", "requirements.txt", "main.py", "database.py", "models.py"]:
    src = os.path.join("backend", item)
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(tmp_dir, item))

for folder in ["data", "routers"]:
    src_d = os.path.join("backend", folder)
    dst_d = os.path.join(tmp_dir, folder)
    if os.path.exists(dst_d):
        shutil.rmtree(dst_d)
    shutil.copytree(src_d, dst_d)

if os.path.exists(os.path.join(tmp_dir, "ielts.db")):
    os.remove(os.path.join(tmp_dir, "ielts.db"))

subprocess.run(["git", "add", "-A"], cwd=tmp_dir, check=True)
status = subprocess.run(["git", "status", "-s"], cwd=tmp_dir, capture_output=True, text=True).stdout.strip()
print("HF Space git status:\n", status)
if status:
    subprocess.run(["git", "commit", "-m", "fix: improve result deduplication and flexible timestamp matching"], cwd=tmp_dir, check=True)
    push_res = subprocess.run(["git", "push", "origin", "main"], cwd=tmp_dir, capture_output=True, text=True)
    print("Push stdout:", push_res.stdout)
    print("Push stderr:", push_res.stderr)
    if push_res.returncode != 0:
        sys.exit(1)
    print("[OK] Successfully pushed updated backend to Hugging Face Space!")
else:
    print("HF Space is already up to date.")
