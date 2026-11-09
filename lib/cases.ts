import type { ProjectSlug } from "./projectMedia";
import type { ExternalCase } from "@/components/case/ExternalPreview";
import { CATEGORY_NAMES, PROJECTS, RESUME_WORK } from "./content";

/* Case study content — one object per project page.
   Template: components/case/CaseStudyPage.tsx. Edit copy here, not in JSX. */

export type CaseStat = { value: string; unit: string; label: string };

export type CaseSection = {
  label: string;
  /** Collapsed one-liner — must carry the story on its own. */
  summary: string;
  /** Expanded paragraphs. */
  body?: string[];
  /** Expanded decision bullets (rendered after body). */
  points?: string[];
  /** Metrics strip — the only orange on the page. */
  stats?: CaseStat[];
};

export type CaseMeta = { label: string; value: string; ice?: boolean };

export type CaseStudy = {
  id: string;
  /** Media folder key in lib/projectMedia.ts (public/projects/<slug>/). */
  slug?: ProjectSlug;
  /** Optional external case study shown as the hero card (replaces the 16:9 slot). */
  external?: ExternalCase;
  /** Optional wider subtitle (CSS length) for longer outcomes; default is 44ch. */
  outcomeMaxWidth?: string;
  /** false = expanded sections are text-only (no media block or placeholder). Default true. */
  showSectionMedia?: boolean;
  /** Optional project-specific hero composition (replaces the hero media). */
  heroDesign?: "tapgo-phones";
  /** Optional compact external button pinned to the hero media (bottom-right). */
  heroCta?: { label: string; href: string; ariaLabel: string };
  /** Optional live link, shown as an extra row under Role (row title defaults to "Live Product"). */
  live?: { label: string; href: string; title?: string };
  name: string;
  type: string;
  outcome: string;
  /** Breadcrumb trail after "← Work /". */
  crumb: string;
  /** Position in the case sequence, e.g. 1 of 9. */
  caseNo: number;
  caseTotal: number;
  /** Meta band: four cells (Visa layout), then a full-width Role row. */
  meta: CaseMeta[];
  role: string;
  sections: CaseSection[];
  /** href is optional — omit for projects without a page yet (renders as plain text). */
  next: { id: string; name: string; href?: string };
};

export const PARALLEL: CaseStudy = {
  id: "001",
  slug: "parallel",
  name: "Parallel",
  type: "[0\u21921 Product]",
  outcome:
    "Designed and built a 0\u21921 SaaS meeting scheduler that balances availability with long-term fairness across time zones, taking the product from hypothesis to a deployed MVP and early validation.",
  outcomeMaxWidth: "64ch",
  crumb: "Products & Experiences",
  caseNo: 1,
  caseTotal: 9,
  meta: [
    { label: "Scope", value: "Product Strategy · UX/UI · Development · Validation" },
    { label: "Service", value: "Product Design & Development" },
    { label: "Category", value: "SaaS / AI-Assisted Development", ice: true },
    { label: "Date", value: "2026" },
  ],
  role: "Product Designer / Builder",
  live: { label: "parallelflow.app", href: "https://parallelflow.app" },
  showSectionMedia: false,
  heroCta: {
    label: "Explore live product",
    href: "https://www.parallelflow.app/",
    ariaLabel: "Explore the live Parallel product (opens in a new tab)",
  },
  sections: [
    {
      label: "Project Overview",
      summary:
        "Designed and built a 0\u21921 SaaS product that distributes inconvenient meeting times more fairly across global teams through recurring scheduling.",
      body: [
        "Parallel is an independently designed and developed meeting scheduler for distributed teams. Unlike tools focused solely on availability, it considers how scheduling inconvenience accumulates across recurring meetings. I took the product from hypothesis and UX/UI design through AI-assisted development, deployment, and early validation in approximately one month.",
      ],
    },
    {
      label: "The Problem",
      summary:
        "Traditional scheduling prioritizes availability, often overlooking how early or late meetings repeatedly disadvantage the same team members.",
      body: [
        "For global teams, finding a time everyone can attend does not guarantee fairness. Participants in certain time zones may consistently accommodate inconvenient hours. Parallel reframes scheduling from finding a single workable time to distributing meeting burden more intentionally across multiple weeks.",
      ],
    },
    {
      label: "The Challenge",
      summary:
        "Translated an abstract fairness concept into understandable scheduling workflows while balancing time-zone constraints, algorithmic complexity, and MVP scope.",
      body: [
        "Fairness is difficult to quantify when team members have different working hours, availability, and time-zone boundaries. The challenge was designing a scheduling system that could evaluate these constraints, distribute inconvenience where feasible, and explain its decisions clearly\u2014while keeping the product intuitive enough for everyday use.",
      ],
    },
    {
      label: "Key Decisions",
      summary:
        "Built a fairness-aware rotation engine, prioritized transparent scheduling decisions, and used AI-assisted development to rapidly test the product hypothesis.",
      body: [
        "I designed an end-to-end workflow for creating teams, defining availability, generating rotations, and reviewing schedules. The scheduling engine considers working hours, hard boundaries, and accumulated meeting burden across weeks. Fairness scores, sacrifice timelines, and scheduling explanations make algorithmic decisions visible. I used Next.js, TypeScript, Supabase, and AI-assisted coding tools to build and refine the functional MVP.",
      ],
    },
    {
      label: "Results & Impact",
      summary:
        "Shipped a functional SaaS MVP in approximately one month and gained early validation insights showing fairness was a meaningful but lower-priority user need.",
      body: [
        "Delivered a deployed web application with team management, recurring meeting rotation, and fairness analysis. The product demonstrated technical feasibility and an end-to-end design-to-development workflow. Early validation suggested that scheduling fairness was often perceived as a nice-to-have rather than an urgent problem, helping me reassess the opportunity before investing further.",
      ],
      stats: [
        { value: "4–12", unit: "Weeks", label: "Fair meeting rotations generated" },
        { value: "20", unit: "Members", label: "Supported per Pro team" },
        { value: "4", unit: "Modes", label: "Scheduling modes" },
      ],
    },
    {
      label: "Learnings",
      summary:
        "Learned that building a functional product validates technical feasibility, but meaningful product success also requires evidence of genuine user demand.",
      body: [
        "Parallel taught me to separate successful execution from product-market need. AI-assisted development accelerated the journey from concept to working software, but building quickly did not guarantee demand. The most valuable outcome was learning to use early validation to challenge my assumptions and guide future product decisions.",
      ],
    },
  ],
  next: { id: "002", name: "EcoViz", href: "/work/ecoviz" },
};

export const PROMPT_DIRECTION: CaseStudy = {
  slug: "prompt-direction",
  id: "008",
  name: "Prompt Direction",
  type: "[Vibe Coding]",
  // verbatim thesis from brief
  outcome:
    "Prompting is a skill — anyone can talk to AI, but being personalized and specific takes experience and practice.",
  crumb: "Design & Build",
  caseNo: 8,
  caseTotal: 9,
  meta: [
    // [DRAFT] Scope value — edit to finalise
    { label: "Scope", value: "Ongoing Method" },
    // [DRAFT] Service value — edit to finalise
    { label: "Service", value: "AI Direction & Process" },
    // [DRAFT] Category value — edit if project recategorises
    { label: "Category", value: "The Playground", ice: true },
    { label: "Date", value: "2026" },
  ],
  // [DRAFT] Role — brief: "AI Workflow Designer"; edit to finalise
  role: "AI Workflow Designer",
  sections: [
    {
      label: "Project Overview",
      summary:
        "The directing method behind every project on this site — live, annotated, and testable.",
      body: [
        "Every project on this site was built the same way: specific audience, concrete constraints, taste references, kill rules. Prompt Direction is the annotated version of that method — not a description of it.",
      ],
    },
    {
      label: "The Problem",
      summary:
        "Vague prompt in. Generic output out. The tool is not the differentiator — the direction is.",
      body: [
        "Everyone runs the same models. The bottleneck is not access — it is direction. 'Make me a fintech hero' and 'make me a fintech hero for first-time investors, calm tone, no gradients, Linear's restraint' run on identical infrastructure. One produces the same blue gradient every portfolio already has. The other doesn't.",
      ],
    },
    {
      label: "The Challenge",
      summary:
        "The directing moves are invisible. Taste filters, constraint rules, kill decisions — not the prompt itself — are the skill.",
      body: [
        "Good AI direction looks effortless from the outside. The output is visible — not the taste filter that blocked the blue gradient, the kill rule that ended the first pass, or the reference that made the tone specific. This page makes those decisions visible.",
      ],
    },
    {
      label: "Key Decisions",
      summary:
        "Three directing failures, one task — the comparison isolates the variable.",
      points: [
        "RULE 01 — Fair fight: same task, identical scope across all three. Only the direction changes — this isolates the variable.",
        "RULE 02 — Label what it is: 'SCRIPTED DEMO' — not a live model. Honesty about the method includes honesty about the exhibit.",
        "RULE 03 — Make it testable: a scoring terminal lets you run your own prompts against the method. An exhibit that can't be challenged isn't evidence.",
        "RULE 04 — Name the move: each annotation tag (AUDIENCE, CONSTRAINT, TASTE, REFERENCE, KILL RULE) is a directing decision made legible.",
      ],
    },
    {
      label: "Results & Impact",
      summary:
        "Every project on this site was directed this way — not prompted vaguely.",
      body: [
        "Parallel's product copy. The Visa data visualizations. This site's visual identity. Each was briefed with the same anatomy: audience, constraint, taste reference, kill rule. Prompt Direction is not a side project — it is the process beneath all of them.",
      ],
    },
    {
      label: "Learnings",
      // [DRAFT] summary — per brief
      summary:
        "Specificity is a skill. Taste is a constraint. A killed first pass is a result.",
      body: [
        "Vague inputs produce vague outputs — and that is always the prompter's fault, not the model's. Taste is a negative constraint: 'not a gradient, not a stock photo, not generic fintech blue' is harder to articulate than 'make it look good' — but it is the only brief that gets a distinctive result.",
      ],
    },
  ],
  // [DRAFT] next — 009 BCG Banking App has no page yet; href omitted → renders as plain text (never link to a nonexistent page)
  next: { id: "009", name: "BCG Banking App" },
};

// ── Project catalog — ordered 001–009, used by ProjectIndex ──────────────────

export type CatalogEntry = {
  id: string;
  name: string;
  /** Status tag displayed verbatim, e.g. "[Deployed MVP]" */
  type: string;
  /** Present only for projects with a live page. Never add a href for a page that doesn't exist. */
  href?: string;
};

export const CATALOG: CatalogEntry[] = [
  { id: "001", name: "Parallel",               type: "[Deployed MVP]",    href: "/work/parallel" },
  { id: "002", name: "EcoViz",                 type: "[MFA Thesis]",        href: "/work/ecoviz" },
  { id: "003", name: "TapGo",                  type: "[Case Study]",        href: "/work/tapgo" },
  { id: "004", name: "Restify",                type: "[Design System]",     href: "/work/restify" },
  { id: "005", name: "RIT MyCourses Redesign", type: "[Redesign]",          href: "/work/rit-mycourses" },
  { id: "006", name: "Visa Financial Insights", type: "[Self-initiated]",   href: "/work/visa-financial-insights" },
  { id: "007", name: "Fennec",                 type: "[Ongoing]",           href: "/work/fennec" },
  { id: "008", name: "Prompt Direction",       type: "[Vibe Coding]",     href: "/work/prompt-direction" },
  { id: "009", name: "BCG by Forage",          type: "[Forage Simulation]", href: "/work/bcg-x" },
];

// ── Standard case studies (Parallel template) ─────────────────────────────────
/* Every standard project renders through components/case/CaseStudyPage.tsx via
   app/work/[slug]/page.tsx. Content below is assembled ONLY from copy already on
   the site (Work index in PROJECTS, Resume in RESUME_WORK). Everything else is a
   visible [CONTENT TBD] placeholder — replace it here, project by project.
   To write a project out fully, replace its draftCase() call with a hand-written
   CaseStudy object (like PARALLEL above). */

const TBD = "[CONTENT TBD]";
const SECTION_LABELS = [
  "Project Overview",
  "The Problem",
  "The Challenge",
  "Key Decisions",
  "Results & Impact",
  "Learnings",
] as const;

/** Six Parallel sections; only the overview carries verified copy for now. */
function draftSections(overview: { summary: string; body: string[] }): CaseSection[] {
  return SECTION_LABELS.map((label, i) =>
    i === 0 ? { label, summary: overview.summary, body: overview.body } : { label, summary: TBD },
  );
}

/** 001–009 order; 009 wraps to 001. */
function nextAfter(id: string): CaseStudy["next"] {
  const i = CATALOG.findIndex((c) => c.id === id);
  const n = CATALOG[(i + 1) % CATALOG.length];
  return { id: n.id, name: n.name, href: n.href };
}

function draftCase(slug: ProjectSlug, id: string, resumeTitle: string): CaseStudy {
  const p = PROJECTS.find((x) => x.id === id)!;
  const r = RESUME_WORK.find((x) => x.title === resumeTitle);
  const [role, area] = (r?.role ?? "").split(" / ");
  const year = r?.when.match(/\d{4}/)?.[0];
  return {
    slug,
    id,
    name: p.name,
    type: p.status,
    outcome: p.d1,
    crumb: CATEGORY_NAMES[p.categories[0]],
    caseNo: Number(id),
    caseTotal: CATALOG.length,
    meta: [
      { label: "Scope", value: TBD },
      { label: "Service", value: area || TBD },
      { label: "Category", value: p.tags, ice: true },
      { label: "Date", value: year ?? TBD },
    ],
    role: role || TBD,
    sections: draftSections({
      summary: r?.p1 ?? p.d2,
      body: r ? [r.p1, r.p2] : [p.d2],
    }),
    next: nextAfter(id),
  };
}

// ── 009 BCG by Forage — written case study sections ─────────────────────────
const BCG_SECTIONS: CaseSection[] = [
  {
    label: "Project Overview",
    summary:
      "Explored a hypothetical banking challenge through UX research, customer insights, and experience strategy in a BCG × Forage job simulation.",
    body: [
      "Completed the BCG Strategic & Experience Design Job Simulation through Forage in 2024, exploring how human-centered research could inform a new consumer banking experience.",
      "I developed a research framework covering participant screening, survey questions, customer behaviors, and personas. I later independently transformed the simulation work into a Figma case study, strengthening the visual storytelling and communication of strategic design decisions.",
    ],
  },
  {
    label: "The Problem",
    summary:
      "Designing a meaningful banking experience required understanding customer needs before defining the product itself.",
    body: [
      "The hypothetical banking client needed to explore opportunities for a new consumer product. However, the starting point was an ambiguous business challenge rather than a clearly defined user problem.",
      "Before proposing features or interfaces, I needed to investigate how consumers approached financial decisions, what frustrated them about existing experiences, and which unmet needs could reveal meaningful opportunities.",
      "The central question was: What problem is worth solving, and what evidence supports that direction?",
    ],
  },
  {
    label: "The Challenge",
    summary:
      "Built a structured research approach to turn an open-ended banking challenge into actionable customer insights.",
    body: [
      "The challenge was to establish a research process capable of connecting consumer behaviors with potential product opportunities, without jumping prematurely into interface design.",
      "I developed participant screening criteria, research questions, and a survey framework to investigate customer motivations, needs, and pain points. I then organized the research material into behavioral patterns, personas, and more than five pain points or opportunity areas.",
      "The goal was to move from broad assumptions toward clearer problem definitions that could guide concept development.",
    ],
  },
  {
    label: "Key Decisions",
    summary:
      "Prioritized evidence-based problem framing, connecting research patterns to product opportunities before exploring solutions.",
    body: [
      "Rather than treating research artifacts as the final deliverable, I structured the process around a clear progression: Evidence → Insight → Opportunity → Concept.",
      "I focused on identifying recurring customer needs, using personas to represent meaningful behavioral patterns, and translating those findings into potential directions for a consumer banking experience.",
      "When independently rebuilding the project in Figma, I also prioritized clearer information hierarchy and research visualization, making the reasoning behind each strategic recommendation easier to follow.",
    ],
  },
  {
    label: "Results & Impact",
    summary:
      "Delivered a research framework, personas, 5+ opportunity areas, and an independently redesigned Figma case study.",
    body: [
      "The simulation produced a structured research plan, participant screener, survey framework, personas, and a synthesis of more than five customer pain points or opportunity areas. These outputs supported the development of potential banking-product concepts.",
      "I later expanded the work into an independently designed Figma case study, improving how research findings, strategic opportunities, and design reasoning were communicated.",
      "As a simulated project, it did not generate measured business or product outcomes. Its value lies in demonstrating a research-led approach to product discovery and strategic experience design.",
    ],
  },
  {
    label: "Learnings",
    summary:
      "Learned to validate the problem before the solution, using research to guide design decisions rather than justify assumptions.",
    body: [
      "This project reinforced that experience design begins long before the first interface is created. Understanding customer behaviors, identifying missing evidence, and defining the right problem are essential parts of designing meaningful products.",
      "It also strengthened my ability to communicate strategic thinking through research synthesis, personas, and visual storytelling.",
      "The principle I carried forward was simple: Research is valuable when it changes a decision. The designer\u2019s responsibility is not only to propose what should be built, but to explain why that direction makes sense.",
    ],
  },
];

// ── 005 RIT MyCourses Redesign — written case study sections ──────────────
// Collapsed summary = each section's opening sentence; expanded = the rest.
const RIT_SECTIONS: CaseSection[] = [
  {
    label: "Project Overview",
    summary:
      "RIT myCourses is a learning management system supporting courses, assignments, deadlines, and academic communication.",
    body: [
      "Drawing on my firsthand experience as an RIT student, I redesigned core workflows to improve navigation, information hierarchy, and everyday usability while preserving essential functionality.",
      "The project covered UX evaluation, information architecture, interaction design, UI design, prototyping, and design-system development.",
    ],
  },
  {
    label: "The Problem",
    summary:
      "Academic information was distributed across multiple pages and navigation layers, creating unnecessary friction in everyday tasks.",
    body: [
      "Students needed easier access to assignments, deadlines, announcements, and course resources without losing the platform\u2019s existing capabilities.",
      "Design question: How can we make essential academic workflows simpler and more intuitive?",
    ],
  },
  {
    label: "The Challenge",
    summary:
      "The challenge was simplifying a feature-rich platform without removing functionality students and instructors depend on.",
    body: [
      "I evaluated recurring workflows to identify unnecessary steps, improve information prioritization, and make interactions more predictable.",
      "Core principle: Simplicity should reduce effort, not capability.",
    ],
  },
  {
    label: "Key Decisions",
    summary:
      "Prioritize information, simplify navigation, clarify assignments, improve collaboration, and systemize the UI.",
    points: [
      "01 — Prioritize information: Surface deadlines, assignments, announcements, and current course activity first.",
      "02 — Simplify navigation: Reduce unnecessary steps and make frequently accessed features easier to reach.",
      "03 — Clarify assignments: Improve requirements, action placement, progress indicators, and submission feedback.",
      "04 — Improve collaboration: Explore searchable discussions, pinned threads, and customizable course organization.",
      "05 — Systemize the UI: Create reusable components and consistent interaction patterns across the platform.",
    ],
  },
  {
    label: "Results & Impact",
    summary: "Produced a cohesive LMS redesign focused on improving everyday student workflows.",
    body: [
      "The project delivered simplified navigation, reorganized course information, clearer assignment interactions, enhanced discussion concepts, and a reusable UI design system.",
      "Together, these improvements demonstrate how a complex existing product can be made easier to navigate without sacrificing functionality.",
    ],
  },
  {
    label: "Learnings",
    summary:
      "This project reinforced that redesigning a product is about improving how it works, not simply how it looks.",
    body: [
      "I learned to question unnecessary steps, prioritize essential information, and balance simplicity with complex product requirements.",
      "Key takeaway: Minimalism should reduce effort, not capability.",
    ],
  },
];

// ── 004 Restify — written case study sections ─────────────────────────────
const RESTIFY_SECTIONS: CaseSection[] = [
  {
    label: "Project Overview",
    summary:
      "Designed a calming mobile wellness experience combining sleep awareness, intuitive interactions, and a consistent visual system.",
    body: [
      "Restify is a conceptual sleep and wellness app designed to support healthier nighttime routines. Originally created in 2023 and later refined, the project combines clear information hierarchy, reusable components, and thoughtful motion to create a focused, distraction-free mobile experience.",
    ],
  },
  {
    label: "The Problem",
    summary:
      "Many sleep and wellness apps overwhelm users with excessive data and complex interfaces, creating unnecessary cognitive load.",
    body: [
      "Sleep apps often prioritize scores, charts, and metrics over the experience of using them. For someone preparing for sleep, this information density can feel overstimulating. Restify explores how to communicate essential wellness information while maintaining clarity, focus, and a calmer nighttime experience.",
    ],
  },
  {
    label: "The Challenge",
    summary:
      "Balanced useful wellness functionality with a visually quiet interface that feels intuitive, engaging, and appropriate for nighttime use.",
    body: [
      "The challenge was creating an interface that feels calm without sacrificing functionality or engagement. I explored how typography, spacing, contrast, and motion could guide attention while minimizing distractions. Every interaction needed to feel purposeful rather than adding unnecessary stimulation.",
    ],
  },
  {
    label: "Key Decisions",
    summary:
      "Built a reusable mobile design system and introduced subtle motion, clear typography, and gesture-based interactions to support a cohesive experience.",
    body: [
      "I prioritized essential information through clear typography and controlled visual density. A reusable component system established consistency across screens, while subtle transitions and microinteractions communicated feedback and state changes. Gesture-based interactions added responsiveness without compromising the calm visual direction.",
    ],
  },
  {
    label: "Results & Impact",
    summary:
      "Delivered a refined mobile wellness concept with a scalable design system, cohesive interaction patterns, and purposeful motion design.",
    body: [
      "Created a cohesive conceptual mobile experience with reusable components, consistent interaction states, and nighttime-focused visual design. Later substantially refined the original project through stronger typography, motion, and microinteractions, demonstrating growth in mobile UI craftsmanship and system-based design.",
    ],
  },
  {
    label: "Learnings",
    summary:
      "Learned that thoughtful motion, typography, and component consistency are essential to creating intuitive and emotionally appropriate product experiences.",
    body: [
      "Restify reinforced that UI craftsmanship goes beyond visual polish. Typography, spacing, interaction feedback, and motion all shape usability. I learned to treat animation as functional communication and use reusable design patterns to maintain consistency as an experience grows.",
    ],
  },
];

// ── 003 TapGo — written case study sections ───────────────────────────────
const TAPGO_SECTIONS: CaseSection[] = [
  {
    label: "Project Overview",
    summary:
      "Created an accessibility-first grocery shopping concept inspired by my grandparents, focusing on older adults\u2019 independence and digital confidence.",
    body: [
      "TapGo began with observing the difficulties my grandparents faced using digital services. As an early self-initiated UX/UI project, I explored the complete design process, from user research and journey mapping to accessible mobile interfaces and prototyping. I later revisited and refined the experience with stronger design skills.",
    ],
  },
  {
    label: "The Problem",
    summary:
      "Conventional grocery apps often create barriers for older adults through small text, crowded screens, complex navigation, and unfamiliar interactions.",
    body: [
      "Many shopping apps assume users are comfortable with digital conventions and complex navigation. For older adults, small touch targets, dense information, and unclear feedback can make everyday tasks frustrating. These barriers can undermine confidence and make independent shopping unnecessarily difficult.",
    ],
  },
  {
    label: "The Challenge",
    summary:
      "Balanced accessibility, simplicity, and essential shopping functionality without creating an overly limited or patronizing experience.",
    body: [
      "The challenge was not simply making everything bigger. I needed to reduce cognitive and physical effort while preserving a complete grocery shopping experience. The interface had to accommodate varying levels of digital literacy, visual ability, and touch precision without assuming every older adult needed the same solution.",
    ],
  },
  {
    label: "Key Decisions",
    summary:
      "Prioritized readable typography, larger touch targets, simplified navigation, customizable accessibility settings, and guided onboarding.",
    body: [
      "I introduced adjustable text sizes, high-contrast themes, and larger interaction areas to support different accessibility needs. Task-focused navigation and guided onboarding reduced uncertainty, while clear feedback and an emergency-assistance feature provided additional support. These decisions made accessibility part of the overall product experience.",
    ],
  },
  {
    label: "Results & Impact",
    summary:
      "Delivered an end-to-end accessible grocery shopping concept with personalized settings, intuitive workflows, and a refined mobile interface.",
    body: [
      "Designed a complete conceptual shopping experience integrating accessibility across navigation, typography, interactions, and personalization. The project produced research artifacts, user flows, prototypes, and accessible UI patterns. Revisiting the concept later also allowed me to improve its visual consistency and interaction design.",
    ],
  },
  {
    label: "Learnings",
    summary:
      "Learned that inclusive design begins by questioning interface assumptions and empowering users rather than designing around their perceived limitations.",
    body: [
      "TapGo taught me that accessibility extends beyond font sizes and contrast. It requires understanding confidence, familiarity, cognitive load, and user control. Revisiting my earliest UX work also reinforced the importance of iteration and showed how stronger design thinking can improve an existing concept.",
    ],
  },
];

// ── 002 ECOVIZ — written case study sections ──────────────────────────────
const ECOVIZ_SECTIONS: CaseSection[] = [
  {
    label: "Project Overview",
    summary:
      "ECOVIZ reimagines environmental data as an interactive visual system, translating rainfall, air quality, snowfall, and solar energy into immersive 3D experiences.",
    body: [
      "Developed as my MFA thesis at Rochester Institute of Technology, ECOVIZ explores how environmental information can move beyond conventional charts, dashboards, and numerical interfaces. Through research, 3D visualization, motion, and interaction design, I created four connected experiences that translate environmental conditions into visual behaviors, making data more immediate, expressive, and perceptible.",
    ],
  },
  {
    label: "The Problem",
    summary:
      "Traditional weather interfaces rely heavily on numbers, charts, and technical terminology, requiring users to interpret information before understanding environmental conditions.",
    body: [
      "Weather applications often communicate conditions through precipitation percentages, AQI values, measurements, and dense forecasts. While these formats provide useful precision, they can create an additional layer of interpretation. ECOVIZ began by questioning whether environmental information could be communicated through movement, density, and visual patterns, allowing people to perceive conditions alongside the numerical data.",
    ],
  },
  {
    label: "The Challenge",
    summary:
      "How might environmental datasets become intuitive, interactive experiences without sacrificing information clarity or turning visualization into decoration?",
    body: [
      "The challenge was balancing scientific meaning with visual expression. Each environmental dataset required a distinct visual metaphor while remaining part of one coherent system. Motion and interaction needed to communicate meaningful changes rather than simply create visual interest. The project also explored how to connect data accuracy, human perception, and emotional engagement through a consistent design language.",
    ],
  },
  {
    label: "Key Decisions",
    summary:
      "Established a Data → Behavior → Experience framework and developed four distinct visualization languages within a shared interactive system.",
    body: [
      "I translated rainfall into fluid accumulation (DropPulse), air quality into spatial density (BreatheGrid), snowfall into atmospheric particles (FrostBloom), and solar energy into light and trajectory (SolarTrace). These experiences were organized into two visual families: Solid / Tactile and Atmospheric / Expressive. This approach maintained a coherent system while allowing each dataset to communicate through its own behavior.",
    ],
  },
  {
    label: "Results & Impact",
    summary:
      "Created four interactive environmental visualization experiences and presented ECOVIZ as an MFA thesis within RIT's College of Art and Design.",
    body: [
      "ECOVIZ resulted in a connected system of four environmental visualization concepts exploring rainfall, air quality, snowfall, and solar energy. Using 3D, motion, and interaction, the project demonstrated alternative ways of representing environmental information through visual behavior. The completed thesis was presented within RIT's College of Art and Design, bringing together research, information design, and experimental interaction.",
    ],
  },
  {
    label: "Learnings",
    summary:
      "Data visualization can communicate through behavior, not just numbers. Expressive interactions are most effective when they preserve the meaning behind the data.",
    body: [
      "ECOVIZ taught me to approach data as a design material capable of shaping motion, form, density, space, and rhythm. I learned that simplification does not always require removing information; it can involve translating information into another perceptual form. Most importantly, the thesis expanded my understanding of interaction design from designing static interfaces toward designing meaningful systems of behavior.",
    ],
  },
];

// ── 006 Visa Financial Insights — written case study sections ─────────────
const VISA_SECTIONS: CaseSection[] = [
  {
    label: "Project Overview",
    summary:
      "Transformed publicly available Visa financial data into an interactive, scroll-based experience combining data visualization and business storytelling.",
    body: [
      "Visa Financial Insights is a self-initiated information-design project exploring how complex financial reporting can become a clearer digital experience. I analyzed and reorganized publicly available Visa data into a structured narrative, combining financial KPIs, visualization systems, and interactive storytelling.",
    ],
  },
  {
    label: "The Problem",
    summary:
      "Dense financial reports make it difficult to identify meaningful business insights across extensive tables, technical terminology, and disconnected metrics.",
    body: [
      "Enterprise financial reports contain valuable information, but their complexity can make interpretation time-consuming. Important insights are often distributed across tables, explanations, and reporting categories. The opportunity was to reorganize this information so audiences could more easily understand performance, growth, and business priorities.",
    ],
  },
  {
    label: "The Challenge",
    summary:
      "Balanced financial accuracy, necessary context, and visual simplicity while turning complex reporting data into a coherent business narrative.",
    body: [
      "Simplifying financial information without losing accuracy was the central challenge. Too much detail recreates the original report\u2019s complexity, while removing context risks misleading the audience. I needed to identify essential metrics, preserve meaningful relationships, and select visual formats that communicated each insight clearly.",
    ],
  },
  {
    label: "Key Decisions",
    summary:
      "Prioritized meaningful financial metrics, established a narrative hierarchy, and built consistent visualization patterns for an interactive digital experience.",
    body: [
      "I structured the narrative around scale, growth, revenue, network activity, geographic performance, and strategic services. Chart formats were selected according to comparison, change, or composition needs. A unified system of KPIs, labels, typography, and annotations maintained consistency, while scroll-based storytelling introduced information progressively.",
    ],
  },
  {
    label: "Results & Impact",
    summary:
      "Delivered an interactive financial storytelling concept with structured KPIs, cohesive chart systems, and a clearer presentation of enterprise business information.",
    body: [
      "Created a scroll-based digital case study translating publicly available financial reporting into a focused visual narrative. The final experience combines KPI components, data visualizations, annotations, and supporting context within a consistent design system, demonstrating my ability to communicate complex business information through visual storytelling.",
    ],
  },
  {
    label: "Learnings",
    summary:
      "Learned that effective financial visualization begins with understanding data relationships and structuring information before designing its visual presentation.",
    body: [
      "This project reinforced that information architecture comes before visual styling. I learned to prioritize meaningful relationships, choose charts based on communication goals, and preserve the context required for trustworthy interpretation. Strong data storytelling makes complex information approachable without sacrificing accuracy.",
    ],
  },
];

// ── 007 Fennec — written case study sections ──────────────────────────────
const FENNEC_SECTIONS: CaseSection[] = [
  {
    label: "Project Overview",
    summary:
      "Developed a cohesive brand experience connecting FENNEC\u2019s climbing-inspired products, rope workshops, website, and marketing touchpoints.",
    body: [
      "FENNEC is a climbing and lifestyle brand centered on DIY rope workshops, handmade accessories, and consumer products. I designed across its website, e-commerce experience, promotional materials, and physical touchpoints, creating a consistent visual language that connects brand storytelling with practical product communication.",
    ],
  },
  {
    label: "The Problem",
    summary:
      "Communicating a brand across products, workshops, online shopping, and marketing channels risks creating a fragmented customer experience.",
    body: [
      "FENNEC combines handmade products, climbing culture, workshops, and community experiences. Each touchpoint serves a different purpose, from product discovery to event promotion. Without a unified visual and messaging system, these experiences could feel disconnected, making the brand harder to recognize and understand.",
    ],
  },
  {
    label: "The Challenge",
    summary:
      "Balanced expressive brand storytelling with clear product information, usable e-commerce experiences, and effective marketing communication.",
    body: [
      "The challenge was maintaining a recognizable identity while adapting to different communication needs. A website requires deeper storytelling, a product page needs clear purchasing information, and a poster must communicate instantly. The visual system needed to remain consistent without making every format look identical.",
    ],
  },
  {
    label: "Key Decisions",
    summary:
      "Established consistent typography, imagery, and messaging while adapting content hierarchy across the website, store, campaigns, and physical materials.",
    body: [
      "I developed a flexible visual direction using consistent typography, photography, and composition. The website connects editorial storytelling with product discovery, while e-commerce pages prioritize product details and purchasing clarity. Promotional posters and digital content adapt the same brand identity for faster, attention-driven communication.",
    ],
  },
  {
    label: "Results & Impact",
    summary:
      "Delivered a unified brand experience spanning a live website, e-commerce product presentation, marketing assets, and physical communication.",
    body: [
      "Designed and maintained FENNEC\u2019s website, created e-commerce product presentations, and produced marketing materials for products, workshops, and events. The resulting work connects digital and physical brand touchpoints through a consistent visual system, demonstrating integrated brand communication rather than isolated design deliverables.",
    ],
  },
  {
    label: "Learnings",
    summary:
      "Learned that strong brand consistency comes from adaptable visual principles, not identical layouts across every channel.",
    body: [
      "FENNEC strengthened my ability to design across brand, commerce, and marketing contexts. I learned that each channel requires a different balance of storytelling, information, and action. A successful visual system preserves a recognizable identity while adapting to how and where people encounter the brand.",
    ],
  },
];

export const STANDARD_CASES: Partial<Record<ProjectSlug, CaseStudy>> = {
  parallel: PARALLEL,
  ecoviz: (() => {
    const draft = draftCase("ecoviz", "002", "ECOVIZ");
    return {
      ...draft,
      type: "[MFA Thesis / Interactive Data Visualization]",
      outcome:
        "An interactive MFA thesis exploring how environmental data can become intuitive, immersive experiences through 3D visualization, motion, and interaction.",
      // two lines on desktop at the existing type size; natural wrap on mobile
      outcomeMaxWidth: "62ch",
      meta: [
        { label: "Scope", value: "Data Visualization · Interaction Design · 3D · Motion · Information Design" },
        { label: "Service", value: "Interactive Environmental Data Visualization" },
        { label: "Category", value: "Data & Systems / Interaction Design", ice: true },
        // keep the existing project date (from the Resume entry)
        draft.meta.find((m) => m.label === "Date")!,
      ],
      role: "Interaction Designer / Visual Designer / Researcher",
      sections: ECOVIZ_SECTIONS,
    };
  })(),
  tapgo: {
    ...draftCase("tapgo", "003", "TapGo"),
    heroDesign: "tapgo-phones",
    type: "[Self-initiated UX/UI Case Study]",
    outcome:
      "Designed an accessibility-first grocery shopping experience that helps older adults navigate digital shopping with greater clarity, confidence, and independence.",
    meta: [
      { label: "Scope", value: "UX Research · Accessibility · Prototyping" },
      { label: "Service", value: "Mobile UX/UI & Interaction Design" },
      { label: "Category", value: "Accessible Design / Mobile UX", ice: true },
      { label: "Date", value: "Original concept · Later refined" },
    ],
    role: "UX/UI Designer",
    sections: TAPGO_SECTIONS,
  },
  restify: {
    ...draftCase("restify", "004", "Restify"),
    type: "[Conceptual Mobile App]",
    outcome:
      "Designed a calming mobile sleep and wellness experience through thoughtful UI, reusable design systems, and subtle motion that supports healthier nighttime routines.",
    meta: [
      { label: "Scope", value: "UX/UI Design · Motion · Design System" },
      { label: "Service", value: "Mobile Product & Interaction Design" },
      { label: "Category", value: "Wellness / Mobile UX/UI", ice: true },
      { label: "Date", value: "2023 · Later refined" },
    ],
    role: "Product / UX/UI Designer",
    sections: RESTIFY_SECTIONS,
  },
  "rit-mycourses": {
    ...draftCase("rit-mycourses", "005", "RIT myCourses Redesign"),
    sections: RIT_SECTIONS,
  },
  "visa-financial-insights": (() => {
    const draft = draftCase("visa-financial-insights", "006", "Visa Financial Insights");
    return {
      ...draft,
      type: "[Self-initiated Information Design]",
      outcome:
        "Turning complex Visa financial reports into clear, interactive stories through data visualization, information design, and financial storytelling.",
      // two lines on desktop at the existing type size; natural wrap on mobile
      outcomeMaxWidth: "56ch",
      meta: [
        { label: "Scope", value: "Data Visualization · Information Architecture · Financial Storytelling" },
        { label: "Service", value: "Financial Data Visualization" },
        { label: "Category", value: "Fintech / Information Design", ice: true },
        // keep the existing project date (from the Resume entry)
        draft.meta.find((m) => m.label === "Date")!,
      ],
      role: "Information Designer / Visual Designer",
      sections: VISA_SECTIONS,
      showSectionMedia: false,
      external: {
        href: "https://kneel-human-39937570.figma.site",
        title: "View case study",
        label: "Visa Financial Insights",
        ariaLabel: "View the Visa Financial Insights case study (opens in a new tab)",
        design: "visa-landing",
      },
    };
  })(),
  fennec: (() => {
    const draft = draftCase("fennec", "007", "Fennec");
    return {
      ...draft,
      type: "[Brand & Marketing Design]",
      outcome:
        "Designed a cohesive climbing and lifestyle brand experience across web, e-commerce, marketing, and physical touchpoints, connecting visual storytelling with consumer engagement.",
      outcomeMaxWidth: "64ch",
      meta: [
        { label: "Scope", value: "Brand Identity · Web Design · E-Commerce · Marketing" },
        { label: "Service", value: "Integrated Brand Experience" },
        { label: "Category", value: "Visual Communication / E-Commerce", ice: true },
        // keep the existing project date (from the Resume entry)
        draft.meta.find((m) => m.label === "Date")!,
      ],
      role: "Brand / Web / Marketing Designer",
      live: { title: "Live Website", label: "fennecnyc.com", href: "https://fennecnyc.com" },
      external: {
        href: "https://www.fennecnyc.com/",
        title: "View live website",
        label: "fennecnyc.com",
        ariaLabel: "View the live FENNEC website (opens in a new tab)",
        design: "fennec-site",
      },
      sections: FENNEC_SECTIONS,
    };
  })(),
  "bcg-x": {
    ...draftCase("bcg-x", "009", "Boston Consulting Group by Forage"),
    outcome:
      "Developed a UX research framework for a simulated banking product, translating customer insights, personas, and 5+ pain points into strategic design opportunities.",
    outcomeMaxWidth: "64ch",
    sections: BCG_SECTIONS,
    showSectionMedia: false,
    external: {
      href: "https://aloha-cabin-44551222.figma.site",
      design: "bcg-landing",
      title: "Explore the full case study",
      label: "Interactive experience · Figma Make",
      ariaLabel: "Explore the full BCG × Forage case study — interactive Figma Make experience (opens in a new tab)",
    },
  },
};

/** Slugs served by app/work/[slug] (Parallel and Prompt Direction keep their own routes). */
export const DRAFT_CASE_SLUGS = (Object.keys(STANDARD_CASES) as ProjectSlug[]).filter(
  (s) => s !== "parallel",
);
