# Content Strategy & Editorial Domain Rule Pack

## Scope & Governance
Governs long-form blog posts, editorial articles, brand voice alignment, anti-AI pattern detection, and automated content sanitization protocols.

## Mandatory Editorial Guardrails

- **Zero Em-Dashes:** Em-dashes (`—`) are strictly banned across all long-form copy, headlines, meta titles, and meta descriptions. Use standard hyphens, commas, or split into two sentences.
- **Forbidden AI Vocabulary:** Do NOT use the following overused AI stylistic terms:
  - *delve, testament, beacon, tapestry, game-changer, seamless, elevate, landscape, nestle, bustling, realm, leverage, transformative, paradigm*.
- **Readability & Sentence Cadence:**
  - Maintain a Flesch-Kincaid Readability Score between Grade 6 and Grade 8.
  - Sentence lengths must fluctuate dynamically (mix short 4–8 word punchy sentences with 15–20 word descriptive sentences) to preserve human rhythm.
- **E-E-A-T & Entity Distribution:**
  - Naturally integrate at least 8 contextually relevant LSI entity terms provided in `domains/keyword-research/schema.json`.
  - Include localized experience references and actionable expert tips in every main section.
- **Programmatic Quality Gate:** All drafted copy must pass `content-review/lib/qaChecklist.js` with a `passed` or `remediated` state prior to deployment.
