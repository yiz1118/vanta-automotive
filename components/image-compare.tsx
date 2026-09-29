"use client";

import { ArrowLeftRightIcon } from "@/components/icons";
import Image from "next/image";
import { useState, type PointerEvent } from "react";

export function ImageCompare() {
  const [position, setPosition] = useState(50);
  function drag(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(Math.round(Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100))));
  }
  return <div className="compare" data-testid="comparison">
    <div className="compare-images" onPointerDown={(event) => { if (event.button !== 0) return; event.currentTarget.setPointerCapture(event.pointerId); drag(event); }} onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) drag(event); }} onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}>
      <Image draggable={false} src="/images/v01-hero.webp" alt="Upgraded graphite V01 coupé with forged wheels and lower stance" fill sizes="(max-width: 700px) 100vw, 85vw" />
      <div className="compare-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><Image draggable={false} src="/images/v01-before.webp" alt="Baseline concept V01 coupé with standard wheels and stance" fill sizes="(max-width: 700px) 100vw, 85vw" /></div>
      <span className="compare-label compare-label-left">Before / baseline concept</span><span className="compare-label compare-label-right">After / VANTA study</span>
      <span className="compare-divider" style={{ left: `${position}%` }} aria-hidden><span><ArrowLeftRightIcon /></span></span>
    </div>
    <div className="compare-control"><label className="mono" htmlFor="compare-range">Drag or use arrow keys</label><input id="compare-range" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Reveal before or after concept image" /><button type="button" onClick={() => setPosition(50)}>Reset 50/50</button></div>
  </div>;
}
