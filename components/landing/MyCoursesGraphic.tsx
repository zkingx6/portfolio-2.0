"use client";

import { useEffect, useState } from "react";

const LABEL =
  "RIT myCourses redesign — tasks growing along one straight path, each one landing, then done";

const SQUARES = [
  { x: 218, y: 428, s: 44, fill: "#F4F1EA" },
  { x: 386, y: 406, s: 88, fill: "#F4F1EA" },
  { x: 594, y: 384, s: 132, fill: "#91C9F7" },
  { x: 842, y: 362, s: 176, fill: "#FF6A24", last: true },
];

function reducedMotion() {
  return !!(
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function MyCoursesGraphic() {
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
      id="mycourses-graphic"
      className={"mycourses-graphic" + (anim ? " is-anim" : "")}
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
        className="mc-path"
        x1="120"
        y1="450"
        x2="1080"
        y2="450"
        stroke="#91C9F7"
        strokeWidth="3"
        pathLength="960"
      />
      {SQUARES.map((sq, i) => (
        <rect
          key={sq.x}
          className={"mc-sq mc-sq-" + i + (sq.last ? " mc-last" : "")}
          x={sq.x}
          y={sq.y}
          width={sq.s}
          height={sq.s}
          fill={sq.fill}
          rx="0"
          ry="0"
        />
      ))}
      <rect
        className="mc-ripple"
        x="842"
        y="362"
        width="176"
        height="176"
        fill="none"
        stroke="#FF6A24"
        strokeWidth="3"
        rx="0"
        ry="0"
      />
    </svg>
  );
}
