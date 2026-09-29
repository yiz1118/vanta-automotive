"use client";
import { useRef, useState } from "react";
import type { Vehicle } from "@/data/site";
import { MediaFrame } from "./media-frame";

export function BuildInspection({ vehicle }: { vehicle: Vehicle }) {
  const [index, setIndex] = useState(0);
  const [hotspot, setHotspot] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = vehicle.inspection[index];
  function select(next: number, focus = false) { setIndex(next); setHotspot(0); if (focus) requestAnimationFrame(() => tabs.current[next]?.focus()); }
  return <div className="inspection" data-testid="inspection">
    <div className="inspection-tabs" role="tablist" aria-label={`${vehicle.code} build inspection`}>{vehicle.inspection.map((item, itemIndex) => <button ref={(element) => { tabs.current[itemIndex] = element; }} key={item.key} id={`tab-${item.key}`} type="button" role="tab" aria-selected={index === itemIndex} aria-controls="inspection-panel" tabIndex={index === itemIndex ? 0 : -1} onClick={() => select(itemIndex)} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); select((itemIndex + (event.key === "ArrowRight" ? 1 : -1) + vehicle.inspection.length) % vehicle.inspection.length, true); } if (event.key === "Home") { event.preventDefault(); select(0, true); } if (event.key === "End") { event.preventDefault(); select(vehicle.inspection.length - 1, true); } }}>{item.key}</button>)}</div>
    <div className="inspection-grid" id="inspection-panel" role="tabpanel" aria-labelledby={`tab-${current.key}`}>
      <div className="inspection-stage"><MediaFrame key={current.image.src} media={current.image} sizes="(max-width: 800px) 100vw, 65vw" />{current.hotspots.map((point, pointIndex) => <button key={`${current.key}-${point.label}`} type="button" className={`hotspot ${hotspot === pointIndex ? "is-active" : ""}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} aria-label={`Inspect ${point.label}`} aria-pressed={hotspot === pointIndex} onClick={() => setHotspot(pointIndex)}><span>{pointIndex + 1}</span></button>)}</div>
      <div key={current.key} className="inspection-copy"><span className="eyebrow">{vehicle.code} / {current.key}</span><h3>{current.heading}</h3><p>{current.description}</p><div className="hotspot-list">{current.hotspots.map((point, pointIndex) => <button key={point.label} type="button" className={hotspot === pointIndex ? "is-active" : ""} onClick={() => setHotspot(pointIndex)} aria-pressed={hotspot === pointIndex}><span className="mono">0{pointIndex + 1}</span><span><strong>{point.label}</strong><small>{point.detail}</small></span></button>)}</div><p className="concept-note">Concept study · component views are illustrative</p></div>
    </div>
  </div>;
}
