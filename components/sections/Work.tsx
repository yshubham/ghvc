"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

/**
 * Industry-aligned photography (Unsplash) — performance dashboards, B2B, social-mobile, SEO/search.
 * ixlib + sizing keep CDN + Next Image optimizer stable.
 */
const PROJECTS = [
  {
    title: "Pulse Commerce",
    category: "Performance marketing · Meta & Google",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85",
    alt: "Laptop showing marketing analytics charts and KPI dashboards for paid media",
  },
  {
    title: "Northline SaaS",
    category: "B2B lead gen · LinkedIn & SEM",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85",
    alt: "Business team collaborating on strategy in a modern office setting",
  },
  {
    title: "Kin Daily",
    category: "Social-first brand & influencer",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85",
    alt: "Smartphone in hand displaying social and creator apps for mobile-first campaigns",
  },
  {
    title: "Studio Apt",
    category: "SEO, content & lifecycle email",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85",
    alt: "Search and SEO concept with laptop workspace suggesting content and discovery",
  },
] as const;

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const cards = sectionEl.querySelectorAll<HTMLElement>("[data-work-card]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(cards, { clearProps: "all" });
      return;
    }

    gsap.set(cards, { y: 72, opacity: 0 });

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const scaleLayer = card.querySelector<HTMLElement>("[data-work-scale]");
        const title = card.querySelector<HTMLElement>("[data-work-title]");

        gsap.fromTo(
          card,
          { y: 72, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: index * 0.04,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=12%",
              once: true,
            },
          },
        );

        card.addEventListener(
          "mouseenter",
          () => {
            if (!scaleLayer || !title) return;
            gsap.to(scaleLayer, { scale: 1.04, duration: 0.7, ease: "power2.out" });
            gsap.to(title, { y: -4, duration: 0.45, ease: "power2.out" });
          },
          { passive: true },
        );
        card.addEventListener(
          "mouseleave",
          () => {
            if (!scaleLayer || !title) return;
            gsap.to(scaleLayer, { scale: 1, duration: 0.8, ease: "power3.out" });
            gsap.to(title, { y: 0, duration: 0.55, ease: "power3.out" });
          },
          { passive: true },
        );
      });
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative border-t border-white/[0.06] bg-[var(--bg-surface)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Selected work</p>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-zinc-50 md:text-5xl">
              Campaigns that convert attention
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-500 md:text-right">
            A snapshot of growth programs—paid media, organic, and creative working as one system,
            not siloed channels.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8 lg:gap-10">
          {PROJECTS.map((p, index) => (
            <article
              key={p.title}
              data-work-card
              data-cursor="View"
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111] p-6 transition-colors hover:border-cyan-400/25 md:p-8"
            >
              <div
                data-work-visual
                className="relative isolate mb-8 aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-inset ring-white/[0.06]"
              >
                <div
                  data-work-scale
                  className="absolute inset-0 origin-center will-change-transform"
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    priority={index < 2}
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 700px"
                    className="z-0 object-cover transition-[filter] duration-700 group-hover:brightness-110"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/25 to-transparent" />
                <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(120deg,rgba(34,211,238,0.1)_0%,transparent_50%)] opacity-90" />
                <div className="pointer-events-none absolute bottom-4 left-4 z-[3] text-[10px] uppercase tracking-[0.35em] text-zinc-200">
                  {p.year}
                </div>
              </div>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3
                    data-work-title
                    className="text-2xl font-medium tracking-tight text-zinc-100 md:text-3xl"
                  >
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500">{p.category}</p>
                </div>
                <span className="mt-1 text-xs text-cyan-300/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
