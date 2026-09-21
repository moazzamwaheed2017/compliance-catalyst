import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2, Cpu, Eye, Fingerprint, Instagram, Linkedin, Loader2, Lock, Mail, Network, Radio, ShieldCheck, Terminal, Workflow, X, Code2, Layers, Cpu as CpuIcon, GitBranch, Server, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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

// ReguLattice Gemini & Claude Autonomous GRC Video Showcase
function DemoVideoShowcase() {
  const [activeTab, setActiveTab] = useState<"dual" | "gemini" | "claude">("dual");

  return (
    <section id="demo-video" className="border-t border-border bg-gradient-to-b from-background via-card/50 to-background py-28 relative overflow-hidden">
      {/* Dynamic ambient radial glowing background */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[750px] blur-[140px] pointer-events-none rounded-full transition-all duration-700 ${
        activeTab === "gemini" ? "bg-sky-500/15" : activeTab === "claude" ? "bg-amber-500/15" : "bg-primary/10"
      }`} />

      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-mono text-[11px] uppercase font-bold text-primary backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.25)]">
            <span className="signal-pulse size-2 rounded-full bg-emerald-400" /> LIVE TELEMETRY FLIGHT RECORDER STREAM
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-foreground sm:text-5xl tracking-tight">
            ReguLattice Autonomous GRC in Action
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Real-time compliance monitoring, evidence verification, and gated remediation across model runtimes.
          </p>

          {/* Futuristic Control Console Switcher */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-background/90 p-2 backdrop-blur-xl shadow-2xl">
            <button
              onClick={() => setActiveTab("dual")}
              className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                activeTab === "dual"
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/60"
              }`}
            >
              <Layers className="size-4" />
              <span>Unified Command Center</span>
            </button>

            <button
              onClick={() => setActiveTab("gemini")}
              className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                activeTab === "gemini"
                  ? "bg-sky-500 text-white shadow-[0_0_25px_rgba(14,165,233,0.4)] scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/60"
              }`}
            >
              <Cpu className="size-4 text-sky-400" />
              <span>Gemini Governance</span>
            </button>

            <button
              onClick={() => setActiveTab("claude")}
              className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                activeTab === "claude"
                  ? "bg-amber-500 text-white shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/60"
              }`}
            >
              <ShieldCheck className="size-4 text-amber-400" />
              <span>Claude Governance</span>
            </button>
          </div>
        </div>

        {/* Console Theater View */}
        {activeTab === "dual" ? (
          <div className="grid gap-8 lg:grid-cols-2 items-stretch">
            {/* Gemini Console Card */}
            <div className="group relative flex flex-col justify-between rounded-3xl border border-sky-500/30 bg-card/95 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(14,165,233,0.12)] transition-all duration-500 hover:border-sky-500/70 hover:shadow-[0_0_50px_rgba(14,165,233,0.25)] hover:-translate-y-1">
              <div>
                {/* macOS Style Window Header */}
                <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500/80" />
                    <div className="size-3 rounded-full bg-yellow-500/80" />
                    <div className="size-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 font-mono text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                      gemini-telemetry-plane.v1
                    </span>
                  </div>
                  <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-0.5 font-mono text-[10px] font-bold text-sky-400 uppercase">
                    Gemini 1.5 Pro
                  </span>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-black/90 shadow-2xl group-hover:border-sky-500/50 transition-all">
                  <video
                    src="/gemini-usecase.mp4"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full aspect-video rounded-2xl object-cover"
                  >
                    Your browser does not support video playback.
                  </video>
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1 text-[10px] font-mono text-white/90 flex items-center gap-2">
                    <span className="size-2 rounded-full bg-sky-400 animate-ping" />
                    <span>STREAMING: REAL-TIME PROMPT TELEMETRY</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-border/60 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-sky-400" />
                    Gemini Prompt &amp; Egress Guardrails
                  </h4>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                    STATUS: PASSED
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Autonomous discovery and telemetry inspection of Gemini endpoints with continuous data egress monitoring and ISO/IEC 42001 audit compliance.
                </p>
              </div>
            </div>

            {/* Claude Console Card */}
            <div className="group relative flex flex-col justify-between rounded-3xl border border-amber-500/30 bg-card/95 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.12)] transition-all duration-500 hover:border-amber-500/70 hover:shadow-[0_0_50px_rgba(245,158,11,0.25)] hover:-translate-y-1">
              <div>
                {/* macOS Style Window Header */}
                <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500/80" />
                    <div className="size-3 rounded-full bg-yellow-500/80" />
                    <div className="size-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      claude-verification-plane.v1
                    </span>
                  </div>
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 font-mono text-[10px] font-bold text-amber-400 uppercase">
                    Claude 3.5 Sonnet
                  </span>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-black/90 shadow-2xl group-hover:border-amber-500/50 transition-all">
                  <video
                    src="/claude-usecase.mp4"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full aspect-video rounded-2xl object-cover"
                  >
                    Your browser does not support video playback.
                  </video>
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1 text-[10px] font-mono text-white/90 flex items-center gap-2">
                    <span className="size-2 rounded-full bg-amber-400 animate-ping" />
                    <span>STREAMING: DUAL-PASS RAG VERIFICATION</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-border/60 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-amber-400" />
                    Claude Evidence &amp; Gated Human Sign-off
                  </h4>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                    STATUS: VERIFIED
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dual-pass RAG evaluation for policy drift detection, contradiction checks, and EU AI Act Article 14 gated human override approval pipelines.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Single Featured Focus View */
          <div className="max-w-5xl mx-auto">
            <div className={`relative rounded-3xl border ${
              activeTab === "gemini" ? "border-sky-500/60 shadow-[0_0_60px_rgba(14,165,233,0.3)]" : "border-amber-500/60 shadow-[0_0_60px_rgba(245,158,11,0.3)]"
            } bg-card/95 p-6 sm:p-10 backdrop-blur-2xl transition-all duration-500`}>
              <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500/80" />
                    <div className="size-3 rounded-full bg-yellow-500/80" />
                    <div className="size-3 rounded-full bg-green-500/80" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-foreground ml-2">
                    {activeTab === "gemini" ? "Google Gemini Model Governance & Audit Flight Deck" : "Anthropic Claude Dual-Pass Evidence & Remediations"}
                  </h3>
                </div>
                <span className={`rounded-full border ${
                  activeTab === "gemini" ? "border-sky-500/40 bg-sky-500/15 text-sky-400" : "border-amber-500/40 bg-amber-500/15 text-amber-400"
                } px-4 py-1 font-mono text-xs font-bold uppercase`}>
                  {activeTab === "gemini" ? "Gemini 1.5 Pro" : "Claude 3.5 Sonnet"}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-border bg-black shadow-2xl">
                <video
                  src={activeTab === "gemini" ? "/gemini-usecase.mp4" : "/claude-usecase.mp4"}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full aspect-video rounded-2xl object-cover"
                >
                  Your browser does not support video playback.
                </video>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 pt-2">
                <div className="rounded-2xl border border-border/80 bg-background/80 p-5 backdrop-blur-md">
                  <strong className="font-mono text-[11px] text-primary uppercase tracking-wider block mb-1">01 / Telemetry Agent</strong>
                  <p className="text-xs text-muted-foreground leading-relaxed">Continuous 5s flight recorder logs capturing prompt events &amp; model drift.</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/80 p-5 backdrop-blur-md">
                  <strong className="font-mono text-[11px] text-primary uppercase tracking-wider block mb-1">02 / Evidence Engine</strong>
                  <p className="text-xs text-muted-foreground leading-relaxed">Automatic vector similarity mapping against ISO 42001 &amp; EU AI Act controls.</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/80 p-5 backdrop-blur-md">
                  <strong className="font-mono text-[11px] text-primary uppercase tracking-wider block mb-1">03 / Gated Approval</strong>
                  <p className="text-xs text-muted-foreground leading-relaxed">Mandatory multi-role human sign-off before high-risk automated remediations.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
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
  const frameworksScrollRef = useRef<HTMLDivElement>(null);

  const scrollFrameworks = (direction: "up" | "down") => {
    if (frameworksScrollRef.current) {
      const scrollAmount = 240;
      frameworksScrollRef.current.scrollBy({
        top: direction === "down" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      if (e.key === "ArrowDown") {
        if (frameworksScrollRef.current) {
          const rect = frameworksScrollRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            e.preventDefault();
            scrollFrameworks("down");
          }
        }
      } else if (e.key === "ArrowUp") {
        if (frameworksScrollRef.current) {
          const rect = frameworksScrollRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            e.preventDefault();
            scrollFrameworks("up");
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

      {/* 1. Navigation Header (Variance Style Floating Bar) */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-2xl transition-all">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
          <Brand />
          
          <div className="hidden items-center gap-8 text-xs font-mono uppercase text-muted-foreground lg:flex">
            <a className="transition-colors hover:text-foreground" href="#pillars">Pillars</a>
            <a className="transition-colors hover:text-foreground" href="#architecture">Architecture</a>
            <a className="transition-colors hover:text-foreground" href="#demo-video">Demo &amp; Showcase</a>
            <a className="transition-colors hover:text-foreground" href="#frameworks">Frameworks</a>
            <a className="transition-colors hover:text-foreground" href="#connectors">Connectors</a>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono text-emerald-400 sm:inline-flex">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Lattice Data Plane: Active
            </span>
            <Button variant="hero" size="sm" onClick={() => openDemoModal("Schedule Technical Demo")} className="rounded-full px-5">
              Get a Demo
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* 2. Hero Section (Variance Style Minimalist High-Trust Layout) */}
        <section className="relative overflow-hidden px-5 pt-16 pb-20 md:pt-24 md:pb-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Top Announcement Pill (Variance Style) */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground font-mono uppercase">
                NEW
              </span>
              <span className="font-mono text-xs text-primary font-medium">
                Announcing ReguLattice Autonomous GRC Data Plane 2.0 &rarr;
              </span>
            </div>

            <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
              {/* Hero Left Content */}
              <div className="lg:col-span-7 space-y-7">
                <h1 className="font-display text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                  Trust AI agents with <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-emerald-400">
                    enterprise compliance
                  </span>{" "}
                  &amp; governance
                </h1>

                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
                  Delegate continuous AI discovery, evidence verification, and gated remediation to autonomous GRC agents—from L1 telemetry to L3 human approval.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row pt-2">
                  <Button variant="hero" size="lg" onClick={() => openDemoModal("Schedule Technical Demo")} className="rounded-full px-8 text-sm">
                    Schedule Technical Demo <ArrowRight className="ml-2 size-4" />
                  </Button>
                  <Button variant="architectural" size="lg" onClick={() => openDemoModal("Access Developer Sandbox")} className="rounded-full px-8 text-sm border-border/80">
                    Explore Architecture <Code2 className="ml-2 size-4" />
                  </Button>
                </div>
              </div>

              {/* Hero Right: Live AI Governance Evidence Card (Variance Signature Showcase) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl border border-border/80 bg-card/95 p-6 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all hover:border-primary/50">
                  {/* Card macOS Window Header */}
                  <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="size-2.5 rounded-full bg-red-500/80" />
                      <div className="size-2.5 rounded-full bg-yellow-500/80" />
                      <div className="size-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        LIVE CASE RECORDER · GRC-942
                      </span>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400 uppercase">
                      AUDITABLE
                    </span>
                  </div>

                  <div className="space-y-4 font-mono text-xs">
                    <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-destructive">
                      <strong className="block text-[11px] font-bold uppercase mb-1">Alert: Shadow AI Endpoint Detected</strong>
                      <span className="text-[11px] leading-relaxed text-destructive/90">
                        Unapproved model runtime operating outside organization policy (<code className="text-foreground bg-black/40 px-1 rounded">vLLM-llama3-70b</code>).
                      </span>
                    </div>

                    <div className="space-y-2 text-muted-foreground text-[11px] bg-background/60 p-4 rounded-xl border border-border/60">
                      <div className="flex items-start gap-2">
                        <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                        <span>Egress boundary check: Prompt payload contains unmasked client PII</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                        <span>EU AI Act Article 14 Human Oversight override gate triggered</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                        <span>6 telemetry logs, 4 policy citations (ISO 42001 &amp; NIST AI RMF)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-border/60 pt-3 text-[10px]">
                      <span className="text-muted-foreground">REMEDIATION STATUS</span>
                      <span className="font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/30">
                        ARTICLE 14 GATED SIGN-OFF ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Variance Trust Bar: Built for regulated institutions */}
            <div className="mt-20 border-y border-border/80 py-8 text-center">
              <p className="font-mono text-xs uppercase text-muted-foreground tracking-widest mb-6">
                Built for enterprise AI teams and institutions regulated by
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {trustBadges.map((badge) => (
                  <div key={badge.title} className="rounded-2xl border border-border/80 bg-card/60 p-4 backdrop-blur-md transition-all hover:border-primary/40 hover:bg-card">
                    <div className="font-mono text-xs font-bold text-foreground uppercase">{badge.title}</div>
                    <div className="mt-1 font-mono text-[10px] text-muted-foreground">{badge.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. The Four Core Pillars of ReguLattice (Variance Feature Modular Grid) */}
        <section id="pillars" className="border-t border-border bg-card/40 py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-[10px] uppercase font-bold text-primary backdrop-blur-sm shadow-[var(--shadow-glow)]">
                <span className="signal-pulse size-1.5 rounded-full bg-signal" /> PLATFORM CORE ARCHITECTURE
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                Built for consistency and accuracy of detection
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                ReguLattice specialized compliance engines collect evidence, reduce audit cycles by 10&times;, and enforce strict human oversight.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {aiPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article key={pillar.id} className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/90 p-8 sm:p-10 backdrop-blur-xl transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between border-b border-border/80 pb-5 mb-6">
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-[10px] font-bold text-primary uppercase">{pillar.tag}</span>
                        <div className="flex size-11 items-center justify-center rounded-2xl border border-border bg-background text-primary transition-transform group-hover:scale-110">
                          <Icon className="size-5" />
                        </div>
                      </div>
                      <h3 className="font-display text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors">{pillar.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                      
                      <div className="mt-8 space-y-3.5">
                        {pillar.bullets.map((item) => (
                          <div key={item.label} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-3.5 text-xs transition-colors hover:border-border">
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            <div>
                              <strong className="font-semibold text-foreground">{item.label}:</strong>{" "}
                              <span className="text-muted-foreground leading-relaxed">{item.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Continuous Control Loop Architecture Section */}
        <section id="architecture" className="py-28 bg-surface border-t border-border relative">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <ArchitectureDiagram />
          </div>
        </section>

        {/* ReguLattice Usecase Video Showcase (Gemini & Claude Studio Console) */}
        <DemoVideoShowcase />

        {/* 6. Regulatory Framework & Standards Alignment (Variance Security & Audit Matrix) */}
        <section id="frameworks" className="border-t border-border bg-surface py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

          <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-[10px] uppercase font-bold text-primary backdrop-blur-sm shadow-[var(--shadow-glow)]">
                <span className="signal-pulse size-1.5 rounded-full bg-signal" /> GLOBAL COMPLIANCE MAPPING
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                Built for regulators and auditors
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Every decision comes with a complete evidence trail, cited sources, and audit-ready compliance traces.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 items-stretch">
              {frameworks.map((fw) => {
                const Icon = fw.icon;
                return (
                  <div
                    key={fw.id}
                    className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/90 p-7 sm:p-8 backdrop-blur-xl transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:-translate-y-2"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-border/80 pb-5">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-extrabold text-primary">{fw.id}</span>
                          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 font-mono text-[10px] font-bold text-primary uppercase">
                            {fw.badge}
                          </span>
                        </div>
                        <div className="flex size-11 items-center justify-center rounded-2xl border border-border bg-background text-primary transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:scale-110">
                          <Icon className="size-5" />
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-display text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                          {fw.name}
                        </h3>
                        <p className="mt-2 font-mono text-xs text-primary/90 font-semibold leading-relaxed">
                          {fw.articles}
                        </p>
                      </div>

                      <div className="mt-7 space-y-3.5">
                        {fw.controls.map((ctrl) => (
                          <div
                            key={ctrl.code}
                            className="flex items-start gap-3.5 rounded-xl border border-border/60 bg-background/60 p-4 text-xs transition-all duration-300 hover:border-primary/40 hover:bg-background"
                          >
                            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Check className="size-3" />
                            </div>
                            <div>
                              <strong className="font-mono text-[11px] font-bold uppercase text-foreground block mb-0.5">
                                {ctrl.code}
                              </strong>
                              <span className="text-muted-foreground leading-relaxed">{ctrl.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4 font-mono text-[10px]">
                      <span className="text-muted-foreground">COMPLIANCE ENGINE</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        100% MAPPED
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. Ecosystem & Native Connector Network */}
        <section id="connectors" className="py-28 border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs uppercase text-primary">Native Integrations</p>
                <h2 className="mt-3 font-display text-4xl font-extrabold">Ecosystem &amp; Native Connector Network</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Connect live cloud models, local LLMs, code repositories, and IAM policy engines directly to your governance plane.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {connectorCategories.map((group, i) => {
                const Icon = group.icon;
                return (
                  <article key={group.category} className="rounded-2xl border border-border bg-card/90 p-7 backdrop-blur-md transition-all hover:border-primary hover:shadow-[var(--shadow-glow)]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">0{i + 1}</span>
                      <Icon className="size-5 text-primary" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-foreground">{group.category}</h3>
                    <ul className="mt-5 space-y-3 text-xs text-muted-foreground">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <Check className="size-3.5 text-primary shrink-0" />
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

        {/* 8. Footer Call-to-Action & Sandbox Access (Variance Style Demo Section) */}
        <section id="demo" className="relative overflow-hidden border-t border-border py-32 bg-card/60">
          <div className="lattice-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
            <ShieldCheck className="mx-auto size-12 text-primary" />
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold md:text-6xl text-foreground">
              Build Compliant AI Systems at Engineering Velocity
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Experience continuous AI footprint discovery, live Flight Recorder telemetry, and gated risk remediation in our interactive environment.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="hero" size="lg" onClick={() => openDemoModal("Schedule Technical Demo")} className="rounded-full px-8">
                Schedule Technical Demo <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button variant="architectural" size="lg" onClick={() => openDemoModal("Access Developer Sandbox")} className="rounded-full px-8">
                Access Developer Sandbox <Code2 className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (Variance Style Clean Enterprise Footer) */}
      <footer className="relative z-10 border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-5 text-left lg:px-8">
          <div className="grid gap-10 md:grid-cols-12 md:items-start md:justify-between">
            <div className="md:col-span-6 flex flex-col items-start text-left">
              <Brand />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                The Autonomous GRC Data Plane for AI Systems. Continuous, verifiable governance across model runtimes and developer tools.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
                <a href="mailto:info@regulattice.com" className="flex items-center gap-2 font-mono transition-colors hover:text-primary">
                  <Mail className="size-4 text-primary" /> info@regulattice.com
                </a>
                <a href="https://www.linkedin.com/company/regulattice/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono transition-colors hover:text-primary" aria-label="LinkedIn">
                  <Linkedin className="size-4 text-primary" /> LinkedIn
                </a>
                <a href="https://www.instagram.com/regulattice/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono transition-colors hover:text-primary" aria-label="Instagram">
                  <Instagram className="size-4 text-primary" /> Instagram
                </a>
              </div>
            </div>

            <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs text-muted-foreground">
              <div className="space-y-3">
                <div className="font-bold uppercase text-foreground text-[11px]">Product</div>
                <ul className="space-y-2 text-[11px]">
                  <li><a href="#pillars" className="hover:text-primary transition-colors">Four Core Pillars</a></li>
                  <li><a href="#architecture" className="hover:text-primary transition-colors">Data Plane Architecture</a></li>
                  <li><a href="#demo-video" className="hover:text-primary transition-colors">Video Showcase</a></li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="font-bold uppercase text-foreground text-[11px]">Frameworks</div>
                <ul className="space-y-2 text-[11px]">
                  <li><a href="#frameworks" className="hover:text-primary transition-colors">EU AI Act</a></li>
                  <li><a href="#frameworks" className="hover:text-primary transition-colors">ISO/IEC 42001</a></li>
                  <li><a href="#frameworks" className="hover:text-primary transition-colors">NIST AI RMF 1.0</a></li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="font-bold uppercase text-foreground text-[11px]">Integrations</div>
                <ul className="space-y-2 text-[11px]">
                  <li><a href="#connectors" className="hover:text-primary transition-colors">Public LLMs</a></li>
                  <li><a href="#connectors" className="hover:text-primary transition-colors">Local Runtimes</a></li>
                  <li><a href="#connectors" className="hover:text-primary transition-colors">Developer IDEs</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-muted-foreground gap-4">
            <div>&copy; 2026 ReguLattice Inc. &middot; All rights reserved.</div>
            <div className="text-[10px] text-muted-foreground/80">
              ISO/IEC 42001 Schema Verified &middot; EU AI Act Compliant &middot; SOC 2 Type II Flight Recorder
            </div>
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
                    Submit Request &amp; Dispatch Email <ArrowRight className="ml-2 size-4" />
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