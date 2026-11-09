/*
  Project media — the ONE place to add, order, caption, replace or remove
  project images, GIFs and videos. UI components read from here; you never
  need to edit a component to change media.

  Files live in  public/projects/<slug>/  and are referenced as
  "/projects/<slug>/<file>".  Example:  public/projects/parallel/01-dashboard.png
  → src: "/projects/parallel/01-dashboard.png"

  width / height = the file's real pixel size (Finder → Get Info → More Info).
  They reserve the right space so nothing jumps while loading.

  Where media appears
  - cover    → case study hero (if no `hero`), and the top of the expanded
               project row on the landing page Work index
  - hero     → case study page hero (replaces the "Media — 16:9" placeholder)
  - gallery  → expanded project row on the landing page Work index
  - sections → case study page: media inside a section, keyed by the section
               label exactly as written in lib/cases.ts (e.g. "The Problem").
               Sections without media keep their dashed placeholder;
               an empty array ([]) makes that section text-only.
  Order on screen = order in the array. Remove an item = delete its entry.
*/

type Base = {
  /** "/projects/<slug>/<file>" */
  src: string;
  /** Real pixel size of the file. */
  width: number;
  height: number;
  /** Optional caption shown under the media. */
  caption?: string;
  /** Span the full content width in a gallery (default: half width on desktop). */
  wide?: boolean;
  /**
   * Optional frame ratio, e.g. "16 / 9". The media fills the frame with
   * object-fit: cover (centered) instead of using its own proportions.
   */
  aspect?: string;
  /** With `aspect`: which part stays in view, e.g. "50% 40%" (default centered). */
  position?: string;
};

export type ImageMedia = Base & {
  type: "image";
  /** Describe what the image shows (screen readers). Required. */
  alt: string;
};

export type GifMedia = Base & {
  type: "gif";
  alt: string;
  /** Optional still frame (PNG/JPG) shown to visitors who prefer reduced motion. */
  still?: string;
};

export type VideoMedia = Base & {
  type: "video";
  /** Short description of the video (screen readers). Required. */
  label: string;
  /** Optional poster frame shown before playing. */
  poster?: string;
  /** Optional WebVTT captions file, e.g. "/projects/parallel/demo.vtt". */
  captions?: string;
  /**
   * Short silent loops only: autoplay muted + loop (never with reduced motion).
   * Default false → normal player with controls, nothing autoplays.
   */
  ambient?: boolean;
};

export type MediaItem = ImageMedia | GifMedia | VideoMedia;

export type ProjectMedia = {
  cover?: ImageMedia | GifMedia;
  hero?: MediaItem;
  gallery?: MediaItem[];
  sections?: Record<string, MediaItem[]>;
};

export type ProjectSlug =
  | "parallel"
  | "tapgo"
  | "restify"
  | "rit-mycourses"
  | "ecoviz"
  | "visa-financial-insights"
  | "bcg-x"
  | "fennec"
  | "prompt-direction"
  | "zf-diary";

export const PROJECT_MEDIA: Record<ProjectSlug, ProjectMedia> = {
  parallel: {
    // Case study hero — 4:3 mockup shown in the 16:9 hero frame (cover, centered)
    hero: {
      type: "image",
      src: "/projects/parallel/Parallel%20landing.png",
      width: 1500,
      height: 1125,
      aspect: "16 / 9",
      alt: "Parallel landing page — “Fair meeting rotation for global teams” — shown on a desktop monitor",
    },
    // Example (uncomment after adding the files to public/projects/parallel/):
    // hero: {
    //   type: "image",
    //   src: "/projects/parallel/00-hero.png",
    //   width: 2400,
    //   height: 1350,
    //   alt: "Parallel dashboard showing a fair rotation across three time zones",
    // },
    // gallery: [
    //   { type: "image", src: "/projects/parallel/01-setup.png", width: 1600, height: 1000, alt: "Team setup screen", caption: "Team setup" },
    //   { type: "video", src: "/projects/parallel/02-demo.mp4", width: 1920, height: 1080, label: "Scheduling flow walkthrough", poster: "/projects/parallel/02-demo-poster.jpg", wide: true },
    // ],
    // sections: {
    //   "The Problem": [
    //     { type: "image", src: "/projects/parallel/03-problem.png", width: 1600, height: 900, alt: "Late calls landing on the same teammates", caption: "Before: the same people take every late call" },
    //   ],
    // },
  },
  tapgo: {
    // Hero = three-video composition (components/case/TapGoHero.tsx).
    // Section images share one 5:4 frame (cover) so heights stay consistent;
    // the crop only trims background. [] = text-only section.
    sections: {
      "Project Overview": [
        { type: "image", src: "/projects/tapgo/example%201.png", width: 2976, height: 3206, aspect: "5 / 4", position: "50% 47%", alt: "Hand holding an iPhone showing the TapGo welcome screen — “Shopping made easy.”" },
      ],
      "The Problem": [],
      "The Challenge": [
        { type: "image", src: "/projects/tapgo/example%203.png", width: 1500, height: 1125, aspect: "5 / 4", alt: "Hands holding an iPhone showing TapGo onboarding — “Big text. Easy taps. No confusion.”" },
      ],
      "Key Decisions": [],
      "Results & Impact": [
        { type: "image", src: "/projects/tapgo/example%204.png", width: 1500, height: 1125, aspect: "5 / 4", alt: "iPhone showing TapGo’s “Make reading comfortable” settings for text size, contrast and color theme" },
      ],
      "Learnings": [
        { type: "image", src: "/projects/tapgo/example%205.png", width: 1500, height: 1125, aspect: "5 / 4", alt: "TapGo poster on a wall — “Your favorites, always one tap away.”" },
      ],
    },
  },
  restify: {
    // Case study hero — 1726×911 is a touch wider than 16:9; cover trims only side background
    hero: {
      type: "image",
      src: "/projects/restify/landing.png",
      width: 1726,
      height: 911,
      aspect: "16 / 9",
      alt: "Restify app on two iPhones — breathing screen and sleep-sound player — on a blue gradient",
    },
    // [] = text-only section (no media block, no placeholder)
    sections: {
      "Project Overview": [
        { type: "image", src: "/projects/restify/homeview.png", width: 2044, height: 1080, alt: "Restify app icon next to an iPhone home screen showing the installed app" },
      ],
      "The Problem": [],
      "The Challenge": [
        { type: "image", src: "/projects/restify/example%201.png", width: 1448, height: 1086, alt: "Restify Insights screen with sleep duration, meditation streak and mood charts on an iPhone" },
      ],
      "Key Decisions": [
        { type: "image", src: "/projects/restify/example%202.png", width: 1024, height: 1536, aspect: "4 / 3", position: "50% 46%", alt: "Restify home screen on an iPhone lying on a grey surface" },
      ],
      "Results & Impact": [
        { type: "image", src: "/projects/restify/example%204.png", width: 4096, height: 2730, alt: "Person slipping an iPhone showing Restify's dark-mode insights into a jacket pocket" },
      ],
      "Learnings": [
        { type: "image", src: "/projects/restify/example%203.png", width: 2044, height: 1080, alt: "Restify breathing and home screens on two iPhones against a blue gradient" },
      ],
    },
  },
  "rit-mycourses": {
    // Case study hero — 4:3 mockup shown in the 16:9 hero frame (cover, centered)
    hero: {
      type: "image",
      src: "/projects/rit-mycourses/rit%20landing.png",
      width: 1500,
      height: 1125,
      aspect: "16 / 9",
      alt: "Redesigned RIT myCourses assignment page — “Project 3: Interview Practices, Due: Nov 26” with orange course tiles — shown on a laptop",
    },
    // [] = text-only section (no media block, no placeholder)
    sections: {
      "Project Overview": [
        { type: "image", src: "/projects/rit-mycourses/example%203.png", width: 2048, height: 1227, alt: "RIT myCourses redesign on a laptop — orange course tiles for ID, MD, T, PP and UX" },
      ],
      "The Problem": [],
      "The Challenge": [],
      "Key Decisions": [
        { type: "image", src: "/projects/rit-mycourses/example%201.png", width: 1024, height: 769, alt: "RIT myCourses redesign on a tablet — upcoming assignment, course tiles and the Fall 2024 calendar" },
      ],
      "Results & Impact": [
        { type: "image", src: "/projects/rit-mycourses/example%202.png", width: 1024, height: 768, alt: "RIT myCourses redesign on a laptop — Fall 2024 calendar with deadlines" },
      ],
      "Learnings": [],
    },
  },
  ecoviz: {
    // Hero — tall 954×1648 poster: shown as a centered square crop (all five
    // phones) over a blurred copy, in the 16:9 frame (see .csp[data-case="ecoviz"] in case.css)
    hero: {
      type: "image",
      src: "/projects/ecoviz/ECOVIZ%20landing.png",
      width: 954,
      height: 1648,
      aspect: "16 / 9",
      alt: "Five iPhones showing the ECOVIZ experiences — DropPulse, SolarTrace, the ECOVIZ home screen, BreatheGrid and FrostBloom — on a soft gradient",
    },
    // pairs share one 4:5 frame (cover) so both images match in height;
    // the abstract textures crop safely. [] = text-only section.
    sections: {
      "Project Overview": [
        { type: "image", src: "/projects/ecoviz/ecoviz%20app%20overview.png", width: 1920, height: 1170, alt: "ECOVIZ app overview — onboarding, home and detail screens for all four environmental experiences" },
      ],
      "The Problem": [
        { type: "image", src: "/projects/ecoviz/element%201.png", width: 800, height: 800, aspect: "4 / 5", alt: "Blue fluid texture — DropPulse rainfall visual" },
        { type: "image", src: "/projects/ecoviz/element%202.png", width: 1023, height: 1537, aspect: "4 / 5", alt: "Yellow fluid texture — SolarTrace solar energy visual" },
      ],
      "The Challenge": [],
      "Key Decisions": [],
      "Results & Impact": [
        { type: "image", src: "/projects/ecoviz/element%203.png", width: 1023, height: 1537, aspect: "4 / 5", alt: "Purple fluid texture — environmental visual study" },
        { type: "image", src: "/projects/ecoviz/element%204.png", width: 800, height: 800, aspect: "4 / 5", alt: "Green fluid texture — BreatheGrid air quality visual" },
      ],
      "Learnings": [],
    },
  },
  "visa-financial-insights": {},
  "bcg-x": {},
  fennec: {
    // [] = text-only section (no media block, no placeholder)
    sections: { "Project Overview": [] },
  },
  "prompt-direction": {},
  "zf-diary": {},
};

/** Work-index project id (lib/content.ts PROJECTS) → media folder. */
export const PROJECT_ID_TO_SLUG: Record<string, ProjectSlug> = {
  "001": "parallel",
  "002": "ecoviz",
  "003": "tapgo",
  "004": "restify",
  "005": "rit-mycourses",
  "006": "visa-financial-insights",
  "007": "fennec",
  "008": "prompt-direction",
  "009": "bcg-x",
};

export function mediaFor(slug: ProjectSlug | undefined): ProjectMedia {
  return (slug && PROJECT_MEDIA[slug]) || {};
}

export function mediaForProjectId(id: string): ProjectMedia {
  return mediaFor(PROJECT_ID_TO_SLUG[id]);
}
