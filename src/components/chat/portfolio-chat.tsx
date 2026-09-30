"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { MAX_QUESTION_LENGTH } from "@/lib/chat/contracts";
import { usePortfolioChat } from "./use-portfolio-chat";
import { ConversationScrollbar } from "./conversation-scrollbar";
import styles from "./portfolio-chat.module.css";

const suggestions = ["¿Qué proyectos de IA has desarrollado?", "¿Cuál es tu experiencia profesional?", "¿Cómo conectas datos y negocio?"];

function Avatar({ visitor = false }: { visitor?: boolean }) {
  return visitor ? (
    <span className={`${styles.avatar} ${styles.visitorAvatar}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.35">
        <circle cx="16" cy="11" r="5" />
        <path d="M6 27c0-6 4-10 10-10s10 4 10 10" />
      </svg>
    </span>
  ) : <Image className={styles.avatar} src="/chat/bruno-avatar.webp" width={44} height={44} alt="" sizes="44px" />;
}

export function PortfolioChat() {
  const chat = usePortfolioChat();
  const [draft, setDraft] = useState("");
  const transcript = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const followsEnd = useRef(true);
  const busy = chat.status !== "idle";
  const lastMessage = chat.messages.at(-1)?.content;

  useEffect(() => {
    const element = transcript.current;
    if (element && followsEnd.current) element.scrollTop = element.scrollHeight;
  }, [lastMessage, chat.messages.length, chat.status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    followsEnd.current = true;
    if (await chat.send(draft)) setDraft("");
    input.current?.focus({ preventScroll: true });
  }

  return (
    <section className={styles.layout} aria-label="Chat con el asistente de Bruno">
      <div className={styles.chat}>
        <div className={styles.scrollArea}>
          <div ref={transcript} id="portfolio-conversation" className={styles.transcript} role="log" aria-label="Conversación con el asistente de Bruno" aria-live="off" tabIndex={0}
            onScroll={() => { const element = transcript.current; if (element) followsEnd.current = element.scrollHeight - element.scrollTop - element.clientHeight < 80; }}>
            <div>
              <div className={styles.message}>
                <Avatar />
                <div className={styles.bubble}><span className={styles.speaker}>Asistente de Bruno</span><p>Hola. Soy el asistente de IA de Bruno. Puedo contarte en qué ha trabajado, qué ha estudiado y cómo aborda sus proyectos. ¿Por dónde empezamos?</p></div>
              </div>
              {chat.messages.map((message) => (
                <div key={message.id} className={`${styles.message} ${message.role === "user" ? styles.outgoing : ""}`}>
                  <Avatar visitor={message.role === "user"} />
                  <div className={styles.bubble}>
                    <span className={styles.speaker}>{message.role === "user" ? "Tú" : "Asistente de Bruno"}</span>
                    <p>{message.content || "Escribiendo…"}</p>
                    {message.role === "assistant" && message.content && !message.complete && !busy ? <span className={styles.partial}>Respuesta incompleta</span> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ConversationScrollbar target={transcript} />
        </div>
        {!chat.messages.length ? <div className={styles.suggestions} aria-label="Preguntas para empezar">
          {suggestions.map((question) => <button key={question} type="button" onClick={() => { followsEnd.current = true; void chat.send(question); }} disabled={busy || chat.cooldown > 0}>{question}</button>)}
        </div> : null}
        {chat.messages.length ? <button type="button" className={styles.reset} onClick={chat.reset} disabled={busy}>Reiniciar</button> : null}
        <form className={styles.form} onSubmit={submit}>
          <label htmlFor="portfolio-question">Tu pregunta</label>
          <div className={styles.composer}>
            <textarea ref={input} id="portfolio-question" name="question" rows={2} autoComplete="off" maxLength={MAX_QUESTION_LENGTH} readOnly={busy} placeholder="Por ejemplo, ¿qué hiciste en Alina?…" value={draft} onChange={(event) => setDraft(event.target.value)} aria-describedby="chat-feedback" aria-invalid={Boolean(chat.error)}
              onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} />
            {busy ? <button key="stop" className={styles.send} type="button" onClick={(event) => { event.preventDefault(); chat.stop(); }}>Detener</button> : <button key="send" className={styles.send} type="submit" disabled={chat.cooldown > 0}>{chat.cooldown > 0 ? "Espera" : "Enviar"}</button>}
          </div>
          <div className={styles.feedback} id="chat-feedback" role="status" aria-live="polite">
            {chat.error || (busy ? "Escribiendo…" : "")}{chat.cooldown > 0 ? ` Puedes volver a enviar en ${chat.cooldown} s.` : ""}
          </div>
        </form>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{chat.announcement}</p>
      </div>
    </section>
  );
}
