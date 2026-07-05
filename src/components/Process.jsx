import { PROCESS } from "../data";
 
const processStyles = `
/* ── Mobile-first: vertical animated timeline ── */
.proc-wrap { padding: 0; }
 
.proc-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}
 
/* glowing vertical spine */
.proc-list::before {
  content: '';
  position: absolute;
  left: 20px; top: 0; bottom: 0; width: 1px;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(0,200,255,.3) 8%,
    rgba(0,200,255,.3) 92%,
    transparent 100%
  );
  z-index: 0;
}
 
.proc-item {
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
  padding-bottom: 8px;
}
 
/* ── Number bubble ── */
.proc-node {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
 
.proc-bubble {
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0,200,255,.4);
  background: #03080f;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 13px; letter-spacing: .08em;
  color: #00c8ff;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 0 5px #03080f;
  transition: border-color .4s, box-shadow .4s, background .4s;
  position: relative;
}
 
/* pulse ring on hover */
.proc-bubble::after {
  content: '';
  position: absolute; inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(0,200,255,.2);
  opacity: 0;
  transition: opacity .4s, transform .4s;
  transform: scale(.8);
}
 
.proc-item:hover .proc-bubble {
  border-color: #00c8ff;
  background: rgba(0,200,255,.1);
  box-shadow: 0 0 20px rgba(0,200,255,.3), 0 0 0 5px #03080f;
}
.proc-item:hover .proc-bubble::after {
  opacity: 1; transform: scale(1);
}
 
/* ── Card ── */
.proc-card {
  flex: 1;
  margin-left: 16px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #060d1a, #040a14);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 14px;
  padding: 20px 18px 18px;
  position: relative;
  overflow: hidden;
  transition: border-color .35s, transform .35s, box-shadow .35s;
}
 
/* cyan top sweep */
.proc-card::before {
  content: '';
  position: absolute; top: 0; left: -100%; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00c8ff, transparent);
  transition: left .5s ease;
}
 
/* corner glow */
.proc-card::after {
  content: '';
  position: absolute; top: -40px; right: -40px;
  width: 120px; height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,200,255,.06), transparent 70%);
  opacity: 0; transition: opacity .4s;
}
 
.proc-item:hover .proc-card {
  border-color: rgba(0,200,255,.25);
  transform: translateX(4px);
  box-shadow: 0 8px 32px rgba(0,0,0,.4), 0 0 1px rgba(0,200,255,.15);
}
.proc-item:hover .proc-card::before { left: 0; }
.proc-item:hover .proc-card::after  { opacity: 1; }
 
/* step icon row */
.proc-top {
  display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
}
 
.proc-icon-box {
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(0,200,255,.08);
  border: 1px solid rgba(0,200,255,.2);
  display: flex; align-items: center; justify-content: center;
  color: #00c8ff; flex-shrink: 0;
  transition: background .3s, border-color .3s;
}
.proc-item:hover .proc-icon-box {
  background: rgba(0,200,255,.15);
  border-color: rgba(0,200,255,.4);
}
 
.proc-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px; letter-spacing: .05em; color: #eef4ff; line-height: 1.1;
}
 
.proc-desc {
  font-size: 13.5px; font-weight: 300;
  color: rgba(255,255,255,.55); line-height: 1.75;
}
 
/* ── DESKTOP: horizontal row ── */
@media (min-width: 769px) {
  .proc-list {
    flex-direction: row;
    align-items: stretch;
    gap: 12px;
  }
  .proc-list::before {
    left: 0; right: 0; top: 20px; bottom: auto;
    width: auto; height: 1px;
    background: linear-gradient(90deg,
      transparent, rgba(0,200,255,.3) 10%,
      rgba(0,200,255,.3) 90%, transparent
    );
  }
  .proc-item {
    flex: 1; flex-direction: column;
    align-items: flex-start; padding-bottom: 0;
  }
  .proc-node { flex-direction: row; width: auto; margin-bottom: 14px; }
  .proc-card { margin-left: 0; margin-bottom: 0; height: 100%; transform: none !important; }
  .proc-item:hover .proc-card { transform: translateY(-4px) !important; }
}
 
@media (min-width: 769px) and (max-width: 1100px) {
  .proc-title { font-size: 15px; }
  .proc-desc  { font-size: 12.5px; }
  .proc-card  { padding: 16px 14px; }
}
`;
 
export default function Process() {
  return (
    <>
      <style>{processStyles}</style>
      <div className="s-wrap" id="process">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">How We Work</div>
            <h2 className="s-title">Our Simple <em>4-Step</em> Process</h2>
            <p className="s-body">
              From first call to live website — a clear, transparent process
              so you always know what's happening.
            </p>
          </div>
          <div className="proc-list">
            {PROCESS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className={`proc-item rev d${i + 1}`}>
                  <div className="proc-node">
                    <div className="proc-bubble">0{i + 1}</div>
                  </div>
                  <div className="proc-card">
                    <div className="proc-top">
                      <div className="proc-icon-box">
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div className="proc-title">{p.title}</div>
                    </div>
                    <div className="proc-desc">{p.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}