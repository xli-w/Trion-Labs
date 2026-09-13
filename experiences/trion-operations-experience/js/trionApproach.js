import { calculateDiagnosticProfile, isDiagnosticReady } from "./diagnostic.js";
import {
  trionApproachSteps,
  trionCtaRecommendations,
  trionFabricStatement,
  trionFrameworks,
  trionWebsiteUrl,
} from "./operationModel.js";

function getFrameworks(step) {
  return step.frameworkIds.map((frameworkId) => {
    const framework = trionFrameworks[frameworkId];

    if (!framework) {
      throw new Error(`${step.title} references an unknown Trion framework: ${frameworkId}.`);
    }

    return framework;
  });
}

function getCtaRecommendation(profile) {
  const selectedOpportunityId = profile.selectedOpportunity?.id;
  const selectedRecommendation = selectedOpportunityId
    ? trionCtaRecommendations.find((recommendation) =>
        recommendation.opportunityIds.includes(selectedOpportunityId),
      )
    : null;

  if (selectedRecommendation) {
    return selectedRecommendation;
  }

  const diagnosticRecommendation = trionCtaRecommendations.find((recommendation) =>
    recommendation.diagnosticDimensionIds.includes(profile.greatestOpportunity.id),
  );

  if (diagnosticRecommendation) {
    return diagnosticRecommendation;
  }

  const fallback = trionCtaRecommendations.find(
    (recommendation) => recommendation.id === "improvement-roadmap",
  );

  if (!fallback) {
    throw new Error("A fallback Trion CTA recommendation is required.");
  }

  return fallback;
}

export function isTrionApproachReady(state) {
  return isDiagnosticReady(state);
}

export function getTrionApproachResult(state) {
  const profile = calculateDiagnosticProfile(state);

  return {
    profile,
    steps: trionApproachSteps.map((step) => ({
      ...step,
      frameworks: getFrameworks(step),
    })),
    fabric: trionFabricStatement,
    cta: {
      ...getCtaRecommendation(profile),
      url: trionWebsiteUrl,
    },
  };
}
