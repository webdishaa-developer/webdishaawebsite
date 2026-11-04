// ─────────────────────────────────────────────────────
//  HomePage.jsx
//  Keep all your existing components exactly as they are.
//  Just assemble them here instead of in App.jsx
// ─────────────────────────────────────────────────────

import Hero         from '../components/Hero';
import Marquee      from '../components/Marquee';
import Packages     from '../components/Packages';
import Process      from '../components/Process';
import Portfolio    from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import SocialPacks  from '../components/SocialPacks';
import WhyUs        from '../components/WhyUs';
import HomeCTA      from '../components/Contact';   // renamed from Contact → HomeCTA

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <hr className="hr" />
      <Packages />
      <hr className="hr" />
      <Process />
      <hr className="hr" />
      <Portfolio />
      <hr className="hr" />
      <Testimonials />
      <hr className="hr" />
      <SocialPacks />
      <hr className="hr" />
      <WhyUs />
      <HomeCTA />
    </>
  );
}