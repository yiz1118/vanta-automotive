import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata: Metadata = { title: "Gallery", description: "Vehicle, interior and workshop imagery from the VANTA MOTORWORKS concept." };
export default function GalleryPage() { return <div className="page-shell gallery-page"><header className="page-intro section-pad"><p className="eyebrow">IMAGE STUDIES / THE DETAILS MATTER</p><h1>See the<br /><em>whole picture.</em></h1><div className="page-intro-bottom"><p>Form, cabin and mechanical craft. Explore the imagined VANTA world in close detail.</p><span className="mono">17 / ORIGINAL IMAGE STUDIES</span></div></header><section className="section-pad"><GalleryGrid /><p className="concept-note">All imagery depicts fictional concept vehicles and workshop scenes.</p></section></div>; }
