# Portfolio 2.0 — Handoff

Ronger Xu (Zion) personal site: Product Designer × Creative Technologist. Faithful Next.js port of two Claude Design HTML exports (now in `reference/`). Do not invent copy, links, or case studies. Do not restyle or reflow existing UI unless asked.

## Setup

- **Stack:** Next.js `16.4.3` App Router, React `19.3.0`, TypeScript, Tailwind CSS v4 (`@tailwindcss/turbopack`). No `src/` directory.
- **Run:** `npm install` then `npm run dev -- --hostname 127.0.0.1 --port 3000`. Routes: `/` (landing), `/resume`.
- **Entry:** `app/layout.tsx` (fonts + `globals.css`) → `app/page.tsx` → `LandingPage`; `app/resume/page.tsx` → `ResumePage`.
- **Read** `AGENTS.md` before writing Next.js code — this version’s APIs differ from older training data. Check `node_modules/next/dist/docs/`.

## File map (what to copy)

Copy these. Skip `node_modules/`, `.next/`, and OS junk. After copy: `npm install`.

```
package.json
package-lock.json
tsconfig.json
next.config.ts
next-env.d.ts
eslint.config.mjs
AGENTS.md
app/favicon.ico
app/layout.tsx
app/page.tsx
app/resume/page.tsx
app/globals.css
app/styles/landing.css
app/styles/resume.css
components/nav/SiteNav.tsx
components/nav/NavPill.tsx
components/nav/LogoMark.tsx
components/landing/LandingPage.tsx
components/landing/WorkSection.tsx
components/landing/AskTerminal.tsx
components/landing/DotConfigurator.tsx
components/landing/TracePanel.tsx
components/landing/CaseMotif.tsx
components/landing/ParallelGraphic.tsx
components/landing/EcoVizGraphic.tsx
components/landing/TapGoGraphic.tsx
components/landing/RestifyGraphic.tsx
components/landing/MyCoursesGraphic.tsx
components/landing/VisaGraphic.tsx
components/landing/FennecGraphic.tsx
components/landing/BcgGraphic.tsx
components/resume/ResumePage.tsx
components/resume/ResumeRail.tsx
lib/content.ts
lib/types.ts
lib/shapes.ts
lib/scroll.ts
lib/audio.ts
lib/logo.ts
lib/useDotField.ts
lib/useNavChrome.ts
lib/useReveal.ts
```

Optional (not required to run):

- `reference/` — original Claude HTML exports (landing + resume). Source of visual/copy fidelity.
- `HANDOFF.md` — this file.
- `public/*.svg` — unused create-next-app leftovers. Safe to ignore.

A true single-file `portfolio-handoff.html` is **not possible** without breaking behaviour (see end of this file).

## Pages and sections

### `/` Landing — `LandingPage`

| Region | Notes |
| --- | --- |
| `SiteNav` | Fixed chrome. Logo = dot-matrix RX. Tabs: Work (`#work`), Resume (`/resume`). |
| Hero `#top` | Canvas `#dotfield` (pointer-reactive dots), headline, subline, XY readout, `DotConfigurator` (density / radius / trail / accent / sound). |
| Ticker | Marquee from `TICKER` in `lib/content.ts`. |
| `AskTerminal` | Keyword search → jumps/highlights a Work row. Miss state is intentional copy + `[COMING SOON]`. |
| `WorkSection` `#work` | Five category drawers. Project rows expand in place. Hover preview `.pv` follows the pointer. |
| Now bar | “Now — Oct 2026 …” status line. |
| Contact `#contact` | Canvas `#dotfield2`, headline, portrait slot, email, footer. |

### `/resume` — `ResumePage`

Nav (Work → `/#work`, Resume → `#top`) + sticky `ResumeRail` for: Skills, Experience, Selected work, Education, Principles. Scroll-reveal via `useReveal`.

All copy lives in `lib/content.ts`. Change content there, not by hardcoding strings in components.

## Finished

- Both pages implemented and wired (nav, fonts, frame, scroll chrome).
- Hero dot field + configurator + click/hover audio (`lib/audio.ts`).
- Ask terminal + category drawers + row expand + Prompt Direction `TracePanel`.
- Hover preview: `position: fixed` at `clientX` / `clientY`, `transform: translate(-50%, -50%)`, `transform-origin: center`, `pointer-events: none`, `z-index: 5`. Follows on `mousemove` (no lerp). Applies to **every** project row.
- Dedicated drawer/hover SVG graphics (inline, `viewBox="0 0 1200 900"`, `id="*-graphic"`):

| Index | Project | Component | id |
| --- | --- | --- | --- |
| 0 | Parallel | `ParallelGraphic` | `parallel-graphic` |
| 1 | EcoViz | `EcoVizGraphic` | `ecoviz-graphic` |
| 2 | TapGo | `TapGoGraphic` | `tapgo-graphic` |
| 3 | Restify | `RestifyGraphic` | `restify-graphic` |
| 4 | RIT MyCourses Redesign | `MyCoursesGraphic` | `mycourses-graphic` |
| 5 | Visa Financial Insights | `VisaGraphic` | `visa-graphic` |
| 6 | Phoenix / Fennec | `FennecGraphic` | `fennec-graphic` |
| 8 | BCG Banking App | `BcgGraphic` | `bcg-graphic` |

These use flush wrappers `.pv.pv-pg` / `.inl.inl-pg`: rendered box = the dark `#1C1C1C` panel only (no `#242424` letterbox, no extra band). Desktop hover preview is 280×210 (4:3). Inline `.inl` shows only at ≤760px.

- Resume page content and rail behaviour complete as exported.
- Work row titles no longer show 01–05 numerals.

## Pending / placeholder — do not “fill in” unless asked

- **Prompt Direction (index 7)** still uses `projectShapes(7)` (CSS boxes in a 4:5 `#242424` slot). No `PromptDirectionGraphic` yet. Wire it the same way as the others when replacing.
- **Portrait** in `#contact` is an empty `#1C1C1C` frame labelled `[ Portrait ]`.
- **Footer** `[LINKEDIN] · [GITHUB]` is literal placeholder text — no URLs.
- **Ask miss** line includes `[COMING SOON]` by design.
- **Playground** rows have no expand drawer and no graphic.
- **No case-study routes.** Rows only expand in the drawer (`d1` / `d2` + optional trace). Several `d1`/`d2` lines are still short compared with resume work blurbs (Parallel, EcoViz, TapGo, Restify, MyCourses, Visa, Fennec). BCG already has fuller copy. Do not invent longer copy.
- `public/*.svg` and default `README.md` are leftover scaffold, unused by the site.
- `lib/shapes.ts` leftovers for indices 0–6 and 8 are unused once those graphics are wired; keep the function for index 7 (and any future non-flush project).

## Conventions a new builder must not break

### Colour (use these hexes; do not introduce a new accent)

| Token | Hex | Role |
| --- | --- | --- |
| Ink | `#101010` | Page background |
| Paper / warm white | `#F4F1EA` | Body text, some graphic squares |
| Muted | `#A8A59E` | Meta, mono labels |
| Signature orange | `#FF6A24` | Accent; at most **one** orange focus in each project graphic |
| Ice | `#91C9F7` | Secondary accent |
| Panel | `#1C1C1C` | Graphic panel fill, portrait slot |
| Line | `#242424` | Rules, non-flush preview fill |
| Stroke | `#3F3D3A` / `#3a3a3a` | Graphic panel stroke, card borders |

Also in `@theme` (`app/globals.css`): `--color-ink/paper/muted/orange/ice/panel/line`.

### Type

- Body: **Inter Tight** (`--font-inter-tight` via `next/font/google`).
- Labels / status / ticker: **JetBrains Mono** (`.mono`, `--font-jetbrains-mono`).
- Do not swap in Geist or another family.

### Motion

- Site ease: `cubic-bezier(.2, .7, .2, 1)`.
- Graphic animations: play **once** when the drawer/hover preview mounts; replay on the SVG `mouseenter` only (existing pattern). **No loops** on the new SVGs. `prefers-reduced-motion: reduce` → final still, no animation.
- Default CSS = still frame; `.is-anim` plays from `from` with `both` (orange grow+pulse: second animation must be `forwards`, not `both`).

### Work graphics (when replacing the next one)

1. Replace **only** that project’s graphic. Do not touch other graphics, row layout, text, or spacing.
2. Name `XxxGraphic`, `id="xxx-graphic"`, inline SVG, `viewBox="0 0 1200 900"`, `width="100%"` `height="auto"`, `role="img"`.
3. Panel: `rect x=1 y=1 width=1198 height=898 fill #1C1C1C stroke #3F3D3A stroke-width 2`. Sharp corners. No text, numbers, icons, or fake app UI.
4. Size rule: component box = dark panel box. Add the project index to `isFlushGraphic` + `ProjectGraphic` in `WorkSection.tsx`, and the class name to the shared display list in `landing.css`.
5. Wire `key={"inl-"+i}` / `key={"pv-"+hoverIndex}` so hover remounts the one-shot animation.
6. Hover preview stays centered on the pointer (do not revert to top-left or `preview.y - 175`).

### Other

- One category drawer open at a time. Category ids in `PROJECTS[].categories` are 1-based into `CATEGORY_NAMES`.
- Email: `rongerzionx@gmail.com` only. Do not add social URLs that are not in the source.
- Logo is the 5×6 RX dot matrix (`lib/logo.ts` + `LogoMark`), not a wordmark.
- Next overlay may warn about kebab `aspect-ratio` vs React `aspectRatio` inside `projectShapes` — pre-existing; ignore unless asked.

## Why there is no `portfolio-handoff.html`

This is not a static HTML/CSS/JS page. Behaviour that cannot survive a dump-into-one-file without a rewrite:

- Two App Router pages and client `Link` navigation
- React state (drawers, ask, hover preview, nav pill, resume rail)
- `next/font` + Tailwind v4 pipeline
- Two canvases (`useDotField`) and Web Audio (`lib/audio.ts`)
- Per-graphic `useEffect` one-shot CSS animations + `prefers-reduced-motion`

Inlining a crawl of `/` would freeze one route and drop the rest. Continue in this Next.js tree; copy the file list above.
