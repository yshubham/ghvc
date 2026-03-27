"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import { useLayoutEffect, useRef } from "react";

const PANELS = [
  {
    kicker: "Strategy",
    title: "Audience-first media planning",
    body: "We map customer journeys, budgets, and channel roles so every rupee works toward acquisition, retention, or lifetime value.",
  },
  {
    kicker: "Creative",
    title: "Assets that match the algorithm",
    body: "Static, motion, UGC-style hooks, and landing experiences tested for scroll-stopping clarity and conversion.",
  },
  {
    kicker: "Performance",
    title: "Optimization, not guesswork",
    body: "Structured experiments, bid and audience refinements, and dashboards that tie spend to leads, sales, and cost per outcome.",
  },
  {
    kicker: "Partnership",
    title: "Embedded growth team",
    body: "We collaborate with founders and in-house marketers as an extension of your team—speedy comms, honest reporting, shared targets.",
  },
] as const;

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = section.querySelectorAll<HTMLElement>("[data-about-panel]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(panels, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(panels, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=20%",
          once: true,
        },
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const scrollDistance = () => Math.max(track.scrollWidth - window.innerWidth + 160, 0);

        return gsap.to(track, {
          x: () => -scrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative border-t border-white/[0.06] bg-[var(--bg-deep)] py-24 md:min-h-screen md:py-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="mx-auto flex max-w-[1400px] flex-col px-6 pb-12 pt-10 md:flex-row md:items-end md:justify-between md:px-10 md:pb-0 md:pt-20">
        <div className="max-w-lg">
          <p className="section-label">About</p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-zinc-50 md:text-5xl">
            How we run digital marketing
          </h2>
        </div>
        <p className="mt-6 max-w-sm text-sm text-zinc-500 md:mt-0 md:text-right">
          Horizontal drift on desktop—stacked on mobile. Scroll to see our approach to planning,
          creative, and performance.
        </p>
      </div>

      <div className="md:pl-10 md:pr-0">
        <div
          ref={trackRef}
          className="mt-12 flex flex-col gap-10 px-6 pb-24 md:mt-16 md:flex-row md:flex-nowrap md:gap-0 md:px-0 md:pb-32"
        >
          {PANELS.map((panel) => (
            <article
              key={panel.title}
              data-about-panel
              className="flex w-full shrink-0 flex-col justify-between border border-white/[0.07] bg-[#111] p-8 md:ml-6 md:mt-0 md:w-[min(420px,72vw)] md:p-10 md:first:ml-10"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-300/90">
                  {panel.kicker}
                </p>
                <h3 className="mt-6 text-2xl font-medium tracking-tight text-zinc-50 md:text-3xl">
                  {panel.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{panel.body}</p>
              </div>
              <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
