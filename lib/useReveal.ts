"use client";

import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".rv"));
    if (!els.length) return;
    if ("IntersectionObserver" in window) {
      document.documentElement.classList.add("rvon");
      const io = new IntersectionObserver(
        (en) =>
          en.forEach((x) => {
            if (x.isIntersecting) {
              x.target.classList.add("in");
              io.unobserve(x.target);
            }
          }),
        { threshold: 0.15 },
      );
      els.forEach((el) => io.observe(el));
      return () => {
        io.disconnect();
        document.documentElement.classList.remove("rvon");
      };
    }
    els.forEach((el) => el.classList.add("in"));
  }, []);
}
