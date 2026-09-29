# Cross-platform interface icon fix

Verified 28–29 September 2026 against the VANTA MOTORWORKS local production build.

## Root cause and change

The original mobile menu rows, desktop enquiry action, other links, gallery controls and comparison handle rendered Unicode arrow or control glyphs as text. Their appearance therefore depended on platform font fallback; on iOS Safari the rising diagonal arrow could receive Apple Color Emoji styling.

The interface now uses shared inline SVG components in [components/icons.tsx](../components/icons.tsx). SVGs use `stroke="currentColor"`, `fill="none"`, and `aria-hidden="true"`. The full navigation row remains the link. The existing CSS-only two-line menu mark remains CSS. No icon dependency, platform-specific font override, or emoji-hiding rule was added.

The global audit covered navigation, CTAs, service rows, vehicle cards, gallery, comparison, form selections, footer and the 404 route. Interface arrows, close, plus and check glyphs were replaced. A subsequent source scan found no arrow characters, emoji variation selectors or text-based symbol icons in `app/`, `components/`, `data/` or `public/`. The geometric arrows in the authored vehicle schematic are SVG drawing paths rather than font glyphs.

## Verification

| Check | Result |
|---|---|
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |
| `npm test` | 23 passed; includes original site checks, icon regression checks and axe scans |
| `npx playwright test --config playwright.icons.config.ts` | 9 passed: three tests each in desktop Chrome, desktop Edge and Playwright WebKit |
| Icon presentation | Rendered SVGs use inherited monochrome stroke, no SVG background, no Unicode arrow text |
| Six-width matrix | 375, 390, 430, 768, 1024 and 1440 px in each browser project |
| Navigation | Whole mobile row responds to a tap on its arrow area; desktop enquiry action responds to hover and click |
| Gallery | SVG previous, next and close controls retain their behavior |
| Geometry | All six mobile rows remain 58 px high. Header remains 70 px at phone widths and 82 px at larger widths. Desktop CTA height is unchanged; width differs by only 0.06 px due to rounding. |
| Layout | No horizontal overflow in the six-width icon matrix; Chrome before/after capture reported zero layout shift |

The focused browser matrix saves screenshots as `screenshots/icons-{browser}-{width}.png`. Representative inspected captures are [WebKit at 390 px](../screenshots/icons-webkit-390.png), [Chrome at 390 px](../screenshots/icons-chrome-390.png), [Edge at 390 px](../screenshots/icons-edge-390.png) and [WebKit at 1440 px](../screenshots/icons-webkit-1440.png). Before/after numeric geometry is recorded in `icons-before.json` and `icons-after.json`; the structured browser report is `icons-browser-results.json`.

Playwright WebKit with mobile emulation exercises Safari-compatible rendering but is not a physical iPhone or iOS Safari run. The user-reported iPhone symptom is addressed at its source by removing platform-dependent icon glyphs; no direct device result is claimed.
