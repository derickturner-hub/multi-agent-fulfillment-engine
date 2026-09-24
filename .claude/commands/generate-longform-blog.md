# Command: /jnm-blog (Generate Editorial Blog Content)

## Trigger & Context
- **Command:** `/jnm-blog`
- **Subagent:** `content`
- **Domain Rules:** `domains/content/rules.md`
- **Data Contract:** `domains/content/schema.json`

---

## Execution Protocol

### Step 1: Rule Pack Ingestion & Pre-Flight Verification
Before generating content, execute the following pre-flight checks:
1. Read and ingest `domains/content/rules.md` and `domains/keyword-research/rules.md`.
2. Confirm target keyword and topic details from `clients/[client-slug]/strategy/keyword-research.md`.
3. Verify that competitor teardown insights exist for the target keyword. If missing, flag for `keyword-research` input before proceeding.

### Step 2: Content Drafting Rules
- **Word Count Target:** Exactly 1,500–2,000 words.
- **Tone:** Professional, direct, authoritative. No fluff, no clichés, no corporate filler.
- **Formatting Constraints:**
  - Zero emojis (`status: fail`).
  - Zero em dashes (`—`) (`status: fail`).
  - No hardcoded review counts or star ratings unless sourced live (100+ threshold rule).
  - Include an introductory paragraph of at least 40 words before the first `<h2>` (`real_intro`).
  - Include lead-in intro sentences before any bulleted/numbered lists following an `<h2>` (`h2_intro_before_list`).
  - End with a clear summary or call-to-action section (`closing_cta`).
- **Internal Links:** Include 2+ verified links to city/service pages using regex matching (`/href=["']([^"']+)["']/g`).
- **Heading Hierarchy:** Mandatory `<h1>` (different from `<title>`), cascading cleanly to `<h2>` and `<h3>`. FAQs must use native `<h3>` tags.

### Step 3: Phase 7 QA Checklist Execution
Before writing output files or finalizing payloads, run the generated draft through the programmatic QA gate:
```bash
node content-review/lib/qaChecklist.js --slug=[client-slug] --type=blog --file=[path-to-draft]
