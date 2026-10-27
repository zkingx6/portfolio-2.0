"use client";

import { ASK_CHIPS, EMAIL, MAILTO } from "@/lib/content";
import type { AskResult } from "@/lib/types";

type Props = {
  result: AskResult | null;
  onRun: (q: string) => void;
};

export function AskTerminal({ result, onRun }: Props) {
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
            Type a keyword, I’ll take you to the case.
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
                placeholder="fintech, AI, accessibility…"
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
                  <div style={{ color: "#A8A59E" }}>&gt; {result.q}</div>
                ) : null}
                {result && !result.miss ? (
                  <div style={{ marginTop: 6, color: "#F4F1EA" }}>{result.text}</div>
                ) : null}
                {result?.miss ? (
                  <div style={{ marginTop: 6, color: "#F4F1EA" }}>
                    Not in the index yet. If enough people ask, it becomes a case.
                    Want it sooner?{" "}
                    <a href={MAILTO} style={{ color: "#91C9F7" }}>
                      {EMAIL}
                    </a>{" "}
                    <span style={{ color: "#FF6A24", marginLeft: 8 }}>
                      [COMING SOON]
                    </span>
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
