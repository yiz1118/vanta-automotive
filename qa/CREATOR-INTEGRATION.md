# Creator contact integration

Verified on 29 September 2026 against the local production build.

## Scope and placement

The VANTA-specific creator layer appears below the existing brand footer on every route. It identifies an Independent Concept Project, credits Alson Chua as designer/developer and presents his professional title, Malaysia/worldwide location and freelance availability. Existing brand navigation, imagery, layout, animations and the automotive enquiry demonstration remain separate. A before/after desktop hero capture was pixel-identical: zero differing channels out of 2,764,800.

Identity, contact addresses and portfolio URL are stored once in `config/creator.ts`. The project name in that file supplies WhatsApp/email context and the root metadata description. Other components read this configuration rather than repeating real contact values.

## Contact behavior

**Start a Project** is a native disclosure with two choices: Email and WhatsApp. It is keyboard accessible and also works with JavaScript disabled. The email link creates a draft with a VANTA-specific subject/body. WhatsApp receives an encoded message naming VANTA Motorworks. The contact row also provides LinkedIn and GitHub. Tests checked the links without sending messages or opening external communication channels.

HTTPS contact links use `target="_blank"` and `rel="noopener noreferrer"`; email uses `mailto:`. Interface icons reuse the existing SVG system, inherit `currentColor` and are decorative. Future tracking can identify `start_project`, `email`, `whatsapp`, `linkedin`, `github` and `portfolio` through `data-creator-event`, with context from `data-creator-project`. No tracker or analytics package was installed.

The current portfolio URL is `null`, so visitors see no portfolio CTA or placeholder. A direct server-render check of the actual component confirmed that supplying a URL renders **View Portfolio** with the configured href and safe external-link attributes. Replacing `null` with the finished portfolio's HTTPS URL and rebuilding is sufficient.

## Results

| Check | Result |
|---|---|
| Lint | Pass |
| Type check | Pass |
| Production build | Pass |
| Full Playwright suite | 27 passed, including 4 creator tests and all prior site/icon checks |
| Credit and concept status | Present on all 10 normal routes |
| Disclosure | Pointer, touch and Enter/Tab keyboard operation pass |
| Links | Correct addresses, decoded VANTA context, external target/rel attributes and tracking identifiers pass |
| Portfolio | Absent with null; direct component SSR check passes with a configured URL |
| Accessibility | Creator axe scan and all 8 full page-type axe scans pass |
| Mobile and desktop | Chrome and Edge checks pass at 375, 390, 430, 768, 1024 and 1440 px |
| Targets and overflow | All creator links/summary at least 44 px high; no horizontal overflow; email and phone fit |
| Without JavaScript | Edge: native disclosure and contact choices remain usable |
| Hero preservation | Pixel-identical before/after at 1280 × 720 |

Screenshots show the open contact chooser. The image captures only the creator section, so the existing page gutter falls outside the crop. All six widths were visually reviewed:

- [375 px](../screenshots/creator-375.png)
- [390 px](../screenshots/creator-390.png)
- [430 px](../screenshots/creator-430.png)
- [768 px](../screenshots/creator-768.png)
- [1024 px](../screenshots/creator-1024.png)
- [1440 px](../screenshots/creator-1440.png)

Full footer captures with the chooser closed show the creator credit following the original studio footer: [desktop](../screenshots/creator-footer-1440.png) and [mobile](../screenshots/creator-footer-390.png).

Structured evidence is in `browser-results.json`, `creator-edge-results.json` and `creator-hero-comparison.json`. These are local Chrome/Edge checks with mobile emulation, not physical iPhone, Android or macOS device results. The existing SVG icon system was reused without change.

## Files changed

- `config/creator.ts` — new centralized identity, project context and contact URL construction.
- `components/creator-layer.tsx` — new VANTA-specific creator credit, contact disclosure, contact links and conditional portfolio CTA.
- `components/site-footer.tsx` — adds the creator layer after existing footer content.
- `app/globals.css` — scoped creator styles and responsive rules.
- `app/layout.tsx` — factual creator/concept description and author metadata.
- `tests/creator.spec.ts` — creator journey, link, accessibility and responsive tests.
- `README.md`, `QA.md` and this report — configuration instructions and measured evidence.
- `screenshots/` — six creator captures and refreshed site screenshots.
