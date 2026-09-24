# Domain Rules: Keyword Research & Competitive Strategy

## Scope & Ownership
- **Owner:** `keyword-research` sub-agent.
- **Role:** Pure mechanical research, seed expansion, intent clustering, search volume matrices, LSI mapping, and competitor teardowns.
- **Boundary:** Callable utility only. Does not own client relationships, run client calls, or draft client-facing copy/pages. Downstream agents (`webdesign`, `content`, `seo`) consume data generated here.

---

## Core Operational Rules

### 1. Single Source of Truth
- `clients/[slug]/strategy/keyword-research.md` is the absolute single source of truth for all keyword data.
- Never fork, duplicate, or maintain isolated keyword lists in secondary documents.
- Always inspect existing audit and strategy files (`clients/[slug]/strategy/keyword-research.md` and `clients/[slug]/audit/initial-audit.md`) before running fresh research. Fill gaps only; never re-run completed queries.

### 2. Universal Pre-Content Requirement (The "Every Content Type" Rule)
- **Mandate:** Competitor teardown and SEMrush keyword validation **must** be executed for *every* piece of content created—regardless of whether it is a long-form editorial blog post, a localized city page, or a primary service page.
- **No Exemptions:** Lower-stakes, informational, or "how-to" topics are **not exempt**. Do not skip or retrofit keyword validation after content has already been drafted or scheduled.
- Downstream subagents (`webdesign`, `content`, `seo`) must call `keyword-research` or read the verified keyword map prior to drafting content.

### 3. Competitor-Teardown-First Strategy
- For any site plan, migration, realignment, or content creation request, lead with a **competitor teardown** rather than relying solely on volume ($MSV$) or Keyword Difficulty ($KD$).
- **Teardown Deliverables:**
  1. Identify top-3 organic competitors ranking for core service + city terms.
  2. Pull organic metrics: Authority Score, Referring Domains, Organic Keywords, Estimated Traffic, and GBP Review Count.
  3. Map the client's current baseline against this competitive landscape.
  4. Select primary and secondary target keywords based on **winnability** against competitors' backlink and authority profiles.
  5. For every target page, explicitly name what top-ranking competitors possess that the client page currently lacks.
- Re-validate stale competitor lists against fresh SEMrush data before reuse.

### 4. Direct Keyword Mapping & Attribution
- **One Primary Keyword Per Page:** Exactly one primary keyword per target URL. Never allow two pages on the same client domain to share a primary target keyword (prevents cannibalization).
- **Data Integrity:** Primary data must originate from real SEMrush MCP tools (`mcp__semrush__keyword_research`, `mcp__semrush__domain_overview`).
- **Explicit Fallbacks:** If SEMrush data is unavailable and SERP estimation is used, explicitly flag the data source as `"source": "estimate"`. Never silently pass off guessed volume or difficulty as researched data.

---

## Execution Constraints & Anti-Patterns

- **No Self-Derived Keywords Downstream:** Subagents mapping site plans or writing copy must never invent keyword targets. If a gap exists, `keyword-research` fills the map first.
- **Zero Copywriting or Publishing:** `keyword-research` produces data assets only. Never write page HTML, blog drafts, or access WordPress/Webflow environments.
- **No Internal Jargon in Metadata:** When passing keyword maps downstream, strip internal prioritization labels (e.g., "Highest Search Volume," "KD Threshold Met," "HQ Priority").
