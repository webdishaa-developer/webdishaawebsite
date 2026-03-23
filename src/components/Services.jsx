import { useRef, useCallback, useEffect } from 'react';
import { SERVICES } from '../data';

const styles = `
.tilt-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(160px,1fr));
  gap: 12px;
}
.tilt-card {
  background: #03080f; border: 1px solid rgba(255,255,255,.06);
  padding: 24px 20px; display: flex; flex-direction: column; gap: 8px;
  transition: border-color .3s, box-shadow .3s, transform .15s ease;
  transform-style: preserve-3d; will-change: transform; cursor: default;
  position: relative; overflow: hidden;
}
.tilt-card:hover {
  border-color: rgba(0,200,255,.25);
  box-shadow: 0 10px 36px rgba(0,0,0,.4), 0 0 18px rgba(0,200,255,.07);
}
.tilt-ic { font-size: 24px; display: block; }
.tilt-nm { font-size: 12.5px; font-weight: 400; color: rgba(255,255,255,.7); line-height: 1.4; }
.tilt-pr { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: #ff6b35; letter-spacing: .03em; }
.tilt-shine {
  position: absolute; inset: 0;
  background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.05),transparent 60%);
  pointer-events: none; opacity: 0; transition: opacity .3s;
}
.tilt-card:hover .tilt-shine { opacity: 1; }
@media (max-width:768px) {
  .tilt-grid { grid-template-columns: repeat(2,1fr); gap: 10px; }
  .tilt-card { padding: 20px 16px; }
}
@media (max-width:480px) {
  .tilt-grid { grid-template-columns: repeat(2,1fr); gap: 8px; }
  .tilt-card { padding: 18px 14px; }
  .tilt-ic { font-size: 20px; }
  .tilt-pr { font-size: 20px; }
}
@media (max-width:360px) { .tilt-grid { grid-template-columns: 1fr; } }
`;

function TiltCard({ icon, name, price }) {
  const ref = useRef(null);
  const isMobile = useRef(window.innerWidth < 768);

  useEffect(() => {
    const fn = () => { isMobile.current = window.innerWidth < 768; };
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);

  const onMove = useCallback((e) => {
    if (isMobile.current) return;
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02,1.02,1.02)`;
    el.style.setProperty('--mx', mx + '%');
    el.style.setProperty('--my', my + '%');
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(700px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  }, []);

  return (
    <div ref={ref} className="tilt-card" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="tilt-shine" />
      <div className="tilt-ic">{icon}</div>
      <div className="tilt-nm">{name}</div>
      <div className="tilt-pr">{price}</div>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <style>{styles}</style>
      <div className="s-wrap" id="services">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Branding & Setup</div>
            <h2 className="s-title">More <em>Services</em></h2>
            <p className="s-body">Complete your digital presence with branding, design, and Google setup services.</p>
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
