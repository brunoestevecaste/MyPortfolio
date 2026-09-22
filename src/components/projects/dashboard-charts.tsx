import { useState } from "react";
import {
  formatCount,
  formatMoment,
  type ChartDatum,
  type HourlyPoint,
} from "@/data/aepd-dashboard";
import styles from "./dashboard.module.css";

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

export function HorizontalBars({ data }: { data: ChartDatum[] }) {
  const sorted = [...data].sort((a, b) => b.value - a.value).slice(0, 6);
  const max = Math.max(...sorted.map((item) => item.value), 1);
  return (
    <ol className={styles.horizontalBars}>
      {sorted.map((item, index) => (
        <li
          key={item.label}
          title={`${item.label}: ${formatCount(item.value)}`}
        >
          <span className={styles.barLabel}>{item.label}</span>
          <div className={styles.barMeasure}>
            <span
              className={styles.horizontalBar}
              style={{
                width: `${(item.value / max) * 100}%`,
                background: chartColors[index],
              }}
            />
            <span className={styles.barValue}>{formatCount(item.value)}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function VerticalBars({ data }: { data: ChartDatum[] }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <ol className={styles.verticalBars}>
      {data.map((item, index) => (
        <li
          key={item.label}
          title={`${item.label}: ${formatCount(item.value)}`}
        >
          <div className={styles.columnSpace}>
            <span
              className={styles.column}
              style={{
                height: `${(item.value / max) * 78}%`,
                background: chartColors[index],
              }}
            >
              <span>{formatCount(item.value)}</span>
            </span>
          </div>
          <span className={styles.columnLabel}>{item.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function DownloadDonut({ data }: { data: ChartDatum[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className={styles.donutLayout}>
      <svg
        viewBox="0 0 160 160"
        role="img"
        aria-label={`Distribución de ${formatCount(total)} descargas por categoría`}
      >
        {data.map((item, index) => {
          const length = total ? (item.value / total) * 100 : 0;
          const start = total
            ? (data.slice(0, index).reduce((sum, part) => sum + part.value, 0) /
                total) *
              100
            : 0;
          return (
            <circle
              key={item.label}
              cx="80"
              cy="80"
              r="54"
              pathLength="100"
              fill="none"
              stroke={chartColors[index]}
              strokeWidth="30"
              strokeDasharray={`${length} ${100 - length}`}
              strokeDashoffset={-start}
              transform="rotate(-90 80 80)"
            >
              <title>{`${item.label}: ${formatCount(item.value)}`}</title>
            </circle>
          );
        })}
      </svg>
      <ul className={styles.donutLegend}>
        {data.map((item, index) => (
          <li key={item.label}>
            <i style={{ background: chartColors[index] }} aria-hidden="true" />
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

export function FaqTreemap({ data }: { data: ChartDatum[] }) {
  const first = data[0].value + data[1].value;
  const second = data[2].value + data[3].value;
  const third = data[4].value + data[5].value;
  return (
    <div
      className={styles.treemap}
      role="list"
      aria-label="FAQs por número de visitas"
      style={{ gridTemplateColumns: `${first}fr ${second}fr ${third}fr` }}
    >
      {[0, 2, 4].map((start) => (
        <div
          className={styles.treeGroup}
          key={start}
          style={{
            gridTemplateRows: `${data[start].value}fr ${data[start + 1].value}fr`,
          }}
        >
          {data.slice(start, start + 2).map((item, index) => (
            <div
              role="listitem"
              className={styles.treeCell}
              key={item.label}
              style={{ background: chartColors[start + index] }}
              title={`${item.label}: ${formatCount(item.value)}`}
            >
              <span>{item.label}</span>
              <strong>{formatCount(item.value)}</strong>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function PredictionChart({ series }: { series: HourlyPoint[] }) {
  const [selectedHour, setSelectedHour] = useState(0);
  const index = Math.min(selectedHour, series.length - 1);
  const selected = series[index];
  const max =
    Math.ceil(
      Math.max(
        ...series.map((point) => Math.max(point.visits, point.prediction)),
      ) / 100,
    ) * 100;
  const x = (i: number) => 8 + (i / Math.max(series.length - 1, 1)) * 584;
  const y = (value: number) => 192 - (value / max) * 178;
  const line = (key: "visits" | "prediction") =>
    series
      .map((point, i) => `${x(i).toFixed(2)},${y(point[key]).toFixed(2)}`)
      .join(" ");
  return (
    <div className={styles.predictionChart}>
      <div className={styles.plotLegend}>
        <span>
          <i />
          Visitas observadas
        </span>
        <span>
          <i />
          Modelo seleccionado
        </span>
      </div>
      <div className={styles.forecastPlot}>
        <div className={styles.plotAxis} aria-hidden="true">
          <span>{formatCount(max)}</span>
          <span>{formatCount(max / 2)}</span>
          <span>0</span>
        </div>
        <svg
          viewBox="0 0 600 204"
          role="img"
          aria-label="Comparación de visitas por hora y predicción del modelo seleccionado. Los valores se pueden consultar debajo del gráfico."
        >
          <polygon
            points={`8,192 ${line("visits")} 592,192`}
            fill="var(--signal)"
            fillOpacity="0.15"
          />
          <polygon
            points={`8,192 ${line("prediction")} 592,192`}
            fill="var(--muted)"
            fillOpacity="0.1"
          />
          <polyline
            points={line("visits")}
            stroke="var(--signal)"
            fill="none"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={line("prediction")}
            stroke="var(--ink)"
            fill="none"
            strokeWidth="1.6"
            strokeDasharray="5 3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className={styles.plotDates}>
        <span>{formatMoment(series[0].date)}</span>
        <span>{formatMoment(series[series.length - 1].date)}</span>
      </div>
      <details className={styles.pointExplorer}>
        <summary>Consultar valores por hora</summary>
        <label htmlFor="dashboard-hour">Hora consultada (UTC)</label>
        <input
          id="dashboard-hour"
          type="range"
          min="0"
          max={series.length - 1}
          value={index}
          onChange={(event) => setSelectedHour(Number(event.target.value))}
          aria-valuetext={`${formatMoment(selected.date)}, visitas ${selected.visits}, predicción ${selected.prediction}`}
        />
        <output htmlFor="dashboard-hour">
          {formatMoment(selected.date)}
          <br />
          Visitas: {formatCount(selected.visits)} / Predicción:{" "}
          {formatCount(selected.prediction)}
        </output>
      </details>
    </div>
  );
}
