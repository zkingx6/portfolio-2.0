import type { CSSProperties } from "react";
import type { LogoDot } from "./types";

const R = ["11110", "10001", "10001", "11110", "10010", "10001"];
const XX = ["10001", "01010", "00100", "00100", "01010", "10001"];

export function getLogoDots(): LogoDot[] {
  const logoDots: LogoDot[] = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 11; c++) {
      let lit = false;
      if (c < 5) lit = R[r][c] === "1";
      else if (c > 5) lit = XX[r][c - 6] === "1";
      logoDots.push({
        cls: "d" + (lit ? " on" : "") + (lit && c > 5 ? " bx" : ""),
        style: {
          ["--c" as string]: String(c),
          ["--o" as string]: lit ? 1 : 0.12,
          ["--bg" as string]: lit && c > 5 ? "#FF6A24" : "#F4F1EA",
        } as CSSProperties,
      });
    }
  }
  return logoDots;
}

export const GRID_DOTS = Array.from({ length: 9 }, (_, i) => ({
  w: Math.floor(i / 3) + (i % 3),
  accent: i === 4,
}));
