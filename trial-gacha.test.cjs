const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createHash } = require('node:crypto');

const catalog = require('./trial-gacha-data.js');
const gacha = require('./trial-gacha.js');
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('trial-gacha.css', 'utf8');
const source = fs.readFileSync('trial-gacha.js', 'utf8');

const dock = html.match(/<nav class="console-dock"[\s\S]*?<\/nav>/);
assert(dock, 'bottom console dock must exist');
assert.equal((dock[0].match(/<button\b/g) || []).length, 8, 'bottom console dock should expose eight tabs');
assert(dock[0].includes('data-modal-target="trial-gacha"'), 'gacha must open from the bottom tab');
assert(!html.includes('gacha-core-app'), 'gacha launcher must not remain in the galaxy center');
assert(!html.includes('orbit-core'), 'galaxy center decoration must remain removed');
assert(html.includes('id="trial-reveal-next"') && html.includes('id="trial-reveal-skip"'), 'sequential reveal controls must exist');

for (const phase of ['coin', 'portal', 'omen', 'quote', 'card', 'results']) {
    assert(source.includes(`setStagePhase("${phase}"`), `gacha phase ${phase} must be implemented`);
}
// 開始演出: 10枚を夜の海へ投げ入れ → 波紋で星が揺らぐ → (UR確定なら海の底から光) → 夜空 → 流れ星が海へ落ちる → デジタル空間
for (const phase of ['ripple', 'blessing', 'sky', 'meteor', 'plunge']) {
    assert(source.includes(`phase: "${phase}"`), `opening phase ${phase} must be implemented`);
}
assert(css.includes('[data-phase="coin"] .trial-coin-throw') && css.includes('[data-phase="plunge"]'), 'coin throw and plunge must be styled');
assert(html.includes('class="trial-sea-canvas"') && html.includes('class="trial-coins"'), 'sea canvas and thrown coins must exist');
assert(/COIN_TARGETS = \[(\[[^\]]+\],? ?){10}\]/.test(source), 'ten coins are thrown for a ten-pull');
const sea = require('./trial-gacha-sea.js');
assert.equal(typeof sea.create, 'function', 'sea renderer must expose create()');
for (const method of ['drop', 'setBlessing', 'lift', 'meteor', 'reset', 'setActive', 'resize']) {
    assert(fs.readFileSync('trial-gacha-sea.js', 'utf8').includes(`${method}(`), `sea renderer must implement ${method}`);
}
assert(css.includes('[data-blessed="true"]'), 'UR blessing stars must be styled');
assert(css.includes('preserve-3d') && source.includes('trial-coin-edge'), 'coin must be a layered 3D coin');
for (const layer of ['trial-card-frame', 'trial-card-holo', 'trial-card-glare']) assert(css.includes(`.${layer}`) && source.includes(layer), `card layer ${layer} must exist`);
assert.equal(gacha.hasBlessing([{ rarity: 'C' }, { rarity: 'SSR' }]), false, 'no blessing without UR');
assert.equal(gacha.hasBlessing([{ rarity: 'C' }, { rarity: 'UR' }]), true, 'blessing when any UR is drawn');
assert(css.includes('env(safe-area-inset-bottom'), 'mobile layout must account for the bottom safe area');
assert(css.includes('[data-phase="omen"]'), 'UR-only omen styling must exist');
assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'reduced-motion mode must be supported');

// 依頼された画像・AI表記・ストーリーに合わせたUR台詞以外を固定する。
const originalBattleQuotes = {
    'BAL-037': '先に流れを取るのは俺だ。',
    'BAL-038': '最後に勝つのは私だから。',
    'BAL-039': 'この一皿で、勝負を決めるよ！',
    'BAL-040': '最高の一皿、完成だ！'
};
function previousBattleDialogue(card) {
    if (!originalBattleQuotes[card.id]) return card;
    const { quoteLabel, ...data } = card;
    return { ...data, quote: originalBattleQuotes[card.id] };
}
function previousVehicle(card) {
    if (card.work !== '架空運輸' || card.category !== '車両') return card;
    const { generatedWithAI, quote, ...data } = card;
    return { ...data, image: 'images/gacha/transport-vehicles.png',
        sprite: { columns: 5, rows: 1, column: card.no - 41, row: 0 },
        ...(quote ? { quote } : {}) };
}
assert.equal(catalog.cards.length, 159, 'catalog should include 135 published cards and 24 Oshikoma characters');
assert.equal(createHash('sha256').update(JSON.stringify(catalog.cards.slice(0, 81).map(previousVehicle).map(previousBattleDialogue))).digest('hex'),
    '8684b50adfa797b5064744091f073b03c255dd22374f2809bd468acf12a38002',
    'the original 81 cards must retain metadata apart from requested vehicle artwork and Battle UR dialogue');
// 咲の質素な室内版への画像差し替えとAI表記だけを除き、公開済み94枚を固定する。
const previouslyPublishedCards = catalog.cards.slice(0, 94).map(previousVehicle).map(previousBattleDialogue).map(({ generatedWithAI, ...card }) =>
    card.id === 'HAN-087' ? { ...card, image: 'images/gacha/bunko/saki.png' } : card);
assert.equal(createHash('sha256').update(JSON.stringify(previouslyPublishedCards)).digest('hex'),
    'd9e151b1928fa78955e1bb8285ad476d682446e772be080d06305ba16b1edc88',
    'all previously published 94 cards must retain metadata apart from the requested Saki illustration and AI credit');
const revisedNovelImages = {
    'images/gacha/bunko/shion-sister-corrected.png': 'images/gacha/bunko/shion-sister.png',
    'images/gacha/bunko/shion-father-bike.png': 'images/gacha/bunko/shion-father.png',
    'images/gacha/bunko/mio-father-glasses.png': 'images/gacha/bunko/mio-father.png'
};
const published124 = catalog.cards.slice(0, 124).map(previousVehicle).map(previousBattleDialogue).map((card) =>
    revisedNovelImages[card.image] ? { ...card, image: revisedNovelImages[card.image] } : card);
assert.equal(createHash('sha256').update(JSON.stringify(published124)).digest('hex'),
    'ffd62bc9083f0cf4c8c11b97c9a2bb6d83ac59e695956f56ded5eb020ed3780c',
    'all 124 published cards must retain IDs, metadata and inventory compatibility');
assert.equal(new Set(catalog.cards.map((card) => card.id)).size, 159, 'card IDs must be unique');
// 推し駒battleの24人は公開済み135枚の末尾に追加し、既存カードは1件も変えない。
assert.equal(createHash('sha256').update(JSON.stringify(catalog.cards.slice(0, 135))).digest('hex'),
    'e9d40bf1c9ec695d0defe00fe99d2b942352dc4dac816ce9c07230a7bf008821', 'all 135 published cards must stay unchanged');
const oshikoma = catalog.cards.slice(135);
assert(oshikoma.every((card, index) => card.work === '推し駒battle' && card.id === `OSK-${136 + index}` && card.generatedWithAI && fs.existsSync(card.image)));
assert.deepEqual(['C', 'SR', 'SSR', 'UR'].map((rarity) => oshikoma.filter((card) => card.rarity === rarity).length), [0, 16, 3, 5]);
assert.deepEqual(oshikoma.filter((card) => card.rarity === 'UR').map((card) => card.title), ['蓮', '結衣', '美桜', '歩太', '黒獅子王']);
assert(oshikoma.filter((card) => card.rarity === 'UR').every((card) => card.quoteLabel === 'キャラクター紹介' && card.description.startsWith(card.quote)), 'Oshikoma UR text is the official introduction, not invented dialogue');
assert(html.includes('data-trial-filter="推し駒battle"'), 'collection filter for Oshikoma must exist');
assert.equal(catalog.storageKey, 'aniani.trial-gacha.v1.inventory');
assert.deepEqual(catalog.rates, { C: 60, SR: 25, SSR: 10, UR: 5 });
assert(catalog.cards.every((card) => fs.existsSync(card.image)), 'every card image must be published');

const battle = catalog.cards.filter((card) => card.work === 'Battle a la carte');
assert.equal(battle.length, 51);
assert(battle.filter((card) => card.category === '素材').every((card) => card.rarity === 'C'));
assert(battle.filter((card) => card.category === '料理').every((card) => card.rarity === 'SR'));
assert(battle.filter((card) => card.category === 'イベント').every((card) => card.rarity === 'SSR'));
assert(battle.filter((card) => card.category === 'キャラクター').every((card) => card.rarity === 'UR'));
assert(battle.filter((card) => card.category === 'キャラクター').every((card) => card.image.includes('battle-mode-cutin')));
assert(battle.filter((card) => card.category === 'キャラクター').every((card) => card.quote));
assert(battle.filter((card) => card.category === 'キャラクター').every((card) => card.quoteLabel === 'キャラクター台詞'));
assert.deepEqual(battle.filter((card) => card.category === 'キャラクター').map((card) => card.title), ['暁', '千鶴', '舞依', '拓海', '剛', '栞那', '結月', '龍太']);
const costumes = battle.filter((card) => card.category === '着せ替え');
assert.equal(costumes.length, 7);
assert(costumes.every((card) => card.rarity === 'SSR' && card.portrait));
assert.deepEqual(costumes.map((card) => [card.character, card.costume]), [
    ['akatsuki', 'summer'], ['tsuyoshi', 'summer'], ['chizuru', 'halloween'],
    ['kanna', 'halloween'], ['mai', 'kyudo'], ['takumi', 'kyudo'], ['yuzuki', 'kyudo']
]);
const officialAssets = require('./images/gacha/battle/source.json');
for (const asset of officialAssets.paths) {
    const bytes = fs.readFileSync(`images/gacha/battle/${asset.path.split('/').pop()}`);
    assert.equal(bytes.length, asset.size);
    assert.equal(createHash('sha1').update(Buffer.from(`blob ${bytes.length}\0`)).update(bytes).digest('hex'), asset.blob,
        `official artwork must be copied unchanged: ${asset.path}`);
}

const transport = catalog.cards.filter((card) => card.work === '架空運輸');
assert.equal(transport.length, 41);
assert.equal(transport.filter((card) => card.category === '車両').length, 5);
assert(transport.filter((card) => card.category === '車両').every((card) => !card.sprite && card.generatedWithAI));
assert.equal(new Set(transport.filter((card) => card.category === '車両').map((card) => card.image)).size, 5);
assert.equal(transport.filter((card) => card.category === '社員').length, 36);
assert.equal(transport.find((card) => card.title === '社長').rarity, 'UR');
assert.equal(transport.find((card) => card.title === '20トントレーラー').rarity, 'UR');
assert(catalog.cards.filter((card) => card.rarity === 'UR').every((card) => card.quote), 'every UR needs a pre-reveal quote');

const novels = catalog.cards.slice(81, 124);
assert.deepEqual(['星の終わりに君は生きる', '花散るさきの、幸せのかたち', 'EchoShion'].map((work) => novels.filter((card) => card.work === work).length), [20, 8, 15]);
assert.deepEqual(['C', 'SR', 'SSR', 'UR'].map((rarity) => novels.filter((card) => card.rarity === rarity).length), [19, 13, 4, 7]);
assert(novels.every((card) => card.generatedWithAI), 'all novel illustrations must disclose AI use');
assert(catalog.cards.slice(94, 124).every((card) => ['C', 'SR'].includes(card.rarity)), 'supporting characters belong in C and SR');
assert.equal(novels.filter((card) => card.title === 'シロ').length, 1);
assert.equal(novels.find((card) => card.title === 'シロ').rarity, 'SSR');
assert.equal(novels.filter((card) => card.title === '人型ECHO').length, 1);
assert.equal(novels.find((card) => card.title === '人型ECHO').rarity, 'C');
assert(novels.filter((card) => card.rarity === 'UR').every((card) => card.quoteLabel === '登場人物紹介'), 'novel descriptions must not be presented as invented dialogue');
for (const card of [...novels, ...catalog.cards.slice(124)]) {
    const pool = catalog.cards.filter((item) => item.rarity === card.rarity);
    const samples = [({ C: .3, SR: .7, SSR: .9, UR: .97 })[card.rarity], (pool.indexOf(card) + .5) / pool.length];
    assert.equal(gacha.drawCards(1, () => samples.shift())[0].id, card.id, `new card ${card.title} must be obtainable`);
}

for (const [value, expected] of [[0, 'C'], [.59999, 'C'], [.6, 'SR'], [.84999, 'SR'], [.85, 'SSR'], [.94999, 'SSR'], [.95, 'UR'], [.99999, 'UR']]) {
    assert.equal(gacha.chooseRarity(() => value), expected, `rarity boundary ${value}`);
}

const deterministic = [0, 0, .61, .2, .9, .5, .99, .75, 0, .9, .7, .1, .88, .4, .96, .2, .2, .8, .83, .6];
let randomIndex = 0;
const results = gacha.drawCards(10, () => deterministic[randomIndex++]);
assert.equal(results.length, 10);
assert(results.every((card) => catalog.cards.includes(card)));

const ur = catalog.cards.find((card) => card.rarity === 'UR');
const common = catalog.cards.find((card) => card.rarity === 'C');
assert.deepEqual(gacha.buildRevealPlan([common]).map((step) => step.type), ['card']);
assert.deepEqual(gacha.buildRevealPlan([ur]).map((step) => step.type), ['omen', 'quote', 'card']);

const inventory = gacha.addToInventory({}, [results[0], results[0], results[1]]);
assert.equal(inventory[results[0].id], 2);
assert.equal(inventory[results[1].id], 1);

const fakeStorage = {
    getItem: () => JSON.stringify({ [results[0].id]: 3, missing: 4, [results[1].id]: -2, bad: '2' })
};
assert.deepEqual(gacha.loadInventory(fakeStorage), { [results[0].id]: 3 });

const previousInventory = Object.fromEntries(catalog.cards.slice(0, 124).map((card, index) => [card.id, index + 1]));
let stored = JSON.stringify(previousInventory);
const existingStorage = { getItem: () => stored, setItem: (_key, value) => { stored = value; } };
const loaded = gacha.loadInventory(existingStorage);
assert.deepEqual(loaded, previousInventory, 'all existing collections must load without migration');
const updated = gacha.addToInventory(loaded, [catalog.cards[124], catalog.cards[124], catalog.cards[0]]);
assert(gacha.saveInventory(existingStorage, updated));
assert.deepEqual(gacha.loadInventory(existingStorage), updated);
assert.equal(updated[catalog.cards[124].id], 2);
assert.equal(updated[catalog.cards[0].id], previousInventory[catalog.cards[0].id] + 1);

console.log('PASS: trial gacha catalog, rarity boundaries, sequential UR plan, 10-pull, and inventory validation.');
