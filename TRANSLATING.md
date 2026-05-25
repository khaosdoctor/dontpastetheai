# Translating dontpastetheai

Hi! Thanks for picking up a translation. This page works because someone took an afternoon to make it speak their language. Here's how to do that, with as little friction as possible.

If you get stuck, open a PR anyway — even half-finished. We'll help you across the finish line.

## TL;DR

1. Pick a [BCP 47 language code](https://en.wikipedia.org/wiki/IETF_language_tag), lowercase, hyphenated (e.g. `es`, `pt-br`, `zh-tw`).
2. Copy `index.html` → `<code>.html` and `angry/index.html` → `angry/<code>.html`. Translate the visible text in both.
3. Add an entry for your language in `assets/translations.json`.
4. Add an `<link rel="alternate" hreflang="...">` line to every other HTML file pointing at yours (smooth → smooth, angry → angry).
5. Make an OG image (or just ship the SVG — we'll handle the PNG). Then open a PR.

The [GitHub Action](.github/workflows/validate.yml) runs on your PR and tells you what's missing. You can run it locally first: `node scripts/check-translations.mjs`.

---

## Step by step

Each language is one HTML file per version. You need to translate **both** smooth and angry — they're separate, with different tones, not one document.

### 1. Pick a code

Use [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag), lowercase, hyphenated. The filename matches the code:

- Spanish → `es.html`
- Brazilian Portuguese → `pt-br.html`
- Traditional Chinese (Taiwan) → `zh-tw.html`

Not `pt_BR`, not `ptBR`, not `ptbr` — `pt-br`.

### 2. Copy the files

Smooth and angry **share filenames** at different paths:

```
index.html         →  <code>.html         (smooth)
angry/index.html   →  angry/<code>.html   (angry)
```

So for Spanish: `es.html` and `angry/es.html`.

### 3. Translate the visible text

In each of your two new files, translate:

- `<title>` and the `<meta name="description">` tag
- `og:title`, `og:description`
- `<html lang="...">` attribute (set it to your language)
- Everything visible inside `<header>`, `<section>`, `<blockquote>`, `<ol>`, `.shout`, `.signature`, `.footer`
- The language `<select>` `aria-label`
- The cross-link button text (red `.cta-angry` on smooth, green `.cta-calm` on angry)
- `og:url` and `<link rel="canonical">` should point at your file:
  - smooth: `https://dontpastetheai.com/<code>.html`
  - angry: `https://dontpastetheai.com/angry/<code>.html`
- The copy button — translate the two data attributes, not the visible text:

  ```html
  <button id="copyBtn" type="button" class="url-tag-big"
      data-copy-aria="Copy {domain} to clipboard"
      data-copied-text="copied!">dontpastetheai.com</button>
  ```

  Translate `data-copy-aria` (keep the `{domain}` placeholder — `assets/copy.js` substitutes the actual hostname) and `data-copied-text` (the post-click feedback). The visible `dontpastetheai.com` text stays — JS rewrites it at runtime to whichever domain the visitor is on.

- The no-JS fallback `<option>` inside `<select data-lang-select>` should match **your** language, e.g. for `es.html`:

  ```html
  <select data-lang-select>
    <option>ES — Español</option>
  </select>
  ```

  `assets/translations.js` clears this and repopulates the dropdown from JSON, but it's the fallback when JS doesn't run.

### 4. Don't touch

- CSS classes, HTML structure, the `<select data-lang-select>` markup
- Font links and OG image paths (just change the filename suffix)
- Cross-link `href` (smooth → `angry/<code>.html`, angry → `../<code>.html`)
- GitHub link, nohello/dontasktoask links, YouTube "mad" link
- In angry files, the `../styles.css` and `../assets/` relative paths
- `assets/copy.js` — it's shared by every page

### 5. Register the language in `assets/translations.json`

One entry, once:

```json
{
  "code": "es",
  "hreflang": "es",
  "label": "ES — Español",
  "file": "es.html"
}
```

Same `file` value applies to both smooth (`/es.html`) and angry (`/angry/es.html`). The dropdown in every existing page picks it up automatically — no per-file `<option>` edits.

### 6. Add hreflang links to every other HTML file

These stay static (not JS-injected) so Bing, Yandex, and Baidu pick them up reliably. Add a line for your language to every existing HTML file's `<head>`. Smooth links to smooth, angry to angry:

```html
<!-- in every smooth page -->
<link rel="alternate" hreflang="xx-XX" href="https://dontpastetheai.com/yourfile.html">

<!-- in every angry page -->
<link rel="alternate" hreflang="xx-XX" href="https://dontpastetheai.com/angry/yourfile.html">
```

A sync script for this doesn't exist yet (PRs welcome). For now: the validation script tells you exactly which files are missing your entry, so it's tractable. Run it locally to find them all.

### 7. OG image

Open a PR.

---

## OG image (social card)

Each language needs its own card so Twitter/Slack/etc show the right preview.

**File pattern:** `assets/og-image-<code>.svg` and `assets/og-image-<code>.png`. English is plain `og-image.svg` / `.png`. So Brazilian Portuguese is `og-image-pt-br.svg` / `og-image-pt-br.png`. Match the suffix to your HTML filename.

You can ship one image for both versions, or two (`og-image-<code>.png` and `og-image-<code>-angry.png`) for different previews.

### Making it

1. Copy `assets/og-image.svg` to `assets/og-image-<code>.svg`.
2. Open it, find the three `<text>` elements ("Oops, you pasted / the AI without / reading it."), translate them. Keep the red `<tspan fill="#a82820">` (whatever your word for "AI" is) so the color stays. Try to balance line lengths or text overflows.
3. Leave the `dontpastetheai.com` in the yellow tag alone — that's the domain.
4. Render to PNG at exactly **1200×630**. You need `Special Elite` and `JetBrains Mono` installed locally (Google Fonts → `~/.local/share/fonts/` → `fc-cache -f`), then:

   ```bash
   rsvg-convert -w 1200 -h 630 assets/og-image-<code>.svg -o assets/og-image-<code>.png
   ```

   No `rsvg-convert`? Inkscape, ImageMagick, or any SVG→PNG tool works.
5. Update `og:image` and `twitter:image` in your two HTML files to point at the PNG.

**Can't render locally? Ship the SVG and say so in the PR — we'll handle the PNG.**

## Non-Latin scripts (Cyrillic, CJK, Arabic, etc.)

`Special Elite` is Latin-only. It won't render Cyrillic, Chinese, Japanese, Korean, Arabic, Hebrew, Thai, or anything non-A–Z. You'll get empty boxes or fallback fonts.

What to do:

- Pick a monospace display font with the right vibe (typewriter, slightly rough). Good bets: `Courier Prime` (broad coverage), `IBM Plex Mono` (Latin + Cyrillic + Greek + JP/KR), `Noto Sans Mono` (everything), `JetBrains Mono` (already loaded, decent Cyrillic).
- In **your HTML only**, swap the Google Fonts `<link>` and update `--font-type` in a `<style>` block in `<head>`. Don't touch `styles.css`.
- In your OG SVG, change `font-family="Special Elite"` to your font. Make sure it's installed before rendering.
- It won't look identical to English, and that's fine. Aim for "same vibe in my script", not "pixel-perfect match".

Not sure? Open a PR with your best guess and we'll iterate.

## Tone notes

The two versions have different tones. Don't merge them.

- **Smooth** — friendly, work-safe, nohello.net-ish. Direct without being aggressive. Picture sending it to a coworker you respect and don't want to weird out. No swearing, no insults, just a clear ask. Check `pt-br.html` for how PT-BR pulls it off.
- **Angry** — satire with actual feelings. Frustrated, opinionated, a bit rude on purpose. Don't smooth it into corporate-speak. If your language has real slang for "lazy AI paste behavior", use it. Goal: reader feels called out, not lectured. Look at `angry/pt-br.html` — it's how people actually talk in Portuguese, not textbook stuff.

## Right-to-left languages

Add `dir="rtl"` to the `<html>` tag. CSS doesn't have logical properties everywhere yet, so layout might look weird. Open the PR anyway — we'll fix it in review.

## The validation script

Every PR runs `.github/workflows/validate.yml`, which executes `node scripts/check-translations.mjs`. It checks:

- Your `translations.json` entry exists and has all required fields
- The smooth + angry files exist at the expected paths
- Every other HTML file has an `hreflang` line pointing at yours
- Canonical URLs and og:url use `https://dontpastetheai.com/...`
- The OG image (or at minimum the SVG) is present

Run it locally before pushing:

```bash
node scripts/check-translations.mjs
```

It'll tell you exactly what's missing. Don't try to remember everything in this doc — let the script catch what you forgot.

---

That's it. If anything in this guide is wrong, outdated, or unclear, fixing the doc is also a great PR. Thanks for translating.
