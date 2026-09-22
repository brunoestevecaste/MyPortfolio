"use client";

import { useId, useState } from "react";
import {
  Bar,
  BarChart,
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
      {payload?.value}
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
      {payload?.value}
    </Text>
  );
}

export function HorizontalBars({ data }: { data: ChartDatum[] }) {
  const sorted = [...data].sort((a, b) => b.value - a.value).slice(0, 6);
  return (
    <>
      <ChartFrame height={264} label="Comparación por tipo de solicitud">
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
            name="Total"
            fill="var(--signal)"
            barSize={14}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="value"
              position="right"
              offset={8}
              fill="var(--ink)"
              fontSize={12}
              formatter={(value) => formatCount(Number(value))}
            />
          </Bar>
        </BarChart>
      </ChartFrame>
      <ChartValues data={sorted} />
    </>
  );
}

export function VerticalBars({ data }: { data: ChartDatum[] }) {
  return (
    <>
      <ChartFrame height={240} label="Visitas por contenido">
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
            name="Visitas"
            fill="var(--signal)"
            maxBarSize={32}
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
  const colored = data.map((item, index) => ({
    ...item,
    fill: chartColors[index % chartColors.length],
  }));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className={styles.donutLayout}>
      <ChartFrame
        height={208}
        label={`Distribución de ${formatCount(total)} descargas por categoría`}
      >
        <PieChart accessibilityLayer>
          <Pie
            data={colored}
            dataKey="value"
            nameKey="label"
            innerRadius="62%"
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
              {item.label}
              <strong>{formatCount(item.value)}</strong>
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
      <title>{`${name}: ${formatCount(value)}`}</title>
      {width >= 64 && height >= 58 && (
        <text x={x + 10} y={y + 23} fill="var(--on-signal)" fontSize={12}>
          <tspan>{name}</tspan>
          <tspan x={x + 10} y={y + height - 13}>
            {compactCount(value)}
          </tspan>
        </text>
      )}
    </g>
  );
}

export function FaqTreemap({ data }: { data: ChartDatum[] }) {
  return (
    <>
      <ChartFrame height={240} label="FAQs por número de visitas">
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
  const [selectedHour, setSelectedHour] = useState(0);
  const [exploring, setExploring] = useState(false);
  const hourId = useId();
  const index = Math.min(selectedHour, series.length - 1);
  const selected = series[index];
  if (!selected) return <p>No hay valores para este periodo.</p>;
  return (
    <div>
      <div className={styles.plotLegend}>
        <span>
          <i aria-hidden="true" />
          Visitas observadas
        </span>
        <span>
          <i aria-hidden="true" />
          Modelo seleccionado
        </span>
      </div>
      <ChartFrame
        height={280}
        label="Comparación de visitas por hora y predicción del modelo seleccionado"
      >
        <LineChart
          data={series}
          margin={{ top: 12, right: 12, bottom: 8, left: 0 }}
          accessibilityLayer
        >
          <XAxis hide dataKey="date" />
          <YAxis
            {...axisStyle}
            domain={[0, "auto"]}
            tickCount={4}
            tickFormatter={compactCount}
            width={46}
          />
          <Tooltip
            content={EditorialTooltip}
            labelFormatter={(label) => `${formatMoment(String(label))} UTC`}
            cursor={{ stroke: "var(--muted)", strokeDasharray: "2 4" }}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="visits"
            name="Visitas observadas"
            stroke="var(--signal)"
            strokeWidth={1.8}
            dot={false}
            activeDot={{ r: 4, fill: "var(--signal)", stroke: "var(--canvas)" }}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="prediction"
            name="Modelo seleccionado"
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
        <span>{formatMoment(series[0].date)}</span>
        <span>{formatMoment(series[series.length - 1].date)}</span>
      </div>
      <details
        className={styles.pointExplorer}
        onToggle={(event) => setExploring(event.currentTarget.open)}
      >
        <summary>Consultar valores por hora</summary>
        <label htmlFor={hourId}>Hora consultada (UTC)</label>
        <input
          id={hourId}
          type="range"
          min="0"
          max={series.length - 1}
          value={index}
          onChange={(event) => setSelectedHour(Number(event.target.value))}
          aria-valuetext={`${formatMoment(selected.date)}, visitas ${selected.visits}, predicción ${selected.prediction}`}
        />
        <output htmlFor={hourId}>
          {formatMoment(selected.date)}
          <br />
          Visitas: {formatCount(selected.visits)} / Predicción:{" "}
          {formatCount(selected.prediction)}
        </output>
      </details>
    </div>
  );
}
