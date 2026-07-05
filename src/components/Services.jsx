
import { useRef, useCallback, useEffect } from "react";
import { SERVICES } from "../data";
 
const servicesStyles = `
.tilt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 12px;
}
 
.tilt-card {
  background: linear-gradient(145deg, #060d1a, #040a14);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px;
  padding: 22px 18px 18px;
  display: flex; flex-direction: column;
  gap: 0;
  min-height: 160px;
  transition: border-color .3s, box-shadow .3s;
  transform-style: preserve-3d;
  will-change: transform;
  position: relative; overflow: hidden;
  cursor: default;
}
 
.tilt-card:hover {
  border-color: rgba(0,200,255,.25);
  box-shadow: 0 12px 40px rgba(0,0,0,.45), 0 0 20px rgba(0,200,255,.08);
}
 
/* shine overlay */
.tilt-shine {
  position: absolute; inset: 0;
  background: radial-gradient(circle at var(--mx,50%) var(--my,50%),
    rgba(255,255,255,.05), transparent 55%
  );
  pointer-events: none; opacity: 0; transition: opacity .3s;
  border-radius: inherit;
}
.tilt-card:hover .tilt-shine { opacity: 1; }
 
/* bottom cyan sweep */
.tilt-card::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,200,255,.0), transparent);
  transition: background .3s;
}
.tilt-card:hover::after {
  background: linear-gradient(90deg, transparent, rgba(0,200,255,.5), transparent);
}
 
.tilt-ic-box {
  width: 38px; height: 38px; border-radius: 10px;
  background: rgba(0,200,255,.08);
  border: 1px solid rgba(0,200,255,.18);
  display: flex; align-items: center; justify-content: center;
  color: #00c8ff; margin-bottom: 12px;
  transition: background .3s, border-color .3s;
  flex-shrink: 0;
}
.tilt-card:hover .tilt-ic-box {
  background: rgba(0,200,255,.14); border-color: rgba(0,200,255,.35);
}
 
.tilt-nm {
  font-size: 13px; font-weight: 500;
  color: rgba(255,255,255,.75); line-height: 1.45;
  flex: 1;
}
 
.tilt-pr {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px; color: #ff6b35; letter-spacing: .03em;
  margin-top: 10px;
}
 
/* ── Mobile: 2 columns, no 3D tilt ── */
@media (max-width: 768px) {
  .tilt-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .tilt-card  { padding: 18px 14px; border-radius: 14px; min-height: 150px; }
  .tilt-nm    { font-size: 12.5px; }
  .tilt-pr    { font-size: 20px; }
}
 
@media (max-width: 360px) {
  .tilt-grid { grid-template-columns: 1fr; }
}
`;
 
function TiltCard({ icon, name, price }) {
  const ref = useRef(null);
  const mobile = useRef(false);
 
  useEffect(() => {
    const upd = () => { mobile.current = window.innerWidth < 768; };
    upd();
    window.addEventListener('resize', upd, { passive: true });
    return () => window.removeEventListener('resize', upd);
  }, []);
 
  const onMove = useCallback((e) => {
    if (mobile.current) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - .5) * 18;
    const y = ((e.clientY - r.top)  / r.height - .5) * -18;
    el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.03,1.03,1.03)`;
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    el.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
  }, []);
 
  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(700px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  }, []);
 
  const Icon = icon;
  return (
    <div ref={ref} className="tilt-card" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="tilt-shine" />
      <div className="tilt-ic-box"><Icon size={20} strokeWidth={1.8} /></div>
      <div className="tilt-nm">{name}</div>
      <div className="tilt-pr">{price}</div>
    </div>
  );
}
 
export default function Services() {
  return (
    <>
      <style>{servicesStyles}</style>
      <div className="s-wrap" id="services">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Branding & Setup</div>
            <h2 className="s-title">More <em>Services</em></h2>
            <p className="s-body">
              Complete your digital presence with branding, design, and Google setup services.
            </p>
          </div>
          <div className="tilt-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className={`rev d${(i % 4) + 1}`}>
                <TiltCard icon={s.icon} name={s.name} price={s.price} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}