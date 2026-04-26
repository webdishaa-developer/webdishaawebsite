import { SOCIAL_PACKS } from '../data';

const styles = `
.soc-grid {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 16px; 
}
.soc-cell {
  background: #03080f;
  padding: 38px 30px;

  display: flex;              /* 🔑 */
  flex-direction: column;     /* 🔑 */

  height: 100%;               /* 🔑 */
  min-height: 220px;          /* 🔑 adjust if needed */

  position: relative;
  overflow: hidden;

  border: 1px solid rgba(255,255,255,.06);
  border-radius: 6px;

  transition: background .25s, border-color .25s;
}
.soc-cell::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg,transparent,#00c8ff,transparent);
  opacity: 0; transition: opacity .3s;
}
.soc-cell:hover { background: #060f1e; }
.soc-cell:hover::after { opacity: .6; }
.soc-tier {
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  color: #00c8ff; margin-bottom: 14px;
}
.soc-name {
  font-family: 'Bebas Neue', sans-serif; font-size: 26px;
  letter-spacing: .02em; margin-bottom: 10px;
  min-height: 52px;
}
.soc-price {
  font-family: 'Bebas Neue', sans-serif; font-size: 46px; line-height: 1;
}
.soc-posts { font-size: 13px; font-weight: 300; color: #6a7d94; margin-top: 8px;   margin-top: auto;}
.soc-posts b { color: #eef4ff; }
.soc-badge {
  display: inline-block; margin-top: 14px;
  font-size: 11px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase;
  background: rgba(0,200,255,.08); color: #00c8ff;
  border: 1px solid rgba(0,200,255,.2); padding: 4px 12px; border-radius: 100px;
      text-align: center;
}
@media (max-width:768px) {
  .soc-grid { grid-template-columns: 1fr; }
  .soc-cell { padding: 28px 22px; }
  .soc-price { font-size: 40px; }
}
`;

export default function SocialPacks() {
  return (
    <>
      <style>{styles}</style>
      <div className="s-wrap" id="social">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Social Media</div>
            <h2 className="s-title">Social Media <em>Packs</em></h2>
            <p className="s-body">
              Keep your audience engaged with professionally designed posts every month.
              Build your brand presence across Instagram, Facebook &amp; more.
            </p>
          </div>
          <div className="soc-grid">
            {SOCIAL_PACKS.map((s, i) => (
              <div className={`soc-cell rev d${i + 1}`}>
                  <div className="soc-tier">{s.tier}</div>
                  <div className="soc-name">{s.name}</div>
                  <div className="soc-price">{s.price}</div>
                  <div className="soc-posts">
                    <b>{s.posts}</b> Social Media Posts
                  </div>
                  <div className="soc-badge">Per Month  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
