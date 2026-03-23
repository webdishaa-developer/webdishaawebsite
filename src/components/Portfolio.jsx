// ─────────────────────────────────────────────────────
//  Portfolio.jsx — Before & After with REAL images
//  Images are in /public/images/ folder
//  Hover to reveal: desaturated → full color + cyan sweep
// ─────────────────────────────────────────────────────

import before1 from "../assets/portfolio/before1.png";
import before2 from "../assets/portfolio/before2.png";
import before3 from "../assets/portfolio/before3.png";
import before4 from "../assets/portfolio/before4.png";


const PORTFOLIO_ITEMS = [
  {
    tag: 'Google Business',
    name: 'Verified Brand Setup',
    meta: 'Google Profile · Raipur',
    img: before1,
    // beforeLabel: 'Unverified Business',
    // afterLabel: 'Verified on Google Maps',
    result: '5★ Verified — More Customers Found You',
  },
  {
    tag: 'Website Redesign',
    name: 'Corporate Website',
    meta: 'Professional Website · Bilaspur',
    img: before2,
    // beforeLabel: 'Old Outdated Design',
    // afterLabel: 'Modern Responsive Site',
    result: 'Mobile Responsive + SEO Ready',
  },
  {
    tag: 'Social Media',
    name: 'Social Media Growth',
    meta: 'Social Pack · Raipur',
    img: before3,
    // beforeLabel: '120 Followers, No Reach',
    // afterLabel: '10K Followers Achieved',
    result: '120 → 10K Followers in 90 Days',
  },
  {
    tag: 'Career Branding',
    name: 'Career Presence',
    meta: 'Portfolio + SEO · CG',
    img: before4,
    // beforeLabel: 'Basic Resume Only',
    // afterLabel: 'Professional Portfolio',
    result: 'Full Digital Career Portfolio Live',
  },
];

const styles = `
/* ── SECTION ── */
.ptf-section { position: relative; z-index: 1; }
.ptf-inner   { max-width: 1200px; margin: 0 auto; padding: 80px 5%; }

/* ── GRID ── */
.ptf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

/* ── CARD ── */
.ptf-card {
  border: 1px solid rgba(255,255,255,.07);
  background: #03080f; overflow: hidden; cursor: pointer;
  transition: border-color .35s, transform .35s, box-shadow .35s;
  position: relative;
}
.ptf-card:hover {
  border-color: rgba(0,200,255,.45);
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,.5), 0 0 36px rgba(0,200,255,.12);
}

/* ── VISUAL AREA ── */
.ptf-visual {
  position: relative; height: 220px;
  overflow: hidden; background: #000; user-select: none;
}

/* BEFORE — desaturated, full width always */
.ptf-img-before {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: top center;
  filter: saturate(.35) brightness(.65);
  transition: filter .45s ease;
}
.ptf-card:hover .ptf-img-before {
  filter: saturate(.15) brightness(.4);
}

/* AFTER — full color, clips in from right on hover */
.ptf-after-wrap {
  position: absolute; inset: 0;
  clip-path: inset(0 100% 0 0);
  transition: clip-path .52s cubic-bezier(.4,0,.2,1);
  overflow: hidden;
}
.ptf-card:hover .ptf-after-wrap {
  clip-path: inset(0 0% 0 0);
}
.ptf-img-after {
  width: 100%; height: 100%;
  object-fit: cover; object-position: top center;
  filter: saturate(1.1) brightness(1.05);
}

/* CYAN DIVIDER LINE */
.ptf-divider {
  position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; z-index: 4;
  background: linear-gradient(180deg,
    transparent 0%,
    #00c8ff 15%,
    #00c8ff 85%,
    transparent 100%
  );
  box-shadow: 0 0 14px rgba(0,200,255,.9), 0 0 4px #fff;
  transform: scaleY(0); transform-origin: top;
  transition: transform .52s cubic-bezier(.4,0,.2,1);
}
.ptf-card:hover .ptf-divider { transform: scaleY(1); }

/* HANDLE CIRCLE ON DIVIDER */
.ptf-handle {
  position: absolute; top: 50%; left: 50%; z-index: 5;
  width: 30px; height: 30px; border-radius: 50%;
  background: #00c8ff; color: #000;
  font-size: 12px; font-weight: 900;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 20px rgba(0,200,255,.8);
  transform: translate(-50%, -50%) scale(0);
  transition: transform .4s cubic-bezier(.34,1.56,.64,1) .18s;
}
.ptf-card:hover .ptf-handle { transform: translate(-50%,-50%) scale(1); }

/* TOP LABELS */
.ptf-label {
  position: absolute; top: 12px; z-index: 6;
  font-size: 10px; font-weight: 700; letter-spacing: .08em;
  text-transform: uppercase; padding: 4px 11px; border-radius: 100px;
  transition: opacity .3s ease;
}
.ptf-label.before {
  left: 12px;
  background: rgba(0,0,0,.75); color: #6a7d94;
  border: 1px solid rgba(255,255,255,.1);
}
.ptf-label.after {
  right: 12px;
  background: rgba(0,200,255,.2); color: #00c8ff;
  border: 1px solid rgba(0,200,255,.4);
  opacity: 0;
}
.ptf-card:hover .ptf-label.before { opacity: .45; }
.ptf-card:hover .ptf-label.after  { opacity: 1; }

/* RESULT PILL — slides up from bottom on hover */
.ptf-result {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 6;
  padding: 12px 16px;
  background: linear-gradient(to top, rgba(0,8,20,.97) 60%, transparent);
  font-size: 12px; font-weight: 600; color: #00c8ff;
  letter-spacing: .05em;
  transform: translateY(100%);
  transition: transform .4s ease .1s;
  display: flex; align-items: center; gap: 7px;
}
.ptf-result::before { content: '✦'; font-size: 9px; color: #00c8ff; }
.ptf-card:hover .ptf-result { transform: translateY(0); }

/* AMBIENT GLOW overlay */
.ptf-glow {
  position: absolute; inset: 0; z-index: 3; pointer-events: none;
  background: radial-gradient(ellipse at 50% 0%, rgba(0,200,255,.07), transparent 65%);
  opacity: 0; transition: opacity .4s ease;
}
.ptf-card:hover .ptf-glow { opacity: 1; }

/* ── INFO BAR ── */
.ptf-info {
  padding: 16px 20px;
  border-top: 1px solid rgba(255,255,255,.05);
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
}
.ptf-tag {
  font-size: 10px; font-weight: 600; letter-spacing: .1em;
  text-transform: uppercase; color: #00c8ff; margin-bottom: 4px;
}
.ptf-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px; letter-spacing: .03em; color: #eef4ff; line-height: 1.1;
}
.ptf-meta { font-size: 11px; font-weight: 300; color: #6a7d94; margin-top: 3px; }
.ptf-arrow {
  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
  border: 1px solid rgba(255,255,255,.1);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: #6a7d94;
  transition: border-color .25s, color .25s, background .25s, transform .3s;
}
.ptf-card:hover .ptf-arrow {
  border-color: #00c8ff; color: #00c8ff;
  background: rgba(0,200,255,.08);
  transform: rotate(45deg);
}

/* ── MOBILE ── */
@media (max-width: 768px) {
  .ptf-grid { grid-template-columns: 1fr; gap: 14px; }
  .ptf-inner { padding: 60px 5%; }
  .ptf-visual { height: 200px; }

  /* Show split statically on mobile (no hover) */
  .ptf-after-wrap  { clip-path: inset(0 50% 0 0); }
  .ptf-divider     { transform: scaleY(1); }
  .ptf-handle      { transform: translate(-50%,-50%) scale(1); }
  .ptf-label.after { opacity: 1; }
  .ptf-result      { transform: translateY(0); font-size: 11px; }
}
@media (max-width: 480px) {
  .ptf-visual { height: 175px; }
  .ptf-name   { font-size: 17px; }
  .ptf-result { font-size: 10px; padding: 10px 12px; }
}
`;

export default function Portfolio() {
  return (
    <>
      <style>{styles}</style>
      <div className="ptf-section" id="portfolio">
        <div className="ptf-inner">

          <div className="rev">
            <div className="s-eyebrow">Our Work</div>
            <h2 className="s-title">Before <em>&amp;</em> After</h2>
            <p className="s-body">
              Hover each card to see the real transformation we delivered.
              Real projects · Real results · Real local businesses.
            </p>
          </div>

          <div className="ptf-grid">
            {PORTFOLIO_ITEMS.map((p, i) => (
              <div key={i} className={`rev d${(i % 4) + 1}`}>
                <div className="ptf-card">

                  <div className="ptf-visual">
                    {/* BEFORE — desaturated */}
                    <img
                      className="ptf-img-before"
                      src={p.img}
                      alt={`Before — ${p.name}`}
                      loading="lazy"
                      draggable="false"
                    />

                    {/* AFTER — full color clips in */}
                    <div className="ptf-after-wrap">
                      <img
                        className="ptf-img-after"
                        src={p.img}
                        alt={`After — ${p.name}`}
                        loading="lazy"
                        draggable="false"
                      />
                    </div>

                    {/* Cyan divider line + handle */}
                    <div className="ptf-divider" />
                    <div className="ptf-handle">↔</div>

                    {/* Ambient glow */}
                    <div className="ptf-glow" />

                    {/* Labels */}
                    <div className="ptf-label before">{p.beforeLabel}</div>
                    <div className="ptf-label after">{p.afterLabel}</div>

                    {/* Result — slides up on hover */}
                    <div className="ptf-result">{p.result}</div>
                  </div>

                  {/* Info bar */}
                  <div className="ptf-info">
                    <div>
                      <div className="ptf-tag">{p.tag}</div>
                      <div className="ptf-name">{p.name}</div>
                      <div className="ptf-meta">{p.meta}</div>
                    </div>
                    <div className="ptf-arrow">↗</div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
