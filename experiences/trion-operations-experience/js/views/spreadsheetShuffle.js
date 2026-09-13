import { getChallengeById } from "../data.js";
import {
  getSpreadsheetShuffleAutomationById,
  getSpreadsheetShuffleRemovalStatus,
  getSpreadsheetShuffleStandardisationById,
  getSpreadsheetShuffleWorkflowSnapshot,
  isSpreadsheetShuffleAutomated,
  isSpreadsheetShuffleSimplified,
  isSpreadsheetShuffleStandardised,
  spreadsheetShuffleAutomationOptions,
  spreadsheetShuffleChallengeId,
  spreadsheetShuffleRequiredRemovalIds,
  spreadsheetShuffleStandardisationOptions,
  spreadsheetShuffleWorkflow,
  spreadsheetShuffleWorkflowSnapshots,
} from "../miniGames/spreadsheetShuffle.js";
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

function renderMissionTrail(state, removalStatus) {
  const progress = state.spreadsheetShuffle;
  const simplified = isSpreadsheetShuffleSimplified(progress);
  const standardised = isSpreadsheetShuffleStandardised(progress);
  const automated = isSpreadsheetShuffleAutomated(progress);
  const completed = state.completedChallenges.includes(spreadsheetShuffleChallengeId);
  const steps = [
    {
      number: "01",
      label: "Simplify",
      detail: simplified
        ? "Duplicate work removed"
        : `${removalStatus.selectedCount} / ${removalStatus.removalBudget} steps marked`,
      completed: simplified,
      current: !simplified,
    },
    {
      number: "02",
      label: "Standardise",
      detail: standardised ? "One planning route" : "Set the sequence",
      completed: standardised,
      current: simplified && !standardised,
    },
    {
      number: "03",
      label: "Automate",
      detail: automated ? "Schedule flow connected" : "Choose the right work",
      completed: completed,
      current: standardised && !completed,
    },
    {
      number: "04",
      label: "Measure",
      detail: completed ? "Capability available" : "See the outcome",
      completed,
      current: automated && !completed,
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

function renderWorkflowMetrics(snapshot) {
  return `
    <dl class="workflow-metrics">
      <div>
        <dt>Activities</dt>
        <dd>${snapshot.metrics.activities}</dd>
      </div>
      <div>
        <dt>Handoffs</dt>
        <dd>${snapshot.metrics.handoffs}</dd>
      </div>
      <div>
        <dt>Cycle time</dt>
        <dd>${snapshot.metrics.minutes}<small> min</small></dd>
      </div>
    </dl>
  `;
}

function renderManualWorkflowStep(step, progress, completed) {
  const simplified = isSpreadsheetShuffleSimplified(progress);
  const selected = progress.selectedStepIds.includes(step.id);
  const removed = simplified && spreadsheetShuffleRequiredRemovalIds.includes(step.id);
  const describedBy = progress.selectionError
    ? "spreadsheet-removal-instructions spreadsheet-selection-error"
    : "spreadsheet-removal-instructions";
  const stateLabel = removed
    ? "Removed from redesigned flow"
    : simplified || completed
      ? "Retained in redesigned flow"
      : selected
        ? "Marked as duplicate work"
        : "Select for review";
  const body = `
    <span class="workflow-step__number" aria-hidden="true">${String(
      spreadsheetShuffleWorkflow.indexOf(step) + 1,
    ).padStart(2, "0")}</span>
    <span class="workflow-step__category">${step.category}</span>
    <strong>${step.label}</strong>
    <span class="workflow-step__detail">${step.detail}</span>
    <span class="workflow-step__state">${stateLabel}</span>
  `;

  if (simplified || completed) {
    return `
      <li class="workflow-step ${removed ? "is-removed" : ""}">
        <article class="workflow-step__card">${body}</article>
      </li>
    `;
  }

  return `
    <li class="workflow-step ${selected ? "is-selected" : ""}">
      <button
        class="workflow-step__card"
        type="button"
        data-action="toggle-spreadsheet-shuffle-step"
        data-step-id="${step.id}"
        aria-pressed="${selected}"
        aria-describedby="${describedBy}"
      >
        ${body}
      </button>
    </li>
  `;
}

function renderFutureWorkflowStep(step, index) {
  return `
    <li class="workflow-future-step" style="--workflow-step-index: ${index}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div>
        <strong>${step.label}</strong>
        <small>${step.category}</small>
      </div>
    </li>
  `;
}

function renderWorkflowBoard(state) {
  const progress = state.spreadsheetShuffle;
  const completed = state.completedChallenges.includes(spreadsheetShuffleChallengeId);
  const afterSnapshot = getSpreadsheetShuffleWorkflowSnapshot(progress);
  const hasRedesignedWorkflow = afterSnapshot.id !== "fragmented";
  const afterStatus =
    afterSnapshot.id === "automated"
      ? "Connected flow"
      : hasRedesignedWorkflow
        ? "Taking shape"
        : "Waiting for first move";

  return `
    <section class="spreadsheet-workflow-board" id="spreadsheet-shuffle-workflow" tabindex="-1" aria-labelledby="workflowBoardTitle">
      <header class="spreadsheet-workflow-board__heading">
        <div>
          <p class="eyebrow">Planning workflow</p>
          <h2 id="workflowBoardTitle">Make the work easier to follow.</h2>
          <p>
            Select the two activities that duplicate information. Then use the remaining moves to create a consistent planning route before automating it.
          </p>
        </div>
        <aside class="workflow-signal" aria-label="Workflow friction">
          <span>Manual signal</span>
          <strong>One update is handled in several places.</strong>
          <p>Repeated entry and delayed confirmations keep the schedule behind the work.</p>
        </aside>
      </header>

      <div class="workflow-transformation">
        <section class="workflow-panel workflow-panel--before" aria-labelledby="manualWorkflowTitle">
          <header class="workflow-panel__header">
            <div>
              <span>Before</span>
              <h3 id="manualWorkflowTitle">Current manual route</h3>
            </div>
            <strong>Illustrative cycle</strong>
          </header>
          <ol class="workflow-step-list">
            ${spreadsheetShuffleWorkflow
              .map((step) => renderManualWorkflowStep(step, progress, completed))
              .join("")}
          </ol>
          <p class="workflow-panel__summary" id="spreadsheet-removal-instructions">
            ${completed || isSpreadsheetShuffleSimplified(progress)
              ? "The original route remains visible so the removed duplicate work can be compared with the redesigned flow."
              : "Use your two removal selections on work that repeats the same information rather than the handoff that merely exposes the delay."}
          </p>
          ${
            progress.selectionError
              ? `<p class="workflow-panel__error" id="spreadsheet-selection-error" role="alert">${progress.selectionError}</p>`
              : ""
          }
          ${renderWorkflowMetrics(spreadsheetShuffleWorkflowSnapshots.fragmented)}
        </section>

        <div class="workflow-transformation__connector" aria-hidden="true">
          <span>Rebuild the flow</span>
        </div>

        <section class="workflow-panel workflow-panel--after" aria-labelledby="redesignedWorkflowTitle">
          <header class="workflow-panel__header">
            <div>
              <span>After</span>
              <h3 id="redesignedWorkflowTitle">${hasRedesignedWorkflow ? afterSnapshot.label : "Redesigned route"}</h3>
            </div>
            <strong>${afterStatus}</strong>
          </header>
          ${
            hasRedesignedWorkflow
              ? `
                <ol class="workflow-future-list">
                  ${afterSnapshot.steps
                    .map((step, index) => renderFutureWorkflowStep(step, index))
                    .join("")}
                </ol>
                <p class="workflow-panel__summary">${afterSnapshot.summary}</p>
              `
              : `
                <div class="workflow-future-empty">
                  <span aria-hidden="true">01</span>
                  <strong>The leaner route will appear here.</strong>
                  <p>Start by removing the copied figures and the manual reconciliation they create.</p>
                </div>
              `
          }
          ${renderWorkflowMetrics(afterSnapshot)}
        </section>
      </div>
    </section>
  `;
}

function renderSimplificationFeedback(progress, removalStatus) {
  if (isSpreadsheetShuffleSimplified(progress)) {
    return `
      <aside class="workflow-phase-feedback is-complete" id="spreadsheet-simplification-outcome" tabindex="-1">
        <span>Move applied</span>
        <strong>Copied figures and manual reconciliation are gone.</strong>
        <p>The update now reaches the schedule before the email handoff, leaving a smaller route to standardise.</p>
      </aside>
    `;
  }

  if (progress.simplificationError) {
    return `
      <aside class="workflow-phase-feedback is-attention" id="spreadsheet-simplification-outcome" tabindex="-1" role="alert">
        <span>Review the duplicate work</span>
        <strong>${removalStatus.canApply ? "That pair changes a handoff, but not the root duplication." : "The removal pair is incomplete."}</strong>
        <p>${progress.simplificationError}</p>
        ${
          removalStatus.canApply
            ? `
              <button class="button button--secondary button--quiet" type="button" data-action="retry-spreadsheet-shuffle-simplification">
                Choose a different pair <span class="button-arrow" aria-hidden="true">-></span>
              </button>
            `
            : ""
        }
      </aside>
    `;
  }

  return "";
}

function renderSimplificationSection(progress, removalStatus, completed) {
  if (isSpreadsheetShuffleSimplified(progress) || completed) {
    return renderSimplificationFeedback(progress, removalStatus);
  }

  const selectionLabel =
    removalStatus.remainingSelections === 0
      ? "Two steps selected. Test this simplification."
      : `Choose ${removalStatus.remainingSelections} more step${removalStatus.remainingSelections === 1 ? "" : "s"} to use the two-move simplification budget.`;

  return `
    <section class="workflow-phase workflow-phase--simplify" aria-labelledby="simplifyTitle">
      <div class="workflow-phase__header">
        <div>
          <p class="eyebrow">Step 1 of 3 / Simplify</p>
          <h2 id="simplifyTitle">Remove the work that repeats information.</h2>
        </div>
        <p>
          The issue is not that the planner sees the update twice. It is that the same figures are copied and reconciled before anyone can act.
        </p>
      </div>
      <div class="workflow-phase__action">
        <p class="workflow-selection-status">${selectionLabel}</p>
        <button class="button button--primary" type="button" data-action="apply-spreadsheet-shuffle-simplification">
          Remove selected duplicate work <span class="button-arrow" aria-hidden="true">-></span>
        </button>
      </div>
      ${renderSimplificationFeedback(progress, removalStatus)}
    </section>
  `;
}

function renderOptionChoices(options, action) {
  return `
    <div class="improvement-choice-list spreadsheet-choice-list">
      ${options
        .map(
          (option, index) => `
            <button
              class="improvement-choice"
              type="button"
              data-action="${action}"
              data-option-id="${option.id}"
            >
              <span class="improvement-choice__number">0${index + 1}</span>
              <strong>${option.title}</strong>
              <span class="improvement-choice__description">${option.description}</span>
              <span class="improvement-choice__effect">${option.effectLabel}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderOptionOutcome(option, phase, retryAction, retryLabel) {
  const completedPhase = option.completesPhase || option.completesChallenge;
  const outcomeClass = completedPhase ? "is-complete" : "is-incomplete";

  return `
    <section
      class="decision-outcome ${outcomeClass} spreadsheet-option-outcome"
      id="${phase}-outcome"
      tabindex="-1"
      aria-labelledby="${phase}OutcomeTitle"
    >
      <div class="decision-outcome__header">
        <div>
          <p class="eyebrow">${completedPhase ? "Move applied" : "Decision consequence"}</p>
          <h2 id="${phase}OutcomeTitle">${option.outcomeTitle}</h2>
        </div>
        <p class="decision-outcome__summary">${option.outcomeSummary}</p>
      </div>
      <p class="decision-outcome__detail">${option.outcomeDetail}</p>
      ${
        completedPhase
          ? ""
          : `
            <div class="decision-outcome__actions">
              <button class="button button--secondary" type="button" data-action="${retryAction}">
                ${retryLabel} <span class="button-arrow" aria-hidden="true">-></span>
              </button>
            </div>
          `
      }
    </section>
  `;
}

function renderStandardisationSection(progress, completed) {
  if (!isSpreadsheetShuffleSimplified(progress)) {
    return "";
  }

  const selectedOption = progress.standardisationId
    ? getSpreadsheetShuffleStandardisationById(progress.standardisationId)
    : null;

  if (progress.standardisationId && !selectedOption) {
    throw new Error("The selected Spreadsheet Shuffle standardisation option is unavailable.");
  }

  if (selectedOption) {
    return renderOptionOutcome(
      selectedOption,
      "spreadsheet-standardisation",
      "retry-spreadsheet-shuffle-standardisation",
      "Choose a different planning sequence",
    );
  }

  if (completed) {
    throw new Error("The Spreadsheet Shuffle completion requires a standardised planning route.");
  }

  return `
    <section class="improvement-decision spreadsheet-phase-decision" id="spreadsheet-standardisation" tabindex="-1" aria-labelledby="standardisationTitle">
      <div class="improvement-decision__header">
        <div>
          <p class="eyebrow">Step 2 of 3 / Standardise</p>
          <h2 id="standardisationTitle">Put the surviving work in one useful order.</h2>
        </div>
        <p>
          A clear route checks source context before the planning decision, then shares the same update rather than another version of it.
        </p>
      </div>
      ${progress.standardisationError ? `<p class="decision-gate__error" role="alert">${progress.standardisationError}</p>` : ""}
      ${renderOptionChoices(
        spreadsheetShuffleStandardisationOptions,
        "choose-spreadsheet-shuffle-standardisation",
      )}
    </section>
  `;
}

function renderWorkflowComparison() {
  const before = spreadsheetShuffleWorkflowSnapshots.fragmented;
  const after = spreadsheetShuffleWorkflowSnapshots.automated;

  return `
    <section class="workflow-comparison" aria-labelledby="workflowComparisonTitle">
      <header>
        <div>
          <p class="eyebrow">Before and after</p>
          <h3 id="workflowComparisonTitle">The workflow now carries one consistent update.</h3>
        </div>
        <span>Illustrative planning cycle</span>
      </header>
      <dl>
        <div>
          <dt>Activities</dt>
          <dd><span>${before.metrics.activities}</span><i aria-hidden="true">-></i><strong>${after.metrics.activities}</strong></dd>
        </div>
        <div>
          <dt>Handoffs</dt>
          <dd><span>${before.metrics.handoffs}</span><i aria-hidden="true">-></i><strong>${after.metrics.handoffs}</strong></dd>
        </div>
        <div>
          <dt>Cycle time</dt>
          <dd><span>${before.metrics.minutes} min</span><i aria-hidden="true">-></i><strong>${after.metrics.minutes} min</strong></dd>
        </div>
      </dl>
    </section>
  `;
}

function renderCompletionOutcome(state, challenge, decision) {
  return `
    <section
      class="decision-outcome is-complete spreadsheet-completion-outcome"
      id="spreadsheet-automation-outcome"
      tabindex="-1"
      aria-labelledby="spreadsheetAutomationOutcomeTitle"
    >
      <div class="decision-outcome__header">
        <div>
          <p class="eyebrow">Outcome and measure</p>
          <h2 id="spreadsheetAutomationOutcomeTitle">${decision.outcomeTitle}</h2>
        </div>
        <p class="decision-outcome__summary">${decision.outcomeSummary}</p>
      </div>
      <p class="decision-outcome__detail">${decision.outcomeDetail}</p>
      ${renderDecisionKpiImpact({
        state,
        challengeId: spreadsheetShuffleChallengeId,
        decision,
        kpiKeys: challenge.kpiKeys,
        completed: true,
        className: "spreadsheet-kpi-impact",
      })}
      ${renderWorkflowComparison()}
      <blockquote class="workflow-principle">
        The biggest improvement was not adding another tool. It was removing unnecessary work and making the information flow consistent.
      </blockquote>
      <p class="scenario-disclaimer">
        Illustrative scenario outcome. The values show how a clearer, standardised workflow can reduce repeated planning effort; they are not a forecast.
      </p>
      <section class="capability-outcome" aria-labelledby="spreadsheetCapabilityOutcomeTitle">
        <div>
          <span>Capability revealed</span>
          <h3 id="spreadsheetCapabilityOutcomeTitle">${challenge.unlockLabel}</h3>
        </div>
        <p>
          Automation is now applied to a clearer, standardised planning process. People can focus on meaningful schedule exceptions instead of reconciling copies of the same update.
        </p>
      </section>
      <div class="decision-outcome__actions">
        ${renderCompletionAction(challenge)}
      </div>
    </section>
  `;
}

function renderAutomationSection(state, challenge) {
  const progress = state.spreadsheetShuffle;
  const completed = state.completedChallenges.includes(spreadsheetShuffleChallengeId);

  if (!isSpreadsheetShuffleStandardised(progress)) {
    return "";
  }

  const selectedOption = progress.automationId
    ? getSpreadsheetShuffleAutomationById(progress.automationId)
    : null;

  if (progress.automationId && !selectedOption) {
    throw new Error("The selected Spreadsheet Shuffle automation option is unavailable.");
  }

  if (completed) {
    const completionDecision =
      selectedOption ??
      spreadsheetShuffleAutomationOptions.find((option) => option.completesChallenge);

    if (!completionDecision) {
      throw new Error("The Spreadsheet Shuffle completion requires an automation decision.");
    }

    return renderCompletionOutcome(state, challenge, completionDecision);
  }

  if (selectedOption) {
    return renderOptionOutcome(
      selectedOption,
      "spreadsheet-automation",
      "retry-spreadsheet-shuffle-automation",
      "Choose a different automation",
    );
  }

  return `
    <section class="improvement-decision spreadsheet-phase-decision" id="spreadsheet-automation" tabindex="-1" aria-labelledby="automationTitle">
      <div class="improvement-decision__header">
        <div>
          <p class="eyebrow">Step 3 of 3 / Automate</p>
          <h2 id="automationTitle">Automate the work that now has a clear purpose.</h2>
        </div>
        <p>
          Choose the automation that carries standard source context into the planning decision instead of speeding up an old workaround.
        </p>
      </div>
      ${progress.automationError ? `<p class="decision-gate__error" role="alert">${progress.automationError}</p>` : ""}
      ${renderOptionChoices(
        spreadsheetShuffleAutomationOptions,
        "choose-spreadsheet-shuffle-automation",
      )}
    </section>
  `;
}

export function renderSpreadsheetShuffle(state) {
  const challenge = getChallengeById(spreadsheetShuffleChallengeId);

  if (!challenge) {
    throw new Error("The Spreadsheet Shuffle challenge data is unavailable.");
  }

  const progress = state.spreadsheetShuffle;
  const removalStatus = getSpreadsheetShuffleRemovalStatus(progress);
  const completed = state.completedChallenges.includes(spreadsheetShuffleChallengeId);

  return `
    <div class="page-shell">
      ${renderNav(state)}
      <main id="main-content">
        <article class="spreadsheet-shuffle-page" aria-labelledby="screen-title">
          <div class="challenge-game-back">
            <button class="button button--secondary button--quiet button--back" type="button" data-action="close-challenge">
              <span class="button-arrow" aria-hidden="true"><-</span> Challenge map
            </button>
          </div>

          <header class="challenge-game-header">
            <div>
              <p class="eyebrow">Challenge ${challenge.number} / ${challenge.phase}</p>
              <h1 id="screen-title" tabindex="-1">The Spreadsheet Shuffle</h1>
              <p>
                A planner spends the morning copying updates between spreadsheets, checking ERP information, and waiting on email confirmations. Improve the route before deciding what should be automated.
              </p>
            </div>
            <aside class="challenge-game-brief" aria-label="Challenge objective">
              <span>Operational focus</span>
              <strong>Turn one fragmented planning update into a clear, connected workflow.</strong>
              <dl>
                <div>
                  <dt>Activities</dt>
                  <dd>8 to 4</dd>
                </div>
                <div>
                  <dt>Cycle time</dt>
                  <dd>47 to 12 min</dd>
                </div>
                <div>
                  <dt>Stages complete</dt>
                  <dd>${Number(isSpreadsheetShuffleSimplified(progress)) + Number(isSpreadsheetShuffleStandardised(progress)) + Number(completed)} / 3</dd>
                </div>
              </dl>
            </aside>
          </header>

          ${renderChallengeJourney(state, challenge)}
          ${renderMissionTrail(state, removalStatus)}
          ${renderWorkflowBoard(state)}
          ${renderSimplificationSection(progress, removalStatus, completed)}
          ${renderStandardisationSection(progress, completed)}
          ${renderAutomationSection(state, challenge)}
        </article>
      </main>
      ${renderFooter(state)}
    </div>
  `;
}
