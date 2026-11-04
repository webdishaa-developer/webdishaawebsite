// Hero.jsx — Premium redesign
// Better typography, correct stats (20+ clients, 2025, pan india), proper mobile readability

import { memo, useState, useEffect, useRef } from 'react';
import useCounter from '../hooks/useCounter';
import { TYPEWRITER_WORDS } from '../data';

/* ── Real stats — update these to match your actual numbers ── */
const STATS = [
  { n: 20,  s: '+', l: 'Projects Delivered' },
  { n: 98,  s: '%', l: 'Client Satisfaction' },
  { n: 5,   s: 'd', l: 'Avg. Delivery'      },
  { n: 20,  s: '+', l: 'Happy Clients'      },
];

/* ── Memoized SVG Sphere ── */
const Sphere = memo(function Sphere() {
  return (
    <svg
      viewBox="0 0 500 500" width="100%" height="100%"
      style={{ filter: 'drop-shadow(0 0 48px rgba(29,111,242,.35)) drop-shadow(0 0 90px rgba(0,200,255,.12))' }}
    >
      <defs>
        <radialGradient id="sg" cx="33%" cy="30%">
          <stop offset="0%"  stopColor="#1a4fd6" />
          <stop offset="45%" stopColor="#082050" />
          <stop offset="100%" stopColor="#000a1a" />
        </radialGradient>
        <radialGradient id="hi" cx="33%" cy="30%">
          <stop offset="0%"  stopColor="rgba(120,180,255,.22)" />
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <clipPath id="cc"><circle cx="250" cy="250" r="224" /></clipPath>
        <filter id="soft"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <circle cx="250" cy="250" r="224" fill="url(#sg)" />
      {[-155,-105,-55,0,55,105,155].map((y, i) => {
        const r = Math.sqrt(Math.max(0, 224 * 224 - y * y));
        return r > 5 ? (
          <ellipse key={i} cx="250" cy={250+y} rx={r} ry={r*0.13}
            fill="none" stroke="rgba(0,200,255,.06)" strokeWidth="1" />
        ) : null;
      })}
      {[0,36,72,108,144].map((a, i) => (
        <ellipse key={i} cx="250" cy="250"
          rx={Math.abs(Math.sin((a+5)*Math.PI/180))*224+10} ry="224"
          fill="none" stroke="rgba(0,200,255,.05)" strokeWidth="1"
          clipPath="url(#cc)" transform={`rotate(${a},250,250)`} />
      ))}
      <g clipPath="url(#cc)" fill="rgba(30,120,240,.15)" filter="url(#soft)">
        <ellipse cx="195" cy="195" rx="68" ry="44" />
        <ellipse cx="308" cy="265" rx="54" ry="36" />
        <ellipse cx="155" cy="305" rx="38" ry="28" />
        <ellipse cx="338" cy="175" rx="32" ry="22" />
        <ellipse cx="248" cy="345" rx="58" ry="26" />
      </g>
      <circle cx="250" cy="250" r="224" fill="url(#hi)" />
      <circle cx="250" cy="250" r="224" fill="none" stroke="rgba(0,200,255,.12)" strokeWidth="1.5" />
      <ellipse cx="182" cy="162" rx="52" ry="32" fill="rgba(255,255,255,.05)" transform="rotate(-28,182,162)" />
    </svg>
  );
});

/* ── Typewriter ── */
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    if (!del && txt === word) {
      const t = setTimeout(() => setDel(true), 2200);
      return () => clearTimeout(t);
    }
    if (del && txt === '') {
      const t = setTimeout(() => { setDel(false); setIdx((idx+1) % words.length); }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setTxt(del ? word.slice(0, txt.length-1) : word.slice(0, txt.length+1)),
      del ? 42 : 78
    );
    return () => clearTimeout(t);
  }, [txt, del, idx, words]);

  return (
    <div className="typewriter-wrap">
      {txt}<span className="typewriter-cursor" />
    </div>
  );
}

/* ── Stat counter ── */
function StatItem({ n, s, l, active }) {
  const value = useCounter(n, active);
  return (
    <div className="stat-item">
      <div className="stat-n">{value}{s}</div>
      <div className="stat-l">{l}</div>
    </div>
  );
}

const styles = `
/* ── HERO SHELL ── */
.hero {
  position: relative; z-index: 1;
  min-height: 100vh;
  display: flex; align-items: center;
  padding: 108px 6% 80px;
  overflow: hidden;
}

/* subtle radial glow behind text */
.hero::before {
  content: '';
  position: absolute; top: 0; left: -10%; bottom: 0;
  width: 60%; pointer-events: none;
  background: radial-gradient(ellipse 60% 70% at 30% 50%,
    rgba(0,200,255,.04) 0%, transparent 70%);
}

.hero-left { flex: 1; max-width: 600px; position: relative; z-index: 2; }

.hero-right {
  position: absolute; right: -60px; top: 50%;
  transform: translateY(-52%);
  width: min(48vw, 600px); height: min(48vw, 600px);
  pointer-events: none; opacity: .92;
  animation: sphereFloat 8s ease-in-out infinite;
}
@keyframes sphereFloat {
  0%,100% { transform: translateY(-52%); }
  50%      { transform: translateY(-48%); }
}

/* ── EYEBROW ── */
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 11px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase;
  color: #00c8ff;
  border: 1px solid rgba(0,200,255,.22);
  background: rgba(0,200,255,.05);
  padding: 6px 16px 6px 12px; border-radius: 100px;
  margin-bottom: 22px;
  animation: fadeUp .6s ease both;
}
.hero-eyebrow::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%;
  background: #00c8ff; box-shadow: 0 0 8px #00c8ff;
  flex-shrink: 0;
}

/* ── TITLE ── */
.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(72px, 11vw, 136px);
  line-height: .88; letter-spacing: .02em;
  color: #eef4ff;
  animation: fadeUp .75s ease both;
  /* subtle text shadow for depth */
  text-shadow: 0 0 80px rgba(0,200,255,.08);
}

/* ── ACCENT LINE ── */
.accent-bar {
  display: block; width: 0; height: 2px;
  background: linear-gradient(90deg, #00c8ff, transparent);
  margin: 18px 0 24px;
  animation: expandBar 1s ease .5s both;
}
@keyframes expandBar { to { width: 60px; } }

/* ── TYPEWRITER ── */
.typewriter-wrap {
  font-size: clamp(16px, 2.2vw, 22px); font-weight: 400;
  color: #00c8ff; letter-spacing: .01em;
  margin-bottom: 16px; min-height: 34px;
  animation: fadeUp .85s ease both;
}
.typewriter-cursor {
  display: inline-block; width: 2px; height: 1em;
  background: #00c8ff; margin-left: 3px;
  vertical-align: middle; animation: blink .75s step-end infinite;
}
@keyframes blink { 50% { opacity: 0; } }

/* ── SUBTITLE ── */
.hero-sub {
  font-size: clamp(14px, 1.5vw, 16px);
  font-weight: 300; line-height: 1.9;
  color: rgba(255,255,255,.55);
  max-width: 440px; margin-bottom: 36px;
  animation: fadeUp .95s ease both;
}

/* ── BUTTONS ── */
.hero-btns {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  animation: fadeUp 1.05s ease both;
}
.btn-primary {
  font-family: 'Barlow', sans-serif;
  font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
  background: #00c8ff; color: #000; border: none; cursor: pointer;
  padding: 13px 28px; border-radius: 100px;
  box-shadow: 0 0 26px rgba(0,200,255,.3);
  transition: box-shadow .25s, transform .25s;
  white-space: nowrap;
}
.btn-primary:hover { box-shadow: 0 0 50px rgba(0,200,255,.55); transform: translateY(-2px); }
.btn-outline {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; font-weight: 400; color: rgba(255,255,255,.5);
  background: none; border: none; cursor: pointer;
  transition: color .2s; white-space: nowrap;
}
.btn-outline:hover { color: #eef4ff; }
.play-ring {
  width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
  border: 1px solid rgba(255,255,255,.15);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; color: #eef4ff;
  transition: border-color .2s, background .2s;
}
.btn-outline:hover .play-ring { border-color: #00c8ff; background: rgba(0,200,255,.08); }

/* ── STATS ── */
.stats-row {
  display: flex; flex-wrap: wrap; gap: 0;
  margin-top: 52px;
  animation: fadeUp 1.1s ease both;
  border-top: 1px solid rgba(255,255,255,.06);
  padding-top: 28px;
}
.stat-item {
  padding-right: 32px; margin-right: 32px;
  border-right: 1px solid rgba(255,255,255,.06);
}
.stat-item:last-child { border-right: none; padding-right: 0; margin-right: 0; }
.stat-n {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(34px, 4.5vw, 48px); line-height: 1;
  background: linear-gradient(135deg, #eef4ff 0%, #00c8ff 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.stat-l {
  font-size: 10px; font-weight: 600;
  letter-spacing: .12em; text-transform: uppercase;
  color: rgba(255,255,255,.35); margin-top: 5px;
}

/* ── ANIMATIONS ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: none; }
}

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .hero-right { right: -80px; width: min(44vw, 520px); height: min(44vw, 520px); }
}
@media (max-width: 900px) {
  .hero-right { display: none; }
  .hero-left  { max-width: 100%; }
}
@media (max-width: 768px) {
  .hero { padding: 90px 5% 60px; min-height: auto; }
  .hero-title { font-size: clamp(64px, 18vw, 104px); }
  .hero-sub   { font-size: 14px; color: rgba(255,255,255,.5); }
  .stats-row  { gap: 0; padding-top: 22px; margin-top: 36px; }
  .stat-item  { padding-right: 20px; margin-right: 20px; }
  .stat-n     { font-size: 34px; }
}
@media (max-width: 480px) {
  .hero { padding: 85px 5% 50px; }
  .hero-eyebrow { font-size: 10px; }
  .hero-title { font-size: clamp(58px, 16vw, 84px); }
  .typewriter-wrap { font-size: 15px; }
  .hero-sub { font-size: 13.5px; max-width: 100%; }
  .stats-row { flex-wrap: wrap; gap: 16px 0; }
  .stat-item { flex: 0 0 50%; border-right: none; padding-right: 0; margin-right: 0;
    padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,.05); }
  .stat-item:nth-last-child(-n+2) { border-bottom: none; }
}
@media (max-width: 360px) {
  .hero-btns { flex-direction: column; width: 100%; }
  .btn-primary { width: 100%; text-align: center; }
}
`;

export default function Hero() {
  const statsRef = useRef(null);
  const [statsOn, setStatsOn] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsOn(true); },
      { threshold: .15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <style>{styles}</style>
      <section className="hero" id="hero">
        <div className="hero-left">

          {/* Eyebrow pill */}
          <div className="hero-eyebrow">
            Affordable Digital Solutions · Raipur CG
          </div>

          {/* Main title */}
          <h1 className="hero-title">
            Web<br />Dishaa
          </h1>

          {/* Accent line */}
          <span className="accent-bar" />

          {/* Typewriter */}
          <Typewriter words={TYPEWRITER_WORDS} />

          {/* Subtitle — readable weight and size */}
          <p className="hero-sub">
            We build stunning websites, powerful branding & digital solutions
            that help businesses across India grow and dominate online.
          </p>

          {/* Buttons */}
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => go('packages')}>
              View Packages
            </button>
            <button className="btn-outline" onClick={() => go('contact')}>
              <span className="play-ring">▶</span>
              Free Consultation
            </button>
          </div>

          {/* Stats */}
          <div className="stats-row" ref={statsRef}>
            {STATS.map((s, i) => (
              <StatItem key={i} n={s.n} s={s.s} l={s.l} active={statsOn} />
            ))}
          </div>

        </div>
        <div className="hero-right"><Sphere /></div>
      </section>
    </>
  );
}