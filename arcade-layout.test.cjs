const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function element(classes=[]) {
 const values=new Set(classes), handlers={};
 return {dataset:{},style:{},handlers,attrs:{},classList:{contains:k=>values.has(k),add:(...ks)=>ks.forEach(k=>values.add(k)),remove:(...ks)=>ks.forEach(k=>values.delete(k))},setAttribute(k,v){this.attrs[k]=v;},focus(){},addEventListener(k,f){handlers[k]=f;}};
}
async function test(mode) {
 const modal=element(['is-open']),close=element(),home=element(),root=element(),tab=element(),body=element(['modal-open']),trigger=element();
 tab.dataset.miniTab='tetris'; root.querySelectorAll=()=>[tab]; root.querySelector=()=>tab; modal.querySelector=()=>close;
 const events={}, document={body,fullscreenElement:null,querySelector:()=>trigger,getElementById:id=>({'mini-game':modal,'mini-games-tabs':root,'arcade-home':home}[id]),addEventListener:(n,f)=>events[n]=f,dispatchEvent(){if(mode==='cleanup-error')throw Error('cleanup');},exitFullscreen(){if(mode==='exit-throw')throw Error('unsupported');this.fullscreenElement=null;return mode==='void'?undefined:Promise.resolve();}};
 modal.requestFullscreen=()=>{if(mode==='request-throw')throw Error('unsupported');document.fullscreenElement=modal;return Promise.resolve();};
 const window={addEventListener(){}};
 vm.runInNewContext(fs.readFileSync('arcade-layout.js','utf8'),{document,window,screen:{orientation:{unlock(){},lock(){}}},Event:class{},Promise,requestAnimationFrame:()=>1,ResizeObserver:class{observe(){}},MutationObserver:class{observe(){}}});
 const click=button=>button.handlers.click({preventDefault(){},stopImmediatePropagation(){}});
 // Selection screen must close directly without needing to enter a game.
 click(close);assert(!modal.classList.contains('is-open'));assert(!body.classList.contains('modal-open'));
 modal.classList.add('is-open');body.classList.add('modal-open');
 root.handlers.click({target:{closest:()=>tab}});await Promise.resolve();await Promise.resolve();
 assert(modal.classList.contains('is-playing'));
 click(close);assert(!modal.classList.contains('is-playing'));assert(modal.classList.contains('is-open'));
 click(close);assert(!modal.classList.contains('is-open'));assert.equal(modal.attrs['aria-hidden'],'true');
 modal.classList.add('is-open');body.classList.add('modal-open');click(home);assert(!modal.classList.contains('is-open'));
 await Promise.resolve();await Promise.resolve();
}
(async()=>{for(const mode of ['normal','void','exit-throw','request-throw','cleanup-error'])await test(mode);console.log('PASS: selection-to-home, game-to-menu-to-home, explicit home button and fullscreen/cleanup failure cases.');})().catch(e=>{console.error(e);process.exitCode=1;});
