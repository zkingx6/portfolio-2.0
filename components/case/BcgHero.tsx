/* BCG × Forage hero — a code recreation of the Figma Make landing page
   (not a screenshot), so "View Case Study" stays a real link.
   Sized in container units (cqw) so it scales like the original. */

export function BcgHero({ href }: { href: string }) {
  return (
    <div className="bcgh-wrap">
      <div className="bcgh">
        <div className="bcgh-tags mono">
          <span className="bcgh-badge">BCG X</span>
          <span className="bcgh-meta">Job Simulation · Forage · Sep 2024</span>
        </div>
        <span className="bcgh-rule" aria-hidden />
        <p className="bcgh-title">
          <span>Strategic &amp;</span>
          <span>Experience Design</span>
        </p>
        <p className="bcgh-sub">
          Designing a consumer banking experience through research, behavioral insights, and human-centered strategy.
        </p>
        <dl className="bcgh-info">
          <div>
            <dt className="mono">Platform</dt>
            <dd>Forage × BCG X</dd>
          </div>
          <div>
            <dt className="mono">Role</dt>
            <dd>Strategic &amp; Experience Designer</dd>
          </div>
          <div>
            <dt className="mono">Focus</dt>
            <dd>UX Research · Persona Development · Concept Design</dd>
          </div>
        </dl>
        <a
          className="bcgh-btn mono"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View the BCG × Forage case study (opens in a new tab)"
        >
          View Case Study <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
