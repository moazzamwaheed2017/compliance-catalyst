import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Cpu as CpuIcon,
  Instagram,
  Layers,
  Linkedin,
  Loader2,
  Lock,
  Mail,
  Menu,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import logoAsset from "@/assets/regulattice-logo.jpg";
import { AgentShowcase } from "@/components/landing/agent-showcase";
import { ControlLoop } from "@/components/landing/control-loop";
import { HeroDashboard } from "@/components/landing/hero-dashboard";
import { Eyebrow, Reveal } from "@/components/landing/reveal";
import { UseCases } from "@/components/landing/use-cases";
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
      {
        name: "description",
        content:
          "Continuously discover deployed AI footprints, verify evidence with dual-pass model consensus, stream real-time telemetry through a live Flight Recorder, and execute gated risk remediations—built for EU AI Act, ISO/IEC 42001, and NIST AI RMF.",
      },
      { name: "theme-color", content: "#07121a" },
      { property: "og:title", content: "ReguLattice | Autonomous GRC Data Plane for AI Systems" },
      {
        property: "og:description",
        content: "Continuous, verifiable governance for enterprise AI systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { href: "#platform", label: "Platform" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#architecture", label: "Architecture" },
  { href: "#frameworks", label: "Frameworks" },
  { href: "#integrations", label: "Integrations" },
];

const ecosystem = [
  "OpenAI",
  "Anthropic Claude",
  "Google Gemini",
  "Claude Code",
  "Cursor",
  "GitHub Copilot",
  "Ollama",
  "Mistral",
  "DeepSeek",
  "vLLM",
  "Windsurf",
  "Perplexity",
  "Cohere",
  "xAI Grok",
];

const stats = [
  {
    value: "4",
    label: "Autonomous governance agents",
    sub: "Discover · Verify · Monitor · Remediate",
  },
  { value: "2-pass", label: "Evidence verification", sub: "Deterministic RAG + model consensus" },
  { value: "5s", label: "Telemetry granularity", sub: "Live Flight Recorder event stream" },
  {
    value: "3",
    label: "Frameworks mapped natively",
    sub: "EU AI Act · ISO/IEC 42001 · NIST AI RMF",
  },
];

const frameworks = [
  {
    id: "01",
    name: "EU Artificial Intelligence Act",
    badge: "EU mandate",
    articles: "Art. 9 · Art. 14 · Art. 73",
    icon: ShieldCheck,
    controls: [
      {
        code: "Article 9 — Risk management system",
        text: "Continuous risk identification and remediation pipeline.",
      },
      {
        code: "Article 14 — Human oversight",
        text: "Two-stage approval override gates on all automated remediations.",
      },
      {
        code: "Article 73 — Post-market monitoring",
        text: "Unified Telemetry Flight Recorder capturing live model events.",
      },
    ],
  },
  {
    id: "02",
    name: "ISO/IEC 42001",
    badge: "International standard",
    articles: "AIMS control verification · Clause A.10 supplier controls",
    icon: Layers,
    controls: [
      { code: "A.2.2 / A.3.2", text: "Organizational AI policies & roles." },
      { code: "A.6.2.6 / A.6.2.8", text: "Operational monitoring and event logging." },
      { code: "A.7.2 / A.7.3", text: "Data provenance & egress boundaries." },
      { code: "A.10.2 / A.10.3", text: "Third-party supplier and developer tool governance." },
    ],
  },
  {
    id: "03",
    name: "NIST AI RMF 1.0",
    badge: "US framework",
    articles: "Govern · Map · Measure · Manage",
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
    category: "Private & self-hosted models",
    icon: Server,
    items: [
      "Private on-prem LLM clusters",
      "Self-hosted runtimes (vLLM, TGI)",
      "Fine-tuned enterprise models",
      "Kubernetes & air-gapped weight repos",
    ],
  },
  {
    category: "Local & open-source LLMs",
    icon: CpuIcon,
    items: [
      "Ollama (Llama 3, Mistral, Qwen)",
      "DeepSeek-R1 & open weights",
      "Local workstation runtimes",
      "Edge & on-device AI deployments",
    ],
  },
  {
    category: "Public LLMs & commercial APIs",
    icon: Network,
    items: [
      "ChatGPT / OpenAI",
      "Anthropic Claude",
      "Google Gemini Pro & Ultra",
      "xAI Grok, Perplexity & Cohere",
    ],
  },
  {
    category: "Developer AI & coding tools",
    icon: Code2,
    items: [
      "Cursor IDE & Windsurf",
      "Claude Code (Admin API telemetry)",
      "Antigravity agentic IDE",
      "GitHub Copilot & coding assistants",
    ],
  },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="ReguLattice home">
      <img
        src={logoAsset}
        alt="ReguLattice lattice shield"
        className={`${compact ? "size-8" : "size-9"} rounded-lg object-cover ring-1 ring-white/10`}
      />
      <span className="font-display text-[17px] font-semibold tracking-tight text-foreground">
        Regu<span className="text-gradient">Lattice</span>
      </span>
    </a>
  );
}

function SectionHeader({
  eyebrow,
  title,
  accent,
  text,
  center = true,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="font-serif text-[1.08em] font-normal italic tracking-normal text-gradient">
              {accent}
            </span>
          </>
        )}
      </h2>
      {text && (
        <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          {text}
        </p>
      )}
    </Reveal>
  );
}

function SiteHeader({ onRequest }: { onRequest: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-3 pl-4 transition-all duration-500 ${
          scrolled || open
            ? "glass bg-background/85 shadow-[0_10px_40px_-10px_oklch(0_0_0/0.6)]"
            : "border border-transparent"
        }`}
        aria-label="Main navigation"
      >
        <Brand />
        <div className="hidden items-center gap-1 text-sm text-muted-foreground lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 transition-colors hover:bg-white/[0.05] hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ink" size="sm" className="h-9 px-4" onClick={onRequest}>
            Request access
          </Button>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-white/5 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-2xl bg-background/90 p-2 lg:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function AuroraBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[1100px] overflow-hidden"
      aria-hidden="true"
    >
      <div className="lattice-grid absolute inset-0" />
      <div className="aurora absolute -top-40 left-[10%] h-[520px] w-[620px] rounded-full bg-[oklch(0.8_0.13_180/0.22)] blur-[120px]" />
      <div
        className="aurora absolute -top-20 right-[5%] h-[460px] w-[520px] rounded-full bg-[oklch(0.75_0.13_220/0.2)] blur-[120px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="aurora absolute top-[380px] left-[35%] h-[380px] w-[480px] rounded-full bg-[oklch(0.8_0.16_160/0.12)] blur-[120px]"
        style={{ animationDelay: "-15s" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-background" />
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
        toast.success(
          requestType.includes("Sandbox")
            ? "14-Day Developer Sandbox Trial requested! Check your email shortly for API keys."
            : "Request sent! Notification dispatched to the ReguLattice Team.",
        );
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
    <div id="top" className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader onRequest={() => openDemoModal("Request Access")} />

      <main className="relative">
        {/* Hero */}
        <section className="relative px-5 pb-20 pt-36 sm:pt-44 lg:px-8">
          <AuroraBackground />
          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <a
                href="#frameworks"
                className="rise-in group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-xs text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <span className="rounded-full bg-brand-gradient px-2 py-0.5 font-semibold text-primary-foreground">
                  New
                </span>
                EU AI Act, ISO/IEC 42001 &amp; NIST AI RMF — mapped out of the box
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </a>

              <h1
                className="rise-in mt-8 text-balance font-display text-[2.75rem] font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-[5.25rem]"
                style={{ animationDelay: "80ms" }}
              >
                Govern every AI system.{" "}
                <span className="font-serif text-[1.08em] font-normal italic tracking-normal text-gradient">
                  Prove it
                </span>{" "}
                continuously.
              </h1>

              <p
                className="rise-in mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
                style={{ animationDelay: "160ms" }}
              >
                ReguLattice is the autonomous GRC data plane for AI. Discover every model and coding
                agent, verify evidence with dual-pass model consensus, stream live telemetry, and
                ship gated remediations — audit-ready, all the time.
              </p>

              <div
                className="rise-in mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
                style={{ animationDelay: "240ms" }}
              >
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => openDemoModal("Schedule Technical Demo")}
                >
                  Book a technical demo <ArrowRight className="size-4" />
                </Button>
                <Button
                  variant="architectural"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => openDemoModal("Access Developer Sandbox (14-Day Trial)")}
                >
                  <Code2 className="size-4" /> Start 14-day sandbox
                </Button>
              </div>
              <p
                className="rise-in mt-4 font-mono text-[11px] text-muted-foreground/80"
                style={{ animationDelay: "300ms" }}
              >
                No credit card · Cloud, on-prem &amp; air-gapped models · SOC 2 Type II event
                logging
              </p>
            </div>

            <div className="rise-in mt-16 sm:mt-20" style={{ animationDelay: "380ms" }}>
              <HeroDashboard />
            </div>
          </div>
        </section>

        {/* Ecosystem marquee */}
        <section className="relative border-y border-white/[0.06] bg-white/[0.01] py-10">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Governs AI across your entire stack
          </p>
          <div className="marquee-mask mt-7 overflow-hidden">
            <div className="marquee flex w-max gap-14 pr-14">
              {[...ecosystem, ...ecosystem].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-foreground/35 transition-colors hover:text-foreground/80"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="bg-background">
                <div className="h-full p-7">
                  <div className="font-display text-5xl font-semibold tracking-tight text-gradient">
                    {s.value}
                  </div>
                  <div className="mt-3 text-sm font-medium text-foreground">{s.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Platform: four agents */}
        <section id="platform" className="scroll-mt-24 px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="The platform"
              title="Four autonomous agents."
              accent="One governance plane."
              text="Specialized compliance engines that work in sync to inspect, verify, monitor, and remediate your entire AI footprint — without slowing your engineers down."
            />
            <Reveal className="mt-16">
              <AgentShowcase />
            </Reveal>
          </div>
        </section>

        {/* Use cases */}
        <section id="use-cases" className="scroll-mt-24 px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Use cases"
              title="Built for how AI actually"
              accent="ships today."
              text="From shadow AI to autonomous coding agents, ReguLattice turns every AI interaction into governed, verifiable evidence."
            />
            <div className="mt-16">
              <UseCases />
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="relative scroll-mt-24 px-5 py-20 sm:py-28 lg:px-8">
          <div
            className="dot-grid absolute inset-0 -z-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Architecture"
              title="The continuous"
              accent="control loop."
              text="Live model endpoints, agentic IDEs, and evidence pipelines flow through one data plane — and come out as verified, regulator-ready compliance."
            />
            <Reveal className="mt-16">
              <ControlLoop />
            </Reveal>
          </div>
        </section>

        {/* Frameworks */}
        <section id="frameworks" className="scroll-mt-24 px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Global compliance mapping"
              title="Every asset, mapped to"
              accent="the standards that matter."
              text="ReguLattice maps every asset, telemetry event, and developer tool directly to international AI regulations and standards."
            />
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {frameworks.map((fw, i) => {
                const Icon = fw.icon;
                return (
                  <Reveal key={fw.id} delay={i * 100} className="h-full">
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-card/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="flex items-center justify-between">
                        <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {fw.badge}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                        {fw.name}
                      </h3>
                      <p className="mt-1.5 font-mono text-xs text-primary/90">{fw.articles}</p>
                      <ul className="mt-6 flex-1 space-y-3">
                        {fw.controls.map((ctrl) => (
                          <li
                            key={ctrl.code}
                            className="flex gap-3 border-t border-white/[0.06] pt-3 text-sm"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            <div>
                              <div className="font-medium text-foreground">{ctrl.code}</div>
                              <div className="mt-0.5 text-[13px] leading-5 text-muted-foreground">
                                {ctrl.text}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-7 flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-2.5 font-mono text-[10px]">
                        <span className="text-muted-foreground">COMPLIANCE ENGINE</span>
                        <span className="flex items-center gap-1.5 font-semibold text-emerald">
                          <span className="signal-pulse size-1.5 rounded-full bg-emerald" />
                          100% MAPPED
                        </span>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section id="integrations" className="scroll-mt-24 px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeader
                center={false}
                eyebrow="Integrations"
                title="Connects to every model,"
                accent="everywhere it runs."
              />
              <Reveal className="max-w-sm">
                <p className="text-sm leading-6 text-muted-foreground">
                  Connect live cloud models, local LLMs, code repositories, and IAM policy engines
                  directly to your governance plane — public cloud, private VPC, or fully
                  air-gapped.
                </p>
              </Reveal>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {connectorCategories.map((group, i) => {
                const Icon = group.icon;
                return (
                  <Reveal key={group.category} delay={i * 80} className="h-full">
                    <article className="group h-full rounded-3xl border border-white/[0.07] bg-card/60 p-6 transition-all duration-500 hover:border-primary/30 hover:bg-card">
                      <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.05] text-primary transition-transform duration-500 group-hover:scale-110">
                          <Icon className="size-5" />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                        {group.category}
                      </h3>
                      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="demo" className="px-5 pb-24 pt-8 sm:pb-32 lg:px-8">
          <Reveal className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card px-6 py-20 text-center sm:px-12 sm:py-24">
              <div className="lattice-grid absolute inset-0 opacity-80" aria-hidden="true" />
              <div
                className="aurora absolute -bottom-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[oklch(0.8_0.13_180/0.28)] blur-[110px]"
                aria-hidden="true"
              />
              <div className="relative">
                <img
                  src={logoAsset}
                  alt=""
                  className="node-float mx-auto size-20 rounded-2xl object-cover shadow-[var(--shadow-glow)]"
                />
                <h2 className="mx-auto mt-8 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
                  Build compliant AI at{" "}
                  <span className="font-serif font-normal italic tracking-normal text-gradient">
                    engineering velocity.
                  </span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Experience continuous AI footprint discovery, live Flight Recorder telemetry, and
                  gated risk remediation in an interactive environment.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => openDemoModal("Schedule Technical Demo")}
                  >
                    Book a technical demo <ArrowRight className="size-4" />
                  </Button>
                  <Button
                    variant="architectural"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => openDemoModal("Access Developer Sandbox (14-Day Trial)")}
                  >
                    <Code2 className="size-4" /> Start 14-day sandbox
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.06] px-5 pb-10 pt-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Brand compact />
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                The autonomous GRC data plane for AI systems and agentic workflows.
              </p>
              <div className="mt-6 flex items-center gap-2">
                {[
                  { href: "mailto:info@regulattice.com", icon: Mail, label: "Email" },
                  {
                    href: "https://www.linkedin.com/company/regulattice/",
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://www.instagram.com/regulattice/",
                    icon: Instagram,
                    label: "Instagram",
                  },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
                Product
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
                Company
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="mailto:info@regulattice.com"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    info@regulattice.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/regulattice/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    LinkedIn <ArrowUpRight className="size-3" />
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openDemoModal("Schedule Technical Demo")}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Book a demo
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 font-mono text-[11px] text-muted-foreground/70 sm:flex-row">
            <span>© 2026 ReguLattice Inc. All rights reserved.</span>
            <span>ISO/IEC 42001 schema · EU AI Act · NIST AI RMF</span>
          </div>
        </div>
      </footer>

      {/* Demo / Sandbox Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass rounded-2xl border-white/10 bg-popover/95 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              {requestType}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Complete details below to submit your request. An instant notification will be sent
              directly to the <strong className="text-foreground">ReguLattice Team</strong>.
            </DialogDescription>
          </DialogHeader>

          {requestType.includes("Sandbox") && (
            <div className="mt-2 rounded-xl border border-primary/30 bg-primary/10 p-3.5 text-xs flex items-center gap-3 text-primary">
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Sparkles className="size-4 text-primary" />
              </div>
              <div>
                <div className="font-bold text-foreground">14-Day Free Developer Sandbox Trial</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Includes full access to ReguLattice GRC API, live telemetry Flight Recorder, and
                  pre-loaded test schemas. Zero credit card required.
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-mono uppercase text-muted-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="border-white/10 bg-background/60"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-mono uppercase text-muted-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="border-white/10 bg-background/60"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="company"
                  className="text-xs font-mono uppercase text-muted-foreground"
                >
                  Company
                </Label>
                <Input
                  id="company"
                  placeholder="Enterprise Inc."
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  className="border-white/10 bg-background/60"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs font-mono uppercase text-muted-foreground">
                  Job Title / Role
                </Label>
                <Input
                  id="role"
                  placeholder="CTO / CISO / Lead"
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  className="border-white/10 bg-background/60"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes" className="text-xs font-mono uppercase text-muted-foreground">
                Requirements / Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Tell us about your AI footprint or compliance target..."
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                className="resize-none border-white/10 bg-background/60"
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" /> Sending Notification...
                  </>
                ) : requestType.includes("Sandbox") ? (
                  <>
                    Start 14-Day Free Sandbox Trial <ArrowRight className="ml-2 size-4" />
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
