// ─────────────────────────────────────────────────────
//  WebDisha — Main App
//  All components assembled here in order.
//  To add/remove a section just comment it out below.
// ─────────────────────────────────────────────────────

import useReveal          from './hooks/useReveal';
import useScrollProgress  from './hooks/useScrollProgress';

import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import Marquee        from './components/Marquee';
import Packages       from './components/Packages';
import Process        from './components/Process';
import Services       from './components/Services';
import Portfolio      from './components/Portfolio';
import Testimonials   from './components/Testimonials';
import SocialPacks    from './components/SocialPacks';
// import Maintenance    from './components/Maintenance';
import WhyUs          from './components/WhyUs';
import Contact        from './components/Contact';
import Footer         from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  // rAF-throttled scroll — updates nav solid state + progress bar
  const { progRef, navSolid } = useScrollProgress();

  // Single IntersectionObserver for ALL .rev scroll-reveal elements
  useReveal();

  return (
    <div>
      {/* ── BACKGROUND LAYERS ── */}
      <div className="stars" />
      <div className="ambient" />

      {/* ── SCROLL PROGRESS BAR (top of page) ── */}
      <div className="progress-bar" ref={progRef} />

      {/* ── FLOATING WHATSAPP BUTTON ── */}
      <WhatsAppButton />

      {/* ── NAVIGATION ── */}
      <Navbar solid={navSolid} />

      {/* ── HERO ── */}
      <Hero />

      {/* ── MARQUEE TICKER ── */}
      <Marquee />

      <hr className="hr" />

      {/* ── WEBSITE PACKAGES ── */}
      <Packages />

      <hr className="hr" />

      {/* ── HOW WE WORK ── */}
      <Process />

      <hr className="hr" />

      {/* ── BRANDING & SERVICES (3D tilt) ── */}
      <Services />

      <hr className="hr" />

      {/* ── PORTFOLIO BEFORE/AFTER ── */}
      <Portfolio />

      <hr className="hr" />

      {/* ── CLIENT TESTIMONIALS ── */}
      <Testimonials />

      <hr className="hr" />

      {/* ── SOCIAL MEDIA PACKS ── */}
      <SocialPacks />

      <hr className="hr" />

      {/* ── MAINTENANCE PLANS ── */}
      {/* <Maintenance /> */}

      <hr className="hr" />

      {/* ── WHY CHOOSE US ── */}
      <WhyUs />

      {/* ── CONTACT / CTA ── */}
      <Contact />

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
