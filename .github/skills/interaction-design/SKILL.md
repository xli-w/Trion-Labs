---
name: interaction-design
description: Apply when designing or changing controls, selections, feedback, loading, error, completion, keyboard, touch, or motion behaviour in Trion Labs.
---

# Interaction Design

## Purpose

Make operational exploration feel clear, responsive, and meaningful across pointer, keyboard, touch, and reduced-motion contexts.

## When to Use

- Adding or revising any control, selection, drag interaction, feedback state, transition, completion state, or error state.
- Reviewing usability, input parity, or whether feedback explains an action's consequence.
- Implementing loading, progressive disclosure, keyboard navigation, or touch behaviour.

## Core Principles

- Every interactive element must make its available action clear before activation.
- Every meaningful action must receive timely, causal feedback.
- Feedback should explain what changed and why it matters operationally, not merely score correctness.
- Pointer convenience must not be the only way to complete an essential action.
- Motion and loading treatment must reflect a real state or explain a relationship.

## Required Interaction Pattern

For a consequential decision, provide:

1. **Context:** The operational issue and evidence needed to act.
2. **Affordance:** A labelled, visibly interactive control or option.
3. **State visibility:** Clear selected, available, unavailable, pending, and completed states.
4. **Confirmation:** An immediate acknowledgement of the action.
5. **Operational feedback:** What changed, why it changed, affected KPI or relationship, and any trade-off.
6. **Next step:** A clear route to continue, inspect the result, or revise where appropriate.

A useful feedback message follows this shape:

```text
What changed: Changeover losses are now visible by shift.
Why it matters: Supervisors can distinguish waiting from equipment downtime.
Operational outcome: Visibility improved; the next improvement can target the largest source of lost time.
```

Do not substitute "Correct", "Wrong", or "You gained 100 points" for this explanation.

## Input and Control Rules

- Use native buttons, links, inputs, and controls whenever they fit the interaction.
- Make buttons describe their outcome: "Compare changeover losses" is preferable to "Continue".
- Give selected and completed states a persistent visual and textual distinction.
- Do not make hover content essential; touch and keyboard users must receive equivalent information.
- Use drag and drop only when spatial movement is itself the operational concept. Provide an accessible alternative, such as select, move up/down controls, or explicit destination actions.
- Support keyboard activation with Enter and Space where native controls do not already do so. Preserve logical focus order and visible focus.
- Make touch targets comfortably usable and avoid interactions requiring precise hover or tiny handles.

## Feedback, Errors, and Loading

- Preserve a visitor's valid input when an action cannot proceed, then explain what is needed.
- Make validation or error text specific and located near the affected decision.
- Do not fake loading to make a local state change feel more dramatic.
- If real loading is introduced later, identify what is loading, keep the interface stable, and announce progress appropriately.
- Use completion states to connect the resolved friction to the KPI effect and unlocked capability.
- Use progressive disclosure for details that help investigation but are not needed for the first action.

## Motion and Reduced Motion

- Use motion to connect cause and effect, orient visitors after navigation, or show a meaningful change in flow.
- Keep duration and distance restrained; the outcome must remain understandable without animation.
- Honour `prefers-reduced-motion` by removing nonessential transitions and using static state changes.
- Do not use flashing, repeated pulse effects, confetti, decorative loops, or movement that competes with evidence.

## Do

- Make the current interactive region and next action obvious.
- Explain unavailable states and prerequisites.
- Use concise, specific feedback that teaches the operational relationship.
- Offer reversible exploration where it does not undermine the scenario.
- Test every core interaction with keyboard, pointer, and touch-sized controls.

## Avoid

- Hover-only controls, unlabeled icon-only actions, and click targets built from nonsemantic elements.
- Hidden gesture requirements, accidental drag activation, or pointer-only completion paths.
- Success/failure language without explanation.
- Fake delays, generic toast messages, or feedback that disappears before it can be read.
- Motion that is required to understand the result.

## Review Checklist

- Does every action have a clear affordance, state, and response?
- Does feedback explain the operational consequence rather than just correctness?
- Can a keyboard and touch user complete the same core task?
- Are errors and unavailable states actionable?
- Does reduced-motion behaviour preserve the meaning of the interaction?
