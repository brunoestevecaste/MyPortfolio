"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { axisStyle, ChartFrame } from "./editorial-chart";

const clusterDiscoveryData = [
  { tier: "Propio", peso: 100, afinidad: 94 },
  { tier: "Vecino 1", peso: 60, afinidad: 78 },
  { tier: "Vecino 2", peso: 40, afinidad: 62 },
  { tier: "Vecino 3", peso: 25, afinidad: 45 },
];

export function NextPlanPlot() {
  return (
    <ChartFrame
      height={240}
      label="Ponderación y afinidad de eventos por nivel de proximidad de clúster K-Means"
    >
      <BarChart
        data={clusterDiscoveryData}
        margin={{ top: 24, right: 12, bottom: 8, left: -20 }}
        barGap={4}
        barCategoryGap="25%"
        accessibilityLayer={false}
      >
        <XAxis
          {...axisStyle}
          dataKey="tier"
        />
        <YAxis
          {...axisStyle}
          domain={[0, 110]}
          ticks={[0, 50, 100]}
          tickFormatter={(val) => `${val}%`}
          width={45}
        />
        <Bar
          dataKey="afinidad"
          name="Afinidad observada"
          fill="var(--muted)"
          radius={[2, 2, 0, 0]}
          isAnimationActive={false}
        />
        <Bar
          dataKey="peso"
          name="Peso de recomendación"
          fill="var(--signal)"
          radius={[2, 2, 0, 0]}
          isAnimationActive={false}
        />
      </BarChart>
    </ChartFrame>
  );
}
