(() => {
  const BANNER_ID = "french-accents-banner";
  const STYLE_ID = "french-accents-banner-style";
  const iframeSrc = chrome.runtime.getURL("popup.html?banner=1");
  const bannerStylesheet = chrome.runtime.getURL("banner.css");

  const existing = document.getElementById(BANNER_ID);
  if (existing) {
    existing.remove();
  }

  const existingStyle = document.getElementById(STYLE_ID);
  if (existingStyle) {
    existingStyle.remove();
  }

  const style = document.createElement("link");
  style.id = STYLE_ID;
  style.rel = "stylesheet";
  style.href = bannerStylesheet;
  (document.head || document.documentElement).appendChild(style);

  const wrapper = document.createElement("div");
  wrapper.id = BANNER_ID;

  const shell = document.createElement("div");
  shell.className = "fab-shell";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "fab-close";
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    wrapper.remove();
    style.remove();
  });

  const iframe = document.createElement("iframe");
  iframe.src = iframeSrc;
  iframe.title = "French Accents banner";

  shell.appendChild(closeButton);
  shell.appendChild(iframe);
  wrapper.appendChild(shell);
  document.body.appendChild(wrapper);
})();
