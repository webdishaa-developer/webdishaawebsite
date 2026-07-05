
import { SOCIAL_PACKS } from '../data';
 
const socialStyles = `
.soc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
 
.soc-cell {
  background: linear-gradient(145deg, #060d1a, #040a14);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 18px;
  padding: 30px 22px 24px;
  display: flex; flex-direction: column;
  position: relative; overflow: hidden;
  transition: border-color .3s, transform .3s, box-shadow .3s;
  min-height: 240px;
}
 
.soc-cell::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,200,255,.0), transparent);
  transition: background .4s;
}
.soc-cell:hover {
  border-color: rgba(0,200,255,.2);
  transform: translateY(-4px);
  box-shadow: 0 16px 44px rgba(0,0,0,.4);
}
.soc-cell:hover::before {
  background: linear-gradient(90deg, transparent, #00c8ff, transparent);
}
 
/* accent color per tier */
.soc-cell:nth-child(2) { border-color: rgba(0,200,255,.15); }
.soc-cell:nth-child(2)::before {
  background: linear-gradient(90deg, transparent, rgba(0,200,255,.6), transparent);
}
 
.soc-tier {
  font-size: 10px; font-weight: 700; letter-spacing: .2em;
  text-transform: uppercase; color: #00c8ff;
  margin-bottom: 12px; display: flex; align-items: center; gap: 7px;
}
.soc-tier::before {
  content: ''; width: 14px; height: 1px; background: #00c8ff;
}
 
.soc-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px; letter-spacing: .03em;
  color: #eef4ff; margin-bottom: 14px; line-height: 1.1; min-height: 46px;
}
 
.soc-price {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 42px; line-height: 1;
  background: linear-gradient(135deg, #eef4ff, #00c8ff);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
}
 
.soc-posts {
  font-size: 12.5px; font-weight: 300; color: #6a7d94;
  margin-top: auto; padding-top: 14px;
  border-top: 1px solid rgba(255,255,255,.05);
}
.soc-posts b { color: #eef4ff; }
 
.soc-badge {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 12px;
  font-size: 10px; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase;
  background: rgba(0,200,255,.08); color: #00c8ff;
  border: 1px solid rgba(0,200,255,.2); padding: 5px 12px; border-radius: 100px;
  width: fit-content;
}
.soc-badge::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%;
  background: #00c8ff; box-shadow: 0 0 6px #00c8ff;
}
 
/* ── Mobile: single column ── */
@media (max-width: 768px) {
  .soc-grid { grid-template-columns: 1fr; gap: 12px; }
  .soc-cell { padding: 24px 18px 20px; min-height: auto; border-radius: 16px; }
  .soc-price { font-size: 38px; }
  .soc-name  { font-size: 20px; min-height: auto; }
}
 
@media (max-width: 1100px) and (min-width: 769px) {
  .soc-name  { font-size: 18px; }
  .soc-price { font-size: 34px; }
  .soc-cell  { padding: 22px 16px; }
}
`;
 
export default function SocialPacks() {
  return (
    <>
      <style>{socialStyles}</style>
      <div className="s-wrap" id="social">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Social Media</div>
            <h2 className="s-title">Social Media <em>Packs</em></h2>
            <p className="s-body">
              Keep your audience engaged with professionally designed posts every month.
              Build your brand presence across Instagram, Facebook & more.
            </p>
          </div>
          <div className="soc-grid">
            {SOCIAL_PACKS.map((s, i) => (
              <div key={i} className={`soc-cell rev d${i + 1}`}>
                <div className="soc-tier">{s.tier}</div>
                <div className="soc-name">{s.name}</div>
                <div className="soc-price">{s.price}</div>
                <div className="soc-posts"><b>{s.posts}</b> Social Media Posts</div>
                <div className="soc-badge">Per Month</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}