import { getChallengeById } from "../data.js";
import { getChallengeReadiness } from "../miniGames/registry.js";
import {
  renderChallengeOperationContext,
  renderFooter,
  renderHeader,
} from "./shared.js";

function getChallengeStateLabel(readiness) {
  if (readiness.completed) {
    return "Completed";
  }

  if (readiness.canLaunch) {
    return "Ready to investigate";
  }

  return `After ${readiness.prerequisite.title}`;
}

export function renderChallengeBriefing(state) {
  const challenge = getChallengeById(state.activeChallengeId);

  if (!challenge) {
    throw new Error("A challenge briefing requires an active challenge.");
  }

  const readiness = getChallengeReadiness(challenge.id, state);
  const status = getChallengeStateLabel(readiness);

  return `
    <div class="page-shell">
      ${renderHeader(state, "challenge")}
      <main id="main-content">
        <article class="briefing-page" aria-labelledby="screen-title">
          <div class="briefing-back">
            <button class="button button--secondary button--quiet button--back" type="button" data-action="close-challenge">
              <span class="button-arrow" aria-hidden="true"><-</span> Challenge map
            </button>
          </div>

          <header class="briefing-header">
            <div>
              <p class="eyebrow">Challenge ${challenge.number} / ${challenge.mechanic}</p>
              <h1 class="briefing-title" id="screen-title" tabindex="-1">${challenge.title}</h1>
              <p class="briefing-story">${challenge.story}</p>
            </div>
            <aside class="briefing-status">
              <span>Path status</span>
              <strong>${status}</strong>
              <p>
                ${readiness.prerequisite ? `This challenge follows ${readiness.prerequisite.title}.` : "This is the first operational question to investigate."}
              </p>
            </aside>
          </header>

          ${renderChallengeOperationContext(challenge)}

          <div class="briefing-grid">
            <section aria-labelledby="objectiveTitle">
              <p class="eyebrow">Objective</p>
              <h2 id="objectiveTitle">What matters here?</h2>
              <p class="briefing-objective">${challenge.objective}</p>
              <p class="briefing-principle">${challenge.principle}</p>
              <div class="briefing-next">
                <button class="button button--primary" type="button" data-action="close-challenge">
                  Return to challenge map <span class="button-arrow" aria-hidden="true">-></span>
                </button>
              </div>
            </section>

            <aside aria-labelledby="focusTitle">
              <p class="eyebrow">Focused interaction</p>
              <h2 id="focusTitle">${challenge.mechanic}</h2>
              <ol class="briefing-steps">
                ${challenge.focus
                  .map(
                    (item, index) => `
                      <li><span>${index + 1}</span><strong>${item}</strong></li>
                    `,
                  )
                  .join("")}
              </ol>
              <dl class="briefing-facts">
                <div>
                  <dt>Expected capability</dt>
                  <dd>${challenge.unlockLabel}</dd>
                </div>
                <div>
                  <dt>Decision loop</dt>
                  <dd>Observe, investigate, decide, improve, measure, unlock.</dd>
                </div>
              </dl>
            </aside>
          </div>
        </article>
      </main>
      ${renderFooter()}
    </div>
  `;
}
