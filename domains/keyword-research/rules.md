# Keyword Research & Intent Strategy Domain Rule Pack

## Scope & Governance
Governs target seed keyword extraction, commercial intent classification, negative keyword filtering, search volume evaluation, and LSI entity mapping.

## Mandatory Keyword Guardrails

- **Intent Thresholds:**
  - Landing page targets MUST be classified strictly as **Transactional (Tx)** or **Commercial Investigation (CI)**.
  - **Informational (Info)** terms must be diverted exclusively to editorial blog clusters.
- **Negative Term Purging:** Automatically strip non-converting keywords prior to clustering, including:
  - *jobs, employment, salary, free, template, DIY, how to fix yourself, reddit, cheap*.
- **Hyper-Local Modifier Lock:** Every primary keyword assigned to a local landing page must contain a valid geographic modifier (e.g., `[City]`, `[State]`, or `near me`).
- **LSI Entity Minimums:** Every generated keyword matrix must output a minimum of 8 NLP entities for secondary content injection.
