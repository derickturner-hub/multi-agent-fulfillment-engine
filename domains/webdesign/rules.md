# Web Design & Page Architecture Domain Rule Pack

## Scope & Governance
Governs DOM architecture, heading hierarchy ($H_1 \rightarrow H_6$), conversion module placement, mobile responsiveness constraints, and structured layout blueprints for agency client landing pages.

## Mandatory Architectural Guardrails

- **Single $H_1$ Enforcement:** Exactly one $H_1$ tag is permitted per landing page. The $H_1$ must contain the primary hyper-local transactional keyword phrase and match the target search intent.
- **Sequential Heading Structure:** Headings must follow strict mathematical sequence ($H_1 \rightarrow H_2 \rightarrow H_3$). Skipping heading levels (e.g., placing an $H_3$ directly inside an $H_1$ section) is strictly prohibited.
- **Above-the-Fold Conversion Lock:**
  - Every mobile and desktop blueprint must render a high-contrast primary Call-to-Action (CTA) button within the top 600px viewport.
  - CTAs must incorporate a direct phone link (`tel:`) or anchor to an inline lead capture form.
- **Isolated Parameter Formatting:** Action link URLs, phone numbers, and map iframe parameters must be stored as distinct object attributes in output schemas, never hardcoded directly into paragraph copy.
- **Trust Factor Baseline:** Every generated layout MUST include a dedicated section for verified client reviews, star ratings, and local association badges prior to the page footer.
