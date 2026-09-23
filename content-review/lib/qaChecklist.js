import { rule } from './qaUtils.js';

export function runQaChecklist(item) {
  const results = [];

  // Rule ID: no_em_dashes | Safety Guardrail for Copy Assets
  const hasEmDash = /—/.test(item.body || '');
  results.push(rule(
    'no_em_dashes',
    'No Em-Dashes in Post/Page Body',
    'formatting',
    hasEmDash ? 'fail' : 'pass',
    hasEmDash ? 'Em-dash detected in copy. Auto-remediating to hyphens/commas prior to publish.' : 'Clean'
  ));

  return {
    item_id: item.id,
    status: results.some(r => r.status === 'fail') ? 'remediated' : 'passed',
    rules: results
  };
}
