"use client";

import { useTranslations } from "@/components/i18n/language-provider";
import { useMemo, useState, type ReactNode } from "react";
import {
  demoEvents,
  demoProfiles,
  demoAgentScenarios,
  type DemoEvent,
} from "@/data/nextplan-demo";
import styles from "./nextplan-dashboard.module.css";

type NextPlanView = "swipes" | "clustering" | "planner";

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

type SwipeActionRecord = {
  id: string;
  eventName: string;
  action: "like" | "dislike" | "saved";
  dwellMs: number;
  category: string;
};

export function NextPlanDashboard() {
  const { t } = useTranslations();
  const [view, setView] = useState<NextPlanView>("swipes");

  // VISTA 1: SWIPES
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [interactionHistory, setInteractionHistory] = useState<SwipeActionRecord[]>([
    {
      id: "hist-0",
      eventName: "Festival Noches del Botánico",
      action: "like",
      dwellMs: 2450,
      category: "Música",
    },
  ]);

  const currentEvent: DemoEvent = demoEvents[currentEventIndex % demoEvents.length];

  const handleSwipe = (action: "like" | "dislike" | "saved") => {
    const simulatedDwell = Math.floor(Math.random() * 2500) + 1200;
    const record: SwipeActionRecord = {
      id: `hist-${Date.now()}`,
      eventName: currentEvent.name,
      action,
      dwellMs: simulatedDwell,
      category: currentEvent.category,
    };
    setInteractionHistory((prev) => [record, ...prev.slice(0, 7)]);
    setCurrentEventIndex((prev) => (prev + 1) % demoEvents.length);
  };

  const swipeStats = useMemo(() => {
    const total = interactionHistory.length;
    const likes = interactionHistory.filter((h) => h.action === "like" || h.action === "saved").length;
    const likeRate = total > 0 ? Math.round((likes / total) * 100) : 0;
    const avgDwell =
      total > 0
        ? Math.round(interactionHistory.reduce((acc, h) => acc + h.dwellMs, 0) / total)
        : 0;
    return { total, likes, likeRate, avgDwell };
  }, [interactionHistory]);

  // VISTA 2: CLUSTERING & SERVING
  const [selectedClusterId, setSelectedClusterId] = useState<string>("cluster-01");
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState<number>(0);
  const [forceSameCity, setForceSameCity] = useState<boolean>(true);
  const [urgencyDays, setUrgencyDays] = useState<number>(3); // días restantes hasta el evento

  const activeProfile = demoProfiles[selectedClusterId] || demoProfiles["cluster-01"];
  const candidateEvent = demoEvents[selectedCandidateIndex % demoEvents.length];

  // Cálculo de la fórmula de scoring real del proyecto:
  // score = (cluster_weight * affinity_score) + home_city_boost + urgency_boost
  const scoringBreakdown = useMemo(() => {
    const isOwnCluster = candidateEvent.affinityClusterId === selectedClusterId;
    let clusterWeight = 0.25;
    let clusterSource = "Vecino nivel 3";

    if (isOwnCluster) {
      clusterWeight = 1.0;
      clusterSource = "Clúster propio";
    } else if (candidateEvent.affinityClusterId === activeProfile.neighborWeights.neighbor1.id) {
      clusterWeight = activeProfile.neighborWeights.neighbor1.weight;
      clusterSource = "Clúster vecino 1";
    } else if (candidateEvent.affinityClusterId === activeProfile.neighborWeights.neighbor2.id) {
      clusterWeight = activeProfile.neighborWeights.neighbor2.weight;
      clusterSource = "Clúster vecino 2";
    }

    const cityMatch = forceSameCity || candidateEvent.city.toLowerCase() === activeProfile.homeCity.toLowerCase();
    const homeCityBoost = cityMatch ? 0.08 : 0.0;
    const urgencyBoost = Math.max(0.0, 0.04 - urgencyDays * 0.004);

    const baseContribution = clusterWeight * candidateEvent.baseAffinity;
    const totalScore = Math.min(1.0, baseContribution + homeCityBoost + urgencyBoost);

    // Generar recommendation_reason explicable según lógica del backend
    let reason = "Recomendado por afinidad a tu clúster de gustos";
    if (cityMatch && urgencyBoost > 0.02) {
      reason = t("Plan destacado en {0} para este fin de semana", [candidateEvent.city]);
    } else if (cityMatch) {
      reason = t("Por coincidencia con tu ciudad habitual ({0})", [candidateEvent.city]);
    } else if (!isOwnCluster) {
      reason = t("Descubrimiento afín desde {0}", [clusterSource]);
    }

    return {
      clusterWeight,
      clusterSource,
      baseAffinity: candidateEvent.baseAffinity,
      baseContribution: Math.round(baseContribution * 1000) / 1000,
      homeCityBoost,
      urgencyBoost: Math.round(urgencyBoost * 1000) / 1000,
      totalScore: Math.round(totalScore * 1000) / 1000,
      reason,
      cityMatch,
    };
  }, [candidateEvent, selectedClusterId, activeProfile, forceSameCity, urgencyDays, t]);

  // VISTA 3: AGENTE IA & RAG
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("scenario-01");
  const currentScenario = useMemo(() => {
    return (
      demoAgentScenarios.find((s) => s.id === selectedScenarioId) ||
      demoAgentScenarios[0]
    );
  }, [selectedScenarioId]);

  const resetAll = () => {
    setView("swipes");
    setCurrentEventIndex(0);
    setSelectedClusterId("cluster-01");
    setSelectedCandidateIndex(0);
    setForceSameCity(true);
    setUrgencyDays(3);
    setSelectedScenarioId("scenario-01");
  };

  return (
    <div className={styles.dashboardContainer} id="demo-nextplan">
      <div className={styles.dashboard}>
        {/* CABECERA Y SELECTOR DE VISTAS */}
        <header className={styles.toolbar}>
          <div>
            <p>{t("Demostrador interactivo · NextPlan")}</p>
            <h3>{t("Plataforma de Recomendación de Eventos")}</h3>
          </div>
          <nav className={styles.viewSwitch} aria-label={t("Modos de demostración")}>
            <button
              type="button"
              aria-pressed={view === "swipes"}
              onClick={() => setView("swipes")}
            >
              {t("1. Explorador & Swipes")}</button>
            <button
              type="button"
              aria-pressed={view === "clustering"}
              onClick={() => setView("clustering")}
            >
              {t("2. Clustering & Scoring")}</button>
            <button
              type="button"
              aria-pressed={view === "planner"}
              onClick={() => setView("planner")}
            >
              {t("3. Agente IA & RAG")}</button>
          </nav>
        </header>

        {/* BARRA DE CONTEXTO */}
        <div className={styles.contextBar}>
          <span>
            {view === "swipes" && (
              <>
                {t("Modo: ")}<strong>{t("Captura asíncrona de swipes en tiempo real hacia Pub/Sub")}</strong>
              </>
            )}
            {view === "clustering" && (
              <>
                {t("Modo: ")}<strong>{t("Materialización de candidatos en BigQuery con scoring multivariable")}</strong>
              </>
            )}
            {view === "planner" && (
              <>
                {t("Modo: ")}<strong>{t("Orquestación RAG en dos fases con Google ADK sobre Vertex AI")}</strong>
              </>
            )}
          </span>
          <button type="button" onClick={resetAll} className={styles.resetButton}>
            {t("Reiniciar simulador")}</button>
        </div>

        <div className={styles.contentArea}>
          {/* ========================================================= */}
          {/* VISTA 1: SWIPES & CAPTURA TELEMETRICA                      */}
          {/* ========================================================= */}
          {view === "swipes" && (
            <div className={styles.swipeLayout}>
              {/* Tarjeta de Evento interactiva */}
              <div className={styles.eventCard}>
                <div className={styles.badgeRow}>
                  <span className={`${styles.badge} ${styles.badgeSignal}`}>
                    {t(currentEvent.category)}
                  </span>
                  <span className={styles.badge}>{t(currentEvent.city)}</span>
                  <span className={styles.badge}>{t(currentEvent.indoorOutdoor)}</span>
                  <span className={styles.badge}>{t(currentEvent.timeSlot)}</span>
                  <span className={styles.badge}>{t(currentEvent.priceRange)}</span>
                </div>

                <h4 className={styles.eventTitle}>{t(currentEvent.name)}</h4>
                <p style={{ color: "var(--muted)", margin: 0 }}>
                  {t(currentEvent.description)}
                </p>

                <dl className={styles.eventMetaGrid}>
                  <div>
                    <dt>{t("Recinto")}</dt>
                    <dd>{t(currentEvent.venue)}</dd>
                  </div>
                  <div>
                    <dt>{t("Fecha")}</dt>
                    <dd>{t(currentEvent.date)}</dd>
                  </div>
                  <div>
                    <dt>{t("Vibe inferido (Gemini)")}</dt>
                    <dd>{t(currentEvent.vibe)}</dd>
                  </div>
                  <div>
                    <dt>{t("Ocasión idónea")}</dt>
                    <dd>{currentEvent.occasionTags.map((tag) => t(tag)).join(" · ")}</dd>
                  </div>
                </dl>

                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>
                    {t("Prompt de dirección de arte (ia_motor_imagenes)")}</span>
                  <div className={styles.artPromptBox}>
                    {"“"}{t(currentEvent.artPrompt)}{"”"}</div>
                </div>

                {/* Acciones de swipe */}
                <div className={styles.swipeActions}>
                  <button
                    type="button"
                    className={`${styles.swipeBtn} ${styles.swipeBtnDislike}`}
                    onClick={() => handleSwipe("dislike")}
                    aria-label={t("Descartar evento")}
                  >
                    {t("✕ Descartar")}</button>
                  <button
                    type="button"
                    className={styles.swipeBtn}
                    onClick={() => handleSwipe("saved")}
                    aria-label={t("Guardar en favoritos")}
                  >
                    {t("★ Guardar")}</button>
                  <button
                    type="button"
                    className={`${styles.swipeBtn} ${styles.swipeBtnLike}`}
                    onClick={() => handleSwipe("like")}
                    aria-label={t("Me gusta este plan")}
                  >
                    {t("♥ Me interesa")}</button>
                </div>
              </div>

              {/* Panel lateral: Telemetría y dbt staging */}
              <div className={styles.swipeTelemetry}>
                <Panel title={t("Telemetría de interacción (Pub/Sub → BigQuery)")}>
                  <div className={styles.telemetryStats}>
                    <div className={styles.statBox}>
                      <div className={styles.statNumber}>{swipeStats.total}</div>
                      <div className={styles.statLabel}>{t("Swipes sesión")}</div>
                    </div>
                    <div className={styles.statBox}>
                      <div className={styles.statNumber}>{swipeStats.likeRate}%</div>
                      <div className={styles.statLabel}>{t("Tasa de Like")}</div>
                    </div>
                    <div className={styles.statBox}>
                      <div className={styles.statNumber}>{swipeStats.avgDwell} {t(" ms")}</div>
                      <div className={styles.statLabel}>{t("Dwell time medio")}</div>
                    </div>
                  </div>
                </Panel>

                <Panel title={t("Event Stream Reciente (stg_swipes)")}>
                  <ul className={styles.interactionLog} aria-label={t("Histórico de interacciones")}>
                    {interactionHistory.map((item) => (
                      <li key={item.id}>
                        <span>
                          <strong>[{t(item.action.toUpperCase())}]</strong> {t(item.eventName.slice(0, 26))}...
                        </span>
                        <span>{item.dwellMs}{t("ms")}</span>
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: "0.72rem", color: "var(--muted)", margin: 0 }}>
                    {t("Los eventos se emiten a Pub/Sub (`swipe-events`) con envelope JSON que incluye dwell_ms y snapshot contextual para dbt.")}</p>
                </Panel>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VISTA 2: CLUSTERING & SERVING SCORING                      */}
          {/* ========================================================= */}
          {view === "clustering" && (
            <div className={styles.clusterLayout}>
              {/* Selector de perfil / cluster */}
              <Panel title={t("1. Selección de Clúster de Usuario (K-Means)")}>
                <div className={styles.profileSelector} role="radiogroup" aria-label={t("Perfiles de clúster")}>
                  {Object.values(demoProfiles).map((profile) => (
                    <button
                      key={profile.id}
                      type="button"
                      role="radio"
                      aria-checked={selectedClusterId === profile.id}
                      className={styles.profileOption}
                      onClick={() => setSelectedClusterId(profile.id)}
                    >
                      <strong>{t(profile.name)}</strong>
                      <p>
                        {t("Categoría: ")}{t(profile.primaryCategory)} {t(" · Ciudad:")}{t(profile.homeCity)}
                      </p>
                      <ul style={{ paddingLeft: "1.1rem", margin: "0.4rem 0 0 0", fontSize: "0.72rem", color: "var(--muted)" }}>
                        {profile.traits.map((trait) => (
                          <li key={trait}>{t(trait)}</li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--muted)" }}>
                  <strong>{t("Vecindad de Clúster:")}</strong> {t(" Vecino 1 (")}{t(activeProfile.neighborWeights.neighbor1.name)}{t(") = 60%, Vecino 2 (")}{t(activeProfile.neighborWeights.neighbor2.name)}{t(") = 40%, Vecino 3 (")}{t(activeProfile.neighborWeights.neighbor3.name)}) = 25%.
                </div>
              </Panel>

              {/* Calculadora de Scoring */}
              <Panel title={t("2. Motor de Scoring Multivariable (BigQuery Serving)")}>
                <div className={styles.scoringCalculator}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                      {t("Seleccionar Evento Candidato:")}</label>
                    <select
                      value={selectedCandidateIndex}
                      onChange={(e) => setSelectedCandidateIndex(Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        marginTop: "0.35rem",
                        border: "1px solid var(--ink)",
                        background: "var(--canvas)",
                        fontWeight: 600,
                      }}
                    >
                      {demoEvents.map((evt, idx) => (
                        <option key={evt.id} value={idx}>
                          {t(evt.name)} ({t(evt.category)} · {t(evt.city)})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Factores de ajuste */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", display: "block" }}>
                        {t("Coincidencia de ciudad")}</label>
                      <button
                        type="button"
                        onClick={() => setForceSameCity(!forceSameCity)}
                        style={{
                          width: "100%",
                          padding: "0.45rem",
                          border: "1px solid var(--line)",
                          background: forceSameCity ? "var(--ink)" : "var(--surface)",
                          color: forceSameCity ? "var(--canvas)" : "var(--ink)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {t(forceSameCity ? "Sí (+0.08 Boost)" : "No (+0.00 Boost)")}
                      </button>
                    </div>

                    <div>
                      <label style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", display: "block" }}>
                        {t("Días restantes al evento (")}{urgencyDays}{t("d)")}</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={urgencyDays}
                        onChange={(e) => setUrgencyDays(Number(e.target.value))}
                        style={{ width: "100%", marginTop: "0.4rem" }}
                      />
                    </div>
                  </div>

                  {/* Fórmula visual */}
                  <div className={styles.formulaDisplay}>
                    <code>
                      {t("Score = (PesoClúster × AfinidadBase) + HomeCityBoost + UrgencyBoost")}</code>
                    <div className={styles.formulaTerms}>
                      <div className={styles.termBox}>
                        <div className={styles.termValue}>
                          {scoringBreakdown.baseContribution}
                        </div>
                        <div className={styles.termLabel}>
                          {t("Base (")}{scoringBreakdown.clusterWeight} × {scoringBreakdown.baseAffinity})
                        </div>
                      </div>
                      <div className={styles.termBox}>
                        <div className={styles.termValue}>
                          +{t(scoringBreakdown.homeCityBoost.toFixed(2))}
                        </div>
                        <div className={styles.termLabel}>{t("Ciudad Boost")}</div>
                      </div>
                      <div className={styles.termBox}>
                        <div className={styles.termValue}>
                          +{t(scoringBreakdown.urgencyBoost.toFixed(3))}
                        </div>
                        <div className={styles.termLabel}>{t("Urgencia Boost")}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta de resultado final */}
                  <div className={styles.candidateCard}>
                    <div className={styles.candidateHeader}>
                      <div>
                        <span className={styles.candidateRank}>{t("Puntuación Final")}</span>
                        <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                          {t("Fuente: ")}{t(scoringBreakdown.clusterSource)}
                        </div>
                      </div>
                      <div className={styles.candidateScore}>
                        {t((scoringBreakdown.totalScore * 100).toFixed(1))} / 100
                      </div>
                    </div>

                    <div className={styles.reasonBadge}>
                      {t("Motivo explicable: ")}<strong>{t(scoringBreakdown.reason)}</strong>
                    </div>
                  </div>
                </div>
              </Panel>
            </div>
          )}

          {/* ========================================================= */}
          {/* VISTA 3: AGENTE IA & RAG                                   */}
          {/* ========================================================= */}
          {view === "planner" && (
            <div className={styles.agentLayout}>
              {/* Selector de Escenarios */}
              <Panel title={t("1. Escenarios de Consulta de Usuario")}>
                <div className={styles.scenarioList}>
                  {demoAgentScenarios.map((scen) => (
                    <button
                      key={scen.id}
                      type="button"
                      aria-pressed={selectedScenarioId === scen.id}
                      className={styles.scenarioBtn}
                      onClick={() => setSelectedScenarioId(scen.id)}
                    >
                      <span className={styles.scenarioTag}>
                        {t(scen.id === "scenario-03" ? "Defensivo / Inyección" : "Consulta Natural")}
                      </span>
                      <strong>“{t(scen.userPrompt)}”</strong>
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: "0.72rem", color: "var(--muted)", margin: "0.5rem 0 0 0" }}>
                  {t("Google ADK ejecuta un pipeline en dos etapas: primero extrae parámetros normalizados y luego llama a herramientas vectoriales RAG en BigQuery.")}</p>
              </Panel>

              {/* Ejecución del Agente */}
              <div className={styles.agentExecution}>
                <Panel title={t("2. Arquitectura de Ejecución en Dos Fases")}>
                  <div className={styles.twoStepFlow}>
                    {/* Paso 1: Extractor */}
                    <div>
                      <div className={styles.stepHeader}>
                        <span className={styles.stepCircle}>1</span>
                        {t("LlmAgent Extractor (Esquema UserQueryExtract)")}</div>
                      <pre className={styles.jsonBox}>
                        {t(JSON.stringify(currentScenario.extractedQuery, null, 2))}
                      </pre>
                    </div>

                    {/* Paso 2: RAG Vector Search */}
                    {currentScenario.vectorSearchResults.length > 0 ? (
                      <div>
                        <div className={styles.stepHeader}>
                          <span className={styles.stepCircle}>2</span>
                          {t("Tool buscar_eventos (BigQuery VECTOR_SEARCH)")}</div>
                        <div className={styles.searchResultsList}>
                          {currentScenario.vectorSearchResults.map((res, i) => (
                            <div key={i} className={styles.searchResultItem}>
                              <div>
                                <strong>{t(res.eventName)}</strong>
                                <div style={{ color: "var(--muted)", fontSize: "0.72rem" }}>
                                  {t(res.venue)} · {t(res.sessions.join(", "))}
                                </div>
                              </div>
                              <span className={styles.searchDistance}>
                                {t("dist: ")}{res.cosineDistance}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="editorial-surface" style={{ padding: "0.75rem", background: "var(--surface)", fontSize: "0.75rem", color: "var(--muted)" }}>
                        {t("Filtro de seguridad activado: no se invoca ninguna tool RAG ante peticiones fuera de dominio o intentos de manipulación de instrucciones.")}</div>
                    )}
                  </div>
                </Panel>

                {/* Respuesta del Agente */}
                <div className={styles.chatBalloon}>
                  <strong>{t("Respuesta Final Generada por el Asistente")}</strong>
                  <p style={{ margin: 0 }}>{t(currentScenario.agentFinalResponse)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
