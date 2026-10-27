import type { CSSProperties } from "react";

const o = "#FF6A24";
const b = "#91C9F7";
const w = "#F4F1EA";

function bx(
  l: number,
  t: number,
  wd: number,
  h: number,
  c: string,
  x = "",
): CSSProperties {
  return parse(
    `position:absolute;left:${l}%;top:${t}%;width:${wd}%;height:${h}%;background:${c};${x}`,
  );
}

function ci(d: number, x: string): CSSProperties {
  return parse(
    `position:absolute;left:50%;top:50%;width:${d}%;aspect-ratio:1;margin:-${d / 2}% 0 0 -${d / 2}%;border-radius:50%;${x}`,
  );
}

export function parse(style: string): CSSProperties {
  const out: Record<string, string> = {};
  for (const part of style.split(";")) {
    const i = part.indexOf(":");
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (k) out[k] = v;
  }
  return out as CSSProperties;
}

export function projectShapes(i: number): CSSProperties[] {
  if (i === 0)
    return [
      bx(12, 22, 55, 8, o),
      bx(30, 36, 40, 8, b),
      bx(12, 50, 62, 8, w),
      bx(36, 64, 28, 8, o),
      bx(44, 10, 0.5, 80, w, "opacity:.5"),
    ];
  if (i === 1)
    return Array.from({ length: 64 }, (_, k) => {
      const x = k % 8;
      const y = Math.floor(k / 8);
      const v = (Math.sin(x * 1.3) + Math.cos(y * 0.9 + x * 0.4) + 2) / 4;
      const z = 3 + v * 7;
      return parse(
        `position:absolute;left:${9 + x * 11.7}%;top:${12 + y * 10.8}%;width:${z}%;aspect-ratio:1;margin:-${z / 2}% 0 0 -${z / 2}%;border-radius:50%;background:${v > 0.7 ? o : b};opacity:${0.35 + v * 0.65}`,
      );
    });
  if (i === 2)
    return [
      ci(55, `border:2px solid ${o};animation:pulse 2s ease-out infinite`),
      ci(55, `border:2px solid ${o};animation:pulse 2s ease-out 1s infinite`),
      ci(34, `background:${o}`),
    ];
  if (i === 3)
    return [
      ci(60, `background:${b};animation:breathe 5s ease-in-out infinite`),
      ci(78, `border:1px solid ${w};opacity:.4`),
    ];
  if (i === 4)
    return [0, 1, 2, 3, 4, 5, 6].map((k) =>
      bx(10, 12 + k * 11, k % 3 === 1 ? 48 : 72 - k * 4, 5, k === 2 ? o : "#4a4a4a"),
    );
  if (i === 5)
    return [28, 38, 34, 52, 60, 74].map((h, k) =>
      bx(10 + k * 14, 84 - h, 9, h, k === 5 ? o : b),
    );
  if (i === 7)
    return [
      bx(22, 14, 0.6, 66, w, "opacity:.5"),
      ...[14, 36, 58, 78].map((y, k) =>
        bx(
          19.5,
          y,
          5,
          4,
          k === 3 ? o : "#242424",
          `border:1px solid ${k === 3 ? o : w};box-sizing:border-box`,
        ),
      ),
      ...[14, 36, 58, 78].map((y, k) =>
        bx(
          34,
          y + 1,
          k === 3 ? 44 : [38, 50, 32][k],
          2,
          k === 3 ? o : w,
          k === 3 ? "" : "opacity:.45",
        ),
      ),
    ];
  if (i === 8)
    return [
      bx(14, 16, 72, 22, "transparent", `border:1.5px solid ${b};box-sizing:border-box`),
      bx(14, 46, 32, 10, b),
      bx(54, 46, 32, 10, "#4a4a4a"),
      bx(14, 66, 72, 3, "#4a4a4a"),
      bx(14, 74, 50, 3, "#4a4a4a"),
    ];
  return [
    bx(18, 18, 52, 40, o),
    bx(30, 36, 52, 40, "transparent", `border:1.5px solid ${w}`),
    bx(18, 72, 12, 6, b),
  ];
}
