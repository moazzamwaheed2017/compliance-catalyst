import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2, Cpu, Eye, Fingerprint, Instagram, Linkedin, Loader2, Lock, Mail, Network, Radio, ShieldCheck, Terminal, Workflow, X, Code2, Layers, Cpu as CpuIcon, GitBranch, Server } from "lucide-react";
import { useState, useEffect } from "react";
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
      { name: "description", content: "Continuously discover deployed AI footprints, verify evidence with dual-pass model consensus, stream real-time telemetry through a live Flight Recorder, and execute gated risk remediations—built for EU AI Act, ISO/IEC 42001, and NIST AI RMF." },
      { property: "og:title", content: "ReguLattice | Autonomous GRC Data Plane for AI Systems" },
      { property: "og:description", content: "Continuous, verifiable governance for enterprise AI systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});


const trustBadges = [
  { title: "EU AI Act Ready", desc: "Art. 9 (Risk Mgmt), Art. 14 (Human Oversight), Art. 73 (Post-Market Monitoring)" },
  { title: "ISO/IEC 42001 Certified Schema", desc: "AIMS Control Verification & A.10 Supplier Controls" },
  { title: "NIST AI RMF Compliant", desc: "Govern, Map, Measure, Manage Functions" },
  { title: "Real-Time Flight Recorder Telemetry", desc: "SOC 2 Type II Event Logging" },
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
    id: "01",
    name: "EU Artificial Intelligence Act",
    badge: "EU MANDATE",
    articles: "Art. 9 (Risk Management), Art. 14 (Human Oversight), Art. 73 (Post-Market Monitoring)",
    icon: ShieldCheck,
    controls: [
      { code: "Article 9 (Risk Management System)", text: "Continuous risk identification and remediation pipeline." },
      { code: "Article 14 (Human Oversight)", text: "Two-stage approval override gates on all automated remediations." },
      { code: "Article 73 (Post-Market Monitoring)", text: "Unified Telemetry Flight Recorder capturing live model events." },
    ],
  },
  {
    id: "02",
    name: "ISO/IEC 42001 (AIMS Management System)",
    badge: "INTERNATIONAL STANDARD",
    articles: "AIMS Control Verification & Clause A.10 Supplier Risk Controls",
    icon: Layers,
    controls: [
      { code: "Control A.2.2 / A.3.2", text: "Organizational AI policies & roles." },
      { code: "Control A.6.2.6 / A.6.2.8", text: "Operational monitoring and event logging." },
      { code: "Control A.7.2 / A.7.3", text: "Data provenance & egress boundaries." },
      { code: "Control A.10.2 / A.10.3", text: "Third-party supplier and developer tool governance." },
    ],
  },
  {
    id: "03",
    name: "NIST AI RMF 1.0",
    badge: "US FRAMEWORK",
    articles: "GOVERN, MAP, MEASURE, and MANAGE Functions",
    icon: Lock,
    controls: [
      { code: "GOVERN", text: "Institutional policies and AI tool adoption registries." },
      { code: "MAP", text: "AI asset inventory and data exposure categorizations." },
      { code: "MEASURE", text: "Dual-pass semantic evidence evaluation." },
      { code: "MANAGE", text: "Gated autonomy risk remediation Kanban." },
    ],
  },
];

const connectorCategories = [
  {
    category: "Private & Self-Hosted Models",
    icon: Server,
    items: [
      "Private On-Prem LLM Clusters",
      "Self-Hosted Runtimes (vLLM, TGI)",
      "Fine-Tuned Enterprise Models",
      "Kubernetes & Air-Gapped Weight Repos",
    ],
  },
  {
    category: "Local & Open-Source LLMs",
    icon: CpuIcon,
    items: [
      "Ollama (Llama 3, Mistral, Qwen)",
      "DeepSeek-R1 & Open Weights",
      "Local Workstation Runtimes",
      "Edge & On-Device AI Deployments",
    ],
  },
  {
    category: "Public LLMs & Commercial APIs",
    icon: Network,
    items: [
      "ChatGPT / OpenAI",
      "Anthropic Claude",
      "Google Gemini Pro & Ultra",
      "xAI Grok, Perplexity & Cohere",
    ],
  },
  {
    category: "Developer AI & Coding Tools",
    icon: Code2,
    items: [
      "Cursor IDE & Windsurf",
      "Claude Code (Admin API Telemetry)",
      "Antigravity Agentic IDE",
      "GitHub Copilot & Coding Assistants",
    ],
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

  useEffect(() => {
    try {
      fetch("/api/public/log-visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: window.location.href,
          referrer: document.referrer || "Direct",
        }),
      }).catch((err) => console.warn("Visitor logging notice:", err));
    } catch {
      // Ignore client side fetch error
    }
  }, []);

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
          <div className="hidden items-center gap-6 text-xs font-mono uppercase text-muted-foreground lg:flex">
            <a className="transition-colors hover:text-primary" href="#pillars">Pillars</a>
            <a className="transition-colors hover:text-primary" href="#architecture">Architecture</a>
            <a className="transition-colors hover:text-primary" href="#frameworks">Frameworks</a>
            <a className="transition-colors hover:text-primary" href="#connectors">Connectors</a>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] text-primary">
              <span className="signal-pulse size-1.5 rounded-full bg-signal" /> Live Lattice Status: Active
            </span>
          </div>
          <div className="flex items-center gap-3">
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
              <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
                The <span className="text-primary">Autonomous GRC Data Plane</span> <br />
                for AI Systems &amp; <br />
                Agentic Workflows
              </h1>
              <p className="mt-7 max-w-3xl text-pretty text-base leading-8 text-muted-foreground md:text-xl">
                Continuously discover deployed AI footprints and developer IDE tools, verify evidence with dual-pass model consensus, stream real-time telemetry through a live Flight Recorder, and execute gated risk remediations. Built for <strong className="font-semibold text-foreground">EU AI Act</strong>, <strong className="font-semibold text-foreground">ISO/IEC 42001</strong>, and <strong className="font-semibold text-foreground">NIST AI RMF</strong>.
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

        {/* ReguLattice Usecase Video Showcase */}
        <section id="demo-video" className="border-t border-border bg-card py-20">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <div className="text-center mb-8">
              <span className="rounded border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold text-primary uppercase">
                Platform Demo &amp; Usecase
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                ReguLattice Autonomous GRC in Action
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Watch how ReguLattice continuously discovers AI assets, verifies evidence, and enforces gated autonomy.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
              <video
                src="/regulattice-usecase-1.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto rounded-xl object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* 6. Regulatory Framework & Standards Alignment */}
        <section id="frameworks" className="border-t border-border bg-surface py-24 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Left Side: Fixed/Sticky Section Title & Overview */}
              <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 font-mono text-[10px] uppercase font-bold text-primary backdrop-blur-sm">
                  <span className="signal-pulse size-1.5 rounded-full bg-signal" /> Regulatory Alignment
                </span>
                <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                  Regulatory Framework &amp; Standards Alignment
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  ReguLattice maps every asset, telemetry event, and developer tool directly to international compliance standards.
                </p>
              </div>

              {/* Right Side: Vertical Scroll Container */}
              <div className="lg:col-span-7 space-y-6 max-h-[620px] overflow-y-auto pr-2 custom-scrollbar">
                {frameworks.map((fw) => {
                  const Icon = fw.icon;
                  return (
                    <div
                      key={fw.id}
                      className="group relative rounded-2xl border border-border bg-card/95 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
                    >
                      <div className="flex items-center justify-between border-b border-border/80 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-primary">{fw.id}</span>
                          <span className="rounded border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold text-primary uppercase">
                            {fw.badge}
                          </span>
                        </div>
                        <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
                          <Icon className="size-4" />
                        </div>
                      </div>

                      <div className="mt-5">
                        <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {fw.name}
                        </h3>
                        <p className="mt-2 font-mono text-xs text-primary/90 font-medium">
                          {fw.articles}
                        </p>
                      </div>

                      <div className="mt-6 space-y-3">
                        {fw.controls.map((ctrl) => (
                          <div key={ctrl.code} className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/60 p-3.5 text-xs transition-colors hover:border-border">
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            <div>
                              <strong className="font-mono text-[11px] font-bold text-foreground">{ctrl.code}:</strong>{" "}
                              <span className="text-muted-foreground leading-relaxed">{ctrl.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Ecosystem & Native Connector Network */}
        <section id="connectors" className="py-24 border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs uppercase text-primary">Native Integrations</p>
                <h2 className="mt-3 font-display text-4xl font-extrabold">Ecosystem & Native Connector Network</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Connect live cloud models, local LLMs, code repositories, and IAM policy engines directly to your governance plane.
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
              <a href="#pillars" className="transition-colors hover:text-primary">Pillars</a>
              <a href="#architecture" className="transition-colors hover:text-primary">Architecture</a>
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