import { useEffect, useState } from "react";
import {
  Check,
  Eye,
  FileText,
  Network,
  Radio,
  UserCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { SeverityChip, telemetryEvents, useTicker } from "./hero-dashboard";

export type Pillar = {
  id: string;
  tag: string;
  title: string;
  icon: LucideIcon;
  description: string;
  bullets: { label: string; text: string }[];
};

export const aiPillars: Pillar[] = [
  {
    id: "01",
    tag: "Discovery Agent",
    title: "Continuous AI footprint & developer tool discovery",
    icon: Network,
    description:
      "Automatically catalog all deployed models, endpoints, data flows, and third-party AI tools across SaaS providers, local runtimes, and developer IDEs.",
    bullets: [
      {
        label: "Native API gateway integration",
        text: "Direct verification for OpenAI, Anthropic, Google Gemini, Ollama (local LLMs), and GitHub.",
      },
      {
        label: "Real-time credential validation",
        text: "Live authentication checks that test API keys against active vendor endpoints.",
      },
      {
        label: "Shadow AI detection",
        text: "Automatically tag unapproved AI tools and models operating outside policy boundaries.",
      },
    ],
  },
  {
    id: "02",
    tag: "Verification Agent",
    title: "Dual-pass evidence & policy verification",
    icon: Eye,
    description:
      "Eliminate false positives and hallucinated compliance reports with dual-pass semantic verification.",
    bullets: [
      {
        label: "Primary pass",
        text: "Deterministic RAG evaluation — vector chunking and TF-IDF cosine scoring against ISO 42001 & EU AI Act controls.",
      },
      {
        label: "Secondary pass",
        text: "Multi-model consensus cross-examination flags contradictions, missing evidence, and policy drift.",
      },
      {
        label: "Granular lineage",
        text: "Complete traceability from raw evidence snippets to final compliance scoring.",
      },
    ],
  },
  {
    id: "03",
    tag: "Telemetry Agent",
    title: "Unified telemetry event log — the Flight Recorder",
    icon: Radio,
    description:
      "Continuous operational observability into AI system execution, agent tool usage, and prompt drift.",
    bullets: [
      {
        label: "Live 5-second stream",
        text: "Events classified into INFO, WARN, SECURITY_ALERT, and HALLUCINATION_FLAG.",
      },
      {
        label: "One-click human triage",
        text: "Confirm systemic errors or flag false positives to maintain model precision.",
      },
      {
        label: "EU AI Act Articles 72 & 73 support",
        text: "Log retention and incident audit trails that support post-market monitoring and serious-incident reporting.",
      },
    ],
  },
  {
    id: "04",
    tag: "Remediation Agent",
    title: "Gated-autonomy remediation pipeline",
    icon: Workflow,
    description:
      "Enforce strict human oversight over high-risk AI remediations with role-gated Kanban workflows.",
    bullets: [
      {
        label: "Interactive remediation Kanban",
        text: "Track risk SLA timers through Open, In Assessment, Pending Approval, and Remediated.",
      },
      {
        label: "Multi-role approver gates",
        text: "Dual sign-off from designated Compliance Officers and AI Safety Engineers.",
      },
      {
        label: "RLHF governance loop",
        text: "Field-level human overrides (AIFieldAuditTrail) train fine-tuned compliance policy engines.",
      },
    ],
  },
];

/* ---------------- Visual 1: discovery radar ---------------- */

const blips = [
  { x: 30, y: 28, label: "OpenAI", shadow: false },
  { x: 72, y: 24, label: "Claude", shadow: false },
  { x: 78, y: 64, label: "Gemini", shadow: false },
  { x: 24, y: 70, label: "Ollama", shadow: false },
  { x: 54, y: 82, label: "Cursor · unapproved", shadow: true },
  { x: 46, y: 16, label: "Copilot", shadow: false },
];

function DiscoveryVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      {[100, 75, 50, 25].map((s) => (
        <div
          key={s}
          className="absolute rounded-full border border-primary/15"
          style={{ inset: `${(100 - s) / 2}%` }}
        />
      ))}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.8_0.13_180/0.12),transparent_70%)]" />
      <div className="radar-sweep absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,oklch(0.8_0.13_180/0.45)_360deg)]" />
      <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
      {blips.map((b, i) => (
        <div
          key={b.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
        >
          <span className="relative flex size-2.5">
            <span
              className={`ping-soft absolute inset-0 rounded-full ${b.shadow ? "bg-rose" : "bg-primary"}`}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <span
              className={`relative size-2.5 rounded-full ${b.shadow ? "bg-rose" : "bg-primary"}`}
            />
          </span>
          <span
            className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border px-2 py-0.5 font-mono text-[10px] backdrop-blur-sm ${
              b.shadow
                ? "border-rose/30 bg-rose/10 text-rose"
                : "border-white/10 bg-background/70 text-foreground/80"
            }`}
          >
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Visual 2: dual-pass verification ---------------- */

function VerificationVisual({ tick }: { tick: number }) {
  const stage = tick % 4; // 0: evidence, 1: pass 1, 2: pass 2, 3: verdict
  return (
    <div className="mx-auto w-full max-w-md space-y-3 font-mono text-[11px]">
      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
        <div className="scan-line pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileText className="size-3.5 text-primary" /> evidence/model-monitoring-sop.pdf
        </div>
        <div className="mt-3 space-y-1.5">
          {[92, 78, 85, 60].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/[0.07]" style={{ width: `${w}%` }}>
              {i === 1 && <div className="h-full w-1/2 rounded-full bg-primary/50" />}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`rounded-xl border p-4 transition-all duration-500 ${stage >= 1 ? "border-signal/30 bg-signal/[0.05]" : "border-white/[0.06] opacity-50"}`}
      >
        <div className="flex items-center justify-between">
          <span className="text-foreground">Pass 1 · Deterministic RAG</span>
          <span className="text-signal">cos 0.87</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-signal transition-all duration-1000"
            style={{ width: stage >= 1 ? "87%" : "0%" }}
          />
        </div>
      </div>

      <div
        className={`rounded-xl border p-4 transition-all duration-500 ${stage >= 2 ? "border-primary/30 bg-primary/[0.05]" : "border-white/[0.06] opacity-50"}`}
      >
        <div className="text-foreground">Pass 2 · Model consensus</div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {["Claude", "GPT-4o", "Gemini"].map((m, i) => (
            <span
              key={m}
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 transition-all duration-500 ${
                stage >= 2
                  ? "border-primary/30 text-primary"
                  : "border-white/10 text-muted-foreground"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {stage >= 2 && <Check className="size-3" />} {m}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-500 ${
          stage >= 3
            ? "border-emerald/40 bg-emerald/10 text-emerald"
            : "border-white/[0.06] text-muted-foreground opacity-50"
        }`}
      >
        <span>ISO 42001 · A.6.2.8</span>
        <span className="font-semibold">{stage >= 3 ? "✓ VERIFIED" : "evaluating…"}</span>
      </div>
    </div>
  );
}

/* ---------------- Visual 3: flight recorder ---------------- */

function TelemetryVisual({ tick }: { tick: number }) {
  const rows = Array.from({ length: 7 }, (_, i) => {
    const idx = (tick + i) % telemetryEvents.length;
    return { ...telemetryEvents[idx]!, key: tick + i };
  }).reverse();
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-white/[0.08] bg-black/30 font-mono text-[11px]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5 text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="signal-pulse size-1.5 rounded-full bg-emerald" /> flight-recorder.stream
        </span>
        <span>retention: per policy</span>
      </div>
      <ul className="space-y-1 p-3">
        {rows.map((e, i) => (
          <li
            key={e.key}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${i === 0 ? "rise-in bg-white/[0.04]" : ""}`}
            style={{ opacity: 1 - i * 0.11 }}
          >
            <span className="shrink-0 text-muted-foreground/60">
              {String(9 + ((e.key * 7) % 50)).padStart(2, "0")}:
              {String((e.key * 13) % 60).padStart(2, "0")}
            </span>
            <SeverityChip sev={e.sev} />
            <span className="truncate text-foreground/85">{e.msg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Visual 4: remediation kanban ---------------- */

const columns = ["Open", "Assessment", "Approval", "Remediated"];

function RemediationVisual({ tick }: { tick: number }) {
  const pos = tick % columns.length;
  return (
    <div className="mx-auto grid w-full max-w-lg grid-cols-4 gap-2 font-mono text-[10px]">
      {columns.map((col, ci) => (
        <div
          key={col}
          className="min-h-[260px] rounded-xl border border-white/[0.06] bg-white/[0.02] p-2"
        >
          <div className="mb-2 flex items-center justify-between px-1 text-muted-foreground">
            <span className="truncate">{col}</span>
          </div>
          <div className="space-y-2">
            {ci === pos && (
              <div className="rise-in rounded-lg border border-primary/40 bg-primary/10 p-2 shadow-[var(--shadow-glow)]">
                <div className="font-semibold text-primary">RISK-204</div>
                <div className="mt-1 leading-snug text-foreground/80">Shadow AI in Cursor IDE</div>
                {ci === 2 && (
                  <div className="mt-2 space-y-1 text-[9px]">
                    <div className="flex items-center gap-1 text-emerald">
                      <UserCheck className="size-3" /> Compliance
                    </div>
                    <div className="flex items-center gap-1 text-amber">
                      <UserCheck className="size-3" /> AI Safety…
                    </div>
                  </div>
                )}
                {ci === 3 && <div className="mt-2 text-[9px] text-emerald">✓ 2/2 gates signed</div>}
              </div>
            )}
            {Array.from({ length: [2, 1, 1, 3][ci] ?? 0 }, (_, k) => (
              <div key={k} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/[0.06]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Showcase ---------------- */

export function AgentShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tick = useTicker(1000, 1500);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % aiPillars.length), 7000);
    return () => window.clearInterval(id);
  }, [paused]);

  const pillar = aiPillars[active]!;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
      <div className="space-y-3">
        {aiPillars.map((p, i) => {
          const Icon = p.icon;
          const isActive = i === active;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ${
                isActive
                  ? "border-primary/30 bg-white/[0.04]"
                  : "border-white/[0.06] bg-transparent hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                    isActive
                      ? "border-primary/40 bg-primary/15 text-primary"
                      : "border-white/10 text-muted-foreground"
                  }`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary/80">
                    {p.id} · {p.tag}
                  </div>
                  <h3
                    className={`mt-1 font-display text-lg font-semibold ${isActive ? "text-foreground" : "text-foreground/70"}`}
                  >
                    {p.title}
                  </h3>
                  <div
                    className={`grid transition-all duration-500 ${isActive ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm leading-6 text-muted-foreground">{p.description}</p>
                      <ul className="mt-4 space-y-2.5">
                        {p.bullets.map((b) => (
                          <li key={b.label} className="flex gap-2.5 text-[13px] leading-5">
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>
                              <span className="font-medium text-foreground">{b.label}.</span>{" "}
                              <span className="text-muted-foreground">{b.text}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {isActive && !paused && (
                <div
                  key={active}
                  className="absolute bottom-0 left-0 h-px w-full origin-left bg-brand-gradient"
                  style={{ animation: "fill-bar 7s linear both" }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-3xl border border-white/[0.07] bg-card/60 p-6 sm:p-10">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {pillar.tag} · live
        </div>
        <div key={active} className="rise-in relative w-full">
          {active === 0 && <DiscoveryVisual />}
          {active === 1 && <VerificationVisual tick={tick} />}
          {active === 2 && <TelemetryVisual tick={tick} />}
          {active === 3 && <RemediationVisual tick={tick} />}
        </div>
      </div>
    </div>
  );
}
