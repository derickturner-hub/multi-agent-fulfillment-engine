# Command: /jnm-gsc-triage (Google Search Console Performance Triage)

## Trigger & Context
- **Command:** `/jnm-gsc-triage`
- **Subagent:** `seo`
- **Domain Rules:** `domains/seo/rules.md`
- **Data Contract:** `domains/seo/schema.json`

---

## Execution Protocol

### Step 1: Rule Ingestion & GSC Data Retrieval
1. Ingest `domains/seo/rules.md` and `domains/keyword-research/rules.md`.
2. Retrieve top URL performance queries, impression drops, and position metrics from Google Search Console API or `clients/[client-slug]/seo/gsc-raw.json`.

### Step 2: Categorization & Bucket Rules
Categorize target URLs into exactly four JSON schema-backed buckets:
- **`fix_now`:** Impression/click drops > 30% month-over-month, indexing errors, or canonical mismatches.
- **`improve`:** Striking-distance keywords (Positions 11–20) with high impression volume requiring content/link refreshes.
- **`rebuild`:** Legacy URL structures requiring complete structural/intent overhauls and 301 mappings.
- **`monitor`:** Stable top-performing routes requiring no immediate modification.

### Step 3: Reporting & Action Item Escalation
1. Output payload formatted against `domains/seo/schema.json` to `clients/[client-slug]/seo/gsc-triage.json`.
2. Append critical `fix_now` items to `issues/issues-log.md`.
3. Log actionable updates to `dashboard/data/[client-slug].json` and alert the Account Manager via Slack DM if high-priority drops are flagged.
