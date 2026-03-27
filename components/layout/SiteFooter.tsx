"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

export function SiteFooter() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const el = rootRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-footer-reveal]"), {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=15%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={rootRef}
      className="relative border-t border-white/[0.06] bg-[var(--bg-surface)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p data-footer-reveal className="section-label">
              Let&apos;s collaborate
            </p>
            <h2
              data-footer-reveal
              className="mt-4 text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-zinc-50"
            >
              Ready to scale leads, revenue, and brand recall?
            </h2>
            <p data-footer-reveal className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-500">
              Share your goals and audience—we&apos;ll build the media mix, creatives, and reporting
              rhythm to grow with clarity.
            </p>
          </div>
          <div data-footer-reveal>
            <MagneticButton
              as="a"
              href="mailto:admin@ghvsinfotech.in"
              cursorLabel="Write"
              className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.26em] text-zinc-950 shadow-[0_0_40px_rgba(34,211,238,0.25)] transition-[transform,box-shadow] duration-500 hover:shadow-[0_0_60px_rgba(167,139,250,0.35)]"
            >
              Start a briefing
            </MagneticButton>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-white/[0.06] pt-10 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p data-footer-reveal className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            © {new Date().getFullYear()} GHVC Infotech Pvt. Ltd.
          </p>
          <div
            data-footer-reveal
            className="flex flex-wrap gap-6 text-sm text-zinc-500"
          >
            <a
              href="#top"
              data-cursor="Top"
              className="transition-colors hover:text-cyan-300"
            >
              Back to top
            </a>
            <span className="hidden text-white/15 sm:inline">·</span>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              className="transition-colors hover:text-cyan-300"
            >
              LinkedIn
            </a>
            <span className="hidden text-white/15 sm:inline">·</span>
            <Link
              href="/privacy"
              data-cursor="Read"
              className="transition-colors hover:text-cyan-300"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
