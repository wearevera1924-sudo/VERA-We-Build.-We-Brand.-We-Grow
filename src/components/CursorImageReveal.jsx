// ================================
// VERA SIGNATURE EFFECT
// Cursor Image Reveal
// Remove this component/import to disable this effect.
//
// How to use:
//   <CursorImageRevealProvider>            // mount ONCE at app root
//     <CursorImageRevealTrigger image="/assets/project-1.jpg">
//       <a href="#">EXPLORE PROJECT</a>
//     </CursorImageRevealTrigger>
//   </CursorImageRevealProvider>
//
// A hidden preview image follows the cursor (smooth lerp, soft fade/scale)
// while the cursor is over any trigger. Desktop only.
// ================================
import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { cursorEffectsAllowed } from '../lib/device.js';

const RevealContext = createContext(null);

export function CursorImageRevealProvider({ children }) {
  const [enabled] = useState(cursorEffectsAllowed);
  const [item, setItem] = useState(null); // { src }
  const imgRef = useRef(null);
  const pos = useRef({ x: -400, y: -400, tx: -400, ty: -400, angle: 0 });

  useEffect(() => {
    if (!enabled) return undefined;
    const move = (e) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
    };
    let raf = 0;
    const loop = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.10; // gentle lerp — luxurious, never aggressive
      p.y += (p.ty - p.y) * 0.10;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate(${p.x + 26}px, ${p.y + 20}px) rotate(${p.angle}deg)`;
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

  const show = useCallback((src) => setItem({ src }), []);
  const hide = useCallback(() => setItem(null), []);

  return (
    <RevealContext.Provider value={{ show, hide, enabled }}>
      {children}
      {enabled && item && (
        <div className="cursor-reveal-wrap" ref={imgRef} aria-hidden="true">
          <img
            className="cursor-reveal-img"
            src={item.src}
            alt=""
            loading="lazy"
            style={{ opacity: 0.98 }}
          />
        </div>
      )}
    </RevealContext.Provider>
  );
}

export function CursorImageRevealTrigger({ image, children, className = '' }) {
  const ctx = useContext(RevealContext);
  if (!ctx || !ctx.enabled) return <div className={className}>{children}</div>;

  return (
    <div
      className={className}
      onMouseEnter={() => ctx.show(image)}
      onMouseLeave={() => ctx.hide()}
    >
      {children}
    </div>
  );
}
