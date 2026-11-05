// ─────────────────────────────────────────────────────
//  ContactPage.jsx — Full Contact Page
//
//  Enquiries are emailed to webdishaa@gmail.com via Web3Forms
//  (free, works on any host + localhost, no activation, no backend).
//
//  ONE-TIME SETUP (1 minute):
//   1. Go to https://web3forms.com  → enter webdishaa@gmail.com → "Create Access Key"
//   2. Open that email, copy the Access Key
//   3. Paste it into WEB3FORMS_KEY below, save, redeploy.
//  If sending ever fails, the visitor gets a WhatsApp link with their details.
// ─────────────────────────────────────────────────────

import { useState } from 'react';
import { SITE } from '../data';
import {
  FaWhatsapp, FaPhone, FaEnvelope, FaInstagram,
  FaMapMarkerAlt, FaClock, FaCheckCircle, FaSpinner
} from 'react-icons/fa';

import { WA_NUMBER } from '../utils/whatsapp';

// Paste your Web3Forms Access Key here (it is safe to be public — it can only
// send mail TO webdishaa@gmail.com, nothing else).
const WEB3FORMS_KEY = '7e212134-245d-440b-ae13-1526d39c3c59';
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const KEY_READY     = WEB3FORMS_KEY && !WEB3FORMS_KEY.startsWith('PASTE_');

// fetch that gives up after `ms` instead of hanging
const fetchWithTimeout = async (url, options, ms) => {
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try   { return await fetch(url, { ...options, signal: ctrl.signal }); }
  finally { clearTimeout(timer); }
};

const styles = `
/* ── CONTACT GRID ── */
.contact-grid {
  display: grid; grid-template-columns: 1fr 1.5fr; gap: 48px; align-items: start;
}

/* ── LEFT: INFO PANEL ── */
.contact-info {
  display: flex; flex-direction: column; gap: 20px;
}

.info-card {
  background: linear-gradient(145deg,#060d1a,#040a14);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px; padding: 24px 20px;
  position: relative; overflow: hidden;
  transition: border-color .3s;
}
.info-card::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg,transparent,rgba(0,200,255,.3),transparent);
}
.info-card:hover { border-color: rgba(0,200,255,.2); }

.info-title {
  font-size: 11px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
  color: rgba(255,255,255,.35); margin-bottom: 14px;
}

.info-link {
  display: flex; align-items: center; gap: 12px;
  text-decoration: none; color: #eef4ff; font-size: 14px; font-weight: 400;
  padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.04);
  transition: color .2s;
}
.info-link:last-child { border-bottom: none; padding-bottom: 0; }
.info-link:hover { color: #00c8ff; }
.info-icon {
  width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
  background: rgba(0,200,255,.08); border: 1px solid rgba(0,200,255,.18);
  display: flex; align-items: center; justify-content: center;
  color: #00c8ff; font-size: 14px;
  transition: background .2s;
}
.info-link:hover .info-icon { background: rgba(0,200,255,.16); }
.info-link-text { display: flex; flex-direction: column; gap: 1px; }
.info-link-main { font-size: 13.5px; font-weight: 500; color: inherit; }
.info-link-sub  { font-size: 11px; font-weight: 300; color: rgba(255,255,255,.38); }

/* Hours card */
.hours-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,.04);
  font-size: 13px;
}
.hours-row:last-child { border-bottom: none; }
.hours-day { color: rgba(255,255,255,.5); font-weight: 300; }
.hours-time { color: #eef4ff; font-weight: 500; }
.hours-time.green { color: #00e887; }

/* WhatsApp CTA */
.wa-cta-card {
  background: linear-gradient(135deg,#021a06,#031208);
  border: 1px solid rgba(37,211,102,.2);
  border-radius: 16px; padding: 22px 20px;
  display: flex; align-items: center; gap: 16px;
  text-decoration: none; transition: border-color .3s, transform .3s;
}
.wa-cta-card:hover { border-color: rgba(37,211,102,.45); transform: translateY(-2px); }
.wa-icon-big {
  width: 46px; height: 46px; border-radius: 50%; flex-shrink: 0;
  background: #25d366; display: flex; align-items: center; justify-content: center;
  font-size: 22px; color: #fff;
  box-shadow: 0 0 20px rgba(37,211,102,.3);
}
.wa-cta-t { font-size: 14px; font-weight: 600; color: #eef4ff; margin-bottom: 3px; }
.wa-cta-s { font-size: 12px; font-weight: 300; color: rgba(37,211,102,.7); }

/* ── RIGHT: FORM ── */
.contact-form-wrap {
  background: linear-gradient(145deg,#060d1a,#040a14);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 20px; padding: 40px 36px;
  position: relative; overflow: hidden;
}
.contact-form-wrap::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg,transparent,#00c8ff,transparent);
}
.form-heading { font-family: 'Bebas Neue',sans-serif; font-size: 28px; letter-spacing: .04em; color: #eef4ff; margin-bottom: 6px; }
.form-sub { font-size: 13px; font-weight: 300; color: rgba(255,255,255,.45); margin-bottom: 28px; line-height: 1.6; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.form-label { font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.4); }
.form-input, .form-select, .form-textarea {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 10px; padding: 12px 16px;
  font-size: 13.5px; font-weight: 300; color: #eef4ff;
  font-family: 'Barlow',sans-serif;
  transition: border-color .25s, background .25s;
  outline: none; width: 100%;
}
.form-input::placeholder, .form-textarea::placeholder { color: rgba(255,255,255,.2); }
.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: rgba(0,200,255,.45);
  background: rgba(0,200,255,.04);
}
.form-select { cursor: pointer; }
.form-select option { background: #060d1a; color: #eef4ff; }
.form-textarea { resize: vertical; min-height: 110px; line-height: 1.7; }

/* Service chips */
.chip-group { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  font-size: 11px; font-weight: 600; letter-spacing: .07em;
  color: #6a7d94; border: 1px solid rgba(255,255,255,.09);
  padding: 7px 14px; border-radius: 100px; background: none; cursor: pointer;
  transition: all .2s;
}
.chip.on { border-color: rgba(0,200,255,.4); color: #00c8ff; background: rgba(0,200,255,.08); }

/* Submit button */
.form-submit {
  width: 100%; padding: 14px;
  font-size: 13px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
  background: #00c8ff; color: #000; border: none; border-radius: 100px; cursor: pointer;
  box-shadow: 0 0 26px rgba(0,200,255,.25);
  transition: box-shadow .25s, transform .25s; margin-top: 8px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.form-submit:hover:not(:disabled) { box-shadow: 0 0 50px rgba(0,200,255,.5); transform: translateY(-2px); }
.form-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }

/* Success state */
.form-success {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 40px 0; text-align: center; gap: 12px;
}
.form-success-icon { font-size: 44px; color: #00e887; }
.form-success-t { font-family: 'Bebas Neue',sans-serif; font-size: 28px; letter-spacing: .04em; color: #eef4ff; }
.form-success-s { font-size: 13.5px; font-weight: 300; color: rgba(255,255,255,.5); max-width: 300px; line-height: 1.7; }
.spin { animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Error */
.form-error { font-size: 12px; color: #ff6b6b; margin-top: 4px; }

/* ── MAP EMBED ── */
.map-wrap {
  border-radius: 16px; overflow: hidden;
  border: 1px solid rgba(255,255,255,.07);
  height: 240px; margin-top: 20px;
  background: #060d1a;
  display: flex; align-items: center; justify-content: center;
}
.map-wrap iframe { width: 100%; height: 100%; border: none; filter: invert(90%) hue-rotate(180deg); }
.map-placeholder { font-size: 13px; font-weight: 300; color: rgba(255,255,255,.3); text-align: center; padding: 20px; }

/* ── RESPONSIVE ── */
@media (max-width:900px) { .contact-grid { grid-template-columns: 1fr; gap: 32px; } }
@media (max-width:768px) { .contact-form-wrap { padding: 28px 20px; } .form-row { grid-template-columns: 1fr; } }
@media (max-width:480px) { .contact-form-wrap { padding: 22px 16px; } }
`;

const SERVICES_LIST = ['Website Design', 'Logo & Branding', 'Social Media', 'Google Business', 'SEO', 'E-Commerce', 'Other'];

export default function ContactPage() {
  const [form, setForm]           = useState({ name: '', phone: '', email: '', business: '', service: '', budget: '', message: '' });
  const [chips, setChips]         = useState([]);
  const [status, setStatus]       = useState('idle'); // idle | loading | success | error
  const [errors, setErrors]       = useState({});
  const [honey, setHoney]         = useState(''); // spam trap — real users never fill this

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: '' })); };

  const toggleChip = (s) => setChips((c) => c.includes(s) ? c.filter((x) => x !== s) : [...c, s]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid 10-digit phone number';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address';
    if (!form.message.trim()) e.message = 'Please tell us about your project';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (honey) return;                 // bots fill the hidden field — silently drop
    if (status === 'loading') return;  // no double submits
    if (!validate()) return;
    setStatus('loading');

    const name   = form.name.trim();
    const email  = form.email.trim();
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject:    `New enquiry from ${name} — WebDishaa website`,
      from_name:  'WebDishaa Website',
      name,
      phone:      form.phone.trim(),
      business:   form.business.trim() || 'Not provided',
      services:   chips.join(', ') || 'Not selected',
      budget:     form.budget || 'Not selected',
      message:    form.message.trim(),
      ...(email ? { email } : {}),   // becomes Reply-To when provided
    };

    try {
      if (!KEY_READY) throw new Error('Web3Forms access key is not set in ContactPage.jsx (WEB3FORMS_KEY)');

      const res  = await fetchWithTimeout(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }, 12000);
      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.success === true || data.success === 'true')) {
        setStatus('success');
      } else {
        throw new Error(`Web3Forms said: ${data.message || res.status}`);
      }
    } catch (err) {
      console.error('Enquiry could not be emailed:', err.message);
      setStatus('error');
    }
  };

  // Fallback: same details, sent over WhatsApp instead
  const waFallback = () => {
    const msg =
      `Hi WebDishaa! 👋\nName: ${form.name}\nPhone: ${form.phone}` +
      (form.business ? `\nBusiness: ${form.business}` : '') +
      (chips.length ? `\nInterested in: ${chips.join(', ')}` : '') +
      `\nMessage: ${form.message}`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <style>{styles}</style>

      {/* ── PAGE HERO ── */}
      <div className="page-hero">
        <div className="page-tag rev">Get In Touch</div>
        <h1 className="page-hero-title rev">
          Let's Build<br /><em>Together</em>
        </h1>
        <p className="page-hero-sub rev">
          Free consultation, fast response, no pressure.
          We'll help you figure out exactly what you need.
        </p>
      </div>

      <div className="s-wrap">
        <div className="s-inner">
          <div className="contact-grid">

            {/* ── LEFT: INFO ── */}
            <div className="contact-info rev">

              {/* WhatsApp CTA — top priority */}
              <a
                className="wa-cta-card"
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                <div className="wa-icon-big"><FaWhatsapp /></div>
                <div>
                  <div className="wa-cta-t">Chat on WhatsApp</div>
                  <div className="wa-cta-s">Fastest way to reach us — reply in minutes</div>
                </div>
              </a>

              {/* Contact details */}
              <div className="info-card">
                <div className="info-title">Contact Details</div>
                <a className="info-link" href={SITE.phoneHref}>
                  <div className="info-icon"><FaPhone /></div>
                  <div className="info-link-text">
                    <span className="info-link-main">{SITE.phone}</span>
                    <span className="info-link-sub">Call anytime 9am–8pm</span>
                  </div>
                </a>
                <a className="info-link" href={`mailto:${SITE.email}`}>
                  <div className="info-icon"><FaEnvelope /></div>
                  <div className="info-link-text">
                    <span className="info-link-main">{SITE.email}</span>
                    <span className="info-link-sub">We reply within 2 hours</span>
                  </div>
                </a>
                <a className="info-link" href={SITE.instagram} target="_blank" rel="noreferrer">
                  <div className="info-icon"><FaInstagram /></div>
                  <div className="info-link-text">
                    <span className="info-link-main">{SITE.instagramHandle}</span>
                    <span className="info-link-sub">Follow our work</span>
                  </div>
                </a>
                <span className="info-link">
                  <div className="info-icon"><FaMapMarkerAlt /></div>
                  <div className="info-link-text">
                    <span className="info-link-main">{SITE.location}</span>
                    <span className="info-link-sub">In-person meetings available</span>
                  </div>
                </span>
              </div>

              {/* Hours */}
              <div className="info-card">
                <div className="info-title"><FaClock style={{marginRight:6}} />Business Hours</div>
                {[
                  { day: 'Monday – Friday', time: '9:00 AM – 8:00 PM', active: true },
                  { day: 'Saturday',        time: '10:00 AM – 6:00 PM', active: true },
                  { day: 'Sunday',          time: 'WhatsApp Only', active: false },
                ].map((h) => (
                  <div className="hours-row" key={h.day}>
                    <span className="hours-day">{h.day}</span>
                    <span className={`hours-time${h.active ? ' green' : ''}`}>{h.time}</span>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="map-wrap">
                {/* Replace src with your Google Maps embed URL */}
                {/* Go to maps.google.com → share → embed → copy src */}
                <div className="map-placeholder">
                  📍 Paste your Google Maps embed URL in ContactPage.jsx
                  <br /><br />
                  <small>maps.google.com → Share → Embed a map → Copy the iframe src</small>
                </div>
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!..."
                  allowFullScreen loading="lazy"
                  title="WebDishaa Location"
                /> */}
              </div>

            </div>

            {/* ── RIGHT: FORM ── */}
            <div className="contact-form-wrap rev d2">
              {status === 'success' ? (
                <div className="form-success">
                  <FaCheckCircle className="form-success-icon" />
                  <div className="form-success-t">Message Sent!</div>
                  <p className="form-success-s">
                    Thanks {form.name}! We'll get back to you within 2 hours.
                    You can also reach us instantly on WhatsApp.
                  </p>
                  <a href={SITE.whatsapp} target="_blank" rel="noreferrer"
                    style={{ marginTop:'12px', display:'inline-flex', alignItems:'center', gap:'8px', fontSize:'13px', fontWeight:'700', letterSpacing:'.1em', textTransform:'uppercase', background:'#00c8ff', color:'#000', padding:'12px 26px', borderRadius:'100px', textDecoration:'none' }}>
                    <FaWhatsapp /> Also WhatsApp Us
                  </a>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="form-heading">Send Us a Message</div>
                  <p className="form-sub">Fill this out and we'll reply within 2 hours during business hours.</p>

                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Your Name *</label>
                      <input className="form-input" placeholder="Rahul Kumar" value={form.name} onChange={(e) => set('name', e.target.value)} />
                      {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>
                    <div className="form-field">
                      <label className="form-label">Phone Number *</label>
                      <input className="form-input" placeholder="+91 98XXX XXXXX" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                      {errors.phone && <div className="form-error">{errors.phone}</div>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Email Address</label>
                      <input className="form-input" placeholder="you@company.com" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
                      {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>
                    <div className="form-field">
                      <label className="form-label">Business Name</label>
                      <input className="form-input" placeholder="Your Business Name" value={form.business} onChange={(e) => set('business', e.target.value)} />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Services Interested In</label>
                    <div className="chip-group">
                      {SERVICES_LIST.map((s) => (
                        <button type="button" key={s} className={`chip${chips.includes(s) ? ' on' : ''}`} onClick={() => toggleChip(s)}>{s}</button>
                      ))}
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Your Budget</label>
                    <select className="form-select" value={form.budget} onChange={(e) => set('budget', e.target.value)}>
                      <option value="">Select your budget range</option>
                      <option value="Under ₹5,000">Under ₹5,000</option>
                      <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000</option>
                      <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000</option>
                      <option value="₹30,000+">₹30,000+</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Tell Us About Your Project *</label>
                    <textarea className="form-textarea" placeholder="What kind of website do you need? What does your business do? Any specific requirements..." value={form.message} onChange={(e) => set('message', e.target.value)} />
                    {errors.message && <div className="form-error">{errors.message}</div>}
                  </div>

                  {/* Spam trap: hidden from people, bots fill it in */}
                  <input
                    type="text" name="_honey" value={honey} onChange={(e) => setHoney(e.target.value)}
                    tabIndex={-1} autoComplete="off" aria-hidden="true"
                    style={{ position:'absolute', left:'-9999px', opacity:0, height:0, width:0 }}
                  />

                  {status === 'error' && (
                    <div style={{ fontSize:'13px', color:'#ff8a8a', marginBottom:'14px', textAlign:'center', lineHeight:1.6 }}>
                      We couldn't send that just now. Your details are safe —{' '}
                      <a href={waFallback()} target="_blank" rel="noreferrer" style={{ color:'#00c8ff', fontWeight:600 }}>
                        send the same message on WhatsApp
                      </a>{' '}or try again.
                    </div>
                  )}

                  <button className="form-submit" type="submit" disabled={status === 'loading'}>
                    {status === 'loading'
                      ? <><FaSpinner className="spin" /> Sending...</>
                      : <>Send Message →</>
                    }
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}