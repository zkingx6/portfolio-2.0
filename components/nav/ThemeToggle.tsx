"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { getTheme, onThemeChange, setTheme, syncStoredTheme, type Theme } from "@/lib/theme";

/* Compact Dark / Light segmented control that lives at the end of the nav menu. */

const subscribe = (cb: () => void) => onThemeChange(cb);
const serverSnapshot = (): Theme => "dark";

export function ThemeToggle({ style }: { style?: React.CSSProperties }) {
  // Server renders "dark"; the client reads the real attribute after hydration.
  const theme = useSyncExternalStore(subscribe, getTheme, serverSnapshot);

  useLayoutEffect(() => {
    const before = getTheme();
    syncStoredTheme();
    if (getTheme() !== before) window.dispatchEvent(new Event("themechange"));
  }, []);

  return (
    <div className="thm" role="radiogroup" aria-label="Color theme" style={style}>
      <button
        type="button"
        role="radio"
        aria-checked={theme === "dark"}
        className={"thb" + (theme === "dark" ? " on" : "")}
        onClick={() => setTheme("dark")}
        title="Dark"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
          <path d="M9.6 7.4A4.2 4.2 0 0 1 4.6 2.4a4.2 4.2 0 1 0 5 5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        <span className="thl">Dark</span>
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={theme === "light"}
        className={"thb" + (theme === "light" ? " on" : "")}
        onClick={() => setTheme("light")}
        title="Light"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
          <circle cx="6" cy="6" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 .8v1.4M6 9.8v1.4M.8 6h1.4M9.8 6h1.4M2.3 2.3l1 1M8.7 8.7l1 1M2.3 9.7l1-1M8.7 3.3l1-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
        </svg>
        <span className="thl">Light</span>
      </button>
    </div>
  );
}
