// ================================
// VERA SIGNATURE EFFECT
// Custom cursor — small core dot + soft ring
// Desktop only — renders nothing on touch devices / reduced motion.
//
// The ring reacts to hoverables:
//   a, button, [data-cursor="hover"]   -> grows + royal tint
//   [data-cursor="label"]              -> becomes a filled badge
//        (put the label text in data-cursor-label="VIEW")
// Remove this component/import to disable the custom cursor.
// ================================
import { useEffect, useRef, useState } from 'react';
import { cursorEffectsAllowed } from '../lib/device.js';

export default function CustomCursor() {
  const [enabled] = useState(cursorEffectsAllowed);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const state = useRef({ sx: -100, sy: -100, rx: -100, ry: -100, mode: 'idle', label: '' });

  useEffect(() => {
    if (!enabled) return undefined;
    document.documentElement.classList.add('vera-cursor');

    const move = (e) => {
      state.current.sx = e.clientX;
      state.current.sy = e.clientY;
    };
    const over = (e) => {
      const t = e.target.closest('a, button, [data-cursor], input, textarea, select, label');
      if (!t) return setMode('idle', '');
      const explicit = t.closest('[data-cursor]');
      if (explicit && explicit.dataset.cursor === 'label') {
        setMode('label', explicit.dataset.cursorLabel || 'VIEW');
      } else if (explicit && explicit.dataset.cursor === 'view') {
        setMode('label', explicit.dataset.cursorLabel || 'VIEW');
      } else {
        setMode(t.matches('[data-cursor="none"]') ? 'idle' : 'hover', '');
      }
    };
    const setMode = (mode, label) => {
      const r = ringRef.current;
      if (!r) return;
      r.classList.toggle('is-hover', mode === 'hover');
      r.classList.toggle('is-label', mode === 'label');
      const badge = r.querySelector('.ring-label');
      if (badge) badge.textContent = label;
    };

    let raf = 0;
    const loop = () => {
      const s = state.current;
      s.rx += (s.sx - s.rx) * 0.16;
      s.ry += (s.sy - s.ry) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${s.sx}px, ${s.sy}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${s.rx}px, ${s.ry}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove('vera-cursor');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div className="custom-dot" ref={dotRef} aria-hidden="true" />
      <div className="custom-ring" ref={ringRef} aria-hidden="true">
        <span className="ring-label">VIEW</span>
      </div>
    </>
  );
}
