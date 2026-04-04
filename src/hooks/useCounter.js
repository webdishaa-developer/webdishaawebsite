import { useState, useEffect } from 'react';

export default function useCounter(target, active) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = Math.ceil(target / 50);
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      setValue(current);
      if (current >= target) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [target, active]);
  return value;
}
