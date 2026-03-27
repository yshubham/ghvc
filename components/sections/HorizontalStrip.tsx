"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import { useLayoutEffect, useRef } from "react";

const STRIP = [
  { label: "Paid social", detail: "Meta · TikTok · LinkedIn" },
  { label: "Search & intent", detail: "Google · Bing · App stores" },
  { label: "SEO & editorial", detail: "Content systems" },
  { label: "Lifecycle", detail: "Email · SMS · pushes" },
  { label: "Analytics", detail: "Attribution · LTV" },
] as const;

export function HorizontalStrip() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    registerGsap();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const getWidth = () => Math.max(track.scrollWidth - window.innerWidth + 120, 0);

      return gsap.to(track, {
        x: () => -getWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${getWidth()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      className="relative bg-[#111111] py-0 md:min-h-screen md:py-0"
    >
      <div className="flex min-h-screen flex-col justify-center px-5 py-20 md:px-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#737373]">Capabilities</p>
        <h2 className="mt-4 max-w-xl text-2xl font-medium tracking-tight text-[#f5f5f5] md:text-3xl">
          Horizontal scroll — one continuous lane of services.
        </h2>

        <div
          ref={trackRef}
          className="mt-14 flex flex-col gap-6 md:mt-20 md:flex-row md:flex-nowrap md:gap-0 md:pl-4"
        >
          {STRIP.map((item, index) => (
            <div
              key={item.label}
              className={`shrink-0 border-t border-white/[0.08] pt-8 md:ml-6 md:w-[min(420px,70vw)] md:border-t-0 md:border-l md:border-white/[0.08] md:pl-10 md:pt-0 md:first:ml-0 ${
                index === 0 ? "md:pl-6" : ""
              }`}
            >
              <h3 className="text-2xl font-medium text-[#e8e8e8] md:text-3xl">{item.label}</h3>
              <p className="mt-3 text-sm text-[#737373]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
