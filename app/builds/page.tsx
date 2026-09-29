import type { Metadata } from "next";
import { VehicleCard } from "@/components/vehicle-card";
import { vehicles } from "@/data/site";

export const metadata: Metadata = { title: "Builds", description: "Three original VANTA MOTORWORKS vehicle concept studies." };

export default function BuildsPage() { return <div className="page-shell builds-page"><header className="page-intro section-pad"><p className="eyebrow">THE VEHICLES / CONCEPT STUDIES</p><h1>Built to move<br /><em>differently.</em></h1><div className="page-intro-bottom"><p>Three different briefs. One approach: let every decision earn its place on the car.</p><span className="mono">01—03 / CONCEPT TARGETS</span></div></header><div className="builds-list section-pad">{vehicles.map((vehicle, index) => <div className="builds-row" key={vehicle.slug}><div className="builds-row-index mono">0{index + 1} / {vehicle.type}</div><VehicleCard vehicle={vehicle} /><div className="builds-row-copy"><p>{vehicle.statement}</p><span className="mono">{vehicle.specs[0].value} {vehicle.specs[0].unit} / {vehicle.specs[3].value} {vehicle.specs[3].unit} 0–100</span></div></div>)}</div><p className="concept-note section-pad">All vehicles and performance figures are fictional concept studies.</p></div>; }
