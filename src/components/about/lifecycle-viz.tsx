import {
  Activity,
  Bot,
  Check,
  FileCheck2,
  Gavel,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import type { ReactNode } from "react";

import { useInView } from "@/components/landing/reveal";

import { useCycle } from "./motion";

const step = (i: number) => ({ animationDelay: `${i * 260}ms` });

function DiscoverPanel() {
  const rows = [
    ["Claude Code", "Engineering"],
    ["Support agent", "Customer Ops"],
    ["Personal Gemini key", "Shadow AI"],
  ];
  return (
    <ul className="space-y-2">
      {rows.map(([name, meta], i) => (
        <li
          key={name}
          className="rise-in flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-xs"
          style={step(i)}
        >
          <span className="font-medium">{name}</span>
          <span className={meta === "Shadow AI" ? "text-rose" : "text-muted-foreground"}>
            {meta}
          </span>
        </li>
      ))}
    </ul>
  );
}

function AssessPanel() {
  const r = 34;
  const c = Math.PI * r;
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 80 46" className="w-28 shrink-0" aria-hidden="true">
        <path
          d="M6 42 A34 34 0 0 1 74 42"
          fill="none"
          stroke="var(--border)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M6 42 A34 34 0 0 1 74 42"
          fill="none"
          stroke="var(--amber)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          className="rise-in"
          style={{ strokeDashoffset: c * 0.28 }}
        />
        <text
          x="40"
          y="40"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="var(--foreground)"
        >
          72
        </text>
      </svg>
      <ul className="space-y-1.5 text-xs">
        {[
          "Purpose: credit decisions",
          "Data: personal financial data",
          "EU AI Act: high-risk category",
        ].map((t, i) => (
          <li key={t} className="rise-in flex items-center gap-2" style={step(i)}>
            <span className="size-1.5 rounded-full bg-amber" /> {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function GovernPanel() {
  const flow: { icon: typeof Bot; text: string }[] = [
    { icon: Bot, text: "Agent proposes action" },
    { icon: Gavel, text: "Policy rule applies" },
    { icon: UserCheck, text: "Human approves" },
    { icon: Check, text: "Action released" },
  ];
  return (
    <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {flow.map(({ icon: Icon, text }, i) => (
        <li
          key={text}
          className="rise-in flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-3 text-center text-[11px]"
          style={step(i)}
        >
          <Icon className={`size-4 ${i === 2 ? "text-primary" : "text-muted-foreground"}`} />
          {text}
        </li>
      ))}
    </ol>
  );
}

function MonitorPanel() {
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 240 48" className="h-12 w-full" aria-hidden="true">
        <path
          d="M0 34 L30 30 L60 32 L90 22 L120 26 L150 18 L180 24 L210 14 L240 18"
          fill="none"
          stroke="var(--signal)"
          strokeWidth="2"
          pathLength={1}
          className="draw-loop"
        />
      </svg>
      <ul className="space-y-1 font-mono text-[10px]">
        {[
          "agent · tool_call crm.lookup",
          "model · output drift +4%",
          "egress · personal data redacted",
        ].map((t, i) => (
          <li
            key={t}
            className="rise-in flex items-center gap-2 text-muted-foreground"
            style={step(i)}
          >
            <Activity className="size-3 text-signal" /> {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ImprovePanel() {
  const items = [
    { icon: FileCheck2, text: "Evidence verified", tone: "text-emerald" },
    { icon: Activity, text: "Evidence ages", tone: "text-amber" },
    { icon: Search, text: "Refresh requested", tone: "text-primary" },
    { icon: ShieldCheck, text: "Coverage restored", tone: "text-emerald" },
  ];
  return (
    <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map(({ icon: Icon, text, tone }, i) => (
        <li
          key={text}
          className="rise-in flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-3 text-center text-[11px]"
          style={step(i)}
        >
          <Icon className={`size-4 ${tone}`} />
          {text}
        </li>
      ))}
    </ol>
  );
}

const stages: { name: string; caption: string; panel: ReactNode }[] = [
  {
    name: "Discover",
    caption: "Build the AI inventory, including shadow AI.",
    panel: <DiscoverPanel />,
  },
  { name: "Assess", caption: "Score each AI system's risk.", panel: <AssessPanel /> },
  {
    name: "Govern",
    caption: "Apply policy, with human approval for high-risk actions.",
    panel: <GovernPanel />,
  },
  {
    name: "Monitor",
    caption: "Watch what AI systems and agents do at runtime.",
    panel: <MonitorPanel />,
  },
  {
    name: "Improve",
    caption: "Keep evidence current and remediate gaps.",
    panel: <ImprovePanel />,
  },
];

/** Discover → Assess → Govern → Monitor → Improve, each stage activating in turn. */
export function LifecycleViz() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const { index, setIndex } = useCycle(stages.length, 3200, inView, 0);
  const current = stages[index]!;

  return (
    <div ref={ref} className="card-soft p-5 sm:p-8">
      <ol className="relative grid grid-cols-5 gap-1 sm:gap-3">
        <div
          className="absolute left-[10%] right-[10%] top-[18px] h-px bg-border"
          aria-hidden="true"
        />
        <div
          className="absolute left-[10%] top-[18px] h-px bg-brand-gradient transition-[width] duration-700"
          style={{ width: `${(index / (stages.length - 1)) * 80}%` }}
          aria-hidden="true"
        />
        {stages.map((s, i) => {
          const active = i === index;
          const done = i < index;
          return (
            <li key={s.name} className="relative flex flex-col items-center">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={active ? "step" : undefined}
                className={`flex size-9 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-500 ${
                  active
                    ? "border-transparent bg-brand-gradient text-primary-foreground shadow-[var(--shadow-glow)]"
                    : done
                      ? "border-primary/40 bg-card text-primary"
                      : "border-border bg-card text-muted-foreground"
                }`}
              >
                {i + 1}
              </button>
              <span
                className={`mt-2 text-[11px] font-medium sm:text-sm ${active ? "text-foreground" : "text-muted-foreground"}`}
              >
                {s.name}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid items-center gap-6 rounded-2xl bg-muted/70 p-5 sm:grid-cols-[0.8fr_1.2fr] sm:p-6">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
            {index + 1} · {current.name}
          </div>
          <p className="mt-2 text-sm leading-6 text-foreground/80">{current.caption}</p>
        </div>
        <div key={current.name} className="min-h-[120px]">
          {current.panel}
        </div>
      </div>
    </div>
  );
}
