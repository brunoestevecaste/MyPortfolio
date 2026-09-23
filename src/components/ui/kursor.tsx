"use client";

import { useEffect, useRef } from "react";

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
  'a, button, [role="button"], input[type="submit"], input[type="button"], input[type="reset"], summary, [data-cursor-hover], .k-hover';

export function Kursor({
  color = "18, 20, 22",
  removeDefaultCursor = true,
}: KursorProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

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
    };

    const handleMouseDown = () => {
      outer?.classList.add("kursor--down");
    };

    const handleMouseUp = () => {
      outer?.classList.remove("kursor--down");
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        outer?.classList.add("--hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const related = e.relatedTarget as HTMLElement | null;
      const isCurrentInteractive = target?.closest(INTERACTIVE_SELECTOR);
      const isNextInteractive = related?.closest(INTERACTIVE_SELECTOR);

      if (isCurrentInteractive && !isNextInteractive) {
        outer?.classList.remove("--hover");
      }
    };

    const handleMouseLeave = () => {
      outer?.classList.add("kursor--hidden");
      inner?.classList.add("kursorChild--hidden");
    };

    const handleMouseEnter = () => {
      outer?.classList.remove("kursor--hidden");
      inner?.classList.remove("kursorChild--hidden");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
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
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [removeDefaultCursor]);

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
