"use client";

import { useEffect, useState, type CSSProperties } from "react";

const LABEL =
  "BCG — research scattered left, resolving into one focused concept";

type Sq = {
  x: number;
  y: number;
  s: number;
  fill: string;
  col: number;
  dx: number;
  dy: number;
  orange?: boolean;
};

const SQUARES: Sq[] = [
  { x: 155, y: 307, s: 64, fill: "#91C9F7", col: 0, dx: -12, dy: -10 },
  { x: 180, y: 422, s: 60, fill: "#F4F1EA", col: 0, dx: 11, dy: 4 },
  { x: 129, y: 552, s: 86, fill: "#91C9F7", col: 0, dx: -14, dy: 8 },
  { x: 328, y: 288, s: 70, fill: "#91C9F7", col: 1, dx: -8, dy: -9 },
  { x: 321, y: 413, s: 81, fill: "#F4F1EA", col: 1, dx: 7, dy: 3 },
  { x: 324, y: 542, s: 68, fill: "#91C9F7", col: 1, dx: -6, dy: 8 },
  { x: 487, y: 289, s: 76, fill: "#91C9F7", col: 2, dx: -5, dy: -4 },
  { x: 477, y: 417, s: 76, fill: "#F4F1EA", col: 2, dx: 4, dy: 2 },
  { x: 479, y: 536, s: 76, fill: "#91C9F7", col: 2, dx: -3, dy: 5 },
  { x: 642, y: 292, s: 76, fill: "#91C9F7", col: 3, dx: -2, dy: -3 },
  { x: 642, y: 412, s: 76, fill: "#91C9F7", col: 3, dx: 0, dy: 2 },
  { x: 642, y: 532, s: 76, fill: "#91C9F7", col: 3, dx: 2, dy: 3 },
  { x: 798, y: 343, s: 64, fill: "#F4F1EA", col: 4, dx: 0, dy: -15 },
  { x: 798, y: 418, s: 64, fill: "#F4F1EA", col: 4, dx: 0, dy: 0 },
  { x: 798, y: 493, s: 64, fill: "#F4F1EA", col: 4, dx: 0, dy: 15 },
  {
    x: 915,
    y: 355,
    s: 190,
    fill: "#FF6A24",
    col: 5,
    dx: 0,
    dy: 0,
    orange: true,
  },
];

function reducedMotion() {
  return !!(
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function BcgGraphic() {
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
      id="bcg-graphic"
      className={"bcg-graphic" + (anim ? " is-anim" : "")}
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
      {SQUARES.map((sq) => (
        <rect
          key={`${sq.x}-${sq.y}`}
          className={
            "bc-sq bc-col-" + sq.col + (sq.orange ? " bc-orange" : "")
          }
          x={sq.x}
          y={sq.y}
          width={sq.s}
          height={sq.s}
          fill={sq.fill}
          rx="0"
          ry="0"
          style={
            {
              "--dx": `${sq.dx}px`,
              "--dy": `${sq.dy}px`,
            } as CSSProperties
          }
        />
      ))}
    </svg>
  );
}
