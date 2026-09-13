import { challenges, hasCompletedExperience, navigationItems } from "../data.js";
import { isDarkTheme } from "../../../theme.js";

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
