import { TRACE } from "@/lib/content";

type Props = {
  tab: "p" | "n";
  onPrompt: () => void;
  onNotes: () => void;
};

export function TracePanel({ tab, onPrompt, onNotes }: Props) {
  return (
    <div className="trw">
      <div className="trl">
        <div className="mono" style={{ color: "#A8A59E", marginBottom: 16 }}>
          {TRACE.id}
        </div>
        {TRACE.steps.map((st, i) => (
          <div
            key={st.k}
            className="ts"
            style={{ ["--i" as string]: i } as React.CSSProperties}
          >
            <span className={"tn" + (st.k === "OUTPUT" ? " o" : "")} />
            <span
              className="mono"
              style={{ color: st.k === "OUTPUT" ? "#FF6A24" : "#F4F1EA" }}
            >
              [ {st.k} ]
            </span>
          </div>
        ))}
      </div>
      <div className="trp">
        <div className="trh">
          <span className="trd" />
          <span className="trd" />
          <span className="trd" />
          <button
            className="trt"
            aria-pressed={tab !== "n"}
            onClick={onPrompt}
          >
            Prompt
          </button>
          <button
            className="trt"
            aria-pressed={tab === "n"}
            onClick={onNotes}
          >
            Notes
          </button>
        </div>
        <div className="trb">
          {tab !== "n" ? (
            TRACE.steps.map((st) => (
              <div key={st.k} style={{ marginBottom: 14 }}>
                <div className="mono" style={{ color: "#A8A59E", marginBottom: 4 }}>
                  [ {st.k} ]
                </div>
                <div className="trx">
                  {st.segs.map((sg, i) => (
                    <span
                      key={i}
                      style={{
                        color:
                          sg.tone === "o"
                            ? "#FF6A24"
                            : sg.tone === "b"
                              ? "#91C9F7"
                              : undefined,
                      }}
                    >
                      {sg.t}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="trx" style={{ color: "#A8A59E" }}>
              Notes will collect here as traces are added.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
