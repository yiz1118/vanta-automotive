# QA and handover evidence

Site and creator integration verified on 29 September 2026 against the local production build (`next start` on port 3206), with Chrome via Playwright and additional creator checks in Edge. Original concept Lighthouse measurements are retained below. These are local lab checks, not field data or proof of a deployed service.

## Required commands

| Command | Result |
|---|---|
| `npm run lint` | Pass, no warnings |
| `npm run typecheck` | Pass |
| `npm run build` | Pass; Home, Builds, Services, Engineering, Gallery and About prerendered; all three known vehicle slugs generated; Enquiry server-rendered |
| `npm test` | Pass, 27 Playwright tests; no skipped, flaky or unexpected results |

## Browser coverage

The creator layer, safe external links, local contact disclosure, conditional portfolio visibility, metadata and six-width mobile/desktop checks are documented in [qa/CREATOR-INTEGRATION.md](qa/CREATOR-INTEGRATION.md).

- All eight page types and all three vehicle detail routes render; media URLs return successfully; unknown vehicle slugs receive the designed 404.
- Desktop navigation, contextual vehicle and service enquiry links, related service/build examples, V01 specification content and form preselection work. Unknown enquiry parameters are ignored.
- All five inspection sections render on all three vehicle pages. Tabs respond to pointer, keyboard arrows and touch; hotspots respond to pointer and touch and stay aligned with the uncropped image stage.
- The comparison supports direct image dragging, range endpoints, arrow keys, touch input and reset. Native browser image dragging is disabled so it cannot interrupt the control.
- Gallery filters work; the lightbox supports next/previous, Escape dismissal and focus return.
- Enquiry validation shows associated errors; review and edit preserve values; completion makes no submission request and states that nothing was sent or stored.
- Mobile menu opens and closes with keyboard focus return. Reduced-motion mode keeps content and controls functional.
- No horizontal overflow was found on any page or vehicle route at 360 × 780, 768 × 1024, 844 × 390, 901 × 900, 1180 × 900 or 1440 × 900. Home, V01, Gallery and Enquiry also passed at 390 × 844. The header concept label remains visible at all tested breakpoints.
- Automated axe checks pass on Home, Builds, V01 detail, Services, Engineering, Gallery, About and Enquiry. Keyboard paths were additionally exercised through Playwright.

## Mobile Lighthouse

These Lighthouse results are the original concept-build measurements. They were not rerun for the SVG icon patch. The patch's fresh browser, geometry and layout-shift checks are recorded in [qa/ICON-FIX.md](qa/ICON-FIX.md).

The test used Lighthouse's default mobile throttling on a local production server. The script primes the Next image conversion cache before each audited route, while Lighthouse performs a new navigation. Reports are saved under `qa/`.

| Page | Performance | Accessibility | LCP | CLS | Initial transfer |
|---|---:|---:|---:|---:|---:|
| Home | 97 | 100 | 2.6 s | 0 | 272 KiB |
| V01 detail | 97 | 100 | 2.6 s | 0 | 264 KiB |
| Gallery | 96 | 100 | 2.7 s | 0 | 389 KiB |

The 90+ performance and 95+ accessibility aims passed. The 2.5 s LCP aim was not met in this final run: Home and V01 measured 2.6 s, Gallery 2.7 s. All three meet the 0.1 CLS aim and score 100 for best practices. The display font is preloaded locally; only Latin font data used by the headings is delivered. SEO scored 63 because the fictional concept deliberately sets `noindex`; this is not a search launch audit.

## Screenshot review

Screenshots were captured after images decoded, including lazy imagery on full pages, and visually inspected for car visibility, image consistency, text legibility, section rhythm and mobile reflow.

| View | File |
|---|---|
| Homepage hero | [home-hero-desktop.png](screenshots/home-hero-desktop.png) |
| Full homepage | [home-full-desktop.png](screenshots/home-full-desktop.png) |
| Vehicle page | [vehicle-overview-desktop.png](screenshots/vehicle-overview-desktop.png) |
| Specifications | [vehicle-specs-desktop.png](screenshots/vehicle-specs-desktop.png) |
| Build inspection | [build-inspection-desktop.png](screenshots/build-inspection-desktop.png) |
| Gallery | [gallery-desktop.png](screenshots/gallery-desktop.png) |
| Mobile homepage | [home-mobile.png](screenshots/home-mobile.png) |
| Mobile vehicle | [vehicle-mobile.png](screenshots/vehicle-mobile.png) |
| Mobile enquiry | [enquiry-mobile.png](screenshots/enquiry-mobile.png) |

The visual review found the first immediate screenshots had captured unloaded lazy images and an intro reveal that had not entered the viewport. The screenshot test now scrolls through the reveals, waits for their settled states, decodes images and waits for fonts before capture. A literal line-break string in the lineup heading was corrected to JSX. The final reviewed screenshots show the complete homepage, vehicle imagery, specifications, inspection, gallery and mobile enquiry. Generated component views remain illustrative; no physical build, dyno run or real enquiry delivery has been verified.

## Plan completion audit

| Requirement | Evidence |
|---|---|
| Original brand, palette, local type and concept labels | Shared layout, header/footer, CSS tokens, generated image provenance; desktop/mobile screenshot review |
| Eight page types and three complete vehicle presentations | Production route output; all-route browser check; all 15 inspection sections checked |
| Homepage sections and enquiry CTA | Full homepage capture after scroll reveals; route and link checks |
| Services, process, schematic and craft presentation | Rendered service, engineering and about pages; related study links; authored schematic with explicit concept caption |
| Comparison, inspection and gallery interaction | Pointer, touch, keyboard, focus containment and focus return checks |
| Validated local-only enquiry | Required fields and invalid email checks, review/edit retention, context validation, no non-GET request |
| Responsive design, reduced motion and accessibility | Six-width matrix for every route; reduced-motion check; eight axe page-type scans |
| Media optimization and performance measurement | Local WebP assets; responsive Next Image configuration; three saved mobile Lighthouse reports |
| Case study and handover artifacts | CASE-STUDY.md, README.md, ASSET-PROVENANCE.md, this report, nine screenshot files |

The implementation and required commands are complete. The LCP aim remains a documented local lab limitation rather than a claimed pass.

The parent portfolio's lint and typecheck were also attempted after the new app was excluded from their broad scans. They still fail in pre-existing sibling projects (`02 — Fashion` and `03 — Technology`), including generated `.next` output and unresolved sibling aliases. Those failures are outside this standalone automotive concept and were not used as evidence for its quality gates.
