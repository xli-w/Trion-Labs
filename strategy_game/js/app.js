import {
  applySpreadsheetShuffleSimplification,
  chooseDeliveryDominoImprovement,
  chooseQualityLoopImprovement,
  chooseMissingMinutesImprovement,
  chooseSpreadsheetShuffleAutomation,
  chooseSpreadsheetShuffleStandardisation,
  closeChallengeBriefing,
  enterLab,
  identifyQualityLoopCause,
  inspectDeliveryDominoDependency,
  inspectMissingMinutesEvent,
  navigateToSection,
  resetExperience,
  returnToLanding,
  retryQualityLoopDiagnosis,
  retryQualityLoopImprovement,
  retryMissingMinutesDecision,
  retrySpreadsheetShuffleAutomation,
  retrySpreadsheetShuffleSimplification,
  retrySpreadsheetShuffleStandardisation,
  retryDeliveryDominoImprovement,
  reviewChallenge,
  selectQualityLoopNode,
  toggleSpreadsheetShuffleStep,
} from "./game.js";
import {
  bindInteractions,
  focusElementById,
  focusScreenHeading,
  render,
  scrollToSection,
} from "./ui.js";
import { subscribe } from "./state.js";
import { initializeTheme, syncThemeToggle, toggleTheme } from "../../theme.js";

initializeTheme();

subscribe((nextState, previousState) => {
  render(nextState);

  if (previousState && nextState.currentScreen !== previousState.currentScreen) {
    focusScreenHeading();
  }
});

bindInteractions({
  "enter-lab": () => {
    enterLab();
    scrollToSection("overview");
  },
  "how-it-works": () => {
    scrollToSection("how-it-works");
  },
  "toggle-theme": () => {
    toggleTheme();
    syncThemeToggle(document.querySelector("#theme-toggle"));
  },
  landing: () => {
    returnToLanding();
    scrollToSection("top");
  },
  navigate: ({ section }) => {
    navigateToSection(section);
    scrollToSection(section);
  },
  "review-challenge": ({ challengeId }) => {
    reviewChallenge(challengeId);
  },
  "close-challenge": () => {
    closeChallengeBriefing();
    scrollToSection("challenges");
  },
  "inspect-missing-minutes-event": ({ eventId }) => {
    inspectMissingMinutesEvent(eventId);
  },
  "choose-missing-minutes-improvement": ({ decisionId }) => {
    const nextState = chooseMissingMinutesImprovement(decisionId);

    if (nextState.missingMinutes.decisionId === decisionId) {
      focusElementById("missing-minutes-outcome");
    }
  },
  "retry-missing-minutes-decision": () => {
    retryMissingMinutesDecision();
    focusElementById("missing-minutes-decision");
  },
  "select-quality-loop-node": ({ nodeId }) => {
    selectQualityLoopNode(nodeId);
  },
  "identify-quality-loop-cause": ({ diagnosisId }) => {
    const nextState = identifyQualityLoopCause(diagnosisId);

    if (nextState.qualityLoop.diagnosisId === diagnosisId) {
      focusElementById("quality-loop-diagnosis-outcome");
    }
  },
  "retry-quality-loop-diagnosis": () => {
    retryQualityLoopDiagnosis();
    focusElementById("quality-loop-diagnosis");
  },
  "choose-quality-loop-improvement": ({ decisionId }) => {
    const nextState = chooseQualityLoopImprovement(decisionId);

    if (nextState.qualityLoop.improvementId === decisionId) {
      focusElementById("quality-loop-outcome");
    }
  },
  "retry-quality-loop-improvement": () => {
    retryQualityLoopImprovement();
    focusElementById("quality-loop-decision");
  },
  "toggle-spreadsheet-shuffle-step": ({ stepId }) => {
    toggleSpreadsheetShuffleStep(stepId);
  },
  "apply-spreadsheet-shuffle-simplification": () => {
    const nextState = applySpreadsheetShuffleSimplification();

    if (
      nextState.spreadsheetShuffle.simplificationComplete ||
      nextState.spreadsheetShuffle.simplificationError
    ) {
      focusElementById("spreadsheet-simplification-outcome");
    }
  },
  "retry-spreadsheet-shuffle-simplification": () => {
    retrySpreadsheetShuffleSimplification();
    focusElementById("spreadsheet-shuffle-workflow");
  },
  "choose-spreadsheet-shuffle-standardisation": ({ optionId }) => {
    const nextState = chooseSpreadsheetShuffleStandardisation(optionId);

    if (nextState.spreadsheetShuffle.standardisationId === optionId) {
      focusElementById("spreadsheet-standardisation-outcome");
    }
  },
  "retry-spreadsheet-shuffle-standardisation": () => {
    retrySpreadsheetShuffleStandardisation();
    focusElementById("spreadsheet-standardisation");
  },
  "choose-spreadsheet-shuffle-automation": ({ optionId }) => {
    const nextState = chooseSpreadsheetShuffleAutomation(optionId);

    if (nextState.spreadsheetShuffle.automationId === optionId) {
      focusElementById("spreadsheet-automation-outcome");
    }
  },
  "retry-spreadsheet-shuffle-automation": () => {
    retrySpreadsheetShuffleAutomation();
    focusElementById("spreadsheet-automation");
  },
  "inspect-delivery-domino-dependency": ({ dependencyId }) => {
    inspectDeliveryDominoDependency(dependencyId);
  },
  "choose-delivery-domino-improvement": ({ decisionId }) => {
    const nextState = chooseDeliveryDominoImprovement(decisionId);

    if (nextState.deliveryDomino.decisionId === decisionId) {
      focusElementById("delivery-domino-outcome");
    }
  },
  "retry-delivery-domino-improvement": () => {
    retryDeliveryDominoImprovement();
    focusElementById("delivery-domino-decision");
  },
  reset: () => {
    resetExperience();
    scrollToSection("top");
  },
});
