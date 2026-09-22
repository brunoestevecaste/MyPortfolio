"use client";

import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { illustrativeNavigation } from "@/data/balearia";
import { axisStyle, ChartFrame, EditorialTooltip } from "./editorial-chart";

// Append the end of F so every step occupies its full 12-mile segment.
const profile = [
  ...illustrativeNavigation.map((segment, index) => ({
    ...segment,
    position: index,
  })),
  {
    ...illustrativeNavigation[illustrativeNavigation.length - 1],
    position: illustrativeNavigation.length,
  },
];
const midpoints = illustrativeNavigation.map((_, index) => index + 0.5);

export function NavigationPlot({
  interactive = false,
}: {
  interactive?: boolean;
}) {
  return (
    <ChartFrame
      height={240}
      label="Velocidad en nudos por tramo, perfiles de referencia y propuesta"
    >
      <LineChart
        data={profile}
        margin={{ top: 24, right: 12, bottom: 8, left: 0 }}
        accessibilityLayer={interactive}
      >
        <XAxis
          {...axisStyle}
          type="number"
          dataKey="position"
          domain={[0, 6]}
          ticks={midpoints}
          tickFormatter={(value: number) =>
            illustrativeNavigation[Math.floor(value)]?.segment ?? ""
          }
        />
        <YAxis
          {...axisStyle}
          domain={[14, 18]}
          ticks={[14, 16, 18]}
          width={32}
        />
        {interactive && (
          <Tooltip
            content={(props) => <EditorialTooltip {...props} unit=" kn" />}
            labelFormatter={(value) =>
              `Tramo ${illustrativeNavigation[Math.min(Math.floor(Number(value)), 5)].segment}`
            }
            cursor={false}
            isAnimationActive={false}
          />
        )}
        <Line
          type="stepAfter"
          dataKey="reference"
          name="Referencia"
          stroke="var(--muted)"
          strokeWidth={1.5}
          strokeDasharray="6 5"
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
        <Line
          type="stepAfter"
          dataKey="proposal"
          name="Propuesta"
          stroke="var(--signal)"
          strokeWidth={2.5}
          dot={false}
          activeDot={interactive ? { r: 4 } : false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartFrame>
  );
}
