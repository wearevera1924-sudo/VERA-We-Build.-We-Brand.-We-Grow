// ================================
// VERA DEVICE UTILITIES
// Guards used by all cursor signature effects.
// ================================

// True only on devices with a mouse-like pointer (desktop/laptop trackpads).
export const isFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Respect the user's reduced-motion OS setting.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Desktop-only guard for cursor effects (fine pointer + wide viewport + motion allowed).
export const cursorEffectsAllowed = () =>
  isFinePointer() && !prefersReducedMotion() && window.innerWidth >= 1024;
