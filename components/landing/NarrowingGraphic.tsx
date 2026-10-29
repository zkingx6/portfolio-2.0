"use client";

import { useEffect, useState } from "react";

const LABEL =
  "The Narrowing — many raw inputs converge through a funnel into one precise output";

function reducedMotion() {
  return !!(
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function NarrowingGraphic() {
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
      id="narrowing-graphic"
      className={"narrowing-graphic" + (anim ? " is-anim" : "")}
      viewBox="0 0 1200 900"
      width="100%"
      height="auto"
      role="img"
      aria-label={LABEL}
      onMouseEnter={replay}
    >
      {/* Panel */}
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
      {/* 3 ice-blue input squares above funnel mouth (y=140, left edges: 466, 586, 706) */}
      <rect className="nd-sq nd-sq-0" x="466" y="140" width="28" height="28" fill="#91C9F7" rx="0" ry="0" />
      <rect className="nd-sq nd-sq-1" x="586" y="140" width="28" height="28" fill="#91C9F7" rx="0" ry="0" />
      <rect className="nd-sq nd-sq-2" x="706" y="140" width="28" height="28" fill="#91C9F7" rx="0" ry="0" />
      {/* Funnel — warm white trapezoid: top y=220 x300→900, bottom y=560 x540→660 */}
      <polygon
        className="nd-funnel"
        points="300,220 900,220 660,560 540,560"
        fill="#F4F1EA"
      />
      {/* Output — single orange 64×64 square, 40 px below funnel bottom */}
      <rect className="nd-out" x="568" y="600" width="64" height="64" fill="#FF6A24" rx="0" ry="0" />
    </svg>
  );
}
