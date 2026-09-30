# VANTA MOTORWORKS — Concept Project

A standalone premium automotive website concept built with Next.js, React, TypeScript and Tailwind CSS. It presents an original fictional studio and three fictional vehicle studies. Performance figures are concept targets, and the enquiry flow is a local-only demonstration.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. For production verification:

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

`npm test` launches the production build on port 3206, runs Playwright and axe checks, and refreshes the screenshots in `screenshots/`. Run `npm run build` first. To repeat mobile Lighthouse checks, start the production server on port 3206 in one terminal, then run `npm run audit:performance` in another.

For the interface-icon regression matrix across installed Chrome, installed Edge and Playwright WebKit:

```bash
npx playwright install webkit
npx playwright test --config playwright.icons.config.ts
```

This matrix checks all routes for text-based icon fallbacks, navigation at 375–1440 px, inherited monochrome color, touch targets and gallery controls. WebKit with mobile emulation is a Safari compatibility check; it is not a physical iPhone test. See [the icon-fix evidence](qa/ICON-FIX.md).

For motion regression checks in Chrome and WebKit:

```bash
npx playwright test --config playwright.motion.config.ts
```

Motion is configured in `app/motion.css` and the reusable `Reveal` component. Only selected images and content groups opt in; mobile and reduced-motion fallbacks are included. See [the motion audit and QA evidence](qa/MOTION-POLISH.md).

## Routes

Home `/`, Builds `/builds`, three vehicle routes under `/builds/`, Services `/services`, Engineering `/engineering`, Gallery `/gallery`, About `/about` and Enquiry `/enquiry`.

The enquiry form does not contact a backend. Validated entries remain in component memory for the review step and disappear on page reload. A real launch would require a secure delivery service, privacy terms and verified studio contact details.

## Creator contact configuration

All creator identity and contact information is centralized in [config/creator.ts](config/creator.ts). The same file contains the project name used by the prefilled WhatsApp message and email subject/body. The shared footer renders the VANTA-specific [creator section](components/creator-layer.tsx) on every page, below the fictional studio's existing footer content.

The native **Start a Project** disclosure offers Email and WhatsApp without requiring client JavaScript. LinkedIn and GitHub are available in the contact row. These are real creator contact links; the automotive **Discuss a Build** flow remains the local concept demonstration.

`creator.portfolioUrl` configures the live **View Portfolio** link. To change its destination, update this value, then rebuild and restart or redeploy. Set it to `null` to hide the link; no component changes are needed.

Future analytics can use `data-creator-event` with `start_project`, `email`, `whatsapp`, `linkedin`, `github` and `portfolio`. The surrounding section's `data-creator-project` supplies the project context. No analytics library, tracking requests or click handler has been added.

See [creator integration QA](qa/CREATOR-INTEGRATION.md) for links, accessibility, responsive checks and screenshots.

## Documentation

- [Case study](CASE-STUDY.md)
- [Asset provenance](ASSET-PROVENANCE.md)
- [QA and screenshots](QA.md)

Generated images are concept depictions and are included as optimized local WebP assets. `scripts/prepare-assets.mjs` documents the transformation from local generated source IDs; those original PNG source files are not required to run the project.
