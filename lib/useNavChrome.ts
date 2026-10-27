"use client";

import { useEffect, useRef, useState } from "react";
import { attachAnchorClicks, finePointer, scrollToEl } from "./scroll";

export function useNavChrome(onHomeNav?: () => void) {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const [lk, setLk] = useState(0);
  const skip = useRef(false);
  const cancel = useRef<{ raf?: number }>({});

  const close = () => {
    setOpen(false);
    setHov(false);
    setFoc(false);
  };

  useEffect(() => {
    const h = (e?: Event) => {
      const t = e?.target as HTMLElement | undefined;
      let y = window.scrollY || 0;
      if (t && t.nodeType === 1) y = Math.max(y, t.scrollTop || 0);
      const on = y > 24;
      setSc((prev) => (prev === on ? prev : on));
    };
    document.addEventListener("scroll", h, true);
    h();
    const detach = attachAnchorClicks(
      () => {
        setLk((n) => n + 1);
        onHomeNav?.();
      },
      scrollToEl,
      cancel.current,
    );
    const cx = () => {
      if (cancel.current.raf) cancelAnimationFrame(cancel.current.raf);
    };
    ["wheel", "touchstart", "keydown"].forEach((n) =>
      document.addEventListener(n, cx, { passive: true }),
    );
    return () => {
      document.removeEventListener("scroll", h, true);
      detach();
      ["wheel", "touchstart", "keydown"].forEach((n) =>
        document.removeEventListener(n, cx),
      );
      cx();
    };
  }, [onHomeNav]);

  const expanded = open || hov || foc;

  return {
    sc,
    open,
    expanded,
    lk,
    bumpLogo: () => setLk((n) => n + 1),
    closeAll: close,
    pillEnter: () => {
      if (finePointer()) setHov(true);
    },
    pillLeave: () => setHov(false),
    btnClick: () => {
      if (finePointer() && hov && !open) setOpen(true);
      else if (expanded) close();
      else setOpen(true);
    },
    pillFocus: (e: React.FocusEvent<HTMLDivElement>) => {
      if (skip.current) {
        skip.current = false;
        return;
      }
      const t = e.target as HTMLElement;
      if (t?.matches?.(":focus-visible")) setFoc(true);
    },
    pillBlur: (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) setFoc(false);
    },
    pillKey: (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        close();
        const b = e.currentTarget.querySelector("button");
        if (b) {
          skip.current = true;
          b.focus();
        }
      }
    },
    go: (el: Element, home: boolean, off?: number) =>
      scrollToEl(el, home, off, cancel.current),
  };
}
