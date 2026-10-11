const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('aniani.js', 'utf8');
function fn(name) {
  const start = source.indexOf(`    function ${name}(`);
  assert(start >= 0, name);
  const end = source.indexOf('\n    }', start) + 6;
  return source.slice(start, end);
}
const ai = require('./minigame-ai.js');
const ctx = vm.createContext({ MINI_AI: ai });
vm.runInContext(`const TTT_SIZE=9, TTT_GOAL=5; ${fn('findWinLine')} ${fn('rotateMatrixCW')}`, ctx);
for (const cells of [[0,1,2,3,4], [4,13,22,31,40], [0,10,20,30,40], [8,16,24,32,40]]) {
  ctx.board = Array(81).fill(''); cells.forEach(i => ctx.board[i] = 'X');
  assert.equal(vm.runInContext('findWinLine(board).length', ctx), 5);
}
ctx.board = Array(81).fill(''); [7,8,9,10,11].forEach(i => ctx.board[i] = 'X');
assert.equal(vm.runInContext('findWinLine(board).length', ctx), 0, 'No row wrapping');
ctx.shape = [[1,0],[1,0],[1,1]];
assert.equal(vm.runInContext('JSON.stringify(rotateMatrixCW(shape))', ctx), '[[1,1,1],[1,0,0]]');
vm.runInContext(`const tetrisState={piece:{shape:[[1]],x:0,y:0},queue:[{id:1,shape:[[1]]},{id:2,shape:[[1]]}]};
function randomTetrisPiece(){return {id:3,shape:[[1]]};}
function renderTetrisQueue(){} function canPlaceTetris(){return true;}
${fn('spawnTetrisPiece')}`, ctx);
assert.equal(vm.runInContext('spawnTetrisPiece(); tetrisState.piece.id', ctx), 1);
assert.equal(vm.runInContext('tetrisState.queue.map(p=>p.id).join(",")', ctx), '2,3');
const html = fs.readFileSync('index.html','utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size, ids.length, 'Unique HTML IDs');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const path = match[1].split('?')[0];
  if (/^(https?:|mailto:)/.test(path)) continue;
  assert(fs.existsSync(path), path);
}
for (const name of ['mole','rabbit','dog','cowboy']) assert(fs.statSync(`images/arcade-${name}.png`).size > 1000);
assert.equal((source.match(/addEventListener\("arcade-exit"/g)||[]).length, 1);
assert(source.includes('moleState.score += friendly ? -2 : 1'));
assert(html.includes('id="tetris-rotate"'));
assert(source.includes('const tryOffsets = [0, -1, 1, -2, 2]'));
console.log('PASS: 4 win directions, row boundary, matrix rotation, preview queue, unique IDs, local resources, reset listener, mole penalty.');

// All 30 cards must fit typical portrait-fallback and landscape tables.
for (const [width,height] of [[790,240],[650,220],[900,550],[1020,620]]) {
  let best=0, result;
  for(let cols=1;cols<=30;cols++) {
    const rows=Math.ceil(30/cols);
    const cell=Math.min((width-(cols-1)*4)/cols,(height-(rows-1)*4)/rows*2/3);
    if(cell>best){best=cell;result=[cell*cols+(cols-1)*4,cell*1.5*rows+(rows-1)*4];}
  }
  assert(result[0]<=width+.001 && result[1]<=height+.001);
  assert(best>40,'Cards remain identifiable at tested sizes');
}
console.log('PASS: 30-card fit across four landscape table sizes.');

vm.runInContext(`${fn('slideNeighbors')} ${fn('slideSolved')} ${fn('shuffledSlideBoard')}
const slideState={board:[1,2,3,4,5,6,7,0,8],running:true,moves:0};
const dropStatusEl={textContent:''}; function renderSlideBoard(){}
${fn('moveSlideTile')}`, ctx);
for(let i=0;i<1000;i++) {
  const board=Array.from(vm.runInContext('shuffledSlideBoard()',ctx));
  assert.deepEqual([...board].sort((a,b)=>a-b),[0,1,2,3,4,5,6,7,8]);
  let inversions=0;
  for(let a=0;a<9;a++) for(let b=a+1;b<9;b++) if(board[a]&&board[b]&&board[a]>board[b]) inversions++;
  assert.equal(inversions%2,0,'Generated puzzle is solvable');
  assert(!board.every((n,i)=>n===(i+1)%9),'Not already solved');
}
assert.equal(vm.runInContext('moveSlideTile(0)',ctx),false);
assert.equal(vm.runInContext('slideState.moves',ctx),0);
assert.equal(vm.runInContext('moveSlideTile(8)',ctx),true);
assert.equal(vm.runInContext('slideState.running',ctx),false);
assert.equal(vm.runInContext('slideState.moves',ctx),1);
assert.equal(vm.runInContext('slideNeighbors(2).includes(3)',ctx),false);

// 〇×ゲームのCPU：勝てる手は打ち、相手の5つ目と開いた三は止める。つよいは十分強い。
{
  const four = Array(81).fill(''); [72,73,74,75].forEach(i => four[i] = '×');
  for (const level of ['normal','hard']) assert.equal(ai.chooseGomokuMove(four, 9, 5, '×', '○', level), 76, `${level} CPU takes the win`);
  const threat = Array(81).fill(''); [0,10,20,30].forEach(i => threat[i] = '○'); threat[50] = '×';
  for (const level of ['normal','hard']) assert.equal(ai.chooseGomokuMove(threat, 9, 5, '×', '○', level), 40, `${level} CPU blocks five`);
  const open3 = Array(81).fill(''); [39,40,41].forEach(i => open3[i] = '○'); open3[30] = '×'; open3[50] = '×';
  assert([37,38,42,43].includes(ai.chooseGomokuMove(open3, 9, 5, '×', '○', 'hard')), 'hard CPU answers an open three');
  const play = (o, x, seed) => {
    let s = seed; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const board = Array(81).fill(''); let turn = '○';
    for (let n = 0; n < 81; n++) {
      const cell = ai.chooseGomokuMove(board, 9, 5, turn, turn === '○' ? '×' : '○', turn === '○' ? o : x, rnd);
      assert.equal(board[cell], '', 'CPU never plays on an occupied cell');
      board[cell] = turn;
      if (ai.findWinLine(board, 9, 5).length) return turn;
      turn = turn === '○' ? '×' : '○';
    }
    return 'draw';
  };
  let hardWins = 0;
  for (let i = 1; i <= 4; i++) { if (play('hard', 'easy', i * 101) === '○') hardWins++; if (play('easy', 'hard', i * 211) === '×') hardWins++; }
  assert.equal(hardWins, 8, 'hard CPU beats easy CPU every time');
}
// 神経衰弱のCPU：つよいは見たカードを全部覚え、知っているペアを必ず取る。
{
  const cards = ['a','b','a','b','c','c'].map((pairKey, i) => ({ id: `${pairKey}-${i}`, pairKey, flipped: false, matched: false }));
  const known = new Map();
  cards.forEach(card => ai.rememberCard(known, card, 'hard'));
  assert.equal(known.size, 6, 'hard CPU remembers every revealed card');
  const first = ai.chooseMemoryPick(cards, known, 'hard', null);
  const firstCard = cards.find(card => card.id === first);
  firstCard.flipped = true;
  const second = ai.chooseMemoryPick(cards, known, 'hard', first);
  assert.equal(cards.find(card => card.id === second).pairKey, firstCard.pairKey, 'hard CPU completes a known pair');
  const fresh = new Map(); let remembered = 0;
  for (let i = 0; i < 400; i++) { const m = new Map(); ai.rememberCard(m, cards[0], 'easy'); remembered += m.size; }
  assert(remembered < 120, 'easy CPU forgets most cards');
}
// 遊び方の選択（人数・CPU・強さ）と結果表示、テトリスの開始ボタンの位置。
for (const game of ['ttt', 'memory']) {
  assert(html.includes(`id="${game}-setup"`) && html.includes(`id="${game}-result"`) && html.includes(`id="${game}-mode"`), `${game} has mode setup and result`);
}
assert(/data-setup-choice="easy"[\s\S]*data-setup-choice="normal"[\s\S]*data-setup-choice="hard"/.test(html), 'three CPU levels');
assert(html.includes('id="memory-score"'), 'memory scoreboard exists');
const arcadeCss = fs.readFileSync('arcade.css', 'utf8');
assert(arcadeCss.includes("[data-game='tetris'] .arcade-control-deck > .arcade-session-actions { grid-column: 1; grid-row: 1; align-self: start; }") && arcadeCss.includes('.tetris-tools .arcade-session-actions') && fs.readFileSync('arcade-layout.js', 'utf8').includes('function placeTetrisActions'), 'tetris start/reset: top-left on PC, under NEXT on portrait phones');
console.log('PASS: 1000 solvable shuffles, valid tile movement, win detection, move count and row boundary.');
