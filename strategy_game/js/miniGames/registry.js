import { challenges, getChallengeById } from "../data.js";
import { missingMinutesChallengeId, missingMinutesModule } from "./missingMinutes.js";
import { qualityLoopChallengeId, qualityLoopModule } from "./qualityLoop.js";
import {
  spreadsheetShuffleChallengeId,
  spreadsheetShuffleModule,
} from "./spreadsheetShuffle.js";

function createChallengeContract(challenge) {
  return Object.freeze({
    id: challenge.id,
    interaction: challenge.mechanic,
    createInitialState() {
      return {
        phase: "briefing",
        selections: [],
        decision: null,
      };
    },
  });
}

const registeredModules = new Map(
  challenges.map((challenge) => [
    challenge.id,
    challenge.id === missingMinutesChallengeId
      ? missingMinutesModule
      : challenge.id === qualityLoopChallengeId
        ? qualityLoopModule
      : challenge.id === spreadsheetShuffleChallengeId
        ? spreadsheetShuffleModule
      : createChallengeContract(challenge),
  ]),
);

export function getChallengeModule(challengeId) {
  const challengeModule = registeredModules.get(challengeId);

  if (!challengeModule) {
    throw new Error(`No challenge module is registered for: ${challengeId}`);
  }

  return challengeModule;
}

export function getChallengeReadiness(challengeId, state) {
  const challenge = getChallengeById(challengeId);

  if (!challenge) {
    throw new Error(`Unknown challenge: ${challengeId}`);
  }

  const completed = state.completedChallenges.includes(challenge.id);
  const prerequisiteId = challenge.prerequisites.find(
    (id) => !state.completedChallenges.includes(id),
  );
  const prerequisite = prerequisiteId ? getChallengeById(prerequisiteId) : null;

  return {
    completed,
    canLaunch: !completed && !prerequisite,
    prerequisite,
    status: completed ? "completed" : prerequisite ? "sequenced" : "available",
  };
}

export function getRegisteredChallengeModules() {
  return [...registeredModules.values()];
}
