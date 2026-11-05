// ─────────────────────────────────────────────────────
//  Navbar.jsx — Premium redesign with proper logo
// ─────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE } from '../data';
import logo from '../assets/logo.jpg';

const styles = `
/* ── NAV SHELL ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 9998;
  height: 72px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5%;
  transition: background .4s, border-color .4s, backdrop-filter .4s;
  border-bottom: 1px solid transparent;
}
.nav.solid {
  background: rgba(3,8,15,.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom-color: rgba(255,255,255,.06);
}

/* ── LOGO ── */
.nav-logo {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none; flex-shrink: 0;
}
.nav-logo-img {
  height: 42px; width: auto; object-fit: contain;
  /* Clean white bg removed — use mix-blend or filter so logo looks native on dark bg */
  filter: drop-shadow(0 0 10px rgba(0,200,255,.18));
  transition: filter .3s, transform .3s;
}
.nav-logo:hover .nav-logo-img {
  filter: drop-shadow(0 0 18px rgba(0,200,255,.45));
  transform: scale(1.04);
}
/* Fallback text beside logo */
.nav-logo-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px; letter-spacing: .1em;
  background: linear-gradient(90deg,#fff 40%,#00c8ff);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  line-height: 1;
}

/* ── NAV LINKS ── */
.nav-links {
  display: flex; list-style: none; gap: 6px; align-items: center;
}
.nav-links a {
  font-size: 14px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  color: #dbdfe4; text-decoration: none;
  padding: 6px 14px; border-radius: 100px;
  transition: color .2s, background .2s;
  position: relative;
}
.nav-links a:hover { color: #eef4ff; background: rgba(255,255,255,.04); }
.nav-links a.active-link {
  color: #00c8ff;
  background: rgba(0,200,255,.07);
  border: 1px solid rgba(0,200,255,.18);
}

/* ── CTA BUTTON ── */
.nav-cta {
  font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
  color: #000; background: #00c8ff; border: none;
  padding: 9px 22px; border-radius: 100px; cursor: pointer;
  box-shadow: 0 0 20px rgba(0,200,255,.25);
  transition: box-shadow .25s, transform .25s; text-decoration: none;
  white-space: nowrap;
}
.nav-cta:hover { box-shadow: 0 0 36px rgba(0,200,255,.5); transform: translateY(-1px); }

/* ── HAMBURGER ── */
.nav-ham {
  display: none; flex-direction: column; gap: 5px; cursor: pointer;
  background: none; border: 1px solid rgba(255,255,255,.1);
  border-radius: 9px; padding: 8px 10px;
  transition: border-color .2s;
}
.nav-ham:hover { border-color: rgba(0,200,255,.4); }
.nav-ham span {
  display: block; width: 20px; height: 1.5px;
  background: #eef4ff; border-radius: 2px;
  transition: transform .3s, opacity .3s;
}
.nav-ham.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.nav-ham.open span:nth-child(2) { opacity: 0; }
.nav-ham.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* ── MOBILE MENU ── */
.mobile-menu {
  position: fixed; top: 72px; left: 0; right: 0; z-index: 9997;
  background: rgba(3,8,15,.98); backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255,255,255,.06);
  max-height: 0; overflow: hidden;
  transition: max-height .42s cubic-bezier(.4,0,.2,1);
}
.mobile-menu.open { max-height: 520px; }

.mobile-menu-inner { padding: 8px 0 24px; }

.mobile-menu a {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 28px;
  font-size: 15px; font-weight: 500; letter-spacing: .05em; text-transform: uppercase;
  color: #6a7d94; text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,.04);
  transition: color .2s, background .2s, padding-left .2s;
}
.mobile-menu a:hover { color: #eef4ff; background: rgba(255,255,255,.02); padding-left: 34px; }
.mobile-menu a.active-link { color: #00c8ff; }
.mobile-menu a::after { content: '→'; font-size: 14px; opacity: .3; transition: opacity .2s; }
.mobile-menu a:hover::after { opacity: .8; }
.mobile-menu a.active-link::after { color: #00c8ff; opacity: 1; }

.mobile-menu-cta { padding: 18px 24px 0; }
.m-cta {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: #00c8ff; color: #000; font-weight: 700;
  font-size: 13px; letter-spacing: .1em; text-transform: uppercase;
  padding: 14px; border-radius: 14px; text-decoration: none;
  box-shadow: 0 0 24px rgba(0,200,255,.25);
  transition: box-shadow .25s;
}
.m-cta:hover { box-shadow: 0 0 40px rgba(0,200,255,.5); }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .nav { padding: 0 20px; height: 64px; }
  .nav-links { display: none; }
  .nav-cta { display: none; }
  .nav-ham { display: flex; }
  .mobile-menu { top: 64px; }
  .nav-logo-img { height: 36px; }
  .nav-logo-text { font-size: 19px; }
}
`;

const NAV_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About'    },
  { to: '/services', label: 'Services' },
  { to: '/gallery',  label: 'Gallery'  },
  { to: '/contact',  label: 'Contact'  },
];

export default function Navbar({ solid }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close on resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <style>{styles}</style>

      <nav className={`nav${solid ? ' solid' : ''}`}>

        {/* ── LOGO ── */}
        <Link className="nav-logo" to="/">
          <img
            className="nav-logo-img"
            src={logo}
            alt={SITE.name}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="nav-logo-text">WEB<span style={{color:'#00c8ff'}}>DISHAA</span></span>
        </Link>

        {/* ── DESKTOP LINKS ── */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={location.pathname === to ? 'active-link' : ''}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── CTA + HAMBURGER ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link className="nav-cta" to="/contact">Enquire Now</Link>
          <button
            className={`nav-ham${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={location.pathname === to ? 'active-link' : ''}
            >
              {label}
            </Link>
          ))}
          <div className="mobile-menu-cta">
            <Link className="m-cta" to="/contact">💬 Get Free Quote</Link>
          </div>
        </div>
      </div>
    </>
  );
}