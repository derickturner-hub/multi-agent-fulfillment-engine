# Command: /jnm-gbp (Generate and Schedule GBP Post Batch)

## Trigger & Context
- **Command:** `/jnm-gbp`
- **Subagent:** `seo`
- **Domain Rules:** `domains/seo/rules.md`
- **Data Contract:** `domains/seo/schema.json`

---

## Execution Protocol

### Step 1: Rule Pack Ingestion & Context Setup
1. Ingest `domains/seo/rules.md` and `domains/content/rules.md`.
2. Retrieve targeted GBP primary category, promotion offers, or service highlights from `clients/[client-slug]/strategy/seo-plan.md`.

### Step 2: Post Batch Generation Rules
- **Batch Size:** Generate exactly 4 distinct posts per execution batch (one for each week of the month).
- **Body Text Restrictions:**
  - Zero raw phone numbers allowed in post body copy (`status: fail`).
  - Zero raw URLs allowed in post body copy (`status: fail`).
  - Zero emojis or em dashes (`—`) (`status: fail`).
- **Call To Action (CTA) Isolation:**
  - All phone contact must be mapped strictly to the native GBP `CALL` CTA button.
  - All website links must be passed as clean URI strings in the `cta_url` schema field using native buttons (`BOOK`, `LEARN_MORE`, `OFFER`).

### Step 3: Phase 7 QA Checklist Execution & GHL Dispatch
Run each generated post payload through the QA checklist before sending to GoHighLevel (GHL) or saving:
```bash
node content-review/lib/qaChecklist.js --slug=[client-slug] --type=gbp --file=[path-to-post-batch]
