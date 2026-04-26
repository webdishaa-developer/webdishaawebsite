import { PACKAGES } from '../data';

const styles = `
.pkg-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px,1fr));
  gap: 16px;

}
.pkg-card {
  background: #03080f;
  padding: 30px 26px;

  display: flex;              /* 🔑 */
  flex-direction: column;     /* 🔑 */
  
  height: 100%;               /* 🔑 */
  min-height: 420px;          /* 🔑 adjust if needed */

  position: relative;
  overflow: hidden;
  transition: background .25s, border-color .25s;
}
.pkg-card::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg,transparent,#00c8ff,transparent);
  opacity: 0; transition: opacity .3s;
}
.pkg-card:hover { background: #060f1e; }
.pkg-card:hover::after { opacity: 1; }
.pkg-card.hot { background: #050d1c; }
.pkg-card.hot::after { opacity: .5; }
.hot-badge {
  position: absolute; top: 16px; right: 16px;
  font-size: 10px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase;
  color: #00c8ff; border: 1px solid rgba(0,200,255,.3); padding: 3px 10px; border-radius: 100px;
}
.pkg-num { font-size: 11px; letter-spacing: .15em; color: #2a3a4e; margin-bottom: 16px; font-family: 'Bebas Neue', sans-serif; }
.pkg-name { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: .03em;   min-height: 48px;}
.pkg-price { font-family: 'Bebas Neue', sans-serif; font-size: 42px; line-height: 1.1; color: #00c8ff; margin: 10px 0 4px; }
.pkg-del {
  font-size: 11px; font-weight: 500; letter-spacing: .07em; text-transform: uppercase;
  color: #6a7d94; border-top: 1px solid rgba(255,255,255,.07);
  padding-top: 11px; margin: 11px 0 16px;
  display: flex; align-items: center; gap: 7px;
}
.pkg-del::before { content: '◆'; font-size: 6px; color: #00e887; }
.pkg-feats { list-style: none; display: flex; flex-direction: column; gap: 7px;   margin-top: auto;}
.pkg-feats li { 
font-size: 0.8em; 
font-weight: 500; 
color:white; display: flex; gap: 8px; }
.pkg-feats li::before { content: '—'; color: #2a3a4e; flex-shrink: 0; }
@media (max-width:768px) { .pkg-grid { grid-template-columns: 1fr; } }
@media (max-width:480px) { .pkg-card { padding: 24px 20px; } .pkg-price { font-size: 36px; } }
`;

export default function Packages() {
  return (
    <>
      <style>{styles}</style>
      <div className="s-wrap" id="packages">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Website Packages</div>
            <h2 className="s-title">Choose Your <em>Plan</em></h2>
            <p className="s-body">From a landing page to a full e-commerce store — for every budget and goal.</p>
          </div>
          <div className="pkg-grid">
            {PACKAGES.map((p, i) => (
           <div className={`pkg-card rev d${i + 1}${p.hot ? ' hot' : ''}`}>
                  {p.hot && <div className="hot-badge">Popular</div>}
                  <div className="pkg-num">{p.num}</div>
                  <div className="pkg-name">{p.name}</div>
                  <div className="pkg-price">{p.price}</div>
                  <div className="pkg-del">{p.delivery}</div>
                  <ul className="pkg-feats">
                    {p.features.map((f, j) => <li key={j}>{f}</li>)}
                  </ul>
                </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
