# ReguLattice Entity & LLM Discoverability Playbook

_Last updated: 8 October 2026. Companion to [SEO-STRATEGY.md](./SEO-STRATEGY.md)._

**Objective:** search engines and AI systems should independently understand and accurately describe **ReguLattice — AI Governance Platform**.

No one can guarantee that ChatGPT, Claude, Gemini, Grok, DeepSeek, Perplexity or any other system will mention ReguLattice. What we *can* do is make accurate information easy to find, consistent everywhere, and corroborated by independent, reputable sources. Everything in this playbook is a legitimate signal. Never create fake reviews, customers, citations, mentions or profiles.

---

## 1. The canonical entity record

Use these exact strings everywhere. The source of truth in code is `src/lib/seo.ts`.

| Field | Value |
|---|---|
| Name | ReguLattice (capital R, capital L, one word) |
| Category | AI governance platform |
| One-sentence description | ReguLattice is an AI-native governance platform that helps organizations discover, assess, govern, monitor, and improve AI systems and AI agents. |
| Expansion (when there's room) | It finds shadow AI, keeps people in charge of high-risk AI decisions, and maintains live, audit-ready evidence mapped to ISO/IEC 42001, the NIST AI RMF and the EU AI Act. |
| Core message | You can't govern AI you don't know exists. |
| Workflow | Discover → Assess → Govern → Monitor → Improve |
| Audience | Organizations deploying AI systems and AI agents; compliance, risk, security (CISOs), internal audit, AI and engineering leaders |
| Frameworks mapped | ISO/IEC 42001, NIST AI RMF 1.0, EU AI Act |
| Website | https://www.regulattice.com |
| Contact | info@regulattice.com |

**Never describe ReguLattice as:**
- a generic GRC platform
- a cybersecurity platform
- a compliance automation tool
- a KYC or AML platform
- a "data plane" (an older description)

Find and update any old copy that still uses those terms: LinkedIn, pitch decks, directory listings, event bios, application forms.

### Ready-to-paste boilerplate

**Tagline (≤ 120 characters):**
> AI governance platform: discover, assess, govern, monitor and improve AI systems and AI agents.

**50 words:**
> ReguLattice is an AI-native governance platform that helps organizations discover, assess, govern, monitor, and improve AI systems and AI agents. It finds shadow AI, keeps people in charge of high-risk AI decisions, and maintains live, audit-ready evidence mapped to ISO/IEC 42001, the NIST AI RMF and the EU AI Act.

**100 words:**
> ReguLattice is an AI-native governance platform that helps organizations discover, assess, govern, monitor, and improve AI systems and AI agents. Built on the principle that you can't govern AI you don't know exists, ReguLattice builds a live inventory of models, AI tools and agents, including shadow AI, and assesses each system's risk. It applies policies and controls mapped to ISO/IEC 42001, the NIST AI RMF and the EU AI Act, routes high-risk AI actions to human approvers, and monitors AI at runtime. Evidence is verified and tracked for freshness, so compliance status reflects reality. ReguLattice can run on the customer's own infrastructure.

---

## 2. External profiles (in priority order)

Fill every field with the canonical record. Link each profile back to `https://www.regulattice.com`, and add each profile URL to `SOCIAL_PROFILES` in `src/lib/seo.ts` (this feeds the `sameAs` field in the structured data).

| Profile | What to set | Notes |
|---|---|---|
| **LinkedIn company page** | Tagline above; About = 100-word boilerplate; Industry: Software Development; Specialties: AI governance, AI risk management, AI compliance, AI agent governance, shadow AI, AI inventory, ISO 42001, NIST AI RMF, EU AI Act | Post consistently. LinkedIn is a primary source for AI systems describing companies |
| **Founder LinkedIn profiles** | Headline e.g. "Co-founder & CTO, ReguLattice — AI governance platform"; Experience entry uses the one-sentence description | Keep founder details off the website unless you decide otherwise |
| **Crunchbase** | Description, categories (Artificial Intelligence, Compliance, Risk Management, SaaS), founders, website | Widely used as a reference for company facts |
| **GitHub organization** (`regulattice`) | Org description = one sentence; README with the canonical record | Publish genuinely useful open material, e.g. the framework crosswalk in §4 |
| **G2 and Capterra** | List under AI governance and related categories | Only invite **real** customers or users to review |
| **Product Hunt** | Launch with a real product demo | One-time visibility spike and a lasting profile |
| **Wellfound / F6S** | Company profile | Startup ecosystem signal |
| **Incubator & program pages** | Ask NIC Pakistan / Ignite and any accelerator to use the canonical description | High-trust, independent references |
| **OECD.AI Catalogue of Tools & Metrics for Trustworthy AI** | Submit ReguLattice if it meets their criteria | Authoritative, independent and topically exact |
| **IAPP** | Explore vendor listings and AI governance community content | The professional body for privacy and AI governance practitioners |
| **Wikidata / Wikipedia** | Only after independent, reputable coverage exists. Never write your own Wikipedia article (conflict of interest) | Premature entries get deleted |

---

## 3. How each platform finds information

| Platform | Main signals you can influence |
|---|---|
| Google Search, AI Overviews, AI Mode, Gemini | Google's index: Search Console, sitemap, structured data, quality content, backlinks |
| Bing, Microsoft Copilot | Bing's index: Bing Webmaster Tools, sitemap. Consider IndexNow so new pages are picked up quickly |
| ChatGPT (search) | Uses web search results and OpenAI's crawlers. Bing visibility and an open robots.txt help |
| Claude | Uses web search and Anthropic's crawlers; reputable third-party mentions help |
| Perplexity | Uses its own crawler and web search; values clear, well-sourced pages |
| Grok | Uses web and X (Twitter) content; keep an active, accurate X presence |
| DeepSeek and others | Use general web data and search; benefit from the same consistent signals |

`robots.txt` allows all crawlers on public pages (including AI search crawlers) and blocks only `/api/`. `llms.txt` gives AI tools a clean summary. Keep both updated as pages are added.

Facts a model learned in training reflect the web at its cutoff date. The only legitimate way to improve them is consistent, accurate, widely corroborated information over time.

---

## 4. Original, citable authority

AI systems and journalists cite sources that publish **original** information. Candidate assets, each with a published methodology:

1. **Open framework crosswalk:** an ISO/IEC 42001 ↔ NIST AI RMF ↔ EU AI Act mapping published on GitHub and the website under an open license. It's useful to practitioners and naturally linkable. Have your compliance advisor review it.
2. **Evidence freshness study:** how quickly AI compliance evidence goes stale. Use only consented, anonymized data, and state the sample size, period and definitions.
3. **Shadow AI in developer tools:** a survey or measurement of coding-assistant and agent usage versus approved tools. Publish the questionnaire, the sample and its limitations.
4. **AI governance in Pakistan and the Gulf:** a regional readiness report where little authoritative content exists.
5. **AI governance maturity self-assessment:** a free, ungated checklist mapped to the Discover → Improve lifecycle.

**Rules for every statistic:**
- name the source
- describe the method, the sample and the date
- separate findings from interpretation
- publish limitations
- never round up or extrapolate beyond the data

---

## 5. Earned mentions

- **Expert commentary:** answer journalist requests on AI governance, the EU AI Act and agent risk, in your own name as a founder.
- **Talks and podcasts:** pitch talks on concrete topics ("Why AI compliance evidence expires", "Governing coding agents"). Ask organizers to use the canonical bio and link to the website.
- **Guest articles:** technical explainers for AI governance, security and compliance publications.
- **Partner pages:** ISO/IEC 42001 auditors and consultancies who genuinely work with ReguLattice.

---

## 6. Measuring LLM understanding (monthly)

Ask each platform (ChatGPT, Claude, Gemini, Copilot, Perplexity, Grok, DeepSeek, Google AI Mode) the same questions in a fresh session, and log the answers in a spreadsheet:

1. What is ReguLattice?
2. What category of software is ReguLattice?
3. What are AI governance platforms?
4. What software can help with AI governance?
5. How can an enterprise govern AI agents?
6. How can I manage shadow AI?
7. What tools support ISO 42001 AI governance?
8. What are alternatives to traditional GRC for AI governance?

**Record for each answer:**
- Is ReguLattice mentioned?
- Is the category correct?
- Are any facts wrong?
- Which sources are cited?

**When an answer is wrong:**
- Fix the source it relied on: update the site or the outdated profile, or publish a clarifying page.
- Never try to manipulate the model directly.

---

## 7. Content checklist for every new page

- [ ] Clear definition in the first 1–2 sentences (the "Short answer" box)
- [ ] Problem → why it matters → how it works → examples → risks → frameworks → implementation → ReguLattice's approach → FAQ → references
- [ ] Only supported capabilities; roadmap labeled as roadmap
- [ ] Primary sources cited (ISO, NIST, EUR-Lex, OWASP, OECD, UNESCO)
- [ ] Uses `ContentPage` (`src/components/site/content-page.tsx`), so structured data, breadcrumbs, canonical and Open Graph tags are automatic
- [ ] Added to `CONTENT_PAGES` in `src/lib/seo.ts`, `public/sitemap.xml` and `public/llms.txt`
- [ ] Linked from at least two existing pages
