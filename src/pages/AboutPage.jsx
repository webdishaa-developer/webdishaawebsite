// ─────────────────────────────────────────────────────
//  AboutPage.jsx — Full About Us Page
// ─────────────────────────────────────────────────────

import { Link } from 'react-router-dom';
import {
  FaRocket, FaUsers, FaHeart, FaBullseye,
  FaWhatsapp, FaStar, FaMapMarkerAlt, FaCalendarAlt
} from 'react-icons/fa';

const styles = `
/* ── PAGE HERO ── */
.page-hero {
  position: relative; z-index: 1;
  min-height: 52vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center;
  padding: 140px 5% 80px;
  overflow: hidden;
}
.page-hero::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,200,255,.07), transparent 70%);
  pointer-events: none;
}
.page-tag {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 10px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase;
  color: #00c8ff; border: 1px solid rgba(0,200,255,.25);
  padding: 5px 14px; border-radius: 100px; background: rgba(0,200,255,.06);
  margin-bottom: 22px;
}
.page-tag::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #00c8ff; box-shadow: 0 0 6px #00c8ff; }
.page-hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(52px,10vw,120px);
  line-height: .9; letter-spacing: .02em; color: #eef4ff;
  margin-bottom: 20px;
}
.page-hero-title em { font-style: normal; color: #00c8ff; }
.page-hero-sub {
  font-size: 16px; font-weight: 300; line-height: 1.8;
  color: rgba(255,255,255,.55); max-width: 560px; margin: 0 auto 36px;
}

/* ── STORY SECTION ── */
.story-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
}
.story-label {
  font-size: 10px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase;
  color: #00c8ff; display: flex; align-items: center; gap: 8px; margin-bottom: 16px;
}
.story-label::before { content: ''; width: 18px; height: 1px; background: #00c8ff; }
.story-heading {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(32px,5vw,58px); line-height: .95; letter-spacing: .02em;
  color: #eef4ff; margin-bottom: 20px;
}
.story-heading em { font-style: normal; color: #00c8ff; }
.story-text {
  font-size: 14.5px; font-weight: 300; line-height: 1.85;
  color: rgba(255,255,255,.6); margin-bottom: 16px;
}
.story-visual {
  background: linear-gradient(145deg, #060d1a, #040a14);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 20px; padding: 40px 32px;
  position: relative; overflow: hidden;
}
.story-visual::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, #00c8ff, transparent);
}
.story-year {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 96px; line-height: 1; letter-spacing: .02em;
  background: linear-gradient(135deg, rgba(0,200,255,.15), rgba(0,200,255,.03));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 6px;
}
.story-year-label {
  font-size: 11px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
  color: #00c8ff; margin-bottom: 28px;
}
.story-milestone {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255,255,255,.05);
}
.story-milestone:last-child { border-bottom: none; }
.milestone-icon {
  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
  background: rgba(0,200,255,.08); border: 1px solid rgba(0,200,255,.18);
  display: flex; align-items: center; justify-content: center;
  color: #00c8ff; font-size: 14px;
}
.milestone-n { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #eef4ff; line-height: 1; }
.milestone-l { font-size: 11px; font-weight: 300; color: rgba(255,255,255,.45); margin-top: 2px; }

/* ── VALUES ── */
.values-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 14px;
}
.value-card {
  background: linear-gradient(145deg,#060d1a,#040a14);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px; padding: 26px 20px;
  position: relative; overflow: hidden;
  transition: border-color .3s, transform .3s;
}
.value-card::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg,transparent,rgba(0,200,255,.0),transparent);
  transition: background .4s;
}
.value-card:hover { border-color: rgba(0,200,255,.22); transform: translateY(-4px); }
.value-card:hover::after { background: linear-gradient(90deg,transparent,rgba(0,200,255,.5),transparent); }
.value-icon {
  width: 42px; height: 42px; border-radius: 12px;
  background: rgba(0,200,255,.08); border: 1px solid rgba(0,200,255,.18);
  display: flex; align-items: center; justify-content: center;
  color: #00c8ff; font-size: 18px; margin-bottom: 14px;
  transition: background .3s, transform .3s;
}
.value-card:hover .value-icon { background: rgba(0,200,255,.14); transform: scale(1.08); }
.value-title { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: .04em; color: #eef4ff; margin-bottom: 8px; }
.value-desc { font-size: 13px; font-weight: 300; color: rgba(255,255,255,.5); line-height: 1.75; }

/* ── TEAM ── */
.team-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 16px;
}
.team-card {
  background: linear-gradient(145deg,#060d1a,#040a14);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 18px; padding: 28px 20px 22px;
  text-align: center; position: relative; overflow: hidden;
  transition: border-color .3s, transform .3s;
}
.team-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg,transparent,rgba(0,200,255,.0),transparent);
  transition: background .4s;
}
.team-card:hover { border-color: rgba(0,200,255,.22); transform: translateY(-4px); }
.team-card:hover::before { background: linear-gradient(90deg,transparent,#00c8ff,transparent); }
.team-avatar {
  width: 60px; height: 60px; border-radius: 50%;
  background: rgba(0,200,255,.08);
  border: 1px solid rgba(0,200,255,.25);
  display: flex; align-items: center; justify-content: center;
  font-size: 26px;
  margin: 0 auto 16px; box-shadow: 0 0 20px rgba(0,200,255,.15);
  transition: box-shadow .3s, background .3s;
}
.team-card:hover .team-avatar { box-shadow: 0 0 36px rgba(0,200,255,.3); background: rgba(0,200,255,.13); }
.team-role { font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #00c8ff; margin-bottom: 14px; }
.team-quote {
  font-size: 13px; font-weight: 300; color: rgba(255,255,255,.55); line-height: 1.75;
  font-style: italic; position: relative; padding: 0 4px;
}
.team-quote::before {
  content: '"'; font-size: 40px; line-height: 0; color: rgba(0,200,255,.2);
  font-family: 'Bebas Neue', sans-serif; position: absolute; top: 10px; left: -6px;
}

/* ── LOCAL PRIDE ── */
.local-box {
  background: linear-gradient(135deg, #060d1a, #040a14);
  border: 1px solid rgba(0,200,255,.15);
  border-radius: 20px; padding: 52px 48px;
  text-align: center; position: relative; overflow: hidden;
}
.local-box::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg,transparent,#00c8ff,transparent);
}
.local-box::after {
  content: '';
  position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
  width: 400px; height: 250px;
  background: radial-gradient(ellipse, rgba(0,200,255,.06), transparent 70%);
  pointer-events: none;
}
.local-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(28px,5vw,52px); line-height: .95; letter-spacing: .02em; color: #eef4ff; margin-bottom: 14px; position: relative; z-index: 1; }
.local-title em { font-style: normal; color: #00c8ff; }
.local-sub { font-size: 15px; font-weight: 300; color: rgba(255,255,255,.55); max-width: 480px; margin: 0 auto 28px; line-height: 1.8; position: relative; z-index: 1; }
.local-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; position: relative; z-index: 1; }
.local-tag {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 12px; font-weight: 500; color: rgba(255,255,255,.6);
  border: 1px solid rgba(255,255,255,.08); border-radius: 100px;
  padding: 7px 16px; background: rgba(255,255,255,.03);
}
.local-tag svg { color: #00c8ff; font-size: 12px; }

/* ── CTA STRIP ── */
.about-cta {
  display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 36px;
}
.btn-cyan {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  background: #00c8ff; color: #000; border: none; cursor: pointer;
  padding: 13px 28px; border-radius: 100px;
  box-shadow: 0 0 26px rgba(0,200,255,.25);
  transition: box-shadow .25s, transform .25s; text-decoration: none;
}
.btn-cyan:hover { box-shadow: 0 0 50px rgba(0,200,255,.5); transform: translateY(-2px); }
.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  color: #6a7d94; border: 1px solid rgba(255,255,255,.1);
  padding: 13px 28px; border-radius: 100px; background: none; cursor: pointer;
  transition: all .25s; text-decoration: none;
}
.btn-ghost:hover { border-color: #00c8ff; color: #00c8ff; }

/* ── RESPONSIVE ── */
@media (max-width:900px) {
  .story-grid { grid-template-columns: 1fr; gap: 36px; }
  .story-visual { order: -1; }
}
@media (max-width:768px) {
  .page-hero { padding: 110px 5% 60px; min-height: auto; }
  .local-box { padding: 36px 22px; }
  .values-grid { grid-template-columns: repeat(2,1fr); }
  .team-grid   { grid-template-columns: repeat(2,1fr); }
}
@media (max-width:480px) {
  .values-grid { grid-template-columns: 1fr; }
  .team-grid   { grid-template-columns: 1fr; }
  .page-hero-title { font-size: clamp(44px,14vw,72px); }
}
`;

const VALUES = [
  { icon: <FaRocket />, title: 'Speed',       desc: 'We deliver your website in 2–5 days, not weeks. Every hour matters for your business.' },
  { icon: <FaHeart />,  title: 'Passion',      desc: 'We genuinely care about your success. Your growth is our motivation.' },
  { icon: <FaUsers />,  title: 'Local First',  desc: 'We understand Raipur & CG businesses. We speak your language and know your market.' },
  { icon: <FaBullseye />, title: 'Results',   desc: 'We don\'t just build pretty sites. We build sites that generate calls, leads & sales.' },
];

const TEAM = [
  {
    emoji: '💻',
    role: 'Founder & Developer',
    quote: 'Every local business deserves a powerful online presence. We make that happen — fast, affordable, and built to last.',
  },
  {
    emoji: '🎨',
    role: 'UI/UX Designer',
    quote: 'Good design isn\'t just about looking pretty. It\'s about guiding your customer to take action the moment they land on your page.',
  },
  {
    emoji: '🔍',
    role: 'SEO & Marketing',
    quote: 'If your business isn\'t showing up on Google, you\'re invisible to 90% of your potential customers. Let\'s fix that.',
  },
  {
    emoji: '📱',
    role: 'Social Media',
    quote: 'Consistency is everything in social media. We make sure your brand shows up, stands out, and stays in people\'s minds.',
  },
];

const MILESTONES = [
  { icon: <FaCalendarAlt />,  n: '2025',   l: 'Founded in Raipur CG'  },
  { icon: <FaUsers />,        n: '20+',    l: 'Projects Delivered'     },
  { icon: <FaStar />,         n: '4.9★',   l: 'Average Client Rating'  },
  { icon: <FaMapMarkerAlt />, n: 'PAN 🇮🇳', l: 'India-Wide Clients'    },
];

export default function AboutPage() {
  return (
    <>
      <style>{styles}</style>

      {/* ── PAGE HERO ── */}
      <div className="page-hero">
        <div className="page-tag rev">About WebDishaa</div>
        <h1 className="page-hero-title rev">
          Built in <em>Raipur</em><br />For All India
        </h1>
        <p className="page-hero-sub rev">
          We're a passionate digital agency helping businesses across India
          build a powerful online presence — affordable, fast, and beautiful.
        </p>
        <div className="about-cta rev">
          <a href="https://wa.me/your-number" className="btn-cyan" target="_blank" rel="noreferrer">
            <FaWhatsapp /> Talk To Us
          </a>
          <Link className="btn-ghost" to="/services">Our Services →</Link>
        </div>
      </div>

      {/* ── STORY ── */}
      <div className="s-wrap">
        <div className="s-inner">
          <div className="story-grid">
            <div className="rev">
              <div className="story-label">Our Story</div>
              <h2 className="story-heading">Why We <em>Started</em></h2>
              <p className="story-text">
                In 2025, we noticed something frustrating — hundreds of talented local businesses
                across India were losing customers every day simply because they had no online presence.
                Great restaurants, skilled professionals, and passionate entrepreneurs were invisible online.
              </p>
              <p className="story-text">
                We started WebDishaa with one mission: make professional digital solutions accessible
                to every business, regardless of their budget. No corporate pricing. No jargon.
                Just real results, delivered fast.
              </p>
              <p className="story-text">
                Today we've delivered 20+ projects for clients across India — from small local shops
                in Raipur to businesses spanning multiple cities across the country.
              </p>
            </div>

            <div className="story-visual rev d2">
              <div className="story-year">2025</div>
              <div className="story-year-label">Founded in Raipur CG</div>
              {MILESTONES.map((m, i) => (
                <div className="story-milestone" key={i}>
                  <div className="milestone-icon">{m.icon}</div>
                  <div>
                    <div className="milestone-n">{m.n}</div>
                    <div className="milestone-l">{m.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="hr" />

      {/* ── VALUES ── */}
      <div className="s-wrap">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">What We Believe</div>
            <h2 className="s-title">Our Core <em>Values</em></h2>
            <p className="s-body">Everything we build is guided by four simple principles.</p>
          </div>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className={`value-card rev d${i + 1}`}>
                <div className="value-icon">{v.icon}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="hr" />

      {/* ── TEAM ── */}
      <div className="s-wrap">
        <div className="s-inner">
          <div className="rev">
            <div className="s-eyebrow">The Team</div>
            <h2 className="s-title">People Behind <em>WebDishaa</em></h2>
            <p className="s-body">A small but mighty team of designers, developers and digital marketers.</p>
          </div>
          <div className="team-grid">
            {TEAM.map((t, i) => (
              <div key={i} className={`team-card rev d${i + 1}`}>
                <div className="team-avatar">{t.emoji}</div>
                <div className="team-role">{t.role}</div>
                <div className="team-quote">{t.quote}</div>
              </div>
            ))}
          </div>
        </div> 
      </div>

      <hr className="hr" />

      {/* ── LOCAL PRIDE ── */}
      <div className="s-wrap">
        <div className="s-inner">
          <div className="local-box rev">
            <h2 className="local-title">Based in <em>Raipur</em>,<br />Serving Pan India</h2>
            <p className="local-sub">
              We're from Raipur but we work with businesses across India. Fast communication,
              transparent pricing, and results you can see — wherever you are.
            </p>
            <div className="local-tags">
              {['Raipur, CG', 'Hindi & English', 'Pan India Clients', '2-Hour Response', 'Remote & In-Person', 'UPI & Easy Payments'].map((t) => (
                <span className="local-tag" key={t}>
                  <FaMapMarkerAlt /> {t}
                </span>
              ))}
            </div>
            <div className="about-cta" style={{marginTop:'32px'}}>
              <Link className="btn-cyan" to="/contact">Start Your Project →</Link>
              <Link className="btn-ghost" to="/gallery">See Our Work</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}