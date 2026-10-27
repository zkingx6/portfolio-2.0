"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { GRID_DOTS } from "@/lib/logo";
import type { NavTab } from "@/lib/types";

type Props = {
  tabs: NavTab[];
  expanded: boolean;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onFocus: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLDivElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onButtonClick: () => void;
  onClose: () => void;
};

export function NavPill({
  tabs,
  expanded,
  open,
  onEnter,
  onLeave,
  onFocus,
  onBlur,
  onKeyDown,
  onButtonClick,
  onClose,
}: Props) {
  return (
    <div
      className={"pill" + (expanded ? " go" : "") + (open ? " open" : "")}
      style={{ maxWidth: expanded ? 300 : 64 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <button
        className="pbtn"
        aria-label="Menu"
        aria-expanded={expanded}
        onClick={onButtonClick}
      >
        <span className="pg" aria-hidden>
          {GRID_DOTS.map((g, i) => (
            <span
              key={i}
              className="pd"
              style={
                {
                  "--w": g.w,
                  background: g.accent ? "#FF6A24" : undefined,
                } as CSSProperties
              }
            />
          ))}
        </span>
      </button>
      <div
        className="tabs mono"
        style={
          expanded
            ? { visibility: "visible" }
            : {
                visibility: "hidden",
                transition: "visibility 0s linear 120ms",
              }
        }
      >
        {tabs.map((t, i) => {
          const style: CSSProperties = expanded
            ? {
                opacity: 1,
                transform: "none",
                transition: `opacity 220ms ease-out ${100 + i * 40}ms, transform 220ms ease-out ${100 + i * 40}ms`,
              }
            : {
                opacity: 0,
                transform: "translateX(12px)",
                transition: "opacity 120ms ease",
              };
          if (t.href.startsWith("/")) {
            return (
              <Link key={t.label} href={t.href} style={style}>
                {t.label}
              </Link>
            );
          }
          return (
            <a key={t.label} href={t.href} style={style} onClick={onClose}>
              {t.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
