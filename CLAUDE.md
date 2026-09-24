# Central Agent Orchestrator & System Protocol

## System Architecture Overview
This repository operates an enterprise-grade, file-backed Multi-Agent System (MAS) designed for autonomous digital agency fulfillment. The orchestrator routes incoming agency webhooks and pipeline requests through 4 specialized subagents, enforces single-sourced domain guardrails, and executes non-blocking mechanical QA validation prior to live deployment.

---

## Agent Routing & Discovery Protocol

When a request enters the pipeline, inspect the target artifact type and route to the corresponding specialist subagent:

| Task / Artifact Target | Target Agent | Config File Path | Live Domain Rules |
| :--- | :--- | :--- | :--- |
| Seed Terms, Intent Clustering, LSI Matrices | `keyword-research` | `.claude/agents/keyword-research.md` | `domains/keyword-research/rules.md` |
| Landing Pages, DOM Wireframes, CRO Layouts | `webdesign` | `.claude/agents/webdesign.md` | `domains/webdesign/rules.md` |
| Editorial Blogs, Long-Form Copy, Meta Descriptions | `content` | `.claude/agents/content.md` | `domains/content/rules.md` |
| Local Business Posts, Citation Sync, Schema Markup | `seo` | `.claude/agents/seo.md` | `domains/seo/rules.md` |

---

## Mandatory Execution Order

+--------------------+     +-----------------------+     +--------------------------+
| 1. Trigger Received | --> | 2. Load Subagent .md  | --> | 3. Read Live Domain Rules|
+--------------------+     +-----------------------+     +--------------------------+
          |                                                                   |
          v                                                                   v
+--------------------+     +-----------------------+     +--------------------------+
| 6. Publish Payload | <-- | 5. Phase 7 Retry Loop | <-- | 4. Generate Asset        |
+--------------------+     +-----------------------+     +--------------------------+

1. **Rule Pre-Flight Check:** Before generating any copy, code, or structured layout, the active agent MUST read its respective `domains/<domain>/rules.md` file.
2. **Schema Ingestion & Handoff:** Inter-agent data passing MUST comply with the target JSON schema (`domains/<domain>/schema.json`).
3. **Phase 7 Self-Correction Gate:** All text assets MUST undergo the Phase 7 self-correction procedure before publishing. If checks return `status: 'fail'`, execute targeted retries up to 3 attempts.

---

## Phase 7: Self-Correcting Pre-Flight Protocol

Before finalizing, scheduling, or publishing any content artifact (blog, city page, GBP post, or refresh), the engine executes `domains/qa/self-correction.md`:

- **Mechanical Audit:** Run `content-review/lib/qaChecklist.js` against the drafted artifact.
- **Trigger Condition:** Only `status: 'fail'` triggers a retry. `status: 'warn'` checks do not block or retry.
- **Bounded Retry Loop:** Perform up to **3 targeted revisions** focusing strictly on failing checks without full rewrites.
- **Graceful Fallback & AM Escalation:** If failures persist after 3 attempts, publish/schedule anyway (never block pipeline), append the issue to `dashboard/data/[slug].json`'s `todos` array, log to `issues/issues-log.md`, and notify the assigned Account Manager via a targeted Slack DM.

---

## System Health & Maintenance Commands

- **Audit Rules:** Verify all domain `rules.md` files contain explicit guardrails.
- **Validate Schemas:** Test all `.json` files against Draft 2020-12 JSON Schema specification.
- **Run QA Engine:** Execute `node content-review/lib/qaChecklist.js` against sample payloads.
- **Verify Phase 7 Self-Correction:** Audit bounded retry instructions in `domains/qa/self-correction.md`.
