import os
import re
import time
import urllib.request
import urllib.error
from urllib.parse import urljoin, urlparse

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}

os.makedirs('cache_html', exist_ok=True)
os.makedirs('public/images/writing', exist_ok=True)
os.makedirs('public/images/maps', exist_ok=True)
os.makedirs('public/images/reading', exist_ok=True)
os.makedirs('public/audio', exist_ok=True)

def fetch_url(url, binary=False, retries=2):
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=25) as resp:
                data = resp.read()
                return data if binary else data.decode('utf-8', errors='replace')
        except Exception as e:
            if attempt == retries:
                print(f"  [WARN] Failed {url}: {e}")
                return None
            time.sleep(1)

print("=== 1. Caching Cam 16 & 17 Reading and Listening HTML ===")
for b in [16, 17]:
    for t in [1, 2, 3, 4]:
        pad_t = f"{t:02d}"
        # Reading
        r_file = f"cache_html/cam{b}-reading-test{t}.html"
        if not os.path.exists(r_file) or os.path.getsize(r_file) < 10000:
            urls = [
                f"https://ieltstrainingonline.com/practice-cam-{b}-reading-test-{pad_t}-with-answer/",
                f"https://ieltstrainingonline.com/practice-cam-{b}-reading-test-{pad_t}/",
                f"https://engnovate.com/cambridge-ielts-{b}-academic-reading-test-{t}/",
            ]
            for u in urls:
                print(f"Fetching {r_file} from {u} ...")
                html = fetch_url(u)
                if html and len(html) > 10000 and ('READING PASSAGE' in html.upper() or 'Passage 1' in html):
                    with open(r_file, 'w', encoding='utf-8') as f:
                        f.write(html)
                    print(f"  [OK] Saved {r_file} ({len(html)//1024} KB)")
                    break
        else:
            print(f"  [Cached] {r_file}")

        # Listening
        l_file = f"cache_html/cam{b}-listening-test{t}.html"
        if not os.path.exists(l_file) or os.path.getsize(l_file) < 10000:
            urls = [
                f"https://ieltstrainingonline.com/practice-cam-{b}-listening-test-{pad_t}/",
                f"https://ieltstrainingonline.com/practice-cam-{b}-listening-test-{pad_t}-with-answer/",
                f"https://engnovate.com/cambridge-ielts-{b}-academic-listening-test-{t}/",
            ]
            for u in urls:
                print(f"Fetching {l_file} from {u} ...")
                html = fetch_url(u)
                if html and len(html) > 10000 and ('PART 1' in html.upper() or 'SECTION 1' in html.upper()):
                    with open(l_file, 'w', encoding='utf-8') as f:
                        f.write(html)
                    print(f"  [OK] Saved {l_file} ({len(html)//1024} KB)")
                    break
        else:
            print(f"  [Cached] {l_file}")

print("\n=== 2. Caching Cam 16-21 Academic Writing HTML & Official Task 1 Images ===")
for b in [16, 17, 18, 19, 20, 21]:
    for t in [1, 2, 3, 4]:
        w_file = f"cache_html/cam{b}-writing-test{t}.html"
        if not os.path.exists(w_file) or os.path.getsize(w_file) < 5000:
            urls = [
                f"https://engnovate.com/cambridge-ielts-{b}-academic-writing-test-{t}-free-online-test-samples/",
                f"https://engnovate.com/cambridge-ielts-{b}-academic-writing-test-{t}/",
                f"https://ieltstrainingonline.com/cambridge-{b}-writing-test-{t}/",
            ]
            for u in urls:
                print(f"Fetching {w_file} from {u} ...")
                html = fetch_url(u)
                if html and len(html) > 5000:
                    with open(w_file, 'w', encoding='utf-8') as f:
                        f.write(html)
                    print(f"  [OK] Saved {w_file} ({len(html)//1024} KB)")
                    break
        else:
            print(f"  [Cached] {w_file}")

print("\n=== 3. Scanning ALL Cached HTML for Images (Writing Task 1, Maps, Diagrams) ===")
for b in [16, 17, 18, 19, 20, 21]:
    for t in [1, 2, 3, 4]:
        # Check Writing HTML for Task 1 images
        w_file = f"cache_html/cam{b}-writing-test{t}.html"
        if os.path.exists(w_file):
            html = open(w_file, encoding='utf-8').read()
            # Find images in content
            imgs = re.findall(r'<img[^>]+(?:src|data-src|data-lazy-src)=["\']([^"\']+)["\']', html, re.I)
            cand_imgs = []
            for img in imgs:
                if any(x in img.lower() for x in ['logo', 'avatar', 'gravatar', 'icon', 'emoji', 'svg', 'banner', 'ad-', 'author', 'cropped-', '150x150', '300x']):
                    continue
                if 'wp-content/uploads' in img:
                    cand_imgs.append(img)
            # Deduplicate preserving order
            seen = set()
            unique_imgs = []
            for i in cand_imgs:
                if i not in seen:
                    seen.add(i)
                    unique_imgs.append(i)
            print(f"Cam {b} Writing Test {t} candidate images: {unique_imgs}")
            for idx, img_url in enumerate(unique_imgs[:2]):
                ext = os.path.splitext(urlparse(img_url).path)[1].lower()
                if ext not in ['.png', '.jpg', '.jpeg', '.webp']:
                    ext = '.png'
                suffix = f"-{idx+1}" if idx > 0 else ""
                out_path = f"public/images/writing/cam{b}-test{t}-task1{suffix}{ext}"
                if not os.path.exists(out_path) or os.path.getsize(out_path) < 2000:
                    data = fetch_url(img_url, binary=True)
                    if data and len(data) > 2000:
                        with open(out_path, 'wb') as f:
                            f.write(data)
                        print(f"  -> Downloaded {out_path} ({len(data)//1024} KB)")

        # Check Reading & Listening HTML for diagram/map images
        for mod in ['reading', 'listening']:
            m_file = f"cache_html/cam{b}-{mod}-test{t}.html"
            if os.path.exists(m_file):
                html = open(m_file, encoding='utf-8').read()
                m_body = re.search(r'<div class="entry-content">(.*?)</article>', html, re.S)
                content = m_body.group(1) if m_body else html
                imgs = re.findall(r'<img[^>]+(?:src|data-src|data-lazy-src)=["\']([^"\']+)["\']', content, re.I)
                cand_imgs = [i for i in imgs if 'wp-content/uploads' in i and not any(x in i.lower() for x in ['logo', 'avatar', 'gravatar', 'icon', 'emoji', 'svg', 'cropped-'])]
                seen = set()
                u_imgs = [i for i in cand_imgs if not (i in seen or seen.add(i))]
                if u_imgs:
                    print(f"Cam {b} {mod.title()} Test {t} images: {u_imgs}")
                    for idx, img_url in enumerate(u_imgs):
                        ext = os.path.splitext(urlparse(img_url).path)[1].lower() or '.jpg'
                        folder = 'maps' if mod == 'listening' else 'reading'
                        suffix = f"-{idx+1}" if idx > 0 else ""
                        out_path = f"public/images/{folder}/cam{b}-test{t}-{mod}{suffix}{ext}"
                        if not os.path.exists(out_path) or os.path.getsize(out_path) < 2000:
                            data = fetch_url(img_url, binary=True)
                            if data and len(data) > 2000:
                                with open(out_path, 'wb') as f:
                                    f.write(data)
                                print(f"  -> Downloaded {out_path} ({len(data)//1024} KB)")

print("\n=== 4. Downloading Cambridge 17 Listening Audio Files ===")
for t in [1, 2, 3, 4]:
    l_file = f"cache_html/cam17-listening-test{t}.html"
    audio_urls_in_html = []
    if os.path.exists(l_file):
        html = open(l_file, encoding='utf-8').read()
        audio_urls_in_html = re.findall(r'https?://[^"\'\s<>]+\.(?:mp3|m4a)', html, re.I)
        seen = set()
        audio_urls_in_html = [u for u in audio_urls_in_html if not (u in seen or seen.add(u))]
        print(f"Cam 17 Test {t} audio URLs in HTML: {audio_urls_in_html}")

    for p in [1, 2, 3, 4]:
        out_mp3 = f"public/audio/cam17-test{t}-part{p}.mp3"
        if os.path.exists(out_mp3) and os.path.getsize(out_mp3) > 200000:
            print(f"  [Cached Audio] {out_mp3}")
            continue
        candidates = []
        if len(audio_urls_in_html) >= p:
            candidates.append(audio_urls_in_html[p - 1])
        candidates.extend([
            f"https://ieltstrainingonline.com/wp-content/uploads/2022/07/cam17-test{t}-part{p}.mp3",
            f"https://ieltstrainingonline.com/wp-content/uploads/2022/06/cam17-test{t}-part{p}.mp3",
            f"https://engnovatemedia.com/wp-content/uploads/2023/07/cambridge-ielts-17-academic-listening-test-{t}-part-{p}.mp3",
        ])
        for u in candidates:
            print(f"  Downloading {out_mp3} from {u} ...")
            data = fetch_url(u, binary=True)
            if data and len(data) > 200000:
                with open(out_mp3, 'wb') as f:
                    f.write(data)
                print(f"  [OK] Saved {out_mp3} ({len(data)//1024} KB)")
                break
