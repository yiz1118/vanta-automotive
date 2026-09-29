import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// Source IDs are recorded in ASSET-PROVENANCE.md. The optimized files are committed with the concept.
const source = "C:/Users/alson/.codex/generated_images/01a0e807-c8b5-7420-a641-40feabe48817";
const output = path.join(process.cwd(), "public", "images");
const images = {
  "v01-hero": "exec-6c9a529e-e356-445e-83dd-aa3c2d7cadc9.png",
  "v01-alt": "exec-f203dd92-587a-4096-8dc0-78ed038f6f41.png",
  "v01-rear": "exec-47bf3c85-0ba9-4a06-8e86-03212489b1e1.png",
  "v01-interior": "exec-f90c8ff9-4e0e-4ebc-bf55-cc050fc88378.png",
  "v01-wheel": "exec-bf88c670-5608-4919-b16c-3ef7db3705ac.png",
  "v01-side": "exec-cd1c03f0-ad4b-4f7f-9695-4e53f4e498d7.png",
  "v02-hero": "exec-c18d5f12-3981-4493-8ce2-edf61c6a6c36.png",
  "v03-hero": "exec-97d0c625-c7e7-47e6-a4b9-8dd526b6822c.png",
  "workshop": "exec-8b2fb03a-9735-44ce-a131-b943c6d9e9e6.png",
  "exhaust": "exec-a9f713e1-88ea-432a-befe-b789d24d197c.png",
  "v02-rear": "exec-bffc3027-e62c-45c6-adb6-9c424ee87ddb.png",
  "v02-interior": "exec-cf11fe83-e44d-49c2-b49b-d848f31053ff.png",
  "v03-rear": "exec-b670795a-499f-468c-b2c3-1d0d2d1f9cd7.png",
  "v03-interior": "exec-9813f4f8-8c2c-4c3a-98a6-0a8c05eb8caa.png",
  "v01-before": "exec-5f496a12-225f-4ada-8762-b25911f5a260.png",
  "v01-engine": "exec-484f2215-d4fc-450a-a40b-7fddadd466ce.png",
  "powertrain-detail": "exec-58bad87e-4458-4689-af47-edb9bc515bd3.png",
  "suspension-detail": "exec-35f2d597-082f-4eb4-b727-2e9406b4182b.png",
};

await mkdir(output, { recursive: true });
for (const [name, file] of Object.entries(images)) {
  await sharp(path.join(source, file)).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(path.join(output, `${name}.webp`));
}
await sharp(path.join(source, images["v01-hero"]))
  .resize({ width: 780, withoutEnlargement: true })
  .webp({ quality: 74, effort: 6 })
  .toFile(path.join(output, "v01-hero-mobile.webp"));
