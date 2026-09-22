// Synthetic demonstration data created for this portfolio.
// It does not reproduce Baleària vessels, routes, records, thresholds or results.

export type DashboardView = "operations" | "crew";

export type SpeedPoint = {
  segment: string;
  observed: number;
  recommended: number;
};

export type EnergyPoint = {
  time: string;
  propulsion: number;
  auxiliary: number;
  shaft: number;
};

export type TelemetryPoint = {
  time: string;
  propulsion: number;
  auxiliary: number;
};

export type SensorReading = {
  system: string;
  reading: string;
  reference: string;
  state: "Estable" | "Atención";
};

export type BaleariaDashboardVoyage = {
  id: string;
  vesselId: string;
  vessel: string;
  date: string;
  route: string;
  origin: string;
  destination: string;
  distanceNm: number;
  averageSpeedKn: number;
  durationMinutes: number;
  energyMwh: number;
  etaMarginMinutes: number;
  progress: number;
  beaufort: number;
  douglas: number;
  windKn: number;
  swellM: number;
  model: string;
  recommendation: {
    action: string;
    currentSpeedKn: number;
    recommendedSpeedKn: number;
    estimatedEnergyMwh: number;
    confidence: "Alta" | "Media";
    reason: string;
  };
  speedProfile: SpeedPoint[];
  energySeries: EnergyPoint[];
  telemetry: TelemetryPoint[];
  sensors: SensorReading[];
  crewCount: number;
};

const segments = ["Salida", "T1", "T2", "T3", "T4", "T5", "T6", "Llegada"];
const progressRatios = [0, 0.12, 0.25, 0.39, 0.53, 0.68, 0.84, 1];

type VoyageSpec = Omit<
  BaleariaDashboardVoyage,
  "speedProfile" | "energySeries" | "telemetry" | "sensors"
> & {
  observedSpeeds: readonly number[];
  recommendedSpeeds: readonly number[];
  seed: number;
};

function buildVoyage(spec: VoyageSpec): BaleariaDashboardVoyage {
  const speedProfile = segments.map((segment, index) => ({
    segment,
    observed: spec.observedSpeeds[index],
    recommended: spec.recommendedSpeeds[index],
  }));

  const energySeries = progressRatios.map((ratio, index) => ({
    time: `${String(9 + index).padStart(2, "0")}:00`,
    propulsion: Number((spec.energyMwh * 0.76 * ratio).toFixed(1)),
    auxiliary: Number((spec.energyMwh * 0.14 * ratio).toFixed(1)),
    shaft: Number((spec.energyMwh * 0.1 * ratio).toFixed(1)),
  }));

  const telemetry = segments.map((_, index) => ({
    time: `${String(9 + index).padStart(2, "0")}:00`,
    propulsion: Number(
      (4.2 + spec.seed * 0.18 + spec.observedSpeeds[index] * 0.16).toFixed(1),
    ),
    auxiliary: Number(
      (1.25 + 0.12 * Math.sin(index * 0.9 + spec.seed)).toFixed(1),
    ),
  }));

  const sensors: SensorReading[] = [
    {
      system: "Propulsión principal",
      reading: `${telemetry[4].propulsion.toFixed(1)} MW`,
      reference: "Lectura media simulada",
      state: "Estable",
    },
    {
      system: "Sistemas auxiliares",
      reading: `${telemetry[4].auxiliary.toFixed(1)} MW`,
      reference: "Lectura media simulada",
      state: "Estable",
    },
    {
      system: "Temperatura de escape",
      reading: `${Math.round(318 + spec.seed * 7)} °C`,
      reference: "Rango ilustrativo",
      state: spec.seed === 2 ? "Atención" : "Estable",
    },
    {
      system: "Presión de lubricación",
      reading: `${(4.5 + spec.seed * 0.1).toFixed(1)} bar`,
      reference: "Rango ilustrativo",
      state: "Estable",
    },
  ];

  return {
    ...spec,
    speedProfile,
    energySeries,
    telemetry,
    sensors,
  };
}

export const baleariaDashboardVoyages = [
  buildVoyage({
    id: "demo-01-a",
    vesselId: "unit-01",
    vessel: "Unidad 01",
    date: "14 may 2026",
    route: "Ruta sintética A",
    origin: "Puerto A",
    destination: "Puerto B",
    distanceNm: 126.4,
    averageSpeedKn: 16.2,
    durationMinutes: 466,
    energyMwh: 92.8,
    etaMarginMinutes: 18,
    progress: 68,
    beaufort: 3,
    douglas: 3,
    windKn: 12,
    swellM: 1.2,
    model: "energy-demo-03",
    recommendation: {
      action: "Ajustar velocidad",
      currentSpeedKn: 16.8,
      recommendedSpeedKn: 16.1,
      estimatedEnergyMwh: 89.6,
      confidence: "Alta",
      reason: "El margen de llegada admite un perfil más estable en los tramos centrales.",
    },
    observedSpeeds: [14.8, 16.1, 16.7, 17.2, 16.8, 16.5, 15.9, 13.6],
    recommendedSpeeds: [14.8, 15.6, 15.9, 16.1, 16.1, 16.3, 16.6, 13.6],
    crewCount: 27,
    seed: 1,
  }),
  buildVoyage({
    id: "demo-01-b",
    vesselId: "unit-01",
    vessel: "Unidad 01",
    date: "21 may 2026",
    route: "Ruta sintética B",
    origin: "Puerto C",
    destination: "Puerto A",
    distanceNm: 134.1,
    averageSpeedKn: 15.8,
    durationMinutes: 509,
    energyMwh: 98.4,
    etaMarginMinutes: 11,
    progress: 43,
    beaufort: 4,
    douglas: 4,
    windKn: 20,
    swellM: 2.4,
    model: "energy-demo-03",
    recommendation: {
      action: "Mantener plan",
      currentSpeedKn: 15.7,
      recommendedSpeedKn: 15.7,
      estimatedEnergyMwh: 97.9,
      confidence: "Media",
      reason: "El margen de llegada es limitado y el perfil actual permanece dentro del dominio evaluado.",
    },
    observedSpeeds: [13.9, 15.2, 15.8, 16.2, 16.4, 16.1, 15.6, 13.2],
    recommendedSpeeds: [13.9, 15.1, 15.7, 16, 16.2, 16.2, 15.8, 13.2],
    crewCount: 25,
    seed: 2,
  }),
  buildVoyage({
    id: "demo-02-a",
    vesselId: "unit-02",
    vessel: "Unidad 02",
    date: "29 may 2026",
    route: "Ruta sintética C",
    origin: "Puerto B",
    destination: "Puerto D",
    distanceNm: 112.7,
    averageSpeedKn: 17.1,
    durationMinutes: 393,
    energyMwh: 84.7,
    etaMarginMinutes: 24,
    progress: 81,
    beaufort: 2,
    douglas: 2,
    windKn: 7,
    swellM: 0.7,
    model: "energy-demo-04",
    recommendation: {
      action: "Ajustar velocidad",
      currentSpeedKn: 17.4,
      recommendedSpeedKn: 16.6,
      estimatedEnergyMwh: 81.9,
      confidence: "Alta",
      reason: "Las condiciones simuladas permiten suavizar el perfil sin comprometer la llegada.",
    },
    observedSpeeds: [15.2, 16.8, 17.6, 17.9, 17.5, 17.1, 16.7, 14.4],
    recommendedSpeeds: [15.2, 16.3, 16.6, 16.7, 16.7, 16.8, 17, 14.4],
    crewCount: 29,
    seed: 3,
  }),
] as const;

export const baleariaDashboardVessels = [
  { id: "unit-01", label: "Unidad 01" },
  { id: "unit-02", label: "Unidad 02" },
] as const;

export const formatDashboardNumber = (value: number, digits = 1) =>
  new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);

export function formatDashboardDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return `${hours} h ${String(remaining).padStart(2, "0")} min`;
}
