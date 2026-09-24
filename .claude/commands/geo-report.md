# Command: /jnm-geo (GEO & Local Search Performance Reporting)

## Trigger & Context
- **Command:** `/jnm-geo`
- **Subagent:** `seo`
- **Domain Rules:** `domains/seo/rules.md`
- **Data Contract:** `domains/seo/schema.json`

---

## Execution Protocol

### Step 1: Rule Ingestion & Local Grid Data Retrieval
1. Ingest `domains/seo/rules.md` and `domains/qa/rules.md`.
2. Retrieve local map pack grid rankings, AI Overviews/GEO visibility metrics, and local keyword tracking data from `clients/[client-slug]/seo/geo-grid.json`.

### Step 2: Audit & Grid Analysis
- **Local Grid Coverage:** Evaluate 3x3 or 5x5 geo-grid rankings for primary local keywords across targeted zip codes.
- **Competitor Proximity Audit:** Identify top 3 local competitors dominating top-3 map pack positions in underperforming grid nodes.
- **AI Engine Grounding Check:** Verify if business NAP (Name, Address, Phone) and primary offerings are consistently cited in local AI search queries.

### Step 3: Reporting & Action Item Output
1. Format reporting payload adhering to `domains/seo/schema.json` and save to `clients/[client-slug]/seo/geo-report.json`.
2. Log local map pack drops (> 2 rank positions) as actionable tasks in `dashboard/data/[client-slug].json`.
3. Append critical citation or ranking discrepancies to `issues/issues-log.md` and ping Account Manager via Slack DM.
