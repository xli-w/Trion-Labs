You are acting as a senior software architect, frontend engineer, product designer, interaction designer, and technical project lead.

Your task is to create a complete, practical **skills system for the Trion Labs project** before significant feature development begins.

The skills system will be used by GitHub Copilot throughout the project to keep development consistent, deliberate, maintainable, and aligned with Trion’s intended experience.

Do not begin by building the actual Trion Labs product. First, inspect the repository and create the skills system that will guide its development.

---

# 1. Project Context

Trion Labs is an interactive website experience for Trion, a manufacturing digitalisation and operational transformation consultancy.

It should demonstrate Trion’s thinking and capabilities through a small, polished operational strategy experience.

The central concept is:

> Find the friction. Build the flow.

The experience should allow a visitor to enter a simplified manufacturing operation, investigate hidden inefficiencies, make decisions, apply improvements, and see the operational consequences through changing KPIs and capabilities.

It is not intended to be a conventional computer game. It is an interactive demonstration of how Trion approaches operational improvement.

The experience should communicate an understanding of the relationships between:

- People
- Processes
- Data
- Technology
- Systems
- Operational performance
- Continuous improvement

The intended progression is:

1. Observe
2. Investigate
3. Decide
4. Improve
5. Measure
6. Unlock

The underlying improvement philosophy is:

1. Understand
2. Simplify
3. Standardise
4. Automate
5. Measure

The project should feel:

- Professional
- Intelligent
- Clear
- Practical
- Premium
- Slightly playful
- Human
- Visually refined
- Easy to understand

It should not feel:

- Like a generic SaaS dashboard
- Like a cyberpunk game
- Like a neon technology demo
- Like a corporate PowerPoint
- Like an overly complicated simulation
- Like a generic productivity app

The visual direction is predominantly white, supported by deep purple such as `#281a39`, with restrained use of supporting colours. Avoid excessive gradients, glowing effects, visual clutter, and unnecessary decoration.

---

# 2. Technical Context

The project is being created from scratch.

Unless the repository already establishes a different decision, use:

- HTML
- CSS
- Vanilla JavaScript
- No frontend framework
- No backend
- No external API dependency
- No unnecessary build system
- No unnecessary package dependencies

The project should be easy to run locally and easy to understand.

The likely structure will include:

```text
/
├── index.html
├── README.md
├── .github/
│   ├── copilot-instructions.md
│   └── skills/
├── css/
├── js/
└── assets/
```

Do not assume this structure already exists. Inspect the repository first and adapt appropriately.

---

# 3. Main Objective

Create a reusable skills system under:

```text
.github/skills/
```

Also create or update:

```text
.github/copilot-instructions.md
```

The result should allow future Copilot sessions to follow a consistent development process without requiring the entire project context to be repeated every time.

The skills should be:

- Focused
- Reusable
- Specific to Trion Labs
- Independent where possible
- Composable
- Easy for Copilot to discover and apply
- Written as practical instructions rather than vague descriptions
- Small enough to remain useful
- Detailed enough to prevent inconsistent implementation

Do not create one enormous skill containing everything.

Create a system of focused skills with clear responsibilities.

---

# 4. First Inspect the Repository

Before creating files:

1. Inspect the current repository structure.
2. Identify any existing code, documentation, configuration, or Copilot instructions.
3. Determine whether any skills already exist.
4. Identify the current technical stack, if any.
5. Identify existing naming conventions.
6. Identify whether there are existing design tokens, components, state models, or data structures.
7. Avoid overwriting useful existing work.
8. Reuse existing conventions where appropriate.
9. If the repository is empty, create the required structure from scratch.

Do not invent existing files or pretend that implementation already exists.

---

# 5. Required Skills

Create a coherent set of skills covering the following areas.

You may adjust the exact filenames if you have a better structure, but all responsibilities must be covered.

## 5.1 Project Context and Product Principles

Suggested file:

```text
.github/skills/trion-labs-context/SKILL.md
```

This skill should define:

- What Trion Labs is
- Its purpose
- The central experience
- The intended audience
- The relationship to Trion
- The tone and visual direction
- What the product is not
- The core messages
- The improvement philosophy
- The overall progression
- The boundaries of the project

It should prevent future Copilot sessions from drifting into generic game, SaaS, or dashboard design.

---

## 5.2 Product and Experience Design

Suggested file:

```text
.github/skills/experience-design/SKILL.md
```

This skill should guide:

- Designing the visitor journey
- Structuring screens
- Creating clear interaction loops
- Maintaining narrative progression
- Balancing explanation and interaction
- Making the experience understandable without instructions overload
- Designing moments of discovery
- Providing meaningful feedback
- Avoiding unnecessary complexity
- Making every interaction support the central message

It should explain how to decide whether a proposed feature improves the experience or merely adds complexity.

---

## 5.3 Visual Design and Brand Consistency

Suggested file:

```text
.github/skills/visual-design/SKILL.md
```

This skill should define and enforce:

- Colour usage
- Typography principles
- Spacing
- Layout
- Borders
- Shadows
- Cards
- Buttons
- Panels
- Data displays
- Status indicators
- Icon treatment
- Animation principles
- Responsive visual hierarchy

The visual language should be predominantly white with deep purple and restrained supporting colours.

It should explicitly prohibit:

- Excessive gradients
- Neon effects
- Cyberpunk styling
- Generic dashboard aesthetics
- Overly rounded everything
- Excessive glassmorphism
- Decorative animation without purpose
- Visual clutter

The skill should encourage a refined, editorial, architectural, operational visual language.

---

## 5.4 Frontend Architecture

Suggested file:

```text
.github/skills/frontend-architecture/SKILL.md
```

This skill should guide:

- File and folder structure
- Separation of concerns
- HTML, CSS, and JavaScript responsibilities
- Module organisation
- Naming conventions
- Reusable components and patterns
- State management
- Event handling
- Rendering strategy
- Data modelling
- Avoiding unnecessary abstractions
- Avoiding duplicated logic
- Keeping the code understandable

The architecture should remain appropriate for a small vanilla HTML/CSS/JavaScript experience.

Do not introduce React, Vue, TypeScript, Tailwind, a backend, or other tooling unless explicitly requested or clearly justified by the existing repository.

---

## 5.5 State, Progression, and Game Logic

Suggested file:

```text
.github/skills/state-and-progression/SKILL.md
```

This skill should guide the implementation of:

- Global application state
- Current screen
- Completed challenges
- Unlocked upgrades
- KPI values
- Capability stage
- Decisions made
- Notifications
- Progression
- Challenge completion
- Reset behaviour
- Derived values
- Consistent state updates

The experience should have meaningful progression without becoming a complex simulation.

The skill should explain how to avoid:

- Random, unexplained KPI changes
- Arbitrary points
- Contradictory state
- Progression that does not reflect decisions
- Features that bypass the intended experience
- Hard-coded UI values that become inconsistent

KPIs may include:

- Throughput
- Quality
- Delivery
- Productivity
- Visibility
- Cost

KPIs should interact meaningfully. Not every improvement should increase every KPI.

---

## 5.6 Mini-Game and Challenge Design

Suggested file:

```text
.github/skills/challenge-design/SKILL.md
```

This skill should define how to design and implement each mini-game.

Every challenge should have:

- A clear operational problem
- A concise scenario
- A reason the visitor should care
- A small number of meaningful interactions
- A clear decision or intervention
- Feedback explaining the consequence
- KPI impact
- An upgrade or capability outcome
- A connection to the wider Trion methodology

The five planned challenges are:

### The Missing Minutes

Focus:

- Production losses
- Downtime
- Waiting
- Changeovers
- Visibility

Primary principle:

- Understand

Potential unlock:

- Connected Production View

### The Quality Loop

Focus:

- Production and quality data
- Relationships between conditions and defects
- Disconnected information

Primary principle:

- Connect information

Potential unlock:

- Production + Quality Integration

### The Spreadsheet Shuffle

Focus:

- Manual planning
- Duplicate entry
- Spreadsheet workflows
- Simplification
- Standardisation
- Automation

Primary principles:

- Simplify
- Standardise
- Automate

Potential unlock:

- Workflow Automation

### The Delivery Domino

Focus:

- Material availability
- Logistics
- Production planning
- Dependencies
- Delivery risk

Primary principle:

- See the wider operation

Potential unlock:

- Logistics + Production Visibility

### The Control Room

Focus:

- Useful operational information
- Audience-specific visibility
- KPI selection
- Central operational view

Primary principles:

- Measure
- Improve

Potential unlock:

- Central Operational View

The skill should encourage challenges to be short, understandable, and satisfying rather than large or technically complicated.

---

## 5.7 Interaction Design and Feedback

Suggested file:

```text
.github/skills/interaction-design/SKILL.md
```

This skill should guide:

- Click and selection behaviour
- Hover states
- Drag-and-drop, where appropriate
- Transitions
- Loading and completion states
- Error states
- Decision feedback
- Success and failure feedback
- Progressive disclosure
- Keyboard interaction
- Touch interaction
- Reduced-motion behaviour

Feedback should explain why an action matters operationally.

Avoid feedback that is only:

- “Correct”
- “Wrong”
- “You gained 100 points”

Prefer feedback such as:

- What changed
- Why it changed
- Which operational relationship was revealed
- Which KPI was affected
- What capability was unlocked
- What trade-off was introduced

---

## 5.8 Data Visualisation and KPI Design

Suggested file:

```text
.github/skills/data-and-kpis/SKILL.md
```

This skill should guide:

- KPI cards
- Small charts
- Timelines
- Process flows
- Dependency chains
- Status indicators
- Before-and-after comparisons
- Operational summaries
- Data hierarchy
- Avoiding misleading visualisations

Data should be simple and legible.

Do not create a full enterprise dashboard.

Every visualisation should answer a clear question.

For each KPI or data element, the skill should encourage defining:

- What it represents
- Why it matters
- What changes it
- How it relates to other measures
- How it should be explained to the visitor

---

## 5.9 Responsive and Accessibility Engineering

Suggested file:

```text
.github/skills/accessibility-and-responsive/SKILL.md
```

This skill should enforce:

- Semantic HTML
- Keyboard accessibility
- Visible focus states
- Sufficient colour contrast
- Accessible buttons and controls
- Clear labels
- Responsive layouts
- Touch-friendly interaction
- Mobile-first consideration
- Reduced-motion support
- No interaction that depends only on colour
- No essential information hidden on smaller screens

The experience should work across:

- Desktop
- Laptop
- Tablet
- Mobile

Do not treat mobile as an afterthought.

---

## 5.10 Code Quality and Maintainability

Suggested file:

```text
.github/skills/code-quality/SKILL.md
```

This skill should guide:

- Small, understandable functions
- Clear naming
- Avoiding duplicated logic
- Avoiding unnecessary global variables
- Avoiding magic numbers
- Consistent formatting
- Defensive handling of missing elements
- Meaningful comments
- Avoiding overengineering
- Keeping code easy for another developer to modify

It should also require:

- No avoidable console errors
- No dead code
- No broken links
- No unused files created without purpose
- No placeholder behaviour presented as complete functionality

---

## 5.11 Testing and Review

Suggested file:

```text
.github/skills/testing-and-review/SKILL.md
```

This skill should define how Copilot should review work before considering it complete.

Include checks for:

### Functional behaviour

- Navigation works
- Buttons work
- State updates correctly
- Challenges can be completed
- Progression is consistent
- Reset works
- No challenge breaks after another challenge is completed

### Visual behaviour

- Layout is coherent
- Spacing is consistent
- Typography is readable
- No overflow
- No accidental clipping
- Responsive behaviour works
- Visual hierarchy is clear

### Interaction behaviour

- Feedback appears at the right time
- Interactions are understandable
- Keyboard interaction works
- Touch interaction works
- Reduced-motion behaviour is respected

### Product behaviour

- The experience still communicates Trion’s purpose
- The challenge is not unnecessarily complicated
- The visitor understands what they are doing
- The outcome is meaningful
- The design does not drift into generic game or dashboard conventions

The skill should require Copilot to identify problems honestly rather than declaring work complete prematurely.

---

## 5.12 Feature Planning and Implementation Workflow

Suggested file:

```text
.github/skills/feature-workflow/SKILL.md
```

This skill should define the standard workflow for implementing new work.

Use the following general process:

1. Understand the requested outcome.
2. Inspect the relevant files.
3. Identify existing patterns to reuse.
4. Define the smallest useful implementation.
5. Consider state and architecture implications.
6. Implement the feature.
7. Review visual and interaction consistency.
8. Test the feature.
9. Check responsive and accessibility behaviour.
10. Summarise what changed and any remaining risks.

The skill should encourage incremental development.

Do not build all five mini-games at once.

Prefer:

- Foundation first
- One excellent challenge
- Review
- Reusable patterns
- Next challenge
- Final cohesion review

---

## 5.13 Trion Language and Content Style

Suggested file:

```text
.github/skills/trion-content-style/SKILL.md
```

This skill should guide all user-facing copy.

The language should be:

- Clear
- Practical
- Concise
- Intelligent
- Human
- Confident without being boastful

Avoid:

- Empty corporate language
- Excessive buzzwords
- Generic transformation claims
- Overuse of “seamless”
- Overuse of “revolutionise”
- Unsubstantiated claims
- Unnecessary technical jargon
- Long explanatory paragraphs inside interactive screens

Prefer language that explains:

- What is happening
- Why it matters
- What the visitor can investigate
- What decision is available
- What changed
- What the result means

---

## 5.14 Fabric and Trion Capability Positioning

Suggested file:

```text
.github/skills/fabric-positioning/SKILL.md
```

This skill should explain how Trion Labs should demonstrate the principles behind Fabric without pretending to be a live production system.

Fabric should be represented as a connected operational environment that brings together:

- Processes
- Data
- Tools
- Systems
- People
- Operational views

Do not add fake backend integrations or imply that the website is connected to real factory data.

Use Fabric naturally through:

- Connected information
- Shared operational visibility
- Integrated workflows
- Role-specific views
- Better relationships between systems
- More useful operational decisions

Avoid making Fabric feel like a disconnected product advertisement.

---

# 6. Skill Format

Each skill should use a consistent Markdown structure.

Use a format similar to:

```markdown
# Skill Name

## Purpose

What this skill is responsible for.

## When to Use

When Copilot should apply this skill.

## Core Principles

The key rules that must be followed.

## Required Process

The recommended workflow.

## Do

- ...
- ...

## Avoid

- ...
- ...

## Review Checklist

- ...
- ...
```

Do not make every skill identical if another structure would be clearer, but maintain consistency across the system.

Each skill should be actionable.

Avoid vague instructions such as:

- “Make it good”
- “Use best practices”
- “Ensure quality”
- “Make it modern”

Replace them with concrete guidance.

---

# 7. Create the Main Copilot Instructions File

Create or update:

```text
.github/copilot-instructions.md
```

This file should act as the entry point for the skills system.

It should include:

1. A concise description of Trion Labs.
2. The technical constraints.
3. The core product principles.
4. The visual direction.
5. The expected development workflow.
6. A list of available skills.
7. Instructions for selecting and applying relevant skills.
8. A requirement to inspect existing code before changing it.
9. A requirement to avoid unnecessary dependencies.
10. A requirement to test and review work before declaring it complete.

The main instructions file should not duplicate every detail from every skill.

It should point Copilot toward the appropriate skills.

---

# 8. Skill Selection Rules

Define clear rules for when skills should be used.

For example:

- New feature → feature-workflow + relevant technical/design skills
- New screen → experience-design + visual-design + accessibility
- New mini-game → challenge-design + state-and-progression + interaction-design
- New KPI → data-and-kpis + state-and-progression
- New component → frontend-architecture + visual-design + accessibility
- Visual refinement → visual-design + interaction-design
- Bug fix → frontend-architecture + code-quality + testing-and-review
- Final review → testing-and-review + trion-labs-context
- New copy → trion-content-style
- Fabric-related content → fabric-positioning

Do not require every skill to be loaded for every task. The system should remain efficient.

---

# 9. Important Constraints

Do not:

- Build the actual product yet
- Create the five mini-games yet
- Add unnecessary frameworks
- Add a backend
- Add authentication
- Add accounts
- Add leaderboards
- Add payments
- Add real Fabric integrations
- Add unnecessary dependencies
- Create a generic game engine
- Create an oversized design system
- Create excessive documentation unrelated to the skills system
- Overwrite existing work without inspection
- Invent requirements that are not supported by the project context

The objective is to create a strong foundation for future Copilot-led development.

---

# 10. Final Output

After creating the skills system:

1. Show the final directory structure.
2. List every skill created.
3. Briefly explain the responsibility of each skill.
4. Explain how the skills work together.
5. Identify any assumptions made.
6. Identify any existing files that were preserved or updated.
7. Explain how future prompts should invoke the skills.
8. Do not begin implementing Trion Labs features unless explicitly asked.

Before finishing, review the skills system as a whole and ensure that:

- There is no major duplication.
- The skills do not contradict each other.
- The instructions are practical.
- The system is specific to Trion Labs.
- The system supports incremental development.
- The system protects the visual and product direction.
- The system is usable by GitHub Copilot in future sessions.
- The system is not unnecessarily complicated.