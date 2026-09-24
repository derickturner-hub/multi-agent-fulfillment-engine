# Command: /jnm-kw (Keyword Research & Gap Analysis)

## Trigger & Context
- **Command:** `/jnm-kw`
- **Subagent:** `keyword-research`
- **Domain Rules:** `domains/keyword-research/rules.md`
- **Data Contract:** `domains/keyword-research/schema.json`

---

## Execution Protocol

### Step 1: Rule Ingestion & Data Source Attribution
1. Ingest `domains/keyword-research/rules.md`.
2. Retrieve seed keywords, target geo-locations, and competitor domains.
3. Explicitly tag data source origin (`semrush` vs `estimate`) for every metrics payload.

### Step 2: Research & Competitor Teardown Rules
- **Data Attribution:** Never blend external API metrics with speculative estimations without explicit source tagging (`status: fail`).
- **Competitor Teardowns:** Perform structured teardowns of top 3 ranking competitors for each core service cluster.
- **Geographic Gap Mapping:** Map high-intent keywords against target service locations to flag uncaptured geo-opportunities.

### Step 3: Payload Output & Schema Validation
Write output payload conforming strictly to `domains/keyword-research/schema.json`:
1. Save research array to `clients/[client-slug]/strategy/keyword-research.json`.
2. Generate or update human-readable Markdown summary at `clients/[client-slug]/strategy/keyword-research.md`.
3. Append identified expansion opportunities as actionable items in `dashboard/data/[client-slug].json`.
