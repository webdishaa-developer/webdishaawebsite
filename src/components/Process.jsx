import { PROCESS } from "../data";

const styles = `
.process-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
  gap: 16px;
  // background: rgba(255,255,255,.06);
  // border: 1px solid rgba(255,255,255,.06);
  align-items: stretch; 
}

.process-step {
  background: #03080f;
  padding: 34px 26px;

  display: flex;              /* 🔑 */
  flex-direction: column;     /* 🔑 */
  justify-content: flex-start;
  align-items: center;

  height: 100%;               /* 🔑 makes all equal inside grid */
  min-height: 260px;          /* 🔑 force same size */

  text-align: center;
  transition: background .25s;
}

.process-step:hover {
  background: #060f1e;
}

.step-num {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(0,200,255,.3);
  font-family: 'Bebas Neue', sans-serif;
  font-size: 14px;
  letter-spacing: .1em;
  color: #00c8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}

/* ✅ FIXED ICON STYLE */
.step-ic {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: #00c8ff;
}

.step-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 19px;
  letter-spacing: .04em;
  margin-bottom: 8px;
   min-height: 40px; 
}

.step-desc {
    font-size: 1em;
    font-weight: 300;
    color: white;
    line-height: 1.7;
      margin-top: auto; 
}

@media (max-width:768px) {
  .process-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width:480px) {
  .process-grid { grid-template-columns: 1fr; }
  .process-step { padding: 26px 20px; }
}
`;

export default function Process() {
  return (
    <>
      <style>{styles}</style>

      <div className="s-wrap" id="process">
        <div className="s-inner">

          <div className="rev">
            <div className="s-eyebrow">How We Work</div>

            <h2 className="s-title">
              Our Simple <em>4-Step</em> Process
            </h2>

            <p className="s-body">
              From first call to live website — a clear, transparent process
              so you always know what's happening.
            </p>
          </div>

          <div className="process-grid">
            {PROCESS.map((p, i) => {
              const Icon = p.icon; // ✅ KEY FIX

              return (
                <div key={i} className={`process-step rev d${i + 1}`}>
                  <div className="process-step">

                    <div className="step-num">0{i + 1}</div>

                    {/* ✅ ICON FIX */}
                    <div className="step-ic">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>

                    <div className="step-title">{p.title}</div>
                    <div className="step-desc">{p.desc}</div>

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