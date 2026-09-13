import { initializeTheme, syncThemeToggle, toggleTheme } from "./theme.js";

initializeTheme();

const stations = [
  {
    id: "Infeed",
    number: "01",
    description: "Ingredients are weighed and staged before they enter the mixer.",
    range: "42 kg per batch",
    context: "Order + Recipe",
    idleDetail: "Ingredients Staged",
    activeDetail: "Weighing Ingredients",
    next: "Blend",
    handoffDetail: "Ingredients are ready for the mixer.",
    eventTitle: "Infeed released the next ingredient set",
    eventCopy: "The mix is moving to Blend with the correct weight.",
    eventTone: "event-mark-blue",
  },
  {
    id: "Blend",
    number: "02",
    description: "The mixer combines the staged ingredients to the current recipe.",
    range: "18-22 rpm",
    context: "Machine Signal",
    idleDetail: "Recipe Loaded",
    activeDetail: "Mixing to Recipe",
    next: "Pack",
    handoffDetail: "The finished mix is ready for packing.",
    eventTitle: "Blend completed a recipe cycle",
    eventCopy: "The mixer has passed a consistent batch to Pack.",
    eventTone: "event-mark-purple",
  },
  {
    id: "Pack",
    number: "03",
    description: "Each bar is portioned, sealed, and checked before it leaves the line.",
    range: "42 g +/- 0.5 g",
    context: "Quality Check",
    idleDetail: "Sealer Ready",
    activeDetail: "Sealing Packs",
    next: "Dispatch",
    handoffDetail: "The next pack is ready for the pallet lane.",
    eventTitle: "Pack sealed the next set",
    eventCopy: "Portion weight and seal checks are within range.",
    eventTone: "event-mark-green",
  },
  {
    id: "Dispatch",
    number: "04",
    description: "Finished packs are grouped and sent to the clear pallet lane.",
    range: "24 packs per case",
    context: "Dispatch Status",
    idleDetail: "Pallet Lane Clear",
    activeDetail: "Routing Finished Packs",
    next: "Infeed",
    handoffDetail: "The route is ready for the next ingredient set.",
    eventTitle: "Dispatch cleared a finished pack",
    eventCopy: "The pallet lane routed the completed pack and released the line for the next ingredient set.",
    eventTone: "event-mark-green",
  },
];

const batchTarget = 400;
const initialSelectedStation = "Blend";

const initialValues = {
  completed: 128,
  quality: 98.6,
  pace: 2,
  step: 0,
};

function createInitialState() {
  return {
    ...initialValues,
    running: false,
    selectedStation: initialSelectedStation,
    hasInspectedStation: false,
    hasCheckedQuality: false,
    hasRunLine: false,
    hasAdvancedHandoff: false,
    missionCompleteAnnounced: false,
    timer: null,
    toastTimer: null,
  };
}

const state = createInitialState();

const elements = {
  toggleLine: document.querySelector("#toggleLine"),
  toggleLineLabel: document.querySelector("#toggleLineLabel"),
  resetLine: document.querySelector("#resetLine"),
  themeToggle: document.querySelector("#themeToggle"),
  lineState: document.querySelector("#lineState"),
  lineStateText: document.querySelector("#lineStateText"),
  lineMessage: document.querySelector("#lineMessage"),
  runBadge: document.querySelector("#runBadge"),
  productionFloor: document.querySelector("#productionFloor"),
  stageButtons: document.querySelectorAll("[data-station]"),
  nextHandoff: document.querySelector("#nextHandoff"),
  handoffDetail: document.querySelector("#handoffDetail"),
  pace: document.querySelector("#pace"),
  paceValue: document.querySelector("#paceValue"),
  advanceStep: document.querySelector("#advanceStep"),
  qualityCheck: document.querySelector("#qualityCheck"),
  eventList: document.querySelector("#eventList"),
  eventCount: document.querySelector("#eventCount"),
  batchProgress: document.querySelector("#batchProgress"),
  batchProgressText: document.querySelector("#batchProgressText"),
  batchState: document.querySelector("#batchState"),
  completedPacks: document.querySelector("#completedPacks"),
  qualityMetric: document.querySelector("#qualityMetric"),
  lineRate: document.querySelector("#lineRate"),
  lineFooterMessage: document.querySelector("#lineFooterMessage"),
  inspectorNumber: document.querySelector("#inspectorNumber"),
  inspectorTitle: document.querySelector("#inspectorTitle"),
  inspectorDescription: document.querySelector("#inspectorDescription"),
  inspectorTask: document.querySelector("#inspectorTask"),
  inspectorRange: document.querySelector("#inspectorRange"),
  inspectorContext: document.querySelector("#inspectorContext"),
  missionSteps: document.querySelectorAll("[data-mission-step]"),
  missionProgress: document.querySelector("#missionProgress"),
  toast: document.querySelector("#toast"),
};

const paceSettings = {
  1: { label: "Calm", rate: 24, interval: 1200 },
  2: { label: "Standard", rate: 32, interval: 850 },
  3: { label: "Fast", rate: 42, interval: 560 },
};

const initialEvents = [
  {
    title: "Batch B-241 is staged",
    copy: "Ingredients are ready at Infeed.",
    tone: "event-mark-green",
    time: "Now",
  },
  {
    title: "Recipe checked",
    copy: "Blend has the correct specification.",
    tone: "event-mark-blue",
    time: "2m",
  },
  {
    title: "Dispatch lane clear",
    copy: "There is space for the next pallet.",
    tone: "event-mark-purple",
    time: "5m",
  },
];

function stationForId(stationId) {
  return stations.find((station) => station.id === stationId);
}

function currentStation() {
  const station = stations[state.step];

  if (!station) {
    throw new Error(`Invalid production step: ${state.step}`);
  }

  return station;
}

function selectedStation() {
  const station = stationForId(state.selectedStation);

  if (!station) {
    throw new Error(`Invalid selected station: ${state.selectedStation}`);
  }

  return station;
}

function currentPace() {
  const pace = paceSettings[state.pace];

  if (!pace) {
    throw new Error(`Invalid production pace: ${state.pace}`);
  }

  return pace;
}

function isValidPace(pace) {
  return Number.isInteger(pace) && Boolean(paceSettings[pace]);
}

function isBatchComplete() {
  return state.completed >= batchTarget;
}

function hasActiveRoute() {
  return state.running || state.hasAdvancedHandoff;
}

function stopTimer() {
  if (state.timer !== null) {
    window.clearInterval(state.timer);
    state.timer = null;
  }
}

function clearToast() {
  if (state.toastTimer !== null) {
    window.clearTimeout(state.toastTimer);
    state.toastTimer = null;
  }

  elements.toast.classList.remove("visible");
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-GB").format(value);
}

function batchPercent() {
  return Math.min(100, (state.completed / batchTarget) * 100);
}

function setText(element, value) {
  element.textContent = value;
}

function updateMetrics() {
  const progress = batchPercent();
  const pace = currentPace();

  setText(elements.batchProgressText, `${Math.floor(progress)}%`);
  elements.batchProgress.style.width = `${progress}%`;
  elements.completedPacks.innerHTML = `${formatNumber(state.completed)} <small>packs</small>`;
  elements.qualityMetric.innerHTML = `${state.quality.toFixed(1)}<small>%</small>`;
  elements.lineRate.innerHTML = `${pace.rate} <small>/ min</small>`;
}

function updatePace() {
  const pace = currentPace();
  const progress = ((state.pace - 1) / 2) * 100;

  elements.pace.value = String(state.pace);
  elements.paceValue.textContent = pace.label;
  elements.pace.style.background = `linear-gradient(90deg, var(--blue) 0 ${progress}%, var(--pace-track) ${progress}% 100%)`;
  updateMetrics();
}

function updateRunState() {
  const running = state.running;
  const batchComplete = isBatchComplete();

  elements.productionFloor.classList.toggle("is-running", running);
  elements.toggleLine.classList.toggle("is-running", running);
  elements.lineState.classList.toggle("is-running", running);
  elements.runBadge.classList.toggle("is-running", running);
  elements.toggleLine.disabled = batchComplete;
  elements.pace.disabled = batchComplete;
  elements.advanceStep.disabled = running || batchComplete;
  elements.qualityCheck.disabled = state.hasCheckedQuality || batchComplete;
  elements.toggleLineLabel.textContent = batchComplete ? "Batch Complete" : running ? "Pause Line" : "Start Line";
  elements.lineStateText.textContent = batchComplete ? "Complete" : running ? "Running" : "Paused";
  elements.runBadge.lastElementChild.textContent = batchComplete ? "Complete" : running ? "Running" : "Ready";
  elements.batchState.textContent = batchComplete ? "Complete" : "In Production";
  elements.advanceStep.textContent = batchComplete ? "Batch Complete" : "Advance One Handoff";
  elements.qualityCheck.textContent = state.hasCheckedQuality ? "Quality Checked" : "Run Quality Check";
}

function updateStages() {
  const activeStation = currentStation();
  const batchComplete = isBatchComplete();
  const routeActive = hasActiveRoute();

  elements.stageButtons.forEach((button) => {
    const station = stationForId(button.dataset.station);

    if (!station) {
      throw new Error(`Unknown station control: ${button.dataset.station}`);
    }

    const stationIndex = stations.indexOf(station);
    const isCurrent = routeActive && !batchComplete && station.id === activeStation.id;
    const isComplete = batchComplete || (routeActive && stationIndex < state.step);
    const detail = button.querySelector(".stage-detail");
    const status = button.querySelector(".stage-status");

    button.classList.toggle("is-active", isCurrent);
    button.classList.toggle("is-complete", isComplete);
    detail.textContent = isCurrent && state.running ? station.activeDetail : station.idleDetail;
    status.textContent = isCurrent ? (state.running ? "Working" : "Paused") : isComplete ? "Done" : "Ready";
  });

  if (batchComplete) {
    elements.nextHandoff.textContent = "Batch complete";
    elements.handoffDetail.textContent = `${formatNumber(batchTarget)} packs have reached Dispatch. Reset the line to begin a new batch.`;
    elements.lineFooterMessage.textContent = "Batch target reached. Reset the line to begin again.";
    return;
  }

  elements.nextHandoff.textContent = `${activeStation.id} to ${activeStation.next}`;
  elements.handoffDetail.textContent = activeStation.handoffDetail;
  elements.lineFooterMessage.textContent = state.running
    ? `${activeStation.id} is active. The next handoff is visible on the line.`
    : routeActive
      ? `${activeStation.id} is paused. The next handoff is visible on the line.`
    : "Select a station to see what it is doing.";
}

function updateInspector() {
  const station = selectedStation();
  const isCurrent = station.id === currentStation().id && hasActiveRoute();

  elements.stageButtons.forEach((button) => {
    const selected = button.dataset.station === station.id;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  elements.inspectorNumber.textContent = station.number;
  elements.inspectorTitle.textContent = station.id;
  elements.inspectorDescription.textContent = station.description;
  elements.inspectorTask.textContent =
    isCurrent && state.running ? station.activeDetail : station.idleDetail;
  elements.inspectorRange.textContent = station.range;
  elements.inspectorContext.textContent = station.context;
}

function updateMission() {
  const milestones = {
    inspect: state.hasInspectedStation,
    quality: state.hasCheckedQuality,
    run: state.hasRunLine,
  };
  const completed = Object.values(milestones).filter(Boolean).length;

  elements.missionSteps.forEach((step) => {
    step.classList.toggle("is-complete", milestones[step.dataset.missionStep]);
  });
  elements.missionProgress.textContent = completed === 3 ? "Complete" : `${completed} of 3 complete`;

  if (completed === 3 && !state.missionCompleteAnnounced) {
    state.missionCompleteAnnounced = true;
    showToast("Guided demo complete. You have connected the key Fabric context.");
  }
}

function createEvent(event) {
  const item = document.createElement("li");
  const marker = document.createElement("span");
  const copy = document.createElement("div");
  const title = document.createElement("strong");
  const description = document.createElement("p");
  const time = document.createElement("time");

  marker.className = `event-mark ${event.tone}`;
  marker.setAttribute("aria-hidden", "true");
  title.textContent = event.title;
  description.textContent = event.copy;
  time.textContent = event.time;
  copy.append(title, description);
  item.append(marker, copy, time);

  return item;
}

function renderEvents(events) {
  elements.eventList.replaceChildren(...events.map(createEvent));
  elements.eventCount.textContent = `${events.length} ${events.length === 1 ? "note" : "notes"}`;
}

function addEvent(event) {
  elements.eventList.prepend(createEvent({ ...event, time: "Now" }));

  while (elements.eventList.children.length > 3) {
    elements.eventList.lastElementChild.remove();
  }

  const noteCount = elements.eventList.children.length;
  elements.eventCount.textContent = `${noteCount} ${noteCount === 1 ? "note" : "notes"}`;
}

function showToast(message) {
  clearToast();
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  state.toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
    state.toastTimer = null;
  }, 3000);
}

function reportUnavailableAction(message) {
  elements.lineMessage.textContent = message;
  showToast(message);
}

function updateAll() {
  updatePace();
  updateRunState();
  updateStages();
  updateInspector();
  updateMission();
}

function advanceLine(manual = false) {
  if (isBatchComplete()) {
    if (manual) {
      reportUnavailableAction("Batch B-241 is complete. Reset the line to begin a new batch.");
    }

    return false;
  }

  if (manual && state.running) {
    reportUnavailableAction("Pause the line before advancing one handoff manually.");
    return false;
  }

  if (!manual && !state.running) {
    stopTimer();
    return false;
  }

  const station = currentStation();
  let batchComplete = false;
  state.hasAdvancedHandoff = true;

  if (station.id === "Dispatch") {
    state.completed = Math.min(batchTarget, state.completed + 1);
    batchComplete = isBatchComplete();
  }

  state.step = (state.step + 1) % stations.length;
  const nextStation = currentStation();

  const event = {
    title: station.eventTitle,
    copy: station.eventCopy,
    tone: station.eventTone,
  };
  addEvent(event);

  if (batchComplete) {
    completeBatch();
    return "complete";
  }

  updateMetrics();
  updateStages();
  updateInspector();

  const message = manual
    ? `Advanced from ${station.id} to ${nextStation.id}.`
    : `${station.id} handed the product to ${nextStation.id}.`;
  elements.lineMessage.textContent = message;

  return "advanced";
}

function completeBatch() {
  state.running = false;
  stopTimer();
  updateAll();

  const message = `Batch B-241 has reached the target of ${formatNumber(batchTarget)} packs. Reset the line to begin a new batch.`;
  elements.lineMessage.textContent = message;
  showToast(`Batch target reached at ${formatNumber(batchTarget)} packs.`);
}

function startTimer() {
  stopTimer();

  if (!state.running || isBatchComplete()) {
    return;
  }

  state.timer = window.setInterval(() => advanceLine(), currentPace().interval);
}

function toggleLine() {
  if (isBatchComplete()) {
    reportUnavailableAction("Batch B-241 is complete. Reset the line to begin a new batch.");
    return;
  }

  state.running = !state.running;

  if (state.running) {
    state.hasRunLine = true;
    startTimer();
    elements.lineMessage.textContent = `${currentStation().id} is starting the next handoff.`;
    addEvent({
      title: "The line is running",
      copy: `${currentStation().id} has started the next product route.`,
      tone: "event-mark-blue",
    });
  } else {
    stopTimer();
    elements.lineMessage.textContent = "The line is paused at the current handoff.";
  }

  updateRunState();
  updateStages();
  updateInspector();
  updateMission();
}

function toggleColorTheme() {
  toggleTheme();
  syncThemeToggle(elements.themeToggle);
}

function setPace(value) {
  const pace = Number(value);

  if (!isValidPace(pace)) {
    elements.pace.value = String(state.pace);
    reportUnavailableAction("Select a valid production pace.");
    return false;
  }

  if (isBatchComplete()) {
    elements.pace.value = String(state.pace);
    reportUnavailableAction("Batch B-241 is complete. Reset the line to begin a new batch.");
    return false;
  }

  state.pace = pace;
  updatePace();

  if (state.running) {
    startTimer();
  }

  showToast(`${currentPace().label} pace selected.`);
  return true;
}

function selectStation(stationId) {
  const station = stationForId(stationId);

  if (!station) {
    reportUnavailableAction("That station is unavailable. Select a station on this line.");
    return false;
  }

  state.selectedStation = station.id;
  state.hasInspectedStation = true;
  updateInspector();
  updateMission();

  if (isBatchComplete()) {
    updateStages();
  } else {
    elements.lineFooterMessage.textContent = `${station.id} is selected. Its current task is shown below.`;
  }

  return true;
}

function runQualityCheck() {
  if (isBatchComplete()) {
    reportUnavailableAction("Batch B-241 is complete. Reset the line to begin a new batch.");
    return false;
  }

  if (state.hasCheckedQuality) {
    reportUnavailableAction("Quality has already been checked for this batch.");
    return false;
  }

  state.quality = Math.min(99.4, state.quality + 0.2);
  state.hasCheckedQuality = true;
  updateMetrics();
  updateRunState();
  addEvent({
    title: "Quality check passed",
    copy: `First-pass yield is now reading ${state.quality.toFixed(1)}%.`,
    tone: "event-mark-green",
  });
  elements.lineMessage.textContent = "Quality check complete. All sampled packs are within range.";
  showToast("Quality check passed. The line is within range.");
  updateMission();

  return true;
}

function resetLine() {
  stopTimer();
  clearToast();
  Object.assign(state, createInitialState());

  renderEvents(initialEvents);
  updateAll();
  elements.lineMessage.textContent = "Ready to start batch B-241.";
  showToast("The line is back at its starting point.");
}

elements.toggleLine.addEventListener("click", toggleLine);
elements.resetLine.addEventListener("click", resetLine);
elements.themeToggle.addEventListener("click", toggleColorTheme);

elements.stageButtons.forEach((button) => {
  button.addEventListener("click", () => selectStation(button.dataset.station));
});

elements.pace.addEventListener("input", () => {
  setPace(elements.pace.value);
});

elements.advanceStep.addEventListener("click", () => {
  if (advanceLine(true) === "advanced") {
    showToast("One handoff advanced.");
  }
});

elements.qualityCheck.addEventListener("click", runQualityCheck);

renderEvents(initialEvents);
updateAll();
syncThemeToggle(elements.themeToggle);
