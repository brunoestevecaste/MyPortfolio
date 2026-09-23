"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export interface KursorProps {
  /**
   * RGB color values without rgba(), e.g. "18, 20, 22" or "51, 51, 51".
   * Defaults to Bruno Esteve's portfolio ink token "18, 20, 22".
   */
  color?: string;
  /**
   * Whether to hide the native OS cursor. Defaults to true.
   */
  removeDefaultCursor?: boolean;
}

const INTERACTIVE_SELECTOR =
  'a[href], button, [role="button"], [role="link"], [role="tab"], [role="menuitem"], select, summary, [data-cursor-hover], .k-hover, label, input:not([type="hidden"])';

function isElementClickable(el: Element | null): boolean {
  if (!el || !(el instanceof Element)) return false;

  const candidate = el.closest(INTERACTIVE_SELECTOR);
  if (!candidate) return false;

  // Exclude disabled elements or elements marked as aria-disabled
  if (
    candidate.hasAttribute("disabled") ||
    candidate.getAttribute("aria-disabled") === "true" ||
    candidate.classList.contains("disabled")
  ) {
    return false;
  }

  // Exclude elements with pointer-events: none
  try {
    const style = window.getComputedStyle(candidate);
    if (style.pointerEvents === "none") {
      return false;
    }
  } catch {
    return false;
  }

  return true;
}

export function Kursor({
  color = "18, 20, 22",
  removeDefaultCursor = true,
}: KursorProps) {
  const pathname = usePathname();
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const updateHoverState = useCallback((target: Element | null) => {
    const isClickable = isElementClickable(target);
    if (isClickable) {
      outerRef.current?.classList.add("--hover");
    } else {
      outerRef.current?.classList.remove("--hover");
    }
  }, []);

  const syncHoverAtCurrentPosition = useCallback(() => {
    if (!lastPosRef.current) return;
    const el = document.elementFromPoint(
      lastPosRef.current.x,
      lastPosRef.current.y
    );
    updateHoverState(el);
  }, [updateHoverState]);

  // Synchronize cursor state when changing pages via Next.js App Router navigation
  useEffect(() => {
    // Immediately clear down and hover states to avoid lingering clickable styles
    outerRef.current?.classList.remove("kursor--down");
    outerRef.current?.classList.remove("--hover");

    // After DOM has rendered for the new route, verify if cursor rests on a clickable element
    const rafId = requestAnimationFrame(() => {
      syncHoverAtCurrentPosition();
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [pathname, syncHoverAtCurrentPosition]);

  useEffect(() => {
    // Only activate custom cursor on fine-pointer devices (mouse / trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    if (removeDefaultCursor) {
      document.body.classList.add("notCursor");
    }

    const outer = outerRef.current;
    const inner = innerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      lastPosRef.current = { x: clientX, y: clientY };

      if (outer) {
        outer.style.left = `${clientX}px`;
        outer.style.top = `${clientY}px`;
        if (outer.classList.contains("kursor--hidden")) {
          outer.classList.remove("kursor--hidden");
        }
      }

      if (inner) {
        inner.style.left = `${clientX}px`;
        inner.style.top = `${clientY}px`;
        if (inner.classList.contains("kursorChild--hidden")) {
          inner.classList.remove("kursorChild--hidden");
        }
      }

      updateHoverState(e.target as Element | null);
    };

    const handleMouseDown = () => {
      outer?.classList.add("kursor--down");
    };

    const handleMouseUp = () => {
      outer?.classList.remove("kursor--down");
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateHoverState(e.target as Element | null);
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        outer?.classList.remove("--hover");
      } else {
        updateHoverState(e.relatedTarget as Element | null);
      }
    };

    const handleScroll = () => {
      syncHoverAtCurrentPosition();
    };

    const handleMouseLeave = () => {
      outer?.classList.add("kursor--hidden");
      inner?.classList.add("kursorChild--hidden");
      outer?.classList.remove("--hover");
      outer?.classList.remove("kursor--down");
    };

    const handleMouseEnter = () => {
      outer?.classList.remove("kursor--hidden");
      inner?.classList.remove("kursorChild--hidden");
      syncHoverAtCurrentPosition();
    };

    const handleBlur = () => {
      outer?.classList.add("kursor--hidden");
      inner?.classList.add("kursorChild--hidden");
      outer?.classList.remove("--hover");
      outer?.classList.remove("kursor--down");
    };

    const handlePopStateOrHash = () => {
      outer?.classList.remove("kursor--down");
      requestAnimationFrame(() => {
        syncHoverAtCurrentPosition();
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", syncHoverAtCurrentPosition);
    window.addEventListener("popstate", handlePopStateOrHash);
    window.addEventListener("hashchange", handlePopStateOrHash);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (removeDefaultCursor) {
        document.body.classList.remove("notCursor");
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", syncHoverAtCurrentPosition);
      window.removeEventListener("popstate", handlePopStateOrHash);
      window.removeEventListener("hashchange", handlePopStateOrHash);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [removeDefaultCursor, syncHoverAtCurrentPosition, updateHoverState]);

  return (
    <>
      <div
        ref={outerRef}
        className="kursor kursor--4 kursor--hidden"
        style={{ "--k-color": color } as React.CSSProperties}
        aria-hidden="true"
      />
      <div
        ref={innerRef}
        className="kursorChild kursorChild--hidden"
        style={{ "--k-color": color } as React.CSSProperties}
        aria-hidden="true"
      />
    </>
  );
}
