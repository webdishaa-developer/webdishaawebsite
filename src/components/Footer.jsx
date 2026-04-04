import { SITE } from '../data';

const styles = `
.foot {
  position: relative; z-index: 1;
  border-top: 1px solid rgba(255,255,255,.05);
  padding: 28px 5%;
  display: flex; flex-wrap: wrap;
  align-items: center; justify-content: space-between;
  gap: 10px;
}
.foot-logo {
      font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;
    letter-spacing: .1em;
    background: linear-gradient(90deg, #fff 40%, #00c8ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    user-select: none;
    flex-shrink: 0;
}
.foot-links {
  display: flex; gap: 20px; list-style: none; flex-wrap: wrap;
}
.foot-links a {
  font-size: 11px; font-weight: 500; letter-spacing: .07em;
  text-transform: uppercase; color: white;
  text-decoration: none; cursor: pointer;
  transition: color .2s;
}
.foot-links a:hover { color: #00c8ff; }
.foot-copy { font-size: 11px; font-weight: 300; color: white; }
.foot-loc  { font-size: 11px; font-weight: 300; color:white; }

@media (max-width:768px) {
  .foot { flex-direction: column; text-align: center; gap: 8px; padding: 22px 5%; }
  .foot-links { justify-content: center; }
}
`;

const FOOT_LINKS = [
  ['packages',     'Packages'],
  ['process',      'Process'],
  ['portfolio',    'Portfolio'],
  ['testimonials', 'Reviews'],
  ['contact',      'Contact'],
];

export default function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <style>{styles}</style>
      <footer className="foot">
        <div className="foot-logo">{SITE.name.toUpperCase()}</div>

        <ul className="foot-links">
          {FOOT_LINKS.map(([id, label]) => (
            <li key={id}><a onClick={() => go(id)}>{label}</a></li>
          ))}
        </ul>

        <p className="foot-copy">© {new Date().getFullYear()} {SITE.name} · All rights reserved</p>
        {/* <p className="foot-loc">📍 {SITE.location} · Helping Local Businesses Go Digital 🚀</p> */}
      </footer>
    </>
  );
}
