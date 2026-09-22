"use client";

import type { ReactNode } from "react";
import { ResponsiveContainer, type TooltipContentProps } from "recharts";
import styles from "./editorial-chart.module.css";

export const axisStyle = {
  axisLine: false,
  tickLine: false,
  tick: { fill: "var(--muted)", fontSize: 12 },
  tickMargin: 10,
} as const;

const count = new Intl.NumberFormat("es-ES");
const compact = new Intl.NumberFormat("es-ES", {
  notation: "compact",
  maximumFractionDigits: 1,
});
export const compactCount = (value: number) => compact.format(value);

export function ChartFrame({
  children,
  height = 240,
  label,
}: {
  children: ReactNode;
  height?: number;
  label: string;
}) {
  return (
    <div
      className={styles.frame}
      style={{ height }}
      role="group"
      aria-label={label}
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export function EditorialTooltip({
  active,
  payload,
  label,
  labelFormatter,
  unit = "",
}: TooltipContentProps & { unit?: string }) {
  if (!active || !payload.length) return null;
  return (
    <div className={styles.tooltip}>
      {label != null && (
        <p>{labelFormatter ? labelFormatter(label, payload) : label}</p>
      )}
      <dl>
        {payload.map((item, index) => (
          <div key={`${item.dataKey}-${index}`}>
            <dt>{item.name}</dt>
            <dd>
              {typeof item.value === "number"
                ? count.format(item.value)
                : String(item.value ?? "—")}
              {unit}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ChartValues({
  data,
}: {
  data: readonly { label: string; value: number }[];
}) {
  return (
    <details className={styles.values}>
      <summary>Consultar valores</summary>
      <dl>
        {data.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{count.format(item.value)}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
