// Providers can group several tokens in one delta. Reveal Unicode characters
// from the first delta while the remaining response continues to stream.
export function createTextReveal(onText: (text: string) => void, immediate = false, intervalMs = 12) {
  let pending: string[] = [];
  let visible = "";
  let timer: ReturnType<typeof setInterval> | undefined;
  let stopped = false;
  let resolveDrain: (() => void) | undefined;

  function settle() {
    clearInterval(timer); timer = undefined;
    resolveDrain?.(); resolveDrain = undefined;
  }

  return {
    append(text: string) {
      if (stopped) return;
      if (immediate) { visible += text; onText(visible); return; }
      pending.push(...Array.from(text));
      if (!timer) timer = setInterval(() => {
        const character = pending.shift();
        if (character !== undefined) { visible += character; onText(visible); }
        if (!pending.length) settle();
      }, intervalMs);
    },
    finish(): Promise<void> {
      if (stopped || !pending.length) return Promise.resolve();
      return new Promise((resolve) => { resolveDrain = resolve; });
    },
    stop() { stopped = true; pending = []; settle(); },
  };
}
