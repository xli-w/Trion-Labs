# Build Trion Labs — An Interactive Operational Improvement Experience

## Role

You are a senior frontend engineer, interaction designer, and product designer.

Build the first version of **Trion Labs**, an interactive website experience for **Trion**, a manufacturing digitalisation and operational transformation consultancy.

This is a new project with **no existing repository or codebase**. Establish the project structure and implement the experience from scratch.

The result must be a polished, functional, responsive website experience—not a static mockup, a collection of disconnected animations, or an unfinished technical demonstration.

---

# 1. Product concept

## The central idea

Trion Labs is a small, interactive operational strategy experience.

The visitor enters a simplified manufacturing operation that is functioning, but contains hidden inefficiencies. They move through a series of short mini-games, each telling a different operational story.

They investigate problems, make decisions, apply improvements, and see the consequences through changing operational KPIs.

Trion's methodologies and integrations form the improvement system.

The visitor should gradually discover that:

> **Better operational performance comes from understanding processes, connecting information, simplifying work, and applying the right technology.**

The experience should demonstrate Trion's capabilities through interaction rather than simply explaining them.

## The central message

**Find the friction. Build the flow.**

Supporting message:

> See what changes when your operation starts making sense.

The experience should communicate that Trion understands the relationship between:

- People
- Processes
- Data
- Technology
- Operational performance

It should demonstrate that Trion does not simply add technology. It identifies problems, improves the underlying operation, and connects systems where doing so creates value.

---

# 2. What the experience should feel like

The experience should be:

- Clean
- Professional
- Modern
- Intuitive
- Interactive
- Fun
- Slightly playful
- Operationally credible
- Visually distinctive
- Easy to understand without instructions

It should feel like a **small, beautifully designed interactive product experience**, not a conventional browser game.

Think:

**Digital twin + operational control room + interactive strategy game + polished consultancy website.**

Do not make it feel like:

- A generic SaaS dashboard
- A corporate PowerPoint
- A children's game
- A complex factory simulator
- A generic “future of manufacturing” demo
- A collection of unrelated UI components
- A dark cyberpunk technology demo

The experience should be enjoyable for a managing director, operations manager, engineer, or digitalisation lead to explore.

The visitor should finish thinking:

> “They understand how operations actually work—and they know how to make them better.”

---

# 3. Technical requirements

## Architecture

Use a simple, maintainable frontend architecture:

- HTML
- CSS
- Vanilla JavaScript

Do not introduce React, Vue, Angular, Svelte, or another frontend framework.

Do not introduce a backend, database, authentication system, or external API.

The experience should run locally by opening the project through a simple development server.

Use ES modules if helpful, but keep the architecture straightforward.

## Suggested structure

Create a sensible structure similar to:

```text
/
├── index.html
├── README.md
├── css/
│   ├── styles.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── state.js
│   ├── data.js
│   ├── ui.js
│   ├── game.js
│   └── miniGames/
│       ├── missingMinutes.js
│       ├── qualityLoop.js
│       ├── spreadsheetShuffle.js
│       ├── deliveryDomino.js
│       ├── controlRoom.js
│       └── improvementChallenge.js
└── assets/
    ├── icons/
    └── images/
```

You may improve this structure if there is a clear reason, but do not over-engineer it.

## Important implementation principles

- Keep game state separate from UI rendering.
- Keep mini-game logic separate from the main application.
- Use reusable UI components where practical.
- Avoid large monolithic JavaScript files.
- Avoid inline JavaScript in HTML.
- Avoid unnecessary dependencies.
- Avoid unnecessary build tooling.
- Keep the code readable and easy to extend.
- Use semantic HTML.
- Use accessible buttons and controls.
- Ensure the experience works with keyboard navigation where practical.
- Respect `prefers-reduced-motion`.
- Do not rely on hover alone for important interactions.

---

# 4. Brand and visual direction

## Brand

The experience belongs to **Trion**.

Use a clean white and deep purple visual identity.

### Primary colours

```css
--trion-purple: #281a39;
--trion-purple-light: #4b3565;
--trion-purple-muted: #75658d;
--trion-lilac: #eee9f5;
--trion-background: #ffffff;
--trion-surface: #f8f7fa;
--trion-border: #e5e0eb;
--trion-text: #281a39;
--trion-text-muted: #6f6878;
```

The primary brand colour is:

**#281a39**

Use white as the dominant background.

Purple should be used for:

- Primary actions
- Important headings
- Active states
- Progress indicators
- Selected elements
- Data visualisation accents
- Interactive highlights

Do not use excessive gradients, neon colours, or a rainbow palette.

The interface should feel refined and premium.

## Typography

Use a clean, modern sans-serif font.

Prefer a system font stack or a lightweight web-safe approach.

Suggested:

```css
font-family:
  Inter,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

Typography should be:

- Clear
- Spacious
- Confident
- Not overly decorative

Use strong hierarchy and generous whitespace.

## Visual language

Use:

- Rounded but controlled corners
- Thin borders
- Subtle shadows
- Clean cards
- Fine line illustrations
- Simple diagrams
- Clear data visualisation
- Subtle motion
- Strong alignment
- Consistent spacing

Avoid:

- Excessive glassmorphism
- Heavy drop shadows
- Overly rounded “toy” UI
- Dense dashboard layouts
- Excessive text
- Unnecessary decorative elements

---

# 5. Overall website structure

Build the experience as a single-page application-like website using HTML, CSS, and JavaScript.

The visitor should move through the experience without full-page reloads.

## Main sections

### A. Landing / introduction

A strong opening section introducing Trion Labs.

Content:

**Trion Labs**

**Find the friction. Build the flow.**

A small operation. A few hidden problems. A chance to make it work better.

Explore a series of interactive challenges inspired by real manufacturing and operational problems. Investigate what is happening, connect the right information, and apply practical improvements.

Use Trion's methods to simplify processes, improve visibility, connect systems, and automate repetitive work.

**Primary CTA:**
`Enter the Lab`

Secondary option:
`How it works`

The landing section should be visually interesting but not overloaded.

It should include a subtle animated representation of a connected operation, such as:

- Small process nodes
- Moving information lines
- A simplified production flow
- Minimal factory silhouettes
- Connected operational cards

Do not make the opening a full 3D factory scene unless it can be done cleanly without unnecessary complexity.

A polished 2D/diagrammatic representation is preferable for the first version.

---

### B. Lab overview

After entering, show the visitor the operation and the available challenges.

The visitor should understand:

- They are improving an operation.
- There are several challenges.
- Each challenge contributes to the overall operation.
- Their decisions affect performance.
- New capabilities can be unlocked.

Include a compact operational overview containing:

- Overall operational score
- Throughput
- Quality
- Delivery
- Productivity
- Visibility
- Cost
- Current capability stage

Use subtle animated KPI cards.

The overview should feel like a **living operational model**, not a spreadsheet.

Include a visual representation of the operation, such as:

- Production
- Quality
- Logistics
- Planning
- People
- Systems

These should be connected visually.

---

# 6. Core game loop

The entire experience should follow this loop:

**Observe → Investigate → Decide → Improve → Measure → Unlock**

Every mini-game should follow the same broad structure, even if the interaction mechanic differs.

The visitor should:

1. Encounter a problem.
2. Investigate the available information.
3. Make a decision.
4. Apply an improvement.
5. See the impact on KPIs.
6. Unlock a new capability or challenge.

The game should not require complex instructions.

Each challenge should begin with a clear short story.

Example:

> Production is missing its target. Something is consuming time, but the cause is not immediately obvious.

Then the visitor interacts with the problem.

---

# 7. Game state and progression

Create a central game state object.

It should track:

```js
{
  currentScreen: "landing",
  completedChallenges: [],
  unlockedUpgrades: [],
  operationalScore: 0,
  capabilityStage: 1,
  kpis: {
    throughput: 58,
    quality: 72,
    delivery: 64,
    productivity: 55,
    visibility: 35,
    cost: 68
  },
  resources: {
    improvementCapacity: 3,
    integrationCapacity: 2
  },
  decisions: [],
  notifications: []
}
```

You may adjust the exact structure.

The state should support:

- Updating KPIs
- Completing challenges
- Unlocking upgrades
- Tracking decisions
- Updating capability stage
- Showing before/after results
- Resetting the experience

Use deterministic values for the first version.

Do not introduce random outcomes that make the experience confusing or impossible to understand.

---

# 8. KPI system

The KPIs are the operational health system.

Use a small number of meaningful KPIs:

### Throughput
How much the operation produces.

### Quality
How much is produced right first time.

### Delivery
Whether orders are fulfilled on time.

### Productivity
How efficiently people and resources are used.

### Visibility
How clearly the operation can be understood.

### Cost
The resources consumed to achieve the result.

Each KPI should have:

- A current value
- A previous value
- A target
- A visual indicator
- A short explanation
- A change indicator after improvements

Use realistic but simplified values.

Avoid making every upgrade improve every KPI.

The player should experience trade-offs.

Examples:

- Increasing throughput without addressing quality may increase defects.
- Improving visibility may not immediately increase output.
- Automating a process may improve productivity but require an upfront investment.
- Reducing cost may affect delivery resilience.
- Standardising data may improve visibility before it improves throughput.

The game should communicate that **good transformation is about making the right improvements in the right order**.

---

# 9. Upgrade system

Trion's methodologies and integrations should form the upgrade system.

The upgrades should feel like practical operational capabilities, not fantasy powers.

## Core methodology upgrades

### Understand
Reveal the actual process, data, and dependencies.

Effect:
- Improves visibility.
- Reveals hidden causes.
- Makes investigation more effective.

### Simplify
Remove unnecessary steps, duplication, and friction.

Effect:
- Reduces process time.
- Reduces handoffs.
- Improves productivity.

### Standardise
Create consistent ways of working and recording information.

Effect:
- Improves data quality.
- Improves repeatability.
- Makes automation more reliable.

### Automate
Remove repetitive manual work and connect systems.

Effect:
- Reduces administrative effort.
- Improves information flow.
- Improves productivity.

### Measure
Track the right things and use them to improve.

Effect:
- Improves decision-making.
- Enables better KPI tracking.
- Reveals improvement opportunities.

## Integration upgrades

Include practical integration capabilities such as:

- Production + Quality
- ERP + Planning
- Logistics + Production
- Data + Dashboard
- Workflow Automation
- Central Operational View

Each integration should unlock a new capability in the experience.

For example:

Before:
Production knows a machine is down. Planning finds out later.

After:
The event appears in the planning view, allowing the relevant people to act earlier.

The important principle:

**A connection should create a new capability, not merely increase a number.**

---

# 10. Capability progression

Create a simple progression system showing the operation becoming more capable.

Use five stages:

### Stage 1 — Fragmented
Information is scattered. Problems are difficult to see.

### Stage 2 — Visible
Processes and KPIs become clearer.

### Stage 3 — Connected
Systems and information begin working together.

### Stage 4 — Responsive
People can act faster because information flows where it is needed.

### Stage 5 — Improving
The operation can measure, learn, and continuously improve.

The progression should be visible in the interface.

Use:

- A progress bar
- A stage label
- A short description
- Unlock indicators
- A visual change in the operational model

Do not make progression feel like a conventional gaming level system.

It should feel like **operational maturity**.

---

# 11. Mini-games

Build six mini-games.

Each mini-game must be a small, polished, interactive experience with a clear objective.

They should be mechanically different enough to feel interesting, but share the same visual language and game loop.

---

## Mini-game 1 — The Missing Minutes

### Story

A production line is missing its target.

The line appears to be running, but time is being lost in several places.

### Mechanic

Show a simplified production timeline containing events such as:

- Running
- Waiting
- Changeover
- Minor stop
- Breakdown
- Material delay

The visitor must investigate the timeline and identify where the largest avoidable loss is occurring.

Possible interaction:

- Click timeline events.
- Inspect event details.
- Compare planned vs actual time.
- Select the most important issue.
- Choose an improvement.

### Learning

**Understand the process before trying to improve it.**

### Improvement choices

- Improve data capture
- Standardise downtime categories
- Connect production events to a live dashboard

### Result

Show:

- Reduced unexplained downtime
- Improved visibility
- Better production performance

Unlock:
**Connected Production View**

---

## Mini-game 2 — The Quality Loop

### Story

Defects are increasing, but nobody agrees why.

Production, quality, and process information are disconnected.

### Mechanic

Show several information cards:

- Production conditions
- Quality results
- Machine status
- Shift information
- Material batch
- Process parameters

The visitor must connect the relevant information and identify the likely cause.

Possible interaction:

- Drag or click to connect related data.
- Reveal relationships.
- Identify the most useful connection.
- Choose an improvement.

### Learning

**Data becomes useful when it is connected to the process that creates it.**

### Improvement choices

- Connect production and quality data
- Standardise quality recording
- Create a quality visibility dashboard

### Result

Show:

- Improved quality visibility
- Faster diagnosis
- Reduced repeat defects

Unlock:
**Production + Quality Integration**

---

## Mini-game 3 — The Spreadsheet Shuffle

### Story

A planner spends the morning reconciling spreadsheets.

Information is copied between systems, manually checked, and emailed to different people.

### Mechanic

Show a workflow with several manual steps.

The visitor must identify unnecessary steps and redesign the flow.

Possible interaction:

- Move process steps.
- Remove duplicate steps.
- Connect information sources.
- Choose which steps to automate.
- Compare the old and improved workflow.

### Learning

**Simplify the work before adding more technology.**

### Improvement choices

- Simplify the process
- Standardise the information
- Automate repetitive updates
- Connect ERP and planning information

### Result

Show:

- Fewer manual steps
- Reduced process time
- Improved productivity
- Better information consistency

Unlock:
**Workflow Automation**

---

## Mini-game 4 — The Delivery Domino

### Story

A late material delivery threatens several customer orders.

The problem is not isolated to logistics. It affects production, planning, and delivery.

### Mechanic

Show a dependency chain.

The visitor must trace the impact of the late delivery and identify where an intervention would be most effective.

Possible interaction:

- Click through connected dependencies.
- Identify affected orders.
- Choose where to intervene.
- Compare possible decisions.

### Learning

**Connected information makes problems visible earlier.**

### Improvement choices

- Improve logistics visibility
- Connect material and production planning
- Introduce earlier alerts
- Improve exception handling

### Result

Show:

- Improved delivery performance
- Reduced disruption
- Better planning visibility

Unlock:
**Logistics + Production Visibility**

---

## Mini-game 5 — The Control Room

### Story

Management wants to know what is happening across the operation.

There is plenty of data, but no clear operational view.

### Mechanic

The visitor must build a useful operational dashboard from a selection of available information.

Possible interaction:

- Select relevant KPIs.
- Choose which information belongs together.
- Prioritise what should be visible.
- Assign information to the right audience.
- Remove distracting or irrelevant metrics.

### Learning

**The right information, presented to the right people, enables better decisions.**

### Improvement choices

- Create a central operational view
- Introduce role-based dashboards
- Connect live operational data
- Improve KPI definitions

### Result

Show:

- Improved visibility
- Faster decisions
- Better operational alignment

Unlock:
**Central Operational View**

---

## Mini-game 6 — The Improvement Challenge

### Story

The operation has improved, but the gains need to be sustained.

There is always another bottleneck.

### Mechanic

Show before-and-after performance and a new set of improvement opportunities.

The visitor must identify the next most valuable improvement based on:

- Impact
- Effort
- Risk
- Data quality
- Operational readiness

Possible interaction:

- Compare opportunities.
- Rank them.
- Select the next improvement.
- See how the decision affects the operation.

### Learning

**Transformation is iterative, measurable, and continuous.**

### Improvement choices

- Improve measurement
- Standardise the process
- Automate another workflow
- Connect another system
- Investigate a new bottleneck

### Result

Show the final operational capability summary.

Unlock:
**Continuous Improvement**

---

# 12. Mini-game design requirements

Every mini-game should include:

1. A clear title.
2. A short story.
3. A visible objective.
4. A focused interaction.
5. A decision or selection.
6. Immediate feedback.
7. A before/after comparison.
8. A KPI impact.
9. An explanation of the Trion principle.
10. An upgrade or capability unlock.

Do not make the mini-games too long.

Each should take approximately **30–90 seconds** to complete.

The visitor should always understand:

- What is wrong?
- What am I investigating?
- What decision am I making?
- Why does it matter?
- What changed?

---

# 13. Winning and losing

The experience should include meaningful consequences, but it should not be punishing.

This is a professional website, not a difficult arcade game.

## Winning

The player wins by improving the operation in a balanced way.

The final result should show:

- Operational performance
- Data maturity
- Process efficiency
- Connected capability
- Improvement potential

A successful completion should communicate:

> You have not fixed everything. You have made the operation easier to understand—and that made the next improvement possible.

## Losing / poor decisions

Allow suboptimal decisions.

For example:

- Automating before standardising data may create unreliable results.
- Improving throughput without addressing quality may increase defects.
- Reducing cost too aggressively may affect delivery.
- Choosing too many KPIs may reduce clarity.

When the visitor makes a poor decision:

- Explain the consequence.
- Show the affected KPI.
- Offer a retry or alternative.
- Avoid harsh failure screens.

Use language such as:

> **The automation worked—but the underlying data was inconsistent. The result is faster, not necessarily better.**

This should teach the visitor something.

---

# 14. Interaction and animation

Use subtle, purposeful animation.

Examples:

- KPI values animate when updated.
- Process connections draw themselves.
- Data flows between systems.
- Cards transition smoothly.
- Completed challenges show a satisfying success state.
- Upgrades unlock with a restrained visual effect.
- The operational model becomes more connected as progress is made.

Avoid:

- Excessive bouncing
- Flashing
- Overly long transitions
- Distracting particle effects
- Unnecessary 3D complexity

Animation should reinforce the idea of **flow, connection, and improvement**.

---

# 15. Navigation and UX

The visitor should always be able to:

- Return to the lab overview.
- See completed challenges.
- See current KPIs.
- See unlocked upgrades.
- Understand their progress.
- Restart the experience.

Include a simple navigation system.

Suggested navigation:

- **Overview**
- **Challenges**
- **Capabilities**
- **Performance**

Do not make the interface feel like a traditional admin dashboard.

Use a compact, elegant navigation system.

On mobile, adapt the navigation appropriately.

---

# 16. Responsive design

The experience must work well on:

- Desktop
- Laptop
- Tablet
- Mobile

Desktop should provide the richest experience.

Mobile should remain fully usable, not simply be a scaled-down desktop layout.

For mobile:

- Stack panels intelligently.
- Use horizontal scrolling only where appropriate.
- Ensure buttons are touch-friendly.
- Avoid tiny interactive targets.
- Keep text readable.
- Preserve the game loop.
- Simplify complex diagrams where necessary.

---

# 17. Accessibility

Implement good accessibility practices:

- Semantic HTML.
- Proper button elements.
- Visible focus states.
- Sufficient colour contrast.
- Keyboard-accessible interactions.
- Meaningful labels.
- Avoid colour-only communication.
- Respect reduced-motion preferences.
- Ensure important information is available as text.

Do not sacrifice usability for visual effects.

---

# 18. Content and tone

The writing should be:

- Clear
- Intelligent
- Practical
- Confident
- Concise
- Human
- Professional

Avoid excessive corporate jargon.

Avoid phrases such as:

- “Revolutionise your digital transformation journey”
- “Unlock the power of Industry 4.0”
- “The future of smart manufacturing”
- “Seamless end-to-end synergy”
- “Leverage cutting-edge solutions”

Prefer language such as:

- “Find where time is being lost.”
- “Connect the information that matters.”
- “Make the process easier to run.”
- “See what changes.”
- “Improve the operation, not just the dashboard.”
- “Better information. Better decisions.”
- “Make the next improvement possible.”

---

# 19. Important product principles

These principles should guide every design and implementation decision.

### 1. The interaction must have a purpose.

Do not add an animation or game mechanic simply because it looks impressive.

### 2. The visitor should learn Trion's approach by doing.

The methodology should be embedded in the experience.

### 3. The operation should feel connected.

The mini-games should not feel like unrelated pages.

### 4. Improvements should have consequences.

The player should see how decisions affect the operation.

### 5. Technology should support the story.

Do not make Fabric feel like a list of software features.

### 6. The experience should be credible.

Use simplified but believable operational scenarios.

### 7. The experience should be enjoyable.

The visitor should want to explore the next challenge.

### 8. The experience should remain simple.

Do not build a complex simulation engine.

---

# 20. Fabric positioning

Trion's **Fabric** platform should be demonstrated naturally through the experience.

Fabric is the connected operational environment that brings together:

- Processes
- Data
- Tools
- Systems
- People
- Operational views

Do not make the experience depend on a real Fabric backend.

Instead, create a convincing front-end demonstration of the principles behind it.

The visitor should experience:

- Connected information
- Shared operational visibility
- Linked processes
- Role-relevant views
- Data flowing between systems
- Improvements propagating through the operation

Include a subtle explanation somewhere in the experience:

> **Powered by the principles behind Fabric: connecting the information, tools and processes that help an operation work better.**

Do not over-explain the platform.

The visitor should understand it through interaction first.

---

# 21. Final completion screen

At the end, show a polished summary.

Suggested heading:

**The operation is moving.**

Supporting message:

> You have improved visibility, connected information, and made the next improvement easier to find.

Show:

- Final KPI summary
- Capability stage
- Unlocked improvements
- Completed challenges
- Before/after comparison
- A short explanation of the Trion approach

Include a CTA:

**Explore Trion's approach →**

And a secondary CTA:

**Start again**

The final screen should feel like a natural transition back to the main Trion website.

---

# 22. Implementation approach

Build the experience in a sensible order:

### Phase 1 — Foundation
- Create the project structure.
- Build the global layout.
- Establish the Trion visual system.
- Create the landing page.
- Create the lab overview.
- Implement central game state.

### Phase 2 — Core interaction
- Implement KPI cards.
- Implement challenge navigation.
- Implement upgrade system.
- Implement capability progression.
- Implement reset functionality.

### Phase 3 — Mini-games
Implement all six mini-games with distinct mechanics and clear outcomes.

### Phase 4 — Polish
- Add transitions.
- Add KPI animations.
- Add upgrade unlock effects.
- Improve responsive behaviour.
- Add accessibility improvements.
- Refine spacing, typography, and visual consistency.

### Phase 5 — Validation
Test:

- Desktop layout.
- Mobile layout.
- Keyboard navigation.
- Challenge completion.
- State updates.
- Upgrade unlocking.
- Reset functionality.
- No console errors.
- No broken interactions.

---

# 23. Definition of done

The project is complete when:

- The website runs locally.
- The landing page is polished.
- The visitor can enter the lab.
- The lab overview is functional.
- All six mini-games are implemented.
- Each mini-game has a clear story and interaction.
- KPIs update based on decisions.
- Upgrades unlock progressively.
- Capability stages update.
- The visitor can complete the full experience.
- The final summary is displayed.
- The experience is responsive.
- The interface follows the Trion brand.
- The experience feels cohesive rather than random.
- The code is clean and maintainable.
- There are no unnecessary frameworks or dependencies.
- There are no placeholder sections that make the experience feel unfinished.

---

# 24. Final instruction

Do not merely describe how this could be built.

**Build it.**

Make sensible decisions where details are unspecified.

Prioritise a polished, coherent, functional first version over unnecessary technical complexity.

The experience should feel like a real Trion product demonstration: clear, thoughtful, interactive, and operationally credible.

The central idea to preserve throughout the implementation is:

> **Find the friction. Build the flow.**