---
name: challenge-design
description: Apply when planning, implementing, revising, or reviewing any Trion Labs mini-game or operational challenge.
---

# Challenge Design

## Purpose

Create short, satisfying operational challenges that demonstrate how Trion finds friction and builds flow. Each challenge should teach one useful relationship through a small number of meaningful interactions.

## When to Use

- Designing a new mini-game, challenge flow, decision, outcome, or completion state.
- Revising a challenge that feels unclear, too long, game-like, or disconnected from the wider operation.
- Reviewing whether a challenge earns its KPI impact and capability unlock.

## Challenge Contract

Every challenge must define:

1. **Operational problem:** A concrete friction in a simplified manufacturing scenario.
2. **Short story:** A concise operational situation that creates urgency without requiring specialist knowledge.
3. **Visible objective:** A clear statement of what the visitor is trying to investigate or improve.
4. **Why it matters:** The performance, decision, or people impact of leaving it unresolved.
5. **Signal or evidence:** What the visitor can notice, inspect, compare, or connect.
6. **Meaningful interaction:** A small action that reflects investigation or intervention.
7. **Decision:** A credible choice, sequence, or prioritisation with a clear reason.
8. **Feedback:** What changed, why it changed, and which relationship was revealed.
9. **KPI impact:** A bounded, causally explained outcome, including any trade-off.
10. **Capability outcome:** A named operating capability the intervention enables.
11. **Methodology link:** The applicable Trion improvement principle.
12. **Before-and-after evidence:** A concise comparison that makes the outcome visible.

Keep the active interaction count small. One strong decision supported by one or two investigative steps is better than a long sequence of arbitrary tasks. Design the active journey to take approximately 30-90 seconds, excluding optional exploration of supporting detail.

## Planned Challenge Map

| Challenge | Operational friction | Main learning | Primary principle | Potential capability |
| --- | --- | --- | --- | --- |
| The Missing Minutes | Production losses, downtime, waiting, changeovers, poor visibility | Losses must become visible before they can be improved. | Understand | Connected Production View |
| The Quality Loop | Disconnected production and quality information | Conditions and defects become actionable when related data is connected. | Connect information | Production + Quality Integration |
| The Spreadsheet Shuffle | Manual planning, duplicate entry, spreadsheet workflows | Simplify and standardise work before automating it. | Simplify, Standardise, Automate | Workflow Automation |
| The Delivery Domino | Material, logistics, planning, and delivery dependencies | Delivery risk is understood across the operation, not at one isolated station. | See the wider operation | Logistics + Production Visibility |
| The Control Room | Unfocused operational information and audience-specific needs | Useful measurement gives the right people an actionable shared view. | Measure, Improve | Central Operational View |
| The Improvement Challenge | Sustaining gains and prioritising the next bottleneck | Transformation is iterative, measurable, and continuous. | Measure, Improve | Continuous Improvement |

The complete experience has these six challenges. Use this map as a design boundary, not as a reason to simulate every related factory system. Build them one at a time and use proven patterns, while preserving their shared end-to-end narrative.

## Intended Mechanic Variety

Keep a common learning loop, but vary the evidence and decision appropriately:

| Challenge | Appropriate focused interaction |
| --- | --- |
| The Missing Minutes | Inspect a production timeline, compare planned versus actual time, identify the largest avoidable loss, then choose an improvement. |
| The Quality Loop | Connect relevant production, quality, process, shift, machine, or material information to investigate a likely defect cause. |
| The Spreadsheet Shuffle | Simplify a manual workflow by sequencing steps, removing duplication, connecting information, and selecting suitable automation. |
| The Delivery Domino | Trace a material dependency chain, identify affected work, and compare where an intervention prevents disruption. |
| The Control Room | Curate a focused role-relevant view by selecting, grouping, prioritising, and removing KPIs or information. |
| The Improvement Challenge | Compare and rank next-step opportunities using impact, effort, risk, data quality, and operational readiness. |

Use an accessible click or selection alternative whenever a mechanic could be represented by drag and drop.

## Required Design Process

### 1. Write the Challenge Brief

Use this compact brief before implementation:

```text
Scenario:
Operational signal:
Visitor investigation:
Decision or intervention:
Immediate feedback:
KPI effect and explanation:
Capability unlocked:
Trion methodology connection:
```

If the brief cannot be stated clearly, reduce the scope before designing the interaction.

### 2. Design the Learning Loop

1. Establish the scenario and the consequence of inaction.
2. Make a relevant signal observable.
3. Let the visitor inspect or connect evidence.
4. Ask for one credible intervention.
5. Explain the immediate operational effect.
6. Show a measurable consequence and the capability it unlocks.

Allow a meaningful suboptimal decision where it teaches sequencing or trade-offs. Explain the consequence and affected KPI, then offer a retry or alternative rather than a punishing failure state.

### 3. Make Outcomes Credible

An intervention should affect only the relationships it plausibly changes. For example, identifying changeover loss can improve visibility and support throughput improvement, but it should not automatically claim a quality improvement without a quality-related intervention.

If a choice has a trade-off, disclose it. A simplified demonstration may use illustrative values, but it must explain that it represents a relationship rather than a forecast.

## Do

- Use concise scenarios grounded in observable operational work.
- Make the decision feel consequential through evidence and explanation.
- Let a capability unlock describe the improved way of working.
- Reuse interaction patterns only when they still fit the operational problem.
- Finish a challenge promptly after its learning has landed.

## Avoid

- Timers, points, randomisation, collectibles, or leaderboards without operational meaning.
- Puzzles whose solution depends on hidden rules or specialist factory knowledge.
- Multiple unrelated tasks in a single challenge.
- KPI changes that merely reward completion.
- Pretending an illustrative scenario is a live factory model.

## Review Checklist

- Can the operational problem be stated in one sentence?
- Does the visitor have enough evidence to make the decision?
- Is each interaction necessary to the learning?
- Does the outcome explain the KPI effect and capability gained?
- Is the challenge short, understandable, and connected to Trion methodology?
- Does it include a visible objective and concise before/after evidence within the intended 30-90 second interaction?
