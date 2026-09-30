import { createHash, randomBytes } from "node:crypto";
import { isIP } from "node:net";
import { MAX_BODY_BYTES } from "./contracts";

const MINUTE = 60_000;
const DAY = 86_400_000;
type Bucket = { minute: number; daily: number; active: number; requests: number[]; last: number };

// Ephemeral counters only: no questions, answers or raw IPs are stored.
// This protects ONE process. Distributed deployments require an edge limiter.
export class ChatLimiter {
  private actors = new Map<string, Bucket>();
  private global: Bucket = { minute: 0, daily: 0, active: 0, requests: [], last: 0 };

  acquire(actor: string, now = Date.now()): { allowed: false; retryAfter: number } | { allowed: true; release: () => void } {
    for (const [key, bucket] of this.actors) {
      if (!bucket.active && now - bucket.last >= DAY) this.actors.delete(key);
    }
    if (!this.actors.has(actor) && this.actors.size >= 2_000) return { allowed: false, retryAfter: 60 };
    const bucket = this.actors.get(actor) ?? { minute: 0, daily: 0, active: 0, requests: [], last: 0 };
    const global = this.global;
    for (const item of [bucket, global]) {
      item.requests = item.requests.filter((time) => now - time < MINUTE);
      if (now >= item.minute + DAY) { item.minute = now; item.daily = 0; }
    }
    let wait = 0;
    if (bucket.active || global.active >= 2) wait = 8_000;
    if (bucket.last && now - bucket.last < 8_000) wait = Math.max(wait, 8_000 - (now - bucket.last));
    if (bucket.requests.length >= 4) wait = Math.max(wait, MINUTE - (now - bucket.requests[0]));
    // Conservative shared budget for the free model's token quota.
    if (global.requests.length >= 2) wait = Math.max(wait, MINUTE - (now - global.requests[0]));
    if (bucket.daily >= 20) wait = Math.max(wait, bucket.minute + DAY - now);
    if (global.daily >= 80) wait = Math.max(wait, global.minute + DAY - now);
    if (wait > 0) return { allowed: false, retryAfter: Math.max(1, Math.ceil(wait / 1_000)) };
    this.actors.set(actor, bucket);
    for (const item of [bucket, global]) {
      item.last = now; item.daily++; item.active++; item.requests.push(now);
    }
    let released = false;
    return { allowed: true, release: () => {
      if (released) return;
      released = true; bucket.active--; global.active--;
    } };
  }
}

const salt = randomBytes(32).toString("hex");
export const chatLimiter = new ChatLimiter();

export function protectionConfigured(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  try {
    if (!process.env.CHAT_ALLOWED_ORIGIN || new URL(process.env.CHAT_ALLOWED_ORIGIN).protocol !== "https:") return false;
  } catch { return false; }
  const mode = process.env.CHAT_PROTECTION_MODE;
  if (mode === "single-instance") return process.env.VERCEL !== "1";
  return mode === "edge" && (process.env.VERCEL === "1" || Boolean(process.env.CHAT_TRUSTED_IP_HEADER));
}

export function clientKey(headers: Headers): string {
  // Never trust arbitrary X-Forwarded-For. A custom proxy MUST overwrite its
  // configured header and prevent requests from reaching Next.js directly.
  const header = process.env.VERCEL === "1" ? "x-forwarded-for" : process.env.CHAT_TRUSTED_IP_HEADER;
  const candidate = header ? headers.get(header)?.split(",")[0].trim() : undefined;
  let address = candidate && isIP(candidate) ? candidate : "shared";
  if (isIP(address) === 6) address = new URL(`http://[${address}]`).hostname;
  return createHash("sha256").update(salt).update(address).digest("hex");
}

export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (!origin || (fetchSite && fetchSite !== "same-origin")) return false;
  try {
    const supplied = new URL(origin);
    const expected = new URL(process.env.CHAT_ALLOWED_ORIGIN || request.url);
    if (process.env.NODE_ENV === "production" && !process.env.CHAT_ALLOWED_ORIGIN) return false;
    if (supplied.origin === expected.origin) return true;
    // Next's development adapter constructs request.url with localhost even
    // when the browser connects to 127.0.0.1. Accept only loopback aliases.
    const loopback = ["localhost", "127.0.0.1", "[::1]"];
    return process.env.NODE_ENV !== "production" && !process.env.CHAT_ALLOWED_ORIGIN && loopback.includes(supplied.hostname) && loopback.includes(expected.hostname) && supplied.port === expected.port && supplied.protocol === expected.protocol;
  } catch { return false; }
}

export async function readBoundedJson(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES || !request.body) throw new Error("invalid-body");
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let text = "";
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => { void reader.cancel().catch(() => {}); reject(new Error("body-timeout")); }, 5_000);
  });
  try {
    return await Promise.race([(async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_BODY_BYTES) throw new Error("invalid-body");
        text += decoder.decode(value, { stream: true });
      }
      text += decoder.decode();
      return JSON.parse(text) as unknown;
    })(), timeout]);
  } finally {
    clearTimeout(timer);
    void reader.cancel().catch(() => {});
  }
}
