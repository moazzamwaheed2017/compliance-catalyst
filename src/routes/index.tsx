import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Code2,
  Cpu as CpuIcon,
  Layers,
  Lock,
  Network,
  Play,
  Server,
  ShieldCheck,
} from "lucide-react";

import logoAsset from "@/assets/regulattice-logo.jpg";
import { AgentShowcase } from "@/components/landing/agent-showcase";
import { ControlLoop } from "@/components/landing/control-loop";
import { HeroDashboard } from "@/components/landing/hero-dashboard";
import { Eyebrow, Reveal } from "@/components/landing/reveal";
import { UseCases } from "@/components/landing/use-cases";
import { DemoVideo } from "@/components/site/demo-video";
import { SandboxLink } from "@/components/site/sandbox-link";
import { SiteLayout, useDemoRequest } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import {
  ENTITY_DEFINITION,
  ENTITY_EXPANSION,
  HOME_DESCRIPTION,
  HOME_FAQS,
  HOME_TITLE,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  homeStructuredData,
  jsonLd,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESCRIPTION },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#07121a" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESCRIPTION },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "ReguLattice AI governance platform: discover, assess, govern, monitor, improve",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

const lifecycle = [
  {
    step: "Discover",
    title: "Find every AI system, including shadow AI",
    text: "Build a live AI inventory of models, AI tools and AI agents across cloud providers, local runtimes and developer tools, with an owner for every system.",
  },
  {
    step: "Assess",
    title: "Understand AI risk",
    text: "Classify each AI system's purpose, data and risk level, including EU AI Act risk categories, and see which controls apply.",
  },
  {
    step: "Govern",
    title: "Apply policies and human oversight",
    text: "Manage AI policies and controls mapped to ISO/IEC 42001, NIST AI RMF and the EU AI Act, with human sign-off for high-risk AI actions.",
  },
  {
    step: "Monitor",
    title: "Watch AI at runtime",
    text: "Track what AI systems and agents actually do after deployment, and keep compliance evidence current as it ages.",
  },
  {
    step: "Improve",
    title: "Close the loop",
    text: "Turn incidents, human overrides and audit findings into remediation tasks, stronger controls and audit-ready evidence.",
  },
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
    articles: "Art. 9 · Art. 14 · Art. 72",
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
        code: "Article 72 — Post-market monitoring",
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
  return (
    <SiteLayout>
      <HomeContent />
    </SiteLayout>
  );
}

function HomeContent() {
  const openDemoModal = useDemoRequest();

  return (
    <div id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeStructuredData()) }}
      />
      <main className="relative">
        {/* Hero */}
        <section className="relative px-5 pb-20 pt-36 sm:pt-44 lg:px-8">
          <AuroraBackground />
          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <a
                href="#how-it-works"
                className="rise-in group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-xs text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <span className="shrink-0 whitespace-nowrap rounded-full bg-brand-gradient px-2 py-0.5 font-semibold text-primary-foreground">
                  AI governance
                </span>
                You can&apos;t govern AI you don&apos;t know exists
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </a>

              <h1
                className="rise-in mt-8 text-balance font-display text-[2.75rem] font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-[5.25rem]"
                style={{ animationDelay: "80ms" }}
              >
                The AI governance platform for{" "}
                <span className="font-serif text-[1.08em] font-normal italic tracking-normal text-gradient">
                  every AI system
                </span>{" "}
                and agent.
              </h1>

              <p
                className="rise-in mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
                style={{ animationDelay: "160ms" }}
              >
                {ENTITY_DEFINITION} {ENTITY_EXPANSION}
              </p>

              <div
                className="rise-in mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
                style={{ animationDelay: "240ms" }}
              >
                <Button
                  variant="ink"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => openDemoModal("Schedule Technical Demo", "home-hero")}
                >
                  Book a technical demo <ArrowRight className="size-4" />
                </Button>
                <Button asChild variant="architectural" size="lg" className="w-full sm:w-auto">
                  <SandboxLink placement="home-hero">
                    <Code2 className="size-4" /> Start sandbox
                  </SandboxLink>
                </Button>
              </div>
              <a
                href="#watch"
                className="rise-in mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                style={{ animationDelay: "280ms" }}
              >
                <Play className="size-3.5 fill-current" /> Watch the 78-second demo
              </a>
              <p
                className="rise-in mt-4 font-mono text-[11px] text-muted-foreground/80"
                style={{ animationDelay: "300ms" }}
              >
                ISO/IEC 42001 · NIST AI RMF · EU AI Act · Runs on your own infrastructure
              </p>
            </div>

            <div className="rise-in mt-16 sm:mt-20" style={{ animationDelay: "380ms" }}>
              <HeroDashboard />
              <p className="mt-4 text-center font-mono text-[10px] text-muted-foreground/70">
                Illustrative product view with sample data.
              </p>
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

        {/* Product walkthrough video */}
        <section id="watch" className="scroll-mt-24 px-5 pt-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow>See it in 78 seconds</Eyebrow>
              <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
                How shadow AI gets in, and how ReguLattice governs it
              </h2>
              <p className="mt-4 text-muted-foreground">
                Browser tabs, developer tools, local models and company sign-ins land in one review
                queue, where a person approves or blocks each tool.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <DemoVideo placement="home" className="mt-10" />
            </Reveal>
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

        {/* How it works: AI governance lifecycle */}
        <section id="how-it-works" className="scroll-mt-24 px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="How it works"
              title="How AI governance works"
              accent="in ReguLattice."
              text="You can't govern AI you don't know exists. ReguLattice follows one continuous lifecycle: discover, assess, govern, monitor and improve."
            />
            <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {lifecycle.map((s, i) => (
                <li key={s.step} className="h-full">
                  <Reveal delay={i * 80} className="h-full">
                    <article className="relative h-full rounded-3xl border border-white/[0.07] bg-card/60 p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex size-8 items-center justify-center rounded-full bg-brand-gradient font-mono text-xs font-semibold text-primary-foreground">
                          {i + 1}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                          {s.step}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.text}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              New to the category?{" "}
              <Link to="/ai-governance-platform" className="text-primary hover:underline">
                Read what an AI governance platform is and how to choose one
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Platform: four agents */}
        <section id="platform" className="scroll-mt-24 px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="The platform"
              title="Four AI governance agents."
              accent="One platform."
              text="Specialized agents for AI discovery, evidence verification, AI risk monitoring and remediation work together across your entire AI footprint, without slowing your engineers down."
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
              title="AI governance use cases, from shadow AI"
              accent="to AI agents."
              text="From unapproved AI tools to autonomous coding agents, ReguLattice turns every AI interaction into governed, verifiable evidence."
            />
            <div className="mt-16">
              <UseCases />
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-6">
              <Link to="/shadow-ai" className="text-primary hover:underline">
                Guide: how to discover and govern shadow AI →
              </Link>
              <Link to="/ai-agent-governance" className="text-primary hover:underline">
                Guide: how to govern AI agents →
              </Link>
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
              title="From AI systems to"
              accent="audit-ready evidence."
              text="Live model endpoints, agentic IDEs and evidence pipelines flow through one governance engine and come out as verified evidence mapped to your AI compliance frameworks."
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
              eyebrow="AI compliance frameworks"
              title="Mapped to ISO/IEC 42001, NIST AI RMF"
              accent="and the EU AI Act."
              text="ReguLattice maps AI systems, telemetry events and developer tools to the controls and requirements of the major AI governance frameworks, so one piece of evidence can support several of them."
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
                        <span className="text-muted-foreground">EVIDENCE MAPPING</span>
                        <span className="flex items-center gap-1.5 font-semibold text-emerald">
                          <span className="signal-pulse size-1.5 rounded-full bg-emerald" />
                          CONTROLS MAPPED
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
                title="Govern AI across every model,"
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

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="FAQ"
              title="AI governance,"
              accent="answered."
              text="Straight answers about AI governance platforms, shadow AI, AI agents and the frameworks ReguLattice supports."
            />
            <div className="mt-12 divide-y divide-white/[0.07] rounded-3xl border border-white/[0.07] bg-card/50">
              {HOME_FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                    <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">
                      {f.q}
                    </h3>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-primary transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{f.a}</p>
                </details>
              ))}
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
                  Don&apos;t just document your AI governance.{" "}
                  <span className="font-serif font-normal italic tracking-normal text-gradient">
                    Prove it.
                  </span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  See how ReguLattice discovers your AI systems, assesses AI risk, keeps compliance
                  evidence current and puts people in charge of high-risk AI decisions.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    variant="ink"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => openDemoModal("Schedule Technical Demo", "home-final")}
                  >
                    Book a technical demo <ArrowRight className="size-4" />
                  </Button>
                  <Button asChild variant="architectural" size="lg" className="w-full sm:w-auto">
                    <SandboxLink placement="home-final">
                      <Code2 className="size-4" /> Start sandbox
                    </SandboxLink>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
