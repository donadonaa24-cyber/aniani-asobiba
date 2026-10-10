const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
assert(!/翠路ロジスティクス|制作途中|公式トップ|>ゲームページへ</.test(html));
assert(html.includes('data-title="架空運輸"'));
const cases = [...html.matchAll(/data-orbit="(\d+)"[^>]*data-title="([^"]+)"/g)];
assert.deepEqual(cases.map(m=>m[1]),['0','1','2','3','4','5']);
assert.equal(cases[5][2], 'あにあに文庫');
assert(html.includes('id="bunko-detail"'));
assert(html.split('https://donadonaa24-cyber.github.io/book/').length - 1 >= 4, 'あにあに文庫 links (works, detail, links, footer)');
for (const img of ['case','shelf','cover','illust']) assert(fs.existsSync(`images/bunko/${img}-20261006.webp`));
assert.deepEqual(cases.slice(0,3).map(m=>m[2]),['Battle a la carte','Battle à la carte Unity版（3D版）','架空運輸']);
assert(html.includes('id="battle-3d-detail"'));
assert(html.includes('Windows ZIP v0.6.0'));
assert(html.includes('battle-a-la-carte-3d/releases/download/v0.6.0/BattleALaCarte-3D-Windows-v0.6.0.zip'));
assert(!/href="[^"]+\.exe"/.test(html),'Never launch a Windows exe in-browser');
const groups = [...html.matchAll(/<div class="game-actions">([\s\S]*?)<\/div>/g)]
  .map(m => [...m[1].matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].map(a => ({url:a[1],label:a[2]})))
  .filter(links => links.some(a => /github.io\/(tumikomi|battle-a-la-carte--)/.test(a.url)));
assert.equal(groups.length, 4);
for (const links of groups) {
  assert.deepEqual(links.map(a=>a.label), ['ホームページへ','ウェブ版で遊ぶ','モバイル版で遊ぶ']);
  if (links[0].url.includes('/tumikomi/')) {
    assert.deepEqual(links.map(a=>new URL(a.url).searchParams.get('view')), ['home','web','mobile']);
  }
}
for(const m of html.matchAll(/data-status="([^"]+)"/g)) {
  if(m[1].startsWith('公開中')) assert.equal(m[1], '公開中＆追加要素可能性あり');
}
assert(!html.includes('近日公開予定'), '推し駒battle is released as a free trial');
assert(/data-title="推し駒battle" data-status="無料試験版 公開中"/.test(html));
assert(html.split('oshikoma/releases/download/v1.0-trial.2/OshigomaBattle-trial2-win64.zip').length - 1 >= 2);
assert(html.split('oshikoma/releases/download/v1.0-trial.2/OshigomaBattle-trial2-android.apk').length - 1 >= 2, '推し駒battle Android APK is linked from the card and the detail');
assert(html.split('https://donadonaa24-cyber.github.io/oshikoma/').length - 1 >= 4);
assert(fs.existsSync('images/oshikoma-board.jpg'));
for (const screen of ['board', 'select', 'inspect', 'blessing']) {
  assert(fs.existsSync(`images/oshikoma/${screen}-20261002.jpg`), `Latest ${screen} screenshot must exist`);
}
assert(!html.includes('を舞台にした安全アカデミーを舞台にした'));
assert.equal(html.split('2026.10.01 更新').length - 1, 2);
assert(!html.includes('class="gacha-core-app"'), 'gacha must not occupy the center of the game orbit');
assert(!html.includes('class="orbit-core"'), 'the orbit center must stay completely empty');
assert(html.includes('data-modal-target="trial-gacha"'));
assert(/console-dock[\s\S]*data-modal-target="trial-gacha"[\s\S]*>ガチャ<\/button>/.test(html));
assert(html.includes('id="trial-gacha"'));
assert(html.includes('無料お試し版'));
assert(html.includes('ログイン・コイン・実際のお金は必要ありません'));
assert(html.includes('id="trial-reveal-skip"'));
assert(html.includes('id="trial-reveal-next"'));
assert(html.includes('trial-gacha-data.js?v=20261011a1'));
assert(html.includes('trial-gacha.js?v=20261011a1'));
assert(html.includes('trial-gacha.css?v=20261011a1'));
assert(html.includes('架空運輸 ホームページへ'));
assert(/social-card[^>]+tumikomi\/index\.html\?view=home[\s\S]*?<h4>架空運輸<\/h4>/.test(html));
assert(fs.existsSync('images/gacha/transport-vehicles.png'));
assert(fs.existsSync('images/gacha/transport-employees.png'));
assert((html.match(/無断転載・無断配布を禁止します。/g) || []).length >= 8);
assert(html.includes('EODaZVnp9Jx0SkJDQR-oyGH1baUfiHRkVlnkgVq0A0k'));
assert(!html.includes('スマホ'), 'portal wording uses モバイル版, not スマホ版');
assert(html.includes('Unity / Windows / Android · v0.6.0'));
assert.equal((html.match(/class="update-note"/g) || []).length, 6); // Battle Web, Battle Unity, 架空運輸 (card + modal each)
const js = fs.readFileSync('aniani.js', 'utf8');
assert(!/ADMIN|admin-login|adminSession|article-form/.test(js + html.replace(/id="guestbook-form" class="article-form"/, '')), 'article admin mode and its passcode are removed');
assert(js.includes('const officialArticles') && js.includes('2026-09-29-battle-update'));
assert(/data-common-coming-soon[\s\S]*?準備中/.test(html), 'account modal shows a coming-soon notice');
assert(/class="common-app" data-common-app hidden/.test(html), 'account UI stays hidden unless common/portal.js loads');
console.log('PASS: portal links, rights notices, trial gacha entry, assets, release labels, and verification preserved.');
