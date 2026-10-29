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
  next: { id: string; name: string; href: string };
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
        "Successfully designed and launched a fully functional MVP from concept to deployment in about one month using AI-assisted development. Although market validation revealed the problem was more of a “nice-to-have” than a critical pain point, the project demonstrated how rapidly ideas can be prototyped, tested, and evaluated with modern AI tools.",
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
  next: { id: "002", name: "EcoViz", href: "/work/ecoviz" },
};
