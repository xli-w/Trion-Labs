import {
  calculateOperationalScore,
  capabilityStages,
  createInitialGameState,
  getChallengeById,
  getUpgradeById,
  kpiDefinitions,
} from "./data.js";
import {
  getMissingMinutesDecisionById,
  getMissingMinutesEventById,
  isMissingMinutesReadyForDecision,
  missingMinutesChallengeId,
} from "./miniGames/missingMinutes.js";
import {
  getQualityLoopConnectionByNodeIds,
  getQualityLoopDecisionById,
  getQualityLoopDiagnosisById,
  getQualityLoopNodeById,
  isQualityLoopReadyForDiagnosis,
  qualityLoopChallengeId,
} from "./miniGames/qualityLoop.js";

const screenNames = new Set(["landing", "overview", "challenge"]);
const sectionNames = new Set(["overview", "challenges", "capabilities", "performance"]);
const listeners = new Set();
let currentState = createInitialGameState();

function cloneState(state) {
  return {
    ...state,
    kpis: Object.fromEntries(
      Object.entries(state.kpis).map(([key, value]) => [key, { ...value }]),
    ),
    resources: { ...state.resources },
    missingMinutes: {
      ...state.missingMinutes,
      inspectedEventIds: [...state.missingMinutes.inspectedEventIds],
    },
    qualityLoop: {
      ...state.qualityLoop,
      revealedConnectionIds: [...state.qualityLoop.revealedConnectionIds],
    },
    completedChallenges: [...state.completedChallenges],
    unlockedUpgrades: [...state.unlockedUpgrades],
    decisions: state.decisions.map((decision) => ({ ...decision })),
    notifications: state.notifications.map((notification) => ({ ...notification })),
  };
}

function addNotification(state, message) {
  const notification = {
    id: state.notifications.length + 1,
    message,
  };

  return {
    ...state,
    announcement: message,
    notifications: [...state.notifications, notification].slice(-8),
  };
}

function assertKnownChallenge(challengeId) {
  const challenge = getChallengeById(challengeId);

  if (!challenge) {
    throw new Error(`Unknown challenge: ${challengeId}`);
  }

  return challenge;
}

function updateKpis(kpis, changes) {
  const nextKpis = Object.fromEntries(
    Object.entries(kpis).map(([key, value]) => [key, { ...value }]),
  );

  for (const [key, change] of Object.entries(changes)) {
    if (!kpiDefinitions[key]) {
      throw new Error(`Unknown KPI: ${key}`);
    }

    if (!change || !Number.isFinite(change.delta)) {
      throw new Error(`KPI change for ${key} must include a finite delta.`);
    }

    const previous = nextKpis[key].current;
    nextKpis[key] = {
      ...nextKpis[key],
      previous,
      current: Math.max(0, Math.min(100, previous + change.delta)),
    };
  }

  return nextKpis;
}

function updateResources(resources, costs) {
  const nextResources = { ...resources };

  for (const [key, cost] of Object.entries(costs)) {
    if (!Object.prototype.hasOwnProperty.call(nextResources, key)) {
      throw new Error(`Unknown resource: ${key}`);
    }

    if (!Number.isInteger(cost) || cost < 0) {
      throw new Error(`Resource cost for ${key} must be a non-negative integer.`);
    }

    if (cost > nextResources[key]) {
      throw new Error(`Insufficient ${key} to complete this challenge.`);
    }

    nextResources[key] -= cost;
  }

  return nextResources;
}

function applyChallengeCompletion(state, action) {
  const challenge = assertKnownChallenge(action.challengeId);
  const nextKpis = updateKpis(state.kpis, action.kpiChanges ?? {});
  const resources = updateResources(state.resources, action.resourceCosts ?? {});
  const unlockedUpgrades = [...state.unlockedUpgrades];
  const upgradeIds = action.unlockIds ?? [challenge.unlockId];

  for (const upgradeId of upgradeIds) {
    if (!getUpgradeById(upgradeId)) {
      throw new Error(`Unknown upgrade: ${upgradeId}`);
    }

    if (!unlockedUpgrades.includes(upgradeId)) {
      unlockedUpgrades.push(upgradeId);
    }
  }

  const completedChallenges = [...state.completedChallenges, challenge.id];
  const decisions = action.decision
    ? [...state.decisions, { challengeId: challenge.id, ...action.decision }]
    : state.decisions;

  return {
    ...state,
    completedChallenges,
    unlockedUpgrades,
    decisions,
    kpis: nextKpis,
    resources,
    operationalScore: calculateOperationalScore(nextKpis),
    capabilityStage: deriveCapabilityStage(completedChallenges, unlockedUpgrades),
  };
}

function deriveCapabilityStage(completedChallenges, unlockedUpgrades) {
  const progressPoints = completedChallenges.length + unlockedUpgrades.length;
  const calculatedStage = 1 + Math.floor(progressPoints / 2);

  return Math.min(capabilityStages.length, calculatedStage);
}

function commit(nextState) {
  const previousState = currentState;
  currentState = nextState;

  for (const listener of listeners) {
    listener(cloneState(currentState), cloneState(previousState));
  }

  return getState();
}

function reduce(state, action) {
  switch (action.type) {
    case "NAVIGATE": {
      if (!sectionNames.has(action.section)) {
        throw new Error(`Unknown section: ${action.section}`);
      }

      return addNotification(
        {
          ...state,
          currentScreen: "overview",
          activeSection: action.section,
          activeChallengeId: null,
        },
        action.announcement ?? `Showing ${action.section}.`,
      );
    }

    case "SET_SCREEN": {
      if (!screenNames.has(action.screen)) {
        throw new Error(`Unknown screen: ${action.screen}`);
      }

      return addNotification(
        {
          ...state,
          currentScreen: action.screen,
          activeChallengeId: action.screen === "challenge" ? state.activeChallengeId : null,
        },
        action.announcement ?? "Screen updated.",
      );
    }

    case "OPEN_CHALLENGE": {
      const challenge = assertKnownChallenge(action.challengeId);

      return addNotification(
        {
          ...state,
          currentScreen: "challenge",
          activeChallengeId: challenge.id,
        },
        `Reviewing ${challenge.title}.`,
      );
    }

    case "CLOSE_CHALLENGE":
      return addNotification(
        {
          ...state,
          currentScreen: "overview",
          activeSection: "challenges",
          activeChallengeId: null,
        },
        "Returned to the challenge map.",
      );

    case "COMPLETE_CHALLENGE": {
      const challenge = assertKnownChallenge(action.challengeId);

      if (state.completedChallenges.includes(challenge.id)) {
        return addNotification(state, `${challenge.title} is already complete.`);
      }

      const nextState = applyChallengeCompletion(state, action);

      return addNotification(nextState, `${challenge.title} is complete. ${challenge.unlockLabel} unlocked.`);
    }

    case "INSPECT_MISSING_MINUTES_EVENT": {
      const event = getMissingMinutesEventById(action.eventId);

      if (!event) {
        throw new Error(`Unknown Missing Minutes event: ${action.eventId}`);
      }

      const inspectedEventIds = state.missingMinutes.inspectedEventIds.includes(event.id)
        ? state.missingMinutes.inspectedEventIds
        : [...state.missingMinutes.inspectedEventIds, event.id];
      const nextState = {
        ...state,
        missingMinutes: {
          ...state.missingMinutes,
          selectedEventId: event.id,
          inspectedEventIds,
          decisionError: null,
        },
      };
      const causeMessage = event.causeKnown ? "cause known" : "cause unknown";

      return addNotification(
        nextState,
        `${event.label} inspected: ${event.duration} minutes, ${event.planned ? "planned" : "unplanned"}, ${causeMessage}.`,
      );
    }

    case "CHOOSE_MISSING_MINUTES_IMPROVEMENT": {
      const decision = getMissingMinutesDecisionById(action.decisionId);

      if (!decision) {
        throw new Error(`Unknown Missing Minutes decision: ${action.decisionId}`);
      }

      if (state.completedChallenges.includes(missingMinutesChallengeId)) {
        return addNotification(
          state,
          "The Missing Minutes is already complete. Review the capability outcome from the challenge map.",
        );
      }

      if (!isMissingMinutesReadyForDecision(state.missingMinutes)) {
        const decisionError =
          "Inspect at least three loss events, including the longest unplanned loss, before choosing an improvement.";

        return addNotification(
          {
            ...state,
            missingMinutes: {
              ...state.missingMinutes,
              decisionError,
            },
          },
          decisionError,
        );
      }

      const nextState = {
        ...state,
        missingMinutes: {
          ...state.missingMinutes,
          selectedEventId: decision.focusEventId,
          decisionId: decision.id,
          decisionError: null,
        },
      };

      if (!decision.completesChallenge) {
        return addNotification(nextState, decision.announcement);
      }

      const completedState = applyChallengeCompletion(nextState, {
        challengeId: missingMinutesChallengeId,
        decision: {
          id: decision.id,
          title: decision.title,
        },
        kpiChanges: decision.kpiChanges,
        resourceCosts: decision.resourceCosts,
        unlockIds: decision.unlockIds,
      });

      return addNotification(completedState, decision.announcement);
    }

    case "RETRY_MISSING_MINUTES_DECISION":
      if (state.completedChallenges.includes(missingMinutesChallengeId)) {
        return addNotification(
          state,
          "The Missing Minutes is already complete. Review the capability outcome from the challenge map.",
        );
      }

      return addNotification(
        {
          ...state,
          missingMinutes: {
            ...state.missingMinutes,
            decisionId: null,
            decisionError: null,
          },
        },
        "Review the production timeline and choose another first intervention.",
      );

    case "SELECT_QUALITY_LOOP_NODE": {
      const node = getQualityLoopNodeById(action.nodeId);

      if (!node) {
        throw new Error(`Unknown Quality Loop record: ${action.nodeId}`);
      }

      if (state.completedChallenges.includes(qualityLoopChallengeId)) {
        return addNotification(
          state,
          "The Quality Loop is already complete. Review the Production + Quality Integration outcome from the challenge map.",
        );
      }

      const selectedNodeId = state.qualityLoop.selectedNodeId;

      if (!selectedNodeId) {
        return addNotification(
          {
            ...state,
            qualityLoop: {
              ...state.qualityLoop,
              selectedNodeId: node.id,
              connectionError: null,
            },
          },
          `${node.label} selected. Choose a second record to compare its incident context.`,
        );
      }

      if (selectedNodeId === node.id) {
        return addNotification(
          {
            ...state,
            qualityLoop: {
              ...state.qualityLoop,
              selectedNodeId: null,
              connectionError: null,
            },
          },
          `${node.label} selection cleared.`,
        );
      }

      const selectedNode = getQualityLoopNodeById(selectedNodeId);

      if (!selectedNode) {
        throw new Error(`Unknown selected Quality Loop record: ${selectedNodeId}`);
      }

      const connection = getQualityLoopConnectionByNodeIds(selectedNode.id, node.id);

      if (!connection) {
        const connectionError = `${selectedNode.label} and ${node.label} do not share a useful incident trace in this scenario. Choose another record or select ${selectedNode.label} again to clear it.`;

        return addNotification(
          {
            ...state,
            qualityLoop: {
              ...state.qualityLoop,
              connectionError,
            },
          },
          connectionError,
        );
      }

      const alreadyRevealed = state.qualityLoop.revealedConnectionIds.includes(connection.id);
      const revealedConnectionIds = alreadyRevealed
        ? state.qualityLoop.revealedConnectionIds
        : [...state.qualityLoop.revealedConnectionIds, connection.id];

      return addNotification(
        {
          ...state,
          qualityLoop: {
            ...state.qualityLoop,
            selectedNodeId: null,
            revealedConnectionIds,
            lastConnectionId: connection.id,
            connectionError: null,
            diagnosisError: null,
          },
        },
        alreadyRevealed
          ? `${connection.title} is already connected on the evidence map.`
          : connection.announcement,
      );
    }

    case "IDENTIFY_QUALITY_LOOP_CAUSE": {
      const diagnosis = getQualityLoopDiagnosisById(action.diagnosisId);

      if (!diagnosis) {
        throw new Error(`Unknown Quality Loop diagnosis: ${action.diagnosisId}`);
      }

      if (state.completedChallenges.includes(qualityLoopChallengeId)) {
        return addNotification(
          state,
          "The Quality Loop is already complete. Review the Production + Quality Integration outcome from the challenge map.",
        );
      }

      if (!isQualityLoopReadyForDiagnosis(state.qualityLoop)) {
        const diagnosisError =
          "Connect the three lead records before identifying the most likely source of the defect spike.";

        return addNotification(
          {
            ...state,
            qualityLoop: {
              ...state.qualityLoop,
              diagnosisError,
            },
          },
          diagnosisError,
        );
      }

      return addNotification(
        {
          ...state,
          qualityLoop: {
            ...state.qualityLoop,
            selectedNodeId: null,
            diagnosisId: diagnosis.id,
            improvementId: null,
            diagnosisError: null,
            decisionError: null,
          },
        },
        diagnosis.announcement,
      );
    }

    case "RETRY_QUALITY_LOOP_DIAGNOSIS":
      if (state.completedChallenges.includes(qualityLoopChallengeId)) {
        return addNotification(
          state,
          "The Quality Loop is already complete. Review the Production + Quality Integration outcome from the challenge map.",
        );
      }

      return addNotification(
        {
          ...state,
          qualityLoop: {
            ...state.qualityLoop,
            selectedNodeId: null,
            diagnosisId: null,
            improvementId: null,
            diagnosisError: null,
            decisionError: null,
          },
        },
        "Review the connected evidence and test another explanation for the defect spike.",
      );

    case "CHOOSE_QUALITY_LOOP_IMPROVEMENT": {
      const decision = getQualityLoopDecisionById(action.decisionId);

      if (!decision) {
        throw new Error(`Unknown Quality Loop improvement: ${action.decisionId}`);
      }

      if (state.completedChallenges.includes(qualityLoopChallengeId)) {
        return addNotification(
          state,
          "The Quality Loop is already complete. Review the Production + Quality Integration outcome from the challenge map.",
        );
      }

      const diagnosis = getQualityLoopDiagnosisById(state.qualityLoop.diagnosisId);

      if (!diagnosis || !diagnosis.isLikelyCause) {
        const decisionError =
          "Confirm the material-batch evidence before choosing the improvement that should make future investigations possible.";

        return addNotification(
          {
            ...state,
            qualityLoop: {
              ...state.qualityLoop,
              decisionError,
            },
          },
          decisionError,
        );
      }

      const nextState = {
        ...state,
        qualityLoop: {
          ...state.qualityLoop,
          improvementId: decision.id,
          decisionError: null,
        },
      };

      if (!decision.completesChallenge) {
        return addNotification(nextState, decision.announcement);
      }

      const completedState = applyChallengeCompletion(nextState, {
        challengeId: qualityLoopChallengeId,
        decision: {
          id: decision.id,
          title: decision.title,
        },
        kpiChanges: decision.kpiChanges,
        resourceCosts: decision.resourceCosts,
        unlockIds: decision.unlockIds,
      });

      return addNotification(completedState, decision.announcement);
    }

    case "RETRY_QUALITY_LOOP_IMPROVEMENT":
      if (state.completedChallenges.includes(qualityLoopChallengeId)) {
        return addNotification(
          state,
          "The Quality Loop is already complete. Review the Production + Quality Integration outcome from the challenge map.",
        );
      }

      return addNotification(
        {
          ...state,
          qualityLoop: {
            ...state.qualityLoop,
            improvementId: null,
            decisionError: null,
          },
        },
        "Choose the first improvement that makes the material trace useful across production and quality.",
      );

    case "RESET": {
      const resetState = createInitialGameState();
      return addNotification(resetState, "The lab has been reset to its starting point.");
    }

    default:
      throw new Error(`Unknown game action: ${action.type}`);
  }
}

export function getState() {
  return cloneState(currentState);
}

export function subscribe(listener) {
  listeners.add(listener);
  listener(getState(), null);

  return () => listeners.delete(listener);
}

export function dispatch(action) {
  return commit(reduce(currentState, action));
}
