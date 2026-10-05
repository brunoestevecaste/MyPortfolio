export const MOTION_GATE_ID = "portfolio-motion-gate";
export const MOTION_TARGETS = '[data-motion]';

// Opacity reserves layout and keeps the original text available to assistive tech.
export const MOTION_GATE_CSS = `
@media (prefers-reduced-motion: no-preference) {
  main[data-motion-page]:not([data-motion-disabled])
  :is(${MOTION_TARGETS}):not([data-motion-state]) { opacity: 0; }
}`;

export function ensureMotionGate() {
  if (document.getElementById(MOTION_GATE_ID)) return;
  const style = document.createElement("style");
  style.id = MOTION_GATE_ID;
  style.textContent = MOTION_GATE_CSS;
  document.head.append(style);
}
