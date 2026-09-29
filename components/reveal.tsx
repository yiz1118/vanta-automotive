"use client";
import { useEffect, useRef } from "react";

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.add("is-visible"); observer.disconnect(); }
    }, { threshold: 0.06 });
    element.classList.add("reveal-ready");
    observer.observe(element);
    return () => { observer.disconnect(); element.classList.remove("reveal-ready"); };
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
