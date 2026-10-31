import { createFileRoute, Link } from "@tanstack/react-router";

import { ContentPage } from "@/components/site/content-page";
import { DEMO_VIDEOS } from "@/components/site/demo-video";
import { ENTITY_DEFINITION, pageHead, type ContentPageMeta } from "@/lib/seo";

const meta: ContentPageMeta = {
  path: "/ai-governance-platform",
  title: "What Is an AI Governance Platform? | ReguLattice",
  description:
    "What an AI governance platform is, which capabilities enterprises need, how it differs from GRC and other alternatives, and how to evaluate one.",
  h1: "What is an AI governance platform?",
  breadcrumb: "AI governance platform",
  kind: "article",
  datePublished: "2026-10-08",
  dateModified: "2026-10-08",
  faqs: [
    {
      q: "What is an AI governance platform?",
      a: "An AI governance platform is software that gives an organization one system of record to discover, assess, govern, monitor and improve the AI systems and AI agents it builds, buys and uses, and to produce evidence of that governance for auditors, regulators and customers.",
    },
    {
      q: "What features should an AI governance platform have?",
      a: "At minimum: an AI inventory with discovery of unapproved (shadow) AI, AI risk assessment, policy and control management mapped to frameworks such as ISO/IEC 42001, the NIST AI RMF and the EU AI Act, human oversight for high-risk decisions, monitoring after deployment, and audit-ready evidence and reporting.",
    },
    {
      q: "How is an AI governance platform different from a GRC tool?",
      a: "GRC tools manage policies, risks and controls across the business, usually through periodic, document-based assessments. An AI governance platform is designed for AI specifically: it discovers AI systems and agents, assesses AI-specific risks, monitors AI behavior at runtime, and keeps evidence current. Many organizations use both.",
    },
    {
      q: "What are the alternatives to an AI governance platform?",
      a: "Common alternatives are spreadsheets and manual registers, AI modules within existing GRC or privacy suites, ML monitoring and observability tools, and AI security gateways. Each covers part of the problem; an AI governance platform connects inventory, risk, controls, monitoring and evidence in one place.",
    },
    {
      q: "Which AI governance platforms are available for enterprises?",
      a: "The market includes dedicated AI governance platforms such as ReguLattice, Credo AI, Holistic AI and IBM watsonx.governance, AI governance modules within broader GRC and privacy suites such as OneTrust and ServiceNow, and adjacent tools for model monitoring and AI security. The right choice depends on whether your priority is inventory and shadow AI, runtime control of agents, model monitoring, or audit evidence.",
    },
    {
      q: "Does an AI governance platform make us compliant with the EU AI Act or ISO/IEC 42001?",
      a: "No software makes an organization compliant on its own. A platform helps you identify obligations, implement and evidence controls, and keep that evidence current. ISO/IEC 42001 certification is issued by accredited certification bodies, and EU AI Act obligations depend on your role and your AI systems' risk category.",
    },
  ],
};

export const Route = createFileRoute("/ai-governance-platform")({
  head: () => pageHead(meta),
  component: AiGovernancePlatformPage,
});

function AiGovernancePlatformPage() {
  return (
    <ContentPage
      demoVideo={DEMO_VIDEOS.aiGovernancePlatform}
      meta={meta}
      eyebrow="AI governance platform"
      shortAnswer={
        <>
          An <strong>AI governance platform</strong> is software that gives an organization one
          system of record to discover, assess, govern, monitor and improve the AI systems and AI
          agents it builds, buys and uses, and to produce evidence of that governance for auditors,
          regulators and customers.
        </>
      }
      sections={[
        {
          id: "problem",
          title: "The problem: AI is adopted faster than it is governed",
          content: (
            <>
              <p>
                Most organizations now use AI in more places than they can list. Employees use AI
                assistants, product teams call model APIs, engineers work with coding agents, and
                vendors add AI features to software that was approved for something else.
              </p>
              <p>Governance usually lags behind in three predictable ways:</p>
              <ul>
                <li>
                  <strong>Visibility.</strong> There is no complete list of AI systems, owners or
                  the data they touch, so some AI is never assessed at all.
                </li>
                <li>
                  <strong>Control.</strong> Policies exist as documents, but nothing connects them
                  to what models and agents actually do in production.
                </li>
                <li>
                  <strong>Evidence.</strong> Compliance status is assembled by hand before audits
                  and goes out of date as soon as models, prompts or vendors change.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "why-it-matters",
          title: "Why AI governance matters now",
          content: (
            <>
              <p>
                Expectations have become concrete. The{" "}
                <strong>EU Artificial Intelligence Act</strong> (Regulation (EU) 2024/1689) sets
                obligations for providers and deployers of AI systems according to risk, with
                requirements phasing in over several years. <strong>ISO/IEC 42001</strong>,
                published in 2023, defines requirements for an AI management system that
                organizations can be certified against. The{" "}
                <strong>NIST AI Risk Management Framework</strong> (AI RMF 1.0) has become a common
                reference for structuring AI risk work.
              </p>
              <p>
                Enterprise customers now send AI governance questionnaires during procurement, and
                AI agents, which take actions rather than just generate text, raise the stakes of
                every gap in visibility and control.
              </p>
            </>
          ),
        },
        {
          id: "how-it-works",
          title: "How an AI governance platform works",
          content: (
            <>
              <p>
                A complete AI governance platform supports the whole lifecycle, not just one step:
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>What the platform does</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Discover</td>
                    <td>
                      Builds an AI inventory of models, AI tools and agents, including shadow AI,
                      with an owner for each
                    </td>
                  </tr>
                  <tr>
                    <td>Assess</td>
                    <td>
                      Classifies each AI system&apos;s purpose, data and risk level, and identifies
                      which obligations and controls apply
                    </td>
                  </tr>
                  <tr>
                    <td>Govern</td>
                    <td>
                      Manages policies and controls mapped to frameworks, and routes high-risk
                      decisions to accountable people
                    </td>
                  </tr>
                  <tr>
                    <td>Monitor</td>
                    <td>
                      Tracks behavior after deployment, such as drift, incidents, agent actions and
                      data leaving the organization
                    </td>
                  </tr>
                  <tr>
                    <td>Improve</td>
                    <td>
                      Turns findings, incidents and overrides into remediation, and produces
                      audit-ready evidence
                    </td>
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
            <>
              <h3>A lender using AI in credit decisions</h3>
              <p>
                A credit-scoring model is registered with an owner and classified as high-risk
                (credit scoring is listed as a high-risk use case in the EU AI Act). Its controls
                map to risk management and human oversight requirements, its monitoring logs are
                collected as evidence, and model drift triggers a review.
              </p>
              <h3>An engineering team using coding agents</h3>
              <p>
                Coding agents such as Claude Code or Cursor are discovered and inventoried. Their
                tool calls are logged, and actions such as sending code or secrets outside the
                organization are blocked or held for approval.
              </p>
              <h3>A marketing team using an unapproved chatbot</h3>
              <p>
                A personal API key for a public model is found in use with customer data. It is
                flagged as shadow AI, assigned an owner, and replaced with an approved tool. Read
                more in our <Link to="/shadow-ai">shadow AI guide</Link>.
              </p>
            </>
          ),
        },
        {
          id: "risks",
          title: "Risks of governing AI without a platform",
          content: (
            <ul>
              <li>AI systems that are never assessed because nobody knows they exist.</li>
              <li>Sensitive or personal data sent to external models without review.</li>
              <li>AI agents with more permissions than their task requires.</li>
              <li>
                Compliance status that looks green while the evidence behind it is months old.
              </li>
              <li>Slow, manual audit preparation and inconsistent answers to customers.</li>
            </ul>
          ),
        },
        {
          id: "frameworks",
          title: "Frameworks an AI governance platform should map to",
          content: (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Framework</th>
                    <th>What it is</th>
                    <th>Mapped in ReguLattice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ISO/IEC 42001</td>
                    <td>Certifiable AI management system standard</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>NIST AI RMF 1.0</td>
                    <td>Voluntary framework: Govern, Map, Measure, Manage</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>EU AI Act</td>
                    <td>EU regulation with risk-based obligations</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>ISO/IEC 23894</td>
                    <td>Guidance on AI risk management</td>
                    <td>Reference</td>
                  </tr>
                  <tr>
                    <td>ISO/IEC 38507</td>
                    <td>Governance implications of AI for governing bodies</td>
                    <td>Reference</td>
                  </tr>
                  <tr>
                    <td>OECD AI Principles</td>
                    <td>Intergovernmental principles for trustworthy AI</td>
                    <td>Reference</td>
                  </tr>
                  <tr>
                    <td>UNESCO Recommendation on the Ethics of AI</td>
                    <td>Global ethical framework adopted by UNESCO member states</td>
                    <td>Reference</td>
                  </tr>
                </tbody>
              </table>
              <p>
                &quot;Reference&quot; means the framework informs good practice and our guidance but
                is not mapped control-by-control in the product today.
              </p>
            </>
          ),
        },
        {
          id: "alternatives",
          title: "AI governance platform vs traditional GRC and other alternatives",
          content: (
            <>
              <p>
                Organizations usually start AI governance with tools they already have. Each option
                covers part of the problem:
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Approach</th>
                    <th>Good at</th>
                    <th>Typical gaps for AI governance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Spreadsheets and manual registers</td>
                    <td>Quick to start, no cost</td>
                    <td>Incomplete inventory, no monitoring, evidence goes stale</td>
                  </tr>
                  <tr>
                    <td>Traditional GRC suites</td>
                    <td>Enterprise policies, risk registers, audit workflows</td>
                    <td>Not built to discover AI or monitor model and agent behavior at runtime</td>
                  </tr>
                  <tr>
                    <td>ML monitoring and observability tools</td>
                    <td>Model performance, drift and quality metrics</td>
                    <td>
                      Focus on models the team built; limited policy, framework and audit coverage
                    </td>
                  </tr>
                  <tr>
                    <td>AI security gateways</td>
                    <td>Filtering prompts and responses in real time</td>
                    <td>Limited inventory, risk assessment and compliance evidence</td>
                  </tr>
                  <tr>
                    <td>AI governance platform</td>
                    <td>Inventory, risk, controls, oversight, monitoring and evidence together</td>
                    <td>Needs integration with existing GRC, security and data tools</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          id: "evaluation",
          title: "How to evaluate an AI governance platform",
          content: (
            <>
              <p>Questions worth asking any vendor, including us:</p>
              <ol>
                <li>
                  <strong>Discovery coverage:</strong> which sources does it discover AI from (model
                  APIs, SaaS, local runtimes, code, developer tools, agents)?
                </li>
                <li>
                  <strong>Runtime or documents only:</strong> can it see and act on what AI systems
                  do after deployment?
                </li>
                <li>
                  <strong>Evidence quality:</strong> how is evidence verified, and does the platform
                  show when evidence is out of date?
                </li>
                <li>
                  <strong>Framework depth:</strong> which frameworks are mapped control-by-control,
                  and can one piece of evidence support several frameworks?
                </li>
                <li>
                  <strong>Human oversight:</strong> can high-risk actions be held for approval by
                  named roles, with an audit trail?
                </li>
                <li>
                  <strong>Deployment and data residency:</strong> can it run in your own environment
                  if governance data must stay in-country?
                </li>
                <li>
                  <strong>Time to value:</strong> how long until you have a usable AI inventory?
                </li>
              </ol>
            </>
          ),
        },
        {
          id: "regulattice-approach",
          title: "ReguLattice's approach",
          content: (
            <>
              <p>{ENTITY_DEFINITION} Its design is built around four ideas:</p>
              <ul>
                <li>
                  <strong>You can&apos;t govern AI you don&apos;t know exists.</strong> Discovery,
                  including shadow AI and developer AI tools, comes first.
                </li>
                <li>
                  <strong>Govern what AI does, not only the documents.</strong> Runtime monitoring
                  of models and agents, with deterministic policy checks.
                </li>
                <li>
                  <strong>Evidence has a shelf life.</strong> Evidence is verified in two passes,
                  and coverage drops as it ages, so status reflects reality.
                </li>
                <li>
                  <strong>People stay accountable.</strong> High-risk AI actions are routed to named
                  approvers, and every decision is recorded.
                </li>
              </ul>
              <p>
                ReguLattice is local-first and can run on your own infrastructure with locally
                hosted AI models. Learn more <Link to="/about">about ReguLattice</Link>.
              </p>
            </>
          ),
        },
      ]}
      references={[
        {
          label: "ISO/IEC 42001:2023 Artificial intelligence — Management system",
          publisher: "ISO",
          url: "https://www.iso.org/standard/81230.html",
        },
        {
          label: "AI Risk Management Framework (AI RMF 1.0)",
          publisher: "NIST",
          url: "https://www.nist.gov/itl/ai-risk-management-framework",
        },
        {
          label: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
          publisher: "EUR-Lex",
          url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
        },
        {
          label: "ISO/IEC 23894:2023 Artificial intelligence — Guidance on risk management",
          publisher: "ISO",
          url: "https://www.iso.org/standard/77304.html",
        },
        {
          label: "OECD AI Principles",
          publisher: "OECD.AI",
          url: "https://oecd.ai/en/ai-principles",
        },
        {
          label: "Recommendation on the Ethics of Artificial Intelligence",
          publisher: "UNESCO",
          url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics",
        },
      ]}
      related={[
        {
          to: "/shadow-ai",
          label: "Shadow AI governance",
          text: "How to discover and govern AI your organization doesn't know about.",
        },
        {
          to: "/ai-agent-governance",
          label: "AI agent governance",
          text: "Controls and human oversight for autonomous AI agents.",
        },
        {
          to: "/about",
          label: "About ReguLattice",
          text: "What ReguLattice is, who it is for and which frameworks it supports.",
        },
      ]}
      cta={{
        title: "See an AI governance platform in action",
        text: "Book a technical demo to see how ReguLattice discovers your AI, assesses risk and keeps evidence current.",
        button: "Book a technical demo",
        requestType: "Schedule Technical Demo",
      }}
    />
  );
}
