You are continuing work inside the existing Trion Labs repository.

This is Stage 3 of the implementation plan.

Your task is to connect the existing five challenges to the shared fictional manufacturing operation.

Do not rebuild the entire application. Inspect, reuse, and improve the existing implementation.

## Objective

Make the visitor feel that they are improving one operation across five connected challenges:

1. The Missing Minutes
2. The Quality Loop
3. The Spreadsheet Shuffle
4. The Delivery Domino
5. The Control Room

Each challenge must contribute to:

- The shared operational state
- Relevant KPIs
- The friction map
- Unlocked capabilities
- The wider narrative
- The eventual diagnostic profile

## First: Read and Inspect

Before editing:

1. Read `.github/copilot-instructions.md`.
2. Read the relevant skills.
3. Inspect the shared operation model.
4. Inspect the current state model.
5. Inspect every existing challenge.
6. Inspect challenge navigation and completion behaviour.
7. Identify duplicated KPI or upgrade logic.
8. Identify any challenge that currently behaves as an isolated mini-game.

Do not make assumptions about the current implementation.

## Product Principle

The challenges should not feel like five unrelated games.

They should feel like five views of the same operation.

The visitor should gradually discover that:

- Production problems affect quality.
- Planning problems affect delivery.
- Data problems affect decisions.
- Process problems affect automation.
- Better visibility enables better improvement.

## Required Work

### 1. Establish consistent challenge metadata

Ensure every challenge has centralised metadata including:

- Identifier
- Title
- Short description
- Operational problem
- Improvement principle
- Related friction points
- Related operational areas
- KPI effects
- Unlockable capability
- Connection-map changes
- Completion state

Do not duplicate this information across multiple UI files.

### 2. Connect The Missing Minutes

Ensure the challenge addresses:

- Downtime
- Waiting
- Changeovers
- Inconsistent production information
- Lost productivity

It should contribute to:

- Throughput
- Productivity
- Visibility

It should unlock or strengthen:

- Connected Production View
- Production-related visibility

The feedback should explain why understanding production losses matters.

### 3. Connect The Quality Loop

Ensure the challenge addresses:

- Disconnected production and quality information
- Defect investigation
- Relationships between process conditions and quality outcomes

It should contribute to:

- Quality
- Visibility
- Potentially Productivity or Cost

It should unlock or strengthen:

- Production + Quality Integration

The challenge should explain why isolated quality records limit useful investigation.

### 4. Connect The Spreadsheet Shuffle

Ensure the challenge addresses:

- Duplicate data entry
- Manual reconciliation
- Unnecessary workflow steps
- Standardisation
- Automation readiness

It should contribute to:

- Productivity
- Visibility
- Cost
- Potentially Delivery

It should unlock or strengthen:

- Workflow Automation

The challenge should reinforce:

> Do not automate confusion.

### 5. Connect The Delivery Domino

Ensure the challenge addresses:

- Material availability
- Logistics
- Production planning
- Dependencies
- Delivery risk

It should contribute to:

- Delivery
- Visibility
- Potentially Throughput or Cost

It should unlock or strengthen:

- Logistics + Production Visibility

The challenge should show that local issues can create wider operational consequences.

### 6. Connect The Control Room

Ensure the challenge addresses:

- Useful operational information
- Audience-specific visibility
- KPI selection
- Shared operational understanding
- Decision-making

It should contribute to:

- Visibility
- Productivity
- Delivery
- Throughput

It should unlock or strengthen:

- Central Operational View

The challenge should not become a full dashboard-building application.

The central question should be:

> Who needs this information, and what decision should it help them make?

### 7. Make KPI changes meaningful

Review every KPI change.

Ensure:

- Changes are centralised.
- Changes are explainable.
- Relevant KPIs are affected.
- Not every decision increases every KPI.
- Trade-offs are possible.
- No arbitrary point rewards are used as the main logic.

### 8. Make upgrades meaningful

Upgrades should represent practical capabilities, not generic game power-ups.

Examples:

- Connected Production View
- Production + Quality Integration
- Workflow Automation
- Logistics + Production Visibility
- Central Operational View

Each upgrade should affect:

- The operation state
- The friction map
- The challenge overview
- The eventual diagnostic result

### 9. Improve challenge feedback

After each challenge, explain:

- What the visitor changed
- Why it matters
- Which friction point was addressed
- Which KPI changed
- Which capability was unlocked
- What remains unresolved

Avoid feedback that only says “Correct” or “You gained points”.

### 10. Preserve challenge individuality

Do not make all challenges use the same mechanic.

Maintain their intended identities:

- Investigation
- Connection
- Workflow redesign
- Dependency tracing
- Information prioritisation

Improve consistency without flattening their differences.

## Technical Requirements

Use the existing architecture.

Do not:

- Introduce a framework
- Create a backend
- Add unnecessary dependencies
- Create a complex simulation engine
- Duplicate state models
- Hard-code separate KPI values into individual screens

## Validation

Test the full challenge sequence:

- Complete each challenge individually.
- Complete challenges in the intended order.
- Refresh where appropriate.
- Reset the experience.
- Confirm state remains consistent.
- Confirm unlocks appear correctly.
- Confirm the friction map updates.
- Confirm KPI changes are reflected everywhere.
- Confirm no challenge breaks after another challenge is completed.

Check desktop and mobile layouts.

Check the browser console.

## Final Response

Report:

1. How the five challenges now connect.
2. What shared state was introduced or refined.
3. How KPIs and upgrades are calculated.
4. How the friction map updates.
5. Which challenge mechanics were preserved.
6. Any remaining inconsistencies.
7. Recommended review points before Stage 4.

Stop after this stage.