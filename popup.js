// guide on accented characters in javascript
// http://www.javascripter.net/faq/accentedcharacters.htm

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

let isShiftOn = false;

function fillKeyboardContent() {
  // first row
  const firstRow = document.getElementsByClassName("row-1")[0];
  firstRow.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const keyboardLetter = document.createElement("button");
    keyboardLetter.classList.add("btn-dark");

    keyboardLetter.setAttribute("id", i);
    // adding copy on click to button
    keyboardLetter.addEventListener("click", function () {
      navigator.clipboard
        .writeText(isShiftOn ? capitalCase[i] : smallCase[i])
        .then(
          function () {
            /* clipboard successfully set */
          },
          function () {
            /* clipboard write failed */
          }
        );
    });

    keyboardLetter.innerText = isShiftOn ? capitalCase[i] : smallCase[i];
    firstRow.appendChild(keyboardLetter);
  }

  // second row
  let secondRow = document.getElementsByClassName("row-2")[0];
  secondRow.innerHTML = "";

  // shift key
  const shiftButton = document.createElement("div");
  shiftButton.classList.add("shift-btn-dark");
  const icon = document.createElement("img");
  icon.src = "icons/caps.svg";
  shiftButton.appendChild(icon);
  secondRow.appendChild(shiftButton);

  for (let i = 11; i < 20; i++) {
    const keyboardLetter = document.createElement("button");
    keyboardLetter.innerText = isShiftOn ? capitalCase[i] : smallCase[i];
    keyboardLetter.classList.add("btn-dark");

    keyboardLetter.setAttribute("id", i);
    // adding copy on click to button
    keyboardLetter.addEventListener("click", function () {
      navigator.clipboard
        .writeText(isShiftOn ? capitalCase[i] : smallCase[i])
        .then(
          function () {
            /* clipboard successfully set */
          },
          function () {
            /* clipboard write failed */
          }
        );
    });

    secondRow.appendChild(keyboardLetter);
  }
  shiftButton.addEventListener("click", shiftClicked);
}
fillKeyboardContent();

function shiftClicked() {
  isShiftOn = !isShiftOn;
  fillKeyboardContent();
}
