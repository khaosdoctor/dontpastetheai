<!-- Thanks for opening a PR! Pick the section that matches your change and delete the other. -->

## Translation PR

**Language code (BCP 47, lowercase):** `e.g. pt-br, zh-tw, ja`

Please confirm:

- [ ] I translated **both** the smooth version (`<code>.html`) **and** the angry version (`angry/<code>.html`).
- [ ] I added an entry for my language to `assets/translations.json` (with `code`, `hreflang`, `label`, `file`).
- [ ] I added a `<link rel="alternate" hreflang="...">` tag for my language to **every other HTML file** (smooth → smooth URLs, angry → angry URLs). See `TRANSLATING.md` for the full list.
- [ ] My files have the correct `<html lang="...">`, `<link rel="canonical">`, `<meta property="og:url">`, and `<meta name="twitter:image">` pointing at `https://dontpastetheai.com/...`.
- [ ] I created `assets/og-image-<code>.svg` (and `.png` if I could render it — otherwise SVG only is fine, just call it out below).
- [ ] I updated the no-JS fallback `<option>` inside `<select data-lang-select>` so my language appears with its label.
- [ ] The **Validate translations** GitHub Action passed on this PR.

**Notes / caveats:**

<!-- e.g. "Couldn't render the PNG, only SVG included" or "Used machine-assisted translation, reviewed manually" -->

---

## Non-translation PR

<!-- Delete the Translation section above if this doesn't apply. -->

**What changed and why:**

<!-- Brief description of the change and the motivation behind it. -->

- [ ] The **Validate translations** GitHub Action passed on this PR.

---

Thanks for helping keep this site multilingual and not-quite-serious. 💛
