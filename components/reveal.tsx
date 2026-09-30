"use client";
import { useEffect, useRef, type ReactNode } from "react";

type RevealVariant = "content" | "image" | "stagger";

// All reveals share one native observer. No scroll listener or animation loop.
const pending = new Map<Element, () => void>();
let observer: IntersectionObserver | undefined;

function observe(element: Element, show: () => void) {
  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) pending.get(entry.target)?.();
    }
  }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
  pending.set(element, show);
  observer.observe(element);
  return () => {
    observer?.unobserve(element);
    pending.delete(element);
    if (!pending.size) { observer?.disconnect(); observer = undefined; }
  };
}

export function Reveal({ children, className = "", variant = "content" }: { children: ReactNode; className?: string; variant?: RevealVariant }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let stop: (() => void) | undefined;
    const show = () => {
      element.classList.add("is-visible");
      stop?.();
      stop = undefined;
    };
    // Never hide already visible content on hydration, history restoration or focus.
    if (preference.matches || !window.IntersectionObserver || element.getBoundingClientRect().top < window.innerHeight - 24) show();
    else {
      element.classList.add("reveal-ready");
      stop = observe(element, show);
    }
    const onPreferenceChange = () => { if (preference.matches) show(); };
    preference.addEventListener("change", onPreferenceChange);
    element.addEventListener("focusin", show);
    return () => {
      stop?.();
      preference.removeEventListener("change", onPreferenceChange);
      element.removeEventListener("focusin", show);
      element.classList.remove("reveal-ready");
    };
  }, []);
  return <div ref={ref} className={`reveal reveal-${variant} ${className}`}>{children}</div>;
}
