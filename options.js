let statusTimeoutId = null;

function renderPaletteOptions(selectedThemeId) {
  const paletteList = document.getElementById("palette-list");
  paletteList.innerHTML = "";

  THEME_PALETTES.forEach((theme) => {
    const label = document.createElement("label");
    label.className = "palette-choice";
    label.setAttribute("data-theme-id", theme.id);

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "theme";
    radio.value = theme.id;
    radio.checked = theme.id === selectedThemeId;
    radio.addEventListener("change", () => saveTheme(theme.id));

    const name = document.createElement("span");
    name.className = "palette-name";
    name.textContent = theme.name;

    const swatchSet = document.createElement("div");
    swatchSet.className = "swatch-set";
    ["background", "button", "shift", "text"].forEach((key) => {
      const swatch = document.createElement("span");
      swatch.className = "swatch";
      swatch.style.backgroundColor = theme[key];
      swatch.title = `${key[0].toUpperCase()}${key.slice(1)}: ${theme[key]}`;
      swatchSet.appendChild(swatch);
    });

    label.appendChild(radio);
    label.appendChild(name);
    label.appendChild(swatchSet);

    paletteList.appendChild(label);
  });
}

function showStatus(message) {
  const status = document.getElementById("save-status");
  status.textContent = message;

  if (statusTimeoutId) {
    clearTimeout(statusTimeoutId);
  }

  statusTimeoutId = window.setTimeout(() => {
    status.textContent = "";
  }, 1500);
}

function saveTheme(themeId) {
  const theme = findThemeById(themeId);
  applyThemeToDocument(theme);
  chrome.storage.sync.set({ themeId }, () => {
    showStatus("Theme saved.");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getStoredTheme()
    .then((theme) => {
      renderPaletteOptions(theme.id);
      applyThemeToDocument(theme);
    })
    .catch(() => {
      const fallback = findThemeById(DEFAULT_THEME_ID);
      renderPaletteOptions(fallback.id);
      applyThemeToDocument(fallback);
    });
});
