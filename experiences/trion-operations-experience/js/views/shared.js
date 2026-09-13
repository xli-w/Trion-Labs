import {
  challenges,
  getChallengeById,
  hasCompletedExperience,
  kpiDefinitions,
  navigationItems,
} from "../data.js";
import {
  getChallengeOutcomeById,
  getConnectionMapRelationshipById,
  getFrictionPointById,
  getOperationalAreaById,
  operation,
} from "../operationModel.js";
import { isDarkTheme } from "../../../../theme.js";

function getChallengeIndex(challenge) {
  const challengeIndex = challenges.findIndex((item) => item.id === challenge.id);

  if (challengeIndex === -1) {
    throw new Error(`Unknown challenge in the Trion Labs progression: ${challenge.id}`);
  }

  return challengeIndex;
}

export function getRecordedKpiImpact(state, challengeId, kpiKey) {
  const decision = state.decisions.find((item) => item.challengeId === challengeId);

  if (!decision) {
    throw new Error(`${challengeId} is complete without a recorded decision.`);
  }

  const kpiImpact = decision.kpiImpact?.[kpiKey];

  if (!kpiImpact) {
    throw new Error(`${challengeId} is missing its recorded ${kpiKey} KPI impact.`);
  }

  return kpiImpact;
}

function formatKpiDelta(delta) {
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

function getDisplayedKpiImpact(state, challengeId, kpiKey, impact, completed) {
  const kpi = state.kpis[kpiKey];

  if (!kpi || !kpiDefinitions[kpiKey]) {
    throw new Error(`Unknown KPI impact key: ${kpiKey}`);
  }

  if (completed) {
    return getRecordedKpiImpact(state, challengeId, kpiKey);
  }

  return {
    before: kpi.current,
    after: Math.max(0, Math.min(100, kpi.current + impact.delta)),
  };
}

function getChallengeReferences(challenge) {
  const referenceGroups = [
    {
      ids: challenge.frictionPointIds,
      getItemById: getFrictionPointById,
      label: "friction point",
    },
    {
      ids: challenge.operationalAreaIds,
      getItemById: getOperationalAreaById,
      label: "operational area",
    },
    {
      ids: challenge.connectionIds,
      getItemById: getConnectionMapRelationshipById,
      label: "connection-map relationship",
    },
  ];

  return referenceGroups.map(({ ids, getItemById, label }) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error(`${challenge.title} is missing ${label} references.`);
    }

    return ids.map((id) => {
      const item = getItemById(id);

      if (!item) {
        throw new Error(`${challenge.title} references an unknown ${label}: ${id}.`);
      }

      return item;
    });
  });
}

function formatReferenceLabels(items) {
  return items.map((item) => item.title ?? item.label).join(", ");
}

export function renderChallengeOperationContext(challenge) {
  const [frictionPoints, operationalAreas, relationships] = getChallengeReferences(challenge);

  if (typeof challenge.operationalProblem !== "string") {
    throw new Error(`${challenge.title} is missing its operational problem.`);
  }

  return `
    <section class="challenge-operation-context" aria-label="${operation.name} operational context">
      <div class="challenge-operation-context__intro">
        <span>${operation.name} connection</span>
        <strong>${challenge.operationalProblem}</strong>
      </div>
      <dl class="challenge-operation-context__facts">
        <div>
          <dt>Friction</dt>
          <dd>${formatReferenceLabels(frictionPoints)}</dd>
        </div>
        <div>
          <dt>Areas involved</dt>
          <dd>${formatReferenceLabels(operationalAreas)}</dd>
        </div>
        <div>
          <dt>Map relationship</dt>
          <dd>${formatReferenceLabels(relationships)}</dd>
        </div>
      </dl>
    </section>
  `;
}

export function renderChallengeCompletionContext(challenge, decision) {
  if (!decision || typeof decision.outcomeId !== "string") {
    throw new Error(`${challenge.title} is missing its recorded outcome.`);
  }

  const outcome = getChallengeOutcomeById(decision.outcomeId);

  if (!outcome || outcome.challengeId !== challenge.id) {
    throw new Error(`${challenge.title} has an inconsistent recorded outcome.`);
  }

  const [frictionPoints, , relationships] = getChallengeReferences(challenge);

  return `
    <section class="challenge-completion-context" aria-label="${operation.name} operating model update">
      <span class="challenge-completion-context__label">Operating model update</span>
      <dl class="challenge-completion-context__facts">
        <div>
          <dt>Friction addressed</dt>
          <dd>${formatReferenceLabels(frictionPoints)}</dd>
        </div>
        <div>
          <dt>Capability unlocked</dt>
          <dd>${challenge.unlockLabel}</dd>
        </div>
        <div>
          <dt>Map relationship</dt>
          <dd>${formatReferenceLabels(relationships)}</dd>
        </div>
        <div>
          <dt>Still to investigate</dt>
          <dd>${outcome.remainingWork}</dd>
        </div>
      </dl>
    </section>
  `;
}

export function renderDecisionKpiImpact({
  state,
  challengeId,
  decision,
  kpiKeys,
  completed,
  className = "",
}) {
  if (!Array.isArray(kpiKeys) || kpiKeys.length === 0) {
    throw new Error("A decision KPI impact requires at least one KPI key.");
  }

  if (!decision || typeof decision !== "object") {
    throw new Error("A decision KPI impact requires a decision.");
  }

  const modifierClass = className ? ` ${className}` : "";
  const challenge = completed ? getChallengeById(challengeId) : null;

  if (completed && !challenge) {
    throw new Error(`Unknown completed challenge: ${challengeId}`);
  }

  const kpiImpact = `
    <dl class="decision-kpi-impact${modifierClass}">
      ${kpiKeys
        .map((kpiKey) => {
          const impact = decision.kpiChanges?.[kpiKey];

          if (
            !impact ||
            !Number.isFinite(impact.delta) ||
            typeof impact.explanation !== "string"
          ) {
            throw new Error(`Decision KPI impact is missing valid ${kpiKey} data.`);
          }

          const displayedImpact = getDisplayedKpiImpact(
            state,
            challengeId,
            kpiKey,
            impact,
            completed,
          );

          return `
            <div class="decision-kpi-impact__item">
              <dt>${kpiDefinitions[kpiKey].label}</dt>
              <dd>
                <strong>${displayedImpact.before}% <span aria-hidden="true">-></span> ${displayedImpact.after}%</strong>
                <span class="${getKpiChangeClass(impact.delta)}">${formatKpiDelta(impact.delta)}</span>
                <small>${impact.explanation}</small>
              </dd>
            </div>
          `;
        })
        .join("")}
    </dl>
  `;

  return completed
    ? `${kpiImpact}${renderChallengeCompletionContext(challenge, decision)}`
    : kpiImpact;
}

function renderBrand() {
  return `
    <button class="brand-button" type="button" data-action="landing" aria-label="Return to Trion Labs introduction">
      <svg class="brand-mark" viewBox="0 0 36 36" aria-hidden="true">
        <path d="M18 2 32 10v16l-14 8L4 26V10L18 2Z" />
        <path d="M18 9v18M10 14h16M10 22h16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
        <circle cx="18" cy="9" r="2.2" />
        <circle cx="10" cy="14" r="2.2" />
        <circle cx="26" cy="14" r="2.2" />
        <circle cx="10" cy="22" r="2.2" />
        <circle cx="26" cy="22" r="2.2" />
        <circle cx="18" cy="27" r="2.2" />
      </svg>
      <span class="brand-copy">
        <strong>trion</strong>
        <span>Fabric / Labs</span>
      </span>
    </button>
  `;
}

function renderThemeToggle() {
  return `
    <button
      class="theme-toggle"
      id="theme-toggle"
      type="button"
      data-action="toggle-theme"
      aria-pressed="${isDarkTheme()}"
    >
      <span class="theme-toggle__mark" aria-hidden="true"></span>
      <span>Dark mode</span>
    </button>
  `;
}

export function renderChallengeJourney(state, challenge) {
  const challengeIndex = getChallengeIndex(challenge);
  const nextChallenge = challenges[challengeIndex + 1];

  if (!challenge.phase || !challenge.journeySummary) {
    throw new Error(`${challenge.title} is missing its progression context.`);
  }

  return `
    <section class="challenge-journey" aria-label="Trion Labs capability progression">
      <div class="challenge-journey__copy">
        <span>Trion Labs progression</span>
        <strong>${challenge.phase}</strong>
        <p>
          ${challenge.journeySummary}
          ${
            nextChallenge
              ? ` Next, ${nextChallenge.title} builds on this context.`
              : " The shared view now makes the next improvement easier to find."
          }
        </p>
      </div>
      <ol class="challenge-journey__path">
        ${challenges
          .map((item, index) => {
            const completed = state.completedChallenges.includes(item.id);
            const current = index === challengeIndex;
            const status = completed ? "Complete" : current ? "Current" : "Ahead";
            const stateClass = completed ? "is-complete" : current ? "is-current" : "is-ahead";

            return `
              <li class="challenge-journey__step ${stateClass}" ${
                current ? 'aria-current="step"' : ""
              }>
                <span>${item.number}</span>
                <strong>${item.phase}</strong>
                <small>${status}</small>
              </li>
            `;
          })
          .join("")}
      </ol>
    </section>
    ${renderChallengeOperationContext(challenge)}
  `;
}

export function renderCompletionAction(challenge) {
  const challengeIndex = getChallengeIndex(challenge);
  const nextChallenge = challenges[challengeIndex + 1];

  if (nextChallenge) {
    return `
      <button
        class="button button--primary"
        type="button"
        data-action="review-challenge"
        data-challenge-id="${nextChallenge.id}"
      >
        Continue to ${nextChallenge.title} <span class="button-arrow" aria-hidden="true">-></span>
      </button>
    `;
  }

  return `
    <button class="button button--primary" type="button" data-action="view-experience-summary">
      See the completed operation <span class="button-arrow" aria-hidden="true">-></span>
    </button>
  `;
}

export function renderHeader(state, screen) {
  const isLanding = screen === "landing";
  const visibleNavigationItems = hasCompletedExperience(state.completedChallenges)
    ? [...navigationItems, { id: "summary", label: "Summary" }]
    : navigationItems;
  const navigation = isLanding
    ? ""
    : `
      <nav class="lab-navigation" aria-label="Lab navigation">
        ${visibleNavigationItems
          .map(
            (item) => `
              <button
                class="navigation-button ${state.activeSection === item.id ? "is-active" : ""}"
                type="button"
                data-action="navigate"
                data-section="${item.id}"
                ${state.activeSection === item.id ? 'aria-current="true"' : ""}
              >
                ${item.label}
              </button>
            `,
          )
          .join("")}
      </nav>
    `;

  const actions = isLanding
    ? `
      <div class="header-actions">
        <button class="text-button" type="button" data-action="how-it-works">How it works</button>
        ${renderThemeToggle()}
        <button class="button button--primary button--quiet" type="button" data-action="enter-lab">
          Enter the Lab <span class="button-arrow" aria-hidden="true">-></span>
        </button>
      </div>
    `
    : `
      <div class="header-actions">
        ${renderThemeToggle()}
        <button class="button button--secondary button--quiet" type="button" data-action="reset">
          Start again
        </button>
      </div>
    `;

  return `
    <header class="site-header">
      ${renderBrand()}
      ${navigation}
      ${actions}
    </header>
  `;
}

export function renderFooter() {
  return `
    <footer class="site-footer">
      <p>
        <strong>Powered by the principles behind Fabric.</strong>
        Connecting the information, tools, and processes that help an operation work better.
      </p>
      <button class="text-button" type="button" data-action="landing">Trion Labs</button>
    </footer>
  `;
}
