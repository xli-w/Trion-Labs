You are refining the first mini-game in Trion Labs: **The Missing Minutes**.

The existing Trion Labs project is a vanilla HTML/CSS/JavaScript interactive experience. Work within the existing architecture and visual system. Do not rebuild the application or introduce a framework.

## Objective

Make this a polished, satisfying 60–90 second interaction that demonstrates Trion's **Understand** principle.

The visitor should feel like they are investigating a real operational problem, not completing a generic puzzle.

## Story

A production line is missing its target.

The line appears to be running, but time is being lost in several places. The visitor must investigate the production timeline, identify the most important source of avoidable loss, and choose an appropriate improvement.

## Interaction

Create a visually clear production timeline containing a sequence of events:

- Running
- Waiting
- Changeover
- Minor stop
- Breakdown
- Material delay

The visitor should be able to click individual events to inspect:

- What happened
- How long it lasted
- Whether it was planned or unplanned
- Whether the cause is known
- Its effect on production

The visitor must identify the most important avoidable loss.

Do not make the answer arbitrary. The information shown should allow the visitor to reason toward the correct decision.

## Decision

After investigating, present 2–3 improvement choices.

Examples:

- Improve downtime data capture.
- Standardise downtime categories.
- Connect production events to a live operational view.

Each choice should have a different effect.

The best choice should depend on the actual problem discovered.

## Feedback

Show immediate, meaningful feedback:

- Highlight the selected timeline event.
- Explain why it matters.
- Show the KPI impact.
- Show what becomes possible after the improvement.

Avoid simply displaying “Correct!” or “Wrong!”

Use feedback such as:

> “The line is losing time, but the bigger problem is that nobody can consistently explain where it is going. Better data capture makes the next improvement possible.”

## KPI impact

Update a small number of relevant KPIs:

- Throughput
- Productivity
- Visibility

Do not increase every KPI.

Show a before/after comparison.

## Upgrade

Unlock:

**Connected Production View**

This should appear as a meaningful capability, not just a badge.

Explain that the operation can now see production events more clearly.

## Design requirements

- Make the timeline the visual centrepiece.
- Use subtle animation when events are inspected.
- Make the selected event visually distinct.
- Keep the interaction simple and intuitive.
- Make the result feel satisfying.
- Use the existing Trion white / #281a39 visual system.
- Avoid excessive game-like effects.
- Ensure the game works on mobile.

## Success criteria

The visitor should finish understanding:

> “Before improving a process, you need to understand what is actually happening.”

Do not add unrelated features. Focus on making this one game feel finished, coherent, and genuinely useful.