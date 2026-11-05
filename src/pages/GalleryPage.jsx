// ─────────────────────────────────────────────────────
//  GalleryPage.jsx — Portfolio (images only, no videos)
//
//  HOW TO ADD MORE WORK
//  1. Drop the image in /src/assets/ and import it below.
//  2. Add an item to the right section in SECTIONS (title, desc, tag).
//     ratio = card shape ('4/3' for website screenshots, '4/5' for posters).
//  Sections lay themselves out, so there are never gaps or empty tiles.
// ─────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { WA_NUMBER } from '../utils/whatsapp';

import salon from '../assets/salon.png';
import volterra from '../assets/volterra.png';
import memento from '../assets/memento.png';
import multiecom from '../assets/multiecom.png';
import weblogo from '../assets/webevaa logo.jpg';
import webapp from '../assets/webevva page.png';
import diwali from '../assets/diwali.jpeg';
import nailart from '../assets/nailart.jpeg';

/* ═════════════ YOUR WORK — edit titles / descriptions here ═════════════ */
const SECTIONS = [
  {
    id: 'websites', filter: 'Websites',
    eyebrow: '01 — Websites', title: 'Websites &', em: 'E-commerce',
    desc: 'Fast, mobile-first sites designed to turn visitors into customers.',
    layout: 'g2',
    items: [
      { id: 1, src: salon,     tag: 'Website',   title: 'Lumière Beauty Studio',  desc: 'Salon website · appointment-focused design', ratio: '4/3', pos: 'top' },
      { id: 2, src: volterra,  tag: 'Website',   title: 'Volterra Motors',        desc: 'Corporate website · automotive brand',        ratio: '4/3', pos: 'top' },
      { id: 3, src: memento,   tag: 'E-commerce', title: 'Memento Gifts',          desc: 'Single-page e-commerce · personalised gifts', ratio: '4/3', pos: 'top' },
      { id: 4, src: multiecom, tag: 'E-commerce', title: 'Emberworks Candles',     desc: 'Multi-page e-commerce store',                 ratio: '4/3', pos: 'top' },
    ],
  },
  {
    id: 'webapp', filter: 'Web App & Branding',
    eyebrow: '02 — Web App & Branding', title: 'Product', em: 'Launch',
    desc: 'From brand identity to a working booking platform — built end to end.',
    layout: 'g2',
    items: [
      { id: 5, src: webapp,  tag: 'Web App',  title: 'Webevaa Booking Platform', desc: 'Appointment booking web app for salons & clinics', ratio: '4/3', pos: 'top' },
      { id: 6, src: weblogo, tag: 'Branding', title: 'Webevaa Brand Identity',   desc: 'Logo design · “Book. Plan. Live better.”',         ratio: '4/3', pos: 'center' },
    ],
  },
  {
    id: 'social', filter: 'Social Media',
    eyebrow: '03 — Social Media', title: 'Social Media', em: 'Creatives',
    desc: 'Scroll-stopping posters and campaigns for local brands.',
    layout: 'g3', cta: true,
    items: [
      { id: 7, src: diwali,  tag: 'Social Media', title: 'Festive Offer Campaign', desc: 'Promotional poster · social media creative', ratio: '4/5', pos: 'top' },
      { id: 8, src: nailart, tag: 'Social Media', title: 'Rashmi’s Nail Oasis',    desc: 'Service & pricing poster · salon brand',     ratio: '4/5', pos: 'top' },
    ],
  },
];

const FILTERS = ['All', ...SECTIONS.map((s) => s.filter)];

const STATS = [
  { n: '20+',   l: 'Projects Delivered' },
  { n: '4.9★',  l: 'Average Rating' },
  { n: '98%',   l: 'Client Satisfaction' },
  { n: '2–5',   l: 'Days Delivery' },
];

const styles = `
/* ── STATS ── */
.gal-stats {
  display:flex; flex-wrap:wrap; background:linear-gradient(145deg,#060d1a,#040a14);
  border:1px solid rgba(255,255,255,.07); border-radius:18px; overflow:hidden; margin-bottom:72px;
}
.gal-stat { flex:1; min-width:140px; padding:28px 20px; text-align:center; border-right:1px solid rgba(255,255,255,.05); }
.gal-stat:last-child { border-right:none; }
.gal-stat-n { font-family:'Bebas Neue',sans-serif; font-size:40px; line-height:1; background:linear-gradient(135deg,#eef4ff,#00c8ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.gal-stat-l { font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:rgba(255,255,255,.4); margin-top:5px; }

/* ── FILTERS ── */
.gal-filters { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin:6px 0 54px; }
.gal-filter {
  display:inline-flex; align-items:center; gap:8px; font-family:'Barlow',sans-serif;
  font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#6a7d94;
  border:1px solid rgba(255,255,255,.08); padding:9px 18px; border-radius:100px; background:none; cursor:pointer; transition:all .25s;
}
.gal-filter i { font-style:normal; font-size:10px; padding:1px 7px; border-radius:100px; background:rgba(255,255,255,.06); color:rgba(255,255,255,.45); transition:all .25s; }
.gal-filter:hover { border-color:rgba(0,200,255,.4); color:#00c8ff; }
.gal-filter.on { border-color:#00c8ff; color:#00c8ff; background:rgba(0,200,255,.08); }
.gal-filter.on i { background:rgba(0,200,255,.18); color:#00c8ff; }

/* ── SECTIONS ── */
.gl-sec { margin-bottom:84px; }
.gl-sec:last-of-type { margin-bottom:64px; }
.gl-sec-head { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; margin-bottom:26px; flex-wrap:wrap; }
.gl-sec-eye { font-size:10px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:#00c8ff; margin-bottom:8px; }
.gl-sec-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(30px,4.4vw,46px); letter-spacing:.03em; line-height:1; color:#eef4ff; }
.gl-sec-title em { font-style:normal; color:#00c8ff; }
.gl-sec-desc { max-width:360px; font-size:13.5px; font-weight:300; line-height:1.7; color:rgba(238,244,255,.5); }

.gl-grid { display:grid; gap:18px; }
.gl-grid.g2 { grid-template-columns:repeat(2,1fr); }
.gl-grid.g3 { grid-template-columns:repeat(3,1fr); }

/* ── CARD ── */
.gl-card {
  display:flex; flex-direction:column; border-radius:20px; overflow:hidden; cursor:pointer; outline:none;
  background:linear-gradient(160deg,#060d1a,#040a14); border:1px solid rgba(255,255,255,.07);
  transition:border-color .35s, transform .35s, box-shadow .35s;
}
.gl-card:hover, .gl-card:focus-visible { border-color:rgba(0,200,255,.3); transform:translateY(-5px); box-shadow:0 22px 54px rgba(0,0,0,.55), 0 0 0 1px rgba(0,200,255,.08); }
.gl-media { position:relative; overflow:hidden; background:#071225; }
.gl-media img { display:block; width:100%; height:100%; object-fit:cover; transition:transform .7s cubic-bezier(.2,.8,.2,1); }
.gl-card:hover .gl-media img { transform:scale(1.05); }
.gl-shade { position:absolute; inset:0; pointer-events:none; background:linear-gradient(to top,rgba(3,8,15,.55),transparent 40%), linear-gradient(to bottom,rgba(3,8,15,.35),transparent 28%); }
.gl-tag {
  position:absolute; top:14px; left:14px; font-size:9px; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
  color:#00c8ff; padding:5px 11px; border-radius:100px; background:rgba(3,8,15,.72); border:1px solid rgba(0,200,255,.3); backdrop-filter:blur(8px);
}
.gl-zoom {
  position:absolute; top:12px; right:12px; width:34px; height:34px; border-radius:50%; display:grid; place-items:center; font-size:12px;
  color:#eef4ff; background:rgba(3,8,15,.72); border:1px solid rgba(255,255,255,.2); backdrop-filter:blur(8px);
  opacity:0; transform:scale(.8); transition:opacity .3s, transform .35s cubic-bezier(.34,1.56,.64,1);
}
.gl-card:hover .gl-zoom, .gl-card:focus-visible .gl-zoom { opacity:1; transform:scale(1); }
.gl-cap { padding:16px 20px 18px; border-top:1px solid rgba(255,255,255,.05); }
.gl-cap h4 { font-family:'Bebas Neue',sans-serif; font-weight:400; font-size:22px; letter-spacing:.04em; color:#eef4ff; margin-bottom:3px; }
.gl-cap p { font-size:12.5px; font-weight:300; color:rgba(238,244,255,.5); line-height:1.5; }

/* ── SOCIAL CTA CARD ── */
.gl-cta {
  position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:center; gap:14px; padding:34px 28px;
  border-radius:20px; background:linear-gradient(160deg,#071225,#050e1f); border:1px solid rgba(0,200,255,.22);
}
.gl-cta::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#00c8ff,transparent); }
.gl-cta::after { content:''; position:absolute; bottom:-90px; right:-60px; width:260px; height:260px; background:radial-gradient(circle,rgba(0,200,255,.12),transparent 70%); pointer-events:none; }
.gl-cta-ic { width:48px; height:48px; border-radius:14px; display:grid; place-items:center; font-size:20px; color:#00c8ff; background:rgba(0,200,255,.08); border:1px solid rgba(0,200,255,.22); }
.gl-cta h4 { font-family:'Bebas Neue',sans-serif; font-weight:400; font-size:34px; line-height:1; letter-spacing:.03em; color:#eef4ff; }
.gl-cta h4 em { font-style:normal; color:#00c8ff; }
.gl-cta p { font-size:13.5px; font-weight:300; line-height:1.75; color:rgba(238,244,255,.55); }
.gl-cta .btn-cyan, .gl-cta .btn-ghost { position:relative; z-index:1; justify-content:center; width:100%; }

/* ── BOTTOM CTA ── */
.gal-cta { text-align:center; padding:20px 0 0; }
.gal-cta-t { font-family:'Bebas Neue',sans-serif; font-size:clamp(30px,5vw,54px); letter-spacing:.02em; color:#eef4ff; margin-bottom:12px; }
.gal-cta-t em { font-style:normal; color:#00c8ff; }
.gal-cta-s { font-size:14px; font-weight:300; color:rgba(255,255,255,.5); margin-bottom:26px; }
.gal-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

/* ── LIGHTBOX ── */
.lb { position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px; padding:64px 72px 28px; background:rgba(2,5,10,.94); backdrop-filter:blur(14px); animation:lbIn .25s ease; }
@keyframes lbIn { from { opacity:0 } to { opacity:1 } }
.lb-img { max-width:min(92vw,1100px); max-height:calc(100vh - 190px); border-radius:14px; object-fit:contain; box-shadow:0 30px 90px rgba(0,0,0,.6); animation:lbPop .35s cubic-bezier(.2,.8,.2,1); }
@keyframes lbPop { from { opacity:0; transform:scale(.96) } to { opacity:1; transform:none } }
.lb-cap { text-align:center; max-width:560px; }
.lb-cap-t { font-family:'Bebas Neue',sans-serif; font-size:26px; letter-spacing:.04em; color:#eef4ff; }
.lb-cap-d { font-size:13px; font-weight:300; color:rgba(255,255,255,.55); margin-top:3px; }
.lb-count { font-size:11px; font-weight:700; letter-spacing:.18em; color:rgba(0,200,255,.8); margin-top:8px; }
.lb-btn {
  position:absolute; width:44px; height:44px; border-radius:50%; display:grid; place-items:center; font-size:15px; cursor:pointer;
  color:#eef4ff; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.14); transition:all .2s;
}
.lb-btn:hover { background:rgba(0,200,255,.15); border-color:#00c8ff; color:#00c8ff; }
.lb-close { top:20px; right:20px; }
.lb-prev { left:18px; top:50%; transform:translateY(-50%); }
.lb-next { right:18px; top:50%; transform:translateY(-50%); }

/* ── RESPONSIVE ── */
@media (max-width:900px) {
  .gl-grid.g3 { grid-template-columns:repeat(2,1fr); }
  .gl-cta { grid-column:span 2; }
  .gl-sec-head { align-items:flex-start; }
}
@media (max-width:680px) {
  .gl-grid.g2, .gl-grid.g3 { grid-template-columns:1fr; }
  .gl-cta { grid-column:auto; }
  .gl-sec { margin-bottom:64px; }
  .gal-filters { margin-bottom:40px; }
  .gal-stat { min-width:50%; border-bottom:1px solid rgba(255,255,255,.05); }
  .gal-stat:nth-child(2n) { border-right:none; }
  .lb { padding:60px 14px 22px; }
  .lb-prev, .lb-next { top:auto; bottom:22px; transform:none; }
  .lb-prev { left:18px; } .lb-next { right:18px; }
}
@media (hover:none) { .gl-zoom { opacity:1; transform:none; } }
@media (prefers-reduced-motion:reduce) { .gl-card, .gl-media img, .lb-img { transition:none; animation:none; } }
`;

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [lb, setLb] = useState(null);        // index in `visible`
  const touchX = useRef(null);

  const shown   = SECTIONS.filter((s) => filter === 'All' || s.filter === filter);
  const visible = shown.flatMap((s) => s.items);
  const item    = lb !== null ? visible[lb] : null;

  const close = useCallback(() => setLb(null), []);
  const prev  = useCallback(() => setLb((i) => (i === null ? i : (i - 1 + visible.length) % visible.length)), [visible.length]);
  const next  = useCallback(() => setLb((i) => (i === null ? i : (i + 1) % visible.length)), [visible.length]);
  const open  = (id) => setLb(visible.findIndex((v) => v.id === id));

  // keyboard
  useEffect(() => {
    if (lb === null) return undefined;
    const fn = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lb, close, prev, next]);

  // lock page scroll while open
  useEffect(() => {
    document.body.style.overflow = lb !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lb]);

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
  };

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hi WebDishaa! 👋\nI saw your work in the gallery and I'd like to start a project. Could we talk?"
  )}`;

  return (
    <>
      <style>{styles}</style>

      {/* ── PAGE HERO ── */}
      <div className="page-hero">
        <div className="page-tag rev">Our Portfolio</div>
        <h1 className="page-hero-title rev">Our <em>Work</em></h1>
        <p className="page-hero-sub rev">
          Real websites, web apps, brands and social media creatives
          for businesses across India.
        </p>
      </div>

      <div className="s-wrap">
        <div className="s-inner">

          {/* ── STATS ── */}
          <div className="gal-stats rev">
            {STATS.map((s) => (
              <div className="gal-stat" key={s.l}>
                <div className="gal-stat-n">{s.n}</div>
                <div className="gal-stat-l">{s.l}</div>
              </div>
            ))}
          </div>

          {/* ── HEADING + FILTERS ── */}
          <div className="rev">
            <div className="s-eyebrow">Project Gallery</div>
            <h2 className="s-title">Design <em>Showcase</em></h2>
            <p className="s-body">Browse our work across websites, web apps, branding and social media.</p>
          </div>

          <div className="gal-filters rev" role="tablist">
            {FILTERS.map((f) => {
              const count = f === 'All'
                ? SECTIONS.reduce((n, s) => n + s.items.length, 0)
                : SECTIONS.find((s) => s.filter === f).items.length;
              return (
                <button
                  key={f} role="tab" aria-selected={filter === f}
                  className={`gal-filter${filter === f ? ' on' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}<i>{count}</i>
                </button>
              );
            })}
          </div>

          {/* ── SECTIONS ── */}
          {shown.map((sec) => (
            <section className="gl-sec" key={sec.id}>
              <div className="gl-sec-head rev">
                <div>
                  <div className="gl-sec-eye">{sec.eyebrow}</div>
                  <h3 className="gl-sec-title">{sec.title} <em>{sec.em}</em></h3>
                </div>
                <p className="gl-sec-desc">{sec.desc}</p>
              </div>

              <div className={`gl-grid ${sec.layout}`}>
                {sec.items.map((it, i) => (
                  <figure
                    key={it.id}
                    className={`gl-card rev d${(i % 4) + 1}`}
                    role="button" tabIndex={0}
                    aria-label={`Open ${it.title}`}
                    onClick={() => open(it.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(it.id); } }}
                  >
                    <div className="gl-media" style={{ aspectRatio: it.ratio }}>
                      <img src={it.src} alt={it.title} loading="lazy" decoding="async" style={{ objectPosition: it.pos }} />
                      <div className="gl-shade" />
                      <span className="gl-tag">{it.tag}</span>
                      <span className="gl-zoom"><FaExpand /></span>
                    </div>
                    <figcaption className="gl-cap">
                      <h4>{it.title}</h4>
                      <p>{it.desc}</p>
                    </figcaption>
                  </figure>
                ))}

                {sec.cta && (
                  <div className="gl-cta rev d3">
                    <div className="gl-cta-ic"><FaInstagram /></div>
                    <h4>Want content <em>like this?</em></h4>
                    <p>Monthly reels and posts, designed around your brand — so your page never goes quiet.</p>
                    <Link className="btn-cyan" to="/services">View Our Packs →</Link>
                  </div>
                )}
              </div>
            </section>
          ))}

          {/* ── BOTTOM CTA ── */}
          <div className="gal-cta rev">
            <h2 className="gal-cta-t">Want Results Like <em>These?</em></h2>
            <p className="gal-cta-s">Let's build something great for your business too.</p>
            <div className="gal-btns">
              <a href={waHref} className="btn-cyan" target="_blank" rel="noreferrer">
                <FaWhatsapp /> Start Your Project
              </a>
              <Link className="btn-ghost" to="/contact">Get Free Quote</Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {item && (
        <div
          className="lb" role="dialog" aria-modal="true" aria-label={item.title}
          onClick={close}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={onTouchEnd}
        >
          <button className="lb-btn lb-close" aria-label="Close" onClick={close}><FaTimes /></button>
          {visible.length > 1 && (
            <>
              <button className="lb-btn lb-prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); prev(); }}><FaChevronLeft /></button>
              <button className="lb-btn lb-next" aria-label="Next" onClick={(e) => { e.stopPropagation(); next(); }}><FaChevronRight /></button>
            </>
          )}

          <img key={item.id} className="lb-img" src={item.src} alt={item.title} onClick={(e) => e.stopPropagation()} />

          <div className="lb-cap" onClick={(e) => e.stopPropagation()}>
            <div className="lb-cap-t">{item.title}</div>
            <div className="lb-cap-d">{item.desc}</div>
            <div className="lb-count">{String(lb + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}</div>
          </div>
        </div>
      )}
    </>
  );
}