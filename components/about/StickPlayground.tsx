"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/*
  Tiny pixel-character dodge game for the About intro.
  One orange obstacle at a time slides across the floor; jump it for +1.
  No engine — one rAF loop, refs for position, state only for rare changes.
  Keys work only while the stage is focused AND playing.
*/

const SPEED = 150; // px/s
const GRAVITY = 1300; // px/s²
const JUMP_V = 340; // px/s → ~44px peak
// Sprite: public/about/ronger-sprite.png, native 29×69 art pixels.
// Shown at exactly 2/3 scale (no stretching), pixelated in CSS.
const SPRITE_W = 29;
const SPRITE_H = 69;
const SCALE = 2 / 3;
const FIG_W = SPRITE_W * SCALE; // ≈19.3px
const FIG_H = SPRITE_H * SCALE; // 46px
const HIT_HALF = 5; // half-width of pants/shoes — the only part at obstacle height
const FLOOR = 13; // floor offset from stage bottom (matches CSS)
const START_X = 48;
// slower obstacles stay under you longer, so start at a speed with a
// comfortable jump window (~0.25s) and only nudge it up
const OB_SPEED = 110; // px/s at score 0
const OB_STEP = 3; // +px/s per point
const OB_MAX = 170; // px/s cap
const DEATH_FREEZE = 0.5; // s
const SAFE_SPAWN = 64; // never spawn this close to the player
const nextGap = () => 0.7 + Math.random() * 0.6; // s between obstacles
const SQ = 12;
const PAD = 12; // stage inner padding left/right

export function StickPlayground({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const figRef = useRef<HTMLDivElement>(null);

  const obRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: START_X, y: 0, vy: 0, w: 280, h: 104 });
  // obstacle: x = left edge; dir +1 → moving right, -1 → moving left
  const ob = useRef({ on: false, x: 0, dir: 1 as 1 | -1, passed: false });
  const game = useRef({ score: 0, spawnIn: 0.9, deadFor: 0 });
  const keys = useRef({ l: false, r: false, jump: false });
  const raf = useRef(0);
  const last = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [walk, setWalk] = useState<0 | -1 | 1>(0);
  const [air, setAir] = useState(false);
  const [hit, setHit] = useState(false);
  const [score, setScore] = useState(0);

  const place = useCallback(() => {
    const f = figRef.current;
    if (!f) return;
    const p = pos.current;
    // whole pixels keep the sprite crisp while moving
    f.style.transform = `translate3d(${Math.round(p.x - FIG_W / 2)}px, ${-Math.round(p.y)}px, 0)`;
  }, []);

  const placeOb = useCallback(() => {
    const el = obRef.current;
    if (!el) return;
    const o = ob.current;
    el.style.visibility = o.on ? "visible" : "hidden";
    el.style.transform = `translate3d(${Math.round(o.x)}px, 0, 0)`;
  }, []);

  // measure stage width; keep figure in bounds on resize
  useEffect(() => {
    const st = stageRef.current;
    if (!st) return;
    const measure = () => {
      const p = pos.current;
      p.w = st.clientWidth;
      p.h = st.clientHeight;
      p.x = Math.min(Math.max(p.x, PAD + FIG_W / 2), p.w - PAD - FIG_W / 2);
      place();
      placeOb();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(st);
    return () => ro.disconnect();
  }, [place, placeOb]);

  // pause when the tab is hidden
  useEffect(() => {
    const vis = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  // game loop — only while playing
  useEffect(() => {
    if (!playing) return;
    let walkDir: 0 | -1 | 1 = 0;
    let inAir = false;
    const tick = (t: number) => {
      const dt = Math.min(0.033, (t - (last.current || t)) / 1000);
      last.current = t;
      const p = pos.current;
      const k = keys.current;
      const g = game.current;
      const o = ob.current;

      // death freeze → reset and keep going
      if (g.deadFor > 0) {
        g.deadFor -= dt;
        k.jump = false;
        if (g.deadFor <= 0) {
          p.x = Math.min(START_X, p.w / 2); p.y = 0; p.vy = 0;
          o.on = false;
          g.score = 0; setScore(0);
          g.spawnIn = 0.9;
          setHit(false);
          place(); placeOb();
        }
        raf.current = requestAnimationFrame(tick);
        return;
      }

      const dir = (k.r ? 1 : 0) - (k.l ? 1 : 0);
      p.x = Math.min(Math.max(p.x + dir * SPEED * dt, PAD + FIG_W / 2), p.w - PAD - FIG_W / 2);

      if (k.jump && p.y === 0) p.vy = JUMP_V;
      k.jump = false;
      if (p.y > 0 || p.vy > 0) {
        p.vy -= GRAVITY * dt;
        p.y = Math.max(0, p.y + p.vy * dt);
        // ceiling: keep the sprite inside the stage on short (mobile) stages
        const top = p.h - FLOOR - FIG_H - 2;
        if (p.y > top) { p.y = top; p.vy = Math.min(p.vy, 0); }
        if (p.y === 0) p.vy = 0;
      }
      place();

      const nd = dir as 0 | -1 | 1;
      if (nd !== walkDir) { walkDir = nd; setWalk(nd); }
      const na = p.y > 0;
      if (na !== inAir) { inAir = na; setAir(na); }

      // obstacle: spawn → slide → score once when fully past → exit
      if (!o.on) {
        g.spawnIn -= dt;
        if (g.spawnIn <= 0) {
          let d: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
          const nearLeft = p.x - PAD < SAFE_SPAWN;
          const nearRight = p.w - PAD - p.x < SAFE_SPAWN;
          if (d === 1 && nearLeft) d = -1;
          else if (d === -1 && nearRight) d = 1;
          if ((d === 1 && nearLeft) || (d === -1 && nearRight)) {
            g.spawnIn = 0.2; // stage too tight right now — try again shortly
          } else {
            o.on = true; o.dir = d; o.passed = false;
            o.x = d === 1 ? -SQ : p.w;
          }
        }
      } else {
        const v = Math.min(OB_MAX, OB_SPEED + g.score * OB_STEP);
        o.x += o.dir * v * dt;
        const pl = p.x - HIT_HALF, pr = p.x + HIT_HALF;
        // collision with the visible body (not the transparent sprite box)
        if (o.x < pr && o.x + SQ > pl && p.y < SQ) {
          g.deadFor = DEATH_FREEZE;
          setHit(true);
          setWalk(0); walkDir = 0;
        } else if (!o.passed && (o.dir === 1 ? o.x > pr : o.x + SQ < pl)) {
          o.passed = true;
          g.score += 1; setScore(g.score);
        }
        if (o.x > p.w || o.x < -SQ) { o.on = false; g.spawnIn = nextGap(); }
      }
      placeOb();

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
  }, [playing, place, placeOb]);

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
        aria-label="Pixel dodge game"
        aria-describedby="abpg-hint"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onPointerDown={() => { if (!playing) start(); }}
      >
        <div ref={obRef} className="abpg-sq" style={{ visibility: "hidden" }} aria-hidden />
        <div
          ref={figRef}
          className="abpg-figwrap"
          style={{ width: FIG_W, height: FIG_H }}
          aria-hidden
        >
          <Image
            className={figCls}
            src="/about/ronger-sprite.png"
            alt=""
            width={SPRITE_W}
            height={SPRITE_H}
            style={{ width: FIG_W, height: FIG_H }}
            draggable={false}
            unoptimized
            priority
          />
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
          {String(score).padStart(2, "0")}
          <span className="sr-only"> obstacles dodged</span>
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
