const assert = require('node:assert/strict');
const fs = require('node:fs');

const catalog = require('./trial-gacha-data.js');
const gacha = require('./trial-gacha.js');

assert.equal(catalog.cards.length, 81, 'catalog should contain 81 cards');
assert.deepEqual(catalog.rates, { C: 60, SR: 25, SSR: 10, UR: 5 });
assert(catalog.cards.every((card) => fs.existsSync(card.image)), 'every card image must be published');

const battle = catalog.cards.filter((card) => card.work === 'Battle a la carte');
assert.equal(battle.length, 40);
assert(battle.filter((card) => card.category === '素材').every((card) => card.rarity === 'C'));
assert(battle.filter((card) => card.category === '料理').every((card) => card.rarity === 'SR'));
assert(battle.filter((card) => card.category === 'イベント').every((card) => card.rarity === 'SSR'));
assert(battle.filter((card) => card.category === 'キャラクター').every((card) => card.rarity === 'UR'));

const transport = catalog.cards.filter((card) => card.work === '架空運輸');
assert.equal(transport.length, 41);
assert.equal(transport.filter((card) => card.category === '車両').length, 5);
assert.equal(transport.filter((card) => card.category === '社員').length, 36);
assert.equal(transport.find((card) => card.title === '社長').rarity, 'UR');
assert.equal(transport.find((card) => card.title === '20トントレーラー').rarity, 'UR');

for (const [value, expected] of [[0, 'C'], [.59999, 'C'], [.6, 'SR'], [.84999, 'SR'], [.85, 'SSR'], [.94999, 'SSR'], [.95, 'UR'], [.99999, 'UR']]) {
    assert.equal(gacha.chooseRarity(() => value), expected, `rarity boundary ${value}`);
}

const deterministic = [0, 0, .61, .2, .9, .5, .99, .75, 0, .9, .7, .1, .88, .4, .96, .2, .2, .8, .83, .6];
let randomIndex = 0;
const results = gacha.drawCards(10, () => deterministic[randomIndex++]);
assert.equal(results.length, 10);
assert(results.every((card) => catalog.cards.includes(card)));

const inventory = gacha.addToInventory({}, [results[0], results[0], results[1]]);
assert.equal(inventory[results[0].id], 2);
assert.equal(inventory[results[1].id], 1);

const fakeStorage = {
    getItem: () => JSON.stringify({ [results[0].id]: 3, missing: 4, [results[1].id]: -2, bad: '2' })
};
assert.deepEqual(gacha.loadInventory(fakeStorage), { [results[0].id]: 3 });

console.log('PASS: trial gacha catalog, rarity boundaries, 10-pull, and inventory validation.');
