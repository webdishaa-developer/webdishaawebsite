import { useEffect, useRef, useState } from 'react';

// rAF-throttled scroll — direct DOM for progress, useState only for nav
export default function useScrollProgress() {
  const progRef = useRef(null);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (progRef.current) progRef.current.style.width = (h ? (y / h) * 100 : 0) + '%';
        setNavSolid(y > 30);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { progRef, navSolid };
}
