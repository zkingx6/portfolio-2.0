"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useNavChrome } from "@/lib/useNavChrome";
import { useReveal } from "@/lib/useReveal";

/* ── Content (edit here) ─────────────────────── */

const SECTIONS = [
  { id: "intro",    num: "00", label: "Intro",    sh: "INTRO"   },
  { id: "origin",   num: "01", label: "Origin",   sh: "ORIGIN"  },
  { id: "beliefs",  num: "02", label: "Beliefs",  sh: "BELIEFS" },
  { id: "with-ai",  num: "03", label: "With AI",  sh: "WITH AI" },
  { id: "now",      num: "04", label: "Now",       sh: "NOW"     },
] as const;

const PROFILE: { k: string; v: string; ph?: boolean; cursor?: boolean }[] = [
  { k: "name", v: "Ronger Xu — \"Zion\" 🧡" },
  { k: "based", v: "New Jersey / New York" },
  { k: "started in", v: "Fashion design" },
  { k: "now", v: "Product & UX/UI design × AI Workflow" },
  { k: "building", v: "Portfolio 2.0" },
  { k: "believes", v: "Accessible by default" },
  { k: "mode", v: "Directs the AI; keeps the taste", cursor: true },
];

const THREAD = [
  { name: "Washington", tag: "Where it started" },
  { name: "California", tag: "Fashion design" },
  { name: "New Jersey", tag: "Home base" },
  { name: "New York", tag: "Visual communication → product" },
];

const BELIEFS = [
  {
    lead: "Accessible by ",
    key: "default",
    tail: ".",
    body: "Older adults, global organizations or startups — the goal is the same: make products easier for people.",
  },
  {
    lead: "AI is a tool. I’m the ",
    key: "director",
    tail: ".",
    body: "I lead the AI to design — I’m still the one in charge of the design.",
  },
];

const AI_NOTES: { changed: string; why: string }[] = [];

/* positions of the numbered pins on both screenshots */
const PINS = [
  { top: "18%", left: "14%" },
  { top: "46%", right: "16%" },
  { bottom: "16%", left: "40%" },
];

const NOW_LOG = [
  { date: "Oct 2026", tag: "building", text: "Portfolio 2.0" },
  { date: "Oct 2026", tag: "open to", text: "AI product design roles", arrow: true },
];
const NOW_UPDATED = "Oct 2026";

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
    strip.scrollTo({ left: a.offsetLeft - 20, behavior: "smooth" });
  }, [act]);

  return (
    <div
      style={{
        color: "#F4F1EA",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
        overflowX: "clip",
      }}
    >
      <div
        style={{
          backgroundColor: "#101010",
          backgroundImage: "radial-gradient(#2a2a2a 1.2px,transparent 1.2px)",
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
              <section id="intro" className="ab-sec" style={{ padding: "calc(24px + 81px) var(--edge) 0" }}>
                <SecLabel num="00" label="Intro" />
                <h1 className="ab-h1">
                  <span className="mask">
                    <span>
                      Direct the tools, keep the taste.
                    </span>
                  </span>
                </h1>
                <p className="ab-sub rv" style={{ transitionDelay: "120ms" }}>
                  I design accessible digital products that make everyday
                  experiences simpler, more intuitive, and more human.
                </p>
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
              <section id="origin" className="ab-sec rl" style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}>
                <SecLabel num="01" label="Origin" />
                <p className="ab-arc rv">
                  Fashion <i>→</i> visual communication <i>→</i> product.
                </p>
                <div className="ab-og">
                  <div className="ab-ogt rv">
                    <p>
                      <span className="ab-drop">I</span>started in fashion design.
                      What I was learning, without quite naming it, was how to design
                      for a person — the garment was the medium, not the point.
                    </p>
                    <p>
                      That recognition moved me from fashion into visual communication,
                      and from there into product design and AI. The materials changed
                      each time. The question stayed the same.
                    </p>
                    <div className="ab-lesson">
                      <span className="mono">What fashion still teaches me</span>
                      <p>The garment was never the point — the person wearing it was.</p>
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
                <div className="ab-bl">
                  {BELIEFS.map((b, i) => (
                    <div key={i} className="ab-br rv" style={{ transitionDelay: `${i * 80}ms` }}>
                      <b className="mono">{String(i + 1).padStart(2, "0")}</b>
                      <div>
                        <h3>
                          {b.lead}
                          {b.key && <span>{b.key}</span>}
                          {b.tail}
                        </h3>
                        <p>{b.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── 03 WITH AI ───────────────────────── */}
              <section id="with-ai" className="ab-sec rl" style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}>
                <SecLabel num="03" label="With AI" />
                <div className="ab-cmp rv">
                  <div className="ab-pane">
                    <WinHead title="ai.draft" status="Before" />
                    <div className="ab-shot mono">
                      AI draft
                      {PINS.map((p, i) => (
                        <span key={i} className="ab-pin w" style={p}>{i + 1}</span>
                      ))}
                    </div>
                    <p className="ab-cap">—</p>
                  </div>
                  <div className="ab-pane me">
                    <WinHead title="zion.edit" status="After" active />
                    <div className="ab-shot mono">
                      Edited version
                      {PINS.map((p, i) => (
                        <span key={i} className="ab-pin" style={p}>{i + 1}</span>
                      ))}
                    </div>
                    <p className="ab-cap">—</p>
                  </div>
                </div>
                {AI_NOTES.length > 0 && (
                  <div className="ab-notes rv" style={{ transitionDelay: "80ms" }}>
                    {AI_NOTES.map((n, i) => (
                      <div key={i} className="ab-nt">
                        <span className="ab-pin">{i + 1}</span>
                        <div>
                          <span className="ab-l mono">Changed</span>
                          <p>{n.changed}</p>
                        </div>
                        <div>
                          <span className="ab-l mono">Why</span>
                          <p>{n.why}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* ── 04 NOW ───────────────────────────── */}
              <section id="now" className="ab-sec rl" style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}>
                <SecLabel num="04" label="Now" />
                <div className="ab-win ab-log rv" role="group" aria-label="Status log">
                  <WinHead title="now.log" status="Live" active />
                  <div className="ab-wb">
                    {NOW_LOG.map((r) => (
                      <div key={r.tag} className="ab-lr">
                        <span className="ab-lt">{r.date}</span>
                        <span className="ab-ltag">{r.tag}</span>
                        <span className="ab-ltx">
                          {r.text}
                          {r.arrow && <em> →</em>}
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
