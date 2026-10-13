"use client";

import { useTranslations } from "@/components/i18n/language-provider";
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
  const { t } = useTranslations();
  return (
    <section className={`${styles.panel} ${className}`} aria-label={t(title)}>
      <h4>{t(title)}</h4>
      {children}
    </section>
  );
}

export function AepdDashboard() {
  const { t, locale } = useTranslations();
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
        aria-label={t("Cuadro de mandos interactivo del portal institucional")}
      >
        <header className={styles.toolbar}>
          <h3>{t("Portal Institucional")}</h3>
          <div className={styles.filters}>
            <label htmlFor="dashboard-country">
              {t("País")}<select
                id="dashboard-country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                <option value="Todos">{t("Todos")}</option>
                {countries.map((item) => (
                  <option key={item} value={item}>{t(item)}</option>
                ))}
              </select>
            </label>
            <label htmlFor="dashboard-start">
              {t("Desde")}<input
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
              {t("Hasta")}<input
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
          <p>{t("Filtra por país y periodo para explorar el informe.")}</p>
          <button type="button" onClick={reset}>
            {t("Restablecer filtros")}</button>
        </div>
        {!validPeriod ? (
          <p id="dashboard-date-error" className={styles.empty} role="alert">
            {t("Selecciona un intervalo entre el 1 y el 28 de febrero de 2026. La fecha inicial debe ser anterior o igual a la final.")}</p>
        ) : (
          <>
            <dl className={styles.kpis} aria-label={t("Indicadores del portal")}>
              <div>
                <dt>{t("Núm. visitas totales")}</dt>
                <dd data-kpi="visits">{t(formatCount(data.visits, locale))}</dd>
              </div>
              <div>
                <dt>{t("Núm. visitantes únicos")}</dt>
                <dd data-kpi="unique">{t(formatCount(data.unique, locale))}</dd>
              </div>
              <div>
                <dt>{t("Núm. descargas únicas")}</dt>
                <dd data-kpi="downloads">{t(formatCount(data.downloads, locale))}</dd>
              </div>
            </dl>
            <div className={styles.chartGrid}>
              <Panel
                title={t("Resultados de las predicciones")}
                className={styles.predictions}
              >
                <div className={styles.predictionLayout}>
                  <PredictionChart series={data.series} />
                  <div className={styles.modelPanel}>
                    <label htmlFor="dashboard-model">
                      {t("Modelo")}<select
                        id="dashboard-model"
                        value={model}
                        onChange={(event) =>
                          setModel(event.target.value as ForecastModel)
                        }
                      >
                        {models.map((item) => (
                          <option key={item} value={item}>{t(item)}</option>
                        ))}
                      </select>
                    </label>
                    <h5>{t("Métricas de error")}</h5>
                    <dl className={styles.metrics}>
                      <div>
                        <dt>
                          <abbr title={t("Error absoluto medio, en visitas por hora")}>
                            {t("MAE")}</abbr>
                        </dt>
                        <dd data-metric="mae">
                          {t(formatMetric(data.metrics.mae, locale))}
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <abbr title={t("Error absoluto porcentual medio")}>
                            {t("MAPE")}</abbr>
                        </dt>
                        <dd>{t(formatMetric(data.metrics.mape, locale))} %</dd>
                      </div>
                      <div>
                        <dt>
                          <abbr title={t("Raíz del error cuadrático medio, en visitas por hora")}>
                            {t("RMSE")}</abbr>
                        </dt>
                        <dd>{t(formatMetric(data.metrics.rmse, locale))}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Panel>
              <Panel
                title={t("Nº descargas únicas por categoría")}
                className={styles.downloads}
              >
                <DownloadDonut data={data.downloadCategories} />
              </Panel>
              <Panel
                title={t("Informe de visitas por tipo de solicitud")}
                className={styles.requestTable}
              >
                <table>
                  <caption className="sr-only">
                    {t("Visitas y visitantes únicos por tipo de solicitud")}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{t("Tipo de solicitud")}</th>
                      <th scope="col">{t("Visitas")}</th>
                      <th scope="col" aria-label={t("Visitantes únicos")}>
                        {t("Únicos")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...data.requests]
                      .sort((a, b) => b.visits - a.visits)
                      .map((request) => (
                        <tr key={request.label}>
                          <th scope="row">{t(request.label)}</th>
                          <td>{t(formatCount(request.visits, locale))}</td>
                          <td>{t(formatCount(request.unique, locale))}</td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row">{t("Total")}</th>
                      <td>{t(formatCount(data.visits, locale))}</td>
                      <td>{t(formatCount(data.unique, locale))}</td>
                    </tr>
                  </tfoot>
                </table>
              </Panel>
              <Panel
                title={t("Nº de visitas totales por tipo de solicitud")}
              >
                <HorizontalBars
                  data={data.requests.map((request) => ({
                    label: request.label,
                    value: request.visits,
                  }))}
                />
              </Panel>
              <Panel
                title={t("Nº de visitantes únicos por tipo de solicitud")}
              >
                <HorizontalBars
                  data={data.requests.map((request) => ({
                    label: request.label,
                    value: request.unique,
                  }))}
                />
              </Panel>
              <Panel title={t("Top 6 blogs más visitados")}>
                <VerticalBars data={data.blogs} />
              </Panel>
              <Panel title={t("Top 6 FAQs más visitadas")}>
                <FaqTreemap data={data.faqs} />
              </Panel>
              <Panel
                title={t("Top 6 notas de prensa más visitadas")}
                className={styles.press}
              >
                <VerticalBars data={data.press} />
              </Panel>
            </div>
          </>
        )}
        <p className="sr-only" role="status">
          {t(validPeriod
            ? t("Informe actualizado. {0}. {1} visitas. Modelo {2}.", [t(country), formatCount(data.visits, locale), model])
            : "Intervalo de fechas no válido.")}
        </p>
      </div>
    </div>
  );
}
