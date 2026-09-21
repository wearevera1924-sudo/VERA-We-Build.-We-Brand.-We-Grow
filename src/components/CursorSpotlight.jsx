// ================================
// VERA SIGNATURE EFFECT
// Cursor-Powered Royal Spotlight
// Remove this component/import to disable the effect.
// Desktop only — renders nothing on touch devices / reduced motion.
// ================================
import { useEffect, useRef, useState } from 'react';
import { cursorEffectsAllowed } from '../lib/device.js';

export default function CursorSpotlight() {
  const ref = useRef(null);
  const [enabled] = useState(cursorEffectsAllowed);
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const current = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    if (!enabled || !ref.current) return undefined;
    const move = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    let raf = 0;
    const loop = () => {
      // Smooth interpolation — soft, slow follow, never aggressive.
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      const el = ref.current;
      if (el) {
        el.style.setProperty('--mx', `${current.current.x}px`);
        el.style.setProperty('--my', `${current.current.y}px`);
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div className="spotlight-fx" ref={ref} aria-hidden="true" />;
}
