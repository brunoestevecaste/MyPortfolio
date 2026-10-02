export const aepdTools = [
  "PostgreSQL",
  "Python",
  "Pentaho",
  "Power BI",
  "Docker",
  "Git",
] as const;

export const aepdSource = {
  kicker: "Única fuente de datos",
  title: "Logs de servidores web",
  description:
    "Archivos brutos de acceso HTTP (W3C / Apache) generados por los servidores de la sede electrónica de la AEPD: peticiones en crudo con tráfico ciudadano, robots y recursos técnicos.",
} as const;

export const aepdDataUses = [
  {
    title: "Análisis descriptivo y BI",
    service: "Power BI / DAX",
    action: "Explorar trámites, procedencia y patrones",
    outcome: "Cuadros de mando ejecutivos",
    audience: "Dirección y responsables AEPD",
  },
  {
    title: "Modelado predictivo",
    service: "Python / XGBoost",
    action: "Predecir visitas horarias con backtesting",
    outcome: "Previsiones temporales a 24h",
    audience: "Planificación de sistemas e IT",
  },
] as const;

// Invented from scratch. The estimates are illustrative.
export const illustrativeTraffic = [
  { hour: "00:00", visits: 84, estimate: 96 },
  { hour: "02:00", visits: 62, estimate: 78 },
  { hour: "04:00", visits: 71, estimate: 82 },
  { hour: "06:00", visits: 143, estimate: 156 },
  { hour: "08:00", visits: 318, estimate: 284 },
  { hour: "10:00", visits: 462, estimate: 425 },
  { hour: "12:00", visits: 387, estimate: 412 },
  { hour: "14:00", visits: 294, estimate: 318 },
  { hour: "16:00", visits: 356, estimate: 331 },
  { hour: "18:00", visits: 248, estimate: 269 },
  { hour: "20:00", visits: 176, estimate: 194 },
  { hour: "22:00", visits: 112, estimate: 128 },
] as const;
