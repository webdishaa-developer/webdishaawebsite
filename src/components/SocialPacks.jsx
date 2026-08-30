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
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: border-color .3s, transform .3s, box-shadow .3s;
  min-height: 240px;
}
 
.soc-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0,200,255,.0),
    transparent
  );
  transition: background .4s;
}

.soc-cell:hover {
  border-color: rgba(0,200,255,.2);
  transform: translateY(-4px);
  box-shadow: 0 16px 44px rgba(0,0,0,.4);
}
 
.soc-cell:hover::before {
  background: linear-gradient(
    90deg,
    transparent,
    #00c8ff,
    transparent
  );
}
 
/* accent color per tier */
.soc-cell:nth-child(2) {
  border-color: rgba(0,200,255,.15);
}

.soc-cell:nth-child(2)::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0,200,255,.6),
    transparent
  );
}
 
.soc-tier {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: #00c8ff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 7px;
}

.soc-tier::before {
  content: '';
  width: 14px;
  height: 1px;
  background: #00c8ff;
}
 
.soc-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  letter-spacing: .03em;
  color: #eef4ff;
  margin-bottom: 14px;
  line-height: 1.1;
  min-height: 46px;
}
 
.soc-price {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 42px;
  line-height: 1;
  background: linear-gradient(135deg, #eef4ff, #00c8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
}
 
.soc-posts {
  font-size: 12.5px;
  font-weight: 300;
  color: #6a7d94;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid rgba(255,255,255,.05);
}

.soc-posts b {
  color: #eef4ff;
}
 
.soc-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  background: rgba(0,200,255,.08);
  color: #00c8ff;
  border: 1px solid rgba(0,200,255,.2);
  padding: 5px 12px;
  border-radius: 100px;
  width: fit-content;
}

.soc-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00c8ff;
  box-shadow: 0 0 6px #00c8ff;
}

/* ── Mobile: single column ── */
@media (max-width: 768px) {
  .soc-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .soc-cell {
    padding: 24px 18px 20px;
    min-height: auto;
    border-radius: 16px;
  }

  .soc-price {
    font-size: 38px;
  }

  .soc-name {
    font-size: 20px;
    min-height: auto;
  }
}
 
@media (max-width: 1100px) and (min-width: 769px) {
  .soc-name {
    font-size: 18px;
  }

  .soc-price {
    font-size: 34px;
  }

  .soc-cell {
    padding: 22px 16px;
  }
}
`;


/* ─────────────────────────────────────────
   CARD
───────────────────────────────────────── */

function SocialCard({ pack, index }) {
  return (
    <div className={`soc-cell rev d${index + 1}`}>

      {/* Tier */}
      <div className="soc-tier">
        {pack.tier}

        {pack.badge && (
          <span
            style={{
              marginLeft: 'auto',
              color: '#ffd45a',
              fontSize: '8px',
              letterSpacing: '.05em',
            }}
          >
            {pack.badge}
          </span>
        )}
      </div>

      {/* Name */}
      <div className="soc-name">
        {pack.name}
      </div>

      {/* Price */}
      <div className="soc-price">
        {pack.price}
      </div>

      {/* Per month */}
      <div
        style={{
          color: '#6a7d94',
          fontSize: '11px',
          marginTop: '-5px',
          marginBottom: '8px',
        }}
      >
        / Month
      </div>

      {/* Management charges */}
      <div
        style={{
          display: 'inline-block',
          width: 'fit-content',
          background: 'rgba(0,200,255,.08)',
          color: '#00c8ff',
          border: '1px solid rgba(0,200,255,.15)',
          borderRadius: '100px',
          padding: '4px 9px',
          fontSize: '8px',
          fontWeight: '700',
          letterSpacing: '.05em',
          marginBottom: '8px',
        }}
      >
        {pack.management}
      </div>

      {/* Content pieces */}
      {pack.contentPieces && (
        <div className="soc-posts">
          <b>{pack.contentPieces}</b> Content Pieces
        </div>
      )}

      {/* Model package */}
      {pack.modelPackage && (
        <div className="soc-posts">
          <b>{pack.modelPackage}</b>
        </div>
      )}

      {/* Reels */}
      {pack.reels && (
        <div className="soc-posts">
          <b>{pack.reels} Reels</b>

          {pack.reelDetails &&
            pack.reelDetails.map((item, i) => (
              <div
                key={i}
                style={{
                  marginLeft: '12px',
                  marginTop: '3px',
                }}
              >
                • {item}
              </div>
            ))}
        </div>
      )}

      {/* Posts */}
      {pack.posts && (
        <div className="soc-posts">
          <b>{pack.posts} Posts</b>

          {pack.postDetails &&
            pack.postDetails.map((item, i) => (
              <div
                key={i}
                style={{
                  marginLeft: '12px',
                  marginTop: '3px',
                }}
              >
                • {item}
              </div>
            ))}
        </div>
      )}

      {/* Photos */}
      {pack.photos && (
        <div className="soc-posts">
          <b>{pack.photos} Photos / Graphic Posts</b>
        </div>
      )}

      {/* Stories */}
      {pack.stories && (
        <div className="soc-posts">
          <b>{pack.stories} Stories</b>

          {pack.storyDetails &&
            pack.storyDetails.map((item, i) => (
              <div
                key={i}
                style={{
                  marginLeft: '12px',
                  marginTop: '3px',
                }}
              >
                • {item}
              </div>
            ))}
        </div>
      )}

      {/* Includes */}
      {pack.features && (
        <div className="soc-posts">
          <b>Includes:</b>

          {pack.features.map((feature, i) => (
            <div
              key={i}
              style={{
                marginTop: '5px',
              }}
            >
              ✓ {feature}
            </div>
          ))}
        </div>
      )}

      {/* Perfect For */}
      {pack.perfectFor && (
        <div className="soc-posts">
          <b>Perfect For:</b>

          {pack.perfectFor.map((item, i) => (
            <div
              key={i}
              style={{
                marginTop: '5px',
              }}
            >
              • {item}
            </div>
          ))}
        </div>
      )}

      {/* Per month badge */}
      <div className="soc-badge">
        Per Month
      </div>

    </div>
  );
}


/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */

export default function SocialPacks() {

  const oneMonthPlans = SOCIAL_PACKS.filter(
    (pack) => pack.duration === '1 Month'
  );

  const threeMonthPlans = SOCIAL_PACKS.filter(
    (pack) => pack.duration === '3 Month'
  );

  return (
    <>
      <style>{socialStyles}</style>

      <div className="s-wrap" id="social">
        <div className="s-inner">

          {/* Section heading */}
          <div className="rev">

            <div className="s-eyebrow">
              Social Media
            </div>

            <h2 className="s-title">
              Social Media <em>Management Plans</em>
            </h2>

            <p className="s-body">
              Keep your audience engaged with professionally designed
              posts every month. Build your brand presence across
              Instagram, Facebook & more.
            </p>

          </div>


          {/* ═══════════════════════════════
              1 MONTH PLANS
          ═══════════════════════════════ */}

          <div
            style={{
              textAlign: 'center',
              margin: '35px 0 20px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                color: '#00c8ff',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
              }}
            >
              — 1 Month Plans —
            </span>
          </div>

          <div className="soc-grid">
            {oneMonthPlans.map((pack, index) => (
              <SocialCard
                key={pack.name}
                pack={pack}
                index={index}
              />
            ))}
          </div>


          {/* ═══════════════════════════════
              3 MONTH PLANS
          ═══════════════════════════════ */}

          <div
            style={{
              textAlign: 'center',
              margin: '35px 0 20px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                color: '#00c8ff',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
              }}
            >
              — 3 Month Plans —
            </span>
          </div>

          <div className="soc-grid">
            {threeMonthPlans.map((pack, index) => (
              <SocialCard
                key={pack.name}
                pack={pack}
                index={index}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
