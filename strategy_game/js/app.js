import {
  chooseQualityLoopImprovement,
  chooseMissingMinutesImprovement,
  closeChallengeBriefing,
  enterLab,
  identifyQualityLoopCause,
  inspectMissingMinutesEvent,
  navigateToSection,
  resetExperience,
  returnToLanding,
  retryQualityLoopDiagnosis,
  retryQualityLoopImprovement,
  retryMissingMinutesDecision,
  reviewChallenge,
  selectQualityLoopNode,
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
  reset: () => {
    resetExperience();
    scrollToSection("top");
  },
});
