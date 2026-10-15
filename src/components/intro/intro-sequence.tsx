"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./intro-sequence.module.css";

const PRESENTED_RAW = "PRESENTED BY";
const TAG_OPEN = "</";
const TAG_CLOSE = ">";
const TAGGED_PRESENTED = `${TAG_OPEN}${PRESENTED_RAW}${TAG_CLOSE}`;

const SIGNATURE_RAW = "BRUNO ESTEVE";
const SIGNATURE_FULL = `${TAG_OPEN}${SIGNATURE_RAW}${TAG_CLOSE}`;

const ZOOM_DURATION = 1100;
const REVEAL_DURATION = 280;

type IntroPhase =
  | "typing"
  | "presented-hold"
  | "tag-added"
  | "tag-hold"
  | "closing-to-center"
  | "center-hold"
  | "expand-signature"
  | "signature-hold"
  | "zooming"
  | "revealing";

export function IntroSequence() {
  const [isActive, setIsActive] = useState(true);
  const [playback, setPlayback] = useState(0);
  const [phase, setPhase] = useState<IntroPhase>("typing");
  const [typedCount, setTypedCount] = useState(0);

  const stageRef = useRef<HTMLSpanElement>(null);
  const presMeasureRef = useRef<HTMLSpanElement>(null);
  const taggedMeasureRef = useRef<HTMLSpanElement>(null);
  const taggedInnerMeasureRef = useRef<HTMLSpanElement>(null);
  const sigMeasureRef = useRef<HTMLSpanElement>(null);
  const sigInnerMeasureRef = useRef<HTMLSpanElement>(null);
  const playedRef = useRef(false);

  // Notify reveals after React has committed the overlay's actual DOM state.
  useLayoutEffect(() => {
    window.dispatchEvent(
      isActive
        ? new Event("intro-start")
        : new CustomEvent("intro-complete", { detail: { played: playedRef.current } })
    );
  }, [isActive, playback]);

  useEffect(() => {
    const replay = () => {
      setPhase("typing");
      setTypedCount(0);
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
      timers.push(
        setTimeout(() => {
          if (!cancelled) callback();
        }, delay)
      );
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
    const handleMotionChange = () => {
      if (motionPreference.matches) finish(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    motionPreference.addEventListener("change", handleMotionChange);

    let seen = false;
    try {
      seen = window.sessionStorage.getItem("portfolio_intro_seen") === "true";
    } catch {
      // Play normally in private/restricted browsing.
    }
    const forceIntro = new URLSearchParams(window.location.search).get("intro") === "true";
    const bypass =
      motionPreference.matches ||
      (playback === 0 && (seen || Boolean(window.location.hash)) && !forceIntro);

    if (bypass) {
      queueMicrotask(() => finish(false));
    } else {
      // Esperar a que las fuentes estén listas antes de lanzar las mediciones y la coreografía
      void document.fonts.ready.then(() => {
        if (cancelled) return;

        let elapsed = 180;

        // 1. Escritura letra a letra de PRESENTED BY a pantalla completa
        for (let i = 1; i <= PRESENTED_RAW.length; i++) {
          elapsed += 65;
          const count = i;
          schedule(() => {
            setTypedCount(count);
            setPhase("typing");
          }, elapsed);
        }

        // 2. Reposo con el cursor parpadeando
        elapsed += 450;
        schedule(() => setPhase("presented-hold"), elapsed);

        // 3. Añadir corchetes y barra </ y >, readaptando suavemente la escala
        elapsed += 40;
        schedule(() => setPhase("tag-added"), elapsed);

        // 4. Reposo con </PRESENTED BY> formado y encajado al 100% de ancho
        elapsed += 500;
        schedule(() => setPhase("tag-hold"), elapsed);

        // 5. Los corchetes se cierran hacia el centro ocultando PRESENTED BY
        elapsed += 40;
        schedule(() => setPhase("closing-to-center"), elapsed);

        // 6. Queda en la pantalla únicamente </> en el centro
        elapsed += 560;
        schedule(() => setPhase("center-hold"), elapsed);

        // 7. Se abren los corchetes revelando </BRUNO ESTEVE>
        elapsed += 400;
        schedule(() => setPhase("expand-signature"), elapsed);

        // 8. Reposo con la firma totalmente formada a pantalla completa
        elapsed += 850;
        schedule(() => setPhase("signature-hold"), elapsed);

        // 9. Zoom que atraviesa la pantalla
        elapsed += 380;
        schedule(() => setPhase("zooming"), elapsed);

        // 10. Desvanecimiento y revelado de la Home
        elapsed += ZOOM_DURATION;
        schedule(() => setPhase("revealing"), elapsed);

        // 11. Final
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

  // Medición milimétrica del ancho disponible y cálculo de propiedades CSS
  useEffect(() => {
    if (!isActive) return;
    const stage = stageRef.current;
    const presM = presMeasureRef.current;
    const taggedM = taggedMeasureRef.current;
    const taggedInnerM = taggedInnerMeasureRef.current;
    const sigM = sigMeasureRef.current;
    const sigInnerM = sigInnerMeasureRef.current;
    if (!stage || !presM || !taggedM || !taggedInnerM || !sigM || !sigInnerM) return;

    let cancelled = false;
    const fitText = () => {
      if (cancelled) return;
      const width = stage.clientWidth;
      if (width <= 0) return;

      const presWidth = presM.getBoundingClientRect().width;
      const taggedWidth = taggedM.getBoundingClientRect().width;
      const taggedInnerWidth = taggedInnerM.getBoundingClientRect().width;
      const sigWidth = sigM.getBoundingClientRect().width;
      const sigInnerWidth = sigInnerM.getBoundingClientRect().width;

      if (presWidth > 0) {
        stage.style.setProperty("--pres-size", `${(100 * width) / presWidth}px`);
      }

      if (taggedWidth > 0) {
        stage.style.setProperty("--tagged-size", `${(100 * width) / taggedWidth}px`);
        const scale = width / taggedWidth;
        const halfTagged = (taggedInnerWidth * scale) / 2;
        stage.style.setProperty("--half-tagged", `${halfTagged}px`);
      }

      if (sigWidth > 0) {
        stage.style.setProperty("--sig-size", `${(100 * width) / sigWidth}px`);
        const scale = width / sigWidth;
        const halfSig = (sigInnerWidth * scale) / 2;
        stage.style.setProperty("--half-sig", `${halfSig}px`);
      }
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

  const currentTypedText = PRESENTED_RAW.slice(0, typedCount);
  const showTagBrackets = phase !== "typing" && phase !== "presented-hold";

  return (
    <div
      className={styles.introOverlay}
      data-phase={phase}
      data-intro-active
      aria-hidden="true"
    >
      <span ref={stageRef} className={styles.textStage} aria-hidden="true" translate="no">
        {/* Spans ocultos de medición de anchos a 100px */}
        <span ref={presMeasureRef} className={styles.measure} aria-hidden="true">
          {PRESENTED_RAW}
        </span>
        <span ref={taggedMeasureRef} className={styles.measure} aria-hidden="true">
          {TAGGED_PRESENTED}
        </span>
        <span ref={taggedInnerMeasureRef} className={styles.measure} aria-hidden="true">
          {PRESENTED_RAW}
        </span>
        <span ref={sigMeasureRef} className={styles.measure} aria-hidden="true">
          {SIGNATURE_FULL}
        </span>
        <span ref={sigInnerMeasureRef} className={styles.measure} aria-hidden="true">
          {SIGNATURE_RAW}
        </span>

        {/* FASE 1, 2 Y 3: PRESENTED BY -> </PRESENTED BY> -> CIERRE A </> */}
        <span className={styles.presentedLine}>
          <span className={styles.tagBracketOpen}>{TAG_OPEN}</span>
          <span className={styles.tagInner}>
            {showTagBrackets ? PRESENTED_RAW : currentTypedText}
            {!showTagBrackets && <span className={styles.caret} />}
          </span>
          <span className={styles.tagBracketClose}>{TAG_CLOSE}</span>
        </span>

        {/* FASE 4 Y 5: </BRUNO ESTEVE> DESDE </> AL CENTRO Y ZOOM */}
        <span className={styles.zoomStage}>
          <span className={styles.signatureLine}>
            <span className={styles.sigBracketOpen}>{TAG_OPEN}</span>
            <span className={styles.sigInner}>{SIGNATURE_RAW}</span>
            <span className={styles.sigBracketClose}>{TAG_CLOSE}</span>
          </span>
        </span>
      </span>
    </div>
  );
}
