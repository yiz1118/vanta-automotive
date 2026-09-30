import { ArrowUpRightIcon, ArrowDownIcon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { ImageCompare } from "@/components/image-compare";
import { MediaFrame } from "@/components/media-frame";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { VehicleCard } from "@/components/vehicle-card";
import { media, services, vehicles } from "@/data/site";

export default function Home() {
  return <>
    <section className="home-hero" aria-labelledby="hero-title">
      <Image className="home-hero-image" src="/images/v01-hero.webp" alt="Graphite V01 concept grand tourer in a dark studio" fill sizes="100vw" priority quality={78} />
      <div className="hero-vignette" aria-hidden />
      <div className="home-hero-inner"><p className="eyebrow hero-kicker">Independent performance studio <span>/</span> Concept Project</p><h1 id="hero-title">Power,<br /><em>with purpose.</em></h1><p className="hero-summary">Performance, chassis and craftsmanship.<br />Engineered as one.</p><div className="hero-actions"><Link className="button-primary" href="/enquiry">Discuss your build <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link><Link className="button-ghost" href="/builds/v01-grand-touring">Explore the V01 <span className="action-icon" aria-hidden><ArrowDownIcon /></span></Link></div></div>
      <div className="hero-base"><span>VANTA MOTORWORKS</span><span>01 / 03&nbsp; V01 GRAND TOURING</span><span>SCROLL TO EXPLORE <ArrowDownIcon /></span></div>
    </section>

    <section className="intro-section section-pad"><Reveal className="intro-grid"><p className="eyebrow">01 / THE STUDIO</p><div><h2>One car.<br />One complete idea.</h2><p>Real performance comes from how the parts work together. We imagine builds in which the powertrain, chassis, aero and cabin answer the same brief.</p><Link className="text-link" href="/about">Our point of view <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link></div><p className="intro-side">CONTROL<br />CHARACTER<br />CRAFT</p></Reveal></section>

    <section className="featured-section section-pad"><SectionHeading eyebrow="02 / FEATURED BUILD" title="The V01, redefined." text="A grand touring study shaped around sustained pace, tactile control and a quieter kind of confidence." href="/builds/v01-grand-touring" action="Explore the complete build" /><Link href="/builds/v01-grand-touring" className="feature-image-link"><MediaFrame media={media.v01Side} sizes="100vw" motion="image" /><span className="feature-overlay"><span>V01 / GRAND TOURING</span><span>VIEW BUILD <ArrowUpRightIcon /></span></span></Link><Reveal variant="stagger" className="feature-specs"><span>CONCEPT TARGETS</span>{vehicles[0].specs.map((spec) => <div key={spec.label}><small>{spec.label}</small><strong>{spec.value}<em>{spec.unit}</em></strong></div>)}</Reveal></section>

    <section className="philosophy-section section-pad"><Reveal className="philosophy-head"><p className="eyebrow">03 / PERFORMANCE PHILOSOPHY</p><h2>Faster is a number.<br /><em>Better is a feeling.</em></h2></Reveal><Reveal variant="stagger" className="philosophy-columns"><div><span className="philosophy-rule" /><h3>Response</h3><p>Output matters when it reaches the road cleanly, predictably and repeatedly.</p></div><div><span className="philosophy-rule" /><h3>Control</h3><p>Chassis, tire and brake choices set the terms for confidence.</p></div><div><span className="philosophy-rule" /><h3>Character</h3><p>The sound, surfaces and touch points should feel like one vehicle.</p></div></Reveal></section>

    <section className="services-section section-pad"><SectionHeading eyebrow="04 / CAPABILITIES" title="Engineered in layers." text="Each discipline begins with the whole car, then resolves down to the smallest detail." href="/services" action="All services" /><div className="home-service-list">{services.slice(0, 6).map((service, index) => <Link href={`/enquiry?service=${service.slug}`} key={service.slug}><span className="mono">0{index + 1}</span><h3>{service.name}</h3><span>{service.description}</span><b className="action-icon" aria-hidden><ArrowUpRightIcon /></b></Link>)}</div></section>

    <section className="compare-section section-pad"><SectionHeading eyebrow="05 / TRANSFORMATION STUDY" title="A change you can feel." text="The V01 shown from one viewpoint: baseline concept and considered upgrade. Compare the stance and wheel specification." /><ImageCompare /><p className="concept-note">Illustrative concept comparison. Generated images; visual changes are not measured engineering results.</p></section>

    <section className="engineering-section section-pad"><div className="engineering-image"><MediaFrame media={media.v01Engine} sizes="(max-width: 800px) 100vw, 55vw" motion="image" /></div><div className="engineering-copy"><p className="eyebrow">06 / ENGINEERING</p><h2>Designed to work.<br /><em>Built to belong.</em></h2><p>Integration is the discipline behind the spectacle. We consider thermal load, accessible packaging and real-road composure before celebrating a headline number.</p><Link className="text-link" href="/engineering">Inside the engineering <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link></div></section>

    <section className="lineup-section section-pad"><SectionHeading eyebrow="07 / THE VEHICLES" title={<>Three expressions.<br />One conviction.</>} text="Each concept has a different purpose. The discipline behind them stays consistent." href="/builds" action="View all builds" /><div className="vehicle-grid">{vehicles.map((vehicle) => <VehicleCard key={vehicle.slug} vehicle={vehicle} />)}</div><p className="concept-note">All vehicles and performance figures are fictional concept studies.</p></section>

    <section className="workshop-section"><div><MediaFrame media={media.workshop} sizes="(max-width: 800px) 100vw, 58vw" motion="content" /></div><div className="workshop-copy"><span className="eyebrow">08 / THE WORKSHOP</span><h2>Precision has<br />a human side.</h2><p>A build is a sequence of small decisions made with care. We show the material and mechanical thinking behind each one.</p><Link className="text-link" href="/about">Meet the studio <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link></div></section>
  </>;
}
