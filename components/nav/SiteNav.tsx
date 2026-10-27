"use client";

import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { NavPill } from "./NavPill";
import type { NavTab } from "@/lib/types";

type Props = {
  homeHref: string;
  tabs: NavTab[];
  scrolled: boolean;
  logoSweep: boolean;
  expanded: boolean;
  open: boolean;
  onLogoHover: () => void;
  onEnter: () => void;
  onLeave: () => void;
  onFocus: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLDivElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onButtonClick: () => void;
  onClose: () => void;
};

export function SiteNav({
  homeHref,
  tabs,
  scrolled,
  logoSweep,
  expanded,
  open,
  onLogoHover,
  onEnter,
  onLeave,
  onFocus,
  onBlur,
  onKeyDown,
  onButtonClick,
  onClose,
}: Props) {
  const logo = (
    <LogoMark className={"dm lo" + (logoSweep ? " sw2" : "")} onHover={onLogoHover} />
  );

  return (
    <>
      <nav
        className={"nav" + (scrolled ? " sc" : "")}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          padding: "20px calc(var(--fm) + 1px + var(--edgev))",
        }}
      >
        {homeHref.startsWith("#") ? (
          <a
            href={homeHref}
            aria-label="Ronger Xu — home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-.03em",
            }}
          >
            {logo}
          </a>
        ) : (
          <Link
            href={homeHref}
            aria-label="Ronger Xu — home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-.03em",
            }}
          >
            {logo}
          </Link>
        )}
        <NavPill
          tabs={tabs}
          expanded={expanded}
          open={open}
          onEnter={onEnter}
          onLeave={onLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onButtonClick={onButtonClick}
          onClose={onClose}
        />
      </nav>
      {open ? <div className="ovl" onClick={onClose} /> : null}
    </>
  );
}
