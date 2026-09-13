---
name: code-quality
description: Apply when writing, refactoring, or reviewing Trion Labs code to keep a small vanilla frontend clear, dependable, and easy for the next developer or Copilot session to modify.
---

# Code Quality and Maintainability

## Purpose

Keep the implementation proportionate to a small interactive experience: clear enough to reason about, structured enough to change safely, and free from avoidable failures or dead weight.

## When to Use

- Writing or refactoring HTML, CSS, JavaScript, data definitions, or tests.
- Fixing bugs involving duplicate logic, unclear state, brittle DOM access, or unexpected errors.
- Reviewing a change before it is considered complete.

## Core Principles

- Prefer the simplest explicit implementation that preserves a clear separation of responsibility.
- Use names that explain the domain or outcome, not an implementation accident.
- Represent durable rules once, then derive UI from them.
- Keep functions small enough to state their input, output, and side effect clearly.
- Add a layer of abstraction only when it removes a real repetition or isolates a stable responsibility.
- Preserve intentional existing conventions unless there is a clear reason to change them.

## JavaScript Rules

- Keep authoritative application state and effect data central rather than mutating isolated DOM values.
- Use named constants or metadata for repeated business values, statuses, KPI keys, and timing values; do not scatter unexplained literals.
- Prefer focused functions such as `calculateKpis`, `applyDecisionEffect`, and `renderChallengeStatus` over one handler that owns unrelated work.
- Validate inputs at the boundary where an event, URL value, or DOM dataset becomes application state.
- Make invalid transitions visible through explicit errors or appropriate user feedback; do not silently return as though work succeeded.
- Avoid broad `try`/`catch` blocks that hide defects. Handle expected errors narrowly and surface unexpected failures during development.
- Bind listeners predictably and ensure repeat render or reset paths do not create duplicate event handlers.
- Avoid unnecessary global variables. If a small global application entry point is required for bootstrap, keep its surface minimal.

## HTML and CSS Rules

- Use semantic HTML and meaningful class names before adding JavaScript hooks.
- Keep CSS selectors shallow and component-oriented. Do not rely on fragile page-position selectors for component state.
- Put visual state in classes or attributes driven by the state model, not inline styles scattered through handlers.
- Reuse tokens and established component patterns for colour, spacing, typography, borders, and motion.
- Remove superseded selectors and markup rather than leaving parallel unused implementations.

## Documentation and Comments

- Let clear names and small functions explain ordinary code.
- Comment only non-obvious intent, a deliberate trade-off, or a business rule that is not evident from the code itself.
- Keep comments correct when modifying the related logic.
- Document an important constraint near the code only when the corresponding skill or data definition cannot make it discoverable.

## Required Implementation Check

Before completing a change:

1. Read the affected code and adjacent patterns after the edit, not only the diff.
2. Search for duplicated values, selectors, handlers, and obsolete references introduced by the change.
3. Exercise valid, invalid, repeated, and reset paths for the changed logic.
4. Check the browser console for avoidable errors or warnings.
5. Remove temporary code, unreachable branches, unused assets, and placeholder behaviour.
6. Run the smallest relevant existing validation.

## Do

- Choose clear domain language such as `deliveryRisk`, `completedChallenges`, and `unlockedCapabilities`.
- Keep data, transition logic, rendering, and event wiring independently understandable.
- Make failure states explicit and actionable.
- Refactor locally when the changed code would otherwise create a tightly coupled duplication.
- Keep formatting consistent with nearby files and existing tooling.

## Avoid

- Magic numbers, ambiguous one-letter names, and copied logic with subtle differences.
- Silent fallback values that conceal a missing element, invalid action, or data error.
- One-off DOM mutations that conflict with the central render path.
- Large generic utility modules, class hierarchies, or dependency additions for a single use.
- Dead code, commented-out alternatives, broken links, or incomplete placeholder controls presented as finished work.

## Review Checklist

- Are names, responsibilities, and side effects clear?
- Are rules and values represented once at an appropriate layer?
- Do invalid and repeated paths fail or recover explicitly rather than silently?
- Has the change avoided new duplication, dead code, and avoidable console errors?
- Is the implementation still proportionate to a small vanilla frontend?
