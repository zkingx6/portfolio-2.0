"use client";

import type { Accent, DotConfig } from "@/lib/types";

type Props = {
  open: boolean;
  cfg: DotConfig;
  onToggle: () => void;
  onClose: () => void;
  onDensity: (v: number) => void;
  onRadius: (v: number) => void;
  onTrail: (v: number) => void;
  onAccent: (a: Accent) => void;
  onSound: () => void;
  onRandom: () => void;
  onReset: () => void;
};

const ACCENTS: [Accent, string][] = [
  ["orange", "Orange"],
  ["ice", "Ice blue"],
  ["mix", "Mix"],
];

export function DotConfigurator({
  open,
  cfg,
  onToggle,
  onClose,
  onDensity,
  onRadius,
  onTrail,
  onAccent,
  onSound,
  onRandom,
  onReset,
}: Props) {
  const trailLabel = cfg.trail < 34 ? "Short" : cfg.trail < 67 ? "Medium" : "Long";
  return (
    <>
      <div className="cfgcluster">
        <button
          className="cfgibtn"
          aria-expanded={open}
          aria-controls="cfgp"
          aria-label="Configure dots"
          title="Configure dots"
          onClick={onToggle}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </button>
        <button
          className={"cfgibtn" + (cfg.sound ? "" : " soff")}
          aria-label={cfg.sound ? "Mute sound" : "Unmute sound"}
          title={cfg.sound ? "Mute sound" : "Unmute sound"}
          onClick={onSound}
        >
          {cfg.sound ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          )}
        </button>
      </div>
      <div
        id="cfgp"
        className="cfgp"
        role="dialog"
        aria-label="Dot field configurator"
        style={
          open
            ? {
                opacity: 1,
                visibility: "visible",
                transform: "none",
                transition: "opacity 200ms ease, transform 200ms ease",
              }
            : {
                opacity: 0,
                visibility: "hidden",
                transform: "translateY(8px)",
                transition:
                  "opacity 200ms ease, transform 200ms ease, visibility 0s linear 200ms",
              }
        }
      >
        <div className="rxh">
          <span className="rxd" />
          <span className="rxd" />
          <span className="rxd o" />
          <span className="mono rxt">Dot field — Configurator</span>
          <button className="cfgx" aria-label="Close configurator" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="cfgb">
          <div className="cfr">
            <label className="mono" htmlFor="cf-den">
              Density
            </label>
            <span className="mono cfv">{cfg.density}px</span>
            <input
              id="cf-den"
              type="range"
              min={20}
              max={48}
              step={1}
              style={{ ["--r" as string]: (cfg.density - 20) / 28 }}
              value={cfg.density}
              onInput={(e) => onDensity(+e.currentTarget.value)}
              onChange={(e) => onDensity(+e.currentTarget.value)}
            />
          </div>
          <div className="cfr">
            <label className="mono" htmlFor="cf-rad">
              Glow radius
            </label>
            <span className="mono cfv">{cfg.radius}px</span>
            <input
              id="cf-rad"
              type="range"
              min={80}
              max={260}
              step={1}
              style={{ ["--r" as string]: (cfg.radius - 80) / 180 }}
              value={cfg.radius}
              onInput={(e) => onRadius(+e.currentTarget.value)}
              onChange={(e) => onRadius(+e.currentTarget.value)}
            />
          </div>
          <div className="cfr">
            <label className="mono" htmlFor="cf-tr">
              Trail
            </label>
            <span className="mono cfv">{trailLabel}</span>
            <input
              id="cf-tr"
              type="range"
              min={0}
              max={100}
              step={1}
              style={{ ["--r" as string]: cfg.trail / 100 }}
              value={cfg.trail}
              onInput={(e) => onTrail(+e.currentTarget.value)}
              onChange={(e) => onTrail(+e.currentTarget.value)}
            />
          </div>
          <div className="cfr">
            <span className="mono">Accent</span>
            <span />
            <div className="seg" role="group" aria-label="Accent">
              {ACCENTS.map(([key, label]) => (
                <button
                  key={key}
                  className="segb"
                  aria-pressed={cfg.accent === key}
                  onPointerDown={(e) => {
                    if (e.button > 0) return;
                    onAccent(key);
                  }}
                  onClick={() => onAccent(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="cfr">
            <span className="mono" id="cf-snd-l">
              Sound
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="mono cfv">{cfg.sound ? "On" : "Off"}</span>
              <button
                className="sw"
                role="switch"
                aria-checked={cfg.sound}
                aria-labelledby="cf-snd-l"
                onClick={onSound}
              >
                <span className="swk" />
              </button>
            </span>
          </div>
        </div>
        <div className="cff">
          <button className="rxbtn rnd" onClick={onRandom}>
            Random
          </button>
          <button className="rxbtn" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
