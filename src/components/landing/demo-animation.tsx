import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BadgeCheck,
  Check,
  FileText,
  KeyRound,
  Pause,
  Play,
  RotateCcw,
  Search,
  ShieldAlert,
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

/* ------------------------------ Gemini ------------------------------ */

function GeminiDiscover({ p }: { p: number }) {
  const endpoints = [
    { name: "openai/gpt-4o", where: "CX Platform", at: 0.15 },
    { name: "anthropic/claude-3.5", where: "Engineering", at: 0.3 },
    { name: "google/gemini-1.5-pro", where: "Marketing Ops", at: 0.45, focus: true },
    { name: "ollama/llama3:70b", where: "Data Science", at: 0.6 },
  ];
  return (
    <Panel
      title="Discovery agent · scanning workspace"
      right={<span className="text-primary">{Math.round(ease(seg(p, 0, 0.7)) * 248)} assets</span>}
    >
      <div className="relative mb-3 h-1 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="absolute inset-y-0 w-1/4 rounded-full bg-primary/70"
          style={{ left: `${(p * 300) % 100}%` }}
        />
      </div>
      <ul className="space-y-2 font-mono text-[11px]">
        {endpoints.map((e) => {
          const validated = e.focus && p > 0.75;
          return (
            <Appear key={e.name} show={p >= e.at}>
              <li
                className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 ${
                  e.focus ? "border-primary/40 bg-primary/[0.07]" : "border-white/[0.06]"
                }`}
              >
                <span className="truncate text-foreground/90">{e.name}</span>
                <span className="hidden text-muted-foreground sm:inline">{e.where}</span>
                {e.focus ? (
                  <span
                    className={`flex shrink-0 items-center gap-1 ${validated ? "text-emerald" : "text-amber"}`}
                  >
                    <KeyRound className="size-3" /> {validated ? "key valid" : "validating…"}
                  </span>
                ) : (
                  <span className="shrink-0 text-emerald">registered</span>
                )}
              </li>
            </Appear>
          );
        })}
      </ul>
    </Panel>
  );
}

function GeminiTelemetry({ p }: { p: number }) {
  const events = [
    { sev: "INFO" as const, msg: "gemini-1.5-pro · session opened · mkt-ops", at: 0.05 },
    { sev: "INFO" as const, msg: "prompt received · 1,284 tokens", at: 0.25 },
    { sev: "WARN" as const, msg: "prompt drift +9% vs. 30-day baseline", at: 0.45 },
    { sev: "INFO" as const, msg: "tool_call: crm.export_contacts", at: 0.65 },
  ];
  return (
    <Panel
      title="Flight Recorder · live stream"
      right={<span className="text-emerald">● recording</span>}
    >
      <ul className="space-y-1.5 font-mono text-[11px]">
        {events.map((e, i) => (
          <Appear key={e.msg} show={p >= e.at}>
            <li className="flex items-center gap-2 rounded-md bg-white/[0.02] px-2 py-1.5">
              <span className="shrink-0 text-muted-foreground/60">
                14:02:{String(11 + i * 5).padStart(2, "0")}
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

function GeminiGuardrail({ p }: { p: number }) {
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
        title="Egress inspection · outbound prompt"
        right={<span className="text-amber">PII scan</span>}
      >
        <p className="font-mono text-[11px] leading-6 text-foreground/85">
          Summarize churn risk for <Sensitive mask="[PERSON]">Maria Gonzales</Sensitive> (
          <Sensitive mask="[EMAIL]">maria.g@acme-corp.com</Sensitive>), SSN{" "}
          <Sensitive mask="[SSN]">412-55-0193</Sensitive>, and draft a retention offer.
        </p>
      </Panel>
      <Appear show={blocked}>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-rose/30 bg-rose/10 px-4 py-3 font-mono text-[11px]">
          <span className="flex items-center gap-2 text-rose">
            <ShieldAlert className="size-4" /> SECURITY_ALERT · 3 identifiers redacted before egress
          </span>
          <span className="hidden text-muted-foreground sm:inline">policy DP-07</span>
        </div>
      </Appear>
    </div>
  );
}

function ControlMapping({
  p,
  title,
  controls,
}: {
  p: number;
  title: string;
  controls: { code: string; text: string }[];
}) {
  return (
    <Panel title={title} right={<span className="text-primary">evidence linked</span>}>
      <ul className="space-y-2">
        {controls.map((c, i) => {
          const done = p > 0.15 + i * 0.2;
          return (
            <li
              key={c.code}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-xs transition-colors duration-500 ${
                done ? "border-emerald/25 bg-emerald/[0.06]" : "border-white/[0.06]"
              }`}
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                  done ? "bg-emerald text-background" : "bg-white/[0.06] text-transparent"
                }`}
              >
                <Check className="size-3" />
              </span>
              <span className="font-mono text-foreground/90">{c.code}</span>
              <span className="truncate text-muted-foreground">{c.text}</span>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

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
          <Appear key={it} show={p > 0.35 + i * 0.15}>
            <li className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs">
              <BadgeCheck className="size-4 shrink-0 text-emerald" /> {it}
            </li>
          </Appear>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ Claude ------------------------------ */

function ClaudeIngest({ p }: { p: number }) {
  const chunks = [
    "§2 Model monitoring cadence",
    "§4.2 Human review of outputs",
    "§5 Incident escalation",
    "§7 Log retention",
  ];
  return (
    <Panel
      title="Evidence ingest · ai-oversight-policy.pdf"
      right={<span className="text-primary">{Math.round(seg(p, 0, 0.8) * 42)} chunks</span>}
    >
      <div className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-black/20 p-3">
        <div
          className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          style={{ top: `${seg(p, 0, 0.8) * 100 - 15}%` }}
        />
        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <FileText className="size-3.5 text-primary" /> 18 pages · v3.1 · owner: GRC
        </div>
        <ul className="space-y-1.5 font-mono text-[11px]">
          {chunks.map((ch, i) => (
            <Appear key={ch} show={p > 0.1 + i * 0.17}>
              <li className="flex items-center justify-between rounded bg-white/[0.03] px-2 py-1">
                <span className="truncate text-foreground/85">{ch}</span>
                <span className="text-muted-foreground">vec ✓</span>
              </li>
            </Appear>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

function ClaudePassOne({ p }: { p: number }) {
  const rows = [
    { k: "ISO 42001 A.6.2.6", v: 0.91 },
    { k: "EU AI Act Art. 14", v: 0.87 },
    { k: "EU AI Act Art. 73", v: 0.62 },
  ];
  return (
    <Panel
      title="Pass 1 · deterministic RAG scoring"
      right={<span className="text-signal">cosine similarity</span>}
    >
      <ul className="space-y-3 font-mono text-[11px]">
        {rows.map((r, i) => {
          const v = r.v * ease(seg(p, 0.1 + i * 0.15, 0.55 + i * 0.15));
          const weak = r.v < 0.7 && p > 0.75;
          return (
            <li key={r.k}>
              <div className="mb-1 flex justify-between">
                <span className="text-foreground/85">{r.k}</span>
                <span className={weak ? "text-amber" : "text-signal"}>
                  {v.toFixed(2)} {weak && "· needs review"}
                </span>
              </div>
              <Bar value={v} tone={weak ? "bg-amber" : "bg-signal"} />
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

function ClaudePassTwo({ p }: { p: number }) {
  const models = [
    { name: "Claude", verdict: "supported", ok: true },
    { name: "GPT-4o", verdict: "supported", ok: true },
    { name: "Gemini", verdict: "contradiction", ok: false },
  ];
  return (
    <div className="space-y-3">
      <Panel
        title="Pass 2 · multi-model consensus"
        right={<span className="text-primary">3 judges</span>}
      >
        <div className="grid grid-cols-3 gap-2">
          {models.map((m, i) => {
            const shown = p > 0.15 + i * 0.18;
            return (
              <div
                key={m.name}
                className={`rounded-lg border p-2.5 text-center transition-all duration-500 ${
                  !shown
                    ? "border-white/[0.06] opacity-50"
                    : m.ok
                      ? "border-emerald/30 bg-emerald/[0.06]"
                      : "border-amber/40 bg-amber/10"
                }`}
              >
                <div className="text-xs font-medium">{m.name}</div>
                <div
                  className={`mt-1 font-mono text-[10px] ${!shown ? "text-muted-foreground" : m.ok ? "text-emerald" : "text-amber"}`}
                >
                  {shown ? m.verdict : "evaluating…"}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
      <Appear show={p > 0.72}>
        <div className="flex items-center gap-2 rounded-xl border border-amber/30 bg-amber/10 px-4 py-3 font-mono text-[11px] text-amber">
          <SeverityChip sev="HALLUCINATION_FLAG" /> Art. 73 evidence disputed → routed to human
          review
        </div>
      </Appear>
    </div>
  );
}

function ClaudeApproval({ p }: { p: number }) {
  const cols = ["Open", "Assessment", "Approval", "Done"];
  const pos = p < 0.2 ? 0 : p < 0.4 ? 1 : p < 0.85 ? 2 : 3;
  const gates = [
    { role: "Compliance Officer", at: 0.55 },
    { role: "AI Safety Engineer", at: 0.75 },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2 font-mono text-[10px]">
        {cols.map((c, i) => (
          <div
            key={c}
            className="min-h-[84px] rounded-lg border border-white/[0.06] bg-white/[0.02] p-1.5"
          >
            <div className="mb-1.5 truncate px-1 text-muted-foreground">{c}</div>
            {i === pos && (
              <div className="rise-in rounded-md border border-primary/40 bg-primary/10 p-1.5 text-primary">
                RISK-311
                <div className="mt-0.5 truncate text-[9px] text-foreground/75">
                  Art. 73 evidence gap
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {gates.map((g) => {
          const signed = p > g.at;
          return (
            <div
              key={g.role}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs transition-colors duration-500 ${
                signed ? "border-emerald/30 bg-emerald/[0.07]" : "border-white/[0.06]"
              }`}
            >
              <span>{g.role}</span>
              {signed ? (
                <UserCheck className="size-4 text-emerald" />
              ) : (
                <span className="font-mono text-[10px] text-muted-foreground">pending</span>
              )}
            </div>
          );
        })}
      </div>
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
    id: "gemini",
    title: "Google Gemini governance",
    badge: "Gemini 1.5 Pro",
    heading: "Gemini prompt & egress guardrails",
    description:
      "Autonomous discovery and telemetry inspection of Gemini endpoints with continuous data egress monitoring and ISO/IEC 42001 audit compliance.",
    scenes: [
      {
        title: "Discover",
        caption:
          "The Discovery agent finds every model endpoint in the workspace and validates the Gemini API key live.",
        render: (p) => <GeminiDiscover p={p} />,
      },
      {
        title: "Monitor",
        caption:
          "Every Gemini session streams into the Flight Recorder — prompts, tool calls and drift, in real time.",
        render: (p) => <GeminiTelemetry p={p} />,
      },
      {
        title: "Guard egress",
        caption:
          "Personal data is detected and redacted before the prompt ever leaves your boundary.",
        render: (p) => <GeminiGuardrail p={p} />,
      },
      {
        title: "Map controls",
        caption: "Each event is linked as evidence to ISO/IEC 42001 controls automatically.",
        render: (p) => (
          <ControlMapping
            p={p}
            title="ISO/IEC 42001 · control mapping"
            controls={[
              { code: "A.6.2.8", text: "Event logging" },
              { code: "A.7.2", text: "Data provenance" },
              { code: "A.7.3", text: "Egress boundaries" },
              { code: "A.10.3", text: "Supplier governance" },
            ]}
          />
        ),
      },
      {
        title: "Prove it",
        caption: "Compliance posture updates instantly — with an audit pack ready for regulators.",
        render: (p) => (
          <Outcome
            p={p}
            from={71}
            to={94}
            label="ISO 42001"
            items={[
              "Gemini endpoint registered & owned",
              "PII egress blocked and logged",
              "Audit pack sealed · SHA-256",
            ]}
          />
        ),
      },
    ],
  },
  {
    id: "claude",
    title: "Anthropic Claude verification",
    badge: "Claude 3.5 Sonnet",
    heading: "Claude evidence & gated human sign-off",
    description:
      "Dual-pass RAG evaluation for policy drift detection, contradiction checks, and EU AI Act Article 14 gated human override approval pipelines.",
    scenes: [
      {
        title: "Ingest",
        caption: "Your AI oversight policy is chunked and embedded as verifiable evidence.",
        render: (p) => <ClaudeIngest p={p} />,
      },
      {
        title: "Pass 1",
        caption: "Deterministic RAG scores each control — weak evidence is surfaced, not hidden.",
        render: (p) => <ClaudePassOne p={p} />,
      },
      {
        title: "Pass 2",
        caption:
          "Three models cross-examine the evidence. A contradiction is flagged instead of hallucinated away.",
        render: (p) => <ClaudePassTwo p={p} />,
      },
      {
        title: "Human gate",
        caption:
          "The gap becomes a remediation ticket that needs dual human sign-off — EU AI Act Article 14.",
        render: (p) => <ClaudeApproval p={p} />,
      },
      {
        title: "Prove it",
        caption: "Verified, human-approved and fully traceable from evidence snippet to score.",
        render: (p) => (
          <Outcome
            p={p}
            from={78}
            to={96}
            label="EU AI Act"
            items={[
              "Art. 14 human oversight satisfied",
              "Art. 73 evidence gap remediated",
              "Full lineage exported for audit",
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
