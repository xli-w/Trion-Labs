import { getChallengeById, kpiDefinitions } from "../data.js";
import {
  deliveryDominoChallengeId,
  deliveryDominoDecisions,
  deliveryDominoDependencies,
  deliveryDominoOrders,
  getDeliveryDominoDecisionById,
  getDeliveryDominoDependencyById,
  getDeliveryDominoTraceStatus,
  isDeliveryDominoDependencyAvailable,
} from "../miniGames/deliveryDomino.js";
import { renderFooter, renderHeader } from "./shared.js";

const relevantKpis = ["delivery", "visibility", "throughput"];

function getMissionStepClass(completed, current) {
  if (completed) {
    return "is-complete";
  }

  return current ? "is-current" : "is-locked";
}

function getSelectedDependency(progress) {
  if (!progress.selectedDependencyId) {
    return null;
  }

  const dependency = getDeliveryDominoDependencyById(progress.selectedDependencyId);

  if (!dependency) {
    throw new Error(
      `Unknown selected Delivery Domino dependency: ${progress.selectedDependencyId}`,
    );
  }

  return dependency;
}

function getSelectedDecision(progress) {
  if (!progress.decisionId) {
    return null;
  }

  const decision = getDeliveryDominoDecisionById(progress.decisionId);

  if (!decision) {
    throw new Error(`Unknown selected Delivery Domino improvement: ${progress.decisionId}`);
  }

  return decision;
}

function renderMissionTrail(state, status) {
  const progress = state.deliveryDomino;
  const completed = state.completedChallenges.includes(deliveryDominoChallengeId);
  const hasStartedTrace = progress.inspectedDependencyIds.length > 0;
  const hasDecision = Boolean(progress.decisionId);
  const steps = [
    {
      number: "01",
      label: "See the alert",
      detail: "Coil 18 is late",
      completed: hasStartedTrace,
      current: !hasStartedTrace,
    },
    {
      number: "02",
      label: "Trace the chain",
      detail: `${status.inspectedCount} / ${status.requiredDependencies} dependencies`,
      completed: status.isComplete || hasDecision || completed,
      current: hasStartedTrace && !status.isComplete,
    },
    {
      number: "03",
      label: "Choose the response",
      detail: hasDecision ? "Intervention reviewed" : "Reduce disruption",
      completed: completed,
      current: status.isComplete && !completed,
    },
    {
      number: "04",
      label: "Share the view",
      detail: completed ? "Capability available" : "Capability ahead",
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

function getDependencyStateLabel(dependency, progress, completed) {
  const traced = progress.inspectedDependencyIds.includes(dependency.id);

  if (completed) {
    return "Connected to response";
  }

  if (progress.selectedDependencyId === dependency.id) {
    return "Viewing impact";
  }

  if (traced) {
    return "Dependency traced";
  }

  if (isDeliveryDominoDependencyAvailable(dependency.id, progress)) {
    return "Trace this dependency";
  }

  const prerequisite = getDeliveryDominoDependencyById(dependency.dependsOn);

  if (!prerequisite) {
    throw new Error(`Missing Delivery Domino prerequisite: ${dependency.dependsOn}`);
  }

  return `Trace ${prerequisite.label} first`;
}

function renderDependencyNode(dependency, index, progress, completed) {
  const traced = progress.inspectedDependencyIds.includes(dependency.id);
  const selected = progress.selectedDependencyId === dependency.id;
  const available = traced || isDeliveryDominoDependencyAvailable(dependency.id, progress);
  const stateLabel = getDependencyStateLabel(dependency, progress, completed);
  const classes = [
    "domino-chain__item",
    traced ? "is-traced" : "",
    selected ? "is-selected" : "",
    completed ? "is-connected" : "",
    !available ? "is-locked" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <li class="${classes}" style="--domino-step: ${index}">
      <button
        class="domino-chain__node"
        type="button"
        data-action="inspect-delivery-domino-dependency"
        data-dependency-id="${dependency.id}"
        aria-pressed="${selected}"
        aria-describedby="delivery-domino-instructions"
        ${available ? "" : "disabled"}
      >
        <span class="domino-chain__type">${dependency.type}</span>
        <strong>${dependency.label}</strong>
        <span class="domino-chain__signal">${dependency.signal}</span>
        <span class="domino-chain__detail">${dependency.detail}</span>
        <span class="domino-chain__state">${stateLabel}</span>
      </button>
    </li>
  `;
}

function renderOrders(completed) {
  return `
    <section class="domino-order-panel" aria-labelledby="deliveryOrdersTitle">
      <header>
        <div>
          <p class="eyebrow">Affected work</p>
          <h3 id="deliveryOrdersTitle">${
            completed
              ? "The response now protects the remaining capacity."
              : "Three customer commitments depend on this chain."
          }</h3>
        </div>
        <span>${completed ? "One arrival confirmation remains" : "Two orders at risk"}</span>
      </header>
      <ul class="domino-order-list">
        ${deliveryDominoOrders
          .map(
            (order) => `
              <li class="${completed ? "is-managed" : "is-risk"}">
                <div>
                  <span>${order.reference}</span>
                  <strong>${order.customer}</strong>
                  <small>${order.commitment}</small>
                </div>
                <div>
                  <b>${completed ? order.resolvedStatus : order.currentStatus}</b>
                  <p>${completed ? order.resolvedDetail : order.currentDetail}</p>
                </div>
              </li>
            `,
          )
          .join("")}
      </ul>
    </section>
  `;
}

function renderDependencyInspector(progress, status, completed) {
  const selectedDependency = getSelectedDependency(progress);

  if (!selectedDependency) {
    return `
      <aside class="domino-inspector domino-inspector--empty" aria-labelledby="dominoInspectorTitle">
        <p class="eyebrow">Dependency file</p>
        <h3 id="dominoInspectorTitle">Start with the late material.</h3>
        <p>
          Follow the chain from logistics to the customer commitment. Each step reveals the work that depends on the one before it.
        </p>
        <ol class="domino-inspector__steps">
          <li><span>01</span><strong>Read the delay</strong><small>When will material arrive?</small></li>
          <li><span>02</span><strong>Follow the work</strong><small>Which capacity and orders depend on it?</small></li>
          <li><span>03</span><strong>Choose the response</strong><small>Where can people act earlier?</small></li>
        </ol>
        ${progress.traceError ? `<p class="domino-inspector__error" role="alert">${progress.traceError}</p>` : ""}
      </aside>
    `;
  }

  const prerequisite = selectedDependency.dependsOn
    ? getDeliveryDominoDependencyById(selectedDependency.dependsOn)
    : null;

  if (selectedDependency.dependsOn && !prerequisite) {
    throw new Error(`Missing Delivery Domino prerequisite: ${selectedDependency.dependsOn}`);
  }

  return `
    <aside class="domino-inspector ${completed ? "is-connected" : ""}" aria-labelledby="dominoInspectorTitle">
      <p class="eyebrow">Dependency file</p>
      <span class="domino-inspector__status">${
        completed ? "Response connected" : "Impact traced"
      }</span>
      <h3 id="dominoInspectorTitle">${selectedDependency.label}</h3>
      <p class="domino-inspector__signal">${selectedDependency.signal}</p>
      <dl class="domino-inspector__facts">
        <div>
          <dt>Time available</dt>
          <dd>${selectedDependency.timeAvailable}</dd>
        </div>
        <div>
          <dt>Depends on</dt>
          <dd>${prerequisite ? prerequisite.label : "Supplier arrival"}</dd>
        </div>
      </dl>
      <p class="domino-inspector__relationship">
        <strong>What spreads:</strong> ${selectedDependency.consequence}
      </p>
      <p class="domino-inspector__progress">
        ${status.inspectedCount} of ${status.requiredDependencies} dependency points traced.
      </p>
    </aside>
  `;
}

function renderDependencyBoard(state, status) {
  const progress = state.deliveryDomino;
  const completed = state.completedChallenges.includes(deliveryDominoChallengeId);
  const ordersVisible =
    completed || progress.inspectedDependencyIds.includes("customer-orders");

  return `
    <section class="delivery-domino-investigation" aria-labelledby="dependencyTitle">
      <div class="delivery-domino-investigation__heading">
        <div>
          <p class="eyebrow">Dependency trace</p>
          <h2 id="dependencyTitle">Follow the material delay through the work.</h2>
          <p id="delivery-domino-instructions">
            Start with the supplier alert, then trace each dependency in order. The chain shows where the delay becomes a customer risk.
          </p>
        </div>
        <aside class="domino-risk-signal" aria-label="Current logistics risk">
          <span>Current exception</span>
          <strong>Coil 18 will arrive after Line 02 is due to start.</strong>
          <p>This illustrative delay is known in logistics but not yet shared across the operation.</p>
        </aside>
      </div>

      <div class="delivery-domino-investigation__layout">
        <section class="domino-chain-board" aria-label="Material delivery dependency chain">
          <div class="domino-chain-board__meta">
            <span>Current time 11:25</span>
            <span>Line 02 / Afternoon plan</span>
            <span>${completed ? "Connected response active" : "Illustrative exception"}</span>
          </div>
          <ol class="domino-chain">
            ${deliveryDominoDependencies
              .map((dependency, index) =>
                renderDependencyNode(dependency, index, progress, completed),
              )
              .join("")}
          </ol>
        </section>
        ${renderDependencyInspector(progress, status, completed)}
      </div>

      ${ordersVisible ? renderOrders(completed) : ""}
    </section>
  `;
}

function renderDecisionGate(status, decisionError) {
  const nextDependency = status.nextDependency;
  const nextLabel = nextDependency
    ? `Trace ${nextDependency.label} next to reveal the work that depends on it.`
    : "The full dependency chain is ready for a response.";

  return `
    <section class="decision-gate delivery-domino-gate" aria-labelledby="deliveryGateTitle">
      <div>
        <p class="eyebrow">Trace required</p>
        <h2 id="deliveryGateTitle">See the full consequence before deciding where to intervene.</h2>
        <p>${nextLabel}</p>
        ${decisionError ? `<p class="decision-gate__error" role="alert">${decisionError}</p>` : ""}
      </div>
      <ul class="decision-gate__checks">
        <li class="${status.isComplete ? "is-complete" : ""}">
          <span>${status.inspectedCount} / ${status.requiredDependencies}</span>
          Dependency points traced
        </li>
        <li class="${
          status.inspectedCount >= 4 ? "is-complete" : ""
        }">
          <span>${
            status.inspectedCount >= 4 ? "Visible" : "Still ahead"
          }</span>
          Customer impact identified
        </li>
      </ul>
    </section>
  `;
}

function renderDecisionChoices(decisionError) {
  return `
    <section class="improvement-decision delivery-domino-decision" id="delivery-domino-decision" tabindex="-1" aria-labelledby="deliveryDecisionTitle">
      <div class="improvement-decision__header">
        <div>
          <p class="eyebrow">Make the response useful</p>
          <h2 id="deliveryDecisionTitle">Where should the intervention connect?</h2>
        </div>
        <p>
          The supplier delay is already recorded. Choose the response that makes its effect on production, capacity, and customer commitments actionable before the line waits.
        </p>
      </div>
      ${decisionError ? `<p class="decision-gate__error" role="alert">${decisionError}</p>` : ""}
      <div class="improvement-choice-list">
        ${deliveryDominoDecisions
          .map(
            (decision, index) => `
              <button
                class="improvement-choice"
                type="button"
                data-action="choose-delivery-domino-improvement"
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

function getKpiChangeClass(delta) {
  if (delta > 0) {
    return "is-positive";
  }

  if (delta < 0) {
    return "is-negative";
  }

  return "is-neutral";
}

function renderKpiImpact(state, decision, completed) {
  return `
    <dl class="decision-kpi-impact delivery-domino-kpi-impact">
      ${relevantKpis
        .map((key) => {
          const impact = decision.kpiChanges[key];
          const before = completed ? state.kpis[key].previous : state.kpis[key].current;
          const after = completed
            ? state.kpis[key].current
            : Math.max(0, Math.min(100, before + impact.delta));

          return `
            <div class="decision-kpi-impact__item">
              <dt>${kpiDefinitions[key].label}</dt>
              <dd>
                <strong>${before}% <span aria-hidden="true">-></span> ${after}%</strong>
                <span class="${getKpiChangeClass(impact.delta)}">${formatDelta(impact.delta)}</span>
                <small>${impact.explanation}</small>
              </dd>
            </div>
          `;
        })
        .join("")}
    </dl>
  `;
}

function renderOutcomeComparison() {
  return `
    <section class="domino-outcome-comparison" aria-labelledby="dominoComparisonTitle">
      <header>
        <div>
          <p class="eyebrow">Before and after</p>
          <h3 id="dominoComparisonTitle">The exception now reaches people before the line waits.</h3>
        </div>
        <span>Illustrative response window</span>
      </header>
      <dl>
        <div>
          <dt>Orders at risk</dt>
          <dd><span>2</span><i aria-hidden="true">-></i><strong>1 confirmation</strong></dd>
        </div>
        <div>
          <dt>Usable warning</dt>
          <dd><span>0 min</span><i aria-hidden="true">-></i><strong>35 min</strong></dd>
        </div>
        <div>
          <dt>Capacity response</dt>
          <dd><span>Line waits</span><i aria-hidden="true">-></i><strong>Work resequenced</strong></dd>
        </div>
      </dl>
    </section>
  `;
}

function renderDecisionOutcome(state, decision, challenge, completed) {
  return `
    <section
      class="decision-outcome ${completed ? "is-complete" : "is-incomplete"} delivery-domino-outcome"
      id="delivery-domino-outcome"
      tabindex="-1"
      aria-labelledby="deliveryOutcomeTitle"
    >
      <div class="decision-outcome__header">
        <div>
          <p class="eyebrow">${completed ? "Reveal and measure" : "Decision consequence"}</p>
          <h2 id="deliveryOutcomeTitle">${decision.outcomeTitle}</h2>
        </div>
        <p class="decision-outcome__summary">${decision.outcomeSummary}</p>
      </div>
      <p class="decision-outcome__detail">${decision.outcomeDetail}</p>
      ${renderKpiImpact(state, decision, completed)}
      ${
        completed
          ? `
            ${renderOutcomeComparison()}
            <blockquote class="delivery-domino-principle">
              Connected information helps people see problems earlier and act before they spread.
            </blockquote>
          `
          : ""
      }
      <p class="scenario-disclaimer">
        Illustrative scenario outcome. The values show how a shared exception can improve the timing of a response; they are not a forecast.
      </p>
      ${
        completed
          ? `
            <section class="capability-outcome" aria-labelledby="deliveryCapabilityOutcomeTitle">
              <div>
                <span>Capability revealed</span>
                <h3 id="deliveryCapabilityOutcomeTitle">${challenge.unlockLabel}</h3>
              </div>
              <p>
                Material exceptions can now be viewed with the production schedule, available capacity, customer orders, and delivery commitments they affect.
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
              <button class="button button--secondary" type="button" data-action="retry-delivery-domino-improvement">
                Choose a response that connects the chain <span class="button-arrow" aria-hidden="true">-></span>
              </button>
            </div>
          `
      }
    </section>
  `;
}

function renderDecisionSection(state, challenge, status) {
  const progress = state.deliveryDomino;
  const completed = state.completedChallenges.includes(deliveryDominoChallengeId);
  const selectedDecision = getSelectedDecision(progress);

  if (completed) {
    const completionDecision =
      selectedDecision ??
      deliveryDominoDecisions.find((decision) => decision.completesChallenge);

    if (!completionDecision) {
      throw new Error("The Delivery Domino completion requires a decision outcome.");
    }

    return renderDecisionOutcome(state, completionDecision, challenge, true);
  }

  if (selectedDecision) {
    return renderDecisionOutcome(state, selectedDecision, challenge, false);
  }

  if (status.isComplete) {
    return renderDecisionChoices(progress.decisionError);
  }

  return renderDecisionGate(status, progress.decisionError);
}

export function renderDeliveryDomino(state) {
  const challenge = getChallengeById(deliveryDominoChallengeId);

  if (!challenge) {
    throw new Error("The Delivery Domino challenge data is unavailable.");
  }

  const status = getDeliveryDominoTraceStatus(state.deliveryDomino);
  const completed = state.completedChallenges.includes(deliveryDominoChallengeId);

  return `
    <div class="page-shell">
      ${renderHeader(state, "challenge")}
      <main id="main-content">
        <article class="delivery-domino-page" aria-labelledby="screen-title">
          <div class="challenge-game-back">
            <button class="button button--secondary button--quiet button--back" type="button" data-action="close-challenge">
              <span class="button-arrow" aria-hidden="true"><-</span> Challenge map
            </button>
          </div>

          <header class="challenge-game-header">
            <div>
              <p class="eyebrow">Challenge 04 / See the wider operation</p>
              <h1 id="screen-title" tabindex="-1">The Delivery Domino</h1>
              <p>
                A late material delivery is visible in logistics, but its consequence is still hidden from the production plan and customer commitments. Trace the dependency chain before choosing where to intervene.
              </p>
            </div>
            <aside class="challenge-game-brief" aria-label="Challenge objective">
              <span>Mission 04</span>
              <strong>Turn one late delivery into an early, shared operational response.</strong>
              <dl>
                <div>
                  <dt>Material delay</dt>
                  <dd>75 min late</dd>
                </div>
                <div>
                  <dt>At-risk orders</dt>
                  <dd>${completed ? "1 to confirm" : "2 orders"}</dd>
                </div>
                <div>
                  <dt>Chain traced</dt>
                  <dd>${status.inspectedCount} / ${status.requiredDependencies}</dd>
                </div>
              </dl>
            </aside>
          </header>

          ${renderMissionTrail(state, status)}
          ${renderDependencyBoard(state, status)}
          ${renderDecisionSection(state, challenge, status)}
        </article>
      </main>
      ${renderFooter()}
    </div>
  `;
}
