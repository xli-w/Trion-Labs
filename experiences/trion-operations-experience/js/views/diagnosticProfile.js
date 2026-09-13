import { calculateDiagnosticProfile, isDiagnosticReady } from "../diagnostic.js";
import { operation } from "../operationModel.js";

function renderDimension(dimension) {
  return `
    <article class="diagnostic-dimension diagnostic-dimension--${dimension.assessment.id}">
      <header class="diagnostic-dimension__header">
        <div>
          <span>${dimension.label}</span>
          <strong>${dimension.assessment.label}</strong>
        </div>
        <span class="diagnostic-dimension__reading">${dimension.score} / 100</span>
      </header>
      <div
        class="diagnostic-dimension__meter"
        role="progressbar"
        aria-label="${dimension.label}: ${dimension.assessment.label}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${dimension.score}"
      >
        <i style="--diagnostic-progress: ${dimension.score}%"></i>
      </div>
      <p>${dimension.assessment.description}</p>
      <small>Derived from: ${dimension.evidence.join(", ")}.</small>
    </article>
  `;
}

export function renderDiagnosticProfile(state) {
  if (!isDiagnosticReady(state)) {
    return "";
  }

  const profile = calculateDiagnosticProfile(state);

  return `
    <section class="diagnostic-profile" aria-labelledby="diagnosticTitle">
      <div class="diagnostic-profile__heading">
        <div>
          <p class="eyebrow">Illustrative diagnostic profile</p>
          <h3 id="diagnosticTitle">${profile.overall.label}</h3>
        </div>
        <p>
          This is an illustrative reading of ${operation.name}, based on the decisions made in this experience.
        </p>
      </div>

      <div class="diagnostic-profile__summary">
        <div class="diagnostic-profile__summary-copy">
          <p class="diagnostic-profile__lead">${profile.overall.description}</p>
          <p>${profile.calculationSummary}</p>
        </div>
        <dl class="diagnostic-profile__facts">
          <div>
            <dt>Strongest area</dt>
            <dd>${profile.strongestDimension.label}</dd>
          </div>
          <div>
            <dt>Connected relationships</dt>
            <dd>${profile.connectedRelationshipCount} / ${profile.totalRelationshipCount}</dd>
          </div>
          <div>
            <dt>Completed decisions</dt>
            <dd>${profile.completedChallengeCount} / 5</dd>
          </div>
        </dl>
      </div>

      <section class="diagnostic-profile__dimensions" aria-labelledby="diagnosticDimensionsTitle">
        <div class="diagnostic-profile__section-heading">
          <div>
            <p class="eyebrow">What improved</p>
            <h4 id="diagnosticDimensionsTitle">A balanced operating profile</h4>
          </div>
          <p>Each reading is rounded and explained by the current state, not by completion alone.</p>
        </div>
        <div class="diagnostic-dimensions">
          ${profile.dimensions.map(renderDimension).join("")}
        </div>
      </section>

      <div class="diagnostic-profile__next">
        <article>
          <span>Main remaining friction</span>
          <strong>${profile.mainRemainingFriction.title}</strong>
          <p>${profile.mainRemainingFriction.description}</p>
        </article>
        <article>
          <span>Greatest opportunity</span>
          <strong>${profile.greatestOpportunity.label}</strong>
          <p>${profile.greatestOpportunity.remainingFriction}</p>
        </article>
        <aside>
          <span>Recommended next step</span>
          <strong>${profile.recommendedNextStep}</strong>
          ${
            profile.selectedOpportunity
              ? `<small>Selected focus: ${profile.selectedOpportunity.title}</small>`
              : ""
          }
        </aside>
      </div>
    </section>
  `;
}
