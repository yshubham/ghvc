"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();
    const ring = ringRef.current;
    const dot = dotRef.current;
    const labelEl = labelRef.current;
    if (!ring || !dot || !labelEl) return;

    const xRing = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" });

    gsap.set([ring, dot, labelEl], { xPercent: -50, yPercent: -50 });

    const setHover = (target: HTMLElement | null) => {
      if (hoverRef.current === target) return;
      hoverRef.current = target;
      const label = target?.getAttribute("data-cursor") ?? null;
      labelEl.textContent = label ?? "";
      if (target) {
        gsap.to(ring, { scale: 2.15, opacity: 0.9, duration: 0.35, ease: "power2.out" });
        gsap.to(dot, { scale: 0.35, duration: 0.25, ease: "power2.out" });
        gsap.to(labelEl, {
          opacity: label ? 1 : 0,
          y: label ? 0 : 10,
          duration: 0.28,
          overwrite: true,
        });
      } else {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" });
        gsap.to(dot, { scale: 1, duration: 0.35, ease: "power3.out" });
        gsap.to(labelEl, { opacity: 0, y: 10, duration: 0.22, overwrite: true });
      }
    };

    const onMove = (e: MouseEvent) => {
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);

      const under = document.elementFromPoint(e.clientX, e.clientY);
      const target = under?.closest("[data-cursor]") as HTMLElement | null;
      setHover(target);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[10001] h-12 w-12 rounded-full border border-cyan-400/40 bg-transparent mix-blend-difference will-change-transform"
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10002] h-2 w-2 rounded-full bg-cyan-400 will-change-transform"
        aria-hidden
      />
      <div
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[10003] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-100 opacity-0 will-change-transform mix-blend-difference"
        aria-hidden
      />
    </>
  );
}
