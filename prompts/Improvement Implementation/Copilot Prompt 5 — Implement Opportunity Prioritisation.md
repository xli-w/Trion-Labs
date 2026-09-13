You are continuing work inside the existing Trion Labs repository.

This is Stage 5 of the implementation plan.

Use the existing skills system, shared operation model, challenge outcomes, KPI state, and diagnostic profile.

## Objective

Implement a short opportunity-prioritisation interaction that demonstrates how Trion helps a manufacturing business decide what to improve first.

The visitor should move from:

> “Here are the problems.”

to:

> “Here is what I would improve next, and why.”

## Product Principle

The best next improvement is not always the largest or most technologically ambitious one.

The experience should demonstrate that good operational improvement considers:

- Impact
- Effort
- Time to value
- Operational risk
- Dependencies
- Readiness of the process and data

Reinforce the principle:

> Improve the process before adding unnecessary complexity.

## First: Inspect

Before editing:

1. Read project instructions and relevant skills.
2. Inspect the current opportunity data model.
3. Inspect the diagnostic profile.
4. Inspect the challenge outcomes.
5. Inspect the existing final or post-challenge flow.
6. Identify reusable cards, drag-and-drop patterns, buttons, and state handlers.

Do not create a separate prioritisation state model if one already exists.

## Required Work

### 1. Define the opportunity set

Use a small set of opportunities identified during the experience.

Examples:

- Improve downtime data capture
- Connect production and quality records
- Reduce spreadsheet duplication
- Improve material visibility
- Create a shared operational view
- Automate a repetitive workflow

Each opportunity should include:

- Identifier
- Title
- Short description
- Related friction point
- Expected impact
- Effort
- Time to value
- Operational risk
- Dependencies
- Related capability
- Why it may be a sensible next step

Keep the data centralised.

### 2. Choose an appropriate interaction

Implement the simplest interaction that fits the existing design.

Possible options:

- Impact vs Effort matrix
- Ranked opportunity cards
- Drag-and-drop prioritisation
- Choose a first improvement
- Select and compare two opportunities

The interaction must work on mobile.

Do not create a complicated strategy game.

### 3. Make trade-offs visible

The visitor should understand that different choices have different consequences.

For example:

- A targeted process improvement may have moderate impact, low effort, and fast value.
- A large system replacement may have high potential impact but high effort and risk.
- Automation may be attractive but premature if the process is not standardised.
- Better data visibility may enable later improvements.

Do not make every choice equally good.

Do not make the “correct” choice artificially obvious.

### 4. Provide meaningful feedback

After the visitor prioritises an opportunity, explain:

- Why the choice makes sense
- What it would address
- What it would enable later
- What trade-off it introduces
- Whether it is a sensible first step for this operation

The feedback should be constructive, not punitive.

### 5. Connect the result to the diagnostic profile

The selected opportunity should influence:

- The final recommended next step
- The diagnostic summary
- The final CTA
- The before-and-after narrative, where appropriate

Do not distort all KPI values simply because an opportunity was selected.

### 6. Represent practical implementation thinking

Where relevant, show that the next step may involve:

- A site walk
- A process review
- Data definition
- A small automation
- A system connection
- A dashboard or operational view
- A roadmap decision

Do not turn the interaction into a list of services.

## Visual and Interaction Requirements

Maintain the existing Trion Labs design.

Use:

- Clear cards
- Strong hierarchy
- Restrained colour
- Subtle selection states
- Clear comparison
- Accessible controls

Avoid:

- Gamified point explosions
- Excessive animation
- Generic scoring
- Dense tables
- Unnecessary charts

## Validation

Test:

- All opportunity options
- Selection and reselection
- Mobile interaction
- Keyboard interaction
- Reset behaviour
- State persistence through the final flow
- Diagnostic and CTA updates
- Console errors

## Final Response

Report:

1. The prioritisation interaction chosen.
2. The opportunity data model.
3. How trade-offs are represented.
4. How the result affects the diagnostic and final recommendation.
5. Files changed.
6. Any limitations.
7. What remains for Stage 6.

Stop after this stage.