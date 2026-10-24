const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const manifest = require('./images/oshikoma/downloads-20261024.json');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('aniani.js', 'utf8');
assert.equal(manifest.version, 'v1.0-trial.2');
assert.equal(manifest.androidDeviceVerified, false);
assert.equal(manifest.windowsExtractedBytes, 154917539);
assert.deepEqual(manifest.files.map(f => f.bytes), [101675543, 85177192]);
for (const file of manifest.files) {
  assert.equal(file.url, `https://github.com/donadonaa24-cyber/oshikoma/releases/download/${manifest.version}/${file.name}`);
  assert.match(file.sha256, /^[a-f0-9]{64}$/);
  assert.equal(html.split(`href="${file.url}"`).length - 1, 2);
  assert(html.includes(`約${Math.round(file.bytes / 1e6)}MB`));
}
const detail = html.match(/<section id="oshi-detail"[\s\S]*?<\/section>/)?.[0];
assert(detail.includes('実機動作・更新時の引継ぎは未確認'));
assert(detail.includes('アンインストールせず更新'));
assert(detail.includes('1MB＝1,000,000 bytes'));
assert(detail.includes('images/oshikoma/app-icon-20261024.png'));
assert(fs.existsSync('images/oshikoma/app-icon-20261024.png'));
const source = js.match(/const officialArticles = ([\s\S]*?);\s*const list =/);
const articles = vm.runInNewContext(`(${source[1]})`);
assert.equal(articles.filter(a => a.id === '2026-10-24-oshigoma-size-icon').length, 1);
console.log('PASS: Oshigoma optimized links in both views, exact sizes, icon and release article.');
