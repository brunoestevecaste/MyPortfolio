"use client";

import { useEffect, useRef, type RefObject, type PointerEvent } from "react";
import projectStyles from "@/components/projects/projects.module.css";
import styles from "./portfolio-chat.module.css";

const THUMB_HEIGHT = 56;

export function ConversationScrollbar({ target }: { target: RefObject<HTMLDivElement | null> }) {
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const grabOffset = useRef(THUMB_HEIGHT / 2);

  useEffect(() => {
    const element = target.current;
    const control = rail.current;
    const line = track.current;
    const indicator = thumb.current;
    if (!element || !control || !line || !indicator) return;

    const sync = () => {
      const maxScroll = Math.max(0, element.scrollHeight - element.clientHeight);
      const progress = maxScroll ? Math.min(1, Math.max(0, element.scrollTop / maxScroll)) : 0;
      indicator.style.transform = `translateY(${progress * Math.max(0, line.clientHeight - THUMB_HEIGHT)}px)`;
      control.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
      control.setAttribute("aria-disabled", String(maxScroll === 0));
      control.tabIndex = maxScroll ? 0 : -1;
    };

    const observer = new ResizeObserver(sync);
    observer.observe(element);
    observer.observe(line);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    element.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", sync);
    };
  }, [target]);

  function move(clientY: number) {
    const element = target.current;
    const line = track.current;
    if (!element || !line) return;
    const travel = Math.max(1, line.clientHeight - THUMB_HEIGHT);
    const progress = Math.min(1, Math.max(0, (clientY - line.getBoundingClientRect().top - grabOffset.current) / travel));
    element.scrollTo({ top: progress * Math.max(0, element.scrollHeight - element.clientHeight), behavior: "instant" });
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || event.currentTarget.getAttribute("aria-disabled") === "true") return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    const indicator = thumb.current?.getBoundingClientRect();
    grabOffset.current = indicator && event.clientY >= indicator.top && event.clientY <= indicator.bottom
      ? event.clientY - indicator.top : THUMB_HEIGHT / 2;
    event.currentTarget.setPointerCapture(event.pointerId);
    move(event.clientY);
  }

  return (
    <div ref={rail} className={styles.scrollRail} role="scrollbar" aria-label="Desplazar conversación" aria-controls="portfolio-conversation"
      aria-orientation="vertical" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} tabIndex={-1}
      onPointerDown={startDrag}
      onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event.clientY); }}
      onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
      onKeyDown={(event) => {
        const element = target.current;
        if (!element) return;
        const maxScroll = element.scrollHeight - element.clientHeight;
        const positions: Record<string, number> = {
          ArrowUp: element.scrollTop - 40, ArrowDown: element.scrollTop + 40,
          PageUp: element.scrollTop - element.clientHeight, PageDown: element.scrollTop + element.clientHeight,
          Home: 0, End: maxScroll,
        };
        if (Object.hasOwn(positions, event.key)) { event.preventDefault(); element.scrollTo({ top: positions[event.key], behavior: "instant" }); }
      }}>
      <div ref={track} className={projectStyles.railTrack} style={{ height: "100%" }} aria-hidden="true">
        <div ref={thumb} className={projectStyles.railThumb} style={{ height: THUMB_HEIGHT }} />
      </div>
    </div>
  );
}
