async function findUrls() {
  const query = 'https://ieltstrainingonline.com/?s=Cambridge+IELTS+18+reading+test+1';
  try {
    const res = await fetch(query);
    const html = await res.text();
    const regex = /href="(https:\/\/ieltstrainingonline\.com\/[^"]+)"/g;
    let match;
    const urls = new Set();
    while ((match = regex.exec(html)) !== null) {
      if (match[1].includes('cambridge') || match[1].includes('reading')) {
        urls.add(match[1]);
      }
    }
    console.log('Found URLs:', Array.from(urls));
  } catch(e) {
    console.error(e);
  }
}
findUrls();
