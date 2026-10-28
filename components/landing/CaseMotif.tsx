import type { CSSProperties } from "react";
import { LogoMark } from "@/components/nav/LogoMark";

export function CaseMotif({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg className="mt" viewBox="0 0 100 32" preserveAspectRatio="none">
        <g className="m1g" fill="none" stroke="#FF6A24" strokeWidth="1">
          <path className="m1pr" d="M1 4H99V28H1V4" />
          <path className="m1pv1" d="M34 4V28" />
          <path className="m1pv2" d="M67 4V28" />
          <path className="m1ph" d="M1 14H99" />
        </g>
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg className="mt" viewBox="0 0 100 32" preserveAspectRatio="none">
        <path d="M1 30H99" fill="none" stroke="#3a3a3a" strokeWidth="1" />
        <path
          className="dw"
          d="M2 26L20 18L38 22L56 8L76 14L98 4"
          fill="none"
          stroke="#91C9F7"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M20 18h0M38 22h0M56 8h0M76 14h0M98 4h0"
          fill="none"
          stroke="#91C9F7"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          gap: 6,
          font: "13px var(--font-jetbrains-mono), monospace",
          color: "#F4F1EA",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <span style={{ color: "#FF6A24" }}>&lt;/&gt;</span>
        <span>ship();</span>
        <span className="cur2" />
      </span>
    );
  }
  if (index === 3) {
    return (
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          className="m3t"
          style={{
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: "-.06em",
            lineHeight: 1,
            color: "#F4F1EA",
          }}
        >
          Aa
        </span>
        <span style={{ flex: 1, height: "100%", position: "relative" }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="m3l"
              style={{ "--li": i } as CSSProperties}
            />
          ))}
        </span>
      </span>
    );
  }
  return (
    <>
      <svg className="mt" viewBox="0 0 100 32" preserveAspectRatio="none">
        <path
          d="M2 29H72"
          fill="none"
          stroke="#91C9F7"
          strokeWidth="1"
          strokeDasharray="1 5"
          opacity=".6"
        />
        <path
          className="dw"
          d="M2 24C10 8 20 30 28 14C34 4 42 26 50 16C56 8 62 22 68 12"
          fill="none"
          stroke="#FF6A24"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          marginTop: -10,
        }}
      >
        <LogoMark className="dm st lo" size={{ ds: "2px", gp: "1.6px" }} />
      </span>
    </>
  );
}
