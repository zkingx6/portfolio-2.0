"use client";

import type { CSSProperties, MouseEvent, FocusEvent } from "react";
import Link from "next/link";
import {
  CATEGORIES,
  CATEGORY_NAMES,
  PLAYGROUND,
  PROJECTS,
} from "@/lib/content";
import { parse, projectShapes } from "@/lib/shapes";
import { BcgGraphic } from "./BcgGraphic";
import { CaseMotif } from "./CaseMotif";
import { NarrowingGraphic } from "./NarrowingGraphic";
import { EcoVizGraphic } from "./EcoVizGraphic";
import { FennecGraphic } from "./FennecGraphic";
import { MyCoursesGraphic } from "./MyCoursesGraphic";
import { ParallelGraphic } from "./ParallelGraphic";
import { RestifyGraphic } from "./RestifyGraphic";
import { TapGoGraphic } from "./TapGoGraphic";
import { TracePanel } from "./TracePanel";
import { VisaGraphic } from "./VisaGraphic";

function isFlushGraphic(i: number) {
  return (
    i === 0 ||
    i === 1 ||
    i === 2 ||
    i === 3 ||
    i === 4 ||
    i === 5 ||
    i === 6 ||
    i === 7 ||
    i === 8
  );
}

function ProjectGraphic({ index }: { index: number }) {
  if (index === 0) return <VisaGraphic />;
  if (index === 1) return <FennecGraphic />;
  if (index === 2) return <ParallelGraphic />;
  if (index === 3) return <BcgGraphic />;
  if (index === 4) return <EcoVizGraphic />;
  if (index === 5) return <MyCoursesGraphic />;
  if (index === 6) return <RestifyGraphic />;
  if (index === 7) return <TapGoGraphic />;
  if (index === 8) return <NarrowingGraphic />;
  return null;
}

type Props = {
  openCase: number;
  expandedKey: string;
  highlightKey: string;
  hoverIndex: number;
  preview: { x: number; y: number; w: number };
  traceTab: "p" | "n";
  onToggleCase: (k: number) => void;
  onToggleRow: (key: string) => void;
  onShowPreview: (
    i: number,
    e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>,
  ) => void;
  onLeave: () => void;
  onTracePrompt: () => void;
  onTraceNotes: () => void;
};

export function WorkSection({
  openCase,
  expandedKey,
  highlightKey,
  hoverIndex,
  preview,
  traceTab,
  onToggleCase,
  onToggleRow,
  onShowPreview,
  onLeave,
  onTracePrompt,
  onTraceNotes,
}: Props) {
  const shapes = hoverIndex >= 0 ? projectShapes(hoverIndex) : [];

  return (
    <section id="work" className="wk rl">
      <div className="mono wh">
        <span style={{ color: "rgb(255, 106, 36)" }}>Work</span>
      </div>
      <div
        className="cases"
        style={{ gridTemplateColumns: "repeat(5,minmax(0,1fr))" }}
        onMouseLeave={onLeave}
      >
        {CATEGORIES.map((c, k) => {
          const open = openCase === k;
          return (
            <div className="cs" key={c.title}>
              <button
                className={"cv cz" + (k > 0 ? " ov" : "") + (open ? " on" : "")}
                style={
                  {
                    "--r": open ? "0deg" : c.rotate,
                    zIndex: open ? 3 : 1,
                  } as CSSProperties
                }
                aria-expanded={open}
                onClick={() => onToggleCase(k)}
              >
                <span className="ctop mono">
                  <span>{c.status}</span>
                  <span>{open ? "− Close" : "+ Open"}</span>
                </span>
                <span className="cmid">
                  <span className="ct">{c.title}</span>
                </span>
                <span className="hz" aria-hidden>
                  <span className="mo">
                    <CaseMotif index={k} />
                  </span>
                </span>
                <span className="nm mono">
                  {c.names.map((nz) => (
                    <span key={nz} style={{ display: "block" }}>
                      {nz}
                    </span>
                  ))}
                </span>
              </button>
              <div
                className="dr"
                style={
                  open
                    ? {
                        gridTemplateRows: "1fr",
                        visibility: "visible",
                        transition: "grid-template-rows 400ms ease",
                      }
                    : {
                        gridTemplateRows: "0fr",
                        visibility: "hidden",
                        transition:
                          "grid-template-rows 400ms ease, visibility 0s linear 400ms",
                      }
                }
              >
                <div className="di">
                  <div className="mono dh">
                    <span>{c.title}</span>
                    <button className="mono dcl" onClick={() => onToggleCase(k)}>
                      — Close
                    </button>
                  </div>
                  <div style={{ borderBottom: "1px solid #333" }}>
                    {k === 4
                      ? PLAYGROUND.map((x) => (
                          <div className="ex" key={x.name}>
                            <span className="t">{x.name}</span>
                            <span className="mono g">{x.tags}</span>
                            <span className="mono r">{x.status}</span>
                            {x.also ? (
                              <span className="mono al2">{x.also}</span>
                            ) : null}
                          </div>
                        ))
                      : PROJECTS.map((p, i) => ({ p, i }))
                          .filter((x) => x.p.categories.includes(k + 1))
                          .map(({ p, i }) => {
                            const key = k + "-" + i;
                            const rowOpen = open && expandedKey === key;
                            const also = p.categories
                              .filter((x) => x !== k + 1)
                              .map((x) => CATEGORY_NAMES[x].toUpperCase())
                              .join(" / ");
                            const rowContent = (
                              <>
                                <span className="rn">
                                  <span className="t">{p.name}</span>
                                  <span
                                    className="mono"
                                    style={{
                                      display: "block",
                                      marginTop: 8,
                                      color: "#A8A59E",
                                    }}
                                  >
                                    {p.tags}
                                  </span>
                                </span>
                                <span className="rd">{p.d1}</span>
                                <span
                                  className="mono r"
                                  style={{
                                    color:
                                      p.status === "[Deployed MVP]"
                                        ? "#FF6A24"
                                        : "#A8A59E",
                                  }}
                                >
                                  {p.status}
                                </span>
                                {p.categories.length > 1 ? (
                                  <span className="mono al">
                                    Also filed under → {also}
                                  </span>
                                ) : null}
                                {p.trace ? (
                                  <span className="mono vt">View trace →</span>
                                ) : null}
                              </>
                            );
                            const rowStyle =
                              highlightKey === key
                                ? { animation: "hlp 1200ms ease-out both" }
                                : undefined;
                            return (
                              <div key={key}>
                                {p.hasPage ? (
                                  <Link
                                    href={`/work/${p.pageSlug}`}
                                    className="ix"
                                    style={rowStyle}
                                    aria-label={p.name}
                                    onMouseEnter={(e) => onShowPreview(i, e)}
                                    onMouseMove={(e) => onShowPreview(i, e)}
                                    onFocus={(e) => onShowPreview(i, e)}
                                    onBlur={onLeave}
                                  >
                                    {rowContent}
                                  </Link>
                                ) : (
                                  <button
                                    className="ix"
                                    style={rowStyle}
                                    aria-expanded={expandedKey === key}
                                    onClick={() => onToggleRow(key)}
                                    onMouseEnter={(e) => onShowPreview(i, e)}
                                    onMouseMove={(e) => onShowPreview(i, e)}
                                    onFocus={(e) => onShowPreview(i, e)}
                                    onBlur={onLeave}
                                  >
                                    {rowContent}
                                  </button>
                                )}
                                {rowOpen ? (
                                  <div className="pn">
                                    <div>
                                      <p style={p.d2s ? parse(p.d2s) : undefined}>
                                        {p.d2}
                                      </p>
                                    </div>
                                    {p.trace ? (
                                      <div
                                        style={{
                                          flex: "1 1 100%",
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: 16,
                                        }}
                                      >
                                        <TracePanel
                                          tab={traceTab}
                                          onPrompt={onTracePrompt}
                                          onNotes={onTraceNotes}
                                        />
                                      </div>
                                    ) : null}
                                    <div
                                      className={
                                        isFlushGraphic(i) ? "inl inl-pg" : "inl"
                                      }
                                      aria-hidden={!isFlushGraphic(i)}
                                    >
                                      {isFlushGraphic(i) ? (
                                        <ProjectGraphic index={i} key={"inl-" + i} />
                                      ) : (
                                        projectShapes(i).map((z, n) => (
                                          <span key={n} style={z} />
                                        ))
                                      )}
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div
          className={
            "pv" + (isFlushGraphic(hoverIndex) ? " pv-pg" : "")
          }
          aria-hidden
          style={{
            left: preview.x,
            top: preview.y,
            opacity: hoverIndex >= 0 ? 1 : 0,
          }}
        >
          {isFlushGraphic(hoverIndex) ? (
            <ProjectGraphic index={hoverIndex} key={"pv-" + hoverIndex} />
          ) : (
            shapes.map((z, n) => (
              <span key={n} style={z} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
