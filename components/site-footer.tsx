import { ArrowUpRightIcon } from "@/components/icons";
import Link from "next/link";
import { CreatorLayer } from "@/components/creator-layer";

export function SiteFooter() {
  return <footer className="site-footer section-pad">
    <div className="footer-top"><p className="eyebrow">VANTA MOTORWORKS / CONCEPT PROJECT</p><Link href="/enquiry" className="footer-cta">Your next move<br /><em>starts here.</em><span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link></div>
    <div className="footer-bottom"><span>VANTA MOTORWORKS</span><p>A fictional automotive studio and portfolio concept. Vehicles, figures and imagery are concept work.</p><nav aria-label="Footer"><Link href="/builds">Builds</Link><Link href="/services">Services</Link><Link href="/engineering">Engineering</Link><Link href="/gallery">Gallery</Link><Link href="/about">About</Link><Link href="/enquiry">Enquiry</Link></nav><span>© 2026 CONCEPT PROJECT</span></div>
    <CreatorLayer />
  </footer>;
}
