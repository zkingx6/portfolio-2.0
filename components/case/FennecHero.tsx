import Image from "next/image";
import { Amatic_SC, Barrio } from "next/font/google";

/* FENNEC hero — a code recreation of fennecnyc.com's homepage (not a
   screenshot or iframe). Fonts, colors and proportions come from the live
   site's own CSS: Barrio headline, Amatic SC labels, #EA5514 header,
   #FFFBF1 page, #252120 ink. Sized in container units so it scales like the site. */

const barrio = Barrio({ weight: "400", subsets: ["latin"], display: "swap", preload: false, variable: "--fnh-display" });
const amatic = Amatic_SC({ weight: "400", subsets: ["latin"], display: "swap", preload: false, variable: "--fnh-hand" });

export function FennecHero({ href }: { href: string }) {
  return (
    <div className="fnh-wrap">
      <a
        className={`fnh ${barrio.variable} ${amatic.variable}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View the live FENNEC website (opens in a new tab)"
      >
        <span className="fnh-nav" aria-hidden>
          <Image className="fnh-logo" src="/projects/fennec/fennec-logo.png" alt="" width={1542} height={337} sizes="12vw" />
          <span className="fnh-links">
            <span>Events</span>
            <span>About</span>
            <span>Shop</span>
            <span>Contact</span>
          </span>
        </span>
        <span className="fnh-h" aria-hidden>
          ONE ROPE.
          <br />
          ANYTHING.
        </span>
        <span className="fnh-sub" aria-hidden>
          Build it your way.
          <br />
          Carry it anywhere.
        </span>
        <Image
          className="fnh-rope"
          src="/projects/fennec/hero-rope.png"
          alt=""
          width={1249}
          height={1321}
          sizes="(max-width: 768px) 30vw, 300px"
        />
        <span className="fnh-cta mono">
          View live website <span aria-hidden>↗</span>
        </span>
      </a>
    </div>
  );
}
