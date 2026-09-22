"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  type EnergyPoint,
  type SpeedPoint,
  type TelemetryPoint,
} from "@/data/balearia-dashboard";
import {
  axisStyle,
  ChartFrame,
  EditorialTooltip,
} from "@/components/charts/editorial-chart";
import styles from "./balearia-dashboard.module.css";

function ChartLegend({
  items,
}: {
  items: readonly { label: string; className: string }[];
}) {
  return (
    <div className={styles.chartLegend} aria-label="Leyenda del gráfico">
      {items.map((item) => (
        <span key={item.label}>
          <i className={item.className} aria-hidden="true" />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function SpeedProfileChart({ data }: { data: SpeedPoint[] }) {
  return (
    <>
      <ChartLegend
        items={[
          { label: "Perfil observado", className: styles.lineSolid },
          { label: "Perfil recomendado", className: styles.lineDashed },
        ]}
      />
      <ChartFrame
        height={320}
        label="Comparación de velocidad observada y recomendada por tramo"
      >
        <LineChart
          data={data}
          margin={{ top: 12, right: 12, bottom: 8, left: 0 }}
          accessibilityLayer
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--line)"
            strokeDasharray="3 4"
          />
          <XAxis {...axisStyle} dataKey="segment" interval={0} />
          <YAxis
            {...axisStyle}
            domain={[12, 19]}
            width={44}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            content={(props) => <EditorialTooltip {...props} unit=" kn" />}
            cursor={{ stroke: "var(--muted)", strokeDasharray: "2 4" }}
            isAnimationActive={false}
          />
          <Line
            type="stepAfter"
            dataKey="observed"
            name="Observada"
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "var(--chart-1)", stroke: "var(--canvas)" }}
            isAnimationActive={false}
          />
          <Line
            type="stepAfter"
            dataKey="recommended"
            name="Recomendada"
            stroke="var(--chart-3)"
            strokeWidth={1.75}
            strokeDasharray="6 4"
            dot={false}
            activeDot={{ r: 4, fill: "var(--chart-3)", stroke: "var(--canvas)" }}
            isAnimationActive={false}
          />
        </LineChart>
      </ChartFrame>
    </>
  );
}

export function EnergySeriesChart({ data }: { data: EnergyPoint[] }) {
  return (
    <>
      <ChartLegend
        items={[
          { label: "Propulsión", className: styles.lineSolid },
          { label: "Auxiliares", className: styles.lineMedium },
          { label: "Generación de eje", className: styles.lineDotted },
        ]}
      />
      <ChartFrame height={280} label="Energía acumulada por sistema y hora">
        <LineChart
          data={data}
          margin={{ top: 12, right: 12, bottom: 8, left: 0 }}
          accessibilityLayer
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--line)"
            strokeDasharray="3 4"
          />
          <XAxis {...axisStyle} dataKey="time" interval={1} />
          <YAxis {...axisStyle} width={46} domain={[0, "auto"]} />
          <Tooltip
            content={(props) => <EditorialTooltip {...props} unit=" MWh" />}
            cursor={{ stroke: "var(--muted)", strokeDasharray: "2 4" }}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="propulsion"
            name="Propulsión"
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="auxiliary"
            name="Auxiliares"
            stroke="var(--chart-3)"
            strokeWidth={1.75}
            strokeDasharray="6 4"
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="shaft"
            name="Generación de eje"
            stroke="var(--chart-5)"
            strokeWidth={1.5}
            strokeDasharray="2 4"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ChartFrame>
    </>
  );
}

export function TelemetryChart({ data }: { data: TelemetryPoint[] }) {
  return (
    <>
      <ChartLegend
        items={[
          { label: "Propulsión", className: styles.lineSolid },
          { label: "Auxiliares", className: styles.lineDashed },
        ]}
      />
      <ChartFrame height={286} label="Potencia simulada por sistema y hora">
        <LineChart
          data={data}
          margin={{ top: 12, right: 12, bottom: 8, left: 0 }}
          accessibilityLayer
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--line)"
            strokeDasharray="3 4"
          />
          <XAxis {...axisStyle} dataKey="time" interval={1} />
          <YAxis {...axisStyle} width={42} domain={[0, "auto"]} />
          <Tooltip
            content={(props) => <EditorialTooltip {...props} unit=" MW" />}
            cursor={{ stroke: "var(--muted)", strokeDasharray: "2 4" }}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="propulsion"
            name="Propulsión"
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="auxiliary"
            name="Auxiliares"
            stroke="var(--chart-3)"
            strokeWidth={1.75}
            strokeDasharray="6 4"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ChartFrame>
    </>
  );
}
