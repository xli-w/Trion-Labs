import { renderChallengeBriefing } from "./views/challengeBriefing.js";
import { renderLabOverview } from "./views/labOverview.js";
import { renderLanding } from "./views/landing.js";
import { renderMissingMinutes } from "./views/missingMinutes.js";
import { missingMinutesChallengeId } from "./miniGames/missingMinutes.js";

const appRoot = document.querySelector("#app");
const announcementRegion = document.querySelector("#appAnnouncement");
let latestScrollRequest = 0;

if (!appRoot || !announcementRegion) {
  throw new Error("Trion Labs requires an app root and announcement region.");
}

export function render(state) {
  if (state.currentScreen === "landing") {
    appRoot.innerHTML = renderLanding(state);
    document.title = "Trion Labs | Find the friction. Build the flow.";
  } else if (state.currentScreen === "overview") {
    appRoot.innerHTML = renderLabOverview(state);
    document.title = "Trion Labs | Operational overview";
  } else if (state.activeChallengeId === missingMinutesChallengeId) {
    appRoot.innerHTML = renderMissingMinutes(state);
    document.title = "Trion Labs | The Missing Minutes";
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

  window.requestAnimationFrame(() => {
    if (requestId !== latestScrollRequest) {
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
  window.requestAnimationFrame(() => {
    const screenHeading = document.querySelector("#screen-title");

    if (screenHeading instanceof HTMLElement) {
      screenHeading.focus({ preventScroll: true });
    }
  });
}

export function focusElementById(elementId) {
  window.requestAnimationFrame(() => {
    const element = document.getElementById(elementId);

    if (!(element instanceof HTMLElement)) {
      throw new Error(`Cannot focus missing element: ${elementId}`);
    }

    element.focus({ preventScroll: true });
  });
}
