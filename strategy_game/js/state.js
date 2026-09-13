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
import {
  getSpreadsheetShuffleAutomationById,
  getSpreadsheetShuffleRemovalStatus,
  getSpreadsheetShuffleStandardisationById,
  getSpreadsheetShuffleStepById,
  isSpreadsheetShuffleSimplified,
  isSpreadsheetShuffleStandardised,
  spreadsheetShuffleChallengeId,
} from "./miniGames/spreadsheetShuffle.js";
import {
  deliveryDominoChallengeId,
  getDeliveryDominoDecisionById,
  getDeliveryDominoDependencyById,
  isDeliveryDominoDependencyAvailable,
  isDeliveryDominoReadyForDecision,
} from "./miniGames/deliveryDomino.js";
import {
  controlRoomChallengeId,
  getControlRoomAudienceById,
  getControlRoomAudienceSelectionStatus,
  getControlRoomDecisionById,
  getControlRoomSignalById,
  getControlRoomSignalSelectionStatus,
  isControlRoomReadyForDecision,
} from "./miniGames/controlRoom.js";

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
    spreadsheetShuffle: {
      ...state.spreadsheetShuffle,
      selectedStepIds: [...state.spreadsheetShuffle.selectedStepIds],
    },
    deliveryDomino: {
      ...state.deliveryDomino,
      inspectedDependencyIds: [...state.deliveryDomino.inspectedDependencyIds],
    },
    controlRoom: {
      ...state.controlRoom,
      selectedSignalIds: [...state.controlRoom.selectedSignalIds],
      prioritizedAudienceIds: [...state.controlRoom.prioritizedAudienceIds],
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
  if (
    completedChallenges.includes("improvement-challenge") &&
    unlockedUpgrades.includes("continuous-improvement")
  ) {
    return 5;
  }

  if (completedChallenges.includes("spreadsheet-shuffle")) {
    return 4;
  }

  if (completedChallenges.includes("quality-loop")) {
    return 3;
  }

  if (completedChallenges.includes("missing-minutes")) {
    return 2;
  }

  return 1;
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

    case "TOGGLE_SPREADSHEET_SHUFFLE_STEP": {
      const step = getSpreadsheetShuffleStepById(action.stepId);

      if (!step) {
        throw new Error(`Unknown Spreadsheet Shuffle workflow step: ${action.stepId}`);
      }

      if (state.completedChallenges.includes(spreadsheetShuffleChallengeId)) {
        return addNotification(
          state,
          "The Spreadsheet Shuffle is already complete. Review the Workflow Automation outcome from the challenge map.",
        );
      }

      const progress = state.spreadsheetShuffle;

      if (isSpreadsheetShuffleSimplified(progress)) {
        return addNotification(
          state,
          "Duplicate work has already been removed. Continue by standardising the planning route.",
        );
      }

      const selectionStatus = getSpreadsheetShuffleRemovalStatus(progress);
      const selected = progress.selectedStepIds.includes(step.id);

      if (!selected && selectionStatus.selectedCount >= selectionStatus.removalBudget) {
        const simplificationError =
          "The simplification budget covers two steps. Clear one selection before reviewing another activity.";

        return addNotification(
          {
            ...state,
            spreadsheetShuffle: {
              ...progress,
              selectionError: simplificationError,
            },
          },
          simplificationError,
        );
      }

      const selectedStepIds = selected
        ? progress.selectedStepIds.filter((stepId) => stepId !== step.id)
        : [...progress.selectedStepIds, step.id];

      return addNotification(
        {
          ...state,
          spreadsheetShuffle: {
            ...progress,
            selectedStepIds,
            selectionError: null,
            simplificationError: null,
          },
        },
        selected
          ? `${step.label} is no longer marked for removal.`
          : `${step.label} is marked for the simplification review.`,
      );
    }

    case "APPLY_SPREADSHEET_SHUFFLE_SIMPLIFICATION": {
      if (state.completedChallenges.includes(spreadsheetShuffleChallengeId)) {
        return addNotification(
          state,
          "The Spreadsheet Shuffle is already complete. Review the Workflow Automation outcome from the challenge map.",
        );
      }

      const progress = state.spreadsheetShuffle;

      if (isSpreadsheetShuffleSimplified(progress)) {
        return addNotification(
          state,
          "Duplicate work has already been removed. Continue by standardising the planning route.",
        );
      }

      const selectionStatus = getSpreadsheetShuffleRemovalStatus(progress);

      if (!selectionStatus.canApply) {
        const simplificationError =
          "Select two activities before testing which duplicated work should be removed.";

        return addNotification(
          {
            ...state,
            spreadsheetShuffle: {
              ...progress,
              selectionError: null,
              simplificationError,
            },
          },
          simplificationError,
        );
      }

      if (!selectionStatus.hasRequiredSteps) {
        const simplificationError =
          "Those choices may change a handoff, but the repeated production figures and manual reconciliation remain. Remove Copy production figures and Reconcile differences first.";

        return addNotification(
          {
            ...state,
            spreadsheetShuffle: {
              ...progress,
              selectionError: null,
              simplificationError,
            },
          },
          simplificationError,
        );
      }

      return addNotification(
        {
          ...state,
          spreadsheetShuffle: {
            ...progress,
            simplificationComplete: true,
            selectionError: null,
            simplificationError: null,
            standardisationId: null,
            standardisationError: null,
            automationId: null,
            automationError: null,
          },
        },
        "Duplicate spreadsheet work is removed. The planning route is shorter and ready to standardise.",
      );
    }

    case "RETRY_SPREADSHEET_SHUFFLE_SIMPLIFICATION":
      if (state.completedChallenges.includes(spreadsheetShuffleChallengeId)) {
        return addNotification(
          state,
          "The Spreadsheet Shuffle is already complete. Review the Workflow Automation outcome from the challenge map.",
        );
      }

      return addNotification(
        {
          ...state,
          spreadsheetShuffle: {
            ...state.spreadsheetShuffle,
            selectedStepIds: [],
            selectionError: null,
            simplificationError: null,
          },
        },
        "Review which activities copy or reconcile the same information before choosing another pair.",
      );

    case "CHOOSE_SPREADSHEET_SHUFFLE_STANDARDISATION": {
      const option = getSpreadsheetShuffleStandardisationById(action.optionId);

      if (!option) {
        throw new Error(
          `Unknown Spreadsheet Shuffle standardisation option: ${action.optionId}`,
        );
      }

      if (state.completedChallenges.includes(spreadsheetShuffleChallengeId)) {
        return addNotification(
          state,
          "The Spreadsheet Shuffle is already complete. Review the Workflow Automation outcome from the challenge map.",
        );
      }

      const progress = state.spreadsheetShuffle;

      if (!isSpreadsheetShuffleSimplified(progress)) {
        const standardisationError =
          "Remove the duplicated work before choosing how the smaller planning route should be standardised.";

        return addNotification(
          {
            ...state,
            spreadsheetShuffle: {
              ...progress,
              standardisationError,
            },
          },
          standardisationError,
        );
      }

      const nextState = {
        ...state,
        spreadsheetShuffle: {
          ...progress,
          standardisationId: option.id,
          standardisationError: null,
          automationId: null,
          automationError: null,
        },
      };

      return addNotification(nextState, option.announcement);
    }

    case "RETRY_SPREADSHEET_SHUFFLE_STANDARDISATION":
      if (state.completedChallenges.includes(spreadsheetShuffleChallengeId)) {
        return addNotification(
          state,
          "The Spreadsheet Shuffle is already complete. Review the Workflow Automation outcome from the challenge map.",
        );
      }

      return addNotification(
        {
          ...state,
          spreadsheetShuffle: {
            ...state.spreadsheetShuffle,
            standardisationId: null,
            standardisationError: null,
            automationId: null,
            automationError: null,
          },
        },
        "Choose the planning route that checks source context before creating and sharing one update.",
      );

    case "CHOOSE_SPREADSHEET_SHUFFLE_AUTOMATION": {
      const option = getSpreadsheetShuffleAutomationById(action.optionId);

      if (!option) {
        throw new Error(`Unknown Spreadsheet Shuffle automation option: ${action.optionId}`);
      }

      if (state.completedChallenges.includes(spreadsheetShuffleChallengeId)) {
        return addNotification(
          state,
          "The Spreadsheet Shuffle is already complete. Review the Workflow Automation outcome from the challenge map.",
        );
      }

      const progress = state.spreadsheetShuffle;

      if (!isSpreadsheetShuffleStandardised(progress)) {
        const automationError =
          "Set one source-led planning route before choosing which work should be automated.";

        return addNotification(
          {
            ...state,
            spreadsheetShuffle: {
              ...progress,
              automationError,
            },
          },
          automationError,
        );
      }

      const nextState = {
        ...state,
        spreadsheetShuffle: {
          ...progress,
          automationId: option.id,
          automationError: null,
        },
      };

      if (!option.completesChallenge) {
        return addNotification(nextState, option.announcement);
      }

      const completedState = applyChallengeCompletion(nextState, {
        challengeId: spreadsheetShuffleChallengeId,
        decision: {
          id: option.id,
          title: option.title,
        },
        kpiChanges: option.kpiChanges,
        resourceCosts: option.resourceCosts,
        unlockIds: option.unlockIds,
      });

      return addNotification(completedState, option.announcement);
    }

    case "RETRY_SPREADSHEET_SHUFFLE_AUTOMATION":
      if (state.completedChallenges.includes(spreadsheetShuffleChallengeId)) {
        return addNotification(
          state,
          "The Spreadsheet Shuffle is already complete. Review the Workflow Automation outcome from the challenge map.",
        );
      }

      return addNotification(
        {
          ...state,
          spreadsheetShuffle: {
            ...state.spreadsheetShuffle,
            automationId: null,
            automationError: null,
          },
        },
        "Choose the automation that carries the standard source context into the schedule update.",
      );

    case "INSPECT_DELIVERY_DOMINO_DEPENDENCY": {
      const dependency = getDeliveryDominoDependencyById(action.dependencyId);

      if (!dependency) {
        throw new Error(`Unknown Delivery Domino dependency: ${action.dependencyId}`);
      }

      if (state.completedChallenges.includes(deliveryDominoChallengeId)) {
        return addNotification(
          state,
          "The Delivery Domino is already complete. Review the Logistics + Production Visibility outcome from the challenge map.",
        );
      }

      const progress = state.deliveryDomino;

      if (!isDeliveryDominoDependencyAvailable(dependency.id, progress)) {
        const prerequisite = getDeliveryDominoDependencyById(dependency.dependsOn);

        if (!prerequisite) {
          throw new Error(`Missing Delivery Domino prerequisite: ${dependency.dependsOn}`);
        }

        const traceError = `Trace ${prerequisite.label} before ${dependency.label}; it carries the context this step needs.`;

        return addNotification(
          {
            ...state,
            deliveryDomino: {
              ...progress,
              traceError,
            },
          },
          traceError,
        );
      }

      const alreadyTraced = progress.inspectedDependencyIds.includes(dependency.id);
      const inspectedDependencyIds = alreadyTraced
        ? progress.inspectedDependencyIds
        : [...progress.inspectedDependencyIds, dependency.id];
      const nextState = {
        ...state,
        deliveryDomino: {
          ...progress,
          selectedDependencyId: dependency.id,
          inspectedDependencyIds,
          traceError: null,
          decisionError: null,
        },
      };

      return addNotification(
        nextState,
        alreadyTraced
          ? `${dependency.label} remains part of the traced dependency chain.`
          : `${dependency.label} traced. ${dependency.announcement}`,
      );
    }

    case "CHOOSE_DELIVERY_DOMINO_IMPROVEMENT": {
      const decision = getDeliveryDominoDecisionById(action.decisionId);

      if (!decision) {
        throw new Error(`Unknown Delivery Domino improvement: ${action.decisionId}`);
      }

      if (state.completedChallenges.includes(deliveryDominoChallengeId)) {
        return addNotification(
          state,
          "The Delivery Domino is already complete. Review the Logistics + Production Visibility outcome from the challenge map.",
        );
      }

      const progress = state.deliveryDomino;

      if (!isDeliveryDominoReadyForDecision(progress)) {
        const decisionError =
          "Trace the material delay through the production schedule, capacity, customer orders, and delivery commitments before choosing an intervention.";

        return addNotification(
          {
            ...state,
            deliveryDomino: {
              ...progress,
              decisionError,
            },
          },
          decisionError,
        );
      }

      const nextState = {
        ...state,
        deliveryDomino: {
          ...progress,
          decisionId: decision.id,
          decisionError: null,
        },
      };

      if (!decision.completesChallenge) {
        return addNotification(nextState, decision.announcement);
      }

      const completedState = applyChallengeCompletion(nextState, {
        challengeId: deliveryDominoChallengeId,
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

    case "RETRY_DELIVERY_DOMINO_IMPROVEMENT":
      if (state.completedChallenges.includes(deliveryDominoChallengeId)) {
        return addNotification(
          state,
          "The Delivery Domino is already complete. Review the Logistics + Production Visibility outcome from the challenge map.",
        );
      }

      return addNotification(
        {
          ...state,
          deliveryDomino: {
            ...state.deliveryDomino,
            decisionId: null,
            decisionError: null,
          },
        },
        "Choose the intervention that connects the material exception to the work and commitments it affects.",
      );

    case "TOGGLE_CONTROL_ROOM_SIGNAL": {
      const signal = getControlRoomSignalById(action.signalId);

      if (!signal) {
        throw new Error(`Unknown Control Room signal: ${action.signalId}`);
      }

      if (state.completedChallenges.includes(controlRoomChallengeId)) {
        return addNotification(
          state,
          "The Control Room is already complete. Review the Central Operational View outcome from the challenge map.",
        );
      }

      const progress = state.controlRoom;

      if (progress.signalsConfirmed) {
        return addNotification(
          state,
          "The focused exception is already confirmed. Continue by prioritising the people who need it.",
        );
      }

      const selected = progress.selectedSignalIds.includes(signal.id);
      const signalStatus = getControlRoomSignalSelectionStatus(progress);

      if (!selected && signalStatus.selectedCount >= signalStatus.selectionLimit) {
        const signalError = `The focused exception has room for ${signalStatus.selectionLimit} signals. Remove one before selecting ${signal.label}.`;

        return addNotification(
          {
            ...state,
            controlRoom: {
              ...progress,
              signalError,
            },
          },
          signalError,
        );
      }

      const selectedSignalIds = selected
        ? progress.selectedSignalIds.filter((signalId) => signalId !== signal.id)
        : [...progress.selectedSignalIds, signal.id];

      return addNotification(
        {
          ...state,
          controlRoom: {
            ...progress,
            selectedSignalIds,
            signalError: null,
          },
        },
        selected
          ? `${signal.label} is no longer in the focused exception.`
          : `${signal.label} is included in the focused exception.`,
      );
    }

    case "CONFIRM_CONTROL_ROOM_SIGNALS": {
      if (state.completedChallenges.includes(controlRoomChallengeId)) {
        return addNotification(
          state,
          "The Control Room is already complete. Review the Central Operational View outcome from the challenge map.",
        );
      }

      const progress = state.controlRoom;

      if (progress.signalsConfirmed) {
        return addNotification(
          state,
          "The focused exception is already confirmed. Continue by prioritising the people who need it.",
        );
      }

      const signalStatus = getControlRoomSignalSelectionStatus(progress);

      if (!signalStatus.isExactSelection) {
        const missingLabels = signalStatus.missingItems.map((signal) => signal.label).join(", ");
        const extraLabels = signalStatus.extraItems.map((signal) => signal.label).join(", ");
        const signalError = missingLabels && extraLabels
          ? `Replace ${extraLabels} with ${missingLabels} to show the cause, available work, and customer consequence.`
          : missingLabels
            ? `Include ${missingLabels} to show the cause, available work, and customer consequence.`
          : `Remove ${extraLabels} and keep only the signals that change this response.`;

        return addNotification(
          {
            ...state,
            controlRoom: {
              ...progress,
              signalError,
            },
          },
          signalError,
        );
      }

      return addNotification(
        {
          ...state,
          controlRoom: {
            ...progress,
            signalsConfirmed: true,
            signalError: null,
          },
        },
        "The focused exception now keeps the material cause, work response, and customer impact together.",
      );
    }

    case "TOGGLE_CONTROL_ROOM_AUDIENCE": {
      const audience = getControlRoomAudienceById(action.audienceId);

      if (!audience) {
        throw new Error(`Unknown Control Room audience: ${action.audienceId}`);
      }

      if (state.completedChallenges.includes(controlRoomChallengeId)) {
        return addNotification(
          state,
          "The Control Room is already complete. Review the Central Operational View outcome from the challenge map.",
        );
      }

      const progress = state.controlRoom;

      if (!progress.signalsConfirmed) {
        const audienceError =
          "Confirm the focused signals before deciding who needs the priority response.";

        return addNotification(
          {
            ...state,
            controlRoom: {
              ...progress,
              audienceError,
            },
          },
          audienceError,
        );
      }

      if (progress.audiencesConfirmed) {
        return addNotification(
          state,
          "The priority response group is already confirmed. Choose how the shared view should reach it.",
        );
      }

      const selected = progress.prioritizedAudienceIds.includes(audience.id);
      const audienceStatus = getControlRoomAudienceSelectionStatus(progress);

      if (!selected && audienceStatus.selectedCount >= audienceStatus.selectionLimit) {
        const audienceError = `The priority response has room for ${audienceStatus.selectionLimit} roles. Remove one before selecting ${audience.label}.`;

        return addNotification(
          {
            ...state,
            controlRoom: {
              ...progress,
              audienceError,
            },
          },
          audienceError,
        );
      }

      const prioritizedAudienceIds = selected
        ? progress.prioritizedAudienceIds.filter((audienceId) => audienceId !== audience.id)
        : [...progress.prioritizedAudienceIds, audience.id];

      return addNotification(
        {
          ...state,
          controlRoom: {
            ...progress,
            prioritizedAudienceIds,
            audienceError: null,
          },
        },
        selected
          ? `${audience.label} no longer has a priority response view.`
          : `${audience.label} is selected for the priority response view.`,
      );
    }

    case "CONFIRM_CONTROL_ROOM_AUDIENCES": {
      if (state.completedChallenges.includes(controlRoomChallengeId)) {
        return addNotification(
          state,
          "The Control Room is already complete. Review the Central Operational View outcome from the challenge map.",
        );
      }

      const progress = state.controlRoom;

      if (!progress.signalsConfirmed) {
        const audienceError =
          "Confirm the focused signals before deciding who needs the priority response.";

        return addNotification(
          {
            ...state,
            controlRoom: {
              ...progress,
              audienceError,
            },
          },
          audienceError,
        );
      }

      if (progress.audiencesConfirmed) {
        return addNotification(
          state,
          "The priority response group is already confirmed. Choose how the shared view should reach it.",
        );
      }

      const audienceStatus = getControlRoomAudienceSelectionStatus(progress);

      if (!audienceStatus.isExactSelection) {
        const missingLabels = audienceStatus.missingItems
          .map((audience) => audience.label)
          .join(", ");
        const extraLabels = audienceStatus.extraItems.map((audience) => audience.label).join(", ");
        const audienceError = missingLabels && extraLabels
          ? `Replace ${extraLabels} with ${missingLabels} so the material, work, and customer response have clear owners.`
          : missingLabels
            ? `Prioritise ${missingLabels} so the material, work, and customer response have clear owners.`
          : `Remove ${extraLabels}; this exception does not need to interrupt every role.`;

        return addNotification(
          {
            ...state,
            controlRoom: {
              ...progress,
              audienceError,
            },
          },
          audienceError,
        );
      }

      return addNotification(
        {
          ...state,
          controlRoom: {
            ...progress,
            audiencesConfirmed: true,
            audienceError: null,
          },
        },
        "Management, production, and planning now share the priority response while other roles retain relevant detail.",
      );
    }

    case "CHOOSE_CONTROL_ROOM_DECISION": {
      const decision = getControlRoomDecisionById(action.decisionId);

      if (!decision) {
        throw new Error(`Unknown Control Room decision: ${action.decisionId}`);
      }

      if (state.completedChallenges.includes(controlRoomChallengeId)) {
        return addNotification(
          state,
          "The Control Room is already complete. Review the Central Operational View outcome from the challenge map.",
        );
      }

      const progress = state.controlRoom;

      if (!isControlRoomReadyForDecision(progress)) {
        const decisionError =
          "Focus the essential signals and confirm the priority roles before choosing how the operational view should be shared.";

        return addNotification(
          {
            ...state,
            controlRoom: {
              ...progress,
              decisionError,
            },
          },
          decisionError,
        );
      }

      const nextState = {
        ...state,
        controlRoom: {
          ...progress,
          decisionId: decision.id,
          decisionError: null,
        },
      };

      if (!decision.completesChallenge) {
        return addNotification(nextState, decision.announcement);
      }

      const completedState = applyChallengeCompletion(nextState, {
        challengeId: controlRoomChallengeId,
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

    case "RETRY_CONTROL_ROOM_DECISION":
      if (state.completedChallenges.includes(controlRoomChallengeId)) {
        return addNotification(
          state,
          "The Control Room is already complete. Review the Central Operational View outcome from the challenge map.",
        );
      }

      return addNotification(
        {
          ...state,
          controlRoom: {
            ...state.controlRoom,
            decisionId: null,
            decisionError: null,
          },
        },
        "Choose the approach that keeps one shared exception useful for each role.",
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
