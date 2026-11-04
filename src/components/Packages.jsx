// components/Packages.jsx — website plans, no prices
import { WEBSITE_PLANS } from '../data/plans';
import EnquireButton, { EnquireStyles } from './EnquireButton';

const styles = `
.pk-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); gap:14px; }
.pk-card {
  background:linear-gradient(160deg,#060d1a,#040a14);
  border:1px solid rgba(255,255,255,.07); border-radius:20px;
  padding:28px 22px 22px; display:flex; flex-direction:column;
  position:relative; overflow:hidden;
  transition:border-color .35s, transform .35s, box-shadow .35s;
}
.pk-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg,transparent,rgba(0,200,255,0),transparent);
  transition:background .4s;
}
.pk-card:hover { border-color:rgba(0,200,255,.22); transform:translateY(-5px); box-shadow:0 20px 50px rgba(0,0,0,.5); }
.pk-card:hover::before, .pk-card.hot::before { background:linear-gradient(90deg,transparent,#00c8ff,transparent); }
.pk-card.hot { border-color:rgba(0,200,255,.22); background:linear-gradient(160deg,#071225,#050e1f); }
.pk-badge {
  position:absolute; top:18px; right:18px; font-size:9px; font-weight:700;
  letter-spacing:.14em; text-transform:uppercase; color:#00c8ff;
  border:1px solid rgba(0,200,255,.4); padding:4px 10px; border-radius:100px;
  background:rgba(0,200,255,.08);
}
.pk-num { font-size:10px; letter-spacing:.2em; color:rgba(0,200,255,.4); margin-bottom:6px; }
.pk-name {
  font-family:'Bebas Neue',sans-serif; font-size:28px; letter-spacing:.03em;
  color:#eef4ff; line-height:1.05; margin-bottom:8px; padding-right:70px;
}
.pk-tag { font-size:13px; font-weight:300; color:rgba(238,244,255,.55); margin-bottom:14px; }
.pk-del {
  display:inline-flex; align-items:center; gap:7px; width:fit-content;
  font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
  color:#00e887; background:rgba(0,232,135,.07); border:1px solid rgba(0,232,135,.2);
  border-radius:100px; padding:5px 13px; margin-bottom:18px;
}
.pk-del i { width:6px; height:6px; border-radius:50%; background:#00e887; box-shadow:0 0 7px #00e887; }
.pk-div { height:1px; background:rgba(255,255,255,.06); margin-bottom:16px; }
.pk-feats { list-style:none; display:flex; flex-direction:column; gap:10px; flex:1; margin-bottom:22px; }
.pk-feat { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:rgba(238,244,255,.72); line-height:1.4; }
.pk-chk {
  width:17px; height:17px; border-radius:50%; flex-shrink:0; margin-top:1px;
  border:1px solid rgba(0,200,255,.35); background:rgba(0,200,255,.07);
  display:flex; align-items:center; justify-content:center; font-size:8px; color:#00c8ff;
}
@media (max-width:768px){ .pk-grid{ grid-template-columns:1fr; } }
`;

export default function Packages() {
  return (
    <>
      <style>{styles}</style>
      <EnquireStyles />
      <div className="s-wrap" id="packages">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Website & Custom Web App Packages</div>
            <h2 className="s-title">Choose Your <em>Plan</em></h2>
            <p className="s-body">
              From a landing page to a full e-commerce store — tap Enquire Now and
              we'll share the best option for your budget on WhatsApp.
            </p>
          </div>

          <div className="pk-grid">
            {WEBSITE_PLANS.map((p, i) => (
              <div key={p.num} className={`pk-card rev d${(i % 4) + 1}${p.hot ? ' hot' : ''}`}>
                {p.hot && <div className="pk-badge">⭐ Popular</div>}
                <div className="pk-num">{p.num}</div>
                <div className="pk-name">{p.name}</div>
                <div className="pk-tag">{p.tagline}</div>
                <div className="pk-del"><i />{p.delivery}</div>
                <div className="pk-div" />
                <ul className="pk-feats">
                  {p.features.map((f) => (
                    <li className="pk-feat" key={f}><span className="pk-chk">✓</span>{f}</li>
                  ))}
                </ul>
                <EnquireButton
                  plan={`${p.name} package`}
                  variant={p.hot ? 'solid' : 'ghost'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}