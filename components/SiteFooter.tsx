"use client";

import { LogoMark } from "@/components/nav/LogoMark";
import { EMAIL, MAILTO } from "@/lib/content";

type Props = {
  logoSweep: boolean;
  onLogoHover: () => void;
  showCanvas?: boolean;
};

export function SiteFooter({
  logoSweep,
  onLogoHover,
  showCanvas = false,
}: Props) {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#101010",
        borderTop: "1px solid rgba(244,241,234,.14)",
        padding: "48px calc(var(--fm) + 1px + var(--edgev)) 40px",
      }}
    >
      {showCanvas && (
        <canvas
          id="dotfield2"
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px 48px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(40px,6.4vw,96px)",
              lineHeight: 0.92,
              letterSpacing: "-.05em",
              fontWeight: 800,
              whiteSpace: "nowrap",
            }}
          >
            Let&apos;s make it <span style={{ color: "#FF6A24" }}>work</span>
            <br />
            for people.
          </h2>
          <figure
            id="portrait"
            style={{
              margin: 0,
              width: 176,
              height: 220,
              boxSizing: "border-box",
              border: "1px solid rgba(244,241,234,.12)",
              borderRadius: 0,
              background: "#1C1C1C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "none",
            }}
          >
            <span className="mono" style={{ color: "#A8A59E", fontSize: 11 }}>
              [ Portrait ]
            </span>
          </figure>
        </div>
        <div
          className="mono"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "16px 32px",
            marginTop: 48,
            paddingTop: 28,
            borderTop: "1px solid #242424",
            color: "#A8A59E",
          }}
        >
          <span>
            <span
              className="mono"
              style={{ display: "block", marginBottom: 10, color: "#FF6A24" }}
            >
              Open to roles in Product, UX/UI, and AI workflows.
            </span>
            <a href={MAILTO} style={{ color: "inherit", textTransform: "none" }}>
              {EMAIL}
            </a>
            <span
              className="mono"
              style={{
                display: "block",
                marginTop: 6,
                color: "rgba(244,241,234,.5)",
              }}
            >
              Fastest way to reach me.
            </span>
          </span>
          <span>[LINKEDIN] · [GITHUB]</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span>© 2026 Ronger Xu</span>
            <LogoMark
              className={"dm lo" + (logoSweep ? " sw2" : "")}
              size={{ ds: "1.4px", gp: "1.1px" }}
              onHover={onLogoHover}
            />
          </span>

        </div>
      </div>
    </section>
  );
}
