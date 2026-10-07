import { useEffect, useState } from "react";
import {
  Activity,
  Boxes,
  FileCheck2,
  KanbanSquare,
  LayoutDashboard,
  Radio,
  Scale,
  Search,
  ShieldAlert,
} from "lucide-react";

import { useInView } from "./reveal";

type Severity = "INFO" | "WARN" | "SECURITY_ALERT" | "HALLUCINATION_FLAG";

const severityStyle: Record<Severity, string> = {
  INFO: "text-signal bg-signal/10 border-signal/20",
  WARN: "text-amber bg-amber/10 border-amber/20",
  SECURITY_ALERT: "text-rose bg-rose/10 border-rose/25",
  HALLUCINATION_FLAG:
    "text-[oklch(0.78_0.14_300)] bg-[oklch(0.78_0.14_300/0.1)] border-[oklch(0.78_0.14_300/0.25)]",
};

export const telemetryEvents: { sev: Severity; source: string; msg: string }[] = [
  { sev: "INFO", source: "claude-code", msg: "Agent tool call: git.diff · policy OK" },
  { sev: "SECURITY_ALERT", source: "cursor-ide", msg: "Unapproved model endpoint detected" },
  { sev: "INFO", source: "gemini-1.5-pro", msg: "Egress check passed · PII redacted" },
  { sev: "HALLUCINATION_FLAG", source: "support-bot", msg: "Answer contradicts policy KB §4.2" },
  { sev: "WARN", source: "ollama/llama3", msg: "Prompt drift +12% vs. baseline" },
  { sev: "INFO", source: "openai/gpt-4o", msg: "Evidence linked → ISO 42001 A.6.2.8" },
  { sev: "WARN", source: "copilot", msg: "Secret pattern in completion context" },
  { sev: "INFO", source: "remediation", msg: "RISK-204 approved by 2 of 2 gates" },
];

const assets = [
  { name: "gpt-4o · Customer Support", owner: "CX Platform", tier: "High", status: "Verified" },
  {
    name: "claude-code · Engineering",
    owner: "Dev Productivity",
    tier: "Limited",
    status: "Monitoring",
  },
  { name: "llama3-70b · On-prem RAG", owner: "Data Science", tier: "High", status: "In Review" },
  { name: "cursor-ide · Shadow AI", owner: "Unassigned", tier: "Unknown", status: "Flagged" },
];

const statusStyle: Record<string, string> = {
  Verified: "text-emerald",
  Monitoring: "text-signal",
  "In Review": "text-amber",
  Flagged: "text-rose",
};

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

export function useTicker(length: number, interval: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => (t + 1) % (length * 1000)), interval);
    return () => window.clearInterval(id);
  }, [length, interval]);
  return tick;
}

function Kpi({
  label,
  value,
  bar,
  suffix = "",
  tone,
  active,
}: {
  label: string;
  value: number;
  bar: number;
  suffix?: string;
  tone: string;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5">
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="font-display text-2xl font-semibold tabular-nums text-foreground">
          {n}
        </span>
        <span className="text-xs text-muted-foreground">{suffix}</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
        <div className={`fill-bar h-full rounded-full ${tone}`} style={{ width: `${bar}%` }} />
      </div>
    </div>
  );
}

function Ring({
  label,
  value,
  color,
  active,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  active: boolean;
  delay: number;
}) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-[72px]">
        <svg viewBox="0 0 64 64" className="size-full -rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="5" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={active ? c * (1 - value / 100) : c}
            style={{
              transition: `stroke-dashoffset 1.6s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
              filter: `drop-shadow(0 0 6px ${color})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-sm font-semibold tabular-nums">
          {value}%
        </div>
      </div>
      <span className="text-center text-[10px] font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function SeverityChip({ sev }: { sev: Severity }) {
  return (
    <span
      className={`shrink-0 rounded border px-1.5 py-px font-mono text-[9px] font-semibold ${severityStyle[sev]}`}
    >
      {sev}
    </span>
  );
}

export function HeroDashboard() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const tick = useTicker(telemetryEvents.length, 1800);
  const visible = Array.from({ length: 5 }, (_, i) => {
    const idx = (tick + i) % telemetryEvents.length;
    return { ...telemetryEvents[idx]!, key: tick + i };
  }).reverse();

  const nav = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: Boxes, label: "AI Inventory" },
    { icon: FileCheck2, label: "Evidence" },
    { icon: Radio, label: "Flight Recorder" },
    { icon: KanbanSquare, label: "Remediation" },
    { icon: Scale, label: "Frameworks" },
  ];

  return (
    <div ref={ref} className="relative">
      {/* glow behind the frame */}
      <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[40px] bg-[radial-gradient(ellipse_at_center,oklch(0.8_0.13_180/0.25),transparent_65%)] blur-2xl" />

      <div className="glow-border overflow-hidden rounded-2xl shadow-[0_40px_120px_-30px_oklch(0_0_0/0.8)]">
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-md border border-white/[0.06] bg-black/20 px-3 py-1 font-mono text-[10px] text-muted-foreground">
            <Search className="size-3" /> app.regulattice.com/governance
          </div>
          <span className="hidden items-center gap-1.5 font-mono text-[10px] text-emerald sm:flex">
            <span className="relative flex size-1.5">
              <span className="ping-soft absolute inset-0 rounded-full bg-emerald" />
              <span className="relative size-1.5 rounded-full bg-emerald" />
            </span>
            LIVE
          </span>
        </div>

        <div className="flex text-left">
          {/* sidebar */}
          <aside className="hidden w-44 shrink-0 border-r border-white/[0.06] bg-black/10 p-3 md:block">
            <div className="mb-3 px-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">
              Workspace
            </div>
            <ul className="space-y-0.5">
              {nav.map(({ icon: Icon, label, active }) => (
                <li
                  key={label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${
                    active ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="size-3.5" /> {label}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg border border-primary/15 bg-primary/[0.06] p-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-primary">
                <ShieldAlert className="size-3" /> EU AI Act
              </div>
              <p className="mt-1 text-[10px] leading-snug text-muted-foreground">
                Art. 73 reporting window: 4 days remaining
              </p>
            </div>
          </aside>

          {/* main */}
          <div className="min-w-0 flex-1 space-y-3 p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Kpi
                label="AI assets discovered"
                value={248}
                bar={78}
                tone="bg-signal"
                active={inView}
              />
              <Kpi label="Shadow AI flagged" value={17} bar={22} tone="bg-rose" active={inView} />
              <Kpi
                label="Controls verified"
                value={96}
                bar={96}
                suffix="%"
                tone="bg-emerald"
                active={inView}
              />
              <Kpi label="Open risks" value={9} bar={14} tone="bg-amber" active={inView} />
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_1.35fr]">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold">Compliance posture</span>
                  <span className="font-mono text-[9px] text-muted-foreground">updated 5s ago</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Ring
                    label="EU AI Act"
                    value={92}
                    color="oklch(0.82 0.13 205)"
                    active={inView}
                    delay={0}
                  />
                  <Ring
                    label="ISO 42001"
                    value={88}
                    color="oklch(0.8 0.13 180)"
                    active={inView}
                    delay={150}
                  />
                  <Ring
                    label="NIST AI RMF"
                    value={95}
                    color="oklch(0.8 0.16 160)"
                    active={inView}
                    delay={300}
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-black/20 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                    <Activity className="size-3.5 text-primary" /> Flight Recorder
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground">stream · 5s</span>
                </div>
                <ul className="mt-3 space-y-1.5 font-mono text-[10px]">
                  {visible.map((e, i) => (
                    <li
                      key={e.key}
                      className={`flex items-center gap-2 rounded-md px-1.5 py-1 ${i === 0 ? "rise-in bg-white/[0.03]" : ""}`}
                      style={{ opacity: 1 - i * 0.16 }}
                    >
                      <SeverityChip sev={e.sev} />
                      <span className="hidden shrink-0 text-muted-foreground sm:inline">
                        {e.source}
                      </span>
                      <span className="truncate text-foreground/85">{e.msg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hidden overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] sm:block">
              <div className="grid grid-cols-[1.6fr_1fr_0.7fr_0.8fr] border-b border-white/[0.06] px-3.5 py-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                <span>AI system</span>
                <span>Owner</span>
                <span>Risk tier</span>
                <span className="text-right">Status</span>
              </div>
              {assets.map((a) => (
                <div
                  key={a.name}
                  className="grid grid-cols-[1.6fr_1fr_0.7fr_0.8fr] items-center border-b border-white/[0.04] px-3.5 py-2 text-[11px] last:border-0"
                >
                  <span className="truncate font-medium text-foreground/90">{a.name}</span>
                  <span className="truncate text-muted-foreground">{a.owner}</span>
                  <span className="text-muted-foreground">{a.tier}</span>
                  <span className={`text-right font-medium ${statusStyle[a.status]}`}>
                    ● {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
