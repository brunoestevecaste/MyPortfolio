"use client";

import { useTranslations } from "@/components/i18n/language-provider";
import type { ReactNode } from "react";
import { ResponsiveContainer, type TooltipContentProps } from "recharts";
import styles from "./editorial-chart.module.css";

export const axisStyle = {
  axisLine: false,
  tickLine: false,
  tick: { fill: "var(--muted)", fontSize: 12 },
  tickMargin: 10,
} as const;

const compactFormats = {
  es: new Intl.NumberFormat("es-ES", { notation: "compact", maximumFractionDigits: 1 }),
  en: new Intl.NumberFormat("en-GB", { notation: "compact", maximumFractionDigits: 1 }),
};
export const compactCount = (value: number, locale: "es" | "en" = "es") => compactFormats[locale].format(value);

export function ChartFrame({
  children,
  height = 240,
  label,
}: {
  children: ReactNode;
  height?: number;
  label: string;
}) {
  const { t } = useTranslations();
  return (
    <div
      className={styles.frame}
      style={{ height }}
      role="group"
      aria-label={t(label)}
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
  const { t, locale } = useTranslations();
  const count = new Intl.NumberFormat(locale === "en" ? "en-GB" : "es-ES");
  if (!active || !payload.length) return null;
  return (
    <div className={styles.tooltip}>
      {label != null && (
        <p>{labelFormatter ? labelFormatter(label, payload) : t(String(label))}</p>
      )}
      <dl>
        {payload.map((item, index) => (
          <div key={`${item.dataKey}-${index}`}>
            <dt>{t(String(item.name ?? ""))}</dt>
            <dd>
              {t(typeof item.value === "number"
                ? count.format(item.value)
                : String(item.value ?? "—"))}
              {t(unit)}
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
  const { t, locale } = useTranslations();
  const count = new Intl.NumberFormat(locale === "en" ? "en-GB" : "es-ES");
  return (
    <details className={styles.values}>
      <summary>{t("Consultar valores")}</summary>
      <dl>
        {data.map((item) => (
          <div key={item.label}>
            <dt>{t(item.label)}</dt>
            <dd>{t(count.format(item.value))}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
