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

export const challengeOperationLinks = Object.freeze([
  Object.freeze({
    challengeId: "missing-minutes",
    frictionPointIds: Object.freeze(["incomplete-downtime-context"]),
    connectionIds: Object.freeze(["production-event-context"]),
    capabilityId: "connected-production-view",
  }),
  Object.freeze({
    challengeId: "quality-loop",
    frictionPointIds: Object.freeze(["disconnected-production-quality-records"]),
    connectionIds: Object.freeze(["production-quality-context"]),
    capabilityId: "production-quality-integration",
  }),
  Object.freeze({
    challengeId: "spreadsheet-shuffle",
    frictionPointIds: Object.freeze(["duplicated-planning-workflow"]),
    connectionIds: Object.freeze(["planning-erp-context"]),
    capabilityId: "workflow-automation",
  }),
  Object.freeze({
    challengeId: "delivery-domino",
    frictionPointIds: Object.freeze(["late-material-risk-visibility"]),
    connectionIds: Object.freeze(["material-risk-response"]),
    capabilityId: "logistics-production-visibility",
  }),
  Object.freeze({
    challengeId: "control-room",
    frictionPointIds: Object.freeze(["unfocused-operational-exception-view"]),
    connectionIds: Object.freeze([
      "shared-decision-context",
      "decision-to-outcome",
    ]),
    capabilityId: "central-operational-view",
  }),
]);

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
