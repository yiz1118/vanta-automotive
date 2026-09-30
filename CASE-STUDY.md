# VANTA MOTORWORKS — Concept Project

## Concept

VANTA MOTORWORKS is an original fictional performance engineering studio. The site presents three imagined vehicle programmes as a cohesive brand: V01 Grand Touring, V02 Touring Sport and V03 Lightweight. Vehicles, specifications, photography, workshop scenes and processes are concept content. The site labels this status throughout the experience.

## Industry

Premium automotive customization and performance engineering: powertrain tuning, suspension, exhaust, aero, wheels, interior and finishing.

## Target customers

Owners considering a substantial, highly personal automotive project. They need to see judgment and craft before sharing details about a valuable vehicle. The secondary audience is prospective clients assessing my ability to make image-led, interactive websites for premium products.

## Business objective

Lead qualified visitors from visual interest to a detailed build enquiry. Build confidence by explaining the relationship between disciplines rather than presenting a parts catalog. The enquiry is an interactive portfolio demo: it validates and reviews information locally and does not send or store it.

## Visual strategy

The site draws from dark studio photography, machined metal and the long horizontal proportions of a grand tourer. Carbon black and graphite carry the photography; off-white provides crisp type; oxidized copper marks actions and selected details. Barlow Condensed makes the large headlines feel tensile and kinetic. Instrument Sans keeps reading clear, while IBM Plex Mono gives specification labels a technical register. A pale specification spread interrupts the dark rhythm to give the numbers editorial weight.

The most characteristic moment is the V01 build inspection: imagery, detail points and written rationale form one navigable presentation. Seventeen gallery selections and the baseline comparison let visitors examine the proposed craft at different scales. Original imagery was generated for the concept and optimized locally; source IDs are documented in [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md).

## Motion strategy

Motion is controlled, kinetic and mechanical. A readable 700 ms heading entrance establishes hierarchy; selected large images use 760 ms transform-based shutters. Specification and process groups reveal once in a short stagger while retaining their actual values. Controls respond in 180 ms, with 220–320 ms inspection and gallery transitions. One shared IntersectionObserver manages the scroll reveals without a continuous scroll loop. Mobile uses smaller translations and simple image fades; reduced-motion preferences remove automatic and hover movement. Native scrolling, immediate navigation and server-rendered content remain available, including when JavaScript or IntersectionObserver is unavailable.

## Technical presentation

Typed local content defines the three vehicles, seven services, gallery items, specifications, upgrade packages and inspection annotations. Known detail routes are generated at build time; an unknown slug receives a designed 404. A clear schematic SVG explains whole-car thinking and is expressly identified as illustrative. Specifications are fictional concept targets and are never represented as dyno or road-test results.

The enquiry form preselects a valid vehicle or service from contextual links, validates required fields, offers an edit/review step and ends in a truthful demo state. It performs no network submission and writes no persistent browser storage.

## Responsive approach

The desktop design uses broad vehicle stages and asymmetric editorial grids. At smaller widths, sections become single-column, specification groups become two columns, and the inspection controls wrap into two rows. The mobile menu exposes all destinations and restores keyboard focus on dismissal. Text stays outside the image assets so it can reflow independently. Screenshots at desktop and 390 px mobile document the resulting layouts.

## Performance optimization

Eighteen generated images were curated and converted to local WebP; the delivered derivatives total approximately 1.75 MB across the entire project. Next Image serves responsive AVIF/WebP variants with reserved dimensions. Only opening hero images receive priority; below-fold imagery is lazy. Fonts are self-hosted. Client JavaScript is limited to navigation, inspection, comparison, gallery, enquiry and scroll reveals. Mobile Lighthouse measurements and their limits are recorded in [QA.md](QA.md).

## Technology

Next.js App Router, React, strict TypeScript, Tailwind CSS, local font packages, authored CSS, Next Image, Playwright, axe-core and Lighthouse. Motion uses CSS transitions and IntersectionObserver; no animation library is required.

## What This Demonstrates

- A complete visual identity and eight-page automotive concept with a distinct point of view.
- Original vehicle imagery carried consistently across overview, detail, gallery and enquiry journeys.
- Rich, accessible interactions that serve product understanding and enquiry intent.
- Honest concept labeling for fictional vehicles, figures, imagery and form behavior.
- Responsive frontend craft and measured performance in a production build.
