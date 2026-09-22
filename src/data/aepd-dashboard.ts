// Synthetic demo generated independently of all AEPD documents and records.
// These deterministic series illustrate the UI; they are not trained model outputs.
export const dashboardPeriod = { start: "2026-02-01", end: "2026-02-28" };
export const countries = ["España", "Francia", "Portugal"] as const;
export const models = [
  "XGBoost",
  "LightGBM",
  "HistGradientBoosting",
  "Baseline",
] as const;
export type ForecastModel = (typeof models)[number];
export type DashboardFilters = {
  country: string;
  start: string;
  end: string;
  model: ForecastModel;
};
export type ChartDatum = { label: string; value: number };
export type HourlyPoint = { date: string; visits: number; prediction: number };

const requestTypes = [
  "Información general",
  "Recursos educativos",
  "Consultas",
  "Formación",
  "Actualidad",
  "Servicios digitales",
  "Documentación",
  "Ayuda",
] as const;
const hourPattern = [
  0.22, 0.17, 0.14, 0.13, 0.16, 0.23, 0.36, 0.58, 0.84, 1.09, 1.23, 1.16, 1.08,
  0.94, 0.82, 0.9, 0.95, 0.81, 0.65, 0.54, 0.45, 0.38, 0.32, 0.27,
];
const records = Array.from({ length: 28 * 24 }, (_, index) => {
  const day = Math.floor(index / 24) + 1;
  const hour = index % 24;
  const date = `2026-02-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:00:00Z`;
  const weekday = new Date(date).getUTCDay();
  return {
    date,
    traffic: countries.map((_, country) => {
      const pulse =
        1 + 0.13 * Math.sin(day * 1.7 + country) + 0.06 * Math.cos(index * 2.1);
      return Math.round(
        (country === 0 ? 740 : country === 1 ? 190 : 125) *
          hourPattern[hour] *
          (weekday === 0 || weekday === 6 ? 0.57 : 1) *
          pulse,
      );
    }),
  };
});

// Largest-remainder allocation keeps chart totals and KPI totals identical.
function distribute(total: number, weights: readonly number[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  const exact = weights.map((weight) => (total * weight) / sum);
  const result = exact.map(Math.floor);
  const remaining = total - result.reduce((a, b) => a + b, 0);
  const order = exact
    .map((value, index) => ({ index, fraction: value - result[index] }))
    .sort((a, b) => b.fraction - a.fraction);
  for (let i = 0; i < remaining; i++) result[order[i].index]++;
  return result;
}

export function getDashboardData(filters: DashboardFilters) {
  const countryIndex = countries.findIndex(
    (country) => country === filters.country,
  );
  const countryFactor = countryIndex < 0 ? 0 : countryIndex + 1;
  const series: HourlyPoint[] = records
    .filter((record) => {
      const day = record.date.slice(0, 10);
      return day >= filters.start && day <= filters.end;
    })
    .map((record) => {
      const visits =
        countryIndex < 0
          ? record.traffic.reduce((a, b) => a + b, 0)
          : record.traffic[countryIndex];
      const modelError = {
        XGBoost: 0.075,
        LightGBM: 0.13,
        HistGradientBoosting: 0.095,
        Baseline: 0.27,
      }[filters.model];
      const bias = filters.model === "Baseline" ? 0.1 : 0.025;
      const hourIndex =
        (Date.parse(record.date) -
          Date.parse(`${dashboardPeriod.start}T00:00:00Z`)) /
        3_600_000;
      return {
        date: record.date,
        visits,
        prediction: Math.max(
          1,
          Math.round(
            visits *
              (1 +
                bias +
                modelError * Math.sin(hourIndex * 0.37 + countryFactor)),
          ),
        ),
      };
    });
  const visits = series.reduce((sum, point) => sum + point.visits, 0);
  const weights = requestTypes.map(
    (_, index) =>
      (11 - index) *
      (1 +
        0.22 *
          Math.sin(
            index * 1.4 + countryFactor + Number(filters.start.slice(-2)),
          )),
  );
  const counts = distribute(visits, weights);
  const requests = requestTypes.map((label, index) => ({
    label,
    visits: counts[index],
    unique: Math.round(counts[index] * (0.64 + (index % 3) * 0.06)),
  }));
  const unique = requests.reduce((sum, request) => sum + request.unique, 0);
  const downloads = Math.round(visits * (0.19 + countryFactor * 0.013));
  const downloadValues = distribute(downloads, [67, 24 + countryFactor, 9]);
  const error = series.reduce(
    (sum, point) => {
      const difference = point.visits - point.prediction;
      return {
        absolute: sum.absolute + Math.abs(difference),
        squared: sum.squared + difference ** 2,
        percentage: sum.percentage + Math.abs(difference) / point.visits,
      };
    },
    { absolute: 0, squared: 0, percentage: 0 },
  );
  const topContent = (prefix: string, fraction: number): ChartDatum[] =>
    distribute(Math.round(visits * fraction), [
      32 + countryFactor,
      21,
      16,
      13,
      10,
      8,
    ]).map((value, index) => ({
      label: `${prefix} ${String(index + 1).padStart(2, "0")}`,
      value,
    }));
  return {
    visits,
    unique,
    downloads,
    requests,
    series,
    downloadCategories: ["Guías", "Infografías", "Memorias"].map(
      (label, index) => ({ label, value: downloadValues[index] }),
    ),
    blogs: topContent("Blog", 0.18),
    faqs: topContent("FAQ", 0.15),
    press: topContent("Nota", 0.12),
    metrics: {
      mae: series.length ? error.absolute / series.length : 0,
      rmse: series.length ? Math.sqrt(error.squared / series.length) : 0,
      mape: series.length ? (error.percentage / series.length) * 100 : 0,
    },
  };
}

export const formatCount = (value: number) =>
  new Intl.NumberFormat("es-ES", { useGrouping: true }).format(value);
export const formatMetric = (value: number) =>
  new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
export const formatMoment = (date: string) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(date));
