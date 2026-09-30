import { ArrowUpRightIcon } from "@/components/icons";
import Link from "next/link";
import { Reveal } from "./reveal";

export function SectionHeading({ eyebrow, title, text, href, action }: { eyebrow: string; title: React.ReactNode; text?: string; href?: string; action?: string }) {
  return <Reveal className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><div className="section-heading-side">{text && <p>{text}</p>}{href && <Link className="text-link" href={href}>{action ?? "Explore"}<span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link>}</div></Reveal>;
}
