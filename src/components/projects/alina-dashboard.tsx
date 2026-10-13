"use client";

import { useTranslations } from "@/components/i18n/language-provider";
import { useMemo, useState, type ReactNode } from "react";
import {
  demoCandidateProfiles,
  demoJobOffers,
  type DemoJobOffer,
} from "@/data/alina-demo";
import styles from "./alina-dashboard.module.css";

type AlinaView = "offer" | "cover" | "interview" | "research" | "upskilling";
type CoverTone = "professional" | "close" | "tech";
type CandidateResponseQuality = "strong" | "basic";

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

export function AlinaDashboard() {
  const { t } = useTranslations();
  const [view, setView] = useState<AlinaView>("offer");
  const [jobId, setJobId] = useState<string>(demoJobOffers[0].id);
  const [candidateProfileId, setCandidateProfileId] = useState<string>("senior");
  const [candidateModality, setCandidateModality] = useState<"Remoto" | "Híbrido" | "Presencial">("Remoto");

  // Estados interactivos para las vistas secundarias
  const [coverTone, setCoverTone] = useState<CoverTone>("professional");
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [responseQuality, setResponseQuality] = useState<CandidateResponseQuality>("strong");

  const currentJob = useMemo<DemoJobOffer>(() => {
    return demoJobOffers.find((j) => j.id === jobId) || demoJobOffers[0];
  }, [jobId]);

  const coverage = useMemo(() => {
    return candidateProfileId === "senior"
      ? currentJob.coverage.senior
      : currentJob.coverage.transition;
  }, [currentJob, candidateProfileId]);

  // Cálculo determinista del Match Score según la fórmula del proyecto:
  // match_score = (matched + partial * 0.5) / total * 100 + bonus (5 si modalidad coincide)
  const matchResult = useMemo(() => {
    const totalSkills = currentJob.skills.length;
    const matchedCount = coverage.matched.length;
    const partialCount = coverage.partial.length;
    const baseScore = ((matchedCount + partialCount * 0.5) / totalSkills) * 100;
    const hasModalityBonus = currentJob.modality === candidateModality;
    const bonus = hasModalityBonus ? 5 : 0;
    const finalScore = Math.min(100, Math.round((baseScore + bonus) * 10) / 10);

    return {
      base: Math.round(baseScore * 10) / 10,
      bonus,
      final: finalScore,
      totalSkills,
      matchedCount,
      partialCount,
      missingCount: coverage.missing.length,
      hasModalityBonus,
    };
  }, [currentJob, coverage, candidateModality]);

  const reset = () => {
    setView("offer");
    setJobId(demoJobOffers[0].id);
    setCandidateProfileId("senior");
    setCandidateModality("Remoto");
    setCoverTone("professional");
    setCurrentTurn(1);
    setResponseQuality("strong");
    setCopiedLetter(false);
  };

  const handleCopyLetter = () => {
    const text = t(currentJob.coverLetters[coverTone]);
    navigator.clipboard?.writeText(text);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2500);
  };

  const currentInterviewTurn = useMemo(() => {
    return (
      currentJob.interviewTurns.find((t) => t.turnNumber === currentTurn) ||
      currentJob.interviewTurns[0]
    );
  }, [currentJob, currentTurn]);

  return (
    <div id="dashboard-demo" className={styles.dashboardContainer}>
      <div
        className={styles.dashboard}
        role="region"
        aria-label={t("Demostración interactiva de la aplicación Alina Job Finder")}
      >
        {/* ENCABEZADO Y SELECTOR DE VISTAS */}
        <header className={styles.toolbar}>
          <div>
            <p>{t("Asistente digital de empleo")}</p>
            <h3>{t("Alina · Job Assistant")}</h3>
          </div>
          <div className={styles.viewSwitch} aria-label={t("Módulos de la aplicación")}>
            <button
              type="button"
              aria-pressed={view === "offer"}
              onClick={() => setView("offer")}
            >
              {t("Oferta y Match")}</button>
            <button
              type="button"
              aria-pressed={view === "cover"}
              onClick={() => setView("cover")}
            >
              {t("Carta de Presentación")}</button>
            <button
              type="button"
              aria-pressed={view === "interview"}
              onClick={() => setView("interview")}
            >
              {t("Simulador de Entrevista")}</button>
            <button
              type="button"
              aria-pressed={view === "research"}
              onClick={() => setView("research")}
            >
              {t("Research Empresa")}</button>
            <button
              type="button"
              aria-pressed={view === "upskilling"}
              onClick={() => setView("upskilling")}
            >
              {t("Plan de Upskilling")}</button>
          </div>
        </header>

        {/* BARRA DE FILTROS Y CONTROLES */}
        <div className={styles.filterBar}>
          <div className={styles.filters}>
            <label htmlFor="alina-job">
              {t("Oferta laboral")}<select
                id="alina-job"
                name="alina-job"
                autoComplete="off"
                value={jobId}
                onChange={(e) => {
                  setJobId(e.target.value);
                  setCurrentTurn(1);
                }}
              >
                {demoJobOffers.map((j) => (
                  <option key={j.id} value={j.id}>
                    {t(j.company)} — {t(j.role)}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="alina-modality">
              {t("Preferencia modalidad")}<select
                id="alina-modality"
                name="alina-modality"
                autoComplete="off"
                value={candidateModality}
                onChange={(e) =>
                  setCandidateModality(
                    e.target.value as "Remoto" | "Híbrido" | "Presencial",
                  )
                }
              >
                <option value="Remoto">{t("Remoto")}</option>
                <option value="Híbrido">{t("Híbrido")}</option>
                <option value="Presencial">{t("Presencial")}</option>
              </select>
            </label>

            <label htmlFor="alina-cv">
              {t("Perfil de CV")}<select
                id="alina-cv"
                name="alina-cv"
                autoComplete="off"
                value={candidateProfileId}
                onChange={(e) => setCandidateProfileId(e.target.value)}
              >
                {demoCandidateProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {t(p.label)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.filterActions}>
            <span>{t("Datos simulados · Sin LLMs")}</span>
            <button type="button" onClick={reset}>
              {t("Restablecer")}</button>
          </div>
        </div>

        {/* BARRA DE CONTEXTO */}
        <div className={styles.contextBar}>
          <p>
            {t("Vacante: ")}<strong>{t(currentJob.role)}</strong> · {t(currentJob.company)} ({t(currentJob.location)})
          </p>
          <p>
            {t("Modalidad oferta: ")}<strong>{t(currentJob.modality)}</strong> {t(" · Salario:")}{t(currentJob.salary)}
          </p>
        </div>

        {/* BLOQUE DE KPIS SUPERIORES (RECALCULADOS EN TIEMPO REAL) */}
        <dl className={styles.kpis}>
          <div>
            <dt>{t("Compatibilidad Global")}</dt>
            <dd>{matchResult.final}%</dd>
          </div>
          <div>
            <dt>{t("Skills Cubiertas")}</dt>
            <dd>
              {matchResult.matchedCount} / {matchResult.totalSkills}
            </dd>
          </div>
          <div>
            <dt>{t("Brechas por Cubrir")}</dt>
            <dd>
              {matchResult.missingCount + matchResult.partialCount}
            </dd>
          </div>
          <div>
            <dt>{t("Bonus Modalidad")}</dt>
            <dd>{t(matchResult.hasModalityBonus ? "+5 pts" : "0 pts")}</dd>
          </div>
        </dl>

        {/* CONTENIDO INTERACTIVO SEGÚN LA VISTA ACTIVA */}
        <div className={styles.dashboardGrid}>
          {/* 1. VISTA: OFERTA Y MATCH */}
          {view === "offer" && (
            <>
              <Panel title={t("Detalle de la vacante y auditoría de skills")} className={styles.mainPanel}>
                <dl className={styles.metaList}>
                  <div>
                    <dt>{t("Contrato")}</dt>
                    <dd>{t(currentJob.contract)}</dd>
                  </div>
                  <div>
                    <dt>{t("Ubicación")}</dt>
                    <dd>{t(currentJob.location)}</dd>
                  </div>
                  <div>
                    <dt>{t("Rango Salarial")}</dt>
                    <dd>{t(currentJob.salary)}</dd>
                  </div>
                  <div>
                    <dt>{t("Modalidad")}</dt>
                    <dd>{t(currentJob.modality)}</dd>
                  </div>
                </dl>

                <p className={styles.jobIntro}>{t(currentJob.fullDescription)}</p>

                <div className={styles.skillsTagsGrid}>
                  <div>
                    <div className={styles.skillsGroupTitle}>
                      <span>{t("Habilidades Cubiertas por tu CV (100%)")}</span>
                      <span>{coverage.matched.length} {t(" identificadas")}</span>
                    </div>
                    <div className={styles.skillsTagCloud}>
                      {coverage.matched.map((s) => (
                        <span key={s} className={`${styles.skillBadge} ${styles.badgeMatched}`}>
                          ✓ {t(s)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className={styles.skillsGroupTitle}>
                      <span>{t("Habilidades Parciales (50%)")}</span>
                      <span>{coverage.partial.length} {t(" intermedias")}</span>
                    </div>
                    <div className={styles.skillsTagCloud}>
                      {coverage.partial.length > 0 ? (
                        coverage.partial.map((s) => (
                          <span key={s} className={`${styles.skillBadge} ${styles.badgePartial}`}>
                            ~ {t(s)}
                          </span>
                        ))
                      ) : (
                        <span className={styles.skillBadge} style={{ color: "var(--muted)" }}>
                          {t("Sin habilidades parciales")}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className={styles.skillsGroupTitle}>
                      <span>{t("Habilidades Faltantes (0%)")}</span>
                      <span>{coverage.missing.length} {t(" brechas")}</span>
                    </div>
                    <div className={styles.skillsTagCloud}>
                      {coverage.missing.length > 0 ? (
                        coverage.missing.map((s) => (
                          <span key={s} className={`${styles.skillBadge} ${styles.badgeMissing}`}>
                            ✕ {t(s)}
                          </span>
                        ))
                      ) : (
                        <span className={styles.skillBadge} style={{ color: "#1b6324" }}>
                          {t("¡Perfil 100% cubierto sin faltantes!")}</span>
                      )}
                    </div>
                  </div>
                </div>

                <details className={styles.values}>
                  <summary>{t("Consultar matriz completa de competencias requeridas")}</summary>
                  <table>
                    <caption className="sr-only">
                      {t("Auditoría de competencias requeridas frente al CV del candidato")}</caption>
                    <thead>
                      <tr>
                        <th scope="col">{t("Competencia")}</th>
                        <th scope="col">{t("Nivel Requerido")}</th>
                        <th scope="col">{t("Categoría")}</th>
                        <th scope="col">{t("Estado en CV")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentJob.skills.map((skill) => {
                        const isMatched = coverage.matched.includes(skill.name);
                        const isPartial = coverage.partial.includes(skill.name);
                        const stateLabel = isMatched
                          ? "Cubierta (100%)"
                          : isPartial
                            ? "Parcial (50%)"
                            : "Faltante (0%)";
                        return (
                          <tr key={skill.name}>
                            <th scope="row">{t(skill.name)}</th>
                            <td>{t(skill.levelRequired)}</td>
                            <td>{t(skill.category)}</td>
                            <td>{t(stateLabel)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </details>
              </Panel>

              <Panel title={t("Desglose del Match Score")} className={styles.sidePanel}>
                <div className={styles.formulaBox}>
                  <strong>{t("Fórmula matemática transparente:")}</strong>
                  <code>
                    {t("score = (")}{matchResult.matchedCount} + {matchResult.partialCount} × 0.5) /{t(" ")}
                    {matchResult.totalSkills} × 100
                    {t(matchResult.bonus > 0 ? ` + ${matchResult.bonus} (bonus)` : "")}
                  </code>
                </div>

                <div className={styles.scoreExplanation}>
                  <p>
                    {t("Puntuación base de habilidades: ")}<strong>{matchResult.base}%</strong>.
                  </p>
                  <p style={{ marginTop: "0.5rem" }}>
                    {matchResult.hasModalityBonus ? (
                      <>
                        {t("Se aplica un ")}<strong>{t("+5% de bonus")}</strong> {t(" porque la modalidad de la vacante (")}{t(currentJob.modality)}{t(") coincide con tu preferencia seleccionada (")}{t(candidateModality)}).
                      </>
                    ) : (
                      <>
                        {t("No se aplica bonus de modalidad (")}{t(currentJob.modality)} {t(" frente a tu preferencia en")}{t(candidateModality)}).
                      </>
                    )}
                  </p>
                  <p style={{ marginTop: "1rem", color: "var(--ink)", fontWeight: 650 }}>
                    {t("Veredicto del sistema:")}</p>
                  <p style={{ marginTop: "0.25rem" }}>
                    {t(matchResult.final >= 80
                      ? "Compatibilidad óptima. El perfil cuenta con una alta probabilidad de superar el primer filtro técnico."
                      : matchResult.final >= 60
                        ? "Compatibilidad media. Se recomienda destacar las habilidades transferibles en la carta de presentación."
                        : "Compatibilidad reducida. Requiere plan de upskilling previo para los requisitos obligatorios.")}
                  </p>
                </div>
              </Panel>
            </>
          )}

          {/* 2. VISTA: CARTA DE PRESENTACIÓN */}
          {view === "cover" && (
            <>
              <Panel title={t("Generador estratégico de carta de presentación")} className={styles.mainPanel}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                    {t("Tono del agente escritor:")}</span>
                  <div className={styles.toneSelector} role="group" aria-label={t("Seleccionar tono")}>
                    <button
                      type="button"
                      aria-pressed={coverTone === "professional"}
                      onClick={() => setCoverTone("professional")}
                    >
                      {t("Profesional / Corporativo")}</button>
                    <button
                      type="button"
                      aria-pressed={coverTone === "tech"}
                      onClick={() => setCoverTone("tech")}
                    >
                      {t("Técnico & Datos")}</button>
                    <button
                      type="button"
                      aria-pressed={coverTone === "close"}
                      onClick={() => setCoverTone("close")}
                    >
                      {t("Cercano / Startup")}</button>
                  </div>
                </div>

                <div className={styles.letterTextContainer}>
                  {t(currentJob.coverLetters[coverTone])}
                </div>

                <div className={styles.copyNotice}>
                  <span>{t("Redactado con Google ADK (LlmAgent) · 0 alucinaciones")}</span>
                  <button type="button" className={styles.copyButton} onClick={handleCopyLetter}>
                    {t(copiedLetter ? "¡Copiada al portapapeles!" : "Copiar texto de la carta")}
                  </button>
                </div>
              </Panel>

              <Panel title={t("Auditoría del Agente Crítico (LoopAgent)")} className={styles.sidePanel}>
                <div className={styles.evalCard}>
                  <div>
                    <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Control de Veracidad")}</span>
                    <p style={{ fontSize: "0.8125rem", color: "#1b6324", fontWeight: 650, marginTop: "0.25rem" }}>
                      ✓ {t(currentJob.coverAnalysis.guardrailCheck)}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Puntos Clave Validados:")}</span>
                    <ul className={styles.evalList} style={{ marginTop: "0.5rem" }}>
                      {currentJob.coverAnalysis.keyPoints.map((pt) => (
                        <li key={pt}>{t(pt)}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.75rem" }}>
                    <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Evaluación de Tono:")}</span>
                    <p style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                      {t(currentJob.coverAnalysis.toneAssessment)}
                    </p>
                  </div>
                </div>
              </Panel>
            </>
          )}

          {/* 3. VISTA: SIMULADOR DE ENTREVISTAS */}
          {view === "interview" && (
            <>
              <Panel title={t("Sesión técnica guiada por turnos")} className={styles.mainPanel}>
                <div className={styles.turnHeader}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                    {t("Turno de la entrevista:")}</span>
                  <div className={styles.turnProgress} role="group" aria-label={t("Progreso de la entrevista")}>
                    {currentJob.interviewTurns.map((turn) => (
                      <button
                        key={turn.turnNumber}
                        type="button"
                        className={styles.turnButton}
                        aria-pressed={currentTurn === turn.turnNumber}
                        onClick={() => setCurrentTurn(turn.turnNumber)}
                      >
                        {t("Turno ")}{turn.turnNumber}: {t(turn.topic)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.dialoguePanel}>
                  <div className={styles.interviewerBubble}>
                    <div className={styles.bubbleSender}>{t("Entrevistador Técnico Senior · Alina")}</div>
                    <p>{t(currentInterviewTurn.question)}</p>
                  </div>

                  <div className={styles.candidateBubble}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <div className={styles.bubbleSender}>{t("Tu Respuesta (Texto o Audio Simulado)")}</div>
                      <div className={styles.responseSwitch} role="group" aria-label={t("Variante de respuesta")}>
                        <button
                          type="button"
                          aria-pressed={responseQuality === "strong"}
                          onClick={() => setResponseQuality("strong")}
                        >
                          {t("Respuesta Óptima")}</button>
                        <button
                          type="button"
                          aria-pressed={responseQuality === "basic"}
                          onClick={() => setResponseQuality("basic")}
                        >
                          {t("Respuesta Básica")}</button>
                      </div>
                    </div>
                    <textarea
                      readOnly
                      value={currentInterviewTurn.candidateResponses[responseQuality].text}
                      aria-label={t("Texto de la respuesta del candidato")}
                    />
                  </div>
                </div>
              </Panel>

              <Panel title={t("Rúbrica de evaluación objetiva")} className={styles.sidePanel}>
                <div className={styles.evalCard}>
                  <div className={styles.evalScoreRow}>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Puntuación Turno ")}{currentTurn}
                    </span>
                    <span className={styles.evalScoreValue}>
                      {currentInterviewTurn.candidateResponses[responseQuality].score}
                      <span style={{ fontSize: "1rem", color: "var(--muted)" }}> / 10</span>
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Dictamen del Entrevistador")}</span>
                    <p style={{ fontSize: "0.8125rem", color: "var(--ink)", marginTop: "0.25rem", lineHeight: 1.6 }}>
                      {t(currentInterviewTurn.candidateResponses[responseQuality].evaluation)}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Fortalezas Identificadas")}</span>
                    <ul className={styles.evalList} style={{ marginTop: "0.35rem" }}>
                      {currentInterviewTurn.candidateResponses[responseQuality].strengths.map((str) => (
                        <li key={str}>{t(str)}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.75rem" }}>
                    <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Respuesta Modelo Ideal")}</span>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.25rem", lineHeight: 1.6 }}>
                      {t(currentInterviewTurn.candidateResponses[responseQuality].idealAnswer)}
                    </p>
                  </div>
                </div>
              </Panel>
            </>
          )}

          {/* 4. VISTA: RESEARCH DE EMPRESA */}
          {view === "research" && (
            <>
              <Panel title={t("Inteligencia de empresa: {0}", [t(currentJob.companyIntel.sector)])} className={styles.mainPanel}>
                <dl className={styles.metaList}>
                  <div>
                    <dt>{t("Sector")}</dt>
                    <dd>{t(currentJob.companyIntel.sector)}</dd>
                  </div>
                  <div>
                    <dt>{t("Tamaño")}</dt>
                    <dd>{t(currentJob.companyIntel.size)}</dd>
                  </div>
                  <div>
                    <dt>{t("Fundación")}</dt>
                    <dd>{t(currentJob.companyIntel.founded)}</dd>
                  </div>
                </dl>

                <p className={styles.jobIntro}>{t(currentJob.companyIntel.overview)}</p>

                <div className={styles.intelGrid}>
                  <div className={styles.intelCard}>
                    <h5>{t("Puntos Fuertes Detectados")}</h5>
                    <ul className={styles.evalList}>
                      {currentJob.companyIntel.strengths.map((s) => (
                        <li key={s}>{t(s)}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.intelCard} style={{ background: "#fffdf5" }}>
                    <h5 style={{ color: "#b45309" }}>{t("Señales de Alerta (Red Flags)")}</h5>
                    <ul className={styles.evalList}>
                      {currentJob.companyIntel.redFlags.map((rf) => (
                        <li key={rf}>{t(rf)}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h5 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem", fontWeight: 700 }}>
                    {t("Noticias Recientes Verificadas en Prensa")}</h5>
                  {currentJob.companyIntel.news.map((item) => (
                    <article key={item.headline} className={styles.newsCard}>
                      <h6 className={styles.newsHeadline}>{t(item.headline)}</h6>
                      <div className={styles.newsMeta}>
                        {t("Fuente: ")}{t(item.source)} {t(" · Fecha:")}{t(item.date)}
                      </div>
                      <p className={styles.newsSummary}>{t(item.summary)}</p>
                    </article>
                  ))}
                </div>
              </Panel>

              <Panel title={t("Estrategia para la entrevista")} className={styles.sidePanel}>
                <div className={styles.evalCard}>
                  <div>
                    <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Guardrail de Veracidad al CV")}</span>
                    <p style={{ fontSize: "0.8125rem", color: "var(--ink)", marginTop: "0.35rem", lineHeight: 1.6 }}>
                      {t(currentJob.companyIntel.cvGuardrailTip)}
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.75rem" }}>
                    <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Preguntas Inteligentes Recomendadas")}</span>
                    <ul className={styles.evalList} style={{ marginTop: "0.5rem" }}>
                      {currentJob.companyIntel.smartQuestions.map((q) => (
                        <li key={q}>{t(q)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Panel>
            </>
          )}

          {/* 5. VISTA: PLAN DE UPSKILLING */}
          {view === "upskilling" && (
            <>
              <Panel title={t("Brechas de habilidades y recursos priorizados")} className={styles.mainPanel}>
                <p className={styles.jobIntro}>{t(currentJob.upskilling.strategicOverview)}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {currentJob.upskilling.gaps.map((gap) => (
                    <div key={gap.skill} className={styles.intelCard}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
                        <strong style={{ fontSize: "1rem" }}>{t(gap.skill)}</strong>
                        <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                          {t("Prioridad #")}{gap.priority} · {t(gap.timeEstimate)}
                        </span>
                      </div>
                      <div style={{ marginBottom: "0.75rem", fontSize: "0.75rem", color: gap.difficulty.startsWith("Alta") ? "#b45309" : "var(--muted)" }}>
                        {t("Dificultad de adquisición: ")}{t(gap.difficulty)}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {gap.resources.map((res) => (
                          <div
                            key={res.title}
                            className="editorial-surface"
                            style={{
                              padding: "0.5rem 0.75rem",
                              background: "var(--canvas)",
                              border: "1px solid var(--line)",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              fontSize: "0.75rem",
                            }}
                          >
                            <span>
                              <strong>{t(res.type)}:</strong> {t(res.title)} ({t(res.platform)})
                            </span>
                            <span style={{ color: "var(--muted)", textDecoration: "underline" }}>
                              {t("Enlace formativo")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title={t("Roadmap temporal")} className={styles.sidePanel}>
                <div className={styles.evalCard}>
                  <div>
                    <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Semana 1: Fundamentos")}</span>
                    <p style={{ fontSize: "0.8125rem", color: "var(--ink)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                      {t(currentJob.upskilling.roadmap.week1)}
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.75rem" }}>
                    <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Mes 1: Proyecto Práctico")}</span>
                    <p style={{ fontSize: "0.8125rem", color: "var(--ink)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                      {t(currentJob.upskilling.roadmap.month1)}
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.75rem" }}>
                    <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                      {t("Trimestre 1: Consolidación")}</span>
                    <p style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                      {t(currentJob.upskilling.roadmap.quarter1)}
                    </p>
                  </div>
                </div>
              </Panel>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
