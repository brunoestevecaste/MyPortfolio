"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { ProjectSummary } from "@/data/projects";
import { ProjectExecutiveHero } from "./project-executive-hero";

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface FlipStyles {
  deltaX: number;
  deltaY: number;
  scaleX: number;
  scaleY: number;
}

interface TransitionState {
  active: boolean;
  phase: "initial" | "animating" | "completing";
  project: ProjectSummary | null;
  originRect: Rect | null;
}

interface ProjectTransitionContextType {
  transitionToProject: (
    project: ProjectSummary,
    originElement: HTMLElement
  ) => void;
  isTransitioning: boolean;
  activeProjectSlug: string | null;
}

const ProjectTransitionContext = createContext<ProjectTransitionContextType>({
  transitionToProject: () => {},
  isTransitioning: false,
  activeProjectSlug: null,
});

export function useProjectTransition() {
  return useContext(ProjectTransitionContext);
}

function TransitionOverlay({
  project,
  originRect,
  phase,
  onPhaseChange,
}: {
  project: ProjectSummary;
  originRect: Rect;
  phase: "initial" | "animating" | "completing";
  onPhaseChange: (nextPhase: "animating" | "completing" | "done") => void;
}) {
  const photoRef = useRef<HTMLDivElement>(null);
  const [flipStyles, setFlipStyles] = useState<FlipStyles | null>(null);

  useLayoutEffect(() => {
    if (!photoRef.current) return;
    const target = photoRef.current.getBoundingClientRect();
    if (target.width > 0 && target.height > 0) {
      const deltaX = originRect.left - target.left;
      const deltaY = originRect.top - target.top;
      const scaleX = originRect.width / target.width;
      const scaleY = originRect.height / target.height;
      setFlipStyles({ deltaX, deltaY, scaleX, scaleY });
    }
  }, [originRect]);

  useEffect(() => {
    if (!flipStyles || phase !== "initial") return;

    // Trigger animation in next frame once initial FLIP transform is registered
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        onPhaseChange("animating");
      });
      return () => cancelAnimationFrame(r2);
    });

    return () => cancelAnimationFrame(r1);
  }, [flipStyles, phase, onPhaseChange]);

  const isAnimating = phase === "animating";
  const isCompleting = phase === "completing";

  const photoInnerStyle: React.CSSProperties = flipStyles
    ? {
        transform:
          isAnimating || isCompleting
            ? "translate3d(0, 0, 0) scale(1, 1)"
            : `translate3d(${flipStyles.deltaX}px, ${flipStyles.deltaY}px, 0) scale(${flipStyles.scaleX}, ${flipStyles.scaleY})`,
        transformOrigin: "top left",
        transition:
          isAnimating || isCompleting
            ? "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
        willChange: "transform",
        visibility: "visible",
      }
    : {
        visibility: "hidden",
      };

  const photoImageStyle: React.CSSProperties = {
    filter: isAnimating || isCompleting ? "grayscale(80%)" : "grayscale(100%)",
    transition: isAnimating || isCompleting ? "filter 0.48s ease-out" : "none",
  };

  const summaryColStyle: React.CSSProperties = {
    opacity: isAnimating || isCompleting ? 1 : 0,
    transform:
      isAnimating || isCompleting ? "translateY(0)" : "translateY(24px)",
    transition:
      isAnimating || isCompleting
        ? "opacity 0.44s cubic-bezier(0.16, 1, 0.3, 1) 0.06s, transform 0.44s cubic-bezier(0.16, 1, 0.3, 1) 0.06s"
        : "none",
    willChange: "opacity, transform",
  };

  const topBarStyle: React.CSSProperties = {
    opacity: isAnimating || isCompleting ? 1 : 0,
    transform:
      isAnimating || isCompleting ? "translateY(0)" : "translateY(-6px)",
    transition:
      isAnimating || isCompleting
        ? "opacity 0.36s ease 0.12s, transform 0.36s ease 0.12s"
        : "none",
  };

  const captionStyle: React.CSSProperties = {
    opacity: isAnimating || isCompleting ? 1 : 0,
    transition:
      isAnimating || isCompleting ? "opacity 0.36s ease 0.18s" : "none",
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        overflowY: "hidden",
        backgroundColor: "var(--canvas)",
        opacity: isCompleting ? 0 : 1,
        transition: isCompleting
          ? "opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1)"
          : "none",
      }}
    >
      {/* Spacer matching desktop & mobile header height */}
      <div className="h-18 md:h-[4.5rem] w-full shrink-0" />

      <div className="site-container flex-1">
        <ProjectExecutiveHero
          project={project}
          isOverlay={true}
          photoRef={photoRef}
          photoInnerStyle={photoInnerStyle}
          photoImageStyle={photoImageStyle}
          summaryColStyle={summaryColStyle}
          topBarStyle={topBarStyle}
          captionStyle={captionStyle}
        />
      </div>
    </div>
  );
}

export function ProjectTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [transitionState, setTransitionState] = useState<TransitionState>({
    active: false,
    phase: "initial",
    project: null,
    originRect: null,
  });

  const transitionToProject = useCallback(
    (project: ProjectSummary, originElement: HTMLElement) => {
      // Respect prefers-reduced-motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        router.push(`/projects/${project.slug}`);
        return;
      }

      const rect = originElement.getBoundingClientRect();
      const originRect: Rect = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };

      setTransitionState({
        active: true,
        phase: "initial",
        project,
        originRect,
      });

      // Route navigation triggers concurrently during transition flight
      const navTimer = setTimeout(() => {
        router.push(`/projects/${project.slug}`);
      }, 220);

      // Begin overlay fade-out once route navigation lands
      const completionTimer = setTimeout(() => {
        setTransitionState((prev) => ({
          ...prev,
          phase: "completing",
        }));
      }, 580);

      // Fully remove overlay
      const cleanupTimer = setTimeout(() => {
        setTransitionState({
          active: false,
          phase: "initial",
          project: null,
          originRect: null,
        });
      }, 820);

      return () => {
        clearTimeout(navTimer);
        clearTimeout(completionTimer);
        clearTimeout(cleanupTimer);
      };
    },
    [router]
  );

  const handlePhaseChange = useCallback(
    (nextPhase: "animating" | "completing" | "done") => {
      if (nextPhase === "done") {
        setTransitionState({
          active: false,
          phase: "initial",
          project: null,
          originRect: null,
        });
      } else {
        setTransitionState((prev) => ({
          ...prev,
          phase: nextPhase,
        }));
      }
    },
    []
  );

  return (
    <ProjectTransitionContext.Provider
      value={{
        transitionToProject,
        isTransitioning: transitionState.active,
        activeProjectSlug: transitionState.project?.slug ?? null,
      }}
    >
      {children}

      {transitionState.active &&
        transitionState.project &&
        transitionState.originRect && (
          <TransitionOverlay
            project={transitionState.project}
            originRect={transitionState.originRect}
            phase={transitionState.phase}
            onPhaseChange={handlePhaseChange}
          />
        )}
    </ProjectTransitionContext.Provider>
  );
}
