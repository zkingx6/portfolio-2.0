"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { NextIndexBand } from "@/components/case/NextIndexBand";
import { ScrollToggle } from "@/components/case/ScrollToggle";
import type { CaseSection, CaseStudy } from "@/lib/cases";
import { useNavChrome } from "@/lib/useNavChrome";
import { useReveal } from "@/lib/useReveal";
import { mediaFor, type MediaItem } from "@/lib/projectMedia";
import { MediaFigure, MediaGallery } from "@/components/media/ProjectMedia";
import { ExternalPreview } from "@/components/case/ExternalPreview";
import { BcgHero } from "@/components/case/BcgHero";
import { FennecHero } from "@/components/case/FennecHero";
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
  media,
  showMedia = true,
}: {
  s: CaseSection;
  n: number;
  open: boolean;
  onToggle: () => void;
  /** Media for this section from lib/projectMedia.ts; placeholder when empty. */
  media?: MediaItem[];
  /** false = text-only section (no media block, no placeholder). */
  showMedia?: boolean;
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
            {open ? "\u2212" : "+"}
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
            {!showMedia ? null : media && media.length > 0 ? (
              <MediaGallery items={media} />
            ) : (
              <MediaSlot label="Media" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyPage({
  data,
  heroSlot,
  hideSections,
}: {
  data: CaseStudy;
  /** Optional slot that replaces the default media placeholder in the hero section. */
  heroSlot?: React.ReactNode;
  /** When true, suppresses the collapsed-section accordion.
   *  Use for method/exhibit pages that don't follow the case-study prose format. */
  hideSections?: boolean;
}) {
  const nav = useNavChrome();
  // same page entrance as Home / About / Resume: .mask rise + .rv reveal
  useReveal();
  const [open, setOpen] = useState<boolean[]>(() => data.sections.map(() => false));
  const media = mediaFor(data.slug);
  const heroMedia = media.hero ?? media.cover;

  const toggle = (i: number) =>
    setOpen((o) => o.map((v, j) => (j === i ? !v : v)));
  // one source of truth: the global control reads/writes the same open[] state
  const allOpen = open.length > 0 && open.every(Boolean);
  const toggleAll = () => setOpen(data.sections.map(() => !allOpen));

  return (
    <div className="cs-wrap">
      <div style={{ padding: "0 var(--fm)" }}>
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

          <main className="csp" id="top">
            {/* 1 · Header block */}
            <header className="cs-hd">
              <div className="mono cs-crumb rv">
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
              <div className="cs-hdtop rv" style={{ transitionDelay: "60ms" }}>
                <span className="mono cs-id">{data.id}</span>
                <span className="mono cs-type">{data.type}</span>
              </div>
              <h1 className="cs-t">
                <span className="mask">
                  <span>{data.name}</span>
                </span>
              </h1>
              <p
                className="cs-out rv"
                style={{ transitionDelay: "120ms", ...(data.outcomeMaxWidth ? { maxWidth: data.outcomeMaxWidth } : null) }}
              >
                {data.outcome}
              </p>
            </header>

            {/* 2 · Meta band */}
            <dl className="rl cs-band rv" style={{ transitionDelay: "180ms" }}>
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
              {data.live ? (
                <div className="cs-bc cs-brole">
                  <dt className="mono">{data.live.title ?? "Live Product"}</dt>
                  <dd>
                    <a className="cs-live" href={data.live.href} target="_blank" rel="noopener noreferrer">
                      {data.live.label} <span aria-hidden>↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
            <div className="rl cs-rule" aria-hidden />

            {/* 3 · Hero media — heroSlot replaces the placeholder when provided */}
            {/* exhibit pages (heroSlot) keep their own motion — no reveal wrapper */}
            <div className={"cs-hero" + (heroSlot ? "" : " rv")} style={heroSlot ? undefined : { transitionDelay: "240ms" }}>
              {heroSlot ??
                (data.external ? (
                  data.external.design === "bcg-landing" ? (
                    <BcgHero href={data.external.href} />
                  ) : data.external.design === "fennec-site" ? (
                    <FennecHero href={data.external.href} />
                  ) : (
                    <ExternalPreview {...data.external} />
                  )
                ) : heroMedia ? (
                  <div className="cs-heroimg">
                    <MediaFigure m={heroMedia} priority full />
                    {data.heroCta ? (
                      <a
                        className="cs-herocta mono"
                        href={data.heroCta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={data.heroCta.ariaLabel}
                      >
                        {data.heroCta.label} <span aria-hidden>↗</span>
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <MediaSlot label="Media — 16:9" wide />
                ))}
            </div>

            {/* 4 · Sections, collapsed first (suppressed on exhibit pages via hideSections) */}
            {!hideSections && (
              <div className="cs-secs rv">
                <div className="cs-secs-hd">
                  <button
                    type="button"
                    className="mono cs-all"
                    onClick={toggleAll}
                    aria-expanded={allOpen}
                    aria-controls={data.sections.map((_, i) => `cs-sec-${pad(i + 1)}`).join(" ")}
                  >
                    <span className="cs-all-ic" aria-hidden>{allOpen ? "\u2212" : "+"}</span>
                    {allOpen ? "Collapse all" : "Expand all"}
                  </button>
                </div>
                {data.sections.map((s, i) => (
                  <Section
                    key={s.label}
                    s={s}
                    n={i + 1}
                    open={open[i]}
                    onToggle={() => toggle(i)}
                    media={media.sections?.[s.label]}
                    showMedia={data.showSectionMedia !== false}
                  />
                ))}
              </div>
            )}

            {/* 5 · Next project + project index — merged band */}
            <NextIndexBand id={data.id} next={data.next} />
          </main>
        </div>
      </div>

      <SiteFooter logoSweep={nav.lk % 2 === 1} onLogoHover={nav.bumpLogo} />

      {/* Scroll toggle — fixed corner */}
      <ScrollToggle />
    </div>
  );
}
