// hooks/useReveal.js — handles page changes AND content that appears later
// (gallery filters, 1-month / 3-month tabs, anything rendered after load).
//
// Why the old version failed: it only scanned for .rev elements once.
// Switching a tab/filter creates NEW .rev elements, which were never observed,
// so they stayed at opacity:0. A MutationObserver now watches for them.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    );

    const seen = new WeakSet();

    // Observe a node (and any .rev children) exactly once
    const watch = (node) => {
      if (!node || node.nodeType !== 1) return;
      const found = [];
      if (node.matches && node.matches('.rev')) found.push(node);
      if (node.querySelectorAll) node.querySelectorAll('.rev').forEach((el) => found.push(el));
      found.forEach((el) => {
        if (!seen.has(el) && !el.classList.contains('in')) {
          seen.add(el);
          io.observe(el);
        }
      });
    };

    // 1) Everything already on the page for this route
    watch(document.body);
    const t = setTimeout(() => watch(document.body), 80); // safety pass after paint

    // 2) Anything added later (filters, tabs, lazy content)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach(watch));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(t);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);
}