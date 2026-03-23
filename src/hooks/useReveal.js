import { useEffect } from 'react';

// Single IntersectionObserver for ALL .rev elements — very performant
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rev');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
