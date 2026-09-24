# Self-Correcting QA & Bounded Retry Protocol

## Scope & Purpose
Defines the autonomous self-correction loop for generated agency assets. Ensures all drafted copy evaluates against `content-review/lib/qaChecklist.js` and attempts bounded targeted revisions before live deployment or human review handoff.

---

## Execution Protocol

+-------------------+     +-----------------------+     +-------------------+
| 1. Draft Complete | --> | 2. Run qaChecklist.js | --> |  3. Status Check  |
+-------------------+     +-----------------------+     +-------------------+
                                                                  |
                  +-----------------------------------------------+-----------------------------------------------+
                  |                                                                                               |
                  v                                                                                               v
        [Pass / Warn Only]                                                                               [Has 'fail' Status]
                  |                                                                                               |
                  v                                                                                               v
        [Proceed to Publish]                                                                            [Targeted Revision]
                                                                                                                  |
                                                                                                         (Max 3 Attempts)
                                                                                                                  |
                                                                                        +-------------------------+-------------------------+
                                                                                        |                                                   |
                                                                                        v                                                   v
                                                                                  [Clean Pass]                                    [3 Attempts Failed]
                                                                                        |                                                   |
                                                                                        v                                                   v
                                                                               [Proceed to Publish]                                [Publish + Flag AM]

### Step 1: Pre-Publish Audit Trigger
Before executing any skill's final publish, schedule, or output step, execute the QA evaluation engine using `qaChecklist.js` against the generated asset:
node --input-type=module -e "import { runQaChecklist } from './content-review/lib/qaChecklist.js'; ..."

### Step 2: Evaluation Filtering
- `status: 'fail'`: Triggers an immediate self-correction retry attempt.
- `status: 'warn'`: Does NOT trigger a retry. Warnings represent soft best-practices or checks requiring external human validation (e.g., live review counts).

### Step 3: Targeted Revision Loop (Bounded to 3 Attempts)
1. Extract the specific `detail` string from all failing checks.
2. Instruct the generating subagent to make a **targeted revision** addressing ONLY the failing rules. Do NOT rewrite the entire piece.
3. Re-run `runQaChecklist()`.
4. Repeat up to a **maximum of 3 total attempts**.

### Step 4: Graceful Degradation & AM Notification (Human-in-the-Loop)
If `status: 'fail'` errors remain after 3 attempts, do NOT block the pipeline:
1. **Never Block Deployment:** Finalize, schedule, or publish the draft as intended.
2. **Append to Client Todos:** Add an entry to `dashboard/data/[slug].json`'s `todos` array:
   ```json
   {
     "id": "qa-flag-<timestamp>",
     "text": "QA Self-Correction Exceeded: [Artifact Name] failed [Check ID] - [Detail]",
     "done": false,
     "priority": "high"
   }
