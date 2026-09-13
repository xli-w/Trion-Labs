---
name: testing-and-review
description: Apply before declaring any Trion Labs change complete, especially after changes to flows, challenges, state, visual presentation, interactions, or responsive behaviour.
---

# Testing and Review

## Purpose

Provide an honest completion gate for Trion Labs. A change is complete only after its functional behaviour, visual hierarchy, interactions, accessibility, and product intent have been checked at a scope appropriate to the work.

## When to Use

- Before presenting a feature, bug fix, refactor, or visual change as complete.
- Reviewing a challenge, progression path, responsive behaviour, or final demo flow.
- Investigating a regression after changing state, rendering, controls, or shared styles.

## Validation Strategy

Use the smallest existing automated test, lint, build, or browser validation that covers the changed behaviour. Do not add a dependency merely to create a nominal check. When no test infrastructure exists, perform and document targeted manual verification instead of implying automated coverage.

Test the changed path first, then test the closest shared behaviour likely to regress. Escalate to a broader review when state, shared layout, or shared components are affected.

## Functional Checklist

- A fresh load shows the expected starting state.
- Navigation reaches each affected screen and preserves or resets state as designed.
- Every changed button, link, selection, and control performs its advertised action once.
- Challenge decisions record correctly, apply the correct effects, and cannot create duplicate completion or unlock states.
- KPI values and feedback reflect the central state model.
- Allowed challenge order does not break progression; a completed challenge remains coherent when revisited.
- Reset restores all relevant state, UI, notifications, selected options, progress, and KPI values.
- Invalid or unavailable actions receive clear handling rather than a silent failure.
- Browser console contains no avoidable errors or warnings caused by the change.

## Visual Checklist

- Layout, spacing, typography, borders, and component treatment match the established visual language.
- The operational signal, primary decision, feedback, and KPI consequence have a clear reading order.
- Text, labels, status cues, charts, and focus indicators remain legible.
- No content overflows, clips, overlaps, or becomes inaccessible at tested viewport sizes.
- The visual result is predominantly white with deliberate deep-purple emphasis and restrained semantic colour.
- The page does not drift into a generic dashboard, game HUD, cyberpunk aesthetic, or presentation deck.

## Interaction and Accessibility Checklist

- The first useful action is understandable without an instruction overload.
- Selection, unavailable, loading, error, and completion states are visible and correctly described.
- Keyboard-only use reaches and completes the changed core path with visible focus.
- Touch-sized controls and narrow layouts remain usable.
- Hover is not the only route to essential information.
- Important outcomes are communicated without colour or motion alone.
- Reduced-motion behaviour preserves the outcome and does not require animation to explain it.

## Product Checklist

- The work communicates a specific operational friction, relationship, or capability.
- The visitor can understand why a decision matters.
- Feedback explains a credible consequence rather than rewarding completion generically.
- The feature advances the intended experience: Observe -> Investigate -> Decide -> Improve -> Measure -> Unlock.
- The scope remains a simplified demonstration, not a live factory system or a complex simulation.

## Honest Review Protocol

For each relevant check, record one of:

- **Passed:** State what was exercised.
- **Not run:** State why it could not be run.
- **Failed:** State the observed behaviour and do not call the work complete.
- **Risk remaining:** State the condition that still needs verification.

Do not infer visual, responsive, keyboard, or state correctness solely from code inspection. Do not declare all tests passed when only a partial path was exercised.

## Do

- Test the request's exact outcome, not only a nearby proxy.
- Recheck shared paths after changing central state, layout, or component rules.
- Review the actual rendered experience when visual or interaction behaviour changes.
- Surface remaining risks concisely and honestly.

## Avoid

- Declaring completion after a successful compile or page load alone.
- Testing only the happy path after changing progression.
- Calling a control accessible because it is clickable with a mouse.
- Ignoring console errors, overflow, stale state, or mobile regressions as unrelated.
- Adding broad test infrastructure without a concrete need.

## Review Checklist

- What exact behaviour was exercised and with what result?
- What visual, keyboard, touch, and reduced-motion checks were performed?
- What shared state or component paths could regress, and were they checked?
- Does the final experience still communicate Trion's purpose clearly?
- Are any unverified conditions reported rather than hidden?
