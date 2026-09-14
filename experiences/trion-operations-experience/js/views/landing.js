import { renderFooter, renderNav } from "./shared.js";

export function renderLanding(state) {
  return `
    <div class="page-shell">
      ${renderNav(state)}
      <main id="main-content">
        <section class="landing-hero" id="top" aria-labelledby="screen-title">
          <div>
            <p class="eyebrow">Trion Labs</p>
            <h1 class="landing-title" id="screen-title" tabindex="-1">
              Find the friction.<br /><span class="heading-accent">Build the flow.</span>
            </h1>
            <p class="landing-copy">
              A small operation. A few hidden problems. A chance to improve it.
              Trace the friction, connect the right information, and see what changes.
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

          <div class="landing-diagram" aria-label="Operational context imagery">
            <div class="photo-collage">
              <figure class="photo-card photo-card--feature">
                <img
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80"
                  alt="Operators and production technicians reviewing a manufacturing line"
                  loading="eager"
                />
                <figcaption>Production flow</figcaption>
              </figure>
              <div class="photo-stack">
                <figure class="photo-card photo-card--small">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
                    alt="Operations team reviewing an improvement plan together"
                    loading="lazy"
                  />
                  <figcaption>Decision making</figcaption>
                </figure>
                <figure class="photo-card photo-card--small">
                  <img
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
                    alt="Warehouse and logistics environment supporting a connected operation"
                    loading="lazy"
                  />
                  <figcaption>Connected logistics</figcaption>
                </figure>
              </div>
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
              Each challenge follows the same pattern: understand the issue, act on it, and measure the result.
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
      ${renderFooter(state)}
    </div>
  `;
}
