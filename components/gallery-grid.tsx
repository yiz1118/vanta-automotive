"use client";

import { ArrowUpRightIcon, ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/icons";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gallery, type MediaCategory } from "@/data/site";

const filters: ("All" | MediaCategory)[] = ["All", "Exterior", "Interior", "Workshop"];

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<number | null>(null);
  const launchButton = useRef<HTMLButtonElement | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = filter === "All" ? gallery : gallery.filter((item) => item.category === filter);
  const active = selected === null ? null : filtered[selected];
  const isOpen = selected !== null;
  const imageCount = filtered.length;

  useEffect(() => {
    if (!isOpen) return;
    const node = dialog.current;
    if (!node) return;
    node.showModal();
    node.querySelector<HTMLButtonElement>(".lightbox-close")?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") { event.preventDefault(); setSelected((value) => ((value ?? 0) + 1) % imageCount); }
      if (event.key === "ArrowLeft") { event.preventDefault(); setSelected((value) => ((value ?? 0) - 1 + imageCount) % imageCount); }
      if (event.key === "Tab") {
        const controls = Array.from(node.querySelectorAll<HTMLButtonElement>("button:not([disabled])"));
        const first = controls[0]; const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => { document.removeEventListener("keydown", keydown); node.close(); launchButton.current?.focus(); };
  }, [isOpen, imageCount]); // Preserve the open dialog while changing the selected image.

  function close() { setSelected(null); }
  function open(index: number, button: HTMLButtonElement) { launchButton.current = button; setSelected(index); }
  return <div className="gallery-shell">
    <div className="gallery-filters" role="group" aria-label="Filter gallery">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => { setFilter(item); setSelected(null); }}>{item}<span className="mono">{item === "All" ? gallery.length : gallery.filter((image) => image.category === item).length}</span></button>)}</div>
    <div className="gallery-grid">{filtered.map((item, index) => <button type="button" key={item.src} className={`gallery-tile tile-${index % 5}`} onClick={(event) => open(index, event.currentTarget)} aria-label={`Open ${item.title}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /><span className="gallery-tile-meta"><span>{item.title}</span><span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></span></button>)}</div>
    <dialog ref={dialog} className="lightbox" aria-label={active ? `${active.title} image viewer` : "Image viewer"} onClose={close} onClick={(event) => { if (event.target === dialog.current) close(); }}>
      {active && <div className="lightbox-content"><div className="lightbox-top"><span className="eyebrow">VANTA / {active.category} / {String((selected ?? 0) + 1).padStart(2, "0")}—{String(filtered.length).padStart(2, "0")}</span><button className="lightbox-close" type="button" onClick={close}>Close <CloseIcon /></button></div><div className="lightbox-image"><Image key={active.src} src={active.src} alt={active.alt} fill sizes="95vw" /></div><div className="lightbox-bottom"><h2>{active.title}</h2><div><button type="button" onClick={() => setSelected(((selected ?? 0) - 1 + filtered.length) % filtered.length)} aria-label="Previous image"><ArrowLeftIcon /></button><button type="button" onClick={() => setSelected(((selected ?? 0) + 1) % filtered.length)} aria-label="Next image"><ArrowRightIcon /></button></div></div></div>}
    </dialog>
  </div>;
}
