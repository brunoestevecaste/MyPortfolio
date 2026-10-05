import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { MOTION_TARGETS } from "./motion-gate";

gsap.registerPlugin(ScrambleTextPlugin, ScrollToPlugin, SplitText);

function smoothWheel() {
  const root = document.documentElement;
  const originalBehavior = root.style.scrollBehavior;
  let tween: gsap.core.Tween | undefined;
  let destination = window.scrollY;
  const restore = () => { tween = undefined; root.style.scrollBehavior = originalBehavior; };
  const stop = () => { tween?.kill(); restore(); };

  const onWheel = (event: WheelEvent) => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey ||
      Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
      getComputedStyle(document.documentElement).overflow === "hidden" ||
      document.querySelector("[data-project-transition], [data-intro-active]")) return;

    // Let inputs, the chat and nested scroll containers handle their own wheel.
    let element = event.target instanceof Element ? event.target : null;
    if (element?.closest("input, textarea, select, [role='dialog']")) { stop(); return; }
    while (element && element !== document.body && element !== document.documentElement) {
      const style = getComputedStyle(element);
      if (/(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight) {
        stop();
        return;
      }
      element = element.parentElement;
    }

    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
    const maximum = document.documentElement.scrollHeight - window.innerHeight;
    const next = gsap.utils.clamp(0, maximum, (tween?.isActive() ? destination : window.scrollY) + delta);
    if (next === window.scrollY && !tween?.isActive()) return;
    event.preventDefault();
    stop();
    destination = next;
    // CSS smooth scrolling would otherwise compete with each GSAP frame.
    root.style.scrollBehavior = "auto";
    tween = gsap.to(window, {
      scrollTo: { y: destination, autoKill: true },
      duration: event.deltaMode === 0 && Math.abs(delta) < 50 ? 0.2 : 0.48,
      ease: "power2.out",
      onComplete: restore,
      onInterrupt: restore,
    });
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("pointerdown", stop, { passive: true });
  window.addEventListener("keydown", stop);
  window.addEventListener("hashchange", stop);
  window.addEventListener("project-transition-start", stop);
  return () => {
    stop();
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("pointerdown", stop);
    window.removeEventListener("keydown", stop);
    window.removeEventListener("hashchange", stop);
    window.removeEventListener("project-transition-start", stop);
  };
}

export interface PageMotionControls {
  activate: () => void;
  pause: () => void;
  destroy: () => void;
}

export function setupPageMotion(main: HTMLElement): PageMotionControls {
  const targets = Array.from(main.querySelectorAll<HTMLElement>(MOTION_TARGETS));
  const started = new Set<HTMLElement>();
  const imageCleanups: Array<() => void> = [];
  const context = gsap.context(() => {}, main);
  let active = false;
  let destroyed = false;
  const complete = (element: HTMLElement) => { element.dataset.motionState = "revealed"; };

  const scramble = (heading: HTMLElement) => {
    const split = SplitText.create(heading, {
      type: "words", tag: "span", wordsClass: "motion-word", aria: "auto",
    });
    const words = split.words as HTMLElement[];
    const originals = words.map((word) => word.textContent ?? "");
    const widths = words.map((word) => word.getBoundingClientRect().width);
    words.forEach((word, index) => { word.style.width = `${widths[index]}px`; });
    gsap.set(words, { opacity: 0 });
    const timeline = gsap.timeline({
      paused: true,
      onComplete: () => { complete(heading); split.revert(); },
    });
    words.forEach((word, index) => {
      timeline.set(word, { opacity: 1 }, index * 0.025);
      timeline.to(word, {
        duration: 0.85,
        scrambleText: {
          text: originals[index], chars: "upperAndLowerCase", speed: 0.35,
          revealDelay: 0.08, tweenLength: false,
        },
      }, index * 0.025);
    });
    // Render the scrambled first frame before releasing the initial opacity mask.
    timeline.time(0.01).play();
    heading.dataset.motionState = "revealing";
  };

  const mask = (block: HTMLElement) => {
    if (block.querySelector("a, button, input") || block.closest("[data-motion-exclude]")) {
      complete(block);
      return;
    }
    // Mask the native paragraph instead of rebuilding its lines. SplitText's
    // wrappers changed line spacing and wrapping, then snapped back on revert.
    // This keeps typography, nested markup and responsive reflow unchanged.
    // The small outset protects accents, italics and descenders at the edges.
    const originalClipPath = block.style.clipPath;
    gsap.set(block, { clipPath: "inset(0% -0.15em 100% -0.15em)" });
    block.dataset.motionState = "revealing";
    gsap.to(block, {
      clipPath: "inset(-15% -0.15em -15% -0.15em)",
      duration: 0.65, ease: "power3.out",
      onComplete: () => {
        block.style.clipPath = originalClipPath;
        complete(block);
      },
    });
  };

  const pixels = (frame: HTMLElement) => {
    const image = frame.querySelector("img");
    if (!image) { complete(frame); return; }
    const columns = 12;
    const rows = 9;
    const overlay = document.createElement("div");
    overlay.className = "motion-pixels";
    overlay.setAttribute("aria-hidden", "true");
    const cells = Array.from({ length: columns * rows }, () => document.createElement("span"));
    overlay.append(...cells);
    frame.append(overlay);
    const removeListeners = () => {
      image.removeEventListener("load", play);
      image.removeEventListener("error", play);
    };
    const reveal = gsap.to(cells, {
      opacity: 0, duration: 0.16, ease: "none", paused: true,
      stagger: (index) => (Math.floor(index / columns) + index % columns) * 0.038,
      onComplete: () => { complete(frame); overlay.remove(); removeListeners(); },
    });
    function play() {
      if (destroyed) return;
      frame.dataset.motionState = "revealing";
      reveal.play();
    }
    image.addEventListener("load", play);
    image.addEventListener("error", play);
    if (image.complete) play();
    imageCleanups.push(() => { removeListeners(); overlay.remove(); });
  };

  // A single native observer replaces a ScrollTrigger and SplitText instance for
  // every offscreen paragraph. DOM work starts only when a target is in view.
  const observer = new IntersectionObserver((entries) => {
    if (!active || destroyed) return;
    context.add(() => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (!entry.isIntersecting || started.has(element)) return;
        started.add(element);
        observer.unobserve(element);
        if (element.dataset.motion === "scramble") scramble(element);
        else if (element.dataset.motion === "mask") mask(element);
        else pixels(element);
      });
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });
  const stopWheel = smoothWheel();

  return {
    activate() {
      if (active || destroyed) return;
      active = true;
      targets.forEach((target) => { if (!started.has(target)) observer.observe(target); });
    },
    pause() { active = false; observer.disconnect(); },
    destroy() {
      destroyed = true;
      observer.disconnect();
      stopWheel();
      context.revert();
      imageCleanups.forEach((remove) => remove());
      targets.forEach((target) => target.removeAttribute("data-motion-state"));
    },
  };
}
