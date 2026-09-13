---
name: state-and-progression
description: Apply when modelling or changing screens, challenge completion, decisions, KPI effects, capabilities, notifications, progress, or reset behaviour.
---

# State and Progression

## Purpose

Make progression truthful, explainable, and robust. A visitor's decisions must drive state, KPI changes, feedback, and capability unlocks through one coherent model.

## When to Use

- Creating or changing challenge logic, screen navigation, decision effects, KPI values, unlocks, notifications, progress, or reset behaviour.
- Debugging inconsistent UI, stale values, contradictory completion states, or challenge-order problems.
- Designing new metrics or outcomes that depend on prior choices.

## State Model

Maintain a single application state object or equivalent central source of truth. Keep authoritative values separate from values that can be calculated from them.

At minimum, model:

- Current screen or route.
- Challenge status and decision made for each challenge.
- Unlocked methodology and integration upgrades, including their practical capabilities.
- KPI baseline, current, previous, target, effect, and display values.
- A derived operational score that represents balanced health, not arbitrary game points.
- Current operational-maturity stage and overall progress.
- Available improvement and integration capacity where a decision needs to express a credible constraint.
- Active notification, outcome feedback, and before/after comparison data.
- Any selected item needed to continue an interaction.

Use a fresh initial-state factory rather than reusing a mutable initial object. A conceptual shape is:

```js
function createInitialState() {
  return {
    currentScreen: "landing",
    completedChallenges: [],
    decisions: {},
    unlockedUpgrades: [],
    kpis: {},
    operationalScore: 0,
    capabilityStage: 1,
    resources: {
      improvementCapacity: 3,
      integrationCapacity: 2
    },
    notifications: []
  };
}
```

The exact properties should fit the implementation, but avoid adding state that can be reliably derived from another authoritative value.

## Operational Maturity and Score

Represent capability progression as operational maturity, never as a conventional game level:

| Stage | Name | Meaning |
| --- | --- | --- |
| 1 | Fragmented | Information is scattered and friction is difficult to see. |
| 2 | Visible | Processes and KPI signals are clearer. |
| 3 | Connected | Systems and information start working together. |
| 4 | Responsive | People can act faster because information reaches the right place. |
| 5 | Improving | The operation can measure, learn, and continuously improve. |

Derive the current stage from explicit completion, capability, and decision rules. Pair it with a progress indicator, stage label, short description, unlock indicators, and a visible evolution of the operating model.

If the overview contains an `operationalScore`, calculate it from the documented health of relevant KPIs and capabilities. It must communicate balance and trade-offs, not award points for simply clicking through a challenge. Define how missing, neutral, and poor decision outcomes affect it.

## Required Transition Process

For every meaningful action:

1. Validate that the action is available in the current state.
2. Record the decision or completed interaction as the source fact.
3. Apply the named effect associated with that decision.
4. Recalculate derived KPIs, progress, and unlock eligibility from source facts.
5. Create feedback that explains the operational consequence.
6. Render the new state through the normal render path.
7. Announce important outcome feedback accessibly when appropriate.

Do not update a card, badge, or KPI directly as a special case. The UI should reflect state; it must not become a second state store.

## KPI and Capability Rules

Define a meaningful causal reason for every KPI movement. A decision may improve throughput and visibility while leaving quality unchanged, or improve delivery confidence while exposing a cost trade-off. Do not make every positive action increase every metric.

For each effect, define:

- The decision or completion condition that triggers it.
- The affected KPI or capability.
- Direction and magnitude appropriate to the simplified scenario.
- A short explanation of the operational relationship.
- Any prerequisite or trade-off.

Use named effect data rather than unexplained number changes scattered through handlers. Clamp displayed values only when the KPI's real scale has a documented valid range.

Model methodology upgrades (`Understand`, `Simplify`, `Standardise`, `Automate`, and `Measure`) and integration upgrades as practical capabilities. A connection must create a new ability to see, coordinate, or decide, not merely increase a KPI. Track capacity only when it makes an operational choice meaningful; it must not act as an arbitrary countdown or prevent a visitor from learning through a retry.

Unlock a capability when its stated conditions are met. Prevent duplicate unlocks and make repeated completion idempotent. Capability names should describe the operating ability gained, such as "Connected Production View", rather than a game reward.

## Progression Rules

- The default path should follow Observe -> Investigate -> Decide -> Improve -> Measure -> Unlock.
- Do not allow a later action to bypass the evidence or decision that makes it meaningful unless deliberate exploration is an explicit product choice.
- Preserve completed work when visitors move among allowed screens.
- Make unavailable actions understandable: explain what needs to happen first instead of presenting a silent disabled control.
- Test completion in more than one allowable challenge order if the experience permits non-linear progress.
- Record a suboptimal decision deterministically, explain its trade-off through the affected KPI, and allow an alternative or retry when the challenge design calls for it.
- Treat the Improvement Challenge as the transition to the `Improving` stage and the `Continuous Improvement` capability, not as a declaration that all friction has disappeared.

## Reset Behaviour

Reset must return all source state, derived UI, capabilities, notifications, selections, and progress indicators to a fresh initial condition. It must not retain stale DOM classes, event state, or old KPI values.

If reset discards meaningful visitor progress, make the consequence clear and provide a deliberate confirmation pattern appropriate to the established design. Do not make reset impossible to find or silently partial.

## Do

- Calculate progress and displayed KPI values from central rules.
- Keep baseline values and decision effects inspectable.
- Pair every state change with concise, causal feedback.
- Use deterministic rules so equivalent decisions produce equivalent outcomes.
- Test reset, revisiting a completed challenge, and all allowed progression paths.

## Avoid

- Random, unexplained KPI movement.
- Arbitrary points, XP, or rewards with no operational meaning.
- Hard-coded KPI values in separate screen templates.
- Completion flags that contradict unlocked capabilities or current screens.
- Updating state only in visual event handlers.

## Review Checklist

- Is there one source of truth for progress and outcomes?
- Can every KPI movement be traced to a named decision and explanation?
- Are source facts separated from derived values?
- Are unlocks idempotent and prerequisites clear?
- Does reset restore a genuinely fresh initial experience?
