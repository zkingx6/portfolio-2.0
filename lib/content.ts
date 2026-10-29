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
  },
  {
    id: "007",
    name: "Fennec",
    tags: "Website / E-commerce / Visual Communication",
    status: "[Ongoing]",
    categories: [4],
    d1: "Website, e-commerce and digital visual communication.",
    d2: "Ongoing work.",
  },
  {
    id: "001",
    name: "Parallel",
    tags: "SaaS Product / UX/UI / Next.js / Supabase",
    status: "[B2B SaaS]",
    categories: [3, 2],
    d1: "A SaaS product spanning UX/UI and a full-stack build.",
    d2: "Built with Next.js and Supabase; deployed as an MVP.",
  },
  {
    id: "009",
    name: "BCG by Forage",
    tags: "Banking UX Research / Experience Strategy",
    status: "[Forage Simulation]",
    categories: [1],
    d1: "Developed a UX research framework encompassing participant screening, surveys, personas, and 5+ customer pain points for a simulated banking-product challenge.",
    d2: "Synthesized research findings into actionable product opportunities, translating customer needs into a Figma case study emphasizing experience strategy and UX storytelling.",
  },
  {
    id: "002",
    name: "EcoViz",
    tags: "Interactive Environmental Data Visualization",
    status: "[MFA Thesis]",
    categories: [2],
    d1: "Interactive environmental data visualization.",
    d2: "My MFA thesis, built around four climate data systems: rainfall, air, snowfall, solar.",
  },
  {
    id: "005",
    name: "RIT MyCourses Redesign",
    tags: "Learning Experience Design",
    status: "[Redesign]",
    categories: [1],
    d1: "Learning experience design.",
    d2: "A redesign of RIT MyCourses.",
  },
  {
    id: "004",
    name: "Restify",
    tags: "Sleep Wellness UX",
    status: "[Design System]",
    categories: [1],
    d1: "Sleep wellness UX.",
    d2: "Documented as a design system.",
  },
  {
    id: "003",
    name: "TapGo",
    tags: "Accessibility-focused Mobile UX",
    status: "[Case Study]",
    categories: [1],
    d1: "Accessibility-focused mobile UX.",
    d2: "Presented as a case study.",
  },
  {
    id: "008",
    name: "Prompt Direction",
    tags: "AI Direction / Prompt Design",
    status: "[Process]",
    categories: [3],
    d1: "A working log of how I direct AI to design and build — the prompts, the cuts, and what shipped.",
    d2: "Prompting is a skill. Anyone can talk to AI. Being specific is experience.",
    d2s: "font-size:14px;color:#A8A59E",
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

export const ASK_KEYWORDS: [number, string[]][] = [
  [0, ["fintech", "payments", "banking", "finance", "visa"]],
  [2, ["ai", "saas", "agents", "shipped", "startup", "parallel"]],
  [4, ["climate", "environment", "data viz", "thesis", "ecoviz", "data"]],
  [7, ["accessibility", "seniors", "mobile", "health", "tapgo"]],
  [6, ["wellness", "design system", "sleep", "restify"]],
  [5, ["education", "lms", "learning", "mycourses", "rit"]],
  [8, ["prompting", "prompt", "process", "directing", "how do you work"]],
  [1, ["branding", "ecommerce", "web", "website", "phoenix", "fennec"]],
];

export const ASK_CHIPS = [
  "fintech",
  "AI",
  "accessibility",
  "data viz",
  "wellness",
  "education",
];

export const TICKER =
  "Product Design  ✦  UX / UI  ✦  Interaction  ✦  Creative Technology  ✦  AI-powered Experiences  ✦  Fintech  ✦  Data Visualization  ✦  HTML · CSS · JS · React  ✦  Digital Systems  ✦  ";

export const SKILLS: SkillGroup[] = [
  {
    num: "01",
    title: "Product & UX/UI",
    chips: [
      "Product Design",
      "UX/UI Design",
      "Interaction Design",
      "User Research",
      "Information Architecture",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Accessibility",
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
      "Digital Marketing Design",
    ],
  },
  {
    num: "03",
    title: "Design Tools",
    chips: [
      "Figma",
      "FigJam",
      "Framer",
      "Adobe Creative Cloud",
      "After Effects",
      "Cinema 4D",
      "Spline",
      "Miro",
      "Wix",
    ],
  },
  {
    num: "04",
    title: "Technical",
    chips: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Supabase",
      "SQL",
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
    title: "Direct the tools, keep the taste.",
    body: "AI doesn’t design for me — I direct it. The vision, the calls, and the cuts are mine; I work like a design director, and the tools are my very fast team.",
    proof: "PROOF — 008 PROMPT DIRECTION",
  },
  {
    num: "02",
    title: "Reframe before solving.",
    body: "Parallel started as ‘when is everyone available?’ The real question was ‘who keeps paying for this meeting?’ Availability isn’t fairness — finding the question behind the question is the design work.",
    proof: "PROOF — 001 PARALLEL",
  },
  {
    num: "03",
    title: "Simplify the path, never the product.",
    body: "Cut steps, not capability. If people need it, it stays — it just takes less effort to reach. Minimalism should reduce effort, not function.",
    proof: "PROOF — 005 RIT MYCOURSES",
  },
  {
    num: "04",
    title: "Build to learn. Believe what you learn.",
    body: "A deployed MVP in a month teaches more than a polished deck. When the evidence said the problem was a nice-to-have, I believed it — a killed hypothesis is a result, not a failure.",
    proof: "PROOF — 001 PARALLEL",
  },
  {
    num: "05",
    title: "Data should behave like what it means.",
    body: "Numbers give precision; behavior gives understanding. Rain accumulates, bad air thickens, a financial report becomes a story — information people can perceive before they have to decode it.",
    proof: "PROOF — 002 ECOVIZ · 006 VISA",
  },
  {
    num: "06",
    title: "If the user struggles, suspect the interface.",
    body: "Accessibility isn’t a special mode for other people. It’s removing barriers from the same product, so people can act on their own instead of asking for help.",
    proof: "PROOF — 003 TAPGO",
  },
];

export const RESUME_RAIL = [
  { id: "skills", num: "01", label: "Skills", sh: "SKILLS" },
  { id: "experience", num: "02", label: "Experience", sh: "EXP" },
  { id: "work", num: "03", label: "Selected work", sh: "WORK" },
  { id: "education", num: "04", label: "Education", sh: "EDU" },
  { id: "principles", num: "05", label: "Principles", sh: "PRIN." },
] as const;

export function findProjectIndex(q: string) {
  const t = q.toLowerCase().trim();
  if (!t) return -1;
  const tok = t.split(/[^a-z0-9]+/).filter(Boolean);
  if (/\b(bcg|forage|banking app|ux research|boston consulting)\b/.test(t)) {
    return 3;
  }
  for (const [i, ks] of ASK_KEYWORDS) {
    for (const k of ks) {
      if (
        k.length <= 3
          ? tok.includes(k)
          : t.includes(k) || (t.length >= 3 && k.startsWith(t))
      ) {
        return i;
      }
    }
  }
  return -1;
}
