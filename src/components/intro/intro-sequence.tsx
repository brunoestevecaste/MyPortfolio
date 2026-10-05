"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./intro-sequence.module.css";

const PRESENTED_TEXT = "PRESENTED BY";
const SIGNATURE_TEXT = "</BRUNO ESTEVE>";
const ZOOM_DURATION = 1100;
const REVEAL_DURATION = 280;

type IntroFrame = {
  text: string;
  line: "presented" | "signature";
  phase: "typing" | "zooming" | "revealing";
};

const INITIAL_FRAME: IntroFrame = { text: "", line: "presented", phase: "typing" };

export function IntroSequence() {
  const [isActive, setIsActive] = useState(true);
  const [playback, setPlayback] = useState(0);
  const [frame, setFrame] = useState<IntroFrame>(INITIAL_FRAME);
  const stageRef = useRef<HTMLSpanElement>(null);
  const presentedRef = useRef<HTMLSpanElement>(null);
  const signatureRef = useRef<HTMLSpanElement>(null);
  const playedRef = useRef(false);

  // Notify reveals after React has committed the overlay's actual DOM state.
  useLayoutEffect(() => {
    window.dispatchEvent(isActive ? new Event("intro-start") :
      new CustomEvent("intro-complete", { detail: { played: playedRef.current } }));
  }, [isActive, playback]);

  useEffect(() => {
    const replay = () => {
      setFrame(INITIAL_FRAME);
      setIsActive(true);
      setPlayback((current) => current + 1);
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("replay-intro", replay);
    return () => window.removeEventListener("replay-intro", replay);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const schedule = (callback: () => void, delay: number) => {
      timers.push(setTimeout(() => { if (!cancelled) callback(); }, delay));
    };

    const finish = (remember = true, moveFocus = false) => {
      if (cancelled) return;
      cancelled = true;
      timers.forEach(clearTimeout);
      if (remember) {
        try {
          window.sessionStorage.setItem("portfolio_intro_seen", "true");
        } catch {
          // The intro remains usable when session storage is unavailable.
        }
      }
      playedRef.current = remember;
      setIsActive(false);
      if (moveFocus) {
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["Escape", " ", "Enter", "Tab"].includes(event.key)) {
        event.preventDefault();
        finish(true, true);
      }
    };
    const handleMotionChange = () => { if (motionPreference.matches) finish(false); };
    window.addEventListener("keydown", handleKeyDown);
    motionPreference.addEventListener("change", handleMotionChange);

    let seen = false;
    try {
      seen = window.sessionStorage.getItem("portfolio_intro_seen") === "true";
    } catch {
      // Play normally in private/restricted browsing.
    }
    const forceIntro = new URLSearchParams(window.location.search).get("intro") === "true";
    const bypass = motionPreference.matches ||
      (playback === 0 && (seen || Boolean(window.location.hash)) && !forceIntro);

    if (bypass) {
      queueMicrotask(() => finish(false));
    } else {
      // Wait for the existing display font before measuring and typing it.
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        let elapsed = 180;
        for (let count = 1; count <= PRESENTED_TEXT.length; count++) {
          elapsed += 65;
          schedule(() => setFrame({ text: PRESENTED_TEXT.slice(0, count), line: "presented", phase: "typing" }), elapsed);
        }
        elapsed += 360;
        for (let count = PRESENTED_TEXT.length - 1; count >= 0; count--) {
          elapsed += 28;
          schedule(() => setFrame({ text: PRESENTED_TEXT.slice(0, count), line: "presented", phase: "typing" }), elapsed);
        }
        elapsed += 180;
        for (let count = 1; count <= SIGNATURE_TEXT.length; count++) {
          elapsed += 65;
          schedule(() => setFrame({ text: SIGNATURE_TEXT.slice(0, count), line: "signature", phase: "typing" }), elapsed);
        }
        elapsed += 380;
        schedule(() => setFrame({ text: SIGNATURE_TEXT, line: "signature", phase: "zooming" }), elapsed);
        elapsed += ZOOM_DURATION;
        schedule(() => setFrame({ text: SIGNATURE_TEXT, line: "signature", phase: "revealing" }), elapsed);
        schedule(() => finish(), elapsed + REVEAL_DURATION);
      });
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKeyDown);
      motionPreference.removeEventListener("change", handleMotionChange);
    };
  }, [isActive, playback]);

  useEffect(() => {
    if (!isActive) return;

    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    const stage = stageRef.current;
    const presented = presentedRef.current;
    const signature = signatureRef.current;
    if (!stage || !presented || !signature) return;

    let cancelled = false;
    const fitText = () => {
      if (cancelled) return;
      // Measure complete phrases, so letter size stays fixed during typing/deleting.
      const availableWidth = stage.clientWidth;
      const presentedWidth = presented.getBoundingClientRect().width;
      const signatureWidth = signature.getBoundingClientRect().width;
      stage.style.setProperty("--presented-size", `${100 * availableWidth / presentedWidth}px`);
      stage.style.setProperty("--signature-size", `${100 * availableWidth / signatureWidth}px`);
    };

    const observer = new ResizeObserver(fitText);
    observer.observe(stage);
    fitText();
    void document.fonts.ready.then(fitText);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className={styles.introOverlay}
      data-phase={frame.phase}
      data-intro-active
      aria-hidden="true"
    >
      <span ref={stageRef} className={styles.textStage} aria-hidden="true" translate="no">
        <span ref={presentedRef} className={styles.measure}>{PRESENTED_TEXT}</span>
        <span ref={signatureRef} className={styles.measure}>{SIGNATURE_TEXT}</span>
        <span className={styles.zoomStage}>
          <span className={styles.typedLine} data-line={frame.line}>
            {frame.text}
            <span className={styles.caret} />
          </span>
        </span>
      </span>
    </div>
  );
}
