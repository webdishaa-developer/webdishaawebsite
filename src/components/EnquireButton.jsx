// components/EnquireButton.jsx
// Replaces every price. Opens WhatsApp with a ready message.
import { MessageCircle } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

const css = `
.enq-btn {
  display:flex; align-items:center; justify-content:center; gap:8px;
  width:100%; padding:12px 18px; border-radius:100px;
  font-family:'Barlow',sans-serif; font-size:12px; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase; text-decoration:none;
  cursor:pointer; transition:all .25s; border:1px solid transparent;
}
.enq-btn svg { flex-shrink:0; }
.enq-ghost { color:#9fb0c6; border-color:rgba(255,255,255,.12); background:transparent; }
.enq-ghost:hover { color:#00c8ff; border-color:rgba(0,200,255,.45); background:rgba(0,200,255,.06); }
.enq-solid { color:#000; background:#00c8ff; box-shadow:0 0 24px rgba(0,200,255,.28); }
.enq-solid:hover { box-shadow:0 0 44px rgba(0,200,255,.55); transform:translateY(-2px); }
`;

// Render once per section so the CSS is always present
export function EnquireStyles() { return <style>{css}</style>; }

export default function EnquireButton({ plan, variant = 'ghost', label = 'Enquire Now' }) {
  return (
    <a
      className={`enq-btn enq-${variant}`}
      href={waLink(plan)}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={15} strokeWidth={2} /> {label}
    </a>
  );
}