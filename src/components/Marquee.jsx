import { MARQUEE_ITEMS } from '../data';

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[0, 1].map((g) => (
          <div key={g} className="marquee-group">
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} className="marquee-item">
                <span className="marquee-dot">✦</span>{item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
