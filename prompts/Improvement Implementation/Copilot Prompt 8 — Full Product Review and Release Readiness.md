You are conducting the final product review and refinement stage for the existing Trion Labs repository.

Act as:

- Senior frontend engineer
- Product designer
- Interaction designer
- Accessibility reviewer
- Manufacturing digitalisation consultant
- Quality assurance lead

This is Stage 8 of the implementation plan.

Do not add major new features. Review, refine, correct, and integrate the existing experience.

## Objective

Ensure Trion Labs feels like one coherent, polished, commercially relevant experience from first load to final CTA.

The experience should demonstrate Trion’s approach to operational improvement without becoming an oversized game, dashboard, or software product.

## First: Read and Inspect

Before making changes:

1. Read `.github/copilot-instructions.md`.
2. Read all relevant skills.
3. Inspect the complete repository.
4. Inspect the full visitor journey.
5. Inspect the shared operation model.
6. Inspect state and progression.
7. Inspect all five challenges.
8. Inspect the starting snapshot.
9. Inspect the friction map.
10. Inspect the diagnostic profile.
11. Inspect opportunity prioritisation.
12. Inspect the before-and-after view.
13. Inspect the Trion approach reveal.
14. Inspect the final CTA.

Do not assume previous stages are correct.

## Review the Full Journey

Test the experience in this order:

```text
Landing
    ↓
Enter the operation
    ↓
Starting snapshot
    ↓
Challenge overview
    ↓
The Missing Minutes
    ↓
The Quality Loop
    ↓
The Spreadsheet Shuffle
    ↓
The Delivery Domino
    ↓
The Control Room
    ↓
Opportunity prioritisation
    ↓
Before-and-after view
    ↓
Diagnostic profile
    ↓
Trion approach
    ↓
Final CTA
```

Also test:

- Partial completion
- Different decision paths
- Returning to completed challenges
- Resetting the experience
- Refreshing the browser where appropriate
- Mobile use
- Keyboard-only use

## Product Review

Ask:

### Does it communicate Trion’s purpose?

- Does a manufacturing visitor recognise realistic operational problems?
- Does the experience demonstrate practical thinking?
- Does it show relationships between people, processes, data, systems, and decisions?
- Does it avoid positioning Trion as only a software or dashboard provider?

### Does it feel like one operation?

- Is the same fictional business present throughout?
- Do challenge outcomes affect the wider state?
- Does the friction map become more connected?
- Do later screens reflect earlier decisions?
- Does the final result feel earned?

### Does it communicate the Trion methodology?

- Understand
- Simplify
- Standardise
- Connect
- Automate
- Measure

Does the experience show that automation and technology should follow understanding and process improvement?

### Does it support the business model?

Does it naturally connect to:

- Digital Diagnostics
- Site Walks
- Digital Landscape Maps
- Maturity Scorecards
- Opportunity Registers
- Transformation Roadmaps
- Quick Win Automation Sprints
- Operational intelligence

Does the final CTA feel relevant rather than generic?

## Technical Review

Check:

- No console errors
- No broken navigation
- No broken buttons
- No dead code
- No duplicated state models
- No contradictory KPI values
- No hard-coded UI values that should be derived from state
- No unnecessary dependencies
- No unnecessary framework introduction
- No broken reset behaviour
- No invalid HTML
- No avoidable layout shifts
- No missing error handling

Review the code for:

- Clear naming
- Small functions
- Reusable components
- Centralised data
- Sensible module boundaries
- Minimal duplication
- Maintainability

Do not overengineer.

## Visual Review

Check:

- Consistent spacing
- Consistent typography
- Consistent buttons
- Consistent cards
- Consistent borders and shadows
- Consistent status colours
- Consistent interaction states
- Strong hierarchy
- Appropriate whitespace
- No visual clutter
- No excessive gradients
- No neon or cyberpunk styling
- No generic SaaS dashboard appearance
- No excessive rounded containers
- No unnecessary decorative animation

The product should feel predominantly white, refined, operational, and premium.

## Interaction Review

Check:

- Every interaction has a clear purpose.
- The visitor understands what to do next.
- Feedback explains consequences.
- Selection states are obvious.
- Completion states are clear.
- No interaction depends only on colour.
- Keyboard users can complete the experience.
- Touch targets are suitable.
- Reduced-motion users receive an equivalent experience.

## Responsive Review

Check at minimum:

- Desktop
- Laptop
- Tablet
- Mobile portrait

Look specifically for:

- Horizontal overflow
- Cropped content
- Dense diagrams
- Unusable drag-and-drop
- Buttons that become too small
- Cards that become excessively tall
- Text that loses hierarchy
- Friction-map readability
- Final-result layout problems

Where an interaction does not translate well to mobile, implement a suitable alternative rather than forcing the desktop version into a narrow layout.

## Content Review

Ensure all user-facing copy is:

- Clear
- Practical
- Concise
- Human
- Confident
- Free from unnecessary jargon

Remove or rewrite:

- Generic transformation language
- Empty marketing claims
- Overly technical explanations
- Unnecessary instructions
- Repeated wording
- Artificial game language
- Unsupported claims

## Scope Control

Do not add:

- New mini-games
- Accounts
- Leaderboards
- Multiplayer
- Real-time data
- Real Fabric integrations
- AI chat
- A complex financial model
- A large factory map
- A full dashboard builder
- A new framework
- Unnecessary dependencies

Focus on refinement and release readiness.

## Required Improvements

After the review:

1. Fix functional defects.
2. Fix inconsistent state behaviour.
3. Fix visual inconsistencies.
4. Fix responsive issues.
5. Fix accessibility issues.
6. Improve unclear feedback.
7. Remove unnecessary complexity.
8. Improve weak or generic copy.
9. Ensure the final CTA is relevant.
10. Ensure the entire experience feels cohesive.

Do not make changes merely for the sake of changing something.

## Final Deliverables

After completing the review, provide:

1. A concise summary of the final experience.
2. A list of files changed.
3. The most important defects found and fixed.
4. Any remaining limitations.
5. A list of features deliberately excluded to protect scope.
6. A manual browser testing checklist.
7. A recommendation on whether the experience is ready for external user testing.
8. Three specific questions to ask the first external tester.

Do not claim the product is production-ready if significant issues remain.