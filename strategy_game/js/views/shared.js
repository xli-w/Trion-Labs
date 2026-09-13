import { navigationItems } from "../data.js";
import { isDarkTheme } from "../../../theme.js";

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

export function renderHeader(state, screen) {
  const isLanding = screen === "landing";
  const navigation = isLanding
    ? ""
    : `
      <nav class="lab-navigation" aria-label="Lab navigation">
        ${navigationItems
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
