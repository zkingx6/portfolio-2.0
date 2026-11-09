"use client";

import { ASK_CHIPS, MAILTO, PROJECTS } from "@/lib/content";
import type { AskResult } from "@/lib/types";

type Props = {
  result: AskResult | null;
  onRun: (q: string) => void;
  /** Scrolls to the project's row in the Work section. Results never link to case pages. */
  onLocate: (i: number) => void;
};

export function AskTerminal({ result, onRun, onLocate }: Props) {
  const hits = result?.hits ?? [];
  const count = String(hits.length).padStart(2, "0") + (hits.length === 1 ? " Result found" : " Results found");
  return (
    <section id="ask" className="rl" style={{ padding: "44px var(--edge)" }}>
      <div className="rx" role="search">
        <div className="rxh">
          <span className="rxd" />
          <span className="rxd" />
          <span className="rxd o" />
          <span className="mono rxt">Ask RX — Portfolio Terminal</span>
          <span className="mono rxs">
            <span className="rxdt" />
            Ready
          </span>
        </div>
        <div className="rxb">
          <div className="rxm">
            <span className="mono" style={{ color: "#FF6A24" }}>
              RX —
            </span>{" "}
            Type a keyword. I’ll find the work.
          </div>
          <div className="rxbar">
            <span
              className="mono"
              style={{ color: "#FF6A24", fontWeight: 500, flex: "none" }}
            >
              RX &gt;
            </span>
            <span className="rxw">
              <input
                id="rxq"
                className="rxin"
                type="text"
                autoComplete="off"
                spellCheck={false}
                aria-label="Type a keyword to find a case"
                placeholder="Try a keyword..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const v = e.currentTarget.value;
                    e.currentTarget.value = "";
                    onRun(v);
                  }
                }}
              />
              <span className="rxcur" aria-hidden />
            </span>
            <button
              className="rxgo"
              onClick={() => {
                const el = document.getElementById("rxq") as HTMLInputElement | null;
                if (!el) return;
                const v = el.value;
                el.value = "";
                onRun(v);
              }}
            >
              Run
            </button>
          </div>
          <div className="rxchips">
            {ASK_CHIPS.map((label) => (
              <button
                key={label}
                className="rxbtn"
                onClick={() => {
                  const el = document.getElementById("rxq") as HTMLInputElement | null;
                  if (el) el.value = "";
                  onRun(label);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            className="rxo"
            style={{ gridTemplateRows: result ? "1fr" : "0fr" }}
            role="status"
            aria-live="polite"
          >
            <div className="rxoi">
              <div className="rxot">
                {result ? (
                  <div style={{ color: "var(--c-muted)" }}>&gt; {result.q}</div>
                ) : null}
                {result && hits.length === 1 ? (
                  <>
                    <div className="mono rxn">{count}</div>
                    <div className="rxr1">
                      <div style={{ color: "var(--c-fg)" }}>{PROJECTS[hits[0]].name}</div>
                      <div style={{ color: "var(--c-muted)" }}>{PROJECTS[hits[0]].d1}</div>
                      <button
                        type="button"
                        className="mono rxa"
                        aria-label={`See ${PROJECTS[hits[0]].name} in Work`}
                        onClick={() => onLocate(hits[0])}
                      >
                        See in Work →
                      </button>
                    </div>
                  </>
                ) : null}
                {result && hits.length > 1 ? (
                  <>
                    <div className="mono rxn">{count}</div>
                    <ul className="rxl">
                      {hits.map((i) => (
                        <li key={PROJECTS[i].id}>
                          <button
                            type="button"
                            className="rxli"
                            aria-label={`See ${PROJECTS[i].name} in Work`}
                            onClick={() => onLocate(i)}
                          >
                            <span className="mono rxln">{PROJECTS[i].name}</span>
                            <span className="mono rxa">— See in Work →</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
                {result && hits.length === 0 ? (
                  <div className="rxr1">
                    <div style={{ color: "var(--c-fg)" }}>Nothing in the index yet.</div>
                    <div style={{ color: "var(--c-muted)" }}>Have something in mind? Let’s talk.</div>
                    <a href={MAILTO} className="mono rxa">
                      Get in touch →
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
