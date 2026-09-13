You are working inside the existing Trion Labs repository.

Act as a senior frontend architect, product designer, interaction designer, and manufacturing digitalisation consultant.

This is Stage 1 of a planned eight-stage implementation. Do not jump ahead into later stages.

## Objective

Audit the existing Trion Labs project and establish a coherent shared operational model that all future screens and challenges can use.

The goal is to make Trion Labs feel like one connected fictional manufacturing operation rather than a collection of unrelated mini-games.

## First: Read the Project Guidance

Before changing anything:

1. Read `.github/copilot-instructions.md`, if present.
2. Read the relevant skills under `.github/skills/`.
3. Inspect the complete repository structure.
4. Identify the current application entry point.
5. Identify the current state model.
6. Identify the existing challenge implementations.
7. Identify existing design tokens, components, and reusable UI patterns.
8. Identify how navigation and progression currently work.
9. Identify any existing data structures for KPIs, upgrades, or decisions.

Do not overwrite or rebuild existing work without understanding it.

## Product Context

Trion Labs is an interactive experience for Trion, a manufacturing digitalisation and operational transformation consultancy.

Its central message is:

> Find the friction. Build the flow.

The visitor should investigate a fictional manufacturing operation, identify operational friction, make practical decisions, and see how improvements affect the wider operation.

The experience should communicate that operational improvement involves the relationship between:

- People
- Processes
- Data
- Systems
- Technology
- Decisions
- Performance

The operation is not broken. It is working harder than it needs to.

## Required Work

### 1. Produce an implementation audit

Create a concise project audit, either in an appropriate existing planning file or as a clearly named implementation note.

Include:

- Existing architecture
- Existing screens
- Existing challenges
- Existing state and progression logic
- Existing reusable components
- Existing technical risks
- Recommended reuse strategy
- Any conflicts between the current implementation and the intended product direction

Do not create excessive documentation.

### 2. Define one fictional manufacturing operation

Create a central data model for one fictional manufacturing SME.

The company should feel realistic for Trion’s target market: a UK or Midlands manufacturing business with capable people, legacy systems, spreadsheets, and growing operational complexity.

Use a fictional name.

Include concise information such as:

- Company description
- Manufacturing type
- Approximate scale
- Main operational areas
- Existing systems and tools
- Current operational pressures
- Main friction points

Do not create a large fictional backstory.

### 3. Define the baseline operational state

Create centralised baseline data for:

- Throughput
- Quality
- Delivery
- Productivity
- Visibility
- Cost

Use sensible illustrative values.

The values must be fictional and must not imply real Trion client results.

### 4. Define the operational friction points

Create a centralised list of friction points such as:

- Inconsistent downtime recording
- Disconnected production and quality information
- Duplicate spreadsheet updates
- Late visibility of material risk
- Data available without a shared operational view

Each friction point should include, where useful:

- Identifier
- Description
- Affected areas
- Related challenge
- Potential improvement
- Related KPI dimensions
- Current status

### 5. Define the connection map

Create a centralised model for relationships between:

- People
- Processes
- Data
- Systems
- Decisions
- Outcomes

The map should support connections such as:

- Production ↔ Quality
- Planning ↔ ERP
- Logistics ↔ Production
- Data ↔ Operational View
- Process ↔ Automation
- People ↔ Decisions

Each connection should have a meaningful identifier and state.

Do not build the visual map yet unless a minimal data structure is necessary.

### 6. Define challenge outcomes and upgrades

Create or refine centralised definitions for:

- The Missing Minutes
- The Quality Loop
- The Spreadsheet Shuffle
- The Delivery Domino
- The Control Room

Each challenge should have:

- Identifier
- Title
- Operational problem
- Improvement principle
- Related friction points
- Potential KPI effects
- Unlockable capability
- Related connection-map changes

Potential capabilities include:

- Connected Production View
- Production + Quality Integration
- Workflow Automation
- Logistics + Production Visibility
- Central Operational View

### 7. Define diagnostic dimensions

Create a simple data model for future diagnostic results.

Potential dimensions:

- Visibility
- Process efficiency
- Data connection
- Operational responsiveness
- Automation readiness
- Improvement potential

Do not build the final diagnostic screen yet.

### 8. Define opportunity data

Create a centralised model for future prioritisation.

Potential opportunities:

- Improve downtime data capture
- Connect production and quality records
- Reduce spreadsheet duplication
- Improve material visibility
- Create a shared operational view
- Automate a repetitive workflow

Include illustrative attributes such as:

- Impact
- Effort
- Time to value
- Operational risk
- Dependencies
- Related capability

## Architecture Requirements

Use the existing architecture.

Unless the repository already establishes otherwise:

- Use vanilla HTML, CSS, and JavaScript.
- Do not introduce a frontend framework.
- Do not add a backend.
- Do not add unnecessary dependencies.
- Do not create a complex simulation engine.

Centralise shared data rather than duplicating values throughout the UI.

Use clear naming and reusable structures.

## Scope Restrictions

Do not implement:

- The starting snapshot UI
- The friction-map UI
- The diagnostic screen
- Opportunity prioritisation
- The before-and-after screen
- New mini-game mechanics
- New animations
- A new design system

Those belong to later stages.

## Validation

Before finishing:

- Check that the application still runs.
- Check for syntax errors.
- Check for console errors.
- Ensure existing functionality has not been broken.
- Ensure the new data model is actually accessible to future modules.
- Ensure no duplicated competing state models have been introduced.

## Final Response

Report:

1. What you found.
2. What you changed.
3. The central data structures created or updated.
4. Files created or modified.
5. Any assumptions.
6. Any risks or follow-up decisions required.

Stop after this stage. Do not implement later stages.