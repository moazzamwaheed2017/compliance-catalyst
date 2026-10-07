import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Code2, Cpu, GitBranch, Network } from "lucide-react";

import logoAsset from "@/assets/regulattice-logo.jpg";

const inputs = [
  { icon: Code2, label: "Claude Code", sub: "Admin API telemetry" },
  { icon: Cpu, label: "Cursor & Antigravity", sub: "Agentic IDEs" },
  { icon: Network, label: "OpenAI · Anthropic · Gemini", sub: "Model endpoints" },
  { icon: GitBranch, label: "GitHub", sub: "Repos & REST API" },
];

const outputs = [
  { label: "EU AI Act Art. 9, 14 & 73", sub: "Audit-ready logs" },
  { label: "ISO/IEC 42001", sub: "Control verification" },
  { label: "Flight Recorder", sub: "5-second event stream" },
  { label: "Human approvals", sub: "Multi-role gated sign-off" },
];

const rowsY = [12.5, 37.5, 62.5, 87.5];

function Node({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass flex h-full items-center gap-3 rounded-xl px-4 py-3">{children}</div>
  );
}

export function ControlLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1000, h: 320 });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Beam geometry in pixels so the travelling dots stay round at any width.
  const x = (pct: number) => (pct / 100) * size.w;
  const y = (pct: number) => (pct / 100) * size.h;

  return (
    <div ref={ref} className="relative">
      {/* connecting beams (desktop) */}
      <svg
        className="pointer-events-none absolute inset-0 hidden size-full lg:block"
        viewBox={`0 0 ${size.w} ${size.h}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="beam-in" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.82 0.13 205)" stopOpacity="0.15" />
            <stop offset="1" stopColor="oklch(0.8 0.13 180)" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="beam-out" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.8 0.13 180)" stopOpacity="0.7" />
            <stop offset="1" stopColor="oklch(0.8 0.16 160)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {rowsY.map((row, i) => {
          const inPath = `M${x(28)} ${y(row)} C ${x(34)} ${y(row)}, ${x(33)} ${y(50)}, ${x(40)} ${y(50)}`;
          const outPath = `M${x(60)} ${y(50)} C ${x(67)} ${y(50)}, ${x(66)} ${y(row)}, ${x(72)} ${y(row)}`;
          return (
            <g key={row}>
              <path d={inPath} fill="none" stroke="url(#beam-in)" strokeWidth="1.2" />
              <path d={outPath} fill="none" stroke="url(#beam-out)" strokeWidth="1.2" />
              <circle
                r="3"
                fill="oklch(0.9 0.12 190)"
                style={{ filter: "drop-shadow(0 0 4px oklch(0.85 0.13 190))" }}
              >
                <animateMotion
                  dur="2.8s"
                  repeatCount="indefinite"
                  begin={`${i * 0.6}s`}
                  path={inPath}
                />
              </circle>
              <circle
                r="3"
                fill="oklch(0.88 0.15 160)"
                style={{ filter: "drop-shadow(0 0 4px oklch(0.85 0.15 160))" }}
              >
                <animateMotion
                  dur="2.8s"
                  repeatCount="indefinite"
                  begin={`${1.4 + i * 0.6}s`}
                  path={outPath}
                />
              </circle>
            </g>
          );
        })}
      </svg>

      <div className="relative grid gap-6 lg:grid-cols-[28fr_44fr_28fr] lg:gap-0">
        <div className="grid gap-3 lg:grid-rows-4">
          <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:hidden">
            Ecosystem inputs
          </div>
          {inputs.map(({ icon: Icon, label, sub }) => (
            <Node key={label}>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-signal">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            </Node>
          ))}
        </div>

        <div className="flex items-center justify-center py-4 lg:py-0">
          <div className="relative w-full max-w-[260px] lg:w-[54%]">
            <div className="spin-slow absolute -inset-6 rounded-full border border-dashed border-primary/20" />
            <div className="absolute -inset-10 rounded-full bg-primary/10 blur-3xl" />
            <div className="glow-border relative rounded-3xl p-5 text-center">
              <img
                src={logoAsset}
                alt=""
                className="node-float mx-auto size-24 rounded-2xl object-cover"
              />
              <div className="mt-3 font-display text-base font-semibold">
                ReguLattice Data Plane
              </div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                Autonomous GRC engine
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5 font-mono text-[9px] uppercase">
                {["Discovery", "Dual-pass RAG", "Flight Recorder", "Gated remediation"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-primary/25 bg-primary/[0.06] px-2 py-0.5 text-primary/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-rows-4">
          <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:hidden">
            Verified outputs
          </div>
          {outputs.map(({ label, sub }) => (
            <Node key={label}>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-emerald/20 bg-emerald/10 text-emerald">
                <CheckCircle2 className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            </Node>
          ))}
        </div>
      </div>
    </div>
  );
}
