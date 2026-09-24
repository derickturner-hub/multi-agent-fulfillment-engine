# Domain Rules: Editorial Content & Brand Voice

## Scope & Ownership
- **Owner:** `content` domain rules.
- **Dispatch Reality:** `.claude/agents/content.md` is live and directly dispatches editorial blogs (`/jnm-blog`). The `/jnm-city-page` skill's rules and specifications are owned by this domain, but its execution dispatch remains integrated with `webdesign` for pipeline continuity.
- **Primary Deliverables:** Long-form editorial articles, localized city/service pages, content refreshes, and brand voice alignment assets.

---

## Brand & Compliance Rules (All Content Types)

### 1. Formatting & Stylistic Hard Constraints
- **No Emojis:** Zero emojis in client-facing output.
- **No Em Dashes:** Never use em dashes (`—`). Rewrite sentences naturally using commas, colons, periods, or standard conjunctions (`and`, `but`).
- **No Hardcoded Phone Numbers:** Never insert a client's hardcoded phone number into body copy or call-to-action text (tracking numbers vary). Use text-based CTAs and allow the live site's dynamic call-tracking header to handle telecommunication routing.
- **No Internal Jargon Leaks:** Never copy internal analytics terminology into client-facing text (e.g., "Search Volume," "KD," "HQ Priority," "Below Reporting Threshold").

### 2. Internal Linking & Regex Audit Standard
- **Distribution:** Spread internal contextual links naturally throughout the body content. Do not cluster links within a single paragraph or section.
- **Target Selection:** Contextual links must point to top-level service or city pages rather than narrow sub-pages, unless the anchor text explicitly names the specific sub-page.
- **Regex Audit Requirement:** Prior to finalizing internal link targets, extract and audit real internal link counts directly from `post_content` and `_elementor_data` using regex. Prioritize linking to thin, under-linked pages over already heavily linked pages. Header/footer sitewide navigation links must be evaluated separately from contextual body links.

---

## Content Structure & Heading Semantics

### 1. Heading Hierarchy & FAQ Rules
- **Title vs. H1 Distinction:** Meta `<title>` tags must differ meaningfully from the primary `<h1>` heading (not a simple substring or superstring).
- **H1 Requirements:** Include the primary keyword naturally within a question, benefit statement, or value proposition.
- **Heading Cascades:** `<h1>` must be immediately followed by a body intro and a real `<h2>` heading (for blogs, the required `"Key Takeaways"` section; for city pages, an explicit `<h2>`).
- **FAQ Heading Semantics:** FAQ questions must be formatted as proper `<h3>` or `<h4>` headings. Never style bolded paragraph text as fake headings.
- **Anti-Reskinning Rule for FAQs:** Sibling pages (e.g., city page variants or multiple refreshes for the same client) must feature location-grounded, distinct FAQ sets. Swapping only the city name across identical FAQ questions is strictly prohibited.

### 2. Skill Specifications

#### Editorial Blogs (`/jnm-blog`)
- **Word Count:** 1,500 – 2,000 words.
- **Format:** Native HTML body markup (`<h2>`, `<h3>`, `<p>`, `<ul>`/`<ol>`), not Markdown syntax.
- **Intro & Key Takeaways:** Answer-first intro (first 2 sentences directly address the main topic). Immediately followed by a `"Key Takeaways"` `<h2>` block containing 3–4 bullet points with specific claims.
- **Required Sections:** 3–5 search-intent FAQ questions formatted with matching `FAQPage` JSON-LD schema.
- **Internal Links:** Minimum 2 city pages + 2 service pages (verified live targets).

#### City & Service Pages (`/jnm-city-page`)
- **Word Count:** 1,800 – 2,200 words.
- **Structure:** 7–11 `<h2>` sections with detailed `<h3>` subsections breaking down services, materials, and local considerations.
- **Gap Verification:** Must be independently verified as a confirmed real gap on the live site before drafting.
- **Internal Links:** Minimum 4–6 contextual links to live, verified URLs.
- **Schema & CTAs:** Dedicated local CTA section. Synchronized `LocalBusiness`/`Service` and `FAQPage` JSON-LD schema.

---

## QA Gate & Self-Correction Protocol
- All drafted content must run through `content-review/lib/qaChecklist.js` prior to scheduling or saving.
- If a draft yields a `status: 'fail'`, execute up to 3 targeted revisions focusing strictly on the failed check details before finalizing or escalating.
