"use client";
import { useState } from "react";
import Link from "next/link";
import { CATALOG } from "@/lib/cases";
import type { CaseStudy } from "@/lib/cases";

/* Merged NEXT + INDEX band.
   Collapsed = exactly one row: NEXT link on the left, INDEX toggle on the right.
   Expanded  = same header row + 3×3 project grid below (height-animated).
   Styles: cs-nib-* in app/styles/case.css. */

export function NextIndexBand({
  id,
  next,
}: {
  id: string;
  next: CaseStudy["next"];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={"cs-nib" + (open ? " on" : "")}>

      {/* ── One-row header ── */}
      <div className="cs-nib-row">

        {/* NEXT — left, takes remaining space */}
        {next.href ? (
          <Link href={next.href} className="cs-nib-next">
            <span className="mono cs-nib-nk">Next →</span>
            <span className="mono cs-num">{next.id}</span>
            <span className="cs-nxn">{next.name}</span>
          </Link>
        ) : (
          <div className="cs-nib-next cs-nib-np">
            <span className="mono cs-nib-nk">Next →</span>
            <span className="mono cs-num">{next.id}</span>
            <span className="cs-nxn">{next.name}</span>
          </div>
        )}

        {/* INDEX toggle — right, never grows */}
        <button
          type="button"
          className="mono cs-nib-tog"
          aria-expanded={open}
          aria-controls="cs-nib-panel"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="cs-nib-tog-lbl">ALL PROJECTS (09)</span>
          <span className="cs-nib-tog-pm" aria-hidden>{open ? "−" : "+"}</span>
        </button>

      </div>

      {/* ── 3×3 grid — height-animates open ── */}
      <div id="cs-nib-panel" className="cs-nib-dr" inert={!open}>
        <div className="cs-nib-di">
          <div className="cs-nib-grid">
            {CATALOG.map((entry) => {
              const isCurrent = entry.id === id;

              /* Current page — dimmed, not a link */
              if (isCurrent) {
                return (
                  <div key={entry.id} className="cs-nib-cell cs-nib-here">
                    <span className="mono cs-nib-cn">{entry.id}</span>
                    <span className="cs-nib-cname">{entry.name}</span>
                    <span className="mono cs-nib-badge">● HERE</span>
                  </div>
                );
              }

              /* Live page — full Link, arrow appears on hover */
              if (entry.href) {
                return (
                  <Link key={entry.id} href={entry.href} className="cs-nib-cell cs-nib-link">
                    <span className="mono cs-nib-cn">{entry.id}</span>
                    <span className="cs-nib-cname">{entry.name}</span>
                    <span className="mono cs-nib-arr" aria-hidden>→</span>
                  </Link>
                );
              }

              /* No page — dimmed plain row, never a link */
              return (
                <div key={entry.id} className="cs-nib-cell cs-nib-plain">
                  <span className="mono cs-nib-cn">{entry.id}</span>
                  <span className="cs-nib-cname">{entry.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
