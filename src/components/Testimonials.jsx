import { TESTIMONIALS } from '../data';

const styles = `
.testi-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr));
  gap: 14px;
}
.testi-card {
  background: #03080f; border: 1px solid rgba(255,255,255,.06);
  padding: 26px 24px; position: relative; overflow: hidden;
  transition: border-color .3s, transform .3s;
}
.testi-card:hover { border-color: rgba(0,200,255,.2); transform: translateY(-3px); }
.testi-card::before {
  content: '"'; position: absolute; top: -10px; right: 18px;
  font-family: 'Bebas Neue', sans-serif; font-size: 90px; line-height: 1;
  color: rgba(0,200,255,.05); pointer-events: none;
}
.testi-stars { color: #ffb830; font-size: 13px; margin-bottom: 12px; letter-spacing: 2px; }
.testi-text { font-size: 13.5px; font-weight: 300; line-height: 1.8; color: rgba(255,255,255,.7); margin-bottom: 18px; }
.testi-author { display: flex; align-items: center; gap: 12px; }
.testi-avatar {
  width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg,#1d6ff2,#00c8ff);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Bebas Neue', sans-serif; font-size: 15px; color: #000;
}
.testi-name { font-size: 13px; font-weight: 600; color: #eef4ff; }
.testi-role { font-size: 11.5px; font-weight: 300; color: #6a7d94; }
@media (max-width:768px) { .testi-grid { grid-template-columns: 1fr; } }
`;

export default function Testimonials() {
  return (
    <>
      <style>{styles}</style>
      <div className="s-wrap" id="testimonials">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Client Reviews</div>
            <h2 className="s-title">What Clients <em>Say</em></h2>
            <p className="s-body">Real feedback from real local businesses we've helped go digital across Chhattisgarh.</p>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`rev d${(i % 3) + 1}`}>
                <div className="testi-card">
                  <div className="testi-stars">
                    {'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
