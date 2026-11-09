/* 16:9 hero card that links out to an external, view-only case study
   (e.g. a Figma Make prototype). Opens in a new tab; never embedded. */

export type ExternalCase = {
  href: string;
  title: string;
  label: string;
  /** Full accessible name, including that it opens in a new tab. */
  ariaLabel: string;
  /** Project-specific hero design instead of the generic card. */
  design?: "bcg-landing" | "fennec-site";
};

export function ExternalPreview({ href, title, label, ariaLabel }: ExternalCase) {
  return (
    <a className="cs-ext" href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
      <span className="mono cs-ext-lbl">{label}</span>
      <span className="cs-ext-arr" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M3.5 12.5 L12.5 3.5 M5.5 3.5 H12.5 V10.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
      <span className="cs-ext-t">{title}</span>
    </a>
  );
}
