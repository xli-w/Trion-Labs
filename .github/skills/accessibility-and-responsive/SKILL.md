---
name: accessibility-and-responsive
description: Apply when creating or changing any Trion Labs markup, controls, layout, motion, feedback, or screen presentation to keep the experience accessible and usable across device sizes.
---

# Accessibility and Responsive Engineering

## Purpose

Ensure every visitor can understand and complete the core operational experience regardless of device size, input method, motion preference, or colour perception.

## When to Use

- Creating or changing screens, controls, forms, dialogs, feedback, motion, layout, or responsive CSS.
- Reviewing keyboard, screen-reader, contrast, touch, or narrow-screen behaviour.
- Selecting an interaction pattern that might rely on drag, hover, colour, position, or animation.

## Semantic Structure

- Use semantic landmarks such as `header`, `nav`, `main`, `aside`, `section`, and `footer` when they describe the content.
- Maintain a logical, unskipped heading hierarchy that lets visitors understand the current screen and challenge.
- Use native `button`, `a`, `input`, `select`, `fieldset`, `legend`, and `label` elements where applicable.
- Associate controls with visible labels and instructions. Do not use placeholder text as the only label.
- Use lists, tables, and definition structures when their native semantics match the operational information being shown.
- Use ARIA only to supplement native semantics, such as `aria-current`, `aria-expanded`, `aria-describedby`, or a carefully scoped live region. Do not add redundant ARIA to a native control.

## Keyboard and Focus Requirements

- Every essential operation must be reachable and actionable with a keyboard.
- Keep focus order aligned with the visible reading and interaction order.
- Preserve a highly visible focus indicator; never remove focus outlines without a clearly stronger replacement.
- Use native button and link keyboard behaviour whenever possible.
- Move focus intentionally after navigation, opening a modal, or revealing a consequential completion state. Do not move focus for minor cosmetic updates.
- Provide an explicit keyboard alternative for drag and drop or spatial rearrangement.
- Allow Escape to close transient dialogs or overlays when that is consistent with the component's established behaviour.

## Feedback and Status

- Announce important asynchronous or outcome feedback through an appropriate, concise live region without interrupting every small state change.
- Pair colour with labels, icons, patterns, or text for status, selection, completion, risk, and KPI direction.
- Keep error text specific, visible, and associated with the affected control or decision.
- Do not rely on hover, tooltips, animation, sound, or position as the only way to access essential information.

## Contrast and Visual Access

- Meet applicable WCAG 2.2 AA contrast requirements: at least 4.5:1 for normal text and 3:1 for large text, interface components, and meaningful graphical objects.
- Do not communicate completion, priority, quality, or risk with red and green alone.
- Keep body text, labels, focus indicators, and chart annotations readable at normal browser zoom.
- Ensure text and controls remain usable with increased text size and browser zoom rather than clipping or overlapping.

## Responsive Requirements

Design from content constraints rather than a device label. Test a narrow mobile viewport first, then ensure the layout expands gracefully for tablet, laptop, and wide desktop use.

- Keep the current operational signal, decision, feedback, and essential KPI context available on all screen sizes.
- Reflow columns into a clear reading sequence before reducing type size or hiding information.
- Avoid fixed-height regions that clip copy, charts, focus rings, error messages, or dynamic feedback.
- Use comfortable touch targets and spacing; aim for at least 44 by 44 CSS pixels for primary touch controls where practical.
- Retain a visible, labelled route between challenge, outcome, and wider progress on small screens.
- Avoid horizontal page scrolling at supported viewport widths. If a data table genuinely needs horizontal scrolling, provide an accessible label and preserve row/column context.

## Reduced Motion

- Respect `prefers-reduced-motion` for transitions, animated charts, process movement, and celebratory effects.
- Keep the end state visible and understandable without motion.
- Do not use flashing, auto-playing, or repeated attention-seeking animation.

## Required Review Process

1. Test a fresh load and the central interaction with keyboard only.
2. Check visible focus, focus order, control names, and any focus movement.
3. Check status and feedback without relying on colour or motion.
4. Test narrow mobile, tablet, laptop, and wide desktop layouts at normal zoom.
5. Test increased zoom or text size for clipping, overlap, and hidden essential content.
6. Check reduced-motion behaviour.

## Do

- Build accessibility into the first implementation, not as a later patch.
- Prefer native HTML and simple layouts over custom interaction emulation.
- Treat mobile and touch behaviour as first-class design constraints.
- Keep explanatory copy concise enough to remain readable on narrow screens.

## Avoid

- Clickable `div` or `span` elements for essential actions.
- Keyboard traps, hidden focus, hover-only instructions, and colour-only indicators.
- Desktop-only interaction assumptions.
- Essential data hidden below an unlabeled accordion or removed at narrow widths.
- Motion required to understand a KPI change or process relationship.

## Review Checklist

- Can the core path be completed with keyboard alone?
- Do semantic landmarks, headings, names, labels, and feedback communicate the structure?
- Are contrast, status, and selection understandable without colour alone?
- Does the mobile layout preserve all essential information and actions?
- Is the experience meaningful with reduced motion enabled?
