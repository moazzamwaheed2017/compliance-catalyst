import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2, Cloud, Code2, Eye, Fingerprint, Instagram, Linkedin, Loader2, Lock, Mail, Network, Radio, ShieldCheck, Cpu, Terminal, Workflow, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import logoAsset from "@/assets/regulattice-logo.jpg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReguLattice | Autonomous AI GRC Data Plane" },
      { name: "description", content: "Continuously discover deployed AI footprints, verify evidence with dual-pass model consensus, and stream live event telemetry through a gated risk remediation pipeline." },
      { property: "og:title", content: "ReguLattice | Autonomous AI GRC Data Plane" },
      { property: "og:description", content: "Continuous, verifiable governance for enterprise AI systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const metrics = [
  { value: ">$10B", label: "AI Infrastructure Governed" },
  { value: "<5s", label: "Real-Time Telemetry Stream" },
  { value: "100%", label: "EU AI Act Art. 14 Oversight" },
  { value: "0%", label: "Unapproved Autonomy Drift" },
];

const comparisons = [
  { capability: "Inventory Discovery", oldWay: "Manual annual questionnaires & spreadsheets", newWay: "Real-Time Gateway & API Auto-Discovery" },
  { capability: "Evidence Verification", oldWay: "Static PDF uploads & vendor claims", newWay: "Dual-Pass RAG & Semantic Consensus Verification" },
  { capability: "Monitoring", oldWay: "Periodic audit sampling & logs", newWay: "Unified Telemetry Flight Recorder (Live Event Stream)" },
  { capability: "Remediation", oldWay: "Ad-hoc Slack messages & email threads", newWay: "Gated Autonomy Kanban with Multi-Role Approvals" },
  { capability: "Feedback Loop", oldWay: "Untracked manual overrides", newWay: "Field-Level Audit Trail & RLHF Learning Loop" },
];

const aiAgents = [
  {
    id: "01",
    tag: "DISCOVERY AGENT",
    title: "Continuous Footprint Auto-Discovery",
    icon: Network,
    description: "Scans cloud infrastructure, SaaS endpoints, and code repositories to map every active AI model and API credential in real-time.",
    features: [
      "OpenAI, Anthropic, Gemini, Ollama & GitHub Live API Validation",
      "Automatic detection of orphan models and shadow AI deployments",
      "Instant schema credential verification and taxonomy mapping",
    ],
  },
  {
    id: "02",
    tag: "VERIFICATION AGENT",
    title: "Dual-Pass Evidence & Policy Verification",
    icon: Eye,
    description: "Eliminates mapping hallucinations using deterministic vector chunking and secondary model consensus evaluation.",
    features: [
      "Primary vector search across EU AI Act, ISO 42001 & NIST AI RMF",
      "Cross-model verification pass to flag compliance contradictions",
      "Automated PASS/FAIL scoring with full lineage provenance",
    ],
  },
  {
    id: "03",
    tag: "TELEMETRY AGENT",
    title: "Unified Flight Recorder Telemetry Log",
    icon: Radio,
    description: "Provides continuous 5-second operational event telemetry capturing model drift, tool calls, and prompt behavior.",
    features: [
      "Categorized stream: INFO, WARN, SECURITY_ALERT, and HALLUCINATION_FLAG",
      "One-click human triage to confirm systemic errors or mark false positives",
      "Built-in audit trail for EU AI Act Article 73 post-market monitoring",
    ],
  },
  {
    id: "04",
    tag: "REMEDIATION AGENT",
    title: "Gated Autonomy Remediation Pipeline",
    icon: Workflow,
    description: "Enforces strict human oversight over high-risk remediations via multi-approver role gates before execution.",
    features: [
      "Kanban board tracking open risk items and SLA countdown timers",
      "Dual sign-off gates: Compliance Officer & AI Safety Engineer",
      "Field-level audit trail feeding RLHF feedback loops to refine policies",
    ],
  },
];

const frameworks = [
  {
    name: "EU Artificial Intelligence Act",
    articles: "Art. 9 (Risk Mgmt), Art. 14 (Human Oversight), Art. 73 (Post-Market Monitoring)",
    description: "Automated risk management, mandatory human-in-the-loop authorization gates, and continuous event telemetry logging.",
  },
  {
    name: "ISO/IEC 42001:2023",
    articles: "AIMS Control Verification & Clause 6.1.2 Risk Assessment",
    description: "Structured AI Management System (AIMS) control evaluation, residual risk recalculation, and continuous audit readiness.",
  },
  {
    name: "NIST AI RMF 1.0",
    articles: "GOVERN, MAP, MEASURE, and MANAGE Functions",
    description: "Complete mapping across AI Risk Management Framework functions for trustworthy and accountable AI governance.",
  },
  {
    name: "ISO 23894:2023",
    articles: "Causal Risk & Residual Impact Assessment",
    description: "Quantitative causal risk modeling and automated residual risk scoring for enterprise AI deployments.",
  },
];

const integrations = [
  { category: "Cloud Models & LLMs", items: ["OpenAI (GPT-4o)", "Anthropic (Claude 3.5)", "Google Gemini Pro", "Ollama (Llama 3 / Mistral)"] },
  { category: "Repositories & Infra", items: ["GitHub REST API", "IAM Policy Engine", "Vector DB RAG Pipeline", "Kubernetes Clusters"] },
  { category: "Identity & Access", items: ["Okta SSO", "Entra ID (Azure AD)", "Google Workspace", "Role-Based Access Control"] },
  { category: "Observability & CI/CD", items: ["Datadog Telemetry", "MLflow Registry", "Hugging Face", "GitHub Actions CI/CD"] },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="ReguLattice home">
      <img src={logoAsset} alt="ReguLattice lattice shield" className={compact ? "size-8 rounded-sm object-cover" : "size-10 rounded-sm object-cover"} />
      <span className="font-display text-lg font-extrabold uppercase text-foreground">ReguLattice</span>
    </a>
  );
}

function LatticeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="lattice-grid absolute inset-0 opacity-80" />
      <svg className="absolute inset-0 size-full opacity-35" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="var(--signal)" strokeWidth="1">
          <path className="flow-line" d="M-40 670 L260 430 L520 540 L850 220 L1130 390 L1490 90" strokeDasharray="8 16" />
          <path className="flow-line" d="M90 110 L350 270 L680 105 L970 500 L1370 330" strokeDasharray="4 20" />
        </g>
        {[[260,430],[520,540],[850,220],[1130,390],[350,270],[680,105],[970,500]].map(([cx,cy], i) => <circle key={i} className="signal-pulse" cx={cx} cy={cy} r="3" fill="var(--primary)" style={{ animationDelay: `${i * 0.35}s` }} />)}
      </svg>
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="relative mx-auto max-w-5xl rounded-xl border border-border bg-card/60 p-6 md:p-10 backdrop-blur-md">
      <div className="text-center mb-8">
        <span className="font-mono text-xs uppercase text-primary tracking-widest">Non-Invasive Architecture</span>
        <h3 className="mt-2 font-display text-2xl font-bold">The Continuous Control Loop</h3>
        <p className="mt-1 text-xs text-muted-foreground">Plugs into your existing stack without code modification or rip-and-replace.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 items-center text-center">
        <div className="space-y-3 rounded-lg border border-border bg-background/80 p-5 text-left">
          <div className="font-mono text-[11px] uppercase text-primary font-semibold flex items-center gap-2">
            <Cpu className="size-4" /> Live AI Stack Inputs
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><Check className="size-3 text-primary shrink-0" /> Cloud LLMs (OpenAI, Anthropic, Gemini)</li>
            <li className="flex items-center gap-2"><Check className="size-3 text-primary shrink-0" /> Local Models (Ollama, HuggingFace)</li>
            <li className="flex items-center gap-2"><Check className="size-3 text-primary shrink-0" /> Repos & CI/CD (GitHub, GitLab)</li>
            <li className="flex items-center gap-2"><Check className="size-3 text-primary shrink-0" /> Identity & IAM (Okta, Entra ID)</li>
          </ul>
        </div>

        <div className="relative rounded-xl border-2 border-primary/40 bg-accent/40 p-6 text-center shadow-[var(--shadow-glow)]">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-3">
            <ShieldCheck className="size-6" />
          </div>
          <h4 className="font-display text-base font-bold text-foreground">ReguLattice Data Plane</h4>
          <p className="mt-1 text-[11px] font-mono text-primary">Continuous Governance Engine</p>
          <div className="mt-3 flex justify-center gap-1.5 font-mono text-[9px] uppercase">
            <span className="rounded border border-primary/30 bg-background/60 px-2 py-1 text-muted-foreground">Discovery</span>
            <span className="rounded border border-primary/30 bg-background/60 px-2 py-1 text-muted-foreground">Dual-Pass</span>
            <span className="rounded border border-primary/30 bg-background/60 px-2 py-1 text-muted-foreground">Telemetry</span>
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-border bg-background/80 p-5 text-left">
          <div className="font-mono text-[11px] uppercase text-primary font-semibold flex items-center gap-2">
            <Terminal className="size-4" /> Verified Compliance Outputs
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-primary shrink-0" /> EU AI Act Art. 9, 14 & 73 Audit Logs</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-primary shrink-0" /> ISO/IEC 42001 Verified Controls</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-primary shrink-0" /> Flight Recorder Event Stream</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-primary shrink-0" /> Gated Human Approval Sign-Offs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestType, setRequestType] = useState("Schedule Technical Demo");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openDemoModal = (type: string) => {
    setRequestType(type);
    setDialogOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/public/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType,
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        toast.success(`Request sent! Email notification dispatched to the ReguLattice Team.`);
        setDialogOpen(false);
        setFormData({ name: "", email: "", company: "", role: "", notes: "" });
      } else {
        toast.error(data.details || "Failed to send email. Please try again.");
      }
    } catch (err) {
      toast.error("Network error sending demo request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="top" className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <LatticeBackground />
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
          <Brand />
          <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a className="transition-colors hover:text-primary" href="#agents">AI Agents</a>
            <a className="transition-colors hover:text-primary" href="#architecture">Architecture</a>
            <a className="transition-colors hover:text-primary" href="#platform">Category Matrix</a>
            <a className="transition-colors hover:text-primary" href="#frameworks">Compliance</a>
            <span className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] uppercase text-primary">Live lattice</span>
          </div>
          <Button variant="ink" onClick={() => openDemoModal("Schedule Technical Demo")}>
            Request access
          </Button>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="relative overflow-hidden px-5 pb-16 pt-20 md:pb-24 md:pt-28 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_360px]">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3.5 py-1.5 font-mono text-[10px] uppercase text-primary backdrop-blur-sm">
                <span className="signal-pulse size-2 rounded-full bg-signal" /> Active AI Governance Data Plane
              </div>
              <h1 className="max-w-4xl text-balance font-display text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-8xl">
                The Autonomous GRC <span className="text-primary">Data Plane</span> for Enterprise AI
              </h1>
              <p className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
                Continuously discover deployed AI footprints, verify evidence with dual-pass model consensus, and stream live event telemetry through a gated risk remediation pipeline—built for <strong className="font-medium text-foreground">EU AI Act, ISO 42001, and NIST AI RMF.</strong>
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button variant="hero" size="lg" onClick={() => openDemoModal("Schedule Technical Demo")}>
                  Schedule Technical Demo <ArrowRight />
                </Button>
                <Button variant="architectural" size="lg" onClick={() => openDemoModal("Access Developer Sandbox")}>
                  Access Developer Sandbox <Code2 />
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block" aria-hidden="true">
              <div className="node-float relative mx-auto size-80">
                <div className="absolute inset-5 rotate-45 border border-primary/30" />
                <div className="absolute inset-14 rotate-12 border border-primary/50" />
                <div className="absolute inset-24 -rotate-12 border border-signal/70" />
                <img src={logoAsset} alt="ReguLattice AI Shield Logo" className="absolute inset-16 size-48 rounded-sm object-cover opacity-90 shadow-[var(--shadow-glow)]" />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-7xl rounded-lg border border-border bg-card/70 p-6 backdrop-blur-md">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
              {metrics.map((metric) => (
                <div key={metric.label} className="pt-4 md:pt-0 md:px-6 text-center first:pt-0 first:px-0">
                  <div className="font-display text-3xl font-extrabold text-primary">{metric.value}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-7xl gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {["EU AI Act Ready · Art. 9, 14, 73", "ISO/IEC 42001 Schema", "NIST AI RMF Compliant", "Real-Time Flight Recorder Telemetry"].map((badge) => (
              <div key={badge} className="bg-background/85 px-5 py-4 text-center font-mono text-[10px] uppercase text-muted-foreground">{badge}</div>
            ))}
          </div>
        </section>

        <section id="agents" className="border-t border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase text-primary">AI Agent Suite</p>
              <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Autonomous AI Agents Built for Real Compliance Engineering</h2>
              <p className="mt-5 text-muted-foreground">Four specialized compliance agents working in sync to inspect, verify, monitor, and remediate your AI footprint.</p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {aiAgents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <article key={agent.id} className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-primary hover:shadow-[var(--shadow-glow)]">
                    <div className="flex items-center justify-between">
                      <span className="rounded border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold text-primary">{agent.tag}</span>
                      <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold text-foreground">{agent.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{agent.description}</p>
                    <ul className="mt-6 space-y-2.5 text-xs text-muted-foreground">
                      {agent.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="architecture" className="py-28 bg-background relative">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <ArchitectureDiagram />
          </div>
        </section>

        <section id="platform" className="border-y border-border bg-surface py-24 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="font-mono text-xs uppercase text-primary">Why the category must change</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold md:text-5xl">Static GRC Tools Are Breaking Under AI Velocity</h2>
            <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">Annual surveys, spreadsheets, and generic LLM wrappers cannot keep up with autonomous agents, fine-tuned models, and daily cloud API updates across OpenAI, Anthropic, Gemini, and Ollama.</p>

            <div className="mt-12 overflow-hidden rounded-sm border border-border bg-border">
              <div className="grid grid-cols-3 gap-px bg-border font-mono text-[11px] uppercase">
                <div className="bg-muted/70 p-5 font-semibold text-muted-foreground">Capability</div>
                <div className="bg-muted p-5 font-semibold text-muted-foreground">Traditional GRC</div>
                <div className="bg-accent p-5 font-semibold text-primary">ReguLattice Data Plane</div>
              </div>
              {comparisons.map(({ capability, oldWay, newWay }) => (
                <div key={capability} className="grid grid-cols-3 gap-px border-t border-border bg-border">
                  <div className="flex items-center bg-background p-5 text-sm font-semibold text-foreground">{capability}</div>
                  <div className="flex items-start gap-3 bg-background p-5 text-sm text-muted-foreground">
                    <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/70" />
                    <span>{oldWay}</span>
                  </div>
                  <div className="flex items-start gap-3 bg-surface p-5 text-sm font-medium text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{newWay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-foreground py-28 text-background">
          <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
            <div className="mx-auto mb-9 flex size-14 items-center justify-center border border-signal">
              <Fingerprint className="size-6 text-signal" />
            </div>
            <blockquote className="text-pretty font-display text-2xl italic leading-relaxed md:text-4xl">
              “Full AI autonomy in compliance violates European AI Act Article 14 human oversight mandates. Manual GRC creates unacceptable engineering bottlenecks. ReguLattice engineered <strong className="not-italic text-signal">Gated Autonomy</strong>—models draft, verify, and route evidence, but execution requires human authorization.”
            </blockquote>
            <p className="mt-8 font-mono text-[10px] uppercase text-signal">Human authorization remains the control boundary</p>
          </div>
        </section>

        <section id="frameworks" className="border-b border-border bg-surface py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="font-mono text-xs uppercase text-primary">Framework & Ecosystem Support</p>
              <h2 className="mt-3 font-display text-4xl font-extrabold">Supported International Standards</h2>
              <p className="mt-4 text-sm text-muted-foreground">Pre-mapped regulatory compliance frameworks enforced through active control pipelines.</p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {frameworks.map((fw, i) => (
                <div key={fw.name} className="py-6 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-primary font-bold">0{i + 1}</span>
                    <h3 className="font-display text-lg font-bold text-foreground">{fw.name}</h3>
                  </div>
                  <div className="font-mono text-xs text-primary">{fw.articles}</div>
                  <p className="text-sm text-muted-foreground">{fw.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs uppercase text-primary">Native Integrations</p>
                <h2 className="mt-3 font-display text-4xl font-extrabold">Enterprise Integration Stack</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">Connect live cloud models, local LLMs, code repositories, and IAM policy engines directly to your governance plane.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {integrations.map((group, i) => (
                <article key={group.category} className="rounded-xl border border-border bg-card/90 p-6 transition-all hover:border-primary">
                  <span className="font-mono text-xs text-primary">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">{group.category}</h3>
                  <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="size-3 text-primary shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="relative overflow-hidden border-t border-border py-28">
          <div className="lattice-grid absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
            <ShieldCheck className="mx-auto size-8 text-primary" />
            <h2 className="mt-6 text-balance font-display text-5xl font-extrabold md:text-7xl">Experience Continuous AI GRC in Action</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">See how ReguLattice transforms static compliance checklists into an automated, verifiable data plane for your enterprise AI footprint.</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="hero" size="lg" onClick={() => openDemoModal("Schedule Technical Demo")}>
                Schedule Technical Demo <ArrowRight />
              </Button>
              <Button variant="architectural" size="lg" onClick={() => openDemoModal("Access Developer Sandbox")}>
                Access Developer Sandbox <Code2 />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border bg-card py-14">
        <div className="mx-auto max-w-7xl px-5 text-left lg:px-8">
          <div className="flex flex-col items-start justify-start gap-8 text-left md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col items-start text-left">
              <div className="flex justify-start">
                <Brand compact />
              </div>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">The Autonomous GRC Data Plane for enterprise AI systems.</p>
              <div className="mt-4 flex flex-wrap items-center justify-start gap-6 text-sm text-muted-foreground">
                <a href="mailto:info@regulattice.com" className="flex items-center gap-2 font-mono text-xs transition-colors hover:text-primary">
                  <Mail className="size-4 text-primary" /> info@regulattice.com
                </a>
                <a href="https://www.linkedin.com/company/regulattice/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground transition-colors hover:text-primary" aria-label="LinkedIn">
                  <Linkedin className="size-4 text-primary" /> LinkedIn
                </a>
                <a href="https://www.instagram.com/regulattice/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground transition-colors hover:text-primary" aria-label="Instagram">
                  <Instagram className="size-4 text-primary" /> Instagram
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-x-8 gap-y-3 font-mono text-[11px] uppercase text-muted-foreground">
              <a href="#platform" className="transition-colors hover:text-primary">Documentation</a>
              <a href="#frameworks" className="transition-colors hover:text-primary">Security & Trust Center</a>
              <a href="#architecture" className="transition-colors hover:text-primary">API Reference</a>
              <a href="#demo" className="transition-colors hover:text-primary">Compliance Whitepaper</a>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-6 text-center font-mono text-[10px] uppercase text-muted-foreground">
            © 2026 ReguLattice. All rights reserved.
          </div>
        </div>
      </footer>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              {requestType}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Complete details below to submit your request. An instant notification will be sent directly to the <strong className="text-foreground">ReguLattice Team</strong>.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-mono uppercase text-muted-foreground">Full Name</Label>
              <Input
                id="name"
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-mono uppercase text-muted-foreground">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="bg-background border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-xs font-mono uppercase text-muted-foreground">Company</Label>
                <Input
                  id="company"
                  placeholder="Enterprise Inc."
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs font-mono uppercase text-muted-foreground">Job Title / Role</Label>
                <Input
                  id="role"
                  placeholder="CTO / CISO / Lead"
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes" className="text-xs font-mono uppercase text-muted-foreground">Requirements / Notes (Optional)</Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Tell us about your AI footprint or compliance target..."
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                className="bg-background border-border resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Button type="submit" variant="hero" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" /> Sending Email Notification...
                  </>
                ) : (
                  <>
                    Submit Request & Dispatch Email <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}