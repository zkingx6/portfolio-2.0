"use client";

import Image from "next/image";
import Link from "next/link";
import { LogoMark } from "@/components/nav/LogoMark";
import { EMAIL, MAILTO } from "@/lib/content";

type Props = {
  logoSweep: boolean;
  onLogoHover: () => void;
  backToPortfolio?: boolean;
  showCanvas?: boolean;
};

export function SiteFooter({
  logoSweep,
  onLogoHover,
  backToPortfolio = false,
  showCanvas = false,
}: Props) {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--c-bg)",
        borderTop: "1px solid rgba(var(--c-fg-rgb), .14)",
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
            className="ft-portrait"
            style={{
              position: "relative",
              overflow: "hidden",
              margin: 0,
              width: 176,
              height: 220,
              boxSizing: "border-box",
              border: "1px solid rgba(var(--c-fg-rgb), .12)",
              borderRadius: 0,
              // subtle signature-orange glow rising from the floor
              background:
                "linear-gradient(to top, rgba(255,106,36,.16) 0%, rgba(255,106,36,.05) 55%, rgba(255,106,36,0) 100%) no-repeat, var(--c-surface)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 2,
              flex: "none",
            }}
          >
            {/* ambient stream: code · UI · type, right → left, behind the sprite */}
            <div className="ft-pf" aria-hidden>
              <span className="ft-pe mono" style={{ "--y": "10px", "--x": "18px", "--d": "10s", "--o": "-2s", color: "var(--c-fg)" } as React.CSSProperties}>&lt;/&gt;</span>
              <span className="ft-pe" style={{ "--y": "26px", "--x": "112px", "--d": "13s", "--o": "-8s", color: "#91C9F7" } as React.CSSProperties}>
                <svg width="22" height="16" viewBox="0 0 22 16"><rect x=".5" y=".5" width="21" height="15" /><line x1="3" y1="4.5" x2="12" y2="4.5" /><line x1="3" y1="8.5" x2="18" y2="8.5" /><rect x="3.5" y="11" width="6" height="2.5" /></svg>
              </span>
              <span className="ft-pe mono" style={{ "--y": "118px", "--x": "8px", "--d": "12s", "--o": "-5s", color: "#91C9F7" } as React.CSSProperties}>{"{ }"}</span>
              <span className="ft-pe ft-type" style={{ "--y": "132px", "--x": "136px", "--d": "15s", "--o": "-11s", color: "var(--c-fg)" } as React.CSSProperties}>Aa</span>
              <span className="ft-pe" style={{ "--y": "150px", "--x": "60px", "--d": "11s", "--o": "-4s", color: "var(--c-fg)" } as React.CSSProperties}>
                <svg width="10" height="14" viewBox="0 0 10 14"><path d="M.5 .5 L.5 11 L3.5 8.5 L5.5 13 L7 12.3 L5 8 L9 8 Z" /></svg>
              </span>
              <span className="ft-pe" style={{ "--y": "168px", "--x": "128px", "--d": "14s", "--o": "-11s", color: "#FF6A24" } as React.CSSProperties}>
                <svg width="20" height="14" viewBox="0 0 20 14"><rect x="2.5" y="2.5" width="15" height="9" /><rect className="h" x="1" y="1" width="3" height="3" /><rect className="h" x="16" y="1" width="3" height="3" /><rect className="h" x="1" y="10" width="3" height="3" /><rect className="h" x="16" y="10" width="3" height="3" /></svg>
              </span>
              <span className="ft-pe ft-type ft-base" style={{ "--y": "186px", "--x": "16px", "--d": "12s", "--o": "-7s", color: "var(--c-fg)" } as React.CSSProperties}>Ag</span>
              <span className="ft-pe mono" style={{ "--y": "200px", "--x": "104px", "--d": "11s", "--o": "-2s", color: "#91C9F7" } as React.CSSProperties}>=&gt;</span>
            </div>
            {/* pixel sprite at 2.5× (29×69 → 72.5×172.5) — 5 device px per art px on retina; leaves headroom */}
            <Image
              src="/about/ronger-sprite.png"
              alt="Pixel-art portrait of Ronger"
              width={73}
              height={173}
              unoptimized
              draggable={false}
              style={{ position: "relative", zIndex: 1, display: "block", width: 72.5, height: 172.5, imageRendering: "pixelated" }}
            />
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
            borderTop: "1px solid var(--c-charcoal)",
            color: "var(--c-muted)",
          }}
        >
          <span>
            <span
              className="mono"
              style={{ display: "block", marginBottom: 10, color: "#FF6A24" }}
            >
              Open to roles in Product, UX/UI, and AI workflows.
            </span>
            <a href={MAILTO} className="ft-link" style={{ textTransform: "none" }}>
              {EMAIL}
            </a>
            <span
              className="mono"
              style={{
                display: "block",
                marginTop: 6,
                color: "rgba(var(--c-fg-rgb), .5)",
              }}
            >
              Fastest way to reach me.
            </span>
          </span>
          <a
            href="https://www.linkedin.com/in/ronger-xu/"
            target="_blank"
            rel="noopener noreferrer"
            className="ft-link"
          >
            [LinkedIn]
          </a>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span>© 2026 Ronger Xu</span>
            <LogoMark
              className={"dm lo" + (logoSweep ? " sw2" : "")}
              size={{ ds: "1.4px", gp: "1.1px" }}
              onHover={onLogoHover}
            />
          </span>
          {backToPortfolio && (
            <Link href="/" style={{ color: "var(--c-fg)", textDecoration: "none" }}>
              Back to portfolio →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
