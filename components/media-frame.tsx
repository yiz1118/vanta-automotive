import Image from "next/image";
import type { Media } from "@/data/site";
import { Reveal } from "./reveal";

export function MediaFrame({ media, className = "", priority = false, sizes = "(max-width: 700px) 100vw, 80vw", motion = false }: { media: Media; className?: string; priority?: boolean; sizes?: string; motion?: "image" | "content" | false }) {
  const image = <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} quality={78} />;
  return motion ? <Reveal variant={motion} className={`media-frame ${className}`}>{image}</Reveal> : <div className={`media-frame ${className}`}>{image}</div>;
}
