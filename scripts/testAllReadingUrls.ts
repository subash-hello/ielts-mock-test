async function testAllUrls() {
  for (const b of [18, 19, 20, 21]) {
    for (const t of [1, 2, 3, 4]) {
      const padT = t.toString().padStart(2, '0');
      const u1 = `https://ieltstrainingonline.com/practice-cam-${b}-reading-test-${padT}-with-answer/`;
      const u2 = `https://ieltstrainingonline.com/practice-cam-${b}-reading-test-${padT}/`;
      try {
        const res = await fetch(u1, { method: 'HEAD' });
        if (res.status === 200) {
          console.log(`Cam ${b} Test ${t}:`, u1);
        } else {
          const res2 = await fetch(u2, { method: 'HEAD' });
          if (res2.status === 200) {
            console.log(`Cam ${b} Test ${t}:`, u2);
          } else {
            console.log(`Cam ${b} Test ${t}: not found (${res.status}, ${res2.status})`);
          }
        }
      } catch (e: any) {
        console.log(`Cam ${b} Test ${t} err:`, e.message);
      }
    }
  }
}
testAllUrls();
