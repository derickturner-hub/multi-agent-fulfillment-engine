# Command: /jnm-realign (Strategy Realignment Execution)

## Trigger & Context
- **Command:** `/jnm-realign`
- **Subagent:** `seo`
- **Domain Rules:** `domains/seo/rules.md`
- **Data Contract:** `domains/seo/schema.json`

---

## Execution Protocol

### Step 1: Rule Ingestion & Cross-Domain Context Aggregation
1. Ingest `domains/seo/rules.md`, `domains/keyword-research/rules.md`, and `domains/webdesign/rules.md`.
2. Retrieve performance findings from `clients/[client-slug]/seo/gsc-triage.json` and `clients/[client-slug]/webdesign/audit-results.json`.

### Step 2: Strategy Realignment Execution
- **Keyword & Architecture Alignment:** Realign content roadmap priorities against newly identified striking-distance keywords (Positions 11–20) and technical audit gaps.
- **Cannibalization Resolution:** Flag competing URLs targeting identical primary intent keywords and establish clean 301 redirect or canonical mapping rules.
- **Priority Scoring:** Assign explicit impact/effort scores to all proposed roadmap adjustments.

### Step 3: Payload Output & Dashboard Synchronization
1. Output updated strategy payload conforming to `domains/seo/schema.json` to `clients/[client-slug]/strategy/realigned-roadmap.json`.
2. Update `clients/[client-slug]/strategy/roadmap.md` with the new quarterly execution schedule.
3. Synchronize updated task queues to `dashboard/data/[client-slug].json` and dispatch realigned execution summary to the Account Manager via Slack DM.
