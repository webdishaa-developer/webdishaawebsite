 
import { useState } from 'react';
import { TESTIMONIALS } from '../data';
 
const testiStyles = `
/* ── Mobile: horizontal snap scroll carousel ── */
.testi-track-wrap {
  position: relative;
  margin: 0 -5%;
  padding: 0 5%;
}
 
.testi-track {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 4px;
}
.testi-track::-webkit-scrollbar { display: none; }
 
.testi-card {
  background: linear-gradient(145deg, #060d1a, #040a14);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 18px;
  padding: 24px 20px;
  position: relative; overflow: hidden;
  transition: border-color .3s, transform .3s, box-shadow .3s;
  scroll-snap-align: start;
  flex: 0 0 calc(100% - 28px);   /* mobile: 1 card */
  min-width: 0;
}
 
.testi-card::before {
  content: '"';
  position: absolute; top: -14px; right: 16px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 100px; line-height: 1;
  color: rgba(0,200,255,.04); pointer-events: none;
}
 
/* top accent line on active/hover */
.testi-card::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,200,255,.0), transparent);
  transition: background .4s;
}
.testi-card:hover::after,
.testi-card.active::after {
  background: linear-gradient(90deg, transparent, #00c8ff, transparent);
}
 
.testi-card:hover { border-color: rgba(0,200,255,.2); transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,.4); }
 
/* stars */
.testi-stars {
  display: flex; gap: 3px; margin-bottom: 14px;
}
.star { font-size: 13px; color: #ffb830; }
.star.empty { color: rgba(255,255,255,.15); }
 
.testi-text {
  font-size: 14.5px; font-weight: 400;
  line-height: 1.8; color: rgba(255,255,255,.72);
  margin-bottom: 18px;
}
 
.testi-author {
  display: flex; align-items: center; gap: 12px;
  border-top: 1px solid rgba(255,255,255,.05);
  padding-top: 14px;
}
 
.testi-avatar {
  width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, #1d6ff2, #00c8ff);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Bebas Neue', sans-serif; font-size: 15px; color: #000;
  box-shadow: 0 0 14px rgba(0,200,255,.25);
}
 
.testi-name  { font-size: 13px; font-weight: 600; color: #eef4ff; }
.testi-role  { font-size: 11.5px; font-weight: 300; color: #6a7d94; margin-top: 1px; }
 
/* ── Dot indicators ── */
.testi-dots {
  display: flex; justify-content: center; gap: 7px; margin-top: 18px;
}
.testi-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(255,255,255,.15); cursor: pointer;
  transition: background .3s, transform .3s, width .3s;
  border: none; padding: 0;
}
.testi-dot.on {
  background: #00c8ff; width: 20px; border-radius: 3px;
  box-shadow: 0 0 8px rgba(0,200,255,.5);
}
 
/* ── Desktop: grid ── */
@media (min-width: 769px) {
  .testi-track-wrap { margin: 0; padding: 0; }
  .testi-track {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    overflow-x: visible; gap: 16px; scroll-snap-type: none;
  }
  .testi-card { flex: none; width: auto; }
  .testi-dots { display: none; }
}
`;
 
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const trackRef = useState(null);
 
  const scrollTo = (i) => {
    setActive(i);
    const track = document.querySelector('.testi-track');
    if (!track) return;
    const card = track.children[i];
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };
 
  return (
    <>
      <style>{testiStyles}</style>
      <div className="s-wrap" id="testimonials">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Client Reviews</div>
            <h2 className="s-title">What Clients <em>Say</em></h2>
            <p className="s-body">
              Real feedback from real local businesses we've helped go digital across Chhattisgarh.
            </p>
          </div>
 
          <div className="testi-track-wrap">
            <div className="testi-track">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`testi-card rev d${(i % 3) + 1}`}>
                  <div className="testi-stars">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={`star${s > t.stars ? ' empty' : ''}`}>★</span>
                    ))}
                  </div>
                  <div className="testi-text">"{t.text}"</div>
                  <div className="testi-author">
                    <div className="testi-avatar">{t.init}</div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Mobile dots */}
          <div className="testi-dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={`testi-dot${active === i ? ' on' : ''}`} onClick={() => scrollTo(i)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
 