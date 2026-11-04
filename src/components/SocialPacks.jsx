// components/SocialPacks.jsx — Premium redesign
// Same data file (data/plans.js). No prices. Enquire → WhatsApp.
import { useRef, useState } from 'react';
import {
  Film, Image, Target, Crown, Lightbulb, TrendingUp, PlayCircle,
  CalendarDays, Users, ArrowUpRight,
} from 'lucide-react';
import { SOCIAL_1M, SOCIAL_3M, SOCIAL_WHY } from '../data/plans';
import { waLink } from '../utils/whatsapp';
import EnquireButton, { EnquireStyles } from './EnquireButton';

const WHY_ICONS = [Lightbulb, TrendingUp, PlayCircle, CalendarDays, Users];

/* accent colour per plan (R,G,B) — gold = top tiers, green = growth */
const ACCENT = {
  '01': '90,169,255',
  '02': '0,200,255',
  '03': '245,196,107',
  '04': '52,211,153',
  '05': '245,196,107',
};

/* "07 Reels + 06 Posts" -> { r:7, p:6, l:'Posts' } */
const parseMonth = (s) => {
  const m = s.match(/(\d+)\s*Reels?\s*\+\s*(\d+)\s*(\w+)/i);
  return m ? { r: +m[1], p: +m[2], l: m[3] } : null;
};

const styles = `
@property --sp-ang { syntax:'<angle>'; initial-value:0deg; inherits:false; }
@keyframes spAng  { to { --sp-ang:360deg; } }
@keyframes spGrow { from { transform:scaleX(0); } to { transform:scaleX(1); } }

/* ───────── Tab switch ───────── */
.sp-tabs {
  position:relative; display:grid; grid-template-columns:1fr 1fr;
  width:min(380px,100%); margin:34px auto 16px; padding:4px; border-radius:100px;
  background:rgba(255,255,255,.035); border:1px solid rgba(255,255,255,.09);
  backdrop-filter:blur(10px);
}
.sp-ind {
  position:absolute; top:4px; bottom:4px; left:4px; width:calc(50% - 4px); border-radius:100px;
  background:linear-gradient(135deg,#00c8ff,#1d9bff);
  box-shadow:0 0 24px rgba(0,200,255,.38), inset 0 1px 0 rgba(255,255,255,.35);
  transition:transform .38s cubic-bezier(.4,0,.2,1);
}
.sp-tabs[data-tab='3m'] .sp-ind { transform:translateX(100%); }
.sp-tab {
  position:relative; z-index:1; background:none; border:0; outline:0; cursor:pointer;
  padding:12px 0; font-family:'Barlow',sans-serif; font-size:11px; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase; color:#7d8fa6; transition:color .3s;
}
.sp-tab:hover { color:#cfe9f5; }
.sp-tab.on, .sp-tab.on:hover { color:#00131a; }

.sp-tagline {
  text-align:center; font-size:14px; font-weight:300; font-style:italic;
  letter-spacing:.03em; color:rgba(238,244,255,.45); margin:0 0 38px;
}

/* ───────── Grid ───────── */
.sp-grid { display:grid; gap:18px; grid-template-columns:repeat(3,1fr); align-items:stretch; }
.sp-grid.two { grid-template-columns:repeat(2,1fr); max-width:900px; margin:0 auto; }
.sp-cell { display:flex; }

/* ───────── Card ───────── */
.sp-card {
  --rgb:0,200,255; --mx:50%; --my:0%;
  position:relative; flex:1; display:flex; flex-direction:column; overflow:hidden;
  padding:26px 22px 22px; border-radius:24px;
  background:linear-gradient(165deg,#08111f 0%,#050b15 100%);
  border:1px solid rgba(255,255,255,.07);
  box-shadow:0 1px 0 rgba(255,255,255,.04) inset, 0 20px 40px rgba(0,0,0,.35);
  transition:transform .25s ease-out, box-shadow .4s, border-color .4s;
  will-change:transform;
}
/* animated gradient border */
.sp-card::before {
  content:''; position:absolute; inset:0; border-radius:inherit; padding:1px; pointer-events:none;
  background:conic-gradient(from var(--sp-ang), transparent 0 55%, rgb(var(--rgb)) 78%, transparent 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude;
  opacity:0; transition:opacity .4s; animation:spAng 5s linear infinite;
}
/* mouse spotlight */
.sp-card::after {
  content:''; position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .35s;
  background:radial-gradient(280px circle at var(--mx) var(--my), rgba(var(--rgb),.16), transparent 70%);
}
.sp-card:hover { box-shadow:0 1px 0 rgba(255,255,255,.05) inset, 0 28px 60px rgba(0,0,0,.55), 0 0 0 1px rgba(var(--rgb),.12); }
.sp-card:hover::before, .sp-card:hover::after, .sp-card.hot::before { opacity:1; }
.sp-card.hot {
  background:linear-gradient(165deg,#0a1830 0%,#061022 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.06) inset, 0 24px 60px rgba(0,60,120,.35), 0 0 60px rgba(0,200,255,.08);
}
.sp-card > * { position:relative; z-index:1; }

/* header row */
.sp-top { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:18px; min-height:28px; }
.sp-chip {
  display:inline-flex; align-items:center; gap:9px;
  font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:rgba(238,244,255,.55);
}
.sp-chip b {
  width:28px; height:28px; border-radius:9px; display:grid; place-items:center; font-weight:400;
  font-family:'Bebas Neue',sans-serif; font-size:14px; letter-spacing:.04em; color:#04101c;
  background:rgb(var(--rgb)); box-shadow:0 0 18px rgba(var(--rgb),.45);
}
.sp-badge {
  display:inline-flex; align-items:center; gap:6px; font-size:9px; font-weight:700; letter-spacing:.12em;
  text-transform:uppercase; color:#00131a; padding:5px 11px; border-radius:100px;
  background:linear-gradient(135deg,#00c8ff,#6fe3ff); box-shadow:0 0 18px rgba(0,200,255,.4);
}

.sp-name {
  font-family:'Bebas Neue',sans-serif; font-size:34px; letter-spacing:.03em; line-height:1;
  color:#eef4ff; margin-bottom:16px;
}

/* big number */
.sp-hero { display:flex; align-items:flex-end; gap:14px; margin-bottom:20px; }
.sp-big {
  font-family:'Bebas Neue',sans-serif; font-size:84px; line-height:.82; letter-spacing:.01em;
  background:linear-gradient(180deg,#ffffff 15%,rgb(var(--rgb)) 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent;
}
.sp-hero small {
  display:block; padding-bottom:4px; font-size:11px; font-weight:700; letter-spacing:.16em;
  text-transform:uppercase; line-height:1.5; color:rgba(238,244,255,.55);
}

/* reels / posts tiles */
.sp-tiles { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px; }
.sp-tile {
  padding:14px 14px 13px; border-radius:16px; background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.07); transition:border-color .3s, background .3s;
}
.sp-card:hover .sp-tile { background:rgba(255,255,255,.045); }
.sp-tile-h { display:flex; align-items:center; gap:7px; margin-bottom:8px; font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; }
.sp-tile.r .sp-tile-h { color:#00c8ff; }
.sp-tile.p .sp-tile-h { color:#6f95ff; }
.sp-tile-n { font-family:'Bebas Neue',sans-serif; font-size:38px; line-height:1; color:#eef4ff; }
.sp-tile-n small { font-family:'Barlow',sans-serif; font-size:10px; font-weight:400; letter-spacing:.02em; color:rgba(238,244,255,.4); margin-left:6px; }

/* composition bar */
.sp-mix { display:flex; gap:4px; height:6px; margin-bottom:20px; }
.sp-mix i { display:block; height:100%; border-radius:6px; transform:scaleX(0); transform-origin:left; }
.sp-mix i:first-child { background:linear-gradient(90deg,#00c8ff,#5fe0ff); }
.sp-mix i:last-child  { background:linear-gradient(90deg,#3d63ff,#6f95ff); }
.rev.in .sp-mix i { animation:spGrow 1s cubic-bezier(.2,.8,.2,1) .25s both; }

/* monthly timeline */
.sp-months { margin-bottom:20px; }
.sp-months-t {
  display:flex; align-items:center; gap:8px; margin-bottom:10px;
  font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:rgba(238,244,255,.45);
}
.sp-months-t svg { color:rgb(var(--rgb)); }
.sp-mgrid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
.sp-m {
  padding:11px 6px 10px; text-align:center; border-radius:14px;
  background:rgba(var(--rgb),.06); border:1px solid rgba(var(--rgb),.16);
}
.sp-m em { display:block; font-style:normal; font-size:9px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:rgb(var(--rgb)); margin-bottom:6px; }
.sp-m span { display:block; font-size:12px; line-height:1.55; color:rgba(238,244,255,.82); }

/* best for */
.sp-best {
  margin-top:auto; display:flex; gap:12px; align-items:flex-start; padding:14px 15px; margin-bottom:16px;
  border-radius:16px; background:rgba(var(--rgb),.07); border:1px solid rgba(var(--rgb),.2);
}
.sp-best svg { color:rgb(var(--rgb)); flex-shrink:0; margin-top:2px; }
.sp-best b { display:block; font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:rgb(var(--rgb)); margin-bottom:4px; }
.sp-best span { font-size:13px; line-height:1.55; color:rgba(238,244,255,.75); }

/* ───────── Why choose ───────── */
.sp-why {
  position:relative; margin-top:60px; padding:36px 22px 32px; border-radius:26px; overflow:hidden;
  background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01));
  border:1px solid rgba(255,255,255,.07);
}
.sp-why::before { content:''; position:absolute; top:0; left:12%; right:12%; height:1px; background:linear-gradient(90deg,transparent,#00c8ff,transparent); }
.sp-why::after { content:''; position:absolute; top:-80px; left:50%; transform:translateX(-50%); width:420px; height:180px; background:radial-gradient(ellipse,rgba(0,200,255,.08),transparent 70%); pointer-events:none; }
.sp-why-t { position:relative; text-align:center; font-family:'Bebas Neue',sans-serif; font-size:30px; letter-spacing:.06em; color:#eef4ff; margin-bottom:28px; }
.sp-why-t em { font-style:normal; color:#00c8ff; }
.sp-why-grid { position:relative; display:grid; grid-template-columns:repeat(5,1fr); }
.sp-why-i { position:relative; padding:4px 16px; text-align:center; }
.sp-why-i + .sp-why-i::before {
  content:''; position:absolute; left:0; top:12%; bottom:12%; width:1px;
  background:linear-gradient(transparent,rgba(255,255,255,.12),transparent);
}
.sp-why-ic {
  width:56px; height:56px; margin:0 auto 14px; border-radius:18px; display:grid; place-items:center; color:#00c8ff;
  background:linear-gradient(145deg,rgba(0,200,255,.16),rgba(29,111,242,.05));
  border:1px solid rgba(0,200,255,.22); box-shadow:0 0 26px rgba(0,200,255,.08);
  transition:transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
}
.sp-why-i:hover .sp-why-ic { transform:translateY(-5px) scale(1.07); box-shadow:0 12px 28px rgba(0,200,255,.25); }
.sp-why-i span { font-size:13px; line-height:1.55; color:rgba(238,244,255,.7); }

/* custom plan line */
.sp-custom { text-align:center; margin-top:26px; font-size:14px; color:rgba(238,244,255,.5); }
.sp-custom a {
  display:inline-flex; align-items:center; gap:5px; margin-left:8px; font-weight:600; color:#00c8ff;
  text-decoration:none; border-bottom:1px solid rgba(0,200,255,.3); padding-bottom:1px; transition:border-color .2s, gap .2s;
}
.sp-custom a:hover { border-color:#00c8ff; gap:8px; }

/* ───────── Responsive ───────── */
@media (max-width:1024px) {
  .sp-big { font-size:72px; }
  .sp-why-grid { grid-template-columns:repeat(3,1fr); row-gap:26px; }
  .sp-why-i:nth-child(4)::before { display:none; }
}
@media (max-width:860px) {
  .sp-grid, .sp-grid.two { grid-template-columns:1fr; max-width:520px; margin-left:auto; margin-right:auto; }
}
@media (max-width:560px) {
  .sp-card { padding:22px 18px 18px; border-radius:22px; }
  .sp-name { font-size:30px; }
  .sp-big { font-size:68px; }
  .sp-why { padding:28px 14px 26px; }
  .sp-why-grid { grid-template-columns:repeat(2,1fr); }
  .sp-why-i::before { display:none !important; }
  .sp-why-i:last-child { grid-column:span 2; }
  .sp-custom a { display:flex; justify-content:center; margin:8px 0 0; border:0; }
}
@media (prefers-reduced-motion:reduce) {
  .sp-card::before { animation:none; } .sp-mix i { animation:none !important; transform:none; }
}
`;

export function PlanCard({ p, i }) {
  const ref = useRef(null);
  const rgb = ACCENT[p.num] || '0,200,255';

  const onMove = (e) => {
    const el = ref.current;
    if (!el || window.innerWidth < 900) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    const rx = (y / r.height - 0.5) * -6;
    const ry = (x / r.width - 0.5) * 6;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };

  const months = p.months ? p.months.map(([m, d]) => [m, parseMonth(d), d]) : null;
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={`sp-cell rev d${(i % 4) + 1}`}>
      <div
        ref={ref}
        className={`sp-card${p.hot ? ' hot' : ''}`}
        style={{ '--rgb': rgb }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="sp-top">
          <div className="sp-chip"><b>{p.num}</b>{p.months ? '3 Months' : '1 Month'}</div>
          {p.hot && <div className="sp-badge"><Crown size={11} strokeWidth={2.4} /> Most Popular</div>}
        </div>

        <div className="sp-name">{p.name}</div>

        <div className="sp-hero">
          <div className="sp-big">{p.content}</div>
          <small>Content<br />Pieces</small>
        </div>

        <div className="sp-tiles">
          <div className="sp-tile r">
            <div className="sp-tile-h"><Film size={14} /> Reels</div>
            <div className="sp-tile-n">{pad(p.reels)}{p.reelNote && <small>{p.reelNote}</small>}</div>
          </div>
          <div className="sp-tile p">
            <div className="sp-tile-h"><Image size={14} /> Posts</div>
            <div className="sp-tile-n">{pad(p.posts)}</div>
          </div>
        </div>

        <div className="sp-mix" aria-hidden="true">
          <i style={{ flex: p.reels }} />
          <i style={{ flex: p.posts }} />
        </div>

        {months && (
          <div className="sp-months">
            <div className="sp-months-t"><CalendarDays size={13} /> Monthly Distribution</div>
            <div className="sp-mgrid">
              {months.map(([m, parsed, raw]) => (
                <div className="sp-m" key={m}>
                  <em>{m.replace('Month ', 'M')}</em>
                  {parsed
                    ? (<><span>{parsed.r} Reels</span><span>{parsed.p} {parsed.l}</span></>)
                    : <span>{raw}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="sp-best">
          <Target size={18} />
          <div><b>Best For</b><span>{p.best}</span></div>
        </div>

        <EnquireButton plan={`${p.name} (Social Media Management)`} variant={p.hot ? 'solid' : 'ghost'} />
      </div>
    </div>
  );
}

export default function SocialPacks() {
  const [tab, setTab] = useState('1m');
  const plans = tab === '1m' ? SOCIAL_1M : SOCIAL_3M;

  return (
    <>
      <style>{styles}</style>
      <EnquireStyles />
      <div className="s-wrap" id="social">
        <div className="s-inner">
          <div className="rev" style={{ textAlign: 'center' }}>
            <div className="s-eyebrow" style={{ justifyContent: 'center' }}>Social Media</div>
            <h2 className="s-title">Social Media <em>Management</em> Packages</h2>
            <p className="s-body" style={{ margin: '0 auto' }}>
              Keep your audience engaged with professionally created reels and posts.
              Tap Enquire Now and we'll recommend the right plan on WhatsApp.
            </p>
          </div>

          <div className="sp-tabs rev" data-tab={tab} role="tablist">
            <span className="sp-ind" />
            <button role="tab" aria-selected={tab === '1m'} className={`sp-tab${tab === '1m' ? ' on' : ''}`} onClick={() => setTab('1m')}>1 Month Plans</button>
            <button role="tab" aria-selected={tab === '3m'} className={`sp-tab${tab === '3m' ? ' on' : ''}`} onClick={() => setTab('3m')}>3 Month Plans</button>
          </div>

          <p className="sp-tagline">Your Brand. Our Creativity. Your Digital Growth.</p>

          {/* key remounts the grid so the reveal animation replays on tab switch */}
          <div key={tab} className={`sp-grid${tab === '3m' ? ' two' : ''}`}>
            {plans.map((p, i) => <PlanCard key={p.num} p={p} i={i} />)}
          </div>

          <div className="sp-why rev">
            <div className="sp-why-t">Why Choose <em>WebDishaa?</em></div>
            <div className="sp-why-grid">
              {SOCIAL_WHY.map((t, i) => {
                const Icon = WHY_ICONS[i];
                return (
                  <div className="sp-why-i" key={t}>
                    <div className="sp-why-ic"><Icon size={22} strokeWidth={1.7} /></div>
                    <span>{t}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sp-custom rev">
            Need something tailor-made?
            <a href={waLink('custom social media plan')} target="_blank" rel="noreferrer">
              Chat with us <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 