import { createFileRoute, Link } from "@tanstack/react-router";

import { ContentPage } from "@/components/site/content-page";
import {
  CONTACT_EMAIL,
  ENTITY_DEFINITION,
  ENTITY_EXPANSION,
  ENTITY_FACTS,
  LEADERSHIP,
  pageHead,
  type ContentPageMeta,
} from "@/lib/seo";

const meta: ContentPageMeta = {
  path: "/about",
  title: "About ReguLattice | AI Governance Platform",
  description:
    "ReguLattice is an AI-native governance platform that helps organizations discover, assess, govern, monitor, and improve AI systems and AI agents.",
  h1: "What is ReguLattice?",
  breadcrumb: "About ReguLattice",
  kind: "about",
  datePublished: "2026-10-08",
  dateModified: "2026-10-08",
  faqs: [
    {
      q: "What is ReguLattice?",
      a: `${ENTITY_DEFINITION} ${ENTITY_EXPANSION}`,
    },
    {
      q: "What category of software is ReguLattice?",
      a: "ReguLattice is an AI governance platform. It is built specifically for governing AI systems and AI agents, rather than being a general-purpose GRC, cybersecurity or compliance tool.",
    },
    {
      q: "Who uses ReguLattice?",
      a: "Organizations that deploy AI systems and AI agents, particularly in regulated or high-stakes settings. Typical users are compliance and risk teams, CISOs and security teams, internal audit, and the AI and engineering leaders who own AI systems.",
    },
    {
      q: "How does ReguLattice discover AI systems?",
      a: "ReguLattice connects to the places AI is used, including model provider APIs such as OpenAI, Anthropic and Google Gemini, local model runtimes such as Ollama, code repositories, and developer tools such as Claude Code and Cursor. Each AI system it finds is added to an AI inventory with an owner, purpose and risk level.",
    },
    {
      q: "How does ReguLattice manage shadow AI?",
      a: "AI that is in use but not registered or approved is flagged as shadow AI. It can then be assigned an owner, assessed for risk, and either approved under policy, replaced with an approved alternative, or restricted.",
    },
    {
      q: "How does ReguLattice govern AI agents?",
      a: "ReguLattice records what AI agents do at runtime, including tool calls, and checks actions against deterministic policy rules. High-risk actions can be held for sign-off by designated people, and each decision is logged with its evidence.",
    },
    {
      q: "How does ReguLattice assess AI risk?",
      a: "Each AI system is assessed on its purpose, the data it uses and the decisions it influences, and classified by risk level, including EU AI Act risk categories. Risks are linked to the controls that address them and to an accountable risk owner.",
    },
    {
      q: "Does ReguLattice support ISO/IEC 42001?",
      a: "Yes. ReguLattice maps AI inventory records, runtime telemetry and documents to ISO/IEC 42001 controls and tracks whether the evidence is still current, which helps organizations prepare for an ISO/IEC 42001 audit. ReguLattice does not issue certification; that is done by accredited certification bodies.",
    },
    {
      q: "Does ReguLattice support the NIST AI RMF?",
      a: "Yes. ReguLattice maps controls and evidence to the NIST AI Risk Management Framework (AI RMF 1.0) and its Govern, Map, Measure and Manage functions.",
    },
    {
      q: "Does ReguLattice support EU AI Act requirements?",
      a: "ReguLattice maps evidence to EU AI Act requirements such as risk management (Article 9), record-keeping (Article 12), human oversight (Article 14) and post-market monitoring (Article 72). It helps organizations organize and evidence their obligations; it does not provide legal advice or guarantee compliance.",
    },
    {
      q: "How is ReguLattice different from traditional GRC software?",
      a: "Traditional GRC software manages policies, risks and controls through periodic, document-based assessments. ReguLattice focuses on the AI layer: discovering AI systems and agents, monitoring their behavior at runtime, keeping humans in charge of high-risk AI actions, and keeping compliance evidence current as it ages.",
    },
    {
      q: "Can ReguLattice run on our own infrastructure?",
      a: "Yes. ReguLattice is local-first and can be deployed in a customer's own environment using locally hosted AI models, so governance data can stay inside that environment.",
    },
  ],
};

export const Route = createFileRoute("/about")({
  head: () => pageHead(meta),
  component: AboutPage,
});

function AboutPage() {
  return (
    <ContentPage
      meta={meta}
      eyebrow="About ReguLattice"
      shortAnswer={
        <>
          {ENTITY_DEFINITION} {ENTITY_EXPANSION}
        </>
      }
      sections={[
        {
          id: "at-a-glance",
          title: "ReguLattice at a glance",
          content: (
            <table>
              <tbody>
                {ENTITY_FACTS.map((f) => (
                  <tr key={f.label}>
                    <th scope="row" className="w-40">
                      {f.label}
                    </th>
                    <td>{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ),
        },
        {
          id: "problem",
          title: "What problem does ReguLattice solve?",
          content: (
            <>
              <p>
                Organizations are adopting AI faster than they can govern it. Teams connect new
                models, AI tools and AI agents without review. Models and prompts change after
                deployment. Policies exist on paper, but nothing connects them to what AI systems
                actually do, and the evidence behind a compliance status quietly goes out of date.
              </p>
              <p>
                At the same time, regulators, auditors and enterprise customers increasingly ask
                organizations to <strong>show</strong> how their AI is controlled, under the EU AI
                Act, ISO/IEC 42001 and the NIST AI RMF. ReguLattice closes that gap with one simple
                principle: <strong>you can&apos;t govern AI you don&apos;t know exists.</strong>
              </p>
            </>
          ),
        },
        {
          id: "how-it-works",
          title: "How ReguLattice works",
          content: (
            <>
              <p>
                ReguLattice follows a continuous lifecycle: Discover → Assess → Govern → Monitor →
                Improve.
              </p>
              <ol>
                <li>
                  <strong>Discover.</strong> Builds a live AI inventory of models, AI tools and AI
                  agents across cloud AI providers, local runtimes, code repositories and developer
                  tools, and flags shadow AI.
                </li>
                <li>
                  <strong>Assess.</strong> Records each AI system&apos;s owner, purpose, data and
                  risk level, including EU AI Act risk categories.
                </li>
                <li>
                  <strong>Govern.</strong> Manages AI policies and controls mapped to ISO/IEC 42001,
                  the NIST AI RMF and the EU AI Act, with human sign-off for high-risk AI actions.
                </li>
                <li>
                  <strong>Monitor.</strong> Tracks what AI systems and agents do at runtime and
                  keeps evidence current. Evidence is verified in two passes, and coverage drops as
                  evidence ages.
                </li>
                <li>
                  <strong>Improve.</strong> Turns incidents, human overrides and audit findings into
                  remediation tasks and stronger controls.
                </li>
              </ol>
              <p>
                For the full category overview, read{" "}
                <Link to="/ai-governance-platform">what an AI governance platform is</Link>.
              </p>
            </>
          ),
        },
        {
          id: "who-uses-it",
          title: "Who uses ReguLattice?",
          content: (
            <ul>
              <li>
                <strong>Compliance teams</strong> preparing for ISO/IEC 42001 audits and EU AI Act
                obligations.
              </li>
              <li>
                <strong>Risk teams</strong> who need an accountable owner and a risk assessment for
                every AI system.
              </li>
              <li>
                <strong>CISOs and security teams</strong> concerned about shadow AI and AI agents
                with access to sensitive systems and data.
              </li>
              <li>
                <strong>Internal audit</strong> teams that need traceable evidence for AI controls.
              </li>
              <li>
                <strong>AI and engineering leaders</strong> who want governance that doesn&apos;t
                slow delivery.
              </li>
            </ul>
          ),
        },
        {
          id: "frameworks",
          title: "Which frameworks does ReguLattice support?",
          content: (
            <>
              <p>
                ReguLattice currently maps controls and evidence to three frameworks. One piece of
                evidence can support matching requirements in more than one of them.
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Framework</th>
                    <th>Type</th>
                    <th>What ReguLattice maps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ISO/IEC 42001</td>
                    <td>International management system standard</td>
                    <td>
                      AI management system controls, monitoring and event logging, supplier and AI
                      tool governance
                    </td>
                  </tr>
                  <tr>
                    <td>NIST AI RMF 1.0</td>
                    <td>Voluntary US risk management framework</td>
                    <td>Govern, Map, Measure and Manage functions</td>
                  </tr>
                  <tr>
                    <td>EU AI Act</td>
                    <td>EU regulation</td>
                    <td>
                      Risk management, record-keeping, human oversight and post-market monitoring
                      requirements
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                ReguLattice helps organizations prepare and evidence their governance. It does not
                certify organizations or provide legal advice.
              </p>
            </>
          ),
        },
        {
          id: "difference",
          title: "How is ReguLattice different from traditional GRC?",
          content: (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Traditional GRC software</th>
                  <th>ReguLattice AI governance platform</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Scope</td>
                  <td>IT and business processes in general</td>
                  <td>AI systems, AI tools and AI agents</td>
                </tr>
                <tr>
                  <td>How it learns what exists</td>
                  <td>Manual registers and questionnaires</td>
                  <td>Automated AI discovery, including shadow AI</td>
                </tr>
                <tr>
                  <td>Cadence</td>
                  <td>Periodic assessments</td>
                  <td>Continuous runtime monitoring</td>
                </tr>
                <tr>
                  <td>Evidence</td>
                  <td>Documents collected before an audit</td>
                  <td>Live evidence, verified in two passes, that ages over time</td>
                </tr>
                <tr>
                  <td>AI agents</td>
                  <td>Not designed for autonomous actions</td>
                  <td>Policy checks and human sign-off for high-risk actions</td>
                </tr>
              </tbody>
            </table>
          ),
        },
        {
          id: "leadership",
          title: "Leadership",
          content: (
            <ul>
              {LEADERSHIP.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong>, {p.role}
                </li>
              ))}
            </ul>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          content: (
            <p>
              Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or follow ReguLattice on{" "}
              <a
                href="https://www.linkedin.com/company/regulattice/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          ),
        },
      ]}
      references={[]}
      related={[
        {
          to: "/ai-governance-platform",
          label: "What is an AI governance platform?",
          text: "Capabilities, alternatives and how to evaluate a platform.",
        },
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
      ]}
      cta={{
        title: "See the ReguLattice AI governance platform",
        text: "Book a technical demo to see AI discovery, risk assessment, runtime monitoring and evidence in your own environment.",
        button: "Book a technical demo",
        requestType: "Schedule Technical Demo",
      }}
    />
  );
}
