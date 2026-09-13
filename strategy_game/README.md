# Trion Labs

Trion Labs is a standalone, front-end operational strategy experience. This
initial implementation delivers the Phase 1 foundation: the landing experience,
lab overview, operational model, central game state, navigation, reset flow,
and five connected challenge modules.

## Run locally

The lab intentionally has no build step or runtime dependencies. From the
repository root, serve the repository with a simple static development server:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/strategy_game/`. Serving the repository root keeps
the shared `theme.js` module available to the experience. Any static
development server with the same document root will also work.

## Architecture

- `index.html` contains only the document shell and loads the application as an
  ES module.
- `css/` separates global visual tokens and layout from reusable components and
  responsive rules.
- `js/data.js` owns deterministic, display-independent operational data.
- `js/state.js` owns the immutable-style central state store and all state
  transitions.
- `js/game.js` is the application-facing game service. UI code calls it rather
  than changing state directly.
- `js/views/` owns the semantic landing, overview, and challenge-briefing
  renderers, plus focused renderers for implemented mini-games. `js/ui.js`
  orchestrates those screens and translates DOM actions into controller
  callbacks.
- `js/miniGames/registry.js` registers the five challenge contracts and exposes
  their progression rules without coupling their focused mechanics to the shell.
- `js/miniGames/missingMinutes.js` owns the first challenge's illustrative
  timeline, intervention rules, and focused interaction state.
- `js/miniGames/qualityLoop.js` owns the second challenge's illustrative
  production-quality evidence links, diagnosis rules, and intervention state.
- `js/miniGames/spreadsheetShuffle.js` owns the third challenge's illustrative
  planning workflow, simplification rules, standardisation choices, and
  automation decision state.
- `js/miniGames/deliveryDomino.js` owns the fourth challenge's illustrative
  material-delay dependency chain, intervention rules, and delivery-response
  state.
- `../theme.js` owns the shared local colour preference used by the strategy
  experience and standalone mini-games.

Each mini-game module owns only its focused interaction. On a completed
decision it can call `completeChallenge()` from `js/game.js` with
the challenge id, KPI changes, resource costs, decision record, and unlocked
capability ids. The state store then records the result and updates the
aggregate operational score and capability stage.

## Implemented interactive challenges

`The Missing Minutes` is the first completed challenge. It uses an illustrative
two-hour production timeline rather than live factory data. Visitors inspect
individual events, compare planned and unplanned time with known and unknown
causes, then choose a first improvement. The strongest intervention captures
downtime context, changes only throughput, productivity, and visibility in the
scenario, and unlocks the Connected Production View.

Suboptimal interventions explain their trade-off and offer a retry; they do not
persist KPI changes or mark the challenge complete. Reset restores the full
challenge and operational state.

`The Quality Loop` is the second completed challenge. Visitors select pairs of
illustrative production, quality, material, machine, shift, and process records
to reveal their shared context. Three lead connections show that the defect
spike follows material batch MB-482, while the machine and shift records remain
useful context rather than the likely source. After testing the cause, visitors
choose the first improvement. Connecting production and quality records applies
a bounded quality, visibility, and productivity effect and unlocks Production +
Quality Integration. Other interventions explain why a standard or dashboard
alone does not make disconnected case information actionable, then allow a
retry.

`The Spreadsheet Shuffle` is the third completed challenge. Visitors use a
two-step simplification budget to remove copied production figures and the
manual reconciliation they create. They then choose a source-led standard
planning route before choosing what to automate. Automating the connected
schedule update applies bounded productivity, visibility, cost, and delivery
effects and unlocks Workflow Automation. Choices that preserve a spreadsheet
workaround or email-based handoff explain the trade-off and offer a retry.

`The Delivery Domino` is the fourth completed challenge. Visitors trace an
illustrative late material delivery through the production schedule, available
capacity, customer orders, and delivery commitments. Connecting material status
with planning turns the delay into an earlier shared exception, applies bounded
delivery, visibility, and throughput effects, and unlocks Logistics +
Production Visibility. A logistics-only report and a manual capacity response
explain their narrower trade-offs and allow a retry.

`The Control Room` is the fifth completed challenge. Visitors curate four
signals that explain the material exception, its work response, and its customer
impact; then they prioritise management, production, and planning without
interrupting every role. Publishing one shared exception view, filtered by
role, applies bounded visibility, productivity, and delivery effects and
unlocks the Central Operational View. An overloaded management page and
separate static reports explain why more information or tailored reports alone
do not create an actionable shared decision.

## Experience completion

The five challenges form one operational progression: understand the loss,
connect the relevant information, simplify and automate a workflow, coordinate
dependencies, then measure the shared decision. Completing The Control Room
reveals a final overview that records the decisions, capabilities, and
illustrative before-and-after KPI context. The operational model adds each
named relationship as its related capability is unlocked, making the growing
cross-functional context visible on desktop and narrow layouts. No backend,
external API, framework, or visitor-progression persistence is used. The
selected colour theme is stored locally so it remains in place across reloads
and challenges.
