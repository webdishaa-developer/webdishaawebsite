import { WHY } from '../data';

const styles = `
.why-grid {
  display: grid; grid-template-columns: repeat(auto-fill,minmax(185px,1fr));
  gap: 1px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.06);
}
.why-cell {
  background: #03080f; padding: 30px 24px; transition: background .25s;
  position: relative; overflow: hidden;
}
.why-cell::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg,transparent,#00c8ff,transparent);
  opacity: 0; transition: opacity .3s;
}
.why-cell:hover { background: #060f1e; }
.why-cell:hover::after { opacity: .5; }
.why-ic { font-size: 28px; margin-bottom: 14px; display: block; }
.why-t {
  font-family: 'Bebas Neue', sans-serif; font-size: 18px;
  letter-spacing: .04em; margin-bottom: 8px;
}
.why-d { font-size: 13px; font-weight: 300; color: #6a7d94; line-height: 1.7; }

@media (max-width:768px) {
  .why-grid { grid-template-columns: 1fr 1fr; }
  .why-cell { padding: 24px 18px; }
}
@media (max-width:480px) {
  .why-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width:360px) {
  .why-grid { grid-template-columns: 1fr; }
}
`;

export default function WhyUs() {
  return (
    <>
      <style>{styles}</style>
      <div className="s-wrap" id="why">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Why Choose Us</div>
            <h2 className="s-title">Why Businesses <em>Trust</em> Us</h2>
            <p className="s-body">
              We're not just developers — we're your complete digital growth partner
              focused on real results for local businesses.
            </p>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div key={i} className={`rev d${(i % 4) + 1}`}>
                <div className="why-cell">
                  <span className="why-ic">{w.icon}</span>
                  <div className="why-t">{w.title}</div>
                  <div className="why-d">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
