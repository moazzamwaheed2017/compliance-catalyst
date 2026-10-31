/**
 * Single source of truth for the ReguLattice entity: descriptions, facts, page metadata and
 * Schema.org structured data. Search engines and AI answer engines should see the same
 * description of ReguLattice everywhere, so reuse these constants instead of rewording them.
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

/** The category ReguLattice belongs to. Never describe it as a generic GRC, cybersecurity, KYC or AML tool. */
export const CATEGORY = "AI governance platform";
export const CORE_MESSAGE = "You can't govern AI you don't know exists.";

/** Preferred company description. Use verbatim on the site and on every external profile. */
export const ENTITY_DEFINITION =
  "ReguLattice is an AI-native governance platform that helps organizations discover, assess, govern, monitor, and improve AI systems and AI agents.";

/** One-sentence expansion that follows the definition where there is room. */
export const ENTITY_EXPANSION =
  "It finds shadow AI, keeps people in charge of high-risk AI decisions, and maintains live, audit-ready evidence mapped to ISO/IEC 42001, the NIST AI RMF and the EU AI Act.";

export const HOME_TITLE = "AI Governance Platform for AI Systems & Agents | ReguLattice";
export const HOME_DESCRIPTION =
  "AI governance platform to discover shadow AI, assess AI risk, govern AI agents and keep audit-ready evidence for ISO 42001, NIST AI RMF and the EU AI Act.";

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

/** Topics the organization is an authority on (Schema.org `knowsAbout`). */
export const KNOWS_ABOUT = [
  "AI governance",
  "AI risk management",
  "AI compliance",
  "AI agent governance",
  "Shadow AI",
  "AI inventory",
  "ISO/IEC 42001",
  "NIST AI Risk Management Framework",
  "EU Artificial Intelligence Act",
];

/** Structured facts shown on /about and mirrored in llms.txt. */
export const ENTITY_FACTS: { label: string; value: string }[] = [
  { label: "Name", value: "ReguLattice" },
  { label: "Category", value: "AI governance platform" },
  { label: "Description", value: ENTITY_DEFINITION },
  {
    label: "Who it is for",
    value:
      "Organizations deploying AI systems and AI agents, and the teams accountable for them: compliance, risk, security (CISOs), internal audit, and AI and engineering leaders.",
  },
  {
    label: "Problem it solves",
    value:
      "Lack of visibility, risk assessment, governance, monitoring and evidence across an organization's use of AI, including AI adopted without approval (shadow AI).",
  },
  { label: "How it works", value: "Discover → Assess → Govern → Monitor → Improve" },
  {
    label: "Frameworks mapped",
    value: "ISO/IEC 42001, NIST AI RMF 1.0 and the EU AI Act",
  },
  {
    label: "Deployment",
    value:
      "Local-first: can run on the customer's own infrastructure with locally hosted AI models, and connect to cloud AI providers.",
  },
  { label: "Website", value: SITE_URL.replace("https://", "") },
  { label: "Contact", value: CONTACT_EMAIL },
];

/** Content pages, used for navigation, the footer, the sitemap and llms.txt. */
export const CONTENT_PAGES = [
  { path: "/ai-governance-platform", label: "AI governance platform" },
  { path: "/shadow-ai", label: "Shadow AI governance" },
  { path: "/ai-agent-governance", label: "AI agent governance" },
  { path: "/about", label: "About ReguLattice" },
];

export type Faq = { q: string; a: string };

/** Rendered visibly on the homepage and mirrored in FAQPage structured data. */
export const HOME_FAQS: Faq[] = [
  {
    q: "What is an AI governance platform?",
    a: "An AI governance platform is software that gives an organization one place to see, assess and control the AI systems it builds, buys and uses. It typically covers an AI inventory, risk assessment, policies and controls, monitoring after deployment, and the evidence that auditors and regulators ask for. ReguLattice is an AI-native governance platform built around that full lifecycle: discover, assess, govern, monitor and improve.",
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

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#software`;

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: LOGO_URL },
    email: CONTACT_EMAIL,
    description: ENTITY_DEFINITION,
    slogan: CORE_MESSAGE,
    knowsAbout: KNOWS_ABOUT,
    sameAs: SOCIAL_PROFILES,
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: CONTACT_EMAIL },
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: HOME_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

function softwareNode() {
  return {
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: `${SITE_NAME} AI Governance Platform`,
    alternateName: SITE_NAME,
    url: `${SITE_URL}/`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: CATEGORY,
    operatingSystem: "Web, self-hosted",
    description: `${ENTITY_DEFINITION} ${ENTITY_EXPANSION}`,
    featureList: FEATURES,
    publisher: { "@id": ORG_ID },
  };
}

function faqNode(id: string, faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Schema.org JSON-LD graph for the homepage. */
export function homeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      softwareNode(),
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        isPartOf: { "@id": SITE_ID },
        about: { "@id": APP_ID },
        primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
        inLanguage: "en",
      },
      faqNode(`${SITE_URL}/#faq`, HOME_FAQS),
      demoVideoNode(),
    ],
  };
}

/** The product walkthrough video shown on the homepage (#watch) and /shadow-ai. */
export function demoVideoNode() {
  return {
    "@type": "VideoObject",
    "@id": `${SITE_URL}/#demo-video`,
    name: "How shadow AI enters your company, and how ReguLattice governs it",
    description:
      "A 78-second walkthrough of ReguLattice: shadow AI arrives through browser tabs, developer tools, local models and company sign-ins; ReguLattice collects every sighting into one review queue where a person approves or blocks each tool, and endpoint agents enforce the decision.",
    thumbnailUrl: `${SITE_URL}/shadow-ai-demo-poster.jpg`,
    contentUrl: `${SITE_URL}/shadow-ai-demo.mp4`,
    uploadDate: "2026-10-31",
    duration: "PT1M18S",
    publisher: { "@id": ORG_ID },
    about: { "@id": APP_ID },
    inLanguage: "en",
  };
}

export type ContentPageMeta = {
  path: string;
  title: string;
  description: string;
  h1: string;
  breadcrumb: string;
  /** "about" renders an AboutPage; everything else an Article on a WebPage. */
  kind: "about" | "article";
  datePublished: string;
  dateModified: string;
  faqs: Faq[];
};

/** Schema.org JSON-LD graph for a content page (pillar guide or About). */
export function contentPageStructuredData(page: ContentPageMeta) {
  const url = `${SITE_URL}${page.path}`;
  const graph: Record<string, unknown>[] = [
    organizationNode(),
    websiteNode(),
    softwareNode(),
    {
      "@type": page.kind === "about" ? "AboutPage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": page.kind === "about" ? ORG_ID : APP_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: page.breadcrumb, item: url },
      ],
    },
  ];
  if (page.kind === "article") {
    graph.push({
      "@type": "Article",
      "@id": `${url}#article`,
      headline: page.h1,
      description: page.description,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      datePublished: page.datePublished,
      dateModified: page.dateModified,
      image: OG_IMAGE,
      inLanguage: "en",
    });
  }
  if (page.faqs.length) graph.push(faqNode(`${url}#faq`, page.faqs));
  return { "@context": "https://schema.org", "@graph": graph };
}

/** Title, description, canonical and social tags for a route's head(). */
export function pageHead(page: { path: string; title: string; description: string }) {
  const url = `${SITE_URL}${page.path}`;
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: url },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Serialize JSON-LD safely for inline <script> tags. */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
