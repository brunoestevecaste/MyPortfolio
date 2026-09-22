"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  baleariaDashboardVessels,
  baleariaDashboardVoyages,
  formatDashboardDuration,
  formatDashboardNumber,
  type BaleariaDashboardVoyage,
  type DashboardView,
} from "@/data/balearia-dashboard";
import {
  EnergySeriesChart,
  SpeedProfileChart,
  TelemetryChart,
} from "./balearia-dashboard-charts";
import styles from "./balearia-dashboard.module.css";

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`${styles.panel} ${className}`} aria-label={title}>
      <h4>{title}</h4>
      {children}
    </section>
  );
}

function ValuesTable({ voyage }: { voyage: BaleariaDashboardVoyage }) {
  return (
    <details className={styles.values}>
      <summary>Consultar velocidades por tramo</summary>
      <table>
        <caption className="sr-only">
          Velocidad observada y recomendada por tramo
        </caption>
        <thead>
          <tr>
            <th scope="col">Tramo</th>
            <th scope="col">Observada</th>
            <th scope="col">Recomendada</th>
          </tr>
        </thead>
        <tbody>
          {voyage.speedProfile.map((point) => (
            <tr key={point.segment}>
              <th scope="row">{point.segment}</th>
              <td>{formatDashboardNumber(point.observed)} kn</td>
              <td>{formatDashboardNumber(point.recommended)} kn</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

function Recommendation({
  voyage,
  compact = false,
}: {
  voyage: BaleariaDashboardVoyage;
  compact?: boolean;
}) {
  const recommendation = voyage.recommendation;
  return (
    <div className={styles.recommendation}>
      <div className={styles.recommendationHeader}>
        <div>
          <span>Modelo de demostración</span>
          <strong>{voyage.model}</strong>
        </div>
        <p>{recommendation.action}</p>
      </div>
      <dl className={styles.recommendationMetrics}>
        <div>
          <dt>Velocidad actual</dt>
          <dd>{formatDashboardNumber(recommendation.currentSpeedKn)} kn</dd>
        </div>
        <div>
          <dt>Velocidad recomendada</dt>
          <dd>{formatDashboardNumber(recommendation.recommendedSpeedKn)} kn</dd>
        </div>
        <div>
          <dt>Energía estimada</dt>
          <dd>{formatDashboardNumber(recommendation.estimatedEnergyMwh)} MWh</dd>
        </div>
        <div>
          <dt>Margen ETA</dt>
          <dd>{voyage.etaMarginMinutes} min</dd>
        </div>
      </dl>
      <div className={styles.recommendationNote}>
        <p>
          Confianza <strong>{recommendation.confidence}</strong>
        </p>
        {!compact ? <p>{recommendation.reason}</p> : null}
      </div>
    </div>
  );
}

function OperationsView({ voyage }: { voyage: BaleariaDashboardVoyage }) {
  return (
    <div className={styles.dashboardGrid}>
      <Panel title="Perfil observado frente a recomendado" className={styles.profilePanel}>
        <SpeedProfileChart data={voyage.speedProfile} />
        <ValuesTable voyage={voyage} />
      </Panel>
      <Panel title="Recomendación del viaje" className={styles.recommendationPanel}>
        <Recommendation voyage={voyage} />
      </Panel>
      <Panel title="Energía acumulada por sistema" className={styles.energyPanel}>
        <EnergySeriesChart data={voyage.energySeries} />
        <details className={styles.values}>
          <summary>Consultar serie energética</summary>
          <table>
            <caption className="sr-only">
              Energía acumulada simulada por sistema y hora
            </caption>
            <thead>
              <tr>
                <th scope="col">Hora</th>
                <th scope="col">Propulsión</th>
                <th scope="col">Auxiliares</th>
                <th scope="col">Eje</th>
              </tr>
            </thead>
            <tbody>
              {voyage.energySeries.map((point) => (
                <tr key={point.time}>
                  <th scope="row">{point.time}</th>
                  <td>{formatDashboardNumber(point.propulsion)} MWh</td>
                  <td>{formatDashboardNumber(point.auxiliary)} MWh</td>
                  <td>{formatDashboardNumber(point.shaft)} MWh</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </Panel>
      <Panel title="Lectura operativa" className={styles.summaryPanel}>
        <dl className={styles.summaryList}>
          <div>
            <dt>Viaje</dt>
            <dd>{voyage.route}</dd>
          </div>
          <div>
            <dt>Recorrido</dt>
            <dd>
              {voyage.origin} a {voyage.destination}
            </dd>
          </div>
          <div>
            <dt>Duración</dt>
            <dd>{formatDashboardDuration(voyage.durationMinutes)}</dd>
          </div>
          <div>
            <dt>Condición del mar</dt>
            <dd>
              Beaufort {voyage.beaufort}, Douglas {voyage.douglas}
            </dd>
          </div>
        </dl>
      </Panel>
    </div>
  );
}

function CrewView({
  voyage,
  calculationRound,
  onCalculate,
}: {
  voyage: BaleariaDashboardVoyage;
  calculationRound: number;
  onCalculate: () => void;
}) {
  const recalculatedSpeed =
    voyage.recommendation.recommendedSpeedKn + (calculationRound % 2) * 0.1;
  return (
    <div className={styles.dashboardGrid}>
      <Panel title="Posición y progreso del viaje" className={styles.routePanel}>
        <div
          className={styles.routeDiagram}
          role="img"
          aria-label={`${voyage.progress} por ciento del recorrido completado entre ${voyage.origin} y ${voyage.destination}`}
        >
          <div className={styles.routeMeta}>
            <div>
              <span>Origen</span>
              <strong>{voyage.origin}</strong>
            </div>
            <p>{voyage.progress} % completado</p>
            <div>
              <span>Destino</span>
              <strong>{voyage.destination}</strong>
            </div>
          </div>
          <div className={styles.routeTrack} aria-hidden="true">
            <span style={{ width: `${voyage.progress}%` }} />
            <i style={{ left: `${voyage.progress}%` }} />
          </div>
          <dl className={styles.routeConditions}>
            <div>
              <dt>Viento</dt>
              <dd>{voyage.windKn} kn</dd>
            </div>
            <div>
              <dt>Oleaje</dt>
              <dd>{formatDashboardNumber(voyage.swellM)} m</dd>
            </div>
            <div>
              <dt>Beaufort</dt>
              <dd>{voyage.beaufort}</dd>
            </div>
            <div>
              <dt>Douglas</dt>
              <dd>{voyage.douglas}</dd>
            </div>
          </dl>
        </div>
      </Panel>
      <Panel title="Recomendación en navegación" className={styles.livePanel}>
        <Recommendation voyage={voyage} compact />
        <p className={styles.liveResult} aria-live="polite">
          Simulación {calculationRound + 1}: velocidad propuesta {formatDashboardNumber(recalculatedSpeed)} kn.
        </p>
        <button type="button" className={styles.calculateButton} onClick={onCalculate}>
          Recalcular simulación
        </button>
      </Panel>
      <Panel title="Potencia simulada en navegación" className={styles.telemetryPanel}>
        <TelemetryChart data={voyage.telemetry} />
      </Panel>
      <Panel title="Contexto de guardia" className={styles.watchPanel}>
        <dl className={styles.watchMetrics}>
          <div>
            <dt>Tripulación</dt>
            <dd>{voyage.crewCount}</dd>
          </div>
          <div>
            <dt>Velocidad media</dt>
            <dd>{formatDashboardNumber(voyage.averageSpeedKn)} kn</dd>
          </div>
          <div>
            <dt>Margen de llegada</dt>
            <dd>{voyage.etaMarginMinutes} min</dd>
          </div>
        </dl>
      </Panel>
      <Panel title="Lecturas de sensores" className={styles.sensorPanel}>
        <table className={styles.sensorTable}>
          <caption className="sr-only">
            Lecturas sintéticas de los sistemas del buque
          </caption>
          <thead>
            <tr>
              <th scope="col">Sistema</th>
              <th scope="col">Lectura</th>
              <th scope="col">Referencia</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {voyage.sensors.map((sensor) => (
              <tr key={sensor.system}>
                <th scope="row">{sensor.system}</th>
                <td>{sensor.reading}</td>
                <td>{sensor.reference}</td>
                <td>{sensor.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

export function BaleariaDashboard() {
  const [view, setView] = useState<DashboardView>("operations");
  const [vesselId, setVesselId] = useState("all");
  const [voyageId, setVoyageId] = useState(baleariaDashboardVoyages[0].id);
  const [calculationRound, setCalculationRound] = useState(0);

  const availableVoyages = useMemo(
    () =>
      vesselId === "all"
        ? [...baleariaDashboardVoyages]
        : baleariaDashboardVoyages.filter(
            (voyage) => voyage.vesselId === vesselId,
          ),
    [vesselId],
  );
  const voyage =
    availableVoyages.find((item) => item.id === voyageId) ??
    availableVoyages[0];

  const changeVessel = (nextVesselId: string) => {
    const nextVoyages =
      nextVesselId === "all"
        ? baleariaDashboardVoyages
        : baleariaDashboardVoyages.filter(
            (item) => item.vesselId === nextVesselId,
          );
    setVesselId(nextVesselId);
    setVoyageId(nextVoyages[0].id);
    setCalculationRound(0);
  };

  const reset = () => {
    setView("operations");
    setVesselId("all");
    setVoyageId(baleariaDashboardVoyages[0].id);
    setCalculationRound(0);
  };

  return (
    <div id="dashboard-demo" className={styles.dashboardContainer}>
      <div
        className={styles.dashboard}
        role="region"
        aria-label="Demostración interactiva del dashboard de eficiencia marítima"
      >
        <header className={styles.toolbar}>
          <div>
            <p>Centro de control</p>
            <h3>Eficiencia marítima</h3>
          </div>
          <div className={styles.viewSwitch} aria-label="Vista del dashboard">
            <button
              type="button"
              aria-pressed={view === "operations"}
              onClick={() => setView("operations")}
            >
              Operaciones
            </button>
            <button
              type="button"
              aria-pressed={view === "crew"}
              onClick={() => setView("crew")}
            >
              Tripulación
            </button>
          </div>
        </header>

        <div className={styles.filterBar}>
          <div className={styles.filters}>
            <label htmlFor="balearia-vessel">
              Buque
              <select
                id="balearia-vessel"
                value={vesselId}
                onChange={(event) => changeVessel(event.target.value)}
              >
                <option value="all">Todas las unidades</option>
                {baleariaDashboardVessels.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="balearia-voyage">
              Viaje
              <select
                id="balearia-voyage"
                value={voyage.id}
                onChange={(event) => {
                  setVoyageId(event.target.value);
                  setCalculationRound(0);
                }}
              >
                {availableVoyages.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.date} / {item.route}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.filterActions}>
            <span>Datos ficticios</span>
            <button type="button" onClick={reset}>
              Restablecer
            </button>
          </div>
        </div>

        <div className={styles.contextBar}>
          <p>
            {voyage.vessel} / {voyage.origin} a {voyage.destination}
          </p>
          <p>{voyage.date}</p>
        </div>

        <dl className={styles.kpis} aria-label="Indicadores del viaje seleccionado">
          <div>
            <dt>Distancia</dt>
            <dd>{formatDashboardNumber(voyage.distanceNm)} nm</dd>
          </div>
          <div>
            <dt>Velocidad media</dt>
            <dd>{formatDashboardNumber(voyage.averageSpeedKn)} kn</dd>
          </div>
          <div>
            <dt>Energía estimada</dt>
            <dd>{formatDashboardNumber(voyage.energyMwh)} MWh</dd>
          </div>
          <div>
            <dt>Margen ETA</dt>
            <dd>{voyage.etaMarginMinutes} min</dd>
          </div>
        </dl>

        {view === "operations" ? (
          <OperationsView voyage={voyage} />
        ) : (
          <CrewView
            voyage={voyage}
            calculationRound={calculationRound}
            onCalculate={() => setCalculationRound((current) => current + 1)}
          />
        )}

        <p className="sr-only" role="status">
          Vista {view === "operations" ? "Operaciones" : "Tripulación"}. {voyage.vessel}, {voyage.route}.
        </p>
      </div>
    </div>
  );
}
