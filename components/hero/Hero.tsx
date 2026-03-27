"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import { useParallax } from "@/hooks/useParallax";
import SplitType from "split-type";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useParallax(bgRef, sectionRef, 0.35);
  useParallax(grainRef, sectionRef, 0.08);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    if (!section || !line || !sub || !cta) return;

    registerGsap();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([line, sub, cta], { opacity: 1, y: 0 });
      return;
    }

    let split: SplitType | undefined;
    const ctx = gsap.context(() => {
      split = new SplitType(line, { types: "words" });
      const words = split.words ?? [];
      if (!words.length) return;

      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power4.out" } });
      tl.from(words, {
        yPercent: 120,
        opacity: 0,
        rotateX: -35,
        stagger: 0.06,
        duration: 1,
      })
        .from(
          sub,
          { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.55",
        )
        .from(
          cta.children,
          { y: 28, opacity: 0, stagger: 0.08, duration: 0.55, ease: "power2.out" },
          "-=0.45",
        );

      gsap.to(section, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 -top-[20%] scale-110"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.08)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#0e0e0e_78%)]" />
      </div>
      <div
        ref={grainRef}
        className="grain pointer-events-none absolute inset-0 opacity-[0.2]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <p className="mb-8 text-[11px] uppercase tracking-[0.4em] text-[#737373] md:mb-10">
          Digital marketing studio
        </p>

        <h1
          ref={lineRef}
          className="max-w-[1400px] text-[clamp(2.75rem,7.5vw,6rem)] font-medium leading-[1.02] tracking-[-0.035em] text-[#f5f5f5] [perspective:900px]"
        >
          We grow brands with scroll-stopping creative and disciplined media.
        </h1>

        <p
          ref={subRef}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-[#a3a3a3] md:text-xl"
        >
          Paid social, search, content, and lifecycle marketing — one narrative, one measurement
          model, built for velocity.
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-wrap items-center gap-6 md:mt-16">
          <Link
            href="#work"
            className="inline-flex border border-[#404040] bg-[#f5f5f5] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0e0e0e] transition-colors hover:bg-white"
          >
            View work
          </Link>
          <Link
            href="#contact"
            className="inline-flex text-[11px] font-medium uppercase tracking-[0.25em] text-[#a3a3a3] underline-offset-8 transition-colors hover:text-[#e8e8e8] hover:underline"
          >
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
