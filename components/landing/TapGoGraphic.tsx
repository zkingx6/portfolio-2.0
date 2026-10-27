"use client";

import { useEffect, useState } from "react";

const LABEL = "TapGo — one large, clear tap target with space around it";

function reducedMotion() {
  return !!(
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function TapGoGraphic() {
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
      id="tapgo-graphic"
      className={"tapgo-graphic" + (anim ? " is-anim" : "")}
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
      <rect
        className="tg-frame"
        x="410"
        y="260"
        width="380"
        height="380"
        fill="none"
        stroke="#91C9F7"
        strokeWidth="3"
        rx="0"
        ry="0"
        pathLength="1520"
      />
      <rect
        className="tg-target"
        x="450"
        y="300"
        width="300"
        height="300"
        fill="#F4F1EA"
        rx="0"
        ry="0"
      />
      <rect
        className="tg-tap"
        x="572"
        y="422"
        width="56"
        height="56"
        fill="#FF6A24"
        rx="0"
        ry="0"
      />
      <rect
        className="tg-ripple"
        x="572"
        y="422"
        width="56"
        height="56"
        fill="none"
        stroke="#FF6A24"
        strokeWidth="3"
        rx="0"
        ry="0"
      />
    </svg>
  );
}
