"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import SplitType from "split-type";
import { useLayoutEffect, useRef } from "react";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    const line = lineRef.current;
    const sub = subRef.current;
    const meta = metaRef.current;
    const bar = barRef.current;
    if (!root || !line || !sub || !meta || !bar) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let split: SplitType | undefined;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([line, sub, meta, bar], { opacity: 1, y: 0, clearProps: "opacity,transform" });
        return;
      }

      split = new SplitType(line, { types: "words,chars" });
      const chars = split.chars ?? [];
      if (!chars.length) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(bar, { scaleX: 0, transformOrigin: "left center", duration: 0.9 })
        .from(
          chars,
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -70,
            stagger: 0.015,
            duration: 0.85,
          },
          "-=0.55",
        )
        .from(
          sub,
          { y: 32, opacity: 0, duration: 0.75, ease: "power3.out" },
          "-=0.55",
        )
        .from(
          meta.children,
          { y: 20, opacity: 0, stagger: 0.1, duration: 0.55, ease: "power2.out" },
          "-=0.45",
        );
    }, root);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36"
    >
      <div className="gradient-mesh pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px] md:h-[520px] md:w-[520px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[380px] w-[380px] rounded-full bg-violet-500/15 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div ref={barRef} className="mb-10 h-px w-16 bg-gradient-to-r from-cyan-400 to-violet-400 md:mb-12" />

        <h1
          ref={lineRef}
          className="max-w-[1200px] text-[clamp(2.6rem,8vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.04em] text-zinc-50"
        >
          Digital marketing built for measurable growth.
        </h1>

        <p
          ref={subRef}
          className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 md:mt-10 md:text-lg"
        >
          GHVC Infotech is a full-funnel digital marketing agency—pairing paid media, SEO, content,
          and social with creative that earns attention and pipelines that prove ROI.
        </p>

        <div
          ref={metaRef}
          className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-wrap gap-4 md:gap-6">
            <MagneticButton
              as="a"
              href="#work"
              cursorLabel="Explore"
              className="rounded-full bg-zinc-100 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-zinc-950 transition-colors hover:bg-cyan-300"
            >
              Selected work
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              cursorLabel="Hello"
              className="rounded-full border border-white/15 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-zinc-100 transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
            >
              Start a project
            </MagneticButton>
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-600">
            New Delhi · Remote worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
