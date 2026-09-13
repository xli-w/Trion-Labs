import { renderChallengeBriefing } from "./views/challengeBriefing.js";
import { renderLabOverview } from "./views/labOverview.js";
import { renderLanding } from "./views/landing.js";
import { renderMissingMinutes } from "./views/missingMinutes.js";
import { renderQualityLoop } from "./views/qualityLoop.js";
import { renderSpreadsheetShuffle } from "./views/spreadsheetShuffle.js";
import { renderDeliveryDomino } from "./views/deliveryDomino.js";
import { missingMinutesChallengeId } from "./miniGames/missingMinutes.js";
import { qualityLoopChallengeId } from "./miniGames/qualityLoop.js";
import { spreadsheetShuffleChallengeId } from "./miniGames/spreadsheetShuffle.js";
import { deliveryDominoChallengeId } from "./miniGames/deliveryDomino.js";
import { getChallengeReadiness } from "./miniGames/registry.js";

const appRoot = document.querySelector("#app");
const announcementRegion = document.querySelector("#appAnnouncement");
let latestScrollRequest = 0;
let renderVersion = 0;

if (!appRoot || !announcementRegion) {
  throw new Error("Trion Labs requires an app root and announcement region.");
}

function canRenderInteractiveChallenge(state, challengeId) {
  const readiness = getChallengeReadiness(challengeId, state);

  return readiness.canLaunch || readiness.completed;
}

export function render(state) {
  renderVersion += 1;

  if (state.currentScreen === "landing") {
    appRoot.innerHTML = renderLanding(state);
    document.title = "Trion Labs | Find the friction. Build the flow.";
  } else if (state.currentScreen === "overview") {
    appRoot.innerHTML = renderLabOverview(state);
    document.title = "Trion Labs | Operational overview";
  } else if (state.activeChallengeId === missingMinutesChallengeId) {
    appRoot.innerHTML = renderMissingMinutes(state);
    document.title = "Trion Labs | The Missing Minutes";
  } else if (
    state.activeChallengeId === qualityLoopChallengeId &&
    canRenderInteractiveChallenge(state, qualityLoopChallengeId)
  ) {
    appRoot.innerHTML = renderQualityLoop(state);
    document.title = "Trion Labs | The Quality Loop";
  } else if (
    state.activeChallengeId === spreadsheetShuffleChallengeId &&
    canRenderInteractiveChallenge(state, spreadsheetShuffleChallengeId)
  ) {
    appRoot.innerHTML = renderSpreadsheetShuffle(state);
    document.title = "Trion Labs | The Spreadsheet Shuffle";
  } else if (
    state.activeChallengeId === deliveryDominoChallengeId &&
    canRenderInteractiveChallenge(state, deliveryDominoChallengeId)
  ) {
    appRoot.innerHTML = renderDeliveryDomino(state);
    document.title = "Trion Labs | The Delivery Domino";
  } else {
    appRoot.innerHTML = renderChallengeBriefing(state);
    document.title = "Trion Labs | Challenge briefing";
  }

  announcementRegion.textContent = state.announcement;
}

export function bindInteractions(handlers) {
  appRoot.addEventListener("click", (event) => {
    const control = event.target.closest("[data-action]");

    if (!control || !appRoot.contains(control)) {
      return;
    }

    const handler = handlers[control.dataset.action];

    if (!handler) {
      return;
    }

    event.preventDefault();
    handler(control.dataset);
  });
}

export function scrollToSection(sectionId) {
  const requestId = latestScrollRequest + 1;
  latestScrollRequest = requestId;
  const requestedRenderVersion = renderVersion;

  window.requestAnimationFrame(() => {
    if (requestId !== latestScrollRequest || requestedRenderVersion !== renderVersion) {
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) {
      throw new Error(`Cannot scroll to missing section: ${sectionId}`);
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
}

export function focusScreenHeading() {
  const requestedRenderVersion = renderVersion;

  window.requestAnimationFrame(() => {
    if (requestedRenderVersion !== renderVersion) {
      return;
    }

    const screenHeading = document.querySelector("#screen-title");

    if (screenHeading instanceof HTMLElement) {
      screenHeading.focus({ preventScroll: true });
    }
  });
}

export function focusElementById(elementId) {
  const requestedRenderVersion = renderVersion;

  window.requestAnimationFrame(() => {
    if (requestedRenderVersion !== renderVersion) {
      return;
    }

    const element = document.getElementById(elementId);

    if (!(element instanceof HTMLElement)) {
      throw new Error(`Cannot focus missing element: ${elementId}`);
    }

    element.focus({ preventScroll: true });
  });
}
