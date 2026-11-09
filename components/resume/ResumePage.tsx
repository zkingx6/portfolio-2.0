"use client";

import { useEffect, useState } from "react";
import { SiteNav } from "@/components/nav/SiteNav";
import {
  EDUCATION,
  EMAIL,
  EXPERIENCE,
  MAILTO,
  RESUME_WORK,
  SKILLS,
} from "@/lib/content";
import { useNavChrome } from "@/lib/useNavChrome";
import { useReveal } from "@/lib/useReveal";
import { ResumeRail } from "./ResumeRail";
import { SiteFooter } from "@/components/SiteFooter";

function ExperienceBody({ text }: { text: string }) {
  const parts = text.split(/(\b\d+%)/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\d+%$/.test(p) ? <b key={i}>{p}</b> : <span key={i}>{p}</span>,
      )}
    </>
  );
}

// Shared accordion state: collapsed by default, entries open independently.
function useAccordion(count: number) {
  const [open, setOpen] = useState<boolean[]>(() => Array(count).fill(false));
  const all = open.every(Boolean);
  return {
    open,
    all,
    toggle: (i: number) => setOpen((o) => o.map((v, j) => (j === i ? !v : v))),
    toggleAll: () => setOpen(Array(count).fill(!all)),
  };
}

export function ResumePage() {
  const nav = useNavChrome();
  const [act, setAct] = useState(0);
  const exp = useAccordion(EXPERIENCE.length);
  const work = useAccordion(RESUME_WORK.length);
  useReveal();

  useEffect(() => {
    const h = () => {
      let next = 0;
      ["skills", "experience", "work", "education"].forEach(
        (id, i) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= Math.min(240, window.innerHeight * 0.4)) {
            next = i;
          }
        },
      );
      setAct((prev) => (prev === next ? prev : next));
    };
    document.addEventListener("scroll", h, true);
    h();
    return () => document.removeEventListener("scroll", h, true);
  }, []);

  return (
    <div
      style={{
        color: "var(--c-fg)",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
        overflow: "hidden",
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
            { label: "About", href: "/about" },
            { label: "Resume", href: "#top" },
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
        <ResumeRail active={act} scrolled={nav.sc} />

        <section id="top" style={{ padding: "calc(24px + 81px) var(--edge) 0" }}>
          <div className="mono" style={{ color: "var(--c-muted)", marginBottom: 24 }}>
            Resume — Ronger Xu (Zion)
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(44px,6vw,72px)",
              lineHeight: 0.9,
              letterSpacing: "-.05em",
              fontWeight: 800,
            }}
          >
            <span className="mask">
              <span>
                Ronger Xu <span className="out">(Zion)</span>
                <span style={{ color: "#FF6A24" }}>.</span>
              </span>
            </span>
          </h1>
          <p style={{ margin: "20px 0 0", fontSize: 20, lineHeight: 1.4 }}>
            Product Designer × Creative Technologist. Human-centered design meets
            intelligent technology.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            <a className="cta mono" href={MAILTO} style={{ textTransform: "none" }}>
              {EMAIL} <span style={{ color: "#FF6A24" }}>↗</span>
            </a>
            <a
              className="cta mono"
              href="https://www.linkedin.com/in/ronger-xu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <span style={{ color: "#FF6A24" }}>↗</span>
            </a>
          </div>
          <div
            className="mono"
            style={{
              marginTop: 24,
              color: "var(--c-muted)",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 32px",
            }}
          >
            <span>MFA Visual Communication Design · RIT · 2025</span>
            <span style={{ color: "#FF6A24" }}>Open to AI product design roles</span>
          </div>
        </section>

        <section
          id="skills"
          className="rl"
          style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}
        >
          <div className="mono rv" style={{ color: "#FF6A24", marginBottom: 28 }}>
            Skills (05)
          </div>
          <div style={{ borderBottom: "1px solid var(--c-line)" }}>
            {SKILLS.map((s, i) => (
              <div
                key={s.num}
                className="xe xs rv"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="mono" style={{ color: "#91C9F7" }}>
                  {s.num}
                </span>
                <span className="mono xd" style={{ color: "var(--c-fg)" }}>
                  {s.title}
                </span>
                <div className="xc">
                  <div className="chips" style={{ marginTop: 0 }}>
                    {s.chips.map((c) => (
                      <span className="chip" key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="rl"
          style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}
        >
          <div className="mono rv xa-hd">
            <span style={{ color: "#FF6A24" }}>Experience (03)</span>
            <button
              type="button"
              className="mono xa-all"
              onClick={exp.toggleAll}
              aria-controls={EXPERIENCE.map((x) => "exp-panel-" + x.num).join(" ")}
              aria-expanded={exp.all}
            >
              {exp.all ? "Collapse all" : "Expand all"}
            </button>
          </div>
          <div style={{ borderBottom: "1px solid var(--c-line)" }}>
            {EXPERIENCE.map((item, i) => (
              <div
                key={item.num}
                className="xe rv"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="mono" style={{ color: "#91C9F7" }}>
                  {item.num}
                </span>
                <span className="mono xd" style={{ color: "var(--c-muted)" }}>
                  {item.when}
                  <br />
                  {item.where}
                </span>
                <div className="xc">
                  <h3 className="xh">
                    <button
                      type="button"
                      id={"exp-btn-" + item.num}
                      className={"xa-tg" + (exp.open[i] ? " on" : "")}
                      aria-expanded={exp.open[i]}
                      aria-controls={"exp-panel-" + item.num}
                      onClick={() => exp.toggle(i)}
                    >
                      <span>{item.title}</span>
                      <span className="mono xa-lb" aria-hidden>
                        {exp.open[i] ? "− Close" : "+ Open"}
                      </span>
                    </button>
                  </h3>
                  {/* same height animation as the landing Work accordion */}
                  <div
                    id={"exp-panel-" + item.num}
                    role="region"
                    aria-labelledby={"exp-btn-" + item.num}
                    className={"xa-dr" + (exp.open[i] ? " on" : "")}
                  >
                    <div className="xa-di">
                      <p className="xp">
                        <ExperienceBody text={item.body} />
                      </p>
                      <div className="chips">
                        {item.chips.map((c) => (
                          <span className="chip" key={c}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="work"
          className="rl"
          style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}
        >
          <div
            className="mono rv"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px 24px",
              marginBottom: 28,
            }}
          >
            <span style={{ color: "#FF6A24" }}>Selected work (08)</span>
            <button
              type="button"
              className="mono xa-all"
              onClick={work.toggleAll}
              aria-controls={RESUME_WORK.map((x) => "work-panel-" + x.num).join(" ")}
              aria-expanded={work.all}
            >
              {work.all ? "Collapse all" : "Expand all"}
            </button>
          </div>
          <div style={{ borderBottom: "1px solid var(--c-line)" }}>
            {RESUME_WORK.map((item, i) => (
              <div
                key={item.num}
                className="xe rv"
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                <span className="mono" style={{ color: "#91C9F7" }}>
                  {item.num}
                </span>
                <span className="mono xd" style={{ color: "var(--c-muted)" }}>
                  {item.when}
                  {item.note ? (
                    <>
                      <br />
                      {item.note}
                    </>
                  ) : null}
                </span>
                <div className="xc">
                  <h3 className="xh">
                    <button
                      type="button"
                      id={"work-btn-" + item.num}
                      className={"xa-tg" + (work.open[i] ? " on" : "")}
                      aria-expanded={work.open[i]}
                      aria-controls={"work-panel-" + item.num}
                      onClick={() => work.toggle(i)}
                    >
                      <span>{item.title}</span>
                      <span className="mono xa-lb" aria-hidden>
                        {work.open[i] ? "− Close" : "+ Open"}
                      </span>
                    </button>
                  </h3>
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.45,
                      color: "rgba(var(--c-fg-rgb), .55)",
                      marginTop: 6,
                    }}
                  >
                    {item.role}
                  </div>
                  <div
                    id={"work-panel-" + item.num}
                    role="region"
                    aria-labelledby={"work-btn-" + item.num}
                    className={"xa-dr" + (work.open[i] ? " on" : "")}
                  >
                    <div className="xa-di">
                      <p className="xp">{item.p1}</p>
                      <p className="xp" style={{ marginTop: 10 }}>
                        {item.p2}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="education"
          className="rl"
          style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}
        >
          <div className="mono rv" style={{ color: "#FF6A24", marginBottom: 28 }}>
            Education (02)
          </div>
          <div style={{ borderBottom: "1px solid var(--c-line)" }}>
            {EDUCATION.map((item, i) => (
              <div
                key={item.num}
                className="xe rv"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="mono" style={{ color: "#91C9F7" }}>
                  {item.num}
                </span>
                <span className="mono xd" style={{ color: "var(--c-muted)" }}>
                  {item.when}
                  <br />
                  {item.where}
                </span>
                <div className="xc">
                  <h3 className="xh">{item.title}</h3>
                  <p className="xp">
                    <span
                      className="mono"
                      style={{
                        display: "block",
                        marginBottom: 6,
                        fontSize: 11,
                        letterSpacing: ".06em",
                        color: "var(--c-muted)",
                      }}
                    >
                      Honors / Awards
                    </span>
                    {item.honor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


      </div>
      </div>
      <SiteFooter
        logoSweep={nav.lk % 2 === 1}
        onLogoHover={nav.bumpLogo}
        backToPortfolio
      />
    </div>
  );
}
