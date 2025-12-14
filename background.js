const DEFAULT_POPUP = "popup.html";
const BANNER_MODE_KEY = "bannerMode";
const INJECTABLE_PROTOCOLS = ["http:", "https:"];

function getStoredBannerMode() {
  return new Promise((resolve) => {
    chrome.storage.sync.get([BANNER_MODE_KEY], (result) => {
      resolve(Boolean(result[BANNER_MODE_KEY]));
    });
  });
}

function setActionPopup(enabled) {
  chrome.action.setPopup({ popup: enabled ? "" : DEFAULT_POPUP });
}

async function syncPopupSetting() {
  try {
    const bannerMode = await getStoredBannerMode();
    setActionPopup(bannerMode);
  } catch (_) {
    setActionPopup(false);
  }
}

chrome.runtime.onInstalled.addListener(syncPopupSetting);
chrome.runtime.onStartup?.addListener(syncPopupSetting);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "sync" || !changes[BANNER_MODE_KEY]) {
    return;
  }
  syncPopupSetting();
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id) {
    return;
  }

  const bannerMode = await getStoredBannerMode();
  if (!bannerMode) {
    return;
  }

  let canInject = false;
  if (typeof tab.url === "string") {
    try {
      const protocol = new URL(tab.url).protocol;
      canInject = INJECTABLE_PROTOCOLS.includes(protocol);
    } catch (_) {
      canInject = false;
    }
  }

  try {
    if (canInject) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["banner.js"],
      });
      return;
    }
    throw new Error("Unsupported protocol for banner injection.");
  } catch (error) {
    console.error("Failed to inject banner:", error);
    await openFallbackPopup();
  }
});

async function openFallbackPopup() {
  await chrome.action.setPopup({ popup: DEFAULT_POPUP });
  try {
    await chrome.action.openPopup?.();
  } catch (error) {
    console.error("Failed to open fallback popup:", error);
  } finally {
    // Restore banner mode click behavior for supported pages.
    await chrome.action.setPopup({ popup: "" });
  }
}
