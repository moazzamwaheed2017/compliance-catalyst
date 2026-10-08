import { useEffect, useState } from "react";

import { useInView } from "@/components/landing/reveal";

import { useCycle } from "./motion";

type Status = "approved" | "known" | "unknown" | "shadow";

const nodes: {
  name: string;
  status: Status;
  owner: string;
  governed: string;
  x: number;
  y: number;
}[] = [
  {
    name: "ChatGPT Enterprise",
    status: "approved",
    owner: "IT",
    governed: "Approved",
    x: 10,
    y: 14,
  },
  {
    name: "Claude Code",
    status: "approved",
    owner: "Engineering",
    governed: "Approved",
    x: 28,
    y: 30,
  },
  {
    name: "Credit-scoring model",
    status: "known",
    owner: "Credit Risk",
    governed: "Assessed · high risk",
    x: 8,
    y: 52,
  },
  {
    name: "Support agent",
    status: "known",
    owner: "Customer Ops",
    governed: "Assessed · approval gates",
    x: 30,
    y: 70,
  },
  {
    name: "Personal Gemini key",
    status: "shadow",
    owner: "Finance",
    governed: "Owner assigned · replaced",
    x: 38,
    y: 12,
  },
  {
    name: "Local Llama 3",
    status: "shadow",
    owner: "Data Science",
    governed: "Owner assigned · restricted",
    x: 40,
    y: 50,
  },
  {
    name: "GitHub Copilot",
    status: "approved",
    owner: "Engineering",
    governed: "Approved",
    x: 14,
    y: 86,
  },
  {
    name: "Endpoint :11434",
    status: "unknown",
    owner: "Platform",
    governed: "Identified · under review",
    x: 38,
    y: 84,
  },
];

const phases = ["Unknown AI", "Discovered AI", "Governed AI"];

const statusStyle: Record<Status, { dot: string; chip: string; label: string }> = {
  approved: {
    dot: "bg-emerald",
    chip: "text-emerald border-emerald/30 bg-emerald/10",
    label: "Approved",
  },
  known: { dot: "bg-signal", chip: "text-signal border-signal/30 bg-signal/10", label: "Known" },
  unknown: { dot: "bg-amber", chip: "text-amber border-amber/30 bg-amber/10", label: "Unknown" },
  shadow: { dot: "bg-rose", chip: "text-rose border-rose/30 bg-rose/10", label: "Shadow AI" },
};

function useWide() {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return wide;
}

/** Unknown AI nodes across an environment → discovered → collected into a governed inventory. */
export function DiscoveryViz() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const { index: phase } = useCycle(phases.length, 3000, inView);
  const wide = useWide();

  // Environment occupies the left 58% (desktop) or the top 52% (mobile); the inventory the rest.
  const envPos = (n: (typeof nodes)[number]) =>
    wide ? { left: `${n.x}%`, top: `${n.y}%` } : { left: `${n.x * 1.6}%`, top: `${n.y * 0.48}%` };
  const rowTop = (i: number) => (wide ? 17 + i * 10.2 : 62 + i * 4.6);
  const invPos = (i: number) =>
    wide ? { left: "61.4%", top: `${rowTop(i)}%` } : { left: "6.5%", top: `${rowTop(i)}%` };

  return (
    <div ref={ref}>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-2 text-sm">
        {phases.map((p, i) => (
          <span key={p} className="flex items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 font-medium transition-colors duration-700 ${
                i === phase
                  ? "border-primary/40 bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              {p}
            </span>
            {i < phases.length - 1 && <span className="text-muted-foreground">→</span>}
          </span>
        ))}
      </div>

      <div className="card-soft relative aspect-[3/5] overflow-hidden sm:aspect-[4/5] md:aspect-[16/8]">
        {/* environment */}
        <div className="absolute inset-x-0 top-0 h-[52%] border-b border-border md:inset-y-0 md:left-0 md:h-auto md:w-[58%] md:border-b-0 md:border-r">
          <div className="dot-grid absolute inset-0 opacity-[0.5] [background-image:radial-gradient(var(--border)_1px,transparent_1px)]" />
          <div className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Your environment
          </div>
        </div>
        {/* inventory */}
        <div className="absolute inset-x-0 bottom-0 h-[48%] md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[42%]">
          <div className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground md:left-6">
            AI inventory
          </div>
          {nodes.map((n, i) => (
            <div
              key={n.name}
              className="absolute right-4 flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-2.5 py-1 pl-6 text-[11px] shadow-sm transition-all duration-700 md:right-5"
              style={{
                left: wide ? "6%" : "4%",
                top: wide ? `${rowTop(i)}%` : `${((rowTop(i) - 52) / 48) * 100}%`,
                transform: "translateY(-50%)",
                opacity: phase === 2 ? 1 : 0,
                transitionDelay: phase === 2 ? `${400 + i * 90}ms` : "0ms",
              }}
            >
              <span className="truncate font-medium text-foreground">{n.name}</span>
              <span className="hidden shrink-0 text-muted-foreground sm:inline">
                {n.owner} · {n.governed}
              </span>
            </div>
          ))}
        </div>

        {/* AI nodes move from the environment into the inventory */}
        {nodes.map((n, i) => {
          const s = statusStyle[n.status];
          const pos = phase === 2 ? invPos(i) : envPos(n);
          return (
            <div
              key={n.name}
              className="absolute z-10 transition-all duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ ...pos, transform: "translateY(-50%)", transitionDelay: `${i * 60}ms` }}
            >
              {phase === 2 ? (
                <span className={`block size-2.5 rounded-full ${s.dot}`} />
              ) : (
                <span
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium shadow-sm transition-colors duration-700 ${
                    phase === 0 ? "border-border bg-card text-muted-foreground" : s.chip
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${phase === 0 ? "bg-muted-foreground/40" : s.dot}`}
                  />
                  {phase === 0 ? "?" : wide ? `${n.name} · ${s.label}` : s.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        {(Object.keys(statusStyle) as Status[]).map((k) => (
          <span key={k} className="flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${statusStyle[k].dot}`} /> {statusStyle[k].label}
          </span>
        ))}
      </div>
    </div>
  );
}
