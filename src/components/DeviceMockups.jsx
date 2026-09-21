// ================================
// VERA DEVICE MOCKUPS — realistic browser + phone shells
// Reusable across hero, build and services. No random rectangles.
// ================================

// ------- Browser / laptop window -------
export function DeviceBrowser({ src, alt = '', url = 'vera.studio', label = 'home', className = '' }) {
  return (
    <div className={`device-browser ${className}`.trim()}>
      <div className="db-chrome">
        <div className="db-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="db-addr">
          <b>{url}</b>&nbsp;/{label}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: 'var(--ink-faint)' }}>⌄</span>
        </div>
      </div>
      <div className="db-screen">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}

// ------- Phone frame -------
export function DevicePhone({ src, alt = '', className = '' }) {
  return (
    <div className={`device-phone ${className}`.trim()}>
      <div className="dp-screen">
        <img src={src} alt={alt} loading="lazy" />
      </div>
      <div className="dp-island" aria-hidden="true" />
      <div className="dp-reflection" aria-hidden="true" />
    </div>
  );
}
