import { SITE } from '../data';

const styles = `
.wa-float {
  position: fixed; bottom: 20px; right: 20px; z-index: 9000;
  width: 54px; height: 54px; border-radius: 50%;
  background: #25d366;
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; font-size: 26px;
  box-shadow: 0 4px 20px rgba(37,211,102,.4);
  transition: transform .25s, box-shadow .25s;
}
.wa-float:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 32px rgba(37,211,102,.6);
}
.wa-pulse {
  position: absolute; inset: -4px; border-radius: 50%;
  border: 2px solid rgba(37,211,102,.5);
  animation: waPulse 2s ease-out infinite;
}
@keyframes waPulse {
  0%   { transform: scale(1);    opacity: .8; }
  100% { transform: scale(1.65); opacity: 0;  }
}
.wa-tooltip {
  position: absolute; right: 64px; top: 50%; transform: translateY(-50%);
  background: #25d366; color: #000;
  font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 600;
  padding: 6px 12px; border-radius: 100px; white-space: nowrap;
  opacity: 0; pointer-events: none;
  transition: opacity .2s, transform .2s;
  transform: translateY(-50%) translateX(6px);
}
.wa-float:hover .wa-tooltip {
  opacity: 1; transform: translateY(-50%) translateX(0);
}
@media (max-width:768px) {
  .wa-float { bottom: 16px; right: 16px; width: 50px; height: 50px; font-size: 24px; }
  .wa-tooltip { display: none; }
}
`;

export default function WhatsAppButton() {
  return (
    <>
      <style>{styles}</style>
      <a
        className="wa-float"
        href={SITE.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <div className="wa-pulse" />
        <span className="wa-tooltip">Chat with us!</span>
        💬
      </a>
    </>
  );
}
