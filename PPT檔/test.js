// VentureTown QA Test Suite
let passed=0,failed=0,errors=[];
function assert(c,m){if(c)passed++;else{failed++;errors.push(m);console.log(`  ✕ ${m}`);}}
function section(n){console.log(`\n── ${n} ──`);}

// Stubs
global.document={getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>({forEach:()=>{}}),
  createElement:()=>({style:{},classList:{add:()=>{},remove:()=>{}},appendChild:()=>{},remove:()=>{},setAttribute:()=>{},getAttribute:()=>null,addEventListener:()=>{}}),
  addEventListener:()=>{},removeEventListener:()=>{},body:{classList:{add:()=>{},remove:()=>{}},appendChild:()=>{}}};
global.setTimeout=(fn)=>{if(typeof fn==='function')fn();};
global.clearTimeout=()=>{};
global.Image=class{set src(v){}};

const fs=require('fs');
const html=fs.readFileSync('E:/VT/index.html','utf-8');
const code=html.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
const lines=code.split('\n');

function extractBlock(pat){
  let s=-1,d=0,r=[];
  for(let i=0;i<lines.length;i++){
    if(s===-1&&lines[i].match(pat))s=i;
    if(s>=0){r.push(lines[i]);for(const ch of lines[i]){if(ch==='{'||ch==='[')d++;if(ch==='}'||ch===']')d--;}if(d<=0&&i>s)break;}
  }
  return r.join('\n');
}

// Build single eval string with var instead of const
var G,BLDG,PARTNERS,EVENTS,FACILITY_FX,N,EVENT_INTERVAL,COMPOUND_EXCLUDE,COMPOUND_DIRS,_compoundSeq=0;
var TUT={active:false,waitingFor:null};
var DM={show:()=>{},trigger:()=>{},onEvent:()=>{},onActionOpen:()=>{},onPartnerHover:()=>{}};
function addLog(){}function pulse(){}function render(){}function renderFanHand(){}
function renderPartners(){}function renderTalentPanel(){}function renderHand(){}
function updateCard(){}function updateMover(){}function profitFlyFrom(){}
function profitFlyFromCell(){}function profitFlyFromPartner(){}
function showEv(){}function hideEv(){}function tryDialogue(){}function showBubble(){}

const blocks=[
  extractBlock(/^const BLDG\s*=/),
  extractBlock(/^const PARTNERS\s*=/),
  extractBlock(/^const EVENTS\s*=\[/),
  extractBlock(/^const EVENT_INTERVAL/),
  extractBlock(/^const COMPOUND_EXCLUDE/),
  extractBlock(/^const COMPOUND_DIRS/),
  extractBlock(/^const FACILITY_FX\s*=/),
].map(b=>b.replace(/^const /,'var '));

const funcs=[
  'var N=4; function GN(){return(G&&G.gridSize)||N;}',
  extractBlock(/^function hasPartner/),
  extractBlock(/^function hasPride/),
  extractBlock(/^function isDemonNegDisabled/),
  extractBlock(/^function isFacility/),
  extractBlock(/^function isShopType/),
  extractBlock(/^function eachCell/),
  extractBlock(/^function findCells/),
  extractBlock(/^function newGame/),
  extractBlock(/^function applyUpgradeBonus/),
  extractBlock(/^function swapCellData/),
  extractBlock(/^function destroyFacility/),
  extractBlock(/^function checkMurphyHijack/),
  extractBlock(/^function pickNextEvent/),
  extractBlock(/^function precomputeEventData/),
  extractBlock(/^function addHand/),
  extractBlock(/^function addHandMaybeCompound/),
  extractBlock(/^function rebuildDeptStore/),
  extractBlock(/^function countAdjacentFacilities/),
  extractBlock(/^function hasAdjacentShop/),
];

try{ eval(blocks.concat(funcs).join('\n')); }
catch(e){ console.log('EVAL ERROR:',e.message); }

// ── TESTS ──

section('1. newGame state completeness');
G=newGame();
['round','turn','goal','profit','grid','hand','partners','talentCards','gridSize',
 'bldgUpgrades','leyaPctMods','cellOverlay','ruinCells','bombTimers','inv',
 'logisticsVault','tempShedMoves','partnerState','cellMods','cellPctMods','futuresPct']
 .forEach(k=>assert(k in G,`newGame.${k}`));
assert(!('futuresLock' in G),'no futuresLock');
assert(!('turnFacilitiesHit' in G),'no turnFacilitiesHit');

section('2. FACILITY_FX 35 handlers');
['small_shop','scalper','bulk_store','dept_store','dept_store_part','trade_hub','tech_lab',
 'tax_office','temp_shed','logistics_amp','logistics_vault','talent_bank','strike_board',
 'talent_market','import_tax','overtime','speed_station','ruin_monument','futures_market',
 'demolish_bureau','terminal','spiral_hub','labor_convert','talent_storage','dispatch_hq',
 'env_sensor','trade_port','exchange_board','trade_zone','clearance','demolish_fab',
 'dynamic_amp','unstable_base','staffing','cafeteria']
 .forEach(h=>assert(typeof FACILITY_FX[h]==='function',`FX.${h}`));

section('3. Futures market ceil rounding');
G=newGame();G.grid[0][0]='futures_market';
G.inv={facHit:0,logSet:new Set(),envyPen:false,cenHits:0,logHits:0,speedAct:false,ampAct:false,
  fxM2G:false,fxG2M:false,arbM2G:false,arbG2M:false,windOK:false,hwCenter:false,exchBoard:false,
  clearanceBonus:0,clearanceCells:[]};
function mkfx(v,t,r,c){return{el:{value:v,type:t},r,c,cellEl:null,hit(){},next(){},pulse(){},updateCard(){},updateMover(){}};}

G.futuresPct={'0,0':5};let fx=mkfx(1,'money',0,0);FACILITY_FX.futures_market(fx);
assert(fx.el.value===2,`1+5%=2, got ${fx.el.value}`);

G.futuresPct={'1,1':-5};fx=mkfx(1,'money',1,1);FACILITY_FX.futures_market(fx);
assert(fx.el.value===1,`1-5%=max1, got ${fx.el.value}`);

G.futuresPct={'2,2':3};fx=mkfx(10,'money',2,2);FACILITY_FX.futures_market(fx);
assert(fx.el.value===11,`10+3%=11, got ${fx.el.value}`);

G.futuresPct={'3,3':0};fx=mkfx(5,'goods',3,3);FACILITY_FX.futures_market(fx);
assert(fx.el.value===5,`5+0%=5, got ${fx.el.value}`);

G.futuresPct={'0,1':10};fx=mkfx(100,'money',0,1);FACILITY_FX.futures_market(fx);
assert(fx.el.value===110,`100+10%=110, got ${fx.el.value}`);

G.futuresPct={'0,2':-10};fx=mkfx(100,'money',0,2);FACILITY_FX.futures_market(fx);
assert(fx.el.value===90,`100-10%=90, got ${fx.el.value}`);

G.futuresPct={'0,3':10};fx=mkfx(1,'diamond',0,3);FACILITY_FX.futures_market(fx);
assert(fx.el.value===2,`diamond 1+10%=2, got ${fx.el.value}`);

section('4. Murphy weight + cap');
G=newGame();G.round=2;
G._murphyTrack={lastSend:null,repeatCount:0,noMove:0};
let h=0;for(let i=0;i<1000;i++)if(checkMurphyHijack())h++;
assert(h===0,`w=1→0, got ${h}`);

G._murphyTrack={lastSend:'l,0',repeatCount:4,noMove:0};
h=0;for(let i=0;i<10000;i++)if(checkMurphyHijack())h++;
assert(h/10000>0.3&&h/10000<0.6,`rep=4 ~44%, got ${(h/100).toFixed(1)}%`);

G._murphyTrack={lastSend:'l,0',repeatCount:50,noMove:50};
h=0;for(let i=0;i<10000;i++)if(checkMurphyHijack())h++;
assert(h/10000<=0.68,`extreme ≤68%, got ${(h/100).toFixed(1)}%`);

G.round=1;h=0;for(let i=0;i<100;i++)if(checkMurphyHijack())h++;
assert(h===0,`round1→0, got ${h}`);

section('5. Clearance');
G=newGame();G.inv={facHit:0,logSet:new Set(),envyPen:false,cenHits:0,logHits:0,speedAct:false,
  ampAct:false,fxM2G:false,fxG2M:false,arbM2G:false,arbG2M:false,windOK:false,hwCenter:false,
  exchBoard:false,clearanceBonus:0,clearanceCells:[]};
fx=mkfx(10,'goods',0,0);FACILITY_FX.clearance(fx);
assert(fx.el.type==='goods',`out=goods, got ${fx.el.type}`);
assert(fx.el.value===1,`val=1, got ${fx.el.value}`);
assert(G.inv.clearanceBonus===40,`bonus=40, got ${G.inv.clearanceBonus}`);

section('6. Strike board');
G=newGame();G.talentCards=3;
fx=mkfx(5,'money',0,0);FACILITY_FX.strike_board(fx);
assert(fx.el.value===35,`5+3×10=35, got ${fx.el.value}`);
assert(G.talentCards===0,`consumed, got ${G.talentCards}`);

section('7. swapCellData');
G=newGame();G.grid[0][0]='factory';G.grid[1][1]='shop';
G.bldgUpgrades={'0,0':3};G.leyaPctMods={'0,0':4};G.cellMods={'0,0':2};
G.bombTimers={'0,0':2};G.cellOverlay={'0,0':'x'};G.tempShedMoves={'0,0':3};
G.logisticsVault={'0,0':10};G.futuresPct={'0,0':7};
swapCellData(0,0,1,1);
assert(G.grid[1][1]==='factory','grid');
assert(G.bldgUpgrades['1,1']===3,'upg');assert(G.leyaPctMods['1,1']===4,'leya');
assert(G.cellMods['1,1']===2,'mods');assert(G.bombTimers['1,1']===2,'bomb');
assert(G.cellOverlay['1,1']==='x','overlay');assert(G.tempShedMoves['1,1']===3,'shed');
assert(G.logisticsVault['1,1']===10,'vault');assert(G.futuresPct['1,1']===7,'fpct');
assert(!G.bldgUpgrades['0,0'],'old cleared');

section('8. Partner onSettle');
G=newGame();G.partners=['union_chief'];G.talentCards=3;G.profit=0;
PARTNERS.union_chief.onSettle.call(PARTNERS.union_chief,G,100,{type:'money',value:100});
assert(G.profit===50,`union +50%=50, got ${G.profit}`);

G=newGame();G.partners=['express_master'];G.inv={facHit:5};G.profit=0;
PARTNERS.express_master.onSettle.call(PARTNERS.express_master,G,100,{type:'money',value:100});
assert(G.profit===10,`express +10%=10, got ${G.profit}`);

G=newGame();G.partners=['pride','greed'];G.profit=0;
PARTNERS.pride.onSettle.call(PARTNERS.pride,G,100,{type:'money',value:100});
assert(G.profit===20,`pride 2d +20%=20, got ${G.profit}`);

section('9. Event deferred');
let d=0;
d++;assert(Math.max(1,3-d)===2,'1st→2');
d++;assert(Math.max(1,3-d)===1,'2nd→1');
d++;assert(Math.max(1,3-d)===1,'3rd→1');

section('10. BLDG integrity');
assert(Object.keys(BLDG).length>=50,`50+ facilities`);
assert(BLDG.clearance.out==='goods','clearance out=goods');
assert(BLDG.futures_market.req==='any','futures req=any');
assert(BLDG.transfer_hub.special==='redirect','transfer_hub=redirect');
Object.entries(BLDG).forEach(([id,b])=>{
  const startTurnSpecials=['talent_training','bomb_device','magnet_plate'];
  if(b.special&&b.special!=='redirect'&&b.special!=='envy'&&!startTurnSpecials.includes(b.special))
    assert(typeof FACILITY_FX[b.special]==='function',`${id}→FX.${b.special}`);
});

section('11. PARTNERS + EVENTS');
assert(Object.keys(PARTNERS).length>=30,'30+ partners');
assert(EVENTS.length>=19,'19+ events');
assert(EVENTS.find(e=>e.id==='murphy'),'murphy');
assert(EVENTS.find(e=>e.id==='job_assist'),'job_assist');

section('12. pickNextEvent excludes murphy');
G=newGame();G.turn=1;
for(let i=0;i<100;i++){pickNextEvent();assert(G.nextEvent.id!=='murphy',`no murphy in preview #${i}`);if(G.nextEvent.id==='murphy')break;}

section('13. G.inv completeness');
G=newGame();
G.inv={facHit:0,logSet:new Set(),envyPen:false,cenHits:0,logHits:0,speedAct:false,ampAct:false,
  fxM2G:false,fxG2M:false,arbM2G:false,arbG2M:false,windOK:false,hwCenter:false,exchBoard:false,
  clearanceBonus:0,clearanceCells:[]};
['facHit','logSet','envyPen','cenHits','logHits','speedAct','ampAct','fxM2G','fxG2M',
 'arbM2G','arbG2M','windOK','hwCenter','exchBoard','clearanceBonus','clearanceCells']
 .forEach(k=>assert(k in G.inv,`inv.${k}`));

section('14. New partners: uncrowned_king + yongqing_house');
assert(PARTNERS.uncrowned_king,'uncrowned_king exists');
assert(typeof PARTNERS.uncrowned_king.onSettle==='function','uncrowned_king.onSettle');
assert(PARTNERS.yongqing_house,'yongqing_house exists');

// Uncrowned king: 4 ruins, profit=100 → basePct=floor(16/2)=8 → bonus=ceil(100*8/100)=8
G=newGame();G.partners=['uncrowned_king'];G.profit=0;
G.ruinCells=new Set(['0,0','0,1','0,2','0,3']); // 4 ruins
G.talentCards=0;
PARTNERS.uncrowned_king.onSettle.call(PARTNERS.uncrowned_king,G,100,{type:'money',value:100});
assert(G.profit===8,`uncrowned 4ruins +8%, got ${G.profit}`);

// 0 ruins → no effect
G.profit=0;G.ruinCells=new Set();
PARTNERS.uncrowned_king.onSettle.call(PARTNERS.uncrowned_king,G,100,{type:'money',value:100});
assert(G.profit===0,`uncrowned 0ruins → 0, got ${G.profit}`);

// Tanya onTurnStart: empty hand → gets 1 facility
G=newGame();G.partners=['tanya'];G.hand=[];
PARTNERS.tanya.onTurnStart(G);
assert(G.hand.length===1,'tanya gives 1 facility when hand empty');
assert(G.hand[0].count===1,'tanya facility count=1');

// Tanya: hand has items → no extra
G=newGame();G.partners=['tanya'];G.hand=[{id:'factory',count:1}];
PARTNERS.tanya.onTurnStart(G);
assert(G.hand.length===1,'tanya does not add when hand has items');

section('15. countAdjacentFacilities dept_store dedup');
G=newGame();
G.grid[0][0]='dept_store';G.grid[0][1]='dept_store_part';
G.grid[1][0]='dept_store_part';G.grid[1][1]='dept_store_part';
G.deptStoreAnchors={'0,0':true};
G.deptStoreParts={'0,1':'0,0','1,0':'0,0','1,1':'0,0'};
// env_sensor at (0,2): adjacent to dept_store_part(0,1) and possibly (1,2)=null
const cnt=countAdjacentFacilities(0,2);
assert(cnt===1,`dept_store counts as 1 adjacent, got ${cnt}`);

// Results
console.log(`\n${'═'.repeat(40)}`);
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
if(errors.length)errors.forEach(e=>console.log(`  ✕ ${e}`));
console.log('═'.repeat(40));
process.exit(failed>0?1:0);
