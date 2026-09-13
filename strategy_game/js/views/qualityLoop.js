import { getChallengeById, kpiDefinitions } from "../data.js";
import {
  getQualityLoopConnectionById,
  getQualityLoopDiagnosisById,
  getQualityLoopDecisionById,
  getQualityLoopInvestigationStatus,
  getQualityLoopNodeById,
  qualityLoopChallengeId,
  qualityLoopConnections,
  qualityLoopDecisions,
  qualityLoopDiagnoses,
  qualityLoopNodes,
} from "../miniGames/qualityLoop.js";
import { renderFooter, renderHeader } from "./shared.js";

const relevantKpis = ["quality", "visibility", "productivity"];

function getMissionStepClass(completed, current) {
  if (completed) {
    return "is-complete";
  }

  return current ? "is-current" : "is-locked";
}

function getRevealedConnections(progress) {
  return progress.revealedConnectionIds.map((connectionId) => {
    const connection = getQualityLoopConnectionById(connectionId);

    if (!connection) {
      throw new Error(`Unknown revealed Quality Loop connection: ${connectionId}`);
    }

    return connection;
  });
}

function getSelectedDiagnosis(progress) {
  if (!progress.diagnosisId) {
    return null;
  }

  const diagnosis = getQualityLoopDiagnosisById(progress.diagnosisId);

  if (!diagnosis) {
    throw new Error(`Unknown selected Quality Loop diagnosis: ${progress.diagnosisId}`);
  }

  return diagnosis;
}

function getSelectedDecision(progress) {
  if (!progress.improvementId) {
    return null;
  }

  const decision = getQualityLoopDecisionById(progress.improvementId);

  if (!decision) {
    throw new Error(`Unknown selected Quality Loop improvement: ${progress.improvementId}`);
  }

  return decision;
}

function renderMissionTrail(state, status) {
  const progress = state.qualityLoop;
  const completed = state.completedChallenges.includes(qualityLoopChallengeId);
  const hasStartedInvestigation =
    Boolean(progress.selectedNodeId) || progress.revealedConnectionIds.length > 0;
  const hasDiagnosis = Boolean(progress.diagnosisId);
  const steps = [
    {
      number: "01",
      label: "Map the signal",
      detail: "Defect rate rising",
      completed: hasStartedInvestigation,
      current: !hasStartedInvestigation,
    },
    {
      number: "02",
      label: "Connect records",
      detail: `${status.leadConnections} / ${status.requiredLeadConnections} lead links`,
      completed: status.canDiagnose || hasDiagnosis || completed,
      current: hasStartedInvestigation && !status.canDiagnose,
    },
    {
      number: "03",
      label: "Test the cause",
      detail: hasDiagnosis ? "Hypothesis reviewed" : "Identify the source",
      completed: Boolean(getSelectedDiagnosis(progress)?.isLikelyCause) || completed,
      current: status.canDiagnose && !hasDiagnosis && !completed,
    },
    {
      number: "04",
      label: "Make it useful",
      detail: completed ? "Capability available" : "Connect the response",
      completed,
      current: Boolean(getSelectedDiagnosis(progress)?.isLikelyCause) && !completed,
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

function renderDataNode(node, progress) {
  const selected = progress.selectedNodeId === node.id;
  const connectionCount = qualityLoopConnections.filter(
    (connection) =>
      connection.nodeIds.includes(node.id) &&
      progress.revealedConnectionIds.includes(connection.id),
  ).length;
  const stateLabel = selected
    ? "Selected to compare"
    : connectionCount > 0
      ? `${connectionCount} link${connectionCount === 1 ? "" : "s"} revealed`
      : "Select record";

  return `
    <li class="quality-data-node">
      <button
        class="quality-data-node__button ${selected ? "is-selected" : ""} ${connectionCount > 0 ? "is-connected" : ""}"
        type="button"
        data-action="select-quality-loop-node"
        data-node-id="${node.id}"
        aria-pressed="${selected}"
        aria-describedby="quality-map-instructions"
      >
        <span class="quality-data-node__type">${node.type}</span>
        <strong>${node.label}</strong>
        <span class="quality-data-node__signal">${node.signal}</span>
        <span class="quality-data-node__detail">${node.detail}</span>
        <span class="quality-data-node__state">${stateLabel}</span>
      </button>
    </li>
  `;
}

function renderConnectionLines(progress) {
  return qualityLoopConnections
    .map((connection) => {
      const revealed = progress.revealedConnectionIds.includes(connection.id);

      return `
        <path
          class="quality-data-map__line ${connection.isLead ? "is-lead" : "is-context"} ${revealed ? "is-revealed" : ""}"
          d="${connection.mapPath}"
        ></path>
      `;
    })
    .join("");
}

function renderConnectionInspector(progress, status) {
  const selectedNode = progress.selectedNodeId
    ? getQualityLoopNodeById(progress.selectedNodeId)
    : null;
  const lastConnection = progress.lastConnectionId
    ? getQualityLoopConnectionById(progress.lastConnectionId)
    : null;

  if (progress.selectedNodeId && !selectedNode) {
    throw new Error(`Unknown selected Quality Loop record: ${progress.selectedNodeId}`);
  }

  if (progress.lastConnectionId && !lastConnection) {
    throw new Error(`Unknown latest Quality Loop connection: ${progress.lastConnectionId}`);
  }

  if (lastConnection) {
    return `
      <aside class="quality-link-inspector" aria-labelledby="qualityLinkInspectorTitle">
        <p class="eyebrow">Connection file</p>
        <span class="quality-link-inspector__status">${lastConnection.isLead ? "Lead evidence" : "Context checked"}</span>
        <h3 id="qualityLinkInspectorTitle">${lastConnection.title}</h3>
        <p class="quality-link-inspector__signal">${lastConnection.signal}</p>
        <p>${lastConnection.detail}</p>
        <dl class="quality-link-inspector__facts">
          <div>
            <dt>Lead links</dt>
            <dd>${status.leadConnections} / ${status.requiredLeadConnections}</dd>
          </div>
          <div>
            <dt>Material trace</dt>
            <dd>${status.hasMaterialTrace ? "Found" : "Not linked"}</dd>
          </div>
        </dl>
      </aside>
    `;
  }

  if (selectedNode) {
    return `
      <aside class="quality-link-inspector quality-link-inspector--selected" aria-labelledby="qualityLinkInspectorTitle">
        <p class="eyebrow">Connection file</p>
        <h3 id="qualityLinkInspectorTitle">${selectedNode.label} is selected.</h3>
        <p>
          Choose a second record to test whether the two sources share useful incident context.
        </p>
        <p class="quality-link-inspector__hint">
          Select the same record again if you want to clear this comparison.
        </p>
        ${progress.connectionError ? `<p class="quality-link-inspector__error" role="alert">${progress.connectionError}</p>` : ""}
      </aside>
    `;
  }

  return `
    <aside class="quality-link-inspector quality-link-inspector--empty" aria-labelledby="qualityLinkInspectorTitle">
      <p class="eyebrow">Connection file</p>
      <h3 id="qualityLinkInspectorTitle">Start with the defect signal.</h3>
      <p>
        Connect two records at a time. The map will reveal whether their combined context helps explain the repeat defect.
      </p>
      <ol class="quality-link-inspector__steps">
        <li><span>01</span><strong>Compare the signal</strong><small>Which run created the affected output?</small></li>
        <li><span>02</span><strong>Follow the trace</strong><small>Which material appears in the linked records?</small></li>
        <li><span>03</span><strong>Test the cause</strong><small>Does the evidence explain more than timing alone?</small></li>
      </ol>
      ${progress.connectionError ? `<p class="quality-link-inspector__error" role="alert">${progress.connectionError}</p>` : ""}
    </aside>
  `;
}

function renderEvidenceLedger(progress) {
  const revealedConnections = getRevealedConnections(progress);

  return `
    <section class="quality-evidence-ledger" aria-labelledby="evidenceLedgerTitle">
      <header>
        <div>
          <p class="eyebrow">Connected evidence</p>
          <h3 id="evidenceLedgerTitle">What the records now show.</h3>
        </div>
        <span>${revealedConnections.length} connection${revealedConnections.length === 1 ? "" : "s"} mapped</span>
      </header>
      ${
        revealedConnections.length
          ? `
            <ul class="quality-evidence-ledger__list">
              ${revealedConnections
                .map(
                  (connection) => `
                    <li class="${connection.isLead ? "is-lead" : "is-context"}">
                      <span>${connection.isLead ? "Lead evidence" : "Supporting context"}</span>
                      <strong>${connection.title}</strong>
                    </li>
                  `,
                )
                .join("")}
            </ul>
          `
          : `
            <p class="quality-evidence-ledger__empty">
              No relationships are mapped yet. Start by connecting the defect results with the production run that created them.
            </p>
          `
      }
    </section>
  `;
}

function renderDiagnosisGate(status, diagnosisError) {
  return `
    <section class="decision-gate" aria-labelledby="diagnosisGateTitle">
      <div>
        <p class="eyebrow">Evidence threshold</p>
        <h2 id="diagnosisGateTitle">Map the evidence before naming the cause.</h2>
        <p>
          Connect the production run, material batch, and quality result. The case needs each link before the strongest explanation can be tested.
        </p>
        ${diagnosisError ? `<p class="decision-gate__error" role="alert">${diagnosisError}</p>` : ""}
      </div>
      <ul class="decision-gate__checks">
        <li class="${status.leadConnections === status.requiredLeadConnections ? "is-complete" : ""}">
          <span>${status.leadConnections} / ${status.requiredLeadConnections}</span>
          Lead evidence links
        </li>
        <li class="${status.hasMaterialTrace ? "is-complete" : ""}">
          <span>${status.hasMaterialTrace ? "Found" : "Still needed"}</span>
          Material trace compared
        </li>
      </ul>
    </section>
  `;
}

function renderDiagnosisChoices() {
  return `
    <section class="improvement-decision quality-diagnosis" id="quality-loop-diagnosis" tabindex="-1" aria-labelledby="diagnosisTitle">
      <div class="improvement-decision__header">
        <div>
          <p class="eyebrow">Test the cause</p>
          <h2 id="diagnosisTitle">Which explanation is strongest?</h2>
        </div>
        <p>
          The shift and machine records are useful context. Choose the explanation supported by the evidence that follows the defect across records.
        </p>
      </div>
      <div class="improvement-choice-list">
        ${qualityLoopDiagnoses
          .map(
            (diagnosis, index) => `
              <button
                class="improvement-choice quality-diagnosis-choice"
                type="button"
                data-action="identify-quality-loop-cause"
                data-diagnosis-id="${diagnosis.id}"
              >
                <span class="improvement-choice__number">0${index + 1}</span>
                <strong>${diagnosis.title}</strong>
                <span class="improvement-choice__description">${diagnosis.description}</span>
                <span class="improvement-choice__effect">${diagnosis.isLikelyCause ? "Explains the pattern across records" : "Explains a signal, not the full pattern"}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderDiagnosisOutcome(diagnosis) {
  const outcomeClass = diagnosis.isLikelyCause ? "is-complete" : "is-incomplete";
  const label = diagnosis.isLikelyCause ? "Cause confirmed" : "Hypothesis consequence";

  return `
    <section
      class="decision-outcome ${outcomeClass} quality-diagnosis-outcome"
      id="quality-loop-diagnosis-outcome"
      tabindex="-1"
      aria-labelledby="diagnosisOutcomeTitle"
    >
      <div class="decision-outcome__header">
        <div>
          <p class="eyebrow">${label}</p>
          <h2 id="diagnosisOutcomeTitle">${diagnosis.outcomeTitle}</h2>
        </div>
        <p class="decision-outcome__summary">${diagnosis.outcomeSummary}</p>
      </div>
      <p class="decision-outcome__detail">${diagnosis.outcomeDetail}</p>
      <div class="quality-cause-proof">
        <span>Evidence test</span>
        <strong>${diagnosis.isLikelyCause ? "The batch trace follows the defect across production and quality." : "The evidence explains timing, but does not follow the defect across records."}</strong>
      </div>
      ${
        diagnosis.isLikelyCause
          ? ""
          : `
            <div class="decision-outcome__actions">
              <button class="button button--secondary" type="button" data-action="retry-quality-loop-diagnosis">
                Test another explanation <span class="button-arrow" aria-hidden="true">-></span>
              </button>
            </div>
          `
      }
    </section>
  `;
}

function renderImprovementChoices(decisionError) {
  return `
    <section class="improvement-decision" id="quality-loop-decision" tabindex="-1" aria-labelledby="qualityDecisionTitle">
      <div class="improvement-decision__header">
        <div>
          <p class="eyebrow">Make it useful</p>
          <h2 id="qualityDecisionTitle">Choose the first improvement.</h2>
        </div>
        <p>
          Which action makes the material-batch evidence available where production and quality teams need it next?
        </p>
      </div>
      ${decisionError ? `<p class="decision-gate__error" role="alert">${decisionError}</p>` : ""}
      <div class="improvement-choice-list">
        ${qualityLoopDecisions
          .map(
            (decision, index) => `
              <button
                class="improvement-choice"
                type="button"
                data-action="choose-quality-loop-improvement"
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

function formatDelta(delta) {
  if (delta === 0) {
    return "No immediate change";
  }

  return `${delta > 0 ? "+" : ""}${delta} pts`;
}

function renderKpiImpact(state, decision, completed) {
  return `
    <dl class="decision-kpi-impact">
      ${relevantKpis
        .map((key) => {
          const impact = decision.kpiChanges[key];
          const before = completed ? state.kpis[key].previous : state.kpis[key].current;
          const after = completed ? state.kpis[key].current : before + impact.delta;
          const changeClass = impact.delta > 0 ? "is-positive" : "is-neutral";

          return `
            <div class="decision-kpi-impact__item">
              <dt>${kpiDefinitions[key].label}</dt>
              <dd>
                <strong>${before}% <span aria-hidden="true">-></span> ${after}%</strong>
                <span class="${changeClass}">${formatDelta(impact.delta)}</span>
                <small>${impact.explanation}</small>
              </dd>
            </div>
          `;
        })
        .join("")}
    </dl>
  `;
}

function renderDecisionOutcome(state, decision, challenge, completed) {
  const outcomeLabel = completed ? "Reveal and measure" : "Decision consequence";
  const outcomeClass = completed ? "is-complete" : "is-incomplete";

  return `
    <section
      class="decision-outcome ${outcomeClass}"
      id="quality-loop-outcome"
      tabindex="-1"
      aria-labelledby="qualityOutcomeTitle"
    >
      <div class="decision-outcome__header">
        <div>
          <p class="eyebrow">${outcomeLabel}</p>
          <h2 id="qualityOutcomeTitle">${decision.outcomeTitle}</h2>
        </div>
        <p class="decision-outcome__summary">${decision.outcomeSummary}</p>
      </div>
      <p class="decision-outcome__detail">${decision.outcomeDetail}</p>
      ${renderKpiImpact(state, decision, completed)}
      <p class="scenario-disclaimer">
        Illustrative scenario outcome. These changes show how shared production and quality context supports a faster response; they are not a forecast.
      </p>
      ${
        completed
          ? `
            <section class="capability-outcome" aria-labelledby="qualityCapabilityOutcomeTitle">
              <div>
                <span>Capability revealed</span>
                <h3 id="qualityCapabilityOutcomeTitle">${challenge.unlockLabel}</h3>
              </div>
              <p>
                Production runs, quality results, material batches, machine state, and shift context can now be reviewed as one connected case before the team decides how to respond.
              </p>
            </section>
            <div class="decision-outcome__actions">
              <button class="button button--primary" type="button" data-action="close-challenge">
                Return to challenge map <span class="button-arrow" aria-hidden="true">-></span>
              </button>
            </div>
          `
          : `
            <div class="decision-outcome__actions">
              <button class="button button--secondary" type="button" data-action="retry-quality-loop-improvement">
                Choose another first improvement <span class="button-arrow" aria-hidden="true">-></span>
              </button>
            </div>
          `
      }
    </section>
  `;
}

function renderDecisionSection(state, challenge, status) {
  const progress = state.qualityLoop;
  const completed = state.completedChallenges.includes(qualityLoopChallengeId);
  const selectedDiagnosis = getSelectedDiagnosis(progress);
  const selectedDecision = getSelectedDecision(progress);

  if (completed) {
    const completionDecision =
      selectedDecision ??
      qualityLoopDecisions.find((decision) => decision.completesChallenge);

    if (!completionDecision) {
      throw new Error("The Quality Loop completion requires a decision outcome.");
    }

    return renderDecisionOutcome(state, completionDecision, challenge, true);
  }

  if (!selectedDiagnosis) {
    return status.canDiagnose
      ? renderDiagnosisChoices()
      : renderDiagnosisGate(status, progress.diagnosisError);
  }

  if (!selectedDiagnosis.isLikelyCause) {
    return renderDiagnosisOutcome(selectedDiagnosis);
  }

  if (selectedDecision) {
    return `${renderDiagnosisOutcome(selectedDiagnosis)}${renderDecisionOutcome(state, selectedDecision, challenge, false)}`;
  }

  return `${renderDiagnosisOutcome(selectedDiagnosis)}${renderImprovementChoices(progress.decisionError)}`;
}

export function renderQualityLoop(state) {
  const challenge = getChallengeById(qualityLoopChallengeId);

  if (!challenge) {
    throw new Error("The Quality Loop challenge data is unavailable.");
  }

  const progress = state.qualityLoop;
  const status = getQualityLoopInvestigationStatus(progress);
  const selectedDiagnosis = getSelectedDiagnosis(progress);

  return `
    <div class="page-shell">
      ${renderHeader(state, "challenge")}
      <main id="main-content">
        <article class="quality-loop-page" aria-labelledby="screen-title">
          <div class="challenge-game-back">
            <button class="button button--secondary button--quiet button--back" type="button" data-action="close-challenge">
              <span class="button-arrow" aria-hidden="true"><-</span> Challenge map
            </button>
          </div>

          <header class="challenge-game-header">
            <div>
              <p class="eyebrow">Challenge 02 / Connect information</p>
              <h1 id="screen-title" tabindex="-1">The Quality Loop</h1>
              <p>
                Defects are rising on Line 03. Production sees a machine change, quality sees failed samples, and the material trace sits somewhere else. Connect the records before deciding what happened.
              </p>
            </div>
            <aside class="challenge-game-brief" aria-label="Challenge objective">
              <span>Mission 02</span>
              <strong>Find the evidence that reveals the most likely source of the repeat defect.</strong>
              <dl>
                <div>
                  <dt>Defect rate</dt>
                  <dd>12% seam defects</dd>
                </div>
                <div>
                  <dt>Lead links</dt>
                  <dd>${status.leadConnections} / ${status.requiredLeadConnections}</dd>
                </div>
                <div>
                  <dt>Likely source</dt>
                  <dd>${selectedDiagnosis?.isLikelyCause ? "MB-482" : "To confirm"}</dd>
                </div>
              </dl>
            </aside>
          </header>

          ${renderMissionTrail(state, status)}

          <section class="quality-loop-investigation" aria-labelledby="qualityMapTitle">
            <div class="quality-loop-investigation__heading">
              <div>
                <p class="eyebrow">Case mapping board</p>
                <h2 id="qualityMapTitle">Connect the records that explain the defect.</h2>
                <p id="quality-map-instructions">
                  Select one record, then a second to compare their incident context. A revealed path shows a useful relationship; select the same record again to clear it.
                </p>
              </div>
            </div>

            <div class="quality-loop-investigation__layout">
              <section class="quality-data-map" aria-label="Production and quality evidence map">
                <div class="quality-data-map__meta">
                  <span>Line 03 / incident 584</span>
                  <span>14:00 - 16:00</span>
                  <span>Illustrative case record</span>
                </div>
                <div class="quality-data-map__canvas">
                  <svg class="quality-data-map__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    ${renderConnectionLines(progress)}
                  </svg>
                  <ol class="quality-data-map__nodes">
                    ${qualityLoopNodes.map((node) => renderDataNode(node, progress)).join("")}
                  </ol>
                </div>
              </section>
              ${renderConnectionInspector(progress, status)}
            </div>

            ${renderEvidenceLedger(progress)}
          </section>

          ${renderDecisionSection(state, challenge, status)}
        </article>
      </main>
      ${renderFooter()}
    </div>
  `;
}
