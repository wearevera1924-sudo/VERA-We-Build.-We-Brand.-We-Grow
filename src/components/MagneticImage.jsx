// ================================
// VERA INTERACTION
// Magnetic Image
// Remove/disable this wrapper to remove magnetic image behaviour.
//
// Wrap ANY image/section with this component to give it a subtle pull
// toward the cursor. Movement is small, smooth and returns on leave.
// Disabled on touch devices and reduced motion.
// ================================
import { useRef, useEffect, useState } from 'react';
import { cursorEffectsAllowed } from '../lib/device.js';

export default function MagneticImage({
  children,
  className = '',
  strength = 0.32, // 0..1 — how far it follows the cursor
  max = 16,        // px — hard cap on movement
  scale = 1.02     // hover scale
}) {
  const [enabled] = useState(cursorEffectsAllowed);
  const ref = useRef(null);
  const rafRef = useRef(0);
  const offset = useRef({ x: 0, y: 0, tx: 0, ty: 0, hover: false });

  useEffect(() => {
    if (!enabled || !ref.current) return undefined;
    const el = ref.current;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      offset.current.tx = Math.max(-max, Math.min(max, dx * strength));
      offset.current.ty = Math.max(-max, Math.min(max, dy * strength));
      offset.current.hover = true;
    };
    const leave = () => {
      offset.current.tx = 0;
      offset.current.ty = 0;
      offset.current.hover = false;
    };

    const loop = () => {
      const o = offset.current;
      o.x += (o.tx - o.x) * 0.14;
      o.y += (o.ty - o.y) * 0.14;
      el.style.transform = `translate3d(${o.x}px, ${o.y}px, 0) scale(${o.hover ? scale : 1})`;
      rafRef.current = requestAnimationFrame(loop);
    };

    el.addEventListener('mousemove', move, { passive: true });
    el.addEventListener('mouseleave', leave);
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
      cancelAnimationFrame(rafRef.current);
      el.style.transform = '';
    };
  }, [enabled, strength, max, scale]);

  // Disabled on touch — pass through unchanged.
  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
