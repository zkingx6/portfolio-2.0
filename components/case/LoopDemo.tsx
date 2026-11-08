"use client";
import { useEffect, useRef, useState } from "react";
import "@/app/styles/loop.css";

/* ─────────────────────────────────────────────
   PROMPT DIRECTION — LOOP DEMO
   A scripted 12-second autoplay animation that
   compares three prompt types for the same task.

   Timing (ms):
     0  – 3 000   Stage 01: TYPE 01 (generic/Chinese) + generic output
     3 000 – 7 000   Stage 02: annotations appear, TYPE 03 builds, output morphs
     7 000 – 10 000  Stage 03: final state holds
     10 000 – 12 000 Fade to reset → loop

   All visual transitions are driven by direct DOM
   style mutations inside the RAF loop so zero React
   re-renders occur during playback (only on hover toggle).
───────────────────────────────────────────── */

const LOOP_MS = 12000;

// ms at which each annotation badge appears (during Stage 02)
const ANN_TIMES = [3000, 3800, 4600, 5400, 6200] as const;

const ANNOTATIONS = [
  "+ AUDIENCE",
  "+ CONSTRAINT",
  "+ TASTE",
  "+ REFERENCE",
  "+ KILL RULE",
] as const;

// One line of TYPE 03 text per annotation — same order as ANNOTATIONS
const P03_LINES = [
  "Audience: first-time investors — intimidated by finance.",
  "Constraints: #0A0A0A · typography-led · no stock photos · no generic blue.",
  "Tone: calm, not salesy. Reassure without hype.",
  "Reference: Linear's restraint — not Stripe's gloss.",
  "Kill rule: if first pass looks like a template, brief me first.",
];

export function LoopDemo() {
  const [paused, setPaused] = useState(false);

  // Detect prefers-reduced-motion once on mount (SSR-safe)
  const [reducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // ── DOM refs for direct style mutations ──────────────────
  const wrapRef    = useRef<HTMLDivElement>(null);
  const p01Ref     = useRef<HTMLDivElement>(null);
  const p03Ref     = useRef<HTMLDivElement>(null);
  const genericRef = useRef<HTMLDivElement>(null);
  const distinctRef= useRef<HTMLDivElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);
  const pauseTagRef= useRef<HTMLSpanElement>(null);
  const annRefs    = useRef<(HTMLSpanElement | null)[]>(Array(5).fill(null));
  const stageRefs  = useRef<(HTMLSpanElement | null)[]>(Array(3).fill(null));

  // ── RAF state ────────────────────────────────────────────
  const pausedRef  = useRef(false);
  const visibleRef = useRef(true);
  const msRef      = useRef(0);
  const lastTsRef  = useRef<number | null>(null);
  const rafRef     = useRef(0);

  // Sync paused ref + update pause tag visibility
  useEffect(() => {
    pausedRef.current = paused;
    if (pauseTagRef.current) {
      pauseTagRef.current.style.opacity = paused ? "1" : "0";
    }
  }, [paused]);

  // IntersectionObserver — pause when off-screen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── Reduced-motion: show static final state ──────────────
  useEffect(() => {
    if (!reducedMotion) return;
    if (p01Ref.current)      p01Ref.current.style.opacity      = "0";
    if (p03Ref.current)      p03Ref.current.style.opacity      = "1";
    if (genericRef.current)  genericRef.current.style.opacity  = "0";
    if (distinctRef.current) distinctRef.current.style.opacity = "1";
    annRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity   = "1";
      el.style.transform = "translateX(0)";
    });
    stageRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.color = i === 2 ? "#91C9F7" : "#A8A59E";
    });
  }, [reducedMotion]);

  // ── RAF animation loop ───────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;

    function applyFrame(ms: number) {
      // Prompt opacities
      const p01 = ms < 3000 ? 1 : Math.max(0, 1 - (ms - 3000) / 500);
      const p03 = ms < 3000 ? 0 : Math.min(1, (ms - 3000) / 600);
      // Output opacities
      const gen  = ms < 3000 ? 1 : Math.max(0, 1 - (ms - 3000) / 1600);
      const dist = ms < 3000 ? 0 : Math.min(1, (ms - 3000) / 1600);
      // Global fade (Stage 03 → reset)
      const fade = ms > 10000 ? Math.max(0, 1 - (ms - 10000) / 2000) : 1;
      // How many annotation badges are currently visible
      const annCount = ANN_TIMES.filter((t) => ms >= t).length;
      // Stage indicator (1 | 2 | 3)
      const stage = ms < 3000 ? 1 : ms < 7000 ? 2 : 3;

      if (p01Ref.current)      p01Ref.current.style.opacity      = String(p01);
      if (p03Ref.current)      p03Ref.current.style.opacity      = String(p03);
      if (genericRef.current)  genericRef.current.style.opacity  = String(gen);
      if (distinctRef.current) distinctRef.current.style.opacity = String(dist);
      if (innerRef.current)    innerRef.current.style.opacity    = String(fade);

      annRefs.current.forEach((el, i) => {
        if (!el) return;
        const on = annCount > i;
        el.style.opacity   = on ? "1" : "0";
        el.style.transform = on ? "translateX(0)" : "translateX(-6px)";
      });

      stageRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.color = stage === i + 1 ? "#91C9F7" : "#A8A59E";
      });
    }

    function tick(ts: number) {
      if (!pausedRef.current && visibleRef.current) {
        if (lastTsRef.current === null) lastTsRef.current = ts;
        // Cap delta so a backgrounded tab doesn't cause a massive jump
        const delta = Math.min(ts - lastTsRef.current, 50);
        lastTsRef.current = ts;
        msRef.current = (msRef.current + delta) % LOOP_MS;
      } else {
        lastTsRef.current = null;
      }
      applyFrame(msRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className="ld-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* ── Window chrome ── */}
      <div className="ld-chrome">
        <span className="mono ld-chrome-title">PROMPT.DIRECTION — LOOP</span>
        <div className="ld-chrome-r">
          <span
            ref={pauseTagRef}
            className="mono ld-pause-tag"
            aria-hidden
            style={{ opacity: 0 }}
          >
            PAUSED
          </span>
          <span className="mono ld-scripted-tag">SCRIPTED DEMO</span>
        </div>
      </div>

      {/* ── Inner wrapper — target for global fade ── */}
      <div ref={innerRef} className="ld-inner">
        <div className="ld-panels">

          {/* Left: prompt text */}
          <div className="ld-left">
            {/* TYPE 01 — generic / 大家 */}
            <div ref={p01Ref} className="ld-p01">
              <div className="mono ld-type-lbl">TYPE 01 · 大家</div>
              <div className="mono ld-p01-text">
                帮我做一个 fintech app<br />的 landing page hero.
              </div>
            </div>

            {/* TYPE 03 — AI Designer directive */}
            <div ref={p03Ref} className="ld-p03" style={{ opacity: 0 }}>
              <div className="mono ld-type-lbl">TYPE 03 · AI DESIGNER</div>
              <div className="ld-p03-body">
                <div className="mono ld-p03-task">
                  Task: landing page hero — fintech app.
                </div>
                {ANNOTATIONS.map((ann, i) => (
                  <div key={ann} className="ld-line">
                    <span
                      ref={(el) => { annRefs.current[i] = el; }}
                      className="mono ld-ann"
                      style={{ opacity: 0, transform: "translateX(-6px)" }}
                      aria-hidden
                    >
                      {ann}
                    </span>
                    <span className="mono ld-line-txt">{P03_LINES[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: output mockups */}
          <div className="ld-right">
            {/* Stage 01 output — generic blue gradient */}
            <div ref={genericRef} className="ld-out-g">
              <GenericMock />
            </div>
            {/* Stage 03 output — distinctive dark */}
            <div ref={distinctRef} className="ld-out-d" style={{ opacity: 0 }}>
              <DistinctiveMock />
            </div>
          </div>
        </div>

        {/* Stage indicator */}
        <div className="ld-foot">
          <div className="mono ld-stage" aria-label="Demo stage">
            {[1, 2, 3].map((s, i) => (
              <span key={s}>
                {i > 0 && <span className="ld-sep" aria-hidden> / </span>}
                <span
                  ref={(el) => { stageRefs.current[i] = el; }}
                  className="ld-stage-n"
                  style={{ color: s === 1 ? "#91C9F7" : "#A8A59E" }}
                >
                  {String(s).padStart(2, "0")}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mock output components ─────────────────────────────── */

function GenericMock() {
  return (
    <div className="ld-mock-g">
      <div className="ld-mg-left">
        <div className="ld-mg-pill">Trusted by 50k+ investors</div>
        <div className="ld-mg-h">
          Your Financial<br />Future Starts<br />Here
        </div>
        <div className="ld-mg-sub">
          Start investing today with confidence and clarity. No experience needed.
        </div>
        <div className="ld-mg-cta">Get Started →</div>
        <div className="ld-mg-social">★ 4.9/5 · Join 50,000+ users</div>
      </div>
      <div className="ld-mg-right">
        <div className="ld-mg-screen">
          <div className="ld-mg-bar" />
          <div className="ld-mg-row" />
          <div className="ld-mg-row ld-mg-row-sm" />
          <div className="ld-mg-chart" />
        </div>
      </div>
    </div>
  );
}

function DistinctiveMock() {
  return (
    <div className="ld-mock-d">
      <div className="ld-md-tag">— INVESTING</div>
      <div className="ld-md-h">
        Finance should<br />feel less like fear.
      </div>
      <div className="ld-md-sub">
        Start with what you have.<br />Learn as you grow.
      </div>
      <div className="ld-md-cta">Begin</div>
      <div className="ld-md-rule" />
      <div className="ld-md-fine">No minimums · No jargon · No pressure</div>
    </div>
  );
}
