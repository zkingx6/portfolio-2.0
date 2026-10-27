"use client";

import { useEffect, useState } from "react";

const LABEL =
  "Fennec — a geometric fox head built from solid facets, split light and shade";

const FACETS: { points: string; fill: string; kind: "ear" | "face" }[] = [
  { points: "395,150 320,450 520,400", fill: "#F4F1EA", kind: "ear" },
  { points: "400,205 360,425 490,398", fill: "#91C9F7", kind: "ear" },
  { points: "805,150 880,450 680,400", fill: "#91C9F7", kind: "ear" },
  { points: "800,205 840,425 710,398", fill: "#F4F1EA", kind: "ear" },
  { points: "520,400 600,470 600,600", fill: "#F4F1EA", kind: "face" },
  { points: "680,400 600,470 600,600", fill: "#91C9F7", kind: "face" },
  { points: "320,450 400,560 600,600 520,400", fill: "#F4F1EA", kind: "face" },
  { points: "880,450 800,560 600,600 680,400", fill: "#91C9F7", kind: "face" },
  { points: "400,560 600,810 600,600", fill: "#F4F1EA", kind: "face" },
  { points: "800,560 600,810 600,600", fill: "#91C9F7", kind: "face" },
];

function reducedMotion() {
  return !!(
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function FennecGraphic() {
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
      id="fennec-graphic"
      className={"fennec-graphic" + (anim ? " is-anim" : "")}
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
      {FACETS.map((f) => (
        <polygon
          key={f.points}
          className={"fn-facet fn-" + f.kind}
          points={f.points}
          fill={f.fill}
        />
      ))}
      <polygon
        className="fn-nose"
        points="558,742 642,742 600,810"
        fill="#FF6A24"
      />
      <rect className="fn-eye" x="478" y="556" width="22" height="22" fill="#1C1C1C" />
      <rect className="fn-eye" x="700" y="556" width="22" height="22" fill="#1C1C1C" />
    </svg>
  );
}
