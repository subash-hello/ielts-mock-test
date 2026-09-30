async function checkAudio(url: string) {
  const res = await fetch(url);
  const text = await res.text();
  const audios = [...text.matchAll(/https?:\/\/[^\s"'\<>]+\.(?:mp3|m4a|wav|ogg)/gi)].map(m => m[0]);
  console.log(url, audios);
}
async function run() {
  await checkAudio('https://ieltstrainingonline.com/practice-cam-20-listening-test-01/');
  await checkAudio('https://ieltstrainingonline.com/practice-cam-21-listening-test-01/');
}
run();
