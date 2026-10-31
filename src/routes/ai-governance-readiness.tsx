import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Code2, Loader2, Mail, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";

import { Eyebrow } from "@/components/landing/reveal";
import { SandboxLink } from "@/components/site/sandbox-link";
import { SiteLayout, useDemoRequest } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { firstTouch, trackCta } from "@/lib/cta";
import { ANSWER_LABELS, QUESTIONS, scoreAnswers, type Answer, type Answers } from "@/lib/readiness";
import { pageHead } from "@/lib/seo";

const PAGE = {
  path: "/ai-governance-readiness",
  title: "AI Governance Readiness Check: Free 3-Minute Self-Assessment | ReguLattice",
  description:
    "Answer 8 questions to score your organization's AI governance readiness, from AI inventory and shadow AI to AI agents and audit evidence. Free, instant results.",
};

export const Route = createFileRoute("/ai-governance-readiness")({
  head: () => pageHead(PAGE),
  component: ReadinessPage,
});

function ReadinessPage() {
  return (
    <SiteLayout>
      <main className="relative px-5 pb-24 pt-32 sm:pt-40 lg:px-8">
        <div
          className="lattice-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-40 left-1/4 h-[420px] w-[620px] rounded-full bg-[oklch(0.8_0.13_180/0.16)] blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl">
          <header className="text-center">
            <Eyebrow>Free · 8 questions · about 3 minutes</Eyebrow>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
              How ready is your AI governance?
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Score your organization on the basics, from knowing which AI is in use to showing an
              auditor the evidence. You get your result instantly, with the first steps to take.
            </p>
          </header>
          <Assessment />
        </div>
      </main>
    </SiteLayout>
  );
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function campaign() {
  const { utm_source, utm_medium, utm_campaign } = firstTouch();
  return { utm_source, utm_medium, utm_campaign };
}

function Assessment() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const idRef = useRef<string | null>(null);
  const done = step >= QUESTIONS.length;

  const choose = (value: Answer) => {
    const q = QUESTIONS[step];
    if (!q) return;
    if (step === 0 && !idRef.current) {
      idRef.current = newId();
      trackCta("readiness", "start");
    }
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    setStep(step + 1);
    if (step + 1 === QUESTIONS.length) {
      // Save the completed (anonymous) result; the email form below can add contact details.
      fetch("/api/public/readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: idRef.current, answers: next, ...campaign() }),
      }).catch(() => {});
    }
  };

  const restart = () => {
    idRef.current = null;
    setAnswers({});
    setStep(0);
  };

  if (done) return <Results answers={answers} id={idRef.current ?? ""} onRestart={restart} />;

  const q = QUESTIONS[step]!;
  return (
    <section
      aria-live="polite"
      className="glass mt-12 rounded-3xl border border-white/10 bg-card/60 p-6 sm:p-10"
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>
          Question {step + 1} of {QUESTIONS.length}
        </span>
        <span className="text-primary">{q.area}</span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-brand-gradient transition-[width] duration-500"
          style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <h2 className="mt-8 text-balance font-display text-2xl font-semibold leading-snug sm:text-3xl">
        {q.question}
      </h2>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {([2, 1, 0] as Answer[]).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => choose(value)}
            className={`rounded-2xl border px-5 py-4 text-left font-medium transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 ${
              answers[q.id] === value
                ? "border-primary/60 bg-primary/10"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            {ANSWER_LABELS[value]}
            <span className="mt-1 block text-xs font-normal text-muted-foreground">
              {value === 2
                ? "This is in place"
                : value === 1
                  ? "In some teams, or informally"
                  : "Not yet, or not sure"}
            </span>
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back
        </button>
      )}
    </section>
  );
}

function Results({
  answers,
  id,
  onRestart,
}: {
  answers: Answers;
  id: string;
  onRestart: () => void;
}) {
  const openRequest = useDemoRequest();
  const { score, tier, gaps } = scoreAnswers(answers);

  return (
    <div className="mt-12 space-y-6">
      <section className="glass rounded-3xl border border-white/10 bg-card/60 p-6 sm:p-10">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <div
            className="relative flex size-32 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(var(--primary) ${score * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
            }}
          >
            <div className="flex size-[6.75rem] flex-col items-center justify-center rounded-full bg-background">
              <span className="font-display text-4xl font-semibold">{score}</span>
              <span className="text-[11px] text-muted-foreground">out of 100</span>
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
              Your readiness
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold">{tier.name}</h2>
            <p className="mt-2 text-muted-foreground">{tier.summary}</p>
          </div>
        </div>

        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {QUESTIONS.map((q) => {
            const a = answers[q.id] ?? 0;
            return (
              <li
                key={q.id}
                className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 text-sm"
              >
                <span>{q.area}</span>
                <span
                  className={`font-medium ${a === 2 ? "text-emerald" : a === 1 ? "text-amber" : "text-rose"}`}
                >
                  {ANSWER_LABELS[a]}
                </span>
              </li>
            );
          })}
        </ul>

        {gaps.length > 0 && (
          <div className="mt-8">
            <h3 className="font-display text-xl font-semibold">Where to start</h3>
            <ol className="mt-4 space-y-4">
              {gaps.slice(0, 3).map((q, i) => (
                <li key={q.id} className="flex gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-xs text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-medium">{q.area}</div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {q.recommendation}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        <button
          type="button"
          onClick={onRestart}
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-3.5" /> Retake the check
        </button>
      </section>

      <ReportForm answers={answers} id={id} />

      <section className="rounded-3xl border border-white/10 bg-card px-6 py-10 text-center sm:px-10">
        <h3 className="text-balance font-display text-2xl font-semibold">
          See how ReguLattice closes these gaps
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          ReguLattice finds the AI already in use, routes each tool to a person to approve or block,
          and keeps the evidence as it goes.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            variant="ink"
            size="lg"
            onClick={() => openRequest("Schedule Technical Demo", "readiness-result")}
          >
            Book a 20-minute demo <ArrowRight className="size-4" />
          </Button>
          <Button asChild variant="architectural" size="lg">
            <SandboxLink placement="readiness-result">
              <Code2 className="size-4" /> Start sandbox
            </SandboxLink>
          </Button>
        </div>
      </section>
    </div>
  );
}

function ReportForm({ answers, id }: { answers: Answers; id: string }) {
  const [form, setForm] = useState({ email: "", name: "", company: "", role: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "saved" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/public/readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, answers, ...form, ...campaign() }),
      });
      const data = (await res.json().catch(() => ({}))) as { reportSent?: boolean };
      setStatus(!res.ok ? "error" : data.reportSent ? "sent" : "saved");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" || status === "saved") {
    return (
      <section className="flex items-start gap-4 rounded-3xl border border-primary/30 bg-primary/[0.07] p-6 sm:p-8">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Check className="size-5" />
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold">
            {status === "sent" ? "Report on its way" : "Thanks, we've got it"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {status === "sent"
              ? `Check ${form.email} in the next few minutes (and your spam folder, just in case).`
              : `We'll email your report to ${form.email} shortly.`}
          </p>
        </div>
      </section>
    );
  }

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
    className: "border-white/10 bg-background/60",
  });

  return (
    <section className="rounded-3xl border border-white/10 bg-card/60 p-6 sm:p-10">
      <div className="flex items-center gap-3">
        <Mail className="size-5 text-primary" />
        <h3 className="font-display text-xl font-semibold">Email me this report</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Get your score, answers and first steps in your inbox to share with your team.
      </p>
      <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-2">
        <Input
          type="email"
          required
          placeholder="Work email *"
          aria-label="Work email"
          {...field("email")}
        />
        <Input placeholder="Name" aria-label="Name" {...field("name")} />
        <Input placeholder="Company" aria-label="Company" {...field("company")} />
        <Input placeholder="Role" aria-label="Role" {...field("role")} />
        <div className="sm:col-span-2">
          <Button
            type="submit"
            variant="ink"
            size="lg"
            disabled={status === "sending"}
            className="w-full sm:w-auto"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                Send my report <ArrowRight className="size-4" />
              </>
            )}
          </Button>
          {status === "error" && (
            <p className="mt-3 text-sm text-rose">
              Something went wrong. Please try again, or email us directly.
            </p>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            We&apos;ll email you this report and may follow up once about AI governance. No mailing
            list, and you can ask us to delete your details at any time.
          </p>
        </div>
      </form>
    </section>
  );
}
