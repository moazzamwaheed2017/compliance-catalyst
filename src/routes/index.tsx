import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Code2, Eye, Fingerprint, Instagram, Linkedin, Loader2, Mail, Network, Radio, ShieldCheck, Workflow, X } from "lucide-react";
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

const comparisons = [
  { capability: "Inventory Discovery", oldWay: "Manual annual questionnaires", newWay: "Real-Time Gateway & API Auto-Discovery" },
  { capability: "Evidence Verification", oldWay: "Static PDF uploads", newWay: "Dual-Pass RAG & Semantic Consensus Verification" },
  { capability: "Monitoring", oldWay: "Periodic audit sampling", newWay: "Unified Telemetry Flight Recorder (Live Event Stream)" },
  { capability: "Remediation", oldWay: "Slack messages & emails", newWay: "Gated Autonomy Kanban with Multi-Role Approvals" },
  { capability: "Feedback Loop", oldWay: "Untracked manual overrides", newWay: "Field-Level Audit Trail & RLHF Learning Loop" },
];

const pillars = [
  {
    icon: Network,
    title: "1. Continuous AI Footprint Auto-Discovery",
    text: "Automatically catalog all deployed models, endpoints, and data flows across SaaS providers and internal clusters.",
    bullets: [
      "Live integration with OpenAI, Anthropic, Google Gemini, Ollama, and GitHub",
      "Instant validation of API credentials and model schema configurations",
      "Dynamic tagging of shadow AI endpoints and unapproved model deployments",
    ],
  },
  {
    icon: Eye,
    title: "2. Dual-Pass Evidence & Policy Verification",
    text: "Eliminate false positives with deterministic RAG chunking and secondary model consensus.",
    bullets: [
      "Primary vector search against ISO 42001 & EU AI Act regulatory requirements",
      "Cross-model verification to flag hallucinations, contradictions, and compliance gaps",
      "Automated PASS/FAIL evidence scoring with complete lineage tracing",
    ],
  },
  {
    icon: Radio,
    title: "3. Unified Telemetry Event Log (Flight Recorder)",
    text: "Real-time operational observability for AI system behaviors, agentic tool usage, and prompt drift.",
    bullets: [
      "Live 5-second event telemetry stream capturing INFO, WARN, SECURITY_ALERT, and HALLUCINATION_FLAG",
      "Direct triage workflows: Confirm systemic errors or flag false positives with one click",
      "Built-in audit logs satisfying EU AI Act Article 73 post-market monitoring",
    ],
  },
  {
    icon: Workflow,
    title: "4. Gated Autonomy Remediation Pipeline",
    text: "Enforce strict human oversight over high-risk AI remediations with granular role-based approvals.",
    bullets: [
      "Kanban oversight board tracking SLA timers and open risk items",
      "Multi-approver sign-offs requiring Compliance Officer and AI Safety Engineer approval",
      "Complete RLHF feedback loop capturing field-level override audit trails",
    ],
  },
];

const frameworks = [
  ["EU Artificial Intelligence Act", "Art. 9 (Risk Mgmt System), Art. 14 (Human Oversight), Art. 73 (Post-Market Monitoring & Flight Recorder)"],
  ["ISO/IEC 42001:2023", "AI Management System (AIMS) Control Verification & Clause 6.1.2 Risk Management"],
  ["NIST AI RMF 1.0", "GOVERN, MAP, MEASURE, and MANAGE Functions"],
  ["ISO 23894:2023", "Causal risk and residual impact assessment"],
];

const integrations = [
  ["Cloud Models & LLMs", "OpenAI (GPT-4o) · Anthropic (Claude 3.5) · Google Gemini Pro · Ollama (Llama 3 / Mistral)"],
  ["Repositories & Infra", "GitHub REST API · IAM Policy Engine · Vector DB RAG Pipeline"],
  ["Identity & Access", "Okta · Entra ID · Google Workspace"],
  ["Observability & CI/CD", "Datadog · MLflow · Hugging Face · GitHub Actions"],
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
            <a className="transition-colors hover:text-primary" href="#platform">Platform</a>
            <a className="transition-colors hover:text-primary" href="#architecture">Architecture</a>
            <a className="transition-colors hover:text-primary" href="#frameworks">Compliance</a>
            <span className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] uppercase text-primary">Live lattice</span>
          </div>
          <Button variant="ink" onClick={() => openDemoModal("Schedule Technical Demo")}>
            Request access
          </Button>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="relative overflow-hidden px-5 pb-20 pt-20 md:pb-28 md:pt-28 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_360px]">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase text-primary backdrop-blur-sm">
                <span className="signal-pulse size-2 rounded-full bg-signal" /> Active governance data plane
              </div>
              <h1 className="max-w-4xl text-balance font-display text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-8xl">
                The Autonomous GRC <span className="text-primary">Data Plane</span> for AI Systems
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
          <div className="mx-auto mt-20 grid max-w-7xl gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {["EU AI Act Ready · Art. 9, 14, 73", "ISO/IEC 42001 Schema", "NIST AI RMF Compliant", "Real-Time Flight Recorder Telemetry"].map((badge) => <div key={badge} className="bg-background/85 px-5 py-4 font-mono text-[10px] uppercase text-muted-foreground">{badge}</div>)}
          </div>
        </section>

        <section id="platform" className="border-y border-border bg-surface py-24 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="font-mono text-xs uppercase text-primary">Why the category must change</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold md:text-5xl">Static GRC Tools Are Breaking Under AI Velocity</h2>
            <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">Annual surveys, spreadsheets, and generic LLM wrappers cannot keep up with autonomous agents, fine-tuned models, and daily cloud API updates across OpenAI, Anthropic, Gemini, and Ollama.</p>
            <div className="mt-12 overflow-hidden rounded-sm border border-border bg-border">
              <div className="grid grid-cols-3 gap-px bg-border font-mono text-[11px] uppercase">
                <div className="bg-muted/70 p-5 text-muted-foreground font-semibold">Capability</div>
                <div className="bg-muted p-5 text-muted-foreground font-semibold">Traditional GRC</div>
                <div className="bg-accent p-5 text-primary font-semibold">ReguLattice Data Plane</div>
              </div>
              {comparisons.map(({ capability, oldWay, newWay }) => (
                <div key={capability} className="grid grid-cols-3 gap-px border-t border-border bg-border">
                  <div className="flex items-center bg-background p-5 text-sm font-semibold text-foreground">{capability}</div>
                  <div className="flex items-start gap-3 bg-background p-5 text-sm text-muted-foreground"><X className="mt-0.5 size-4 shrink-0 text-muted-foreground/70" />{oldWay}</div>
                  <div className="flex items-start gap-3 bg-surface p-5 text-sm font-medium text-foreground"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{newWay}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="architecture" className="py-28">
          <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 md:flex-row lg:px-8">
            <div className="md:sticky md:top-32 md:h-fit md:w-1/3">
              <p className="font-mono text-xs uppercase text-primary">Platform architecture</p>
              <h2 className="mt-4 font-display text-5xl font-extrabold leading-none">The Four Pillars of ReguLattice</h2>
              <p className="mt-6 leading-7 text-muted-foreground">A continuous control loop bridging engineering velocity and regulatory mandate.</p>
            </div>
            <div className="grid gap-x-10 gap-y-14 md:w-2/3 lg:grid-cols-2">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return <article key={pillar.title} className="group border-l border-border p-6 transition-colors hover:border-primary">
                  <div className="flex items-center justify-between"><span className="font-mono text-4xl text-border">0{index + 1}</span><Icon className="size-5 text-primary" /></div>
                  <h3 className="mt-5 font-display text-xl font-bold">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{pillar.text}</p>
                  <ul className="mt-5 space-y-2 text-xs text-muted-foreground">{pillar.bullets.map((b) => <li key={b} className="flex gap-2"><Check className="size-3.5 shrink-0 text-primary" />{b}</li>)}</ul>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="bg-foreground py-28 text-background">
          <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
            <div className="mx-auto mb-9 flex size-14 items-center justify-center border border-signal"><Fingerprint className="size-6 text-signal" /></div>
            <blockquote className="text-pretty font-display text-2xl italic leading-relaxed md:text-4xl">“Full AI autonomy in compliance violates European AI Act Article 14 human oversight mandates. Manual GRC creates unacceptable engineering bottlenecks. ReguLattice engineered <strong className="not-italic text-signal">Gated Autonomy</strong>—models draft, verify, and route evidence, but execution requires human authorization.”</blockquote>
            <p className="mt-8 font-mono text-[10px] uppercase text-signal">Human authorization remains the control boundary</p>
          </div>
        </section>

        <section id="frameworks" className="border-b border-border bg-surface py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div><p className="font-mono text-xs uppercase text-primary">Framework & Ecosystem Support</p><h2 className="mt-3 font-display text-4xl font-extrabold">Supported Standards & Articles</h2></div>
            <div className="divide-y divide-border border-y border-border">{frameworks.map(([name, detail], i) => <div key={name} className="grid gap-2 py-5 sm:grid-cols-[44px_1fr_1.4fr]"><span className="font-mono text-xs text-primary">0{i + 1}</span><strong className="text-sm">{name}</strong><span className="text-sm text-muted-foreground">{detail}</span></div>)}</div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono text-xs uppercase text-primary">Native Integrations</p><h2 className="mt-3 font-display text-4xl font-extrabold">Enterprise Integration Stack</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">Connect live cloud models, local LLMs, code repositories, and IAM policy engines directly to your governance plane.</p></div>
            <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{integrations.map(([category, names], i) => <article key={category} className="min-h-44 bg-background/90 p-6"><span className="font-mono text-xs text-primary">0{i + 1}</span><h3 className="mt-8 font-display text-lg font-bold">{category}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{names}</p></article>)}</div>
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