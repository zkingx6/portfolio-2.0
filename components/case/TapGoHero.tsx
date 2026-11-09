"use client";

/* TapGo hero — three phone videos side by side, recreating the Framer layout.
   The MP4s are opaque (H.264, no alpha): each is a phone on a flat #FDFDFD
   background (drawn as #FFF). Each frame crops to the phone and the stage
   uses that white, so the phones float with no visible video edges. */

import { useEffect, useRef } from "react";

const VIDEOS = [
  { src: "/projects/tapgo/video%201.mp4", label: "TapGo welcome screen: “Shopping made easy” with large accessible controls" },
  { src: "/projects/tapgo/video%202.mp4", label: "TapGo home screen: voice search, continue shopping and today’s recommendations" },
  { src: "/projects/tapgo/video%203.mp4", label: "TapGo onboarding: “Shop groceries with confidence” with accessibility options" },
];

export function TapGoHero() {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const vids = refs.current.filter((v): v is HTMLVideoElement => !!v);
    // reduced motion: hold the first frame instead of looping
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      vids.forEach((v) => v.pause());
      return;
    }
    // start together; if autoplay is blocked the first frame stays visible
    vids.forEach((v) => {
      v.currentTime = 0;
      v.play().catch(() => {});
    });
  }, []);

  return (
    <div className="tgh-wrap">
      <div className="tgh">
        {VIDEOS.map((v, i) => (
          <div className="tgh-phone" key={v.src}>
            <video
              ref={(el) => {
                refs.current[i] = el;
              }}
              src={`${v.src}#t=0.001`}
              width={1080}
              height={1920}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={v.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
