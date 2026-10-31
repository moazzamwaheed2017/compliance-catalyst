import { createFileRoute, Link } from "@tanstack/react-router";

import { ContentPage } from "@/components/site/content-page";
import { pageHead, type ContentPageMeta } from "@/lib/seo";

const meta: ContentPageMeta = {
  path: "/shadow-ai",
  title: "What Is Shadow AI? How to Find and Govern It | ReguLattice",
  description:
    "Shadow AI is AI used without approval or oversight. Learn the risks, how to discover unapproved AI tools, models and agents, and how to govern them.",
  h1: "Shadow AI: how to discover and govern AI you don't know about",
  breadcrumb: "Shadow AI",
  kind: "article",
  datePublished: "2026-10-08",
  dateModified: "2026-10-08",
  faqs: [
    {
      q: "What is shadow AI?",
      a: "Shadow AI is any AI system, tool, model or agent used inside an organization without being registered, assessed or approved by the people responsible for governing it. Examples include employees using personal AI accounts with company data, unapproved model API keys, local models on laptops, and AI features enabled inside approved software.",
    },
    {
      q: "Is shadow AI the same as shadow IT?",
      a: "Shadow AI is a form of shadow IT, but the risks differ. AI tools can send sensitive data to external models, produce outputs that influence decisions, and, in the case of AI agents, take actions on systems. That makes discovery and assessment more urgent than for most unapproved software.",
    },
    {
      q: "How do you detect shadow AI?",
      a: "Combine sources: model provider usage and API keys, SaaS applications with AI features, local model runtimes, code repositories that import AI SDKs, developer tools and coding agents, and network or egress logs. Compare what you find against your approved AI inventory, and treat anything unregistered as shadow AI.",
    },
    {
      q: "Should companies ban shadow AI?",
      a: "Blanket bans tend to push usage further out of sight. A more effective approach is to publish approved alternatives, discover what is in use, assess it, and then approve, replace or restrict each tool based on its risk.",
    },
    {
      q: "How does ReguLattice manage shadow AI?",
      a: "ReguLattice discovers AI across model provider APIs, local runtimes, code repositories and developer tools, and compares it with the registered AI inventory. Unregistered AI is flagged as shadow AI so it can be given an owner, assessed for risk, and approved, replaced or restricted under policy.",
    },
    {
      q: "Does shadow AI affect ISO/IEC 42001 or EU AI Act readiness?",
      a: "Yes. An AI management system under ISO/IEC 42001 can only govern AI it knows about, and the NIST AI RMF calls for mechanisms to inventory AI systems. Under the EU AI Act, an organization cannot determine its obligations for AI systems it has not identified.",
    },
  ],
};

export const Route = createFileRoute("/shadow-ai")({
  head: () => pageHead(meta),
  component: ShadowAiPage,
});

function ShadowAiPage() {
  return (
    <ContentPage
      showDemoVideo
      meta={meta}
      eyebrow="Shadow AI governance"
      shortAnswer={
        <>
          <strong>Shadow AI</strong> is any AI system, tool, model or agent used inside an
          organization without being registered, assessed or approved by the people responsible for
          governing it. You manage it by discovering AI continuously, comparing it with an approved
          AI inventory, and then approving, replacing or restricting each tool based on its risk.
        </>
      }
      sections={[
        {
          id: "problem",
          title: "The problem: AI arrives faster than approval processes",
          content: (
            <>
              <p>
                AI is easy to adopt. Anyone can sign up for an AI assistant, paste a model API key
                into a script, run an open-weight model on a laptop, or enable an AI feature in a
                SaaS tool. Most of this happens with good intentions and without telling anyone.
              </p>
              <p>Common forms of shadow AI include:</p>
              <ul>
                <li>Personal accounts on public AI assistants used with company data.</li>
                <li>Model API keys created outside central procurement.</li>
                <li>Open-weight models running locally, for example through Ollama.</li>
                <li>Coding assistants and agents in developer environments.</li>
                <li>AI features switched on inside software approved for another purpose.</li>
                <li>AI agents connected to internal systems without a security review.</li>
              </ul>
            </>
          ),
        },
        {
          id: "why-it-matters",
          title: "Why shadow AI matters",
          content: (
            <>
              <p>
                Shadow AI is not just a policy violation; it is a control gap. If you can&apos;t see
                an AI system, you can&apos;t assess it, monitor it or produce evidence about it.
              </p>
              <ul>
                <li>
                  <strong>Data exposure:</strong> personal data, source code or confidential
                  documents may be sent to external models.
                </li>
                <li>
                  <strong>Unassessed decisions:</strong> AI outputs may influence decisions about
                  customers or employees without any risk assessment.
                </li>
                <li>
                  <strong>Compliance gaps:</strong> your AI inventory, risk register and audit
                  evidence describe only the approved AI, not the real environment.
                </li>
                <li>
                  <strong>Agent risk:</strong> unreviewed AI agents may hold access to production
                  systems.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "how-discovery-works",
          title: "How shadow AI discovery works",
          content: (
            <>
              <p>
                No single data source finds everything. Effective discovery combines several signals
                and compares them against the approved AI inventory:
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>What it reveals</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Model provider accounts and API keys</td>
                    <td>Which teams call which models (e.g. OpenAI, Anthropic, Google Gemini)</td>
                  </tr>
                  <tr>
                    <td>Local model runtimes</td>
                    <td>Open-weight models running on workstations or servers</td>
                  </tr>
                  <tr>
                    <td>Code repositories</td>
                    <td>Applications that import AI SDKs or call model endpoints</td>
                  </tr>
                  <tr>
                    <td>Developer tools</td>
                    <td>Coding assistants and agents, and the actions they take</td>
                  </tr>
                  <tr>
                    <td>SaaS and identity data</td>
                    <td>AI-enabled applications employees sign in to</td>
                  </tr>
                  <tr>
                    <td>Network and egress logs</td>
                    <td>Traffic to AI services that other sources missed</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          id: "examples",
          title: "Practical examples",
          content: (
            <ul>
              <li>
                A finance analyst uses a personal Gemini API key to summarize customer files.
                Discovery flags it; the team moves to an approved, enterprise-licensed model.
              </li>
              <li>
                A data scientist runs a local Llama model to process HR data. It is registered,
                assessed, and approved with restrictions on the data it may use.
              </li>
              <li>
                A support team connects an AI agent to the CRM. It is inventoried, its permissions
                are reduced, and external emails are routed for human approval.
              </li>
            </ul>
          ),
        },
        {
          id: "risks",
          title: "Risks of ignoring shadow AI",
          content: (
            <ul>
              <li>Disclosure of personal data, trade secrets or source code.</li>
              <li>Unreviewed AI influencing decisions about people.</li>
              <li>Audit findings because the AI inventory is incomplete.</li>
              <li>Inconsistent answers to customer AI questionnaires.</li>
              <li>Duplicate spending on overlapping AI tools.</li>
            </ul>
          ),
        },
        {
          id: "frameworks",
          title: "What the frameworks say",
          content: (
            <ul>
              <li>
                <strong>NIST AI RMF:</strong> the Govern function includes having mechanisms to
                inventory AI systems, resourced according to organizational risk priorities.
              </li>
              <li>
                <strong>ISO/IEC 42001:</strong> an AI management system has a defined scope; AI that
                is in use but outside that inventory is effectively ungoverned.
              </li>
              <li>
                <strong>EU AI Act:</strong> obligations depend on an organization&apos;s role and on
                each AI system&apos;s risk category, which you can only determine for systems you
                have identified.
              </li>
              <li>
                <strong>OWASP Top 10 for LLM Applications:</strong> sensitive information disclosure
                is listed among the top risks of LLM use.
              </li>
            </ul>
          ),
        },
        {
          id: "implementation",
          title: "How to build a shadow AI program",
          content: (
            <ol>
              <li>
                <strong>Publish an AI use policy</strong> with a list of approved tools and a fast
                way to request new ones.
              </li>
              <li>
                <strong>Discover continuously</strong> across the sources above, not once a year.
              </li>
              <li>
                <strong>Triage</strong> each finding: register it, assign an owner, record its
                purpose and the data it touches.
              </li>
              <li>
                <strong>Assess risk</strong> and decide: approve, approve with conditions, replace,
                or restrict.
              </li>
              <li>
                <strong>Monitor</strong> approved AI so it stays within its conditions.
              </li>
              <li>
                <strong>Educate</strong> teams on why approved alternatives exist; AI literacy
                reduces repeat shadow AI.
              </li>
            </ol>
          ),
        },
        {
          id: "regulattice-approach",
          title: "ReguLattice's approach to shadow AI",
          content: (
            <>
              <p>
                ReguLattice starts from one principle: you can&apos;t govern AI you don&apos;t know
                exists. It discovers AI across model provider APIs, local runtimes such as Ollama,
                code repositories and developer tools such as Claude Code and Cursor, and compares
                what it finds with the registered AI inventory.
              </p>
              <p>
                Unregistered AI is flagged as shadow AI, assigned an owner and assessed. From there,
                the same platform applies policies, monitors usage at runtime and keeps evidence
                mapped to ISO/IEC 42001, the NIST AI RMF and the EU AI Act. See{" "}
                <Link to="/ai-governance-platform">how an AI governance platform works</Link>.
              </p>
            </>
          ),
        },
      ]}
      references={[
        {
          label: "AI Risk Management Framework (AI RMF 1.0)",
          publisher: "NIST",
          url: "https://www.nist.gov/itl/ai-risk-management-framework",
        },
        {
          label: "ISO/IEC 42001:2023 Artificial intelligence — Management system",
          publisher: "ISO",
          url: "https://www.iso.org/standard/81230.html",
        },
        {
          label: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
          publisher: "EUR-Lex",
          url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
        },
        {
          label: "OWASP Top 10 for Large Language Model Applications",
          publisher: "OWASP",
          url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
        },
      ]}
      related={[
        {
          to: "/ai-governance-platform",
          label: "What is an AI governance platform?",
          text: "Capabilities, alternatives and how to evaluate a platform.",
        },
        {
          to: "/ai-agent-governance",
          label: "AI agent governance",
          text: "Controls and human oversight for autonomous AI agents.",
        },
      ]}
      cta={{
        title: "Find the AI you don't know about",
        text: "See how ReguLattice discovers shadow AI across model APIs, local runtimes, code and developer tools.",
        button: "See ReguLattice in action",
        requestType: "Schedule Technical Demo",
      }}
    />
  );
}
