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
    eventTitle: "A finished pack reached Dispatch",
    eventCopy: "The pallet lane accepted the next completed pack.",
    eventTone: "event-mark-green",
  },
];

const initialValues = {
  completed: 128,
  quality: 98.6,
  pace: 2,
  step: 0,
};

const state = {
  ...initialValues,
  running: false,
  selectedStation: "Blend",
  hasInspectedStation: false,
  hasCheckedQuality: false,
  hasRunLine: false,
  missionCompleteAnnounced: false,
  timer: null,
  toastTimer: null,
};

const elements = {
  toggleLine: document.querySelector("#toggleLine"),
  toggleLineLabel: document.querySelector("#toggleLineLabel"),
  resetLine: document.querySelector("#resetLine"),
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

function currentStation() {
  return stations[state.step];
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-GB").format(value);
}

function batchPercent() {
  return Math.min(100, (state.completed / 400) * 100);
}

function setText(element, value) {
  element.textContent = value;
}

function updateMetrics() {
  const progress = batchPercent();
  const pace = paceSettings[state.pace];

  setText(elements.batchProgressText, `${Math.round(progress)}%`);
  elements.batchProgress.style.width = `${progress}%`;
  elements.completedPacks.innerHTML = `${formatNumber(state.completed)} <small>packs</small>`;
  elements.qualityMetric.innerHTML = `${state.quality.toFixed(1)}<small>%</small>`;
  elements.lineRate.innerHTML = `${pace.rate} <small>/ min</small>`;
}

function updatePace() {
  const pace = paceSettings[state.pace];
  const progress = ((state.pace - 1) / 2) * 100;

  elements.pace.value = String(state.pace);
  elements.paceValue.textContent = pace.label;
  elements.pace.style.background = `linear-gradient(90deg, var(--blue) 0 ${progress}%, #dad3df ${progress}% 100%)`;
  updateMetrics();
}

function updateRunState() {
  const running = state.running;

  elements.productionFloor.classList.toggle("is-running", running);
  elements.toggleLine.classList.toggle("is-running", running);
  elements.lineState.classList.toggle("is-running", running);
  elements.runBadge.classList.toggle("is-running", running);
  elements.toggleLineLabel.textContent = running ? "Pause Line" : "Start Line";
  elements.lineStateText.textContent = running ? "Running" : "Paused";
  elements.runBadge.lastElementChild.textContent = running ? "Running" : "Ready";
  elements.advanceStep.disabled = running;
}

function updateStages() {
  const activeStation = currentStation();

  elements.stageButtons.forEach((button, index) => {
    const station = stations[index];
    const isActive = state.running && station.id === activeStation.id;
    const isComplete = state.running && index < state.step;
    const detail = button.querySelector(".stage-detail");
    const status = button.querySelector(".stage-status");

    button.classList.toggle("is-active", isActive);
    button.classList.toggle("is-complete", isComplete);
    detail.textContent = isActive ? station.activeDetail : station.idleDetail;
    status.textContent = isActive ? "Working" : isComplete ? "Done" : "Ready";
  });

  elements.nextHandoff.textContent = `${activeStation.id} to ${activeStation.next}`;
  elements.handoffDetail.textContent = activeStation.handoffDetail;
  elements.lineFooterMessage.textContent = state.running
    ? `${activeStation.id} is active. The next handoff is visible on the line.`
    : "Select a station to see what it is doing.";
}

function updateInspector() {
  const station = stations.find((item) => item.id === state.selectedStation);
  const isActive = station.id === currentStation().id && state.running;

  elements.stageButtons.forEach((button) => {
    const selected = button.dataset.station === station.id;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  elements.inspectorNumber.textContent = station.number;
  elements.inspectorTitle.textContent = station.id;
  elements.inspectorDescription.textContent = station.description;
  elements.inspectorTask.textContent = isActive ? station.activeDetail : station.idleDetail;
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
  window.clearTimeout(state.toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  state.toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 3000);
}

function updateAll() {
  updatePace();
  updateRunState();
  updateStages();
  updateInspector();
  updateMission();
}

function advanceLine(manual = false) {
  const station = currentStation();

  if (station.id === "Dispatch") {
    state.completed += 1;
  }

  state.step = (state.step + 1) % stations.length;
  const nextStation = currentStation();

  updateMetrics();
  updateStages();
  updateInspector();

  const event = {
    title: station.eventTitle,
    copy: station.eventCopy,
    tone: station.eventTone,
  };
  addEvent(event);

  const message = manual
    ? `Advanced from ${station.id} to ${nextStation.id}.`
    : `${station.id} handed the product to ${nextStation.id}.`;
  elements.lineMessage.textContent = message;
}

function startTimer() {
  window.clearInterval(state.timer);
  state.timer = window.setInterval(() => advanceLine(), paceSettings[state.pace].interval);
}

function toggleLine() {
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
    window.clearInterval(state.timer);
    state.timer = null;
    elements.lineMessage.textContent = "The line is paused at the current handoff.";
  }

  updateRunState();
  updateStages();
  updateInspector();
  updateMission();
}

function selectStation(stationId) {
  state.selectedStation = stationId;
  state.hasInspectedStation = true;
  updateInspector();
  updateMission();
  elements.lineFooterMessage.textContent = `${stationId} is selected. Its current task is shown below.`;
}

function runQualityCheck() {
  state.quality = Math.min(99.4, state.quality + 0.2);
  state.hasCheckedQuality = true;
  updateMetrics();
  addEvent({
    title: "Quality check passed",
    copy: `First-pass yield is now reading ${state.quality.toFixed(1)}%.`,
    tone: "event-mark-green",
  });
  elements.lineMessage.textContent = "Quality check complete. All sampled packs are within range.";
  showToast("Quality check passed. The line is within range.");
  updateMission();
}

function resetLine() {
  window.clearInterval(state.timer);
  state.timer = null;
  state.running = false;
  state.completed = initialValues.completed;
  state.quality = initialValues.quality;
  state.pace = initialValues.pace;
  state.step = initialValues.step;
  state.selectedStation = "Blend";
  state.hasInspectedStation = false;
  state.hasCheckedQuality = false;
  state.hasRunLine = false;
  state.missionCompleteAnnounced = false;

  renderEvents(initialEvents);
  updateAll();
  elements.lineMessage.textContent = "Ready to start batch B-241.";
  showToast("The line is back at its starting point.");
}

elements.toggleLine.addEventListener("click", toggleLine);
elements.resetLine.addEventListener("click", resetLine);

elements.stageButtons.forEach((button) => {
  button.addEventListener("click", () => selectStation(button.dataset.station));
});

elements.pace.addEventListener("input", () => {
  state.pace = Number(elements.pace.value);
  updatePace();

  if (state.running) {
    startTimer();
  }

  showToast(`${paceSettings[state.pace].label} pace selected.`);
});

elements.advanceStep.addEventListener("click", () => {
  advanceLine(true);
  showToast("One handoff advanced.");
});

elements.qualityCheck.addEventListener("click", runQualityCheck);

renderEvents(initialEvents);
updateAll();
