"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

const CASES = [
  {
    title: "Pulse Commerce",
    scope: "Performance · Meta & Google",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85",
    alt: "Marketing analytics and performance dashboards",
  },
  {
    title: "Northline SaaS",
    scope: "B2B · LinkedIn & SEM",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85",
    alt: "Team collaborating on B2B growth strategy",
  },
  {
    title: "Kin Daily",
    scope: "Social & creators",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85",
    alt: "Mobile social marketing and creator campaigns",
  },
] as const;

export function WorkShowcase() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    registerGsap();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rows = root.querySelectorAll<HTMLElement>("[data-case]");

    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        const media = row.querySelector<HTMLElement>("[data-case-media]");
        const img = row.querySelector<HTMLElement>("[data-case-img]");
        const text = row.querySelector<HTMLElement>("[data-case-text]");
        if (!media || !img || !text) return;

        gsap.set(media, { clipPath: "inset(0 12% 0 12%)" });

        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            end: "top 35%",
            scrub: 1,
          },
        })
          .to(media, { clipPath: "inset(0 0% 0 0%)", ease: "none" })
          .fromTo(img, { scale: 1.12 }, { scale: 1, ease: "none" }, 0);

        gsap.from(text, {
          y: 56,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 78%",
            once: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={rootRef} className="bg-[#0e0e0e] py-28 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#737373]">Selected work</p>
            <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-medium tracking-[-0.03em] text-[#f5f5f5]">
              Case studies
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#737373]">
            Large-format previews, alternating rhythm — motion reveals as you move through the page.
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-24 md:mt-28 md:gap-32">
          {CASES.map((c, i) => (
            <article
              key={c.title}
              data-case
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:[&>[data-case-text]]:order-first" : ""
              }`}
            >
              <div
                data-case-media
                className="relative aspect-[16/11] w-full overflow-hidden bg-[#1a1a1a]"
              >
                <div data-case-img className="absolute inset-0">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                </div>
              </div>
              <div data-case-text className="md:py-6">
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#737373]">
                  {c.year} · {c.scope}
                </p>
                <h3 className="mt-5 text-3xl font-medium tracking-tight text-[#e8e8e8] md:text-4xl">
                  {c.title}
                </h3>
                <p className="mt-6 max-w-lg text-[#a3a3a3]">
                  Programmatic paid social, creative sprints, and weekly performance reviews—built as
                  one continuous loop.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
