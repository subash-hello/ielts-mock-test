import fs from 'fs';

let content = fs.readFileSync('src/data/cambridge18.ts', 'utf-8');

// Replace any occurrence of explanation: '... '...' ...'
content = content.replace(/explanation:\s*'([^']*)'([^']*)'([^']*)'/g, "explanation: '$1\\'$2\\'$3'");
// Also specifically line 251
content = content.replace(`'junk trees'`, `\\'junk trees\\'`);

fs.writeFileSync('src/data/cambridge18.ts', content, 'utf-8');
console.log('Fixed quotes in cambridge18.ts');
