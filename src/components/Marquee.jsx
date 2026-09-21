// ================================
// VERA MARQUEE — reusable scrolling band
// Pauses on hover. Disabled by CSS under prefers-reduced-motion.
// ================================
export default function Marquee({ items = [], fast = false, className = '' }) {
  const row = items.map((it, i) => (
    <span className="mq-item" key={i}>
      {it} <span className="dot">*</span>
    </span>
  ));
  return (
    <div className={`marquee ${fast ? 'marquee--fast' : ''} ${className}`} aria-hidden="true">
      <div className="marquee-track">
        <div style={{ display: 'flex' }}>{row}</div>
        <div style={{ display: 'flex' }}>{row}</div>
      </div>
    </div>
  );
}
