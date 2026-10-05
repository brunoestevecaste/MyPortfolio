import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { MOTION_TARGETS } from "./motion-gate";

gsap.registerPlugin(ScrambleTextPlugin, SplitText);

export interface PageMotionControls {
  activate: () => void;
  pause: () => void;
  destroy: () => void;
}

export function setupPageMotion(main: HTMLElement): PageMotionControls {
  const targets = Array.from(main.querySelectorAll<HTMLElement>(MOTION_TARGETS));
  const started = new Set<HTMLElement>();
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
      });
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });

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
      context.revert();
      targets.forEach((target) => target.removeAttribute("data-motion-state"));
    },
  };
}
