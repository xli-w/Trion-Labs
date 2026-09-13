import { getChallengeById } from "./data.js";
import {
  getMissingMinutesDecisionById,
  getMissingMinutesEventById,
} from "./miniGames/missingMinutes.js";
import { getChallengeReadiness, getChallengeModule } from "./miniGames/registry.js";
import { dispatch, getState } from "./state.js";

export function enterLab() {
  return dispatch({
    type: "NAVIGATE",
    section: "overview",
    announcement: "Entered the lab. The operation is ready to investigate.",
  });
}

export function returnToLanding() {
  return dispatch({
    type: "SET_SCREEN",
    screen: "landing",
    announcement: "Returned to the Trion Labs introduction.",
  });
}

export function navigateToSection(section) {
  return dispatch({
    type: "NAVIGATE",
    section,
    announcement: `Showing ${section}.`,
  });
}

export function reviewChallenge(challengeId) {
  getChallengeModule(challengeId);

  return dispatch({
    type: "OPEN_CHALLENGE",
    challengeId,
  });
}

export function closeChallengeBriefing() {
  return dispatch({ type: "CLOSE_CHALLENGE" });
}

export function resetExperience() {
  return dispatch({ type: "RESET" });
}

export function getChallengeStatus(challengeId) {
  return getChallengeReadiness(challengeId, getState());
}

export function completeChallenge({
  challengeId,
  decision,
  kpiChanges,
  resourceCosts,
  unlockIds,
}) {
  const challenge = getChallengeById(challengeId);

  if (!challenge) {
    throw new Error(`Unknown challenge: ${challengeId}`);
  }

  const readiness = getChallengeReadiness(challengeId, getState());

  if (!readiness.canLaunch) {
    throw new Error(`${challenge.title} cannot be completed before its prerequisite.`);
  }

  return dispatch({
    type: "COMPLETE_CHALLENGE",
    challengeId,
    decision,
    kpiChanges,
    resourceCosts,
    unlockIds,
  });
}

export function inspectMissingMinutesEvent(eventId) {
  if (!getMissingMinutesEventById(eventId)) {
    throw new Error(`Unknown Missing Minutes event: ${eventId}`);
  }

  return dispatch({
    type: "INSPECT_MISSING_MINUTES_EVENT",
    eventId,
  });
}

export function chooseMissingMinutesImprovement(decisionId) {
  if (!getMissingMinutesDecisionById(decisionId)) {
    throw new Error(`Unknown Missing Minutes decision: ${decisionId}`);
  }

  return dispatch({
    type: "CHOOSE_MISSING_MINUTES_IMPROVEMENT",
    decisionId,
  });
}

export function retryMissingMinutesDecision() {
  return dispatch({ type: "RETRY_MISSING_MINUTES_DECISION" });
}
