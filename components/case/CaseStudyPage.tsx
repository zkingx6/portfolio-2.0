"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import type { CaseSection, CaseStudy } from "@/lib/cases";
import { useNavChrome } from "@/lib/useNavChrome";
import "@/app/styles/case.css";

const pad = (n: number) => String(n).padStart(2, "0");

function MediaSlot({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <div className={"cs-media" + (wide ? " cs-media-hero" : "")} role="img" aria-label={`${label} placeholder`}>
      <span className="mono">{label}</span>
    </div>
  );
}

function Section({
  s,
  n,
  open,
  onToggle,
}: {
  s: CaseSection;
  n: number;
  open: boolean;
  onToggle: () => void;
}) {
  const id = `cs-sec-${pad(n)}`;
  return (
    <section className={"cs-sec" + (open ? " on" : "")} aria-labelledby={id + "-h"}>
      <h2 className="cs-h" id={id + "-h"}>
        <button
          type="button"
          className="cs-row"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
        >
          <span className="mono cs-num">{pad(n)}</span>
          <span className="mono cs-lab">{s.label}</span>
          <span className="cs-sum">{s.summary}</span>
          <span className="mono cs-pm" aria-hidden>
            {open ? "−" : "+"}
          </span>
        </button>
      </h2>
      <div className="cs-dr" id={id} inert={!open}>
        <div className="cs-di">
          <div className="cs-body">
            {s.body?.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {s.points ? (
              <ul className="cs-pts">
                {s.points.map((p) => {
                  // Verbatim sentence; the lead-in before the colon is emphasised inline.
                  const k = p.indexOf(":");
                  return (
                    <li key={p}>
                      {k > 0 ? (
                        <>
                          <span className="cs-ptk">{p.slice(0, k + 1)}</span>
                          {p.slice(k + 1)}
                        </>
                      ) : (
                        p
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
            {s.stats ? (
              <dl className="cs-stats">
                {s.stats.map((x) => (
                  <div key={x.label} className="cs-stat">
                    <dt className="mono">{x.label}</dt>
                    <dd>
                      <span className="cs-sv">{x.value}</span>
                      <span className="mono cs-su">{x.unit}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <MediaSlot label="Media" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyPage({ data }: { data: CaseStudy }) {
  const nav = useNavChrome();
  const [open, setOpen] = useState<boolean[]>(() => data.sections.map(() => false));
  const allOpen = open.every(Boolean);

  const toggle = (i: number) =>
    setOpen((o) => o.map((v, j) => (j === i ? !v : v)));
  const setAll = (v: boolean) => setOpen(data.sections.map(() => v));

  return (
    <div className="cs-wrap">
      <div className="frame">
        <SiteNav
          homeHref="/"
          tabs={[
            { label: "Work", href: "/#work" },
            { label: "About", href: "/about" },
            { label: "Resume", href: "/resume" },
          ]}
          scrolled={nav.sc}
          logoSweep={nav.lk % 2 === 1}
          expanded={nav.expanded}
          open={nav.open}
          onLogoHover={nav.bumpLogo}
          onEnter={nav.pillEnter}
          onLeave={nav.pillLeave}
          onFocus={nav.pillFocus}
          onBlur={nav.pillBlur}
          onKeyDown={nav.pillKey}
          onButtonClick={nav.btnClick}
          onClose={nav.closeAll}
        />

        <main className="cs" id="top">
          {/* 1 · Header block */}
          <header className="cs-hd">
            {/* Breadcrumb */}
            <div className="mono cs-crumb">
              <span>
                <Link href="/#work" className="cs-crlk">
                  ← Work
                </Link>
                <span className="cs-crsep" aria-hidden>
                  /
                </span>
                <span>{data.crumb}</span>
              </span>
              <span>
                Case {pad(data.caseNo)} / {pad(data.caseTotal)}
              </span>
            </div>
            <div className="cs-hdtop">
              <span className="mono cs-id">{data.id}</span>
              <span className="mono cs-type">{data.type}</span>
            </div>
            <h1 className="cs-t">{data.name}</h1>
            <p className="cs-out">{data.outcome}</p>
          </header>

          {/* 2 · Meta band — same layout as the Visa page.
              .rl draws the full-bleed hairline + square nodes; .cs-rule closes it. */}
          <dl className="rl cs-band">
            {data.meta.map((m) => (
              <div key={m.label} className="cs-bc">
                <dt className="mono">{m.label}</dt>
                <dd className={"mono" + (m.ice ? " cs-bice" : "")}>{m.value}</dd>
              </div>
            ))}
            <div className="cs-bc cs-brole">
              <dt className="mono">Role</dt>
              <dd>{data.role}</dd>
            </div>
          </dl>
          <div className="rl cs-rule" aria-hidden />

          {/* 3 · Hero media */}
          <div className="cs-hero">
            <MediaSlot label="Media — 16:9" wide />
          </div>

          {/* 4 · Sections, collapsed first */}
          <div className="cs-secs">
            {data.sections.map((s, i) => (
              <Section
                key={s.label}
                s={s}
                n={i + 1}
                open={open[i]}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

          {/* Next */}
          <nav className="cs-next" aria-label="Next project">
            <Link href={data.next.href} className="cs-nx">
              <span className="mono cs-nxk">Next →</span>
              <span className="mono cs-num">{data.next.id}</span>
              <span className="cs-nxn">{data.next.name}</span>
            </Link>
          </nav>
        </main>

        <SiteFooter logoSweep={nav.lk % 2 === 1} onLogoHover={nav.bumpLogo} />
      </div>

      <button
        type="button"
        className="mono cs-all"
        aria-pressed={allOpen}
        onClick={() => setAll(!allOpen)}
      >
        {allOpen ? "Collapse all −" : "Expand all +"}
      </button>
    </div>
  );
}
