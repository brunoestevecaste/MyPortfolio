import { MOTION_GATE_CSS, MOTION_GATE_ID } from "./motion-gate";

// Runs before the body is painted. No React-owned attributes are mutated.
const bootstrap = `(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const style = document.createElement('style');
  style.id = ${JSON.stringify(MOTION_GATE_ID)};
  style.textContent = ${JSON.stringify(MOTION_GATE_CSS)};
  document.head.append(style);
  const timeout = setTimeout(() => {
    style.remove();
    window.dispatchEvent(new Event('motion-fallback'));
  }, 5000);
  window.addEventListener('motion-ready', () => clearTimeout(timeout), { once: true });
})();`;

export function MotionBootstrap() {
  return <script dangerouslySetInnerHTML={{ __html: bootstrap }} />;
}
