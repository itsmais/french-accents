const THEME_PALETTES = [
  {
    id: "mint-sorbet",
    name: "Mint Sorbet",
    background: "#BCECE0",
    text: "#36EEE0",
    shift: "#F652A0",
    button: "#4C5270",
  },
  {
    id: "indigo-nights",
    name: "Indigo Nights",
    background: "#0F172A",
    text: "#E2E8F0",
    shift: "#EF476F",
    button: "#1F2937",
  },
  {
    id: "sand-and-sea",
    name: "Sand & Sea",
    background: "#F5F1E3",
    text: "#1B263B",
    shift: "#E07A5F",
    button: "#8FBBCF",
  },
  {
    id: "forest-trail",
    name: "Forest Trail",
    background: "#102820",
    text: "#E8F7F0",
    shift: "#FFCF56",
    button: "#335C4C",
  },
  {
    id: "citrus-pop",
    name: "Citrus Pop",
    background: "#FFF7E6",
    text: "#2F2A2A",
    shift: "#F77F00",
    button: "#5C8DCE",
  },
  {
    id: "lavender-haze",
    name: "Lavender Haze",
    background: "#F3E8FF",
    text: "#2F1B3F",
    shift: "#FF5D8F",
    button: "#9C8ADE",
  },
];

const DEFAULT_THEME_ID = THEME_PALETTES[0].id;

function findThemeById(themeId) {
  return (
    THEME_PALETTES.find((theme) => theme.id === themeId) ||
    THEME_PALETTES.find((theme) => theme.id === DEFAULT_THEME_ID)
  );
}

function applyThemeToDocument(theme, targetDocument = document) {
  if (!theme || !targetDocument?.documentElement) {
    return;
  }

  const root = targetDocument.documentElement;
  root.style.setProperty("--background-color", theme.background);
  root.style.setProperty("--text-color", theme.text);
  root.style.setProperty("--shift-color", theme.shift);
  root.style.setProperty("--button-color", theme.button);
}

function getStoredTheme() {
  return new Promise((resolve) => {
    if (!chrome?.storage?.sync) {
      resolve(findThemeById(DEFAULT_THEME_ID));
      return;
    }

    chrome.storage.sync.get(["themeId"], (result) => {
      resolve(findThemeById(result.themeId));
    });
  });
}
