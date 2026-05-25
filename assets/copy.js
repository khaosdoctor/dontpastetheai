// Wires up the "copy domain" button on every page. Reads the page's current
// hostname (so it works on both dontpastetheai.com and dontquotetheai.com),
// uses per-page strings from data attributes for the aria-label and the
// "copied!" feedback text, so translators only edit HTML, not JS.
//
// HTML contract:
//   <button id="copyBtn" type="button" class="url-tag-big"
//           data-copy-aria="Copy {domain} to clipboard"
//           data-copied-text="copied!">dontpastetheai.com</button>
//   The `{domain}` placeholder in data-copy-aria is replaced at runtime.
(function () {
  const btn = document.getElementById("copyBtn");
  if (!btn) return;
  const target = location.hostname.replace(/^www\./, "");
  const ariaTemplate = btn.dataset.copyAria || "Copy {domain} to clipboard";
  const copiedText = btn.dataset.copiedText || "copied!";
  btn.textContent = target;
  btn.dataset.copy = target;
  btn.setAttribute("aria-label", ariaTemplate.replace("{domain}", target));
  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(target).then(() => {
      btn.textContent = copiedText;
      clearTimeout(btn._t);
      btn._t = setTimeout(() => {
        btn.textContent = target;
      }, 1200);
    });
  });
})();
