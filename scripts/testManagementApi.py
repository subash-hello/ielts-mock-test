import urllib.request
import urllib.error
import json

import os

url = 'https://api.supabase.com/v1/projects/fqwdzxaprsefutccdqns/database/query'
headers = {
    'Authorization': f"Bearer {os.environ.get('SUPABASE_SECRET_KEY', '')}",
    'Content-Type': 'application/json'
}

data = json.dumps({'query': 'SELECT 1;'}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers=headers)

try:
    res = urllib.request.urlopen(req)
    print("Success:", res.status, res.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code, e.read().decode('utf-8'))
except Exception as ex:
    print("Exception:", ex)
