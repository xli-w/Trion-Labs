import { calculateDiagnosticProfile, isDiagnosticReady } from "../diagnostic.js";
import { getUpgradeById } from "../data.js";
import {
  getDiagnosticDimensionById,
  getFrictionPointById,
  getOpportunityAvailability,
  operation,
  opportunities,
} from "../operationModel.js";

function getRequiredLabels(ids, getItemById, label) {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error(`An opportunity is missing ${label} references.`);
  }

  return ids.map((id) => {
    const item = getItemById(id);

    if (!item) {
      throw new Error(`An opportunity references an unknown ${label}: ${id}.`);
    }

    return item.title ?? item.label;
  });
}

function getOpportunityContext(opportunity) {
  const dimension = getDiagnosticDimensionById(opportunity.diagnosticDimensionId);

  if (!dimension) {
    throw new Error(`${opportunity.title} references an unknown diagnostic dimension.`);
  }

  return {
    dimension,
    frictionLabels: getRequiredLabels(
      opportunity.frictionPointIds,
      getFrictionPointById,
      "friction point",
    ),
    capabilityLabels: getRequiredLabels(
      opportunity.relatedCapabilityIds,
      getUpgradeById,
      "capability",
    ),
  };
}

function renderOpportunityCard(opportunity, state, profile) {
  const availability = getOpportunityAvailability(opportunity, state);
  const selected = state.selectedOpportunityId === opportunity.id;
  const isDiagnosticFocus =
    profile.greatestOpportunity.id === opportunity.diagnosticDimensionId;
  const context = getOpportunityContext(opportunity);
  const status = selected
    ? "Selected"
    : isDiagnosticFocus
      ? "Diagnostic focus"
      : availability.available
        ? "Available to prioritise"
        : "Needs prerequisite";
  const stateClasses = [
    selected ? "is-selected" : "",
    isDiagnosticFocus ? "is-diagnostic-focus" : "",
    !availability.available ? "is-unavailable" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const detailId = `opportunity-${opportunity.id}-detail`;

  return `
    <article class="opportunity-card ${stateClasses}">
      <div class="opportunity-card__header">
        <span class="opportunity-card__status">${status}</span>
        <span class="opportunity-card__dimension">${context.dimension.label}</span>
      </div>
      <h4>${opportunity.title}</h4>
      <p id="${detailId}" class="opportunity-card__description">${opportunity.description}</p>
      <dl class="opportunity-card__metrics">
        <div>
          <dt>Impact</dt>
          <dd>${opportunity.impact}</dd>
        </div>
        <div>
          <dt>Effort</dt>
          <dd>${opportunity.effort}</dd>
        </div>
        <div>
          <dt>Time to value</dt>
          <dd>${opportunity.timeToValue}</dd>
        </div>
        <div>
          <dt>Operational risk</dt>
          <dd>${opportunity.operationalRisk}</dd>
        </div>
      </dl>
      <p class="opportunity-card__reason">
        <strong>Why it could come first</strong>${opportunity.whyFirst}
      </p>
      <p class="opportunity-card__trade-off">
        <strong>Trade-off</strong>${opportunity.tradeOff}
      </p>
      ${
        availability.available
          ? `
              <button
                class="button button--secondary opportunity-card__select"
                type="button"
                data-action="select-opportunity"
                data-opportunity-id="${opportunity.id}"
                aria-pressed="${selected}"
                aria-label="${
                  selected
                    ? `${opportunity.title} is selected as the next improvement`
                    : `Choose ${opportunity.title} as the next improvement`
                }"
                aria-describedby="${detailId}"
              >
                ${
                  selected
                    ? "Selected next improvement"
                    : "Choose this next improvement"
                }
              </button>
            `
          : `
              <p class="opportunity-card__dependency">
                <strong>Needs first</strong>${opportunity.dependencies}
              </p>
            `
      }
    </article>
  `;
}

function renderSelectionFeedback(profile) {
  const selectedOpportunity = profile.selectedOpportunity;

  if (!selectedOpportunity) {
    return `
      <aside class="opportunity-selection-feedback" id="opportunity-selection-feedback" tabindex="-1">
        <span>Choose a first improvement</span>
        <strong>Compare the practical trade-offs before committing to the next focus.</strong>
        <p>
          The diagnostic currently highlights ${profile.greatestOpportunity.label.toLowerCase()} as the area with the most useful next opportunity.
        </p>
      </aside>
    `;
  }

  const context = getOpportunityContext(selectedOpportunity);

  return `
    <aside
      class="opportunity-selection-feedback is-selected"
      id="opportunity-selection-feedback"
      tabindex="-1"
      aria-labelledby="opportunitySelectionTitle"
    >
      <span>Selected next improvement</span>
      <h4 id="opportunitySelectionTitle">${selectedOpportunity.title}</h4>
      <p>${selectedOpportunity.whyFirst}</p>
      <dl>
        <div>
          <dt>Addresses</dt>
          <dd>${context.frictionLabels.join(", ")}</dd>
        </div>
        <div>
          <dt>Enables later</dt>
          <dd>${selectedOpportunity.enables}</dd>
        </div>
        <div>
          <dt>Trade-off to manage</dt>
          <dd>${selectedOpportunity.tradeOff}</dd>
        </div>
      </dl>
      <small>
        This choice does not change the current KPI readings. It sets the next improvement focus for this illustrative operation.
      </small>
    </aside>
  `;
}

export function renderOpportunityPrioritization(state) {
  if (!isDiagnosticReady(state)) {
    return "";
  }

  const profile = calculateDiagnosticProfile(state);

  return `
    <section class="opportunity-prioritization" id="opportunities" aria-labelledby="opportunitiesTitle">
      <div class="opportunity-prioritization__heading">
        <div>
          <p class="eyebrow">Choose the next improvement</p>
          <h3 id="opportunitiesTitle">What would you improve first?</h3>
        </div>
        <p>
          Compare impact, effort, time to value, risk, dependencies, and readiness before choosing a practical next step for ${operation.name}.
        </p>
      </div>
      <div class="opportunity-cards">
        ${opportunities
          .map((opportunity) => renderOpportunityCard(opportunity, state, profile))
          .join("")}
      </div>
      ${renderSelectionFeedback(profile)}
    </section>
  `;
}
