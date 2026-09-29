import { ArrowUpRightIcon } from "@/components/icons";
import Link from "next/link";
export default function NotFound() { return <section className="not-found section-pad"><p className="eyebrow">404 / ROUTE NOT FOUND</p><h1>That road<br /><em>ends here.</em></h1><p>The page or concept build you requested is not available.</p><Link className="button-primary" href="/builds">Explore the builds <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link></section>; }
