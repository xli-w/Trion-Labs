import {
  closeChallengeBriefing,
  enterLab,
  navigateToSection,
  resetExperience,
  returnToLanding,
  reviewChallenge,
} from "./game.js";
import {
  bindInteractions,
  focusScreenHeading,
  render,
  scrollToSection,
} from "./ui.js";
import { subscribe } from "./state.js";

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
  reset: () => {
    resetExperience();
    scrollToSection("top");
  },
});
