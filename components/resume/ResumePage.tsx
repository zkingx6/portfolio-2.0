"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/nav/SiteNav";
import {
  EDUCATION,
  EMAIL,
  EXPERIENCE,
  MAILTO,
  PRINCIPLES,
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

export function ResumePage() {
  const nav = useNavChrome();
  const [act, setAct] = useState(0);
  useReveal();

  useEffect(() => {
    const h = () => {
      let next = 0;
      ["skills", "experience", "work", "education", "principles"].forEach(
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
          <div className="mono" style={{ color: "#A8A59E", marginBottom: 24 }}>
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
            <Link className="cta mono" href="/">
              Back to portfolio <span style={{ color: "#FF6A24" }}>→</span>
            </Link>
          </div>
          <div
            className="mono"
            style={{
              marginTop: 24,
              color: "#A8A59E",
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
          <div style={{ borderBottom: "1px solid #333" }}>
            {SKILLS.map((s, i) => (
              <div
                key={s.num}
                className="xe xs rv"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="mono" style={{ color: "#91C9F7" }}>
                  {s.num}
                </span>
                <span className="mono xd" style={{ color: "#F4F1EA" }}>
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
          <div className="mono rv" style={{ color: "#FF6A24", marginBottom: 28 }}>
            Experience (03)
          </div>
          <div style={{ borderBottom: "1px solid #333" }}>
            {EXPERIENCE.map((item, i) => (
              <div
                key={item.num}
                className="xe rv"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="mono" style={{ color: "#91C9F7" }}>
                  {item.num}
                </span>
                <span className="mono xd" style={{ color: "#A8A59E" }}>
                  {item.when}
                  <br />
                  {item.where}
                </span>
                <div className="xc">
                  <h3 className="xh">{item.title}</h3>
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
            <span style={{ color: "#A8A59E" }}>Full index on the portfolio page</span>
          </div>
          <div style={{ borderBottom: "1px solid #333" }}>
            {RESUME_WORK.map((item, i) => (
              <div
                key={item.num}
                className="xe rv"
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                <span className="mono" style={{ color: "#91C9F7" }}>
                  {item.num}
                </span>
                <span className="mono xd" style={{ color: "#A8A59E" }}>
                  {item.when}
                  {item.note ? (
                    <>
                      <br />
                      {item.note}
                    </>
                  ) : null}
                </span>
                <div className="xc">
                  <h3 className="xh">{item.title}</h3>
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.45,
                      color: "rgba(244,241,234,.55)",
                      marginTop: 6,
                    }}
                  >
                    {item.role}
                  </div>
                  <p className="xp">{item.p1}</p>
                  <p className="xp" style={{ marginTop: 10 }}>
                    {item.p2}
                  </p>
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
          <div style={{ borderBottom: "1px solid #333" }}>
            {EDUCATION.map((item, i) => (
              <div
                key={item.num}
                className="xe rv"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="mono" style={{ color: "#91C9F7" }}>
                  {item.num}
                </span>
                <span className="mono xd" style={{ color: "#A8A59E" }}>
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
                        color: "#A8A59E",
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

        <section
          id="principles"
          className="rl"
          style={{ marginTop: "calc(96px / 2)", padding: "calc(96px / 2) var(--edge) 0" }}
        >
          <div className="mono rv" style={{ color: "#FF6A24", marginBottom: 28 }}>
            Principles (06)
          </div>
          <h2
            className="rv"
            style={{
              margin: "0 0 40px",
              maxWidth: 900,
              fontSize: "clamp(28px,4vw,56px)",
              fontWeight: 700,
              letterSpacing: "-.04em",
              lineHeight: 1.05,
            }}
          >
            How I work, in six rules.
          </h2>
          <div className="pgrid">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.num}
                className="pcell rv"
                style={{ transitionDelay: `${(i % 2) * 60}ms` }}
              >
                <span className="mono pnum">{p.num}</span>
                <h3 className="ptit">{p.title}</h3>
                <p className="pex">{p.body}</p>
                <span className="mono ppr">{p.proof}</span>
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
