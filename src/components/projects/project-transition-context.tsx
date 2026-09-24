"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ProjectSummary } from "@/data/projects";
import styles from "./project-transition.module.css";

interface ProjectFlight {
  slug: string;
  origin: DOMRect;
  src: string;
  imageTransform: string;
  imageFilter: string;
  destination: Promise<HTMLElement>;
  arrive: (hero: HTMLElement) => void;
}

interface ProjectTransitionContextType {
  transitionToProject: (project: ProjectSummary, origin: HTMLElement) => void;
  registerHero: (slug: string, hero: HTMLElement) => void;
  isTransitioning: boolean;
  activeProjectSlug: string | null;
}

const ProjectTransitionContext = createContext<ProjectTransitionContextType>({
  transitionToProject: () => {},
  registerHero: () => {},
  isTransitioning: false,
  activeProjectSlug: null,
});

export function useProjectTransition() {
  return useContext(ProjectTransitionContext);
}

const flightTiming = { duration: 480, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" } as const;

function TransitionOverlay({ flight, navigate, finish }: {
  flight: ProjectFlight;
  navigate: (slug: string) => void;
  finish: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const photo = photoRef.current;
    if (!backdrop || !photo) return;

    let cancelled = false;
    const animations: Animation[] = [];
    const animate = (element: Element, frames: Keyframe[], timing: KeyframeAnimationOptions) => {
      const animation = element.animate(frames, timing);
      animations.push(animation);
      return animation;
    };
    // The overlay receives pointer/touch input; also keep keyboard and wheel
    // scrolling from changing either endpoint while the photo is in flight.
    const preventScroll = (event: Event) => event.preventDefault();
    const preventScrollKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Tab"].includes(event.key)) event.preventDefault();
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKey);
    // A failed navigation must never leave an invisible input-blocking layer.
    const watchdog = window.setTimeout(finish, 10000);
    window.addEventListener("popstate", finish);
    window.addEventListener("resize", finish);

    async function run() {
      try {
        // Dissolve the index while keeping the exact clicked image on screen.
        await animate(backdrop!, [{ opacity: 0 }, { opacity: 1 }], {
          duration: 180, easing: "ease-out", fill: "both",
        }).finished;
        if (cancelled) return;
        navigate(flight.slug);
        const hero = await flight.destination;
        if (cancelled) return;
        const target = hero.querySelector<HTMLElement>("[data-project-photo]");
        const targetImage = target?.querySelector("img");
        if (!target || !targetImage) { finish(); return; }
        // Keep the source bitmap until the real, responsive destination is ready.
        await targetImage.decode().catch(() => {});
        if (cancelled) return;
        const rect = target.getBoundingClientRect();
        const destinationFilter = getComputedStyle(targetImage).filter;
        const image = photo!.querySelector("img")!;

        const movement = animate(photo!, [
          { transform: "translate3d(0, 0, 0) scale(1, 1)" },
          { transform: `translate3d(${rect.left - flight.origin.left}px, ${rect.top - flight.origin.top}px, 0) scale(${rect.width / flight.origin.width}, ${rect.height / flight.origin.height})` },
        ], flightTiming);
        animate(image, [
          { transform: flight.imageTransform, filter: flight.imageFilter },
          { transform: "none", filter: destinationFilter },
        ], flightTiming);
        animate(backdrop!, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 320, easing: "ease-out", fill: "both",
        });
        const reveals = Array.from(hero.querySelectorAll<HTMLElement>("[data-project-reveal]"));
        const textAnimations = reveals.map((element, index) => animate(element, [
          { opacity: 0, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { ...flightTiming, duration: 400, delay: 100 + Math.min(index, 5) * 35 }));
        await Promise.all([movement.finished, ...textAnimations.map((animation) => animation.finished)]);
        if (cancelled) return;
        finish();
        document.getElementById("main-content")?.focus({ preventScroll: true });
      } catch {
        // Cancelling an Animation rejects finished; cleanup already restores UI.
        if (!cancelled) finish();
      }
    }
    void run();
    return () => {
      cancelled = true;
      animations.forEach((animation) => animation.cancel());
      window.clearTimeout(watchdog);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKey);
      window.removeEventListener("popstate", finish);
      window.removeEventListener("resize", finish);
    };
  }, [flight, navigate, finish]);

  return (
    <div className={styles.overlay} aria-hidden="true" data-project-transition>
      <div ref={backdropRef} className={styles.backdrop} />
      <div ref={photoRef} className={styles.photo} style={{
        top: flight.origin.top, left: flight.origin.left,
        width: flight.origin.width, height: flight.origin.height,
      }}>
        <Image src={flight.src} alt="" fill unoptimized loading="eager" sizes="100vw" style={{
          objectFit: "cover", transform: flight.imageTransform, filter: flight.imageFilter,
        }} />
      </div>
    </div>
  );
}

export function ProjectTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [flight, setFlight] = useState<ProjectFlight | null>(null);
  const flightRef = useRef<ProjectFlight | null>(null);

  const finish = useCallback(() => {
    flightRef.current = null;
    setFlight(null);
  }, []);
  const navigate = useCallback((slug: string) => {
    router.push(`/projects/${slug}`, { scroll: false });
  }, [router]);
  const registerHero = useCallback((slug: string, hero: HTMLElement) => {
    const current = flightRef.current;
    if (current?.slug !== slug) return;
    // An instant reset is essential: the site's normal anchor scroll is smooth.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    current.arrive(hero);
  }, []);

  useEffect(() => {
    if (pathname !== "/" && pathname !== `/projects/${flightRef.current?.slug}`) finish();
  }, [pathname, finish]);

  const transitionToProject = useCallback((project: ProjectSummary, origin: HTMLElement) => {
    if (flightRef.current) return;
    const image = origin.querySelector("img");
    if (!image || !image.complete || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(`/projects/${project.slug}`);
      return;
    }
    let arrive!: ProjectFlight["arrive"];
    const destination = new Promise<HTMLElement>((resolve) => { arrive = resolve; });
    const imageStyle = getComputedStyle(image);
    const nextFlight: ProjectFlight = {
      slug: project.slug,
      origin: origin.getBoundingClientRect(),
      src: image.currentSrc || image.src,
      imageTransform: imageStyle.transform,
      imageFilter: imageStyle.filter,
      destination,
      arrive,
    };
    flightRef.current = nextFlight;
    setFlight(nextFlight);
  }, [router]);

  return (
    <ProjectTransitionContext.Provider value={{
      transitionToProject, registerHero,
      isTransitioning: flight !== null,
      activeProjectSlug: flight?.slug ?? null,
    }}>
      {children}
      {flight && <TransitionOverlay flight={flight} navigate={navigate} finish={finish} />}
    </ProjectTransitionContext.Provider>
  );
}
