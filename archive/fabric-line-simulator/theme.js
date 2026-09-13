// Kept local so the standalone page works when its folder is served directly.
const lightTheme = "light";
const darkTheme = "dark";
const themeStorageKey = "trion-labs-theme";

function isSupportedTheme(theme) {
  return theme === lightTheme || theme === darkTheme;
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme : lightTheme;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  return theme;
}

function getTheme() {
  const appliedTheme = document.documentElement.dataset.theme;

  return isSupportedTheme(appliedTheme) ? appliedTheme : getSystemTheme();
}

export function initializeTheme() {
  const storedTheme = window.localStorage.getItem(themeStorageKey);

  return applyTheme(isSupportedTheme(storedTheme) ? storedTheme : getSystemTheme());
}

export function toggleTheme() {
  const nextTheme = getTheme() === darkTheme ? lightTheme : darkTheme;

  window.localStorage.setItem(themeStorageKey, nextTheme);
  return applyTheme(nextTheme);
}

export function syncThemeToggle(control) {
  if (!(control instanceof HTMLButtonElement)) {
    throw new Error("A native theme toggle button is required.");
  }

  control.setAttribute("aria-pressed", String(getTheme() === darkTheme));
}
