const fs = require('node:fs');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
assert(!/翠路ロジスティクス|制作途中|公式トップ|>ゲームページへ</.test(html));
assert(html.includes('data-title="架空運輸"'));
const cases = [...html.matchAll(/data-orbit="(\d+)"[^>]*data-title="([^"]+)"/g)];
assert.deepEqual(cases.map(m=>m[1]),['0','1','2','3','4','5','6']);
assert.equal(cases[5][2], 'あにあに文庫');
assert.equal(cases[6][2], 'あにあにバトル！！');
const anibatoCase = html.match(/<button class="game-case anibato-case"[\s\S]*?<\/button>/)?.[0];
assert(anibatoCase && anibatoCase.includes('data-orbit="6"') && anibatoCase.includes('data-modal-target="anibato-detail"'));
assert(anibatoCase.includes('data-status="無料ブラウザ試作版"') && anibatoCase.includes('ANIANI ORIGINAL / 07'));
assert(anibatoCase.includes('PLAY / BROWSER') && anibatoCase.includes('無料ブラウザ試作版'));
assert(html.includes('id="orbit-status">01 / 07'));
assert(/<meta name="description"[^>]*あにあにバトル！！/.test(html));
assert(html.includes('aniani.css?v=20261023m1') && html.includes('aniani.js?v=20261023m1'));
const anibatoViews = [...html.matchAll(/<article class="game-card active anibato-preview">([\s\S]*?)<\/article>/g)].map(m => m[1]);
assert.equal(anibatoViews.length, 2, 'anibato has a works card and a detail');
assert(html.indexOf(anibatoViews[0]) > html.indexOf('<h4>あにあに文庫</h4>'), 'anibato follows bunko in works');
assert(html.includes('id="anibato-detail"') && html.includes('id="anibato-title"'));
for (const view of anibatoViews) {
  assert(view.includes('無料ブラウザ試作版を公開。キーボード／ゲームパッド／タッチ操作に対応しています。'));
  for (const m of view.matchAll(/href="([^"]+)"/g)) {
    assert(m[1] === 'anibato/' || m[1] === 'games/anibato/' || /^images\/anibato\/(select|stage-board)-20261018\.webp$/.test(m[1]), `anibato only links to its intro page or screenshots: ${m[1]}`);
  }
  assert(!/\bdownload\s*(?:=|>|\s)|<iframe|<form|\.exe|releases\/|github\.com/.test(view), 'no distribution, download, exe launch, embed, or repository link');
}
const anibatoDetail = anibatoViews[1];
for (const text of ['透真・湊・シロ', '星の終わりに君は生きる', '蓮・結衣・黒獅子王', '推し駒battle', '千鶴・暁・龍太', 'Battle à la carte', '9人', '先に2勝', '70秒', '3つ', '3回', 'ハート2つ', '即敗北', '最後の10秒', 'ガード・回避・カウンター', '生成AI', '今後作品が増えれば参加キャラも増える予定']) assert(anibatoDetail.includes(text), `anibato detail includes ${text}`);
assert.equal([...anibatoDetail.matchAll(/class="article-screenshot-link"/g)].length, 2);
for (const m of (anibatoCase + anibatoViews.join('')).matchAll(/<img\b[^>]*src="([^"]+)"[^>]*alt="([^"]+)"/g)) {
  assert(fs.existsSync(m[1]) && /[ぁ-んァ-ン一-龠]/.test(m[2]), 'anibato image exists and has Japanese alt text');
}
for (const img of ['battle', 'select', 'special']) assert(fs.existsSync(`images/anibato/${img}-20261012.jpg`), 'the 2026-10-12 article keeps its screenshots');
// 2026-10-22公開依頼：9人と3舞台の紹介・無料ブラウザへの許可済み導線。Windows配布等は追加しない。
{
  const page = fs.readFileSync('anibato/index.html', 'utf8');
  for (const text of ['試作版・開発中', '無料ブラウザ試作版を公開中', 'CPUチーム対戦', '2人チーム対戦', '練習モード', '先に2勝', '70秒', 'ハート2つ', '場外ライン', '中央の足場', 'COMBO FINISH', '溜め攻撃', '相殺', 'LINK', 'ジャストガード', 'カウンター', 'スタミナ', 'キーコンフィグ', '生成AI', 'クロスオーバー表現', '無断転載']) assert(page.includes(text), `anibato page includes ${text}`);
  const names = ['透真', '湊', 'シロ', '蓮', '結衣', '黒獅子王', '千鶴', '暁', '龍太'];
  const cards = [...page.matchAll(/<article class="char-card[\s\S]*?<\/article>/g)].map(m => m[0]);
  assert.equal(cards.length, 9, 'nine character cards');
  names.forEach((name, i) => assert(cards[i].includes(`<h4>${name}`), `character ${i + 1} is ${name}`));
  for (const card of cards) for (const label of ['通常', '特殊', '超必殺']) assert(card.includes(`<dt>${label}</dt>`), 'each character lists normal/special/super');
  for (const card of cards) assert(/<button class="char-art"[^>]*>[\s\S]*?data-action="[^"]+-action\.webp"/.test(card), 'every character can switch to an attack pose');
  assert(/<h4>龍太[\s\S]*?<p class="char-role">暁のライバル<\/p>/.test(page), '龍太 is 暁\'s rival');
  assert(/<h4>暁[\s\S]*?<p class="char-role">千鶴・龍太のライバル<\/p>/.test(page), '暁 is the rival of 千鶴 and 龍太');
  assert.equal([...page.matchAll(/<figure class="stage">/g)].length, 3, 'three stages');
  for (const m of page.matchAll(/(?:src|href|data-action)="([^"#]+)"/g)) {
    if (/^https:\/\/fonts\./.test(m[1])) continue;
    const local = m[1].replace(/\?.*$/, '');
    const target = local === '../' ? 'index.html' : local.startsWith('../') ? local.slice(3) : `anibato/${local}`;
    assert(fs.existsSync(target), `anibato page resource exists: ${m[1]}`);
  }
  for (const m of page.matchAll(/<img\b[^>]*alt="([^"]*)"/g)) assert(/[ぁ-んァ-ン一-龠]/.test(m[1]), 'Japanese alt text');
  assert(!/\bdownload\b|<iframe|<form|\.exe|releases\/|github\.com|\.zip|\.apk/.test(page), 'no play, download, exe, embed, or repository link');
  for (const m of page.matchAll(/<meta property="og:image" content="https:\/\/donadonaa24-cyber\.github\.io\/aniani-asobiba\/([^"]+)"/g)) assert(fs.existsSync(m[1]), 'anibato OGP image exists');
}
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
assert(html.includes('trial-gacha-data.js?v=20261022a1'));
assert(html.includes('trial-gacha.js?v=20261014a1'));
assert(html.includes('trial-gacha.css?v=20261014a1')); assert(html.includes('trial-gacha-sea.js?v=20261013b1'));
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
const articleSource = js.match(/const officialArticles = ([\s\S]*?);\s*const list =/);
assert(articleSource, 'official article data is available');
const articles = vm.runInNewContext(`(${articleSource[1]})`);
const previewArticles = articles.filter(a => a.id === '2026-10-12-anibato-preview');
assert.equal(previewArticles.length, 1);
const previewArticle = previewArticles[0];
assert.equal(previewArticle.title, 'あにあにバトル！！ 試作版を開発中');
assert(previewArticle.body.includes('プレイ版・ダウンロードは現在未公開'));
assert(previewArticle.body.includes('今後作品が増えれば参加キャラも増える予定'));
for (const text of ['透真', '星の終わりに君は生きる', '蓮', '推し駒battle', '千鶴', 'Battle à la carte', '70秒', '最後の10秒']) assert(previewArticle.body.includes(text));
assert(!previewArticle.links?.length && !/https?:|\.exe|スタミナ/.test(JSON.stringify(previewArticle)), 'preview article has no distribution, download, executable, or repository links');
assert(previewArticle.screenshots.length >= 2 && previewArticle.screenshots.length <= 3);
for (const shot of previewArticle.screenshots) {
  assert(/^images\/anibato\/(battle|select|special)-20261012\.jpg$/.test(shot.src));
  assert(fs.existsSync(shot.src) && /[ぁ-んァ-ン一-龠]/.test(shot.alt));
}
assert(!/ADMIN|admin-login|adminSession|article-form/.test(js + html.replace(/id="guestbook-form" class="article-form"/, '')), 'article admin mode and its passcode are removed');
assert(js.includes('const officialArticles') && js.includes('2026-09-29-battle-update'));
assert(/data-common-coming-soon[\s\S]*?準備中/.test(html), 'account modal shows a coming-soon notice');
assert(/class="common-app" data-common-app hidden/.test(html), 'account UI stays hidden unless common/portal.js loads');
for (const m of html.matchAll(/<meta property="og:image" content="https:\/\/donadonaa24-cyber\.github\.io\/aniani-asobiba\/([^"]+)"/g)) assert(fs.existsSync(m[1]), 'OGP image exists');
assert(html.includes('name="twitter:card" content="summary_large_image"'));
for (const m of html.matchAll(/<link rel="(?:icon|apple-touch-icon)" href="([^"]+)"/g)) assert(fs.existsSync(m[1]), 'icon exists');
const caseImages = [...html.matchAll(/<span class="case-face">(?:(?!<\/button>)[\s\S])*?<img src="([^"]+)"/g)].map(m => m[1]);
assert.equal(caseImages.length, 6);
for (const src of caseImages) assert(fs.existsSync(src) && src.endsWith('.webp'), `orbit case image exists in the expected format: ${src}`);
assert.equal(caseImages.filter(src => src.endsWith('.webp')).length, 6, 'every orbit case image is a light WebP');
const deepLinkIds = JSON.parse(js.match(/DEEP_LINK_MODAL_IDS = (\[[^\]]+\])/)[1]);
assert(deepLinkIds.includes('anibato-detail'));
for (const id of deepLinkIds) assert(html.includes(`id="${id}"`), `deep-link target exists: ${id}`);
assert(html.includes('minigame-breakout.js?v=') && !js.includes('ensureBreakoutImages'), 'breakout uses plain coloured blocks, no recipe images');
console.log('PASS: seven portal works, anibato browser release with an allowlisted play link, existing links, rights notices, assets, and release labels.');
