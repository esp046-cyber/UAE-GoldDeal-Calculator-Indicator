(function(){
var OZ=31.1034768,K=[['24K',1],['22K',.916],['21K',.875],['18K',.75],['14K',.585]],W=[1,5,10,20,31.1,50,100,1000];
var $=function(i){return document.getElementById(i)};
var fmt=function(n,d){return isFinite(n)?n.toLocaleString('en-AE',{minimumFractionDigits:d==null?2:d,maximumFractionDigits:d==null?2:d}):'—'};
var P=function(k){for(var i=0;i<K.length;i++)if(K[i][0]===k)return K[i][1]};
var cur='24K',last={};
K.forEach(function(k){var o=document.createElement('option');o.value=k[0];o.textContent=k[0]+' ('+(k[1]*100).toFixed(1)+'%)';$('k').appendChild(o)});
W.forEach(function(g){var b=document.createElement('button');b.className='chip'+(g===1?' on':'');b.dataset.g=g;b.textContent=g===31.1?'31.1g (1 oz)':g===1000?'1 kg':g+'g';$('wc').appendChild(b)});
function V(id){return parseFloat($(id).value)||0}
function verdict(s){
 if(s<=0.5)return['STRONG BUY','var(--ok)','Retail is at or near global spot. This is an unusually tight price.'];
 if(s<=1.75)return['GOOD BUY','var(--good)','This is a normal UAE retail premium for bars and coins.'];
 if(s<=3.5)return['NEGOTIATE','var(--warn)','The dealer markup is high. Ask for a lower premium or making charge.'];
 return['OVERPRICED / SELL','var(--bad)','The premium is too high for investment buying. It may be a good time to sell gold you already hold.']}
function calc(){
 var usd=V('usd'),fx=V('fx'),rp=V('rp'),g=V('w'),mc=V('mc')/100,vat=$('vat').checked?.05:0,p=P(cur);
 var spot24=usd/OZ*fx,spot=spot24*p,sp=rp-spot,pct=spot?sp/spot*100:0,v=verdict(pct);
 var st=$('status');st.textContent=v[0];st.style.color=v[1];$('arc').style.color=v[1];
 $('arc').setAttribute('stroke-dasharray',(Math.max(0,Math.min(pct/5,1))*251.3)+' 252');
 $('gp').textContent=fmt(pct)+'%';
 $('spot').textContent=fmt(spot);$('ret').textContent=fmt(rp);
 $('why').textContent=v[2]+' The difference is AED '+fmt(sp)+' per gram, or AED '+fmt(sp*g)+' for '+fmt(g,g%1?1:0)+' g.';
 var rows='',r24=p?rp/p:0;
 K.forEach(function(k){var s=spot24*k[1],r=r24*k[1],d=r-s;rows+='<tr><td>'+k[0]+'</td><td>'+(k[1]*100).toFixed(1)+'%</td><td>'+fmt(s)+'</td><td>'+fmt(r)+'</td><td>'+fmt(d)+' ('+fmt(s?d/s*100:0,1)+'%)</td></tr>'});
 $('tb').innerHTML=rows;
 var sv=spot*g,base=rp*g,mk=base*mc,vt=(base+mk)*vat,tot=base+mk+vt,be=g&&p&&fx?tot/(g*p)*OZ/fx:0;
 last={usd:usd,fx:fx,k:cur,rp:rp,g:g,pct:pct,v:v[0],tot:tot};
 $('est').innerHTML=[['Total spot value','AED '+fmt(sv)],['Retail price','AED '+fmt(base)],['Making charge','AED '+fmt(mk)],['VAT','AED '+fmt(vt)],['Total retail cost','AED '+fmt(tot)],['Total dealer markup','AED '+fmt(tot-sv)],['Break-even gold price','USD '+fmt(be)+' / oz']].map(function(a){return'<div class="kv"><span>'+a[0]+'</span><b>'+a[1]+'</b></div>'}).join('');
}
document.addEventListener('click',function(e){
 var t=e.target;
 if(t.dataset.s){var i=$(t.dataset.s);i.value=(V(t.dataset.s)+parseFloat(t.dataset.d)).toFixed(t.dataset.s==='fx'?4:2);calc()}
 if(t.dataset.fx){$('fx').value=t.dataset.fx;[].forEach.call(document.querySelectorAll('[data-fx]'),function(c){c.classList.toggle('on',c===t)});calc()}
 if(t.dataset.g){$('w').value=t.dataset.g;[].forEach.call(document.querySelectorAll('[data-g]'),function(c){c.classList.toggle('on',c===t)});calc()}
});
['usd','fx','rp','w','mc','vat'].forEach(function(id){$(id).addEventListener('input',calc)});
$('k').addEventListener('change',function(){var o=P(cur),n=P(this.value);$('rp').value=(V('rp')/o*n).toFixed(2);cur=this.value;calc()});

/* History (localStorage, guarded) */
function load(){try{return JSON.parse(localStorage.getItem('gd-hist')||'[]')}catch(e){return[]}}
function store(a){try{localStorage.setItem('gd-hist',JSON.stringify(a))}catch(e){}}
var mem=load();
function renderH(){
 $('hist').innerHTML=mem.length?mem.map(function(h,i){return'<li><span>'+h.d+' · '+h.k+' · '+fmt(h.g,h.g%1?1:0)+'g<br><small style="color:var(--mut)">$'+fmt(h.usd)+'/oz · AED '+fmt(h.rp)+'/g · '+h.v+' ('+fmt(h.pct)+'%)</small></span><button data-del="'+i+'" aria-label="Delete snapshot">Delete</button></li>'}).join(''):'<li style="color:var(--mut)">No snapshots yet. Save one to compare prices later, even offline.</li>';
 $('clr').hidden=!mem.length}
$('save').onclick=function(){var d=new Date();last.d=d.toLocaleDateString('en-GB')+' '+d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});mem.unshift(JSON.parse(JSON.stringify(last)));mem=mem.slice(0,30);store(mem);renderH()};
$('hist').addEventListener('click',function(e){if(e.target.dataset.del){mem.splice(+e.target.dataset.del,1);store(mem);renderH()}});
$('clr').onclick=function(){mem=[];store(mem);renderH()};

/* PWA: install prompt, online badge */
var dp;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;$('install').hidden=false});
$('install').onclick=function(){if(dp){dp.prompt();dp=null;$('install').hidden=true}};
function net(){var n=$('net');n.textContent=navigator.onLine?'Online':'Offline';n.classList.toggle('on',navigator.onLine)}
window.addEventListener('online',net);window.addEventListener('offline',net);net();
try{if('serviceWorker'in navigator&&location.protocol==='https:')navigator.serviceWorker.register('service-worker.js').catch(function(){})}catch(e){}
calc();renderH();
})();
