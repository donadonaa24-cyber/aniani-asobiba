const assert=require('node:assert/strict'),fs=require('node:fs'),{createHash}=require('node:crypto');
const catalog=require('./trial-gacha-data.js'),gacha=require('./trial-gacha.js'),assets=require('./docs/paper-cards-assets.json');
assert.equal(createHash('sha256').update(JSON.stringify(catalog.cards.slice(0,159))).digest('hex'),"9ab71ce2a18475610b7ed992c27d3e301fc7d88917d1e52ac63b33c57ba1fc28");
assert.equal(catalog.cards.length,176);assert.equal(new Set(catalog.cards.map(c=>c.id)).size,176);
const paper=catalog.cards.slice(159);assert.equal(paper.filter(c=>c.category==='紙キャラ').length,9);assert.equal(paper.filter(c=>c.category==='紙サポート').length,8);
for(const [i,c] of paper.entries()){assert.equal(c.id,'ANI-'+(160+i));assert.equal(c.work,'あにあにバトル！！');assert(c.generatedWithAI);assert(c.description&&c.sourceWork);assert(fs.existsSync(c.image));assert(assets.entries.find(a=>a.image===c.image));}
assert.deepEqual(catalog.rates,{C:60,SR:25,SSR:10,UR:5});assert.equal(catalog.storageKey,'aniani.trial-gacha.v1.inventory');
const previous=Object.fromEntries(catalog.cards.slice(0,159).map((c,i)=>[c.id,i+1]));const inventory=gacha.addToInventory(previous,paper);for(const [id,n] of Object.entries(previous))assert.equal(inventory[id],n);
const html=fs.readFileSync('index.html','utf8'),page=fs.readFileSync('anibato/index.html','utf8');assert(html.includes('data-trial-filter="あにあにバトル！！"'));assert(page.includes('../games/anibato/'));assert.equal((html.match(/href="games\/anibato\/"/g)||[]).length,2);assert.equal((page.match(/class="support-art"/g)||[]).length,8);
assert(!/sb_secret_|service_role|supabaseKey|publishableKey/.test(fs.readFileSync('games/anibato/online-config.json','utf8')));assert(fs.existsSync('games/anibato/payload-manifest.json'));
const payload=require('./games/anibato/payload-manifest.json');for(const data of Object.values(payload.files)){let size=0;const hash=createHash('sha256');for(const p of data.parts){const bytes=fs.readFileSync('games/anibato/'+p.file);assert(bytes.length<100*1024*1024);assert.equal(createHash('sha256').update(bytes).digest('hex'),p.sha256);hash.update(bytes);size+=bytes.length;}assert.equal(size,data.length);assert.equal(hash.digest('hex'),data.sha256);}
console.log('PASS: 176 cards, original 159 unchanged, old inventory preserved, 17 originals credited, play links, 8 supports, credential-free config, exact chunked payload.');
