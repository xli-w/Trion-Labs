You are continuing work inside the existing Trion Labs repository.

This is Stage 6 of the implementation plan.

Use the existing operation model, challenge outcomes, KPI state, diagnostic profile, and opportunity-prioritisation result.

## Objective

Implement a concise before-and-after comparison showing how the fictional operation works differently after the visitor’s improvements.

The focus is operational behaviour, not just numerical performance.

## Product Principle

The operation should not simply be described as “more digital”.

The result should communicate:

> The operation is not just more digital. It is easier to run.

## First: Inspect

Before editing:

1. Read the project instructions and relevant skills.
2. Inspect the existing final-flow structure.
3. Inspect the state model.
4. Inspect the diagnostic profile.
5. Inspect the selected opportunity.
6. Inspect existing cards, comparison components, and transitions.

Reuse existing patterns.

Do not create a parallel final-results system.

## Required Work

### 1. Define before-state content

Create a centralised set of concise before-state statements.

Potential themes:

- Teams reconcile information manually.
- Problems are discovered late.
- Data is recorded inconsistently.
- Different teams work from different versions of the truth.
- Decisions depend heavily on individual knowledge.
- Improvement opportunities are difficult to prioritise.

Only show statements relevant to the actual experience.

### 2. Define after-state content

Create a centralised set of concise after-state statements.

Potential themes:

- Information is available where it is needed.
- Processes are more consistent.
- Exceptions are identified earlier.
- Teams share a clearer operational picture.
- Repetitive work is reduced.
- Improvements can be measured and refined.

Do not imply perfect performance.

### 3. Derive the comparison from state

The before-and-after content should respond to:

- Completed challenges
- Unlocked capabilities
- Resolved friction points
- KPI changes
- Selected next opportunity

Do not display the same generic “after” state regardless of visitor decisions.

### 4. Include a small operational flow

Where useful, show a simple flow such as:

```text
Before:
Information scattered
    → Manual reconciliation
    → Late decisions
    → Operational disruption

After:
Connected information
    → Clearer visibility
    → Earlier decisions
    → More controlled operation
```

Keep it concise.

Do not create a complex process simulator.

### 5. Show remaining potential

Include a small section explaining:

- What has improved
- What remains unresolved
- What the selected next opportunity could enable

This should support the idea of continuous improvement.

### 6. Make the result visually engaging

Use:

- Two-column comparison on desktop
- Stacked comparison on mobile
- Clear labels
- Subtle transitions
- Small operational diagrams where useful

Avoid:

- Excessive animation
- Dense text
- Large decorative illustrations
- Generic dashboard layouts

## Validation

Test:

- Partial completion
- Full completion
- Different prioritised opportunities
- Mobile layout
- Keyboard accessibility
- Reduced-motion behaviour
- Reset behaviour
- Console errors

Ensure the before-and-after view remains understandable without animation.

## Final Response

Report:

1. What before-and-after model was implemented.
2. How content is derived from state.
3. How the selected opportunity affects the result.
4. Files changed.
5. Any limitations.
6. What remains for Stage 7.

Stop after this stage.