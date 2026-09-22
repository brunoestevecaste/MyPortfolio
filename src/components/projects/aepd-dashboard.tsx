"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  countries,
  dashboardPeriod,
  formatCount,
  formatMetric,
  getDashboardData,
  models,
  type ForecastModel,
} from "@/data/aepd-dashboard";
import {
  DownloadDonut,
  FaqTreemap,
  HorizontalBars,
  PredictionChart,
  VerticalBars,
} from "./dashboard-charts";
import styles from "./dashboard.module.css";

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

export function AepdDashboard() {
  const [country, setCountry] = useState("Todos");
  const [start, setStart] = useState(dashboardPeriod.start);
  const [end, setEnd] = useState(dashboardPeriod.end);
  const [model, setModel] = useState<ForecastModel>("XGBoost");
  const validPeriod = Boolean(
    start &&
    end &&
    start <= end &&
    start >= dashboardPeriod.start &&
    end <= dashboardPeriod.end,
  );
  const data = useMemo(
    () => getDashboardData({ country, start, end, model }),
    [country, start, end, model],
  );
  const reset = () => {
    setCountry("Todos");
    setStart(dashboardPeriod.start);
    setEnd(dashboardPeriod.end);
    setModel("XGBoost");
  };

  return (
    <div className={styles.dashboardContainer}>
      <div
        className={styles.dashboard}
        role="region"
        aria-label="Cuadro de mandos interactivo del portal institucional"
      >
        <header className={styles.toolbar}>
          <h3>Portal Institucional</h3>
          <div className={styles.filters}>
            <label htmlFor="dashboard-country">
              País
              <select
                id="dashboard-country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                <option>Todos</option>
                {countries.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label htmlFor="dashboard-start">
              Desde
              <input
                id="dashboard-start"
                type="date"
                min={dashboardPeriod.start}
                max={dashboardPeriod.end}
                value={start}
                onChange={(event) => setStart(event.target.value)}
                aria-invalid={!validPeriod}
                aria-describedby={
                  !validPeriod ? "dashboard-date-error" : undefined
                }
              />
            </label>
            <label htmlFor="dashboard-end">
              Hasta
              <input
                id="dashboard-end"
                type="date"
                min={dashboardPeriod.start}
                max={dashboardPeriod.end}
                value={end}
                onChange={(event) => setEnd(event.target.value)}
                aria-invalid={!validPeriod}
                aria-describedby={
                  !validPeriod ? "dashboard-date-error" : undefined
                }
              />
            </label>
          </div>
        </header>
        <div className={styles.dashboardActions}>
          <p>Filtra por país y periodo para explorar el informe.</p>
          <button type="button" onClick={reset}>
            Restablecer filtros
          </button>
        </div>
        {!validPeriod ? (
          <p id="dashboard-date-error" className={styles.empty} role="alert">
            Selecciona un intervalo entre el 1 y el 28 de febrero de 2026. La
            fecha inicial debe ser anterior o igual a la final.
          </p>
        ) : (
          <>
            <dl className={styles.kpis} aria-label="Indicadores del portal">
              <div>
                <dt>Núm. visitas totales</dt>
                <dd data-kpi="visits">{formatCount(data.visits)}</dd>
              </div>
              <div>
                <dt>Núm. visitantes únicos</dt>
                <dd data-kpi="unique">{formatCount(data.unique)}</dd>
              </div>
              <div>
                <dt>Núm. descargas únicas</dt>
                <dd data-kpi="downloads">{formatCount(data.downloads)}</dd>
              </div>
            </dl>
            <div className={styles.chartGrid}>
              <Panel
                title="Resultados de las predicciones"
                className={styles.predictions}
              >
                <div className={styles.predictionLayout}>
                  <PredictionChart series={data.series} />
                  <div className={styles.modelPanel}>
                    <label htmlFor="dashboard-model">
                      Modelo
                      <select
                        id="dashboard-model"
                        value={model}
                        onChange={(event) =>
                          setModel(event.target.value as ForecastModel)
                        }
                      >
                        {models.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </label>
                    <h5>Métricas de error</h5>
                    <dl className={styles.metrics}>
                      <div>
                        <dt>
                          <abbr title="Error absoluto medio, en visitas por hora">
                            MAE
                          </abbr>
                        </dt>
                        <dd data-metric="mae">
                          {formatMetric(data.metrics.mae)}
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <abbr title="Error absoluto porcentual medio">
                            MAPE
                          </abbr>
                        </dt>
                        <dd>{formatMetric(data.metrics.mape)} %</dd>
                      </div>
                      <div>
                        <dt>
                          <abbr title="Raíz del error cuadrático medio, en visitas por hora">
                            RMSE
                          </abbr>
                        </dt>
                        <dd>{formatMetric(data.metrics.rmse)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Panel>
              <Panel
                title="Nº descargas únicas por categoría"
                className={styles.downloads}
              >
                <DownloadDonut data={data.downloadCategories} />
              </Panel>
              <Panel
                title="Informe de visitas por tipo de solicitud"
                className={styles.requestTable}
              >
                <table>
                  <caption className="sr-only">
                    Visitas y visitantes únicos por tipo de solicitud
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Tipo de solicitud</th>
                      <th scope="col">Visitas</th>
                      <th scope="col" aria-label="Visitantes únicos">
                        Únicos
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...data.requests]
                      .sort((a, b) => b.visits - a.visits)
                      .map((request) => (
                        <tr key={request.label}>
                          <th scope="row">{request.label}</th>
                          <td>{formatCount(request.visits)}</td>
                          <td>{formatCount(request.unique)}</td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row">Total</th>
                      <td>{formatCount(data.visits)}</td>
                      <td>{formatCount(data.unique)}</td>
                    </tr>
                  </tfoot>
                </table>
              </Panel>
              <Panel
                title="Nº de visitas totales por tipo de solicitud"
              >
                <HorizontalBars
                  data={data.requests.map((request) => ({
                    label: request.label,
                    value: request.visits,
                  }))}
                />
              </Panel>
              <Panel
                title="Nº de visitantes únicos por tipo de solicitud"
              >
                <HorizontalBars
                  data={data.requests.map((request) => ({
                    label: request.label,
                    value: request.unique,
                  }))}
                />
              </Panel>
              <Panel title="Top 6 blogs más visitados">
                <VerticalBars data={data.blogs} />
              </Panel>
              <Panel title="Top 6 FAQs más visitadas">
                <FaqTreemap data={data.faqs} />
              </Panel>
              <Panel
                title="Top 6 notas de prensa más visitadas"
                className={styles.press}
              >
                <VerticalBars data={data.press} />
              </Panel>
            </div>
          </>
        )}
        <p className="sr-only" role="status">
          {validPeriod
            ? `Informe actualizado. ${country}. ${formatCount(data.visits)} visitas. Modelo ${model}.`
            : "Intervalo de fechas no válido."}
        </p>
      </div>
    </div>
  );
}
