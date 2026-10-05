"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef } from "react";
import { KursorContrastFilter } from "./kursor-contrast-filter";

export interface KursorProps {
  /**
   * RGB color values without rgba(), e.g. "18, 20, 22" or "51, 51, 51".
   * Defaults to the portfolio's --accent color token.
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
  color,
  removeDefaultCursor = true,
}: KursorProps) {
  const pathname = usePathname();
  const contrastFilterId = useId();
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const labelTextRef = useRef<HTMLSpanElement>(null);
  const labelSizeRef = useRef<{ width: number; height: number } | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const positionLabel = useCallback(() => {
    const label = labelRef.current;
    const position = lastPosRef.current;
    if (!label || !position || !label.classList.contains("kursorLabel--visible")) return;

    // Measure only when the text changes; pointer movement only updates transforms.
    const size = labelSizeRef.current ?? { width: label.offsetWidth, height: label.offsetHeight };
    labelSizeRef.current = size;
    const gap = 12;
    const offsetX = 6;
    const offsetY = 9;
    const x = position.x + offsetX + size.width > window.innerWidth - gap
      ? position.x - size.width - offsetX
      : position.x + offsetX;
    const y = position.y + offsetY + size.height > window.innerHeight - gap
      ? position.y - size.height - offsetY
      : position.y + offsetY;

    label.style.transform = `translate3d(${Math.max(gap, x)}px, ${Math.max(gap, y)}px, 0)`;
  }, []);

  const updateHoverState = useCallback((target: Element | null) => {
    const outer = outerRef.current;
    if (!outer) return;

    const isClickable = isElementClickable(target);
    outer.classList.toggle("--hover", isClickable);
    const text = isClickable ? target?.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") ?? "" : "";
    if (labelTextRef.current && labelTextRef.current.textContent !== text) {
      labelTextRef.current.textContent = text;
      labelSizeRef.current = null;
    }
    labelRef.current?.classList.toggle("kursorLabel--visible", Boolean(text));
    positionLabel();
  }, [positionLabel]);

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
    labelRef.current?.classList.remove("kursorLabel--visible");

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
    let moveFrame: number | null = null;

    const renderCursor = () => {
      moveFrame = null;
      const position = lastPosRef.current;
      if (!position) return;

      positionLabel();
      const transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      if (outer) {
        outer.style.transform = transform;
        outer.classList.remove("kursor--hidden");
      }
      if (inner) {
        inner.style.transform = transform;
        inner.classList.remove("kursorChild--hidden");
      }
    };

    const cancelPendingMove = () => {
      if (moveFrame !== null) {
        cancelAnimationFrame(moveFrame);
        moveFrame = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      if (moveFrame === null) {
        moveFrame = requestAnimationFrame(renderCursor);
      }
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
        updateHoverState(null);
      } else {
        updateHoverState(e.relatedTarget as Element | null);
      }
    };

    const handleScroll = () => {
      syncHoverAtCurrentPosition();
    };

    const handleResize = () => {
      labelSizeRef.current = null;
      syncHoverAtCurrentPosition();
    };

    const handleMouseLeave = () => {
      cancelPendingMove();
      outer?.classList.add("kursor--hidden");
      inner?.classList.add("kursorChild--hidden");
      outer?.classList.remove("--hover");
      labelRef.current?.classList.remove("kursorLabel--visible");
      outer?.classList.remove("kursor--down");
    };

    const handleMouseEnter = () => {
      outer?.classList.remove("kursor--hidden");
      inner?.classList.remove("kursorChild--hidden");
      syncHoverAtCurrentPosition();
    };

    const handleBlur = () => {
      cancelPendingMove();
      outer?.classList.add("kursor--hidden");
      inner?.classList.add("kursorChild--hidden");
      outer?.classList.remove("--hover");
      labelRef.current?.classList.remove("kursorLabel--visible");
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
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", syncHoverAtCurrentPosition);
    window.addEventListener("popstate", handlePopStateOrHash);
    window.addEventListener("hashchange", handlePopStateOrHash);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cancelPendingMove();
      if (removeDefaultCursor) {
        document.body.classList.remove("notCursor");
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", syncHoverAtCurrentPosition);
      window.removeEventListener("popstate", handlePopStateOrHash);
      window.removeEventListener("hashchange", handlePopStateOrHash);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [removeDefaultCursor, syncHoverAtCurrentPosition, updateHoverState, positionLabel]);

  return (
    <>
      <KursorContrastFilter id={contrastFilterId} color={color} />
      <div
        ref={outerRef}
        className="kursor kursor--4 kursor--hidden"
        style={{
          "--k-color": color ? `rgb(${color})` : "var(--accent)",
          "--k-contrast-filter": `url("#${contrastFilterId}")`,
        } as React.CSSProperties}
        aria-hidden="true"
      />
      <div
        ref={innerRef}
        className="kursorChild kursorChild--hidden"
        style={{ "--k-color": color ? `rgb(${color})` : "var(--accent)" } as React.CSSProperties}
        aria-hidden="true"
      />
      <div ref={labelRef} className="kursorLabel" aria-hidden="true">
        <span ref={labelTextRef} />
      </div>
    </>
  );
}
