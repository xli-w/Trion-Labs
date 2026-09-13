import {
  capabilityStages,
  challenges,
  getCapabilityStage,
  hasCompletedExperience,
  kpiDefinitions,
  upgrades,
} from "../data.js";
import { getChallengeReadiness } from "../miniGames/registry.js";
import {
  connectionMapNodes,
  getOperationSnapshot,
  operation,
  operationalAreas,
  operationSystems,
} from "../operationModel.js";
import { renderDiagnosticProfile } from "./diagnosticProfile.js";
import { renderFooter, renderHeader } from "./shared.js";

function formatKpiValue(kpi) {
  return `${kpi.current}<small>${kpi.unit}</small>`;
}

function renderKpiChange(kpi) {
  const delta = kpi.current - kpi.baseline;

  if (delta === 0) {
    return '<span class="kpi-change">At starting point</span>';
  }

  const direction = delta > 0 ? "is-positive" : "is-negative";
  const sign = delta > 0 ? "+" : "";
  return `<span class="kpi-change ${direction}">${sign}${delta}${kpi.unit} from baseline</span>`;
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

function getNextAvailableChallenge(state) {
  const nextChallenge = challenges.find((challenge) =>
    getChallengeReadiness(challenge.id, state).canLaunch,
  );

  if (!nextChallenge && !hasCompletedExperience(state.completedChallenges)) {
    throw new Error("The next available challenge could not be determined.");
  }

  return nextChallenge;
}

function renderStartingSnapshot(state) {
  const snapshot = getOperationSnapshot(state);
  const nextChallenge = getNextAvailableChallenge(state);
  const action = nextChallenge
    ? `
        <button
          class="button button--primary"
          type="button"
          data-action="review-challenge"
          data-challenge-id="${nextChallenge.id}"
        >
          Investigate ${nextChallenge.title} <span class="button-arrow" aria-hidden="true">-></span>
        </button>
      `
    : `
        <button class="button button--primary" type="button" data-action="navigate" data-section="capabilities">
          Review the connected operation <span class="button-arrow" aria-hidden="true">-></span>
        </button>
      `;

  return `
    <section class="lab-section starting-snapshot" id="starting-snapshot" aria-labelledby="startingSnapshotTitle">
      <div class="section-topline">
        <div>
          <p class="eyebrow">Starting snapshot</p>
          <h2 id="startingSnapshotTitle" tabindex="-1">Working harder than it needs to.</h2>
        </div>
        <p>
          This illustrative operation has capable people and useful systems. The friction is in the handoffs between them.
        </p>
      </div>
      <div class="starting-snapshot__layout">
        <section class="snapshot-panel snapshot-panel--operation" aria-labelledby="operationProfileTitle">
          <p class="snapshot-panel__label">The operation</p>
          <h3 id="operationProfileTitle">${operation.name}</h3>
          <p class="snapshot-panel__lead">${operation.currentChallenge}</p>
          <ul class="snapshot-pressure-list">
            ${operation.pressurePoints.map((pressurePoint) => `<li>${pressurePoint}</li>`).join("")}
          </ul>
          <dl class="operation-facts">
            ${operation.profileFacts
              .map(
                (fact) => `
                  <div>
                    <dt>${fact.label}</dt>
                    <dd>${fact.value}</dd>
                  </div>
                `,
              )
              .join("")}
          </dl>
        </section>
        <aside class="snapshot-panel snapshot-panel--friction" aria-labelledby="frictionTitle">
          <p class="snapshot-panel__label">Where the flow is breaking</p>
          <h3 id="frictionTitle">Five connected friction points</h3>
          <ol class="friction-list">
            ${snapshot.frictionPoints
              .map(
                (frictionPoint) => `
                  <li class="friction-list__item is-${frictionPoint.status}">
                    <span class="friction-list__status">${frictionPoint.statusLabel}</span>
                    <div>
                      <strong>${frictionPoint.title}</strong>
                      <p>${frictionPoint.statusDescription}</p>
                    </div>
                  </li>
                `,
              )
              .join("")}
          </ol>
        </aside>
      </div>
      <div class="starting-snapshot__support">
        <section class="snapshot-panel snapshot-panel--areas" aria-labelledby="areasTitle">
          <p class="snapshot-panel__label">Operational areas</p>
          <h3 id="areasTitle">The work involved</h3>
          <ul class="operation-area-list">
            ${operationalAreas
              .map(
                (area) => `
                  <li>
                    <strong>${area.label}</strong>
                    <span>${area.detail}</span>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </section>
        <section class="snapshot-panel snapshot-panel--systems" aria-labelledby="systemsTitle">
          <p class="snapshot-panel__label">Existing systems and tools</p>
          <h3 id="systemsTitle">Information is already there</h3>
          <ul class="operation-system-list">
            ${operationSystems
              .map(
                (system) => `
                  <li>
                    <strong>${system.label}</strong>
                    <span>${system.type}</span>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </section>
      </div>
      <section class="snapshot-kpis" aria-labelledby="snapshotKpisTitle">
        <div class="snapshot-kpis__heading">
          <div>
            <p class="snapshot-panel__label">Baseline measures</p>
            <h3 id="snapshotKpisTitle">What the operation can see today.</h3>
          </div>
          <p>
            Illustrative baseline measures show where the operation has room to improve. A challenge changes only the measures it meaningfully affects.
          </p>
        </div>
        ${renderKpiCards(state)}
      </section>
      <div class="starting-snapshot__action">
        ${action}
        <p>Start with the production loss that is visible, but not yet understood.</p>
      </div>
    </section>
  `;
}

function renderOperationMap(state) {
  const snapshot = getOperationSnapshot(state);
  const nextConnection = snapshot.nextConnection;
  const relationshipSummary =
    snapshot.connectedRelationshipCount === 0
      ? "The information exists, but the relationships needed for a useful decision are incomplete."
      : "Each connected relationship gives people more useful context for the next decision.";
  const insightLabel = nextConnection ? "Next relationship to investigate" : "Connected operation";
  const insightTitle = nextConnection
    ? nextConnection.title
    : "The operation can see the response as well as the signal.";
  const insightCopy = nextConnection
    ? nextConnection.statusDescription
    : "The shared operational view connects the people, context, and consequences needed to find the next bottleneck.";

  return `
    <div class="connection-map-layout">
      <div class="connection-map" role="group" aria-label="Connection map" aria-describedby="connectionMapSummary">
        <div class="connection-map__surface">
          <svg
            class="connection-map__lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            ${snapshot.connections
              .map(
                (relationship) => `
                  <path
                    class="connection-map__path connection-map__path--${relationship.id} is-${relationship.status}"
                    d="${relationship.mapPath}"
                  />
                `,
              )
              .join("")}
          </svg>
          ${connectionMapNodes
            .map(
              (node) => `
                <div class="connection-map__node connection-map__node--${node.id}">
                  <span>${node.label}</span>
                  <strong>${node.detail}</strong>
                </div>
              `,
            )
            .join("")}
        </div>
        <p class="connection-map__summary" id="connectionMapSummary">
          <strong>${snapshot.connectedRelationshipCount} of ${snapshot.totalRelationshipCount} relationships connected</strong>
          <span>${relationshipSummary}</span>
        </p>
        <ol class="connection-map__relationships" aria-label="Connection status">
          ${snapshot.connections
            .map(
              (relationship) => `
                <li class="connection-map__relationship is-${relationship.status}">
                  <span class="connection-map__relationship-status">${relationship.statusLabel}</span>
                  <div>
                    <strong>${relationship.title}</strong>
                    <p>${relationship.statusDescription}</p>
                  </div>
                </li>
              `,
            )
            .join("")}
        </ol>
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
          const stateClass = readiness.completed
            ? "is-completed"
            : readiness.canLaunch
              ? "is-available"
              : "";
          const actionLabel =
            readiness.completed
              ? "Review outcome"
              : challenge.id === "missing-minutes"
                ? "Investigate timeline"
                : challenge.id === "quality-loop" && readiness.canLaunch
                  ? "Connect records"
                    : challenge.id === "spreadsheet-shuffle" && readiness.canLaunch
                      ? "Redesign workflow"
                      : challenge.id === "delivery-domino" && readiness.canLaunch
                        ? "Trace dependencies"
                      : challenge.id === "control-room" && readiness.canLaunch
                        ? "Curate operational view"
                        : "Review scenario";

          return `
            <article class="challenge-card ${readiness.canLaunch ? "is-current" : ""}">
              <div class="challenge-card__topline">
                <span class="challenge-number">Challenge ${challenge.number}</span>
                <span class="challenge-state ${stateClass}">${getChallengeStateLabel(readiness)}</span>
              </div>
              <h3>${challenge.title}</h3>
              <span class="challenge-phase">${challenge.phase}</span>
              <p>${challenge.story}</p>
              <div class="challenge-card__meta">
                <span>Capability this creates</span>
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

function renderCapabilityProgress(state) {
  const experienceComplete = hasCompletedExperience(state.completedChallenges);
  const stage = getCapabilityStage(state.capabilityStage);
  const nextChallenge = challenges.find(
    (challenge) => !state.completedChallenges.includes(challenge.id),
  );

  if (!experienceComplete && !nextChallenge) {
    throw new Error("The next operational question could not be determined.");
  }

  return `
    <aside class="resource-card capability-progress-card">
      <span class="resource-card__label">Operating model</span>
      <h3>${experienceComplete ? "Ready to improve again." : `${nextChallenge.title} is the next question.`}</h3>
      <p>
        ${
          experienceComplete
            ? "Visible, connected context now makes the next bottleneck easier to investigate."
            : `${nextChallenge.journeySummary} Each capability creates the context for the question that follows.`
        }
      </p>
      <dl class="resource-list">
        <div>
          <dt>Challenges completed</dt>
          <dd>${state.completedChallenges.length} / ${challenges.length}</dd>
        </div>
        <div>
          <dt>Current stage</dt>
          <dd>Stage ${stage.stage}: ${stage.name}</dd>
        </div>
        <div>
          <dt>${experienceComplete ? "Next improvement" : "Next focus"}</dt>
          <dd>${experienceComplete ? "Find the next bottleneck" : nextChallenge.phase}</dd>
        </div>
      </dl>
    </aside>
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
      ${renderCapabilityProgress(state)}
    </div>
  `;
}

function renderPerformance(state) {
  const hasCentralOperationalView = state.unlockedUpgrades.includes(
    "central-operational-view",
  );

  return `
    <div class="performance-grid">
      <table class="performance-table">
        <caption class="sr-only">Current operational performance</caption>
        <thead>
          <tr>
            <th scope="col">Measure</th>
            <th scope="col">Baseline</th>
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
                  <td><small>${kpi.baseline}${kpi.unit}</small></td>
                  <td><strong>${kpi.current}${kpi.unit}</strong></td>
                  <td><small>${kpi.target}${kpi.unit}</small></td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <aside class="performance-insight">
        <span>${hasCentralOperationalView ? "Decision context improved" : "Starting performance"}</span>
        <strong>${
          hasCentralOperationalView
            ? "The right signal now reaches the right decision."
            : "Visibility is the first constraint."
        }</strong>
        <p>
          ${
            hasCentralOperationalView
              ? "A focused shared exception helps management, production, and planning coordinate the current response without turning routine detail into a priority alert."
              : "The operation is producing, but the information needed to explain loss and coordinate a response is scattered."
          }
        </p>
      </aside>
    </div>
  `;
}

function renderExperienceSummary(state) {
  if (!hasCompletedExperience(state.completedChallenges)) {
    return "";
  }

  const stage = getCapabilityStage(state.capabilityStage);
  const outcomes = challenges.map((challenge) => {
    const decision = state.decisions.find((item) => item.challengeId === challenge.id);

    if (!decision) {
      throw new Error(`${challenge.title} is complete without a recorded decision.`);
    }

    return `
      <li>
        <span>Challenge ${challenge.number} / ${challenge.phase}</span>
        <strong>${challenge.title}</strong>
        <p>${decision.title}</p>
        <small>${challenge.unlockLabel}</small>
      </li>
    `;
  });

  return `
    <section class="lab-section experience-summary" id="summary" aria-labelledby="summary-title">
      <div class="section-topline">
        <div>
          <p class="eyebrow">Trion Labs outcome</p>
          <h2 id="summary-title" tabindex="-1">The operation is moving.</h2>
        </div>
        <p>
          The five decisions now form one operating model rather than five separate responses.
        </p>
      </div>
      <div class="experience-summary__layout">
        <div class="experience-summary__intro">
          <p class="experience-summary__lead">
            The operation is moving. You have improved visibility, connected information, and made the next improvement easier to find.
          </p>
          <p>
            The outcome is a clearer way for people to see a signal, investigate its context, coordinate a response, and measure what to improve next.
          </p>
          <dl class="experience-summary__facts">
            <div>
              <dt>Capability stage</dt>
              <dd>Stage ${stage.stage}: ${stage.name}</dd>
            </div>
            <div>
              <dt>Operating capability</dt>
              <dd>Central Operational View</dd>
            </div>
            <div>
              <dt>Next improvement</dt>
              <dd>Investigate the next bottleneck from shared context.</dd>
            </div>
          </dl>
        </div>
        <aside class="experience-summary__next">
          <span>What the approach makes possible</span>
          <strong>Better understanding makes the next improvement possible.</strong>
          <p>
            This illustrative scenario shows an approach to operational improvement, not a claim that every problem is solved.
          </p>
        </aside>
      </div>
      <div class="experience-summary__evidence">
        <section aria-labelledby="summaryPathTitle">
          <p class="eyebrow">Capability path</p>
          <h3 id="summaryPathTitle">Each decision created the context for the next.</h3>
          <ol class="experience-summary__outcomes">
            ${outcomes.join("")}
          </ol>
        </section>
        <section aria-labelledby="summaryKpisTitle">
          <p class="eyebrow">Before and after</p>
          <h3 id="summaryKpisTitle">The operation has a clearer baseline for its next decision.</h3>
          <dl class="experience-summary__kpis">
            ${Object.entries(state.kpis)
              .map(
                ([key, kpi]) => `
                  <div>
                    <dt>${kpiDefinitions[key].label}</dt>
                    <dd>
                      <span>${kpi.baseline}${kpi.unit}</span>
                      <i aria-hidden="true">-></i>
                      <strong>${kpi.current}${kpi.unit}</strong>
                    </dd>
                  </div>
                `,
              )
              .join("")}
          </dl>
        </section>
      </div>
      ${renderDiagnosticProfile(state)}
      <div class="decision-outcome__actions experience-summary__actions">
        <button class="button button--primary" type="button" data-action="navigate" data-section="overview">
          Explore the operational approach <span class="button-arrow" aria-hidden="true">-></span>
        </button>
        <button class="button button--secondary" type="button" data-action="reset">
          Start again
        </button>
      </div>
    </section>
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
            <p class="eyebrow">Illustrative operation / ${operation.location}</p>
            <h1 class="lab-title" id="screen-title" tabindex="-1">
              ${operation.name}
            </h1>
            <p class="lab-copy">
              ${operation.description} ${operation.manufacturingContext}
            </p>
            <p class="operation-premise">${operation.premise}</p>
          </div>
          <aside class="lab-summary" aria-label="Illustrative operational score and capability stage">
            <div class="score-ring" style="--score: ${state.operationalScore}%"><strong>${state.operationalScore}</strong></div>
            <div class="summary-copy">
              <span>Illustrative starting score</span>
              <strong>Stage ${stage.stage}: ${stage.name}</strong>
              <small>${operation.profileFacts.map((fact) => fact.value).join(" / ")}</small>
            </div>
          </aside>
        </section>

        ${renderStartingSnapshot(state)}

        <section class="lab-section" aria-labelledby="modelTitle">
          <div class="section-topline">
            <div>
              <p class="eyebrow">Friction and connection map</p>
              <h2 id="modelTitle" tabindex="-1">Where useful context is breaking.</h2>
            </div>
            <p>Each relationship becomes useful only when it helps the right people make a better operational decision.</p>
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
              <h2 id="challengesTitle" tabindex="-1">Five connected ways to build the flow.</h2>
            </div>
            <p>Start with the highlighted scenario, then follow the operational questions that each new capability makes possible.</p>
          </div>
          ${renderChallengeCards(state)}
        </section>

        <section class="lab-section" id="capabilities" aria-labelledby="capabilitiesTitle">
          <div class="section-topline">
            <div>
              <p class="eyebrow">Capability path</p>
              <h2 id="capabilitiesTitle" tabindex="-1">Methods first. Connections with purpose.</h2>
            </div>
            <p>Trion methodology and practical integration form the improvement system, without hiding the real operational work.</p>
          </div>
          ${renderCapabilities(state)}
        </section>

        <section class="lab-section lab-section--surface" id="performance" aria-labelledby="performanceTitle">
          <div class="section-topline">
            <div>
              <p class="eyebrow">Performance baseline</p>
              <h2 id="performanceTitle" tabindex="-1">Measure what changes.</h2>
            </div>
            <p>Use the starting condition to judge the next decision. A balanced improvement creates the conditions for the one after it.</p>
          </div>
          ${renderPerformance(state)}
        </section>
        ${renderExperienceSummary(state)}
      </main>
      ${renderFooter()}
    </div>
  `;
}
