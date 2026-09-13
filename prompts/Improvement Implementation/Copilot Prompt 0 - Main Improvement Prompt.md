You are acting as a senior product designer, frontend architect, interaction designer, and manufacturing digitalisation consultant.

Your task is to improve the existing Trion Labs experience by implementing the highest-value product and commercial priorities identified below.

This is an implementation task, not a conceptual brainstorming exercise.

Before changing anything, inspect the repository, understand the existing architecture, read the available Trion Labs skills, and identify what has already been implemented. Preserve useful existing work and extend it consistently.

Do not rebuild the project unnecessarily.

1. Project Context

Trion Labs is an interactive website experience for Trion, a manufacturing digitalisation and operational transformation consultancy.

Its purpose is to demonstrate how Trion thinks about operational improvement through a short, polished, interactive experience.

The central message is:

Find the friction. Build the flow.

The visitor enters a simplified manufacturing operation, investigates operational problems, makes decisions, applies improvements, and sees how those improvements affect the wider operation.

Trion Labs should help a potential client recognise problems they may already experience in their own business.

It should communicate that Trion understands the relationship between:

People
Processes
Data
Systems
Technology
Operational performance
Continuous improvement

The experience should not feel like a generic game, SaaS dashboard, or technology advertisement.

It should feel:

Professional
Intelligent
Practical
Premium
Clear
Slightly playful
Human
Operationally credible

The wider Trion business model is based on helping manufacturing SMEs:

Understand their current operation.
Identify friction and inefficiency.
Simplify and standardise processes.
Connect systems, data, and people.
Implement practical improvements.
Measure the resulting value.
Build a sensible longer-term transformation roadmap.

Trion should be positioned as pragmatic and outcome-focused—not as a consultancy that immediately recommends replacing everything.

2. Existing Skills System

Use the repository’s existing skills system as the governing development standard.

Before implementation:

Locate .github/copilot-instructions.md.
Locate and read the relevant skills under .github/skills/.
Apply the appropriate skills for:
Product and experience design
Visual design
Frontend architecture
State and progression
Challenge design
Interaction design
Data and KPI design
Accessibility and responsive behaviour
Code quality
Testing and review
Trion content style
Fabric positioning

If the skills system is missing or incomplete, do not stop the task. Follow the principles in this prompt and identify the missing system elements in your final summary.

3. Main Objective

Transform Trion Labs from a collection of individual interactive challenges into a coherent, commercially meaningful experience built around one fictional manufacturing operation.

The visitor should feel that they are improving the same operation throughout the experience.

The experience should follow this broad journey:

Landing
    ↓
Enter the operation
    ↓
Starting operational snapshot
    ↓
Investigate five connected challenges
    ↓
Improve the operation
    ↓
See the friction map become more connected
    ↓
Prioritise the next improvement
    ↓
Review the before-and-after operation
    ↓
Receive a diagnostic profile
    ↓
Discover Trion’s approach
    ↓
Explore a relevant Trion next step

Do not implement every possible enhancement. Focus on the priorities defined below.

4. Priority One — Create a Shared Fictional Manufacturing Operation

Introduce a consistent fictional company or manufacturing site that provides context for all five challenges.

Use a fictional Midlands manufacturing SME unless the existing product already has a suitable fictional operation.

The company should feel realistic but not overdeveloped.

Example direction:

A growing precision engineering manufacturer with capable people, a mixture of legacy systems, and increasing pressure on productivity, quality, planning, and delivery.

Do not copy a real company.

The operation should include a concise starting profile covering:

Type of manufacturing
Approximate scale
Main operational areas
Existing systems and tools
Current pressures
Main sources of friction

For example:

Production
Quality
Planning
Logistics
Maintenance
Management visibility

The introduction should communicate:

The operation is not broken. It is working harder than it needs to.

Avoid implying that the company’s employees are incompetent or that its existing systems are worthless.

The fictional operation should be reused across all five challenges so that each improvement affects the same wider system.

5. Priority Two — Add a Starting Operational Snapshot

Before the first challenge, show a compact, visually polished overview of the operation’s current condition.

This should not be a dense dashboard.

Use a clear combination of:

Short company description
Operational areas
Current friction points
A small number of baseline KPIs
A visual representation of disconnected relationships

Potential baseline conditions:

Production losses are not consistently categorised.
Quality information is separate from production conditions.
Planning relies on duplicated spreadsheet updates.
Material risks are discovered late.
Management has data but lacks a shared operational view.

The visitor should understand the situation within a few seconds.

Use clear language such as:

Several systems are working. The operation is not always working as one.

Do not overload the visitor with statistics or explanatory text.

6. Priority Three — Add a Friction and Connection Map

Create a simple visual model of the operation showing relationships between:

People
Processes
Data
Systems
Decisions
Operational outcomes

Initially, the relationships should appear incomplete, disconnected, or unclear.

As challenges are completed, the map should become more connected.

This does not need to be a complex graph engine.

It can be a carefully designed visual component using:

Nodes
Lines
Labels
Status indicators
Subtle transitions
Connected/disconnected states

The map should communicate the central Trion idea:

The problem is often not the absence of technology. It is the lack of connection between the things the business already has.

Each completed challenge should reveal or strengthen a meaningful connection.

For example:

Production ↔ Quality
Planning ↔ ERP
Logistics ↔ Production
Data ↔ Operational View
Process ↔ Automation
People ↔ Decisions

The map should be integrated into the wider experience rather than appearing as an unrelated decorative animation.

7. Priority Four — Make the Five Challenges Feel Like One Operation

Review the existing five mini-games:

The Missing Minutes
The Quality Loop
The Spreadsheet Shuffle
The Delivery Domino
The Control Room

Do not automatically rebuild them.

Inspect what exists and improve only what is necessary to make them feel connected.

Each challenge should:

Refer to the same fictional operation.
Build on previously discovered information.
Have a clear operational problem.
Require a meaningful decision.
Explain the consequence of that decision.
Affect relevant KPIs or capability indicators.
Unlock a practical capability.
Contribute to the friction and connection map.
Connect to Trion’s improvement methodology.

The progression should broadly communicate:

Understand
    ↓
Connect
    ↓
Simplify
    ↓
Standardise
    ↓
Automate
    ↓
Measure

The exact ordering may be adapted to the existing implementation, but the overall progression should feel intentional.

Avoid making every challenge feel like the same interaction with different colours.

Each challenge should have its own mechanic while remaining part of one product.

8. Priority Five — Add Meaningful Diagnostic Results

Do not rely on a conventional game score as the primary final output.

Create a diagnostic profile that summarises the visitor’s improved operation.

Potential dimensions include:

Visibility
Process efficiency
Data connection
Operational responsiveness
Automation readiness
Improvement potential

Use a small number of clearly explained dimensions.

Do not invent an unnecessarily complex scoring algorithm.

The profile should be derived from:

Challenges completed
Decisions made
Upgrades unlocked
KPI changes
Trade-offs
Quality of the visitor’s improvement choices

The result should be explainable.

For example:

Your operation has strong improvement potential. The biggest opportunity is to make existing information more reliable and useful before introducing further automation.

Avoid arbitrary scores that do not reflect the visitor’s decisions.

The final profile should include:

A concise overall summary
Strengths
Main friction points
Most significant improvement opportunity
Recommended next step

Do not present the result as a formal business assessment or real consultancy diagnosis. Make it clear that it is an illustrative interactive profile.

9. Priority Six — Add Opportunity Prioritisation

After the challenges, introduce a short prioritisation exercise.

Present a small set of possible improvements identified during the experience.

Examples:

Improve downtime data capture
Connect production and quality records
Reduce spreadsheet duplication
Improve material visibility
Create a shared operational view
Automate a repetitive workflow

Ask the visitor:

If this were your operation, what would you improve next?

Allow them to prioritise opportunities using a simple, intuitive interaction.

Possible factors:

Impact
Effort
Time to value
Operational risk
Dependency on other improvements

This could use:

An Impact vs Effort matrix
A ranked list
Drag-and-drop cards
A simple “choose your first move” interaction

Choose the implementation that best fits the existing design system and works reliably on mobile.

The purpose is not to test the visitor’s business knowledge.

The purpose is to demonstrate that Trion helps clients decide:

What should we improve first, and why?

The experience should reward practical, proportionate choices.

For example:

A targeted improvement may offer strong value with low disruption.
A large system replacement may offer potential value but carry greater effort and risk.
Automation may be premature if the process is not yet simplified or standardised.

Do not make the answer artificially obvious. Explain trade-offs clearly.

10. Priority Seven — Add a Before-and-After Operating Model

The final experience should show more than improved KPI numbers.

Create a before-and-after comparison of how the operation works.

Before

Potential themes:

Teams reconcile information manually.
Problems are discovered late.
Data is recorded inconsistently.
Different teams work from different versions of the truth.
Decisions depend heavily on individual knowledge.
Improvement opportunities are difficult to prioritise.
After

Potential themes:

Information is available where it is needed.
Processes are more consistent.
Exceptions are identified earlier.
Teams share a clearer operational picture.
Repetitive work is reduced.
Improvements can be measured and refined.

The comparison should be visually concise and easy to scan.

Use language that communicates:

The operation is not just more digital. It is easier to run.

Do not imply that the fictional operation has achieved perfect performance.

Show improvement with remaining potential.

11. Priority Eight — Add a Trion Approach Reveal

At the end, explain how the experience maps to Trion’s real-world approach.

Use a concise, visually engaging sequence such as:

Understand
Map the current operation and identify friction.

Simplify
Remove unnecessary steps and duplication.

Standardise
Create consistent processes, definitions, and ways of working.

Connect
Bring relevant systems, data, and people together.

Automate
Remove repetitive work where automation creates genuine value.

Measure
Track the right outcomes and guide the next improvement.

This should feel like a natural conclusion to the experience, not a sales presentation.

Where appropriate, connect the stages to Trion’s real frameworks:

Site Walks
Digital & Operational Maturity Scorecard
Digital Landscape Map
Opportunity & Action Register
Transformation Roadmap
Quick Win Automation Sprints
Operational intelligence and reporting

Do not turn this into a large documentation section.

Keep it interactive, concise, and visually integrated.

12. Priority Nine — Add a Relevant Final CTA

The final CTA should reflect the visitor’s result where practical.

Avoid ending with a generic:

Contact Trion.

Instead, use a relevant next step such as:

Explore Trion’s approach
Explore the Trion Frameworks
Start with a Digital Diagnostic
Discuss an operational challenge
Map your current operation
Explore Quick Win Automation Sprints

If the diagnostic profile identifies a particular opportunity, use that to influence the CTA copy.

Examples:

Low visibility → “Start with a Digital Diagnostic”
Strong quick-win opportunity → “Explore Quick Win Automation Sprints”
Disconnected systems → “Explore Trion’s Integration Approach”
Broad improvement potential → “Explore the Transformation Roadmap”

The CTA should remain informative and confident, not aggressive or overly sales-focused.

13. Priority Ten — Make People and Process Visible

Review the experience to ensure it does not accidentally position Trion as only a software, dashboard, or integration company.

Include decisions or explanations involving:

Who owns information
Who needs to see it
Where decisions happen
Which process steps are unnecessary
What should be standardised
How people will use the improved process
How operational changes are measured

For example, The Control Room should not simply ask:

Which dashboard widgets do you want?

It should ask something closer to:

Who needs this information, and what decision should it help them make?

Potential audiences:

Operator
Team leader
Planner
Quality engineer
Maintenance engineer
Operations manager

This should reinforce that Trion improves the operating environment—not just the technology layer.

14. Technical Requirements

Use the existing project architecture and skills system.

Unless the repository already establishes otherwise:

Use HTML, CSS, and vanilla JavaScript.
Do not introduce React, Vue, Angular, or another framework.
Do not add a backend.
Do not add authentication.
Do not add accounts or leaderboards.
Do not add real Fabric integrations.
Do not add unnecessary dependencies.
Do not create a complex simulation engine.
Do not introduce a large state-management library.

Keep the implementation modular and maintainable.

Use reusable patterns for:

Screens
Cards
Buttons
KPI displays
Progress indicators
Challenge completion
Upgrade unlocks
Diagnostic results
Before-and-after comparisons
Connection-map updates

Ensure that all new state is represented consistently in the existing state model.

Do not hard-code different versions of the same value in multiple places.

15. Visual and Interaction Requirements

Maintain the existing Trion Labs visual direction:

Predominantly white
Deep purple, including approximately #281a39
Restrained supporting colours
Strong typography
Clear spacing
Refined borders and panels
Subtle, purposeful animation
Premium but approachable
No visual clutter

Avoid:

Excessive gradients
Neon effects
Cyberpunk styling
Generic SaaS dashboards
Overly rounded interfaces
Excessive glassmorphism
Decorative animation without purpose
Large blocks of explanatory text
Unnecessary visual complexity

All additions should feel like part of the same product.

Use progressive disclosure where information is complex.

Interactions must work on:

Desktop
Laptop
Tablet
Mobile

Ensure:

Keyboard accessibility
Visible focus states
Semantic controls
Sufficient contrast
Touch-friendly targets
Reduced-motion support
No essential information communicated only through colour
16. Implementation Process

Follow this order:

Step 1 — Audit

Inspect:

Existing files
Existing state model
Existing screens
Existing mini-games
Existing styling
Existing skills
Existing progression logic

Identify what can be reused.

Step 2 — Define the shared model

Before writing UI, establish or refine:

Fictional operation data
Baseline KPIs
Friction points
Connection-map nodes and relationships
Challenge outcomes
Upgrade definitions
Diagnostic dimensions
Opportunity definitions
Final CTA logic

Keep this data centralised and explainable.

Step 3 — Implement the shared operation context

Add:

Fictional operation introduction
Starting snapshot
Baseline state
Friction and connection map
Step 4 — Connect the existing challenges

Update the five challenges so they contribute to the shared operation.

Do not redesign every challenge unless required.

Step 5 — Implement diagnostic results

Add:

Diagnostic profile
Main friction summary
Improvement opportunity
Recommended next step
Step 6 — Implement opportunity prioritisation

Add a short, polished prioritisation interaction.

Step 7 — Implement before-and-after comparison

Show how the operation behaves differently after improvement.

Step 8 — Implement Trion approach and CTA

Connect the experience to Trion’s methodology and relevant next steps.

Step 9 — Review the complete journey

Test the experience from first visit to completion.

17. Quality and Product Review

Before declaring the work complete, review the result against the following questions:

Product purpose
Does the experience make a manufacturing client recognise real operational problems?
Does it demonstrate Trion’s way of thinking?
Does it position Trion as practical and outcome-focused?
Does it connect naturally to Trion’s wider business model?
Experience
Does the visitor feel they are improving one operation?
Is the progression clear?
Are the decisions meaningful?
Are the consequences understandable?
Does the experience remain engaging without becoming a conventional game?
Commercial relevance
Does the final result resemble a simplified diagnostic?
Does the prioritisation step demonstrate consultancy judgement?
Does the experience naturally lead toward Trion’s frameworks and services?
Does it communicate the value of practical quick wins?
Technical quality
Is state consistent?
Are values derived rather than duplicated?
Are components reusable?
Are there console errors?
Are there broken interactions?
Does reset work?
Does the experience work on mobile?
Are keyboard and reduced-motion behaviours supported?
Visual quality
Is the visual language cohesive?
Is the interface restrained and premium?
Is the information hierarchy clear?
Does the connection map feel meaningful rather than decorative?
Is there any unnecessary complexity?
18. Important Scope Control

Do not add the following unless they are already present and genuinely required:

User accounts
Multiplayer
Leaderboards
Complex resource management
A large factory map
3D factory navigation
Real-time data
AI chat
Real Fabric integration
Full dashboard construction
A large assessment questionnaire
Dozens of additional mini-games
A complex financial model

The goal is to create a concise, polished, commercially relevant experience—not a large software product.

Prioritise clarity, coherence, and perceived value over feature quantity.

19. Final Response Requirements

After implementation, provide:

A concise summary of what changed.
The files created or modified.
The new shared operation model.
How the five challenges now connect.
How the diagnostic profile is calculated.
How opportunity prioritisation works.
How the final CTA is selected.
Any assumptions made.
Any remaining limitations or recommended follow-up work.
A clear statement of what was deliberately not implemented to protect scope.

Do not claim the work is complete unless it has been reviewed against the requirements above.