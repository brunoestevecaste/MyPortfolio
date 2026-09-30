"use client";

import { useEffect, useRef, useState } from "react";
import { MAX_ANSWER_LENGTH, MAX_HISTORY_MESSAGES, MAX_QUESTION_LENGTH, type ChatMessage } from "@/lib/chat/contracts";
import { createTextReveal } from "@/lib/chat/text-reveal";

export type ConversationMessage = ChatMessage & { id: string; complete: boolean };
type Status = "idle" | "thinking" | "streaming";

export function usePortfolioChat() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [retryAt, setRetryAt] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const active = useRef<AbortController | null>(null);
  const history = useRef<ChatMessage[]>([]);

  useEffect(() => () => active.current?.abort(), []);
  useEffect(() => {
    if (!retryAt) return;
    const update = () => setCooldown(Math.max(0, Math.ceil((retryAt - Date.now()) / 1_000)));
    update();
    const timer = setInterval(update, 1_000);
    return () => clearInterval(timer);
  }, [retryAt]);

  async function send(question: string): Promise<boolean> {
    const content = question.trim();
    if (active.current || Date.now() < retryAt) return false;
    if (!content || content.length > MAX_QUESTION_LENGTH) {
      setError("Escribe una pregunta de entre 1 y 800 caracteres.");
      return false;
    }
    const abort = new AbortController();
    active.current = abort;
    const answerId = crypto.randomUUID();
    const pending: ChatMessage[] = [...history.current.slice(-(MAX_HISTORY_MESSAGES - 1)), { role: "user", content }];
    // Drop oldest PAIRS so long answers never make a subsequent request invalid.
    while (pending.length > 1 && (pending.reduce((sum, message) => sum + message.content.length, 0) > 10_000 || new TextEncoder().encode(JSON.stringify({ messages: pending })).length > 16_384)) pending.splice(0, 2);
    setMessages((previous) => [...previous.slice(-18), { id: crypto.randomUUID(), role: "user", content, complete: true }, { id: answerId, role: "assistant", content: "", complete: false }]);
    setError("");
    setStatus("thinking");
    setAnnouncement("El asistente está preparando una respuesta.");
    let answer = "";
    let displayed = "";
    let complete = false;
    let receivedDone = false;
    let timedOut = false;
    const reveal = createTextReveal((text) => {
      displayed = text;
      setMessages((previous) => previous.map((message) => message.id === answerId ? { ...message, content: text } : message));
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const stopReveal = () => reveal.stop();
    abort.signal.addEventListener("abort", stopReveal, { once: true });
    const timer = setTimeout(() => { timedOut = true; abort.abort(); }, 35_000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: pending }), signal: abort.signal,
      });
      if (!response.ok) {
        if (response.status === 429) {
          const seconds = Number(response.headers.get("Retry-After"));
          const delay = Number.isFinite(seconds) && seconds > 0 ? Math.min(seconds, 86_400) : 60;
          setCooldown(delay); setRetryAt(Date.now() + delay * 1_000);
        }
        const failure: unknown = await response.json().catch(() => null);
        throw new Error(failure && typeof failure === "object" && "error" in failure && typeof failure.error === "string" ? failure.error : "No se ha podido enviar. Inténtalo más tarde o contacta con Bruno.");
      }
      if (!response.body) throw new Error("No se ha recibido una respuesta. Vuelve a intentarlo.");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      try {
        while (true) {
          const { value, done } = await reader.read();
          buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
          let newline: number;
          while ((newline = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, newline); buffer = buffer.slice(newline + 1);
            if (!line) continue;
            const event: unknown = JSON.parse(line);
            if (!event || typeof event !== "object" || !("type" in event)) throw new Error("La respuesta no es válida. Vuelve a intentarlo.");
            if (event.type === "error") throw new Error("message" in event && typeof event.message === "string" ? event.message : "La respuesta se ha interrumpido.");
            if (event.type === "done") { receivedDone = true; }
            if (event.type === "delta" && "text" in event && typeof event.text === "string") {
              answer += event.text;
              if (answer.length > MAX_ANSWER_LENGTH) throw new Error("La respuesta es demasiado larga.");
              setStatus("streaming");
              reveal.append(event.text);
            }
          }
          if (done) break;
        }
      } finally { void reader.cancel().catch(() => {}); reader.releaseLock(); }
      if (!receivedDone || !answer) throw new Error("La respuesta se ha interrumpido. Vuelve a enviar tu pregunta.");
      clearTimeout(timer);
      await reveal.finish();
      if (abort.signal.aborted) throw new Error("cancelled");
      complete = true;
      history.current = [...pending, { role: "assistant" as const, content: answer }].slice(-8);
      setMessages((previous) => previous.map((message) => message.id === answerId ? { ...message, complete: true } : message));
      setAnnouncement(`El asistente ha respondido: ${answer}`);
    } catch (failure) {
      const message = abort.signal.aborted ? (timedOut ? "La respuesta ha tardado demasiado. Vuelve a intentarlo." : "Respuesta detenida. Puedes enviar otra pregunta.") : failure instanceof Error ? failure.message : "No se ha podido responder. Vuelve a intentarlo.";
      setError(message); setAnnouncement("");
      if (!displayed) setMessages((previous) => previous.filter((message) => message.id !== answerId));
    } finally {
      clearTimeout(timer); reveal.stop(); abort.signal.removeEventListener("abort", stopReveal); active.current = null; setStatus("idle");
    }
    return complete;
  }

  function reset() {
    if (active.current) return;
    history.current = []; setMessages([]); setError(""); setAnnouncement("Conversación reiniciada.");
  }

  return { messages, status, error, announcement, cooldown, send, reset, stop: () => active.current?.abort() };
}
