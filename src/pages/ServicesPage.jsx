// pages/ServicesPage.jsx — all sections reuse the shared components,
// so a plan is edited in ONE place (data/plans.js).
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Packages    from '../components/Packages';
import SocialPacks from '../components/SocialPacks';
import Services    from '../components/Services';
import { waLink }  from '../utils/whatsapp';

const styles = `
.sv-tabs {
  position:sticky; top:62px; z-index:90; display:flex; gap:8px; justify-content:center;
  padding:12px 5%; background:rgba(3,8,15,.9); backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(255,255,255,.05);
}
.sv-tab {
  font-family:'Barlow',sans-serif; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
  color:#6a7d94; border:1px solid rgba(255,255,255,.08); padding:8px 18px; border-radius:100px;
  white-space:nowrap; transition:all .25s;
}
.sv-tab:hover { border-color:#00c8ff; color:#00c8ff; background:rgba(0,200,255,.07); }
.sv-cta {
  background:linear-gradient(135deg,#060d1a,#040a14); border:1px solid rgba(0,200,255,.15);
  border-radius:20px; padding:52px 28px; text-align:center; position:relative; overflow:hidden;
}
.sv-cta::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#00c8ff,transparent); }
.sv-cta h2 { font-family:'Bebas Neue',sans-serif; font-size:clamp(34px,6vw,60px); line-height:.95; color:#eef4ff; margin-bottom:12px; }
.sv-cta h2 em { font-style:normal; color:#00c8ff; }
.sv-cta p { font-size:14px; font-weight:300; color:rgba(238,244,255,.5); max-width:420px; margin:0 auto 24px; line-height:1.8; }
@media (max-width:768px){
  .sv-tabs { top:56px; justify-content:flex-start; overflow-x:auto; scrollbar-width:none; }
  .sv-tabs::-webkit-scrollbar { display:none; }
}
`;

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function ServicesPage() {
  return (
    <>
      <style>{styles}</style>

      <div className="page-hero">
        <div className="page-tag rev">Everything We Offer</div>
        <h1 className="page-hero-title rev">Our <em>Services</em></h1>
        <p className="page-hero-sub rev">
          Websites · Social Media · Branding · Google Setup — tap Enquire Now on any plan
          and we'll reply on WhatsApp.
        </p>
      </div>

      <div className="sv-tabs">
        <button className="sv-tab" onClick={() => go('packages')}>🌐 Websites</button>
        <button className="sv-tab" onClick={() => go('social')}>📱 Social Media</button>
        <button className="sv-tab" onClick={() => go('services')}>🎨 Branding & Google</button>
      </div>

      <Packages />
      <hr className="hr" />
      <SocialPacks />
      <hr className="hr" />
      <Services />

      <div className="s-wrap">
        <div className="s-inner">
          <div className="sv-cta rev">
            <h2>Not Sure What<br />You <em>Need?</em></h2>
            <p>Message us — we'll suggest the perfect plan for your business in a free 15-minute chat.</p>
            <a className="btn-cyan" href={waLink('services you offer')} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}