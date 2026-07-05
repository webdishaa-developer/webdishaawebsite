 
import { WHY } from "../data";
 
const whyStyles = `
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}
 
.why-cell {
  background: linear-gradient(145deg, #060d1a, #040a14);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px;
  padding: 26px 20px 22px;
  display: flex; flex-direction: column;
  position: relative; overflow: hidden;
  transition: border-color .35s, transform .35s, box-shadow .35s;
  min-height: 180px;
}
 
/* bottom glow line */
.why-cell::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,200,255,.0), transparent);
  transition: background .4s;
}
 
.why-cell:hover {
  border-color: rgba(0,200,255,.22);
  transform: translateY(-4px);
  box-shadow: 0 14px 40px rgba(0,0,0,.4), 0 0 1px rgba(0,200,255,.12);
}
.why-cell:hover::after {
  background: linear-gradient(90deg, transparent, rgba(0,200,255,.5), transparent);
}
 
.why-ic-box {
  width: 42px; height: 42px; border-radius: 12px;
  background: rgba(0,200,255,.08);
  border: 1px solid rgba(0,200,255,.18);
  display: flex; align-items: center; justify-content: center;
  color: #00c8ff; margin-bottom: 14px;
  transition: background .3s, border-color .3s, transform .3s;
  flex-shrink: 0;
}
.why-cell:hover .why-ic-box {
  background: rgba(0,200,255,.14); border-color: rgba(0,200,255,.35);
  transform: scale(1.08);
}
 
.why-t {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 17px; letter-spacing: .04em;
  color: #eef4ff; margin-bottom: 8px; line-height: 1.15;
}
 
.why-d {
  font-size: 13px; font-weight: 300;
  color: rgba(255,255,255,.52); line-height: 1.75;
  margin-top: auto;
}
 
/* ── Mobile: 2 columns ── */
@media (max-width: 768px) {
  .why-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .why-cell  { padding: 20px 16px; min-height: 160px; border-radius: 14px; }
  .why-t     { font-size: 15px; }
  .why-d     { font-size: 12.5px; }
  .why-ic-box { width: 38px; height: 38px; border-radius: 10px; }
}
 
@media (max-width: 360px) {
  .why-grid { grid-template-columns: 1fr; }
}
`;
 
export default function WhyUs() {
  return (
    <>
      <style>{whyStyles}</style>
      <div className="s-wrap" id="why">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Why Choose Us</div>
            <h2 className="s-title">Why Businesses <em>Trust</em> Us</h2>
            <p className="s-body">
              We're not just developers — we're your complete digital growth
              partner focused on real results for local businesses.
            </p>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={i} className={`why-cell rev d${(i % 4) + 1}`}>
                  <div className="why-ic-box">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div className="why-t">{w.title}</div>
                  <div className="why-d">{w.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
 