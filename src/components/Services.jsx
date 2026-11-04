// components/Services.jsx — "More Services", no prices
import { EXTRA_SERVICES } from '../data/plans';
import EnquireButton, { EnquireStyles } from './EnquireButton';

const styles = `
.ms-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:12px; }
.ms-card {
  background:linear-gradient(145deg,#060d1a,#040a14);
  border:1px solid rgba(255,255,255,.07); border-radius:18px;
  padding:24px 20px 20px; display:flex; flex-direction:column;
  position:relative; overflow:hidden;
  transition:border-color .3s, transform .3s, box-shadow .3s;
}
.ms-card::after {
  content:''; position:absolute; bottom:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg,transparent,rgba(0,200,255,0),transparent);
  transition:background .4s;
}
.ms-card:hover { border-color:rgba(0,200,255,.22); transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,.4); }
.ms-card:hover::after { background:linear-gradient(90deg,transparent,rgba(0,200,255,.5),transparent); }
.ms-ic {
  width:44px; height:44px; border-radius:12px; margin-bottom:14px;
  background:rgba(0,200,255,.08); border:1px solid rgba(0,200,255,.18);
  display:flex; align-items:center; justify-content:center; color:#00c8ff;
  transition:background .3s, transform .3s;
}
.ms-card:hover .ms-ic { background:rgba(0,200,255,.14); transform:scale(1.08); }
.ms-name { font-family:'Bebas Neue',sans-serif; font-size:21px; letter-spacing:.03em; color:#eef4ff; margin-bottom:6px; }
.ms-desc { font-size:13px; font-weight:300; color:rgba(238,244,255,.52); line-height:1.7; margin-bottom:18px; flex:1; }
@media (max-width:768px){ .ms-grid{ grid-template-columns:1fr; } }
`;

export default function Services() {
  return (
    <>
      <style>{styles}</style>
      <EnquireStyles />
      <div className="s-wrap" id="services">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">Branding & Setup</div>
            <h2 className="s-title">More <em>Services</em></h2>
            <p className="s-body">
              Complete your digital presence with branding, design and Google setup services.
            </p>
          </div>

          <div className="ms-grid">
            {EXTRA_SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.name} className={`ms-card rev d${(i % 4) + 1}`}>
                  <div className="ms-ic"><Icon size={20} strokeWidth={1.8} /></div>
                  <div className="ms-name">{s.name}</div>
                  <div className="ms-desc">{s.desc}</div>
                  <EnquireButton plan={`${s.name} service`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}