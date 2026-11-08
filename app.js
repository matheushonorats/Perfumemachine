const RAW_NAMES = `Granado Verbena
O Boticário Zaad Santal
Rayhaan Aquatica
4711 Original Eau de Cologne
Afnan Rare Carbon
Afnan Supremacy Collector's Edition Pour Homme
Afnan Supremacy Not Only Intense
Afnan Turathi Blue
Ajmal Amaze for Men
Alfred Dunhill Icon
Al Haramain L'Aventure
Armaf Club De Nuit Urban Elixir
Armaf Club de Nuit Blue Iconic
Armaf Club de Nuit Intense Man Limited Edition Parfum
Armaf Club de Nuit Milestone
Armaf Club de Nuit Precieux I
Armaf Club de Nuit Sillage
Aurora Scents Black Obsidian
Aurora Scents Cafe Citadel
Aurora Scents Vanilla Espresso
Azzaro The Most Wanted
Azzaro The Most Wanted Parfum
Azzaro Wanted by Night
Banana Republic Midnight Hour
Bvlgari Aqva Pour Homme
Bvlgari Man In Black
Bvlgari Man Terrae Essence
Calvin Klein CK One
Carolina Herrera 212 VIP Men Party Fever
Carolina Herrera Chic For Men
Chlorophylla H
Clinique Happy
Condé Parfum Caipi d' Argent
Davidoff Cool Water
Dior Homme Intense 2011
Dior Eau Sauvage
Dolce&Gabbana Pour Homme 2012
Dolce&Gabbana Light Blue Eau Intense Pour Homme
Dolce&Gabbana Light Blue pour Homme
Dolce&Gabbana The One for Men Eau de Parfum
Ermenegildo Zegna Zegna Forte
Escentric Molecules Escentric 05
Escentric Molecules Molecule 01 + Iris
Escentric Molecules Molecule 01 + Mandarin
Escentric Molecules Molecule 01 + Patchouli
Escentric Molecules Molecule 03
Escentric Molecules Molecule 05
Fragrance World Ace
Giorgio Armani Armani Code
Giorgio Armani Armani Code Absolu Gold
Giorgio Armani Stronger With You Intensely
Gisada Ambassador Men
Givenchy Gentleman 2017
Givenchy Pi
Granado Bebê Erva-Doce
Granado Bergamota & Flor de Laranjeira
Granado Cardamomo & Gengibre
Granado Mandarina & Sândalo
Granado Menta & Alecrim
Guy Laroche Drakkar Noir
Hermès H24
Hermès Terre D'Hermes Eau Intense Vetiver
Hermès Terre d'Hermes Parfum
Hermès Terre d'Hermès
Hermès Terre d'Hermès Eau Givree
Hermès Terre d’Hermès Intense
Hugo Boss Boss Bottled Beyond
Hugo Boss Boss Bottled Infinite
Hugo Boss Boss Bottled Parfum
Hugo Boss Bottled Absolu
In The Box Origine Un
Issey Miyake L'Eau Majeure d'Issey
Issey Miyake L'Eau d'Issey Pour Homme
Issey Miyake L'Eau d'Issey Pour Homme Intense
Jean Paul Gaultier Le Male Le Parfum
Jean Paul Gaultier Le Male Lover
Jean Paul Gaultier Le Male Pride Edition
John Varvatos XX Artisan
Joop! Wow!
LAB 8 Effervescent
Lacoste Eau de Lacoste L.12.12. White
Lalique Encre Noire
Lalique Encre Noire A L'Extreme
Lalique Encre Noire Sport
Lattafa Art of Arabia I
Lattafa Atlas
Lattafa The Kingdom For Men
Mancera Cedrat Boise
Mancera Intense Cedrat Boise
Mancera Red Tobacco
Mancera Red Tobacco Intense
Mancera Tonka Cola
Maracujá Brasil Limão Siciliano & Neroli
Mercedes-Benz Club Black Eau de Toilette
Mercedes-Benz Select
Montblanc Explorer Ultra Blue
Montblanc Individuel
Montblanc Legend
Montblanc Legend Special Edition 2012
Montblanc Starwalker
Moschino Uomo?
Natura Essencial Elixir
Natura Homem Especiarias
Natura Homem Evolut.io
Natura Humor 6 Paz e Humor
O Boticário Arbo Ocean
O Boticário Zaad Expedition
O Boticário Zaad Go
O Boticário Zaad Vision
Paris Corner Voux Zingy
Prada Luna Rossa Sport
Prada Amber Pour Homme
Prada L'Homme
Prada L'Homme Intense
Rabanne 1 Million Parfum
Rabanne Black XS 2018
Rabanne Invictus Legend
Rabanne Invictus Parfum
Ralph Lauren Polo 67
Ralph Lauren Polo Black
Ralph Lauren Polo Cologne Intense Eau de Parfum
Rasasi Hawas Black
Reyane Tradition Insurrection II Wild
Rochas Moustache Eau de Parfum
Sapientiae Niche Above All
Sapientiae Niche Bergalicius
Sapientiae Niche Bólido
Sapientiae Niche Cocoventura
Sapientiae Niche Etéreo
Sapientiae Niche FOG
Sapientiae Niche In The Green
Sapientiae Niche Lemonice
Sapientiae Niche Mary O.
Sapientiae Niche Vetiver de Noir
Tommy Hilfiger Tommy
Versace Eros Energy
Versace The Dreamer
Versace Versace Pour Homme
Victorinox Swiss Army
Viktor&Rolf Spicebomb Extreme
Yves Saint Laurent L'Homme
Yves Saint Laurent L'Homme Ultime
Yves Saint Laurent La Nuit de l'Homme
Yves Saint Laurent MYSLF Eau de Parfum
Yves Saint Laurent Y
Lattafa Qaa'ed
French Avenue Liquid Brun Limited Edition
Hugo Boss Boss Bottled Elixir
Loewe Solo Loewe
Ralph Lauren Polo Blue`;

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const store = {
  get(k,d){try{return JSON.parse(localStorage.getItem(k)) ?? d}catch{return d}},
  set(k,v){localStorage.setItem(k,JSON.stringify(v))}
};

let factualDb = null;
try {
  fetch('./assinatura/database.json').then(r => r.json()).then(data => { factualDb = data; }).catch(() => {});
} catch(_) {}

function findFactualProfile(name) {
  if (!factualDb || !name) return null;
  const q = name.toLowerCase().normalize('NFD').replace(/[^a-z0-9 ]/g, '');
  return Object.values(factualDb).find(p => {
    const full = (p.brand + ' ' + p.name).toLowerCase().normalize('NFD').replace(/[^a-z0-9 ]/g, '');
    return full.includes(q) || q.includes(p.name.toLowerCase().normalize('NFD').replace(/[^a-z0-9 ]/g, ''));
  }) || null;
}

function infer(name){
  const factual = findFactualProfile(name);
  if (factual) {
    const fam = (factual.family || '').toLowerCase().normalize('NFD').replace(/[^a-z0-9 ]/g, '');
    let family = 'amadeirado';
    if (/citrico/.test(fam)) family = 'citrico';
    else if (/aquatico|marinho/.test(fam)) family = 'aquatico';
    else if (/aromatico|foug/.test(fam)) family = 'aromatico';
    else if (/amadeirado/.test(fam)) family = 'amadeirado';
    else if (/especiado/.test(fam)) family = 'especiado';
    else if (/couro/.test(fam)) family = 'couro';
    else if (/tabaco/.test(fam)) family = 'tabaco';
    else if (/gourmand|doce|baunilha/.test(fam)) family = 'gourmand';
    else if (/oriental|ambar/.test(fam)) family = 'ambarado';
    else if (/vetiver/.test(fam)) family = 'vetiver';
    else if (/fresco|floral/.test(fam)) family = 'fresco';

    const intensity = Math.min(4, Math.max(1, factual.intensity || 2));
    const fresh = ['citrico', 'aquatico', 'fresco', 'aromatico'].includes(family);
    const warm = !fresh;
    const moods = fresh?['energizado','leve','calmo']: family==='gourmand'||family==='tabaco'?['sedutor','confortavel','confiante']: family==='vetiver'||family==='couro'?['misterioso','confiante','elegante']:['elegante','confiante','equilibrado'];
    return {family,intensity,warm,fresh,moods,factualVerified:true,active:true,favorite:false,uses:0,lastUsed:null};
  }

  const n=name.toLowerCase(); let family='amadeirado', intensity=2, warm=true, fresh=false;
  if(/aqua|aquatica|cool water|light blue|ocean|ultra blue|polo blue|invictus|hawas|atlas/.test(n)){family='aquatico';fresh=true;warm=false}
  if(/verbena|bergamota|mandarin|limão|lemon|cedrat|citadel|eau sauvage|4711|happy|eros energy|zingy/.test(n)){family='citrico';fresh=true;warm=false}
  if(/menta|alecrim|h24|white|tommy|swiss army|pour homme|starwalker|ck one|effervescent/.test(n)){family='fresco';fresh=true;warm=false}
  if(/vetiver|terre|encre noire|molecule 03/.test(n)){family='vetiver';intensity=3}
  if(/tobacco|spicebomb|wanted by night|man in black|qaa'ed/.test(n)){family='tabaco';intensity=4}
  if(/leather|carbon|obsidian/.test(n)){family='couro';intensity=3}
  if(/vanilla|espresso|tonka|club black|stronger with you|pi|liquid brun|kingdom/.test(n)){family='gourmand';intensity=4}
  if(/most wanted|1 million|black xs|moustache|absolu|elixir|intense|parfum|red tobacco/.test(n)) intensity=Math.max(intensity,3);
  if(/prada l'homme|prada amber|myslf|boss bottled infinite|chic for men|dolce&gabbana pour homme/.test(n)){family='aromatico';intensity=2;fresh=true;warm=false}
  const moods = fresh?['energizado','leve','calmo']: family==='gourmand'||family==='tabaco'?['sedutor','confortavel','confiante']: family==='vetiver'||family==='couro'?['misterioso','confiante','elegante']:['elegante','confiante','equilibrado'];
  return {family,intensity,warm,fresh,moods,active:true,favorite:false,uses:0,lastUsed:null};
}

let perfumes=store.get('perfumes',null);
if(!perfumes){perfumes=RAW_NAMES.split('\n').filter(Boolean).map((name,i)=>({id:crypto.randomUUID?.()||String(i),name,...infer(name)}));store.set('perfumes',perfumes)}
let history=store.get('history',[]), weather=store.get('weather',{temp:null,humidity:null,code:null,label:'Clima não carregado'}), answers={}, ranked=[], currentIndex=0, editId=null;

const questions=[
 {key:'occasion',title:'Onde você vai usar o perfume?',help:'A ocasião define o nível de formalidade e presença.',opts:[['trabalho','Trabalho'],['faculdade','Faculdade'],['encontro','Encontro'],['festa','Festa ou bar'],['passeio','Passeio'],['praia','Praia'],['formal','Evento formal'],['casa','Ficar em casa']]},
 {key:'currentMood',title:'Como você está se sentindo agora?',help:'Isso ajuda a escolher algo que acolha ou equilibre seu momento.',opts:[['cansado','Cansado'],['ansioso','Ansioso ou sobrecarregado'],['animado','Animado'],['confiante','Confiante'],['neutro','Normal ou neutro'],['desanimado','Desanimado'],['sensivel','Mais sensível']]},
 {key:'goalMood',title:'Como você quer se sentir?',help:'O perfume pode acompanhar seu humor ou ajudar a transformá-lo.',opts:[['energizado','Energizado'],['calmo','Calmo'],['confiante','Confiante'],['sedutor','Sedutor'],['elegante','Elegante'],['confortavel','Confortável'],['misterioso','Misterioso'],['leve','Leve e refrescado']]},
 {key:'energy',title:'Como está sua energia hoje?',help:'Uma fragrância pode estimular, equilibrar ou respeitar sua energia.',opts:[[1,'Muito baixa'],[2,'Baixa'],[3,'Média'],[4,'Alta'],[5,'Muito alta']]},
 {key:'presence',title:'Que presença você quer ter?',help:'Isso ajusta projeção e intensidade.',opts:[[1,'Bem discreta'],[2,'Moderada'],[3,'Marcante'],[4,'Quero chamar atenção']]},
 {key:'duration',title:'Quanto tempo precisa durar?',help:'Usaremos a intensidade como estimativa inicial.',opts:[[1,'Até 4 horas'],[2,'Meio período'],[3,'Dia inteiro'],[4,'Dia e noite']]},
 {key:'family',title:'Tem alguma preferência olfativa hoje?',help:'Você também pode deixar o aplicativo decidir.',opts:[['surpresa','Surpreenda-me'],['fresco','Fresco'],['citrico','Cítrico'],['aquatico','Aquático'],['aromatico','Aromático'],['amadeirado','Amadeirado'],['vetiver','Vetiver'],['especiado','Especiado'],['doce','Doce'],['gourmand','Gourmand'],['couro','Couro'],['tabaco','Tabaco']]}
];
let step=0;

function showView(id){$$('.view').forEach(v=>v.classList.remove('active'));$('#'+id).classList.add('active');window.scrollTo(0,0);if(id==='collectionView')renderCollection();if(id==='historyView')renderHistory()}
$$('[data-view]').forEach(b=>b.onclick=()=>showView(b.dataset.view));

function updateCounts(){ $('#collectionCount').textContent=`${perfumes.length} perfumes`; $('#historyCount').textContent=`${history.length} usos`; }
function renderWeather(){ $('#weatherPill').textContent=weather.label; }
async function loadWeather(){
  if(!navigator.geolocation){renderWeather();return}
  navigator.geolocation.getCurrentPosition(async p=>{
    try{const {latitude,longitude}=p.coords; const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`);const d=await r.json();weather={temp:d.current.temperature_2m,humidity:d.current.relative_humidity_2m,code:d.current.weather_code,label:`${Math.round(d.current.temperature_2m)}°C • ${d.current.relative_humidity_2m}% umidade`};store.set('weather',weather);renderWeather()}catch{renderWeather()}
  },()=>renderWeather(),{timeout:6000});
}

function startQuiz(){answers={};step=0;showView('quizView');renderQuestion()}
function renderQuestion(){const q=questions[step];$('#stepLabel').textContent=`PERGUNTA ${step+1} DE ${questions.length}`;$('#questionTitle').textContent=q.title;$('#questionHelp').textContent=q.help;$('#progressBar').style.width=`${((step+1)/questions.length)*100}%`;$('#options').innerHTML=q.opts.map(([v,l])=>`<button class="option ${answers[q.key]==v?'selected':''}" data-value="${v}">${l}</button>`).join('');$$('.option').forEach(o=>o.onclick=()=>{answers[q.key]=isNaN(o.dataset.value)?o.dataset.value:Number(o.dataset.value);renderQuestion()});$('#prevBtn').style.visibility=step?'visible':'hidden';$('#nextBtn').textContent=step===questions.length-1?'Ver recomendação':'Continuar'}
$('#startBtn').onclick=startQuiz;$('#quizBack').onclick=()=>showView('homeView');$('#prevBtn').onclick=()=>{if(step){step--;renderQuestion()}};$('#nextBtn').onclick=()=>{const q=questions[step];if(answers[q.key]===undefined){alert('Escolha uma opção para continuar.');return}if(step<questions.length-1){step++;renderQuestion()}else recommend()};

function scorePerfume(p){let s=0,reasons=[];const temp=weather.temp;
  if(temp!=null){if(temp>=27){if(p.fresh){s+=24;reasons.push('combina com o calor')}else s-=18*p.intensity}else if(temp<=19){if(p.warm||p.intensity>=3){s+=18;reasons.push('funciona bem no clima fresco')}else s+=4}else{s+=12}}
  const occ=answers.occasion;
  if(['trabalho','faculdade'].includes(occ)){s+=(5-p.intensity)*7;if(['fresco','aromatico','citrico','vetiver','amadeirado'].includes(p.family))s+=12}
  if(['encontro','festa'].includes(occ)){s+=p.intensity*6;if(['gourmand','tabaco','doce','couro','ambarado'].includes(p.family))s+=14}
  if(occ==='praia'){s+=p.fresh?25:-20}
  if(occ==='formal'){s+=['amadeirado','vetiver','couro','aromatico'].includes(p.family)?18:0}
  if(p.moods.includes(answers.goalMood)){s+=20;reasons.push(`favorece uma sensação ${answers.goalMood}`)}
  if(answers.currentMood==='cansado'&&p.fresh)s+=12;
  if(answers.currentMood==='ansioso'&&p.intensity<=2)s+=12;
  if(answers.currentMood==='sensivel'&&p.intensity>=4)s-=18;
  s-=Math.abs((answers.presence||2)-p.intensity)*9;
  s-=Math.abs((answers.duration||2)-p.intensity)*4;
  if(answers.family&&answers.family!=='surpresa')s+=answers.family===p.family?22:-3;
  if(p.favorite)s+=5;
  if(p.lastUsed){const days=(Date.now()-new Date(p.lastUsed))/864e5;if(days<3)s-=24;else if(days>30)s+=7}
  s+=Math.random()*4;
  return {p,score:s,reasons};
}
function recommend(opts={}){ranked=perfumes.filter(p=>p.active).map(scorePerfume).sort((a,b)=>b.score-a.score);if(opts.forgotten)ranked.sort((a,b)=>(new Date(a.p.lastUsed||0))-(new Date(b.p.lastUsed||0)));if(opts.favorite)ranked=ranked.filter(x=>x.p.favorite);currentIndex=0;renderResult();showView('resultView')}
function renderResult(){const item=ranked[currentIndex]||ranked[0];if(!item){alert('Nenhum perfume disponível.');return}const {p,score,reasons}=item;const sprays=Math.max(2,7-p.intensity-(weather.temp>=27?1:0));$('#mainResult').innerHTML=`<div class="result-card"><div class="eyebrow">ESCOLHA PRINCIPAL</div><h2>${p.name}</h2><p class="reason">${reasons.length?`Escolhido porque ${reasons.slice(0,2).join(' e ')}.`:'Foi a opção mais equilibrada para suas respostas de hoje.'}</p><div class="score-row"><span class="score-chip">${labelFamily(p.family)}</span><span class="score-chip">Intensidade ${p.intensity}/4</span><span class="score-chip">Sugestão: ${sprays} borrifadas</span></div></div>`;$('#alternatives').innerHTML=ranked.slice(currentIndex+1,currentIndex+4).map(x=>`<div class="alternative"><strong>${x.p.name}</strong><small>${labelFamily(x.p.family)} • intensidade ${x.p.intensity}/4</small></div>`).join('');$('#wearBtn').dataset.id=p.id}
function labelFamily(f){return ({fresco:'Fresco',citrico:'Cítrico',aquatico:'Aquático',aromatico:'Aromático',amadeirado:'Amadeirado',especiado:'Especiado',doce:'Doce',gourmand:'Gourmand',couro:'Couro',tabaco:'Tabaco',vetiver:'Vetiver',ambarado:'Âmbar'})[f]||f}
$('#anotherBtn').onclick=()=>{currentIndex=(currentIndex+1)%Math.max(1,ranked.length-3);renderResult()};$('#restartBtn').onclick=startQuiz;$('#wearBtn').onclick=()=>{const p=perfumes.find(x=>x.id===$('#wearBtn').dataset.id);p.uses++;p.lastUsed=new Date().toISOString();history.unshift({id:crypto.randomUUID?.()||String(Date.now()),perfumeId:p.id,name:p.name,date:p.lastUsed,weather:weather.label,occasion:answers.occasion||'sugestão rápida'});store.set('perfumes',perfumes);store.set('history',history);updateCounts();alert(`${p.name} registrado no histórico.`);showView('homeView')};

$('#quickBtn').onclick=()=>{answers={occasion:'passeio',currentMood:'neutro',goalMood:'equilibrado',presence:2,duration:2,family:'surpresa'};recommend()};$('#surpriseBtn').onclick=()=>{answers={occasion:'passeio',currentMood:'neutro',goalMood:'equilibrado',presence:2,duration:2,family:'surpresa'};recommend()};$('#forgottenBtn').onclick=()=>{answers={occasion:'passeio',currentMood:'neutro',goalMood:'equilibrado',presence:2,duration:2,family:'surpresa'};recommend({forgotten:true})};$('#favoritesBtn').onclick=()=>{answers={occasion:'passeio',currentMood:'neutro',goalMood:'equilibrado',presence:2,duration:2,family:'surpresa'};recommend({favorite:true})};

let filter='all';function renderCollection(){const q=$('#searchInput').value.toLowerCase();let arr=perfumes.filter(p=>p.name.toLowerCase().includes(q));if(filter==='favorite')arr=arr.filter(p=>p.favorite);if(filter==='active')arr=arr.filter(p=>p.active);if(filter==='hidden')arr=arr.filter(p=>!p.active);$('#collectionList').innerHTML=arr.length?arr.map(p=>`<div class="list-item"><div><strong>${p.name}</strong><div class="meta">${labelFamily(p.family)} • intensidade ${p.intensity}/4 • ${p.uses} uso(s)</div></div><div class="list-actions"><button class="mini fav" data-id="${p.id}">${p.favorite?'★':'☆'}</button><button class="mini edit" data-id="${p.id}">Editar</button><button class="mini danger del" data-id="${p.id}" title="Excluir">✕</button></div></div>`).join(''):'<div class="empty">Nenhum perfume encontrado.</div>';$$('.fav').forEach(b=>b.onclick=()=>{const p=perfumes.find(x=>x.id===b.dataset.id);p.favorite=!p.favorite;savePerfumes();renderCollection()});$$('.edit').forEach(b=>b.onclick=()=>openDialog(b.dataset.id));$$('.del').forEach(b=>b.onclick=()=>{const p=perfumes.find(x=>x.id===b.dataset.id);if(confirm(`Remover "${p.name}" da coleção?`)){perfumes=perfumes.filter(x=>x.id!==b.dataset.id);savePerfumes();renderCollection();}})}
$('#searchInput').oninput=renderCollection;$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;renderCollection()});
function openDialog(id=null){editId=id;const p=id?perfumes.find(x=>x.id===id):{name:'',family:'fresco',intensity:2,favorite:false,active:true};$('#dialogTitle').textContent=id?'Editar perfume':'Adicionar perfume';$('#perfumeName').value=p.name;$('#perfumeFamily').value=p.family;$('#perfumeIntensity').value=p.intensity;$('#perfumeFavorite').checked=p.favorite;$('#perfumeActive').checked=p.active;$('#perfumeName').oninput=()=>{if(!editId){const inf=infer($('#perfumeName').value);if(inf&&inf.factualVerified){$('#perfumeFamily').value=inf.family;$('#perfumeIntensity').value=String(inf.intensity);}}};$('#perfumeDialog').showModal()}
$('#addPerfumeBtn').onclick=()=>openDialog();$('#perfumeForm').onsubmit=e=>{e.preventDefault();const data={name:$('#perfumeName').value.trim(),family:$('#perfumeFamily').value,intensity:Number($('#perfumeIntensity').value),favorite:$('#perfumeFavorite').checked,active:$('#perfumeActive').checked};if(editId){Object.assign(perfumes.find(x=>x.id===editId),data)}else{perfumes.push({id:crypto.randomUUID?.()||String(Date.now()),...infer(data.name),...data,uses:0,lastUsed:null})}savePerfumes();$('#perfumeDialog').close();renderCollection()};function savePerfumes(){store.set('perfumes',perfumes);updateCounts()}
function renderHistory(){$('#historyList').innerHTML=history.length?history.map(h=>`<div class="list-item"><div><strong>${h.name}</strong><div class="meta">${new Date(h.date).toLocaleString('pt-BR')} • ${h.occasion||''}<br>${h.weather||''}</div></div></div>`).join(''):'<div class="empty">Você ainda não registrou nenhum uso.</div>'}
$('#clearHistoryBtn').onclick=()=>{if(confirm('Apagar todo o histórico?')){history=[];store.set('history',history);renderHistory();updateCounts()}};
$('#settingsBtn').onclick=()=>alert('Configurações avançadas entrarão na próxima versão. Seus dados já ficam salvos neste aparelho.');

if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});updateCounts();renderWeather();loadWeather();
