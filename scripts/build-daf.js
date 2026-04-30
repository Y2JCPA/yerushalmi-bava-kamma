const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data', 'bava-kamma-2.json'), 'utf8'));
const outDir = path.join(root, 'dafim', 'bava-kamma', '2');
fs.mkdirSync(outDir, { recursive: true });

function esc(s='') { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function renderSlide(slide) {
  if (slide.type === 'overview') return `<section class="card hero-card"><h2>${esc(slide.title)}</h2>${slide.body.map(p=>`<p>${esc(p)}</p>`).join('')}</section>`;
  if (slide.type === 'comparison') return `<section class="card"><h2>${esc(slide.title)}</h2><div class="grid four">${slide.columns.map(c=>`<div class="mini"><div class="big">${esc(c.emoji)}</div><h3>${esc(c.label)}</h3><p>${esc(c.text)}</p></div>`).join('')}</div></section>`;
  if (slide.type === 'flow') return `<section class="card"><h2>${esc(slide.title)}</h2><div class="flow">${slide.steps.map((s,i)=>`<div class="step"><span>${i+1}</span><p>${esc(s)}</p></div>`).join('')}</div></section>`;
  if (slide.type === 'source') return `<section class="card source"><h2>${esc(slide.title)}</h2><div class="source-grid"><blockquote class="he" dir="rtl">${esc(slide.hebrew)}</blockquote><blockquote>${esc(slide.english)}</blockquote></div></section>`;
  if (slide.type === 'callout') return `<section class="card callout"><h2>${esc(slide.title)}</h2><p>${esc(slide.body)}</p></section>`;
  return '';
}

const quiz = data.quiz.map((q, idx) => `<div class="question"><h3>${idx+1}. ${esc(q.q)}</h3>${q.o.map((o,i)=>`<button data-correct="${i===q.c}" onclick="answer(this)">${esc(o)}</button>`).join('')}<p class="explain">${esc(q.e)}</p></div>`).join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(data.masechet)} ${esc(data.daf)} — Visual Yerushalmi</title>
<style>
:root{--bg:#11172b;--card:#182441;--card2:#203052;--gold:#d7b85b;--text:#f6f1df;--muted:#b7bfd8;--blue:#62a8ea;--green:#62c779;--red:#ef6f6c}
*{box-sizing:border-box} body{margin:0;background:radial-gradient(circle at top,#263963 0,#11172b 42%,#090d19 100%);color:var(--text);font-family:Georgia,'Times New Roman',serif;line-height:1.55}.wrap{max-width:1080px;margin:0 auto;padding:28px 18px 60px}a{color:var(--gold)}header{text-align:center;padding:38px 0 26px}.eyebrow{color:var(--gold);letter-spacing:.12em;text-transform:uppercase;font-size:.82rem}h1{font-size:clamp(2.2rem,7vw,5.2rem);margin:.1em 0;color:var(--gold)}.subtitle{font-size:1.25rem;color:var(--muted);max-width:760px;margin:0 auto}.meta{margin-top:18px;color:#d8dcf0;font-size:.95rem}.card{background:linear-gradient(180deg,var(--card),#121b33);border:1px solid rgba(215,184,91,.28);border-radius:22px;padding:24px;margin:22px 0;box-shadow:0 18px 40px rgba(0,0,0,.25)}.hero-card{border-color:rgba(215,184,91,.5)}h2{color:var(--gold);margin-top:0}.grid{display:grid;gap:16px}.four{grid-template-columns:repeat(4,minmax(0,1fr))}.mini{background:var(--card2);border-radius:18px;padding:18px;min-height:190px}.mini .big{font-size:2.1rem}.mini h3{font-size:1.6rem;margin:.2em 0;color:#fff}.mini p{color:var(--muted)}.flow{display:grid;gap:12px}.step{display:flex;gap:14px;align-items:flex-start;background:#0f172d;border-radius:16px;padding:14px 16px}.step span{display:grid;place-items:center;min-width:34px;height:34px;border-radius:999px;background:var(--gold);color:#101525;font-weight:bold}.step p{margin:3px 0}.source-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.source blockquote{margin:0;background:#0d1428;border-inline-start:4px solid var(--gold);border-radius:14px;padding:18px;color:#f7edc8}.source .he{font-family:'David','Noto Sans Hebrew',serif;font-size:1.35rem;line-height:1.9;border-inline-start:0;border-inline-end:4px solid var(--gold)}.callout{background:linear-gradient(135deg,#1c2b52,#2a1f3d)}.quiz .question{background:#0f172d;border-radius:16px;padding:18px;margin:14px 0}.quiz button{display:block;width:100%;text-align:left;margin:8px 0;padding:12px 14px;border-radius:12px;border:1px solid #40527d;background:#182441;color:var(--text);font:inherit;cursor:pointer}.quiz button:hover{border-color:var(--gold)}.quiz button.right{border-color:var(--green);background:#173623}.quiz button.wrong{border-color:var(--red);background:#3a171c}.explain{display:none;color:#d9e5ff}.question.done .explain{display:block}.topnav{display:flex;justify-content:space-between;gap:10px;margin:18px 0}.pill{display:inline-block;border:1px solid rgba(215,184,91,.4);border-radius:999px;padding:7px 12px;color:var(--muted);text-decoration:none}@media(max-width:800px){.four,.source-grid{grid-template-columns:1fr}header{text-align:left}.wrap{padding-inline:14px}}
</style>
</head>
<body><main class="wrap">
<div class="topnav"><a class="pill" href="../../../index.html">← Home</a><span class="pill">Prototype</span></div>
<header><div class="eyebrow">${esc(data.heMasechet)}</div><h1>${esc(data.emoji)} Daf ${esc(data.daf)}</h1><p class="subtitle">${esc(data.subtitle)}</p><div class="meta">Source: ${data.sourceRefs.map(esc).join(', ')} · ${esc(data.sourceNote)}</div></header>
${data.slides.map(renderSlide).join('\n')}
<section class="card quiz"><h2>Quick review</h2>${quiz}</section>
</main><script>function answer(btn){const q=btn.closest('.question');q.classList.add('done');q.querySelectorAll('button').forEach(b=>{b.disabled=true;b.classList.add(b.dataset.correct==='true'?'right':'wrong')});}</script></body></html>`;
fs.writeFileSync(path.join(outDir, 'index.html'), html);

const home = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Yerushalmi Bava Kamma</title><style>body{margin:0;background:#11172b;color:#f6f1df;font-family:Georgia,serif}.wrap{max-width:900px;margin:auto;padding:40px 18px}h1{color:#d7b85b;font-size:clamp(2rem,6vw,4rem)}a.card{display:block;background:#182441;border:1px solid rgba(215,184,91,.4);border-radius:22px;padding:24px;color:#f6f1df;text-decoration:none}a.card:hover{border-color:#d7b85b}.he{direction:rtl;font-family:David,serif;color:#d7b85b}</style></head><body><main class="wrap"><h1>Yerushalmi Bava Kamma</h1><p class="he">תלמוד ירושלמי בבא קמא</p><a class="card" href="dafim/bava-kamma/2/"><h2>🐂 Daf ב Prototype</h2><p>Four avot of damages, source anchor, visual flow, and quiz.</p></a></main></body></html>`;
fs.writeFileSync(path.join(root, 'index.html'), home);
console.log('Built', path.relative(root, path.join(outDir, 'index.html')));
