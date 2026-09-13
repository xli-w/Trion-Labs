import { challenges, getChallengeById } from "../data.js";
import { missingMinutesModule } from "./missingMinutes.js";
import { qualityLoopModule } from "./qualityLoop.js";
import { spreadsheetShuffleModule } from "./spreadsheetShuffle.js";
import { deliveryDominoModule } from "./deliveryDomino.js";
import { controlRoomModule } from "./controlRoom.js";

const challengeModules = Object.freeze([
  missingMinutesModule,
  qualityLoopModule,
  spreadsheetShuffleModule,
  deliveryDominoModule,
  controlRoomModule,
]);

const registeredModules = new Map(
  challengeModules.map((challengeModule) => [challengeModule.id, challengeModule]),
);

function validateChallengeRegistry() {
  const challengeIds = new Set(challenges.map((challenge) => challenge.id));

  if (challengeIds.size !== challenges.length) {
    throw new Error("Challenge definitions must use unique ids.");
  }

  if (registeredModules.size !== challengeModules.length) {
    throw new Error("Challenge modules must use unique ids.");
  }

  for (const challenge of challenges) {
    if (!registeredModules.has(challenge.id)) {
      throw new Error(`No focused module is registered for: ${challenge.id}`);
    }
  }

  for (const challengeModule of challengeModules) {
    if (!challengeIds.has(challengeModule.id)) {
      throw new Error(`Module ${challengeModule.id} does not have a challenge definition.`);
    }
  }
}

validateChallengeRegistry();

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

  if (prerequisiteId && !prerequisite) {
    throw new Error(`${challenge.title} has an unknown prerequisite: ${prerequisiteId}`);
  }

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
