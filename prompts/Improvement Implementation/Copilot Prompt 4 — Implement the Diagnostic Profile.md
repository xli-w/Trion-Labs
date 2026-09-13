You are continuing work inside the existing Trion Labs repository.

This is Stage 4 of the implementation plan.

Use the existing shared operation model, challenge state, KPI logic, and skills system.

## Objective

Implement a meaningful diagnostic profile that summarises the visitor’s improved operation after completing the challenges.

The diagnostic should feel like a simplified, illustrative version of the kind of insight Trion could help a manufacturing business develop.

It must not pretend to be a real consultancy assessment or produce false precision.

## First: Inspect

Before editing:

1. Read the project instructions and relevant skills.
2. Inspect the current state model.
3. Inspect challenge completion and KPI calculations.
4. Inspect upgrade and friction-map state.
5. Identify the final completion screen.
6. Identify any existing score or results logic.
7. Reuse existing components and styles.

Do not create a competing scoring system.

## Product Principle

Do not make a conventional game score the primary output.

The visitor should receive a concise operational profile covering:

- What improved
- What remains difficult
- Where the greatest opportunity lies
- What Trion might recommend doing next

## Required Work

### 1. Define diagnostic dimensions

Use a small number of dimensions, such as:

- Visibility
- Process efficiency
- Data connection
- Operational responsiveness
- Automation readiness
- Improvement potential

Do not use too many dimensions.

Each dimension must have:

- A clear meaning
- A calculation method
- A sensible range
- A human-readable interpretation

### 2. Derive results from actual state

Diagnostic results should be based on:

- Completed challenges
- Decisions made
- KPI changes
- Unlocked capabilities
- Resolved friction points
- Remaining friction points
- Opportunity prioritisation, if available

Do not create arbitrary values that are unrelated to the visitor’s actions.

Do not simply award maximum scores for completing every challenge.

### 3. Make the calculation explainable

The code should make it possible to understand why a diagnostic value changed.

Avoid a complicated mathematical model.

A simple weighted or rule-based model is acceptable if it is:

- Centralised
- Documented in code
- Consistent
- Easy to adjust
- Meaningful

### 4. Create a concise result summary

The result should include:

- Overall operational profile
- Strongest area
- Main remaining friction
- Most significant improvement opportunity
- Recommended next step

Use clear language.

Example direction:

> Your operation has stronger visibility and better-connected information, but the next opportunity is to standardise the process before introducing further automation.

Do not use generic praise.

### 5. Show strengths and remaining friction

Include a balanced result.

Potential sections:

- What improved
- What is now connected
- What still needs attention
- Where value could be created next

Do not imply that the operation is perfect.

### 6. Make the profile visually consistent

Use the existing Trion Labs visual language.

Potential UI elements:

- Dimension cards
- Small horizontal indicators
- A compact radar-like visual only if it is genuinely clearer
- Status labels
- A summary panel
- A highlighted opportunity

Avoid a dense enterprise dashboard.

### 7. Make the profile responsive

The result must work on mobile.

Do not rely on wide charts or complex visualisations.

Use accessible text alongside every visual indicator.

## Scope Restrictions

Do not implement opportunity prioritisation yet unless it is already present and necessary for the result.

Do not implement the final Trion approach reveal yet.

Do not implement the final CTA logic yet.

Do not create a formal business report.

## Validation

Test:

- No completed challenges
- Partial completion
- All challenges completed
- Different decision paths
- Reset behaviour
- Diagnostic consistency
- Mobile layout
- Keyboard accessibility
- Reduced-motion behaviour
- Console errors

Ensure the diagnostic is not displayed as complete before the experience is ready.

## Final Response

Report:

1. Diagnostic dimensions created.
2. Calculation method.
3. How the result is derived from state.
4. Files changed.
5. Example result paths.
6. Any assumptions.
7. What remains for Stage 5.

Stop after this stage.