---
name: visual-design
description: Apply when creating or refining Trion Labs layouts, components, visual hierarchy, animation, data displays, or responsive presentation.
---

# Visual Design

## Purpose

Maintain a refined, editorial, architectural, and operational visual language that makes complex relationships legible without becoming a generic dashboard or a technology spectacle.

## When to Use

- Designing or changing layouts, components, tokens, data displays, screen hierarchy, motion, or responsive presentation.
- Reviewing screenshots or visual regressions.
- Selecting colours, typography, borders, shadows, icons, or status treatments.

## Visual Foundation

### Colour

Use white and near-white surfaces as the dominant canvas. Deep purple (`#281a39`) is the primary anchor for key text, structural emphasis, and selected controls. Use dark neutral text and muted neutral support text where that produces clearer hierarchy.

Reserve supporting colours for semantic meaning, such as a credible improvement, risk, attention state, or comparison. Every semantic colour must have a text, icon, pattern, or label companion; colour alone must never carry the meaning.

Use gradients only when they clarify a relationship or depth more effectively than a flat surface. A default gradient, glow, or coloured background is not a brand treatment.

### Typography

- Prefer a clean, highly legible typeface already available in the project or a restrained system stack.
- Use a small, deliberate type scale with strong contrast among page title, section title, body, labels, and numeric values.
- Use sentence case for interface copy unless a recognised operational abbreviation requires otherwise.
- Let line length, grouping, and whitespace improve reading before reducing text size.
- Treat large KPI values as evidence, not decoration; always pair them with a clear label and context.

### Spacing and Layout

- Build rhythm from a small spacing scale, such as 4, 8, 12, 16, 24, 32, and 48 pixels, and extend it only when a layout warrants it.
- Use whitespace to separate phases, evidence, and decisions.
- Prefer asymmetric but balanced editorial composition when it reinforces the reading order.
- Make the primary action and current operational signal visually dominant.
- Keep dense operational information grouped and scannable rather than spreading it across unrelated cards.

## Component Treatment

| Element | Required treatment |
| --- | --- |
| Cards and panels | Use purposeful grouping, modest radii, clear boundaries, and breathing room. Avoid a wall of interchangeable floating cards. |
| Buttons | Give primary actions clear contrast and labels that name the outcome. Use secondary and tertiary treatments sparingly and consistently. |
| Borders and shadows | Prefer fine borders or subtle elevation to separate information. Shadows should communicate hierarchy, not create visual noise. |
| Data displays | Establish label, value, change, time/context, and explanatory relationship in that order. |
| Status indicators | Pair a concise state label with a restrained visual cue. Avoid red/green-only status. |
| Icons | Use familiar, simple symbols as supporting cues; never substitute an ambiguous icon for an essential label. |
| Process diagrams | Use alignment, connectors, and grouping to expose dependency and flow. Decorative arrows are not evidence. |

## Motion Principles

- Animate only a state change, causal relationship, focus transition, or spatial reorganisation that benefits from movement.
- Keep transitions brief and restrained; use them to guide attention rather than delay work.
- Preserve a meaningful static end state for reduced-motion users.
- Do not use looping decoration, glow pulses, confetti, or motion that makes operational work look like an arcade game.

## Responsive Visual Hierarchy

Design the hierarchy before choosing breakpoints. On narrow screens, preserve the current signal, decision, feedback, and critical KPI context in a linear order. Reflow supporting information rather than shrinking every panel until it is unreadable.

Do not hide essential explanations or outcomes on mobile just to preserve a desktop composition.

## Do

- Use contrast, spacing, alignment, and typography before adding colour or decoration.
- Make the current decision and its operational consequence easy to locate.
- Use visual comparisons to help visitors spot meaningful change.
- Keep the visual language calm enough that evidence remains the focal point.
- Reuse established component treatments rather than creating a new visual pattern for each screen.

## Avoid

- Excessive gradients, neon colour, glow, glassmorphism, or animated decoration.
- Cyberpunk motifs, game HUDs, faux-terminal interfaces, and generic dashboard grids.
- Pill-shaped controls and overly rounded surfaces everywhere.
- Dense widget collections with no reading order.
- Tiny text, low-contrast labels, unexplained icons, or decorative charts.

## Review Checklist

- Is the page predominantly white with deep purple used deliberately?
- Is there a clear reading order from operational signal to decision to outcome?
- Are cards, controls, data, and status treatments recognisably part of one system?
- Does motion explain rather than decorate?
- Does the narrow layout retain the same essential hierarchy?
