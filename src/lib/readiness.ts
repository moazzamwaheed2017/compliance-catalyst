/** AI governance readiness check: questions, scoring and recommendations (shared by page + API). */

export type Answer = 0 | 1 | 2;

export const ANSWER_LABELS: Record<Answer, string> = { 0: "No", 1: "Partly", 2: "Yes" };

export const QUESTIONS = [
  {
    id: "inventory",
    area: "AI inventory",
    question:
      "Do you keep a register of every AI system, model and AI tool your organization uses?",
    recommendation:
      "Start an AI inventory: list each AI system and tool with its owner, purpose, data it touches and vendor. Everything else in AI governance builds on it.",
  },
  {
    id: "shadow",
    area: "Shadow AI discovery",
    question:
      "Could you find AI tools people use without approval, such as personal AI accounts, browser AI, local models or coding assistants?",
    recommendation:
      "Look for unapproved AI where it enters: browser AI sites, developer tools, local model runtimes and AI apps connected through your identity provider. Compare what you find with your inventory.",
  },
  {
    id: "ownership",
    area: "Ownership",
    question: "Does every AI system have a named person accountable for it?",
    recommendation:
      "Give each AI system a named owner who answers for its risk, its approval and what happens when it goes wrong.",
  },
  {
    id: "risk",
    area: "Risk assessment",
    question:
      "Do you assess each AI system's risk (data, impact on people, regulation) before it is approved?",
    recommendation:
      "Add a short risk assessment before approval: what data it uses, who it affects, which rules apply and what controls it needs.",
  },
  {
    id: "policy",
    area: "AI policy",
    question: "Do you have a written AI acceptable-use policy that staff know about?",
    recommendation:
      "Publish a short AI acceptable-use policy with approved alternatives, so people know what they can use instead of guessing.",
  },
  {
    id: "agents",
    area: "AI agents",
    question:
      "Are AI agents that can take actions (send email, change code, call APIs) limited by permissions or human approval?",
    recommendation:
      "Limit what AI agents can do: least-privilege access, and human approval before high-impact actions.",
  },
  {
    id: "monitoring",
    area: "Monitoring",
    question: "Do you monitor AI systems after go-live (usage, incidents, changes in behaviour)?",
    recommendation:
      "Monitor AI after launch: who uses it, incidents, and changes in models or behaviour, with a clear route to pause or restrict a system.",
  },
  {
    id: "evidence",
    area: "Evidence & regulation",
    question:
      "Could you show an auditor or regulator evidence of your AI governance today, for example for the EU AI Act or ISO/IEC 42001?",
    recommendation:
      "Keep evidence as you go (decisions, assessments, approvals, monitoring) mapped to the frameworks you care about, rather than assembling it before an audit.",
  },
] as const;

export type QuestionId = (typeof QUESTIONS)[number]["id"];
export type Answers = Partial<Record<QuestionId, Answer>>;

export const TIERS = [
  {
    min: 75,
    name: "Established",
    summary:
      "You have the foundations in place. The next step is keeping them current as new AI tools and agents appear.",
  },
  {
    min: 40,
    name: "Developing",
    summary:
      "Some foundations are in place, but there are gaps where AI can be adopted or changed without anyone governing it.",
  },
  {
    min: 0,
    name: "Getting started",
    summary:
      "Most AI use is probably happening outside any governance process today. A few basics will close the biggest gaps quickly.",
  },
] as const;

export function scoreAnswers(answers: Answers) {
  const total = QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  const score = Math.round((total / (QUESTIONS.length * 2)) * 100);
  const tier = TIERS.find((t) => score >= t.min) ?? TIERS[2];
  // Weakest areas first, in question order among equals.
  const gaps = QUESTIONS.filter((q) => (answers[q.id] ?? 0) < 2)
    .slice()
    .sort((a, b) => (answers[a.id] ?? 0) - (answers[b.id] ?? 0));
  return { score, tier, gaps };
}

export const isComplete = (answers: Answers) => QUESTIONS.every((q) => answers[q.id] !== undefined);
