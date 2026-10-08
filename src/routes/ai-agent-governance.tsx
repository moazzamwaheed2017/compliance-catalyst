import { createFileRoute, Link } from "@tanstack/react-router";

import { ContentPage } from "@/components/site/content-page";
import { pageHead, type ContentPageMeta } from "@/lib/seo";

const meta: ContentPageMeta = {
  path: "/ai-agent-governance",
  title: "AI Agent Governance: Controls & Oversight | ReguLattice",
  description:
    "How to govern AI agents: inventory, least-privilege permissions, policy checks, human approval for high-risk actions, runtime monitoring and audit trails.",
  h1: "AI agent governance: how to keep autonomous AI accountable",
  breadcrumb: "AI agent governance",
  kind: "article",
  datePublished: "2026-10-08",
  dateModified: "2026-10-08",
  faqs: [
    {
      q: "What is AI agent governance?",
      a: "AI agent governance is the set of controls that keeps AI agents, meaning AI systems that plan and take actions through tools, APIs and other systems, within approved limits. It covers knowing which agents exist, what they can access, which actions need human approval, how their behavior is monitored, and how their decisions are recorded.",
    },
    {
      q: "Why do AI agents need different governance from chatbots?",
      a: "A chatbot produces text that a person then acts on. An agent acts directly, for example by changing records, sending messages, running code or moving money. That shifts the main risk from wrong answers to wrong actions, so governance needs permissions, approval gates and action-level audit trails.",
    },
    {
      q: "How do you control what an AI agent is allowed to do?",
      a: "Give each agent only the tools and permissions its task needs, enforce authorization in the systems the agent calls rather than relying on the model to decide, check actions against explicit policy rules, and require human approval for high-impact actions.",
    },
    {
      q: "Which frameworks apply to AI agents?",
      a: "Existing AI frameworks apply: the NIST AI RMF and ISO/IEC 42001 for risk management and governance, the EU AI Act where an agent is part of a high-risk AI system (including its human oversight requirements in Article 14), and the OWASP Top 10 for LLM Applications, which lists excessive agency as a key risk.",
    },
    {
      q: "How does ReguLattice govern AI agents?",
      a: "ReguLattice inventories AI agents with an owner, records what they do at runtime including tool calls, and checks actions against deterministic policy rules. High-risk actions can be held and routed to designated approvers, and each decision is linked to its evidence, controls and risks in an audit trail.",
    },
  ],
};

export const Route = createFileRoute("/ai-agent-governance")({
  head: () => pageHead(meta),
  component: AiAgentGovernancePage,
});

function AiAgentGovernancePage() {
  return (
    <ContentPage
      meta={meta}
      eyebrow="AI agent governance"
      shortAnswer={
        <>
          <strong>AI agent governance</strong> keeps AI agents, meaning AI systems that take actions
          through tools and other systems, within approved limits. It means knowing which agents
          exist, limiting what they can access, checking their actions against policy, requiring
          human approval for high-risk actions, and keeping an audit trail of what they did and why.
        </>
      }
      sections={[
        {
          id: "problem",
          title: "The problem: agents act, not just answer",
          content: (
            <>
              <p>
                AI agents plan multi-step tasks and carry them out by calling tools: reading and
                writing files, querying databases, sending emails, running code or updating business
                records. Coding agents work inside developer environments, support agents work
                inside CRMs, and operations agents connect to production systems.
              </p>
              <p>
                That autonomy is the point, and also the risk. A single wrong output can now become
                a wrong action, at machine speed, using whatever permissions the agent holds.
              </p>
            </>
          ),
        },
        {
          id: "why-it-matters",
          title: "Why AI agent governance matters",
          content: (
            <ul>
              <li>
                <strong>Excessive agency.</strong> The OWASP Top 10 for LLM Applications lists
                excessive agency, meaning more functionality, permissions or autonomy than a task
                needs, as a top risk.
              </li>
              <li>
                <strong>Human oversight.</strong> The EU AI Act requires high-risk AI systems to be
                designed so people can effectively oversee them (Article 14).
              </li>
              <li>
                <strong>Accountability.</strong> When an agent acts, someone must own the outcome,
                and auditors will ask who approved what.
              </li>
              <li>
                <strong>Shadow agents.</strong> Agents are easy to connect and easy to forget, which
                makes them a fast-growing form of <Link to="/shadow-ai">shadow AI</Link>.
              </li>
            </ul>
          ),
        },
        {
          id: "how-it-works",
          title: "How AI agent governance works",
          content: (
            <table>
              <thead>
                <tr>
                  <th>Control</th>
                  <th>What it means in practice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Agent inventory</td>
                  <td>
                    Every agent registered with an owner, purpose, model, tools and data access
                  </td>
                </tr>
                <tr>
                  <td>Least privilege</td>
                  <td>Agents get only the tools and permissions their task needs</td>
                </tr>
                <tr>
                  <td>Action risk tiers</td>
                  <td>
                    Actions are classified, e.g. read-only, reversible, or high-impact and
                    irreversible
                  </td>
                </tr>
                <tr>
                  <td>Policy checks</td>
                  <td>
                    Deterministic rules, enforced outside the model, decide whether an action may
                    run
                  </td>
                </tr>
                <tr>
                  <td>Human approval</td>
                  <td>High-impact actions wait for sign-off from named roles</td>
                </tr>
                <tr>
                  <td>Runtime monitoring</td>
                  <td>Tool calls and outcomes are logged and reviewed for anomalies</td>
                </tr>
                <tr>
                  <td>Audit trail</td>
                  <td>Each decision is linked to its evidence, approvers and the policy applied</td>
                </tr>
              </tbody>
            </table>
          ),
        },
        {
          id: "examples",
          title: "Practical examples",
          content: (
            <>
              <h3>Coding agent</h3>
              <p>
                A coding agent may read the repository and run tests freely, but pushing to the main
                branch or sending code to an external service requires approval, and secret patterns
                in its context are blocked.
              </p>
              <h3>Customer support agent</h3>
              <p>
                A support agent can look up orders and draft replies. Refunds above a threshold and
                emails to external domains are held for a person to approve.
              </p>
              <h3>Lending agent</h3>
              <p>
                An agent preparing credit decisions can gather applicant information, but any
                decision above a set amount is routed to a credit officer and a risk owner, and the
                decision record is kept as evidence.
              </p>
            </>
          ),
        },
        {
          id: "risks",
          title: "Key risks of ungoverned AI agents",
          content: (
            <ul>
              <li>Destructive or irreversible actions taken without review.</li>
              <li>Prompt injection leading an agent to misuse its tools.</li>
              <li>Over-privileged credentials shared across agents.</li>
              <li>Sensitive data sent to external services.</li>
              <li>No record of who or what made a decision.</li>
            </ul>
          ),
        },
        {
          id: "frameworks",
          title: "Frameworks that apply to AI agents",
          content: (
            <ul>
              <li>
                <strong>NIST AI RMF:</strong> Govern, Map, Measure and Manage apply to agentic
                systems as to any AI system; the Generative AI Profile (NIST AI 600-1) adds guidance
                for generative AI risks.
              </li>
              <li>
                <strong>ISO/IEC 42001:</strong> agents fall within the AI management system,
                including roles and responsibilities, risk treatment and operational monitoring.
              </li>
              <li>
                <strong>EU AI Act:</strong> where an agent is part of a high-risk AI system,
                requirements such as risk management, record-keeping and human oversight apply.
              </li>
              <li>
                <strong>OWASP Top 10 for LLM Applications:</strong> recommends limiting agent
                functionality and permissions, enforcing authorization in downstream systems, and
                requiring human approval for high-impact actions.
              </li>
            </ul>
          ),
        },
        {
          id: "implementation",
          title: "Implementation considerations",
          content: (
            <ol>
              <li>
                Inventory agents before writing agent policy; you can&apos;t govern unknown agents.
              </li>
              <li>Give each agent its own identity and credentials; avoid shared keys.</li>
              <li>
                Start with approval gates on a short list of high-impact actions, then refine.
              </li>
              <li>Keep enforcement deterministic and outside the model.</li>
              <li>Log tool calls with enough context to reconstruct a decision later.</li>
              <li>Have a way to pause an agent quickly, and test it.</li>
              <li>Review overrides and incidents regularly and update policy.</li>
            </ol>
          ),
        },
        {
          id: "regulattice-approach",
          title: "ReguLattice's approach to AI agent governance",
          content: (
            <>
              <p>
                ReguLattice treats AI agents as first-class AI systems. It inventories agents with
                an owner, records what they do at runtime, including tool calls, and checks actions
                against deterministic policy rules.
              </p>
              <p>
                High-risk actions can be held and routed to designated approvers, such as a
                compliance officer and a risk owner. Each decision is linked to its evidence,
                controls and risks in an audit trail, mapped to ISO/IEC 42001, the NIST AI RMF and
                the EU AI Act. See{" "}
                <Link to="/ai-governance-platform">how an AI governance platform works</Link>.
              </p>
            </>
          ),
        },
      ]}
      references={[
        {
          label: "LLM06:2025 Excessive Agency",
          publisher: "OWASP GenAI Security Project",
          url: "https://genai.owasp.org/llmrisk/llm06/",
        },
        {
          label: "AI Risk Management Framework (AI RMF 1.0)",
          publisher: "NIST",
          url: "https://www.nist.gov/itl/ai-risk-management-framework",
        },
        {
          label:
            "Artificial Intelligence Risk Management Framework: Generative AI Profile (NIST AI 600-1)",
          publisher: "NIST",
          url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
        },
        {
          label: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
          publisher: "EUR-Lex",
          url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
        },
        {
          label: "ISO/IEC 42001:2023 Artificial intelligence — Management system",
          publisher: "ISO",
          url: "https://www.iso.org/standard/81230.html",
        },
      ]}
      related={[
        {
          to: "/shadow-ai",
          label: "Shadow AI governance",
          text: "How to discover and govern AI your organization doesn't know about.",
        },
        {
          to: "/ai-governance-platform",
          label: "What is an AI governance platform?",
          text: "Capabilities, alternatives and how to evaluate a platform.",
        },
      ]}
      cta={{
        title: "Keep your AI agents accountable",
        text: "See how ReguLattice holds high-risk agent actions for human sign-off and records every decision.",
        button: "Talk to an AI governance expert",
        requestType: "Schedule Technical Demo",
      }}
    />
  );
}
