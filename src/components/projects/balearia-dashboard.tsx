"use client";

import { useTranslations } from "@/components/i18n/language-provider";
import { useMemo, useState, type ReactNode } from "react";
import {
  baleariaDashboardVessels,
  baleariaDashboardVoyages,
  formatDashboardDate,
  formatDashboardDuration,
  formatDashboardMeasure,
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
  const { t } = useTranslations();
  return (
    <section className={`${styles.panel} ${className}`} aria-label={t(title)}>
      <h4>{t(title)}</h4>
      {children}
    </section>
  );
}

function ValuesTable({ voyage }: { voyage: BaleariaDashboardVoyage }) {
  const { t, locale } = useTranslations();
  return (
    <details className={styles.values}>
      <summary>{t("Consultar velocidades por tramo")}</summary>
      <table>
        <caption className="sr-only">
          {t("Velocidad observada y recomendada por tramo")}</caption>
        <thead>
          <tr>
            <th scope="col">{t("Tramo")}</th>
            <th scope="col">{t("Observada")}</th>
            <th scope="col">{t("Recomendada")}</th>
          </tr>
        </thead>
        <tbody>
          {voyage.speedProfile.map((point) => (
            <tr key={point.segment}>
              <th scope="row">{t(point.segment)}</th>
              <td>{t(formatDashboardMeasure(point.observed, "kn", 1, locale))}</td>
              <td>{t(formatDashboardMeasure(point.recommended, "kn", 1, locale))}</td>
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
  const { t, locale } = useTranslations();
  const recommendation = voyage.recommendation;
  return (
    <div className={styles.recommendation}>
      <div className={styles.recommendationHeader}>
        <div>
          <span>{t("Modelo de demostración")}</span>
          <strong translate="no">{t(voyage.model)}</strong>
        </div>
        <p>{t(recommendation.action)}</p>
      </div>
      <dl className={styles.recommendationMetrics}>
        <div>
          <dt>{t("Velocidad actual")}</dt>
          <dd>{t(formatDashboardMeasure(recommendation.currentSpeedKn, "kn", 1, locale))}</dd>
        </div>
        <div>
          <dt>{t("Velocidad recomendada")}</dt>
          <dd>{t(formatDashboardMeasure(recommendation.recommendedSpeedKn, "kn", 1, locale))}</dd>
        </div>
        <div>
          <dt>{t("Energía estimada")}</dt>
          <dd>{t(formatDashboardMeasure(recommendation.estimatedEnergyMwh, "MWh", 1, locale))}</dd>
        </div>
        <div>
          <dt>{t("Margen ETA")}</dt>
          <dd>{t("{0} min", [voyage.etaMarginMinutes])}</dd>
        </div>
      </dl>
      <div className={styles.recommendationNote}>
        <p>
          {t("Confianza ")}<strong>{t(recommendation.confidence)}</strong>
        </p>
        {!compact ? <p>{t(recommendation.reason)}</p> : null}
      </div>
    </div>
  );
}

function OperationsView({ voyage }: { voyage: BaleariaDashboardVoyage }) {
  const { t, locale } = useTranslations();
  return (
    <div className={styles.dashboardGrid}>
      <Panel title={t("Perfil observado frente a recomendado")} className={styles.profilePanel}>
        <SpeedProfileChart data={voyage.speedProfile} />
        <ValuesTable voyage={voyage} />
      </Panel>
      <Panel title={t("Recomendación del viaje")} className={styles.recommendationPanel}>
        <Recommendation voyage={voyage} />
      </Panel>
      <Panel title={t("Energía acumulada por sistema")} className={styles.energyPanel}>
        <EnergySeriesChart data={voyage.energySeries} />
        <details className={styles.values}>
          <summary>{t("Consultar serie energética")}</summary>
          <table>
            <caption className="sr-only">
              {t("Energía acumulada simulada por sistema y hora")}</caption>
            <thead>
              <tr>
                <th scope="col">{t("Hora")}</th>
                <th scope="col">{t("Propulsión")}</th>
                <th scope="col">{t("Auxiliares")}</th>
                <th scope="col">{t("Eje")}</th>
              </tr>
            </thead>
            <tbody>
              {voyage.energySeries.map((point) => (
                <tr key={point.time}>
                  <th scope="row">{t(point.time)}</th>
                  <td>{t(formatDashboardMeasure(point.propulsion, "MWh", 1, locale))}</td>
                  <td>{t(formatDashboardMeasure(point.auxiliary, "MWh", 1, locale))}</td>
                  <td>{t(formatDashboardMeasure(point.shaft, "MWh", 1, locale))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </Panel>
      <Panel title={t("Lectura operativa")} className={styles.summaryPanel}>
        <dl className={styles.summaryList}>
          <div>
            <dt>{t("Viaje")}</dt>
            <dd>{t(voyage.route)}</dd>
          </div>
          <div>
            <dt>{t("Recorrido")}</dt>
            <dd>
              {t(voyage.origin)} {t(" a")}{t(voyage.destination)}
            </dd>
          </div>
          <div>
            <dt>{t("Duración")}</dt>
            <dd>{t(formatDashboardDuration(voyage.durationMinutes))}</dd>
          </div>
          <div>
            <dt>{t("Condición del mar")}</dt>
            <dd>
              {t("Beaufort ")}{voyage.beaufort}{t(", Douglas")}{voyage.douglas}
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
  const { t, locale } = useTranslations();
  const recalculatedSpeed =
    voyage.recommendation.recommendedSpeedKn + (calculationRound % 2) * 0.1;
  return (
    <div className={styles.dashboardGrid}>
      <Panel title={t("Posición y progreso del viaje")} className={styles.routePanel}>
        <div className={styles.routeDiagram}>
          <div className={styles.routeMeta}>
            <div>
              <span>{t("Origen")}</span>
              <strong>{t(voyage.origin)}</strong>
            </div>
            <p>{voyage.progress} {t(" % completado")}</p>
            <div>
              <span>{t("Destino")}</span>
              <strong>{t(voyage.destination)}</strong>
            </div>
          </div>
          <div className={styles.routeTrack} aria-hidden="true">
            <span style={{ width: `${voyage.progress}%` }} />
            <i style={{ left: `${voyage.progress}%` }} />
          </div>
          <dl className={styles.routeConditions}>
            <div>
              <dt>{t("Viento")}</dt>
              <dd>{t("{0} kn", [voyage.windKn])}</dd>
            </div>
            <div>
              <dt>{t("Oleaje")}</dt>
              <dd>{t(formatDashboardMeasure(voyage.swellM, "m", 1, locale))}</dd>
            </div>
            <div>
              <dt>{t("Beaufort")}</dt>
              <dd>{voyage.beaufort}</dd>
            </div>
            <div>
              <dt>{t("Douglas")}</dt>
              <dd>{voyage.douglas}</dd>
            </div>
          </dl>
        </div>
      </Panel>
      <Panel title={t("Recomendación en navegación")} className={styles.livePanel}>
        <Recommendation voyage={voyage} compact />
        <p className={styles.liveResult} aria-live="polite">
          {t("Simulación ")}{calculationRound + 1}{t(": velocidad propuesta")}{t(formatDashboardMeasure(recalculatedSpeed, "kn", 1, locale))}.
        </p>
        <button type="button" className={styles.calculateButton} onClick={onCalculate}>
          {t("Recalcular simulación")}</button>
      </Panel>
      <Panel title={t("Potencia simulada en navegación")} className={styles.telemetryPanel}>
        <TelemetryChart data={voyage.telemetry} />
      </Panel>
      <Panel title={t("Contexto de guardia")} className={styles.watchPanel}>
        <dl className={styles.watchMetrics}>
          <div>
            <dt>{t("Tripulación")}</dt>
            <dd>{voyage.crewCount}</dd>
          </div>
          <div>
            <dt>{t("Velocidad media")}</dt>
            <dd>{t(formatDashboardMeasure(voyage.averageSpeedKn, "kn", 1, locale))}</dd>
          </div>
          <div>
            <dt>{t("Margen de llegada")}</dt>
            <dd>{t("{0} min", [voyage.etaMarginMinutes])}</dd>
          </div>
        </dl>
      </Panel>
      <Panel title={t("Lecturas de sensores")} className={styles.sensorPanel}>
        <table className={styles.sensorTable}>
          <caption className="sr-only">
            {t("Lecturas sintéticas de los sistemas del buque")}</caption>
          <thead>
            <tr>
              <th scope="col">{t("Sistema")}</th>
              <th scope="col">{t("Lectura")}</th>
              <th scope="col">{t("Referencia")}</th>
              <th scope="col">{t("Estado")}</th>
            </tr>
          </thead>
          <tbody>
            {voyage.sensors.map((sensor) => (
              <tr key={sensor.system}>
                <th scope="row">{t(sensor.system)}</th>
                <td>{t(sensor.reading)}</td>
                <td>{t(sensor.reference)}</td>
                <td>{t(sensor.state)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

export function BaleariaDashboard() {
  const { t, locale } = useTranslations();
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
        aria-label={t("Demostración interactiva del dashboard de eficiencia marítima")}
      >
        <header className={styles.toolbar}>
          <div>
            <p>{t("Centro de control")}</p>
            <h3>{t("Eficiencia marítima")}</h3>
          </div>
          <div className={styles.viewSwitch} aria-label={t("Vista del dashboard")}>
            <button
              type="button"
              aria-pressed={view === "operations"}
              onClick={() => setView("operations")}
            >
              {t("Operaciones")}</button>
            <button
              type="button"
              aria-pressed={view === "crew"}
              onClick={() => setView("crew")}
            >
              {t("Tripulación")}</button>
          </div>
        </header>

        <div className={styles.filterBar}>
          <div className={styles.filters}>
            <label htmlFor="balearia-vessel">
              {t("Buque")}<select
                id="balearia-vessel"
                name="balearia-vessel"
                autoComplete="off"
                value={vesselId}
                onChange={(event) => changeVessel(event.target.value)}
              >
                <option value="all">{t("Todas las unidades")}</option>
                {baleariaDashboardVessels.map((item) => (
                  <option key={item.id} value={item.id}>
                    {t(item.label)}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="balearia-voyage">
              {t("Viaje")}<select
                id="balearia-voyage"
                name="balearia-voyage"
                autoComplete="off"
                value={voyage.id}
                onChange={(event) => {
                  setVoyageId(event.target.value);
                  setCalculationRound(0);
                }}
              >
                {availableVoyages.map((item) => (
                  <option key={item.id} value={item.id}>
                    {t(formatDashboardDate(item.date, locale))} / {t(item.route)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.filterActions}>
            <span>{t("Datos ficticios")}</span>
            <button type="button" onClick={reset}>
              {t("Restablecer")}</button>
          </div>
        </div>

        <div className={styles.contextBar}>
          <p>
            {t(voyage.vessel)} / {t(voyage.origin)} {t(" a")}{t(voyage.destination)}
          </p>
          <p>{t(formatDashboardDate(voyage.date, locale))}</p>
        </div>

        <dl className={styles.kpis} aria-label={t("Indicadores del viaje seleccionado")}>
          <div>
            <dt>{t("Distancia")}</dt>
            <dd>{t(formatDashboardMeasure(voyage.distanceNm, "nm", 1, locale))}</dd>
          </div>
          <div>
            <dt>{t("Velocidad media")}</dt>
            <dd>{t(formatDashboardMeasure(voyage.averageSpeedKn, "kn", 1, locale))}</dd>
          </div>
          <div>
            <dt>{t("Energía estimada")}</dt>
            <dd>{t(formatDashboardMeasure(voyage.energyMwh, "MWh", 1, locale))}</dd>
          </div>
          <div>
            <dt>{t("Margen ETA")}</dt>
            <dd>{t("{0} min", [voyage.etaMarginMinutes])}</dd>
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
          {t("Vista ")}{t(view === "operations" ? "Operaciones" : "Tripulación")}. {t(voyage.vessel)}, {t(voyage.route)}.
        </p>
      </div>
    </div>
  );
}
