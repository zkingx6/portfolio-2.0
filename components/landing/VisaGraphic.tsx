"use client";

import { useEffect, useState } from "react";

const LABEL =
  "Visa Financial Insights — revenue rising in solid steps, with the story line drawn over the top";

const COLS = [
  { x: 180, y: 620, h: 70, fill: "#F4F1EA" },
  { x: 335, y: 560, h: 130, fill: "#F4F1EA" },
  { x: 490, y: 480, h: 210, fill: "#F4F1EA" },
  { x: 645, y: 370, h: 320, fill: "#F4F1EA" },
  { x: 800, y: 230, h: 460, fill: "#FF6A24", orange: true },
];

const POINTS = [
  { x: 228, y: 613 },
  { x: 383, y: 553 },
  { x: 538, y: 473 },
  { x: 693, y: 363 },
  { x: 848, y: 223 },
];

function reducedMotion() {
  return !!(
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function VisaGraphic() {
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
      id="visa-graphic"
      className={"visa-graphic" + (anim ? " is-anim" : "")}
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
      <line
        x1="140"
        y1="690"
        x2="1060"
        y2="690"
        stroke="#F4F1EA"
        strokeWidth="3"
      />
      {COLS.map((c, i) => (
        <rect
          key={c.x}
          className={"vs-col vs-col-" + i + (c.orange ? " vs-orange" : "")}
          x={c.x}
          y={c.y}
          width="110"
          height={c.h}
          fill={c.fill}
          rx="0"
          ry="0"
        />
      ))}
      <polyline
        className="vs-line"
        points="235,620 390,560 545,480 700,370 855,230"
        fill="none"
        stroke="#91C9F7"
        strokeWidth="3"
        pathLength="740"
      />
      {POINTS.map((p, i) => (
        <rect
          key={p.x}
          className={"vs-pt vs-pt-" + i}
          x={p.x}
          y={p.y}
          width="14"
          height="14"
          fill="#F4F1EA"
          rx="0"
          ry="0"
        />
      ))}
    </svg>
  );
}
