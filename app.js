/* 10 Years of Us — site code. Personal content lives in content.js. */
(() => {
'use strict';
const C = window.CONTENT || {};
const M = C.meta || {};
const START = new Date(M.startDate || '2016-10-10T00:00:00+05:30').getTime();
const UNLOCK = new Date(M.unlockAt || '2026-10-10T00:00:00+05:30').getTime();
const SALT = '10.10.2016|always-us|';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = matchMedia('(max-width: 700px)').matches;
const HEART = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
const heartSvg = (cls='') => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="${HEART}"/></svg>`;

/* ---------- helpers ---------- */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad = n => String(n).padStart(2, '0');
const fmt = n => Math.round(n).toLocaleString('en-US');
const store = {
  get(k, d){ try { const v = localStorage.getItem('tyou.'+k); return v == null ? d : JSON.parse(v); } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem('tyou.'+k, JSON.stringify(v)); } catch(e){} },
  del(k){ try { localStorage.removeItem('tyou.'+k); } catch(e){} }
};
const sess = {
  get(k){ try { return sessionStorage.getItem('tyou.'+k); } catch(e){ return null; } },
  set(k, v){ try { sessionStorage.setItem('tyou.'+k, v); } catch(e){} },
  del(k){ try { sessionStorage.removeItem('tyou.'+k); } catch(e){} }
};
let toastT;
function toast(msg, ms=3200){ const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), ms); }

/* dreamy placeholder for photos not added yet */
const PAL = [['#f6dde1','#e9e1f5'],['#efe1ca','#f6d8de'],['#e6ddf3','#fbecee'],['#f3d2d9','#efe1ca'],['#ece2f1','#f8e4da']];
const phCache = {};
function ph(seed=0, w=800, h=1000, label='add a photo'){
  const key = seed+'|'+w+'|'+h+'|'+label; if (phCache[key]) return phCache[key];
  const [a,b] = PAL[seed % PAL.length];
  const r = n => (Math.sin(seed*91.7 + n*12.9) + 1) / 2;
  const s = (Math.min(w,h) * 0.09) / 24;
  const hx = w/2 - 12*s, hy = h/2 - 16*s;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient><filter id='f' x='-50%' y='-50%' width='200%' height='200%'><feGaussianBlur stdDeviation='${Math.round(w/12)}'/></filter></defs><rect width='100%' height='100%' fill='url(#g)'/><g filter='url(#f)' opacity='.9'><circle cx='${(r(1)*w)|0}' cy='${(r(2)*h)|0}' r='${(w*.3)|0}' fill='#fff'/><circle cx='${(r(3)*w)|0}' cy='${(r(4)*h)|0}' r='${(w*.24)|0}' fill='${b}'/><circle cx='${(r(5)*w)|0}' cy='${(r(6)*h)|0}' r='${(w*.2)|0}' fill='#f2c7d0'/></g><path transform='translate(${hx.toFixed(1)} ${hy.toFixed(1)}) scale(${s.toFixed(3)})' d='${HEART}' fill='none' stroke='#fff' stroke-width='${(1.4).toFixed(2)}' opacity='.95'/><text x='50%' y='${(h/2 + 18*s + Math.min(w,h)*0.06)|0}' text-anchor='middle' font-family='-apple-system,Helvetica,Arial,sans-serif' font-size='${Math.round(Math.min(w,h)/28)}' letter-spacing='${Math.round(Math.min(w,h)/110)}' fill='#fff' opacity='.95'>${label.toUpperCase()}</text></svg>`;
  return (phCache[key] = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
}
const img = (src, seed, w, h, alt, cls='', label) => `<img src="${esc(src || ph(seed, w, h, label))}" data-ph="${seed},${w},${h}" alt="${esc(alt)}" loading="lazy" decoding="async" width="${w}" height="${h}" ${cls ? `class="${cls}"` : ''}>`;
const photo = (src, alt, cls='', eager=false) => `<img src="${esc(src)}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}>`;
document.addEventListener('error', e => {
  const t = e.target;
  if (t.tagName === 'IMG' && t.dataset.ph && !t.dataset.fb){ t.dataset.fb = 1; const [s,w,h] = t.dataset.ph.split(',').map(Number); t.src = ph(s,w,h); }
}, true);

/* ---------- SHA-256 (passcode check; only the hash lives in the code) ---------- */
function sha256Fallback(str){
  const ascii = unescape(encodeURIComponent(str));
  const rr = (v,a) => (v>>>a)|(v<<(32-a));
  const maxWord = 2**32; let result = ''; const words = []; const bitLen = ascii.length*8;
  let hash = [], k = [], pc = 0; const comp = {};
  for (let c = 2; pc < 64; c++){ if (!comp[c]){ for (let i = 0; i < 313; i += c) comp[i] = c; hash[pc] = (c**.5*maxWord)|0; k[pc++] = (c**(1/3)*maxWord)|0; } }
  let s = ascii + '\x80'; while (s.length % 64 - 56) s += '\x00';
  for (let i = 0; i < s.length; i++){ const j = s.charCodeAt(i); words[i>>2] |= j << ((3-i)%4)*8; }
  words[words.length] = (bitLen/maxWord)|0; words[words.length] = bitLen;
  for (let j = 0; j < words.length;){
    const w = words.slice(j, j += 16), old = hash; hash = hash.slice(0, 8);
    for (let i = 0; i < 64; i++){
      const w15 = w[i-15], w2 = w[i-2], a = hash[0], e = hash[4];
      const t1 = hash[7] + (rr(e,6)^rr(e,11)^rr(e,25)) + ((e&hash[5])^((~e)&hash[6])) + k[i] +
        (w[i] = (i < 16) ? w[i] : (w[i-16] + (rr(w15,7)^rr(w15,18)^(w15>>>3)) + w[i-7] + (rr(w2,17)^rr(w2,19)^(w2>>>10)))|0);
      const t2 = (rr(a,2)^rr(a,13)^rr(a,22)) + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
      hash = [(t1+t2)|0].concat(hash); hash[4] = (hash[4]+t1)|0;
    }
    for (let i = 0; i < 8; i++) hash[i] = (hash[i]+old[i])|0;
  }
  for (let i = 0; i < 8; i++) for (let j = 3; j + 1; j--){ const b = (hash[i]>>(j*8))&255; result += (b < 16 ? '0' : '') + b.toString(16); }
  return result;
}
async function sha256(str){
  try {
    if (crypto && crypto.subtle){
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
      return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
    }
  } catch(e){}
  return sha256Fallback(str);
}
window.__tyouHash = p => sha256(SALT + p);   // helper to make a new passcode hash (see README)

/* ---------- reliable time (device clock, cross-checked with a time server) ---------- */
let offset = 0;
const now = () => Date.now() + offset;
async function syncTime(){
  try {
    const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 4000);
    const t0 = Date.now();
    const r = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata', { cache:'no-store', signal: ctl.signal });
    clearTimeout(to);
    if (!r.ok) return;
    const j = await r.json(); const t1 = Date.now();
    const server = (j.unixtime * 1000) + (t1 - t0) / 2;
    const o = server - t1;
    if (Math.abs(o) > 20000 && Math.abs(o) < 7 * 864e5) offset = o;   // only correct a clock that is clearly wrong
  } catch(e){ /* offline or blocked: device clock is used */ }
}

/* ======================================================================
   GATE: countdown, dev access, unlock
   ====================================================================== */
const gate = $('#gate');
let cdTimer = null, simTarget = null, lastVals = {};
function startCountdown(sim){
  simTarget = sim || null;
  gate.hidden = false; gate.classList.remove('fade');
  document.body.classList.add('no-scroll');
  lastVals = {};
  startStars();
  tick();
  clearInterval(cdTimer); cdTimer = setInterval(tick, 250);
}
function setN(id, v){
  if (lastVals[id] === v) return; lastVals[id] = v;
  const el = $('#'+id); el.textContent = v;
  if (!reduce){ el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); }
}
function tick(){
  const ms = (simTarget ? simTarget - Date.now() : UNLOCK - now());
  if (ms <= 0){ clearInterval(cdTimer); cdTimer = null; setN('cdD','00'); setN('cdH','00'); setN('cdM','00'); setN('cdS','00'); unlock(); return; }
  const s = Math.floor(ms / 1000);
  setN('cdD', pad(Math.floor(s / 86400))); setN('cdH', pad(Math.floor(s % 86400 / 3600)));
  setN('cdM', pad(Math.floor(s % 3600 / 60))); setN('cdS', pad(s % 60));
}
let unlocking = false;
function unlock(){
  if (unlocking) return; unlocking = true;
  if (!built) buildSite();
  $('#site').hidden = false; $('#progress').hidden = false;
  playIntro(() => {
    gate.classList.add('fade');
    setTimeout(() => { gate.hidden = true; stopStars(); unlocking = false; }, 1400);
  });
}
function hideGate(){ clearInterval(cdTimer); cdTimer = null; gate.hidden = true; stopStars(); document.body.classList.remove('no-scroll'); }

/* starfield + the two of us */
let starRAF = null;
function startStars(){
  stopStars();
  const cv = $('#stars'), ctx = cv.getContext('2d');
  let W, H, dpr, stars = [], cx, cy;
  function size(){
    dpr = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W*dpr; cv.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    const n = Math.min(170, Math.round(W*H/7000));
    stars = Array.from({length:n}, () => ({ x:Math.random()*W, y:Math.random()*H, r:Math.random()*1.2+.2, p:Math.random()*6.28, s:.4+Math.random()*1.4 }));
    const hb = $('#cdHeart').getBoundingClientRect(); cx = hb.left + hb.width/2; cy = hb.top + hb.height/2;
  }
  size(); addEventListener('resize', size);
  cv._off = () => removeEventListener('resize', size);
  const t0 = performance.now();
  const trail = [[],[]];
  function frame(t){
    const e = (t - t0)/1000;
    ctx.clearRect(0,0,W,H);
    for (const s of stars){ const a = .25 + .55*(.5+.5*Math.sin(s.p + e*s.s)); ctx.fillStyle = `rgba(255,240,245,${a})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill(); }
    // two tiny lights circling the heart, drifting close then apart
    const R = 58 + 16*Math.sin(e*.35);
    const pts = [0, Math.PI].map(ph0 => { const a = e*.55 + ph0; return [cx + Math.cos(a)*R*1.25, cy + Math.sin(a)*R*.62]; });
    pts.forEach((p, i) => {
      trail[i].push(p); if (trail[i].length > 26) trail[i].shift();
      trail[i].forEach((q, j) => { ctx.fillStyle = `rgba(${i? '243,216,168':'243,167,184'},${(j/26)*.18})`; ctx.beginPath(); ctx.arc(q[0], q[1], 1.6, 0, 6.283); ctx.fill(); });
      const g = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 14);
      g.addColorStop(0, i ? 'rgba(255,236,205,1)' : 'rgba(255,214,225,1)'); g.addColorStop(.25, i ? 'rgba(243,216,168,.6)' : 'rgba(243,167,184,.6)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p[0], p[1], 14, 0, 6.283); ctx.fill();
    });
    starRAF = requestAnimationFrame(frame);
  }
  cancelAnimationFrame(starRAF);
  if (reduce){ frame(t0); cancelAnimationFrame(starRAF); } else starRAF = requestAnimationFrame(frame);
}
function stopStars(){ cancelAnimationFrame(starRAF); starRAF = null; const cv = $('#stars'); cv._off && cv._off(); }

/* the unlock moment */
function playIntro(done){
  const el = $('#intro'); const parts = [...el.children];
  el.hidden = false; el.classList.remove('fade','bright'); parts.forEach(p => p.classList.remove('on'));
  document.body.classList.add('no-scroll');
  if (M.herName) $('#introLove').textContent = `Happy 10th Anniversary, ${M.herName}. ❤️`;
  const steps = reduce ? [[0,0],[0,1],[0,2],[0,3],[0,4]] : [[300,0],[2100,1],[3700,2],[5300,3],[6800,4]];
  const timers = steps.map(([t,i]) => setTimeout(() => { parts[i].classList.add('on'); if (i === 1) el.classList.add('bright'); }, t));
  let finished = false;
  const finish = () => {
    if (finished) return; finished = true; timers.forEach(clearTimeout); clearTimeout(auto);
    parts.forEach(p => p.classList.add('on'));
    sess.set('intro', '1');
    done && done();
    setTimeout(() => { el.classList.add('fade'); document.body.classList.remove('no-scroll'); window.scrollTo(0, 0); }, 500);
    setTimeout(() => { el.hidden = true; }, 2200);
  };
  const auto = setTimeout(finish, reduce ? 2500 : 10500);
  el.onclick = () => { if (parts[1].classList.contains('on')) finish(); };
}

/* dev access */
function openDevSheet(){
  const sh = $('#devSheet'); sh.hidden = false; $('#devErr').textContent = ''; $('#devPass').value = '';
  setTimeout(() => $('#devPass').focus(), 60);
}
function closeDevSheet(){ $('#devSheet').hidden = true; clearHash(); }
function clearHash(){ try { history.replaceState(null, '', location.pathname + location.search); } catch(e){ try { location.hash = ''; } catch(_){} } }
$('#devCancel').addEventListener('click', closeDevSheet);
let tries = 0;
$('#devForm').addEventListener('submit', async e => {
  e.preventDefault();
  if (tries >= 8){ $('#devErr').textContent = 'Too many tries. Reload the page to try again.'; return; }
  const h = await sha256(SALT + $('#devPass').value);
  if (h === M.devPasscodeHash){
    sess.set('dev', '1'); $('#devSheet').hidden = true; clearHash();
    enterPreview();
  } else {
    tries++; $('#devErr').textContent = 'That passcode doesn’t match. Check it and try again.';
    $('#devPass').select();
  }
});
function enterPreview(){
  hideGate();
  if (!built) buildSite();
  $('#site').hidden = false; $('#progress').hidden = false;
  $('#devBar').hidden = false;
  toast('Preview open. The public link still shows the countdown.');
}
$('#devBar').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const a = b.dataset.dev;
  if (a === 'countdown'){
    if (!gate.hidden && !simTarget){ hideGate(); b.textContent = 'Countdown'; return; }
    startCountdown(); b.textContent = 'Back to site';
  }
  if (a === 'unlock'){ $('[data-dev="countdown"]').textContent = 'Countdown'; startCountdown(Date.now() + 6000); toast('Simulating the last 6 seconds…', 2400); }
  if (a === 'reset'){ ['answers','secrets','quizBest'].forEach(store.del); sess.del('intro'); toast('Answers, quiz and secrets reset. Reloading…', 1600); setTimeout(() => location.reload(), 1200); }
  if (a === 'exit'){ sess.del('dev'); location.reload(); }
});

/* ======================================================================
   THE SITE
   ====================================================================== */
let built = false;
function section(id, cls, inner){ return `<section id="${id}" class="sec ${cls}">${inner}</section>`; }
function head(eyebrow, title, lede, center=true){
  return `<header class="head ${center ? 'center' : ''}"><p class="eyebrow rv">${eyebrow}</p><h2 class="h2 rv" style="--d:.08s">${title}</h2>${lede ? `<p class="lede rv" style="--d:.16s">${lede}</p>` : ''}</header>`;
}

function buildHero(){
  const hearts = [[8,10,0],[88,18,1.6],[94,62,3.1],[2,58,4.4],[50,-4,2.3],[70,84,5.2]].map(([x,y,d]) => `<svg class="float-heart" style="--x:${x}%;--y:${y}%;--d:${d}s" viewBox="0 0 24 24" aria-hidden="true"><path d="${HEART}"/></svg>`).join('');
  const sp = [[12,20,0],[86,8,1.2],[96,44,2],[4,80,.6],[62,96,1.8],[30,4,2.6]].map(([x,y,d]) => `<i class="sparkle" style="--x:${x}%;--y:${y}%;--d:${d}s"></i>`).join('');
  return `<section class="hero" id="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="eyebrow rv">10.10.2016 — Forever</p>
        <h1 class="rv" style="--d:.1s">10 Years of <span class="nowrap">Us<button class="heart-btn" id="heartEgg" aria-label="A little heart">${heartSvg()}</button></span></h1>
        <p class="lede rv" style="--d:.2s">A little corner of the internet that belongs only to us.</p>
        <p class="script rv" style="--d:.3s">Happy 10th Anniversary, ${esc(M.herName || 'My Love')}.</p>
        <div class="hero-meta rv" style="--d:.4s"><span class="pill">10.10.2016 → 10.10.2026</span></div>
      </div>
      <figure class="hero-photo rv" style="--d:.25s">
        <div class="parallax" data-speed="-0.06">
          <div class="polaroid${C.hero?.caption ? '' : ' no-cap'}">${C.hero?.photo ? photo(C.hero.photo, 'Us', '', true) : img('', 0, 800, 1000, 'Us', '', 'our best photo')}${C.hero?.caption ? `<figcaption>${esc(C.hero.caption)}</figcaption>` : ''}</div>
        </div>
        ${hearts}${sp}
      </figure>
    </div>
    <a class="scroll-cue" href="#story">Scroll through our story <span>↓</span></a>
  </section>`;
}

function buildStory(){
  const items = (C.timeline || []).map((t, i) => {
    const media = t.video ? `<video src="${esc(t.video)}" controls playsinline preload="metadata" poster="${esc(t.photo || '')}"></video>` : t.photo ? photo(t.photo, t.title) : '';
    return `<article class="tl-item rv ${i % 2 ? 'r' : 'l'}">
      <span class="tl-dot" aria-hidden="true"></span>
      <div class="tl-card">
        ${media ? `<div class="tl-media${t.photo && !t.video ? ' fit' : ''}"${t.photo ? ` style="--bg:url('${esc(t.photo)}')"` : ''}>${media}</div>` : ''}
        <div class="tl-body">
          <p class="tl-date">${esc(t.date)}</p>
          <h3>${esc(t.title)}</h3>
          ${t.text ? `<p class="tl-text">${esc(t.text)}</p>` : ''}
          ${t.location ? `<p class="tl-loc">📍 ${esc(t.location)}</p>` : ''}
          ${t.quote ? `<blockquote>“${esc(t.quote)}”</blockquote>` : ''}
        </div>
      </div>
    </article>`;
  }).join('');
  return section('story', 'story', `<div class="wrap">
    ${head('Chapter one', 'Our Story', '')}
    <div class="tl" id="tl"><div class="tl-line" aria-hidden="true"><i></i></div>${items}</div>
  </div>`);
}

function buildGallery(){
  const g = C.gallery || [];
  const cut = Math.ceil(g.length * 0.6);
  const strip = g.slice(0, cut).map((p, i) => `<button class="polaroid" data-lb="${i}" style="--r:${[-3,2,-1.5,3,-2.5,1.5][i%6]}deg" aria-label="Open ${esc(p.title)}">${p.photo ? photo(p.photo, p.title, '', true) : img('', i+3, 700, 700, p.title)}<span class="cap">${esc(p.title)}</span></button>`).join('');
  const ratios = [[800,1000],[800,800],[800,600],[800,1060],[800,700]];
  const mas = g.slice(cut).map((p, k) => { const i = k + cut; const [w,h] = ratios[k % ratios.length];
    return `<button class="m-item rv" style="--d:${(k%3)*.08}s" data-lb="${i}" aria-label="Open ${esc(p.title)}">${p.photo ? photo(p.photo, p.title) : img('', i+5, w, h, p.title)}<span class="m-cap"><b>${esc(p.title)}</b>${p.date ? `<span>${esc(p.date)}</span>` : ''}</span></button>`; }).join('');
  const ba = C.beforeAfter || {};
  return section('gallery', 'gallery', `<div class="wrap">
    ${head('Memories', '10 Years. Thousands of Memories.', 'Tap any photo to step back into that day.')}
  </div>
  <div class="strip" id="strip">${strip}</div>
  <p class="strip-hint">← swipe →</p>
  <div class="wrap">
    <div class="masonry">${mas}</div>
    ${C.featured?.photo ? `<div class="featured rv">${photo(C.featured.photo, 'A favourite moment', 'pxl')}<p>${esc(C.featured.line || '')}</p></div>` : ''}
    ${ba.before?.photo && ba.after?.photo ? `<div class="ba rv">
      <p class="eyebrow">Then &amp; now</p>
      <div class="ba-frame" id="ba">
        ${photo(ba.after?.photo, 'Now')}
        ${photo(ba.before?.photo, 'Then', 'before')}
        <span class="ba-handle" aria-hidden="true"></span>
        <span class="ba-tag l">${esc(ba.before?.label || 'Then')}</span><span class="ba-tag r">${esc(ba.after?.label || 'Now')}</span>
        <input type="range" class="ba-range" id="baRange" min="0" max="100" value="50" aria-label="Slide between then and now">
      </div>
      <p class="ba-cap">${esc(ba.caption || '')}</p>
    </div>` : ''}
  </div>`);
}

function buildLetter(){
  const L = C.letter || {};
  return section('letter', 'letter-sec', `<div class="wrap">
    ${head('For your eyes only', 'A Letter For You', '')}
    <article class="paper rv">
      <p class="greet">${esc(L.greeting)}</p>
      ${(L.paragraphs || []).map(p => `<p class="lp rv">${esc(p)}</p>`).join('')}
      <p class="closing rv">${esc(L.closing)}</p>
      <p class="sign rv">${esc(L.signoff)}<b>${esc(M.signature || '')}</b></p>
    </article>
    <p class="letter-inf rv">10.10.2016 → <span>∞</span></p>
  </div>`);
}

function buildPoems(){
  const cards = (C.poems || []).map((p, i) => `<article class="poem glass rv" style="--d:${(i%3)*.1}s"><p class="num">POEM ${pad(i+1)}</p><h3>${esc(p.title)}</h3><div class="lines">${p.lines.map((l, j) => `<span style="--i:${j}">${esc(l)}</span>`).join('')}</div></article>`).join('');
  return section('poems', 'poems', `<div class="wrap">${head('Poems', 'Words I Couldn’t Say Enough', 'Written slowly, one line at a time, the way I fell for you.')}<div class="poem-grid">${cards}</div></div>`);
}

function buildQuiz(){
  return section('quiz', 'quiz', `<div class="wrap">${head('A little game', 'How Well Do You Know Us?', 'No pressure. Okay, a little pressure.')}
    <div class="quiz-card glass rv" id="quizCard"></div>
    <svg width="0" height="0" style="position:absolute"><defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c98192"/><stop offset="1" stop-color="#8a79b0"/></linearGradient></defs></svg>
  </div>`);
}

function buildQA(){
  return section('questions', 'qa', `<div class="wrap">${head('Just between us', 'Questions I’ve Always Wanted To Ask You', 'One at a time. Take as long as you like. Your answers stay on your phone until you choose to send them.')}
    <div class="chat glass rv">
      <div class="chat-head"><span class="avatar">💌</span><b>${esc(M.signature || 'Me')}</b><span>always here</span></div>
      <div class="thread" id="thread" aria-live="polite"></div>
      <form class="composer" id="composer">
        <label for="qaInput" class="sr" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Your answer</label>
        <textarea id="qaInput" rows="1" placeholder="Type your answer…"></textarea>
        <button class="send" id="qaSend" type="submit" aria-label="Send answer" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
      </form>
    </div>
    <div class="qa-actions" id="qaActions" hidden>
      <a class="btn btn-primary" id="qaWa" target="_blank" rel="noopener">Send my answers to you</a>
      <button class="btn btn-ghost" id="qaCopy" type="button">Copy answers</button>
      <button class="btn btn-ghost" id="qaRedo" type="button">Answer again</button>
    </div>
  </div>`);
}

function buildReasons(){
  const cards = (C.reasons || []).map((r, i) => `<button class="r-card rv" style="--d:${(i%5)*.06}s" aria-label="Reason ${i+1}: ${esc(r.title)}. Tap to reveal.">
    <span class="r-inner"><span class="r-face r-front"><span class="n">${pad(i+1)}</span><span><span class="h3">${esc(r.title)}</span><small>tap to open</small></span></span>
    <span class="r-face r-back"><span class="rb">${esc(r.text)}</span><span>${pad(i+1)}</span></span></span></button>`).join('');
  return section('reasons', 'reasons', `<div class="wrap">${head('Ten of a thousand', '10 Things I Love About You', 'One for every year. I could have made it ten thousand.')}<div class="r-grid" id="rGrid">${cards}</div></div>`);
}

function buildNumbers(){
  const ms = Math.max(0, now() - START);
  const d = calDiff(START, now());
  const items = [[d.y, 'Years', 0], [ms/864e5, 'Days', 1], [ms/36e5, 'Hours', 1], [ms/6e4, 'Minutes', 1]];
  return section('numbers', 'numbers', `<div class="wrap">${head('By the numbers', '10 Years in Numbers', 'Counted live, right now, from the very first day.')}
    <div class="n-grid">${items.map(([v,l,plus], i) => `<div class="n-item glass rv" style="--d:${i*.08}s"><span class="n-val" data-to="${Math.floor(v)}" data-plus="${plus}">0</span><span class="n-lab">${l}</span></div>`).join('')}
    <div class="n-item glass rv" style="--d:.32s"><span class="n-val inf">∞</span><span class="n-lab">Memories</span></div></div>
    <p class="n-note rv">And still counting, every single second.</p></div>`);
}

function buildJokes(){
  const cards = (C.jokes || []).map((j, i) => `<button class="j-card rv" style="--d:${(i%3)*.08}s" aria-expanded="false"><span class="j-emoji" aria-hidden="true">${esc(j.emoji || '😂')}</span><span><span class="h3">${esc(j.title)}</span><span class="j-punch"><span><span class="jp">${esc(j.punchline)}</span></span></span><span class="j-tap">tap if you remember</span></span></button>`).join('');
  return section('jokes', 'jokes', `<div class="wrap">${head('Only we get it', 'Our Inside Jokes', 'If anyone else reads this section, they will be very confused. Good.')}<div class="j-grid">${cards}</div></div>`);
}

function buildSong(){
  const S = C.song || {};
  return section('song', 'song', `<div class="wrap">${head('Press play', 'If Our Story Had A Soundtrack…', '')}
    <div class="player glass rv" id="player">
      <div class="cover">${S.cover ? img(S.cover, 4, 800, 800, 'Album artwork') : '<div class="vinyl" aria-hidden="true"></div>'}</div>
      <div class="track"><b>${esc(S.title)}</b><span>${esc(S.artist)}</span></div>
      <div class="eq" aria-hidden="true">${Array.from({length:7}, (_, k) => `<i style="--i:${k}"></i>`).join('')}</div>
      <div class="prog"><input type="range" id="songSeek" min="0" max="1000" value="0" aria-label="Song position"><div class="times"><span id="songCur">0:00</span><span id="songDur">0:00</span></div></div>
      <button class="play" id="songPlay" aria-label="Play">${'<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg>'}</button>
      <p class="song-note">${esc(S.note || '')}</p>
      <p class="song-hint" id="songHint" hidden></p>
      <audio id="audio" preload="none" ${S.src ? `src="${esc(S.src)}"` : ''}></audio>
    </div></div>`);
}

function buildPlaces(){
  return section('places', 'places', `<div class="wrap">${head('Our map', 'Places We’ve Been', 'Every star is a place that holds a piece of us. Tap one.')}
    <div class="map-wrap rv">
      <div class="sky" id="sky"><span class="sky-title">Our constellation</span></div>
      <article class="place-card glass" id="placeCard"></article>
    </div>
    <div class="chips rv" id="chips"></div>
  </div>`);
}

function buildSurprise(){
  const S = C.surprise || {};
  return section('surprise', 'surprise', `<div class="wrap">
    <p class="script rv" style="font-size:clamp(38px,6vw,64px)">I have one more thing for you…</p>
    <div class="gift-stage" id="giftStage">
      <button class="gift" id="gift" aria-label="Open your gift"><span class="gift-glow"></span><span class="gift-box"></span><span class="gift-lid"><span class="bow"></span></span></button>
      <p class="gift-tap">Tap to open</p>
      <div class="gift-msg"><p class="gm">${esc(S.lines?.[0])}</p><p class="gm">${esc(S.lines?.[1])}</p><p class="gm-after">${esc(S.after)}</p></div>
    </div>
  </div>`);
}

function buildFuture(){
  const f = (C.future || []).map((x, i) => `<article class="frame rv" style="--d:${(i%3)*.08}s"><div class="frame-slot"><b>+</b><span>20__</span></div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('');
  return section('future', 'future', `<div class="wrap">${head('Chapter two', 'The Next Chapter', 'Empty frames, saved for memories we haven’t made yet.')}<div class="f-grid">${f}</div><p class="future-end rv">Our best memories haven’t happened yet.</p></div>`);
}

function buildCounter(){
  const u = ['Years','Months','Days','Hours','Minutes','Seconds'];
  return section('counter', 'counter', `<div class="wrap"><p class="eyebrow rv">Live</p><p class="c-since rv">Together since <b>10.10.2016</b></p>
    <div class="c-grid">${u.map((l, i) => `<div class="c-u glass rv" style="--d:${i*.06}s"><b id="cu${i}">0</b><span>${l}</span></div>`).join('')}</div></div>`);
}

function buildFinal(){
  return `<section class="final" id="final">
    <div class="final-inner" id="finalInner">
      <p class="f1">If I could go back to 10.10.2016…</p>
      <p class="f2">I’d choose you all over again.</p>
      <div class="f-heart">${heartSvg()}</div>
      <p class="f3">Happy 10th Anniversary ❤️</p>
      <p class="f4">10.10.2016 → ∞</p>
      <p class="f5" id="iLoveYou">I love you.</p>
    </div>
    <div class="final-foot"><span id="secretCount"></span><button class="hidden-star" id="hiddenStar" aria-label="A tiny star">✦</button></div>
  </section>`;
}

function buildSite(){
  built = true;
  const site = $('#site');
  site.innerHTML = buildHero() + buildStory() + buildGallery() + buildLetter() + buildPoems() + buildQuiz() + buildQA() +
    buildReasons() + buildNumbers() + buildJokes() + buildSong() + buildPlaces() + buildSurprise() + buildFuture() + buildCounter() + buildFinal();
  initReveal(); initScroll(); initLightbox(); initBeforeAfter(); initQuiz(); initQA(); initReasons(); initNumbers();
  initJokes(); initSong(); initPlaces(); initGift(); initCounter(); initFinal(); initEggs(); startAmbient();
}

/* ---------- reveal + scroll effects ---------- */
function initReveal(){
  const els = $$('.rv, .poem');
  if (reduce || !('IntersectionObserver' in window)){ els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(e => io.observe(e));
}
function initScroll(){
  const bar = $('#progress span'), tl = $('#tl'), line = $('.tl-line i');
  const px = $$('.parallax, .pxl');
  let ticking = false;
  function update(){
    ticking = false;
    const st = scrollY, vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    bar.style.setProperty('--p', max > 0 ? (st / max).toFixed(4) : 0);
    if (tl){ const r = tl.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (vh*.6 - r.top) / r.height)); line.style.setProperty('--p', p.toFixed(4)); }
    if (!reduce) px.forEach(el => {
      const r = el.getBoundingClientRect(); if (r.bottom < -100 || r.top > vh + 100) return;
      const c = (r.top + r.height/2 - vh/2);
      const sp = el.classList.contains('pxl') ? -0.12 : parseFloat(el.dataset.speed || -0.06);
      el.style.transform = `translate3d(0,${(c*sp).toFixed(1)}px,0)`;
    });
  }
  addEventListener('scroll', () => { if (!ticking){ ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update); update();
}

/* ---------- lightbox ---------- */
function initLightbox(){
  const g = C.gallery || []; const lb = $('#lb'); let cur = 0;
  const seen = new Set(store.get('seen', []));
  function show(i){
    cur = (i + g.length) % g.length; const p = g[cur];
    const im = $('#lbImg'); im.classList.remove('ready');
    im.onload = () => im.classList.add('ready');
    im.src = p.photo || ph(cur + 3, 1000, 1000);
    if (im.complete) requestAnimationFrame(() => im.classList.add('ready'));
    im.alt = p.title || '';
    $('#lbDate').textContent = p.date || ''; $('#lbDate').hidden = !p.date; $('#lbTitle').textContent = p.title || '';
    $('#lbText').hidden = !p.text;
    $('#lbText').textContent = p.text || ''; $('#lbNote').textContent = p.note ? `“${p.note}”` : '';
    $('#lbNote').hidden = !p.note;
    $('#lbSecretBtn').hidden = !p.secret; $('#lbSecret').hidden = true; $('#lbSecret').textContent = p.secret || '';
    seen.add(cur); store.set('seen', [...seen]);
    if (seen.size >= g.length && !hasSecret('gallery')){ setTimeout(() => foundSecret('gallery', 'Every memory, seen', C.secrets?.gallery), 900); }
  }
  function open(i){ show(i); lb.hidden = false; requestAnimationFrame(() => lb.classList.add('open')); document.body.classList.add('no-scroll'); $('#lbX').focus(); }
  function close(){ lb.classList.remove('open'); document.body.classList.remove('no-scroll'); setTimeout(() => { lb.hidden = true; }, 450); }
  $('#site').addEventListener('click', e => { const b = e.target.closest('[data-lb]'); if (b) open(+b.dataset.lb); });
  $('#lbX').onclick = close; $('#lbPrev').onclick = () => show(cur - 1); $('#lbNext').onclick = () => show(cur + 1);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  $('#lbSecretBtn').onclick = () => { $('#lbSecret').hidden = false; $('#lbSecretBtn').hidden = true; markSecret('photo'); toast('You found a hidden note ✦'); };
  addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
  let sx = null;
  lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); sx = null; });
}
function initBeforeAfter(){
  const f = $('#ba'), r = $('#baRange'); if (!f) return;
  r.addEventListener('input', () => f.style.setProperty('--x', r.value + '%'));
}

/* ---------- quiz ---------- */
function initQuiz(){
  const Q = C.quiz || []; const card = $('#quizCard'); let i = 0, score = 0;
  function render(){
    if (i >= Q.length) return result();
    const q = Q[i];
    card.innerHTML = `<div class="q-top"><span>Question ${i+1} of ${Q.length}</span><span>${score} ❤️</span></div>
      <div class="q-bar"><i style="--w:${(i/Q.length*100).toFixed(1)}%"></i></div>
      <p class="q-text">${esc(q.q)}</p>
      <div class="q-opts">${q.options.map((o, k) => `<button class="q-opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>
      <p class="q-reveal" id="qReveal"></p>`;
  }
  card.addEventListener('click', e => {
    const b = e.target.closest('.q-opt');
    if (b && !b.disabled){
      const q = Q[i], k = +b.dataset.k, ok = k === q.answer;
      $$('.q-opt', card).forEach(x => { x.disabled = true; if (+x.dataset.k === q.answer) x.classList.add('right'); else if (x !== b) x.classList.add('dim'); });
      if (ok){ score++; burst(b); } else b.classList.add('wrong');
      $('#qReveal').innerHTML = `<b>${ok ? ['Yes! Correct ❤️','Of course you knew 🥹','Perfect.','Nailed it 😌'][i%4] : `Nope 😄 It was “${esc(q.options[q.answer])}”`}</b>${esc(q.reveal || '')}`;
      const nx = document.createElement('button'); nx.className = 'btn btn-primary q-next'; nx.textContent = i === Q.length - 1 ? 'See our score' : 'Next question';
      nx.onclick = () => { i++; render(); }; card.appendChild(nx);
      $('.q-top span:last-child', card).textContent = score + ' ❤️';
    }
    if (e.target.closest('#qRetry')){ i = 0; score = 0; render(); }
  });
  function result(){
    const pct = Q.length ? Math.round(score / Q.length * 100) : 0;
    const msg = pct === 100 ? 'Perfect score. You know us by heart ❤️' : pct >= 80 ? 'Okay, you definitely know us 😂❤️' : pct >= 50 ? 'Pretty good… but we need a refresher date 😉' : 'Hmm. We clearly need ten more years of practice 😄';
    card.innerHTML = `<div class="q-result"><p class="eyebrow">Our Compatibility Score</p>
      <div class="ring"><svg viewBox="0 0 190 190"><circle class="bg" cx="95" cy="95" r="86"/><circle class="fg" id="ringFg" cx="95" cy="95" r="86"/></svg><b id="ringN">0%</b></div>
      <h3>${msg}</h3><p class="lede" style="margin-inline:auto">${score} of ${Q.length} right. Whatever the number, you’re my perfect match.</p>
      <button class="btn btn-ghost" id="qRetry">Play again</button></div>`;
    store.set('quizBest', Math.max(pct, store.get('quizBest', 0)));
    requestAnimationFrame(() => requestAnimationFrame(() => { $('#ringFg').style.strokeDashoffset = 540 - 540 * pct / 100; }));
    countTo($('#ringN'), pct, 1800, v => v + '%');
    if (pct >= 80) setTimeout(() => burst($('.ring', card), 16), 900);
  }
  render();
}
function burst(el, n=10){
  if (reduce || !el) return;
  const r = el.getBoundingClientRect(); const cx = r.left + r.width/2, cy = r.top + r.height/2;
  for (let k = 0; k < n; k++){
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('viewBox','0 0 24 24'); s.setAttribute('class','burst');
    s.innerHTML = `<path d="${HEART}"/>`;
    const a = (k / n) * Math.PI * 2 + Math.random()*.4, d = 50 + Math.random()*60;
    s.style.cssText = `--x:${cx}px;--y:${cy}px;--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d - 30}px;--rot:${(Math.random()*80-40)|0}deg;fill:${k%3 ? '#c98192' : '#e8b7c3'}`;
    document.body.appendChild(s); setTimeout(() => s.remove(), 1200);
  }
}
function countTo(el, to, dur=1800, f=v => fmt(v)){
  if (reduce){ el.textContent = f(to); return; }
  const t0 = performance.now();
  (function step(t){ const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 4); el.textContent = f(Math.round(to * e)); if (p < 1) requestAnimationFrame(step); })(t0);
}

/* ---------- Q&A chat ---------- */
function initQA(){
  const Qs = C.questions || []; const th = $('#thread'), inp = $('#qaInput'), send = $('#qaSend');
  let answers = store.get('answers', []); if (!Array.isArray(answers)) answers = [];
  const bub = (cls, text) => { const b = document.createElement('div'); b.className = 'bub ' + cls; b.textContent = text; th.appendChild(b); th.scrollTop = th.scrollHeight; return b; };
  const meta = text => { const m = document.createElement('p'); m.className = 'meta'; m.textContent = text; th.appendChild(m); };
  function typing(cb){
    const t = document.createElement('div'); t.className = 'bub me typing'; t.innerHTML = '<i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i>';
    th.appendChild(t); th.scrollTop = th.scrollHeight;
    setTimeout(() => { t.remove(); cb(); }, reduce ? 0 : 1100);
  }
  function renderAll(){
    th.innerHTML = ''; meta('10.10.2026');
    bub('me', 'Hi you. I have a few questions I’ve always wanted to ask. Answer whenever you’re ready 💌');
    answers.forEach((a, i) => { bub('me', Qs[i]); bub('her', a); });
    next(true);
  }
  function next(instant){
    const i = answers.length;
    if (i >= Qs.length){ finish(instant); return; }
    inp.disabled = false; inp.placeholder = 'Type your answer…';
    instant ? bub('me', Qs[i]) : typing(() => bub('me', Qs[i]));
  }
  function finish(instant){
    inp.disabled = true; inp.placeholder = 'All answered ❤️'; send.disabled = true;
    const end = () => { bub('me', 'Thank you. I’m going to read these more times than you think.'); showActions(); };
    instant ? end() : typing(end);
  }
  function showActions(){
    const txt = Qs.map((q, i) => `${q}\n→ ${answers[i] || ''}`).join('\n\n');
    const msg = `My answers 💌\n\n${txt}`;
    const num = String(M.whatsappNumber || '').replace(/\D/g, '');
    $('#qaWa').href = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
    $('#qaActions').hidden = false;
    $('#qaCopy').onclick = () => {
      const done = () => toast('Answers copied');
      try { navigator.clipboard.writeText(msg).then(done, () => fallbackCopy(msg, done)); } catch(e){ fallbackCopy(msg, done); }
    };
  }
  function fallbackCopy(t, done){ const ta = document.createElement('textarea'); ta.value = t; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch(e){ toast('Select and copy the text manually'); } ta.remove(); }
  $('#qaRedo').onclick = () => { answers = []; store.set('answers', answers); $('#qaActions').hidden = true; renderAll(); };
  inp.addEventListener('input', () => { send.disabled = !inp.value.trim(); inp.style.height = 'auto'; inp.style.height = Math.min(140, inp.scrollHeight) + 'px'; });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !small){ e.preventDefault(); $('#composer').requestSubmit(); } });
  $('#composer').addEventListener('submit', e => {
    e.preventDefault(); const v = inp.value.trim(); if (!v || answers.length >= Qs.length) return;
    answers.push(v); store.set('answers', answers); bub('her', v);
    inp.value = ''; inp.style.height = ''; send.disabled = true; next(false);
  });
  renderAll();
}

/* ---------- reasons / numbers / jokes ---------- */
function initReasons(){
  const opened = new Set();
  $('#rGrid').addEventListener('click', e => {
    const c = e.target.closest('.r-card'); if (!c) return;
    c.classList.toggle('flipped');
    opened.add([...c.parentNode.children].indexOf(c));
    if (opened.size === (C.reasons || []).length && !c._t){ c._t = 1; setTimeout(() => toast('All ten. And there are a thousand more.'), 800); }
  });
}
function initNumbers(){
  const els = $$('.n-val[data-to]');
  const run = el => countTo(el, +el.dataset.to, 2200, v => fmt(v) + (el.dataset.plus === '1' ? '+' : ''));
  if (!('IntersectionObserver' in window)){ els.forEach(run); return; }
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting){ run(en.target); io.unobserve(en.target); } }), { threshold: .5 });
  els.forEach(e => io.observe(e));
}
function initJokes(){
  $$('.j-card').forEach(c => c.addEventListener('click', () => { const o = c.classList.toggle('open'); c.setAttribute('aria-expanded', o); }));
}

/* ---------- song (real file, or a soft music-box placeholder) ---------- */
function initSong(){
  const P = $('#player'), btn = $('#songPlay'), seek = $('#songSeek'), au = $('#audio');
  const play = '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg>', pause = '<svg viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>';
  const tf = s => `${Math.floor(s/60)}:${pad(Math.floor(s%60))}`;
  let useBox = !(C.song && C.song.src), dragging = false;
  const box = musicBox();
  function setUI(on){ P.classList.toggle('playing', on); btn.innerHTML = on ? pause : play; btn.setAttribute('aria-label', on ? 'Pause' : 'Play'); }
  function fallback(){ useBox = true; const h = $('#songHint'); h.hidden = false; h.textContent = 'Playing a soft placeholder melody. Add your song file in content.js.'; $('#songDur').textContent = tf(box.duration); }
  if (useBox){ $('#songDur').textContent = tf(box.duration); }
  au.addEventListener('error', () => { if (!useBox){ setUI(false); fallback(); } });
  au.addEventListener('loadedmetadata', () => { $('#songDur').textContent = tf(au.duration); });
  au.addEventListener('timeupdate', () => { if (!dragging && au.duration){ seek.value = au.currentTime / au.duration * 1000; $('#songCur').textContent = tf(au.currentTime); } });
  au.addEventListener('ended', () => setUI(false));
  box.onTime = (t, d) => { if (!dragging){ seek.value = t / d * 1000; $('#songCur').textContent = tf(t); } };
  box.onEnd = () => setUI(false);
  btn.addEventListener('click', async () => {
    if (useBox){ if (box.playing){ box.pause(); setUI(false); } else { if (!$('#songHint').textContent) fallback(); box.play(); setUI(true); } return; }
    if (au.paused){ try { await au.play(); setUI(true); } catch(e){ fallback(); box.play(); setUI(true); } } else { au.pause(); setUI(false); }
  });
  seek.addEventListener('input', () => { dragging = true; const d = useBox ? box.duration : (au.duration || 0); $('#songCur').textContent = tf(seek.value / 1000 * d); });
  seek.addEventListener('change', () => { dragging = false; if (useBox) box.seek(seek.value / 1000 * box.duration); else if (au.duration) au.currentTime = seek.value / 1000 * au.duration; });
}
function musicBox(){
  // an original, gentle arpeggio in C major: C – G – Am – F, four times
  const chords = [[261.6,329.6,392,523.3],[196,246.9,293.7,392],[220,261.6,329.6,440],[174.6,220,261.6,349.2]];
  const pat = [0,1,2,3,2,1,2,3]; const e8 = 60/76/2; const events = [];
  for (let rep = 0; rep < 4; rep++) for (let b = 0; b < 4; b++){
    const c = chords[b], t0 = (rep*4 + b) * 8 * e8;
    events.push({ t: t0, f: c[0]/2, g: .09 });
    pat.forEach((p, k) => events.push({ t: t0 + k*e8, f: c[p] * (rep % 2 && k === 3 ? 2 : 1), g: k === 0 ? .11 : .07 }));
  }
  const duration = 16 * 8 * e8 + 2;
  const api = { duration, playing: false, onTime: null, onEnd: null };
  let ctx, master, pos = 0, startAt = 0, idx = 0, timer = null;
  function ensure(){
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    ctx = new AC(); master = ctx.createGain(); master.gain.value = .55;
    const dl = ctx.createDelay(); dl.delayTime.value = .32; const fb = ctx.createGain(); fb.gain.value = .28; const wet = ctx.createGain(); wet.gain.value = .25;
    master.connect(ctx.destination); master.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(wet); wet.connect(ctx.destination);
  }
  function note(f, when, g){
    [[ 'sine', f, g ], [ 'triangle', f*2, g*.25 ]].forEach(([type, fr, gg]) => {
      const o = ctx.createOscillator(), a = ctx.createGain(); o.type = type; o.frequency.value = fr;
      a.gain.setValueAtTime(0.0001, when); a.gain.exponentialRampToValueAtTime(gg, when + .008); a.gain.exponentialRampToValueAtTime(0.0001, when + 1.8);
      o.connect(a); a.connect(master); o.start(when); o.stop(when + 1.9);
    });
  }
  function loop(){
    const t = ctx.currentTime - startAt;
    while (idx < events.length && events[idx].t < t + .25){ const ev = events[idx++]; if (ev.t >= t - .05) note(ev.f, startAt + ev.t, ev.g); }
    api.onTime && api.onTime(Math.min(t, duration), duration);
    if (t >= duration){ api.pause(); pos = 0; api.onEnd && api.onEnd(); api.onTime && api.onTime(0, duration); }
  }
  api.play = () => { ensure(); if (!ctx) return; ctx.resume(); startAt = ctx.currentTime - pos; idx = events.findIndex(e => e.t >= pos); if (idx < 0) idx = events.length; api.playing = true; clearInterval(timer); timer = setInterval(loop, 50); };
  api.pause = () => { if (!ctx) return; pos = Math.max(0, ctx.currentTime - startAt); api.playing = false; clearInterval(timer); };
  api.seek = s => { pos = s; if (api.playing){ api.pause(); pos = s; api.play(); } else api.onTime && api.onTime(s, duration); };
  return api;
}

/* ---------- places constellation ---------- */
function initPlaces(){
  const all = C.places || []; const past = all.filter(p => !p.future); const sky = $('#sky');
  if (!past.length){ $('#places').hidden = true; return; }
  const lats = past.map(p => p.lat), lngs = past.map(p => p.lng);
  const cLat = (Math.max(...lats) + Math.min(...lats)) / 2, cLng = (Math.max(...lngs) + Math.min(...lngs)) / 2;
  const span = Math.max(Math.max(...lats) - Math.min(...lats), Math.max(...lngs) - Math.min(...lngs), 1) * 1.45;
  const pos = p => [50 + (p.lng - cLng) / span * 100, 50 - (p.lat - cLat) / span * 100];
  const pts = past.map(pos);
  let grid = ''; for (let k = 1; k < 10; k++){ grid += `<line x1="${k*10}" y1="0" x2="${k*10}" y2="100"/><line x1="0" y1="${k*10}" x2="100" y2="${k*10}"/>`; }
  sky.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><defs><filter id="glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <g class="grid">${grid}</g><polyline class="route" points="${pts.map(p => p.join(',')).join(' ')}"/></svg>`);
  // stars drawn in HTML-sized SVG so circles stay round
  const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  overlay.setAttribute('aria-label', 'Map of our places'); overlay.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  sky.appendChild(overlay);
  const label = document.createElement('span'); label.className = 'sky-label'; sky.appendChild(label);
  function drawStars(){
    const W = sky.clientWidth, H = sky.clientHeight; overlay.setAttribute('viewBox', `0 0 ${W} ${H}`);
    overlay.innerHTML = `<defs><filter id="glow2" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>` +
      pts.map((p, i) => `<g class="star" data-i="${all.indexOf(past[i])}" tabindex="0" role="button" aria-label="${esc(past[i].name)}"><circle class="halo" cx="${p[0]/100*W}" cy="${p[1]/100*H}" r="14"/><circle class="core" style="filter:url(#glow2)" cx="${p[0]/100*W}" cy="${p[1]/100*H}" r="4.5"/><circle cx="${p[0]/100*W}" cy="${p[1]/100*H}" r="22" fill="transparent"/></g>`).join('');
    sel(cur, true);
  }
  $('#chips').innerHTML = `<span class="chips-label">Our places</span>` + all.map((p, i) => `${p.future && !all[i-1]?.future ? '<span class="chips-label">Someday</span>' : ''}<button class="chip ${p.future ? 'future' : ''}" data-i="${i}">${esc(p.name)}</button>`).join('');
  let cur = 0;
  function sel(i, quiet){
    cur = i; const p = all[i];
    $$('.star', overlay).forEach(s => s.classList.toggle('on', +s.dataset.i === i));
    $$('.chip').forEach(c => c.classList.toggle('on', +c.dataset.i === i));
    if (!p.future){ const q = pts[past.indexOf(p)]; label.hidden = false; label.textContent = p.name; label.style.left = q[0] + '%'; label.style.top = q[1] + '%'; } else label.hidden = true;
    if (quiet && $('#placeCard').innerHTML) return;
    $('#placeCard').innerHTML = `${img(p.photo, i + 11, 1000, 625, p.name, '', p.future ? 'someday' : 'photo of this place')}<div class="place-body"><p class="eyebrow">${esc(p.date || '')}</p><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p><a href="https://www.google.com/maps?q=${p.lat},${p.lng}" target="_blank" rel="noopener">Open in Maps ↗</a></div>`;
  }
  overlay.addEventListener('click', e => { const s = e.target.closest('.star'); if (s) sel(+s.dataset.i); });
  overlay.addEventListener('keydown', e => { const s = e.target.closest('.star'); if (s && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); sel(+s.dataset.i); } });
  $('#chips').addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) sel(+c.dataset.i); });
  sel(0); drawStars();
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(drawStars, 150); });
}

/* ---------- gift ---------- */
function initGift(){
  const g = $('#gift'), st = $('#giftStage');
  g.addEventListener('click', () => {
    if (g.classList.contains('opened')) return;
    g.classList.add('opened'); g.setAttribute('aria-label', 'Gift opened');
    const cols = ['#f3a7b8','#efe1ca','#e6ddf3','#d38c9d','#fbecee'];
    if (!reduce) for (let k = 0; k < 28; k++){
      const p = document.createElement('i'); p.className = 'petal';
      const a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 220;
      p.style.cssText = `--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d - 80}px;--rot:${(Math.random()*540)|0}deg;--c:${cols[k%5]};--dl:${(Math.random()*.25).toFixed(2)}s`;
      st.appendChild(p); setTimeout(() => p.remove(), 2800);
    }
    setTimeout(() => st.classList.add('done'), 700);
  });
}

/* ---------- live counter ---------- */
function calDiff(a, b){
  // calendar difference in IST
  const ist = t => { const d = new Date(t + 5.5*36e5); return [d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()]; };
  const A = ist(a), B = ist(b);
  let [y, mo, d, h, mi, s] = B.map((v, i) => v - A[i]);
  if (s < 0){ s += 60; mi--; } if (mi < 0){ mi += 60; h--; } if (h < 0){ h += 24; d--; }
  if (d < 0){ mo--; d += new Date(Date.UTC(B[0], B[1], 0)).getUTCDate(); }
  if (mo < 0){ mo += 12; y--; }
  return { y, mo, d, h, mi, s };
}
function initCounter(){
  const els = [0,1,2,3,4,5].map(i => $('#cu' + i));
  const upd = () => { const d = calDiff(START, now()); [d.y, d.mo, d.d, d.h, d.mi, d.s].forEach((v, i) => { const t = i > 2 ? pad(v) : String(v); if (els[i].textContent !== t) els[i].textContent = t; }); };
  upd(); setInterval(upd, 1000);
}

/* ---------- finale ---------- */
function initFinal(){
  const parts = [...$('#finalInner').children]; const times = [0, 2200, 3600, 4600, 5800, 7200];
  let played = false;
  const play = () => { if (played) return; played = true; parts.forEach((p, i) => setTimeout(() => p.classList.add('on'), reduce ? 0 : times[i])); };
  if ('IntersectionObserver' in window){ const io = new IntersectionObserver(es => { if (es[0].isIntersecting){ play(); io.disconnect(); } }, { threshold: .45 }); io.observe($('#final')); } else play();
  updateSecretCount();
}

/* ======================================================================
   EASTER EGGS
   ====================================================================== */
const SECRETS = ['heart', 'keyboard', 'photo', 'gallery', 'star'].filter(k => k !== 'photo' || (C.gallery || []).some(p => p.secret));
function hasSecret(k){ return store.get('secrets', []).includes(k); }
function markSecret(k){ const s = store.get('secrets', []); if (!s.includes(k)){ s.push(k); store.set('secrets', s); } updateSecretCount(); }
function updateSecretCount(){
  const n = store.get('secrets', []).filter(k => SECRETS.includes(k)).length, el = $('#secretCount'); if (!el) return;
  const T = SECRETS.length;
  el.textContent = n === 0 ? `There are ${T} little secrets hidden on this page.` : n >= T ? `You found all ${T} secrets. Of course you did. ❤️` : `You’ve found ${n} of ${T} little secrets.`;
}
function foundSecret(k, title, msg){
  markSecret(k);
  $('#secretTitle').textContent = title; $('#secretMsg').textContent = msg || '';
  $('#secretSheet').hidden = false; $('#secretClose').focus();
  burst($('#secretTitle'), 14);
}
$('#secretClose').addEventListener('click', () => { $('#secretSheet').hidden = true; });
$('#secretSheet').addEventListener('click', e => { if (e.target.id === 'secretSheet') $('#secretSheet').hidden = true; });

function initEggs(){
  // 1. tap the hero heart ten times
  let taps = 0, tt;
  $('#heartEgg').addEventListener('click', e => {
    taps++; burst(e.currentTarget, 4); clearTimeout(tt); tt = setTimeout(() => { taps = 0; }, 4000);
    if (taps === 5) toast('Keep going…', 1500);
    if (taps >= 10){ taps = 0; foundSecret('heart', 'Ten taps, ten years', C.secrets?.heart); }
  });
  // 2. konami code or typing "iloveyou"; on phones, press and hold "I love you."
  const kon = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let ki = 0, typed = '';
  addEventListener('keydown', e => {
    if (e.target.matches('input, textarea')) return;
    ki = (e.key === kon[ki] || e.key.toLowerCase() === kon[ki]) ? ki + 1 : (e.key === kon[0] ? 1 : 0);
    typed = (typed + (e.key.length === 1 ? e.key.toLowerCase() : '')).slice(-8);
    if (ki === kon.length || typed === 'iloveyou'){ ki = 0; typed = ''; foundSecret('keyboard', 'You typed the magic words', C.secrets?.keyboard); }
  });
  const ily = $('#iLoveYou'); let hold;
  const start = () => { hold = setTimeout(() => foundSecret('keyboard', 'You held on', C.secrets?.keyboard), 1500); };
  const stop = () => clearTimeout(hold);
  ily.addEventListener('pointerdown', start); ['pointerup','pointerleave','pointercancel'].forEach(ev => ily.addEventListener(ev, stop));
  // 5. the tiny star at the very end
  $('#hiddenStar').addEventListener('click', () => foundSecret('star', 'The last secret', C.secrets?.star));
}

/* ======================================================================
   AMBIENT PETALS & SPARKLES
   ====================================================================== */
function startAmbient(){
  if (reduce) return;
  const cv = $('#ambient'); cv.hidden = false; const ctx = cv.getContext('2d');
  let W, H, dpr; const N = small ? 9 : 16; const parts = [];
  function size(){ dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W*dpr; cv.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
  size(); addEventListener('resize', size);
  const cols = [[243,167,184],[239,215,180],[214,200,238]];
  const mk = (y) => ({ x: Math.random()*W, y: y ?? -20, s: 5 + Math.random()*7, vy: .25 + Math.random()*.45, sw: Math.random()*6.28, sp: .4 + Math.random()*.8, r: Math.random()*6.28, vr: (Math.random()-.5)*.02, c: cols[(Math.random()*3)|0], a: .25 + Math.random()*.3, kind: Math.random() < .3 ? 'spark' : 'petal' });
  for (let i = 0; i < N; i++) parts.push(mk(Math.random()*H));
  let last = performance.now();
  function frame(t){
    const dt = Math.min(3, (t - last) / 16.7); last = t;
    if (!document.hidden){
      ctx.clearRect(0, 0, W, H);
      for (const p of parts){
        p.y += p.vy*dt; p.sw += .012*dt*p.sp; p.x += Math.sin(p.sw)*.35*dt; p.r += p.vr*dt;
        if (p.y > H + 20) Object.assign(p, mk());
        if (p.kind === 'spark'){
          const a = p.a * (.5 + .5*Math.sin(t/600 + p.sw*3));
          ctx.fillStyle = `rgba(255,248,240,${a})`; ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, 6.283); ctx.fill();
        } else {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${p.a})`;
          ctx.beginPath(); ctx.ellipse(0, 0, p.s*.55, p.s, 0, 0, 6.283); ctx.fill(); ctx.restore();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ======================================================================
   BOOT
   ====================================================================== */
function boot(){
  syncTime();
  const wantsDev = location.hash === '#secret-dev';
  if (sess.get('dev') === '1'){ enterPreview(); return; }
  if (now() >= UNLOCK){
    buildSite(); $('#site').hidden = false; $('#progress').hidden = false;
    if (!sess.get('intro')) playIntro();
  } else {
    startCountdown();
  }
  if (wantsDev) openDevSheet();
}
addEventListener('hashchange', () => { if (location.hash === '#secret-dev' && sess.get('dev') !== '1') openDevSheet(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && cdTimer) syncTime(); });
boot();
})();
