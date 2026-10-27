"use client";

import { useEffect } from "react";

/**
 * Simplified dot-field for the About Journey strip.
 * Same render math as useDotField — proximity falloff, orange accent —
 * but no sound, no panel deadzone, no config, smaller scale.
 */
export function useJourneyDots(canvasId: string, hostId: string) {
  useEffect(() => {
    const cv = document.getElementById(canvasId) as HTMLCanvasElement | null;
    const host = document.getElementById(hostId);
    if (!cv || !host) return;

    const TAU = Math.PI * 2;
    const rm = !!(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

    const d = 22;   // grid spacing — tighter than hero (32)
    const R = 110;  // proximity radius
    const R2 = R * R;

    const REST: [number, number, number] = [46, 46, 46];
    const MID: [number, number, number] = [120, 118, 114];
    const ORA: [number, number, number] = [255, 106, 36];
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const mix = (
      A: readonly number[],
      B: readonly number[],
      t: number,
    ): [number, number, number] => [
      lerp(A[0], B[0], t),
      lerp(A[1], B[1], t),
      lerp(A[2], B[2], t),
    ];
    const col = (v: number) => {
      const c =
        v < 0.4 ? mix(REST, MID, v / 0.4) : mix(MID, ORA, (v - 0.4) / 0.6);
      return `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
    };

    let cols = 0,
      rows = 0,
      W = 0,
      H = 0,
      dpr = 1;
    let b = new Float32Array(0);
    const ctx = cv.getContext("2d")!;
    let Px = 0,
      Py = 0,
      active = false;
    let raf = 0,
      lastTs = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#2e2e2e";
      ctx.beginPath();
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) {
          if (b[j * cols + i] < 0.02) {
            const x = d / 2 + i * d,
              y = d / 2 + j * d;
            ctx.moveTo(x + 1.2, y);
            ctx.arc(x, y, 1.2, 0, TAU);
          }
        }
      ctx.fill();
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) {
          const v = b[j * cols + i];
          if (v >= 0.02) {
            const x = d / 2 + i * d,
              y = d / 2 + j * d;
            ctx.fillStyle = col(v);
            ctx.beginPath();
            ctx.arc(x, y, 1.2 * (1 + 0.8 * v), 0, TAU);
            ctx.fill();
          }
        }
    };

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = host.clientWidth;
      H = host.clientHeight;
      if (!W || !H) return;
      cv.width = Math.min(Math.round(W * dpr), 3840);
      cv.height = Math.min(Math.round(H * dpr), 2160);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / d);
      rows = Math.ceil(H / d);
      b = new Float32Array(cols * rows);
      draw();
    };

    const frame = (ts: number) => {
      raf = requestAnimationFrame(frame);
      if (!cv.isConnected || !cols || !rows) return;
      const cr = cv.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      if (!(cr.width > 0 && cr.height > 0 && cr.bottom > 0 && cr.top < vh)) {
        lastTs = 0;
        return;
      }
      const dt = Math.min(0.05, Math.max(0, (ts - (lastTs || ts)) / 1000));
      lastTs = ts;
      const gx = Px - cr.left;
      const gy = Py - cr.top;
      const kr = 1 - Math.pow(1 - 0.35, dt * 60);
      const kd = 1 - Math.pow(1 - 0.22, dt * 60);
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) {
          const x = d / 2 + i * d,
            y = d / 2 + j * d;
          let t = 0;
          if (active) {
            const dx = x - gx,
              dy = y - gy,
              q = dx * dx + dy * dy;
            if (q < R2) {
              const u = 1 - Math.sqrt(q) / R;
              t = u * u * (3 - 2 * u);
            }
          }
          const k = j * cols + i;
          const v0 = b[k];
          const v1 = v0 + (t - v0) * (t > v0 ? kr : kd);
          b[k] = v1 < 0.003 ? 0 : v1;
        }
      draw();
    };

    const onMove = (e: PointerEvent) => {
      Px = e.clientX;
      Py = e.clientY;
      active = true;
    };
    const onLeave = () => {
      active = false;
    };

    if (!rm) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("blur", onLeave);
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();
    if (!rm) raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [canvasId, hostId]);
}
