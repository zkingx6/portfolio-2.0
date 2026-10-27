import type { CSSProperties } from "react";
import { getLogoDots } from "@/lib/logo";

const dots = getLogoDots();

type Props = {
  className?: string;
  size?: { ds: string; gp: string };
  onHover?: () => void;
};

export function LogoMark({
  className = "dm lo",
  size = { ds: "3px", gp: "2.4px" },
  onHover,
}: Props) {
  return (
    <span
      className={className}
      style={{ "--ds": size.ds, "--gp": size.gp } as CSSProperties}
      aria-hidden
      onMouseEnter={onHover}
    >
      {dots.map((dd, i) => (
        <span key={i} className={dd.cls} style={dd.style} />
      ))}
    </span>
  );
}
