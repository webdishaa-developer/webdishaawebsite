// components/Chatbot.jsx — WebDishaa guided assistant
//
// • Explains every pack & service from data/plans.js — NEVER shows prices
// • Answers typed questions (English + Hinglish keywords) and tap-to-choose options
// • Collects a lead (name, phone, email, business, interest, note)
//   and emails it to webdishaa@gmail.com via Web3Forms (utils/web3forms.js)
// • If email fails → WhatsApp link with the same details
//
// Mount once in App.jsx Layout:   <Chatbot />

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, ArrowUpRight } from 'lucide-react';
import { WEBSITE_PLANS, EXTRA_SERVICES, SOCIAL_1M, SOCIAL_3M } from '../data/plans';
import { WA_NUMBER } from '../utils/whatsapp';
import { sendToWeb3Forms } from '../utils/web3forms';

/* ───────────────────────── content helpers (no prices) ───────────────────────── */
const T = (text) => ({ kind: 'text', text });
const C = (cards) => ({ kind: 'cards', cards });
const L = (label, href) => ({ kind: 'link', label, href });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const websiteCards = () => WEBSITE_PLANS.map((p) => ({
  name: p.name, tag: p.hot ? 'Popular' : null,
  meta: `${p.delivery} · ${p.tagline}`,
  points: p.features.slice(0, 4),
  more: Math.max(0, p.features.length - 4),
  enquire: p.name,
}));

const socialCards = (list) => list.map((p) => ({
  name: p.name, tag: p.hot ? 'Most Popular' : null,
  meta: `${p.content} content pieces · ${p.reels} reels · ${p.posts} posts`,
  points: p.months ? p.months.map(([m, d]) => `${m}: ${d}`) : [],
  note: `Best for: ${p.best}`,
  enquire: `${p.name} (Social Media)`,
}));

const serviceCards = (from, to) => EXTRA_SERVICES.slice(from, to).map((s) => ({
  name: s.name, meta: s.desc, enquire: s.name,
}));

const MENU_CHIPS = [
  { label: '🌐 Websites & Web Apps', id: 'websites' },
  { label: '📱 Social Media Packs', id: 'social' },
  { label: '🎨 Logo & Branding',    id: 'branding' },
  { label: '📍 Google & SEO',       id: 'google' },
  { label: '🧭 Help me choose',     id: 'recommend' },
  { label: '💰 Pricing',            id: 'price' },
  { label: '💬 Talk to our team',   id: 'human' },
];
const BACK = { label: '↩ Main menu', id: 'menu' };
const ENQUIRE_CHIP = { label: '✅ Enquire now', id: 'lead' };

const INTEREST_CHIPS = [
  'Website', 'E-commerce Store', 'Custom Web App', 'Social Media Packs',
  'Logo & Branding', 'Google & SEO', 'Not sure yet',
].map((label) => ({ label, id: 'interest', arg: label }));

const RECOMMEND_CHIPS = [
  { label: 'Get my business online', id: 'rec', arg: 'online' },
  { label: 'Sell products online',   id: 'rec', arg: 'sell' },
  { label: 'Build a custom app',     id: 'rec', arg: 'app' },
  { label: 'Look more professional', id: 'rec', arg: 'pro' },
  { label: 'Grow on Instagram',      id: 'rec', arg: 'social' },
  { label: 'Get found on Google',    id: 'rec', arg: 'maps' },
  { label: 'New logo / brand',       id: 'rec', arg: 'brand' },
];

/* typed-question understanding — order matters */
const INTENTS = [
  { id: 'price',     re: /(\b(price|prices|pricing|cost|costs|rate|rates|charge|charges|fee|fees|quote|quotation|budget|how much|kitna|kitne|kitni|lagega|kharcha|kharch|daam|kimat|paisa|paise|rupees?|rs)\b|₹)/i },
  { id: 'lead',      re: /\b(enquir\w*|inquir\w*|get started|sign ?up|interested|call me|contact me|callback)\b/i },
  { id: 'human',     re: /\b(human|real person|person|agent|team|talk to|speak to|call|whatsapp|executive)\b/i },
  { id: 'recommend', re: /\b(suit|suits|recommend|suggest|which|help me (choose|pick)|not sure|confused|best for me|where do i start)\b/i },
  { id: 'greet',     re: /^\s*(hi+|hello+|hey+|hola|namaste|namaskar|good (morning|afternoon|evening)|yo)[\s!.,]*$/i },
  { id: 'thanks',    re: /^\s*(thanks?|thank you|thx|shukriya|dhanyavaad|ok(ay)?|great|cool|nice|got it)[\s!.,]*$/i },
  { id: 'social',    re: /\b(social|insta(gram)?|facebook|reels?|posts?|content|youtube|followers)\b/i },
  { id: 'branding',  re: /\b(logo|logos|brand|branding|business cards?|visiting card|poster|banner|identity)\b/i },
  { id: 'google',    re: /\b(google|gmb|maps?|seo|rank(ing)?|search)\b/i },
  { id: 'websites',  re: /\b(web ?sites?|web ?pages?|web ?apps?|e-?commerce|online store|store|shop|landing|portal|dashboard|application|app|pages?)\b/i },
];

// when someone types "I'm interested in a logo", pre-fill the lead form
const CAT_LABEL = { social: 'Social Media Packs', branding: 'Logo & Branding', google: 'Google & SEO', websites: 'Website' };

const isSkip = (t) => /^(skip|no|none|nope|nahi|na|-|n\/a)$/i.test(t.trim());
const validPhone = (t) => { const d = t.replace(/\D/g, ''); return d.length >= 10 && d.length <= 13; };
const validEmail = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.trim());

/* ───────────────────────── styles ───────────────────────── */
const styles = `
.wb-fab {
  position:fixed; right:22px; bottom:92px; z-index:9996; width:58px; height:58px; border-radius:50%;
  display:grid; place-items:center; cursor:pointer; border:0; color:#001018;
  background:linear-gradient(135deg,#00c8ff,#1d6ff2);
  box-shadow:0 8px 30px rgba(0,200,255,.45), 0 0 0 1px rgba(255,255,255,.18) inset;
  transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
}
.wb-fab:hover { transform:scale(1.08); box-shadow:0 10px 40px rgba(0,200,255,.6); }
.wb-fab::before { content:''; position:absolute; inset:-5px; border-radius:50%; border:2px solid rgba(0,200,255,.35); animation:wbPulse 2.4s ease-out infinite; }
@keyframes wbPulse { 0% { transform:scale(1); opacity:.9 } 100% { transform:scale(1.5); opacity:0 } }
.wb-dot { position:absolute; top:3px; right:3px; width:13px; height:13px; border-radius:50%; background:#ff4d6d; border:2px solid #03080f; }

.wb-tip {
  position:fixed; right:92px; bottom:104px; z-index:9996; max-width:230px; padding:11px 30px 11px 14px; border-radius:14px 14px 4px 14px;
  font-family:'Barlow',sans-serif; font-size:13px; line-height:1.45; color:#eef4ff; cursor:pointer;
  background:rgba(6,13,26,.96); border:1px solid rgba(0,200,255,.3); box-shadow:0 10px 30px rgba(0,0,0,.5);
  animation:wbIn .4s cubic-bezier(.2,.8,.2,1);
}
.wb-tip button { position:absolute; top:5px; right:7px; background:none; border:0; color:rgba(255,255,255,.45); font-size:16px; cursor:pointer; line-height:1; }

.wb-win {
  position:fixed; right:22px; bottom:92px; z-index:10000; width:392px; height:min(640px, calc(100dvh - 120px));
  display:flex; flex-direction:column; overflow:hidden; border-radius:22px;
  font-family:'Barlow',sans-serif; color:#eef4ff;
  background:linear-gradient(165deg,#081224 0%,#040a14 100%);
  border:1px solid rgba(0,200,255,.22); box-shadow:0 30px 80px rgba(0,0,0,.65), 0 0 60px rgba(0,200,255,.08);
  animation:wbIn .35s cubic-bezier(.2,.8,.2,1);
}
@keyframes wbIn { from { opacity:0; transform:translateY(16px) scale(.97) } to { opacity:1; transform:none } }

.wb-head { display:flex; align-items:center; gap:12px; padding:14px 16px; border-bottom:1px solid rgba(255,255,255,.07); background:linear-gradient(180deg,rgba(0,200,255,.07),transparent); }
.wb-av { width:40px; height:40px; border-radius:12px; display:grid; place-items:center; font-family:'Bebas Neue',sans-serif; font-size:16px; color:#001018; background:linear-gradient(135deg,#1d6ff2,#00c8ff); box-shadow:0 0 18px rgba(0,200,255,.35); flex-shrink:0; }
.wb-ht { flex:1; min-width:0; }
.wb-ht b { display:block; font-size:14.5px; font-weight:700; letter-spacing:.01em; }
.wb-ht span { display:flex; align-items:center; gap:6px; font-size:11.5px; color:rgba(238,244,255,.5); margin-top:2px; }
.wb-ht span i { width:7px; height:7px; border-radius:50%; background:#00e887; box-shadow:0 0 8px #00e887; }
.wb-x { width:34px; height:34px; border-radius:10px; display:grid; place-items:center; cursor:pointer; color:rgba(238,244,255,.6); background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08); transition:all .2s; }
.wb-x:hover { color:#00c8ff; border-color:rgba(0,200,255,.4); }

.wb-body { flex:1; overflow-y:auto; overscroll-behavior:contain; padding:16px 14px 8px; display:flex; flex-direction:column; gap:10px; scrollbar-width:thin; scrollbar-color:rgba(255,255,255,.15) transparent; }
.wb-msg { max-width:86%; padding:10px 14px; font-size:13.5px; line-height:1.55; white-space:pre-line; word-wrap:break-word; animation:wbIn .3s ease; }
.wb-msg.bot { align-self:flex-start; border-radius:16px 16px 16px 4px; background:rgba(255,255,255,.055); border:1px solid rgba(255,255,255,.08); color:rgba(238,244,255,.92); }
.wb-msg.user { align-self:flex-end; border-radius:16px 16px 4px 16px; color:#00131a; font-weight:500; background:linear-gradient(135deg,#00c8ff,#38b6ff); box-shadow:0 4px 16px rgba(0,200,255,.22); }

.wb-typing { align-self:flex-start; display:flex; gap:5px; padding:13px 15px; border-radius:16px 16px 16px 4px; background:rgba(255,255,255,.055); border:1px solid rgba(255,255,255,.08); }
.wb-typing i { width:6px; height:6px; border-radius:50%; background:#00c8ff; opacity:.5; animation:wbDots 1.2s infinite ease-in-out; }
.wb-typing i:nth-child(2) { animation-delay:.15s } .wb-typing i:nth-child(3) { animation-delay:.3s }
@keyframes wbDots { 0%,60%,100% { transform:translateY(0); opacity:.4 } 30% { transform:translateY(-5px); opacity:1 } }

.wb-cards { display:flex; flex-direction:column; gap:8px; width:100%; animation:wbIn .3s ease; }
.wb-card { padding:12px 14px; border-radius:14px; background:linear-gradient(160deg,rgba(0,200,255,.06),rgba(255,255,255,.02)); border:1px solid rgba(0,200,255,.16); }
.wb-card-h { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:3px; }
.wb-card-h b { font-family:'Bebas Neue',sans-serif; font-weight:400; font-size:19px; letter-spacing:.04em; }
.wb-tag { font-size:9px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#00c8ff; padding:3px 8px; border-radius:100px; border:1px solid rgba(0,200,255,.35); background:rgba(0,200,255,.08); white-space:nowrap; }
.wb-card-m { font-size:12px; color:rgba(238,244,255,.6); line-height:1.5; }
.wb-card ul { list-style:none; margin:8px 0 0; padding:0; display:flex; flex-direction:column; gap:4px; }
.wb-card li { font-size:12px; color:rgba(238,244,255,.8); padding-left:16px; position:relative; }
.wb-card li::before { content:'✓'; position:absolute; left:0; color:#00c8ff; font-size:10px; top:1px; }
.wb-card-n { margin-top:8px; font-size:11.5px; color:rgba(238,244,255,.55); }
.wb-card-btn { margin-top:10px; font-family:inherit; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#00c8ff; background:none; border:1px solid rgba(0,200,255,.35); border-radius:100px; padding:6px 14px; cursor:pointer; transition:all .2s; }
.wb-card-btn:hover:not(:disabled) { background:rgba(0,200,255,.12); border-color:#00c8ff; }
.wb-card-btn:disabled { opacity:.5; cursor:not-allowed; }

.wb-link { align-self:flex-start; display:inline-flex; align-items:center; gap:7px; padding:10px 16px; border-radius:100px; font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; text-decoration:none; color:#fff; background:#16a34a; box-shadow:0 4px 18px rgba(22,163,74,.35); animation:wbIn .3s ease; }
.wb-link:hover { filter:brightness(1.1); }

.wb-chips { display:flex; flex-wrap:wrap; gap:7px; padding:4px 0 6px; animation:wbIn .3s ease; }
.wb-chip { font-family:inherit; font-size:12.5px; font-weight:500; color:#cfeefa; background:rgba(0,200,255,.07); border:1px solid rgba(0,200,255,.28); border-radius:100px; padding:8px 14px; cursor:pointer; transition:all .2s; }
.wb-chip:hover { background:rgba(0,200,255,.18); border-color:#00c8ff; color:#fff; transform:translateY(-1px); }

.wb-input { display:flex; gap:8px; padding:10px 12px 8px; border-top:1px solid rgba(255,255,255,.07); background:rgba(0,0,0,.2); }
.wb-input input { flex:1; min-width:0; font-family:inherit; font-size:16px; color:#eef4ff; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); border-radius:100px; padding:11px 16px; outline:none; transition:border-color .2s; }
.wb-input input::placeholder { color:rgba(238,244,255,.35); }
.wb-input input:focus { border-color:rgba(0,200,255,.5); }
.wb-input input:disabled { opacity:.55; }
.wb-input button { width:44px; height:44px; flex-shrink:0; border-radius:50%; border:0; cursor:pointer; display:grid; place-items:center; color:#001018; background:linear-gradient(135deg,#00c8ff,#1d9bff); transition:transform .2s, opacity .2s; }
.wb-input button:hover:not(:disabled) { transform:scale(1.08); }
.wb-input button:disabled { opacity:.4; cursor:not-allowed; }
.wb-foot { padding:0 14px 10px; text-align:center; font-size:10.5px; color:rgba(238,244,255,.32); background:rgba(0,0,0,.2); }

@media (max-width:560px) {
  .wb-win { inset:0; right:0; bottom:0; width:100%; height:100dvh; border-radius:0; border:0; }
  .wb-fab { right:16px; bottom:86px; }
  .wb-tip { right:84px; bottom:98px; }
  .wb-input input { font-size:16px; }
}
@media (prefers-reduced-motion:reduce) { .wb-fab::before, .wb-typing i { animation:none } .wb-win, .wb-msg, .wb-cards, .wb-chips { animation:none } }
`;

/* ───────────────────────── component ───────────────────────── */
export default function Chatbot({ typingMs }) {
  const [open, setOpen]         = useState(false);
  const [msgs, setMsgs]         = useState([]);
  const [chips, setChips]       = useState([]);
  const [typing, setTyping]     = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [input, setInput]       = useState('');
  const [step, setStep]         = useState(null);   // current lead step (for the placeholder)
  const [unread, setUnread]     = useState(true);
  const [tip, setTip]           = useState(false);

  const leadRef   = useRef(null);          // { step, data }
  const viewed    = useRef(new Set());     // topics the visitor looked at
  const sentCount = useRef(0);
  const chain     = useRef(Promise.resolve());
  const pending   = useRef(0);
  const alive     = useRef(true);
  const idRef     = useRef(0);
  const started   = useRef(false);
  const bodyRef   = useRef(null);
  const inputRef  = useRef(null);
  const tms       = useRef(typingMs);
  tms.current = typingMs;

  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);

  const push = (m) => setMsgs((a) => [...a, { id: ++idRef.current, ...m }]);

  /* bot "speaks": blocks appear one by one with a typing indicator, then chips show */
  const say = (blocks, nextChips = []) => {
    pending.current += 1; setSpeaking(true); setChips([]);
    chain.current = chain.current
      .then(async () => {
        for (const b of [].concat(blocks)) {
          if (!alive.current) return;
          const ms = tms.current ?? (b.kind === 'cards' ? 650 : Math.min(950, 360 + (b.text || '').length * 8));
          setTyping(true); await sleep(ms); setTyping(false);
          push(b);
        }
      })
      .catch(() => {})
      .then(() => {
        pending.current -= 1;
        if (alive.current && pending.current === 0) { setSpeaking(false); setChips(nextChips); }
      });
  };

  /* ───── flows ───── */
  const greet = () => say([
    T("Hi! 👋 I'm the WebDishaa assistant.\nI can walk you through our websites, social media packs, branding and Google services — and pass your details to our team."),
    T('What would you like to explore?'),
  ], MENU_CHIPS);

  const askStep = (st, d) => {
    leadRef.current = { step: st, data: d }; setStep(st);
    if (st === 'interest') return say([T('Great! What are you interested in?')], INTEREST_CHIPS);
    if (st === 'name')     return say([T("Let's get your quote request to our team.\nFirst, what's your name?")], [{ label: 'Cancel', id: 'cancel' }]);
    if (st === 'phone')    return say([T(`Nice to meet you, ${d.name}! 🙌\nWhat's the best phone / WhatsApp number to reach you?`)], [{ label: 'Cancel', id: 'cancel' }]);
    if (st === 'email')    return say([T('Your email address? (optional)')], [{ label: 'Skip', id: 'skip' }, { label: 'Cancel', id: 'cancel' }]);
    if (st === 'business') return say([T("What's your business name? (optional)")], [{ label: 'Skip', id: 'skip' }, { label: 'Cancel', id: 'cancel' }]);
    if (st === 'note')     return say([T('Anything else we should know — your goals, timeline, ideas? (optional)')], [{ label: 'Skip', id: 'skip' }, { label: 'Cancel', id: 'cancel' }]);
    if (st === 'confirm') {
      const v = (x) => x || '—';
      return say([T(
        `Please confirm your details:\n• Name: ${d.name}\n• Phone: ${d.phone}\n• Email: ${v(d.email)}\n• Business: ${v(d.business)}\n• Interested in: ${v(d.interest)}\n• Note: ${v(d.note)}`
      )], [{ label: '✅ Send to team', id: 'send' }, { label: '✏️ Edit', id: 'edit' }, { label: 'Cancel', id: 'cancel' }]);
    }
    return undefined;
  };

  const startLead = (interest) => {
    const data = { interest: interest || '' };
    if (interest) {
      say([T(`${interest} — great choice! ✨`)]);
      askStep('name', data);
    } else {
      askStep('interest', data);
    }
  };

  const cancelLead = () => {
    leadRef.current = null; setStep(null);
    say([T('No problem — nothing was sent. Anything else I can help with?')], MENU_CHIPS);
  };

  const waDetails = (d) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi WebDishaa! 👋\nName: ${d.name}\nPhone: ${d.phone}` +
    (d.business ? `\nBusiness: ${d.business}` : '') +
    (d.interest ? `\nInterested in: ${d.interest}` : '') +
    (d.note ? `\nNote: ${d.note}` : '')
  )}`;

  const doSend = async () => {
    const d = leadRef.current && leadRef.current.data;
    if (!d) return;
    if (sentCount.current >= 3) {
      leadRef.current = null; setStep(null);
      say([T('We already have your details — our team will be in touch shortly. For anything urgent, WhatsApp us directly.'), L('Chat on WhatsApp', `https://wa.me/${WA_NUMBER}`)], [BACK]);
      return;
    }
    say([T('Sending your details to our team… ⏳')]);
    try {
      await sendToWeb3Forms({
        subject:   `New chatbot lead from ${d.name} — WebDishaa website`,
        from_name: 'WebDishaa Chatbot',
        source:    'Website chatbot',
        name:      d.name,
        phone:     d.phone,
        interested_in: d.interest || 'Not specified',
        business:  d.business || 'Not provided',
        topics_viewed: [...viewed.current].join(', ') || 'None',
        message:   d.note || 'No additional note',
        ...(d.email ? { email: d.email } : {}),
      });
      sentCount.current += 1;
      leadRef.current = null; setStep(null);
      say([T(`Thank you, ${d.name}! ✅\nYour details are with our team. We'll contact you on ${d.phone} within 2 hours during business hours (9am–8pm) with a custom quote.`)],
        [{ label: 'Explore more', id: 'menu' }, { label: '💬 Chat on WhatsApp', id: 'human' }]);
    } catch (err) {
      console.error('Chatbot lead could not be emailed:', err.message);
      say([
        T("Sorry — I couldn't send that just now. Your details are safe, tap below to send the same message on WhatsApp instead."),
        L('Send on WhatsApp', waDetails(d)),
      ], [{ label: 'Try again', id: 'retry' }, BACK]);
    }
  };

  /* lead-flow typed answers */
  const handleLeadInput = (text) => {
    const lead = leadRef.current; const t = text.trim();
    if (/^(cancel|stop|menu|exit)$/i.test(t)) return cancelLead();
    const d = { ...lead.data };
    switch (lead.step) {
      case 'interest': d.interest = t; return askStep('name', d);
      case 'name':
        if (t.length < 2 || t.length > 60) { say([T('Please enter your name (at least 2 letters).')], [{ label: 'Cancel', id: 'cancel' }]); return undefined; }
        d.name = t; return askStep('phone', d);
      case 'phone':
        if (!validPhone(t)) { say([T("Hmm, that doesn't look like a valid number. Please enter a 10-digit mobile number.")], [{ label: 'Cancel', id: 'cancel' }]); return undefined; }
        d.phone = t; return askStep('email', d);
      case 'email':
        if (isSkip(t)) { d.email = ''; return askStep('business', d); }
        if (!validEmail(t)) { say([T("That email doesn't look right — try again, or tap Skip.")], [{ label: 'Skip', id: 'skip' }, { label: 'Cancel', id: 'cancel' }]); return undefined; }
        d.email = t; return askStep('business', d);
      case 'business': d.business = isSkip(t) ? '' : t; return askStep('note', d);
      case 'note':     d.note = isSkip(t) ? '' : t.slice(0, 600); return askStep('confirm', d);
      case 'confirm':
        if (/^(yes|y|send|confirm|ok|okay|haan|ha|submit)\b/i.test(t)) return doSend();
        if (/^(edit|change|no|redo)\b/i.test(t)) return askStep('name', { interest: d.interest });
        say([T('Tap “Send to team” to confirm, or “Edit” to change something.')], [{ label: '✅ Send to team', id: 'send' }, { label: '✏️ Edit', id: 'edit' }, { label: 'Cancel', id: 'cancel' }]);
        return undefined;
      default: return undefined;
    }
  };

  /* main router for every action id */
  const run = (id, arg) => {
    switch (id) {
      case 'menu':      return say([T('Sure! What would you like to explore?')], MENU_CHIPS);
      case 'websites':
        viewed.current.add('Websites & Web Apps');
        return say([
          T('Here are our website & web-app packages 👇'),
          C(websiteCards()),
          T('We also offer add-ons like extra pages and blog setup. Want help picking the right one?'),
        ], [{ label: '🧭 Which suits me?', id: 'recommend' }, ENQUIRE_CHIP, { label: '💰 Pricing', id: 'price' }, BACK]);
      case 'social':
        viewed.current.add('Social Media Packs');
        return say([
          T('We create reels and posts for your brand every month — fully designed, planned and managed.\nChoose a plan length:'),
        ], [{ label: '1 Month plans', id: 'social1' }, { label: '3 Month plans', id: 'social3' }, { label: '🧭 Which suits me?', id: 'recommend' }, BACK]);
      case 'social1':
        return say([T('1-month plans — great for trying us out:'), C(socialCards(SOCIAL_1M))],
          [{ label: '3 Month plans', id: 'social3' }, ENQUIRE_CHIP, { label: '💰 Pricing', id: 'price' }, BACK]);
      case 'social3':
        return say([T('3-month plans — consistency builds brands:'), C(socialCards(SOCIAL_3M))],
          [{ label: '1 Month plans', id: 'social1' }, ENQUIRE_CHIP, { label: '💰 Pricing', id: 'price' }, BACK]);
      case 'branding':
        viewed.current.add('Logo & Branding');
        return say([T('Branding & design services 🎨'), C(serviceCards(0, 4))],
          [ENQUIRE_CHIP, { label: '📍 Google & SEO', id: 'google' }, BACK]);
      case 'google':
        viewed.current.add('Google & SEO');
        return say([T('Get found by local customers 📍'), C(serviceCards(4, 7)),
          T('Plus add-ons: extra website pages and blog setup.')],
          [ENQUIRE_CHIP, { label: '🌐 Websites', id: 'websites' }, BACK]);
      case 'price':
        viewed.current.add('Pricing question');
        return say([T("Every business is different, so we don't list fixed prices here — we send a clear custom quote after understanding what you need.\n\nShare a few details and our team will get back to you within 2 hours on WhatsApp or email. Shall I take your details?")],
          [{ label: '✅ Yes, get my quote', id: 'lead' }, { label: 'Keep exploring', id: 'menu' }]);
      case 'recommend':
        return say([T("Let's find your best fit. What's your main goal right now?")], RECOMMEND_CHIPS);
      case 'rec': return recommend(arg);
      case 'human':
        return say([
          T('Of course! You can chat with our team directly on WhatsApp — they usually reply within minutes.'),
          L('Chat on WhatsApp', `https://wa.me/${WA_NUMBER}`),
          T('Or leave your details and we will call you back.'),
        ], [{ label: '📝 Leave my details', id: 'lead' }, BACK]);
      case 'lead':      return startLead(arg || '');
      case 'interest':  return handleLeadInput(arg);
      case 'skip':      return handleLeadInput('skip');
      case 'cancel':    return cancelLead();
      case 'edit':      return askStep('name', { interest: leadRef.current ? leadRef.current.data.interest : '' });
      case 'send':      return doSend();
      case 'retry':     return doSend();
      case 'thanks':    return say([T("You're welcome! 😊 Anything else you'd like to know?")], MENU_CHIPS);
      case 'greet':     return greet();
      default:          return undefined;
    }
  };

  const recommend = (goal) => {
    const R = {
      online: { text: 'To get your business online quickly, the Starter Website (single page, ideal for freelancers & small shops) or the Business Website (up to 5 pages with a gallery — our most popular) are your best fits.', topic: 'Website', more: 'websites' },
      sell:   { text: 'To sell online, you want the E-Commerce Website — online store, product pages, shopping cart and an order-management panel. Delivered in 10–14 days.', topic: 'E-commerce Store', more: 'websites' },
      app:    { text: 'For your own idea, the Custom Web App is built from scratch — no templates. It includes user login, an admin dashboard, custom business logic and API/database integration. 7–14 days.', topic: 'Custom Web App', more: 'websites' },
      pro:    { text: 'To look established and rank better, the Professional Website gives you 6–8 pages, modern UI, a blog section, speed + SEO optimization and Google Analytics.', topic: 'Website', more: 'websites' },
      social: { text: 'For Instagram & Facebook: Starter Pack suits startups, Value Pack (most popular) boosts visibility and engagement, Premium Pack builds a stronger brand image. For long-term consistency, the 3-Month Growth Pack — or the Elite Branding Pack if you want model-based promotions.', topic: 'Social Media Packs', more: 'social' },
      maps:   { text: 'To be found on Google: Google Business Profile gets you verified on Maps, Google Map Optimization helps you rank above competitors, and Basic SEO Setup improves your website ranking.', topic: 'Google & SEO', more: 'google' },
      brand:  { text: 'For a fresh identity: Basic or Professional Logo Design, plus Business Card and Banner / Poster designs to match.', topic: 'Logo & Branding', more: 'branding' },
    }[goal];
    if (!R) return undefined;
    viewed.current.add(`Recommended: ${R.topic}`);
    return say([T(R.text)], [
      { label: '✅ Enquire now', id: 'lead', arg: R.topic },
      { label: 'See all options', id: R.more },
      { label: '↩ Main menu', id: 'menu' },
    ]);
  };

  const route = (text) => {
    const hit = INTENTS.find((it) => it.re.test(text));
    if (hit && hit.id === 'lead') {
      const cat = INTENTS.find((it) => CAT_LABEL[it.id] && it.re.test(text));
      return run('lead', cat ? CAT_LABEL[cat.id] : '');
    }
    if (hit) return run(hit.id);
    return say([T("I'm not sure I got that, but I can help with websites, social media, branding and Google services. Pick an option or ask in your own words 👇")], MENU_CHIPS);
  };

  /* ───── UI handlers ───── */
  const onChip = (c) => { push({ kind: 'user', text: c.label.replace(/^[^\w✅]+\s*/, '') || c.label }); run(c.id, c.arg); };
  const onCardEnquire = (name) => { if (speaking) return; push({ kind: 'user', text: `Enquire: ${name}` }); startLead(name); };
  const onSubmit = (e) => {
    e.preventDefault();
    const t = input.trim();
    if (!t || speaking) return;
    setInput(''); push({ kind: 'user', text: t });
    if (leadRef.current) handleLeadInput(t); else route(t);
  };

  const openChat = () => {
    setOpen(true); setUnread(false); setTip(false);
    if (!started.current) { started.current = true; greet(); }
    setTimeout(() => inputRef.current && inputRef.current.focus(), 80);
  };
  const closeChat = () => setOpen(false);

  /* tooltip nudge once per session */
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('wd_chat_tip') === '1'; } catch (e) { /* ignore */ }
    if (seen) return undefined;
    const t = setTimeout(() => { setTip(true); try { sessionStorage.setItem('wd_chat_tip', '1'); } catch (e) { /* ignore */ } }, 9000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { if (!tip) return undefined; const t = setTimeout(() => setTip(false), 12000); return () => clearTimeout(t); }, [tip]);

  /* Esc closes */
  useEffect(() => {
    if (!open) return undefined;
    const fn = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open]);

  /* keep the newest message in view */
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing, chips, open]);

  const placeholder = speaking ? 'One moment…' : ({
    name: 'Type your name…', phone: 'Your phone / WhatsApp number…', email: 'Your email, or tap Skip…',
    business: 'Business name, or tap Skip…', note: 'Your note, or tap Skip…', interest: 'Tell me what you need…', confirm: 'Type “send” to confirm…',
  }[step] || 'Ask about our packs & services…');

  return (
    <>
      <style>{styles}</style>

      {!open && tip && (
        <div className="wb-tip" role="button" tabIndex={0} onClick={openChat}
             onKeyDown={(e) => { if (e.key === 'Enter') openChat(); }}>
          Need help choosing a plan? 👋
          <button aria-label="Dismiss" onClick={(e) => { e.stopPropagation(); setTip(false); }}>×</button>
        </div>
      )}

      {!open && (
        <button className="wb-fab" onClick={openChat} aria-label="Chat with the WebDishaa assistant">
          <MessageCircle size={26} strokeWidth={2.2} />
          {unread && <span className="wb-dot" />}
        </button>
      )}

      {open && (
        <section className="wb-win" role="dialog" aria-label="WebDishaa assistant">
          <header className="wb-head">
            <div className="wb-av">WD</div>
            <div className="wb-ht">
              <b>WebDishaa Assistant</b>
              <span><i /> Online · replies instantly</span>
            </div>
            <button className="wb-x" onClick={closeChat} aria-label="Close chat"><X size={17} /></button>
          </header>

          <div className="wb-body" ref={bodyRef} aria-live="polite">
            {msgs.map((m) => {
              if (m.kind === 'user') return <div key={m.id} className="wb-msg user">{m.text}</div>;
              if (m.kind === 'link') return (
                <a key={m.id} className="wb-link" href={m.href} target="_blank" rel="noreferrer">{m.label} <ArrowUpRight size={14} /></a>
              );
              if (m.kind === 'cards') return (
                <div key={m.id} className="wb-cards">
                  {m.cards.map((c) => (
                    <div className="wb-card" key={c.name}>
                      <div className="wb-card-h"><b>{c.name}</b>{c.tag && <span className="wb-tag">{c.tag}</span>}</div>
                      <div className="wb-card-m">{c.meta}</div>
                      {c.points && c.points.length > 0 && (
                        <ul>{c.points.map((p) => <li key={p}>{p}</li>)}{c.more > 0 && <li>+ {c.more} more features</li>}</ul>
                      )}
                      {c.note && <div className="wb-card-n">{c.note}</div>}
                      <button className="wb-card-btn" disabled={speaking} onClick={() => onCardEnquire(c.enquire)}>Enquire →</button>
                    </div>
                  ))}
                </div>
              );
              return <div key={m.id} className="wb-msg bot">{m.text}</div>;
            })}

            {typing && <div className="wb-typing" aria-label="Assistant is typing"><i /><i /><i /></div>}

            {!speaking && chips.length > 0 && (
              <div className="wb-chips">
                {chips.map((c) => (
                  <button key={c.label} className="wb-chip" onClick={() => onChip(c)}>{c.label}</button>
                ))}
              </div>
            )}
          </div>

          <form className="wb-input" onSubmit={onSubmit}>
            <input
              ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder} disabled={speaking} aria-label="Type your message" maxLength={600}
            />
            <button type="submit" disabled={speaking || !input.trim()} aria-label="Send"><Send size={18} /></button>
          </form>
          <div className="wb-foot"><Sparkles size={10} style={{ verticalAlign: '-1px' }} /> Automated assistant · custom quotes shared by our team</div>
        </section>
      )}
    </>
  );
}