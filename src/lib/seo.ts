/**
 * Single source of truth for ReguLattice SEO metadata and Schema.org structured data.
 *
 * Only state capabilities that ReguLattice actually supports. Do not add certifications,
 * customers, ratings or compliance claims here unless they are verified.
 */

/** Canonical origin. Keep in sync with the primary domain configured in Vercel. */
export const SITE_URL = "https://www.regulattice.com";
export const SITE_NAME = "ReguLattice";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/regulattice-logo.jpg`;
export const CONTACT_EMAIL = "info@regulattice.com";
export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/regulattice/",
  "https://www.instagram.com/regulattice/",
];

export const HOME_TITLE = "AI Governance Platform for AI Systems & Agents | ReguLattice";
export const HOME_DESCRIPTION =
  "AI governance platform to discover shadow AI, assess AI risk, govern AI agents and keep audit-ready evidence for ISO 42001, NIST AI RMF and the EU AI Act.";

/** Concise entity definition reused in the hero, structured data and llms.txt. */
export const ENTITY_DEFINITION =
  "ReguLattice is an AI governance platform that helps organizations discover, assess, govern, monitor and improve the AI systems and AI agents they use, including shadow AI, with live evidence mapped to ISO/IEC 42001, the NIST AI RMF and the EU AI Act.";

export const SUPPORTED_FRAMEWORKS = [
  "ISO/IEC 42001",
  "NIST AI Risk Management Framework (AI RMF 1.0)",
  "EU Artificial Intelligence Act",
];

export const FEATURES = [
  "AI inventory and AI system discovery",
  "Shadow AI discovery",
  "AI risk assessment and risk classification",
  "AI policy and control management",
  "AI agent governance with human sign-off for high-risk actions",
  "Runtime monitoring of AI systems and AI agents",
  "Evidence-based compliance with two-pass evidence verification",
  "Evidence freshness tracking",
  "Framework mapping to ISO/IEC 42001, NIST AI RMF and the EU AI Act",
  "Audit evidence generation",
  "AI system ownership and risk-owner visibility",
  "Local-first deployment on customer infrastructure with local AI models",
];

export type Faq = { q: string; a: string };

/** Rendered visibly on the homepage and mirrored in FAQPage structured data. */
export const HOME_FAQS: Faq[] = [
  {
    q: "What is an AI governance platform?",
    a: "An AI governance platform is software that gives an organization one place to see, assess and control the AI systems it builds, buys and uses. It typically covers an AI inventory, risk assessment, policies and controls, monitoring after deployment, and the evidence that auditors and regulators ask for. ReguLattice is an AI governance platform built around that full lifecycle: discover, assess, govern, monitor and improve.",
  },
  {
    q: "Why do organizations need AI governance?",
    a: "AI is adopted faster than it can be reviewed. Teams connect new models, AI tools and agents without approval, models change after deployment, and compliance evidence goes out of date. At the same time, regulations such as the EU AI Act, standards such as ISO/IEC 42001 and enterprise customers increasingly expect organizations to show how their AI is controlled. AI governance answers that with records rather than assumptions.",
  },
  {
    q: "How is AI governance different from traditional GRC?",
    a: "Traditional GRC tools manage policies, risks and controls for IT and business processes, usually through periodic assessments. AI governance adds what those tools were not designed for: discovering AI systems and agents, assessing AI-specific risks such as drift, bias and hallucination, monitoring behavior at runtime, and keeping people accountable for AI-driven decisions. ReguLattice focuses specifically on that AI layer.",
  },
  {
    q: "How does ReguLattice discover shadow AI?",
    a: "ReguLattice builds an AI inventory by connecting to the places where AI is used: model provider APIs such as OpenAI, Anthropic and Google Gemini, local runtimes such as Ollama, code repositories, and developer tools such as Claude Code and Cursor. AI that is in use but not registered or approved is flagged as shadow AI, so it can be given an owner, assessed and brought under policy.",
  },
  {
    q: "How does ReguLattice govern AI agents?",
    a: "ReguLattice records what AI agents do at runtime, including their tool calls, and checks actions against deterministic policy rules. High-risk actions can be held and routed to designated people for sign-off before they proceed, and every decision is logged together with its evidence so it can be reviewed later.",
  },
  {
    q: "How does ReguLattice support ISO/IEC 42001?",
    a: "ReguLattice maps AI inventory records, runtime telemetry and documents to ISO/IEC 42001 controls, verifies that each piece of evidence actually supports its control, and tracks how current the evidence is. This helps teams prepare for an ISO/IEC 42001 audit. ReguLattice does not certify organizations; certification is issued by accredited certification bodies.",
  },
  {
    q: "Which AI frameworks and regulations does ReguLattice map to?",
    a: "ReguLattice currently maps controls and evidence to ISO/IEC 42001, the NIST AI Risk Management Framework (AI RMF 1.0) and the EU AI Act. A single piece of evidence can be linked to matching requirements in more than one framework.",
  },
  {
    q: "Can ReguLattice run on our own infrastructure?",
    a: "Yes. ReguLattice is designed to be local-first. It can be deployed in your own environment and use locally hosted AI models, so governance data can stay inside your infrastructure. It can also connect to cloud AI providers.",
  },
];

/** Schema.org JSON-LD graph for the homepage. */
export function homeStructuredData() {
  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;
  const appId = `${SITE_URL}/#software`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: { "@type": "ImageObject", url: LOGO_URL },
        email: CONTACT_EMAIL,
        description: ENTITY_DEFINITION,
        sameAs: SOCIAL_PROFILES,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT_EMAIL,
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: HOME_DESCRIPTION,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": appId,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "AI governance platform",
        operatingSystem: "Web, self-hosted",
        description: ENTITY_DEFINITION,
        featureList: FEATURES,
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        isPartOf: { "@id": siteId },
        about: { "@id": appId },
        primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: HOME_FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** Serialize JSON-LD safely for inline <script> tags. */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
