import {
  AppWindow,
  Bot,
  Boxes,
  Check,
  Code2,
  Cpu,
  Database,
  EyeOff,
  Plug,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";

import logoAsset from "@/assets/regulattice-logo.jpg";
import { useInView } from "@/components/landing/reveal";

import { useEdges, useReducedMotion } from "./motion";

/* ------------------- AI everywhere → governed AI ------------------- */

const everywhere = [
  { label: "Models", icon: Boxes },
  { label: "Agents", icon: Bot },
  { label: "APIs", icon: Plug },
  { label: "Copilots", icon: Sparkles },
  { label: "Developer tools", icon: Code2 },
  { label: "Shadow AI", icon: EyeOff },
];
const governed = [
  "Inventory",
  "Risk assessment",
  "Policies",
  "Human oversight",
  "Monitoring",
  "Evidence",
];

export function AdoptionComparison() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-0">
      <div className="card-soft p-6">
        <div className="font-display text-lg font-semibold">AI everywhere</div>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {everywhere.map(({ label, icon: Icon }, i) => (
            <li
              key={label}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all duration-700 ${
                label === "Shadow AI"
                  ? "border-dashed border-rose/50 text-rose"
                  : "border-border text-foreground"
              }`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(6px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <Icon className="size-4 shrink-0" /> {label}
            </li>
          ))}
        </ul>
      </div>

      {/* governance layer between them */}
      <div className="relative flex items-center justify-center py-2 md:px-6 md:py-0">
        <div className="flex items-center gap-3 rounded-2xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] md:h-full md:flex-col md:justify-center md:px-3 md:py-6">
          <img
            src={logoAsset}
            alt=""
            className="size-8 rounded-lg object-cover ring-2 ring-white/40"
          />
          <span className="md:[writing-mode:vertical-rl] md:rotate-180">
            ReguLattice governance layer
          </span>
        </div>
      </div>

      <div className="card-soft p-6">
        <div className="font-display text-lg font-semibold">Governed AI</div>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {governed.map((label, i) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm"
            >
              <span
                className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald text-white transition-all duration-500"
                style={{
                  opacity: inView ? 1 : 0.15,
                  transform: inView ? "scale(1)" : "scale(0.6)",
                  transitionDelay: `${900 + i * 160}ms`,
                }}
              >
                <Check className="size-2.5" strokeWidth={3} />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ----------------------- Governance layer stack ---------------------- */

const layers = [
  {
    name: "Business & enterprise",
    text: "Strategy, customers, regulators, auditors",
    tone: "muted" as const,
  },
  {
    name: "Traditional governance",
    text: "GRC, policies, risk registers, audits",
    tone: "muted" as const,
  },
  {
    name: "ReguLattice AI governance layer",
    text: "Discover · Assess · Govern · Monitor · Improve",
    tone: "brand" as const,
  },
  {
    name: "AI systems",
    text: "Models · Agents · Copilots · APIs · Developer tools · Shadow AI",
    tone: "base" as const,
  },
];

export function LayerStack() {
  const reduced = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-md space-y-3">
      {layers.map((l, i) => (
        <div key={l.name} className="relative">
          {l.tone === "brand" ? (
            <div className="rounded-2xl bg-brand-gradient p-[1.5px] shadow-[var(--shadow-glow)]">
              <div className="flex items-center gap-3 rounded-[0.95rem] bg-card px-5 py-4">
                <img src={logoAsset} alt="" className="size-9 rounded-lg object-cover" />
                <div>
                  <div className="font-display font-semibold text-foreground">{l.name}</div>
                  <div className="text-xs text-muted-foreground">{l.text}</div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`rounded-2xl border px-5 py-4 ${
                l.tone === "base"
                  ? "border-dashed border-border bg-muted/60"
                  : "border-border bg-card"
              }`}
            >
              <div className="font-display font-semibold text-foreground/85">{l.name}</div>
              <div className="text-xs text-muted-foreground">{l.text}</div>
            </div>
          )}
          {i === 2 && !reduced && (
            <div
              className="pointer-events-none absolute -bottom-3 left-0 right-0 flex justify-around"
              aria-hidden="true"
            >
              {[0, 1, 2, 3].map((k) => (
                <span
                  key={k}
                  className="rise-up block size-1.5 rounded-full bg-primary"
                  style={{ animationDelay: `${k * 0.7}s` }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* --------------------- Local-first architecture --------------------- */

const local = [
  { id: "models", label: "Local AI models", icon: Cpu },
  { id: "apps", label: "AI applications", icon: AppWindow },
  { id: "agents", label: "AI agents", icon: Bot },
  { id: "data", label: "Data sources", icon: Database },
  { id: "dev", label: "Developer tools", icon: Code2 },
];
const providers = ["OpenAI", "Anthropic", "Google Gemini", "Other AI providers"];

const localEdges = [
  ...local.map((l) => ({ from: `lf-${l.id}`, to: "lf-core" })),
  ...providers.map((p) => ({ from: "lf-core", to: `lf-p-${p}`, dashed: true })),
];

export function LocalFirstViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { w, h, paths } = useEdges(containerRef, localEdges);

  return (
    <div
      ref={containerRef}
      className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)] lg:gap-16"
    >
      <svg
        className="pointer-events-none absolute inset-0 hidden lg:block"
        width={w}
        height={h}
        aria-hidden="true"
      >
        {paths.map((p, i) => (
          <g key={`${p.from}-${p.to}`}>
            <path
              d={p.d}
              fill="none"
              stroke={p.dashed ? "var(--muted-foreground)" : "var(--primary)"}
              strokeOpacity={p.dashed ? 0.35 : 0.35}
              strokeWidth="1.5"
              strokeDasharray={p.dashed ? "4 5" : undefined}
            />
            {!reduced && (
              <circle r="3" fill={p.dashed ? "var(--signal)" : "var(--primary)"}>
                <animateMotion
                  dur="5.5s"
                  repeatCount="indefinite"
                  begin={`${i * 0.6}s`}
                  path={p.d}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {/* customer-controlled environment */}
      <div className="relative rounded-3xl border-2 border-dashed border-primary/30 bg-accent/40 p-5 sm:p-6">
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
          Customer-controlled environment
        </div>
        <div className="grid items-center gap-6 sm:grid-cols-[1fr_1fr] sm:gap-10">
          <ul className="space-y-2">
            {local.map(({ id, label, icon: Icon }) => (
              <li
                key={id}
                data-node={`lf-${id}`}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm shadow-sm"
              >
                <Icon className="size-4 text-muted-foreground" /> {label}
              </li>
            ))}
          </ul>
          <div
            data-node="lf-core"
            className="rounded-2xl bg-brand-gradient p-[1.5px] shadow-[var(--shadow-glow)]"
          >
            <div className="rounded-[0.95rem] bg-card p-5 text-center">
              <img src={logoAsset} alt="" className="mx-auto size-12 rounded-xl object-cover" />
              <div className="mt-3 font-display font-semibold">ReguLattice</div>
              <div className="text-xs text-muted-foreground">Governance layer</div>
            </div>
          </div>
        </div>
      </div>

      {/* optional cloud providers */}
      <div>
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Optional cloud AI providers
        </div>
        <ul className="space-y-2">
          {providers.map((p) => (
            <li
              key={p}
              data-node={`lf-p-${p}`}
              className="rounded-xl border border-dashed border-border bg-card px-3 py-2 text-sm text-foreground/85"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------------------- Vision flow ---------------------------- */

export function VisionFlow() {
  const steps = ["AI systems", "Governance", "Accountability", "Trust"];
  return (
    <div className="relative mx-auto max-w-3xl">
      <div
        className="sweep-line absolute left-[12%] right-[12%] top-6 h-0.5 -translate-y-1/2 rounded-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--border), var(--primary), var(--signal), var(--border))",
        }}
        aria-hidden="true"
      />
      <ol className="relative grid grid-cols-4 gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-col items-center">
            <span
              className={`flex size-12 items-center justify-center rounded-2xl border text-sm font-semibold shadow-sm ${
                i === steps.length - 1
                  ? "border-transparent bg-brand-gradient text-primary-foreground"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {i + 1}
            </span>
            <span className="mt-3 text-center text-xs font-medium text-foreground/80 sm:text-sm">
              {s}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
