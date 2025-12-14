# Ideas to improve French Accents

[X] Make all letters switch to capital case whenever user is holding the Shift key.
[X] Make the extension stay as an opened banner. This should be a toggle-able button in the options. By default, it's off.
- Add a short onboarding screen that shows the clipboard behavior, shortcut to open the popup, and how to toggle the shift row.
- Offer an inline tooltip/label for each key describing its Unicode name and when the glyph is missing on some fonts (e.g., œ/Œ).
- Ship a small "recently copied" strip so users can paste multiple characters without reopening the popup.
- Add a lightweight keyboard shortcut to toggle the popup or to paste the last copied accent directly.
- Provide a compact layout mode that fits in narrow side panels (e.g., 240px width) without wrapping.
- Build automated UI tests (Playwright) that verify clicking each button copies the right character and respects the selected theme.
- Add a CI workflow that lints, bundles assets, and runs tests before packaging the extension.
