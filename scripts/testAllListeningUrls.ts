async function testListeningUrls() {
  for (const b of [18, 19, 20, 21]) {
    for (const t of [1, 2, 3, 4]) {
      const padT = t.toString().padStart(2, '0');
      const u1 = `https://ieltstrainingonline.com/practice-cam-${b}-listening-test-${padT}/`;
      const u2 = `https://ieltstrainingonline.com/practice-cam-${b}-listening-test-${padT}-with-answer/`;
      const u3 = `https://ieltstrainingonline.com/practice-cam-${b}-listening-test-${t}/`;
      try {
        let res = await fetch(u1, { method: 'HEAD' });
        if (res.status === 200) {
          console.log(`Cam ${b} Listening ${t}:`, u1);
          continue;
        }
        res = await fetch(u2, { method: 'HEAD' });
        if (res.status === 200) {
          console.log(`Cam ${b} Listening ${t}:`, u2);
          continue;
        }
        res = await fetch(u3, { method: 'HEAD' });
        if (res.status === 200) {
          console.log(`Cam ${b} Listening ${t}:`, u3);
          continue;
        }
        console.log(`Cam ${b} Listening ${t}: not found`);
      } catch (e: any) {
        console.log(`Cam ${b} Listening ${t} err:`, e.message);
      }
    }
  }
}
testListeningUrls();
