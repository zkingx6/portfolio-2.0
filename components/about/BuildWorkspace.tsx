"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HOLD_MS, STAGES, highlight, snapshot, type Snap, type Tone } from "./buildScript";

/*
  03 HOW I BUILD — a simulated Cursor-style session.
  One rAF loop advances a single clock; everything on screen is
  snapshot(stage, t). Switching stages just resets the clock, so nothing
  can overlap. The loop only runs while visible, playing and unfinished.
*/

type Mode = "static" | "auto" | "manual";

const FINAL = Number.POSITIVE_INFINITY;
const LANG_LABEL: Record<string, string> = { md: "Markdown", tsx: "TypeScript JSX", ts: "TypeScript", log: "Log" };

export function BuildWorkspace() {
  // Server + first paint: the finished SHIP state, so content is readable without JS.
  const [stage, setStage] = useState(3);
  const [snap, setSnap] = useState<Snap>(() => snapshot(STAGES[3], FINAL));
  const [mode, setMode] = useState<Mode>("static");
  const [paused, setPaused] = useState(false);
  const [running, setRunning] = useState(false);
  const [tabs, setTabs] = useState<number[]>([0, 1, 2, 3]);
  const [termOpen, setTermOpen] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  const clock = useRef({ stage: 3, t: FINAL, mode: "static" as Mode, paused: false, visible: false, reduced: false, started: false });
  const raf = useRef(0);
  const last = useRef(0);
  const sig = useRef("");

  const paint = useCallback((force = false) => {
    const c = clock.current;
    const s = snapshot(STAGES[c.stage], c.t);
    if (barRef.current) barRef.current.style.transform = `scaleX(${s.progress})`;
    if (force || s.sig !== sig.current) {
      sig.current = s.sig;
      setSnap(s);
    }
  }, []);

  // the frame step lives in a ref so it can re-schedule itself
  const step = useRef<(now: number) => void>(() => {});
  useEffect(() => {
    step.current = (now: number) => {
      const c = clock.current;
      const dt = last.current ? Math.min(50, now - last.current) : 0;
      last.current = now;
      if (c.paused || !c.visible || c.t === FINAL) { raf.current = 0; return; }
      c.t += dt;
      const dur = STAGES[c.stage].dur;
      if (c.t >= dur) {
        if (c.mode === "auto" && c.stage < 3) {
          if (c.t >= dur + HOLD_MS) {
            c.stage += 1;
            c.t = 0;
            setStage(c.stage);
            setTabs((tb) => (tb.includes(c.stage) ? tb : [...tb, c.stage]));
          }
        } else {
          c.t = FINAL; // finished: rest on the final readable state
          paint(true);
          setRunning(false);
          raf.current = 0;
          return;
        }
      }
      paint();
      raf.current = requestAnimationFrame(step.current);
    };
  });

  const kick = useCallback(() => {
    const c = clock.current;
    setRunning(c.t !== FINAL);
    if (raf.current || c.paused || !c.visible || c.t === FINAL) return;
    last.current = 0;
    raf.current = requestAnimationFrame((n) => step.current(n));
  }, []);

  // mount: arm the auto demo (or stay static for reduced motion)
  useEffect(() => {
    const c = clock.current;
    c.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!c.reduced) {
      c.stage = 0; c.t = 0; c.mode = "auto";
      setStage(0); setMode("auto"); setTabs([0]);
      paint(true);
    }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        c.visible = e.isIntersecting && e.intersectionRatio >= 0.3;
        if (c.visible) kick();
      },
      { threshold: [0, 0.3] },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf.current); raf.current = 0; };
  }, [kick, paint]);

  // keep the active line in view inside the editor / terminal (never scrolls the page)
  useEffect(() => {
    const box = codeRef.current;
    if (box) {
      const row = box.querySelector<HTMLElement>(`[data-ln="${snap.cursor.pane === "ed" ? snap.cursor.line : snap.lines.length - 1}"]`);
      if (row) {
        const top = row.offsetTop, h = box.clientHeight;
        if (top + 44 > box.scrollTop + h) box.scrollTop = top - h + 64;
        else if (top < box.scrollTop) box.scrollTop = Math.max(0, top - 20);
      }
    }
    const tb = termRef.current;
    if (tb) tb.scrollTop = tb.scrollHeight;
  }, [snap]);

  const play = (i: number) => {
    const c = clock.current;
    c.stage = i;
    c.mode = "manual";
    c.paused = false;
    c.t = c.reduced ? FINAL : 0;
    cancelAnimationFrame(raf.current); raf.current = 0;
    setStage(i); setMode("manual"); setPaused(false);
    setTabs((tb) => (tb.includes(i) ? tb : [...tb, i]));
    paint(true);
    kick();
  };

  const togglePause = () => {
    const c = clock.current;
    c.paused = !c.paused;
    setPaused(c.paused);
    kick();
  };

  const st = STAGES[stage];
  const isShip = stage === 3;
  const statusTone: Tone = snap.status.tone;

  return (
    <div ref={rootRef} className={"bw" + (isShip ? " ship" : "") + (termOpen ? "" : " tc")}>
      {/* title bar */}
      <div className="bw-hd mono">
        <span className="ab-wd o" />
        <span className="ab-wd" />
        <span className="ab-wd" />
        <span className="bw-proj">Ronger / Workflow</span>
        <span className="bw-sep">—</span>
        <span className="bw-fn">{st.file}</span>
        <span className={"bw-st t-" + statusTone} aria-hidden>
          <span className="bw-sd" />
          {snap.status.text}
        </span>
        {running ? (
          <button type="button" className="bw-btn mono" onClick={togglePause} aria-label={paused ? "Resume animation" : "Pause animation"}>
            {paused ? "Resume" : "Pause"}
          </button>
        ) : null}
        <button type="button" className="bw-btn run mono" onClick={() => play(stage)} aria-label={`Replay ${st.label} stage`}>
          <span className="bw-tri" aria-hidden /> {running ? "Restart" : "Run"}
        </button>
      </div>

      {/* stages */}
      <div className="bw-stages mono" role="group" aria-label="Workflow stages">
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className={"bw-sg" + (i === stage ? " on" : "") + (i < stage ? " past" : "")}
            aria-pressed={i === stage}
            onClick={() => play(i)}
          >
            <b>{s.num}</b> {s.label}
            {i === stage && <span className="bw-pg" aria-hidden><span ref={barRef} style={{ transform: `scaleX(${snap.progress})` }} /></span>}
          </button>
        ))}
      </div>

      <div className="bw-body">
        {/* explorer */}
        <nav className="bw-ex mono" aria-label="Workflow files">
          <span className="bw-ext">Explorer</span>
          <span className="bw-dir">▾ workflow/</span>
          {STAGES.map((s, i) => (
            <button key={s.key} type="button" className={"bw-file" + (i === stage ? " on" : "")} onClick={() => play(i)}>
              <span className="bw-tree" aria-hidden>{i === 3 ? "└─" : "├─"}</span>
              <span className={"bw-ic l-" + s.lang} aria-hidden />
              {s.file}
            </button>
          ))}
        </nav>

        <div className="bw-main">
          {/* tabs */}
          <div className="bw-tabs mono" aria-hidden>
            {tabs.map((i) => (
              <span key={i} className={"bw-tab" + (i === stage ? " on" : "")}>
                <span className={"bw-ic l-" + STAGES[i].lang} />
                {STAGES[i].file}
              </span>
            ))}
          </div>

          <div className="bw-edwrap">
            {/* editor */}
            <div ref={codeRef} className="bw-code mono" aria-hidden>
              {snap.lines.map((l, i) => {
                const mk = l.id ? snap.marks[l.id] : undefined;
                const note = l.id ? snap.notes[l.id] : undefined;
                const active = snap.cursor.pane === "ed" && snap.cursor.line === i;
                return (
                  <div key={i}>
                    <div data-ln={i} className={"bw-ln" + (active ? " act" : "") + (mk ? " m-" + mk : "") + (l.cls ? " c-" + l.cls : "")}>
                      <span className="bw-no">{i + 1}</span>
                      <span className="bw-tx">
                        {highlight(st.lang, l.full, l.text.length).map(([c, t], j) => (
                          <span key={j} className={c ? "k-" + c : undefined}>{t}</span>
                        ))}
                        {active && <span className={"bw-cur" + (l.typing ? " typing" : "")} />}
                      </span>
                    </div>
                    {note && (
                      <div className="bw-ln note">
                        <span className="bw-no" />
                        <span className={"bw-note t-" + note.tone}>{note.text}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* minimal live preview for the DESIGN stage */}
            {stage === 1 && (
              <div className="bw-pv mono" aria-hidden>
                <span className="bw-pvh">Preview · /schedule</span>
                <div className={"bw-pr" + (snap.pv >= 1 ? " in" : "")}>
                  <span>Team</span>
                  <i className="bw-sq" /><i className="bw-sq" /><i className="bw-sq" /><i className="bw-sq" />
                </div>
                <div className={"bw-pr" + (snap.pv >= 2 ? " in" : "")}>
                  <span>Hours</span>
                  <em>working hours</em>
                </div>
                <div className={"bw-pr" + (snap.pv >= 3 ? " in" : "")}>
                  <span>Rotation</span>
                  <i className="bw-bar" /><i className="bw-bar o" /><i className="bw-bar" /><i className="bw-bar" />
                </div>
                <div className={"bw-pr" + (snap.pv >= 4 ? " in" : "")}>
                  <span>Why</span>
                  <em>late call rotates</em>
                </div>
                <div className={"bw-pr" + (snap.pv >= 5 ? " in" : "")}>
                  <span>Fairness</span>
                  <i className="bw-meter"><i /></i>
                </div>
              </div>
            )}
          </div>

          {/* integrated terminal */}
          <div className="bw-term">
            <button type="button" className="bw-th mono" onClick={() => setTermOpen((v) => !v)} aria-expanded={termOpen}>
              <span>Terminal</span>
              <span className="bw-tsh">zsh · ~/parallel</span>
              {snap.done && <span className="bw-ok">● Build successful</span>}
              <span className="bw-chev" aria-hidden>{termOpen ? "▾" : "▸"}</span>
            </button>
            <div ref={termRef} className="bw-tb mono" aria-hidden>
              {snap.term.map((l, i) => {
                const active = snap.cursor.pane === "term" && i === snap.term.length - 1;
                return (
                  <div key={i} className="bw-tl">
                    {highlight("sh", l.full, l.text.length).map(([c, t], j) => (
                      <span key={j} className={c ? "k-" + c : undefined}>{t}</span>
                    ))}
                    {active && <span className={"bw-cur" + (l.typing ? " typing" : "")} />}
                  </div>
                );
              })}
              {!(snap.cursor.pane === "term") && (
                <div className="bw-tl"><span className="k-pr">$ </span><span className="bw-cur" /></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* status bar */}
      <div className="bw-sb mono" aria-hidden>
        <span>⎇ main</span>
        <span>{LANG_LABEL[st.lang]}</span>
        <span className={"bw-sbs t-" + statusTone}>{snap.status.text}</span>
        <span className="bw-sbr">
          {mode === "auto" ? "Auto demo" : mode === "manual" ? "Manual" : "Static"} · Ln {snap.cursor.line + 1}, Col {snap.cursor.col + 1}
        </span>
      </div>

      {/* readable version of every stage for assistive tech */}
      <ol className="sr-only">
        {STAGES.map((s) => (
          <li key={s.key}>{s.num} {s.label} ({s.file}): {s.summary}</li>
        ))}
      </ol>
    </div>
  );
}
