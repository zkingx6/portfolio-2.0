"use client";
import { useEffect, useRef, useState } from "react";

/* Fixed corner button: near top → "↓ BOTTOM", scrolled down → "↑ TOP".
   rAF-throttled scroll listener.  Reduced-motion → instant jump.
   Replaces the old EXPAND ALL button.  Style: cs-stg in case.css. */

const THRESHOLD = 160; // px from top to call it "at top"

export function ScrollToggle() {
  const [atTop, setAtTop] = useState(true);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    function check() {
      setAtTop(window.scrollY < THRESHOLD);
    }

    function onScroll() {
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        check();
        raf.current = null;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    check(); // set correct label on mount

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  function handleClick() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
    if (atTop) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  }

  return (
    <button
      type="button"
      className="mono cs-stg"
      onClick={handleClick}
      aria-label={atTop ? "Scroll to bottom of page" : "Scroll to top of page"}
    >
      {atTop ? "\u2193 BOTTOM" : "\u2191 TOP"}
    </button>
  );
}
