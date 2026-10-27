"use client";

import { useEffect, useState } from "react";

const LABEL =
  "Parallel — the inconvenient meeting time rotates between teammates across three cycles";

type Bar = {
  x: number;
  w: number;
  fill: string;
  orange?: boolean;
};

const ROWS: { y: number; markY: number; bars: Bar[] }[] = [
  {
    y: 225,
    markY: 218,
    bars: [
      { x: 180, w: 320, fill: "#F4F1EA" },
      { x: 548, w: 216, fill: "#91C9F7" },
      { x: 812, w: 212, fill: "#FF6A24", orange: true },
    ],
  },
  {
    y: 450,
    markY: 443,
    bars: [
      { x: 180, w: 232, fill: "#F4F1EA" },
      { x: 472, w: 252, fill: "#FF6A24", orange: true },
      { x: 788, w: 232, fill: "#91C9F7" },
    ],
  },
  {
    y: 675,
    markY: 668,
    bars: [
      { x: 180, w: 244, fill: "#FF6A24", orange: true },
      { x: 484, w: 224, fill: "#91C9F7" },
      { x: 772, w: 256, fill: "#F4F1EA" },
    ],
  },
];

function reducedMotion() {
  return !!(
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function ParallelGraphic() {
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (reducedMotion()) return;
    const id = requestAnimationFrame(() => setAnim(true));
    return () => cancelAnimationFrame(id);
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
      id="parallel-graphic"
      className={"parallel-graphic" + (anim ? " is-anim" : "")}
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
        className="pg-spine"
        x1="600"
        y1="108"
        x2="600"
        y2="792"
        stroke="#78746E"
        strokeWidth="3"
      />
      {ROWS.map((row, r) => (
        <g key={row.y} className={`pg-row pg-row-${r}`}>
          <line
            className="pg-hair"
            x1="96"
            y1={row.y}
            x2="1104"
            y2={row.y}
            stroke="#3A3A3A"
            strokeWidth="2"
          />
          {row.bars.map((bar) => {
            const side = bar.x + bar.w / 2 < 600 ? "left" : "right";
            return (
              <rect
                key={`${row.y}-${bar.x}`}
                className={
                  "pg-bar pg-bar-" + side + (bar.orange ? " pg-orange" : "")
                }
                x={bar.x}
                y={row.y - 22}
                width={bar.w}
                height="44"
                rx="0"
                ry="0"
                fill={bar.fill}
              />
            );
          })}
          <rect
            className="pg-mark"
            x="593"
            y={row.markY}
            width="14"
            height="14"
            rx="0"
            ry="0"
            fill="#F4F1EA"
          />
        </g>
      ))}
    </svg>
  );
}
