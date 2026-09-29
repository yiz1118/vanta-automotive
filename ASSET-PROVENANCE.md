# Asset provenance

All vehicle and workshop photographs in this concept were generated for VANTA MOTORWORKS with the built-in image generation tool on 28 September 2026. They depict fictional vehicles and illustrative components. They are not photographs of completed builds, verified engineering hardware, customers, or an operating workshop.

The initial V01 hero established the coupé's design. Rear, side, cabin and wheel views were generated with that image as a reference. V02 and V03 each have their own initial concept image and referenced rear and interior views. The baseline V01 comparison image was generated from the V01 hero with the same camera, floor and lighting; the two images are illustrative, not a measured before/after build. Shared component close-ups deliberately omit identifying bodywork.

| Optimized asset | Source generation ID | Intended use |
|---|---|---|
| `v01-hero.webp` | `exec-6c9a529e-e356-445e-83dd-aa3c2d7cadc9` | V01 hero and comparison after |
| `v01-alt.webp` | `exec-f203dd92-587a-4096-8dc0-78ed038f6f41` | V01 gallery view |
| `v01-rear.webp` | `exec-47bf3c85-0ba9-4a06-8e86-03212489b1e1` | V01 rear view |
| `v01-interior.webp` | `exec-f90c8ff9-4e0e-4ebc-bf55-cc050fc88378` | V01 cabin |
| `v01-wheel.webp` | `exec-bf88c670-5608-4919-b16c-3ef7db3705ac` | V01 wheel detail |
| `v01-side.webp` | `exec-cd1c03f0-ad4b-4f7f-9695-4e53f4e498d7` | V01 profile |
| `v01-before.webp` | `exec-5f496a12-225f-4ada-8762-b25911f5a260` | Baseline comparison concept |
| `v01-engine.webp` | `exec-484f2215-d4fc-450a-a40b-7fddadd466ce` | V01 powertrain study |
| `v02-hero.webp` | `exec-c18d5f12-3981-4493-8ce2-edf61c6a6c36` | V02 exterior |
| `v02-rear.webp` | `exec-bffc3027-e62c-45c6-adb6-9c424ee87ddb` | V02 rear view |
| `v02-interior.webp` | `exec-cf11fe83-e44d-49c2-b49b-d848f31053ff` | V02 cabin |
| `v03-hero.webp` | `exec-97d0c625-c7e7-47e6-a4b9-8dd526b6822c` | V03 exterior |
| `v03-rear.webp` | `exec-b670795a-499f-468c-b2c3-1d0d2d1f9cd7` | V03 rear view |
| `v03-interior.webp` | `exec-9813f4f8-8c2c-4c3a-98a6-0a8c05eb8caa` | V03 cabin |
| `workshop.webp` | `exec-8b2fb03a-9735-44ce-a131-b943c6d9e9e6` | Workshop scene |
| `exhaust.webp` | `exec-a9f713e1-88ea-432a-befe-b789d24d197c` | Exhaust detail |
| `powertrain-detail.webp` | `exec-58bad87e-4458-4689-af47-edb9bc515bd3` | Shared powertrain component |
| `suspension-detail.webp` | `exec-35f2d597-082f-4eb4-b727-2e9406b4182b` | Shared suspension component |

`v01-hero-mobile.webp` is a separately optimized 780 px version of `v01-hero.webp`, not a separate generated image. The authored `vehicle-systems.svg` is a schematic illustration in this repository, not a production engineering drawing.

The 18 source images remain in the local Codex generated-images folder; only optimized WebP derivatives are needed to run the site. `scripts/prepare-assets.mjs` records the source filenames and applies a maximum 1800 px width at WebP quality 78, plus a 780 px hero derivative at quality 74. The 19 delivered WebP files total about 1.75 MB. Next Image creates appropriately sized AVIF/WebP response variants at request time. The initial hero is prioritized; images below the opening viewport load lazily.
