import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2, Cpu, Eye, Fingerprint, Instagram, Linkedin, Loader2, Lock, Mail, Network, Radio, ShieldCheck, Terminal, Workflow, X, AlertTriangle, Code2, Layers, Cpu as CpuIcon, GitBranch, Server } from "lucide-react";
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
      { title: "ReguLattice | Autonomous GRC Data Plane for AI Systems" },
      { name: "description", content: "Continuously discover deployed AI footprints and developer IDE tools, verify evidence with dual-pass model consensus, stream real-time telemetry through a live Flight Recorder, and execute gated risk remediations—built for EU AI Act, ISO/IEC 42001, and NIST AI RMF." },
      { property: "og:title", content: "ReguLattice | Autonomous GRC Data Plane for AI Systems" },
      { property: "og:description", content: "Continuous, verifiable governance for enterprise AI systems and agentic developer workflows." },
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

const trustBadges = [
  { title: "EU AI Act Ready", desc: "Art. 9 (Risk Mgmt), Art. 14 (Human Oversight), Art. 73 (Post-Market Monitoring)" },
  { title: "ISO/IEC 42001 Certified Schema", desc: "AIMS Control Verification & A.10 Supplier Controls" },
  { title: "NIST AI RMF Compliant", desc: "Govern, Map, Measure, Manage Functions" },
  { title: "Real-Time Flight Recorder Telemetry", desc: "SOC 2 Type II Event Logging" },
];

const comparisons = [
  { capability: "Inventory & Shadow AI", oldWay: "Manual annual questionnaires", newWay: "Real-Time Gateway & Developer Tool Auto-Discovery" },
  { capability: "Evidence Verification", oldWay: "Static PDF uploads & self-attestations", newWay: "Dual-Pass RAG & Semantic Policy Consensus" },
  { capability: "Telemetry & Observability", oldWay: "Sampled annual audits", newWay: "Unified Telemetry Flight Recorder (5s Live Event Stream)" },
  { capability: "Developer AI Governance", oldWay: "Unmonitored copy-paste policy", newWay: "Claude Code Audit Telemetry & Agentic IDE Egress Rules" },
  { capability: "Risk Remediation", oldWay: "Email threads & Jira tickets", newWay: "Gated Autonomy Kanban with Dual-Role Approvals" },
  { capability: "Continuous Learning", oldWay: "Manual policy updates", newWay: "Field-Level Audit Trail & RLHF Feedback Loop" },
];

const aiPillars = [
  {
    id: "01",
    tag: "PILLAR 1: DISCOVERY AGENT",
    title: "Continuous AI Footprint & Developer Tool Discovery",
    icon: Network,
    description: "Automatically catalog all deployed models, endpoints, data flows, and third-party AI tools across SaaS providers, local runtimes, and developer IDEs.",
    bullets: [
      { label: "Native API Gateway Integration", text: "Direct verification for OpenAI, Anthropic, Google Gemini, Ollama (Local LLMs), and GitHub." },
      { label: "Real-Time Credential Validation", text: "Live authentication checks that test API keys against active vendor endpoints." },
      { label: "Shadow AI Detection", text: "Automatically tag unapproved AI tools and models operating outside organizational policy boundaries." },
    ],
  },
  {
    id: "02",
    tag: "PILLAR 2: VERIFICATION AGENT",
    title: "Dual-Pass Evidence & Policy Verification",
    icon: Eye,
    description: "Eliminate false positives and hallucinated compliance reports with dual-pass semantic verification.",
    bullets: [
      { label: "Primary Pass (Deterministic RAG Evaluation)", text: "Vector chunking and TF-IDF cosine similarity scoring against ISO 42001 & EU AI Act policy controls." },
      { label: "Secondary Pass (Model Consensus Check)", text: "Multi-model cross-examination to flag contradictions, missing evidence, and policy drifts." },
      { label: "Granular Lineage", text: "Complete traceability from raw evidence snippets to final compliance scoring." },
    ],
  },
  {
    id: "03",
    tag: "PILLAR 3: TELEMETRY AGENT",
    title: "Unified Telemetry Event Log (\"Flight Recorder\")",
    icon: Radio,
    description: "Continuous, operational observability into AI system execution, agent tool usage, and prompt drift.",
    bullets: [
      { label: "Live 5-Second Telemetry Stream", text: "Real-time event log classifying system activity into INFO, WARN, SECURITY_ALERT, and HALLUCINATION_FLAG." },
      { label: "One-Click Human Triage", text: "Directly confirm systemic errors or flag false positives to maintain model precision." },
      { label: "Article 73 Compliance", text: "Automated log retention and incident audit trails fulfilling EU AI Act post-market monitoring duties." },
    ],
  },
  {
    id: "04",
    tag: "PILLAR 4: REMEDIATION AGENT",
    title: "Gated Autonomy Remediation Pipeline",
    icon: Workflow,
    description: "Enforce strict human oversight over high-risk AI remediations with role-gated Kanban workflows.",
    bullets: [
      { label: "Interactive Remediation Kanban", text: "Track risk SLA timers through Open, In Assessment, Pending Approval, and Remediated stages." },
      { label: "Multi-Role Approver Gates", text: "Require dual sign-off from designated Compliance Officers and AI Safety Engineers." },
      { label: "RLHF Governance Loop", text: "Capture field-level human overrides (AIFieldAuditTrail) to train fine-tuned compliance policy engines." },
    ],
  },
];

const frameworks = [
  {
    name: "EU Artificial Intelligence Act",
    articles: "Art. 9 (Risk Management), Art. 14 (Human Oversight), Art. 73 (Post-Market Monitoring)",
    controls: [
      "Article 9 (Risk Management System): Continuous risk identification and remediation pipeline.",
      "Article 14 (Human Oversight): Two-stage approval override gates on all automated remediations.",
      "Article 73 (Post-Market Monitoring): Unified Telemetry Flight Recorder capturing live model events.",
    ],
  },
  {
    name: "ISO/IEC 42001 (AIMS Management System)",
    articles: "AIMS Control Verification & Clause A.10 Supplier Risk Controls",
    controls: [
      "Control A.2.2 / A.3.2: Organizational AI policies & roles.",
      "Control A.6.2.6 / A.6.2.8: Operational monitoring and event logging.",
      "Control A.7.2 / A.7.3: Data provenance & egress boundaries.",
      "Control A.10.2 / A.10.3: Third-party supplier and developer tool governance.",
    ],
  },
  {
    name: "NIST AI RMF 1.0",
    articles: "GOVERN, MAP, MEASURE, and MANAGE Functions",
    controls: [
      "GOVERN: Institutional policies and AI tool adoption registries.",
      "MAP: AI asset inventory and data exposure categorizations.",
      "MEASURE: Dual-pass semantic evidence evaluation.",
      "MANAGE: Gated autonomy risk remediation Kanban.",
    ],
  },
];

const connectorCategories = [
  {
    category: "Foundation Models & APIs",
    icon: CpuIcon,
    items: ["OpenAI (GPT-4o)", "Anthropic (Claude 3.5 / 3.7)", "Google Gemini Pro", "Ollama (Local Llama 3 / Mistral)"],
  },
  {
    category: "Developer AI & Agentic IDEs",
    icon: Code2,
    items: ["Claude Code (Admin API Audit Tier)", "Cursor IDE", "Antigravity IDE", "GitHub Copilot", "Phrase Strings"],
  },
  {
    category: "Code & Infrastructure",
    icon: GitBranch,
    items: ["GitHub REST API", "IAM Policy Engine", "Vector DB RAG Indexing Pipeline", "Kubernetes Clusters"],
  },
  {
    category: "Governance Databases",
    icon: Server,
    items: ["Embedded SQLite / WAL Mode", "Multi-User Concurrency", "Automated Schema Migration", "SOC 2 Type II Event Logging"],
  },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="ReguLattice home">
      <img src={logoAsset} alt="ReguLattice lattice shield" className={compact ? "size-8 rounded-sm object-cover" : "size-10 rounded-sm object-cover"} />
      <span className="font-display text-lg font-extrabold uppercase tracking-tight text-foreground">ReguLattice</span>
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
    <div className="relative mx-auto max-w-5xl rounded-xl border border-border bg-card/70 p-6 md:p-10 backdrop-blur-md">
      <div className="text-center mb-8">
        <span className="font-mono text-xs uppercase text-primary tracking-widest">Platform Architecture</span>
        <h3 className="mt-2 font-display text-2xl font-bold">The Continuous Control Loop</h3>
        <p className="mt-1 text-xs text-muted-foreground">Connecting live AI model endpoints, agentic IDEs, and evidence pipelines directly to compliance frameworks.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 items-center text-center">
        <div className="space-y-3 rounded-lg border border-border bg-background/80 p-5 text-left">
          <div className="font-mono text-[11px] uppercase text-primary font-semibold flex items-center gap-2">
            <Cpu className="size-4" /> Ecosystem Inputs
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><Check className="size-3 text-primary shrink-0" /> Claude Code (Admin API Telemetry)</li>
            <li className="flex items-center gap-2"><Check className="size-3 text-primary shrink-0" /> Cursor & Antigravity IDEs</li>
            <li className="flex items-center gap-2"><Check className="size-3 text-primary shrink-0" /> OpenAI, Anthropic, Gemini, Ollama</li>
            <li className="flex items-center gap-2"><Check className="size-3 text-primary shrink-0" /> GitHub REST API & Repositories</li>
          </ul>
        </div>

        <div className="relative rounded-xl border-2 border-primary/40 bg-accent/40 p-6 text-center shadow-[var(--shadow-glow)]">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-3">
            <ShieldCheck className="size-6" />
          </div>
          <h4 className="font-display text-base font-bold text-foreground">ReguLattice Data Plane</h4>
          <p className="mt-1 text-[11px] font-mono text-primary">Autonomous GRC Engine</p>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5 font-mono text-[9px] uppercase">
            <span className="rounded border border-primary/30 bg-background/60 px-2 py-1 text-muted-foreground">Auto-Discovery</span>
            <span className="rounded border border-primary/30 bg-background/60 px-2 py-1 text-muted-foreground">Dual-Pass RAG</span>
            <span className="rounded border border-primary/30 bg-background/60 px-2 py-1 text-muted-foreground">Flight Recorder</span>
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-border bg-background/80 p-5 text-left">
          <div className="font-mono text-[11px] uppercase text-primary font-semibold flex items-center gap-2">
            <Terminal className="size-4" /> Verified Compliance Outputs
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-primary shrink-0" /> EU AI Act Art. 9, 14 & 73 Audit Logs</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-primary shrink-0" /> ISO/IEC 42001 Control Verification</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-primary shrink-0" /> 5s Flight Recorder Event Stream</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-primary shrink-0" /> Multi-Role Gated Human Approvals</li>
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
        toast.success(`Request sent! Notification dispatched to the ReguLattice Team.`);
        setDialogOpen(false);
        setFormData({ name: "", email: "", company: "", role: "", notes: "" });
      } else {
        toast.error(data.details || "Failed to send request. Please try again.");
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

      {/* 1. Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
          <Brand />
          <div className="hidden items-center gap-5 text-xs font-mono uppercase text-muted-foreground lg:flex">
            <a className="transition-colors hover:text-primary" href="#platform">Platform</a>
            <a className="transition-colors hover:text-primary" href="#architecture">Architecture</a>
            <a className="transition-colors hover:text-primary" href="#pillars">Pillars</a>
            <a className="transition-colors hover:text-primary" href="#developer-ai">Developer AI</a>
            <a className="transition-colors hover:text-primary" href="#frameworks">Frameworks</a>
            <a className="transition-colors hover:text-primary" href="#connectors">Connectors</a>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] text-primary">
              <span className="signal-pulse size-1.5 rounded-full bg-signal" /> Live Lattice Status: Active
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="architectural" size="sm" onClick={() => openDemoModal("Access Developer Sandbox")} className="hidden sm:inline-flex">
              Developer Sandbox
            </Button>
            <Button variant="ink" size="sm" onClick={() => openDemoModal("Request Access")}>
              Request Access
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden px-5 pb-16 pt-20 md:pb-24 md:pt-28 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_360px]">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3.5 py-1.5 font-mono text-[10px] uppercase text-primary backdrop-blur-sm">
                <span className="signal-pulse size-2 rounded-full bg-signal" /> Autonomous AI GRC Data Plane
              </div>
              <h1 className="max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-7xl">
                The Autonomous GRC Data Plane for AI Systems & Agentic Workflows
              </h1>
              <p className="mt-7 max-w-3xl text-pretty text-base leading-8 text-muted-foreground md:text-xl">
                Continuously discover deployed AI footprints and developer IDE tools, verify evidence with dual-pass model consensus, stream real-time telemetry through a live Flight Recorder, and execute gated risk remediations—built for <strong className="font-semibold text-foreground">EU AI Act</strong>, <strong className="font-semibold text-foreground">ISO/IEC 42001</strong>, and <strong className="font-semibold text-foreground">NIST AI RMF</strong>.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button variant="hero" size="lg" onClick={() => openDemoModal("Schedule Technical Demo")}>
                  Schedule Technical Demo <ArrowRight className="ml-1 size-4" />
                </Button>
                <Button variant="architectural" size="lg" onClick={() => openDemoModal("Access Developer Sandbox")}>
                  Access Developer Sandbox <Code2 className="ml-1 size-4" />
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

          {/* Metric Bar */}
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

          {/* Trust Badges & Regulatory Compliance */}
          <div className="mx-auto mt-12 grid max-w-7xl gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="bg-background/85 px-5 py-4 text-left font-mono text-[11px]">
                <div className="font-bold text-foreground uppercase">{badge.title}</div>
                <div className="mt-1 text-[10px] italic text-muted-foreground">{badge.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Category Shift: Why GRC Must Evolve for AI */}
        <section id="platform" className="border-t border-border bg-surface py-24 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="font-mono text-xs uppercase text-primary">Category Shift</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold md:text-5xl">Static GRC Tools Are Breaking Under AI Velocity</h2>
            <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
              Annual surveys, spreadsheets, and generic LLM wrappers cannot track environments that change daily across cloud IAM, code repositories, shadow SaaS APIs, and agentic developer IDEs like Cursor, Antigravity, and Claude Code.
            </p>

            <div className="mt-12 overflow-hidden rounded-sm border border-border bg-border">
              <div className="grid grid-cols-3 gap-px bg-border font-mono text-[11px] uppercase">
                <div className="bg-muted/70 p-5 font-semibold text-muted-foreground">Capability</div>
                <div className="bg-muted p-5 font-semibold text-muted-foreground">Traditional GRC</div>
                <div className="bg-accent p-5 font-semibold text-primary">ReguLattice Autonomous Data Plane</div>
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

        {/* 4. The Four Core Pillars of ReguLattice */}
        <section id="pillars" className="border-t border-border bg-background py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase text-primary">Platform Core Architecture</p>
              <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">The Four Core Pillars of ReguLattice</h2>
              <p className="mt-5 text-muted-foreground">Specialized compliance engines working in sync to inspect, verify, monitor, and remediate your AI footprint.</p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {aiPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article key={pillar.id} className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-primary hover:shadow-[var(--shadow-glow)]">
                    <div className="flex items-center justify-between">
                      <span className="rounded border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold text-primary">{pillar.tag}</span>
                      <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold text-foreground">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{pillar.description}</p>
                    <div className="mt-6 space-y-3">
                      {pillar.bullets.map((item) => (
                        <div key={item.label} className="flex items-start gap-2.5 text-xs">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <div>
                            <strong className="font-semibold text-foreground">{item.label}:</strong>{" "}
                            <span className="text-muted-foreground">{item.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-28 bg-surface border-t border-border relative">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <ArchitectureDiagram />
          </div>
        </section>

        {/* 5. Developer AI Tools & Agentic IDE Governance */}
        <section id="developer-ai" className="border-t border-border bg-background py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase text-primary">Engineering AI Controls</p>
              <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Developer AI Tools & Agentic IDE Governance</h2>
            </div>

            {/* Alert Callout Block */}
            <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6 md:p-8 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/20 p-2 text-primary">
                  <AlertTriangle className="size-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Governing the AI your engineering teams actually use.</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Organizations spend heavily to audit models they build internally, while engineers paste proprietary source code into coding assistants and support teams paste customer data into chat assistants. ReguLattice closes this gap under <strong className="text-foreground">ISO 42001 Clause A.10.x</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-sections A & B Grid */}
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {/* Sub-section A */}
              <div className="rounded-xl border border-border bg-card p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Terminal className="size-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-primary font-bold">Sub-System A</span>
                    <h3 className="font-display text-xl font-bold text-foreground">Claude Code Audit-Tier Analytics</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  ReguLattice connects directly to Anthropic's Organization Admin API (<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-primary">claude_code_admin</code>) to provide verifiable, audit-tier usage telemetry:
                </p>
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <strong className="font-semibold text-foreground">Developer Session Metrics:</strong> Track total active Claude Code sessions across engineering orgs.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <strong className="font-semibold text-foreground">Codebase Impact:</strong> Aggregate lines of code added, lines removed, commits, and Pull Requests generated by Claude Code.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <strong className="font-semibold text-foreground">Model Breakdown:</strong> Measure usage across <code className="font-mono text-primary">claude-3-5-sonnet</code>, <code className="font-mono text-primary">claude-3-7-sonnet</code>, and hybrid r1 models.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <strong className="font-semibold text-foreground">Privacy-First Design:</strong> Actor identities and code content remain inside your organization—ReguLattice records audit counts and model usage without ingesting developer PII.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Sub-section B */}
              <div className="rounded-xl border border-border bg-card p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Code2 className="size-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-primary font-bold">Sub-System B</span>
                    <h3 className="font-display text-xl font-bold text-foreground">Agentic IDE & Coding Assistant Governance</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Classify and govern developer AI tools (Cursor, Antigravity, GitHub Copilot) in your active inventory register:
                </p>
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <strong className="font-semibold text-foreground">Tool Taxonomy:</strong> Categorize tools by <code className="font-mono text-primary">agentic_ide</code>, <code className="font-mono text-primary">coding_assistant</code>, <code className="font-mono text-primary">chat_assistant</code>, or <code className="font-mono text-primary">embedded_feature</code>.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <strong className="font-semibold text-foreground">Data Exposure Boundaries:</strong> Enforce policies based on exposure risk (<code className="font-mono text-primary">source_code</code>, <code className="font-mono text-primary">customer_pii</code>, <code className="font-mono text-primary">internal_docs</code>).
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <strong className="font-semibold text-foreground">Egress Path Controls:</strong> Track whether data stays local (<code className="font-mono text-primary">local_llm</code>), stays in enterprise boundaries (<code className="font-mono text-primary">enterprise_tenant</code>), or leaves the organization (<code className="font-mono text-primary">cloud_api</code>).
                    </div>
                  </li>
                </ul>

                <div className="pt-2 border-t border-border">
                  <div className="font-mono text-[11px] font-bold text-primary uppercase mb-2">Automated ISO 42001 Control Mapping</div>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px] text-muted-foreground">
                    <div className="rounded border border-border bg-background p-2"><strong className="text-foreground">A.6.2.6:</strong> Operational monitoring for agentic code tools</div>
                    <div className="rounded border border-border bg-background p-2"><strong className="text-foreground">A.6.2.8:</strong> Automated event logging for AI generation</div>
                    <div className="rounded border border-border bg-background p-2"><strong className="text-foreground">A.7.2 / A.7.3:</strong> Data acquisition & egress boundary enforcement</div>
                    <div className="rounded border border-border bg-background p-2"><strong className="text-foreground">A.10.3:</strong> Third-party AI supplier risk management</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gated Autonomy Highlight Banner */}
        <section className="bg-foreground py-24 text-background">
          <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
            <div className="mx-auto mb-8 flex size-14 items-center justify-center border border-signal">
              <Fingerprint className="size-6 text-signal" />
            </div>
            <blockquote className="text-pretty font-display text-2xl italic leading-relaxed md:text-4xl">
              “Full AI autonomy in compliance violates European AI Act Article 14 human oversight mandates. Manual GRC creates unacceptable engineering bottlenecks. ReguLattice engineered <strong className="not-italic text-signal">Gated Autonomy</strong>—models draft, verify, and route evidence, but execution requires human authorization.”
            </blockquote>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-signal">Human authorization remains the control boundary</p>
          </div>
        </section>

        {/* 6. Regulatory Framework & Standards Alignment */}
        <section id="frameworks" className="border-t border-border bg-surface py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="font-mono text-xs uppercase text-primary">Regulatory Alignment</p>
              <h2 className="mt-3 font-display text-4xl font-extrabold">Regulatory Framework & Standards Alignment</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                ReguLattice maps every asset, telemetry event, and developer tool directly to international compliance standards.
              </p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {frameworks.map((fw, i) => (
                <div key={fw.name} className="py-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-primary font-bold">0{i + 1}</span>
                    <h3 className="font-display text-xl font-bold text-foreground">{fw.name}</h3>
                  </div>
                  <div className="font-mono text-xs text-primary">{fw.articles}</div>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    {fw.controls.map((ctrl) => (
                      <div key={ctrl} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span>{ctrl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Ecosystem & Native Connector Network */}
        <section id="connectors" className="py-24 border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs uppercase text-primary">Integration Stack</p>
                <h2 className="mt-3 font-display text-4xl font-extrabold">Ecosystem & Native Connector Network</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                ReguLattice seamlessly integrates with your existing AI stack, repositories, and developer environments.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {connectorCategories.map((group, i) => {
                const Icon = group.icon;
                return (
                  <article key={group.category} className="rounded-xl border border-border bg-card/90 p-6 transition-all hover:border-primary hover:shadow-[var(--shadow-glow)]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">0{i + 1}</span>
                      <Icon className="size-5 text-primary" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">{group.category}</h3>
                    <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="size-3 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. Footer Call-to-Action & Sandbox Access */}
        <section id="demo" className="relative overflow-hidden border-t border-border py-28 bg-surface">
          <div className="lattice-grid absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
            <ShieldCheck className="mx-auto size-10 text-primary" />
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold md:text-6xl">
              Build Compliant AI Systems at Engineering Velocity
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Experience continuous AI footprint discovery, live Flight Recorder telemetry, and gated risk remediation in our interactive environment.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="hero" size="lg" onClick={() => openDemoModal("Schedule Technical Demo")}>
                Schedule Technical Demo <ArrowRight className="ml-1 size-4" />
              </Button>
              <Button variant="architectural" size="lg" onClick={() => openDemoModal("Access Developer Sandbox")}>
                Access Developer Sandbox <Code2 className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-card py-14">
        <div className="mx-auto max-w-7xl px-5 text-left lg:px-8">
          <div className="flex flex-col items-start justify-start gap-8 text-left md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col items-start text-left">
              <div className="flex justify-start">
                <Brand compact />
              </div>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">The Autonomous GRC Data Plane for AI Systems.</p>
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
              <a href="#platform" className="transition-colors hover:text-primary">Platform</a>
              <a href="#pillars" className="transition-colors hover:text-primary">Pillars</a>
              <a href="#developer-ai" className="transition-colors hover:text-primary">Developer AI</a>
              <a href="#frameworks" className="transition-colors hover:text-primary">Frameworks</a>
              <a href="#connectors" className="transition-colors hover:text-primary">Connectors</a>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-6 text-center font-mono text-[10px] uppercase text-muted-foreground space-y-1">
            <div>© 2026 ReguLattice Inc. · The Autonomous GRC Data Plane for AI Systems.</div>
            <div className="text-[9px] text-muted-foreground/70">ISO/IEC 42001 Schema Verified · EU AI Act Compliant · SOC 2 Type II Telemetry Stream</div>
          </div>
        </div>
      </footer>

      {/* Demo / Sandbox Modal */}
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
                    <Loader2 className="size-4 animate-spin mr-2" /> Sending Notification...
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