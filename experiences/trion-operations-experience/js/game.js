import { getChallengeById } from "./data.js";
import {
  getMissingMinutesDecisionById,
  getMissingMinutesEventById,
} from "./miniGames/missingMinutes.js";
import {
  getQualityLoopDiagnosisById,
  getQualityLoopDecisionById,
  getQualityLoopNodeById,
} from "./miniGames/qualityLoop.js";
import {
  getSpreadsheetShuffleAutomationById,
  getSpreadsheetShuffleStandardisationById,
  getSpreadsheetShuffleStepById,
} from "./miniGames/spreadsheetShuffle.js";
import {
  getDeliveryDominoDecisionById,
  getDeliveryDominoDependencyById,
} from "./miniGames/deliveryDomino.js";
import {
  getControlRoomAudienceById,
  getControlRoomDecisionById,
  getControlRoomSignalById,
} from "./miniGames/controlRoom.js";
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

export function viewExperienceSummary() {
  return dispatch({ type: "VIEW_EXPERIENCE_SUMMARY" });
}

export function resetExperience() {
  return dispatch({ type: "RESET" });
}

export function getChallengeStatus(challengeId) {
  return getChallengeReadiness(challengeId, getState());
}

export function completeChallenge({ challengeId, decision } = {}) {
  const challenge = getChallengeById(challengeId);

  if (!challenge) {
    throw new Error(`Unknown challenge: ${challengeId}`);
  }

  return dispatch({
    type: "COMPLETE_CHALLENGE",
    challengeId,
    decision,
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

export function selectQualityLoopNode(nodeId) {
  if (!getQualityLoopNodeById(nodeId)) {
    throw new Error(`Unknown Quality Loop record: ${nodeId}`);
  }

  return dispatch({
    type: "SELECT_QUALITY_LOOP_NODE",
    nodeId,
  });
}

export function identifyQualityLoopCause(diagnosisId) {
  if (!getQualityLoopDiagnosisById(diagnosisId)) {
    throw new Error(`Unknown Quality Loop diagnosis: ${diagnosisId}`);
  }

  return dispatch({
    type: "IDENTIFY_QUALITY_LOOP_CAUSE",
    diagnosisId,
  });
}

export function retryQualityLoopDiagnosis() {
  return dispatch({ type: "RETRY_QUALITY_LOOP_DIAGNOSIS" });
}

export function chooseQualityLoopImprovement(decisionId) {
  if (!getQualityLoopDecisionById(decisionId)) {
    throw new Error(`Unknown Quality Loop improvement: ${decisionId}`);
  }

  return dispatch({
    type: "CHOOSE_QUALITY_LOOP_IMPROVEMENT",
    decisionId,
  });
}

export function retryQualityLoopImprovement() {
  return dispatch({ type: "RETRY_QUALITY_LOOP_IMPROVEMENT" });
}

export function toggleSpreadsheetShuffleStep(stepId) {
  if (!getSpreadsheetShuffleStepById(stepId)) {
    throw new Error(`Unknown Spreadsheet Shuffle workflow step: ${stepId}`);
  }

  return dispatch({
    type: "TOGGLE_SPREADSHEET_SHUFFLE_STEP",
    stepId,
  });
}

export function applySpreadsheetShuffleSimplification() {
  return dispatch({ type: "APPLY_SPREADSHEET_SHUFFLE_SIMPLIFICATION" });
}

export function retrySpreadsheetShuffleSimplification() {
  return dispatch({ type: "RETRY_SPREADSHEET_SHUFFLE_SIMPLIFICATION" });
}

export function chooseSpreadsheetShuffleStandardisation(optionId) {
  if (!getSpreadsheetShuffleStandardisationById(optionId)) {
    throw new Error(`Unknown Spreadsheet Shuffle standardisation option: ${optionId}`);
  }

  return dispatch({
    type: "CHOOSE_SPREADSHEET_SHUFFLE_STANDARDISATION",
    optionId,
  });
}

export function retrySpreadsheetShuffleStandardisation() {
  return dispatch({ type: "RETRY_SPREADSHEET_SHUFFLE_STANDARDISATION" });
}

export function chooseSpreadsheetShuffleAutomation(optionId) {
  if (!getSpreadsheetShuffleAutomationById(optionId)) {
    throw new Error(`Unknown Spreadsheet Shuffle automation option: ${optionId}`);
  }

  return dispatch({
    type: "CHOOSE_SPREADSHEET_SHUFFLE_AUTOMATION",
    optionId,
  });
}

export function retrySpreadsheetShuffleAutomation() {
  return dispatch({ type: "RETRY_SPREADSHEET_SHUFFLE_AUTOMATION" });
}

export function inspectDeliveryDominoDependency(dependencyId) {
  if (!getDeliveryDominoDependencyById(dependencyId)) {
    throw new Error(`Unknown Delivery Domino dependency: ${dependencyId}`);
  }

  return dispatch({
    type: "INSPECT_DELIVERY_DOMINO_DEPENDENCY",
    dependencyId,
  });
}

export function chooseDeliveryDominoImprovement(decisionId) {
  if (!getDeliveryDominoDecisionById(decisionId)) {
    throw new Error(`Unknown Delivery Domino improvement: ${decisionId}`);
  }

  return dispatch({
    type: "CHOOSE_DELIVERY_DOMINO_IMPROVEMENT",
    decisionId,
  });
}

export function retryDeliveryDominoImprovement() {
  return dispatch({ type: "RETRY_DELIVERY_DOMINO_IMPROVEMENT" });
}

export function toggleControlRoomSignal(signalId) {
  if (!getControlRoomSignalById(signalId)) {
    throw new Error(`Unknown Control Room signal: ${signalId}`);
  }

  return dispatch({
    type: "TOGGLE_CONTROL_ROOM_SIGNAL",
    signalId,
  });
}

export function confirmControlRoomSignals() {
  return dispatch({ type: "CONFIRM_CONTROL_ROOM_SIGNALS" });
}

export function toggleControlRoomAudience(audienceId) {
  if (!getControlRoomAudienceById(audienceId)) {
    throw new Error(`Unknown Control Room audience: ${audienceId}`);
  }

  return dispatch({
    type: "TOGGLE_CONTROL_ROOM_AUDIENCE",
    audienceId,
  });
}

export function confirmControlRoomAudiences() {
  return dispatch({ type: "CONFIRM_CONTROL_ROOM_AUDIENCES" });
}

export function chooseControlRoomDecision(decisionId) {
  if (!getControlRoomDecisionById(decisionId)) {
    throw new Error(`Unknown Control Room decision: ${decisionId}`);
  }

  return dispatch({
    type: "CHOOSE_CONTROL_ROOM_DECISION",
    decisionId,
  });
}

export function retryControlRoomDecision() {
  return dispatch({ type: "RETRY_CONTROL_ROOM_DECISION" });
}
