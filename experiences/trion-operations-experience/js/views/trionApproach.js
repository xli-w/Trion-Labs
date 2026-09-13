import {
  getTrionApproachResult,
  isTrionApproachReady,
} from "../trionApproach.js";
import { operation } from "../operationModel.js";

function renderApproachStep(step, index) {
  return `
    <li class="trion-approach-step">
      <span class="trion-approach-step__number">${String(index + 1).padStart(2, "0")}</span>
      <div>
        <h4>${step.title}</h4>
        <p>${step.description}</p>
        <ul class="trion-approach-step__frameworks">
          ${step.frameworks
            .map(
              (framework) => `
                <li>
                  <strong>${framework.title}</strong>
                  <span>${framework.description}</span>
                </li>
              `,
            )
            .join("")}
        </ul>
      </div>
    </li>
  `;
}

function getCtaContext(profile) {
  if (profile.selectedOpportunity) {
    return `Based on the next improvement you prioritised: ${profile.selectedOpportunity.title}.`;
  }

  return `Based on the friction you uncovered, ${profile.greatestOpportunity.label.toLowerCase()} is the most useful place to begin the next review.`;
}

export function renderTrionApproach(state) {
  if (!isTrionApproachReady(state)) {
    return "";
  }

  const result = getTrionApproachResult(state);

  return `
    <section class="trion-approach" id="trion-approach" aria-labelledby="trionApproachTitle">
      <div class="trion-approach__heading">
        <div>
          <p class="eyebrow">The Trion approach</p>
          <h3 id="trionApproachTitle">Better operations begin with understanding how the pieces connect.</h3>
        </div>
        <p>
          The Northstar scenario follows the same practical sequence: understand the work, improve the flow, then measure what makes the next step possible.
        </p>
      </div>

      <ol class="trion-approach-steps">
        ${result.steps.map(renderApproachStep).join("")}
      </ol>

      <aside class="trion-fabric-note" aria-labelledby="fabricNoteTitle">
        <div>
          <p class="eyebrow">Fabric in practice</p>
          <h4 id="fabricNoteTitle">${result.fabric.title}</h4>
        </div>
        <div>
          <p>${result.fabric.description}</p>
          <small>${result.fabric.boundary}</small>
        </div>
      </aside>

      <section class="trion-cta" aria-labelledby="trionCtaTitle">
        <div>
          <p class="trion-cta__context">${getCtaContext(result.profile)}</p>
          <h4 id="trionCtaTitle">${result.cta.title}</h4>
          <p>${result.cta.description}</p>
        </div>
        <div class="trion-cta__action">
          <a
            class="button button--primary"
            href="${result.cta.url}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${result.cta.label} <span class="button-arrow" aria-hidden="true">-></span>
          </a>
          <small>Opens the Trion Transformation website in a new tab.</small>
        </div>
      </section>

      <p class="trion-approach__closing">
        The right improvement is rarely just another system. It is a better way for ${operation.name} to work.
      </p>
    </section>
  `;
}
