import { calculateDiagnosticProfile, isDiagnosticReady } from "./diagnostic.js";
import { operatingModelChanges, operatingModelFlow } from "./operationModel.js";

function getCompletedOutcomeIds(state) {
  return new Set(state.decisions.map((decision) => decision.outcomeId));
}

function getRecordedKpiImpact(state, outcomeId, kpiId) {
  const decision = state.decisions.find((item) => item.outcomeId === outcomeId);

  if (!decision || !decision.kpiImpact || !decision.kpiImpact[kpiId]) {
    throw new Error(`Operating model change ${outcomeId} is missing its ${kpiId} impact.`);
  }

  const impact = decision.kpiImpact[kpiId];

  if (!Number.isFinite(impact.before) || !Number.isFinite(impact.after)) {
    throw new Error(`Operating model change ${outcomeId} has invalid ${kpiId} values.`);
  }

  return {
    id: kpiId,
    before: impact.before,
    after: impact.after,
    delta: impact.after - impact.before,
  };
}

function getRelevantChanges(state, completedOutcomeIds) {
  return operatingModelChanges
    .filter((change) => completedOutcomeIds.has(change.outcomeId))
    .map((change) => ({
      ...change,
      kpiImpacts: change.kpiIds.map((kpiId) =>
        getRecordedKpiImpact(state, change.outcomeId, kpiId),
      ),
    }));
}

function getActiveFlowSteps(completedOutcomeIds) {
  return operatingModelFlow.after.filter((step) =>
    step.requiredOutcomeIds.every((outcomeId) => completedOutcomeIds.has(outcomeId)),
  );
}

export function isOperatingModelComparisonReady(state) {
  return isDiagnosticReady(state);
}

export function getOperatingModelComparison(state) {
  const profile = calculateDiagnosticProfile(state);
  const completedOutcomeIds = getCompletedOutcomeIds(state);
  const changes = getRelevantChanges(state, completedOutcomeIds);
  const activeAfterFlow = getActiveFlowSteps(completedOutcomeIds);

  return {
    changes,
    beforeFlow: operatingModelFlow.before,
    afterFlow: activeAfterFlow,
    mainRemainingFriction: profile.mainRemainingFriction,
    selectedOpportunity: profile.selectedOpportunity,
    recommendedNextStep: profile.recommendedNextStep,
    completedOutcomeCount: completedOutcomeIds.size,
  };
}
