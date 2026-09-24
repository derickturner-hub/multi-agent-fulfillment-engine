# Command: /jnm-site-audit (Technical Web & SEO Audit Execution)

## Trigger & Context
- **Command:** `/jnm-site-audit`
- **Subagent:** `webdesign`
- **Domain Rules:** `domains/webdesign/rules.md`
- **Data Contract:** `domains/webdesign/schema.json`

---

## Execution Protocol

### Step 1: Ingestion & Verification Setup
1. Ingest `domains/webdesign/rules.md` and `domains/seo/rules.md`.
2. Physical Header Verification: Execute `curl -sI [client-domain]` to confirm headers, web server response, and platform identity. Do not assume platform configs from legacy client metadata.

### Step 2: Site Audit Rules & Checks
- **Schema Output Check:** Curl live HTML (`curl -s [url] | grep application/ld+json`) to confirm presence and validity of schema markup.
- **Broken Link & Redirect Evaluation:** Audit all internal and external routes for `404` errors or broken redirect chains.
- **Content Policy Violations:** Scan live page copy for emojis, em dashes (`—`), or unverified review claims failing the 100+ review threshold rule.
- **FAQ Structural Integrity:** Ensure FAQs across local service pages use native `<h3>` elements and contain unique, location-grounded content (no template reskinning).

### Step 3: Reporting & Issue Escalation
Write audit findings adhering to `domains/webdesign/schema.json`:
1. Save finding array to `clients/[client-slug]/webdesign/audit-results.json`.
2. Append critical items (`category: broken_link`, `category: schema`) to `issues/issues-log.md`.
3. If high-severity items exist, append high-priority todo in `dashboard/data/[client-slug].json` and send notification to Account Manager via Slack DM.
