import Image from "next/image";
import type { Media } from "@/data/site";

export function MediaFrame({ media, className = "", priority = false, sizes = "(max-width: 700px) 100vw, 80vw" }: { media: Media; className?: string; priority?: boolean; sizes?: string }) {
  return <div className={`media-frame ${className}`}>
    <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} quality={78} />
  </div>;
}
