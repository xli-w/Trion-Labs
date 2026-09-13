export const operationKpis = Object.freeze({
  throughput: Object.freeze({
    label: "Throughput",
    description: "How much useful output the operation produces.",
    baseline: 58,
    target: 78,
    unit: "%",
    direction: "higher",
    relationshipIds: Object.freeze([
      "production-event-context",
      "material-risk-response",
    ]),
  }),
  quality: Object.freeze({
    label: "Quality",
    description: "How much is produced right first time.",
    baseline: 72,
    target: 88,
    unit: "%",
    direction: "higher",
    relationshipIds: Object.freeze(["production-quality-context"]),
  }),
  delivery: Object.freeze({
    label: "Delivery",
    description: "Whether customer commitments can be met on time.",
    baseline: 64,
    target: 86,
    unit: "%",
    direction: "higher",
    relationshipIds: Object.freeze([
      "material-risk-response",
      "shared-decision-context",
    ]),
  }),
  productivity: Object.freeze({
    label: "Productivity",
    description: "How efficiently people and resources are used.",
    baseline: 55,
    target: 76,
    unit: "%",
    direction: "higher",
    relationshipIds: Object.freeze([
      "production-event-context",
      "planning-erp-context",
      "shared-decision-context",
    ]),
  }),
  visibility: Object.freeze({
    label: "Visibility",
    description: "How clearly people can see the condition of the operation.",
    baseline: 35,
    target: 80,
    unit: "%",
    direction: "higher",
    relationshipIds: Object.freeze([
      "production-event-context",
      "production-quality-context",
      "planning-erp-context",
      "material-risk-response",
      "shared-decision-context",
    ]),
  }),
  cost: Object.freeze({
    label: "Cost control",
    description: "How well avoidable resource use is controlled.",
    baseline: 68,
    target: 82,
    unit: "%",
    direction: "higher",
    relationshipIds: Object.freeze(["planning-erp-context"]),
  }),
});

export const kpiDefinitions = Object.freeze(
  Object.fromEntries(
    Object.entries(operationKpis).map(([id, kpi]) => [
      id,
      Object.freeze({
        label: kpi.label,
        description: kpi.description,
      }),
    ]),
  ),
);

export const initialKpis = Object.freeze(
  Object.fromEntries(
    Object.entries(operationKpis).map(([id, kpi]) => [
      id,
      Object.freeze({
        baseline: kpi.baseline,
        current: kpi.baseline,
        target: kpi.target,
        unit: kpi.unit,
      }),
    ]),
  ),
);

export const operation = Object.freeze({
  id: "northstar-formed-components",
  name: "Northstar Formed Components",
  location: "West Midlands, UK",
  description:
    "A growing manufacturer of formed metal components for commercial equipment.",
  manufacturingContext:
    "Three production lines make short-run and repeat components across two shifts.",
  premise: "Several systems are working. The operation is not always working as one.",
  currentChallenge:
    "Growing order pressure is exposing friction between production, quality, planning, and delivery.",
  profileFacts: Object.freeze([
    Object.freeze({ label: "People", value: "110 colleagues" }),
    Object.freeze({ label: "Production", value: "3 lines" }),
    Object.freeze({ label: "Working pattern", value: "2 shifts" }),
  ]),
  pressurePoints: Object.freeze([
    "More customer commitments need reliable delivery dates.",
    "Teams spend time reconciling information before they can act.",
  ]),
});

export const operationalAreas = Object.freeze([
  Object.freeze({
    id: "production",
    label: "Production",
    detail: "Line events, output, changeovers, and available capacity.",
  }),
  Object.freeze({
    id: "quality",
    label: "Quality",
    detail: "Defect results, material traceability, and containment.",
  }),
  Object.freeze({
    id: "planning",
    label: "Planning",
    detail: "Schedules, orders, and production constraints.",
  }),
  Object.freeze({
    id: "logistics",
    label: "Logistics",
    detail: "Material status and supplier delivery risk.",
  }),
  Object.freeze({
    id: "maintenance",
    label: "Maintenance",
    detail: "Equipment condition and recurring line losses.",
  }),
  Object.freeze({
    id: "management",
    label: "Management",
    detail: "Priorities, commitments, and operational decisions.",
  }),
]);

export const operationSystems = Object.freeze([
  Object.freeze({
    id: "line-event-records",
    label: "Line event records",
    type: "Production record",
    detail: "Useful loss data is captured inconsistently at the line.",
  }),
  Object.freeze({
    id: "quality-records",
    label: "Quality records",
    type: "Quality system",
    detail: "Defect results are held separately from the production context.",
  }),
  Object.freeze({
    id: "legacy-erp",
    label: "Legacy ERP / MRP",
    type: "Planning system",
    detail: "Orders and material context exist, but do not travel with every update.",
  }),
  Object.freeze({
    id: "planning-spreadsheets",
    label: "Planning spreadsheets",
    type: "Manual workspace",
    detail: "The plan is copied, checked, and shared through separate files.",
  }),
  Object.freeze({
    id: "supplier-updates",
    label: "Supplier updates",
    type: "Logistics channel",
    detail: "Arrival changes are visible before their delivery consequence is clear.",
  }),
]);

export const frictionPoints = Object.freeze([
  Object.freeze({
    id: "incomplete-downtime-context",
    title: "Downtime lacks context",
    description:
      "Line stoppages are recorded inconsistently, so supervisors reconstruct why useful time was lost.",
    resolvedDescription:
      "Production loss records now carry the reason, timing, machine state, and shift context needed for review.",
    areaIds: Object.freeze(["production", "maintenance"]),
    systemIds: Object.freeze(["line-event-records"]),
    kpiIds: Object.freeze(["throughput", "productivity", "visibility"]),
    challengeId: "missing-minutes",
    resolutionCapabilityIds: Object.freeze(["connected-production-view"]),
  }),
  Object.freeze({
    id: "disconnected-production-quality-records",
    title: "Quality evidence is disconnected",
    description:
      "Defect results, production conditions, and material traceability must be compared manually.",
    resolvedDescription:
      "Production and quality records now share the case context needed to trace recurring defects.",
    areaIds: Object.freeze(["production", "quality"]),
    systemIds: Object.freeze(["line-event-records", "quality-records"]),
    kpiIds: Object.freeze(["quality", "productivity", "visibility"]),
    challengeId: "quality-loop",
    resolutionCapabilityIds: Object.freeze(["production-quality-integration"]),
  }),
  Object.freeze({
    id: "duplicated-planning-workflow",
    title: "Planning work is duplicated",
    description:
      "Production updates are copied into spreadsheets, reconciled, and emailed before the schedule can move.",
    resolvedDescription:
      "One standard planning flow carries source context into the schedule instead of duplicating the update.",
    areaIds: Object.freeze(["production", "planning"]),
    systemIds: Object.freeze(["legacy-erp", "planning-spreadsheets"]),
    kpiIds: Object.freeze(["productivity", "visibility", "cost", "delivery"]),
    challengeId: "spreadsheet-shuffle",
    resolutionCapabilityIds: Object.freeze(["workflow-automation"]),
  }),
  Object.freeze({
    id: "late-material-risk-visibility",
    title: "Material risk reaches the plan late",
    description:
      "A supplier delay is visible in logistics before the affected work, capacity, and customer commitments are clear.",
    resolvedDescription:
      "Material risk reaches planning and delivery as one earlier, shared exception.",
    areaIds: Object.freeze(["logistics", "planning", "production"]),
    systemIds: Object.freeze(["supplier-updates", "legacy-erp"]),
    kpiIds: Object.freeze(["delivery", "throughput", "visibility"]),
    challengeId: "delivery-domino",
    resolutionCapabilityIds: Object.freeze(["logistics-production-visibility"]),
  }),
  Object.freeze({
    id: "unfocused-operational-exception-view",
    title: "Operational information has no shared focus",
    description:
      "Management has data, but the people coordinating an exception cannot see the same decision context.",
    resolvedDescription:
      "One shared exception view gives each role the focused context needed to coordinate a response.",
    areaIds: Object.freeze(["management", "planning", "production"]),
    systemIds: Object.freeze(["legacy-erp", "planning-spreadsheets"]),
    kpiIds: Object.freeze(["visibility", "productivity", "delivery"]),
    challengeId: "control-room",
    resolutionCapabilityIds: Object.freeze(["central-operational-view"]),
  }),
]);

export const connectionMapNodes = Object.freeze([
  Object.freeze({
    id: "people",
    label: "People",
    detail: "Roles and handoffs",
  }),
  Object.freeze({
    id: "processes",
    label: "Processes",
    detail: "Line, planning, response",
  }),
  Object.freeze({
    id: "systems",
    label: "Systems",
    detail: "ERP, quality, records",
  }),
  Object.freeze({
    id: "data",
    label: "Data",
    detail: "Signals and context",
  }),
  Object.freeze({
    id: "decisions",
    label: "Decisions",
    detail: "Loss, plan, response",
  }),
  Object.freeze({
    id: "outcomes",
    label: "Outcomes",
    detail: "Flow and commitments",
  }),
]);

export const connectionMapRelationships = Object.freeze([
  Object.freeze({
    id: "production-event-context",
    fromId: "data",
    toId: "decisions",
    title: "Production event context",
    baselineDescription:
      "Stop records do not consistently carry the context needed to distinguish recurring loss.",
    connectedDescription:
      "Supervisors can review production loss with the reason, timing, machine state, and shift context together.",
    challengeId: "missing-minutes",
    unlockId: "connected-production-view",
    frictionPointIds: Object.freeze(["incomplete-downtime-context"]),
    mapPath: "M 29 73 C 36 69, 42 69, 46 72",
  }),
  Object.freeze({
    id: "production-quality-context",
    fromId: "processes",
    toId: "data",
    title: "Production + quality evidence",
    baselineDescription:
      "Quality results and production conditions sit in separate records, making causes difficult to trace.",
    connectedDescription:
      "Quality results can be investigated with the production run and material trace that created them.",
    challengeId: "quality-loop",
    unlockId: "production-quality-integration",
    frictionPointIds: Object.freeze(["disconnected-production-quality-records"]),
    mapPath: "M 48 32 C 42 42, 32 55, 24 65",
  }),
  Object.freeze({
    id: "planning-erp-context",
    fromId: "processes",
    toId: "systems",
    title: "Planning + ERP context",
    baselineDescription:
      "Planning updates are copied between workspaces instead of following one shared source.",
    connectedDescription:
      "The standard production and ERP context travels with one planning update into the schedule.",
    challengeId: "spreadsheet-shuffle",
    unlockId: "workflow-automation",
    frictionPointIds: Object.freeze(["duplicated-planning-workflow"]),
    mapPath: "M 61 21 C 65 20, 69 20, 73 21",
  }),
  Object.freeze({
    id: "material-risk-response",
    fromId: "systems",
    toId: "decisions",
    title: "Material risk reaches planning",
    baselineDescription:
      "Supplier arrival changes do not reveal their consequence for production capacity or customer commitments.",
    connectedDescription:
      "Material, schedule, capacity, and customer risk now form one earlier response.",
    challengeId: "delivery-domino",
    unlockId: "logistics-production-visibility",
    frictionPointIds: Object.freeze(["late-material-risk-visibility"]),
    mapPath: "M 77 32 C 69 44, 61 57, 55 66",
  }),
  Object.freeze({
    id: "shared-decision-context",
    fromId: "people",
    toId: "decisions",
    title: "Shared decision context",
    baselineDescription:
      "Teams receive separate reports, so they must rebuild the material, work, and delivery relationship before acting.",
    connectedDescription:
      "Management, production, and planning see one exception with the relevant detail for their role.",
    challengeId: "control-room",
    unlockId: "central-operational-view",
    frictionPointIds: Object.freeze(["unfocused-operational-exception-view"]),
    mapPath: "M 23 32 C 31 44, 39 57, 46 66",
  }),
  Object.freeze({
    id: "decision-to-outcome",
    fromId: "decisions",
    toId: "outcomes",
    title: "Decisions lead to a shared response",
    baselineDescription:
      "A decision is made locally, but its delivery and operating consequences are not visible together.",
    connectedDescription:
      "The shared exception makes the operational response and customer consequence visible before disruption spreads.",
    challengeId: "control-room",
    unlockId: "central-operational-view",
    frictionPointIds: Object.freeze(["unfocused-operational-exception-view"]),
    mapPath: "M 60 73 C 65 71, 70 71, 75 73",
  }),
]);

function createKpiChange(delta, explanation) {
  return Object.freeze({ delta, explanation });
}

function createDecisionEffect(kpiChanges) {
  return Object.freeze({
    kpiChanges: Object.freeze(kpiChanges),
  });
}

export const challengeDecisionEffects = Object.freeze({
  "capture-downtime-context": createDecisionEffect({
    throughput: createKpiChange(3, "Recurring loss can be escalated and addressed sooner."),
    productivity: createKpiChange(2, "Teams spend less time reconstructing what happened."),
    visibility: createKpiChange(24, "Reason, timing, and context are now captured together."),
  }),
  "standardise-downtime-categories": createDecisionEffect({
    throughput: createKpiChange(0, "No immediate change while the breakdown remains unexplained."),
    productivity: createKpiChange(0, "Teams still need to reconstruct the stop manually."),
    visibility: createKpiChange(6, "Labels become more consistent, but the record remains incomplete."),
  }),
  "share-current-event-record": createDecisionEffect({
    throughput: createKpiChange(0, "The unresolved breakdown still constrains output."),
    productivity: createKpiChange(0, "No new evidence reduces manual investigation yet."),
    visibility: createKpiChange(3, "More people can see the same incomplete event record."),
  }),
  "connect-production-quality-data": createDecisionEffect({
    quality: createKpiChange(5, "The team can contain repeat defects sooner using the shared batch trace."),
    visibility: createKpiChange(
      22,
      "Quality results and the production context that created them are available together.",
    ),
    productivity: createKpiChange(3, "Teams spend less time matching separate records before acting."),
  }),
  "standardise-quality-recording": createDecisionEffect({
    quality: createKpiChange(0, "The recurring defect source remains difficult to isolate."),
    visibility: createKpiChange(5, "Quality records are more consistent, but not connected to production."),
    productivity: createKpiChange(0, "Teams still reconcile the production and quality records manually."),
  }),
  "create-quality-dashboard": createDecisionEffect({
    quality: createKpiChange(0, "The quality issue remains difficult to contain at its source."),
    visibility: createKpiChange(3, "The same disconnected defect signal is visible to more people."),
    productivity: createKpiChange(0, "Manual reconciliation is still required before the team can respond."),
  }),
  "automate-connected-schedule-update": createDecisionEffect({
    productivity: createKpiChange(
      12,
      "Less duplicate entry and reconciliation leaves more time for meaningful planning work.",
    ),
    visibility: createKpiChange(15, "Production and ERP context now travel with the planning update."),
    cost: createKpiChange(8, "Fewer repeated checks and attachments reduce avoidable planning effort."),
    delivery: createKpiChange(4, "A more reliable schedule update helps teams see commitments earlier."),
  }),
  "connect-material-and-production-planning": createDecisionEffect({
    delivery: createKpiChange(
      8,
      "Affected commitments are identified early enough to replan the work and customer response.",
    ),
    visibility: createKpiChange(
      3,
      "Material, schedule, capacity, and order risk now share the same exception context.",
    ),
    throughput: createKpiChange(2, "Available work can move forward so the line avoids avoidable waiting."),
  }),
  "add-logistics-delay-report": createDecisionEffect({
    delivery: createKpiChange(0, "The affected customer commitments still receive no earlier warning."),
    visibility: createKpiChange(1, "The logistics signal is easier to read, but it remains isolated."),
    throughput: createKpiChange(0, "The line still waits if the schedule is not informed before the start."),
  }),
  "reserve-line-capacity-manually": createDecisionEffect({
    delivery: createKpiChange(1, "One customer may receive an earlier update, but the full delivery risk remains unclear."),
    visibility: createKpiChange(0, "The information still has to be assembled manually for each incident."),
    throughput: createKpiChange(
      -2,
      "Holding capacity reduces useful output while the root information gap remains.",
    ),
  }),
  "publish-role-relevant-exception-view": createDecisionEffect({
    visibility: createKpiChange(
      1,
      "Cause, work response, and customer impact now share one actionable exception context.",
    ),
    productivity: createKpiChange(2, "Teams no longer assemble the same decision context from separate reports."),
    delivery: createKpiChange(2, "The customer impact is visible early enough to coordinate the response."),
    throughput: createKpiChange(
      1,
      "Production can resequence available work sooner, reducing avoidable waiting.",
    ),
  }),
  "show-every-metric-to-management": createDecisionEffect({
    visibility: createKpiChange(0, "The relevant signals remain difficult to distinguish from routine information."),
    productivity: createKpiChange(0, "People still spend time scanning information that does not affect the decision."),
    delivery: createKpiChange(0, "The customer response is no easier to coordinate."),
  }),
  "send-separate-static-reports": createDecisionEffect({
    visibility: createKpiChange(1, "Each audience receives clearer detail, but the cross-functional exception remains separated."),
    productivity: createKpiChange(0, "Teams still rebuild the relationship between reports before they can act."),
    delivery: createKpiChange(0, "The customer response still depends on a manual comparison of updates."),
  }),
});

export const challengeOutcomes = Object.freeze([
  Object.freeze({
    id: "missing-minutes-outcome",
    challengeId: "missing-minutes",
    decisionId: "capture-downtime-context",
    outcomeTitle: "Northstar's missing minutes now have context.",
    outcomeSummary:
      "The 16-minute breakdown is no longer just 'line stopped'. The team can separate it from planned changeover and trace the conditions around repeated loss.",
    outcomeDetail:
      "This does not remove the breakdown by itself. It gives supervisors enough evidence to target the next preventive improvement.",
    announcement:
      "Downtime context is now captured. Visibility improved and the Connected Production View is available.",
    additionalUnlockIds: Object.freeze(["understand"]),
    remainingWork:
      "Production loss is clearer, but quality evidence still needs its production and material context.",
  }),
  Object.freeze({
    id: "quality-loop-outcome",
    challengeId: "quality-loop",
    decisionId: "connect-production-quality-data",
    outcomeTitle: "Northstar's production and quality records now share context.",
    outcomeSummary:
      "The team can see which production conditions and material trace precede recurring defects, then contain the batch while they investigate it.",
    outcomeDetail:
      "This does not guarantee that defects disappear. It shortens the path from a quality signal to an evidence-based response.",
    announcement:
      "Production and quality now share case context. The defect trace is visible, and Production + Quality Integration is available.",
    additionalUnlockIds: Object.freeze(["connect"]),
    remainingWork:
      "Planning still depends on duplicated updates and manual reconciliation before the schedule can move.",
  }),
  Object.freeze({
    id: "spreadsheet-shuffle-outcome",
    challengeId: "spreadsheet-shuffle",
    decisionId: "automate-connected-schedule-update",
    outcomeTitle: "Northstar's planning automation now supports a clear flow.",
    outcomeSummary:
      "The planner works from one standard update. Relevant production and ERP context travels with the schedule change instead of being copied between files.",
    outcomeDetail:
      "This illustrative change reduces repetitive checking and gives the planning team a more reliable view of the current schedule. It does not replace judgement about exceptions.",
    announcement:
      "The standard planning update now carries connected context into the schedule. Workflow Automation is available.",
    additionalUnlockIds: Object.freeze(["simplify", "standardise", "automate"]),
    remainingWork:
      "Material risk still needs to reach the schedule before it disrupts customer commitments.",
  }),
  Object.freeze({
    id: "delivery-domino-outcome",
    challengeId: "delivery-domino",
    decisionId: "connect-material-and-production-planning",
    outcomeTitle: "Northstar can now act on material risk before it spreads.",
    outcomeSummary:
      "The supplier delay was visible in logistics, but its effect on production and customer orders was not. One connected view gives planning and delivery teams time to respond together.",
    outcomeDetail:
      "The material still arrives late. The team can now resequence available work, protect the remaining capacity, and give one affected customer a timely update instead of discovering the issue at dispatch.",
    announcement:
      "Material risk now reaches planning and delivery before it disrupts the schedule. Logistics + Production Visibility is available.",
    additionalUnlockIds: Object.freeze([]),
    remainingWork:
      "The same exception still needs to reach each role with focused decision context.",
  }),
  Object.freeze({
    id: "control-room-outcome",
    challengeId: "control-room",
    decisionId: "publish-role-relevant-exception-view",
    outcomeTitle: "Northstar's exception now reaches the right people with context to act.",
    outcomeSummary:
      "Management can see the customer effect, production can resequence available work, and planning can coordinate the material arrival and capacity buffer from one shared view.",
    outcomeDetail:
      "Quality and maintenance retain their relevant operating detail without receiving an unnecessary priority alert. The view is focused on the decision, not on displaying every available measure.",
    announcement:
      "The shared exception now reaches management, production, and planning in the context each needs. Central Operational View is available.",
    additionalUnlockIds: Object.freeze(["measure"]),
    remainingWork:
      "The shared view makes the next bottleneck easier to investigate; it does not remove every source of friction.",
  }),
]);

export const diagnosticBands = Object.freeze([
  Object.freeze({ id: "strong", minimum: 75, label: "Strong" }),
  Object.freeze({ id: "established", minimum: 50, label: "Established" }),
  Object.freeze({ id: "developing", minimum: 0, label: "Developing" }),
]);

export const diagnosticProfileBands = Object.freeze([
  Object.freeze({
    minimum: 75,
    label: "Connected and improving",
    description:
      "Northstar has stronger shared context and can use it to identify the next operational improvement.",
  }),
  Object.freeze({
    minimum: 50,
    label: "Building connected capability",
    description:
      "Northstar has made useful connections, but important handoffs still need a clearer, more consistent response.",
  }),
  Object.freeze({
    minimum: 0,
    label: "Fragmented but visible",
    description:
      "Northstar can see the signals, but needs to connect the people, process, and information behind them.",
  }),
]);

export const diagnosticDimensions = Object.freeze([
  Object.freeze({
    id: "visibility",
    label: "Visibility",
    description: "How clearly teams can see the signal, context, and current operating condition.",
    scoring: Object.freeze({
      base: 0,
      kpiWeights: Object.freeze({ visibility: 0.55 }),
      outcomePoints: Object.freeze({
        "missing-minutes-outcome": 3,
        "quality-loop-outcome": 5,
        "control-room-outcome": 4,
      }),
      capabilityPoints: Object.freeze({
        "connected-production-view": 2,
        "production-quality-integration": 2,
        "central-operational-view": 4,
      }),
      connectionPoints: Object.freeze({
        "production-event-context": 2,
        "production-quality-context": 2,
        "shared-decision-context": 2,
        "decision-to-outcome": 2,
      }),
      operationalScoreWeight: 0,
    }),
    interpretations: Object.freeze({
      strong:
        "The right people can see operational signals with the context needed to investigate them.",
      established:
        "Some useful context is visible, but teams still need to compare information before acting.",
      developing:
        "The operation has signals, but they are not yet consistently useful to the people making decisions.",
    }),
    remainingFriction:
      "Keep checking whether the next signal reaches the people who need to act on it.",
    recommendation:
      "Use the shared operational view to make the next recurring loss or exception visible earlier.",
  }),
  Object.freeze({
    id: "process-efficiency",
    label: "Process efficiency",
    description: "How reliably work moves without unnecessary duplication, waiting, or rework.",
    scoring: Object.freeze({
      base: 8,
      kpiWeights: Object.freeze({
        productivity: 0.26,
        throughput: 0.14,
        cost: 0.1,
      }),
      outcomePoints: Object.freeze({
        "missing-minutes-outcome": 3,
        "spreadsheet-shuffle-outcome": 10,
        "delivery-domino-outcome": 4,
      }),
      capabilityPoints: Object.freeze({
        simplify: 4,
        standardise: 5,
        automate: 6,
        "workflow-automation": 5,
      }),
      connectionPoints: Object.freeze({
        "planning-erp-context": 4,
        "material-risk-response": 3,
      }),
      operationalScoreWeight: 0,
    }),
    interpretations: Object.freeze({
      strong:
        "The planning and response flow is more consistent, with less repeated work around the decision.",
      established:
        "Some avoidable work has been removed, but the next handoff or delay should be investigated.",
      developing:
        "The operation still loses time to duplicated work, unclear handoffs, or delayed response.",
    }),
    remainingFriction:
      "The next opportunity is to find the remaining duplicated handoff or avoidable delay before automating further.",
    recommendation:
      "Use the connected view to trace the next repeated handoff, then simplify and standardise it before adding more automation.",
  }),
  Object.freeze({
    id: "data-connection",
    label: "Data connection",
    description: "How well production, quality, planning, and logistics context can be used together.",
    scoring: Object.freeze({
      base: 5,
      kpiWeights: Object.freeze({ visibility: 0.08 }),
      outcomePoints: Object.freeze({
        "quality-loop-outcome": 7,
        "spreadsheet-shuffle-outcome": 6,
        "delivery-domino-outcome": 4,
        "control-room-outcome": 2,
      }),
      capabilityPoints: Object.freeze({
        connect: 2,
        "production-quality-integration": 5,
        "workflow-automation": 5,
        "logistics-production-visibility": 4,
        "central-operational-view": 3,
      }),
      connectionPoints: Object.freeze({
        "production-quality-context": 5,
        "planning-erp-context": 4,
        "material-risk-response": 4,
        "shared-decision-context": 2,
        "decision-to-outcome": 2,
      }),
      operationalScoreWeight: 0,
    }),
    interpretations: Object.freeze({
      strong:
        "Relevant records now travel together, so teams can investigate conditions and consequences in context.",
      established:
        "Some important records are connected, but a useful decision still depends on manual comparison.",
      developing:
        "Data exists in separate places and does not yet give teams enough shared context to act.",
    }),
    remainingFriction:
      "New connections should be judged by whether they make a real decision easier, not by how much data is available.",
    recommendation:
      "Use the connected records to identify the next information gap that still delays an evidence-based decision.",
  }),
  Object.freeze({
    id: "operational-responsiveness",
    label: "Operational responsiveness",
    description: "How early teams can see a disruption, coordinate a response, and protect commitments.",
    scoring: Object.freeze({
      base: 8,
      kpiWeights: Object.freeze({
        delivery: 0.22,
        throughput: 0.13,
        visibility: 0.06,
      }),
      outcomePoints: Object.freeze({
        "delivery-domino-outcome": 12,
        "control-room-outcome": 7,
      }),
      capabilityPoints: Object.freeze({
        "logistics-production-visibility": 6,
        "central-operational-view": 6,
      }),
      connectionPoints: Object.freeze({
        "material-risk-response": 5,
        "shared-decision-context": 4,
        "decision-to-outcome": 3,
      }),
      operationalScoreWeight: 0,
    }),
    interpretations: Object.freeze({
      strong:
        "Material, capacity, and customer context can reach the people coordinating the response sooner.",
      established:
        "The operation can respond to some exceptions earlier, but the response still depends on clear ownership.",
      developing:
        "Disruptions reach planning, production, or delivery too late for teams to protect the best response.",
    }),
    remainingFriction:
      "Keep testing whether an exception reaches the right role before it affects work or customer commitments.",
    recommendation:
      "Review the next exception path from signal to response and remove the delay that prevents earlier coordination.",
  }),
  Object.freeze({
    id: "automation-readiness",
    label: "Automation readiness",
    description: "Whether the work is simple and consistent enough for automation to add practical value.",
    scoring: Object.freeze({
      base: 5,
      kpiWeights: Object.freeze({
        productivity: 0.1,
        visibility: 0.07,
      }),
      outcomePoints: Object.freeze({
        "spreadsheet-shuffle-outcome": 18,
      }),
      capabilityPoints: Object.freeze({
        simplify: 8,
        standardise: 12,
        automate: 14,
        "workflow-automation": 8,
      }),
      connectionPoints: Object.freeze({
        "planning-erp-context": 6,
      }),
      operationalScoreWeight: 0,
    }),
    interpretations: Object.freeze({
      strong:
        "A standard, source-led workflow is ready for focused automation where it removes repetitive work.",
      established:
        "Some work is ready to automate, but the process and information route need one more consistency check.",
      developing:
        "Automation would risk speeding up a workaround before the work and information route are clear.",
    }),
    remainingFriction:
      "Automation should remain focused on repetitive, standard work rather than adding technology around a workaround.",
    recommendation:
      "Use a short process review to confirm the next repetitive task has one clear owner, source, and standard route before automating it.",
  }),
  Object.freeze({
    id: "improvement-potential",
    label: "Improvement potential",
    description: "How ready the operation is to use better context to find and prioritise its next bottleneck.",
    scoring: Object.freeze({
      base: 10,
      kpiWeights: Object.freeze({}),
      outcomePoints: Object.freeze({
        "missing-minutes-outcome": 3,
        "quality-loop-outcome": 3,
        "spreadsheet-shuffle-outcome": 3,
        "delivery-domino-outcome": 3,
        "control-room-outcome": 3,
      }),
      capabilityPoints: Object.freeze({
        understand: 3,
        connect: 3,
        measure: 8,
        "central-operational-view": 8,
      }),
      connectionPoints: Object.freeze({
        "shared-decision-context": 4,
        "decision-to-outcome": 3,
      }),
      operationalScoreWeight: 0.2,
    }),
    interpretations: Object.freeze({
      strong:
        "Northstar can use connected evidence and a shared view to identify the next valuable improvement.",
      established:
        "Northstar has a useful foundation for the next improvement, but still needs to prioritise the best first move.",
      developing:
        "The next improvement is difficult to prioritise because the operation does not yet share enough useful context.",
    }),
    remainingFriction:
      "The next bottleneck still needs to be identified and prioritised from the shared operational context.",
    recommendation:
      "Compare the remaining improvement opportunities by impact, effort, risk, and readiness before choosing the next first step.",
  }),
]);

export const opportunities = Object.freeze([
  Object.freeze({
    id: "standardise-downtime-response",
    title: "Standardise the recurring downtime response",
    description:
      "Use the new line-event context to agree who reviews a repeated loss, when they act, and how the response is recorded.",
    frictionPointIds: Object.freeze(["incomplete-downtime-context"]),
    relatedCapabilityIds: Object.freeze(["connected-production-view"]),
    requiredCapabilityIds: Object.freeze(["connected-production-view"]),
    diagnosticDimensionId: "process-efficiency",
    impact: "Medium",
    effort: "Low",
    timeToValue: "2-4 weeks",
    operationalRisk: "Low",
    dependencies:
      "A shared downtime record and agreement on the shift-level response.",
    whyFirst:
      "It turns a visible loss pattern into a repeatable way of working before more technology is added.",
    enables:
      "A targeted maintenance review and a clearer case for reducing the largest recurring loss.",
    tradeOff:
      "It improves consistency, but the team must still investigate and remove the underlying equipment or material cause.",
    recommendation:
      "Run a short shift-level process review to agree one response for recurring downtime and the evidence it needs.",
  }),
  Object.freeze({
    id: "quality-containment-workflow",
    title: "Create a shared quality containment workflow",
    description:
      "Use the connected production and quality record to standardise how a repeat defect is contained, investigated, and shared with the supplier.",
    frictionPointIds: Object.freeze(["disconnected-production-quality-records"]),
    relatedCapabilityIds: Object.freeze(["production-quality-integration"]),
    requiredCapabilityIds: Object.freeze(["production-quality-integration"]),
    diagnosticDimensionId: "data-connection",
    impact: "High",
    effort: "Medium",
    timeToValue: "4-6 weeks",
    operationalRisk: "Medium",
    dependencies:
      "Reliable production, material, and quality context plus one agreed containment owner.",
    whyFirst:
      "The connected record can now shorten the path from a defect signal to a coordinated containment decision.",
    enables:
      "Faster supplier investigation, clearer quality escalation, and stronger evidence for the next process improvement.",
    tradeOff:
      "It needs disciplined data capture and cross-functional ownership; another dashboard alone would not create the response.",
    recommendation:
      "Use the shared production and quality context to define one containment workflow for repeat defects and supplier follow-up.",
  }),
  Object.freeze({
    id: "material-exception-playbook",
    title: "Standardise the material exception playbook",
    description:
      "Define the response from late supplier confirmation through to production resequencing and customer communication.",
    frictionPointIds: Object.freeze(["late-material-risk-visibility"]),
    relatedCapabilityIds: Object.freeze(["logistics-production-visibility"]),
    requiredCapabilityIds: Object.freeze(["logistics-production-visibility"]),
    diagnosticDimensionId: "operational-responsiveness",
    impact: "High",
    effort: "Medium",
    timeToValue: "3-5 weeks",
    operationalRisk: "Medium",
    dependencies:
      "Shared material, schedule, capacity, and customer exception context.",
    whyFirst:
      "It uses the new early-warning view to protect the response before a supplier delay becomes a delivery failure.",
    enables:
      "Clearer escalation, faster resequencing, and earlier customer communication when a material risk appears.",
    tradeOff:
      "It does not remove supplier delays; the teams still need clear ownership and realistic capacity decisions.",
    recommendation:
      "Map the next material exception from supplier confirmation to customer response, then agree the few decisions that need to happen earlier.",
  }),
  Object.freeze({
    id: "standardise-exception-ownership",
    title: "Set clear ownership for shared exceptions",
    description:
      "Agree which role owns the next action when an operational exception affects production, planning, and delivery.",
    frictionPointIds: Object.freeze(["unfocused-operational-exception-view"]),
    relatedCapabilityIds: Object.freeze(["central-operational-view"]),
    requiredCapabilityIds: Object.freeze(["central-operational-view"]),
    diagnosticDimensionId: "operational-responsiveness",
    impact: "Medium",
    effort: "Low",
    timeToValue: "1-2 weeks",
    operationalRisk: "Low",
    dependencies:
      "One shared exception view and agreement between management, production, and planning.",
    whyFirst:
      "It makes the newly shared information actionable without asking every role to monitor every signal.",
    enables:
      "Faster decisions, role-relevant communication, and a clearer operating rhythm for future exceptions.",
    tradeOff:
      "It needs cross-functional agreement and regular review; assigning an owner does not replace the work of resolving the cause.",
    recommendation:
      "Use the shared exception view in a short operating review to agree who owns the next action, escalation, and customer response.",
  }),
  Object.freeze({
    id: "automate-planning-exception-triage",
    title: "Automate planning exception triage",
    description:
      "Use the standard planning flow to route a repeatable, well-defined exception to the right planning response.",
    frictionPointIds: Object.freeze(["duplicated-planning-workflow"]),
    relatedCapabilityIds: Object.freeze(["workflow-automation", "central-operational-view"]),
    requiredCapabilityIds: Object.freeze([
      "workflow-automation",
      "central-operational-view",
    ]),
    diagnosticDimensionId: "automation-readiness",
    impact: "Medium",
    effort: "Medium",
    timeToValue: "4-6 weeks",
    operationalRisk: "Medium",
    dependencies:
      "A standard planning route, clear exception ownership, and reliable shared source context.",
    whyFirst:
      "It can remove repetitive triage work once the process and the decision owner are genuinely clear.",
    enables:
      "A focused automation sprint around one repeatable planning exception rather than another spreadsheet workaround.",
    tradeOff:
      "Automation is premature if ownership or exception rules remain unclear, so the process must stay visible and reviewable.",
    recommendation:
      "Identify one repeatable planning exception, confirm its owner and standard response, then automate only the repetitive triage step.",
  }),
]);

export const operatingModelChanges = Object.freeze([
  Object.freeze({
    id: "contextual-production-loss",
    label: "Production loss",
    outcomeId: "missing-minutes-outcome",
    before:
      "Supervisors reconstruct lost time from incomplete stop records after the line has already fallen behind.",
    after:
      "Production loss carries reason, timing, machine, and shift context so recurring loss can be reviewed sooner.",
    kpiIds: Object.freeze(["throughput", "productivity", "visibility"]),
  }),
  Object.freeze({
    id: "connected-quality-investigation",
    label: "Quality investigation",
    outcomeId: "quality-loop-outcome",
    before:
      "Quality, production, and material records must be compared manually before a repeat defect can be contained.",
    after:
      "Quality results can be investigated with the production run and material trace that created them.",
    kpiIds: Object.freeze(["quality", "visibility", "productivity"]),
  }),
  Object.freeze({
    id: "source-led-planning-flow",
    label: "Planning flow",
    outcomeId: "spreadsheet-shuffle-outcome",
    before:
      "Production updates are copied into spreadsheets, reconciled, and emailed before the schedule can move.",
    after:
      "One standard, source-led planning update carries the right context into the schedule and handoff.",
    kpiIds: Object.freeze(["productivity", "visibility", "cost", "delivery"]),
  }),
  Object.freeze({
    id: "early-material-response",
    label: "Material exception",
    outcomeId: "delivery-domino-outcome",
    before:
      "A material delay reaches planning and customers only after available capacity is already constrained.",
    after:
      "Material, schedule, capacity, and customer risk form one earlier exception that teams can coordinate.",
    kpiIds: Object.freeze(["delivery", "visibility", "throughput"]),
  }),
  Object.freeze({
    id: "role-relevant-exception-view",
    label: "Shared response",
    outcomeId: "control-room-outcome",
    before:
      "Teams work from separate reports, so the cause, work response, and customer consequence are not held together.",
    after:
      "Management, production, and planning receive one shared exception with the detail each role needs to act.",
    kpiIds: Object.freeze(["visibility", "productivity", "delivery", "throughput"]),
  }),
]);

export const operatingModelFlow = Object.freeze({
  before: Object.freeze([
    Object.freeze({
      id: "scattered-information",
      label: "Information scattered",
      detail: "Records sit across line events, quality, planning, and supplier updates.",
    }),
    Object.freeze({
      id: "manual-reconciliation",
      label: "Manual reconciliation",
      detail: "People compare copies and handoffs before they can act.",
    }),
    Object.freeze({
      id: "late-decisions",
      label: "Late decisions",
      detail: "The operational consequence becomes clear after it has affected the work.",
    }),
    Object.freeze({
      id: "operational-disruption",
      label: "Operational disruption",
      detail: "Capacity and customer commitments carry the avoidable impact.",
    }),
  ]),
  after: Object.freeze([
    Object.freeze({
      id: "connected-information",
      label: "Connected information",
      detail: "Relevant production, quality, planning, and logistics context travels together.",
      requiredOutcomeIds: Object.freeze([
        "quality-loop-outcome",
        "spreadsheet-shuffle-outcome",
        "delivery-domino-outcome",
      ]),
    }),
    Object.freeze({
      id: "clearer-visibility",
      label: "Clearer visibility",
      detail: "Losses and exceptions have the context needed for investigation.",
      requiredOutcomeIds: Object.freeze([
        "missing-minutes-outcome",
        "control-room-outcome",
      ]),
    }),
    Object.freeze({
      id: "earlier-decisions",
      label: "Earlier decisions",
      detail: "The right roles can coordinate a response before disruption spreads.",
      requiredOutcomeIds: Object.freeze([
        "delivery-domino-outcome",
        "control-room-outcome",
      ]),
    }),
    Object.freeze({
      id: "more-controlled-operation",
      label: "More controlled operation",
      detail: "The operation can measure outcomes and identify the next bottleneck.",
      requiredOutcomeIds: Object.freeze(["control-room-outcome"]),
    }),
  ]),
});

export const trionWebsiteUrl = "https://www.trion-transformation.com/";

export const trionFrameworks = Object.freeze({
  "site-walks": Object.freeze({
    title: "Site Walks",
    description: "See the work, handoffs, and friction where they happen.",
  }),
  "maturity-scorecard": Object.freeze({
    title: "Digital & Operational Maturity Scorecard",
    description: "Create a practical reading of current strengths, gaps, and readiness.",
  }),
  "digital-landscape-map": Object.freeze({
    title: "Digital Landscape Map",
    description: "Map the systems, information, and dependencies around the operation.",
  }),
  "opportunity-action-register": Object.freeze({
    title: "Opportunity & Action Register",
    description: "Turn visible friction into practical, prioritised next actions.",
  }),
  "transformation-roadmap": Object.freeze({
    title: "Transformation Roadmap",
    description: "Sequence the next improvements around value, readiness, and risk.",
  }),
  "quick-win-automation-sprints": Object.freeze({
    title: "Quick Win Automation Sprints",
    description: "Apply focused automation to repeatable, well-understood work.",
  }),
  "operational-intelligence": Object.freeze({
    title: "Operational intelligence and reporting",
    description: "Measure the signals and outcomes that guide the next decision.",
  }),
});

export const trionApproachSteps = Object.freeze([
  Object.freeze({
    id: "understand",
    title: "Understand",
    description: "Map the current operation and identify the friction behind the visible signal.",
    frameworkIds: Object.freeze(["site-walks", "digital-landscape-map"]),
  }),
  Object.freeze({
    id: "simplify",
    title: "Simplify",
    description: "Remove duplicated steps and handoffs that do not improve the decision.",
    frameworkIds: Object.freeze(["opportunity-action-register"]),
  }),
  Object.freeze({
    id: "standardise",
    title: "Standardise",
    description: "Agree consistent definitions, ownership, and ways of working before scaling change.",
    frameworkIds: Object.freeze(["maturity-scorecard", "opportunity-action-register"]),
  }),
  Object.freeze({
    id: "connect",
    title: "Connect",
    description: "Bring the relevant systems, data, tools, and people together around the next decision.",
    frameworkIds: Object.freeze(["digital-landscape-map", "operational-intelligence"]),
  }),
  Object.freeze({
    id: "automate",
    title: "Automate",
    description: "Remove repetitive work where the process, source, and owner are already clear.",
    frameworkIds: Object.freeze(["quick-win-automation-sprints"]),
  }),
  Object.freeze({
    id: "measure",
    title: "Measure",
    description: "Track the outcome, learn from it, and prioritise the next improvement.",
    frameworkIds: Object.freeze(["operational-intelligence", "transformation-roadmap"]),
  }),
]);

export const trionFabricStatement = Object.freeze({
  title: "The principles behind Fabric",
  description:
    "Fabric brings useful relationships between processes, data, tools, systems, and people into a shared operational view.",
  boundary:
    "This illustrative experience is not connected to a live factory, visitor data, or real-time production systems.",
});

export const trionCtaRecommendations = Object.freeze([
  Object.freeze({
    id: "downtime-site-walk",
    opportunityIds: Object.freeze(["standardise-downtime-response"]),
    diagnosticDimensionIds: Object.freeze(["process-efficiency"]),
    title: "Start with the work where the loss appears.",
    description:
      "A focused walkthrough can map the recurring downtime response with the people who record, investigate, and act on it.",
    label: "Explore a shop-floor walkthrough",
  }),
  Object.freeze({
    id: "quality-information-map",
    opportunityIds: Object.freeze(["quality-containment-workflow"]),
    diagnosticDimensionIds: Object.freeze(["data-connection"]),
    title: "Map the information that should travel with the quality signal.",
    description:
      "A practical landscape map can show where production, material, and quality context still needs to meet the containment decision.",
    label: "Explore a Digital Landscape Map",
  }),
  Object.freeze({
    id: "material-response-review",
    opportunityIds: Object.freeze(["material-exception-playbook"]),
    diagnosticDimensionIds: Object.freeze(["operational-responsiveness"]),
    title: "Make the next material exception easier to coordinate.",
    description:
      "A short operational review can define the decisions, owners, and information needed before a late delivery disrupts the work.",
    label: "Discuss an operational challenge",
  }),
  Object.freeze({
    id: "exception-ownership-roadmap",
    opportunityIds: Object.freeze(["standardise-exception-ownership"]),
    diagnosticDimensionIds: Object.freeze(["operational-responsiveness"]),
    title: "Turn shared information into a clearer operating rhythm.",
    description:
      "A roadmap can sequence the ownership, escalation, and review habits that make a shared exception view useful in practice.",
    label: "Explore the Transformation Roadmap",
  }),
  Object.freeze({
    id: "planning-automation-sprint",
    opportunityIds: Object.freeze(["automate-planning-exception-triage"]),
    diagnosticDimensionIds: Object.freeze(["automation-readiness"]),
    title: "Focus automation on one repeatable planning decision.",
    description:
      "A focused automation sprint can test where a clear process and shared source context can remove repetitive triage work.",
    label: "Explore Quick Win Automation Sprints",
  }),
  Object.freeze({
    id: "improvement-roadmap",
    opportunityIds: Object.freeze([]),
    diagnosticDimensionIds: Object.freeze(["improvement-potential", "visibility"]),
    title: "Map the current operation and choose the next practical improvement.",
    description:
      "A structured diagnostic can connect the visible friction, current readiness, and next actions without assuming a system replacement is the answer.",
    label: "Explore Trion's approach",
  }),
]);

export function getOperationalAreaById(areaId) {
  return operationalAreas.find((area) => area.id === areaId);
}

export function getFrictionPointById(frictionPointId) {
  return frictionPoints.find((frictionPoint) => frictionPoint.id === frictionPointId);
}

export function getConnectionMapRelationshipById(relationshipId) {
  return connectionMapRelationships.find((relationship) => relationship.id === relationshipId);
}

export function getChallengeDecisionEffect(decisionId) {
  return challengeDecisionEffects[decisionId] ?? null;
}

export function getChallengeOutcomeById(outcomeId) {
  return challengeOutcomes.find((outcome) => outcome.id === outcomeId);
}

export function getChallengeOutcomeByDecisionId(challengeId, decisionId) {
  return challengeOutcomes.find(
    (outcome) => outcome.challengeId === challengeId && outcome.decisionId === decisionId,
  );
}

export function getDiagnosticDimensionById(dimensionId) {
  return diagnosticDimensions.find((dimension) => dimension.id === dimensionId);
}

export function getOpportunityById(opportunityId) {
  return opportunities.find((opportunity) => opportunity.id === opportunityId);
}

export function getOpportunityAvailability(opportunity, state) {
  if (!opportunity || !Array.isArray(opportunity.requiredCapabilityIds)) {
    throw new TypeError("Opportunity availability requires a valid opportunity.");
  }

  const unlockedUpgradeIds = getUnlockedUpgrades(state);
  const missingCapabilityIds = opportunity.requiredCapabilityIds.filter(
    (capabilityId) => !unlockedUpgradeIds.has(capabilityId),
  );

  return {
    available: missingCapabilityIds.length === 0,
    missingCapabilityIds,
  };
}

export function getChallengeDecisionDetails(challengeId, decisionId) {
  const decisionEffect = getChallengeDecisionEffect(decisionId);
  const outcome = getChallengeOutcomeByDecisionId(challengeId, decisionId);

  if (outcome && !decisionEffect) {
    throw new Error(`Completion decision ${decisionId} is missing its KPI effect.`);
  }

  return Object.freeze({
    ...(decisionEffect ? { kpiChanges: decisionEffect.kpiChanges } : {}),
    ...(outcome
      ? {
          outcomeId: outcome.id,
          outcomeTitle: outcome.outcomeTitle,
          outcomeSummary: outcome.outcomeSummary,
          outcomeDetail: outcome.outcomeDetail,
          announcement: outcome.announcement,
        }
      : {}),
  });
}

function getUnlockedUpgrades(state) {
  if (!state || !Array.isArray(state.unlockedUpgrades)) {
    throw new TypeError("Operation status requires state with unlocked upgrades.");
  }

  return new Set(state.unlockedUpgrades);
}

export function getOperationSnapshot(state) {
  const unlockedUpgradeIds = getUnlockedUpgrades(state);
  const resolvedFrictionPoints = frictionPoints.map((frictionPoint) => {
    const isAddressed = frictionPoint.resolutionCapabilityIds.every((capabilityId) =>
      unlockedUpgradeIds.has(capabilityId),
    );

    return {
      ...frictionPoint,
      status: isAddressed ? "addressed" : "open",
      statusLabel: isAddressed ? "Addressed in this scenario" : "Needs attention",
      statusDescription: isAddressed
        ? frictionPoint.resolvedDescription
        : frictionPoint.description,
    };
  });
  const resolvedConnections = connectionMapRelationships.map((relationship) => {
    const isConnected = unlockedUpgradeIds.has(relationship.unlockId);

    return {
      ...relationship,
      status: isConnected ? "connected" : "fragmented",
      statusLabel: isConnected ? "Connected" : "Not yet connected",
      statusDescription: isConnected
        ? relationship.connectedDescription
        : relationship.baselineDescription,
    };
  });
  const connectedRelationshipCount = resolvedConnections.filter(
    (relationship) => relationship.status === "connected",
  ).length;

  return {
    frictionPoints: resolvedFrictionPoints,
    connections: resolvedConnections,
    connectedRelationshipCount,
    totalRelationshipCount: resolvedConnections.length,
    nextConnection: resolvedConnections.find(
      (relationship) => relationship.status === "fragmented",
    ),
  };
}
