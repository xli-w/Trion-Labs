import { kpiDefinitions } from "../data.js";
import {
  getOperatingModelComparison,
  isOperatingModelComparisonReady,
} from "../beforeAfter.js";
import { operation } from "../operationModel.js";

function formatImpact(impact) {
  const definition = kpiDefinitions[impact.id];

  if (!definition) {
    throw new Error(`Unknown KPI impact: ${impact.id}.`);
  }

  const sign = impact.delta > 0 ? "+" : "";
  return `${definition.label} ${sign}${impact.delta} pts`;
}

function renderChange(change, state) {
  return `
    <li>
      <span>${change.label}</span>
      <p>${state === "before" ? change.before : change.after}</p>
      ${
        state === "after"
          ? `<small>${change.kpiImpacts.map(formatImpact).join(" / ")}</small>`
          : ""
      }
    </li>
  `;
}

function renderFlow(flow, state) {
  return `
    <ol class="operating-model-flow__steps operating-model-flow__steps--${state}">
      ${flow
        .map(
          (step, index) => `
            <li>
              <span>${String(index + 1).padStart(2, "0")}</span>
              <strong>${step.label}</strong>
              <p>${step.detail}</p>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;
}

function renderSelectedPotential(comparison) {
  if (!comparison.selectedOpportunity) {
    return `
      <aside class="operating-model-potential__next">
        <span>Remaining potential</span>
        <strong>Choose the next improvement above to see what it could enable.</strong>
        <p>${comparison.recommendedNextStep}</p>
      </aside>
    `;
  }

  const opportunity = comparison.selectedOpportunity;

  return `
    <aside class="operating-model-potential__next is-selected">
      <span>Selected next opportunity</span>
      <strong>${opportunity.title}</strong>
      <p>${opportunity.enables}</p>
      <small>Trade-off: ${opportunity.tradeOff}</small>
    </aside>
  `;
}

export function renderBeforeAfterOperatingModel(state) {
  if (!isOperatingModelComparisonReady(state)) {
    return "";
  }

  const comparison = getOperatingModelComparison(state);

  return `
    <section
      class="before-after-operating-model"
      id="before-after-operating-model"
      aria-labelledby="beforeAfterOperatingModelTitle"
    >
      <div class="before-after-operating-model__heading">
        <div>
          <p class="eyebrow">How the operation works now</p>
          <h3 id="beforeAfterOperatingModelTitle">The operation is not just more digital. It is easier to run.</h3>
        </div>
        <p>
          These changes reflect decisions already made in this illustrative ${operation.name} scenario. The selected next improvement remains future potential.
        </p>
      </div>

      <div class="operating-model-comparison">
        <section class="operating-model-panel operating-model-panel--before" aria-labelledby="beforeOperatingModelTitle">
          <p class="operating-model-panel__label">Before</p>
          <h4 id="beforeOperatingModelTitle">Information and response were fragmented.</h4>
          <ol>
            ${comparison.changes.map((change) => renderChange(change, "before")).join("")}
          </ol>
        </section>
        <section class="operating-model-panel operating-model-panel--after" aria-labelledby="afterOperatingModelTitle">
          <p class="operating-model-panel__label">After</p>
          <h4 id="afterOperatingModelTitle">The same work has more useful context.</h4>
          <ol>
            ${comparison.changes.map((change) => renderChange(change, "after")).join("")}
          </ol>
        </section>
      </div>

      <section class="operating-model-flow" aria-labelledby="operatingModelFlowTitle">
        <div class="operating-model-flow__heading">
          <p class="eyebrow">Operational flow</p>
          <h4 id="operatingModelFlowTitle">From scattered information to a more controlled response.</h4>
        </div>
        <div class="operating-model-flow__comparison">
          <section aria-label="Previous operating flow">
            <span>Before</span>
            ${renderFlow(comparison.beforeFlow, "before")}
          </section>
          <section aria-label="Improved operating flow">
            <span>After</span>
            ${renderFlow(comparison.afterFlow, "after")}
          </section>
        </div>
      </section>

      <div class="operating-model-potential">
        <article>
          <span>What still needs attention</span>
          <strong>${comparison.mainRemainingFriction.title}</strong>
          <p>${comparison.mainRemainingFriction.description}</p>
        </article>
        ${renderSelectedPotential(comparison)}
      </div>
    </section>
  `;
}
