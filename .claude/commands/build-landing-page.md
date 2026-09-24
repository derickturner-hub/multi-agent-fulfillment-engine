# Command: /jnm-new-site (Build & Provision Site Landing Pages)

## Trigger & Context
- **Command:** `/jnm-new-site`
- **Subagent:** `webdesign`
- **Domain Rules:** `domains/webdesign/rules.md`
- **Data Contract:** `domains/webdesign/schema.json`

---

## Execution Protocol

### Step 1: Rule Ingestion & Pre-Flight Platform Verification
1. Ingest `domains/webdesign/rules.md` and `domains/seo/rules.md`.
2. Execute physical header inspection using `curl -sI [target-domain]` to confirm CMS architecture (WordPress vs Webflow).
3. Confirm active SSL certificate and DNS configuration before proceeding.

### Step 2: Build & Inspection Guardrails
- **No-Jargon / No-Emoji Mandate:** Content modules must adhere strictly to direct, fluff-free language. Emojis and em dashes are forbidden.
- **Visual Asset Verification:** Open and inspect all uploaded featured images and hero media manually to ensure no competitor logos, watermark badges, or mobile app timestamp overlays exist.
- **Schema Validation:** Embed clean `LocalBusiness` / `WebPage` JSON-LD schema into header code blocks. Run `curl -s [url] | grep application/ld+json` to verify live rendering.
- **301 Mapping:** Ensure 1:1 legacy page mapping exists in `clients/[client-slug]/webdesign/redirects.json` if replacing an existing page structure.

### Step 3: Pre-Flight QA Gate Execution
Run mechanical check before deploying live or removing staging flags:
```bash
node content-review/lib/qaChecklist.js --slug=[client-slug] --type=city_page --file=[path-to-rendered-html]
