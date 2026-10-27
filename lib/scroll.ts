export function reducedMotion() {
  return !!(
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function finePointer() {
  return !!(
    window.matchMedia &&
    window.matchMedia("(hover:hover) and (pointer:fine)").matches
  );
}

export function scrollToEl(
  el: Element,
  home: boolean,
  off?: number,
  cancel?: { raf?: number },
) {
  let sc: HTMLElement | null = el.parentElement;
  while (sc && sc !== document.body && sc !== document.documentElement) {
    const o = getComputedStyle(sc).overflowY;
    if (/(auto|scroll)/.test(o) && sc.scrollHeight > sc.clientHeight) break;
    sc = sc.parentElement;
  }
  const win = !sc || sc === document.body || sc === document.documentElement;
  const root = document.scrollingElement || document.documentElement;
  const cur = win ? window.scrollY : sc!.scrollTop;
  const max = win
    ? root.scrollHeight - window.innerHeight
    : sc!.scrollHeight - sc!.clientHeight;
  let y = 0;
  if (!home) {
    const fallback =
      off == null
        ? parseFloat(getComputedStyle(el).scrollMarginTop) || 96
        : off;
    const top =
      el.getBoundingClientRect().top -
      (win ? 0 : sc!.getBoundingClientRect().top);
    y = Math.max(0, Math.min(max, cur + top - fallback));
  }
  const dist = Math.abs(y - cur);
  if (dist < 2) return;
  if (reducedMotion()) {
    if (win) window.scrollTo(0, y);
    else sc!.scrollTop = y;
    return;
  }
  const dur = 500 + 400 * Math.min(1, dist / (max || 1));
  const t0 = performance.now();
  if (cancel?.raf) cancelAnimationFrame(cancel.raf);
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    const k = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const v = cur + (y - cur) * k;
    if (win) window.scrollTo(0, v);
    else sc!.scrollTop = v;
    if (p < 1 && cancel) cancel.raf = requestAnimationFrame(step);
  };
  if (cancel) cancel.raf = requestAnimationFrame(step);
}

export function attachAnchorClicks(
  onHomeNav?: () => void,
  go: typeof scrollToEl = scrollToEl,
  cancel?: { raf?: number },
) {
  const ck = (e: MouseEvent) => {
    if (
      e.defaultPrevented ||
      e.button > 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    const target = e.target as HTMLElement | null;
    const a = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const h = a.getAttribute("href");
    if (!h || h.length < 2) return;
    if (reducedMotion()) return;
    let el: Element | null = null;
    try {
      el = document.querySelector(h);
    } catch {
      return;
    }
    if (!el) return;
    e.preventDefault();
    const home = h === "#top";
    if (home && a.closest(".nav")) onHomeNav?.();
    go(el, home, undefined, cancel);
  };
  document.addEventListener("click", ck, true);
  return () => document.removeEventListener("click", ck, true);
}
