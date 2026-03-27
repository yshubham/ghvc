"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import { useLayoutEffect, useRef } from "react";

const SCENES = [
  {
    kicker: "01 — Attention",
    title: "The first second is the whole pitch.",
    body: "We architect hooks, landing paths, and creative rotations so every impression can earn its next click.",
  },
  {
    kicker: "02 — Systems",
    title: "Media without measurement is decoration.",
    body: "Dashboards, experiments, and weekly rituals keep spend honest—so scaling feels brave, not blind.",
  },
  {
    kicker: "03 — Long arc",
    title: "Brand is the compound interest of good follow‑through.",
    body: "From lifecycle email to retargeting narratives, we align short-term targets with the story you want to own.",
  },
] as const;

export function StoryScenes() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    registerGsap();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const blocks = root.querySelectorAll<HTMLElement>("[data-scene]");

    const ctx = gsap.context(() => {
      blocks.forEach((block) => {
        const kicker = block.querySelector("[data-scene-kicker]");
        const title = block.querySelector("[data-scene-title]");
        const body = block.querySelector("[data-scene-body]");

        gsap.from([kicker, title, body], {
          opacity: 0,
          y: 72,
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 75%",
            once: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={rootRef}
      className="border-t border-white/[0.06] bg-[#111111] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#737373]">Approach</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-tight text-[#f5f5f5] md:text-4xl">
          Scenes from how we work with teams
        </h2>

        <div className="mt-20 flex flex-col gap-24 md:mt-28 md:gap-32">
          {SCENES.map((scene) => (
            <article
              key={scene.kicker}
              data-scene
              className="grid gap-8 border-t border-white/[0.06] pt-16 md:grid-cols-12 md:gap-10 md:pt-20"
            >
              <p
                data-scene-kicker
                className="text-[11px] uppercase tracking-[0.35em] text-[#737373] md:col-span-4"
              >
                {scene.kicker}
              </p>
              <div className="md:col-span-8">
                <h3
                  data-scene-title
                  className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[#e8e8e8]"
                >
                  {scene.title}
                </h3>
                <p
                  data-scene-body
                  className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a3a3a3]"
                >
                  {scene.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
