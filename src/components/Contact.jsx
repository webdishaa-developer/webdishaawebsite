import { SITE } from '../data';
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt
} from 'react-icons/fa';

const styles = `
.cta-wrap { position: relative; z-index: 1; padding: 0 5% 100px; }

.cta-box {
  max-width: 1200px;
  margin: 0 auto;
  background: #03080f;
  padding: 72px 60px;
  border: 1px solid rgba(255,255,255,.07);
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.cta-box::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg,transparent,#00c8ff,transparent);
}

.cta-glow {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 300px;
  background: radial-gradient(ellipse,rgba(0,200,255,.05),transparent 70%);
  pointer-events: none;
}

.cta-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(44px,8vw,96px);
  line-height: .9;
  letter-spacing: .02em;
  margin-bottom: 18px;
}

.cta-title span { color: #00c8ff; }

.cta-sub {
  font-size: 15px;
  font-weight: 300;
  color: #6a7d94;
  max-width: 420px;
  margin-bottom: 40px;
  line-height: 1.8;
}

.cta-links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #eef4ff;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,.1);
  padding: 12px 26px;
  border-radius: 6px;
  transition: all .25s ease;
  white-space: nowrap;
}

.cta-link svg {
  font-size: 14px;
}

.cta-link:hover {
  border-color: #00c8ff;
  color: #00c8ff;
  transform: translateY(-2px);
}

.cta-link.primary {
  background: #00c8ff;
  color: #000;
  border-color: transparent;
  box-shadow: 0 0 28px rgba(0,200,255,.25);
  font-weight: 700;
}

.cta-link.primary:hover {
  box-shadow: 0 0 55px rgba(0,200,255,.45);
  color: #000;
}

@media (max-width:768px) {
  .cta-box { padding: 44px 24px; }
  .cta-links { flex-direction: column; }
  .cta-link { justify-content: center; }
  .cta-title { font-size: clamp(38px,12vw,68px); }
}

@media (max-width:480px) {
  .cta-wrap { padding: 0 5% 70px; }
  .cta-box { padding: 36px 20px; }
  .cta-sub { font-size: 13.5px; }
}
`;

export default function Contact() {
  return (
    <>
      <style>{styles}</style>

      <div className="cta-wrap" id="contact">
        <div className="rev">
          <div className="cta-box">
            <div className="cta-glow" />

            <h2 className="cta-title">
              READY TO GO<br /><span>DIGITAL?</span>
            </h2>

            <p className="cta-sub">
              Free consultation · Fast delivery · Affordable pricing.
              Let’s build something great together.
            </p>

            <div className="cta-links">

              <a
                className="cta-link primary"
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp /> WhatsApp Us
              </a>

              <a className="cta-link" href={SITE.phoneHref}>
                <FaPhoneAlt /> {SITE.phone}
              </a>

              <a className="cta-link" href={`mailto:${SITE.email}`}>
                <FaEnvelope /> {SITE.email}
              </a>

              <a
                className="cta-link"
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram /> {SITE.instagramHandle}
              </a>

              {/* <span className="cta-link">
                <FaMapMarkerAlt /> {SITE.location}
              </span> */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}