# Case Study: Engineering a File-Backed, Self-Correcting Multi-Agent Fulfillment Engine (MAS)

**Architect:** Derick Turner — RevOps & MarTech Systems Architect  
**Core Domain:** Autonomous Digital Agency Fulfillment & AI Governance  

---

## Executive Summary

Standard enterprise AI workflows frequently fail in production due to three architectural vulnerabilities: **context drift**, **formatting hallucinations**, and **uncontrolled LLM execution loops**. When deploying autonomous pipelines across dynamic channels—such as Google Business Profile (GBP), WordPress, and local web architectures—probabilistic models require deterministic guardrails.

The **Multi-Agent Fulfillment Engine (MAS)** addresses these vulnerabilities by establishing a **file-backed control plane**. Operating without heavy middleware dependencies (e.g., Zapier/Make), the architecture enforces single-sourced markdown rule packs (`domains/*/rules.md`), strict Draft 2020-12 JSON schemas (`domains/*/schema.json`), and a deterministic **Phase 7 Pre-Flight QA Gate** equipped with automated self-correction and Slack escalation.

---

## System Architecture & Technical Innovation

Central Orchestrator: CLAUDE.md
├── Specialist Subagents (.claude/agents/ - KW, Web, Content, SEO)
├── Single-Sourced Rule Packs (domains/*/rules.md - Zero Context Drift)
└── Draft 2020-12 Contracts (domains/*/schema.json - Machine Validation)
        │
        ▼
Skill Execution Modules (.claude/commands/*.md)
        │
        ▼
Phase 7: Pre-Flight Self-Correction (content-review/lib/qaChecklist.js)
        ├── Status: Pass / Warn ──> Production Deployment (CMS, GHL, Local Services)
        └── Status: Fail ─────────> Bounded Retry Loop (Max 3 Targeted Attempts)
                                         │
                                         ▼
                                   Persistent Failure?
                                         ├── No  ──> Publish / Schedule
                                         └── Yes ──> Human Escalation (AM Slack DM + Todo)

---

## Core Operational Innovations

### 1. File-Backed Single-Sourcing & Zero Context Drift
Rather than injecting monolithic prompt context into conversational memory, subagents re-read their domain rule packs (`domains/<domain>/rules.md`) at the start of every session.
- **Result:** Eliminates instruction decay across long operational threads.
- **Flat Discovery Layer:** Maintains manifest declarations in `.claude/agents/*.md` for discovery without environment pollution.

### 2. Strict Data Contracts (Draft 2020-12 JSON Schema)
Inter-agent communications and API payloads are governed by rigid JSON schemas:
- **`keyword-research`:** Enforces explicit attribution of data sources (`semrush` vs. `estimate`) and mandates competitor teardown objects for site plan realignments.
- **`webdesign`:** Enforces physical `curl -sI` header verification to prevent CMS platform assumptions (WordPress vs. Webflow).
- **`content`:** Enforces word-count bounds (1,800–2,200 words for city pages), strict title-vs-H1 differentiation, and regex-audited internal link arrays.
- **`seo`:** Strictly isolates GBP post body text from call-to-action fields, eliminating raw URL/phone number leaks.

### 3. Phase 7: Deterministic Pre-Flight Self-Correction
Before any asset is dispatched or published, it passes through `content-review/lib/qaChecklist.js`:
- **Bounded Loop (Max 3 Retries):** If an asset returns a `status: 'fail'`, the system triggers a targeted revision addressing *only* the failing check detail string—preventing expensive full-text redrafts or runaway API loops.
- **Non-Blocking Graceful Escalation:** If a failure persists after 3 retries, the pipeline schedules the asset, appends a high-priority entry to `dashboard/data/[client-slug].json`, logs the event to `issues/issues-log.md`, and dispatches a structured Slack DM to the assigned Account Manager.

### 4. Hardened Physical Inspection Guardrails
- **Visual Asset Audits:** Requires opening and visually verifying image files to catch competitor logos, watermark badges, or field app timestamps before marking builds complete.
- **Rendered Schema Audits:** Mandates curling live HTML (`curl -s`) and grepping for JSON-LD output to verify schema execution, bypassing unreliable plugin/widget settings.
- **Anti-Reskinning FAQ Protocol:** Strictly prohibits template-swapped FAQ sections across sibling location pages, requiring location-grounded Q&A variants.

---

## Technical Stack & Governance Artifacts

| Component | Architecture Role | Technology / Spec |
| :--- | :--- | :--- |
| **Central Orchestrator** | Root dispatch protocol | `CLAUDE.md` |
| **Subagent Discovery** | Flat discovery layer | `.claude/agents/*.md` |
| **Domain Rule Packs** | Single-sourced operational rules | `domains/*/rules.md` |
| **Data Contracts** | Input/Output payload validation | `domains/*/schema.json` (Draft 2020-12) |
| **Mechanical QA Gate** | Programmatic pre-flight evaluation | `content-review/lib/qaChecklist.js` |
| **Phase 7 Self-Correction** | Bounded revision & escalation | `domains/qa/self-correction.md` |
