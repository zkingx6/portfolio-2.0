"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
  Tiny stick-figure playground for the About intro.
  No engine — one rAF loop, refs for position, state only for rare changes.
  Keys work only while the stage is focused AND playing.
*/

const SPEED = 150; // px/s
const GRAVITY = 1300; // px/s²
const JUMP_V = 340; // px/s → ~44px peak
const FIG_W = 24;
const FIG_H = 44;
const SQ = 12;
const PAD = 12; // stage inner padding left/right

export function StickPlayground({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const figRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 48, y: 0, vy: 0, w: 280 });
  const sqX = useRef(0.72); // fraction of usable width
  const keys = useRef({ l: false, r: false, jump: false });
  const raf = useRef(0);
  const last = useRef(0);
  const popping = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [walk, setWalk] = useState<0 | -1 | 1>(0);
  const [air, setAir] = useState(false);
  const [hit, setHit] = useState(false);
  const [pop, setPop] = useState(false);
  const [hits, setHits] = useState(0);
  const [sqLeft, setSqLeft] = useState<number | null>(null);

  const place = useCallback(() => {
    const f = figRef.current;
    if (!f) return;
    const p = pos.current;
    f.style.transform = `translate3d(${p.x - FIG_W / 2}px, ${-p.y}px, 0)`;
  }, []);

  const squarePx = useCallback(() => {
    const p = pos.current;
    return PAD + sqX.current * (p.w - 2 * PAD - SQ);
  }, []);

  // measure stage width; keep figure in bounds on resize
  useEffect(() => {
    const st = stageRef.current;
    if (!st) return;
    const measure = () => {
      const p = pos.current;
      p.w = st.clientWidth;
      p.x = Math.min(Math.max(p.x, PAD + FIG_W / 2), p.w - PAD - FIG_W / 2);
      setSqLeft(squarePx());
      place();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(st);
    return () => ro.disconnect();
  }, [place, squarePx]);

  // game loop — only while playing
  useEffect(() => {
    if (!playing) return;
    let walkDir: 0 | -1 | 1 = 0;
    let inAir = false;
    let inHit = false;
    const tick = (t: number) => {
      const dt = Math.min(0.033, (t - (last.current || t)) / 1000);
      last.current = t;
      const p = pos.current;
      const k = keys.current;

      const dir = (k.r ? 1 : 0) - (k.l ? 1 : 0);
      p.x = Math.min(Math.max(p.x + dir * SPEED * dt, PAD + FIG_W / 2), p.w - PAD - FIG_W / 2);

      if (k.jump && p.y === 0) p.vy = JUMP_V;
      k.jump = false;
      if (p.y > 0 || p.vy > 0) {
        p.vy -= GRAVITY * dt;
        p.y = Math.max(0, p.y + p.vy * dt);
        if (p.y === 0) p.vy = 0;
      }
      place();

      const nd = dir as 0 | -1 | 1;
      if (nd !== walkDir) { walkDir = nd; setWalk(nd); }
      const na = p.y > 0;
      if (na !== inAir) { inAir = na; setAir(na); }

      // contact: figure box vs square box (square sits on the floor)
      const sx = squarePx();
      const overlap =
        p.x + 6 > sx && p.x - 6 < sx + SQ && p.y < SQ;
      if (overlap !== inHit) { inHit = overlap; setHit(overlap); }
      if (overlap && !popping.current) {
        popping.current = true;
        setPop(true);
        setHits((h) => h + 1);
        // respawn the square away from the figure
        window.setTimeout(() => {
          const usable = pos.current.w - 2 * PAD - SQ;
          const figF = (pos.current.x - PAD) / usable;
          let n = Math.random();
          if (Math.abs(n - figF) < 0.3) n = (figF + 0.5) % 1;
          sqX.current = Math.min(0.95, Math.max(0.05, n));
          setSqLeft(squarePx());
          setPop(false);
          popping.current = false;
        }, 360);
      }

      raf.current = requestAnimationFrame(tick);
    };
    last.current = 0;
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      keys.current = { l: false, r: false, jump: false };
      setWalk(0);
      setHit(false);
    };
  }, [playing, place, squarePx]);

  // pause when focus leaves the whole widget
  const onBlurCapture = (e: React.FocusEvent) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node)) setPlaying(false);
  };

  const start = () => {
    setPlaying(true);
    stageRef.current?.focus({ preventScroll: true });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!playing) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPlaying(true); }
      return;
    }
    if (e.key === "ArrowLeft") { keys.current.l = true; e.preventDefault(); }
    else if (e.key === "ArrowRight") { keys.current.r = true; e.preventDefault(); }
    else if (e.key === " " || e.key === "Spacebar") { if (!e.repeat) keys.current.jump = true; e.preventDefault(); }
    else if (e.key === "Escape") setPlaying(false);
  };
  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") keys.current.l = false;
    else if (e.key === "ArrowRight") keys.current.r = false;
  };

  // touch: hold-to-move buttons
  const hold = (k: "l" | "r") => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      if (!playing) setPlaying(true);
      keys.current[k] = true;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    onPointerUp: () => { keys.current[k] = false; },
    onPointerCancel: () => { keys.current[k] = false; },
    onLostPointerCapture: () => { keys.current[k] = false; },
  });

  const figCls =
    "abpg-fig" +
    (walk ? " walk" : "") +
    (air ? " air" : "") +
    (hit ? " hit" : "");

  return (
    <div
      ref={rootRef}
      className={"abpg " + (playing ? "on " : "") + className}
      onBlurCapture={onBlurCapture}
    >
      <div className="abpg-hd mono">
        <span className="abpg-tt">play.tsx</span>
        <span className="abpg-st" aria-hidden>
          <span className="abpg-dot" />
          {playing ? "Play" : "Ready"}
        </span>
        <button
          type="button"
          className="abpg-btn mono"
          onClick={() => (playing ? setPlaying(false) : start())}
          aria-label={playing ? "Pause playground" : "Play playground"}
          aria-pressed={playing}
        >
          <span className={"abpg-ic " + (playing ? "pause" : "play")} aria-hidden />
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      <div
        ref={stageRef}
        className="abpg-stage"
        tabIndex={0}
        role="application"
        aria-label="Stick figure playground"
        aria-describedby="abpg-hint"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onPointerDown={() => { if (!playing) start(); }}
      >
        <div
          className={"abpg-sq" + (pop ? " pop" : "")}
          style={{ left: sqLeft ?? undefined }}
          aria-hidden
        />
        <div
          ref={figRef}
          className="abpg-figwrap"
          style={{ ["--lean" as string]: `${walk * 6}deg` }}
          aria-hidden
        >
          <svg className={figCls} width={FIG_W} height={FIG_H} viewBox={`0 0 ${FIG_W} ${FIG_H}`}>
            <g className="abpg-body">
              <circle cx="12" cy="6" r="4" />
              <line x1="12" y1="10" x2="12" y2="26" />
              <line className="abpg-arm a1" x1="12" y1="15" x2="5" y2="22" />
              <line className="abpg-arm a2" x1="12" y1="15" x2="19" y2="22" />
            </g>
            <line className="abpg-leg l1" x1="12" y1="26" x2="6" y2="42" />
            <line className="abpg-leg l2" x1="12" y1="26" x2="18" y2="42" />
          </svg>
        </div>
        <div className="abpg-floor" aria-hidden />
      </div>

      <div className="abpg-ft mono">
        <span id="abpg-hint" className="abpg-hint">
          <span className="abpg-kb">← → move · space jump</span>
          <span className="abpg-tch">hold ← → · tap jump</span>
          <span className="sr-only">
            {playing ? " Press Escape to pause." : " Press Enter to play."}
          </span>
        </span>
        <span className="abpg-ct" aria-live="polite">
          {String(hits).padStart(2, "0")}
          <span className="sr-only"> squares touched</span>
        </span>
      </div>

      <div className="abpg-touch" aria-label="Touch controls">
        <button type="button" className="abpg-tb mono" aria-label="Move left" {...hold("l")}>←</button>
        <button
          type="button"
          className="abpg-tb mono"
          aria-label="Jump"
          onPointerDown={(e) => { e.preventDefault(); if (!playing) setPlaying(true); keys.current.jump = true; }}
        >
          Jump
        </button>
        <button type="button" className="abpg-tb mono" aria-label="Move right" {...hold("r")}>→</button>
      </div>
    </div>
  );
}
