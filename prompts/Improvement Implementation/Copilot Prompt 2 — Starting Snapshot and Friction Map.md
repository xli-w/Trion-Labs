You are continuing work inside the existing Trion Labs repository.

This is Stage 2 of the implementation plan.

Use the existing project architecture, shared operational model, and skills system. Do not restart the project or replace existing work unnecessarily.

## Objective

Implement the opening operational context:

1. A fictional manufacturing operation introduction.
2. A concise starting operational snapshot.
3. A visual friction and connection map.

The visitor should understand the operation and its problems within a few seconds.

## First: Inspect Before Editing

Read:

- `.github/copilot-instructions.md`
- Relevant skills under `.github/skills/`
- The shared operation data model created in Stage 1
- Existing application layout
- Existing navigation
- Existing design tokens
- Existing state and rendering patterns

Identify the correct place to introduce the new opening experience.

Do not create a parallel application shell.

## Product Principle

The operation is not broken. It is working harder than it needs to.

The visitor should understand that:

- Systems exist.
- People are capable.
- Data exists.
- Processes work individually.
- The main problem is friction between them.

Use language that is practical and respectful.

## Required Work

### 1. Implement the operation introduction

Create an opening section introducing the fictional manufacturing business.

Include:

- Company name
- Short description
- Manufacturing context
- Approximate scale
- Main operational areas
- A concise explanation of the current challenge

Keep the copy short.

Avoid:

- Corporate jargon
- Long paragraphs
- Overly dramatic storytelling
- Claims that imply real client data

### 2. Implement the starting snapshot

Create a compact operational overview showing:

- Baseline KPI values
- Main friction points
- Existing systems or tools
- Areas of the operation involved

Potential areas:

- Production
- Quality
- Planning
- Logistics
- Maintenance
- Management

This should not look like a dense enterprise dashboard.

Use a small number of clear cards, labels, or visual indicators.

### 3. Implement the friction map

Create a visual map showing relationships between:

- People
- Processes
- Data
- Systems
- Decisions
- Outcomes

Initially:

- Some relationships should be incomplete.
- Some information should be disconnected.
- The map should communicate operational friction.

The map may use:

- Nodes
- Lines
- Labels
- Status indicators
- Subtle transitions

Do not create a complex graph engine.

The map must be driven by the central data model.

### 4. Make the map progression-ready

The visual map must support future updates when challenges are completed.

For example:

- Production ↔ Quality becomes connected.
- Logistics ↔ Production becomes more visible.
- Data ↔ Operational View becomes available.
- Process ↔ Automation becomes clearer.

Do not hard-code a separate visual state for every future screen.

Create a reusable rendering or update mechanism.

### 5. Add a clear continuation action

Provide a clear next action such as:

- Enter the operation
- Investigate the first issue
- Begin the first challenge

The action should lead into the existing challenge navigation or lab overview.

Do not create unnecessary onboarding screens.

## Visual Direction

Maintain the existing Trion Labs style:

- Predominantly white
- Deep purple, approximately `#281a39`
- Restrained supporting colours
- Clear typography
- Refined borders and panels
- Strong spacing
- Subtle, purposeful animation

Avoid:

- Neon
- Cyberpunk
- Excessive gradients
- Generic SaaS dashboard styling
- Excessive glassmorphism
- Unnecessary decoration

## Responsive and Accessibility Requirements

Ensure:

- Semantic HTML
- Keyboard-accessible controls
- Visible focus states
- Sufficient contrast
- Responsive layout
- No horizontal overflow
- Clear mobile hierarchy
- Reduced-motion support

The friction map must remain understandable on smaller screens.

If necessary, use a simplified mobile layout rather than forcing a dense desktop diagram into a narrow viewport.

## Scope Restrictions

Do not implement:

- Diagnostic results
- Opportunity prioritisation
- Before-and-after comparison
- New challenge mechanics
- A complete final CTA flow
- A new framework
- A complex animated factory environment

## Validation

Test:

- First load
- Navigation into the operation
- Snapshot rendering
- Friction-map rendering
- Responsive behaviour
- Keyboard navigation
- Reduced-motion behaviour
- Console errors

Ensure existing challenge functionality remains intact.

## Final Response

Report:

1. What was implemented.
2. Files changed.
3. How the friction map is driven by shared state.
4. How future challenge completion can update the map.
5. Any visual or responsive limitations.
6. What should be reviewed before Stage 3.

Stop after this stage.