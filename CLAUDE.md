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
          |                                                           |
          v                                                           v
+--------------------+     +-----------------------+     +--------------------------+
| 6. Publish Payload | <-- | 5. qaChecklist Audit  | <-- | 4. Generate Asset        |
+--------------------+     +-----------------------+     +--------------------------+

1. **Rule Pre-Flight Check:** Before generating any copy, code, or structured layout, the active agent MUST read its respective `domains/<domain>/rules.md` file.
2. **Schema Ingestion & Handoff:** Inter-agent data passing MUST comply with the target JSON schema (`domains/<domain>/schema.json`).
3. **Mechanical Governance Gate:** All text assets MUST pass `content-review/lib/qaChecklist.js`. If a check returns `fail`, the engine MUST execute `sanitizeContent()` from `content-review/lib/qaUtils.js` before handing off to live CMS webhooks or APIs.

---

## System Health & Maintenance Commands

- **Audit Rules:** Verify all domain `rules.md` files contain explicit guardrails.
- **Validate Schemas:** Test all `.json` files against Draft 2020-12 JSON Schema specification.
- **Run QA Engine:** Execute `node content-review/lib/qaChecklist.js` against sample payloads.
