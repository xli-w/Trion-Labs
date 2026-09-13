import { getChallengeById } from "../data.js";
import {
  controlRoomAudiencePriorityLimit,
  controlRoomAudiences,
  controlRoomChallengeId,
  controlRoomDecisions,
  controlRoomRequiredAudienceIds,
  controlRoomRequiredSignalIds,
  controlRoomSignalSelectionLimit,
  controlRoomSignals,
  getControlRoomAudienceSelectionStatus,
  getControlRoomDecisionById,
  getControlRoomSignalById,
  getControlRoomSignalSelectionStatus,
} from "../miniGames/controlRoom.js";
import {
  renderChallengeJourney,
  renderCompletionAction,
  renderDecisionKpiImpact,
  renderFooter,
  renderNav,
} from "./shared.js";

function getMissionStepClass(completed, current) {
  if (completed) {
    return "is-complete";
  }

  return current ? "is-current" : "is-locked";
}

function getSelectedDecision(progress) {
  if (!progress.decisionId) {
    return null;
  }

  const decision = getControlRoomDecisionById(progress.decisionId);

  if (!decision) {
    throw new Error(`Unknown selected Control Room decision: ${progress.decisionId}`);
  }

  return decision;
}

function renderMissionTrail(state, signalStatus, audienceStatus) {
  const progress = state.controlRoom;
  const completed = state.completedChallenges.includes(controlRoomChallengeId);
  const hasSelectedSignals = signalStatus.selectedCount > 0;
  const steps = [
    {
      number: "01",
      label: "Focus the signal",
      detail: progress.signalsConfirmed
        ? "Four decision signals"
        : `${signalStatus.selectedCount} / ${controlRoomSignalSelectionLimit} selected`,
      completed: progress.signalsConfirmed,
      current: !progress.signalsConfirmed && !hasSelectedSignals,
    },
    {
      number: "02",
      label: "Prioritise people",
      detail: progress.audiencesConfirmed
        ? "Three priority roles"
        : `${audienceStatus.selectedCount} / ${controlRoomAudiencePriorityLimit} roles`,
      completed: progress.audiencesConfirmed,
      current: progress.signalsConfirmed && !progress.audiencesConfirmed,
    },
    {
      number: "03",
      label: "Compose the view",
      detail: progress.decisionId ? "View approach reviewed" : "Choose the response",
      completed: completed,
      current: progress.audiencesConfirmed && !progress.decisionId,
    },
    {
      number: "04",
      label: "Measure the outcome",
      detail: completed ? "Capability available" : "Shared context ahead",
      completed,
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

function getSignalStateLabel(signal, progress, completed) {
  if (progress.selectedSignalIds.includes(signal.id)) {
    return completed || progress.signalsConfirmed
      ? "Included in the focused view"
      : "Selected for the focused view";
  }

  return completed || progress.signalsConfirmed
    ? "Kept in its role-specific detail"
    : "Available information";
}

function renderSignalCard(signal, progress, completed) {
  const selected = progress.selectedSignalIds.includes(signal.id);
  const isStatic = progress.signalsConfirmed || completed;
  const describedBy = progress.signalError
    ? "control-room-signal-instructions control-room-signal-error"
    : "control-room-signal-instructions";
  const body = `
    <span class="control-signal__topline">
      <span class="control-signal__category">${signal.category}</span>
      <span class="control-signal__status">${signal.status}</span>
    </span>
    <strong>${signal.label}</strong>
    <span class="control-signal__detail">${signal.detail}</span>
    <span class="control-signal__context">${signal.decisionContext}</span>
    <span class="control-signal__state">${getSignalStateLabel(signal, progress, completed)}</span>
  `;

  if (isStatic) {
    return `
      <li class="control-signal ${selected ? "is-selected is-essential" : "is-available"}">
        <article class="control-signal__card">${body}</article>
      </li>
    `;
  }

  return `
    <li class="control-signal ${selected ? "is-selected" : ""}">
      <button
        id="control-room-signal-${signal.id}"
        class="control-signal__card"
        type="button"
        data-action="toggle-control-room-signal"
        data-signal-id="${signal.id}"
        aria-pressed="${selected}"
        aria-describedby="${describedBy}"
      >
        ${body}
      </button>
    </li>
  `;
}

function renderSignalGrouping() {
  const selectedSignals = controlRoomRequiredSignalIds.map((signalId) => {
    const signal = getControlRoomSignalById(signalId);

    if (!signal) {
      throw new Error(`Missing Control Room signal: ${signalId}`);
    }

    return signal;
  });

  return `
    <dl class="control-room-groups">
      <div>
        <dt>Cause</dt>
        <dd>${selectedSignals[1].label}</dd>
      </div>
      <div>
        <dt>Work response</dt>
        <dd>${selectedSignals[0].label} + ${selectedSignals[2].label}</dd>
      </div>
      <div>
        <dt>Customer impact</dt>
        <dd>${selectedSignals[3].label}</dd>
      </div>
    </dl>
  `;
}

function renderSignalBoard(state, signalStatus) {
  const progress = state.controlRoom;
  const completed = state.completedChallenges.includes(controlRoomChallengeId);
  const selectedSummary = progress.signalsConfirmed
    ? "The selected signals now explain the cause, work response, and customer impact together."
    : "Select the four signals that answer the immediate operational question.";
  const curationTitle = progress.signalsConfirmed
    ? "The focused exception has a usable shape."
    : "Build the shared exception view.";

  return `
    <section class="control-room-studio" aria-labelledby="controlRoomSignalsTitle">
      <header class="control-room-studio__heading">
        <div>
          <p class="eyebrow">Information curation</p>
          <h2 id="controlRoomSignalsTitle">Keep the decision signal in view.</h2>
          <p id="control-room-signal-instructions">
            Line 02 is behind after a late material arrival. Select the four signals that show the cause, the available work response, and the customer consequence.
          </p>
        </div>
        <aside class="control-room-signal" aria-label="Current operational question">
          <span>Current decision</span>
          <strong>Can Line 02 protect today's customer commitments?</strong>
          <p>Use only the information that changes this response.</p>
        </aside>
      </header>

      <div class="control-room-workspace">
        <section class="control-room-signal-board" aria-label="Available operational information">
          <div class="control-room-signal-board__meta">
            <span>Illustrative shift context</span>
            <span>${signalStatus.selectedCount} of ${controlRoomSignalSelectionLimit} signals selected</span>
            <span>${progress.signalsConfirmed ? "Focused view ready" : "Select the essentials"}</span>
          </div>
          <ul class="control-signal-list">
            ${controlRoomSignals
              .map((signal) => renderSignalCard(signal, progress, completed))
              .join("")}
          </ul>
        </section>

        <aside
          class="control-room-curation ${progress.signalsConfirmed ? "is-focused" : ""}"
          id="control-room-signal-outcome"
          tabindex="-1"
          aria-labelledby="controlRoomCurationTitle"
        >
          <p class="eyebrow">View composition</p>
          <h3 id="controlRoomCurationTitle">${curationTitle}</h3>
          <p>${selectedSummary}</p>
          ${
            progress.signalsConfirmed
              ? renderSignalGrouping()
              : `
                <ol class="control-room-checklist">
                  <li><span>01</span><strong>Find the cause</strong><small>What has changed upstream?</small></li>
                  <li><span>02</span><strong>Show the work effect</strong><small>What can still be resequenced?</small></li>
                  <li><span>03</span><strong>Show the customer effect</strong><small>Which commitments need action?</small></li>
                </ol>
              `
          }
          ${
            progress.signalError
              ? `<p class="control-room-error" id="control-room-signal-error" role="alert">${progress.signalError}</p>`
              : ""
          }
          ${
            !progress.signalsConfirmed
              ? `
                <button class="button button--primary control-room-confirm" type="button" data-action="confirm-control-room-signals">
                  Confirm focused signals <span class="button-arrow" aria-hidden="true">-></span>
                </button>
              `
              : '<span class="control-room-confirmation">Focused exception confirmed</span>'
          }
        </aside>
      </div>
    </section>
  `;
}

function getAudienceSignalLabels(audience) {
  return audience.signalIds
    .map((signalId) => {
      const signal = getControlRoomSignalById(signalId);

      if (!signal) {
        throw new Error(`Missing Control Room audience signal: ${signalId}`);
      }

      return signal.label;
    })
    .join(" + ");
}

function getAudienceStateLabel(audience, progress, completed) {
  if (progress.prioritizedAudienceIds.includes(audience.id)) {
    return completed || progress.audiencesConfirmed
      ? "Priority response view"
      : "Priority response selected";
  }

  return completed || progress.audiencesConfirmed
    ? "Role detail remains available"
    : "Available role view";
}

function renderAudienceCard(audience, progress, completed) {
  const selected = progress.prioritizedAudienceIds.includes(audience.id);
  const isStatic = progress.audiencesConfirmed || completed;
  const describedBy = progress.audienceError
    ? "control-room-audience-instructions control-room-audience-error"
    : "control-room-audience-instructions";
  const body = `
    <span class="audience-card__label">${audience.label}</span>
    <strong>${audience.focus}</strong>
    <span class="audience-card__signals">${getAudienceSignalLabels(audience)}</span>
    <span class="audience-card__detail">${audience.detail}</span>
    <span class="audience-card__state">${getAudienceStateLabel(audience, progress, completed)}</span>
  `;

  if (isStatic) {
    return `
      <li class="audience-card ${selected ? "is-selected is-priority" : "is-available"}">
        <article>${body}</article>
      </li>
    `;
  }

  return `
    <li class="audience-card ${selected ? "is-selected" : ""}">
      <button
        id="control-room-audience-${audience.id}"
        type="button"
        data-action="toggle-control-room-audience"
        data-audience-id="${audience.id}"
        aria-pressed="${selected}"
        aria-describedby="${describedBy}"
      >
        ${body}
      </button>
    </li>
  `;
}

function renderAudiencePriorityGroups() {
  const priorityAudiences = controlRoomRequiredAudienceIds.map((audienceId) => {
    const audience = controlRoomAudiences.find((item) => item.id === audienceId);

    if (!audience) {
      throw new Error(`Missing Control Room audience: ${audienceId}`);
    }

    return audience;
  });

  return `
    <ul class="control-room-priority-list">
      ${priorityAudiences
        .map(
          (audience) => `
            <li>
              <strong>${audience.label}</strong>
              <span>${audience.focus}</span>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;
}

function renderAudienceBoard(state, audienceStatus) {
  const progress = state.controlRoom;
  const completed = state.completedChallenges.includes(controlRoomChallengeId);

  if (!progress.signalsConfirmed) {
    return "";
  }

  return `
    <section class="control-room-audience-board" id="control-room-audiences" tabindex="-1" aria-labelledby="controlRoomAudienceTitle">
      <header>
        <div>
          <p class="eyebrow">Role priorities</p>
          <h2 id="controlRoomAudienceTitle">Put the exception in front of the people who can act.</h2>
        </div>
        <p id="control-room-audience-instructions">
          Choose the three roles that need a priority response now. Other teams keep their relevant detail without being interrupted by this exception.
        </p>
      </header>
      <div class="control-room-audience-layout">
        <ul class="audience-list">
          ${controlRoomAudiences
            .map((audience) => renderAudienceCard(audience, progress, completed))
            .join("")}
        </ul>
        <aside
          class="control-room-audience-summary ${progress.audiencesConfirmed ? "is-focused" : ""}"
          id="control-room-audience-outcome"
          tabindex="-1"
          aria-labelledby="controlRoomAudienceSummaryTitle"
        >
          <span>Priority route</span>
          <h3 id="controlRoomAudienceSummaryTitle">
            ${
              progress.audiencesConfirmed
                ? "The response now has clear owners."
                : "Choose the immediate response group."
            }
          </h3>
          <p>
            ${
              progress.audiencesConfirmed
                ? "The same exception is shared across the decisions that depend on it, without broadcasting unrelated information."
                : `${audienceStatus.selectedCount} of ${controlRoomAudiencePriorityLimit} roles selected for the priority response.`
            }
          </p>
          ${progress.audiencesConfirmed ? renderAudiencePriorityGroups() : ""}
          ${
            progress.audienceError
              ? `<p class="control-room-error" id="control-room-audience-error" role="alert">${progress.audienceError}</p>`
              : ""
          }
          ${
            !progress.audiencesConfirmed
              ? `
                <button class="button button--primary control-room-confirm" type="button" data-action="confirm-control-room-audiences">
                  Confirm priority roles <span class="button-arrow" aria-hidden="true">-></span>
                </button>
              `
              : '<span class="control-room-confirmation">Priority response confirmed</span>'
          }
        </aside>
      </div>
    </section>
  `;
}

function renderDecisionGate(progress) {
  const message = !progress.signalsConfirmed
    ? "Confirm the four decision signals before choosing how the view should be shared."
    : "Confirm the three priority roles before choosing how the view should be shared.";

  return `
    <section class="decision-gate control-room-gate" aria-labelledby="controlRoomGateTitle">
      <div>
        <p class="eyebrow">Context first</p>
        <h2 id="controlRoomGateTitle">A useful view needs a focused signal and clear owners.</h2>
        <p>${message}</p>
      </div>
      <ul class="decision-gate__checks">
        <li class="${progress.signalsConfirmed ? "is-complete" : ""}">
          <span>${progress.signalsConfirmed ? "Focused" : "Ahead"}</span>
          Decision signals curated
        </li>
        <li class="${progress.audiencesConfirmed ? "is-complete" : ""}">
          <span>${progress.audiencesConfirmed ? "Owned" : "Ahead"}</span>
          Priority roles confirmed
        </li>
      </ul>
    </section>
  `;
}

function renderDecisionChoices(decisionError) {
  return `
    <section class="improvement-decision control-room-decision" id="control-room-decision" tabindex="-1" aria-labelledby="controlRoomDecisionTitle">
      <div class="improvement-decision__header">
        <div>
          <p class="eyebrow">Compose the operating view</p>
          <h2 id="controlRoomDecisionTitle">How should this exception reach the operation?</h2>
        </div>
        <p>
          The cause, available work, and customer impact now form a focused context. Choose the approach that helps each role act without losing the shared relationship.
        </p>
      </div>
      ${decisionError ? `<p class="decision-gate__error" role="alert">${decisionError}</p>` : ""}
      <div class="improvement-choice-list">
        ${controlRoomDecisions
          .map(
            (decision, index) => `
              <button
                class="improvement-choice"
                type="button"
                data-action="choose-control-room-decision"
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

function renderOutcomeComparison() {
  return `
    <section class="control-room-comparison" aria-labelledby="controlRoomComparisonTitle">
      <header>
        <div>
          <p class="eyebrow">Before and after</p>
          <h3 id="controlRoomComparisonTitle">The response is now easier to find and own.</h3>
        </div>
        <span>Illustrative operating view</span>
      </header>
      <dl>
        <div>
          <dt>Priority signals</dt>
          <dd><span>10 to scan</span><i aria-hidden="true">-></i><strong>4 focused signals</strong></dd>
        </div>
        <div>
          <dt>Response owners</dt>
          <dd><span>Unclear</span><i aria-hidden="true">-></i><strong>3 priority roles</strong></dd>
        </div>
        <div>
          <dt>Decision context</dt>
          <dd><span>Separate reports</span><i aria-hidden="true">-></i><strong>One shared exception</strong></dd>
        </div>
      </dl>
    </section>
  `;
}

function renderDecisionOutcome(state, decision, challenge, completed) {
  return `
    <section
      class="decision-outcome ${completed ? "is-complete" : "is-incomplete"} control-room-outcome"
      id="control-room-outcome"
      tabindex="-1"
      aria-labelledby="controlRoomOutcomeTitle"
    >
      <div class="decision-outcome__header">
        <div>
          <p class="eyebrow">${completed ? "Outcome and measure" : "Decision consequence"}</p>
          <h2 id="controlRoomOutcomeTitle">${decision.outcomeTitle}</h2>
        </div>
        <p class="decision-outcome__summary">${decision.outcomeSummary}</p>
      </div>
      <p class="decision-outcome__detail">${decision.outcomeDetail}</p>
      ${renderDecisionKpiImpact({
        state,
        challengeId: controlRoomChallengeId,
        decision,
        kpiKeys: challenge.kpiKeys,
        completed,
        className: "control-room-kpi-impact",
      })}
      ${
        completed
          ? `
            ${renderOutcomeComparison()}
            <blockquote class="control-room-principle">
              The best dashboard is not the one with the most information. It is the one that helps someone make the right decision.
            </blockquote>
          `
          : ""
      }
      <p class="scenario-disclaimer">
        Illustrative scenario outcome. The values show how clearer shared context can improve the timing and quality of a decision; they are not a forecast.
      </p>
      ${
        completed
          ? `
            <section class="capability-outcome" aria-labelledby="controlRoomCapabilityOutcomeTitle">
              <div>
                <span>Capability revealed</span>
                <h3 id="controlRoomCapabilityOutcomeTitle">${challenge.unlockLabel}</h3>
              </div>
              <p>
                One shared exception can now bring together operational cause, work response, and customer impact, while keeping each role focused on the detail it needs.
              </p>
            </section>
            <div class="decision-outcome__actions">
              ${renderCompletionAction(challenge)}
            </div>
          `
          : `
            <div class="decision-outcome__actions">
              <button class="button button--secondary" type="button" data-action="retry-control-room-decision">
                Choose a shared role-relevant view <span class="button-arrow" aria-hidden="true">-></span>
              </button>
            </div>
          `
      }
    </section>
  `;
}

function renderDecisionSection(state, challenge) {
  const progress = state.controlRoom;
  const completed = state.completedChallenges.includes(controlRoomChallengeId);
  const selectedDecision = getSelectedDecision(progress);

  if (completed) {
    const completionDecision =
      selectedDecision ??
      controlRoomDecisions.find((decision) => decision.completesChallenge);

    if (!completionDecision) {
      throw new Error("The Control Room completion requires a decision outcome.");
    }

    return renderDecisionOutcome(state, completionDecision, challenge, true);
  }

  if (selectedDecision) {
    return renderDecisionOutcome(state, selectedDecision, challenge, false);
  }

  if (progress.audiencesConfirmed) {
    return renderDecisionChoices(progress.decisionError);
  }

  return renderDecisionGate(progress);
}

export function renderControlRoom(state) {
  const challenge = getChallengeById(controlRoomChallengeId);

  if (!challenge) {
    throw new Error("The Control Room challenge data is unavailable.");
  }

  const signalStatus = getControlRoomSignalSelectionStatus(state.controlRoom);
  const audienceStatus = getControlRoomAudienceSelectionStatus(state.controlRoom);
  const completed = state.completedChallenges.includes(controlRoomChallengeId);

  return `
    <div class="page-shell">
      ${renderNav(state)}
      <main id="main-content">
        <article class="control-room-page ${completed ? "is-complete" : ""}" aria-labelledby="screen-title">
          <div class="challenge-game-back">
            <button class="button button--secondary button--quiet button--back" type="button" data-action="close-challenge">
              <span class="button-arrow" aria-hidden="true"><-</span> Challenge map
            </button>
          </div>

          <header class="challenge-game-header">
            <div>
              <p class="eyebrow">Challenge ${challenge.number} / ${challenge.phase}</p>
              <h1 id="screen-title" tabindex="-1">The Control Room</h1>
              <p>
                Management has plenty of information, but no useful shared view of the work. Curate the current exception so the people who need to decide can see what matters first.
              </p>
            </div>
            <aside class="challenge-game-brief" aria-label="Challenge objective">
              <span>Operational focus</span>
              <strong>Turn scattered operational information into a focused shared decision.</strong>
              <dl>
                <div>
                  <dt>Available signals</dt>
                  <dd>${controlRoomSignals.length}</dd>
                </div>
                <div>
                  <dt>Priority roles</dt>
                  <dd>${completed ? "3 connected" : `${audienceStatus.selectedCount} selected`}</dd>
                </div>
                <div>
                  <dt>Focused signals</dt>
                  <dd>${signalStatus.selectedCount} / ${controlRoomSignalSelectionLimit}</dd>
                </div>
              </dl>
            </aside>
          </header>

          ${renderChallengeJourney(state, challenge)}
          ${renderMissionTrail(state, signalStatus, audienceStatus)}
          ${renderSignalBoard(state, signalStatus)}
          ${renderAudienceBoard(state, audienceStatus)}
          ${renderDecisionSection(state, challenge)}
        </article>
      </main>
      ${renderFooter(state)}
    </div>
  `;
}
