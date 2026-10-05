"use client";

import { useEffect, useRef } from "react";

export function KursorContrastFilter({ id, color }: { id: string; color?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const channels = getComputedStyle(svg).color.match(/\d+/g)?.map(Number);
    if (!channels || channels.length < 3) return;

    // Match actual painted pixels, including the accent's darker hover shade.
    // A discrete table avoids turning the spaces around text black.
    svg.querySelectorAll("feFuncR, feFuncG, feFuncB").forEach((transfer, index) => {
      const table = Array.from({ length: 256 }, (_, value) =>
        Math.abs(value - channels[index]) <= 32 ? "1" : "0"
      ).join(" ");
      transfer.setAttribute("tableValues", table);
    });
  }, [color]);

  return (
    <svg
      ref={svgRef}
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "fixed", pointerEvents: "none", color: color ? `rgb(${color})` : "var(--accent)" }}
    >
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feComponentTransfer in="SourceGraphic" result="matched-channels">
            <feFuncR type="discrete" tableValues="0" />
            <feFuncG type="discrete" tableValues="0" />
            <feFuncB type="discrete" tableValues="0" />
          </feComponentTransfer>
          <feColorMatrix
            in="matched-channels"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 1 1 0 -2"
            result="accent-pixels"
          />
          <feFlood floodColor="currentColor" result="cursor-red" />
          <feComposite in="cursor-red" in2="accent-pixels" operator="out" result="red-pixels" />
          <feMerge>
            <feMergeNode in="accent-pixels" />
            <feMergeNode in="red-pixels" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
