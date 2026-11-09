"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { MediaItem } from "@/lib/projectMedia";
import "@/app/styles/media.css";

/*
  Renders entries from lib/projectMedia.ts. Every frame reserves its aspect
  ratio up front (no layout shift); items whose file fails to load are hidden.
*/

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

const SIZES_HALF = "(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 560px";
const SIZES_FULL = "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1160px";

function Asset({ m, priority, sizes, onFail }: { m: MediaItem; priority?: boolean; sizes: string; onFail: () => void }) {
  const reduced = useReducedMotion();
  // with a fixed frame ratio, fill the frame (cover); otherwise keep natural proportions
  const fill = { width: "100%", height: m.aspect ? "100%" : "auto", display: "block", objectFit: "cover" } as const;

  if (m.type === "image") {
    return (
      <Image
        src={m.src}
        alt={m.alt}
        width={m.width}
        height={m.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        style={fill}
        onError={onFail}
      />
    );
  }

  if (m.type === "gif") {
    // animated GIFs are served as-is; reduced motion swaps to the still frame
    const src = reduced && m.still ? m.still : m.src;
    return (
      <Image
        src={src}
        alt={m.alt}
        width={m.width}
        height={m.height}
        sizes={sizes}
        unoptimized
        priority={priority}
        loading={priority ? undefined : "lazy"}
        style={fill}
        onError={onFail}
      />
    );
  }

  const ambient = !!m.ambient && !reduced;
  return (
    <video
      key={ambient ? "ambient" : "player"}
      src={m.src}
      poster={m.poster}
      width={m.width}
      height={m.height}
      aria-label={m.label}
      controls={!ambient}
      autoPlay={ambient}
      muted={ambient}
      loop={ambient}
      playsInline
      preload={ambient ? "auto" : "metadata"}
      style={fill}
      onError={onFail}
    >
      {m.captions ? <track kind="captions" src={m.captions} srcLang="en" label="English" default /> : null}
    </video>
  );
}

export function MediaFigure({ m, priority, full }: { m: MediaItem; priority?: boolean; full?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className={"pm-fig" + (m.wide || full ? " wide" : "")}>
      <div className="pm-frame" style={{ aspectRatio: m.aspect ?? `${m.width} / ${m.height}` }}>
        <Asset m={m} priority={priority} sizes={m.wide || full ? SIZES_FULL : SIZES_HALF} onFail={() => setFailed(true)} />
      </div>
      {m.caption ? <figcaption className="mono pm-cap">{m.caption}</figcaption> : null}
    </figure>
  );
}

/** A gallery of any length; renders nothing when empty. */
export function MediaGallery({ items, className = "" }: { items?: MediaItem[]; className?: string }) {
  if (!items || items.length === 0) return null;
  const single = items.length === 1;
  return (
    <div className={"pm-gal " + className}>
      {items.map((m) => (
        <MediaFigure key={m.src} m={m} full={single} />
      ))}
    </div>
  );
}
