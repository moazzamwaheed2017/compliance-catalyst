import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BadgeCheck,
  Bot,
  Check,
  Clock,
  FileText,
  Gavel,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Search,
  ShieldAlert,
  TriangleAlert,
  UserCheck,
} from "lucide-react";

import { SeverityChip } from "./hero-dashboard";

/* ------------------------------------------------------------------ */
/* Timeline helpers: every scene renders purely from its progress p ∈ [0,1],
   so the demo can be paused, scrubbed and restarted deterministically.   */

const clamp = (n: number) => Math.min(1, Math.max(0, n));
/** Progress of the sub-range [a, b] within p, clamped to 0..1. */
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

function Appear({
  show,
  children,
  className = "",
}: {
  show: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${show ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

function Panel({
  title,
  right,
  children,
}: {
  title: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span className="truncate">{title}</span>
        {right}
      </div>
      {children}
    </div>
  );
}

function Bar({ value, tone = "bg-brand-gradient" }: { value: number; tone?: string }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
      <div className={`h-full rounded-full ${tone}`} style={{ width: `${value * 100}%` }} />
    </div>
  );
}

/* -------------------- Story 1: discover & monitor -------------------- */

function DiscoverScene({ p }: { p: number }) {
  const systems = [
    { name: "ChatGPT Enterprise", where: "Company-wide", shadow: false, at: 0.1 },
    { name: "Claude Code", where: "Engineering", shadow: false, at: 0.22 },
    { name: "credit-scoring-model v4", where: "Lending", shadow: false, at: 0.34 },
    { name: "Personal Gemini API key", where: "Finance", shadow: true, at: 0.5 },
    { name: "Local Llama 3 on a laptop", where: "Marketing", shadow: true, at: 0.64 },
  ];
  return (
    <Panel
      title="Discovery · scanning your environment"
      right={
        <span className="text-primary">{systems.filter((s) => p >= s.at).length} AI systems</span>
      }
    >
      <div className="relative mb-3 h-1 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="absolute inset-y-0 w-1/4 rounded-full bg-primary/70"
          style={{ left: `${(p * 300) % 100}%` }}
        />
      </div>
      <ul className="space-y-2 font-mono text-[11px]">
        {systems.map((s) => (
          <Appear key={s.name} show={p >= s.at}>
            <li
              className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 ${
                s.shadow ? "border-rose/30 bg-rose/[0.07]" : "border-white/[0.06]"
              }`}
            >
              <span className="truncate text-foreground/90">{s.name}</span>
              <span className="hidden text-muted-foreground sm:inline">{s.where}</span>
              {s.shadow ? (
                <span className="flex shrink-0 items-center gap-1 text-rose">
                  <ShieldAlert className="size-3" /> shadow AI
                </span>
              ) : (
                <span className="shrink-0 text-emerald">approved</span>
              )}
            </li>
          </Appear>
        ))}
      </ul>
    </Panel>
  );
}

function RegistryScene({ p }: { p: number }) {
  const fields = [
    { k: "Owner", v: "Head of Credit Risk", at: 0.1 },
    { k: "Purpose", v: "Consumer loan approval scoring", at: 0.25 },
    { k: "Data", v: "Applicant financials · personal data", at: 0.4 },
  ];
  return (
    <Panel
      title="AI registry · credit-scoring-model v4"
      right={<span className="text-emerald">registered</span>}
    >
      <dl className="space-y-2 text-xs">
        {fields.map((f) => (
          <Appear key={f.k} show={p >= f.at}>
            <div className="flex justify-between gap-3 rounded-lg border border-white/[0.06] px-3 py-2">
              <dt className="text-muted-foreground">{f.k}</dt>
              <dd className="truncate text-right text-foreground/90">{f.v}</dd>
            </div>
          </Appear>
        ))}
      </dl>
      <Appear show={p >= 0.58} className="mt-3">
        <div className="flex items-center justify-between gap-2 rounded-lg border border-amber/30 bg-amber/10 px-3 py-2 text-xs">
          <span className="text-amber">EU AI Act risk class</span>
          <span className="font-semibold text-amber">High-risk · credit scoring</span>
        </div>
      </Appear>
      <Appear show={p >= 0.75} className="mt-3 flex flex-wrap gap-1.5">
        {["ISO/IEC 42001", "NIST AI RMF", "EU AI Act"].map((f) => (
          <span
            key={f}
            className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] text-primary"
          >
            {f}
          </span>
        ))}
      </Appear>
    </Panel>
  );
}

function RuntimeScene({ p }: { p: number }) {
  const events = [
    { sev: "INFO" as const, msg: "support-agent · tool_call crm.lookup", at: 0.05 },
    { sev: "INFO" as const, msg: "loan-agent · read applicant file #4471", at: 0.25 },
    { sev: "WARN" as const, msg: "credit-scoring-model · output drift +9%", at: 0.45 },
    { sev: "WARN" as const, msg: "support-agent · email to external domain", at: 0.65 },
  ];
  return (
    <Panel
      title="Runtime monitoring · models & agents"
      right={<span className="text-emerald">● live</span>}
    >
      <ul className="space-y-1.5 font-mono text-[11px]">
        {events.map((e, i) => (
          <Appear key={e.msg} show={p >= e.at}>
            <li className="flex items-center gap-2 rounded-md bg-white/[0.02] px-2 py-1.5">
              <span className="shrink-0 text-muted-foreground/60">
                10:41:{String(8 + i * 6).padStart(2, "0")}
              </span>
              <SeverityChip sev={e.sev} />
              <span className="truncate text-foreground/85">{e.msg}</span>
            </li>
          </Appear>
        ))}
      </ul>
    </Panel>
  );
}

function EgressGuardScene({ p }: { p: number }) {
  const redact = p > 0.4;
  const blocked = p > 0.7;
  const Sensitive = ({ children, mask }: { children: string; mask: string }) => (
    <span
      className={`rounded px-1 transition-all duration-500 ${
        redact ? "bg-rose/15 text-rose" : p > 0.2 ? "bg-amber/15 text-amber" : "text-foreground/85"
      }`}
    >
      {redact ? mask : children}
    </span>
  );
  return (
    <div className="space-y-3">
      <Panel
        title="Policy check · outbound prompt"
        right={<span className="text-amber">personal data scan</span>}
      >
        <p className="font-mono text-[11px] leading-6 text-foreground/85">
          Summarize repayment risk for <Sensitive mask="[PERSON]">Sara Malik</Sensitive> (
          <Sensitive mask="[EMAIL]">sara.m@example.com</Sensitive>), national ID{" "}
          <Sensitive mask="[ID]">42101-5559019-3</Sensitive>, and draft a reply.
        </p>
      </Panel>
      <Appear show={blocked}>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-rose/30 bg-rose/10 px-4 py-3 font-mono text-[11px]">
          <span className="flex items-center gap-2 text-rose">
            <ShieldAlert className="size-4 shrink-0" /> 3 identifiers redacted · event logged as
            evidence
          </span>
        </div>
      </Appear>
    </div>
  );
}

/* ------------------ Story 2: evidence that stays true ----------------- */

function CrosswalkScene({ p }: { p: number }) {
  const targets = [
    { fw: "ISO/IEC 42001", code: "A.6.2.8", text: "Event logs of AI systems" },
    { fw: "NIST AI RMF", code: "MANAGE 4.1", text: "Post-deployment monitoring" },
    { fw: "EU AI Act", code: "Art. 12", text: "Record-keeping" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/[0.07] px-4 py-3">
        <FileText className="size-5 shrink-0 text-primary" />
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">Model monitoring log · Q3</div>
          <div className="font-mono text-[10px] text-muted-foreground">
            collected automatically · 2 days ago
          </div>
        </div>
      </div>
      <div className="mx-auto h-4 w-px bg-gradient-to-b from-primary/60 to-transparent" />
      <div className="grid gap-2 sm:grid-cols-3">
        {targets.map((t, i) => {
          const on = p > 0.2 + i * 0.18;
          return (
            <div
              key={t.fw}
              className={`rounded-lg border p-3 text-xs transition-all duration-500 ${
                on ? "border-emerald/30 bg-emerald/[0.07]" : "border-white/[0.06] opacity-40"
              }`}
            >
              <div className="font-mono text-[10px] text-muted-foreground">{t.fw}</div>
              <div className="mt-1 flex items-center gap-1.5 font-medium">
                {on && <Check className="size-3.5 text-emerald" />}
                {t.code}
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{t.text}</div>
            </div>
          );
        })}
      </div>
      <Appear show={p > 0.8}>
        <p className="text-center font-mono text-[11px] text-primary">
          1 piece of evidence → 3 frameworks satisfied
        </p>
      </Appear>
    </div>
  );
}

function TwoPassScene({ p }: { p: number }) {
  const score = 0.91 * ease(seg(p, 0.05, 0.4));
  const pass2 = p > 0.5;
  const verified = p > 0.78;
  return (
    <div className="space-y-3">
      <Panel
        title="Pass 1 · evidence matched to control"
        right={<span className="text-signal">{score.toFixed(2)}</span>}
      >
        <Bar value={score} tone="bg-signal" />
        <p className="mt-2 font-mono text-[10px] text-muted-foreground">
          “Logs retained 12 months, reviewed weekly by ML Ops” → A.6.2.8
        </p>
      </Panel>
      <div
        className={`rounded-xl border p-3 text-xs transition-all duration-500 sm:p-4 ${
          pass2 ? "border-primary/30 bg-primary/[0.06]" : "border-white/[0.06] opacity-50"
        }`}
      >
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Pass 2 · independent AI review
        </div>
        <p className="mt-2 text-foreground/85">
          {pass2 ? "Evidence supports the control. No contradictions found." : "reviewing…"}
        </p>
      </div>
      <div
        className={`flex items-center justify-between rounded-xl border px-4 py-2.5 font-mono text-[11px] transition-all duration-500 ${
          verified
            ? "border-emerald/40 bg-emerald/10 text-emerald"
            : "border-white/[0.06] text-muted-foreground opacity-50"
        }`}
      >
        <span>Control A.6.2.8</span>
        <span className="font-semibold">{verified ? "✓ VERIFIED" : "pending"}</span>
      </div>
    </div>
  );
}

function DecayScene({ p }: { p: number }) {
  const day = Math.round(ease(seg(p, 0.05, 0.85)) * 120);
  const items = [
    { name: "Model monitoring log", life: 90 },
    { name: "Bias test report", life: 180 },
    { name: "Human oversight SOP", life: 365 },
  ];
  const coverage = 96 - Math.round((14 * day) / 120);
  return (
    <Panel
      title="Evidence freshness"
      right={
        <span className="flex items-center gap-1 text-muted-foreground">
          <Clock className="size-3" /> day {day}
        </span>
      }
    >
      <ul className="space-y-3">
        {items.map((it) => {
          const fresh = clamp(1 - day / it.life);
          const expired = fresh <= 0;
          const tone = expired ? "bg-rose" : fresh < 0.4 ? "bg-amber" : "bg-emerald";
          return (
            <li key={it.name} className="text-xs">
              <div className="mb-1 flex justify-between gap-2">
                <span className="truncate text-foreground/85">{it.name}</span>
                <span
                  className={`shrink-0 font-mono text-[10px] ${
                    expired ? "text-rose" : fresh < 0.4 ? "text-amber" : "text-emerald"
                  }`}
                >
                  {expired ? "expired" : `${Math.round(fresh * 100)}% fresh`}
                </span>
              </div>
              <Bar value={Math.max(fresh, 0.02)} tone={tone} />
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs">
        <span className="text-muted-foreground">ISO 42001 coverage</span>
        <span
          className={`font-mono font-semibold ${coverage < 90 ? "text-amber" : "text-emerald"}`}
        >
          {coverage}%
        </span>
      </div>
    </Panel>
  );
}

function RefreshScene({ p }: { p: number }) {
  const steps = [
    { text: "Refresh request sent to ML Ops (owner)", at: 0.1 },
    { text: "New monitoring log collected", at: 0.32 },
    { text: "Re-verified with two-pass check", at: 0.54 },
  ];
  const coverage = 82 + Math.round(15 * ease(seg(p, 0.6, 0.9)));
  return (
    <div className="space-y-3">
      <Panel
        title="Automatic evidence refresh"
        right={<RefreshCw className="size-3.5 text-primary" />}
      >
        <ul className="space-y-2">
          {steps.map((s) => (
            <Appear key={s.text} show={p >= s.at}>
              <li className="flex items-center gap-2 rounded-lg border border-white/[0.06] px-3 py-2 text-xs">
                <Check className="size-3.5 shrink-0 text-emerald" /> {s.text}
              </li>
            </Appear>
          ))}
        </ul>
      </Panel>
      <div className="flex items-center justify-between rounded-xl border border-emerald/30 bg-emerald/[0.07] px-4 py-3 text-sm">
        <span>ISO 42001 coverage</span>
        <span className="font-display text-xl font-semibold tabular-nums text-emerald">
          {coverage}%
        </span>
      </div>
    </div>
  );
}

/* --------------- Story 3: human sign-off & audit trail --------------- */

function InterceptScene({ p }: { p: number }) {
  const matched = p > 0.35;
  const held = p > 0.6;
  return (
    <div className="space-y-3">
      <Panel title="AI agent · proposed action" right={<Bot className="size-3.5 text-primary" />}>
        <p className="font-mono text-[11px] leading-6 text-foreground/85">
          loan-agent → increase credit limit to <span className="text-amber">$50,000</span> for
          applicant #4471
        </p>
      </Panel>
      <Appear show={matched}>
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-xs">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Policy rule R-12
          </div>
          <p className="mt-1 text-foreground/85">
            Credit decisions above $25,000 require human approval.
          </p>
        </div>
      </Appear>
      <Appear show={held}>
        <div className="flex items-center gap-2 rounded-xl border border-amber/40 bg-amber/10 px-4 py-3 font-mono text-[11px] text-amber">
          <TriangleAlert className="size-4 shrink-0" /> Action held · routed for human sign-off
        </div>
      </Appear>
    </div>
  );
}

function SignoffScene({ p }: { p: number }) {
  const gates = [
    { role: "Compliance Officer", at: 0.3 },
    { role: "Credit Risk Owner", at: 0.55 },
  ];
  const done = p > 0.75;
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 font-mono text-[11px] text-foreground/85">
        RISK-311 · credit limit increase · applicant #4471
      </div>
      {gates.map((g) => {
        const signed = p > g.at;
        return (
          <div
            key={g.role}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors duration-500 ${
              signed ? "border-emerald/30 bg-emerald/[0.07]" : "border-white/[0.06]"
            }`}
          >
            <span>{g.role}</span>
            {signed ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald">
                <UserCheck className="size-4" /> approved
              </span>
            ) : (
              <span className="font-mono text-[10px] text-muted-foreground">pending…</span>
            )}
          </div>
        );
      })}
      <Appear show={done}>
        <div className="flex items-center gap-2 rounded-xl border border-emerald/40 bg-emerald/10 px-4 py-3 font-mono text-[11px] text-emerald">
          <Gavel className="size-4 shrink-0" /> Decision: approved with conditions · agent released
        </div>
      </Appear>
    </div>
  );
}

function TrailScene({ p }: { p: number }) {
  const chain = ["Evidence", "Control", "Risk", "Decision"];
  return (
    <Panel
      title="Decision record · audit trail"
      right={<span className="text-primary">tamper-evident</span>}
    >
      <div className="flex items-center justify-between gap-1">
        {chain.map((c, i) => {
          const on = p > 0.1 + i * 0.15;
          return (
            <div key={c} className="flex flex-1 items-center gap-1">
              <div
                className={`flex-1 rounded-lg border px-2 py-2 text-center text-[11px] transition-all duration-500 ${
                  on
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-white/[0.06] text-muted-foreground"
                }`}
              >
                {c}
              </div>
              {i < chain.length - 1 && (
                <div
                  className={`h-px w-2 shrink-0 sm:w-4 ${on ? "bg-primary/60" : "bg-white/10"}`}
                />
              )}
            </div>
          );
        })}
      </div>
      <Appear show={p > 0.72} className="mt-4">
        <div className="space-y-1 rounded-lg bg-black/20 p-3 font-mono text-[10px] text-muted-foreground">
          <div>
            <span className="text-foreground/80">2026-10-07 10:44:12</span> · RISK-311 approved by 2
            of 2
          </div>
          <div>linked: A.6.2.8 · MANAGE 4.1 · Art. 14 · sha256 9f2c…e41a</div>
        </div>
      </Appear>
    </Panel>
  );
}

/* ------------------------------ Shared ------------------------------- */

function Outcome({
  p,
  from,
  to,
  label,
  items,
}: {
  p: number;
  from: number;
  to: number;
  label: string;
  items: string[];
}) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const value = from + (to - from) * ease(seg(p, 0.05, 0.6));
  return (
    <div className="grid items-center gap-5 sm:grid-cols-[auto_1fr]">
      <div className="relative mx-auto size-36">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="9" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="oklch(0.8 0.15 165)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - value / 100)}
            style={{ filter: "drop-shadow(0 0 8px oklch(0.8 0.15 165 / 0.6))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-semibold tabular-nums">
            {Math.round(value)}%
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <Appear key={it} show={p > 0.25 + i * 0.15}>
            <li className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs">
              <BadgeCheck className="size-4 shrink-0 text-emerald" /> {it}
            </li>
          </Appear>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ Script ------------------------------ */

type Scene = { title: string; caption: string; render: (p: number) => ReactNode };

export type DemoStory = {
  id: string;
  title: string;
  badge: string;
  heading: string;
  description: string;
  scenes: Scene[];
};

export const demoStories: DemoStory[] = [
  {
    id: "discover",
    title: "Discover & monitor AI",
    badge: "Runtime oversight",
    heading: "See every AI system, including shadow AI",
    description:
      "ReguLattice finds the AI your organization actually uses, registers it with an owner and risk class, and watches what models and agents do at runtime.",
    scenes: [
      {
        title: "Discover",
        caption:
          "ReguLattice finds every AI system in use, including shadow AI that nobody approved.",
        render: (p) => <DiscoverScene p={p} />,
      },
      {
        title: "Register",
        caption:
          "Each system gets an owner, a purpose and a risk class, and is mapped to the frameworks that apply.",
        render: (p) => <RegistryScene p={p} />,
      },
      {
        title: "Monitor",
        caption:
          "Models and AI agents are tracked at runtime, so you see what they actually do, not just what the policy says.",
        render: (p) => <RuntimeScene p={p} />,
      },
      {
        title: "Enforce",
        caption:
          "Deterministic policy checks catch risky actions, like personal data leaving your boundary, and log them as evidence.",
        render: (p) => <EgressGuardScene p={p} />,
      },
    ],
  },
  {
    id: "evidence",
    title: "Evidence that stays current",
    badge: "ISO 42001 · NIST · EU AI Act",
    heading: "Live evidence instead of spreadsheets",
    description:
      "Evidence is mapped across ISO/IEC 42001, NIST AI RMF and the EU AI Act, verified in two passes, and ages over time, so your compliance status always reflects reality.",
    scenes: [
      {
        title: "Map",
        caption:
          "One piece of evidence is mapped to matching controls across ISO 42001, NIST AI RMF and the EU AI Act.",
        render: (p) => <CrosswalkScene p={p} />,
      },
      {
        title: "Verify",
        caption:
          "Two-pass AI verification checks that the evidence really supports the control before it counts.",
        render: (p) => <TwoPassScene p={p} />,
      },
      {
        title: "Age",
        caption:
          "Evidence has a shelf life. As it ages, coverage drops, so your status never looks better than reality.",
        render: (p) => <DecayScene p={p} />,
      },
      {
        title: "Refresh",
        caption:
          "Owners are asked to refresh stale evidence, and coverage recovers once it is re-verified.",
        render: (p) => <RefreshScene p={p} />,
      },
    ],
  },
  {
    id: "signoff",
    title: "Human sign-off & audit",
    badge: "Human in the loop",
    heading: "Accountable humans, provable decisions",
    description:
      "Risky AI actions wait for accountable human approval, every decision is linked to its evidence, controls and risks, and audit-ready reports can be generated on your own infrastructure.",
    scenes: [
      {
        title: "Intercept",
        caption:
          "An AI agent tries a high-impact action. A deterministic policy rule holds it before anything happens.",
        render: (p) => <InterceptScene p={p} />,
      },
      {
        title: "Sign off",
        caption:
          "The action is routed to the right people for human sign-off, as required by EU AI Act Article 14.",
        render: (p) => <SignoffScene p={p} />,
      },
      {
        title: "Record",
        caption:
          "The decision is linked to its evidence, controls and risks, and becomes part of your audit trail.",
        render: (p) => <TrailScene p={p} />,
      },
      {
        title: "Prove it",
        caption:
          "Audit-ready reports come straight from live evidence, and everything can run on your own infrastructure.",
        render: (p) => (
          <Outcome
            p={p}
            from={64}
            to={97}
            label="Audit ready"
            items={[
              "ISO 42001 evidence report exported",
              "Every decision traceable to evidence",
              "Runs on your infrastructure with local AI models",
            ]}
          />
        ),
      },
    ],
  },
];

const SCENE_MS = 4800;

function formatTime(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Self-playing animated product demo; advances to the next story when one finishes. */
export function DemoAnimation({
  storyIndex,
  onStoryChange,
}: {
  storyIndex: number;
  onStoryChange: (index: number) => void;
}) {
  const story = demoStories[storyIndex]!;
  const total = story.scenes.length * SCENE_MS;
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const last = useRef<number | null>(null);

  useEffect(() => {
    setElapsed(0);
    setPlaying(true);
  }, [storyIndex]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    last.current = null;
    const tick = (now: number) => {
      const dt = last.current == null ? 0 : now - last.current;
      last.current = now;
      setElapsed((e) => Math.min(total, e + dt));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, total]);

  useEffect(() => {
    if (elapsed < total) return;
    const id = window.setTimeout(() => onStoryChange((storyIndex + 1) % demoStories.length), 900);
    return () => window.clearTimeout(id);
  }, [elapsed, total, storyIndex, onStoryChange]);

  const sceneIndex = Math.min(story.scenes.length - 1, Math.floor(elapsed / SCENE_MS));
  const scene = story.scenes[sceneIndex]!;
  const p = clamp((elapsed - sceneIndex * SCENE_MS) / SCENE_MS);
  const finished = elapsed >= total;

  return (
    <div className="glow-border overflow-hidden rounded-2xl">
      {/* app chrome */}
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2">
            <span className="ping-soft absolute inset-0 rounded-full bg-emerald" />
            <span className="relative size-2 rounded-full bg-emerald" />
          </span>
          <span className="truncate font-mono text-[11px] text-foreground/90">{story.title}</span>
        </div>
        <div className="hidden items-center gap-2 rounded-md border border-white/[0.06] bg-black/20 px-3 py-1 font-mono text-[10px] text-muted-foreground md:flex">
          <Search className="size-3" /> app.regulattice.com/{story.id}
        </div>
        <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] text-primary">
          {story.badge}
        </span>
      </div>

      {/* stage */}
      <div className="flex min-h-[340px] bg-card sm:h-[clamp(340px,48vh,480px)] sm:min-h-0">
        <aside className="hidden w-48 shrink-0 border-r border-white/[0.06] bg-black/10 p-3 md:block">
          <div className="mb-3 px-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">
            Workflow
          </div>
          <ol className="space-y-1">
            {story.scenes.map((s, i) => {
              const done = i < sceneIndex || finished;
              const active = i === sceneIndex && !finished;
              return (
                <li
                  key={s.title}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : done
                        ? "text-foreground/80"
                        : "text-muted-foreground/60"
                  }`}
                >
                  <span
                    className={`flex size-4 shrink-0 items-center justify-center rounded-full border text-[9px] ${
                      done
                        ? "border-emerald bg-emerald text-background"
                        : active
                          ? "border-primary"
                          : "border-white/15"
                    }`}
                  >
                    {done ? <Check className="size-2.5" /> : i + 1}
                  </span>
                  {s.title}
                </li>
              );
            })}
          </ol>
        </aside>

        <div className="relative flex min-w-0 flex-1 flex-col justify-center overflow-hidden p-4 sm:p-8">
          <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div
            className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            key={`${story.id}-${sceneIndex}`}
            className="rise-in relative mx-auto w-full max-w-xl"
          >
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
              Step {sceneIndex + 1} · {scene.title}
            </div>
            {scene.render(p)}
          </div>
        </div>
      </div>

      {/* caption (subtitle) */}
      <div
        className="border-t border-white/[0.06] bg-black/20 px-4 py-3 text-center text-sm text-foreground/85"
        aria-live="polite"
      >
        {scene.caption}
      </div>

      {/* controls */}
      <div className="flex items-center gap-3 border-t border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <button
          type="button"
          onClick={() => {
            if (finished) setElapsed(0);
            setPlaying((v) => !v || finished);
          }}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-foreground transition-colors hover:bg-white/20"
          aria-label={finished ? "Replay" : playing ? "Pause" : "Play"}
        >
          {finished ? (
            <RotateCcw className="size-3.5" />
          ) : playing ? (
            <Pause className="size-3.5 fill-current" />
          ) : (
            <Play className="size-3.5 fill-current" />
          )}
        </button>
        <div className="flex flex-1 gap-1">
          {story.scenes.map((s, i) => {
            const fill = clamp((elapsed - i * SCENE_MS) / SCENE_MS);
            return (
              <button
                key={s.title}
                type="button"
                onClick={() => setElapsed(i * SCENE_MS)}
                className="group flex-1 py-2"
                aria-label={`Jump to step ${i + 1}: ${s.title}`}
              >
                <div className="h-1 overflow-hidden rounded-full bg-white/10 transition-all group-hover:h-1.5">
                  <div className="h-full bg-brand-gradient" style={{ width: `${fill * 100}%` }} />
                </div>
              </button>
            );
          })}
        </div>
        <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">
          {formatTime(elapsed)} / {formatTime(total)}
        </span>
      </div>
    </div>
  );
}
