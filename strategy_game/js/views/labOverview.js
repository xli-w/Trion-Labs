import {
  capabilityStages,
  challenges,
  getCapabilityStage,
  kpiDefinitions,
  operationAreas,
  upgrades,
} from "../data.js";
import { getChallengeReadiness } from "../miniGames/registry.js";
import { renderFooter, renderHeader } from "./shared.js";

function formatKpiValue(kpi) {
  return `${kpi.current}<small>${kpi.unit}</small>`;
}

function renderKpiChange(kpi) {
  const delta = kpi.current - kpi.previous;

  if (delta === 0) {
    return '<span class="kpi-change">Starting point</span>';
  }

  const direction = delta > 0 ? "is-positive" : "is-negative";
  const sign = delta > 0 ? "+" : "";
  return `<span class="kpi-change ${direction}">${sign}${delta}${kpi.unit} since decision</span>`;
}

function renderKpiCards(state) {
  return `
    <dl class="kpi-grid">
      ${Object.entries(state.kpis)
        .map(
          ([key, kpi]) => `
            <div class="kpi-card">
              <dt title="${kpiDefinitions[key].description}">${kpiDefinitions[key].label}</dt>
              <dd class="kpi-value">${formatKpiValue(kpi)}</dd>
              <span class="kpi-meter" aria-hidden="true" style="--kpi-progress: ${Math.min(100, Math.round((kpi.current / kpi.target) * 100))}%"><i></i></span>
              <footer>
                ${renderKpiChange(kpi)}
                <span class="kpi-target">Target ${kpi.target}${kpi.unit}</span>
              </footer>
            </div>
          `,
        )
        .join("")}
    </dl>
  `;
}

function renderOperationMap(state) {
  const stage = getCapabilityStage(state.capabilityStage);
  const hasProductionQualityIntegration = state.unlockedUpgrades.includes(
    "production-quality-integration",
  );
  const hasWorkflowAutomation = state.unlockedUpgrades.includes("workflow-automation");
  const insightLabel = hasWorkflowAutomation || hasProductionQualityIntegration
    ? "New shared capability"
    : "Current condition";
  const insightTitle = hasWorkflowAutomation
    ? "Planning updates now follow a shared, automated route."
    : hasProductionQualityIntegration
      ? "Production and quality now share a traceable record."
      : `${stage.name} operations need clearer shared context.`;
  const insightCopy = hasWorkflowAutomation
    ? "Production and ERP context travel with the planning update, reducing copied figures and giving people a clearer schedule to work from."
    : hasProductionQualityIntegration
      ? "Defect signals can be compared with the production conditions and material trace that created them."
      : stage.description;

  return `
    <div class="operations-layout">
      <div class="operations-map" data-stage="${state.capabilityStage}" aria-label="Operational model at ${stage.name} capability stage">
        <span class="operations-connection operations-connection--production-quality ${hasProductionQualityIntegration ? "is-active" : ""}" aria-hidden="true"></span>
        ${
          hasProductionQualityIntegration
            ? '<p class="sr-only">Production and quality information are connected in the operational model.</p>'
            : ""
        }
        ${operationAreas
          .map(
            (area) => `
              <article class="operations-node ${state.capabilityStage >= area.activeAt ? "is-active" : ""}">
                <span>${area.label}</span>
                <strong>${area.detail}</strong>
                <small>${state.capabilityStage >= area.activeAt ? "Context is available" : "Connection will unlock"}</small>
              </article>
            `,
          )
          .join("")}
      </div>
      <aside class="map-insight">
        <div>
          <span>${insightLabel}</span>
          <strong>${insightTitle}</strong>
        </div>
        <p>${insightCopy}</p>
      </aside>
    </div>
  `;
}

function getChallengeStateLabel(readiness) {
  if (readiness.completed) {
    return "Completed";
  }

  if (readiness.canLaunch) {
    return "Start here";
  }

  return `After ${readiness.prerequisite.title}`;
}

function renderChallengeCards(state) {
  return `
    <div class="challenge-grid">
      ${challenges
        .map((challenge) => {
          const readiness = getChallengeReadiness(challenge.id, state);
          const stateClass = readiness.completed || readiness.canLaunch ? "is-available" : "";
          const actionLabel =
            readiness.completed
              ? "Review outcome"
              : challenge.id === "missing-minutes"
                ? "Investigate timeline"
                : challenge.id === "quality-loop" && readiness.canLaunch
                  ? "Connect records"
                    : challenge.id === "spreadsheet-shuffle" && readiness.canLaunch
                      ? "Redesign workflow"
                    : "Review scenario";

          return `
            <article class="challenge-card ${readiness.canLaunch ? "is-current" : ""}">
              <div class="challenge-card__topline">
                <span class="challenge-number">Challenge ${challenge.number}</span>
                <span class="challenge-state ${stateClass}">${getChallengeStateLabel(readiness)}</span>
              </div>
              <h3>${challenge.title}</h3>
              <p>${challenge.story}</p>
              <div class="challenge-card__meta">
                <span>Expected capability</span>
                <strong>${challenge.unlockLabel}</strong>
              </div>
              <button
                class="button button--secondary"
                type="button"
                data-action="review-challenge"
                data-challenge-id="${challenge.id}"
              >
                ${actionLabel} <span class="button-arrow" aria-hidden="true">-></span>
              </button>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderCapabilityCards(capabilitySet, state) {
  return capabilitySet
    .map((upgrade) => {
      const unlocked = state.unlockedUpgrades.includes(upgrade.id);

      return `
        <article class="capability-card ${unlocked ? "is-unlocked" : ""}">
          <span class="capability-card__type">${upgrade.type}</span>
          <span class="capability-card__status">${unlocked ? "Unlocked" : "Path ahead"}</span>
          <h4>${upgrade.title}</h4>
          <p>${upgrade.description}</p>
        </article>
      `;
    })
    .join("");
}

function renderCapabilityGroup(label, title, description, capabilitySet, state) {
  return `
    <section class="capability-group" aria-label="${title}">
      <header class="capability-group__header">
        <div>
          <span>${label}</span>
          <h3>${title}</h3>
        </div>
        <p>${description}</p>
      </header>
      <div class="capability-list">
        ${renderCapabilityCards(capabilitySet, state)}
      </div>
    </section>
  `;
}

function renderCapabilities(state) {
  const methodology = upgrades.filter((upgrade) => upgrade.type === "Method");
  const connections = upgrades.filter((upgrade) => upgrade.type === "Connection");

  return `
    <div class="capability-layout">
      <div class="capability-groups">
        ${renderCapabilityGroup(
          "Methodology",
          "Improve the way work flows.",
          "The practical methods that make change useful and repeatable.",
          methodology,
          state,
        )}
        ${renderCapabilityGroup(
          "Connected capability",
          "Create a shared operational view.",
          "Connections unlock only where they make the next decision easier.",
          connections,
          state,
        )}
      </div>
      <aside class="resource-card">
        <span class="resource-card__label">Available capacity</span>
        <h3>Improve with intent.</h3>
        <p>
          Capacity is deliberate. Good transformation means making the right improvement in the right order.
        </p>
        <dl class="resource-list">
          <div>
            <dt>Improvement moves</dt>
            <dd>${state.resources.improvementCapacity}</dd>
          </div>
          <div>
            <dt>Connection moves</dt>
            <dd>${state.resources.integrationCapacity}</dd>
          </div>
          <div>
            <dt>Unlocked capabilities</dt>
            <dd>${state.unlockedUpgrades.length}</dd>
          </div>
        </dl>
      </aside>
    </div>
  `;
}

function renderPerformance(state) {
  return `
    <div class="performance-grid">
      <table class="performance-table">
        <caption class="sr-only">Current operational performance</caption>
        <thead>
          <tr>
            <th scope="col">Measure</th>
            <th scope="col">Current</th>
            <th scope="col">Target</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(state.kpis)
            .map(
              ([key, kpi]) => `
                <tr>
                  <th scope="row">${kpiDefinitions[key].label}</th>
                  <td><strong>${kpi.current}${kpi.unit}</strong></td>
                  <td><small>${kpi.target}${kpi.unit}</small></td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <aside class="performance-insight">
        <span>Starting performance</span>
        <strong>Visibility is the first constraint.</strong>
        <p>
          The operation is producing, but the information needed to explain loss and coordinate a response is scattered.
        </p>
      </aside>
    </div>
  `;
}

export function renderLabOverview(state) {
  const stage = getCapabilityStage(state.capabilityStage);
  const stageProgress = `${(state.capabilityStage / capabilityStages.length) * 100}%`;

  return `
    <div class="page-shell">
      ${renderHeader(state, "overview")}
      <main id="main-content">
        <section class="lab-hero" id="overview" aria-labelledby="screen-title">
          <div>
            <p class="eyebrow">Operational strategy experience</p>
            <h1 class="lab-title" id="screen-title" tabindex="-1">
              Start with the work.<br /><span class="heading-accent">Then improve the flow.</span>
            </h1>
            <p class="lab-copy">
              This operation is functioning, but its information, decisions, and handoffs are fragmented.
              Follow the challenges to make the next improvement visible.
            </p>
          </div>
          <aside class="lab-summary" aria-label="Operational score and capability stage">
            <div class="score-ring" style="--score: ${state.operationalScore}%"><strong>${state.operationalScore}</strong></div>
            <div class="summary-copy">
              <span>Operational score</span>
              <strong>Stage ${stage.stage}: ${stage.name}</strong>
              <small>${stage.description}</small>
            </div>
          </aside>
        </section>

        <section class="lab-section lab-section--surface" aria-labelledby="healthTitle">
          <div class="section-topline">
            <div>
              <p class="eyebrow">Operational health</p>
              <h2 id="healthTitle">Make the condition visible.</h2>
            </div>
            <p>These measures are the health system for the operation. Improvements will change only the measures they meaningfully affect.</p>
          </div>
          ${renderKpiCards(state)}
        </section>

        <section class="lab-section" aria-labelledby="modelTitle">
          <div class="section-topline">
            <div>
              <p class="eyebrow">The operation</p>
              <h2 id="modelTitle">One operation. Shared context.</h2>
            </div>
            <p>Every connection should create a practical new capability, not merely increase a number.</p>
          </div>
          <div class="stage-line" aria-label="Capability progression">
            <span>Stage ${stage.stage} of ${capabilityStages.length}</span>
            <span class="stage-track" aria-hidden="true" style="--stage-progress: ${stageProgress}"><i></i></span>
            <strong>${stage.name}</strong>
          </div>
          ${renderOperationMap(state)}
        </section>

        <section class="lab-section lab-section--surface" id="challenges" aria-labelledby="challengesTitle">
          <div class="section-topline">
            <div>
              <p class="eyebrow">Challenge map</p>
              <h2 id="challengesTitle">Six ways to find the friction.</h2>
            </div>
            <p>Start with the highlighted scenario, then follow the operational questions that each new capability makes possible.</p>
          </div>
          ${renderChallengeCards(state)}
        </section>

        <section class="lab-section" id="capabilities" aria-labelledby="capabilitiesTitle">
          <div class="section-topline">
            <div>
              <p class="eyebrow">Capability path</p>
              <h2 id="capabilitiesTitle">Methods first. Connections with purpose.</h2>
            </div>
            <p>Trion methodology and practical integration form the improvement system, without hiding the real operational work.</p>
          </div>
          ${renderCapabilities(state)}
        </section>

        <section class="lab-section lab-section--surface" id="performance" aria-labelledby="performanceTitle">
          <div class="section-topline">
            <div>
              <p class="eyebrow">Performance baseline</p>
              <h2 id="performanceTitle">Measure what changes.</h2>
            </div>
            <p>Use the starting condition to judge the next decision. A balanced improvement creates the conditions for the one after it.</p>
          </div>
          ${renderPerformance(state)}
        </section>
      </main>
      ${renderFooter()}
    </div>
  `;
}
