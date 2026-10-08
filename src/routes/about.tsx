import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Minus } from "lucide-react";
import type { ReactNode } from "react";

import { DiscoveryViz } from "@/components/about/discovery-viz";
import {
  AdoptionComparison,
  LayerStack,
  LocalFirstViz,
  VisionFlow,
} from "@/components/about/diagrams";
import { GovernanceLayerViz } from "@/components/about/governance-layer-viz";
import {
  AccountabilityIcon,
  ContinuousIcon,
  EvidenceIcon,
  LocalFirstIcon,
  VendorNeutralIcon,
  VisibilityIcon,
} from "@/components/about/line-icons";
import { Eyebrow, Reveal } from "@/components/landing/reveal";
import { SiteLayout, useDemoRequest } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { contentPageStructuredData, jsonLd, pageHead, type ContentPageMeta } from "@/lib/seo";

const WHAT_IS =
  "ReguLattice is an AI-native governance platform for organizations deploying AI systems and AI agents. It provides visibility into AI usage, assesses AI risk, applies governance controls, monitors AI activity, and maintains evidence mapped to recognized AI governance frameworks.";

const meta: ContentPageMeta = {
  path: "/about",
  title: "About ReguLattice | AI Governance Platform",
  description:
    "ReguLattice is an AI-native governance platform that helps organizations discover, assess, govern, monitor, and improve AI systems and AI agents.",
  h1: "Building the Governance Layer for the AI Era",
  breadcrumb: "About ReguLattice",
  kind: "about",
  datePublished: "2026-10-08",
  dateModified: "2026-10-08",
  faqs: [
    {
      q: "What is ReguLattice?",
      a: `${WHAT_IS} It follows a continuous lifecycle: discover, assess, govern, monitor and improve.`,
    },
    {
      q: "What category of software is ReguLattice?",
      a: "ReguLattice is an AI governance platform. It is built specifically for governing AI systems and AI agents, rather than being a general-purpose GRC, cybersecurity or compliance tool.",
    },
    {
      q: "Who uses ReguLattice?",
      a: "Organizations deploying AI systems and AI agents, and the teams accountable for them: compliance, risk, CISOs and security, internal audit, and AI and engineering leaders.",
    },
    {
      q: "What is shadow AI?",
      a: "Shadow AI is AI used inside an organization without being registered, assessed or approved, such as personal AI accounts used with company data, unapproved model API keys or local models. ReguLattice flags it so it can be given an owner, assessed, and approved, replaced or restricted.",
    },
    {
      q: "How does ReguLattice assess AI risk?",
      a: "Each AI system is assessed on its purpose, the data it uses and the decisions it influences, and classified by risk level, including EU AI Act risk categories. Risks are linked to controls and to an accountable owner.",
    },
  ],
};

export const Route = createFileRoute("/about")({
  head: () => pageHead(meta),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout theme="light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contentPageStructuredData(meta)) }}
      />
      <AboutContent />
    </SiteLayout>
  );
}

/* ------------------------------ Helpers ------------------------------ */

function Section({
  id,
  children,
  tone = "plain",
}: {
  id?: string;
  children: ReactNode;
  tone?: "plain" | "tint";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-5 py-20 sm:py-28 lg:px-8 ${tone === "tint" ? "bg-muted/60" : ""}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Intro({
  eyebrow,
  title,
  children,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.1] text-foreground sm:text-5xl">
        {title}
      </h2>
      {children && (
        <div className="mt-5 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          {children}
        </div>
      )}
    </Reveal>
  );
}

function SecondaryButton({ to, children }: { to: "/ai-governance-platform"; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
    >
      {children}
    </Link>
  );
}

/* ------------------------------- Page ------------------------------- */

const progression = [
  "AI adoption",
  "More models",
  "More AI tools",
  "More AI agents",
  "More data and decisions",
  "Greater governance risk",
];

const mission = [
  {
    icon: VisibilityIcon,
    title: "Visibility",
    text: "Know what AI exists, where it operates, what it connects to, and who owns it.",
  },
  {
    icon: AccountabilityIcon,
    title: "Accountability",
    text: "Keep people responsible for high-risk AI decisions and actions.",
  },
  {
    icon: EvidenceIcon,
    title: "Evidence",
    text: "Turn governance activity into continuously maintained, audit-ready evidence.",
  },
];

const comparison: { dimension: string; grc: string; regulattice: string }[] = [
  {
    dimension: "Scope",
    grc: "IT and business processes",
    regulattice: "AI systems, AI tools and AI agents",
  },
  {
    dimension: "AI discovery",
    grc: "Manual registers and questionnaires",
    regulattice: "Discovery across model APIs, local runtimes, code and developer tools",
  },
  {
    dimension: "Shadow AI",
    grc: "Usually not visible",
    regulattice: "Detected, given an owner and brought under policy",
  },
  {
    dimension: "Risk assessment",
    grc: "Periodic and document-based",
    regulattice: "Per AI system, including EU AI Act risk categories",
  },
  {
    dimension: "Runtime monitoring",
    grc: "Not designed for AI behavior",
    regulattice: "Continuous monitoring of AI activity",
  },
  {
    dimension: "AI agents",
    grc: "Not designed for autonomous actions",
    regulattice: "Policy checks on agent actions",
  },
  {
    dimension: "Evidence",
    grc: "Collected before audits",
    regulattice: "Verified, continuously maintained, and aged over time",
  },
  {
    dimension: "Human oversight",
    grc: "Approval of documents and exceptions",
    regulattice: "Human sign-off on high-risk AI actions",
  },
];

const principles = [
  {
    icon: EvidenceIcon,
    title: "Evidence over assumptions",
    text: "Governance should be supported by verifiable evidence.",
  },
  {
    icon: AccountabilityIcon,
    title: "Humans remain accountable",
    text: "High-risk AI decisions should retain appropriate human oversight.",
  },
  {
    icon: ContinuousIcon,
    title: "Continuous over periodic",
    text: "AI governance should evolve as AI systems and environments change.",
  },
  {
    icon: VendorNeutralIcon,
    title: "Vendor-neutral",
    text: "Governance should work across different AI models, vendors and technologies.",
  },
  {
    icon: LocalFirstIcon,
    title: "Local-first",
    text: "Organizations should have the option to govern AI in customer-controlled environments.",
  },
];

function AboutContent() {
  const openRequest = useDemoRequest();

  return (
    <main className="relative">
      {/* 1. Hero */}
      <section className="relative px-5 pb-20 pt-32 sm:pt-40 lg:px-8">
        <div
          className="lattice-grid pointer-events-none absolute inset-x-0 top-0 h-[640px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-32 right-[8%] h-[420px] w-[560px] rounded-full bg-[oklch(0.75_0.15_300/0.18)] blur-[110px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-24 left-[6%] h-[360px] w-[460px] rounded-full bg-[oklch(0.8_0.1_215/0.18)] blur-[110px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>{" "}
            / <span className="text-foreground/80">About ReguLattice</span>
          </nav>
          <div className="mt-8 max-w-4xl">
            <Eyebrow>About ReguLattice</Eyebrow>
            <h1 className="rise-in mt-6 text-balance font-display text-[2.6rem] font-semibold leading-[1.04] text-foreground sm:text-6xl lg:text-7xl">
              Building the Governance Layer for the <span className="text-gradient">AI Era</span>
            </h1>
            <p
              className="rise-in mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground"
              style={{ animationDelay: "120ms" }}
            >
              ReguLattice is an AI-native governance platform helping organizations discover,
              assess, govern, monitor, and improve the AI systems and agents they deploy.
            </p>
            <div
              className="rise-in mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "220ms" }}
            >
              <Button
                variant="hero"
                size="lg"
                onClick={() => openRequest("Schedule Technical Demo")}
              >
                Request a technical demo <ArrowRight className="size-4" />
              </Button>
              <SecondaryButton to="/ai-governance-platform">Explore the platform</SecondaryButton>
            </div>
          </div>
          <div className="rise-in mt-16 sm:mt-20" style={{ animationDelay: "320ms" }}>
            <GovernanceLayerViz />
          </div>
        </div>
      </section>

      {/* 2. Why ReguLattice exists */}
      <Section id="why" tone="tint">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Intro
            center={false}
            eyebrow="Why ReguLattice exists"
            title="AI adoption is accelerating. Governance is struggling to keep up."
          >
            <p>
              Organizations are deploying models, copilots, AI applications and autonomous agents
              faster than traditional governance processes can track them. Each new tool adds data
              flows and decisions that someone must be able to see, assess and answer for.
            </p>
            <p className="mt-4 font-medium text-foreground">
              ReguLattice provides the governance layer between AI adoption and organizational
              accountability.
            </p>
          </Intro>
          <Reveal>
            <ol className="mx-auto max-w-sm space-y-1">
              {progression.map((p, i) => (
                <li key={p} className="flex flex-col items-center">
                  <span
                    className="w-full rounded-xl border bg-card px-4 py-2.5 text-center text-sm font-medium shadow-sm"
                    style={{
                      borderColor:
                        i === progression.length - 1
                          ? "var(--rose)"
                          : `color-mix(in oklab, var(--amber) ${i * 14}%, var(--border))`,
                      color: i === progression.length - 1 ? "var(--rose)" : undefined,
                    }}
                  >
                    {p}
                  </span>
                  {i < progression.length - 1 && (
                    <ArrowDown className="my-1 size-4 text-muted-foreground" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <div className="mt-16">
          <AdoptionComparison />
        </div>
      </Section>

      {/* 3. Core principle */}
      <Section id="principle">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance font-display text-4xl font-semibold leading-[1.08] sm:text-6xl">
            You can&apos;t govern AI{" "}
            <span className="text-gradient">you don&apos;t know exists.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            ReguLattice starts with visibility. It discovers AI systems, tools and agents across the
            environment before organizations attempt to assess and govern them.
          </p>
        </Reveal>
        <Reveal className="mt-14">
          <DiscoveryViz />
        </Reveal>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Learn more about{" "}
          <Link to="/shadow-ai" className="text-primary hover:underline">
            shadow AI discovery and governance
          </Link>
          .
        </p>
      </Section>

      {/* 4. Mission */}
      <Section id="mission" tone="tint">
        <Intro eyebrow="Our mission" title="Make AI accountable, observable, and governable." />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {mission.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100} className="h-full">
              <article className="card-soft h-full p-7">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-accent text-primary">
                  <Icon />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. What is ReguLattice? */}
      <Section id="what-is-regulattice">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>AI governance platform</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-5xl">
            What is ReguLattice?
          </h2>
          <p className="mt-5 text-lg leading-8 text-foreground/85">{WHAT_IS}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            See{" "}
            <a href="/#how-it-works" className="text-primary hover:underline">
              how it works
            </a>
            , the{" "}
            <a href="/#frameworks" className="text-primary hover:underline">
              frameworks it maps to
            </a>{" "}
            and{" "}
            <Link to="/ai-governance-platform" className="text-primary hover:underline">
              what an AI governance platform is
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      {/* 6. A new layer */}
      <Section id="new-layer" tone="tint">
        <Intro eyebrow="A new layer" title="Why AI governance needs a new layer">
          <p>
            Traditional governance was built for processes and documents. AI systems change, act and
            multiply continuously. ReguLattice adds the layer designed specifically for AI, and
            works alongside the governance you already have.
          </p>
        </Intro>
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <LayerStack />
          </Reveal>
          <Reveal delay={120}>
            <div className="card-soft overflow-hidden">
              <div className="grid grid-cols-2 gap-x-3 border-b border-border bg-muted/60 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid-cols-[0.8fr_1fr_1.2fr]">
                <span className="hidden sm:block" />
                <span>Traditional GRC</span>
                <span className="text-primary">ReguLattice</span>
              </div>
              <ul>
                {comparison.map((c) => (
                  <li
                    key={c.dimension}
                    className="grid grid-cols-2 gap-x-3 gap-y-1.5 border-b border-border px-5 py-3.5 text-sm last:border-0 sm:grid-cols-[0.8fr_1fr_1.2fr]"
                  >
                    <span className="col-span-2 font-medium text-foreground sm:col-span-1">
                      {c.dimension}
                    </span>
                    <span className="flex gap-2 text-muted-foreground">
                      <Minus className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                      {c.grc}
                    </span>
                    <span className="flex gap-2 text-foreground/90">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-emerald" aria-hidden="true" />
                      {c.regulattice}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 7. Principles */}
      <Section id="principles">
        <Intro eyebrow="Our principles" title="What we believe about governing AI" />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {principles.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80} className="h-full">
              <article className="card-soft h-full p-6">
                <div className="text-primary">
                  <Icon />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 8. Local-first */}
      <Section id="local-first" tone="tint">
        <Intro eyebrow="Local-first architecture" title="Govern AI where your data lives">
          <p>
            ReguLattice is designed with a local-first approach, allowing organizations to deploy
            governance capabilities on customer-controlled infrastructure while connecting to the AI
            technologies they use. Local deployment is an option, not a requirement: the same
            governance layer works across local models and cloud AI providers.
          </p>
        </Intro>
        <Reveal className="mt-14">
          <LocalFirstViz />
        </Reveal>
      </Section>

      {/* 10. Vision */}
      <Section id="vision">
        <Intro
          eyebrow="Our vision"
          title="A future where every AI system is visible and accountable"
        >
          <p>
            AI is becoming embedded in applications, workflows and autonomous agents. Static
            documentation can&apos;t keep pace with systems that change every week. Organizations
            need continuous visibility and governance, so that trust in AI is earned through
            evidence.
          </p>
        </Intro>
        <Reveal className="mt-14">
          <VisionFlow />
        </Reveal>
      </Section>

      {/* 11. FAQ */}
      <Section id="faq" tone="tint">
        <div className="mx-auto max-w-3xl">
          <Intro eyebrow="FAQ" title="About ReguLattice, answered" />
          <div className="card-soft mt-12 divide-y divide-border">
            {meta.faqs.map((f) => (
              <details
                key={f.q}
                className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <h3 className="font-display text-base font-semibold sm:text-lg">{f.q}</h3>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Questions about frameworks, AI agents or deployment? See the{" "}
            <a href="/#faq" className="text-primary hover:underline">
              platform FAQ
            </a>
            .
          </p>
        </div>
      </Section>

      {/* 12. CTA */}
      <section className="px-5 pb-24 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-[oklch(0.2_0.045_268)] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <div
              className="absolute -bottom-40 left-1/2 h-[380px] w-[680px] max-w-full -translate-x-1/2 rounded-full opacity-60 blur-[100px]"
              style={{ backgroundImage: "var(--brand-gradient)" }}
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-balance font-display text-3xl font-semibold leading-tight sm:text-5xl">
                See what AI governance looks like in practice
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-white/75">
                Explore how ReguLattice helps organizations discover, assess, govern, monitor, and
                improve their AI environment.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => openRequest("Schedule Technical Demo")}
                >
                  Request a technical demo <ArrowRight className="size-4" />
                </Button>
                <Link
                  to="/ai-governance-platform"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Explore the platform
                </Link>
              </div>
            </div>
          </div>
          <p className="mt-12 text-center font-display text-lg font-medium text-foreground/80">
            ReguLattice —{" "}
            <span className="text-gradient">AI governance you can observe and prove.</span>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
