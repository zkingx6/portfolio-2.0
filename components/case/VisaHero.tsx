import { DM_Mono, DM_Serif_Display, Inter } from "next/font/google";

/* Visa Financial Insights hero — code recreation of the Figma Sites landing
   page (not a screenshot or iframe), so "View Case Study" is a real link.
   Fonts and colors come from the live site's CSS: DM Serif Display, Inter,
   DM Mono · navy #0B1220, card #131E30, border #1A2840, gold #C9A84C,
   cream #F5F0E8. Sized in container units (1cqw ≈ 1% of the hero width). */

const serif = DM_Serif_Display({ weight: "400", subsets: ["latin"], display: "swap", preload: false, variable: "--vsh-serif" });
const mono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], display: "swap", preload: false, variable: "--vsh-mono" });
const sans = Inter({ weight: ["400"], subsets: ["latin"], display: "swap", preload: false, variable: "--vsh-sans" });

export function VisaHero({ href }: { href: string }) {
  return (
    <div className="vsh-wrap">
      <div className={`vsh ${serif.variable} ${mono.variable} ${sans.variable}`}>
        <span className="vsh-water" aria-hidden>FINANCE</span>

        <div className="vsh-top" aria-hidden>
          <span className="vsh-brand"><i />Portfolio case study</span>
          <span className="vsh-meta">
            Information Design · FY2025
            <span className="vsh-sun">
              <svg viewBox="0 0 16 16" width="10" height="10">
                <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
          </span>
        </div>

        <div className="vsh-left">
          <div className="vsh-tags">
            <span className="vsh-badge">Information design</span>
            <span className="vsh-tagtxt">Financial Data Visualization</span>
          </div>
          <p className="vsh-title">
            <span>Visa Financial</span>
            <span className="g">Insights</span>
          </p>
          <span className="vsh-rule" aria-hidden />
          <p className="vsh-sub">Transforming complex financial reporting into clear, executive-ready visual communication.</p>
          <div className="vsh-chart" aria-hidden>
            <span className="vsh-chart-lbl">
              Net Revenue Trend — FY2018-2025 <b>↑ $40B</b>
            </span>
            <svg viewBox="0 0 811 56" preserveAspectRatio="none">
              <defs>
                <linearGradient id="vshFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#C9A84C" stopOpacity=".14" />
                  <stop offset="1" stopColor="#C9A84C" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 24 C 200 20, 420 15, 600 11 S 760 7, 811 0 L811 56 L0 56 Z" fill="url(#vshFill)" />
              <path d="M0 24 C 200 20, 420 15, 600 11 S 760 7, 811 0" fill="none" stroke="#C9A84C" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="vsh-cta-row">
            <a className="vsh-btn" href={href} target="_blank" rel="noopener noreferrer" aria-label="View the Visa Financial Insights case study (opens in a new tab)">
              View case study <span aria-hidden>→</span>
            </a>
            <span className="vsh-note">
              <span>Self-initiated concept · Independent</span>
              <span className="d">Not affiliated with or commissioned by Visa</span>
            </span>
          </div>
        </div>

        <div className="vsh-right">
          <div className="vsh-card wide">
            <i className="vsh-dash" aria-hidden />
            <b className="vsh-v gold">$40B</b>
            <span className="vsh-k">Net Revenue</span>
            <span className="vsh-s">FY2025 — Visa Annual Report</span>
          </div>
          <div className="vsh-row r2">
          <div className="vsh-card">
            <b className="vsh-v">+11%</b>
            <span className="vsh-k">Revenue Growth</span>
            <span className="vsh-s">Year over year</span>
          </div>
          <div className="vsh-card">
            <b className="vsh-v">$17T</b>
            <span className="vsh-k">Payment Volume</span>
            <span className="vsh-s">Total network · FY2025</span>
          </div>
          </div>
          <div className="vsh-row r3">
          <div className="vsh-card tall">
            <b className="vsh-v">329B</b>
            <span className="vsh-k">Transactions Processed</span>
            <span className="vsh-s">Visa-branded · FY2025</span>
          </div>
          <div className="vsh-card sectors" aria-hidden>
            <span className="vsh-sec-t">Sectors</span>
            <span className="vsh-sec-grid">
              <span><i>◆</i>Revenue</span>
              <span><i>⬡</i>Network</span>
              <span><i>◈</i>Global</span>
              <span><i>△</i>Services</span>
            </span>
          </div>
          </div>
          <span className="vsh-source">Source: Visa FY2025 Annual Report (publicly available)</span>
        </div>

        <div className="vsh-foot" aria-hidden>
          <span className="vsh-ftags">
            <span>Information Architecture</span>
            <span>Financial Data Visualization</span>
            <span>Editorial Design</span>
            <span>Accessibility</span>
          </span>
          <span className="vsh-year">2025</span>
        </div>
      </div>
    </div>
  );
}
