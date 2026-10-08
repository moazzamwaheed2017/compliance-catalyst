import {
  BadgeCheck,
  Bot,
  FileSearch,
  GitPullRequest,
  ShieldAlert,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import type { ReactNode } from "react";

import { useTicker } from "./hero-dashboard";
import { Reveal, useInView } from "./reveal";

function Card({
  icon: Icon,
  title,
  text,
  children,
  className = "",
  delay = 0,
}: {
  icon: typeof Bot;
  title: string;
  text: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-card/70 p-6 transition-colors duration-500 hover:border-primary/30 sm:p-7">
        <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-primary/0 blur-3xl transition-colors duration-700 group-hover:bg-primary/15" />
        <div className="relative flex-1">{children}</div>
        <div className="relative mt-6">
          <div className="flex items-center gap-2 text-primary">
            <Icon className="size-4" />
            <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
        </div>
      </article>
    </Reveal>
  );
}

function ShadowAiVisual() {
  const tools = [
    { name: "ChatGPT Enterprise", ok: true },
    { name: "Claude Code", ok: true },
    { name: "Personal Gemini key", ok: false },
    { name: "GitHub Copilot", ok: true },
    { name: "Unknown local LLM :11434", ok: false },
  ];
  const tick = useTicker(tools.length, 1400);
  const scanning = tick % tools.length;
  return (
    <ul className="space-y-2 font-mono text-[11px]">
      {tools.map((t, i) => (
        <li
          key={t.name}
          className={`flex items-center justify-between rounded-lg border px-3 py-2 transition-all duration-500 ${
            i === scanning
              ? "border-primary/40 bg-primary/[0.07]"
              : "border-white/[0.06] bg-white/[0.015]"
          }`}
        >
          <span className="truncate text-foreground/85">{t.name}</span>
          {t.ok ? (
            <span className="text-emerald">approved</span>
          ) : (
            <span className="flex items-center gap-1 text-rose">
              <ShieldAlert className="size-3" /> shadow AI
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

const codeLines = [
  { t: '$ claude "refactor billing service"', c: "text-foreground/90" },
  { t: "→ tool_call: fs.read  src/billing/*.ts", c: "text-muted-foreground" },
  { t: "→ tool_call: shell   npm test", c: "text-muted-foreground" },
  { t: "⚑ policy: secrets egress blocked", c: "text-amber" },
  { t: "✓ logged to Flight Recorder #A-1182", c: "text-emerald" },
];

function IdeVisual() {
  const tick = useTicker(codeLines.length + 2, 900);
  const shown = (tick % (codeLines.length + 2)) + 1;
  return (
    <div className="rounded-xl border border-white/[0.07] bg-black/30 p-4 font-mono text-[11px] leading-6">
      {codeLines.slice(0, Math.min(shown, codeLines.length)).map((l) => (
        <div key={l.t} className={`rise-in truncate ${l.c}`}>
          {l.t}
        </div>
      ))}
      <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-primary" />
    </div>
  );
}

function DriftVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const path = "M0 60 C 30 58, 50 52, 80 55 S 130 50, 160 48 S 200 30, 230 34 S 270 14, 300 10";
  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 300 80" className="h-28 w-full overflow-visible">
        <defs>
          <linearGradient id="drift-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.83 0.15 80)" stopOpacity="0.3" />
            <stop offset="1" stopColor="oklch(0.83 0.15 80)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          x2="300"
          y1="40"
          y2="40"
          stroke="oklch(0.7 0.18 15 / 0.5)"
          strokeDasharray="4 4"
        />
        <text x="0" y="52" fontSize="9" fill="oklch(0.7 0.18 15)" fontFamily="var(--font-code)">
          drift threshold
        </text>
        <path
          d={`${path} L300 80 L0 80 Z`}
          fill="url(#drift-fill)"
          opacity={inView ? 1 : 0}
          style={{ transition: "opacity 1.2s 0.6s" }}
        />
        <path
          d={path}
          fill="none"
          stroke="oklch(0.83 0.15 80)"
          strokeWidth="2"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={inView ? 0 : 1}
          style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.2,0.7,0.2,1)" }}
        />
        <circle cx="300" cy="10" r="4" fill="oklch(0.83 0.15 80)" className="signal-pulse" />
      </svg>
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span>support-bot · 30d</span>
        <span className="text-amber">+18% semantic drift</span>
      </div>
    </div>
  );
}

function ApprovalVisual() {
  const tick = useTicker(4, 1300);
  const step = tick % 4;
  const gates = [
    { role: "Compliance Officer", name: "J. Alvarez" },
    { role: "AI Safety Engineer", name: "P. Chen" },
  ];
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 font-mono text-[11px]">
        <GitPullRequest className="size-3.5 text-primary" /> Auto-remediation: rotate exposed key
      </div>
      {gates.map((g, i) => {
        const signed = step > i;
        return (
          <div
            key={g.role}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs transition-all duration-500 ${
              signed ? "border-emerald/30 bg-emerald/[0.08]" : "border-white/[0.06]"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-semibold">
                {g.name.split(" ")[1]?.[0]}
              </span>
              <span>
                <span className="block text-foreground/90">{g.role}</span>
                <span className="block text-[10px] text-muted-foreground">{g.name}</span>
              </span>
            </span>
            {signed ? (
              <UserCheck className="size-4 text-emerald" />
            ) : (
              <span className="font-mono text-[10px] text-muted-foreground">pending…</span>
            )}
          </div>
        );
      })}
      <div
        className={`text-right font-mono text-[10px] transition-colors ${step >= 2 ? "text-emerald" : "text-muted-foreground"}`}
      >
        {step >= 2 ? "✓ Art. 14 human oversight satisfied" : "awaiting 2 of 2 gates"}
      </div>
    </div>
  );
}

function EvidenceVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const items = [
    { k: "Art. 9  Risk management", v: 100 },
    { k: "Art. 14 Human oversight", v: 92 },
    { k: "Art. 72 Post-market", v: 84 },
  ];
  return (
    <div ref={ref} className="space-y-3">
      {items.map((it, i) => (
        <div key={it.k}>
          <div className="mb-1.5 flex justify-between font-mono text-[11px]">
            <span className="text-foreground/85">{it.k}</span>
            <span className="text-primary">{it.v}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-brand-gradient"
              style={{
                width: inView ? `${it.v}%` : "0%",
                transition: `width 1.4s cubic-bezier(0.2,0.7,0.2,1) ${i * 180}ms`,
              }}
            />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-emerald">
        <BadgeCheck className="size-3.5" /> Audit pack exported · SHA-256 sealed
      </div>
    </div>
  );
}

export function UseCases() {
  return (
    <div className="grid gap-5 md:grid-cols-6">
      <Card
        className="md:col-span-3"
        icon={ShieldAlert}
        title="Shadow AI detection"
        text="Find every model, API key, and AI tool in use — sanctioned or not — and route unapproved usage into review automatically."
      >
        <ShadowAiVisual />
      </Card>
      <Card
        className="md:col-span-3"
        delay={100}
        icon={Bot}
        title="Agentic IDE governance"
        text="Govern coding agents like Claude Code, Cursor, and Copilot with tool-call telemetry and policy guardrails engineers don't feel."
      >
        <IdeVisual />
      </Card>
      <Card
        className="md:col-span-2"
        icon={TrendingUp}
        title="Prompt & model drift"
        text="Catch semantic drift before customers do, with thresholds mapped to your risk appetite."
      >
        <DriftVisual />
      </Card>
      <Card
        className="md:col-span-2"
        delay={100}
        icon={UserCheck}
        title="Human-in-the-loop approvals"
        text="Dual sign-off gates keep high-risk remediations under accountable human control."
      >
        <ApprovalVisual />
      </Card>
      <Card
        className="md:col-span-2"
        delay={200}
        icon={FileSearch}
        title="Audit-ready evidence"
        text="Every control backed by traceable, verified evidence — exportable for regulators in one click."
      >
        <EvidenceVisual />
      </Card>
    </div>
  );
}
