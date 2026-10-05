"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useProjectTransition } from "@/components/projects/project-transition-context";
import { ensureMotionGate } from "./motion-gate";
import type { PageMotionControls } from "./motion-runtime";

export function PageMotion() {
  const pathname = usePathname();
  const { isTransitioning } = useProjectTransition();
  const activateRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const main = document.querySelector<HTMLElement>("main[data-motion-page]");
    if (!main) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let controls: PageMotionControls | undefined;
    let generation = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const activate = () => {
      if (!document.querySelector("[data-intro-active], [data-project-transition]")) {
        controls?.activate();
      }
    };
    activateRef.current = activate;
    const fallback = () => {
      generation++;
      clearTimeout(timeout);
      main.setAttribute("data-motion-disabled", "");
      controls?.destroy();
      controls = undefined;
    };
    const initialize = async () => {
      const current = ++generation;
      clearTimeout(timeout);
      controls?.destroy();
      controls = undefined;
      if (preference.matches) { main.setAttribute("data-motion-disabled", ""); return; }
      main.removeAttribute("data-motion-disabled");
      ensureMotionGate();
      timeout = setTimeout(fallback, 5000);
      const [motion] = await Promise.all([
        import("./motion-runtime"), document.fonts.ready,
      ]);
      if (cancelled || current !== generation || preference.matches) return;
      clearTimeout(timeout);
      controls = motion.setupPageMotion(main);
      window.dispatchEvent(new Event("motion-ready"));
      activate();
    };
    const start = () => {
      const request = generation + 1;
      void initialize().catch(() => {
        if (!cancelled && generation === request) fallback();
      });
    };
    const pause = () => { controls?.pause(); };

    start();
    preference.addEventListener("change", start);
    window.addEventListener("intro-complete", activate);
    window.addEventListener("intro-start", start);
    window.addEventListener("replay-intro", pause);
    window.addEventListener("project-transition-start", pause);
    window.addEventListener("motion-fallback", fallback);
    return () => {
      cancelled = true;
      generation++;
      clearTimeout(timeout);
      controls?.destroy();
      activateRef.current = undefined;
      preference.removeEventListener("change", start);
      window.removeEventListener("intro-complete", activate);
      window.removeEventListener("intro-start", start);
      window.removeEventListener("replay-intro", pause);
      window.removeEventListener("project-transition-start", pause);
      window.removeEventListener("motion-fallback", fallback);
    };
  }, [pathname]);

  // React may commit overlay removal after a requestAnimationFrame callback.
  // Activate from the committed transition state, without tearing down effects.
  useLayoutEffect(() => {
    if (!isTransitioning) activateRef.current?.();
  }, [isTransitioning, pathname]);

  return null;
}
