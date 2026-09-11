const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
assert(!/翠路ロジスティクス|制作途中|公式トップ|>ゲームページへ</.test(html));
assert(html.includes('data-title="架空運輸"'));
const groups = [...html.matchAll(/<div class="game-actions">([\s\S]*?)<\/div>/g)]
  .map(m => [...m[1].matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].map(a => ({url:a[1],label:a[2]})))
  .filter(links => links.some(a => /github.io\/(tumikomi|battle-a-la-carte--)/.test(a.url)));
assert.equal(groups.length, 4);
for (const links of groups) {
  assert.deepEqual(links.map(a=>a.label), ['ホームページへ','ウェブ版で遊ぶ','スマホ版で遊ぶ']);
  if (links[0].url.includes('/tumikomi/')) {
    assert.deepEqual(links.map(a=>new URL(a.url).searchParams.get('view')), ['home','web','mobile']);
  }
}
for(const m of html.matchAll(/data-status="([^"]+)"/g)) {
  if(m[1].startsWith('公開中')) assert.equal(m[1], '公開中＆追加要素可能性あり');
}
assert(html.includes('近日公開予定'));
assert(html.includes('EODaZVnp9Jx0SkJDQR-oyGH1baUfiHRkVlnkgVq0A0k'));
console.log('PASS: names, four consistent link groups, explicit home mode, release labels, verification preserved.');
