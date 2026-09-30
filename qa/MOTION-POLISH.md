# VANTA motion audit and polish

Date: 2026-09-30. Scope: the VANTA automotive concept only.

## Audit decisions

| Area | Existing behavior | Selected improvement |
| --- | --- | --- |
| Hero and page introductions | Kicker and CTA entrance; main headings arrived abruptly | Readable, coordinated heading entrance, complete within 700 ms |
| Featured build, engineering, package and workshop photography | Most images appeared immediately; two generic reveals on the homepage | Selected mechanical image shutters; smaller content entrances on workshop and vehicle cards |
| Specification figures | Static rows | One-time stagger of actual values; no fabricated intermediate numbers |
| Philosophy and engineering process | Static small groups and technical rules | Short group stagger and transform-based line reveal |
| Mobile navigation | Animated maximum height | Immediate open state, opacity/translation transition, inert closed menu, active-route indication |
| Important links and services | Some hover feedback changed gap or padding | SVG arrow translation and color feedback without changing link geometry |
| Inspection and gallery | Basic image fade; filtered tiles changed abruptly | Short horizontal panel and image transitions; only the first four gallery tiles receive entrances |
| Reduced motion | Duration reduced to a tiny value | Nonessential animations and hover movement disabled; preference changes are handled live |

The comparison slider remains directly attached to pointer/touch input. Body paragraphs, enquiry fields, creator identity and secondary editorial images remain immediately readable. There is no parallax loop, animation library, loading screen or delayed routing. Existing branding, type, palette, content and layout are preserved.

## Implementation

- `components/reveal.tsx`: reusable `content`, `image` and `stagger` variants, one shared native observer, one-time entrances, focus reveal, observer/listener cleanup and readable fallbacks.
- `components/media-frame.tsx`: explicit opt-in through its `motion` prop; original image sizing and assets are retained.
- `app/motion.css`: shared timing/easing, transform/opacity entrances, SVG feedback, mobile simplification and reduced-motion rules.
- `playwright.motion.config.ts` and `tests/motion.spec.ts`: browser checks for reveal completion, keyboard focus, preference changes, missing JavaScript/observer, menu state, hover geometry and all-route responsive coverage.

## Verification

- `npm run lint`, `npm run typecheck` and `npm run build`: passed.
- Full Chrome regression suite: 34 passed. Covers all routes, vehicles, inspection tabs/hotspots, comparison slider, enquiry flow, creator contacts, SVGs, accessibility, responsive geometry and motion. The final SVG assertions were also rerun separately in Chrome (3 passed).
- WebKit motion suite: 7 passed. Includes all ten public routes at 375, 390, 430, 768, 1024 and 1440 px, with no horizontal overflow or runtime/console errors during rendering.
- WebKit SVG/navigation suite: 3 passed. Includes mobile touch navigation, inherited SVG colors, gallery keyboard controls and focus restoration.
- Axe accessibility checks: passed across the eight page types and the creator section.
- Live reduced-motion preference changes, keyboard reveal, no-JavaScript content and missing IntersectionObserver: passed in Chrome and WebKit.
- Settled homepage hero at 1440 × 900 px: zero changed pixel channels compared with the original production build. All nine homepage section positions and heights match the original measurements exactly.
- Screenshot checks capture the settled design with reduced motion; the refreshed homepage, vehicle, specs, inspection, gallery and mobile images are in `screenshots/`.

Responsive test documents are isolated to avoid carrying background prefetches between repeated full page replacements. Console listeners remain active through rendering; they are removed only when deliberately closing a test document, which cancels outstanding fetches. SVG attributes are checked as a single DOM snapshot so hydration cannot invalidate indexed locators. Navigation row geometry allows subpixel precision while retaining the original 58 px target.

Mobile Lighthouse, before and after, with Next's image conversion cache warmed for both runs:

| Route | Performance before | Performance after | Accessibility after | CLS after |
| --- | ---: | ---: | ---: | ---: |
| Homepage | 97 | 96 | 100 | 0 |
| V01 vehicle | 97 | 97 | 100 | 0 |
| Gallery | 94 | 93 | 100 | 0 |

After-polish LCP: homepage 2.6 s, V01 2.6 s, gallery 3.2 s. Total blocking time: 90 ms, 40 ms and 50 ms respectively. Best-practices scores remain 100. The measured performance scores stay within one point of the baseline; every audited route retains zero layout shift.

Local raw reports: `qa/motion-baseline-{home,v01,gallery}.json`, `qa/lighthouse-{home,v01,gallery}-mobile.json`, `qa/motion-browser-results.json` and `qa/icons-browser-results.json`. These generated reports are ignored by Git. Test commands may refresh the most recent report when rerun.

Visual evidence: `qa/motion-baseline-hero.png`, `qa/motion-after-hero.png`, `qa/motion-featured-desktop.png` and `qa/motion-mobile.png`.

Reports are local automated checks. WebKit provides Safari-engine compatibility evidence; it does not establish physical iPhone or Android-device verification.
