import { ArrowUpRightIcon, ArrowDownIcon } from "@/components/icons";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuildInspection } from "@/components/build-inspection";
import { MediaFrame } from "@/components/media-frame";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { VehicleCard } from "@/components/vehicle-card";
import { vehicleBySlug, vehicles } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return vehicles.map((vehicle) => ({ slug: vehicle.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const vehicle = vehicleBySlug((await params).slug); return { title: vehicle ? `${vehicle.code} / ${vehicle.name}` : "Build not found", description: vehicle?.description }; }

export default async function VehiclePage({ params }: Props) {
  const vehicle = vehicleBySlug((await params).slug);
  if (!vehicle) notFound();
  const related = vehicles.filter((item) => item.slug !== vehicle.slug);
  return <div className="vehicle-page">
    <section className="vehicle-hero"><Image src={vehicle.hero.src} alt={vehicle.hero.alt} fill priority sizes="100vw" /><div className="vehicle-hero-shade" /><div className="vehicle-hero-copy"><p className="eyebrow">BUILD STUDY / {vehicle.code} / {vehicle.type}</p><h1>{vehicle.code}<span> / {vehicle.name}</span></h1><p>{vehicle.statement}</p></div><div className="vehicle-hero-footer mono"><span>FICTIONAL CONCEPT</span><span>SCROLL TO INSPECT <ArrowDownIcon /></span></div></section>
    <section className="vehicle-intro section-pad"><div><p className="eyebrow">01 / THE INTENT</p><h2>{vehicle.statement}</h2></div><div><p>{vehicle.description}</p><p className="concept-note">This vehicle and all specification figures are fictional concept targets. Component photography is illustrative.</p></div></section>
    <section className="vehicle-specs section-pad" id="specifications"><div className="specs-title"><p className="eyebrow">02 / CONCEPT TARGETS</p><h2>The figures<br />behind the feeling.</h2></div><Reveal variant="stagger" className="spec-grid">{vehicle.specs.map((spec) => <div key={spec.label}><span className="mono">{spec.label}</span><strong>{spec.value}<small>{spec.unit}</small></strong></div>)}</Reveal></section>
    <section className="vehicle-inspection section-pad"><SectionHeading eyebrow="03 / BUILD INSPECTION" title="Look closer." text="Explore the design and engineering choices by area. Select a detail in the image or its description." /><BuildInspection vehicle={vehicle} /></section>
    <section className="package-section section-pad"><div><p className="eyebrow">04 / UPGRADE PACKAGE</p><h2>{vehicle.package}</h2><p>{vehicle.packageSummary}</p><Link className="button-primary" href={`/enquiry?vehicle=${vehicle.slug}`}>Discuss this build <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link></div><div className="package-art"><MediaFrame media={vehicle.rear} sizes="(max-width: 800px) 100vw, 55vw" motion="image" /></div></section>
    <section className="vehicle-editorial section-pad"><div><MediaFrame media={vehicle.interior} sizes="(max-width: 800px) 100vw, 45vw" /><span className="eyebrow">CABIN / MATERIAL & CONTROL</span></div><div><MediaFrame media={vehicle.rear} sizes="(max-width: 800px) 100vw, 45vw" /><span className="eyebrow">EXTERIOR / FORM & FUNCTION</span></div></section>
    <section className="diagram-section section-pad"><div><p className="eyebrow">05 / SYSTEM THINKING</p><h2>A whole-car<br /><em>perspective.</em></h2><p>The relationship between body, chassis, cabin and powertrain is the point of departure. The drawing describes integration priorities, not production geometry.</p><Link className="text-link" href="/engineering">See our process <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link></div><div className="diagram-art"><Image src="/diagrams/vehicle-systems.svg" alt="Schematic side-view diagram showing aero, powertrain, suspension and cabin as connected vehicle systems" width={940} height={480} /><span className="mono">SCHEMATIC CONCEPT / NOT AN ENGINEERING DRAWING</span></div></section>
    <section className="related-section section-pad"><SectionHeading eyebrow="06 / MORE FROM VANTA" title="Explore another direction." /><div className="vehicle-grid">{related.map((item) => <VehicleCard vehicle={item} key={item.slug} />)}</div></section>
  </div>;
}
