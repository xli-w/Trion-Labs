export const missingMinutesChallengeId = "missing-minutes";

export const missingMinutesTimeline = Object.freeze([
  Object.freeze({
    id: "running",
    label: "Running",
    tone: "running",
    start: "07:00",
    end: "08:12",
    duration: 72,
    planned: true,
    causeKnown: true,
    cause: "Scheduled production is running as expected.",
    productionEffect: "72 minutes of useful output in this illustrative two-hour window.",
  }),
  Object.freeze({
    id: "waiting",
    label: "Waiting",
    tone: "waiting",
    start: "08:12",
    end: "08:19",
    duration: 7,
    planned: false,
    causeKnown: true,
    cause: "The operator waited for a quality release that was handed over late.",
    productionEffect: "7 minutes of output were held back, but the handoff is already visible.",
  }),
  Object.freeze({
    id: "changeover",
    label: "Changeover",
    tone: "changeover",
    start: "08:19",
    end: "08:31",
    duration: 12,
    planned: true,
    causeKnown: true,
    cause: "A scheduled product change was completed between orders.",
    productionEffect: "12 minutes are planned time, not the immediate unexplained loss.",
  }),
  Object.freeze({
    id: "minor-stop",
    label: "Minor stop",
    tone: "minor-stop",
    start: "08:31",
    end: "08:36",
    duration: 5,
    planned: false,
    causeKnown: false,
    cause: "The record only says 'minor stop'; machine and material context were not captured.",
    productionEffect: "5 minutes were lost and the team cannot tell whether the stop is recurring.",
  }),
  Object.freeze({
    id: "breakdown",
    label: "Breakdown",
    tone: "breakdown",
    start: "08:36",
    end: "08:52",
    duration: 16,
    planned: false,
    causeKnown: false,
    cause: "The event was recorded as 'line stopped' with no reason, machine state, or shift context.",
    productionEffect: "16 minutes are lost. It is the largest single avoidable loss and nobody can consistently explain it.",
  }),
  Object.freeze({
    id: "material-delay",
    label: "Material delay",
    tone: "material-delay",
    start: "08:52",
    end: "09:00",
    duration: 8,
    planned: false,
    causeKnown: true,
    cause: "A material delivery was delayed; the planner's incident reference is available.",
    productionEffect: "8 minutes are lost, but the logistics cause is already visible to the team.",
  }),
]);

export const missingMinutesSummary = Object.freeze(
  missingMinutesTimeline.reduce(
    (summary, event) => {
      summary.totalMinutes += event.duration;

      if (event.id === "running") {
        summary.runningMinutes += event.duration;
      } else if (event.planned) {
        summary.plannedLossMinutes += event.duration;
      } else {
        summary.unplannedLossMinutes += event.duration;

        if (!event.causeKnown) {
          summary.unexplainedLossMinutes += event.duration;
        }
      }

      return summary;
    },
    {
      totalMinutes: 0,
      runningMinutes: 0,
      plannedLossMinutes: 0,
      unplannedLossMinutes: 0,
      unexplainedLossMinutes: 0,
    },
  ),
);

export const missingMinutesDecisions = Object.freeze([
  Object.freeze({
    id: "capture-downtime-context",
    title: "Improve downtime data capture",
    description:
      "Record the stop reason, timing, machine state, and shift context at the line.",
    effectLabel: "Makes a recurring loss traceable before the next intervention.",
    focusEventId: "breakdown",
    completesChallenge: true,
    outcomeTitle: "The missing minutes now have context.",
    outcomeSummary:
      "The 16-minute breakdown is no longer just 'line stopped'. The team can separate it from planned changeover and trace the conditions around repeated loss.",
    outcomeDetail:
      "This does not remove the breakdown by itself. It gives supervisors enough evidence to target the next preventive improvement.",
    kpiChanges: Object.freeze({
      throughput: Object.freeze({
        delta: 3,
        explanation: "Recurring loss can be escalated and addressed sooner.",
      }),
      productivity: Object.freeze({
        delta: 2,
        explanation: "Teams spend less time reconstructing what happened.",
      }),
      visibility: Object.freeze({
        delta: 24,
        explanation: "Reason, timing, and context are now captured together.",
      }),
    }),
    additionalUnlockIds: Object.freeze(["understand"]),
    announcement:
      "Downtime context is now captured. Visibility improved and the Connected Production View is available.",
  }),
  Object.freeze({
    id: "standardise-downtime-categories",
    title: "Standardise downtime categories",
    description: "Apply consistent labels to the existing stop records.",
    effectLabel: "Improves comparison, but does not add the missing event context.",
    focusEventId: "breakdown",
    completesChallenge: false,
    outcomeTitle: "The labels are clearer, but the cause is still missing.",
    outcomeSummary:
      "A common category makes the stop records easier to compare. The breakdown entry still lacks the timing and machine context needed to explain or prevent the 16-minute loss.",
    outcomeDetail:
      "Standardisation is useful once the operation can capture meaningful evidence. It is not enough as the first response here.",
    kpiChanges: Object.freeze({
      throughput: Object.freeze({
        delta: 0,
        explanation: "No immediate change while the breakdown remains unexplained.",
      }),
      productivity: Object.freeze({
        delta: 0,
        explanation: "Teams still need to reconstruct the stop manually.",
      }),
      visibility: Object.freeze({
        delta: 6,
        explanation: "Labels become more consistent, but the record remains incomplete.",
      }),
    }),
    announcement:
      "Downtime categories are more consistent, but the largest loss still lacks the context needed to act.",
  }),
  Object.freeze({
    id: "share-current-event-record",
    title: "Connect events to a shared production view",
    description: "Make the current event record visible to the people coordinating the line.",
    effectLabel: "Shares the record sooner, but repeats the same ambiguity.",
    focusEventId: "breakdown",
    completesChallenge: false,
    outcomeTitle: "A shared view repeats an incomplete record.",
    outcomeSummary:
      "Supervisors can see the stop sooner, but 'line stopped' still does not say why it happened. Connecting ambiguous records does not make them actionable.",
    outcomeDetail:
      "A shared view becomes useful after the event data can distinguish the reason for loss from the time it occurred.",
    kpiChanges: Object.freeze({
      throughput: Object.freeze({
        delta: 0,
        explanation: "The unresolved breakdown still constrains output.",
      }),
      productivity: Object.freeze({
        delta: 0,
        explanation: "No new evidence reduces manual investigation yet.",
      }),
      visibility: Object.freeze({
        delta: 3,
        explanation: "More people can see the same incomplete event record.",
      }),
    }),
    announcement:
      "The production record is more widely visible, but the unexplained breakdown still cannot be investigated reliably.",
  }),
]);

export function createInitialMissingMinutesState() {
  return {
    selectedEventId: null,
    inspectedEventIds: [],
    decisionId: null,
    decisionError: null,
  };
}

export function getMissingMinutesEventById(eventId) {
  return missingMinutesTimeline.find((event) => event.id === eventId);
}

export function getMissingMinutesDecisionById(decisionId) {
  return missingMinutesDecisions.find((decision) => decision.id === decisionId);
}

export function getMissingMinutesInvestigationStatus(progress) {
  const inspectedEventIds = new Set(progress.inspectedEventIds);
  const inspectedLossEvents = missingMinutesTimeline.filter(
    (event) => event.id !== "running" && inspectedEventIds.has(event.id),
  );
  const requiredLossEvents = 3;
  const hasLargestAvoidableLoss = inspectedEventIds.has("breakdown");

  return {
    inspectedLossEvents: inspectedLossEvents.length,
    requiredLossEvents,
    remainingLossEvents: Math.max(0, requiredLossEvents - inspectedLossEvents.length),
    hasLargestAvoidableLoss,
    canDecide:
      inspectedLossEvents.length >= requiredLossEvents && hasLargestAvoidableLoss,
  };
}

export function isMissingMinutesReadyForDecision(progress) {
  return getMissingMinutesInvestigationStatus(progress).canDecide;
}

export const missingMinutesModule = Object.freeze({
  id: missingMinutesChallengeId,
  interaction: "Timeline investigation",
  createInitialState: createInitialMissingMinutesState,
});
