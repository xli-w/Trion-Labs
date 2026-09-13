---
name: experience-design
description: Apply when creating or changing visitor journeys, screens, flows, narratives, or interaction loops in Trion Labs.
---

# Experience Design

## Purpose

Create short, understandable journeys that let visitors experience Trion's approach rather than read a long explanation of it.

## When to Use

- Adding or revising a screen, onboarding step, navigation path, challenge flow, completion moment, or end-to-end journey.
- Deciding whether to introduce a new interaction, explanation, or branch.
- Reviewing whether a feature advances the visitor narrative or adds avoidable complexity.

## Core Principles

- Give each screen one primary visitor question and one clear next action.
- Reveal operational complexity through evidence and decisions, not an upfront instruction manual.
- Keep a visible connection between the local problem and the wider operation.
- Balance action with concise explanation: explain just enough for the visitor to make an informed choice.
- Make discovery satisfying because it changes understanding, not because it triggers decoration.

## Required Process

### 1. Define the Screen Job

For every proposed screen or state, document:

- **Visitor question:** What should the visitor understand or decide here?
- **Evidence:** What signal, comparison, or relationship helps them answer it?
- **Action:** What can they do now?
- **Consequence:** What will become clearer or change after that action?
- **Exit:** What naturally leads to the next phase?

Remove a screen when it duplicates a question already answered elsewhere.

### 2. Preserve Narrative Progression

Use the following shape unless a feature has a stronger, equally clear reason to vary it:

| Phase | Visitor experience | Design response |
| --- | --- | --- |
| Observe | Something is not flowing as expected. | Make the signal visible without giving away the conclusion. |
| Investigate | There is evidence to inspect or compare. | Reveal a useful relationship through a small exploration. |
| Decide | A trade-off or intervention is available. | Offer a small set of meaningful choices with enough context. |
| Improve | The selected intervention changes the operating model. | Show the change in process, information, or visibility. |
| Measure | Consequences become legible. | Explain KPI movement and any trade-off. |
| Unlock | A reusable capability is now available. | Name the capability and relate it to the wider operation. |

### 3. Use a Clear Interaction Loop

Each loop should follow:

1. Set the operational context in one or two concise sentences.
2. Direct attention to an observable signal.
3. Ask the visitor to inspect, compare, sequence, or select.
4. Confirm the decision with causal feedback.
5. Show an outcome and invite the next meaningful action.

Avoid stacking multiple unrelated tasks in one loop. If a visitor needs more than a short explanation to know what to do, simplify the task or disclose it in stages.

## Feature Decision Test

Add a feature only when it improves at least one of the following without materially harming another:

- Clarity of the operational problem.
- Agency in making an informed decision.
- Understanding of a relationship across the operation.
- Credibility of the result.
- Momentum toward the next phase.

For example, a before-and-after process view can clarify the effect of a simplified handoff. A decorative achievement modal that repeats the same information does not improve the journey.

## Do

- Make the first useful action obvious from context, hierarchy, and labels.
- Use progressive disclosure for supporting detail.
- Keep navigation predictable and let visitors recover from a choice when the design permits it.
- Let completion lead to reflection or the next relevant challenge, not a dead end.
- Design every interaction to support the central operational message.

## Avoid

- Long setup screens, unexplained jargon, or instructions that duplicate the interface.
- Branching narratives whose outcomes cannot be explained or tested.
- Hidden rules, surprise penalties, or false urgency.
- Screens that exist only to show more data or visual decoration.
- Treating a challenge as complete before its consequence has been explained.

## Review Checklist

- Does every screen have a distinct job and a clear next action?
- Can the visitor understand the loop without a tutorial overlay?
- Does the flow preserve Observe -> Investigate -> Decide -> Improve -> Measure -> Unlock?
- Does each interaction make a relationship or consequence clearer?
- Has nonessential complexity been removed?
