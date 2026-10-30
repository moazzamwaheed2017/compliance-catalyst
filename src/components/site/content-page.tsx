import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Code2 } from "lucide-react";
import type { ReactNode } from "react";

import { Eyebrow } from "@/components/landing/reveal";
import { SandboxLink } from "@/components/site/sandbox-link";
import { SiteLayout, useDemoRequest } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { contentPageStructuredData, jsonLd, type ContentPageMeta } from "@/lib/seo";

export type ContentSection = { id: string; title: string; content: ReactNode };
export type Reference = { label: string; publisher: string; url: string };
export type GuidePath =
  "/ai-governance-platform" | "/shadow-ai" | "/ai-agent-governance" | "/about";
export type RelatedLink = { to: GuidePath; label: string; text: string };

type ContentPageProps = {
  meta: ContentPageMeta;
  eyebrow: string;
  /** Direct, self-contained answer shown at the top (what AI answer engines quote). */
  shortAnswer: ReactNode;
  sections: ContentSection[];
  references: Reference[];
  related: RelatedLink[];
  cta: { title: string; text: string; button: string; requestType: string };
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Demo + sandbox buttons; `placement` records where on the page they were clicked. */
function CtaButtons({
  cta,
  placement,
  className = "",
}: {
  cta: ContentPageProps["cta"];
  placement: string;
  className?: string;
}) {
  const openRequest = useDemoRequest();
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Button
        variant="ink"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => openRequest(cta.requestType, placement)}
      >
        {cta.button} <ArrowRight className="size-4" />
      </Button>
      <Button asChild variant="architectural" size="lg" className="w-full sm:w-auto">
        <SandboxLink placement={placement}>
          <Code2 className="size-4" /> Start sandbox
        </SandboxLink>
      </Button>
    </div>
  );
}

function Cta({ cta, page }: { cta: ContentPageProps["cta"]; page: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card px-6 py-12 text-center sm:px-10">
      <div className="lattice-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute -bottom-32 left-1/2 h-72 w-[560px] max-w-full -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]"
        aria-hidden="true"
      />
      <div className="relative">
        <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{cta.text}</p>
        <CtaButtons cta={cta} placement={`${page}-final`} className="mt-8 justify-center" />
      </div>
    </div>
  );
}

/** Long-form guide or entity page with a consistent, answer-first structure. */
export function ContentPage(props: ContentPageProps) {
  const { meta, eyebrow, shortAnswer, sections, references, related, cta } = props;
  const pageKey = meta.path.replace(/^\//, "") || "home";
  const toc = [
    ...sections.map((s) => ({ id: s.id, title: s.title })),
    ...(meta.faqs.length ? [{ id: "faq", title: "Frequently asked questions" }] : []),
    ...(references.length ? [{ id: "references", title: "References" }] : []),
  ];

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contentPageStructuredData(meta)) }}
      />
      <main className="relative px-5 pb-24 pt-32 sm:pt-40 lg:px-8">
        <div
          className="lattice-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-40 left-1/4 h-[420px] w-[620px] rounded-full bg-[oklch(0.8_0.13_180/0.16)] blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-foreground/80">
                {meta.breadcrumb}
              </li>
            </ol>
          </nav>

          <header className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              {meta.h1}
            </h1>
            <p className="mt-5 font-mono text-xs text-muted-foreground">
              By the ReguLattice team · Last reviewed {formatDate(meta.dateModified)}
            </p>
          </header>

          <section
            aria-label="Short answer"
            className="mt-10 max-w-3xl rounded-2xl border border-primary/25 bg-primary/[0.06] p-6"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
              Short answer
            </div>
            <div className="mt-3 text-lg leading-8 text-foreground/90">{shortAnswer}</div>
          </section>

          <CtaButtons cta={cta} placement={`${pageKey}-top`} className="mt-6 max-w-3xl" />

          <div className="mt-16 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
            <aside className="hidden lg:block">
              <nav
                aria-label="On this page"
                className="sticky top-28 border-l border-white/[0.08] pl-4"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
                  On this page
                </div>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {t.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <article className="min-w-0 max-w-3xl">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 pb-12">
                  <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                    {s.title}
                  </h2>
                  <div className="prose-content mt-5">{s.content}</div>
                </section>
              ))}

              {meta.faqs.length > 0 && (
                <section id="faq" className="scroll-mt-28 pb-12">
                  <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                    Frequently asked questions
                  </h2>
                  <div className="mt-6 divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-card/50">
                    {meta.faqs.map((f) => (
                      <div key={f.q} className="px-6 py-5">
                        <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">
                          {f.q}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {references.length > 0 && (
                <section id="references" className="scroll-mt-28 pb-12">
                  <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                    References
                  </h2>
                  <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-muted-foreground marker:text-primary">
                    {references.map((r) => (
                      <li key={r.url}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/85 underline decoration-white/20 underline-offset-4 hover:text-primary"
                        >
                          {r.label}
                        </a>{" "}
                        — {r.publisher}
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {related.length > 0 && (
                <section aria-label="Related guides" className="pb-12">
                  <h2 className="font-display text-2xl font-semibold text-foreground">
                    Related guides
                  </h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {related.map((r) => (
                      <Link
                        key={r.to}
                        to={r.to}
                        className="group rounded-2xl border border-white/[0.07] bg-card/60 p-5 transition-colors hover:border-primary/30"
                      >
                        <div className="flex items-center justify-between gap-3 font-display font-semibold text-foreground">
                          {r.label}
                          <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{r.text}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <Cta cta={cta} page={pageKey} />
            </article>
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
