/*
  Script for the 03 HOW I BUILD workspace.
  Each stage is a list of steps compiled into a deterministic timeline, so the
  whole UI is a pure function of (stage, elapsed ms). No timers to leak.
*/

export type Lang = "md" | "tsx" | "ts" | "log" | "sh";
export type Tone = "neutral" | "ai" | "human" | "ok";

type Step =
  | { k: "type"; text: string; ms?: number; id?: string; cls?: string }
  | { k: "burst"; text: string; gap?: number; id?: string; cls?: string; pv?: number }
  | { k: "pause"; ms: number }
  | { k: "status"; text: string; tone?: Tone }
  | { k: "mark"; id: string; cls: string }
  | { k: "note"; id: string; text: string; tone: Tone }
  | { k: "replace"; id: string; text: string; ms?: number }
  | { k: "tType"; text: string; ms?: number }
  | { k: "tBurst"; text: string; gap?: number }
  | { k: "done"; text: string };

type LineEv = { id?: string; cls?: string; pv?: number; start: number; text: string; times: number[] };
type RepEv = { id: string; start: number; del: number; text: string; times: number[] };

export type Stage = {
  key: string;
  num: string;
  label: string;
  file: string;
  lang: Lang;
  lines: LineEv[];
  term: LineEv[];
  reps: RepEv[];
  marks: { id: string; cls: string; start: number }[];
  notes: { id: string; text: string; tone: Tone; start: number }[];
  status: { text: string; tone: Tone; start: number }[];
  done?: { text: string; start: number };
  dur: number;
  summary: string;
};

// deterministic per-char jitter so typing feels human but replays identically
const jitter = (i: number, seed: number) => {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x); // 0..1
};

// one knob for overall pace (auto demo lands at ~15s)
const PACE = 0.74;

function typeTimes(text: string, ms: number, seed: number) {
  ms *= PACE;
  const out: number[] = [];
  let acc = 0;
  for (let i = 0; i < text.length; i++) {
    let d = ms * (0.55 + jitter(i, seed) * 0.9);
    if (text[i] === " " && jitter(i + 7, seed) > 0.82) d += ms * 2.5; // small thinking pause
    acc += d;
    out.push(acc);
  }
  return out;
}

function compile(
  meta: Omit<Stage, "lines" | "term" | "reps" | "marks" | "notes" | "status" | "dur" | "done">,
  steps: Step[],
): Stage {
  const st: Stage = { ...meta, lines: [], term: [], reps: [], marks: [], notes: [], status: [], dur: 0 };
  let t = 0;
  let seed = 1;
  for (const s of steps) {
    seed++;
    switch (s.k) {
      case "type": {
        const times = typeTimes(s.text, s.ms ?? 16, seed);
        st.lines.push({ id: s.id, cls: s.cls, start: t, text: s.text, times });
        t += (times[times.length - 1] ?? 0) + 90 * PACE;
        break;
      }
      case "burst":
        st.lines.push({ id: s.id, cls: s.cls, pv: s.pv, start: t, text: s.text, times: s.text ? Array(s.text.length).fill(0) : [] });
        t += (s.gap ?? 70) * PACE;
        break;
      case "pause":
        t += s.ms * PACE;
        break;
      case "status":
        st.status.push({ text: s.text, tone: s.tone ?? "neutral", start: t });
        break;
      case "mark":
        st.marks.push({ id: s.id, cls: s.cls, start: t });
        break;
      case "note":
        st.notes.push({ id: s.id, text: s.text, tone: s.tone, start: t });
        break;
      case "replace": {
        const old = st.lines.find((l) => l.id === s.id)!;
        const del = old.text.length * 5 * PACE;
        const times = typeTimes(s.text, s.ms ?? 13, seed);
        st.reps.push({ id: s.id, start: t, del, text: s.text, times });
        t += del + (times[times.length - 1] ?? 0) + 120 * PACE;
        break;
      }
      case "tType": {
        const times = typeTimes(s.text, s.ms ?? 26, seed);
        st.term.push({ start: t, text: s.text, times });
        t += (times[times.length - 1] ?? 0) + 160 * PACE;
        break;
      }
      case "tBurst":
        st.term.push({ start: t, text: s.text, times: s.text ? Array(s.text.length).fill(0) : [] });
        t += (s.gap ?? 60) * PACE;
        break;
      case "done":
        st.done = { text: s.text, start: t };
        break;
    }
  }
  st.dur = t + 200;
  return st;
}

/* ── The four stages ─────────────────────────── */

const think = compile(
  { key: "think", num: "01", label: "Think", file: "01-discover.md", lang: "md",
    summary: "Discovery on Parallel. The obvious question was “When can everyone meet?”. The better question: “Who keeps carrying the timezone burden?”. Decision: optimize for fairness, not just availability." },
  [
    { k: "status", text: "Writing", tone: "human" },
    { k: "type", text: "# Parallel / discovery", ms: 13 },
    { k: "burst", text: "" },
    { k: "burst", text: "## The obvious question" },
    { k: "type", text: "> When can everyone meet?", ms: 19 },
    { k: "burst", text: "" },
    { k: "burst", text: "Every scheduling tool answers this one." },
    { k: "burst", text: "The same teammates still take the late calls.", gap: 120 },
    { k: "pause", ms: 420 },
    { k: "burst", text: "" },
    { k: "burst", text: "## The better question" },
    { k: "status", text: "Reframing", tone: "human" },
    { k: "type", text: "> Who keeps carrying the timezone burden?", ms: 19, cls: "or" },
    { k: "pause", ms: 260 },
    { k: "burst", text: "" },
    { k: "type", id: "dec", text: "DECISION: Optimize for fairness, not just availability.", ms: 11 },
    { k: "mark", id: "dec", cls: "decision" },
    { k: "status", text: "Decision logged", tone: "ok" },
    { k: "tBurst", text: "› saved 01-discover.md" },
  ],
);

const design = compile(
  { key: "design", num: "02", label: "Design", file: "02-experience.tsx", lang: "tsx",
    summary: "The problem becomes a product flow: team setup, availability preferences, a fair rotation, an explanation of why each time was picked, and a fairness report." },
  [
    { k: "status", text: "Drafting component", tone: "human" },
    { k: "type", text: "// Parallel — the core scheduling flow", ms: 11 },
    { k: "burst", text: "type Member = { name: string; tz: string; lateCalls: number };" },
    { k: "burst", text: "" },
    { k: "type", text: "export function Schedule({ team }: { team: Member[] }) {", ms: 9 },
    { k: "status", text: "AI completing", tone: "ai" },
    { k: "burst", text: "  const rotation = useFairRotation(team);" },
    { k: "burst", text: "" },
    { k: "burst", text: "  return (" },
    { k: "burst", text: "    <Flow>", gap: 110 },
    { k: "burst", text: "      <TeamSetup members={team} />", pv: 1, gap: 200 },
    { k: "burst", text: "      <Availability hours=\"working\" />", pv: 2, gap: 200 },
    { k: "burst", text: "      <FairRotation slots={rotation.next(4)} />", pv: 3, gap: 200 },
    { k: "burst", text: "      <WhyThisTime reason={rotation.reason} />", pv: 4, gap: 200 },
    { k: "burst", text: "      <FairnessReport burden={rotation.burden} />", pv: 5, gap: 200 },
    { k: "burst", text: "    </Flow>" },
    { k: "burst", text: "  );" },
    { k: "burst", text: "}" },
    { k: "status", text: "Preview updated", tone: "ok" },
    { k: "tType", text: "$ npm run dev", ms: 24 },
    { k: "tBurst", text: "  ▲ Next.js · ready on localhost:3000", gap: 160 },
    { k: "tBurst", text: "✓ compiled /schedule" },
  ],
);

const code = compile(
  { key: "code", num: "03", label: "Code", file: "03-build.ts", lang: "ts",
    summary: "AI drafts the scheduling logic in TypeScript against Supabase. Its suggestion sorts for the earliest available time; I review it and override it to pick the fairest slot, rotating who takes the late call." },
  [
    { k: "status", text: "You typing", tone: "human" },
    { k: "type", text: "// lib/schedule.ts — called from a Next.js server action", ms: 9 },
    { k: "type", text: "import { createClient } from \"@supabase/supabase-js\";", ms: 8 },
    { k: "burst", text: "" },
    { k: "status", text: "AI generating…", tone: "ai" },
    { k: "burst", text: "const db = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);", gap: 90 },
    { k: "burst", text: "", gap: 60 },
    { k: "burst", text: "export async function nextMeeting(teamId: string) {", gap: 70 },
    { k: "burst", text: "  const { data: members } = await db", gap: 55 },
    { k: "burst", text: "    .from(\"members\")", gap: 45 },
    { k: "burst", text: "    .select(\"id, timezone, work_start, work_end\")", gap: 45 },
    { k: "burst", text: "    .eq(\"team_id\", teamId);", gap: 40 },
    { k: "burst", text: "  const history = await lateCallHistory(teamId);", gap: 40 },
    { k: "burst", text: "", gap: 30 },
    { k: "burst", text: "  const slots = candidateSlots(members, { days: 7 });", gap: 35 },
    { k: "burst", text: "  const scored = slots.map((slot) => ({", gap: 30 },
    { k: "burst", text: "    slot,", gap: 30 },
    { k: "burst", text: "    offHours: members.map((m) => outsideWorkHours(slot, m)),", gap: 30 },
    { k: "burst", text: "  }));", gap: 30 },
    { k: "burst", text: "", gap: 30 },
    { k: "burst", id: "sug", text: "  return scored.sort(byEarliestStart)[0];", gap: 30 },
    { k: "burst", text: "}", gap: 260 },
    { k: "status", text: "Human review", tone: "human" },
    { k: "mark", id: "sug", cls: "review" },
    { k: "note", id: "sug", text: "AI suggestion — optimize for earliest available time", tone: "ai" },
    { k: "pause", ms: 1000 },
    { k: "replace", id: "sug", text: "  return pickFairest(scored, history); // rotate the late call", ms: 12 },
    { k: "mark", id: "sug", cls: "override" },
    { k: "note", id: "sug", text: "Human override — fairness first", tone: "human" },
    { k: "status", text: "Decision applied", tone: "human" },
    { k: "pause", ms: 200 },
    { k: "tType", text: "$ npx tsc --noEmit", ms: 20 },
    { k: "tBurst", text: "✓ no type errors" },
  ],
);

const ship = compile(
  { key: "ship", num: "04", label: "Ship", file: "04-deploy.log", lang: "log",
    summary: "The iteration is built, committed, and deployed to production on Vercel." },
  [
    { k: "status", text: "Building", tone: "ai" },
    { k: "burst", text: "# deploy.log — product iteration", gap: 50 },
    { k: "burst", text: "project   parallel", gap: 40 },
    { k: "burst", text: "stack     next.js · typescript · supabase", gap: 40 },
    { k: "burst", text: "target    vercel · production", gap: 40 },
    { k: "burst", id: "st", text: "status    building…", gap: 120 },
    { k: "tType", text: "$ npm run build", ms: 22 },
    { k: "tBurst", text: "> portfolio-workflow@1.0.0 build", gap: 40 },
    { k: "tBurst", text: "> next build", gap: 260 },
    { k: "tBurst", text: "✓ Compiled successfully", gap: 200 },
    { k: "tBurst", text: "✓ Type checking passed", gap: 170 },
    { k: "tBurst", text: "✓ Generating static pages", gap: 150 },
    { k: "tBurst", text: "✓ Build completed", gap: 60 },
    { k: "tBurst", text: "", gap: 40 },
    { k: "tType", text: "$ git commit -m \"ship product iteration\"", ms: 11 },
    { k: "tBurst", text: "[main] product iteration committed", gap: 60 },
    { k: "tBurst", text: "", gap: 40 },
    { k: "status", text: "Deploying", tone: "ai" },
    { k: "tType", text: "$ vercel deploy --prod", ms: 18 },
    { k: "tBurst", text: "… uploading build output", gap: 380 },
    { k: "tBurst", text: "✓ Deployment ready", gap: 120 },
    { k: "replace", id: "st", text: "status    SHIPPED", ms: 14 },
    { k: "mark", id: "st", cls: "decision" },
    { k: "tBurst", text: "", gap: 30 },
    { k: "tBurst", text: "STATUS: SHIPPED", gap: 80 },
    { k: "status", text: "Build successful", tone: "ok" },
    { k: "done", text: "Build successful" },
  ],
);

export const STAGES: Stage[] = [think, design, code, ship];

/* ── Snapshot: what the UI shows at time t ───── */

export type Snap = {
  lines: { text: string; full: string; cls?: string; id?: string; typing: boolean }[];
  term: { text: string; full: string; typing: boolean }[];
  marks: Record<string, string>;
  notes: Record<string, { text: string; tone: Tone }>;
  status: { text: string; tone: Tone };
  pv: number;
  done: boolean;
  cursor: { pane: "ed" | "term"; line: number; col: number };
  progress: number;
  sig: string;
};

const reveal = (times: number[], dt: number) => {
  if (dt < 0) return -1;
  let n = 0;
  while (n < times.length && times[n] <= dt) n++;
  return n;
};

export function snapshot(stage: Stage, t: number): Snap {
  const lines: Snap["lines"] = [];
  let cursor: Snap["cursor"] = { pane: "ed", line: 0, col: 0 };
  let pv = 0;
  for (const l of stage.lines) {
    const n = reveal(l.times, t - l.start);
    if (n < 0) break;
    let text = l.text.slice(0, n);
    let full = l.text;
    let typing = n < l.text.length;
    const rep = l.id ? stage.reps.find((r) => r.id === l.id) : undefined;
    if (rep && t >= rep.start) {
      const dt = t - rep.start;
      if (dt < rep.del) {
        const k = Math.floor((dt / rep.del) * l.text.length);
        text = l.text.slice(0, l.text.length - k);
        typing = true;
      } else {
        const m = reveal(rep.times, dt - rep.del);
        text = rep.text.slice(0, m);
        full = rep.text;
        typing = m < rep.text.length;
      }
    }
    if (l.pv && n >= l.text.length) pv = Math.max(pv, l.pv);
    lines.push({ text, full, cls: l.cls, id: l.id, typing });
    cursor = { pane: "ed", line: lines.length - 1, col: text.length };
  }
  const term: Snap["term"] = [];
  for (const l of stage.term) {
    const n = reveal(l.times, t - l.start);
    if (n < 0) break;
    term.push({ text: l.text.slice(0, n), full: l.text, typing: n < l.text.length });
  }
  // cursor follows whichever pane was written most recently
  const lastEd = [...stage.lines].reverse().find((l) => l.start <= t)?.start ?? -1;
  const lastRep = stage.reps.filter((r) => r.start <= t).map((r) => r.start);
  const lastTerm = [...stage.term].reverse().find((l) => l.start <= t)?.start ?? -1;
  if (lastTerm > Math.max(lastEd, ...lastRep, -1) && term.length) {
    cursor = { pane: "term", line: term.length - 1, col: term[term.length - 1].text.length };
  } else if (lastRep.length && Math.max(...lastRep) >= lastEd) {
    const r = stage.reps.find((x) => x.start === Math.max(...lastRep))!;
    const idx = lines.findIndex((x) => x.id === r.id);
    if (idx >= 0) cursor = { pane: "ed", line: idx, col: lines[idx].text.length };
  }
  const marks: Snap["marks"] = {};
  for (const m of stage.marks) if (m.start <= t) marks[m.id] = m.cls;
  const notes: Snap["notes"] = {};
  for (const n of stage.notes) if (n.start <= t) notes[n.id] = { text: n.text, tone: n.tone };
  let status: Snap["status"] = { text: "Ready", tone: "neutral" };
  for (const s of stage.status) if (s.start <= t) status = { text: s.text, tone: s.tone };
  const done = !!stage.done && t >= stage.done.start;
  const chars = lines.reduce((a, l) => a + l.text.length + 1, 0) + term.reduce((a, l) => a + l.text.length + 1, 0);
  const sig = [lines.length, term.length, chars, Object.keys(marks).map((k) => k + marks[k]).join(), Object.keys(notes).join(), status.text, pv, done].join("|");
  return { lines, term, marks, notes, status, pv, done, cursor, progress: Math.min(1, t / stage.dur), sig };
}

/* ── Tiny syntax highlighter ─────────────────── */

export type Tok = [cls: string, text: string];

const TS_RE =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*"?)|(<\/?[A-Z][\w.]*|\/?>)|\b(import|from|export|async|function|const|return|await|type)\b|\b(string|number|[A-Z][A-Za-z]+)\b|\b(\d+)\b|([a-z_]\w*)(?=\()/g;

function hlTs(line: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  for (const m of line.matchAll(TS_RE)) {
    if (m.index! > i) out.push(["", line.slice(i, m.index)]);
    const cls = m[1] ? "com" : m[2] ? "str" : m[3] ? "tag" : m[4] ? "kw" : m[5] ? "ty" : m[6] ? "num" : "fn";
    out.push([cls, m[0]]);
    i = m.index! + m[0].length;
  }
  if (i < line.length) out.push(["", line.slice(i)]);
  return out;
}

function hlMd(line: string): Tok[] {
  if (line.startsWith("#")) return [["h", line]];
  if (line.startsWith(">")) return [["q", "> "], ["", line.slice(2)]];
  if (line.startsWith("DECISION:")) return [["kw", "DECISION:"], ["", line.slice(9)]];
  return [["mut", line]];
}

function hlLog(line: string): Tok[] {
  if (line.startsWith("#")) return [["com", line]];
  const m = /^(\S+)(\s+)(.*)$/.exec(line);
  if (!m) return [["", line]];
  return [["ty", m[1]], ["", m[2]], [m[3] === "SHIPPED" ? "ok" : "", m[3]]];
}

function hlSh(line: string): Tok[] {
  if (line.startsWith("$ ")) return [["pr", "$ "], ["", line.slice(2)]];
  if (line.startsWith("✓")) return [["ok", "✓"], ["", line.slice(1)]];
  if (line.startsWith("STATUS:")) return [["ship", line]];
  if (line.startsWith(">") || line.startsWith("›") || line.startsWith("…") || line.startsWith("[")) return [["mut", line]];
  return [["", line]];
}

export function highlight(lang: Lang, full: string, n: number): Tok[] {
  const toks = lang === "md" ? hlMd(full) : lang === "log" ? hlLog(full) : lang === "sh" ? hlSh(full) : hlTs(full);
  const out: Tok[] = [];
  let left = n;
  for (const [c, s] of toks) {
    if (left <= 0) break;
    out.push([c, s.slice(0, left)]);
    left -= s.length;
  }
  return out;
}

export const HOLD_MS = 650; // pause between stages in the auto demo
