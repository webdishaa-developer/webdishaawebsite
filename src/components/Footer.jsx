// ─────────────────────────────────────────────────────
//  Footer.jsx — Multi-page version
// ─────────────────────────────────────────────────────

import { Link } from 'react-router-dom';
import { SITE } from '../data';
import { FaWhatsapp, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.jpg'; // ← same logo file

const styles = `
.foot {
  position: relative; z-index: 1;
  border-top: 1px solid rgba(255,255,255,.05);
}

/* Top section */
.foot-top {
  display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 40px;
  max-width: 1200px; margin: 0 auto;
  padding: 60px 5% 40px;
}
.foot-brand {}
.foot-logo {
  display: inline-flex; align-items: center;
  margin-bottom: 14px; text-decoration: none;
}
.foot-logo-img {
  height: 52px; width: auto; object-fit: contain;
  background: rgba(255,255,255,.95);
  border-radius: 12px; padding: 5px 10px;
  transition: box-shadow .3s;
}
.foot-logo:hover .foot-logo-img { box-shadow: 0 0 20px rgba(0,200,255,.25); }
.foot-tagline { font-size: 13px; font-weight: 300; color: rgba(255,255,255,.4); line-height: 1.75; max-width: 240px; margin-bottom: 20px; }
.foot-social { display: flex; gap: 10px; }
.foot-soc-btn {
  width: 36px; height: 36px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,.1);
  background: rgba(255,255,255,.03);
  display: flex; align-items: center; justify-content: center;
  color: #6a7d94; font-size: 14px; text-decoration: none;
  transition: all .25s;
}
.foot-soc-btn:hover { border-color: #00c8ff; color: #00c8ff; background: rgba(0,200,255,.07); }

.foot-col-title {
      font-size: 15px;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: rgb(0 200 255);
    margin-bottom: 16px;
}
.foot-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.foot-links a {
      font-size: 13px;
    font-weight: 300;
    color: rgb(251 243 243 / 68%);
    text-decoration: none;
    transition: color .2s;
}
.foot-links a:hover { color: #00c8ff; }

.foot-contact-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; font-weight: 300; color: rgba(255,255,255,.5);
  text-decoration: none; transition: color .2s;
  margin-bottom: 10px;
}
.foot-contact-item:hover { color: #eef4ff; }
.foot-contact-item svg { color: #00c8ff; flex-shrink: 0; }

/* Bottom bar */
.foot-bottom {
  border-top: 1px solid rgba(255,255,255,.05);
  padding: 18px 5%;
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px;
  max-width: 1200px; margin: 0 auto;
}
.foot-copy { font-size: 11px; font-weight: 300; color: rgba(255, 255, 255, 0.87); }
.foot-loc  { font-size: 11px; font-weight: 300; color: rgba(255,255,255,.25); }

/* ── Responsive ── */
@media (max-width:768px) {
  .foot-top { grid-template-columns: 1fr 1fr; gap: 28px; padding-bottom: 28px; }
  .foot-brand { grid-column: 1 / -1; }
  .foot-bottom { flex-direction: column; text-align: center; padding: 16px 5%; }
}
@media (max-width:480px) {
  .foot-top { grid-template-columns: 1fr; }
}
`;

export default function Footer() {
  return (
    <>
      <style>{styles}</style>
      <footer className="foot">
        <div className="foot-top">

          {/* Brand */}
          <div className="foot-brand">
            <Link className="foot-logo" to="/">
            <img className="foot-logo-img" src={logo} alt={SITE.name} />
          </Link>
            <p className="foot-tagline">
              Affordable websites, branding & digital solutions for local businesses in Raipur, CG.
            </p>
            <div className="foot-social">
              <a className="foot-soc-btn" href={SITE.instagram} target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a className="foot-soc-btn" href={SITE.whatsapp} target="_blank" rel="noreferrer"><FaWhatsapp /></a>
              <a className="foot-soc-btn" href={SITE.phoneHref}><FaPhone /></a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <div className="foot-col-title">Pages</div>
            <ul className="foot-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="foot-col-title">Contact</div>
            <a className="foot-contact-item" href={SITE.phoneHref}><FaPhone /> {SITE.phone}</a>
            <a className="foot-contact-item" href={`mailto:${SITE.email}`}><FaEnvelope /> {SITE.email}</a>
            <a className="foot-contact-item" href={SITE.whatsapp} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp Us</a>
            <a className="foot-contact-item" href={SITE.instagram} target="_blank" rel="noreferrer"><FaInstagram /> {SITE.instagramHandle}</a>
          </div>

        </div>

        <div className="foot-bottom">
          <span className="foot-copy">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          {/* <span className="foot-loc">📍 {SITE.location}</span> */}
        </div>
      </footer>
    </>
  );
}