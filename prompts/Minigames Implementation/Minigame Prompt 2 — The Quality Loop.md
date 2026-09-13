You are refining the second mini-game in Trion Labs: **The Quality Loop**.

Work within the existing vanilla HTML/CSS/JavaScript architecture and Trion visual system. Do not introduce a framework or rebuild the application.

## Objective

Create a polished 60–90 second interaction demonstrating Trion's ability to connect information across an operation.

The visitor should understand that data becomes valuable when it is connected to the process that creates it.

## Story

Defects are increasing on a production line.

Production believes the issue is related to machine settings. Quality suspects a material batch. Nobody has the complete picture because the information is stored separately.

The visitor must connect the relevant information and identify the most likely cause.

## Interaction

Present a small set of information cards or nodes:

- Production conditions
- Quality results
- Machine status
- Shift information
- Material batch
- Process parameters

The visitor should be able to connect related information through clicking, dragging, or another intuitive interaction.

Do not make this a complicated graph editor.

The interaction should feel like:

**“What information would you connect to understand this problem?”**

As connections are made, reveal useful relationships.

For example:

- A defect spike occurs during a particular shift.
- The same material batch appears in the affected production records.
- A machine parameter changed shortly before the issue.

The visitor should be able to identify the most useful connection.

## Decision

Present a small number of improvement choices:

- Connect production and quality data.
- Standardise quality recording.
- Create a quality visibility dashboard.

The visitor should understand that different improvements solve different problems.

## Feedback

When the visitor makes a useful connection, show a clear visual relationship.

When they identify the likely cause, explain why.

Example:

> “The defect spike is concentrated around one material batch. Connecting production and quality information makes that relationship visible.”

Avoid generic success messages.

## KPI impact

Update:

- Quality
- Visibility
- Productivity or Cost, where appropriate

Do not make the outcome unrealistically perfect.

## Upgrade

Unlock:

**Production + Quality Integration**

Show the connection becoming part of the operational model.

## Design requirements

- Make the connections visually satisfying.
- Use lines, nodes, or cards that feel like a clean operational data map.
- Use subtle animation when information becomes connected.
- Make the interface feel intelligent, not like a children's matching game.
- Keep the number of nodes small.
- Ensure the visitor can understand the relationship without reading a large amount of text.
- Maintain the Trion white / #281a39 visual system.

## Success criteria

The visitor should finish understanding:

> “A problem is often difficult to solve because the information needed to understand it is disconnected.”

Focus on clarity, visual relationships, and meaningful feedback.