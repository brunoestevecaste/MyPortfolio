import { illustrativeTraffic } from "@/data/projects";
import styles from "./projects.module.css";

function linePoints(key: "visits" | "estimate") {
  return illustrativeTraffic
    .map((point, index) => `${20 + index * 60},${210 - point[key] * 0.38}`)
    .join(" ");
}

export function TrafficPlot() {
  return (
    <svg
      viewBox="0 0 700 240"
      className={styles.plot}
      role="img"
      aria-label="La actividad aumenta por la mañana y baja al final del día. La estimación sigue una evolución similar, con diferencias puntuales."
    >
      <polyline
        points={linePoints("visits")}
        fill="none"
        stroke="var(--signal)"
        strokeWidth="3"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <polyline
        points={linePoints("estimate")}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeDasharray="7 6"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
