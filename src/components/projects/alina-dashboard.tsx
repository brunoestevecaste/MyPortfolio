"use client";

import { useMemo, useState } from "react";
import {
  alinaOptimizationMetrics,
  sampleAgentOutputs,
  sampleCandidateProfile,
  sampleJobOffers,
  type SampleJobOffer,
} from "@/data/alina";
import styles from "./alina-dashboard.module.css";

type DashboardTab = "matcher" | "agents" | "architecture";
type AgentTab = "coverLetter" | "interview" | "companyResearch" | "upskilling";

export function AlinaDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("matcher");
  const [selectedJobId, setSelectedJobId] = useState<string>(sampleJobOffers[0].id);
  const [selectedAgent, setSelectedAgent] = useState<AgentTab>("coverLetter");

  const currentJob = useMemo<SampleJobOffer>(() => {
    return sampleJobOffers.find((job) => job.id === selectedJobId) || sampleJobOffers[0];
  }, [selectedJobId]);

  // Cálculo determinista del Match Score según la fórmula del proyecto:
  // match_score = (matched_skills + partial_skills * 0.5) / total_skills * 100 + bonus (5 si modalidad coincide)
  const matchResult = useMemo(() => {
    const totalSkills = currentJob.requiredSkills.length;
    const matchedCount = currentJob.sampleMatched.length;
    const partialCount = currentJob.samplePartial.length;
    const baseScore = ((matchedCount + partialCount * 0.5) / totalSkills) * 100;
    const hasModalityBonus = currentJob.modality === sampleCandidateProfile.preferredModality;
    const bonus = hasModalityBonus ? 5 : 0;
    const finalScore = Math.min(100, Math.round((baseScore + bonus) * 10) / 10);

    return {
      base: Math.round(baseScore * 10) / 10,
      bonus,
      final: finalScore,
      totalSkills,
      matchedCount,
      partialCount,
      missingCount: currentJob.sampleMissing.length,
    };
  }, [currentJob]);

  return (
    <div
      className={styles.dashboardContainer}
      role="region"
      aria-label="Demostrador interactivo de arquitectura y matching de Alina"
    >
      <header className={styles.toolbar}>
        <div>
          <span className={styles.selectorLabel}>Demostración interactiva</span>
          <h3 className={styles.toolbarTitle}>Explorador de Arquitectura y Agentes</h3>
        </div>
        <div className={styles.viewTabs} role="tablist" aria-label="Secciones del demostrador">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "matcher"}
            className={`${styles.tabButton} ${activeTab === "matcher" ? styles.tabButtonActive : ""}`}
            onClick={() => setActiveTab("matcher")}
          >
            Calculador de Match Score
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "agents"}
            className={`${styles.tabButton} ${activeTab === "agents" ? styles.tabButtonActive : ""}`}
            onClick={() => setActiveTab("agents")}
          >
            Agentes Especializados
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "architecture"}
            className={`${styles.tabButton} ${activeTab === "architecture" ? styles.tabButtonActive : ""}`}
            onClick={() => setActiveTab("architecture")}
          >
            Métricas de Arquitectura
          </button>
        </div>
      </header>

      <div className={styles.contentArea}>
        {/* PESTAÑA 1: CALCULADOR DE MATCH SCORE */}
        {activeTab === "matcher" && (
          <div>
            <div className={styles.jobSelectorRow}>
              <span className={styles.selectorLabel}>Seleccionar oferta tipo:</span>
              <div className={styles.jobPillGroup} role="group" aria-label="Ofertas disponibles">
                {sampleJobOffers.map((job) => (
                  <button
                    key={job.id}
                    type="button"
                    className={`${styles.jobPill} ${job.id === selectedJobId ? styles.jobPillActive : ""}`}
                    onClick={() => setSelectedJobId(job.id)}
                  >
                    {job.role}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.matchOverview}>
              <div className={styles.scoreBlock}>
                <span className={styles.scoreTag}>Compatibilidad Calculada</span>
                <div className={styles.scoreValue}>
                  {matchResult.final}
                  <span className={styles.scoreUnit}>%</span>
                </div>
                <div className={styles.scoreFormula}>
                  match_score = ({matchResult.matchedCount} + {matchResult.partialCount} × 0.5) / {matchResult.totalSkills} × 100
                  {matchResult.bonus > 0 ? ` + ${matchResult.bonus} pts (modalidad)` : ""}
                </div>
              </div>

              <div className={styles.jobDetailsBlock}>
                <h4>{currentJob.role} · {currentJob.company}</h4>
                <div className={styles.jobMeta}>
                  <span>Ubicación: {currentJob.location}</span>
                  <span>Modalidad: {currentJob.modality}</span>
                  <span>Candidato: {sampleCandidateProfile.preferredModality} (Preferencia)</span>
                </div>
                <p className={styles.jobDescription}>{currentJob.description}</p>
              </div>
            </div>

            <div className={styles.skillsBreakdownGrid}>
              <div className={styles.skillsColumn}>
                <div className={styles.skillsColumnHeader}>
                  <span className={`${styles.skillsColumnTitle} ${styles.matchedTitle}`}>
                    Cubiertas (100%)
                  </span>
                  <span className={styles.skillsCount}>{currentJob.sampleMatched.length} skills</span>
                </div>
                <ul className={styles.skillsList}>
                  {currentJob.sampleMatched.map((skill) => (
                    <li key={skill} className={styles.skillItem}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.skillsColumn}>
                <div className={styles.skillsColumnHeader}>
                  <span className={`${styles.skillsColumnTitle} ${styles.partialTitle}`}>
                    Parciales (50%)
                  </span>
                  <span className={styles.skillsCount}>{currentJob.samplePartial.length} skills</span>
                </div>
                <ul className={styles.skillsList}>
                  {currentJob.samplePartial.length > 0 ? (
                    currentJob.samplePartial.map((skill) => (
                      <li key={skill} className={styles.skillItem}>{skill}</li>
                    ))
                  ) : (
                    <li className={styles.skillItem} style={{ color: "var(--muted)" }}>
                      Sin brechas parciales
                    </li>
                  )}
                </ul>
              </div>

              <div className={styles.skillsColumn}>
                <div className={styles.skillsColumnHeader}>
                  <span className={`${styles.skillsColumnTitle} ${styles.missingTitle}`}>
                    Faltantes (0%)
                  </span>
                  <span className={styles.skillsCount}>{currentJob.sampleMissing.length} skills</span>
                </div>
                <ul className={styles.skillsList}>
                  {currentJob.sampleMissing.length > 0 ? (
                    currentJob.sampleMissing.map((skill) => (
                      <li key={skill} className={styles.skillItem}>{skill}</li>
                    ))
                  ) : (
                    <li className={styles.skillItem} style={{ color: "var(--muted)" }}>
                      Perfil 100% cubierto
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 2: AGENTES ESPECIALIZADOS */}
        {activeTab === "agents" && (
          <div>
            <nav className={styles.agentNav} aria-label="Agentes del sistema">
              <button
                type="button"
                className={`${styles.agentNavButton} ${selectedAgent === "coverLetter" ? styles.agentNavButtonActive : ""}`}
                onClick={() => setSelectedAgent("coverLetter")}
              >
                Carta de Presentación
              </button>
              <button
                type="button"
                className={`${styles.agentNavButton} ${selectedAgent === "interview" ? styles.agentNavButtonActive : ""}`}
                onClick={() => setSelectedAgent("interview")}
              >
                Simulador de Entrevistas
              </button>
              <button
                type="button"
                className={`${styles.agentNavButton} ${selectedAgent === "companyResearch" ? styles.agentNavButtonActive : ""}`}
                onClick={() => setSelectedAgent("companyResearch")}
              >
                Research de Empresa
              </button>
              <button
                type="button"
                className={`${styles.agentNavButton} ${selectedAgent === "upskilling" ? styles.agentNavButtonActive : ""}`}
                onClick={() => setSelectedAgent("upskilling")}
              >
                Plan de Upskilling
              </button>
            </nav>

            {selectedAgent === "coverLetter" && (
              <div className={styles.agentCard}>
                <div className={styles.agentHeader}>
                  <h4 className={styles.agentTitle}>{sampleAgentOutputs.coverLetter.title}</h4>
                  <span className={styles.agentRoleTag}>{sampleAgentOutputs.coverLetter.role}</span>
                </div>
                <p className={styles.letterBody}>{sampleAgentOutputs.coverLetter.letterText}</p>
                <div>
                  <span className={styles.selectorLabel}>Puntos clave validados por el crítico:</span>
                  <ul className={styles.agentExtraList}>
                    {sampleAgentOutputs.coverLetter.keyPoints.map((pt) => (
                      <li key={pt} className={styles.agentExtraItem}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {selectedAgent === "interview" && (
              <div className={styles.agentCard}>
                <div className={styles.agentHeader}>
                  <h4 className={styles.agentTitle}>{sampleAgentOutputs.interview.title}</h4>
                  <span className={styles.agentRoleTag}>{sampleAgentOutputs.interview.role}</span>
                </div>
                <div className={styles.dialogueBox}>
                  <div className={styles.questionBubble}>
                    <strong>Pregunta del entrevistador técnico</strong>
                    <p>{sampleAgentOutputs.interview.question}</p>
                  </div>
                  <div className={styles.answerBubble}>
                    <strong>Respuesta del candidato (Texto / Audio)</strong>
                    <p>{sampleAgentOutputs.interview.candidateAnswer}</p>
                  </div>
                </div>
                <div className={styles.evaluationPanel}>
                  <div className={styles.evalHeader}>
                    <span className={styles.selectorLabel}>Evaluación según rúbrica interna</span>
                    <strong className={styles.evalScore}>{sampleAgentOutputs.interview.evaluation.score} / 10</strong>
                  </div>
                  <p style={{ fontSize: "0.8125rem", marginBottom: "0.75rem" }}>
                    {sampleAgentOutputs.interview.evaluation.summary}
                  </p>
                  <ul className={styles.agentExtraList}>
                    {sampleAgentOutputs.interview.evaluation.strengths.map((str) => (
                      <li key={str} className={styles.agentExtraItem}>{str}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {selectedAgent === "companyResearch" && (
              <div className={styles.agentCard}>
                <div className={styles.agentHeader}>
                  <h4 className={styles.agentTitle}>{sampleAgentOutputs.companyResearch.title}</h4>
                  <span className={styles.agentRoleTag}>{sampleAgentOutputs.companyResearch.company} · {sampleAgentOutputs.companyResearch.sector}</span>
                </div>
                <p style={{ fontSize: "0.8125rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  {sampleAgentOutputs.companyResearch.summary}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
                  <div style={{ padding: "1rem", background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <span className={styles.selectorLabel} style={{ color: "var(--signal)" }}>Puntos Fuertes</span>
                    <ul className={styles.agentExtraList}>
                      {sampleAgentOutputs.companyResearch.strengths.map((s) => (
                        <li key={s} className={styles.agentExtraItem}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ padding: "1rem", background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <span className={styles.selectorLabel} style={{ color: "#d97706" }}>Posibles Red Flags</span>
                    <ul className={styles.agentExtraList}>
                      {sampleAgentOutputs.companyResearch.redFlags.map((rf) => (
                        <li key={rf} className={styles.agentExtraItem}>{rf}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ padding: "1rem", background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <span className={styles.selectorLabel}>Guardrail de Fidelidad al CV</span>
                  <p style={{ fontSize: "0.8125rem", marginTop: "0.5rem", color: "var(--foreground)" }}>
                    {sampleAgentOutputs.companyResearch.cvGuardrailAdvice}
                  </p>
                </div>
              </div>
            )}

            {selectedAgent === "upskilling" && (
              <div className={styles.agentCard}>
                <div className={styles.agentHeader}>
                  <h4 className={styles.agentTitle}>{sampleAgentOutputs.upskilling.title}</h4>
                  <span className={styles.agentRoleTag}>{sampleAgentOutputs.upskilling.role}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  {sampleAgentOutputs.upskilling.gaps.map((gap) => (
                    <div key={gap.skill} style={{ padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                        <strong style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: "1rem" }}>{gap.skill}</strong>
                        <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Prioridad #{gap.priority} · {gap.estimatedTime}</span>
                      </div>
                      <ul className={styles.agentExtraList}>
                        {gap.resources.map((res) => (
                          <li key={res.name} className={styles.agentExtraItem}>
                            <strong>{res.type}:</strong> {res.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "1rem", background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <span className={styles.selectorLabel}>Resumen Estratégico</span>
                  <p style={{ fontSize: "0.8125rem", marginTop: "0.5rem", color: "var(--muted)" }}>
                    {sampleAgentOutputs.upskilling.strategicSummary}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA 3: MÉTRICAS DE ARQUITECTURA */}
        {activeTab === "architecture" && (
          <div>
            <div className={styles.benchmarkGrid}>
              {alinaOptimizationMetrics.map((item) => (
                <div key={item.metric} className={styles.metricCard}>
                  <div className={styles.metricName}>{item.metric}</div>
                  <div className={styles.metricComparison}>
                    <span className={styles.metricBefore}>
                      {item.oneshot} {item.unit}
                    </span>
                    <span className={styles.metricAfter}>
                      {item.twostep} {item.unit}
                    </span>
                  </div>
                  <div className={styles.metricGain}>
                    {item.reduction} de optimización
                  </div>
                  <p className={styles.metricDesc}>{item.description}</p>
                </div>
              ))}
            </div>

            <div className={styles.architectureNarrative}>
              <h4>Desacoplar Razonamiento Libre de Salida JSON Estricta</h4>
              <p>
                Pedir a un modelo que busque fuentes en internet, razone sobre lagunas competenciales y formatee
                simultáneamente un payload JSON estricto eleva la probabilidad de errores sintácticos y exige prompts
                desproporcionados.
              </p>
              <p style={{ marginTop: "0.5rem" }}>
                La arquitectura de Alina en 2 pasos resuelve esta fricción: el Agente ADK investiga y reflexiona en
                texto libre con sus herramientas (Paso 1), y un paso determinista y acotado traduce el texto a un
                esquema JSON predecible (Paso 2).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
