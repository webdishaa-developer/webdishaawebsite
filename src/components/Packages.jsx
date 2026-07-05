
import { PACKAGES } from '../data';
 
const packagesStyles = `
.pkg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 16px;
}
 
/* ── Card base ── */
.pkg-card {
  background: linear-gradient(160deg, #060d1a 0%, #040a14 100%);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 20px;
  padding: 28px 22px 22px;
  display: flex; flex-direction: column;
  position: relative; overflow: hidden;
  transition: border-color .35s, transform .35s, box-shadow .35s;
}
 
/* animated shimmer on top edge */
.pkg-card::before {
  content: '';
  position: absolute; top: 0; left: -100%; width: 200%; height: 1px;
  background: linear-gradient(90deg,
    transparent 0%, rgba(0,200,255,.0) 30%,
    transparent 100%
  );
  transition: background .4s, left .5s;
}
 
.pkg-card:hover {
  border-color: rgba(0,200,255,.22);
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0,0,0,.5), 0 0 2px rgba(0,200,255,.1);
}
.pkg-card:hover::before {
  background: linear-gradient(90deg, transparent 0%, #00c8ff 50%, transparent 100%);
  left: 0;
}
 
/* ── POPULAR ── */
.pkg-card.hot {
  border-color: rgba(0,200,255,.22);
  background: linear-gradient(160deg, #071225 0%, #050e1f 100%);
}
.pkg-card.hot::before {
  background: linear-gradient(90deg, transparent 0%, #00c8ff 50%, transparent 100%);
  left: 0;
}
/* deep glow */
.pkg-card.hot::after {
  content: '';
  position: absolute; top: -80px; left: 50%;
  transform: translateX(-50%);
  width: 300px; height: 200px;
  background: radial-gradient(ellipse, rgba(0,200,255,.07) 0%, transparent 70%);
  pointer-events: none;
}
 
/* ── Badge ── */
.hot-badge {
  position: absolute; top: 18px; right: 18px;
  font-size: 9px; font-weight: 700; letter-spacing: .14em;
  text-transform: uppercase; color: #00c8ff;
  border: 1px solid rgba(0,200,255,.4);
  padding: 4px 10px; border-radius: 100px;
  background: rgba(0,200,255,.08);
  animation: badgePulse 3s ease-in-out infinite;
}
@keyframes badgePulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,200,255,.0); }
  50%      { box-shadow: 0 0 0 4px rgba(0,200,255,.15); }
}
 
/* ── Header ── */
.pkg-num {
  font-size: 10px; letter-spacing: .2em;
  color: rgba(0,200,255,.3); margin-bottom: 5px;
}
.pkg-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px; letter-spacing: .04em;
  color: #eef4ff; line-height: 1.1;
  margin-bottom: 16px; padding-right: 70px;
}
 
/* ── Price ── */
.pkg-price-block {
  display: flex; align-items: flex-end; gap: 2px; margin-bottom: 6px;
}
.pkg-price {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 52px; line-height: 1; color: #00c8ff;
  background: linear-gradient(135deg, #00c8ff, #1d6ff2);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
 
/* ── Delivery pill ── */
.pkg-del {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 10px; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; color: #00e887;
  background: rgba(0,232,135,.07);
  border: 1px solid rgba(0,232,135,.2);
  border-radius: 100px; padding: 5px 13px;
  margin: 12px 0 18px; width: fit-content;
}
.pkg-del-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #00e887; box-shadow: 0 0 7px #00e887;
  animation: dotBlink 2s ease infinite;
}
@keyframes dotBlink {
  0%,100% { opacity: 1; } 50% { opacity: .4; }
}
 
/* ── Divider ── */
.pkg-divider {
  height: 1px; background: rgba(255,255,255,.05); margin-bottom: 16px;
}
 
/* ── Features ── */
.pkg-feats { list-style: none; display: flex; flex-direction: column; gap: 10px; }
 
.pkg-feat {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; font-weight: 400;
  color: rgba(255,255,255,.7); line-height: 1.4;
}
 
.pkg-check {
  width: 18px; height: 18px; border-radius: 50%;
  border: 1px solid rgba(0,200,255,.35);
  background: rgba(0,200,255,.07);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: #00c8ff; font-size: 9px; font-weight: 700;
  transition: background .3s, border-color .3s;
}
.pkg-card:hover .pkg-check {
  background: rgba(0,200,255,.15); border-color: rgba(0,200,255,.5);
}
 
/* ── CTA button ── */
.pkg-cta {
  width: 100%; margin-top: 22px;
  padding: 13px 0; border-radius: 100px;
  font-size: 12px; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; cursor: pointer; border: none;
  transition: all .28s; display: flex; align-items: center; justify-content: center; gap: 6px;
}
.pkg-cta-ghost {
  background: transparent; color: #6a7d94;
  border: 1px solid rgba(255,255,255,.1);
}
.pkg-cta-ghost:hover {
  border-color: rgba(0,200,255,.4); color: #00c8ff;
  background: rgba(0,200,255,.05);
}
.pkg-cta-solid {
  background: linear-gradient(135deg, #00c8ff, #1d6ff2);
  color: #000; font-weight: 800;
  box-shadow: 0 0 24px rgba(0,200,255,.3);
}
.pkg-cta-solid:hover {
  box-shadow: 0 0 44px rgba(0,200,255,.55); transform: scale(1.02);
}
.pkg-arrow { transition: transform .25s; }
.pkg-cta:hover .pkg-arrow { transform: translateX(3px); }
 
/* ── Responsive ── */
@media (max-width: 768px) { .pkg-grid { grid-template-columns: 1fr; } }
@media (max-width: 480px) {
  .pkg-card  { padding: 22px 18px 20px; border-radius: 16px; }
  .pkg-price { font-size: 44px; }
  .pkg-name  { font-size: 22px; }
}
`;
 
export default function Packages() {
  const go = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
 
  return (
    <>
      <style>{packagesStyles}</style>
      <div className="s-wrap" id="packages">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Website Packages</div>
            <h2 className="s-title">Choose Your <em>Plan</em></h2>
            <p className="s-body">
              From a landing page to a full e-commerce store — for every budget and goal.
            </p>
          </div>
          <div className="pkg-grid">
            {PACKAGES.map((p, i) => (
              <div key={i} className={`pkg-card rev d${i + 1}${p.hot ? ' hot' : ''}`}>
                {p.hot && <div className="hot-badge">⭐ Popular</div>}
                <div className="pkg-num">{p.num}</div>
                <div className="pkg-name">{p.name}</div>
                <div className="pkg-price-block">
                  <div className="pkg-price">{p.price}</div>
                </div>
                <div className="pkg-del">
                  <div className="pkg-del-dot" />
                  {p.delivery}
                </div>
                <div className="pkg-divider" />
                <ul className="pkg-feats">
                  {p.features.map((f, j) => (
                    <li key={j} className="pkg-feat">
                      <div className="pkg-check">✓</div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`pkg-cta ${p.hot ? 'pkg-cta-solid' : 'pkg-cta-ghost'}`}
                  onClick={go}
                >
                  Get Started <span className="pkg-arrow">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}