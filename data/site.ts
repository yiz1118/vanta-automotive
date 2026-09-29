export type MediaCategory = "Exterior" | "Interior" | "Workshop";
export type InspectionKey = "Exterior" | "Interior" | "Performance" | "Suspension" | "Exhaust";

export type Media = {
  src: string;
  alt: string;
  category: MediaCategory;
  title: string;
};

export const media = {
  v01Hero: { src: "/images/v01-hero.webp", alt: "Graphite V01 grand touring concept coupé, front three-quarter view in a dark studio", category: "Exterior", title: "V01 / Form and intent" },
  v01Alt: { src: "/images/v01-alt.webp", alt: "Graphite V01 concept coupé illuminated in a concrete studio", category: "Exterior", title: "V01 / First light" },
  v01Rear: { src: "/images/v01-rear.webp", alt: "Rear three-quarter view of the graphite V01 concept coupé", category: "Exterior", title: "V01 / Rear architecture" },
  v01Side: { src: "/images/v01-side.webp", alt: "Side profile of the graphite V01 concept coupé", category: "Exterior", title: "V01 / Silhouette" },
  v01Interior: { src: "/images/v01-interior.webp", alt: "V01 concept cabin with sculpted dark seats and brushed metal trim", category: "Interior", title: "V01 / Cabin" },
  v01Wheel: { src: "/images/v01-wheel.webp", alt: "Close-up of the V01 multi-spoke wheel and brake assembly", category: "Exterior", title: "V01 / Wheel assembly" },
  v01Engine: { src: "/images/v01-engine.webp", alt: "Open V01 concept powertrain bay with integrated performance hardware", category: "Workshop", title: "V01 / Powertrain" },
  powertrainDetail: { src: "/images/powertrain-detail.webp", alt: "Close detail of a dark aluminum performance intake and thermal shielding", category: "Workshop", title: "Workshop / Powertrain detail" },
  suspensionDetail: { src: "/images/suspension-detail.webp", alt: "Close detail of an adjustable suspension and brake assembly", category: "Workshop", title: "Workshop / Suspension assembly" },
  v02Hero: { src: "/images/v02-hero.webp", alt: "Silver V02 performance estate concept, front three-quarter view", category: "Exterior", title: "V02 / Touring sport" },
  v02Rear: { src: "/images/v02-rear.webp", alt: "Rear three-quarter view of the silver V02 estate concept", category: "Exterior", title: "V02 / Rear form" },
  v02Interior: { src: "/images/v02-interior.webp", alt: "V02 touring cabin in light graphite leather and brushed aluminum", category: "Interior", title: "V02 / Touring cabin" },
  v03Hero: { src: "/images/v03-hero.webp", alt: "Warm-white V03 lightweight concept coupé in a dark studio", category: "Exterior", title: "V03 / Lightweight" },
  v03Rear: { src: "/images/v03-rear.webp", alt: "Rear three-quarter view of the warm-white V03 lightweight concept", category: "Exterior", title: "V03 / Rear form" },
  v03Interior: { src: "/images/v03-interior.webp", alt: "Sparse V03 lightweight cockpit with dark material and composite seats", category: "Interior", title: "V03 / Focused cockpit" },
  workshop: { src: "/images/workshop.webp", alt: "Gloved technician inspecting a suspension component in a dark workshop", category: "Workshop", title: "Workshop / Precision" },
  exhaust: { src: "/images/exhaust.webp", alt: "Brushed titanium exhaust assembly on a workshop surface", category: "Workshop", title: "Workshop / Exhaust fabrication" },
} satisfies Record<string, Media>;

export type Hotspot = { label: string; detail: string; x: number; y: number };
export type Inspection = { key: InspectionKey; image: Media; heading: string; description: string; hotspots: Hotspot[] };
export type Vehicle = {
  slug: string;
  code: string;
  name: string;
  type: string;
  statement: string;
  description: string;
  package: string;
  packageSummary: string;
  specs: { label: string; value: string; unit: string }[];
  hero: Media;
  rear: Media;
  interior: Media;
  inspection: Inspection[];
};

function makeInspection(hero: Media, interior: Media, engine: Media, wheel: Media, exhaust: Media, model: string): Inspection[] {
  return [
    { key: "Exterior", image: hero, heading: "Surface follows function.", description: `The ${model} exterior resolves cooling, airflow and stance into a single clear form. Every alteration supports the car's visual and mechanical balance.`, hotspots: [{ label: "Front aero", detail: "A lower leading edge helps organize underbody airflow.", x: model === "V01" ? 12 : 25, y: model === "V01" ? 67 : 66 }, { label: "Wheel geometry", detail: "Wheel fitment is set around suspension travel and steering clearance.", x: model === "V01" ? 25 : 53, y: model === "V01" ? 63 : 58 }] },
    { key: "Interior", image: interior, heading: "Built around the driver.", description: "Touch points, seating and materials are specified together so the cabin feels coherent in motion and at rest.", hotspots: [{ label: "Seat support", detail: "Shaped bolsters support the driver without compromising long-distance comfort.", x: model === "V01" ? 25 : 62, y: 52 }, { label: "Material junction", detail: "Metal and soft trim meet at deliberate, tactile edges.", x: model === "V01" ? 66 : 35, y: model === "V01" ? 73 : 65 }] },
    { key: "Performance", image: engine, heading: "Response before headline output.", description: "Powertrain changes prioritize usable delivery, cooling and repeatability. Figures shown here are fictional concept targets.", hotspots: [{ label: "Thermal management", detail: "Cooling paths are considered alongside output targets.", x: 37, y: 44 }, { label: "Integrated hardware", detail: "Component packaging preserves access for maintenance.", x: 65, y: 62 }] },
    { key: "Suspension", image: wheel, heading: "Control you can feel.", description: "Spring, damper, tire and geometry choices are evaluated as one system for composure on imperfect roads.", hotspots: [{ label: model === "V01" ? "Wheel and tire" : "Spring and damper", detail: model === "V01" ? "Unsprung mass and contact patch inform the wheel choice." : "Spring rate and damper response are specified together.", x: model === "V01" ? 62 : 32, y: model === "V01" ? 27 : 39 }, { label: "Brake system", detail: "Thermal capacity and pedal consistency define the brake package.", x: model === "V01" ? 45 : 71, y: model === "V01" ? 47 : 46 }] },
    { key: "Exhaust", image: exhaust, heading: "A measured voice.", description: "Flow, heat and tone are treated as engineering decisions. The aim is presence without fatigue.", hotspots: [{ label: "Formed tubing", detail: "Smooth transitions support flow and improve fit.", x: 56, y: 48 }, { label: "Fabricated junction", detail: "Junction placement considers service access and heat clearance.", x: 27, y: 64 }] },
  ];
}

export const vehicles: Vehicle[] = [
  { slug: "v01-grand-touring", code: "V01", name: "Grand Touring", type: "Performance coupé", statement: "The long way, more intensely.", description: "A grand tourer composed around sustained pace. Its powertrain, aero, chassis and cabin are developed as one connected proposal.", package: "Grand Touring Programme", packageSummary: "Powertrain calibration, cooling, adaptive suspension specification, forged wheels, formed exhaust, aero refinement and a tailored cabin.", specs: [{ label: "Power", value: "612", unit: "bhp" }, { label: "Torque", value: "780", unit: "Nm" }, { label: "Weight", value: "1,650", unit: "kg" }, { label: "0–100", value: "3.5", unit: "s" }], hero: media.v01Hero, rear: media.v01Rear, interior: media.v01Interior, inspection: makeInspection(media.v01Side, media.v01Interior, media.v01Engine, media.v01Wheel, media.exhaust, "V01") },
  { slug: "v02-touring-sport", code: "V02", name: "Touring Sport", type: "Performance estate", statement: "Everyday range. Uncommon depth.", description: "The space and calm of a touring estate with greater steering precision, measured power and a more resolved cabin.", package: "Touring Sport Programme", packageSummary: "Progressive powertrain calibration, touring suspension, brake upgrade, forged wheels, quiet-flow exhaust and tactile interior detailing.", specs: [{ label: "Power", value: "540", unit: "bhp" }, { label: "Torque", value: "710", unit: "Nm" }, { label: "Weight", value: "1,840", unit: "kg" }, { label: "0–100", value: "4.1", unit: "s" }], hero: media.v02Hero, rear: media.v02Rear, interior: media.v02Interior, inspection: makeInspection(media.v02Hero, media.v02Interior, media.powertrainDetail, media.suspensionDetail, media.exhaust, "V02") },
  { slug: "v03-lightweight", code: "V03", name: "Lightweight", type: "Focused coupé", statement: "More sensation. Less excess.", description: "A compact driver-focused study where mass, feedback and proportion matter more than output alone.", package: "Lightweight Programme", packageSummary: "Weight reduction, track-informed damping, high-flow exhaust, compact aero pieces, forged wheels and a sparse driver-focused cabin.", specs: [{ label: "Power", value: "438", unit: "bhp" }, { label: "Torque", value: "510", unit: "Nm" }, { label: "Weight", value: "1,310", unit: "kg" }, { label: "0–100", value: "3.9", unit: "s" }], hero: media.v03Hero, rear: media.v03Rear, interior: media.v03Interior, inspection: makeInspection(media.v03Hero, media.v03Interior, media.powertrainDetail, media.suspensionDetail, media.exhaust, "V03") },
];

export const services = [
  { slug: "performance-tuning", name: "Performance tuning", description: "Calibration, thermal strategy and component selection for repeatable real-world response.", image: media.powertrainDetail, buildSlug: "v01-grand-touring" },
  { slug: "suspension", name: "Suspension", description: "A considered balance of spring rate, damping, alignment and usable ride height.", image: media.suspensionDetail, buildSlug: "v03-lightweight" },
  { slug: "exhaust", name: "Exhaust", description: "Flow and sound shaped around refinement, heat control and a durable fit.", image: media.exhaust, buildSlug: "v01-grand-touring" },
  { slug: "aero", name: "Aero", description: "Purposeful surfaces that support stability without visual noise.", image: media.v01Side, buildSlug: "v03-lightweight" },
  { slug: "wheels", name: "Wheels", description: "Fitment, strength, mass and finish chosen in the context of the complete chassis.", image: media.v01Wheel, buildSlug: "v01-grand-touring" },
  { slug: "interior", name: "Interior", description: "Seating, touch points and materials tailored to the way the car is used.", image: media.v01Interior, buildSlug: "v02-touring-sport" },
  { slug: "detailing", name: "Detailing", description: "Surface preparation and finishing that make careful engineering visible.", image: media.workshop, buildSlug: "v02-touring-sport" },
] as const;

export const gallery: Media[] = [media.v01Hero, media.v01Rear, media.v01Interior, media.v01Wheel, media.v02Hero, media.v02Rear, media.v02Interior, media.v03Hero, media.v03Rear, media.v03Interior, media.workshop, media.exhaust, media.v01Engine, media.powertrainDetail, media.suspensionDetail, media.v01Side, media.v01Alt];

export function vehicleBySlug(slug: string) { return vehicles.find((vehicle) => vehicle.slug === slug); }
