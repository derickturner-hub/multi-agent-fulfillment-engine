# Domain Rules: Web Design & CRO Architecture

## Scope & Ownership
- **Owner:** `webdesign` sub-agent.
- **Role:** DOM wireframing, site builds (`/jnm-new-site`), audits (`/jnm-site-audit`), SEO technical gates (`/jnm-site-seo`), site launches (`/jnm-site-launch`), navigation, migrations (`/jnm-wp-migrate`, `/jnm-webflow-migrate`), and city page execution.
- **Boundary:** Consumes keyword maps from `keyword-research`. Never self-derives keyword targets.

---

## Technical & Physical Verification Protocols

### 1. Platform Verification Mandate
- **Live Header Inspection:** Always verify the active CMS platform prior to taking any platform-specific action by executing a live header check: `curl -sI https://[domain]`
  - If `wp-json` or `wp-content` is present $\rightarrow$ WordPress.
  - If `cdn.prod.website-files.com` or `assets-global.website-files.com` is present $\rightarrow$ Webflow.
- **Zero Profile Note Trust:** Never rely on stale profile notes or historical memory regarding site platform.

### 2. Physical Visual Inspection of Assets
- **Visual Image Verification:** Every image—whether AI-generated (Nano Banana) or pulled from a client's Google Drive—must be physically opened and visually inspected before marking a build complete.
- **Defect Checks:** Ensure assets contain zero competitor supplier logos, app timestamps, GPS coordinate overlays, or visual artifacts. Filename and metadata checks alone are insufficient.

### 3. Review Count & Star Rating Display Threshold
- **100+ Threshold Rule:** Client-facing review counts or star ratings (on-site visible copy or schema) may only be surfaced if:
  1. The specific platform has **100 or more reviews**.
  2. The display is wired to a **live, auto-updating data source** (never a hardcoded snapshot).
- **Below 100 Reviews:** Hide review counts and ratings completely.
- **Low-Rating Exception:** If a platform has 100+ reviews but a poor average rating, do not auto-display. Flag for Account Manager review first.

### 4. WordPress User Account Attribution
- Every page, post, or city page published or edited on WordPress must be attributed to an author account named after the client's business (e.g., `"Martinez Roofing Inc"`), never a personal admin or agency user account.
- Check `wp_get_users` for an existing company-named account before publishing; create one if missing.

---

## Brand & Compliance Rules
- **No Emojis:** Use real SVG icons only in site builds. Zero emojis in client-facing HTML or layouts.
- **No Internal Jargon Leaks:** Never render internal optimization terms in client-facing page copy (e.g., "KD," "Search Volume," "HQ Priority," "Below Reporting Threshold"). Inspect for this during `/jnm-site-audit`.
- **Brand Color Verification:** Verify brand colors by curling raw CSS files for hex codes (`#HEX`). Do not trust text summary descriptions.
- **Confirmation Gate:** Require explicit user/manager confirmation before performing irreversible actions (publishing live, deleting pages, or modifying DNS records).
