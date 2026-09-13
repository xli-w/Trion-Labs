# Trion Labs Copilot Instructions

## Product in Brief

Trion Labs is a polished, browser-based operational strategy experience for Trion, a manufacturing digitalisation and operational transformation consultancy. It helps visitors find operational friction, make a small number of informed interventions, and understand the resulting effect on performance and capability.

The experience communicates one central idea: **Find the friction. Build the flow.** It is an interactive demonstration of Trion's approach, not a conventional computer game, a live factory system, or a generic SaaS dashboard.

Its supporting message is: **See what changes when your operation starts making sense.**

## Technical Constraints

- Inspect the repository before changing it and preserve useful patterns already in place.
- Prefer semantic HTML, CSS, and vanilla JavaScript.
- Do not introduce a framework, TypeScript, Tailwind, a backend, external APIs, authentication, accounts, payments, or dependencies unless the user explicitly requests them or the repository already establishes a justified alternative.
- Keep the application understandable and runnable locally without a build system.
- Build the experience as a single-page application-like flow; visitors should move between views without full-page reloads.
- Implement the smallest cohesive change that satisfies the request; do not build all challenges or a generic game engine at once.

## Product and Visual Guardrails

- Guide visitors through: Observe -> Investigate -> Decide -> Improve -> Measure -> Unlock.
- Ground decisions in the improvement philosophy: Understand -> Simplify -> Standardise -> Automate -> Measure.
- Make relationships among people, processes, data, technology, systems, and operational performance visible.
- Use a predominantly white, refined visual language anchored by deep purple (`#281a39`) and restrained semantic supporting colours.
- Be professional, intelligent, practical, slightly playful, and human.
- Do not drift into cyberpunk styling, neon effects, a generic dashboard, a corporate slide deck, or an overcomplicated simulation.
- The completed experience comprises six connected challenges, ending with an Improvement Challenge that demonstrates continuous improvement. Implement them incrementally, but preserve this full-experience endpoint.

## Applying the Skills

Read the relevant skill files in [skills](./skills/) before planning or editing a related feature. Apply only the skills needed for the task, plus `feature-workflow` for substantial implementation work. Skills are composable; their requirements complement one another.

| Skill | Primary responsibility |
| --- | --- |
| `trion-labs-context` | Product intent, boundaries, and the Trion experience |
| `experience-design` | Visitor journey, screen purpose, and narrative flow |
| `visual-design` | Brand-consistent visual hierarchy and component treatment |
| `frontend-architecture` | Vanilla frontend structure, state boundaries, and reuse |
| `state-and-progression` | Truthful state, KPI effects, unlocks, and reset behaviour |
| `challenge-design` | Six linked operational challenges and their methodology links |
| `interaction-design` | Input, feedback, motion, keyboard, touch, and error behaviour |
| `data-and-kpis` | Legible operational metrics and meaningful visualisations |
| `accessibility-and-responsive` | Semantic, inclusive, and responsive implementation |
| `code-quality` | Maintainable, defensive, focused code |
| `testing-and-review` | Honest functional, visual, interaction, and product review |
| `feature-workflow` | Incremental feature planning and delivery process |
| `trion-content-style` | Clear, practical, human-facing copy |
| `fabric-positioning` | Accurate, natural Fabric capability positioning |

### Skill Selection

| Work type | Skills to apply |
| --- | --- |
| New feature or substantial enhancement | `feature-workflow` plus the skills governing the affected surface |
| New screen or flow | `experience-design`, `visual-design`, `accessibility-and-responsive` |
| New mini-game or challenge | `challenge-design`, `state-and-progression`, `interaction-design`, `data-and-kpis` as needed |
| New KPI, chart, process flow, or status indicator | `data-and-kpis`, `state-and-progression`, `visual-design` |
| New UI component | `frontend-architecture`, `visual-design`, `accessibility-and-responsive` |
| Visual or interaction refinement | `visual-design`, `interaction-design`, `accessibility-and-responsive` |
| Bug fix | `frontend-architecture`, `code-quality`, `testing-and-review` |
| User-facing copy | `trion-content-style` |
| Fabric-related narrative or capability | `fabric-positioning`, `trion-content-style` |
| Final feature review | `testing-and-review`, `trion-labs-context` and affected skills |

## Expected Development Workflow

1. Understand the outcome and read the applicable skills.
2. Inspect the related code, styles, state, content, and existing patterns.
3. Reuse patterns where they are sound; identify the smallest useful implementation.
4. Consider product flow, state effects, accessibility, responsive behaviour, and copy before editing.
5. Implement a cohesive vertical slice.
6. Review it against the visual and interaction guidance.
7. Run the smallest relevant existing validation and perform the checks in `testing-and-review`.
8. Report what changed, what was validated, and any remaining risk honestly.

## Commit Message Generation

When creating a commit, inspect the final staged diff and write a concise, factual message about the result:

- Use a plain-English subject in the form `<optional emoji> <imperative verb> <specific outcome>`. Do not add conventional-commit prefixes, scopes, or filler unless the user requests them.
- Describe the user-visible behaviour, domain outcome, or meaningful maintenance result. Name files or implementation mechanics only when they are the change's clearest purpose.
- Use at most one fitting emoji when it adds a useful, light-touch signal: `✨` for a feature, `🐛` for a bug fix, `♻️` for a refactor, `📝` for documentation, or `✅` for tests. Omit it for mixed, routine, or formal changes rather than adding one decoratively.
- Keep straightforward changes to the subject line. Add a short body only when it explains an important why, behaviour impact, migration note, or validation result. Use one to three plain-language bullets and never claim work that is not in the diff or validation that was not run.
- Avoid vague subjects such as `Update files`, `Fix issues`, or `Changes`. Preserve required commit trailers after any body.

Examples:

- `✨ Preserve challenge progress after refresh`
- `🐛 Prevent duplicate reset handlers`
- `📝 Clarify local setup steps`

Do not declare work complete merely because code was written. Verify the requested behaviour and preserve the Trion Labs product direction.
