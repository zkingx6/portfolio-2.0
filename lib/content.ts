import type {
  Category,
  EducationItem,
  ExperienceItem,
  PlaygroundItem,
  Principle,
  Project,
  ResumeWorkItem,
  SkillGroup,
  TraceDef,
} from "./types";

export const EMAIL = "rongerzionx@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;

export const CATEGORY_NAMES = [
  "",
  "Product & UX/UI Design",
  "Data & Systems",
  "Design & Development",
  "Visual Communication",
  "The Playground",
];

export const CATEGORIES: Category[] = [
  {
    title: "Product & UX/UI Design",
    count: "04",
    status: "Product Design / UX/UI",
    names: ["BCG BY FORAGE", "RIT MYCOURSES", "RESTIFY", "TAPGO"],
    rotate: "-1.5deg",
  },
  {
    title: "Data & Systems",
    count: "03",
    status: "Data / Algorithms",
    names: ["VISA FINANCIAL INSIGHTS", "PARALLEL", "ECOVIZ"],
    rotate: "1.2deg",
  },
  {
    title: "Design & Development",
    count: "02",
    status: "Development / AI",
    names: ["PARALLEL", "PROMPT DIRECTION"],
    rotate: "-0.8deg",
  },
  {
    title: "Visual Communication",
    count: "02",
    status: "Branding / Graphic Design",
    names: ["VISA FINANCIAL INSIGHTS", "FENNEC"],
    rotate: "1.5deg",
  },
  {
    title: "The Playground",
    count: "02",
    status: "Creative Coding",
    names: ["ZF DIARY APP", "LITTLE THINGS"],
    rotate: "-3deg",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "006",
    name: "Visa Financial Insights",
    tags: "Financial Data Visualization",
    status: "[Self-initiated]",
    categories: [2, 4],
    d1: "Financial data visualization.",
    d2: "A self-initiated project.",
    pageSlug: "visa-financial-insights",
    hasPage: true,
  },
  {
    id: "007",
    name: "Fennec",
    tags: "Website / E-commerce / Visual Communication",
    status: "[Ongoing]",
    categories: [4],
    d1: "Website, e-commerce and digital visual communication.",
    d2: "Ongoing work.",
    pageSlug: "fennec",
    hasPage: true,
  },
  {
    id: "001",
    name: "Parallel",
    tags: "SaaS Product / UX/UI / Next.js / Supabase",
    status: "[B2B SaaS]",
    categories: [3, 2],
    d1: "A SaaS product spanning UX/UI and a full-stack build.",
    d2: "Built with Next.js and Supabase; deployed as an MVP.",
    pageSlug: "parallel",
    hasPage: true,
  },
  {
    id: "009",
    name: "BCG by Forage",
    tags: "Banking UX Research / Experience Strategy",
    status: "[Forage Simulation]",
    categories: [1],
    d1: "Developed a UX research framework encompassing participant screening, surveys, personas, and 5+ customer pain points for a simulated banking-product challenge.",
    d2: "Synthesized research findings into actionable product opportunities, translating customer needs into a Figma case study emphasizing experience strategy and UX storytelling.",
    pageSlug: "bcg-x",
    hasPage: true,
  },
  {
    id: "002",
    name: "EcoViz",
    tags: "Interactive Environmental Data Visualization",
    status: "[MFA Thesis]",
    categories: [2],
    d1: "Interactive environmental data visualization.",
    d2: "My MFA thesis, built around four climate data systems: rainfall, air, snowfall, solar.",
    pageSlug: "ecoviz",
    hasPage: true,
  },
  {
    id: "005",
    name: "RIT MyCourses Redesign",
    tags: "Learning Experience Design",
    status: "[Redesign]",
    categories: [1],
    d1: "Learning experience design.",
    d2: "A redesign of RIT MyCourses.",
    pageSlug: "rit-mycourses",
    hasPage: true,
  },
  {
    id: "004",
    name: "Restify",
    tags: "Sleep Wellness UX",
    status: "[Design System]",
    categories: [1],
    d1: "Sleep wellness UX.",
    d2: "Documented as a design system.",
    pageSlug: "restify",
    hasPage: true,
  },
  {
    id: "003",
    name: "TapGo",
    tags: "Accessibility-focused Mobile UX",
    status: "[Case Study]",
    categories: [1],
    d1: "Accessibility-focused mobile UX.",
    d2: "Presented as a case study.",
    pageSlug: "tapgo",
    hasPage: true,
  },
  {
    id: "008",
    name: "Prompt Direction",
    tags: "AI Direction / Prompt Design",
    status: "[Process]",
    categories: [3],
    d1: "A working log of how I direct AI to design and build — the prompts, the cuts, and what shipped.",
    d2: "Prompting is a skill. Anyone can talk to AI. Being specific is experience.",
    d2s: "font-size:14px;color:var(--c-muted)",
    pageSlug: "prompt-direction",
    hasPage: true,
  },
];

export const PLAYGROUND: PlaygroundItem[] = [
  {
    name: "ZF Diary App",
    tags: "SwiftUI / Personal",
    status: "[In Progress]",
  },
  {
    name: "Little Things",
    tags: "Creative Coding / Design",
    status: "[Ongoing]",
  },
];

export const TRACE: TraceDef = {
  id: "TRACE 001",
  steps: [
    {
      k: "INPUT",
      segs: [
        {
          t: "“The RX ZION stamp isn’t me. Give me a mark that can light up and breathe.”",
          tone: "b",
        },
      ],
    },
    {
      k: "DIRECTING",
      segs: [
        { t: "Killed the stamp. Chose ", tone: "" },
        { t: "dot-matrix RX", tone: "o" },
        {
          t: " over crosshair, code-bracket, and ligature options — it unifies logo, nav icon, and the hero dot grid into one system.",
          tone: "",
        },
      ],
    },
    {
      k: "SPEC",
      segs: [
        { t: "5×6", tone: "b" },
        { t: " dot maps, R in Warm White, X in ", tone: "" },
        { t: "Signature Orange", tone: "o" },
        { t: ". ", tone: "" },
        { t: "Sweep", tone: "o" },
        { t: " on load (", tone: "" },
        { t: "40ms", tone: "b" },
        { t: " stagger), X ", tone: "" },
        { t: "breathes", tone: "o" },
        { t: " at ", tone: "" },
        { t: "2.6s", tone: "b" },
        { t: ". ", tone: "" },
        { t: "Lit dots only", tone: "o" },
        { t: " — no grey field, no name text in the header.", tone: "" },
      ],
    },
    {
      k: "OUTPUT",
      segs: [
        { t: "The ", tone: "" },
        { t: "header mark", tone: "o" },
        { t: " now at the top of this page.", tone: "" },
      ],
    },
  ],
};

/* ASK RX search index — project id → explicit keywords, aliases and names.
   Matching is whole-phrase only (see findProjects), so "ai" never hits "email".
   Playground items are intentionally not indexed. Order = result order. */
export const ASK_INDEX: [string, string[]][] = [
  ["003", ["tapgo", "tap go", "ux/ui", "product design", "interaction", "interaction design", "mobile"]],
  ["004", ["restify", "ux/ui", "product design", "wellness", "sleep", "mobile"]],
  ["005", ["rit mycourses", "rit mycourses redesign", "mycourses", "rit", "ux/ui", "product design", "education", "learning", "lms", "accessibility"]],
  ["009", ["bcg by forage", "bcg x forage", "bcg", "forage", "ux/ui", "product design", "strategy"]],
  ["002", ["ecoviz", "data visualization", "data viz", "sustainability", "climate", "environment", "thesis"]],
  ["006", ["visa financial insights", "visa", "fintech", "finance", "financial", "payments", "data visualization", "data viz"]],
  ["001", ["parallel", "vibe coding", "product design", "b2b saas", "saas", "ai", "ai workflows", "development", "algorithms", "algorithm"]],
  ["007", ["fennec", "ux/ui", "web design", "branding", "brand", "visual design", "website", "ecommerce"]],
  ["008", ["prompt direction", "vibe coding", "ai", "development", "prompting", "prompt", "prompts", "creative technology", "creative tech"]],
];

/* Synonyms collapsed to one canonical keyword before matching. */
const ASK_ALIASES: [RegExp, string][] = [
  [/\b(ux\/ui|ui\/ux|uxui|uiux|ux ui|ui ux|ux|ui)\b/g, "ux/ui"],
  [/\b(dataviz|data visualisation)\b/g, "data visualization"],
  [/\be commerce\b/g, "ecommerce"],
  [/\bvibecoding\b/g, "vibe coding"],
];

export const ASK_CHIPS = ["PRODUCT DESIGN", "UI/UX DESIGN", "FINTECH", "DATA VIZ", "VIBE CODING"];

export const TICKER =
  "Product Design  ✦  UX / UI  ✦  Interaction  ✦  Creative Technology  ✦  AI-powered Experiences  ✦  Fintech  ✦  Data Visualization  ✦  HTML · CSS · JS · React  ✦  Digital Systems  ✦  ";

export const SKILLS: SkillGroup[] = [
  {
    num: "01",
    title: "Product & UX/UI",
    chips: [
      // ordered for two balanced rows at laptop widths
      "Product Design",
      "User Research",
      "Information Architecture",
      "Wireframing",
      "Prototyping",
      "UX/UI Design",
      "Interaction Design",
      "Design Systems",
      "Accessibility",
      "Usability Testing",
    ],
  },
  {
    num: "02",
    title: "Visual & Creative",
    chips: [
      "Visual Communication",
      "Brand Design",
      "Graphic Design",
      "Web Design",
      "E-Commerce Design",
      "Data Visualization",
      "Typography",
      "Motion Design",
      "3D Visualization",
      "Editorial Design",
    ],
  },
  {
    num: "03",
    title: "Design Tools",
    chips: [
      "Figma",
      "Framer",
      "Adobe Creative Cloud",
      "Cinema 4D",
      "Spline",
      "Miro",
      "Microsoft Office",
    ],
  },
  {
    num: "04",
    title: "Technical",
    chips: [
      "HTML / CSS",
      "JS / TS",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Supabase",
      "GitHub",
      "Vercel",
    ],
  },
  {
    num: "05",
    title: "AI & Workflows",
    chips: [
      "AI-Assisted Prototyping",
      "Design-to-Code",
      "Cursor",
      "ChatGPT",
      "Claude",
      "Gemini",
    ],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    num: "01",
    when: "Apr 2026 – Oct 2026",
    where: "New York, NY",
    title: "Web Design and Visual Communication Intern · United Nations",
    body: "Translated complex organizational information into accessible web layouts, infographics, and event communications, improving visual hierarchy across multiple deliverables. Refined digital and print materials through stakeholder feedback, maintaining consistent visual standards and supporting cross-functional communication initiatives.",
    chips: [
      "Infographics",
      "Event communications",
      "Accessible web layouts",
      "Print & digital",
    ],
  },
  {
    num: "02",
    when: "Dec 2025 – Dec 2026",
    where: "Remote",
    title: "Product Designer · Zion Creative Studio, LLC",
    body: "Led independent product design workflows spanning research, user flows, wireframes, interactive prototypes, and responsive implementation across web and mobile experiences. Integrated Figma, React, Next.js, and AI-assisted development workflows to build reusable components and translate design concepts into functional interfaces.",
    chips: [
      "Figma",
      "React",
      "Next.js",
      "AI-assisted development",
      "Responsive design",
    ],
  },
  {
    num: "03",
    when: "Aug 2024 – Dec 2025",
    where: "Rochester, NY",
    title: "Website Experience & Branding Designer · Spotlight Creators, LLC",
    body: "Increased user engagement 15% and conversions 10% through responsive web design, brand storytelling, and conversion-focused digital experiences. Accelerated design delivery 25% through Figma prototyping, reusable visual assets, and streamlined design-to-development collaboration.",
    chips: [
      "Figma",
      "Responsive web design",
      "Brand storytelling",
      "Prototyping",
      "Design-to-development",
    ],
  },
];

export const RESUME_WORK: ResumeWorkItem[] = [
  {
    num: "01",
    when: "Jul 2026",
    title: "Visa Financial Insights",
    role: "Information & Visual Designer / Financial Data Visualization & Digital Editorial Experience",
    p1: "Transformed public financial reports into an interactive digital narrative, integrating financial KPIs, data visualizations, and scroll-based storytelling to clarify complex information.",
    p2: "Established a cohesive visual system across charts, typography, iconography, and responsive editorial layouts, strengthening information hierarchy and financial storytelling.",
  },
  {
    num: "02",
    when: "Jun 2026",
    title: "Fennec",
    role: "Brand, Web & Marketing Designer / Integrated Brand & E-Commerce Experience",
    p1: "Built a cohesive consumer brand experience across e-commerce, website design, social media, marketing campaigns, event materials, and physical product touchpoints.",
    p2: "Produced responsive web layouts, promotional graphics, and branded communications, iterating visual concepts and messaging to support an evolving early-stage business.",
  },
  {
    num: "03",
    when: "Mar 2026",
    title: "Parallel",
    role: "Product Designer & Developer / 0→1 SaaS Product Design & Development",
    p1: "Launched a functional scheduling SaaS MVP in approximately 1 month, owning product strategy, UX/UI design, responsive workflows, and AI-assisted development.",
    p2: "Built and deployed reusable interfaces using Next.js, TypeScript, Tailwind CSS, and Supabase, evaluating usability, technical feasibility, and product demand through rapid iteration.",
  },
  {
    num: "04",
    when: "May 2025",
    title: "ECOVIZ",
    role: "Interaction & Visual Designer / Interactive Environmental Data Visualization",
    p1: "Created 4 interactive visualization systems translating rainfall, air quality, snowfall, and solar-energy data into immersive 3D, motion, and information-design experiences.",
    p2: "Integrated environmental research, interactive prototyping, Cinema 4D, and After Effects to explore data-driven storytelling across web and mobile concepts.",
  },
  {
    num: "05",
    when: "Oct 2024",
    note: "[Forage simulation]",
    title: "Boston Consulting Group by Forage",
    role: "Strategic & Experience Designer / Banking UX Research & Experience Strategy",
    p1: "Developed a UX research framework encompassing participant screening, surveys, personas, and 5+ customer pain points for a simulated banking-product challenge.",
    p2: "Synthesized research findings into actionable product opportunities, translating customer needs into a Figma case study emphasizing experience strategy and UX storytelling.",
  },
  {
    num: "06",
    when: "Jun 2024",
    title: "RIT myCourses Redesign",
    role: "UX/UI & Experience Designer / EdTech Learning Management System",
    p1: "Redesigned core learning-management workflows, simplifying navigation, assignment tracking, deadlines, and information architecture to improve access to academic content.",
    p2: "Established reusable UI components, progress indicators, and interaction states, creating a consistent design system focused on accessibility and reduced cognitive load.",
  },
  {
    num: "07",
    when: "Mar 2023",
    title: "Restify",
    role: "Product & UX/UI Designer / Consumer Mobile Wellness Experience",
    p1: "Developed a reusable mobile design system integrating typography, spacing, visual hierarchy, and interaction states to establish consistent sleep-wellness experiences.",
    p2: "Prototyped gesture-based interactions, motion transitions, and microinteractions to enhance interface feedback, nighttime accessibility, and mobile usability.",
  },
  {
    num: "08",
    when: "Dec 2019",
    title: "TapGo",
    role: "UX/UI Designer / Accessibility-First Consumer Mobile Application",
    p1: "Designed an end-to-end grocery-shopping experience for older adults, applying user research, journey mapping, information architecture, wireframing, and interactive prototyping.",
    p2: "Integrated 5 accessibility-focused features, including adjustable text, high-contrast themes, larger touch targets, guided onboarding, and simplified navigation.",
  },
];

export const EDUCATION: EducationItem[] = [
  {
    num: "01",
    when: "Graduation: Aug 2025",
    where: "Rochester, New York",
    title:
      "Master of Fine Arts, Visual Communication Design · Rochester Institute of Technology",
    honor: "Honorable Mention — Graphis New Talent 2025",
  },
  {
    num: "02",
    when: "Graduation: Jun 2023",
    where: "Los Angeles, California",
    title:
      "Bachelor of Arts, Design of Fashion · Fashion Institute of Design and Merchandising",
    honor: "Selected for Exhibition, FIDM Museum — Graduation Fashion Design",
  },
];

export const PRINCIPLES: Principle[] = [
  {
    num: "01",
    title: "Simplify the path, not the product.",
    body: "Remove unnecessary steps without removing what people actually need.",
    proof: "PROOF — 005 RIT MYCOURSES",
  },
  {
    num: "02",
    title: "Make data understandable.",
    body: "Turn complex information into clear, meaningful visual experiences.",
    proof: "PROOF — 002 ECOVIZ · 006 VISA",
  },
  {
    num: "03",
    title: "If users struggle, question the interface.",
    body: "Accessibility should be built into the experience, not added afterward.",
    proof: "PROOF — 003 TAPGO",
  },
  {
    num: "04",
    title: "Reframe before solving.",
    body: "Parallel began with availability. The real problem was fairness across time zones.",
    proof: "PROOF — 001 PARALLEL",
  },
  {
    num: "05",
    title: "Build to learn.",
    body: "Ship, test, and improve. Real feedback teaches more than endless polishing.",
    proof: "PROOF — 001 PARALLEL",
  },
  {
    num: "06",
    title: "Direct the tools, keep the taste.",
    body: "AI speeds up execution. I direct the vision, decisions, and final design.",
    proof: "PROOF — 008 PROMPT DIRECTION",
  },
];

export const RESUME_RAIL = [
  { id: "skills", num: "01", label: "Skills", sh: "SKILLS" },
  { id: "experience", num: "02", label: "Experience", sh: "EXP" },
  { id: "work", num: "03", label: "Selected work", sh: "WORK" },
  { id: "education", num: "04", label: "Education", sh: "EDU" },
] as const;

function normalizeAsk(q: string) {
  let t = q
    .toLowerCase()
    .replace(/[^a-z0-9/]+/g, " ") // drop punctuation, hyphens, &
    .replace(/\s*\/\s*/g, "/") // "ux / ui" → "ux/ui"
    .replace(/\s+/g, " ")
    .trim();
  for (const [re, canon] of ASK_ALIASES) t = t.replace(re, canon);
  return t;
}

/** Indexes into PROJECTS matching q, deduped, in ASK_INDEX order.
    An exact full-query keyword match wins ("ai workflows" → Parallel only);
    otherwise any keyword appearing in q as a whole phrase counts. */
export function findProjects(q: string): number[] {
  const t = normalizeAsk(q);
  if (!t) return [];
  const pick = (test: (k: string) => boolean) => {
    const out: number[] = [];
    for (const [id, keys] of ASK_INDEX) {
      if (!keys.some((k) => test(normalizeAsk(k)))) continue;
      const i = PROJECTS.findIndex((p) => p.id === id);
      if (i >= 0 && !out.includes(i)) out.push(i);
    }
    return out;
  };
  const exact = pick((k) => k === t);
  return exact.length ? exact : pick((k) => (" " + t + " ").includes(" " + k + " "));
}
