import { useEffect, useState } from 'react';

const styles = `
.ld-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #03080f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity .55s ease, visibility .55s ease;
}

.ld-overlay.ld-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* ── stars ── */
.ld-stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 12% 22%, rgba(180,210,255,.6) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 35% 65%, rgba(180,210,255,.8) 0%,transparent 100%),
    radial-gradient(1px 1px at 67% 18%, rgba(180,210,255,.5) 0%,transparent 100%),
    radial-gradient(1px 1px at 80% 45%, rgba(180,210,255,.4) 0%,transparent 100%),
    radial-gradient(1px 1px at 5%  82%, rgba(180,210,255,.6) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 55% 72%, rgba(180,210,255,.7) 0%,transparent 100%),
    radial-gradient(1px 1px at 48% 12%, rgba(180,210,255,.4) 0%,transparent 100%),
    radial-gradient(1px 1px at 92% 88%, rgba(180,210,255,.5) 0%,transparent 100%),
    radial-gradient(1px 1px at 23% 50%, rgba(180,210,255,.4) 0%,transparent 100%),
    radial-gradient(1px 1px at 73% 35%, rgba(180,210,255,.6) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 18% 78%, rgba(180,210,255,.7) 0%,transparent 100%),
    radial-gradient(1px 1px at 60% 55%, rgba(180,210,255,.5) 0%,transparent 100%),
    radial-gradient(1px 1px at 41% 38%, rgba(180,210,255,.5) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 88% 14%, rgba(180,210,255,.7) 0%,transparent 100%),
    radial-gradient(1px 1px at 3%  44%, rgba(180,210,255,.4) 0%,transparent 100%);
  animation: ldTwinkle 7s ease-in-out infinite alternate;
}
@keyframes ldTwinkle { 0%{opacity:.4} 100%{opacity:1} }

/* ── ambient ── */
.ld-ambient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 10% 15%, rgba(29,111,242,.09) 0%,transparent 60%),
    radial-gradient(ellipse 50% 40% at 88% 82%, rgba(0,200,255,.07) 0%,transparent 60%);
}

/* ── planet wrapper ── */
.ld-planet-wrap {
  position: relative;
  z-index: 2;
  width: 200px;
  height: 200px;
  animation: ldFloat 3.5s ease-in-out infinite;
}
@keyframes ldFloat {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-14px); }
}

/* ── orbital rings ── */
.ld-ring {
  position: absolute;
  top: 50%; left: 50%;
  border-radius: 50%;
}
.ld-ring-1 {
  width: 270px; height: 270px;
  margin: -135px 0 0 -135px;
  border: 2px solid rgba(0,200,255,.18);
  box-shadow: 0 0 16px rgba(0,200,255,.12);
  transform: rotateX(72deg);
  animation: ldRing 6s linear infinite;
}
.ld-ring-2 {
  width: 238px; height: 238px;
  margin: -119px 0 0 -119px;
  border: 1px solid rgba(0,200,255,.09);
  transform: rotateX(72deg);
  animation: ldRing 10s linear infinite reverse;
}
@keyframes ldRing {
  from { transform: rotateX(72deg) rotateZ(0deg); }
  to   { transform: rotateX(72deg) rotateZ(360deg); }
}

/* ── orbiting dot ── */
.ld-dot-orbit {
  position: absolute;
  top: 50%; left: 50%;
  width: 270px; height: 270px;
  margin: -135px 0 0 -135px;
  border-radius: 50%;
  transform: rotateX(72deg);
  animation: ldRing 4.5s linear infinite;
}
.ld-dot-orbit::before {
  content: '';
  position: absolute;
  top: -4px; left: 50%;
  margin-left: -4px;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #00c8ff;
  box-shadow: 0 0 10px #00c8ff, 0 0 22px rgba(0,200,255,.65);
}

/* ── planet svg ── */
.ld-planet-svg {
  width: 100%; height: 100%;
  filter:
    drop-shadow(0 0 38px rgba(29,111,242,.5))
    drop-shadow(0 0 72px rgba(0,200,255,.15));
}

/* ── brand text ── */
.ld-brand {
  position: relative;
  z-index: 3;
  margin-top: 32px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 40px;
  letter-spacing: .06em;
  color: #fff;
  line-height: 1;
}
.ld-brand span { color: #00c8ff; }

.ld-tagline {
  position: relative;
  z-index: 3;
  margin-top: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(0,200,255,.6);
}

/* ── progress bar ── */
.ld-bar-wrap {
  position: relative;
  z-index: 3;
  margin-top: 28px;
  width: 180px;
  height: 1px;
  background: rgba(255,255,255,.07);
  border-radius: 1px;
  overflow: hidden;
}
.ld-bar-fill {
  height: 100%;
  border-radius: 1px;
  background: linear-gradient(90deg, #1d6ff2, #00c8ff);
  box-shadow: 0 0 8px rgba(0,200,255,.5);
  width: 0%;
  transition: width .4s ease;
}
`;

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Animate the progress bar in steps
    const steps = [
      { target: 30,  delay: 200  },
      { target: 60,  delay: 500  },
      { target: 85,  delay: 900  },
      { target: 100, delay: 1400 },
    ];

    const timers = steps.map(({ target, delay }) =>
      setTimeout(() => setProgress(target), delay)
    );

    // Hide loader after progress reaches 100 + short pause
    const hideTimer = setTimeout(() => setHidden(true), 2200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>

      <div className={`ld-overlay${hidden ? ' ld-hidden' : ''}`} aria-hidden="true">
        <div className="ld-stars" />
        <div className="ld-ambient" />

        {/* Planet + orbital rings */}
        <div className="ld-planet-wrap">
          <div className="ld-ring ld-ring-1" />
          <div className="ld-ring ld-ring-2" />
          <div className="ld-dot-orbit" />

          <svg
            className="ld-planet-svg"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="ldPg" cx="33%" cy="30%">
                <stop offset="0%"   stopColor="#1a4fd6" />
                <stop offset="45%"  stopColor="#082050" />
                <stop offset="100%" stopColor="#000a1a" />
              </radialGradient>
              <radialGradient id="ldPh" cx="33%" cy="30%">
                <stop offset="0%"  stopColor="rgba(120,180,255,.22)" />
                <stop offset="60%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
              <clipPath id="ldPc"><circle cx="100" cy="100" r="90" /></clipPath>
              <filter id="ldPf"><feGaussianBlur stdDeviation="2" /></filter>
            </defs>

            <circle cx="100" cy="100" r="90" fill="url(#ldPg)" />

            {/* Latitude rings */}
            {[38, 62, 100, 138, 162].map((cy, i) => (
              <ellipse key={i} cx="100" cy={cy} rx="90" ry="11"
                fill="none" stroke="rgba(0,200,255,.07)" strokeWidth="1" />
            ))}

            {/* Longitude rings */}
            {[0, 36, 72].map((angle, i) => (
              <ellipse key={i} cx="100" cy="100" rx="14" ry="90"
                fill="none" stroke="rgba(0,200,255,.05)" strokeWidth="1"
                clipPath="url(#ldPc)"
                transform={angle ? `rotate(${angle},100,100)` : undefined} />
            ))}

            {/* Continent blobs */}
            <g clipPath="url(#ldPc)" fill="rgba(30,120,240,.15)" filter="url(#ldPf)">
              <ellipse cx="78"  cy="78"  rx="28" ry="18" />
              <ellipse cx="124" cy="108" rx="22" ry="15" />
              <ellipse cx="62"  cy="122" rx="16" ry="12" />
              <ellipse cx="136" cy="70"  rx="13" ry="9"  />
              <ellipse cx="100" cy="142" rx="24" ry="10" />
            </g>

            {/* Specular highlight */}
            <circle cx="100" cy="100" r="90" fill="url(#ldPh)" />
            <circle cx="100" cy="100" r="90" fill="none"
              stroke="rgba(0,200,255,.13)" strokeWidth="1.5" />
            <ellipse cx="72" cy="64" rx="22" ry="13"
              fill="rgba(255,255,255,.05)" transform="rotate(-28,72,64)" />
          </svg>
        </div>

        <div className="ld-brand">WEB<span>DISHAA</span></div>
        <div className="ld-tagline">Launching your digital world</div>

        <div className="ld-bar-wrap">
          <div className="ld-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </>
  );
}