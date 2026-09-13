---
name: frontend-architecture
description: Apply when creating or changing Trion Labs HTML, CSS, JavaScript, data models, rendering, events, or project structure.
---

# Frontend Architecture

## Purpose

Keep Trion Labs small, understandable, and maintainable as a vanilla HTML, CSS, and JavaScript experience. Architecture should support clear operational interactions without introducing framework-level complexity.

## When to Use

- Adding application files, modules, components, state, event handlers, renderers, or data configuration.
- Refactoring related frontend code.
- Investigating duplicate logic, inconsistent rendering, or tangled DOM and state behaviour.

## Core Constraints

- Preserve the existing stack and conventions after inspecting the repository.
- Prefer HTML, CSS, and browser-native JavaScript with no build system or dependency by default.
- Do not introduce React, Vue, TypeScript, Tailwind, a backend, or a client-side framework unless explicitly requested or already justified by the repository.
- Build an application-like single-page flow: route or switch views in place rather than reloading an HTML document for each screen.
- Start with the fewest files that keep responsibilities clear; split only when a file has a stable, distinct responsibility.

## Structure and Responsibilities

When the product is first implemented, a suitable structure may be:

```text
/
  index.html
  css/
    styles.css
  js/
    app.js
  assets/
```

As responsibilities become independently reusable, split deliberately rather than prematurely:

```text
css/
  tokens.css       # Colour, spacing, typography, motion primitives
  base.css         # Reset and global element treatment
  layout.css       # Screen and responsive composition
  components.css   # Reusable interface patterns
js/
  app.js           # Bootstrap and orchestration
  state.js         # State creation and state transitions
  data.js          # Challenge definitions and KPI metadata
  render.js        # DOM output derived from state
  interactions.js  # Event binding and input translation
  utils.js         # Small genuinely shared helpers
```

This is a guide, not a requirement to create every file at once. Avoid empty abstractions and one-function modules.

When multiple challenges are implemented, use a small module per challenge with a consistent, explicit challenge definition or lifecycle. Keep challenge-specific evidence and decision rules in that module, and keep shared state, rendering, navigation, KPI calculation, and capability progression in focused shared modules. This is separation of concerns, not a generic game engine.

| Layer | Responsibility |
| --- | --- |
| HTML | Semantic structure, stable regions, templates, labels, and relationships. |
| CSS | Visual tokens, layout, responsive rules, states, and purposeful motion. |
| State/data | The source of truth for screens, challenges, decisions, capabilities, and KPI inputs. |
| Rendering | Deterministic DOM output derived from state and data. |
| Interactions | Translate user input into validated state transitions. |

## Required Implementation Process

1. Inspect existing file structure, naming, selectors, state, and events.
2. Identify the narrowest affected layer or layers.
3. Put durable values and rules in data or state, not scattered DOM literals.
4. Keep state transitions separate from DOM queries where practical.
5. Render from the current state through a consistent path after a successful transition.
6. Bind events once and use `data-*` attributes for stable action or entity identifiers.
7. Verify that repeat navigation, reset, and completion do not create duplicate handlers or stale UI.

## Naming and Reuse

- Use semantic HTML elements first; use classes for styling and `data-*` attributes for behaviour.
- Name CSS classes for role and state, not visual coincidence: `.challenge-summary`, `.is-complete`, and `.kpi-change` are preferable to `.purple-box-2`.
- Use lower camel case for JavaScript values and functions. Use verbs for actions, such as `completeChallenge` and `renderKpiSummary`.
- Keep IDs unique and reserve them for document relationships, form labels, or stable landmarks rather than general styling.
- Store challenge definitions, KPI metadata, and effect mappings centrally so UI copies do not diverge.
- Keep the shared operating model, capability stages, and challenge outcomes available to overview, challenge, performance, and final-summary renders without duplicating screen-specific data.

## Do

- Prefer small pure calculation or transition functions for logic with multiple outcomes.
- Use event delegation when repeated or dynamically rendered controls share a container.
- Make render functions idempotent: rendering the same state twice should produce the same UI.
- Keep user-visible error states explicit when an expected action cannot proceed.
- Reuse an existing component or renderer before creating an equivalent one.

## Avoid

- Inline event attributes, inline business logic, and DOM text as the source of truth.
- A mutable collection of unrelated global variables.
- Framework-like registries, class hierarchies, or generic engines for one small experience.
- Querying and mutating the same UI from many unrelated handlers.
- Silently ignoring a missing required element or an invalid state transition.

## Review Checklist

- Are HTML, CSS, state/data, rendering, and interaction responsibilities clear?
- Are challenge and KPI rules represented once rather than repeated in the UI?
- Do state changes have a predictable render path?
- Are module boundaries justified by real responsibilities?
- Has the implementation avoided unnecessary tools and dependencies?
