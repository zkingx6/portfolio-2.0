type RxAudio = {
  ctx: AudioContext | null;
  armed: boolean;
  wired: boolean;
};

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
    __rxAudio?: RxAudio;
  }
}

function store(): RxAudio {
  if (typeof window === "undefined") {
    return { ctx: null, armed: false, wired: false };
  }
  window.__rxAudio = window.__rxAudio || {
    ctx: null,
    armed: false,
    wired: false,
  };
  return window.__rxAudio;
}

export function rxCtx() {
  const RXA = store();
  if (!RXA.ctx || RXA.ctx.state === "closed") {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) RXA.ctx = new AC();
  }
  return RXA.ctx;
}

function rxUnlock() {
  const c = rxCtx();
  if (!c) return;
  const done = () => {
    if (c.state === "running") store().armed = true;
  };
  const p = c.resume();
  if (p && p.then) p.then(done, () => {});
  else done();
}

export function wireAudioUnlock() {
  const RXA = store();
  if (RXA.wired) return;
  RXA.wired = true;
  const FIRST = ["pointerdown", "touchstart", "keydown"] as const;
  const RETRY = ["mousedown", "touchend", "click"] as const;
  const retry = () => {
    if (store().armed) {
      RETRY.forEach((n) => window.removeEventListener(n, retry, true));
      return;
    }
    rxUnlock();
  };
  const first = () => {
    FIRST.forEach((n) => window.removeEventListener(n, first, true));
    rxUnlock();
    RETRY.forEach((n) => window.addEventListener(n, retry, true));
  };
  FIRST.forEach((n) =>
    window.addEventListener(n, first, { capture: true, passive: true }),
  );
  let lastTry = 0;
  const hover = (e: PointerEvent) => {
    if (store().armed) {
      window.removeEventListener("pointermove", hover, true);
      return;
    }
    const t = performance.now();
    if (t - lastTry < 500) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest?.("#top")) {
      lastTry = t;
      try {
        rxUnlock();
      } catch {
        /* ignore */
      }
    }
  };
  window.addEventListener("pointermove", hover, { capture: true, passive: true });
}

export function audioState() {
  return store();
}

export function withAudio(fn: () => void, fail?: () => void) {
  const a = rxCtx();
  if (a && a.state === "suspended") a.resume();
  if (!a) {
    fail?.();
    return;
  }
  if (a.state === "running") {
    store().armed = true;
    fn();
    return;
  }
  a.resume()
    .then(() => {
      if (a.state === "running") store().armed = true;
      fn();
    })
    .catch(() => fail?.());
}

export function tone(f: number, delay = 0, peak = 0.03) {
  const a = store().ctx;
  if (!a) return;
  const t = a.currentTime + delay;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = "sine";
  o.frequency.value = f;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
  o.connect(g);
  g.connect(a.destination);
  o.start(t);
  o.stop(t + 0.07);
}

export function tickSound() {
  tone(1500 + Math.random() * 500, 0, 0.03);
}

export function clickSound(k: string) {
  if (!store().ctx) return;
  if (k === "ice") tone(1900, 0, 0.03);
  else if (k === "mix") {
    tone(520, 0, 0.03);
    tone(1900, 0.07, 0.03);
  } else tone(520, 0, 0.03);
}

export function logoChime() {
  for (let i = 0; i < 5; i++) {
    tone(1500 + Math.random() * 500, i * 0.05, 0.03);
  }
}
