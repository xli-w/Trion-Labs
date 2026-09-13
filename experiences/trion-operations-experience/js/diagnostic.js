import {
  getChallengeById,
  getUpgradeById,
  hasCompletedExperience,
  kpiDefinitions,
} from "./data.js";
import {
  diagnosticBands,
  diagnosticDimensions,
  diagnosticProfileBands,
  getChallengeOutcomeById,
  getConnectionMapRelationshipById,
  getOperationSnapshot,
  getOpportunityAvailability,
  getOpportunityById,
} from "./operationModel.js";

function assertDiagnosticState(state) {
  if (
    !state ||
    !Array.isArray(state.completedChallenges) ||
    !Array.isArray(state.decisions) ||
    !Array.isArray(state.unlockedUpgrades) ||
    !state.kpis ||
    !Number.isFinite(state.operationalScore)
  ) {
    throw new TypeError("A diagnostic profile requires complete operational state.");
  }
}

function getCompletedOutcomeIds(state) {
  const outcomeIds = new Set();

  for (const decision of state.decisions) {
    if (typeof decision.outcomeId !== "string") {
      throw new Error(`Decision for ${decision.challengeId} is missing its outcome id.`);
    }

    if (!getChallengeOutcomeById(decision.outcomeId)) {
      throw new Error(`Decision references an unknown outcome: ${decision.outcomeId}.`);
    }

    outcomeIds.add(decision.outcomeId);
  }

  return outcomeIds;
}

function assertFiniteWeight(value, label) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`Diagnostic weight for ${label} must be finite.`);
  }
}

function addContribution(contributions, type, label, value) {
  if (value !== 0) {
    contributions.push({ type, label, value });
  }
}

function roundIllustrativeScore(value) {
  const clampedScore = Math.max(0, Math.min(100, value));

  // Round the derived reading so this illustrative profile does not imply false precision.
  return Math.round(clampedScore / 5) * 5;
}

function getDiagnosticBand(score) {
  const band = diagnosticBands.find((item) => score >= item.minimum);

  if (!band) {
    throw new Error(`No diagnostic band is configured for ${score}.`);
  }

  return band;
}

function getProfileBand(score) {
  const band = diagnosticProfileBands.find((item) => score >= item.minimum);

  if (!band) {
    throw new Error(`No diagnostic profile band is configured for ${score}.`);
  }

  return band;
}

function calculateDimension(dimension, state, completedOutcomeIds, connectedRelationshipIds) {
  const { scoring } = dimension;
  const unlockedUpgradeIds = new Set(state.unlockedUpgrades);
  const contributions = [];
  let score = scoring.base;

  addContribution(contributions, "baseline", "Diagnostic baseline", scoring.base);

  for (const [kpiId, weight] of Object.entries(scoring.kpiWeights)) {
    assertFiniteWeight(weight, `${dimension.id}:${kpiId}`);

    const kpi = state.kpis[kpiId];
    const definition = kpiDefinitions[kpiId];

    if (!kpi || !definition || !Number.isFinite(kpi.current)) {
      throw new Error(`${dimension.label} references an invalid KPI: ${kpiId}.`);
    }

    const contribution = kpi.current * weight;
    score += contribution;
    addContribution(contributions, "kpi", `${definition.label} ${kpi.current}${kpi.unit}`, contribution);
  }

  for (const [outcomeId, points] of Object.entries(scoring.outcomePoints)) {
    assertFiniteWeight(points, `${dimension.id}:${outcomeId}`);

    if (!completedOutcomeIds.has(outcomeId)) {
      continue;
    }

    const outcome = getChallengeOutcomeById(outcomeId);
    const challenge = outcome ? getChallengeById(outcome.challengeId) : null;

    if (!outcome || !challenge) {
      throw new Error(`${dimension.label} references an invalid outcome: ${outcomeId}.`);
    }

    score += points;
    addContribution(contributions, "outcome", challenge.title, points);
  }

  for (const [upgradeId, points] of Object.entries(scoring.capabilityPoints)) {
    assertFiniteWeight(points, `${dimension.id}:${upgradeId}`);

    if (!unlockedUpgradeIds.has(upgradeId)) {
      continue;
    }

    const upgrade = getUpgradeById(upgradeId);

    if (!upgrade) {
      throw new Error(`${dimension.label} references an invalid capability: ${upgradeId}.`);
    }

    score += points;
    addContribution(contributions, "capability", upgrade.title, points);
  }

  for (const [relationshipId, points] of Object.entries(scoring.connectionPoints)) {
    assertFiniteWeight(points, `${dimension.id}:${relationshipId}`);

    if (!connectedRelationshipIds.has(relationshipId)) {
      continue;
    }

    const relationship = getConnectionMapRelationshipById(relationshipId);

    if (!relationship) {
      throw new Error(
        `${dimension.label} references an invalid connection: ${relationshipId}.`,
      );
    }

    score += points;
    addContribution(contributions, "connection", relationship.title, points);
  }

  assertFiniteWeight(scoring.operationalScoreWeight, `${dimension.id}:operationalScore`);
  const operationalScoreContribution = state.operationalScore * scoring.operationalScoreWeight;
  score += operationalScoreContribution;
  addContribution(
    contributions,
    "operational-score",
    `Operational health ${state.operationalScore}`,
    operationalScoreContribution,
  );

  const roundedScore = roundIllustrativeScore(score);
  const band = getDiagnosticBand(roundedScore);
  const interpretation = dimension.interpretations[band.id];

  if (typeof interpretation !== "string") {
    throw new Error(`${dimension.label} is missing its ${band.id} interpretation.`);
  }

  return {
    id: dimension.id,
    label: dimension.label,
    description: dimension.description,
    score: roundedScore,
    assessment: {
      id: band.id,
      label: band.label,
      description: interpretation,
    },
    evidence: contributions
      .filter((contribution) => contribution.type !== "baseline")
      .sort((first, second) => second.value - first.value)
      .slice(0, 3)
      .map((contribution) => contribution.label),
    contributions,
    remainingFriction: dimension.remainingFriction,
    recommendation: dimension.recommendation,
  };
}

function getLowestDimension(dimensions) {
  return dimensions.reduce(
    (lowest, dimension) => (dimension.score < lowest.score ? dimension : lowest),
    dimensions[0],
  );
}

function getHighestDimension(dimensions) {
  return dimensions.reduce(
    (highest, dimension) => (dimension.score > highest.score ? dimension : highest),
    dimensions[0],
  );
}

function getSelectedOpportunity(state) {
  if (state.selectedOpportunityId == null) {
    return null;
  }

  if (typeof state.selectedOpportunityId !== "string") {
    throw new TypeError("Selected opportunity must be an identifier or null.");
  }

  const opportunity = getOpportunityById(state.selectedOpportunityId);

  if (!opportunity) {
    throw new Error(`Unknown selected opportunity: ${state.selectedOpportunityId}.`);
  }

  if (!getOpportunityAvailability(opportunity, state).available) {
    throw new Error(`${opportunity.title} is selected before its prerequisites are available.`);
  }

  return opportunity;
}

export function isDiagnosticReady(state) {
  assertDiagnosticState(state);
  return hasCompletedExperience(state.completedChallenges);
}

export function calculateDiagnosticProfile(state) {
  assertDiagnosticState(state);

  const operationSnapshot = getOperationSnapshot(state);
  const completedOutcomeIds = getCompletedOutcomeIds(state);
  const connectedRelationshipIds = new Set(
    operationSnapshot.connections
      .filter((relationship) => relationship.status === "connected")
      .map((relationship) => relationship.id),
  );
  const dimensions = diagnosticDimensions.map((dimension) =>
    calculateDimension(dimension, state, completedOutcomeIds, connectedRelationshipIds),
  );
  const maturityDimensions = dimensions.filter(
    (dimension) => dimension.id !== "improvement-potential",
  );

  if (maturityDimensions.length === 0) {
    throw new Error("A diagnostic profile requires at least one maturity dimension.");
  }

  const overallScore = roundIllustrativeScore(
    maturityDimensions.reduce((total, dimension) => total + dimension.score, 0) /
      maturityDimensions.length,
  );
  const overall = getProfileBand(overallScore);
  const strongestDimension = getHighestDimension(maturityDimensions);
  const greatestOpportunity = getLowestDimension(maturityDimensions);
  const selectedOpportunity = getSelectedOpportunity(state);
  const remainingFriction = operationSnapshot.frictionPoints.find(
    (frictionPoint) => frictionPoint.status === "open",
  );

  return {
    overall: {
      score: overallScore,
      label: overall.label,
      description: overall.description,
    },
    dimensions,
    strongestDimension,
    greatestOpportunity,
    selectedOpportunity,
    mainRemainingFriction: remainingFriction
      ? {
          title: remainingFriction.title,
          description: remainingFriction.description,
        }
      : {
          title: "The next response bottleneck",
          description: greatestOpportunity.remainingFriction,
        },
    recommendedNextStep: selectedOpportunity
      ? selectedOpportunity.recommendation
      : greatestOpportunity.recommendation,
    connectedRelationshipCount: operationSnapshot.connectedRelationshipCount,
    totalRelationshipCount: operationSnapshot.totalRelationshipCount,
    completedChallengeCount: state.completedChallenges.length,
    calculationSummary:
      "Illustrative readings are rounded to the nearest five and combine current KPI condition, completed outcomes, unlocked capabilities, and connected relationships.",
  };
}
