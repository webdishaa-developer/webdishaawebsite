import { useEffect, useRef } from 'react';

const styles = `
html.has-custom-cursor, html.has-custom-cursor * { cursor: none !important; }
html.has-custom-cursor input,
html.has-custom-cursor textarea { cursor: text !important; }
html.has-custom-cursor select { cursor: pointer !important; }

.wd-cursor {
  --r: 42px; --w: 22px;
  position: fixed; inset: 0; pointer-events: none;
  z-index: 2147483000; transition: opacity .3s;
}
.wd-cursor.wd-hide, .wd-cursor.wd-text { opacity: 0; }

.wd-canvas { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; }

/* soft light that follows the cursor */
.wd-glow {
  position: fixed; top: 0; left: 0; pointer-events: none; will-change: transform;
}
.wd-glow span {
  display: block; width: 460px; height: 460px; margin: -230px 0 0 -230px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,200,255,.10) 0%, rgba(29,111,242,.05) 40%, transparent 70%);
  transition: transform .5s cubic-bezier(.22,1,.36,1), opacity .4s;
}
.wd-cursor.wd-hover .wd-glow span { transform: scale(1.25); }

.wd-ring, .wd-dot { position: fixed; top: 0; left: 0; pointer-events: none; will-change: transform; }

.wd-ring span {
  position: relative; display: block; width: var(--r); height: var(--r);
  margin: calc(var(--r) / -2) 0 0 calc(var(--r) / -2);
  border-radius: 50%;
  border: 1px solid rgba(0,200,255,.28);
  box-shadow: 0 0 22px rgba(0,200,255,.22), inset 0 0 14px rgba(0,200,255,.08);
  transition: transform .35s cubic-bezier(.22,1,.36,1), background .3s, border-color .3s;
}
/* spinning glow arc */
.wd-ring span::after {
  content: ''; position: absolute; inset: -4px; border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #00c8ff; border-right-color: rgba(29,111,242,.7);
  filter: drop-shadow(0 0 6px #00c8ff);
  animation: wdSpin 1.8s linear infinite;
}
@keyframes wdSpin { to { transform: rotate(360deg); } }

.wd-dot span {
  display: block; text-align: center; width: 30px; height: 30px; margin: -15px 0 0 -15px;
  font-family: 'Bebas Neue', sans-serif; font-size: var(--w); line-height: 30px;
  color: #00c8ff;
  text-shadow: 0 0 8px #00c8ff, 0 0 22px rgba(0,200,255,.7), 0 0 40px rgba(29,111,242,.5);
  transition: transform .25s cubic-bezier(.22,1,.36,1), color .25s;
  user-select: none;
  animation: wdPulse 2.4s ease-in-out infinite;
}
@keyframes wdPulse {
  0%,100% { text-shadow: 0 0 8px #00c8ff, 0 0 22px rgba(0,200,255,.7), 0 0 40px rgba(29,111,242,.5); }
  50%     { text-shadow: 0 0 12px #00c8ff, 0 0 30px rgba(0,200,255,.9), 0 0 56px rgba(29,111,242,.7); }
}

/* over buttons / links */
.wd-cursor.wd-hover .wd-ring span {
  transform: scale(1.65); background: rgba(0,200,255,.09); border-color: rgba(0,200,255,.9);
}
.wd-cursor.wd-hover .wd-ring span::after { animation-duration: .7s; }
.wd-cursor.wd-hover .wd-dot span { transform: scale(1.3); color: #eef4ff; }

/* while clicking */
.wd-cursor.wd-down .wd-ring span { transform: scale(.7); }
.wd-cursor.wd-down .wd-dot span  { transform: scale(.8); }

/* click / tap ripple */
.wd-ripple {
  position: fixed; width: 40px; height: 40px; margin: -20px 0 0 -20px;
  border-radius: 50%; pointer-events: none; z-index: 2147483000;
  border: 1.5px solid rgba(0,200,255,.7); box-shadow: 0 0 20px rgba(0,200,255,.35);
  animation: wdRipple .6s ease-out forwards;
}
.wd-ripple.wd-touch { width: 30px; height: 30px; margin: -15px 0 0 -15px; animation-duration: .5s; }
@keyframes wdRipple { from { transform: scale(.3); opacity: .8; } to { transform: scale(2.4); opacity: 0; } }

@media (max-width: 1024px) {
  .wd-cursor { --r: 34px; --w: 19px; }
  .wd-glow span { width: 320px; height: 320px; margin: -160px 0 0 -160px; }
}
`;

const HOVER_SEL = 'a, button, [role="button"], label, summary, .btn-cyan, .btn-ghost, .btn-primary, .testi-card';
const TEXT_SEL  = 'input, textarea, [contenteditable="true"]';
const MAX_PARTICLES = 140;

export default function CustomCursor() {
  const wrapRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef  = useRef(null);
  const glowRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current, ring = ringRef.current, dot = dotRef.current;
    const glow = glowRef.current, canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const root = document.documentElement;
    const fineMQ   = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ── Ripple on every click / tap (all screens) ── */
    const onPointerDown = (e) => {
      if (reduceMQ.matches) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const r = document.createElement('span');
      r.className = 'wd-ripple' + (e.pointerType === 'touch' ? ' wd-touch' : '');
      r.style.left = e.clientX + 'px';
      r.style.top  = e.clientY + 'px';
      document.body.appendChild(r);
      r.addEventListener('animationend', () => r.remove());
      if (e.pointerType === 'mouse') {
        wrap.classList.add('wd-down');
        burst(e.clientX, e.clientY);
      }
    };
    const onPointerUp = () => wrap.classList.remove('wd-down');
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });

    /* ── Particles ── */
    let particles = [];
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (x, y, vx, vy, size, life) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      particles.push({ x, y, vx, vy, size, life, max: life, hue: Math.random() < .7 ? 190 : 215 });
    };
    function burst(x, y) {
      for (let i = 0; i < 14; i++) {
        const a = (Math.PI * 2 * i) / 14 + Math.random() * .4;
        const s = 1.6 + Math.random() * 2.6;
        spawn(x, y, Math.cos(a) * s, Math.sin(a) * s, 2.2 + Math.random() * 2, 34 + Math.random() * 16);
      }
    }
    const drawParticles = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (!particles.length) return;
      ctx.globalCompositeOperation = 'lighter';
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life--;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        p.x += p.vx; p.y += p.vy;
        p.vx *= .95; p.vy *= .95;
        const t = p.life / p.max;
        const rad = p.size * t + .3;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 4);
        g.addColorStop(0, `hsla(${p.hue},100%,65%,${.85 * t})`);
        g.addColorStop(1, `hsla(${p.hue},100%,55%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, rad * 4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    /* ── Custom cursor (mouse devices only) ── */
    let mx = -100, my = -100, rx = -100, ry = -100, gx = -100, gy = -100;
    let lx = -100, ly = -100, raf = 0, shown = false, active = false;

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      if (!shown) {
        shown = true; rx = gx = lx = mx; ry = gy = ly = my;
        wrap.classList.remove('wd-hide');
      }
      dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
      // comet trail: sparks along the path
      const dx = mx - lx, dy = my - ly;
      const dist = Math.hypot(dx, dy);
      const steps = Math.min(3, Math.ceil(dist / 14));
      for (let i = 0; i < steps; i++) {
        const k = i / steps;
        spawn(
          lx + dx * k, ly + dy * k,
          (Math.random() - .5) * .8 - dx * .02, (Math.random() - .5) * .8 - dy * .02,
          2 + Math.random() * 2.4, 22 + Math.random() * 14
        );
      }
      lx = mx; ly = my;
    };
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      glow.style.transform = `translate3d(${gx}px,${gy}px,0)`;
      drawParticles();
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const isText = !!t.closest(TEXT_SEL);
      wrap.classList.toggle('wd-text', isText);
      wrap.classList.toggle('wd-hover', !isText && !!t.closest(HOVER_SEL));
    };
    const onLeave = () => wrap.classList.add('wd-hide');
    const onEnter = () => { if (shown) wrap.classList.remove('wd-hide'); };

    const enable = () => {
      if (active) return;
      active = true;
      resize();
      root.classList.add('has-custom-cursor');
      window.addEventListener('resize', resize);
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('mouseover', onOver, { passive: true });
      root.addEventListener('mouseleave', onLeave);
      root.addEventListener('mouseenter', onEnter);
      raf = requestAnimationFrame(loop);
    };
    const disable = () => {
      if (!active) return;
      active = false; shown = false; particles = [];
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      root.classList.remove('has-custom-cursor');
      wrap.classList.add('wd-hide');
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
      root.removeEventListener('mouseleave', onLeave);
      root.removeEventListener('mouseenter', onEnter);
    };
    const sync = () => (fineMQ.matches && !reduceMQ.matches ? enable() : disable());

    sync();
    fineMQ.addEventListener?.('change', sync);
    reduceMQ.addEventListener?.('change', sync);

    return () => {
      disable();
      fineMQ.removeEventListener?.('change', sync);
      reduceMQ.removeEventListener?.('change', sync);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="wd-cursor wd-hide" ref={wrapRef} aria-hidden="true">
        <canvas className="wd-canvas" ref={canvasRef} />
        <div className="wd-glow" ref={glowRef}><span /></div>
        <div className="wd-ring" ref={ringRef}><span /></div>
        <div className="wd-dot"  ref={dotRef}><span>W</span></div>
      </div>
    </>
  );
}