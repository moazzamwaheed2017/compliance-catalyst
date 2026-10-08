# ReguLattice SEO, GEO & Content Strategy

_Last updated: 8 October 2026. Owner: ReguLattice marketing._

**Goal:** make ReguLattice a credible, citable authority on AI governance, AI risk management, AI compliance, AI agent governance, ISO/IEC 42001, NIST AI RMF and EU AI Act readiness, and turn that traffic into qualified enterprise demo requests.

**Positioning:** ReguLattice is an **AI governance platform**, not a generic cybersecurity or GRC tool.
Core message: **"You can't govern AI you don't know exists."**
Workflow: **Discover → Assess → Govern → Monitor → Improve.**

**Claims policy (applies to every page):** state only what ReguLattice supports today. Supported framework mapping is **ISO/IEC 42001, NIST AI RMF 1.0 and the EU AI Act**. Do not say ReguLattice is certified, "compliant", or provides assurance. Do not invent customers, logos, statistics, partnerships or ratings. ISO/IEC 23894, ISO/IEC 38507, the OECD AI Principles and UNESCO's AI ethics Recommendation are used for **educational content only** until product mapping exists. Label roadmap features as roadmap.

---

## 1. Summary

| | |
|---|---|
| **Biggest problem** | regulattice.com does not appear to be indexed. A `site:regulattice.com` search returned no pages (8 Oct 2026). Confirm in Google Search Console. |
| **Second problem** | The site is a single page. There is nowhere to rank for "AI governance", "ISO 42001", "shadow AI", etc. beyond the homepage. |
| **Fixed in code (this change)** | Sitemap, robots.txt, canonical URL, full Open Graph/Twitter metadata with a share image, Schema.org structured data, real PNG favicons, `llms.txt`, keyword-led title, description and H1, "How it works" lifecycle section, visible FAQ, unsupported claims removed or corrected. |
| **Next 30 days** | Fix the domain and indexing setup, then build the AI Governance Platform, ISO/IEC 42001, Shadow AI and AI Agent Governance pages, plus About and Privacy pages. |

---

## 2. Audit findings

Status key: ✅ fixed in this change · 🔧 you need to do it (outside the code) · 📝 content to create.

| # | SEO issue | Why it matters | Priority | Recommended fix | Status |
|---|---|---|---|---|---|
| 1 | Site appears not indexed | No organic traffic is possible until Google indexes the site | **Critical** | Verify the domain in Google Search Console and Bing Webmaster Tools, submit `https://www.regulattice.com/sitemap.xml`, then request indexing of the homepage | 🔧 |
| 2 | Primary domain unclear (`regulattice.com` and `www.regulattice.com` both used) | Two hosts split ranking signals and can create duplicate content | **Critical** | In Vercel → Domains, make `www.regulattice.com` primary and set `regulattice.com` to **308-redirect** to it. The canonical tag now points to `https://www.regulattice.com/`. If you choose the bare domain instead, change `SITE_URL` in `src/lib/seo.ts`, `public/robots.txt`, `public/sitemap.xml` and `public/llms.txt` | 🔧 |
| 3 | No XML sitemap | Slower discovery of pages | **Critical** | Added `public/sitemap.xml`. Add every new page to it | ✅ |
| 4 | No canonical URL | Duplicate URLs (hosts, tracking parameters) compete with each other | **High** | Canonical `<link>` added on the homepage. Every new route must set its own | ✅ |
| 5 | Title and H1 don't contain the main keyword ("Autonomous GRC Data Plane") | Google and buyers can't tell this is an AI governance platform | **High** | Title: *AI Governance Platform for AI Systems & Agents \| ReguLattice*. H1: *The AI governance platform for every AI system and agent.* | ✅ |
| 6 | No structured data | Search engines and AI answer engines get no explicit entity data | **High** | Added Organization, WebSite, SoftwareApplication, WebPage and FAQPage JSON-LD (`src/lib/seo.ts`) | ✅ |
| 7 | No social preview image, `og:url` or Twitter tags | LinkedIn/X shares show no image, which lowers click-through on your main channel | **High** | Added a 1200×630 `og-image.png` and full Open Graph and Twitter tags | ✅ |
| 8 | Unsupported or inaccurate claims ("SOC 2 Type II event logging", "100% MAPPED", Article 73 described as post-market monitoring, "retention: 10y") | Hurts trust (E-E-A-T) and creates legal risk with compliance buyers | **High** | Removed the SOC 2 and 100% claims. Corrected to **Article 72** (post-market monitoring); Article 73 is serious-incident reporting. Labelled the dashboard as an illustrative product view with sample data | ✅ |
| 9 | No direct answers for AI answer engines (no definition, no FAQ) | ChatGPT, Perplexity and Google AI Overviews quote clear definitions and Q&A | **High** | Added an entity definition in the hero, a Discover → Improve "How it works" section, and 8 visible FAQs mirrored in FAQPage schema | ✅ |
| 10 | Favicon is a JPEG named `.png` and declared as PNG | Some crawlers and browsers reject it, so Google may show a generic icon in results | **Medium** | Generated real PNG icons (48, 180 and 192 px) from the logo shield | ✅ |
| 11 | robots.txt had no sitemap reference and allowed `/api/` | Crawl budget is wasted on API routes, and the sitemap is harder to discover | **Medium** | Added a `Sitemap:` line and `Disallow: /api/`. AI crawlers stay allowed | ✅ |
| 12 | No `llms.txt` | A low-cost, emerging way to give AI agents a clean summary | **Low** | Added `public/llms.txt` | ✅ |
| 13 | Only one page: no pillar, framework, use-case or article pages | You can't rank for non-brand queries | **Critical** | Build the pillar and cluster plan in §4 and §5 | 📝 |
| 14 | No About/Team, Privacy or Terms pages | Enterprise buyers and Google's quality raters look for who is behind the product | **High** | Create `/about` (leadership, expertise, contact, company details), `/privacy` and `/terms` | 📝 |
| 15 | 13 MB of unused MP4s in `/public` (two with spaces in the filename) | Old demo videos remain publicly crawlable, and the repo and deploys carry the extra weight | **Low** | Delete `public/*.mp4` unless you plan to reuse them | 🔧 |
| 16 | Hash-only navigation (`/#faq`) | Fragments are not separate URLs, so they can't rank on their own | **Medium** | Will be solved as content moves to real URLs in §4 | 📝 |
| 17 | Visitor tracking fires twice per homepage view (root layout and homepage) | Inflated analytics lead to wrong conclusions about SEO results | **Low** | Remove the duplicate call in `src/routes/index.tsx` | 🔧 |

**Already good:** server-side rendering (all text is in the HTML Google receives), one H1, HTTPS, mobile-responsive layout, real 404 status for missing pages, `font-display: swap`.

---

## 3. Homepage specification (implemented)

| Field | Value |
|---|---|
| URL | `https://www.regulattice.com/` |
| Primary keyword | AI governance platform |
| Secondary keywords | AI governance software, shadow AI discovery, AI agent governance, AI risk management, AI compliance, ISO 42001, NIST AI RMF, EU AI Act |
| SEO title (60 chars) | AI Governance Platform for AI Systems & Agents \| ReguLattice |
| Meta description (154 chars) | AI governance platform to discover shadow AI, assess AI risk, govern AI agents and keep audit-ready evidence for ISO 42001, NIST AI RMF and the EU AI Act. |
| H1 | The AI governance platform for every AI system and agent. |
| H2s | How AI governance works in ReguLattice · Four AI governance agents. One platform. · AI governance use cases, from shadow AI to AI agents · From AI systems to audit-ready evidence · Mapped to ISO/IEC 42001, NIST AI RMF and the EU AI Act · Govern AI across every model, everywhere it runs · AI governance, answered · Don't just document your AI governance. Prove it. |
| Internal links (once pages exist) | "How it works" → `/ai-governance-platform`; framework cards → `/iso-42001`, `/nist-ai-rmf`, `/eu-ai-act`; shadow AI use case → `/shadow-ai`; agent use case → `/ai-agent-governance`; FAQ answers → matching pillar pages |
| CTAs | Book a technical demo (primary) · Start 14-day sandbox (secondary) |
| GEO | Entity definition is the first paragraph; FAQ answers are 2–4 sentence direct answers; frameworks are named consistently |

---

## 4. Pillar pages

Build in this order (highest business impact first). Each pillar should be 1,800–3,000 words, and include:
- a 40–60 word definition at the top
- a comparison table and a "How ReguLattice helps" section, kept to supported features
- an FAQ
- citations to primary sources (ISO, NIST, EUR-Lex)
- links to 5–10 cluster articles
- a CTA matched to the reader's intent

| # | URL | Primary keyword | SEO title | Meta description | H1 | CTA |
|---|---|---|---|---|---|---|
| 1 | `/ai-governance-platform` | AI governance platform | AI Governance Platform: Features, Use Cases & How to Choose \| ReguLattice | What an AI governance platform does, which capabilities matter (inventory, risk, controls, monitoring, evidence) and how ReguLattice covers the full lifecycle. | What is an AI governance platform? | Request a demo |
| 2 | `/iso-42001` | ISO 42001 compliance | ISO/IEC 42001 Compliance: Requirements, Controls & Software \| ReguLattice | A practical guide to ISO/IEC 42001: AIMS requirements, Annex A controls, audit evidence and how software helps you prepare for certification. | ISO/IEC 42001: a practical guide to AI management system compliance | Start an AI governance assessment |
| 3 | `/shadow-ai` | shadow AI discovery | Shadow AI: How to Discover and Govern Unapproved AI \| ReguLattice | What shadow AI is, why it creates risk, how to discover unapproved AI tools, models and agents, and how to bring them under governance. | Shadow AI: how to find and govern the AI you don't know about | See ReguLattice in action |
| 4 | `/ai-agent-governance` | AI agent governance | AI Agent Governance: Controls, Oversight & Risk Management \| ReguLattice | How to govern AI agents: inventory, permissions, runtime monitoring, human sign-off for high-risk actions and audit trails. | AI agent governance: keeping autonomous AI accountable | Request a demo |
| 5 | `/eu-ai-act` | EU AI Act compliance | EU AI Act Compliance for Enterprises: Obligations & Timeline \| ReguLattice | What the EU AI Act requires of providers and deployers, risk categories, current timelines after the Digital Omnibus, and how to prepare evidence. | EU AI Act compliance: what enterprises need to do | Talk to an AI governance expert |
| 6 | `/nist-ai-rmf` | NIST AI RMF | NIST AI RMF Explained: Govern, Map, Measure, Manage \| ReguLattice | A clear guide to the NIST AI Risk Management Framework, its four functions, profiles, and how to operationalize it with evidence. | The NIST AI Risk Management Framework, explained | Explore AI governance |
| 7 | `/ai-risk-management` | AI risk management | AI Risk Management: Frameworks, Assessment & Monitoring \| ReguLattice | How to identify, assess, treat and monitor AI risk using NIST AI RMF and ISO/IEC 23894, with practical examples. | AI risk management for enterprises | Start an AI governance assessment |
| 8 | `/ai-inventory` | AI inventory | AI Inventory: Build a Complete AI System Register \| ReguLattice | What belongs in an AI system inventory, who owns it, how to keep it current and how it supports ISO 42001 and the EU AI Act. | AI inventory: the foundation of AI governance | See ReguLattice in action |
| 9 | `/ai-compliance` | AI compliance | AI Compliance: Regulations, Standards & Evidence \| ReguLattice | A map of AI regulations and standards (EU AI Act, ISO/IEC 42001, NIST AI RMF, US state laws) and how to keep compliance evidence current. | AI compliance: from requirements to evidence | Request a demo |
| 10 | `/ai-governance` | AI governance | What Is AI Governance? Definition, Frameworks & Examples \| ReguLattice | AI governance explained: definition, principles (OECD, UNESCO), frameworks (ISO/IEC 42001, 38507, NIST AI RMF) and how to build a program. | What is AI governance? | Explore AI governance |

**Internal linking rule:**
- Every cluster article links up to its pillar and across to 2–3 sibling articles.
- Every pillar links to `/ai-governance-platform` and to the homepage "How it works" section.
- Anchor text is descriptive, e.g. "ISO/IEC 42001 Annex A controls", never "click here".

---

## 5. Supporting content clusters

Publish 2–4 articles per month. Prioritize decision-stage and problem-aware searches over high-volume glossary terms. URL pattern: `/resources/<slug>`.

| Cluster (pillar) | Articles (slug → search intent) |
|---|---|
| AI governance (`/ai-governance`) | `what-is-ai-governance` (informational) · `ai-governance-vs-grc` (comparison; strong product fit) · `how-to-build-an-ai-governance-program` (how-to) · `ai-governance-checklist` (template, lead magnet) · `ai-governance-frameworks-explained` (comparison table of ISO/IEC 42001, 23894, 38507, NIST AI RMF, EU AI Act, OECD, UNESCO) |
| Platform (`/ai-governance-platform`) | `ai-governance-software-buyers-guide` (commercial) · `ai-governance-tools-evaluation-criteria` (commercial) · `ai-governance-for-enterprises` |
| ISO/IEC 42001 (`/iso-42001`) | `iso-42001-explained` · `iso-42001-implementation-guide` · `iso-42001-annex-a-controls` · `iso-42001-audit-evidence` · `iso-42001-vs-iso-27001` |
| NIST AI RMF (`/nist-ai-rmf`) | `nist-ai-rmf-explained` · `nist-ai-rmf-playbook-implementation` · `nist-ai-rmf-vs-iso-42001` (crosswalk table) |
| EU AI Act (`/eu-ai-act`) | `eu-ai-act-explained-for-enterprises` · `eu-ai-act-high-risk-ai-systems` · `eu-ai-act-deployer-obligations` · `eu-ai-act-post-market-monitoring-article-72` · `eu-ai-act-timeline` (update whenever the timeline changes) |
| Shadow AI (`/shadow-ai`) | `what-is-shadow-ai` · `how-to-discover-shadow-ai` · `shadow-ai-policy-template` (lead magnet) · `shadow-ai-in-developer-tools` (Claude Code, Cursor, Copilot) |
| AI agents (`/ai-agent-governance`) | `how-to-govern-ai-agents` · `ai-agent-risk-management` · `human-oversight-for-ai-agents` · `ai-agent-audit-trails` |
| AI inventory (`/ai-inventory`) | `ai-inventory-what-it-is` · `ai-system-register-template` |
| Risk (`/ai-risk-management`) | `how-to-assess-ai-risk` · `ai-risk-assessment-template` · `iso-23894-explained` |
| Monitoring & evidence | `how-to-monitor-ai-systems-after-deployment` · `how-to-prepare-ai-audit-evidence` · `evidence-freshness-why-compliance-evidence-expires` (ReguLattice point of view: evidence decay) |
| By role | `ai-governance-for-cisos` · `ai-governance-for-compliance-teams` · `ai-governance-for-risk-teams` · `ai-governance-for-internal-audit` |

**Every article must:**
- answer the search intent in the first 100 words
- cite primary sources: ISO pages, NIST AI 100-1, EUR-Lex for the AI Act
- include a practical example, a table or checklist where useful, and 3+ internal links
- show an author byline with credentials, and the date last reviewed
- end with an intent-matched CTA

**Points of view only ReguLattice can credibly own** (use them to stand out):
- **Evidence decay:** compliance evidence expires, so coverage should drop as evidence ages.
- **Runtime governance** rather than paperwork alone.
- **Local-first governance** for data-residency-sensitive buyers.
- **Governing AI in regions where regulation arrives later**, such as Pakistan and the Gulf.

---

## 6. Programmatic SEO (only where each page has real value)

| Page type | Pattern | Minimum unique value per page |
|---|---|---|
| Framework control pages | `/iso-42001/controls/a-6-2-8` | Plain-English explanation, what evidence satisfies it, common gaps, crosswalk to NIST AI RMF and the EU AI Act, how ReguLattice collects that evidence |
| Industry pages | `/industries/financial-services`, `/insurance`, `/healthcare` | Sector-specific regulations (e.g. model risk guidance, HIPAA), realistic AI use cases, risk examples |
| Use-case pages | `/use-cases/shadow-ai-discovery`, `/use-cases/ai-agent-oversight` | Problem, workflow and outcome, with screenshots of the real product |
| Glossary | `/glossary/<term>` (e.g. AI system, deployer, AIMS, model drift) | 150–300 word definition with source and links to pillars. Group thin terms into one page rather than publishing near-duplicates |

Do not generate pages from keyword lists without expert review. Thin pages can drag down the whole site.

---

## 7. Technical SEO checklist

| Area | Status / action |
|---|---|
| Rendering | ✅ TanStack Start renders HTML on the server. Keep important text out of client-only components |
| Domain & HTTPS | 🔧 Make `www` primary in Vercel and 308-redirect the bare domain (see finding 2) |
| robots.txt | ✅ `public/robots.txt` |
| Sitemap | ✅ `public/sitemap.xml`. When pages grow beyond about 20, generate it from the route list at build time |
| Canonicals | ✅ Homepage. Each new route's `head()` must set its own canonical, title, description and Open Graph tags (reuse `src/lib/seo.ts`) |
| Structured data | ✅ Homepage. Add `Article` and `BreadcrumbList` on articles, `Person` on `/about` for leadership, and FAQPage only where FAQs are visible on the page |
| Metadata | ✅ Unique title and description per page. Title ≤ 60 characters, description ≤ 155 characters |
| Images | Use descriptive `alt` text for informative images and `alt=""` for decorative ones. Serve WebP/AVIF and set width/height to avoid layout shift |
| Core Web Vitals | Check with PageSpeed Insights once live. Watch LCP (hero font loading) and INP (hero animations). Consider self-hosting fonts and lazy-loading below-the-fold animated sections |
| Broken links & redirects | Run a crawl (Screaming Frog or Ahrefs Webmaster Tools, free) monthly. Use 301/308 for any URL changes |
| Monitoring | Google Search Console + Bing Webmaster Tools. Bing also feeds ChatGPT search and Copilot |
| Security headers | Add HSTS and a content security policy in `vercel.json` (good for trust; small indirect SEO benefit) |

---

## 8. E-E-A-T (trust and authority)

- **`/about`:** company story, leadership (name, role, relevant cybersecurity, AI and data science experience, LinkedIn links) with `Person` schema, company location and contact. Use only bios you have approved.
- **Supported vs roadmap:** add a "Platform capabilities" page that labels each feature **Available** or **Roadmap**.
- **Product proof:** real screenshots and a short recorded walkthrough of the actual product (not mockups) on `/ai-governance-platform`.
- **Original research:** e.g. "How quickly does AI compliance evidence go stale?" or a survey on shadow AI in regulated firms in Pakistan and the Gulf. This kind of research is what earns backlinks and AI citations.
- **Case studies:** only with written permission from the customer or design partner. Anonymize if needed and say so.
- **Author pages:** every article has a named author with credentials and a "last reviewed" date.

---

## 9. AI search (GEO / AEO)

- Use **one consistent entity description** everywhere (site, LinkedIn, Crunchbase, G2, Product Hunt, press): the `ENTITY_DEFINITION` in `src/lib/seo.ts`.
- Start each page with a **direct answer** (a 40–60 word definition), then the detail.
- Use **question-style H2s** that match how people ask AI assistants, e.g. "How does ReguLattice support ISO 42001?"
- Add **comparison tables** (AI governance vs GRC; ISO/IEC 42001 vs NIST AI RMF vs EU AI Act). LLMs quote these readily.
- **Cite primary sources.** Answer engines prefer pages that are themselves well sourced.
- Keep `llms.txt` updated as new pages ship.
- Get listed where AI engines look: the **OECD.AI Catalogue of Tools & Metrics for Trustworthy AI**, G2 and Capterra (AI Governance category), Product Hunt, and "AI governance tools" roundups.

---

## 10. Competitive landscape & opportunities

Pages ranking for "best AI governance platform" in 2026 are mostly vendor-written roundups. Platforms that appear often include Credo AI, Holistic AI, IBM watsonx.governance, Trustible, OneTrust, ServiceNow, Modulos, Arthur AI and Fiddler AI ([Openlayer](https://www.openlayer.com/blog/best-ai-governance-software-platforms.md), [Decube](https://www.decube.io/post/ai-governance-tools), [Guideflow](https://www.guideflow.com/blog/ai-governance-tools)). These guides split the market into categories: AI usage governance, model governance, runtime enforcement and monitoring.

**Where ReguLattice can win:**
1. **Category comparison pages** (not attacks on vendors): "AI governance platform vs traditional GRC", "AI governance vs ML monitoring tools", "AI governance vs AI security gateways". State differences factually and without negative claims about named competitors.
2. **Runtime + evidence + humans in one product.** Roundups list runtime enforcement and documentation as separate tool types; ReguLattice does both. Make this the thesis of `/ai-governance-platform`.
3. **Developer AI governance** (Claude Code, Cursor, Copilot): few governance vendors target it. Build `/resources/shadow-ai-in-developer-tools`.
4. **Evidence freshness/decay:** an unclaimed concept. Name it, define it and own the term.
5. **Underserved regions:** Pakistan, the Gulf and other regions where regulation is arriving later. There's little authoritative content, so there's a credible opportunity for original research and region-specific guides.
6. **Mid-market accessibility:** much of the category is sold to large enterprises only. Make transparent packaging visible once you're ready to publish pricing.

**Backlink opportunities:**
- OECD.AI tools catalogue
- incubator and program listings (e.g. NIC Pakistan / Ignite)
- ISO 42001 auditors and compliance consultancies (partner pages)
- AI governance roundups (ask to be included)
- guest posts on AI governance and IAPP-adjacent communities
- conference talk pages
- original-research PR

---

## 11. 90-day roadmap (by business impact)

| When | Actions |
|---|---|
| **Week 1** | Merge this change. Set the primary domain in Vercel. Verify Google Search Console and Bing, submit the sitemap and request indexing. Delete unused MP4s. Create the LinkedIn/Crunchbase/G2 profiles with the same entity description |
| **Weeks 2–4** | Build `/ai-governance-platform`, `/iso-42001`, `/shadow-ai`, `/about`, `/privacy` and `/terms`. Add them to the sitemap and `llms.txt` |
| **Weeks 5–8** | Build `/ai-agent-governance`, `/eu-ai-act` and `/nist-ai-rmf`, plus 6 cluster articles (start with `ai-governance-vs-grc`, `how-to-discover-shadow-ai`, `iso-42001-implementation-guide`, `how-to-govern-ai-agents`) |
| **Weeks 9–12** | Build `/ai-risk-management`, `/ai-inventory`, `/ai-compliance`, `/ai-governance`, the first original research piece and the first industry page (financial services). Start backlink outreach |

**KPIs:**
- indexed pages
- impressions and clicks for non-brand queries (Search Console)
- ranking for the 10 pillar keywords
- AI-answer mentions (spot-check ChatGPT, Perplexity and Google AI Overviews monthly)
- demo requests from organic traffic, and the organic share of pipeline

---

## Sources

- EU AI Act Articles 72 & 73: [activeMind.legal, Article 72](https://www.activemind.legal/legislation/ai-act/article-72/), [Taylor Wessing on serious-incident reporting](https://www.taylorwessing.com/en/insights-and-events/insights/2025/10/eu-ai-act-deep-dive)
- Digital Omnibus timeline changes: [Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/), [CSA research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-omnibus-vii-deadline-delay-20260/). Verify against EUR-Lex before publishing dates.
- Market roundups: [Openlayer](https://www.openlayer.com/blog/best-ai-governance-software-platforms.md), [Decube](https://www.decube.io/post/ai-governance-tools), [Guideflow](https://www.guideflow.com/blog/ai-governance-tools), [Modulos on shadow AI](https://www.modulos.ai/modulos-ai-governance-platform/shadow-ai/)
