import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('cache_html/cam20-reading-test2.html', 'utf-8');
const $ = cheerio.load(html);
const text = $('.entry-content').text();
const match = text.search(/Answer[^\n\r]*Test/i);
console.log(text.slice(match, match + 800));
