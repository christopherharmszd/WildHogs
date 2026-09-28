# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable prototype decisions

- Keep Rugby content and Vereinsleben content clearly separate.
- The Vereinsleben page starts with separate entries for the Rugby Summer Camp on Langeoog during the 2026 summer holidays (details and photos will be added later), the special straw-bale preparation in Echem for the 27.09.2026 event (women's team and mixed men's team; supplied straw-bale photos), and the first Wild Hogs participation in the Dorfparade on 29.08.2026.
- Use port `4182` for the Wild-Hogs local preview so it stays separate from other local prototypes.
- Blog overview cards use a small curated preview; clicking a card opens a detail view with the complete photo series from its matching source folder. Keep gallery tiles responsive and avoid cutting off photos at smaller widths.
- Use a dedicated `kontakt.html` page for all contact/probetraining links, with Manuela Oestreich's phone number and the form; the homepage keeps only a compact contact teaser.
- Keep the seven original Strohballen `.mov` videos out of this published prototype; they can be added later in a suitable format. The 13 photos remain in the detail gallery.
- Keep the 27.09.2026 Strohballen-Wettrollen competition day as its own Vereinsleben story, separate from the Echem preparation training. Its detail view includes all 16 supplied competition photos and two web-converted competition videos; the original media files remain untouched.
- Detail-page photos open in a large click-through lightbox with previous/next controls and Escape/backdrop close.
- Keep Training & Spiele as a separate Vereinsleben gallery, outside the Blog stories; its overview preview links to the complete source-folder gallery.
- Keep social links close to Vereinsleben & Aktuelles; show the Instagram icon and channel link consistently in the footer of every page.
- On the homepage, place the Vereinsleben and Instagram buttons directly below the Vereinsleben text, one below the other; neither button should overlay the photo.
- The homepage hero caption describes a village: “Kleines Dorf. Starkes Team.” Keep the Impressum as its own page, linked from every footer, using only the owner-confirmed contact details until the provider and legal information is reviewed.
- Offer German and English throughout the site, including all story details, gallery controls, contact and legal pages. Keep the chosen language when following internal links or switching language within a story; preserve proper names and place names.
- Feature the locally hosted straw-bale competition trailer prominently on the Vereinsleben overview, separate from the story cards. On the homepage, the locally hosted animated Wild Hogs intro replaces the repeated team photo in “Rugby für morgen”; keep the original photo asset available for an easy reversal.
- Use a clear near-end logo frame as the intro video's poster; do not autoplay it. Keep the earlier running-pigs poster asset available for reversal.
- Host fonts, photos and videos locally. The contact form currently opens an email draft instead of sending data to a backend; keep that limitation explicit. A privacy page describes the current setup, not the planned Web3Forms integration, and must be updated when the form service is actually activated.
- This public repository and `/Users/christopher.harms/Documents/GitHub/WildHogs` are the canonical website source. GitHub Actions publishes the Vite build from `dist/client` to GitHub Pages. Keep internal links and assets aware of the repository base path. The former private `WildHogs-Cloudflare-Archiv` repository and Cloudflare site remain available until separately retired.
