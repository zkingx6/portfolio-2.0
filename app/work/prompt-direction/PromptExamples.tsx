"use client";
import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
import "./prompt-examples.css";

/* ─────────────────────────────────────────────
   PROMPT DIRECTION — scroll-stacked examples
   Three blocks, stacked vertically.
   Same demo task across all three (fair fight).
   Animation: IntersectionObserver one-shot fade+rise per block.
   No autoplay anywhere.
───────────────────────────────────────────── */

// ── Types ─────────────────────────────────────────────────────────────────────

type DirectionLine =
  | { tag: string; text: string }
  | { text: string }
  | { spacer: true };

type MockType =
  | "hype"
  | "calm"
  | "premium"
  | "constrained"
  | "killed"
  | "revised";

type MockSpec = {
  type: MockType;
  headline: string;
  sub: string;
  cta: string;
  label?: string;
  killed?: boolean;
};

type Example = {
  n: string;
  name: string;
  desc: string;
  skill: string;
  cost: string;
  footnote: string;
  // [DRAFT] refNote / refUrl — Anthropic reference per example
  refNote: string;
  refUrl: string;
  mistake: { text: string; tag: string };
  direction: DirectionLine[];
  before: MockSpec;
  after: MockSpec;
};

// ── Accent colors — one per example (user-directed scoped exception) ───────────
// 01 → signature orange · 02 → ice blue · 03 → warm grey
const ACCENTS = ["#FF6A24", "#91C9F7", "var(--c-muted)"];

// ── Data — all copy editable here ─────────────────────────────────────────────

// Shared task — identical across all three blocks (fair fight)
const TASK = "Design a landing page hero for a fintech app.";

const EXAMPLES: Example[] = [
  {
    n: "01",
    name: "NO AUDIENCE",
    desc: "Prompting without a who.",
    skill: "Define the who before the what.",
    cost: "No who \u2192 the AI designs for everyone. Designing for everyone is designing for no one.",
    footnote: "PRINCIPLE 02 \u2014 REFRAME BEFORE SOLVING.",
    // [DRAFT] REF 01
    refNote: "REF \u2014 ANTHROPIC \u00b7 THE PROMPTING PLAYBOOK: define the role before the task, or the model guesses the who.",
    refUrl: "https://youtu.be/G2B0YWuJUgI",
    mistake: {
      text: "Make me a landing page hero for a fintech app.",
      tag: "VAGUE",
    },
    direction: [
      { text: "Design a landing page hero for a fintech app." },
      { tag: "+ AUDIENCE", text: "First-time investors who find finance intimidating." },
      { tag: "+ TONE",     text: "Calm, reassuring \u2014 never salesy." },
      { tag: "+ VOICE",    text: "Speak to their fear, not their greed." },
    ],
    before: {
      type: "hype",
      headline: "Welcome to the Future of Finance.",
      sub: "Invest smarter, grow faster.",
      cta: "Sign Up Now",
    },
    after: {
      type: "calm",
      headline: "Finance should feel less like fear.",
      sub: "Start with what you have. Learn as you grow.",
      cta: "Begin",
    },
  },
  {
    n: "02",
    name: "NO CONSTRAINTS",
    desc: "Prompting without taste.",
    skill: "Constrain with taste. Vague taste gets vague output.",
    cost: "\u2018Make it pretty\u2019 \u2192 the model reaches for the average of everything it has seen. The average is the slop.",
    footnote: "PRINCIPLE 01 \u2014 DIRECT THE TOOLS, KEEP THE TASTE.",
    // [DRAFT] REF 02
    refNote: "REF \u2014 ANTHROPIC \u00b7 THE PROMPTING PLAYBOOK: constraints are the brief. An output contract beats a paragraph of adjectives.",
    refUrl: "https://youtu.be/G2B0YWuJUgI",
    mistake: {
      text: "Make it look nicer. More modern. More premium.",
      tag: "VAGUE",
    },
    direction: [
      { tag: "+ CONSTRAINT", text: "Dark #0A0A0A. Typography-led. One accent color max." },
      { tag: "+ TASTE",      text: "No stock photos, no gradients, no generic fintech blue." },
      { tag: "+ REFERENCE",  text: "Reference: Linear\u2019s restraint \u2014 not Stripe\u2019s gloss." },
    ],
    before: {
      type: "premium",
      headline: "Premium Finance, Reimagined.",
      sub: "The most advanced platform for modern investors.",
      cta: "Get Started",
    },
    after: {
      type: "constrained",
      headline: "Invest with intention.",
      sub: "No noise. No hype. Just clarity.",
      cta: "Open account",
    },
  },
  {
    n: "03",
    name: "NO ITERATION",
    desc: "Shipping the first pass.",
    skill: "Kill the first pass. The first output is a draft, not a deliverable.",
    cost: "The first pass is the model\u2019s habit, not your answer. Shipping it is letting the tool direct you.",
    footnote: "PRINCIPLE 04 \u2014 BUILD TO LEARN. BELIEVE WHAT YOU LEARN.",
    // [DRAFT] REF 03
    refNote: "REF \u2014 ANTHROPIC \u00b7 THE PROMPTING PLAYBOOK: generate, evaluate, repair. The first pass is never the answer.",
    refUrl: "https://youtu.be/G2B0YWuJUgI",
    mistake: {
      text: "No second prompt. The first output ships as final \u2014 no critique, no revision.",
      tag: "NO REVISION",
    },
    direction: [
      { tag: "+ KILL RULE", text: "If the first pass looks like a template, kill it." },
      { tag: "+ CRITIQUE", text: "Brief me on what you\u2019d change before rendering again." },
      { spacer: true },
      { tag: "+ REVISION", text: "Revision: Kill the gradient. Lead with the headline. One CTA." },
    ],
    before: {
      type: "killed",
      headline: "Grow Your Wealth Today.",
      sub: "Smart investing for everyone.",
      cta: "Start Free",
      label: "PASS 01",
      killed: true,
    },
    after: {
      type: "revised",
      headline: "Less noise. More ownership.",
      sub: "Designed for the investor who already knows what they want.",
      cta: "Begin",
      label: "PASS 02",
    },
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function PromptExamples() {
  const blockRefs = useRef<(HTMLElement | null)[]>(EXAMPLES.map(() => null));

  useEffect(() => {
    const blocks = blockRefs.current.filter(Boolean) as HTMLElement[];
    if (!blocks.length) return;

    // Reduced-motion: reveal everything immediately, no observer needed
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      blocks.forEach((el) => el.classList.add("pe-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pe-in");
            io.unobserve(entry.target); // one-shot
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" },
    );

    blocks.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pe-wrap">
      {/* Honesty label + shared task */}
      <div className="pe-honest-row">
        <span className="mono pe-honest">SCRIPTED DEMO</span>
        <span className="mono pe-task-lbl">Task — {TASK}</span>
      </div>

      {/* Frame line */}
      <p className="mono" style={{ fontSize: "13px", color: "var(--c-fg)", margin: "0 0 32px", lineHeight: 1.5 }}>
        Same model. Same task. Different director — different product.
      </p>

      {EXAMPLES.map((ex, i) => {
        const setRef = (el: HTMLElement | null) => {
          blockRefs.current[i] = el;
        };
        return (
          <MistakeWindow
            key={ex.n}
            ex={ex}
            setRef={setRef}
            accent={ACCENTS[i]}
          />
        );
      })}
    </div>
  );
}

// ── MistakeWindow — visual-first panel, same layout for all three examples ─────
// Order: chrome → THE SKILL headline + THE MISTAKE subtitle → BEFORE/AFTER
// showcase → THE MISTAKE / THE DIRECTION prompts → THE COST → PRINCIPLE / REF.

function MistakeWindow({
  ex,
  setRef,
  accent,
}: {
  ex: Example;
  setRef: (el: HTMLElement | null) => void;
  accent: string;
}) {
  return (
    <article ref={setRef} className="pe-block">
      <div
        className="pe-win pe-win--vf"
        style={{ "--pe-accent": accent } as CSSProperties}
      >

        {/* ── Window chrome bar ── */}
        <div className="pe-wh">
          <span className="pe-wd" aria-hidden />
          <span className="pe-wd" aria-hidden />
          <span className="pe-wd pe-wd-o" aria-hidden />
          <span className="mono pe-wt">
            MISTAKE.<span style={{ color: accent }}>{ex.n}</span> — {ex.name}
          </span>
          <span className="mono pe-ws" style={{ color: accent }}>
            <span
              className="pe-wdot"
              style={{ background: accent }}
              aria-hidden
            />
            ANALYSIS
          </span>
        </div>

        {/* ── Window body ── */}
        <div className="pe-wb">

          {/* 1 · THE SKILL (headline) + THE MISTAKE (subtitle) */}
          <header className="pe-vf-head">
            <div className="pe-vf-skill">
              <div className="mono pe-vf-lbl" style={{ color: accent }}>
                {ex.n} / THE SKILL
              </div>
              <h3 className="pe-vf-skill-h">{ex.skill}</h3>
            </div>
            <div className="pe-vf-sub">
              <div className="mono pe-vf-lbl">THE MISTAKE</div>
              <div className="pe-vf-sub-t">{ex.desc}</div>
            </div>
          </header>

          {/* 2 · BEFORE / AFTER — primary showcase (always side by side) */}
          <div className="pe-vf-scroll">
            <div className="pe-w-outs">

              {/* BEFORE */}
              <div className="pe-w-out pe-w-out--before">
                <div className="pe-woh mono">
                  <span className="pe-wod" aria-hidden />
                  <span className="pe-wod" aria-hidden />
                  <span className="pe-wod" aria-hidden />
                  <span className="pe-woh-t">
                    {ex.before.label ?? "BEFORE"}
                    {ex.before.killed && (
                      <span className="pe-killed-tag mono">KILLED</span>
                    )}
                  </span>
                </div>
                <div className="pe-mock-wrap">
                  <MockHero spec={ex.before} />
                </div>
              </div>

              {/* AFTER */}
              <div className="pe-w-out pe-w-out--after">
                <div className="pe-woh mono">
                  <span className="pe-wod" aria-hidden />
                  <span className="pe-wod" aria-hidden />
                  <span className="pe-wod pe-wod-o" aria-hidden />
                  <span className="pe-woh-t">{ex.after.label ?? "AFTER"}</span>
                </div>
                <div className="pe-mock-wrap">
                  <MockHero spec={ex.after} />
                </div>
              </div>

            </div>
          </div>

          {/* 3 · THE MISTAKE / THE DIRECTION — supporting evidence */}
          <div className="pe-vf-prompts">
            <div className="pe-vf-col">
              <div className="pe-vf-col-hd">
                <span className="mono pe-vf-lbl" style={{ color: accent }}>THE MISTAKE</span>
                <span className="pe-bad-tag mono">{ex.mistake.tag}</span>
              </div>
              <pre className="mono pe-vf-prompt">{ex.mistake.text}</pre>
            </div>
            <div className="pe-vf-col">
              <div className="pe-vf-col-hd">
                <span className="mono pe-vf-lbl" style={{ color: accent }}>THE DIRECTION</span>
              </div>
              {ex.n === DIFF_EXAMPLE ? (
                <PromptDiff lines={ex.direction} />
              ) : (
                <div className="pe-vf-dir">
                  {ex.direction.map((line, j) => {
                    if ("spacer" in line) return <div key={j} className="pe-dir-space" />;
                    return (
                      <div key={j} className="pe-vf-dir-line">
                        {"tag" in line && line.tag && (
                          <span className="pe-ann mono">{line.tag}</span>
                        )}
                        <span className="mono pe-vf-prompt">{line.text}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* 4 · THE COST */}
          <div className="pe-vf-cost">
            <span className="mono pe-vf-lbl" style={{ color: accent }}>THE COST —</span>
            <span className="pe-vf-cost-t">{ex.cost}</span>
          </div>

          {/* 5 · PRINCIPLE + REF FOOTNOTES */}
          <div className="pe-vf-notes">
            <div
              className="mono"
              style={{ fontSize: "9px", letterSpacing: ".07em", color: "var(--c-muted)" }}
            >
              {ex.footnote}
            </div>
            {/* [DRAFT] REF FOOTNOTE */}
            <div
              className="mono"
              style={{ fontSize: "9px", letterSpacing: ".07em", color: "var(--c-muted)" }}
            >
              {ex.refNote}{" "}
              <a
                href={ex.refUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Anthropic Prompting Playbook (opens in new tab)"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(var(--c-muted-rgb), .45)",
                }}
              >
                {ex.refUrl}
              </a>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}

// ── PromptDiff — Example 01 only (animation prototype) ─────────────────────────
// The base prompt line is visible at once; each added direction line reveals
// once, in sequence, when the block enters the viewport. Every row is rendered
// from the start (space reserved); only opacity + transform animate.
// Lines are hidden only after JS arms the block, so no-JS shows everything.

const DIFF_EXAMPLE = "01";

function PromptDiff({ lines }: { lines: DirectionLine[] }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already scrolled past (e.g. reload mid-page) → leave it complete.
    if (el.getBoundingClientRect().bottom < 0) return;

    el.classList.add("pe-diff--armed");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            el.classList.add("pe-diff--play");
            io.disconnect(); // one-shot per page visit
          }
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let step = 0;
  return (
    <div ref={ref} className="pe-vf-dir pe-diff">
      {lines.map((line, j) => {
        if ("spacer" in line) return <div key={j} className="pe-dir-space" />;
        const hasTag = "tag" in line && !!line.tag;
        // Base prompt (first line) stays static; later lines are diff additions.
        if (j === 0) {
          return (
            <div key={j} className="pe-vf-dir-line">
              {hasTag && <span className="pe-ann mono">{(line as { tag: string }).tag}</span>}
              <span className="mono pe-vf-prompt">{line.text}</span>
            </div>
          );
        }
        const i = step++;
        return (
          <div
            key={j}
            className="pe-vf-dir-line pe-diff-add"
            style={{ "--pe-diff-i": i } as CSSProperties}
          >
            {hasTag ? (
              <span className="pe-ann mono">{(line as { tag: string }).tag}</span>
            ) : (
              <span className="pe-diff-plus mono" aria-hidden>+</span>
            )}
            <span className="mono pe-vf-prompt">{line.text}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Mock hero panels ───────────────────────────────────────────────────────────

function MockHero({ spec }: { spec: MockSpec }) {
  switch (spec.type) {
    case "hype":
      return (
        <div className="pe-mock pe-mock-hype">
          <div className="pe-mhype-content">
            <div className="pe-mhype-eyebrow mono">TRUSTED BY 50K+ INVESTORS</div>
            <div className="pe-mhype-h">{spec.headline}</div>
            <div className="pe-mhype-sub">{spec.sub}</div>
            <div className="pe-mhype-cta">{spec.cta} →</div>
          </div>
          <div className="pe-mhype-img" aria-hidden />
        </div>
      );

    case "calm":
      return (
        <div className="pe-mock pe-mock-calm">
          <div className="pe-mcalm-tag">— INVESTING</div>
          <div className="pe-mcalm-h">{spec.headline}</div>
          <div className="pe-mcalm-sub">{spec.sub}</div>
          <div className="pe-mcalm-cta">{spec.cta}</div>
          <div className="pe-mcalm-rule" aria-hidden />
          <div className="pe-mcalm-fine">No minimums · No jargon · No pressure</div>
        </div>
      );

    case "premium":
      return (
        <div className="pe-mock pe-mock-premium">
          <div className="pe-mprem-glass">
            <div className="pe-mprem-eyebrow">PREMIUM</div>
            <div className="pe-mprem-h">{spec.headline}</div>
            <div className="pe-mprem-sub">{spec.sub}</div>
            <div className="pe-mprem-cta">{spec.cta}</div>
          </div>
          <div className="pe-mprem-photo" aria-hidden />
        </div>
      );

    case "constrained":
      return (
        <div className="pe-mock pe-mock-constrained">
          <div className="pe-mcon-tag">001 / CAPITAL</div>
          <div className="pe-mcon-h">{spec.headline}</div>
          <div className="pe-mcon-sub">{spec.sub}</div>
          <div className="pe-mcon-cta">{spec.cta} →</div>
        </div>
      );

    case "killed":
      return (
        <div className="pe-mock pe-mock-killed">
          <div className="pe-mkill-overlay" aria-hidden />
          <div className="pe-mkill-body">
            <div className="pe-mkill-h">{spec.headline}</div>
            <div className="pe-mkill-sub">{spec.sub}</div>
            <div className="pe-mkill-cta">{spec.cta}</div>
          </div>
        </div>
      );

    case "revised":
      return (
        <div className="pe-mock pe-mock-revised">
          <div className="pe-mrev-accent" aria-hidden />
          <div className="pe-mrev-h">{spec.headline}</div>
          <div className="pe-mrev-sub">{spec.sub}</div>
          <div className="pe-mrev-cta">{spec.cta}</div>
        </div>
      );

    default:
      return null;
  }
}
