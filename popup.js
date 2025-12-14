const smallCase = [
  "\xE0", // "à",
  "\xE2", // "â",
  "\xE4", // "ä",
  "\xE6", // "æ",
  "\xE7", // "ç",
  "\xE9", // "é",
  "\xE8", // "è",
  "\xEA", // "ê",
  "\xEB", // "ë",
  "\u20AC", //"€",
  "svg", //"svg",
  "\xEE", // "î",
  "\xEF", // "ï",
  "\xF4", // "ô",
  "\u0153", // "œ",
  "\xF9", // "ù",
  "\xFB", // "û",
  "\xFC", // "ü",
  "«", // "«",
  "»", // "»",
];

const capitalCase = [
  "\xC0", // "À",
  "\xC2", // "Â",
  "\xC4", // "Ä",
  "\xC6", //"Æ",
  "\xC7", //"Ç",
  "\xC9", //"É",
  "\xC8", //"È",
  "\xCA", //"Ê",
  "\xCB", //"Ë",
  "\u20AC", //"€",
  "svg", //"svg",
  "\xCE", //"Î",
  "\xCF", //"Ï",
  "\xD4", //"Ô",
  "\u0152", //"Œ",
  "\xD9", //"Ù",
  "\xDB", //"Û",
  "\xDC", //"Ü",
  "«", // "«",
  "»", // "»",
];

let isShiftLocked = false;
let isShiftHeld = false;

function isShiftActive() {
  return isShiftLocked || isShiftHeld;
}

function fillKeyboardContent() {
  const firstRow = document.getElementsByClassName("row-1")[0];
  const activeCase = isShiftActive() ? capitalCase : smallCase;
  firstRow.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const keyboardLetter = document.createElement("button");
    keyboardLetter.type = "button";
    keyboardLetter.classList.add("btn-dark");

    keyboardLetter.setAttribute("id", i);
    keyboardLetter.addEventListener("click", function () {
      navigator.clipboard.writeText(activeCase[i]);
    });

    keyboardLetter.innerText = activeCase[i];
    firstRow.appendChild(keyboardLetter);
  }

  const secondRow = document.getElementsByClassName("row-2")[0];
  secondRow.innerHTML = "";

  const shiftButton = document.createElement("button");
  shiftButton.type = "button";
  shiftButton.classList.add("shift-btn-dark");
  shiftButton.setAttribute("aria-label", "Toggle uppercase row");
  const icon = document.createElement("img");
  icon.src = "icons/caps.svg";
  shiftButton.appendChild(icon);
  secondRow.appendChild(shiftButton);

  for (let i = 11; i < 20; i++) {
    const keyboardLetter = document.createElement("button");
    keyboardLetter.type = "button";
    keyboardLetter.innerText = activeCase[i];
    keyboardLetter.classList.add("btn-dark");

    keyboardLetter.setAttribute("id", i);
    keyboardLetter.addEventListener("click", function () {
      navigator.clipboard.writeText(activeCase[i]);
    });

    secondRow.appendChild(keyboardLetter);
  }
  shiftButton.addEventListener("click", shiftClicked);
}

function shiftClicked() {
  isShiftLocked = !isShiftLocked;
  fillKeyboardContent();
}

function handleShiftKeyDown(event) {
  if (event.key !== "Shift" || isShiftHeld) {
    return;
  }

  isShiftHeld = true;
  fillKeyboardContent();
}

function handleShiftKeyUp(event) {
  if (event.key !== "Shift" || !isShiftHeld) {
    return;
  }

  isShiftHeld = false;
  fillKeyboardContent();
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", handleShiftKeyDown);
  document.addEventListener("keyup", handleShiftKeyUp);

  getStoredTheme()
    .then((theme) => {
      applyThemeToDocument(theme);
    })
    .catch(() => {
      applyThemeToDocument(findThemeById(DEFAULT_THEME_ID));
    })
    .finally(() => {
      fillKeyboardContent();
    });
});
