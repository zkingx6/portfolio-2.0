"use client";

import { useEffect } from "react";
import { RESUME_RAIL } from "@/lib/content";

type Props = {
  active: number;
  scrolled: boolean;
};

export function ResumeRail({ active, scrolled }: Props) {
  useEffect(() => {
    const pos = () => {
      const fr = document.querySelector(".frame");
      const rail = document.querySelector(".rail2") as HTMLElement | null;
      if (!fr || !rail) return;
      rail.style.setProperty(
        "--rc",
        fr.getBoundingClientRect().left / 2 + "px",
      );
    };
    pos();
    window.addEventListener("resize", pos);
    const ro = window.ResizeObserver ? new ResizeObserver(pos) : null;
    if (ro) ro.observe(document.body);
    if (document.fonts?.ready) document.fonts.ready.then(pos);
    requestAnimationFrame(pos);
    return () => {
      window.removeEventListener("resize", pos);
      ro?.disconnect();
    };
  }, []);

  const items = RESUME_RAIL.map((r, i) => ({
    ...r,
    href: "#" + r.id,
    on: active === i,
  }));

  return (
    <>
      <nav className={"rail2" + (scrolled ? " sc" : "")} aria-label="Resume sections">
        {items.map((it) => (
          <a
            key={it.id}
            href={it.href}
            className={it.on ? "on" : ""}
            aria-current={it.on ? "location" : undefined}
            aria-label={it.label}
          >
            <span className="dsl">
              <span className="dsh" />
            </span>
            <span className="nm2">{it.num}</span>
            <span className="lb">{it.label}</span>
            <span className="sh">{it.sh}</span>
          </a>
        ))}
      </nav>
      <nav className={"strip" + (scrolled ? " sc" : "")} aria-label="Resume sections">
        {items.map((it) => (
          <a
            key={it.id}
            href={it.href}
            className={it.on ? "on" : ""}
            aria-current={it.on ? "location" : undefined}
          >
            <span className="nm2">{it.num}</span>
            <span className="lb">{it.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
