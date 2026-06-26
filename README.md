# FluentFable — marketing landing page

A static, single-page marketing site for **FluentFable**, a reading-first Korean language-learning app. No build step, no framework, no backend — just HTML, one CSS file, and a small amount of vanilla JS. Open `index.html` directly in a browser, or serve it from any static host.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo (e.g. `fluent-fable-website`).
2. In the repo: **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**, then pick the `main` branch and the `/ (root)` folder. Save.
3. Wait a minute; your site is live at `https://<user>.github.io/<repo>/`.

The included empty `.nojekyll` file tells GitHub Pages to serve `/assets` as-is. All asset paths are relative (`./css/...`, `./assets/...`), so the site works correctly under a project subpath.

## Before you publish — fill in the placeholders

These are greppable tokens. Search the project for each:

- **`STORE_URL`** — your Apple App Store link (used by every "Download on the App Store" button).
- **`PLAY_STORE_URL`** — Google Play link; its badge is commented out until Android ships.
- **`CONTACT_EMAIL`** — the address behind the footer "Contact" link.
- **`[DATE]`** / **`[PLACEHOLDER — replace]`** — the "Last updated" dates and FAQ/legal copy.
- **`/assets/*.svg`** — placeholder images. Replace with real PNGs (each file's header comment lists the expected dimensions; app screenshots use a ~9:19.5 phone ratio). Update the `<img src>` extensions in `index.html` if you switch from `.svg` to `.png`.
- **`privacy.html` / `terms.html`** — paste your real legal content into the marked placeholder block.

## Structure

```
index.html      landing page (CONFIG block of placeholders at the top)
privacy.html    legal page (placeholder content)
terms.html      legal page (placeholder content)
css/styles.css  single stylesheet; all colors are :root custom properties
js/main.js      mobile nav toggle, sticky-header state, screenshot lightbox, scroll reveal
assets/         placeholder screenshots, hero, video poster, OG image (SVG)
favicon.svg     FF monogram
.nojekyll       lets GitHub Pages serve /assets untouched
```
