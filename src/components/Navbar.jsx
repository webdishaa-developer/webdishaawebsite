import { useState, useEffect } from 'react';
import { SITE } from '../data';

const styles = `
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px; height: 64px;
  transition: background .4s, border-color .4s;
}
.nav.solid {
  background: rgba(0,0,0,.9);
  border-bottom: 1px solid rgba(255,255,255,.06);
  backdrop-filter: blur(16px);
}
.nav-logo {
  font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: .1em;
  background: linear-gradient(90deg,#fff 40%,#00c8ff);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  cursor: pointer; user-select: none; flex-shrink: 0;
}
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links a {
  font-size: 12px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase;
  color: #fff; text-decoration: none; cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: color .2s, border-color .2s; white-space: nowrap;
}
.nav-links a:hover { color: #eef4ff; border-color: #00c8ff; }
.nav-cta {
  font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 600;
  letter-spacing: .08em; text-transform: uppercase;
  color: #eef4ff; background: transparent;
  border: 1px solid rgba(255,255,255,.2); padding: 7px 18px; border-radius: 100px;
  cursor: pointer; transition: border-color .2s, color .2s; white-space: nowrap; flex-shrink: 0;
}
.nav-cta:hover { border-color: #00c8ff; color: #00c8ff; }
.nav-ham {
  display: none; flex-direction: column; gap: 5px; cursor: pointer;
  background: none; border: none; padding: 4px;
}
.nav-ham span {
  display: block; width: 22px; height: 2px;
  background: #eef4ff; border-radius: 2px;
  transition: transform .3s, opacity .3s;
}
.nav-ham.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-ham.open span:nth-child(2) { opacity: 0; }
.nav-ham.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.mobile-menu {
  position: fixed; top: 64px; left: 0; right: 0; z-index: 999;
  background: rgba(3,8,15,.97); backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,.06);
  max-height: 0; overflow: hidden;
  transition: max-height .4s ease, padding .3s ease;
}
.mobile-menu.open { max-height: 420px; padding: 12px 0 24px; }
.mobile-menu a {
  display: block; padding: 13px 28px;
  font-size: 14px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase;
  color: #6a7d94; text-decoration: none; cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,.04);
  transition: color .2s, background .2s;
}
.mobile-menu a:hover { color: #00c8ff; background: rgba(0,200,255,.04); }
.mobile-menu .m-cta {
  margin: 14px 28px 0; display: block; text-align: center;
  background: #00c8ff; color: #000; font-weight: 700;
  padding: 12px; border-radius: 100px; font-size: 13px;
}
@media (max-width:768px) {
  .nav { padding: 0 20px; height: 58px; }
  .nav-links { display: none; }
  .nav-cta { display: none; }
  .nav-ham { display: flex; }
  .mobile-menu { top: 58px; }
}
`;

const NAV_LINKS = [
  ['hero',         'Home'],
  ['packages',     'Packages'],
  ['process',      'Process'],
  ['portfolio',    'Portfolio'],
  ['testimonials', 'Reviews'],
  ['contact',      'Contact'],
  ['social',      'Social Media'],

];

export default function Navbar({ solid }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), menuOpen ? 300 : 0);
  };

  return (
    <>
      <style>{styles}</style>

      <nav className={`nav${solid ? ' solid' : ''}`}>
        <div className="nav-logo" onClick={() => go('hero')}>{SITE.name}</div>

        {/* Desktop links */}
        <ul className="nav-links">
          {NAV_LINKS.slice(1).map(([id, label]) => (
            <li key={id}><a onClick={() => go(id)}>{label}</a></li>
          ))}
        </ul>

        <button className="nav-cta" onClick={() => go('contact')}>Enquire Now</button>

        {/* Hamburger */}
        <button
          className={`nav-ham${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(([id, label]) => (
          <a key={id} onClick={() => go(id)}>{label}</a>
        ))}
        <a className="m-cta" onClick={() => go('contact')}>💬 Get Free Quote</a>
      </div>
    </>
  );
}
