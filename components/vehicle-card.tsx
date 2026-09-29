import { ArrowUpRightIcon } from "@/components/icons";
import Link from "next/link";
import type { Vehicle } from "@/data/site";
import { MediaFrame } from "./media-frame";

export function VehicleCard({ vehicle, className = "" }: { vehicle: Vehicle; className?: string }) {
  return <Link className={`vehicle-card ${className}`} href={`/builds/${vehicle.slug}`}>
    <div className="vehicle-card-image"><MediaFrame media={vehicle.hero} sizes="(max-width: 700px) 100vw, 50vw" /><span className="vehicle-card-open" aria-hidden><ArrowUpRightIcon /></span></div>
    <div className="vehicle-card-meta"><span className="eyebrow">{vehicle.code} / {vehicle.type}</span><h2>{vehicle.name}</h2><span className="mono">Concept target / {vehicle.specs[0].value} {vehicle.specs[0].unit}</span></div>
  </Link>;
}
