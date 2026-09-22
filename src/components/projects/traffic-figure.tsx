"use client";

import { Line, LineChart, YAxis } from "recharts";
import { illustrativeTraffic } from "@/data/projects";
import { ChartFrame } from "@/components/charts/editorial-chart";

export function TrafficPlot() {
  return (
    <ChartFrame
      height={240}
      label="La actividad aumenta por la mañana y baja al final del día. La estimación sigue una evolución similar, con diferencias puntuales."
    >
      <LineChart
        data={illustrativeTraffic}
        margin={{ top: 30, right: 4, bottom: 24, left: 4 }}
        accessibilityLayer={false}
      >
        <YAxis hide domain={[0, 500]} />
        <Line
          type="linear"
          dataKey="visits"
          stroke="var(--signal)"
          strokeWidth={2.5}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
        <Line
          type="linear"
          dataKey="estimate"
          stroke="var(--muted)"
          strokeWidth={1.5}
          strokeDasharray="6 5"
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartFrame>
  );
}
