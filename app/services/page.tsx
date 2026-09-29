import { ArrowUpRightIcon } from "@/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import { services, vehicleBySlug } from "@/data/site";

export const metadata: Metadata = { title: "Services", description: "Performance, chassis, aero, exhaust, wheels and interior concept services." };

export default function ServicesPage() {
  return <div className="page-shell services-page">
    <header className="page-intro section-pad">
      <p className="eyebrow">CAPABILITIES / COMPLETE VEHICLE THINKING</p>
      <h1>Every part<br /><em>has a purpose.</em></h1>
      <div className="page-intro-bottom"><p>From a single focused upgrade to a complete programme, each discipline is considered in the context of the whole car.</p><span className="mono">07 / DISCIPLINES</span></div>
    </header>
    <div className="service-editorial section-pad">{services.map((service, index) => {
      const example = vehicleBySlug(service.buildSlug)!;
      return <section className="service-block" key={service.slug} id={service.slug}>
        <div className="service-block-heading">
          <span className="mono">0{index + 1}</span><h2>{service.name}</h2><p>{service.description}</p>
          <div className="service-actions">
            <Link className="text-link" href={`/enquiry?service=${service.slug}`}>Discuss {service.name.toLowerCase()} <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link>
            <Link className="service-example mono" href={`/builds/${example.slug}`}>Related study / {example.code} {example.name} <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link>
          </div>
        </div>
        <MediaFrame media={service.image} sizes="(max-width: 800px) 100vw, 50vw" />
      </section>;
    })}</div>
  </div>;
}
