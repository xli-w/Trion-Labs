# Trion Labs

Trion Labs is a standalone, front-end operational strategy experience. This
initial implementation delivers the Phase 1 foundation: the landing experience,
lab overview, operational model, central game state, navigation, reset flow,
and extension boundaries for the six challenge modules.

## Run locally

The lab intentionally has no build step or runtime dependencies. From the
repository root, serve the folder with a simple static development server:

```bash
python -m http.server 4173 --bind 127.0.0.1 --directory labs/strategy_game
```

Open `http://127.0.0.1:4173`. Any static development server that serves
`labs/strategy_game` as its root will also work.

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
  renderers. `js/ui.js` orchestrates those screens and translates DOM actions
  into controller callbacks.
- `js/miniGames/registry.js` registers the six challenge contracts and exposes
  their progression rules without coupling their future mechanics to the shell.

Future mini-game modules should own only their focused interaction. On a
completed decision they can call `completeChallenge()` from `js/game.js` with
the challenge id, KPI changes, resource costs, decision record, and unlocked
capability ids. The state store then records the result and updates the
aggregate operational score and capability stage.

## Scope of this foundation

The challenge map provides complete scenario briefings and preserves the
intended challenge sequence. The distinct 30-90 second interactive mechanics
are deliberately isolated behind the registry for the next implementation
phase. No backend, external API, framework, or persistent storage is used.
