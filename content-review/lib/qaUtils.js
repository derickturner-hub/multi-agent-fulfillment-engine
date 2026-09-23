/**
 * Constructs a standardized QA evaluation result object.
 *
 * @param {string} id - Unique identifier for the governance rule.
 * @param {string} name - Human-readable rule title.
 * @param {string} category - Rule category (e.g., 'formatting', 'brand', 'seo').
 * @param {'pass'|'fail'|'remediated'} status - Audit result status.
 * @param {string} message - Explanatory message or auto-remediation log.
 * @returns {Object} Standardized rule result contract.
 */
export function rule(id, name, category, status, message) {
  return {
    id,
    name,
    category,
    status,
    message,
    timestamp: new Date().toISOString()
  };
}

/**
 * Auto-sanitizes raw string content to enforce mechanical guardrails.
 * Converts forbidden em-dashes into clean hyphens and strips illegal whitespace.
 *
 * @param {string} text - Raw input copy.
 * @returns {string} Sanitized copy compliant with domain rules.
 */
export function sanitizeContent(text) {
  if (!text || typeof text !== 'string') return '';
  
  return text
    // Replace em-dashes (—) and en-dashes (–) with standard hyphens surrounded by spaces
    .replace(/[—–]/g, ' - ')
    // Collapse multi-space gaps caused by substitution
    .replace(/ +/g, ' ')
    .trim();
}
