import os
import json
import urllib.request
from collections import defaultdict
from datetime import datetime
import dotenv

dotenv.load_dotenv()
url = os.environ.get('VITE_SUPABASE_URL') or os.environ.get('SUPABASE_URL') or 'https://vdcaqvdgmliljyhcgdfj.supabase.co'
key = os.environ.get('SUPABASE_SECRET_KEY') or os.environ.get('VITE_SUPABASE_ANON_KEY')

headers = {
    'apikey': key,
    'Authorization': f'Bearer {key}',
    'Content-Type': 'application/json',
    'Prefer': 'resolution=merge-duplicates'
}

def parse_iso(ts):
    if not ts:
        return ''
    clean = ts.replace('+00:00', 'Z')
    try:
        dt = datetime.fromisoformat(clean.replace('Z', '+00:00'))
        return dt.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
    except Exception:
        return ts

def get_group_key(r):
    cid = (r.get('consultancy_id') or '').strip().lower()
    cand = (r.get('candidate_id') or r.get('candidate_name') or 'cand').strip().lower()
    tid = (r.get('test_id') or '').strip().lower()
    ts = r.get('completed_at') or ''
    clean = ts.replace('+00:00', 'Z')
    try:
        sec = int(datetime.fromisoformat(clean.replace('Z', '+00:00')).timestamp())
    except Exception:
        sec = 0
    bucket = sec // 15
    return (cid, cand, tid, bucket)

def run():
    print(f"Connecting to Supabase at {url}...")
    req = urllib.request.Request(f'{url}/rest/v1/consultancy_results?select=*', headers=headers)
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode())
    print(f"Loaded {len(data)} total records from consultancy_results.")

    groups = defaultdict(list)
    for r in data:
        groups[get_group_key(r)].append(r)

    print(f"Identified {len(groups)} distinct logical tests across consultancies.")

    deleted_count = 0
    updated_count = 0

    for group_key, items in groups.items():
        if len(items) <= 1:
            continue

        # Merge duplicates
        # 1. Determine publication status (True if ANY copy is published)
        is_published = any(bool(it.get('is_published')) for it in items)
        published_at = next((it.get('published_at') for it in items if it.get('published_at')), None)

        # 2. Pick highest band score
        band_score = max(float(it.get('band_score') or 0.0) for it in items)

        # 3. Pick best writing submission
        best_ws = None
        for it in items:
            ws = it.get('writing_submission')
            if ws and isinstance(ws, dict):
                if not best_ws:
                    best_ws = ws
                else:
                    if ws.get('adminFeedback') and not best_ws.get('adminFeedback'):
                        best_ws['adminFeedback'] = ws['adminFeedback']
                    if ws.get('overallWritingBand') and not best_ws.get('overallWritingBand'):
                        best_ws['overallWritingBand'] = ws['overallWritingBand']
                    if ws.get('task1Band') and not best_ws.get('task1Band'):
                        best_ws['task1Band'] = ws['task1Band']
                    if ws.get('task2Band') and not best_ws.get('task2Band'):
                        best_ws['task2Band'] = ws['task2Band']

        # 4. Pick best answers
        best_answers = {}
        for it in items:
            ans = it.get('answers') or {}
            if len(ans) > len(best_answers):
                best_answers = ans

        # 5. Pick highest counts
        correct_count = max(int(it.get('correct_count') or 0) for it in items)
        total_questions = max(int(it.get('total_questions') or 0) for it in items)
        time_taken_seconds = max(int(it.get('time_taken_seconds') or 0) for it in items)

        # 6. Normalize completed_at
        norm_completed_at = parse_iso(items[0].get('completed_at'))

        # Choose the keeper item (prefer one whose ID already ends in Z or has answers)
        items_sorted = sorted(items, key=lambda x: (
            1 if str(x.get('id', '')).endswith('Z') else 0,
            1 if x.get('is_published') else 0,
            len(x.get('answers') or {})
        ), reverse=True)

        keeper = items_sorted[0]
        delete_targets = items_sorted[1:]

        # Update keeper with merged state
        keeper_id = keeper.get('id')
        merged_row = {
            "id": keeper_id,
            "consultancy_id": keeper.get('consultancy_id'),
            "test_id": keeper.get('test_id'),
            "book": keeper.get('book'),
            "test_number": keeper.get('test_number'),
            "module": keeper.get('module'),
            "total_questions": total_questions,
            "correct_count": correct_count,
            "band_score": band_score,
            "time_taken_seconds": time_taken_seconds,
            "completed_at": norm_completed_at,
            "answers": best_answers,
            "candidate_name": keeper.get('candidate_name'),
            "candidate_id": keeper.get('candidate_id'),
            "station_name": keeper.get('station_name'),
            "consultancy_name": keeper.get('consultancy_name'),
            "target_band": keeper.get('target_band'),
            "is_published": is_published,
            "published_at": published_at,
            "writing_submission": best_ws
        }

        # Upsert keeper
        upsert_req = urllib.request.Request(
            f"{url}/rest/v1/consultancy_results",
            data=json.dumps(merged_row).encode('utf-8'),
            headers=headers,
            method='POST'
        )
        try:
            urllib.request.urlopen(upsert_req)
            updated_count += 1
        except Exception as e:
            print(f"Error upserting keeper {keeper_id}: {e}")

        # Delete duplicate items
        for dup in delete_targets:
            dup_id = dup.get('id')
            if not dup_id or dup_id == keeper_id:
                continue
            del_req = urllib.request.Request(
                f"{url}/rest/v1/consultancy_results?id=eq.{urllib.parse.quote(dup_id)}",
                headers=headers,
                method='DELETE'
            )
            try:
                urllib.request.urlopen(del_req)
                deleted_count += 1
            except Exception as e:
                print(f"Error deleting dup {dup_id}: {e}")

    print(f"Successfully pruned {deleted_count} duplicate records, updated {updated_count} merged canonical records.")

if __name__ == '__main__':
    run()
