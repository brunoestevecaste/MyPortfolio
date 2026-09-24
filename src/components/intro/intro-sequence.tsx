"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./intro-sequence.module.css";

export const INTRO_ITEMS = [
  { id: "creativity", label: "Creativity" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "data", label: "Data" },
  { id: "me", label: "Me" },
] as const;

export function IntroSequence() {
  // Start as true by default so the overlay covers the header and page from the very first frame
  const [isActive, setIsActive] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPixelating, setIsPixelating] = useState<boolean>(true);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isGlitching, setIsGlitching] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const skipIntro = useCallback(() => {
    clearAllTimers();
    setIsExiting(true);
    try {
      window.sessionStorage.setItem("portfolio_intro_seen", "true");
    } catch {
      // Ignore storage errors in private/restricted mode
    }

    setTimeout(() => {
      setIsActive(false);
      window.dispatchEvent(new CustomEvent("intro-complete"));
    }, 200);
  }, [clearAllTimers]);

  // Handle initialization on client mount
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const forceIntro = searchParams.get("intro") === "true";
      const hasSeen = window.sessionStorage.getItem("portfolio_intro_seen");

      if (hasSeen && !forceIntro) {
        queueMicrotask(() => {
          setIsActive(false);
        });
        return;
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        queueMicrotask(() => {
          setIsActive(false);
        });
        return;
      }
    } catch {
      // Fallback
    }
  }, []);

  // Listen for manual replay requests
  useEffect(() => {
    const handleReplay = () => {
      clearAllTimers();
      setCurrentIndex(0);
      setIsPixelating(true);
      setIsLocked(false);
      setIsGlitching(false);
      setIsExiting(false);
      setIsActive(true);
    };

    window.addEventListener("replay-intro", handleReplay);
    return () => window.removeEventListener("replay-intro", handleReplay);
  }, [clearAllTimers]);

  // Keyboard controls (Esc / Space / Enter to skip)
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        skipIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, skipIntro]);

  // Punto medio animation timeline (balanced, readable, and authentic)
  useEffect(() => {
    if (!isActive || isExiting) return;

    clearAllTimers();

    const addTimer = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timersRef.current.push(t);
      return t;
    };

    // 1. Pixelation Resolve (0 - 350ms)
    addTimer(() => {
      setIsPixelating(false);
    }, 350);

    // 2. Step from Creativity (0) -> Artificial Intelligence (1) at 1100ms
    addTimer(() => {
      setCurrentIndex(1);
    }, 1100);

    // 3. Step from Artificial Intelligence (1) -> Data (2) at 2650ms
    addTimer(() => {
      setCurrentIndex(2);
    }, 2650);

    // 4. Step from Data (2) -> Me (3) at 4200ms
    addTimer(() => {
      setCurrentIndex(3);
    }, 4200);

    // 5. Arrive & Lock on "Me" at 5300ms
    addTimer(() => {
      setIsLocked(true);
    }, 5300);

    // 6. Authentic Parpadeo Glitch inspired by after_selection.mp4 at 5600ms
    addTimer(() => {
      setIsGlitching(true);
    }, 5600);

    // 7. Curtain dissolve starts at 6400ms
    addTimer(() => {
      setIsExiting(true);
      try {
        window.sessionStorage.setItem("portfolio_intro_seen", "true");
      } catch {
        // Safe fallback
      }
    }, 6400);

    // 8. End sequence & unmount at 6850ms
    addTimer(() => {
      setIsActive(false);
      window.dispatchEvent(new CustomEvent("intro-complete"));
    }, 6850);

    return () => {
      clearAllTimers();
    };
  }, [isActive, isExiting, clearAllTimers]);

  // Canvas pixelation effect simulation (First 350ms)
  useEffect(() => {
    if (!isActive || !isPixelating) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / 350, 1);

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Pixel block size steps down: 28 -> 14 -> 6 -> 1
      let blockSize = 24;
      if (progress > 0.65) blockSize = 5;
      else if (progress > 0.35) blockSize = 12;

      ctx.clearRect(0, 0, width, height);

      // Offscreen low-res rendering
      const offW = Math.max(1, Math.floor(width / blockSize));
      const offH = Math.max(1, Math.floor(height / blockSize));

      const offCanvas = document.createElement("canvas");
      offCanvas.width = offW;
      offCanvas.height = offH;
      const offCtx = offCanvas.getContext("2d");

      if (offCtx) {
        offCtx.fillStyle = "#F4F3EF";
        offCtx.fillRect(0, 0, offW, offH);

        // Highlight bar in center
        const barH = offH * 0.14;
        const barY = (offH - barH) / 2;
        offCtx.fillStyle = "#121416";
        offCtx.fillRect(0, barY, offW, barH);

        // Text simulation in Space Mono monospace
        offCtx.fillStyle = "#121416";
        offCtx.font = "8px monospace";
        offCtx.fillText("Artificial Intelligence", offW * 0.06, barY + barH * 1.6);

        // Inside bar
        offCtx.fillStyle = "#F4F3EF";
        offCtx.fillText("Creativity", offW * 0.06, barY + barH * 0.7);

        // Draw stretched with nearest neighbor
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offCanvas, 0, 0, width, height);
      }

      ctx.restore();

      if (progress < 1 && isPixelating) {
        animFrame = requestAnimationFrame(render);
      }
    };

    animFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrame);
  }, [isActive, isPixelating]);

  if (!isActive) return null;

  return (
    <aside
      aria-label="Animación interactiva de introducción"
      className={`${styles.introOverlay} ${isExiting ? styles.introOverlayHidden : ""} ${
        isGlitching ? styles.glitchingContainer : ""
      }`}
      role="region"
      onClick={skipIntro}
    >
      {/* Main Center Roller Stage: ONLY the selector with the options */}
      <div className={styles.rollerStage}>
        {/* Layer 1: Base Track (Outside the Highlight Bar, Muted Space Mono on Canvas) */}
        <div
          className={`${styles.baseTrack} ${styles.trackMoving}`}
          style={{
            transform: `translate3d(0, calc(-0.5 * var(--intro-row-h) - ${currentIndex} * var(--intro-row-h)), 0)`,
          }}
        >
          {INTRO_ITEMS.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <span className={styles.itemLabel}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Layer 2: Fixed Highlight Bar in the Vertical Center (Inverted Layer) */}
        <div
          className={`${styles.highlightBar} ${isLocked ? styles.barSelected : ""}`}
          aria-hidden="true"
        >
          <div
            className={`${styles.invertedTrack} ${styles.trackMoving}`}
            style={{
              transform: `translate3d(0, calc(-${currentIndex} * var(--intro-row-h)), 0)`,
            }}
          >
            {INTRO_ITEMS.map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <span className={styles.itemLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas Pixelation Resolve Layer (Active during first 350ms) */}
      <canvas
        ref={canvasRef}
        className={`${styles.pixelCanvas} ${!isPixelating ? styles.pixelCanvasHidden : ""}`}
        aria-hidden="true"
      />

      {/* Glitch Overlay Slices with Authentic Parpadeo */}
      {isGlitching && (
        <>
          <div className={`${styles.sliceLayer} ${styles.sliceA}`} aria-hidden="true">
            <div
              className={styles.highlightBar}
              style={{
                transform: "translateY(-50%) translate3d(25px, 0, 0)",
              }}
            >
              <div
                className={styles.invertedTrack}
                style={{
                  transform: `translate3d(0, calc(-3 * var(--intro-row-h)), 0)`,
                }}
              >
                {INTRO_ITEMS.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <span className={styles.itemLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.sliceLayer} ${styles.sliceB}`} aria-hidden="true">
            <div
              className={styles.highlightBar}
              style={{
                transform: "translateY(-50%) translate3d(-28px, 0, 0)",
              }}
            >
              <div
                className={styles.invertedTrack}
                style={{
                  transform: `translate3d(0, calc(-3 * var(--intro-row-h)), 0)`,
                }}
              >
                {INTRO_ITEMS.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <span className={styles.itemLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.sliceLayer} ${styles.sliceC}`} aria-hidden="true">
            <div
              className={styles.highlightBar}
              style={{
                transform: "translateY(-50%) translate3d(14px, 0, 0)",
              }}
            >
              <div
                className={styles.invertedTrack}
                style={{
                  transform: `translate3d(0, calc(-3 * var(--intro-row-h)), 0)`,
                }}
              >
                {INTRO_ITEMS.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <span className={styles.itemLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Barcode / Comb scanline data bars with parpadeo */}
          <div className={styles.dataBars} aria-hidden="true" />
        </>
      )}
    </aside>
  );
}
