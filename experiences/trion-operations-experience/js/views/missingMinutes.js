import { getChallengeById } from "../data.js";
import {
  getMissingMinutesDecisionById,
  getMissingMinutesEventById,
  getMissingMinutesInvestigationStatus,
  missingMinutesChallengeId,
  missingMinutesDecisions,
  missingMinutesSummary,
  missingMinutesTimeline,
} from "../miniGames/missingMinutes.js";
import {
  renderChallengeJourney,
  renderCompletionAction,
  renderDecisionKpiImpact,
  renderFooter,
  renderNav,
} from "./shared.js";

function getEventStatus(event) {
  if (event.id === "running") {
    return "Productive time";
  }

  if (event.planned) {
    return "Planned time";
  }

  return event.causeKnown ? "Unplanned, cause known" : "Unplanned, cause unknown";
}

function getMissionStepClass(completed, current) {
  if (completed) {
    return "is-complete";
  }

  return current ? "is-current" : "is-locked";
}

function renderMissionTrail(state, status) {
  const progress = state.missingMinutes;
  const challengeCompleted = state.completedChallenges.includes(missingMinutesChallengeId);
  const hasStartedInvestigation = progress.inspectedEventIds.length > 0;
  const hasDecisionOutcome = Boolean(progress.decisionId);
  const reviewedEvidence = Math.min(status.inspectedLossEvents, status.requiredLossEvents);
  const steps = [
    {
      number: "01",
      label: "Spot the gap",
      detail: "Line target missed",
      completed: hasStartedInvestigation,
      current: !hasStartedInvestigation,
    },
    {
      number: "02",
      label: "Review evidence",
      detail: `${reviewedEvidence} / ${status.requiredLossEvents} records`,
      completed: status.canDecide || hasDecisionOutcome || challengeCompleted,
      current: hasStartedInvestigation && !status.canDecide,
    },
    {
      number: "03",
      label: "Make the call",
      detail: hasDecisionOutcome ? "Decision reviewed" : "Choose first move",
      completed: challengeCompleted,
      current: status.canDecide && !challengeCompleted,
    },
    {
      number: "04",
      label: "Reveal the view",
      detail: challengeCompleted ? "Capability available" : "Capability ahead",
      completed: challengeCompleted,
      current: false,
    },
  ];

  return `
    <ol class="mission-trail" aria-label="Challenge progress">
      ${steps
        .map(
          (step) => `
            <li class="mission-trail__step ${getMissionStepClass(step.completed, step.current)}">
              <span class="mission-trail__number">${step.number}</span>
              <strong>${step.label}</strong>
              <small>${step.detail}</small>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;
}

function renderTimelineEvent(event, progress) {
  const selected = progress.selectedEventId === event.id;
  const inspected = progress.inspectedEventIds.includes(event.id);
  const ariaLabel = inspected
    ? `${event.label} revealed: ${event.duration} minutes, ${getEventStatus(event)}`
    : `Inspect ${event.label} event`;

  return `
    <li class="timeline-item" style="--timeline-duration: ${event.duration}">
      <button
        class="timeline-event timeline-event--${event.tone} ${selected ? "is-selected" : ""} ${inspected ? "is-revealed" : ""}"
        type="button"
        data-action="inspect-missing-minutes-event"
        data-event-id="${event.id}"
        aria-pressed="${selected}"
        aria-label="${ariaLabel}"
      >
        <span class="timeline-event__label">${event.label}</span>
        <strong class="timeline-event__duration">${inspected ? event.duration : "?"}<small> min</small></strong>
        <span class="timeline-event__time">${inspected ? `${event.start} - ${event.end}` : "Scan event"}</span>
        <span class="timeline-event__state">${inspected ? "Record reviewed" : "Review record"}</span>
      </button>
    </li>
  `;
}

function renderEventInspector(event) {
  if (!event) {
    return `
      <aside class="event-inspector event-inspector--empty" aria-labelledby="eventInspectorTitle">
        <p class="eyebrow">Evidence file</p>
        <h3 id="eventInspectorTitle">Start the scan.</h3>
        <p>
          Each revealed record adds the evidence needed to make the first improvement meaningful.
        </p>
        <ol class="case-file__clues">
          <li><span>01</span><strong>Compare duration</strong><small>How much time went missing?</small></li>
          <li><span>02</span><strong>Check the plan</strong><small>Was the time expected?</small></li>
          <li><span>03</span><strong>Test the cause</strong><small>Can the team explain it?</small></li>
        </ol>
      </aside>
    `;
  }

  return `
    <aside class="event-inspector event-inspector--${event.tone}" aria-labelledby="eventInspectorTitle">
      <p class="eyebrow">Evidence file</p>
      <h3 id="eventInspectorTitle">${event.label} <span>${event.duration} minutes</span></h3>
      <span class="event-inspector__status">Record reviewed</span>
      <dl class="event-inspector__facts">
        <div>
          <dt>Time</dt>
          <dd>${event.start} - ${event.end}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>${event.planned ? "Planned" : "Unplanned"}</dd>
        </div>
        <div>
          <dt>Cause</dt>
          <dd>${event.causeKnown ? "Known" : "Unknown"}</dd>
        </div>
      </dl>
      <p class="event-inspector__cause"><strong>What happened:</strong> ${event.cause}</p>
      <p class="event-inspector__effect"><strong>Effect on production:</strong> ${event.productionEffect}</p>
    </aside>
  `;
}

function renderEvidenceGate(status, decisionError) {
  let message = `Inspect ${status.remainingLossEvents} more loss event${status.remainingLossEvents === 1 ? "" : "s"} before choosing an improvement.`;

  if (status.inspectedLossEvents >= status.requiredLossEvents && !status.hasLargestAvoidableLoss) {
    message =
      "You have compared enough loss events, but the longest unplanned loss has not been inspected yet.";
  }

  return `
    <section class="decision-gate" aria-labelledby="decisionGateTitle">
      <div>
        <p class="eyebrow">Mission lock</p>
        <h2 id="decisionGateTitle">Build the case before making the call.</h2>
        <p>${message}</p>
        ${decisionError ? `<p class="decision-gate__error" role="alert">${decisionError}</p>` : ""}
      </div>
      <ul class="decision-gate__checks">
        <li class="${status.inspectedLossEvents >= status.requiredLossEvents ? "is-complete" : ""}">
          <span>${Math.min(status.inspectedLossEvents, status.requiredLossEvents)} / ${status.requiredLossEvents}</span>
          Loss records reviewed
        </li>
        <li class="${status.hasLargestAvoidableLoss ? "is-complete" : ""}">
          <span>${status.hasLargestAvoidableLoss ? "Viewed" : "Still needed"}</span>
          Key loss compared
        </li>
      </ul>
    </section>
  `;
}

function renderDecisionChoices() {
  return `
    <section class="improvement-decision" id="missing-minutes-decision" tabindex="-1" aria-labelledby="decisionTitle">
      <div class="improvement-decision__header">
        <div>
          <p class="eyebrow">Choose an intervention</p>
          <h2 id="decisionTitle">Choose the first improvement.</h2>
        </div>
        <p>
          Which action makes the largest unexplained loss more useful for the team trying to improve it?
        </p>
      </div>
      <div class="improvement-choice-list">
        ${missingMinutesDecisions
          .map(
            (decision, index) => `
              <button
                class="improvement-choice"
                type="button"
                data-action="choose-missing-minutes-improvement"
                data-decision-id="${decision.id}"
              >
                <span class="improvement-choice__number">0${index + 1}</span>
                <strong>${decision.title}</strong>
                <span class="improvement-choice__description">${decision.description}</span>
                <span class="improvement-choice__effect">${decision.effectLabel}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderDecisionOutcome(state, decision, challenge, completed) {
  const outcomeLabel = completed ? "Outcome and measure" : "Decision consequence";
  const outcomeClass = completed ? "is-complete" : "is-incomplete";

  return `
    <section
      class="decision-outcome ${outcomeClass}"
      id="missing-minutes-outcome"
      tabindex="-1"
      aria-labelledby="decisionOutcomeTitle"
    >
      <div class="decision-outcome__header">
        <div>
          <p class="eyebrow">${outcomeLabel}</p>
          <h2 id="decisionOutcomeTitle">${decision.outcomeTitle}</h2>
        </div>
        <p class="decision-outcome__summary">${decision.outcomeSummary}</p>
      </div>
      <p class="decision-outcome__detail">${decision.outcomeDetail}</p>
      ${renderDecisionKpiImpact({
        state,
        challengeId: missingMinutesChallengeId,
        decision,
        kpiKeys: challenge.kpiKeys,
        completed,
      })}
      <p class="scenario-disclaimer">
        Illustrative scenario outcome. These changes show the relationship between better event context and the next operational decision; they are not a forecast.
      </p>
      ${
        completed
          ? `
            <section class="capability-outcome" aria-labelledby="capabilityOutcomeTitle">
              <div>
                <span>Capability revealed</span>
                <h3 id="capabilityOutcomeTitle">${challenge.unlockLabel}</h3>
              </div>
              <p>
                Production events can now be reviewed with their reason, timing, and context together.
                The team can distinguish waiting, planned changeover, material delay, and equipment loss before choosing the next improvement.
              </p>
            </section>
            <div class="decision-outcome__actions">
              ${renderCompletionAction(challenge)}
            </div>
          `
          : `
            <div class="decision-outcome__actions">
              <button class="button button--secondary" type="button" data-action="retry-missing-minutes-decision">
                Compare another first intervention <span class="button-arrow" aria-hidden="true">-></span>
              </button>
            </div>
          `
      }
    </section>
  `;
}

function renderDecisionSection(state, challenge, status) {
  const progress = state.missingMinutes;
  const completed = state.completedChallenges.includes(missingMinutesChallengeId);
  const selectedDecision = getMissingMinutesDecisionById(progress.decisionId);

  if (completed) {
    const completionDecision =
      selectedDecision ?? missingMinutesDecisions.find((decision) => decision.completesChallenge);

    if (!completionDecision) {
      throw new Error("The Missing Minutes completion requires a decision outcome.");
    }

    return renderDecisionOutcome(state, completionDecision, challenge, true);
  }

  if (selectedDecision) {
    return renderDecisionOutcome(state, selectedDecision, challenge, false);
  }

  if (status.canDecide) {
    return renderDecisionChoices();
  }

  return renderEvidenceGate(status, progress.decisionError);
}

export function renderMissingMinutes(state) {
  const challenge = getChallengeById(missingMinutesChallengeId);

  if (!challenge) {
    throw new Error("The Missing Minutes challenge data is unavailable.");
  }

  const progress = state.missingMinutes;
  const selectedEvent = getMissingMinutesEventById(progress.selectedEventId);
  const status = getMissingMinutesInvestigationStatus(progress);

  return `
    <div class="page-shell">
      ${renderNav(state)}
      <main id="main-content">
        <article class="missing-minutes-page" aria-labelledby="screen-title">
          <div class="challenge-game-back">
            <button class="button button--secondary button--quiet button--back" type="button" data-action="close-challenge">
              <span class="button-arrow" aria-hidden="true"><-</span> Challenge map
            </button>
          </div>

          <header class="challenge-game-header">
            <div>
              <p class="eyebrow">Challenge ${challenge.number} / ${challenge.phase}</p>
              <h1 id="screen-title" tabindex="-1">The Missing Minutes</h1>
              <p>
                Line 03 is missing its target. It appears to be running, but several kinds of lost time are hiding in the same shift record.
              </p>
            </div>
            <aside class="challenge-game-brief" aria-label="Challenge objective">
              <span>Operational focus</span>
              <strong>Find the largest avoidable loss before choosing the first move.</strong>
              <dl>
                <div>
                  <dt>Unplanned time</dt>
                  <dd>${missingMinutesSummary.unplannedLossMinutes} minutes</dd>
                </div>
                <div>
                  <dt>Unexplained</dt>
                  <dd>${missingMinutesSummary.unexplainedLossMinutes} minutes</dd>
                </div>
                <div>
                  <dt>Evidence reviewed</dt>
                  <dd>${Math.min(status.inspectedLossEvents, status.requiredLossEvents)} / ${status.requiredLossEvents}</dd>
                </div>
              </dl>
            </aside>
          </header>

          ${renderChallengeJourney(state, challenge)}
          ${renderMissionTrail(state, status)}

          <section class="timeline-investigation" aria-labelledby="timelineTitle">
            <div class="timeline-investigation__heading">
              <div>
                <p class="eyebrow">Investigation board</p>
                <h2 id="timelineTitle">Reveal the shift record.</h2>
                <p>Select an event to review its trace. Duration, plan status, and cause will appear in the evidence file.</p>
              </div>
            </div>

            <div class="timeline-investigation__layout">
              <div class="timeline-stage">
                <div class="timeline-stage__meta">
                  <span>Line 03</span>
                  <span>07:00 - 09:00</span>
                  <span>Illustrative operating record</span>
                </div>
                <div class="timeline-ruler" aria-hidden="true">
                  <span>07:00</span>
                  <span>07:30</span>
                  <span>08:00</span>
                  <span>08:30</span>
                  <span>09:00</span>
                </div>
                <ol class="timeline-list" aria-label="Production timeline events">
                  ${missingMinutesTimeline
                    .map((event) => renderTimelineEvent(event, progress))
                    .join("")}
                </ol>
                <ul class="timeline-key" aria-label="Timeline status key">
                  <li class="timeline-key__item timeline-key__item--running">Productive time</li>
                  <li class="timeline-key__item timeline-key__item--planned">Planned time</li>
                  <li class="timeline-key__item timeline-key__item--known">Unplanned, cause known</li>
                  <li class="timeline-key__item timeline-key__item--unknown">Unplanned, cause unknown</li>
                </ul>
              </div>
              ${renderEventInspector(selectedEvent)}
            </div>
          </section>

          ${renderDecisionSection(state, challenge, status)}
        </article>
      </main>
      ${renderFooter(state)}
    </div>
  `;
}
