import { useState, useEffect, useRef, memo } from 'react';
import { STATS, TYPEWRITER_WORDS } from '../data';
import useCounter from '../hooks/useCounter';

/* ── Memoized SVG Sphere — never re-renders ── */
const Sphere = memo(function Sphere() {
  return (
    <svg
      viewBox="0 0 500 500" width="100%" height="100%"
      style={{ filter: 'drop-shadow(0 0 48px rgba(29,111,242,.35)) drop-shadow(0 0 90px rgba(0,200,255,.12))' }}
    >
      <defs>
        <radialGradient id="sg" cx="33%" cy="30%">
          <stop offset="0%"   stopColor="#1a4fd6" />
          <stop offset="45%"  stopColor="#082050" />
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
          <ellipse key={i} cx="250" cy={250 + y} rx={r} ry={r * 0.13}
            fill="none" stroke="rgba(0,200,255,.06)" strokeWidth="1" />
        ) : null;
      })}
      {[0,36,72,108,144].map((a, i) => (
        <ellipse key={i} cx="250" cy="250"
          rx={Math.abs(Math.sin((a + 5) * Math.PI / 180)) * 224 + 10} ry="224"
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
      const t = setTimeout(() => { setDel(false); setIdx((idx + 1) % words.length); }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setTxt(del ? word.slice(0, txt.length - 1) : word.slice(0, txt.length + 1)),
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

/* ── Stat Item with counter ── */
function StatItem({ n, s, l, active }) {
  const value = useCounter(n, active);
  return (
    <div>
      <div className="stat-n">{value}{s}</div>
      <div className="stat-l">{l}</div>
    </div>
  );
}

const styles = `
.hero {
  position: relative; z-index: 1;
  min-height: 100vh; display: flex; align-items: center;
  padding: 100px 6% 80px; overflow: hidden;
}
.hero-left { flex: 1; max-width: 580px; position: relative; z-index: 2; }
.hero-right {
  position: absolute; right: -80px; top: 50%;
  width: min(50vw,620px); height: min(50vw,620px);
  pointer-events: none; opacity: .9;
  animation: sphereFloat 8s ease-in-out infinite;
}
.hero-eyebrow {
  font-size: 11px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase;
  color: #00c8ff; margin-bottom: 18px;
  display: flex; align-items: center; gap: 10px;
  animation: fadeUp .7s ease both;
}
.hero-eyebrow::before { content: ''; width: 24px; height: 1px; background: #00c8ff; }
.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(68px,12vw,130px); line-height: .92; letter-spacing: .02em; color: #eef4ff;
  animation: fadeUp .8s ease both;
}
.accent-bar {
  display: block; width: 0; height: 2px; background: #00c8ff; margin: 16px 0 22px;
  animation: expandBar 1s ease .5s both;
}
.typewriter-wrap {
  font-size: clamp(15px,2.5vw,21px); font-weight: 300; color: #00c8ff;
  margin-bottom: 12px; min-height: 32px;
  animation: fadeUp .85s ease both;
}
.typewriter-cursor {
  display: inline-block; width: 2px; height: 1em; background: #00c8ff;
  margin-left: 2px; vertical-align: middle; animation: blink .75s step-end infinite;
}
.hero-sub {
  font-size: clamp(14px,1.8vw,15px); font-weight: 300; line-height: 1.85;
  color: #6a7d94; max-width: 420px; margin-bottom: 36px;
  animation: fadeUp .95s ease both;
}
.hero-btns {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  animation: fadeUp 1.05s ease both;
}
.btn-primary {
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600;
  letter-spacing: .1em; text-transform: uppercase;
  background: #00c8ff; color: #000; border: none; cursor: pointer;
  padding: 13px 30px; border-radius: 100px;
  box-shadow: 0 0 26px rgba(0,200,255,.25);
  transition: box-shadow .25s, transform .25s; will-change: transform; white-space: nowrap;
}
.btn-primary:hover { box-shadow: 0 0 50px rgba(0,200,255,.5); transform: translateY(-2px); }
.btn-outline {
  display: flex; align-items: center; gap: 9px; font-size: 13px; font-weight: 500;
  color: #6a7d94; background: none; border: none; cursor: pointer;
  transition: color .2s; white-space: nowrap;
}
.btn-outline:hover { color: #eef4ff; }
.play-ring {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,.15);
  display: flex; align-items: center; justify-content: center; font-size: 11px;
  transition: border-color .2s, background .2s; flex-shrink: 0;
}
.btn-outline:hover .play-ring { border-color: #00c8ff; background: rgba(0,200,255,.07); }
.stats-row {
  display: flex; flex-wrap: wrap; gap: 32px; margin-top: 48px;
  animation: fadeUp 1.1s ease both;
}
.stat-n {
  font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px,5vw,46px); line-height: 1;
  background: linear-gradient(135deg,#eef4ff,#00c8ff);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.stat-l { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: #6a7d94; margin-top: 4px; }

@media (max-width:900px) { .hero-right { display: none; } }
@media (max-width:768px) {
  .hero { padding: 80px 5% 60px; min-height: auto; }
  .hero-title { font-size: clamp(62px,18vw,100px); }
  .stats-row { gap: 24px; }
  .stat-n { font-size: 36px; }
  .hero-btns { gap: 12px; }
  .btn-primary { padding: 12px 26px; font-size: 12px; }
}
@media (max-width:480px) {
  .hero { padding: 75px 5% 50px; }
  .hero-title { font-size: clamp(56px,16vw,80px); }
  .typewriter-wrap { font-size: 14px; }
  .hero-sub { font-size: 13.5px; }
  .stats-row { gap: 20px; }
  .stat-n { font-size: 32px; }
}
@media (max-width:360px) {
  .hero-btns { flex-direction: column; width: 100%; }
  .btn-primary { width: 100%; justify-content: center; display: flex; }
  .btn-outline { justify-content: center; }
}
`;

export default function Hero() {
  const statsRef = useRef(null);
  const [statsOn, setStatsOn] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: .2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <style>{styles}</style>
      <section className="hero" id="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">Affordable Digital Solutions · Raipur CG</div>
          <h1 className="hero-title">Web<br />Dishaa</h1>
          <span className="accent-bar" />
          <Typewriter words={TYPEWRITER_WORDS} />
          <p className="hero-sub">
            We build stunning websites, powerful branding & digital solutions that help local businesses grow and dominate online.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => go('packages')}>View Packages</button>
            <button className="btn-outline" onClick={() => go('contact')}>
              <span className="play-ring">▶</span>Free Consultation
            </button>
          </div>
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
