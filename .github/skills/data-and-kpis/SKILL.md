---
name: data-and-kpis
description: Apply when defining, calculating, displaying, explaining, or reviewing Trion Labs KPIs, charts, process flows, comparisons, or operational status indicators.
---

# Data and KPI Design

## Purpose

Use a small amount of clear operational data to make relationships and consequences understandable. Data in Trion Labs should help a visitor answer a question, not recreate an enterprise dashboard.

## When to Use

- Adding or changing a KPI, metric, chart, timeline, comparison, process flow, dependency chain, summary, or status indicator.
- Defining the data model or feedback for a challenge outcome.
- Reviewing whether a visualisation is legible, credible, and connected to a decision.

## KPI Definition Rules

Before displaying a KPI, define:

| Field | Question to answer |
| --- | --- |
| Meaning | What does this measure in the simplified operation? |
| Decision value | Why should this visitor care about it now? |
| Inputs | Which observable facts or decisions can change it? |
| Direction | Is higher or lower generally better, or does it need contextual interpretation? |
| Relationship | Which other KPIs, processes, or capabilities does it influence or contextualise? |
| Presentation | What label, unit, baseline, and comparison make it intelligible? |
| Explanation | How will the visitor learn why it changed? |

Centralise this metadata and the related effect rules so the same definition drives challenge feedback, KPI cards, and summaries.

## Suggested Operational KPI Set

Use only the metrics needed for the current decision. The following set provides a useful shared vocabulary:

| KPI | Represents | Typical relationship to explain |
| --- | --- | --- |
| Throughput | Useful output over time | Waiting, downtime, handoffs, and changeovers can constrain flow. |
| Quality | Conformance or defect performance | Production conditions and quality information must be related before causes become actionable. |
| Delivery | Reliability of meeting a commitment | Material, logistics, and planning dependencies can introduce risk upstream. |
| Productivity | Useful output relative to effort or resources | Simplified, standardised work can reduce duplicate effort; it does not mean asking people to work harder. |
| Visibility | Timely, useful operational information | Connected data and shared views improve the ability to see and act on friction. |
| Cost | Operational resource or loss impact | A change may reduce avoidable cost or expose a trade-off requiring consideration. |

Do not show all six by default. Select the two to four metrics that make the current relationship clearest, then connect those local outcomes to a concise overall summary.

## Visualisation Selection

Choose the smallest visual that answers the visitor's question:

| Visitor question | Appropriate presentation |
| --- | --- |
| What changed after this intervention? | Before-and-after comparison with an explanatory delta. |
| When or where is loss concentrated? | Compact timeline, shift comparison, or labelled process segment. |
| Which handoff or dependency creates risk? | Process flow or dependency chain with readable status labels. |
| How do two data sources relate? | Aligned comparison, linked records, or a simple relationship view. |
| What should this role watch next? | Focused role-specific summary with a small number of metrics. |
| What has been unlocked overall? | Capability summary connected to completed operational improvements. |

Use charts only when they reveal a pattern more clearly than text and a labelled comparison. A chart must have a clear question, meaningful scale, concise labels, and explanatory context.

## Presentation Hierarchy

For a KPI or status display, make the reading order explicit:

1. Label the measure or operational status.
2. Show the current value or state with an appropriate unit.
3. Show the relevant comparison or direction of change.
4. State the time, scenario, role, or process context.
5. Explain the causal relationship when the value is an outcome of a decision.

Use colour as a supporting signal, never the sole indicator. Avoid fake precision: use illustrative figures only when the visitor can understand their relationship and do not imply they are a forecast or live factory data.

## Required Process

1. Start with the operational question, not a preferred chart type.
2. Identify the minimal data required to answer it.
3. Define the source state and derived calculation or comparison.
4. Link each displayed change to a named decision or scenario condition.
5. Design the empty, neutral, attention, and completed states.
6. Review labels, scale, contrast, and narrow-screen readability.
7. Check that no visualisation duplicates information without adding a new insight.

## Do

- Prefer simple comparisons and well-labelled process flows over dense visualisations.
- Explain relationships, not just directional arrows.
- Use baselines and context so an improvement claim is meaningful.
- Keep status language operational and actionable.
- Represent trade-offs honestly when they belong to the scenario.

## Avoid

- Full dashboard grids, decorative sparklines, gauges, or charts with no question.
- Truncated labels, unexplained acronyms, or colour-only severity.
- Scales that exaggerate tiny changes or hide meaningful variation.
- A KPI increase as an automatic reward for every completed task.
- Presenting illustrative data as real, live, or predictive production data.

## Review Checklist

- Can the visitor state what each displayed KPI represents and why it matters?
- Does every visual answer a clear operational question?
- Are values, comparisons, units, and scenario context legible?
- Can each change be traced to a decision or state transition?
- Has the display avoided becoming a passive enterprise dashboard?
