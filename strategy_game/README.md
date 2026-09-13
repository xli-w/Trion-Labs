# Trion Labs

Trion Labs is a standalone, front-end operational strategy experience. This
initial implementation delivers the Phase 1 foundation: the landing experience,
lab overview, operational model, central game state, navigation, reset flow,
and extension boundaries for the six challenge modules.

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
- `js/miniGames/registry.js` registers the six challenge contracts and exposes
  their progression rules without coupling their future mechanics to the shell.
- `js/miniGames/missingMinutes.js` owns the first challenge's illustrative
  timeline, intervention rules, and focused interaction state.
- `js/miniGames/qualityLoop.js` owns the second challenge's illustrative
  production-quality evidence links, diagnosis rules, and intervention state.
- `../theme.js` owns the shared local colour preference used by the strategy
  experience and standalone mini-games.

Future mini-game modules should own only their focused interaction. On a
completed decision they can call `completeChallenge()` from `js/game.js` with
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

## Remaining foundation scope

The challenge map provides complete scenario briefings and preserves the
intended challenge sequence. The distinct 30-90 second interactive mechanics
for challenges three through six remain deliberately isolated behind the
registry for later implementation. No backend, external API, framework, or
visitor-progression persistence is used. The selected colour theme is stored
locally so it remains in place across reloads and implemented mini-games.
