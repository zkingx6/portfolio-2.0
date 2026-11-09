"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import {
  EMAIL,
  MAILTO,
  PROJECTS,
  TICKER,
  findProjects,
} from "@/lib/content";
import {
  audioState,
  clickSound,
  logoChime,
  tickSound,
  wireAudioUnlock,
  withAudio,
} from "@/lib/audio";
import { useDotField } from "@/lib/useDotField";
import { useNavChrome } from "@/lib/useNavChrome";
import type { Accent, AskResult, DotConfig } from "@/lib/types";
import { AskTerminal } from "./AskTerminal";
import { DotConfigurator } from "./DotConfigurator";
import { WorkSection } from "./WorkSection";

const DEFAULT_CFG: DotConfig = {
  density: 32,
  radius: 160,
  trail: 50,
  accent: "orange",
  sound: true,
};

function pad(n: number) {
  return String(Math.round(n)).padStart(4, "0");
}

function rnd(a: number, b: number) {
  return a + Math.floor(Math.random() * (b - a + 1));
}

export function LandingPage() {
  const [cfg, setCfg] = useState<DotConfig>(DEFAULT_CFG);
  const [cp, setCp] = useState(false);
  const [mx, setMx] = useState(720);
  const [my, setMy] = useState(300);
  const [ar, setAr] = useState<AskResult | null>(null);
  const [oc, setOc] = useState(-1);
  const [ex, setEx] = useState("");
  const [hl, setHl] = useState("");
  const [h, setH] = useState(-1);
  const [preview, setPreview] = useState({ x: 0, y: 0, w: 1200 });
  const [tt, setTt] = useState<"p" | "n">("p");

  const cfgRef = useRef(cfg);
  const panelOpenRef = useRef(cp);
  const quietRef = useRef({ in: false, drag: false });
  const resizeRef = useRef<(() => void) | null>(null);
  const sndOff = useRef(false);
  const pd = useRef(0);
  const pdPlayed = useRef(false);

  useEffect(() => {
    cfgRef.current = cfg;
    panelOpenRef.current = cp;
  }, [cfg, cp]);

  useDotField(cfgRef, panelOpenRef, quietRef, resizeRef);

  const nav = useNavChrome();

  useEffect(() => {
    wireAudioUnlock();
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && cp) setCp(false);
    };
    const out = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (cp && t?.closest && !t.closest(".cfgp,.cfgcluster")) setCp(false);
    };
    document.addEventListener("keydown", esc);
    document.addEventListener("click", out);
    return () => {
      document.removeEventListener("keydown", esc);
      document.removeEventListener("click", out);
    };
  }, [cp]);

  const applyCfg = useCallback((patch: Partial<DotConfig>, sync = false) => {
    setCfg((prev) => {
      const next = { ...prev, ...patch };
      cfgRef.current = next;
      if ("density" in patch) {
        setTimeout(() => resizeRef.current?.(), 0);
      }
      if (sync) {
        const set = (id: string, v: number) => {
          const el = document.getElementById(id) as HTMLInputElement | null;
          if (el) el.value = String(v);
        };
        set("cf-den", next.density);
        set("cf-rad", next.radius);
        set("cf-tr", next.trail);
      }
      return next;
    });
  }, []);

  const onAccent = (a: Accent) => {
    const n = performance.now();
    if (n - pd.current < 300) {
      return;
    }
    pd.current = n;
    applyCfg({ accent: a });
    if (cfgRef.current.sound) {
      pdPlayed.current = true;
      withAudio(() => clickSound(a), () => {
        pdPlayed.current = false;
      });
    }
  };

  const onLogoHover = () => {
    nav.bumpLogo();
    const RXA = audioState();
    const q = quietRef.current;
    if (
      cfgRef.current.sound &&
      RXA.armed &&
      RXA.ctx &&
      RXA.ctx.state === "running" &&
      !(q.in || q.drag)
    ) {
      logoChime();
    }
  };

  const runAsk = (raw: string) => {
    const q = (raw || "").trim();
    if (!q) return;
    setAr({ q, hits: findProjects(q) });
  };

  /* ASK RX → Work: open the project's primary category (its first listed one),
     wait for the drawers to stop animating, then scroll to the row.
     Rows without a case page are also expanded; case-page rows stay links. */
  const locateRun = useRef(0);
  const locateProject = (i: number) => {
    const p = PROJECTS[i];
    const k = p.categories[0] - 1;
    const key = k + "-" + i;
    const run = ++locateRun.current;
    setOc(k);
    setEx(p.hasPage ? "" : key);
    setH(-1);
    const rowEl = () => {
      const rows = document.querySelectorAll(".cases .cs")[k]?.querySelectorAll(".ix");
      const pos = PROJECTS.filter((x) => x.categories.includes(k + 1)).indexOf(p);
      return rows?.[pos] ?? null;
    };
    // Row's page position must hold still for a few frames (max ~1s) before we scroll.
    let last = NaN;
    let still = 0;
    const t0 = performance.now();
    const settle = () => {
      if (run !== locateRun.current) return;
      const el = rowEl();
      const y = el ? el.getBoundingClientRect().top + window.scrollY : NaN;
      still = el && Math.abs(y - last) < 0.5 ? still + 1 : 0;
      last = y;
      if (el && (still >= 4 || performance.now() - t0 > 1000)) {
        nav.go(el, false, Math.min(280, Math.round(window.innerHeight * 0.35)));
        setTimeout(() => run === locateRun.current && setHl(key), 600);
        setTimeout(() => run === locateRun.current && setHl(""), 1800);
        return;
      }
      if (performance.now() - t0 < 1500) requestAnimationFrame(settle);
    };
    requestAnimationFrame(settle);
  };

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
          padding: "0 var(--fm) 48px",
        }}
      >
        <div className="frame">
          <div className="fold">
            <SiteNav
              homeHref="#top"
              tabs={[
                { label: "Work", href: "#work" },
                { label: "About", href: "/about" },
                { label: "Resume", href: "/resume" },
              ]}
              scrolled={nav.sc}
              logoSweep={nav.lk % 2 === 1}
              expanded={nav.expanded}
              open={nav.open}
              onLogoHover={onLogoHover}
              onEnter={nav.pillEnter}
              onLeave={nav.pillLeave}
              onFocus={nav.pillFocus}
              onBlur={nav.pillBlur}
              onKeyDown={nav.pillKey}
              onButtonClick={nav.btnClick}
              onClose={nav.closeAll}
            />
            <section
              id="top"
              className="hero"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setMx(e.clientX - r.left);
                setMy(e.clientY - r.top);
              }}
            >
              <canvas
                id="dotfield"
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16,
                  color: "var(--c-muted)",
                }}
                className="mono"
              >
                <span>Product &amp; UX/UI Designer × Creative Technologist</span>
                <span className="xy" style={{ color: "#91C9F7" }}>
                  X {pad(mx)} · Y {pad(my)}
                </span>
              </div>
              <div className="hrow">
                <h1
                  style={{
                    position: "relative",
                    margin: 0,
                    maxWidth: "100%",
                    fontSize:
                      "clamp(34px,calc((100vw - 2 * var(--fm) - 2 * var(--gutter)) * .092),125px)",
                    lineHeight: 0.9,
                    letterSpacing: "-.05em",
                    fontWeight: 800,
                  }}
                >
                  <span className="mask">
                    <span>Designing</span>
                  </span>
                  <span className="mask">
                    <span style={{ animationDelay: "80ms" }}>
                      <span className="out">intelligent</span> digital
                    </span>
                  </span>
                  <span className="mask">
                    <span style={{ animationDelay: "160ms" }}>
                      experiences
                      <span style={{ color: "#FF6A24" }}>.</span>
                    </span>
                  </span>
                </h1>
                <p
                  style={{
                    position: "relative",
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.4,
                    color: "var(--c-fg)",
                  }}
                >
                  <span style={{ color: "#FF6A24" }}>Product</span>,{" "}
                  <span style={{ color: "#FF6A24" }}>UX/UI</span>, and{" "}
                  <span style={{ color: "#FF6A24" }}>AI workflows</span> —{" "}
                  <span style={{ color: "rgba(var(--c-fg-rgb), .65)" }}>
                    designed, directed, and shipped.
                  </span>
                </p>
              </div>
              <DotConfigurator
                open={cp}
                cfg={cfg}
                onToggle={() => setCp((v) => !v)}
                onClose={() => setCp(false)}
                onDensity={(v) => applyCfg({ density: v })}
                onRadius={(v) => applyCfg({ radius: v })}
                onTrail={(v) => applyCfg({ trail: v })}
                onAccent={onAccent}
                onSound={() => {
                  const on = !cfg.sound;
                  if (on) {
                    sndOff.current = false;
                    withAudio(() => tickSound());
                  } else sndOff.current = true;
                  applyCfg({ sound: on });
                }}
                onRandom={() =>
                  applyCfg(
                    {
                      density: rnd(20, 48),
                      radius: rnd(80, 260),
                      trail: rnd(0, 100),
                      accent: (["orange", "ice", "mix"] as const)[rnd(0, 2)],
                    },
                    true,
                  )
                }
                onReset={() =>
                  applyCfg(
                    {
                      density: 32,
                      radius: 160,
                      trail: 50,
                      accent: "orange",
                      sound: !sndOff.current,
                    },
                    true,
                  )
                }
              />
            </section>
            <div className="rl" style={{ flex: "none" }}>
              <div
                style={{ overflow: "hidden", padding: "16px 0", color: "var(--c-muted)" }}
                className="mono"
                aria-hidden
              >
                <div className="ticker">
                  <span style={{ whiteSpace: "pre" }}>
                    {TICKER}
                    {TICKER}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <AskTerminal result={ar} onRun={runAsk} onLocate={locateProject} />

          <WorkSection
            openCase={oc}
            expandedKey={ex}
            highlightKey={hl}
            hoverIndex={h}
            preview={preview}
            traceTab={tt}
            onToggleCase={(k) => {
              setOc((prev) => (prev === k ? -1 : k));
              setEx("");
              setH(-1);
            }}
            onToggleRow={(key) => setEx((prev) => (prev === key ? "" : key))}
            onShowPreview={(i, e) => {
              if (e.type === "focus") {
                const r = e.currentTarget.getBoundingClientRect();
                setH(i);
                setPreview({
                  x: r.left + r.width * 0.6,
                  y: r.top + r.height / 2,
                  w: r.width,
                });
              } else {
                const me = e as React.MouseEvent<HTMLButtonElement>;
                setH(i);
                setPreview({
                  x: me.clientX,
                  y: me.clientY,
                  w: 0,
                });
              }
            }}
            onLeave={() => setH(-1)}
            onTracePrompt={() => setTt("p")}
            onTraceNotes={() => setTt("n")}
          />

          <div
            className="rl"
            style={{
              padding: "28px var(--edge)",
              borderBlock: "1px solid var(--c-charcoal)",
            }}
          >
            <p className="mono now">
              <span>Now — Oct 2026</span>
              <span className="nd" aria-hidden />
              <span>Product Designer × Creative Technologist</span>
              <span className="nd" aria-hidden />
              <span>Building with Claude, Cursor &amp; Figma</span>
              <span className="nd" aria-hidden />
              <span>Open to AI product design roles</span>
            </p>
          </div>
        </div>
      </div>

      <SiteFooter
        logoSweep={nav.lk % 2 === 1}
        onLogoHover={onLogoHover}
        showCanvas
      />
    </div>
  );
}
