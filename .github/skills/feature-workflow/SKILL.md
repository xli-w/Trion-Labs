---
name: feature-workflow
description: Apply when planning and delivering a new Trion Labs feature or substantial change so work remains incremental, coherent, and verified.
---

# Feature Planning and Implementation Workflow

## Purpose

Provide a repeatable workflow for turning a request into a small, cohesive, tested Trion Labs improvement without prematurely building the entire experience.

## When to Use

- Starting a new feature, screen, component, challenge, KPI view, or substantial bug fix.
- Breaking a broad product request into an incremental implementation.
- Reviewing scope before introducing new files, state, interactions, or dependencies.

## Required Workflow

1. **Understand the requested outcome.** Restate the visitor or operational outcome in concrete terms and identify explicit non-goals.
2. **Select skills.** Use the skill map in [copilot-instructions.md](../../copilot-instructions.md) to load only the guidance needed for the work.
3. **Inspect the repository.** Read the related markup, styles, JavaScript, data, state, tests, documentation, and existing patterns before editing.
4. **Define the smallest useful implementation.** Identify the vertical slice that demonstrates the requested learning or behaviour without speculative extensibility.
5. **Consider implications.** Map the effect on visitor flow, state, KPI logic, copy, visual hierarchy, keyboard/touch access, responsive layout, and shared architecture.
6. **Implement cohesively.** Make the required markup, style, state/data, rendering, interaction, and copy changes together so the feature cannot appear partially wired.
7. **Review visual and interaction consistency.** Apply the relevant design, accessibility, content, and positioning skills against the rendered result.
8. **Test the feature.** Run the smallest relevant existing checks and exercise the exact path, including repeated, reset, and invalid paths where applicable.
9. **Check the product result.** Confirm the work makes an operational relationship clearer and does not drift toward a generic game or dashboard.
10. **Summarise honestly.** State what changed, what was validated, any assumptions, and remaining risks.

## Feature Brief

Before coding a substantial feature, capture these answers in the implementation plan or task discussion:

```text
Visitor outcome:
Operational friction or relationship:
Primary skill combination:
Scope included:
Scope explicitly excluded:
State and KPI effects:
Accessibility and responsive considerations:
Validation plan:
```

This is a planning aid, not a new documentation file unless the user asks for one.

## Incremental Delivery Model

Build the experience in coherent stages:

1. Establish a small accessible shell, visual foundation, and state model.
2. Build one excellent challenge end to end.
3. Review the challenge for product, interaction, state, and responsive quality.
4. Extract only the patterns proven reusable by that challenge.
5. Add the next challenge using the refined patterns.
6. Complete a final cohesion review across the full journey.

Do not build all five mini-games simultaneously. Do not create a generic game engine before a real repeated need is demonstrated.

## Scope Decision Rules

Prefer a feature when it:

- Makes a visitor decision or operational relationship clearer.
- Fits an established progression phase.
- Reuses or deliberately improves an existing pattern.
- Has an explainable state and feedback outcome.
- Can be validated in the current static frontend.

Reduce, defer, or reject a feature when it:

- Exists primarily for visual novelty, arbitrary reward, or simulated complexity.
- Requires fake integrations, a backend, or new dependencies without user approval.
- Adds multiple new patterns before one has been proven.
- Cannot explain its effect on the experience, state, or product message.

## Do

- Inspect before editing and preserve sound existing conventions.
- Deliver end-to-end vertical slices rather than disconnected markup or placeholders.
- Identify cross-cutting effects before changing shared state or styles.
- Keep a feature's scope explicit and resist unrelated cleanup during implementation.
- Use the review skill before declaring success.

## Avoid

- Building future abstractions, routes, data models, or dependencies without a current need.
- Implementing a screen without its state, feedback, accessibility, and responsive behaviour.
- Making a local visual change without checking shared components or layouts.
- Treating a user request as permission to bypass product boundaries.
- Declaring a partial prototype complete.

## Review Checklist

- Is the intended visitor outcome explicit and fulfilled?
- Were relevant existing patterns inspected and reused?
- Is the implementation a smallest cohesive vertical slice?
- Have state, KPI, visual, interaction, copy, accessibility, and responsive effects been considered?
- Was the exact requested behaviour tested and reported honestly?
