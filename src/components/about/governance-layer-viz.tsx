import { ArrowDown, Bot, Boxes, Cloud, Code2, Cpu, EyeOff, Plug } from "lucide-react";
import { useRef } from "react";

import logoAsset from "@/assets/regulattice-logo.jpg";
import { useInView } from "@/components/landing/reveal";

import { useCycle, useEdges } from "./motion";

const sources = [
  { id: "models", label: "AI models", icon: Boxes },
  { id: "agents", label: "AI agents", icon: Bot },
  { id: "apis", label: "APIs", icon: Plug },
  { id: "cloud", label: "Cloud AI", icon: Cloud },
  { id: "local", label: "Local AI", icon: Cpu },
  { id: "dev", label: "Developer tools", icon: Code2 },
  { id: "shadow", label: "Shadow AI", icon: EyeOff, shadow: true },
];

const outputs = ["Risk", "Policies", "Monitoring", "Evidence", "Compliance", "Human oversight"];

const stages = ["Discover", "Assess", "Govern", "Monitor", "Evidence"];

const edges = [
  ...sources.map((s) => ({ from: `src-${s.id}`, to: "core", dashed: s.shadow })),
  ...outputs.map((o) => ({ from: "core", to: `out-${o}` })),
];

/** AI systems + AI agents → ReguLattice governance layer → organization. */
export function GovernanceLayerViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: viewRef, inView } = useInView<HTMLDivElement>(0.2);
  const { index: stage, reduced } = useCycle(stages.length, 1800, inView);
  const { w, h, paths } = useEdges(containerRef, edges);

  return (
    <div ref={viewRef}>
      <div
        ref={containerRef}
        className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14"
      >
        {/* connectors (desktop) */}
        <svg
          className="pointer-events-none absolute inset-0 hidden lg:block"
          width={w}
          height={h}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gl-flow" x1="0" x2="1">
              <stop offset="0" stopColor="var(--pink)" />
              <stop offset="0.5" stopColor="var(--primary)" />
              <stop offset="1" stopColor="var(--signal)" />
            </linearGradient>
          </defs>
          {paths.map((p) => (
            <g key={`${p.from}-${p.to}`}>
              <path
                d={p.d}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray={p.dashed ? "4 5" : undefined}
              />
              {!reduced && (
                <path
                  d={p.d}
                  fill="none"
                  stroke="url(#gl-flow)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="6 42"
                  className="flow-line"
                  style={{ animationDuration: "7s", opacity: 0.85 }}
                />
              )}
            </g>
          ))}
        </svg>

        {/* sources */}
        <div className="relative">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            AI systems &amp; agents
          </div>
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:items-start lg:gap-2.5">
            {sources.map(({ id, label, icon: Icon, shadow }) => (
              <li
                key={id}
                data-node={`src-${id}`}
                className={`flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm shadow-sm ${
                  shadow
                    ? "border-dashed border-rose/50 text-rose"
                    : "border-border text-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <ArrowDown className="mx-auto size-5 text-muted-foreground lg:hidden" aria-hidden="true" />

        {/* governance layer */}
        <div
          data-node="core"
          className="relative rounded-[1.75rem] p-[1.5px]"
          style={{ backgroundImage: "var(--brand-gradient)" }}
        >
          <div className="rounded-[1.65rem] bg-card p-6 shadow-[var(--shadow-glow)]">
            <div className="flex items-center gap-3">
              <img src={logoAsset} alt="" className="size-11 rounded-xl object-cover" />
              <div>
                <div className="font-display text-lg font-semibold">ReguLattice</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                  AI governance layer
                </div>
              </div>
            </div>
            <ol className="mt-5 space-y-1.5">
              {stages.map((s, i) => {
                const active = i === stage;
                const done = i < stage;
                return (
                  <li
                    key={s}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-700 ${
                      active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`size-2 rounded-full transition-colors duration-700 ${
                          active ? "bg-primary" : done ? "bg-emerald" : "bg-border"
                        }`}
                      />
                      {s}
                    </span>
                    <span className="h-1 w-16 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full bg-brand-gradient transition-[width] ease-linear"
                        style={{
                          width: active || done ? "100%" : "0%",
                          transitionDuration: active && !reduced ? "1700ms" : "0ms",
                        }}
                      />
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <ArrowDown className="mx-auto size-5 text-muted-foreground lg:hidden" aria-hidden="true" />

        {/* organization */}
        <div className="relative rounded-3xl border border-border bg-muted/60 p-4">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Your organization
          </div>
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch lg:gap-2.5">
            {outputs.map((o) => (
              <li
                key={o}
                data-node={`out-${o}`}
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium shadow-sm"
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
