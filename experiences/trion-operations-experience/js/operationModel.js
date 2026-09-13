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
