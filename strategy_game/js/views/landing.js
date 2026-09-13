import { renderFooter, renderHeader } from "./shared.js";

export function renderLanding(state) {
  return `
    <div class="page-shell">
      ${renderHeader(state, "landing")}
      <main id="main-content">
        <section class="landing-hero" id="top" aria-labelledby="screen-title">
          <div>
            <p class="eyebrow">Trion Labs</p>
            <h1 class="landing-title" id="screen-title" tabindex="-1">
              Find the friction.<br /><span class="heading-accent">Build the flow.</span>
            </h1>
            <p class="landing-copy">
              A small operation. A few hidden problems. A chance to make it work better.
              Investigate what is happening, connect the information that matters, and see what changes.
            </p>
            <div class="hero-actions">
              <button class="button button--primary" type="button" data-action="enter-lab">
                Enter the Lab <span class="button-arrow" aria-hidden="true">-></span>
              </button>
              <button class="button button--secondary" type="button" data-action="how-it-works">
                See how it works
              </button>
            </div>
            <ul class="hero-proof" aria-label="What the lab includes">
              <li><i aria-hidden="true">+</i>Five connected challenges</li>
              <li><i aria-hidden="true">+</i>One connected operation</li>
              <li><i aria-hidden="true">+</i>Visible consequences</li>
            </ul>
          </div>

          <div class="landing-diagram">
            <p class="sr-only">
              A diagram of production, quality, planning, and people connected through a Trion operational view.
            </p>
            <div class="diagram-surface" aria-hidden="true">
              <div class="diagram-caption"><i></i> Operational context</div>
              <svg class="diagram-flow" viewBox="0 0 480 440" preserveAspectRatio="none">
                <path d="M80 142C170 110 180 215 235 220S340 120 414 101" />
                <path d="M110 349C175 292 202 308 235 220S354 284 427 315" />
                <path d="M235 220C230 160 234 116 234 69" />
              </svg>
              <div class="diagram-node diagram-node--production"><span>Production</span><strong>Line events</strong></div>
              <div class="diagram-node diagram-node--quality"><span>Quality</span><strong>Defect signals</strong></div>
              <div class="diagram-node diagram-node--planning"><span>Planning</span><strong>Order context</strong></div>
              <div class="diagram-node diagram-node--people"><span>People</span><strong>Better decisions</strong></div>
              <div class="diagram-core">Trion<br />Fabric</div>
            </div>
          </div>
        </section>

        <section class="landing-section how-it-works" id="how-it-works" aria-labelledby="howItWorksTitle">
          <div class="section-heading">
            <div>
              <p class="eyebrow">The approach</p>
              <h2 id="howItWorksTitle">Improve the operation, not just the dashboard.</h2>
            </div>
            <p>
              Each challenge follows a clear operational loop. The work begins with understanding,
              then turns insight into a practical, measurable improvement.
            </p>
          </div>
          <ol class="loop-list">
            <li><span class="loop-number">01</span><strong>Observe</strong></li>
            <li><span class="loop-number">02</span><strong>Investigate</strong></li>
            <li><span class="loop-number">03</span><strong>Decide</strong></li>
            <li><span class="loop-number">04</span><strong>Improve</strong></li>
            <li><span class="loop-number">05</span><strong>Measure</strong></li>
            <li><span class="loop-number">06</span><strong>Unlock</strong></li>
          </ol>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `;
}
