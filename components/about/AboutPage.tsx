"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useNavChrome } from "@/lib/useNavChrome";
import { useReveal } from "@/lib/useReveal";
import { MAILTO, PRINCIPLES } from "@/lib/content";
import { StickPlayground } from "./StickPlayground";
import { BuildWorkspace } from "./BuildWorkspace";

/* ── Content (edit here) ─────────────────────── */

const SECTIONS = [
  { id: "intro",    num: "00", label: "Intro",    sh: "INTRO"   },
  { id: "origin",   num: "01", label: "Origin",   sh: "ORIGIN"  },
  { id: "beliefs",  num: "02", label: "Beliefs",  sh: "BELIEFS" },
  { id: "with-ai",  num: "03", label: "How I build", sh: "BUILD" },
  { id: "now",      num: "04", label: "Now",       sh: "NOW"     },
] as const;

const PROFILE: { k: string; v: string; ph?: boolean; cursor?: boolean }[] = [
  { k: "name", v: "Ronger Xu / Zion" },
  { k: "based", v: "New York / New Jersey" },
  { k: "background", v: "Fashion → Visual Communication" },
  { k: "now", v: "Product Design · UI/UX · Vibe Coding", cursor: true },
];

const THREAD = [
  { name: "Washington", tag: "Where it started" },
  { name: "California", tag: "Fashion design" },
  { name: "New Jersey", tag: "Home base" },
  { name: "New York", tag: "Visual communication → product" },
];

const NOW_LOG = [
  { date: "Nov 2026", tag: "building", text: "Digital products & creative experiments" },
  { date: "Nov 2026", tag: "open to", text: "Product Design · UX/UI · AI Workflow roles", arrow: true },
];
const NOW_UPDATED = "Nov 2026";

const PERSONAL: string[] = [];

/* ── Page ────────────────────────────────────── */

export function AboutPage() {
  const nav = useNavChrome();
  const [act, setAct] = useState(0);
  useReveal();

  // --rc: position the fixed rail in the left margin (identical to ResumeRail).
  useEffect(() => {
    const pos = () => {
      const fr = document.querySelector(".frame");
      const rail = document.querySelector(".rail2") as HTMLElement | null;
      if (!fr || !rail) return;
      rail.style.setProperty("--rc", fr.getBoundingClientRect().left / 2 + "px");
    };
    pos();
    window.addEventListener("resize", pos);
    const ro = window.ResizeObserver ? new ResizeObserver(pos) : null;
    if (ro) ro.observe(document.body);
    if (document.fonts?.ready) document.fonts.ready.then(pos);
    requestAnimationFrame(pos);
    return () => { window.removeEventListener("resize", pos); ro?.disconnect(); };
  }, []);

  // Active section — same rule as the resume rail.
  useEffect(() => {
    const h = () => {
      let next = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= Math.min(240, window.innerHeight * 0.4)) next = i;
      });
      setAct((prev) => (prev === next ? prev : next));
    };
    document.addEventListener("scroll", h, true);
    h();
    return () => document.removeEventListener("scroll", h, true);
  }, []);

  // Keep the active item visible in the mobile strip.
  useEffect(() => {
    const strip = document.querySelector(".strip") as HTMLElement | null;
    const a = strip?.querySelector("a.on") as HTMLElement | null;
    if (!strip || !a || strip.scrollWidth <= strip.clientWidth) return;
    // land the active tab on the strip's own padding = the content gutter
    const pad = parseFloat(getComputedStyle(strip).paddingLeft) || 0;
    strip.scrollTo({ left: a.offsetLeft - pad, behavior: "smooth" });
  }, [act]);

  return (
    <div
      style={{
        color: "var(--c-fg)",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
        overflowX: "clip",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--c-bg)",
          backgroundImage: "radial-gradient(var(--c-line-1) 1.2px,transparent 1.2px)",
          backgroundSize: "32px 32px",
          padding: "0 var(--fm)",
        }}
      >
        <div className="frame">
          <SiteNav
            homeHref="/"
            tabs={[
              { label: "Work", href: "/#work" },
              { label: "About", href: "#intro" },
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

          {/* ── Rail — fixed in left margin, same as ResumeRail ── */}
          <nav className={"rail2" + (nav.sc ? " sc" : "")} aria-label="About sections">
            {SECTIONS.map((s, i) => (
              <a key={s.id} href={"#" + s.id} className={act === i ? "on" : ""} aria-current={act === i ? "location" : undefined}>
                <span className="dsl"><span className="dsh" /></span>
                <span className="nm2">{s.num}</span>
                <span className="lb">{s.label}</span>
                <span className="sh">{s.sh}</span>
              </a>
            ))}
          </nav>

          {/* ── Strip — fixed below nav on smaller screens ── */}
          <nav className={"strip" + (nav.sc ? " sc" : "")} aria-label="About sections">
            {SECTIONS.map((s, i) => (
              <a key={s.id} href={"#" + s.id} className={act === i ? "on" : ""} aria-current={act === i ? "location" : undefined}>
                <span className="nm2">{s.num}</span>
                <span className="lb">{s.label}</span>
              </a>
            ))}
          </nav>

              {/* ── 00 INTRO ─────────────────────────── */}
              <section id="intro" className="ab-sec" style={{ paddingLeft: "var(--edge)", paddingRight: "var(--edge)" }}>
                <SecLabel num="00" label="Intro" />
                <div className="ab-intro">
                  <div className="ab-intro-l">
                    <h1 className="ab-h1">
                      <span className="mask">
                        <span>Hi, I’m Ronger.</span>
                      </span>
                    </h1>
                    <p className="ab-sub rv" style={{ transitionDelay: "120ms" }}>
                      I design and build digital products through{" "}
                      <span style={{ color: "#FF6A24" }}>Product Design</span>,{" "}
                      <span style={{ color: "#FF6A24" }}>UI/UX</span>, and{" "}
                      <span style={{ color: "#FF6A24" }}>AI‑assisted development</span>.
                    </p>
                  </div>
                  <div className="rv" style={{ transitionDelay: "160ms" }}>
                    <StickPlayground />
                  </div>
                </div>
                <div className="ab-win rv" role="group" aria-label="Profile summary" style={{ transitionDelay: "200ms" }}>
                  <WinHead title="Ronger.profile" status="Live" active />
                  <div className="ab-wb">
                    {PROFILE.map((r) => (
                      <div key={r.k} className="ab-kv">
                        <span className="ab-kk">{r.k}</span>
                        <span className={r.ph ? "ab-ph" : "ab-kvv"}>
                          {r.v}
                          {r.cursor && <span className="ab-cur" aria-hidden />}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── 01 ORIGIN ────────────────────────── */}
              <section id="origin" className="ab-sec rl" style={{ marginTop: 40, padding: "40px var(--edge) 0" }}>
                <SecLabel num="01" label="Origin" />
                <p className="ab-arc rv">
                  Fashion <i>→</i> visual communication <i>→</i> product.
                </p>
                <div className="ab-og">
                  <div className="ab-ogt rv">
                    <p>
                      <span className="ab-drop">I</span> started in fashion, where I learned
                      to design around people, not just what they wear.
                    </p>
                    <p>
                      That thinking led me to visual communication, then product design.
                      Different mediums, same curiosity: how can design make everyday
                      experiences better?
                    </p>
                    <div className="ab-lesson">
                      <span className="mono">What fashion still teaches me</span>
                      <p>Different medium. Same focus on people.</p>
                    </div>
                  </div>
                  <div className="ab-thread rv" role="group" aria-label="Journey" style={{ transitionDelay: "80ms" }}>
                    <span className="mono ab-th">The thread ({String(THREAD.length).padStart(2, "0")})</span>
                    {THREAD.map((t, i) => (
                      <div key={t.name} className="ab-ts">
                        <span className={"ab-tn" + (i === THREAD.length - 1 ? " o" : "")} />
                        <span className="ab-tnm">{t.name}</span>
                        <span className="ab-ttg">{t.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── 02 BELIEFS ───────────────────────── */}
              <section id="beliefs" className="ab-sec rl" style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}>
                <SecLabel num="02" label="Beliefs" />
                <div className="pgrid">
                  {PRINCIPLES.map((p, i) => (
                    <div
                      key={p.num}
                      className="pcell rv"
                      style={{ transitionDelay: `${(i % 3) * 60}ms` }}
                    >
                      <span className="mono pnum">{p.num}</span>
                      <h3 className="ptit">{p.title}</h3>
                      <p className="pex">{p.body}</p>
                      <span className="mono ppr">{p.proof}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── 03 HOW I BUILD ──────────────────── */}
              <section id="with-ai" className="ab-sec rl" style={{ marginTop: 40, padding: "40px var(--edge) 0" }}>
                <SecLabel num="03" label="How I build" />
                <h2 className="ab-arc rv">From idea to working product.</h2>
                <p className="bw-sub rv" style={{ transitionDelay: "60ms" }}>
                  Design judgment, AI-assisted coding, and iteration — from the first
                  question to a working product.
                </p>
                <div className="rv" style={{ transitionDelay: "120ms" }}>
                  <BuildWorkspace />
                  <span className="bw-cap mono">
                    Simulated session · a walkthrough of how I built Parallel — not a live build
                  </span>
                </div>
              </section>

              {/* ── 04 NOW ───────────────────────────── */}
              <section id="now" className="ab-sec rl" style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}>
                <SecLabel num="04" label="Now" />
                <div className="ab-win ab-log rv" role="group" aria-label="Status log">
                  <WinHead title="now.log" status="Live" active />
                  <div className="ab-wb">
                    {NOW_LOG.map((r) => (
                      <div key={r.tag} className={"ab-lr" + (r.arrow ? " ab-lr-cta" : "")}>
                        <span className="ab-lt">{r.date}</span>
                        <span className="ab-ltag">{r.tag}</span>
                        <span className={"ab-ltx" + (r.arrow ? " ab-ltx-cta" : "")}>
                          <span>{r.text}</span>
                          {r.arrow && (
                            <a
                              className="ab-hello mono"
                              href={`${MAILTO}?subject=${encodeURIComponent("Let’s build something together")}`}
                            >
                              Say hello
                              <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden>
                                <path d="M1.5 7.5 L7.5 1.5 M3 1.5 H7.5 V6" fill="none" stroke="currentColor" strokeWidth="1.2" />
                              </svg>
                            </a>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="ab-upd mono">Last updated {NOW_UPDATED}</div>
                </div>
              </section>

              {/* ── CTA row (end of page) ────────────── */}
              <div style={{ padding: "48px var(--edge) 96px" }}>
                <div className="ab-ctas rv">
                  <Link className="cta mono" href="/#work">
                    Work <span style={{ color: "#FF6A24" }}>→</span>
                  </Link>
                  <Link className="cta mono" href="/resume">
                    Resume <span style={{ color: "#FF6A24" }}>→</span>
                  </Link>
                  <a className="cta mono" href="#contact">
                    Contact <span style={{ color: "#FF6A24" }}>→</span>
                  </a>
                </div>
              </div>
        </div>
      </div>

      <SiteFooter logoSweep={nav.lk % 2 === 1} onLogoHover={nav.bumpLogo} />
    </div>
  );
}

/* ── Small pieces ────────────────────────────── */

function SecLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="ab-k mono rv">
      <b>{num}</b>
      <span>{label}</span>
    </div>
  );
}

function WinHead({ title, status, active }: { title: string; status: string; active?: boolean }) {
  return (
    <div className="ab-wh mono">
      <span className={"ab-wd" + (active ? " o" : "")} />
      <span className="ab-wd" />
      <span className="ab-wd" />
      <span className="ab-wt">{title}</span>
      <span className="ab-ws">
        {active && <span className="ab-nd" />}
        {status}
      </span>
    </div>
  );
}
