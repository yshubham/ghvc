"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import { useLayoutEffect, useRef } from "react";

export function AboutEditorial() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    registerGsap();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const blocks = root.querySelectorAll<HTMLElement>("[data-about-block]");

    const ctx = gsap.context(() => {
      blocks.forEach((block, i) => {
        gsap.from(block, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 82%",
            once: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="border-t border-white/[0.06] bg-[#0e0e0e] py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#737373]">About</p>

        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
          <div data-about-block className="md:col-span-5">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#f5f5f5]">
              GHVC Infotech is a digital marketing studio focused on accountable growth.
            </h2>
          </div>
          <div className="grid gap-10 md:col-span-6 md:col-start-7">
            <p
              data-about-block
              className="text-lg leading-[1.65] text-[#a3a3a3] md:text-xl"
            >
              We partner with founders, marketing leads, and brand teams who need a calm operator:
              clear plans, fast creative iterations, and reporting that connects spend to outcomes.
            </p>
            <p data-about-block className="text-lg leading-[1.65] text-[#a3a3a3] md:text-xl">
              Based in New Delhi, working with clients remotely worldwide — same timezone overlap
              where it matters, async depth where it helps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
