# QA & Mechanical Governance Domain Rule Pack

## Scope & Governance
Governs non-blocking programmatic audits, bounded self-correction retry logic, and fallback human-in-the-loop notification channels across all content types.

## Mandatory QA Rules

- **Execution Gate:** No content artifact (blog, city page, local post, or refresh) may be published or marked complete without undergoing a `qaChecklist.js` evaluation.
- **Retry Bounding:** Self-correction retries are strictly bounded to a maximum of **3 attempts** to prevent infinite loop API usage.
- **Scope Restriction:** Self-correction applies exclusively to new incoming content runs going forward, not historical backlogs.
- **Non-Blocking Delivery Mandate:** QA failures must never stop a live publication pipeline; unresolved edge cases must be published/scheduled and escalated asynchronously via AM notification.
