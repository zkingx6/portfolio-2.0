"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useNavChrome } from "@/lib/useNavChrome";
import { useReveal } from "@/lib/useReveal";
import { useJourneyDots } from "@/lib/useJourneyDots";

const BANNER_WORDS = ["MAKING", "A", "WAY", "OUT", "OF", "NO", "WAY"];

const PROCESS = [
  {
    num: "01",
    title: "RESEARCH & DISCOVERY",
    body: "Every project begins with understanding people. I conduct user research, analyze existing experiences, and identify opportunities through competitive analysis and usability insights.",
  },
  {
    num: "02",
    title: "DEFINE & STRATEGIZE",
    body: "Using research insights, I define product goals, user journeys, information architecture, and feature priorities. Every decision is guided by user needs and business objectives.",
  },
  {
    num: "03",
    title: "DESIGN & PROTOTYPE",
    body: "I explore ideas through wireframes, high-fidelity interfaces, and interactive prototypes — directing AI tools the same way I direct any tool: I keep the taste, the tool does the production. Solutions are refined through continuous feedback and iteration.",
  },
  {
    num: "04",
    title: "TEST & DELIVER",
    body: "Designs are validated through testing, documented for developers, and refined during implementation. The final product delivers a consistent, accessible, and user-centered experience.",
  },
];

const JOURNEY = [
  { name: "WASHINGTON", tag: "Where it started, high school." },
  { name: "CALIFORNIA", tag: "FIDM, BA Design of Fashion." },
  { name: "NEW JERSEY", tag: "Based in the NYC metro." },
  { name: "NEW YORK", tag: "RIT MFA and design practice in the city." },
];

export function AboutPage() {
  const nav = useNavChrome();
  useReveal();
  useJourneyDots("ab-jdots", "ab-journey-host");

  return (
    <div
      style={{
        color: "#F4F1EA",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
        overflow: "hidden",
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
              { label: "About", href: "#top" },
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

          {/* ── 1. HERO ──────────────────────────────── */}
          <section id="top" style={{ padding: "calc(24px + 81px) var(--edge) 0" }}>
            <div className="mono" style={{ color: "#A8A59E", marginBottom: 24 }}>
              About — Ronger Xu (Zion)
            </div>
            <div className="ab-hero-grid">
              <h1 className="ab-h1">
                <span className="mask">
                  <span>ABOUT</span>
                </span>
                <span className="mask">
                  <span style={{ animationDelay: "80ms" }}>ME</span>
                </span>
              </h1>
              <div className="ab-intro rv" style={{ transitionDelay: "220ms" }}>
                <p>
                  Hi, I'm Ronger Xu — but most people know me as{" "}
                  <span style={{ color: "#FF6A24" }}>Zion</span>.
                </p>
                <p>
                  I design accessible digital products that make everyday
                  experiences simpler, more intuitive, and more human.
                </p>
              </div>
            </div>
          </section>

          {/* ── 2. BANNER ─────────────────────────────── */}
          <section
            id="banner"
            className="rl"
            style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge)" }}
          >
            <div className="ab-bnr-wrap rv">
              {BANNER_WORDS.map((w, i) => (
                <span
                  key={i}
                  className="ab-bw"
                  style={{ "--wi": i } as CSSProperties}
                >
                  <span>{w}</span>
                </span>
              ))}
            </div>
          </section>

          {/* ── 3. WHO I AM ───────────────────────────── */}
          <section
            id="who"
            className="rl"
            style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}
          >
            <div className="mono rv" style={{ color: "#FF6A24", marginBottom: 28 }}>
              Who I Am
            </div>
            <div className="ab-bsec rv" style={{ transitionDelay: "60ms" }}>
              <h2 className="ab-belief">
                I BELIEVE THE BEST PRODUCTS ARE{" "}
                <span
                  className="ab-ignite"
                  style={{ "--ad": "300ms" } as CSSProperties}
                >
                  ACCESSIBLE
                </span>
                ,{" "}
                <span
                  className="ab-ignite"
                  style={{ "--ad": "450ms" } as CSSProperties}
                >
                  THOUGHTFUL
                </span>
                , AND{" "}
                <span
                  className="ab-ignite"
                  style={{ "--ad": "600ms" } as CSSProperties}
                >
                  SOLVING
                </span>{" "}
                REAL PROBLEMS.
              </h2>
              <p className="ab-body">
                I enjoy solving meaningful problems through product design —
                combining UX strategy, interface design, accessibility, and
                rapid prototyping to create experiences that are both beautiful
                and practical. Whether I'm designing for older adults, global
                organizations, or startups, my goal is always the same: make
                products easier for people.
              </p>
              <blockquote className="ab-thesis">
                "I'm not letting AI design for me. I lead the AI to design —
                I'm still the one in charge of the design, like a design
                director."
              </blockquote>
            </div>
          </section>

          {/* ── 4. JOURNEY ────────────────────────────── */}
          <section
            id="journey"
            className="rl"
            style={{ marginTop: "calc(96px / 2)" }}
          >
            <div
              id="ab-journey-host"
              style={{ position: "relative", overflow: "hidden" }}
            >
              <canvas
                id="ab-jdots"
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              />
              <div className="ab-journey-inner">
                <div className="mono rv" style={{ color: "#FF6A24", marginBottom: 28 }}>
                  Journey (04)
                </div>
                <div className="ab-jstops">
                  {JOURNEY.map((stop, i) => (
                    <div
                      key={stop.name}
                      className="ab-jstop rv"
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      <span className="mono" style={{ color: "#91C9F7", display: "block", marginBottom: 10 }}>
                        {String(i + 1).padStart(2, "0")}
                        {i < JOURNEY.length - 1 ? " →" : ""}
                      </span>
                      <span className="ab-jname">{stop.name}</span>
                      <span className="ab-jtag">{stop.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 5. HOW I WORK ─────────────────────────── */}
          <section
            id="how"
            className="rl"
            style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}
          >
            <div className="mono rv" style={{ color: "#FF6A24", marginBottom: 28 }}>
              How I Work
            </div>
            <p className="ab-intro-line rv" style={{ transitionDelay: "60ms" }}>
              From research to polished interfaces, every project is grounded in
              user needs, accessibility, and iterative design.
            </p>
            <div className="ab-pgrid">
              {PROCESS.map((p, i) => (
                <div
                  key={p.num}
                  className="ab-pcard rv"
                  style={{ transitionDelay: `${(i % 2) * 80}ms` }}
                >
                  <span className="mono ab-pn">{p.num}</span>
                  <h3 className="ab-pt">{p.title}</h3>
                  <p className="ab-pb">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 6. PERSONAL ───────────────────────────── */}
          <section
            id="personal"
            className="rl"
            style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}
          >
            <div className="mono rv" style={{ color: "#FF6A24", marginBottom: 28 }}>
              Personal
            </div>
            <div className="ab-per rv" style={{ transitionDelay: "60ms" }}>
              <figure className="ab-portrait">
                <span className="mono" style={{ color: "#A8A59E", fontSize: 11 }}>
                  [ Portrait ]
                </span>
              </figure>
              <div className="ab-pertext">
                <p className="ab-perfill">
                  [PERSONAL — user to fill: 2–3 lines on life outside design]
                </p>
              </div>
            </div>
          </section>

          {/* ── 7. WAY OUT ────────────────────────────── */}
          <section
            id="wayout"
            className="rl"
            style={{
              marginTop: "calc(96px / 2)",
              padding: "calc(96px / 2) var(--edge) 96px",
            }}
          >
            <div className="mono rv" style={{ color: "#FF6A24", marginBottom: 28 }}>
              Next step
            </div>
            <div
              className="rv"
              style={{ display: "flex", flexWrap: "wrap", gap: 12, transitionDelay: "60ms" }}
            >
              <Link className="cta mono" href="/#work">
                See the work <span style={{ color: "#FF6A24" }}>→</span>
              </Link>
              <Link className="cta mono" href="/resume">
                See the resume <span style={{ color: "#FF6A24" }}>→</span>
              </Link>
            </div>
          </section>

        </div>
      </div>

      {/* ── 8. FOOTER ──────────────────────────────────── */}
      <SiteFooter
        logoSweep={nav.lk % 2 === 1}
        onLogoHover={nav.bumpLogo}
      />
    </div>
  );
}
