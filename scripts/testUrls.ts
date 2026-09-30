async function testUrls() {
  const urls = [
    'https://ieltstrainingonline.com/practice-cam-18-reading-test-01/',
    'https://ieltstrainingonline.com/practice-cam-18-reading-test-01-with-answer/',
    'https://ieltstrainingonline.com/practice-cam-18-reading-test-1/',
    'https://ieltstrainingonline.com/practice-cam-18-reading-test-1-with-answer/'
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'HEAD' });
      console.log(u, '->', res.status);
    } catch (e: any) {
      console.log(u, 'err:', e.message);
    }
  }
}
testUrls();
