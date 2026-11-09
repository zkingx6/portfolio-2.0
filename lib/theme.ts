/*
  Light / dark theme runtime.
  - The inline script in app/layout.tsx applies the saved theme before paint.
  - setTheme() switches, persists, briefly enables a color crossfade, and
    broadcasts "themechange" so canvas code can re-read its colors.
*/

export type Theme = "dark" | "light";
export const THEME_KEY = "theme";
const EVENT = "themechange";

/** Runs in <head> before first paint. Dark is the default. */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}})()`;

export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function apply(t: Theme) {
  const el = document.documentElement;
  if (t === "light") el.setAttribute("data-theme", "light");
  else el.removeAttribute("data-theme");
}

export function setTheme(t: Theme) {
  if (t === getTheme()) return;
  const el = document.documentElement;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) {
    el.classList.add("theme-anim");
    window.setTimeout(() => el.classList.remove("theme-anim"), 260);
  }
  apply(t);
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch {
    /* storage unavailable: theme still applies for this visit */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Re-apply the stored theme (React dev Strict Mode can reset <html> attributes). */
export function syncStoredTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    apply(t === "light" ? "light" : "dark");
  } catch {
    /* ignore */
  }
}

export function onThemeChange(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

/** Read an "r, g, b" token (e.g. --c-dot-rest) into a numeric triple. */
export function readRgbVar(name: string, fallback: [number, number, number]): [number, number, number] {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const p = v.split(",").map((x) => parseFloat(x));
  return p.length === 3 && p.every((n) => !Number.isNaN(n)) ? [p[0], p[1], p[2]] : fallback;
}
