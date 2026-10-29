import type { CSSProperties } from "react";

export type Accent = "orange" | "ice" | "mix";

export type DotConfig = {
  density: number;
  radius: number;
  trail: number;
  accent: Accent;
  sound: boolean;
};

export type AskResult = {
  q: string;
  miss: boolean;
  text?: string;
};

export type NavTab = {
  label: string;
  href: string;
};

export type LogoDot = {
  cls: string;
  style: CSSProperties;
};

export type Project = {
  id: string;
  name: string;
  tags: string;
  status: string;
  categories: number[];
  d1: string;
  d2: string;
  d2s?: string;
  trace?: boolean;
  pageSlug?: string;
  hasPage?: boolean;
};

export type Category = {
  title: string;
  count: string;
  status: string;
  names: string[];
  rotate: string;
};

export type PlaygroundItem = {
  name: string;
  tags: string;
  status: string;
  also?: string;
};

export type TraceSeg = {
  t: string;
  tone: "" | "o" | "b";
};

export type TraceStep = {
  k: string;
  segs: TraceSeg[];
};

export type TraceDef = {
  id: string;
  steps: TraceStep[];
};

export type SkillGroup = {
  num: string;
  title: string;
  chips: string[];
};

export type ExperienceItem = {
  num: string;
  when: string;
  where: string;
  title: string;
  body: string;
  chips: string[];
};

export type ResumeWorkItem = {
  num: string;
  when: string;
  note?: string;
  title: string;
  role: string;
  p1: string;
  p2: string;
};

export type EducationItem = {
  num: string;
  when: string;
  where: string;
  title: string;
  honor: string;
};

export type Principle = {
  num: string;
  title: string;
  body: string;
  proof: string;
};
