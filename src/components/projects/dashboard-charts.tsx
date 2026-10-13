"use client";

import { useTranslations } from "@/components/i18n/language-provider";
import { useId, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceDot,
  Text,
  Tooltip,
  Treemap,
  XAxis,
  YAxis,
  type TreemapNode,
} from "recharts";
import {
  formatCount,
  formatMoment,
  type ChartDatum,
  type HourlyPoint,
} from "@/data/aepd-dashboard";
import {
  axisStyle,
  ChartFrame,
  ChartValues,
  compactCount,
  EditorialTooltip,
} from "@/components/charts/editorial-chart";
import styles from "./dashboard.module.css";

// Category identity is carried by labels; grey does not imply a second measure.
const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

function RequestTick({
  x = 0,
  y = 0,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
}) {
  const { t } = useTranslations();
  return (
    <Text
      x={x - 8}
      y={y}
      width={100}
      textAnchor="end"
      verticalAnchor="middle"
      fill="var(--muted)"
      fontSize={12}
    >
      {t(payload?.value)}
    </Text>
  );
}

function CategoryTick({
  x = 0,
  y = 0,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
}) {
  const { t } = useTranslations();
  return (
    <Text
      x={x}
      y={y + 8}
      width={36}
      textAnchor="middle"
      verticalAnchor="start"
      fill="var(--muted)"
      fontSize={12}
    >
      {t(payload?.value)}
    </Text>
  );
}

export function HorizontalBars({ data }: { data: ChartDatum[] }) {
  const { t, locale } = useTranslations();
  const sorted = [...data].sort((a, b) => b.value - a.value).slice(0, 6);
  return (
    <>
      <ChartFrame height={264} label={t("Comparación por tipo de solicitud")}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ left: 0, right: 62, top: 0, bottom: 0 }}
          accessibilityLayer
        >
          <XAxis type="number" hide domain={[0, "dataMax"]} />
          <YAxis
            {...axisStyle}
            type="category"
            dataKey="label"
            width={110}
            tick={<RequestTick />}
            interval={0}
          />
          <Tooltip
            cursor={false}
            content={EditorialTooltip}
            isAnimationActive={false}
          />
          <Bar
            dataKey="value"
            name={t("Total")}
            fill="var(--signal)"
            barSize={10}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="value"
              position="right"
              offset={8}
              fill="var(--ink)"
              fontSize={12}
              formatter={(value) => formatCount(Number(value), locale)}
            />
          </Bar>
        </BarChart>
      </ChartFrame>
      <ChartValues data={sorted} />
    </>
  );
}

export function VerticalBars({ data }: { data: ChartDatum[] }) {
  const { t } = useTranslations();
  return (
    <>
      <ChartFrame height={240} label={t("Visitas por contenido")}>
        <BarChart
          data={data}
          margin={{ left: 0, right: 0, top: 28, bottom: 0 }}
          accessibilityLayer
        >
          <XAxis
            {...axisStyle}
            dataKey="label"
            tick={<CategoryTick />}
            interval={0}
            height={46}
          />
          <YAxis hide domain={[0, "dataMax"]} />
          <Tooltip
            cursor={false}
            content={EditorialTooltip}
            isAnimationActive={false}
          />
          <Bar
            dataKey="value"
            name={t("Visitas")}
            fill="var(--signal)"
            maxBarSize={18}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="value"
              position="top"
              offset={10}
              fill="var(--ink)"
              fontSize={12}
              formatter={(value) => compactCount(Number(value))}
            />
          </Bar>
        </BarChart>
      </ChartFrame>
      <ChartValues data={data} />
    </>
  );
}

export function DownloadDonut({ data }: { data: ChartDatum[] }) {
  const { t, locale } = useTranslations();
  const colored = data.map((item, index) => ({
    ...item,
    fill: chartColors[index % chartColors.length],
  }));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className={styles.donutLayout}>
      <ChartFrame
        height={260}
        label={t("Distribución de {0} descargas por categoría", [t(formatCount(total, locale))])}
      >
        <PieChart accessibilityLayer>
          <Pie
            data={colored}
            dataKey="value"
            nameKey="label"
            innerRadius="78%"
            outerRadius="88%"
            startAngle={90}
            endAngle={-270}
            stroke="var(--canvas)"
            strokeWidth={3}
            isAnimationActive={false}
          />
          <Tooltip content={EditorialTooltip} isAnimationActive={false} />
        </PieChart>
      </ChartFrame>
      <ul className={styles.donutLegend}>
        {colored.map((item) => (
          <li key={item.label}>
            <i style={{ background: item.fill }} aria-hidden="true" />
            <span>
              {t(item.label)}
              <strong>{t(formatCount(item.value, locale))}</strong>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqCell({
  depth,
  x,
  y,
  width,
  height,
  index,
  name,
  value,
}: TreemapNode) {
  const { t, locale } = useTranslations();
  if (depth !== 1) return <g />;
  // Dark greys keep light labels readable. Small cells are described in the values list.
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={chartColors[index % 4]}
      />
      <title>{t("{0}: {1}", [t(name), t(formatCount(value, locale))])}</title>
      {width >= 64 && height >= 58 && (
        <text x={x + 10} y={y + 23} fill="var(--on-signal)" fontSize={12}>
          <tspan>{t(name)}</tspan>
          <tspan x={x + 10} y={y + height - 13}>
            {t(compactCount(value))}
          </tspan>
        </text>
      )}
    </g>
  );
}

export function FaqTreemap({ data }: { data: ChartDatum[] }) {
  const { t } = useTranslations();
  return (
    <>
      <ChartFrame height={240} label={t("FAQs por número de visitas")}>
        <Treemap
          data={data}
          dataKey="value"
          nameKey="label"
          content={FaqCell}
          nodeGap={4}
          isAnimationActive={false}
        >
          <Tooltip content={EditorialTooltip} isAnimationActive={false} />
        </Treemap>
      </ChartFrame>
      <ChartValues data={data} />
    </>
  );
}

export function PredictionChart({ series }: { series: HourlyPoint[] }) {
  const { t, locale } = useTranslations();
  const [selectedHour, setSelectedHour] = useState(0);
  const [exploring, setExploring] = useState(false);
  const hourId = useId();
  const index = Math.min(selectedHour, series.length - 1);
  const selected = series[index];
  if (!selected) return <p>{t("No hay valores para este periodo.")}</p>;
  return (
    <div>
      <div className={styles.plotLegend}>
        <span>
          <i aria-hidden="true" />
          {t("Visitas observadas")}</span>
        <span>
          <i aria-hidden="true" />
          {t("Modelo seleccionado")}</span>
      </div>
      <ChartFrame
        height={340}
        label={t("Comparación de visitas por hora y predicción del modelo seleccionado")}
      >
        <LineChart
          data={series}
          margin={{ top: 12, right: 12, bottom: 8, left: 0 }}
          accessibilityLayer
        >
          <XAxis hide dataKey="date" />
          <CartesianGrid
            vertical={false}
            stroke="var(--line)"
            strokeDasharray="3 4"
          />
          <YAxis
            {...axisStyle}
            domain={[0, "auto"]}
            tickCount={4}
            tickFormatter={(value: number) => compactCount(value, locale)}
            width={46}
          />
          <Tooltip
            content={EditorialTooltip}
            labelFormatter={(label) => `${formatMoment(String(label), locale)} UTC`}
            cursor={{ stroke: "var(--muted)", strokeDasharray: "2 4" }}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="visits"
            name={t("Visitas observadas")}
            stroke="var(--signal)"
            strokeWidth={1.8}
            dot={false}
            activeDot={{ r: 4, fill: "var(--signal)", stroke: "var(--canvas)" }}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="prediction"
            name={t("Modelo seleccionado")}
            stroke="var(--muted)"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            dot={false}
            activeDot={{ r: 4, fill: "var(--muted)", stroke: "var(--canvas)" }}
            isAnimationActive={false}
          />
          {exploring && (
            <ReferenceDot
              x={selected.date}
              y={selected.visits}
              r={4}
              fill="var(--signal)"
              stroke="var(--canvas)"
            />
          )}
        </LineChart>
      </ChartFrame>
      <div className={styles.plotDates}>
        <span>{t(formatMoment(series[0].date, locale))}</span>
        <span>{t(formatMoment(series[series.length - 1].date, locale))}</span>
      </div>
      <details
        className={styles.pointExplorer}
        onToggle={(event) => setExploring(event.currentTarget.open)}
      >
        <summary>{t("Consultar valores por hora")}</summary>
        <label htmlFor={hourId}>{t("Hora consultada (UTC)")}</label>
        <input
          id={hourId}
          type="range"
          min="0"
          max={series.length - 1}
          value={index}
          onChange={(event) => setSelectedHour(Number(event.target.value))}
          aria-valuetext={t("{0}, visitas {1}, predicción {2}", [formatMoment(selected.date, locale), selected.visits, selected.prediction])}
        />
        <output htmlFor={hourId}>
          {t(formatMoment(selected.date, locale))}
          <br />
          {t("Visitas: ")}{t(formatCount(selected.visits, locale))} {t(" / Predicción:")}{t(" ")}
          {t(formatCount(selected.prediction, locale))}
        </output>
      </details>
    </div>
  );
}
