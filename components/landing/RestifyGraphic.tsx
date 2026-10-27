"use client";

import { useEffect, useState } from "react";

const LABEL = "Restify — three breathing rings around a still centre";

function reducedMotion() {
  return !!(
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function RestifyGraphic() {
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
      id="restify-graphic"
      className={"restify-graphic" + (anim ? " is-anim" : "")}
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
      <g className="rf-rings">
        <circle
          className="rf-outer"
          cx="600"
          cy="450"
          r="282"
          fill="none"
          stroke="#91C9F7"
          strokeWidth="36"
        />
        <circle
          className="rf-mid"
          cx="600"
          cy="450"
          r="196"
          fill="none"
          stroke="#F4F1EA"
          strokeWidth="36"
        />
        <circle
          className="rf-inner"
          cx="600"
          cy="450"
          r="110"
          fill="none"
          stroke="#91C9F7"
          strokeWidth="36"
        />
      </g>
      <circle className="rf-dot" cx="600" cy="450" r="34" fill="#FF6A24" />
    </svg>
  );
}
