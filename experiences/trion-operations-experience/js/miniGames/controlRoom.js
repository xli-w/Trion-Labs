export const controlRoomChallengeId = "control-room";

export const controlRoomSignalSelectionLimit = 4;
export const controlRoomRequiredSignalIds = Object.freeze([
  "throughput",
  "material-availability",
  "production-schedule",
  "delivery",
]);

export const controlRoomSignals = Object.freeze([
  Object.freeze({
    id: "throughput",
    label: "Throughput",
    category: "Performance signal",
    status: "Line 02 is at 82% of plan",
    detail: "Shows the work is behind the day plan and needs a coordinated response.",
    decisionContext: "Shows the current work effect",
  }),
  Object.freeze({
    id: "quality",
    label: "Quality",
    category: "Performance signal",
    status: "94% first-time-right",
    detail: "Useful for the quality team, but no new quality trend is affecting this exception.",
    decisionContext: "Routine quality context",
  }),
  Object.freeze({
    id: "delivery",
    label: "Delivery",
    category: "Customer impact",
    status: "2 commitments at risk",
    detail: "Shows which customer promises need a decision before dispatch is affected.",
    decisionContext: "Shows the customer effect",
  }),
  Object.freeze({
    id: "downtime",
    label: "Downtime",
    category: "Loss analysis",
    status: "31 min recorded yesterday",
    detail: "Useful investigation detail, but it does not explain the current material exception.",
    decisionContext: "Historical loss detail",
  }),
  Object.freeze({
    id: "machine-status",
    label: "Machine status",
    category: "Equipment context",
    status: "Line 02 is available",
    detail: "Maintenance can view the condition separately; no active equipment alert is driving this issue.",
    decisionContext: "No active machine condition",
  }),
  Object.freeze({
    id: "material-availability",
    label: "Material availability",
    category: "Supply exception",
    status: "Coil 18 is 75 min late",
    detail: "Explains the upstream constraint that is now changing the work available to the line.",
    decisionContext: "Shows the exception cause",
  }),
  Object.freeze({
    id: "open-quality-issues",
    label: "Open quality issues",
    category: "Quality context",
    status: "1 routine hold",
    detail: "Needs quality follow-up, but it does not alter the material response for Line 02.",
    decisionContext: "Separate quality follow-up",
  }),
  Object.freeze({
    id: "production-schedule",
    label: "Production schedule",
    category: "Work context",
    status: "33 min buffer remains",
    detail: "Shows the jobs and remaining capacity that can be resequenced before the line waits.",
    decisionContext: "Shows the work response",
  }),
  Object.freeze({
    id: "maintenance-alerts",
    label: "Maintenance alerts",
    category: "Equipment context",
    status: "No critical alert",
    detail: "The maintenance team needs this in its own view, not as a priority for this exception.",
    decisionContext: "No immediate maintenance action",
  }),
  Object.freeze({
    id: "cost-indicators",
    label: "Cost indicators",
    category: "Management context",
    status: "Monthly variance remains",
    detail: "Important for review, but too delayed to guide the current capacity and delivery decision.",
    decisionContext: "Longer-term review context",
  }),
]);

export const controlRoomAudiencePriorityLimit = 3;
export const controlRoomRequiredAudienceIds = Object.freeze([
  "management",
  "production",
  "planning",
]);

export const controlRoomAudiences = Object.freeze([
  Object.freeze({
    id: "management",
    label: "Management",
    focus: "Customer and operating impact",
    detail: "Decide whether the commitments need a protected customer response.",
    signalIds: Object.freeze(["delivery", "throughput"]),
  }),
  Object.freeze({
    id: "production",
    label: "Production",
    focus: "Available work and line response",
    detail: "Resequence the work that can run while the material arrival is confirmed.",
    signalIds: Object.freeze(["throughput", "production-schedule"]),
  }),
  Object.freeze({
    id: "quality",
    label: "Quality",
    focus: "Quality conditions and open holds",
    detail: "Continue routine follow-up; no quality condition is changing this exception.",
    signalIds: Object.freeze(["quality", "open-quality-issues"]),
  }),
  Object.freeze({
    id: "planning",
    label: "Planning",
    focus: "Material arrival and capacity buffer",
    detail: "Coordinate the supplier arrival with the remaining schedule buffer.",
    signalIds: Object.freeze(["material-availability", "production-schedule"]),
  }),
  Object.freeze({
    id: "maintenance",
    label: "Maintenance",
    focus: "Equipment condition",
    detail: "Monitor the line separately; there is no active maintenance alert to escalate.",
    signalIds: Object.freeze(["machine-status", "maintenance-alerts"]),
  }),
]);

export const controlRoomDecisions = Object.freeze([
  Object.freeze({
    id: "publish-role-relevant-exception-view",
    title: "Publish one shared exception view, filtered by role",
    description:
      "Keep the material cause, work response, and customer impact together, then show each team the part they need to act on.",
    effectLabel: "Creates shared context without asking every role to scan every measure.",
    completesChallenge: true,
    outcomeTitle: "The exception now reaches the right people with the context to act.",
    outcomeSummary:
      "Management can see the customer effect, production can resequence available work, and planning can coordinate the material arrival and capacity buffer from one shared view.",
    outcomeDetail:
      "Quality and maintenance retain their relevant operating detail without receiving an unnecessary priority alert. The view is focused on the decision, not on displaying every available measure.",
    kpiChanges: Object.freeze({
      visibility: Object.freeze({
        delta: 1,
        explanation: "Cause, work response, and customer impact now share one actionable exception context.",
      }),
      productivity: Object.freeze({
        delta: 2,
        explanation: "Teams no longer assemble the same decision context from separate reports.",
      }),
      delivery: Object.freeze({
        delta: 2,
        explanation: "The customer impact is visible early enough to coordinate the response.",
      }),
    }),
    additionalUnlockIds: Object.freeze(["measure"]),
    announcement:
      "The shared exception now reaches management, production, and planning in the context each needs. Central Operational View is available.",
  }),
  Object.freeze({
    id: "show-every-metric-to-management",
    title: "Show every available metric to management",
    description:
      "Put all ten measures, alerts, and detailed status records on one management page.",
    effectLabel: "Adds context, but makes the immediate decision harder to find.",
    completesChallenge: false,
    outcomeTitle: "More information has made the exception harder to read.",
    outcomeSummary:
      "The material delay, remaining capacity, and customer effect are still present, but they now compete with routine quality, maintenance, and monthly cost information.",
    outcomeDetail:
      "Keep the essential cause, work response, and customer impact together. Other roles still need detail, but not every detail belongs in the same priority view.",
    kpiChanges: Object.freeze({
      visibility: Object.freeze({
        delta: 0,
        explanation: "The relevant signals remain difficult to distinguish from routine information.",
      }),
      productivity: Object.freeze({
        delta: 0,
        explanation: "People still spend time scanning information that does not affect the decision.",
      }),
      delivery: Object.freeze({
        delta: 0,
        explanation: "The customer response is no easier to coordinate.",
      }),
    }),
    announcement:
      "The page contains more information, but the immediate material and delivery decision is still obscured.",
  }),
  Object.freeze({
    id: "send-separate-static-reports",
    title: "Send separate static reports to each team",
    description:
      "Give each role a tailored report, but keep its information separate from the shared exception.",
    effectLabel: "Targets the audience, but leaves the operational relationship disconnected.",
    completesChallenge: false,
    outcomeTitle: "Each team has a report, but the response still has no shared context.",
    outcomeSummary:
      "The reports are more relevant than one large page, yet management, production, and planning still have to reconcile the material, schedule, and delivery consequence themselves.",
    outcomeDetail:
      "Use one shared exception as the source of truth, then filter its relevant decision context for each role.",
    kpiChanges: Object.freeze({
      visibility: Object.freeze({
        delta: 1,
        explanation: "Each audience receives clearer detail, but the cross-functional exception remains separated.",
      }),
      productivity: Object.freeze({
        delta: 0,
        explanation: "Teams still rebuild the relationship between reports before they can act.",
      }),
      delivery: Object.freeze({
        delta: 0,
        explanation: "The customer response still depends on a manual comparison of updates.",
      }),
    }),
    announcement:
      "The reports are tailored, but management, production, and planning still do not share the same exception context.",
  }),
]);

export function createInitialControlRoomState() {
  return {
    selectedSignalIds: [],
    signalsConfirmed: false,
    signalError: null,
    prioritizedAudienceIds: [],
    audiencesConfirmed: false,
    audienceError: null,
    decisionId: null,
    decisionError: null,
  };
}

export function getControlRoomSignalById(signalId) {
  return controlRoomSignals.find((signal) => signal.id === signalId);
}

export function getControlRoomAudienceById(audienceId) {
  return controlRoomAudiences.find((audience) => audience.id === audienceId);
}

export function getControlRoomDecisionById(decisionId) {
  return controlRoomDecisions.find((decision) => decision.id === decisionId);
}

function getSelectionStatus(selectedIds, availableItems, requiredIds, selectionLimit) {
  const selectedItemIds = new Set(selectedIds);
  const selectedItems = availableItems.filter((item) => selectedItemIds.has(item.id));
  const requiredItemIds = new Set(requiredIds);
  const missingItems = availableItems.filter(
    (item) => requiredItemIds.has(item.id) && !selectedItemIds.has(item.id),
  );
  const extraItems = selectedItems.filter((item) => !requiredItemIds.has(item.id));

  return {
    selectedCount: selectedItems.length,
    selectionLimit,
    selectedItems,
    missingItems,
    extraItems,
    isExactSelection:
      selectedItems.length === requiredIds.length &&
      missingItems.length === 0 &&
      extraItems.length === 0,
  };
}

export function getControlRoomSignalSelectionStatus(progress) {
  return getSelectionStatus(
    progress.selectedSignalIds,
    controlRoomSignals,
    controlRoomRequiredSignalIds,
    controlRoomSignalSelectionLimit,
  );
}

export function getControlRoomAudienceSelectionStatus(progress) {
  return getSelectionStatus(
    progress.prioritizedAudienceIds,
    controlRoomAudiences,
    controlRoomRequiredAudienceIds,
    controlRoomAudiencePriorityLimit,
  );
}

export function isControlRoomReadyForDecision(progress) {
  return (
    progress.signalsConfirmed &&
    progress.audiencesConfirmed &&
    getControlRoomSignalSelectionStatus(progress).isExactSelection &&
    getControlRoomAudienceSelectionStatus(progress).isExactSelection
  );
}

export const controlRoomModule = Object.freeze({
  id: controlRoomChallengeId,
  interaction: "Operational view curation",
  createInitialState: createInitialControlRoomState,
});
