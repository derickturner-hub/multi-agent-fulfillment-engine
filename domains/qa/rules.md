# Domain Rules: Programmatic QA & Phase 7 Self-Correction

## Scope & Operational Role
- **Owner:** `qa` domain rules (`content-review/lib/qaChecklist.js`).
- **Architecture Note:** QA is **not** a 5th dispatchable sub-agent (no `Agent(subagent_type: "qa")` exists). It operates as a deterministic, programmatic evaluation gate executed directly prior to publication or review handoffs.
- **Single Source of Truth:** `qaChecklist.js` contains the live execution logic. All rule IDs in code map 1:1 to the governance checks documented below.

---

## Universal & Content-Specific Governance Checks

### 1. Brand & Compliance Checks (Universal)
- `no_emojis`: Zero emojis allowed in client-facing output (`status: fail`).
- `no_em_dashes`: Zero em dashes (`—`) allowed (`status: fail`).
- `no_internal_jargon`: Internal reasoning terms ("Search Volume," "KD," "HQ Priority") strictly forbidden in client-facing text (`status: fail`).
- `no_hardcoded_reviews`: Hardcoded review snapshots without a live API source trigger a review flag (`status: warn`).

### 2. Structural & Heading Hierarchy Checks
- `title_vs_h1`: Meta `<title>` must differ meaningfully from the primary `<h1>` (`status: fail`).
- `meta_description_quality`: Meta description must be present and within ~120–160 characters (`status: fail` if missing; `status: warn` if out of length range).
- `primary_keyword`: Exactly one primary keyword assigned and present in opening content (`status: fail` if missing).
- `heading_hierarchy`: Strict hierarchical cascading (`<h1>` $\rightarrow$ `<h2>` $\rightarrow$ `<h3>`) required (`status: fail` if missing `<h2>`s or skipped levels).
- `faq_real_headings`: FAQ questions must be formatted as native `<h3>`/`<h4>` headings, never bold-styled paragraph text (`status: fail`).
- `has_faq_section`: Content must feature a schema-eligible FAQ section (`status: fail`).

### 3. Prose Quality & Layout Checks (Promoted Code Rules)
- `real_intro`: A substantive introductory paragraph (minimum 40 words) must precede the first `<h2>` (`status: warn`).
- `h2_intro_before_list`: Every `<h2>` heading followed by a list (`<ul>`/`<ol>`) must include a lead-in intro sentence before the list starts (`status: warn`).
- `closing_cta`: Content must end with a dedicated closing call-to-action or summary paragraph (`status: warn`).
- `structured_lists`: Usage of `<ul>` or `<ol>` lists required for readability (`status: warn`).
- `refresh_shows_change`: Content refreshes must frame current-state vs. new content additions rather than rendering as an unexplained complete rewrite (`status: fail` if un-framed rewrite; `status: warn` if framing absent).

### 4. Depth & Channel Specifications
- `word_count_depth`: City pages must fall strictly within 1,800–2,200 words (`status: fail`).
- `h2_section_depth`: City pages must contain 7–11 `<h2>` sections (`status: fail`).
- `schema_markup`: `FAQPage` or `LocalBusiness` JSON-LD schema must render in HTML (`status: fail` if missing; `status: warn` if FAQ copy exists without matching schema).
- `has_cta_url` & `has_image_flag`: GBP posts must include a CTA link and an image placeholder flag (`status: fail`).

---

## Phase 7 Self-Correction Protocol

### 1. Execution Gate
- `qaChecklist.js` must execute after content generation is complete and **prior** to any live publish or schedule API call.
- Evaluation statuses:
  - **`pass` / `warn`:** Proceed directly to deployment or review saving.
  - **`fail`:** Triggers the bounded self-correction loop.

### 2. Bounded Retry Loop
- **Max Retries:** Up to **3 targeted attempts**.
- **Scope of Revision:** Re-draft *only* the specific failing fields/rules identified in the checklist output details. Do not execute full-text redrafts.
- If all `fail` flags clear within 3 attempts, proceed to standard deployment.

### 3. Graceful Escalation & Slack Escalation Protocol
- If `fail` flags persist after 3 attempts, the pipeline **never blocks**. Proceed with publishing/scheduling or saving the draft payload.
- In the same pass, execute the following escalation steps:
  1. Append a high-priority entry to `dashboard/data/[client-slug].json` in the `todos` array:
     `{ "id": <next_int>, "text": "<title> (<type>) still fails QA after 3 self-correction attempts: <failing_rules>", "done": false, "priority": "high" }`
  2. Log the failure entry in `issues/issues-log.md`.
  3. Resolve the client's assigned Account Manager from `profile.md` or `dashboard/data/[slug].json`.
  4. Dispatch a templated Slack DM to the Account Manager detailing the exact failing rules and live schedule status.
