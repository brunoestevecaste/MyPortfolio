"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { axisStyle, ChartFrame } from "./editorial-chart";

const performanceData = [
  { name: "Tokens", inicial: 100, optimizado: 60 },
  { name: "Latencia", inicial: 100, optimizado: 55 },
  { name: "Fiabilidad", inicial: 63, optimizado: 100 },
];

export function AlinaPlot() {
  return (
    <ChartFrame
      height={240}
      label="Comparativa de eficiencia relativa entre prompt monolítico y arquitectura desacoplada en dos fases"
    >
      <BarChart
        data={performanceData}
        margin={{ top: 24, right: 12, bottom: 8, left: -20 }}
        barGap={4}
        barCategoryGap="25%"
        accessibilityLayer={false}
      >
        <XAxis
          {...axisStyle}
          dataKey="name"
        />
        <YAxis
          {...axisStyle}
          domain={[0, 110]}
          ticks={[0, 50, 100]}
          tickFormatter={(val) => `${val}%`}
          width={45}
        />
        <Bar
          dataKey="inicial"
          fill="var(--muted)"
          radius={[2, 2, 0, 0]}
          isAnimationActive={false}
        />
        <Bar
          dataKey="optimizado"
          fill="var(--signal)"
          radius={[2, 2, 0, 0]}
          isAnimationActive={false}
        />
      </BarChart>
    </ChartFrame>
  );
}
