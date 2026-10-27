"use client";

import { useEffect, useState, type CSSProperties } from "react";

const LABEL = "EcoViz — a bloom of particles: dense at the heart, dispersing outward";
const CX = 600;
const CY = 450;

const RINGS = [
  { radius: 64, count: 8, diameter: 26, offset: 0 },
  { radius: 122, count: 12, diameter: 21, offset: 0.35 },
  { radius: 190, count: 16, diameter: 16, offset: 0.7 },
  { radius: 268, count: 20, diameter: 12, offset: 1.05 },
  { radius: 356, count: 24, diameter: 8, offset: 1.4 },
];

const PARTICLES = RINGS.flatMap((ring, ringIndex) =>
  Array.from({ length: ring.count }, (_, k) => {
    const theta = ring.offset + (k * 2 * Math.PI) / ring.count;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const r = ring.diameter / 2;
    return {
      ring: ringIndex,
      cx: CX + ring.radius * cos,
      cy: CY + ring.radius * sin,
      r,
      dx: -0.08 * ring.radius * cos,
      dy: -0.08 * ring.radius * sin,
    };
  }),
);

function reducedMotion() {
  return !!(
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function EcoVizGraphic() {
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (reducedMotion()) return;
    setAnim(true);
  }, []);

  const replay = () => {
    if (reducedMotion()) return;
    setAnim(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnim(true));
    });
  };

  return (
    <svg
      id="ecoviz-graphic"
      className={"ecoviz-graphic" + (anim ? " is-anim" : "")}
      viewBox="0 0 1200 900"
      width="100%"
      height="auto"
      role="img"
      aria-label={LABEL}
      onMouseEnter={replay}
    >
      <rect
        x="1"
        y="1"
        width="1198"
        height="898"
        fill="#1C1C1C"
        stroke="#3F3D3A"
        strokeWidth="2"
        rx="0"
        ry="0"
      />
      {PARTICLES.map((p, i) => (
        <circle
          key={i}
          className={`ev-p ev-r${p.ring}`}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill="#91C9F7"
          style={{ "--dx": `${p.dx}px`, "--dy": `${p.dy}px` } as CSSProperties}
        />
      ))}
      <circle className="ev-heart" cx="600" cy="450" r="30" fill="#FF6A24" />
    </svg>
  );
}
