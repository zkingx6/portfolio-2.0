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
               Sections without media keep their dashed placeholder.
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
  tapgo: {},
  restify: {},
  "rit-mycourses": {},
  ecoviz: {},
  "visa-financial-insights": {},
  "bcg-x": {},
  fennec: {},
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
