"use client";

import { useEffect, type MutableRefObject, type RefObject } from "react";
import { audioState, tickSound } from "./audio";
import type { DotConfig } from "./types";

type Quiet = { in: boolean; drag: boolean };

export function useDotField(
  cfgRef: RefObject<DotConfig>,
  panelOpenRef: RefObject<boolean>,
  quietRef: MutableRefObject<Quiet>,
  resizeRef: MutableRefObject<(() => void) | null>,
) {
  useEffect(() => {
    const hero = document.getElementById("top");
    const cv1 = document.getElementById("dotfield") as HTMLCanvasElement | null;
    if (!hero || !cv1) return;

    const TAU = Math.PI * 2;
    const mq = (q: string) => !!(window.matchMedia && window.matchMedia(q).matches);
    const rm = mq("(prefers-reduced-motion: reduce)");
    const touch = mq("(hover: none)");
    const P = {
      x: 0,
      y: 0,
      active: false,
      down: false,
      moved: false,
      sx: 0,
      sy: 0,
    };
    const panel = document.getElementById("cfgp");
    const cfg = () => cfgRef.current;
    const REST: [number, number, number] = [46, 46, 46];
    const MID: [number, number, number] = [120, 118, 114];
    const ORA: [number, number, number] = [255, 106, 36];
    const ICE: [number, number, number] = [145, 201, 247];
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const mix = (A: number[], B: number[], t: number) =>
      [lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)] as [
        number,
        number,
        number,
      ];
    const col = (bright: number, acc: string) => {
      let c: [number, number, number];
      if (bright < 0.4) c = mix(REST, MID, bright / 0.4);
      else if (acc === "ice") c = mix(MID, ICE, (bright - 0.4) / 0.6);
      else if (acc === "mix")
        c =
          bright < 0.7
            ? mix(MID, ICE, (bright - 0.4) / 0.3)
            : mix(ICE, ORA, (bright - 0.7) / 0.3);
      else c = mix(MID, ORA, (bright - 0.4) / 0.6);
      return "rgb(" + (c[0] | 0) + "," + (c[1] | 0) + "," + (c[2] | 0) + ")";
    };

    type Field = {
      cv: HTMLCanvasElement;
      host: HTMLElement;
      o: { scale: number; probe: boolean; txt: string[] };
      ctx: CanvasRenderingContext2D;
      S: {
        b: Float32Array;
        cols: number;
        rows: number;
        d: number;
        W: number;
        H: number;
        dpr: number;
        rip: { cx: number; cy: number; t: number }[];
        last: number;
        txt: { x0: number; x1: number; y0: number; y1: number }[];
        probe: boolean;
        px: number;
        py: number;
        shown: boolean;
      };
    };

    const FIELDS: Field[] = [];
    const mk = (
      cv: HTMLCanvasElement,
      host: HTMLElement,
      o: Field["o"],
    ): Field => {
      const F: Field = {
        cv,
        host,
        o,
        ctx: cv.getContext("2d")!,
        S: {
          b: new Float32Array(0),
          cols: 0,
          rows: 0,
          d: 32,
          W: 0,
          H: 0,
          dpr: 1,
          rip: [],
          last: 0,
          txt: [],
          probe: false,
          px: 0,
          py: 0,
          shown: false,
        },
      };
      FIELDS.push(F);
      return F;
    };

    const draw = (F: Field) => {
      const S = F.S;
      const ctx = F.ctx;
      const { d, cols, rows, b } = S;
      const acc = cfg().accent;
      ctx.clearRect(0, 0, S.W, S.H);
      ctx.fillStyle = "#2e2e2e";
      ctx.beginPath();
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) {
          if (b[j * cols + i] < 0.02) {
            const x = d / 2 + i * d;
            const y = d / 2 + j * d;
            ctx.moveTo(x + 1.2, y);
            ctx.arc(x, y, 1.2, 0, TAU);
          }
        }
      ctx.fill();
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) {
          const v = b[j * cols + i];
          if (v >= 0.02) {
            const x = d / 2 + i * d;
            const y = d / 2 + j * d;
            ctx.fillStyle = col(v, acc);
            ctx.beginPath();
            ctx.arc(x, y, 1.2 * (1 + 0.8 * v), 0, TAU);
            ctx.fill();
          }
        }
    };

    const resize = (F: Field) => {
      const S = F.S;
      S.dpr = Math.min(2, window.devicePixelRatio || 1);
      S.W = F.host.clientWidth;
      S.H = F.host.clientHeight;
      if (!S.W || !S.H) return;
      F.cv.width = Math.round(S.W * S.dpr);
      F.cv.height = Math.round(S.H * S.dpr);
      F.ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
      S.d = cfg().density * F.o.scale;
      S.cols = Math.ceil(S.W / S.d);
      S.rows = Math.ceil(S.H / S.d);
      S.b = new Float32Array(S.cols * S.rows);
      const r = F.cv.getBoundingClientRect();
      S.txt = [];
      F.o.txt.forEach((sel) => {
        const el = F.host.querySelector(sel);
        if (el) {
          const a = el.getBoundingClientRect();
          S.txt.push({
            x0: a.left - r.left - 12,
            x1: a.right - r.left + 12,
            y0: a.top - r.top - 8,
            y1: a.bottom - r.top + 8,
          });
        }
      });
      draw(F);
    };

    mk(cv1, hero, { scale: 1, probe: true, txt: ["h1"] });
    const cv2 = document.getElementById("dotfield2") as HTMLCanvasElement | null;
    const ct = document.getElementById("contact");
    if (cv2 && ct) mk(cv2, ct, { scale: 1.35, probe: false, txt: ["h2", "#portrait"] });

    resizeRef.current = () => FIELDS.forEach(resize);
    let raf = 0;
    let lastTick = 0;

    const step = (F: Field, ts: number) => {
      const S = F.S;
      const cv = F.cv;
      if (!cv.isConnected) return;
      const cr = cv.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      if (!(cr.width > 0 && cr.height > 0 && cr.bottom > 0 && cr.top < vh)) {
        if (S.shown) {
          S.shown = false;
          S.rip.length = 0;
          S.b.fill(0);
          draw(F);
        }
        S.last = 0;
        return;
      }
      S.shown = true;
      const dt = Math.min(0.05, Math.max(0, (ts - (S.last || ts)) / 1000));
      S.last = ts;
      const c = cfg();
      const { d, cols, rows, b } = S;
      const R = c.radius;
      const R2 = R * R;
      const decay = 0.22 - 0.19 * (c.trail / 100);
      const kr = 1 - Math.pow(1 - 0.35, dt * 60);
      let kd = 1 - Math.pow(1 - decay, dt * 60);
      const pr = panelOpenRef.current && panel ? panel.getBoundingClientRect() : null;
      const overPanel = !!(
        pr &&
        P.x >= pr.left &&
        P.x <= pr.right &&
        P.y >= pr.top &&
        P.y <= pr.bottom
      );
      const live = P.active && !overPanel;
      const gx = P.x - cr.left;
      const gy = P.y - cr.top;
      S.probe = F.o.probe && overPanel && P.active && !rm;
      if (!live && !S.probe) kd = Math.max(kd, 1 - Math.pow(0.92, dt * 60));
      if (S.probe) {
        const w = ts / 1000;
        S.px = S.W * 0.3 + Math.cos(w * 1.3) * S.W * 0.12;
        S.py = S.H * 0.5 + Math.sin(w * 1.9) * S.H * 0.16;
      }
      const now = performance.now();
      const tx = S.txt;
      S.rip = S.rip.filter((r) => now - r.t < 1100);
      let tick = false;
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) {
          const x = d / 2 + i * d;
          const y = d / 2 + j * d;
          let t = 0;
          if (live) {
            const dx = x - gx;
            const dy = y - gy;
            const q = dx * dx + dy * dy;
            if (q < R2) {
              const u = 1 - Math.sqrt(q) / R;
              t = u * u * (3 - 2 * u);
            }
          }
          if (S.probe) {
            const dx = x - S.px;
            const dy = y - S.py;
            const q = dx * dx + dy * dy;
            if (q < R2) {
              const u = 1 - Math.sqrt(q) / R;
              const v = u * u * (3 - 2 * u);
              if (v > t) t = v;
            }
          }
          for (const r of S.rip) {
            const age = (now - r.t) / 1000;
            const e = Math.abs(
              Math.hypot(x - (r.cx - cr.left), y - (r.cy - cr.top)) - age * 420,
            );
            if (e < 70) {
              const v = (1 - e / 70) * (1 - age / 1.1) * 0.9;
              if (v > t) t = v;
            }
          }
          if (touch) {
            const wv = Math.max(0, Math.sin((x / S.W - ts / 6000) * TAU));
            const v = wv * wv * wv * wv * 0.35;
            if (v > t) t = v;
          }
          if (t > 0.6) {
            for (let m = 0; m < tx.length; m++) {
              const q = tx[m];
              if (x > q.x0 && x < q.x1 && y > q.y0 && y < q.y1) {
                t = 0.6;
                break;
              }
            }
          }
          const k = j * cols + i;
          const v0 = b[k];
          const v1 = v0 + (t - v0) * (t > v0 ? kr : kd);
          if (c.sound && v0 < 0.55 && v1 >= 0.55) tick = true;
          b[k] = v1 < 0.003 ? 0 : v1;
        }
      draw(F);
      const RXA = audioState();
      const q = quietRef.current;
      if (
        tick &&
        now - lastTick > 70 &&
        RXA.armed &&
        RXA.ctx &&
        RXA.ctx.state === "running" &&
        !(q.in || q.drag)
      ) {
        lastTick = now;
        tickSound();
      }
    };

    const frame = (ts: number) => {
      raf = requestAnimationFrame(frame);
      try {
        FIELDS.forEach((F) => step(F, ts));
      } catch (err) {
        if (window.console) console.error("dotfield", err);
      }
    };

    const off = () => {
      P.active = false;
      P.down = false;
      P.moved = false;
    };
    const onMove = (e: PointerEvent) => {
      P.x = e.clientX;
      P.y = e.clientY;
      P.active = true;
      if (P.down && Math.hypot(e.clientX - P.sx, e.clientY - P.sy) > 4)
        P.moved = true;
    };
    const onDown = (e: PointerEvent) => {
      P.x = e.clientX;
      P.y = e.clientY;
      P.sx = e.clientX;
      P.sy = e.clientY;
      P.down = true;
      P.moved = false;
      P.active = true;
      const t = e.target as HTMLElement | null;
      if (t?.closest && !t.closest(".cfgp,.cfgchip"))
        FIELDS.forEach((F) => {
          if (F.host.contains(t))
            F.S.rip.push({ cx: e.clientX, cy: e.clientY, t: performance.now() });
        });
    };
    const onUp = (e: PointerEvent) => {
      const was = P.moved;
      P.down = false;
      P.moved = false;
      if (e.pointerType === "touch" || e.type === "pointercancel" || was)
        P.active = false;
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) off();
    };
    const onVis = () => {
      if (document.hidden) {
        off();
        FIELDS.forEach((F) => {
          F.S.rip.length = 0;
          F.S.b.fill(0);
          draw(F);
        });
      }
    };

    if (!rm) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      window.addEventListener("pointercancel", onUp, { passive: true });
      document.addEventListener("mouseout", onOut);
      document.documentElement.addEventListener("pointerleave", off);
      document.documentElement.addEventListener("mouseleave", off);
      window.addEventListener("blur", off);
      document.addEventListener("visibilitychange", onVis);
    }

    const ro = new ResizeObserver(() => FIELDS.forEach(resize));
    FIELDS.forEach((F) => ro.observe(F.host));
    FIELDS.forEach(resize);
    if (!rm) raf = requestAnimationFrame(frame);

    const enter = () => {
      quietRef.current.in = true;
    };
    const leave = () => {
      quietRef.current.in = false;
    };
    const down = () => {
      quietRef.current.drag = true;
    };
    const qUp = () => {
      quietRef.current.drag = false;
    };
    if (panel) {
      panel.addEventListener("pointerenter", enter);
      panel.addEventListener("pointerleave", leave);
      panel.addEventListener("pointerdown", down);
    }
    window.addEventListener("pointerup", qUp);
    window.addEventListener("pointercancel", qUp);

    return () => {
      window.removeEventListener("pointerup", qUp);
      window.removeEventListener("pointercancel", qUp);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("pointerleave", off);
      document.documentElement.removeEventListener("mouseleave", off);
      window.removeEventListener("blur", off);
      document.removeEventListener("visibilitychange", onVis);
      if (panel) {
        panel.removeEventListener("pointerenter", enter);
        panel.removeEventListener("pointerleave", leave);
        panel.removeEventListener("pointerdown", down);
      }
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      resizeRef.current = null;
    };
  }, [cfgRef, panelOpenRef, quietRef, resizeRef]);
}
