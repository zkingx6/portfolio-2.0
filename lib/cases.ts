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
  name: "Parallel",
  type: "[Deployed MVP]",
  outcome:
    "A 0→1 meeting scheduler designed and built in about a month with AI-assisted development.",
  crumb: "Products & Experiences",
  caseNo: 1,
  caseTotal: 9,
  meta: [
    { label: "Scope", value: "0→1 Product" },
    { label: "Service", value: "Product Design & Development" },
    { label: "Category", value: "Productivity SaaS", ice: true },
    { label: "Date", value: "2026" },
  ],
  role: "Product Designer & Builder",
  sections: [
    {
      label: "Project Overview",
      summary:
        "A 0→1 meeting scheduler exploring fairness in recurring meetings — designed and built in about a month with AI-assisted development.",
      body: [
        "Parallel is a 0→1 product experiment exploring how AI-assisted development can rapidly transform an idea into a functional web application. Using Cursor AI, Supabase, and iterative prototyping, I designed and built a meeting scheduler that aims to distribute meeting times more fairly across global teams while exploring the potential of AI-powered product development.",
      ],
    },
    {
      label: "The Problem",
      summary:
        "Distributed teams keep inconveniencing the same people, and existing tools optimize for availability, not fairness.",
      body: [
        "Distributed teams often struggle with recurring meetings that repeatedly inconvenience the same participants across different time zones. While existing scheduling tools optimize for availability, they rarely consider long-term fairness or balance across recurring meetings.",
      ],
    },
    {
      label: "The Challenge",
      summary:
        "Turning the abstract idea of fairness into a usable product while learning AI-assisted development workflows at the same time.",
      body: [
        "Designing a fair scheduling experience required translating an abstract concept into a practical product while simultaneously learning modern AI-assisted development workflows. The project also required validating whether a technically feasible solution addressed a meaningful user need.",
      ],
    },
    {
      label: "Key Decisions",
      summary:
        "Reframed the problem from availability to fairness, then built to learn — shipping an MVP in a month to test a real hypothesis.",
      points: [
        "Reframe before solving: the problem wasn't finding a time, it was distributing the pain fairly — availability isn't fairness.",
        "Build to learn: ship the smallest working MVP fast, then let real validation decide — a killed hypothesis is a result.",
      ],
    },
    {
      label: "Results & Impact",
      summary:
        "Shipped a working MVP in about a month; validation showed a nice-to-have rather than a critical pain — a result, not a failure.",
      body: [
        "Successfully designed and launched a fully functional MVP from concept to deployment in about one month using AI-assisted development. Although market validation revealed the problem was more of a \u201cnice-to-have\u201d than a critical pain point, the project demonstrated how rapidly ideas can be prototyped, tested, and evaluated with modern AI tools.",
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
        "Speed is only half the equation — validate the need early, and treat a killed hypothesis as a finding.",
      body: [
        "Building Parallel reinforced that successful products require both strong execution and a compelling market need. Beyond learning AI-assisted development with Cursor AI and Supabase, I gained firsthand experience validating assumptions early, iterating quickly, and treating unsuccessful market outcomes as valuable product insights rather than failures.",
      ],
    },
  ],
  // EcoViz (002) does not have a page yet — href omitted so it renders as plain text
  next: { id: "002", name: "EcoViz" },
};

export const PROMPT_DIRECTION: CaseStudy = {
  id: "008",
  name: "Prompt Direction",
  type: "[Process]",
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
  { id: "002", name: "EcoViz",                 type: "[MFA Thesis]" },
  { id: "003", name: "TapGo",                  type: "[Case Study]" },
  { id: "004", name: "Restify",                type: "[Design System]" },
  { id: "005", name: "RIT MyCourses Redesign", type: "[Redesign]" },
  { id: "006", name: "Visa Financial Insights", type: "[Self-initiated]" },
  { id: "007", name: "Fennec",                 type: "[Ongoing]" },
  { id: "008", name: "Prompt Direction",       type: "[Process]",         href: "/work/prompt-direction" },
  { id: "009", name: "BCG by Forage",          type: "[Forage Simulation]" },
];
