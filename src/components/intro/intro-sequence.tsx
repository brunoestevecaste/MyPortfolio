"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./intro-sequence.module.css";

export const INTRO_ITEMS = [
  { id: "creativity", num: "01", label: "Creativity", category: "Vision & Ideas" },
  { id: "ai", num: "02", label: "Artificial Intelligence", category: "Models & Agents" },
  { id: "data", num: "03", label: "Data", category: "Analytics & Systems" },
  { id: "me", num: "04", label: "Me", category: "Bruno Esteve" },
] as const;

export function IntroSequence() {
  const [isActive, setIsActive] = useState<boolean>(false);
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
    }, 150);
  }, [clearAllTimers]);

  // Handle initialization on client mount
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const forceIntro = searchParams.get("intro") === "true";
      const hasSeen = window.sessionStorage.getItem("portfolio_intro_seen");

      if (hasSeen && !forceIntro) {
        return;
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        return;
      }

      requestAnimationFrame(() => {
        setIsActive(true);
      });
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

  // Keyboard controls (Esc / Space to skip)
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

  // Main animation timeline
  useEffect(() => {
    if (!isActive || isExiting) return;

    clearAllTimers();

    const addTimer = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timersRef.current.push(t);
      return t;
    };

    // 1. Pixelation Resolve (0 - 450ms)
    addTimer(() => {
      setIsPixelating(false);
    }, 450);

    // 2. Step from Creativity (0) -> Artificial Intelligence (1) at 700ms
    addTimer(() => {
      setCurrentIndex(1);
    }, 700);

    // 3. Step from Artificial Intelligence (1) -> Data (2) at 1350ms
    addTimer(() => {
      setCurrentIndex(2);
    }, 1350);

    // 4. Step from Data (2) -> Me (3) at 2000ms
    addTimer(() => {
      setCurrentIndex(3);
    }, 2000);

    // 5. Arrive & Lock on "Me" at 2550ms
    addTimer(() => {
      setIsLocked(true);
    }, 2550);

    // 6. Glitch entrance transition inspired by after_selection.mp4 at 2950ms
    addTimer(() => {
      setIsGlitching(true);
    }, 2950);

    // 7. Curtain tear / dissolve starts at 3350ms
    addTimer(() => {
      setIsExiting(true);
      try {
        window.sessionStorage.setItem("portfolio_intro_seen", "true");
      } catch {
        // Safe fallback
      }
    }, 3350);

    // 8. End sequence & unmount at 3750ms
    addTimer(() => {
      setIsActive(false);
      window.dispatchEvent(new CustomEvent("intro-complete"));
    }, 3750);

    return () => {
      clearAllTimers();
    };
  }, [isActive, isExiting, clearAllTimers]);

  // Canvas pixelation effect simulation (First 450ms)
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
      const progress = Math.min(elapsed / 450, 1);

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Pixel block size steps down: 32 -> 16 -> 8 -> 4 -> 1
      let blockSize = 32;
      if (progress > 0.65) blockSize = 6;
      else if (progress > 0.4) blockSize = 14;
      else if (progress > 0.2) blockSize = 22;

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

        // Text blocks simulation
        offCtx.fillStyle = "#121416";
        offCtx.font = "bold 9px sans-serif";
        offCtx.fillText("CREATIVITY", offW * 0.08, barY - barH * 0.4);
        offCtx.fillText("DATA", offW * 0.08, barY + barH * 1.6);

        // Inside bar
        offCtx.fillStyle = "#F4F3EF";
        offCtx.fillText("ARTIFICIAL INTELLIGENCE", offW * 0.08, barY + barH * 0.7);

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
      aria-label="Animación de introducción editorial"
      className={`${styles.introOverlay} ${isExiting ? styles.introOverlayHidden : ""} ${
        isGlitching ? styles.glitchingContainer : ""
      }`}
      role="region"
    >
      {/* Top Header Information */}
      <div className={styles.topHeader}>
        <div className={styles.headerTitle}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>Bruno Esteve // Initial Selection</span>
        </div>
        <button
          type="button"
          onClick={skipIntro}
          className={styles.skipButton}
          aria-label="Saltar animación de introducción"
        >
          [ ESC ] Saltar
        </button>
      </div>

      {/* Main Center Roller Stage */}
      <div className={styles.rollerStage}>
        {/* Layer 1: Base Track (Outside the Highlight Bar, Muted Ink) */}
        <div
          className={`${styles.baseTrack} ${styles.trackMoving}`}
          style={{
            transform: `translate3d(0, calc(-0.5 * var(--intro-row-h) - ${currentIndex} * var(--intro-row-h)), 0)`,
          }}
        >
          {INTRO_ITEMS.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemMain}>
                <span className={styles.itemNumber}>{item.num}</span>
                <span className={styles.itemLabel}>{item.label}</span>
              </div>
              <span className={styles.itemCategory}>{item.category}</span>
            </div>
          ))}
        </div>

        {/* Layer 2: Fixed Highlight Bar in the Vertical Center (Inverted Ink) */}
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
                <div className={styles.itemMain}>
                  <span className={styles.itemNumber}>{item.num}</span>
                  <span className={styles.itemLabel}>
                    {item.label}
                    {isLocked && item.id === "me" && (
                      <span className={styles.selectedBadge}>SELECTED</span>
                    )}
                  </span>
                </div>
                <span className={styles.itemCategory}>
                  {isLocked && item.id === "me" ? "[ ACCESS GRANTED ]" : item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Information */}
      <div className={styles.bottomFooter}>
        <div className={styles.footerSteps}>
          {INTRO_ITEMS.map((item, idx) => (
            <span
              key={item.id}
              className={idx === currentIndex ? styles.stepIndicatorActive : undefined}
            >
              {item.num} {item.label}
            </span>
          ))}
        </div>
        <div>
          {isLocked
            ? "STATUS: ME SELECTED // ENTERING SITE"
            : `INDEX: 0${currentIndex + 1} / 04`}
        </div>
      </div>

      {/* Canvas Pixelation Resolve Layer (Active during first 450ms) */}
      <canvas
        ref={canvasRef}
        className={`${styles.pixelCanvas} ${!isPixelating ? styles.pixelCanvasHidden : ""}`}
        aria-hidden="true"
      />

      {/* Glitch Overlay Slices (Active when Me is selected, inspired by after_selection.mp4) */}
      {isGlitching && (
        <>
          <div className={`${styles.sliceLayer} ${styles.sliceA}`} aria-hidden="true">
            <div
              className={styles.highlightBar}
              style={{
                transform: "translateY(-50%) translate3d(24px, 0, 0)",
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
                    <div className={styles.itemMain}>
                      <span className={styles.itemNumber}>{item.num}</span>
                      <span className={styles.itemLabel}>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.sliceLayer} ${styles.sliceB}`} aria-hidden="true">
            <div
              className={styles.highlightBar}
              style={{
                transform: "translateY(-50%) translate3d(-32px, 0, 0)",
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
                    <div className={styles.itemMain}>
                      <span className={styles.itemNumber}>{item.num}</span>
                      <span className={styles.itemLabel}>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.sliceLayer} ${styles.sliceC}`} aria-hidden="true">
            <div
              className={styles.highlightBar}
              style={{
                transform: "translateY(-50%) translate3d(15px, 0, 0)",
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
                    <div className={styles.itemMain}>
                      <span className={styles.itemNumber}>{item.num}</span>
                      <span className={styles.itemLabel}>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Barcode / Comb scanline data bars */}
          <div className={styles.dataBars} aria-hidden="true" />
        </>
      )}
    </aside>
  );
}
