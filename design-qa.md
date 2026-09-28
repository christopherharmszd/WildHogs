# Design QA

## Comparison target

- Source visual truth: `/Users/christopher.harms/.codex/generated_images/01a0c9de-bfe8-7840-b125-495122bee374/exec-c9fb9c9b-36fc-4ad2-a770-ac98345f4d93.png` (selected Variante 2, desktop landing-page direction).
- Brand asset: `/Users/christopher.harms/Downloads/669727A0-6EC0-4C5C-AA91-7FB4DA853618.PNG`.
- Implementation: `http://localhost:4174/` and `http://localhost:4174/aktuelles.html`.
- Browser evidence: rendered in Chrome via the local preview; full-page view and the dedicated Vereinsleben page were captured during the QA pass.
- Intended state: desktop landing page at top, plus the separate Vereinsleben/aktuelles page.

## Review

The implementation preserves the selected direction's core visual language: warm off-white content surfaces, black and red club palette, bold condensed display typography, documentary photography, and a clear Probetraining CTA. The real Wild-Hogs team image and supplied crest replace the ideation placeholders in the rugby experience. The Strohballen photos are intentionally kept out of the rugby core and used only on the separate Vereinsleben page.

### Required fidelity surfaces

- Fonts and typography: Barlow Condensed for display headlines and Inter for body/UI copy. Hierarchy and uppercase display treatment match the selected direction; body copy remains readable.
- Spacing and layout rhythm: wide editorial split sections, photo-led feature blocks, black/red CTA bands, and responsive single-column collapse are implemented.
- Colors and tokens: black, warm paper, white, and vivid red are centralized in CSS tokens; contrast is maintained across hero, paper, and contact sections.
- Image quality and asset fidelity: supplied Wild-Hogs PNG crest and real team/event photos are used as image assets. No logo or photo is recreated as CSS/SVG art.
- Copy and content: rugby facts and training details use the confirmed current information: Monday 16:30–18:00 at Sportplatz Hohnstorf/Elbe, Saturday 10:00–12:00 at Schule Scharnebeck, girls and boys, 10–13 years. Vereinsleben copy is separated into its own page with distinct entries for Rugby Summer Camp (photo area intentionally pending), the special straw-bale preparation training, and the first Wild Hogs participation in the Dorfparade on 29.08.2026.

## Primary interactions tested

- Main navigation to Rugby, Training, Vereinsleben, and Kontakt.
- Vereinsleben link opens `/aktuelles.html` and shows the blog-style event area plus a separate fixtures/termine module.
- Contact form accepts local test input and shows the success state `Danke, Nachricht angekommen. Wir melden uns bei dir.`
- External TuS and Instagram links are present.

## Verification

- `npm run build`: passed.
- `npm run test:sites`: passed, 4 tests.
- Browser-rendered homepage and Vereinsleben page: passed.
- Console-error inspection: not exposed by the available browser-control surface; no visible runtime errors were observed.

## Findings

No actionable P0/P1/P2 differences remain against the selected direction. The supplied real team photo changes the ideation hero imagery from a staged mock to an authentic club image; this is intentional and improves credibility.

## Follow-up polish

- Add the Rugby Summer Camp photos and any further real event photos as individual Vereinsleben posts when available.
- Add confirmed match dates/results once the team provides the current fixture list.
- Replace the local form success simulation with the team's chosen contact destination before publication.

final result: passed
