"use client";

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
  return (
    <section className={`${styles.panel} ${className}`} aria-label={title}>
      <h4>{title}</h4>
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
      reason = `Plan destacado en ${candidateEvent.city} para este fin de semana`;
    } else if (cityMatch) {
      reason = `Por coincidencia con tu ciudad habitual (${candidateEvent.city})`;
    } else if (!isOwnCluster) {
      reason = `Descubrimiento afín desde ${clusterSource}`;
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
  }, [candidateEvent, selectedClusterId, activeProfile, forceSameCity, urgencyDays]);

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
            <p>Demostrador interactivo · NextPlan</p>
            <h3>Plataforma de Recomendación de Eventos</h3>
          </div>
          <nav className={styles.viewSwitch} aria-label="Modos de demostración">
            <button
              type="button"
              aria-pressed={view === "swipes"}
              onClick={() => setView("swipes")}
            >
              1. Explorador & Swipes
            </button>
            <button
              type="button"
              aria-pressed={view === "clustering"}
              onClick={() => setView("clustering")}
            >
              2. Clustering & Scoring
            </button>
            <button
              type="button"
              aria-pressed={view === "planner"}
              onClick={() => setView("planner")}
            >
              3. Agente IA & RAG
            </button>
          </nav>
        </header>

        {/* BARRA DE CONTEXTO */}
        <div className={styles.contextBar}>
          <span>
            {view === "swipes" && (
              <>
                Modo: <strong>Captura asíncrona de swipes en tiempo real hacia Pub/Sub</strong>
              </>
            )}
            {view === "clustering" && (
              <>
                Modo: <strong>Materialización de candidatos en BigQuery con scoring multivariable</strong>
              </>
            )}
            {view === "planner" && (
              <>
                Modo: <strong>Orquestación RAG en dos fases con Google ADK sobre Vertex AI</strong>
              </>
            )}
          </span>
          <button type="button" onClick={resetAll} className={styles.resetButton}>
            Reiniciar simulador
          </button>
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
                    {currentEvent.category}
                  </span>
                  <span className={styles.badge}>{currentEvent.city}</span>
                  <span className={styles.badge}>{currentEvent.indoorOutdoor}</span>
                  <span className={styles.badge}>{currentEvent.timeSlot}</span>
                  <span className={styles.badge}>{currentEvent.priceRange}</span>
                </div>

                <h4 className={styles.eventTitle}>{currentEvent.name}</h4>
                <p style={{ color: "var(--muted)", margin: 0 }}>
                  {currentEvent.description}
                </p>

                <dl className={styles.eventMetaGrid}>
                  <div>
                    <dt>Recinto</dt>
                    <dd>{currentEvent.venue}</dd>
                  </div>
                  <div>
                    <dt>Fecha</dt>
                    <dd>{currentEvent.date}</dd>
                  </div>
                  <div>
                    <dt>Vibe inferido (Gemini)</dt>
                    <dd>{currentEvent.vibe}</dd>
                  </div>
                  <div>
                    <dt>Ocasión idónea</dt>
                    <dd>{currentEvent.occasionTags.join(" · ")}</dd>
                  </div>
                </dl>

                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>
                    Prompt de dirección de arte (ia_motor_imagenes)
                  </span>
                  <div className={styles.artPromptBox}>
                    &ldquo;{currentEvent.artPrompt}&rdquo;
                  </div>
                </div>

                {/* Acciones de swipe */}
                <div className={styles.swipeActions}>
                  <button
                    type="button"
                    className={`${styles.swipeBtn} ${styles.swipeBtnDislike}`}
                    onClick={() => handleSwipe("dislike")}
                    aria-label="Descartar evento"
                  >
                    ✕ Descartar
                  </button>
                  <button
                    type="button"
                    className={styles.swipeBtn}
                    onClick={() => handleSwipe("saved")}
                    aria-label="Guardar en favoritos"
                  >
                    ★ Guardar
                  </button>
                  <button
                    type="button"
                    className={`${styles.swipeBtn} ${styles.swipeBtnLike}`}
                    onClick={() => handleSwipe("like")}
                    aria-label="Me gusta este plan"
                  >
                    ♥ Me interesa
                  </button>
                </div>
              </div>

              {/* Panel lateral: Telemetría y dbt staging */}
              <div className={styles.swipeTelemetry}>
                <Panel title="Telemetría de interacción (Pub/Sub → BigQuery)">
                  <div className={styles.telemetryStats}>
                    <div className={styles.statBox}>
                      <div className={styles.statNumber}>{swipeStats.total}</div>
                      <div className={styles.statLabel}>Swipes sesión</div>
                    </div>
                    <div className={styles.statBox}>
                      <div className={styles.statNumber}>{swipeStats.likeRate}%</div>
                      <div className={styles.statLabel}>Tasa de Like</div>
                    </div>
                    <div className={styles.statBox}>
                      <div className={styles.statNumber}>{swipeStats.avgDwell} ms</div>
                      <div className={styles.statLabel}>Dwell time medio</div>
                    </div>
                  </div>
                </Panel>

                <Panel title="Event Stream Reciente (stg_swipes)">
                  <ul className={styles.interactionLog} aria-label="Histórico de interacciones">
                    {interactionHistory.map((item) => (
                      <li key={item.id}>
                        <span>
                          <strong>[{item.action.toUpperCase()}]</strong> {item.eventName.slice(0, 26)}...
                        </span>
                        <span>{item.dwellMs}ms</span>
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: "0.72rem", color: "var(--muted)", margin: 0 }}>
                    Los eventos se emiten a Pub/Sub (`swipe-events`) con envelope JSON que incluye dwell_ms y snapshot contextual para dbt.
                  </p>
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
              <Panel title="1. Selección de Clúster de Usuario (K-Means)">
                <div className={styles.profileSelector} role="radiogroup" aria-label="Perfiles de clúster">
                  {Object.values(demoProfiles).map((profile) => (
                    <button
                      key={profile.id}
                      type="button"
                      role="radio"
                      aria-checked={selectedClusterId === profile.id}
                      className={styles.profileOption}
                      onClick={() => setSelectedClusterId(profile.id)}
                    >
                      <strong>{profile.name}</strong>
                      <p>
                        Categoría: {profile.primaryCategory} · Ciudad: {profile.homeCity}
                      </p>
                      <ul style={{ paddingLeft: "1.1rem", margin: "0.4rem 0 0 0", fontSize: "0.72rem", color: "var(--muted)" }}>
                        {profile.traits.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--muted)" }}>
                  <strong>Vecindad de Clúster:</strong> Vecino 1 ({activeProfile.neighborWeights.neighbor1.name}) = 60%, Vecino 2 ({activeProfile.neighborWeights.neighbor2.name}) = 40%, Vecino 3 ({activeProfile.neighborWeights.neighbor3.name}) = 25%.
                </div>
              </Panel>

              {/* Calculadora de Scoring */}
              <Panel title="2. Motor de Scoring Multivariable (BigQuery Serving)">
                <div className={styles.scoringCalculator}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                      Seleccionar Evento Candidato:
                    </label>
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
                          {evt.name} ({evt.category} · {evt.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Factores de ajuste */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", display: "block" }}>
                        Coincidencia de ciudad
                      </label>
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
                        {forceSameCity ? "Sí (+0.08 Boost)" : "No (+0.00 Boost)"}
                      </button>
                    </div>

                    <div>
                      <label style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", display: "block" }}>
                        Días restantes al evento ({urgencyDays}d)
                      </label>
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
                      Score = (PesoClúster × AfinidadBase) + HomeCityBoost + UrgencyBoost
                    </code>
                    <div className={styles.formulaTerms}>
                      <div className={styles.termBox}>
                        <div className={styles.termValue}>
                          {scoringBreakdown.baseContribution}
                        </div>
                        <div className={styles.termLabel}>
                          Base ({scoringBreakdown.clusterWeight} × {scoringBreakdown.baseAffinity})
                        </div>
                      </div>
                      <div className={styles.termBox}>
                        <div className={styles.termValue}>
                          +{scoringBreakdown.homeCityBoost.toFixed(2)}
                        </div>
                        <div className={styles.termLabel}>Ciudad Boost</div>
                      </div>
                      <div className={styles.termBox}>
                        <div className={styles.termValue}>
                          +{scoringBreakdown.urgencyBoost.toFixed(3)}
                        </div>
                        <div className={styles.termLabel}>Urgencia Boost</div>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta de resultado final */}
                  <div className={styles.candidateCard}>
                    <div className={styles.candidateHeader}>
                      <div>
                        <span className={styles.candidateRank}>Puntuación Final</span>
                        <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                          Fuente: {scoringBreakdown.clusterSource}
                        </div>
                      </div>
                      <div className={styles.candidateScore}>
                        {(scoringBreakdown.totalScore * 100).toFixed(1)} / 100
                      </div>
                    </div>

                    <div className={styles.reasonBadge}>
                      Motivo explicable: <strong>{scoringBreakdown.reason}</strong>
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
              <Panel title="1. Escenarios de Consulta de Usuario">
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
                        {scen.id === "scenario-03" ? "Defensivo / Inyección" : "Consulta Natural"}
                      </span>
                      <strong>&ldquo;{scen.userPrompt}&rdquo;</strong>
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: "0.72rem", color: "var(--muted)", margin: "0.5rem 0 0 0" }}>
                  Google ADK ejecuta un pipeline en dos etapas: primero extrae parámetros normalizados y luego llama a herramientas vectoriales RAG en BigQuery.
                </p>
              </Panel>

              {/* Ejecución del Agente */}
              <div className={styles.agentExecution}>
                <Panel title="2. Arquitectura de Ejecución en Dos Fases">
                  <div className={styles.twoStepFlow}>
                    {/* Paso 1: Extractor */}
                    <div>
                      <div className={styles.stepHeader}>
                        <span className={styles.stepCircle}>1</span>
                        LlmAgent Extractor (Esquema UserQueryExtract)
                      </div>
                      <pre className={styles.jsonBox}>
                        {JSON.stringify(currentScenario.extractedQuery, null, 2)}
                      </pre>
                    </div>

                    {/* Paso 2: RAG Vector Search */}
                    {currentScenario.vectorSearchResults.length > 0 ? (
                      <div>
                        <div className={styles.stepHeader}>
                          <span className={styles.stepCircle}>2</span>
                          Tool buscar_eventos (BigQuery VECTOR_SEARCH)
                        </div>
                        <div className={styles.searchResultsList}>
                          {currentScenario.vectorSearchResults.map((res, i) => (
                            <div key={i} className={styles.searchResultItem}>
                              <div>
                                <strong>{res.eventName}</strong>
                                <div style={{ color: "var(--muted)", fontSize: "0.72rem" }}>
                                  {res.venue} · {res.sessions.join(", ")}
                                </div>
                              </div>
                              <span className={styles.searchDistance}>
                                dist: {res.cosineDistance}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: "0.75rem", background: "var(--surface)", fontSize: "0.75rem", color: "var(--muted)" }}>
                        Filtro de seguridad activado: no se invoca ninguna tool RAG ante peticiones fuera de dominio o intentos de manipulación de instrucciones.
                      </div>
                    )}
                  </div>
                </Panel>

                {/* Respuesta del Agente */}
                <div className={styles.chatBalloon}>
                  <strong>Respuesta Final Generada por el Asistente</strong>
                  <p style={{ margin: 0 }}>{currentScenario.agentFinalResponse}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
