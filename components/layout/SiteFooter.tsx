"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

export function SiteFooter() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    registerGsap();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const el = root.querySelector("[data-footer-headline]");
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={rootRef}
      className="border-t border-white/[0.06] bg-[#0a0a0a] px-5 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32"
>
      <div className="mx-auto max-w-[1600px]">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#737373]">Contact</p>

        <h2
          data-footer-headline
          className="mt-6 max-w-[1200px] text-[clamp(2.5rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-[#f5f5f5]"
        >
          Let&apos;s build a sharper funnel.
        </h2>

        <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
          <a
            href="mailto:admin@ghvsinfotech.in"
            className="group text-xl text-[#a3a3a3] underline-offset-8 transition-colors hover:text-[#f5f5f5] md:text-2xl"
          >
            admin@ghvsinfotech.in
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <div className="flex flex-wrap gap-8 text-[11px] uppercase tracking-[0.25em] text-[#737373]">
            <Link href="/" className="hover:text-[#e8e8e8]">
              Back to top
            </Link>
            <span className="text-[#404040]">·</span>
            <Link href="/privacy" className="hover:text-[#e8e8e8]">
              Privacy
            </Link>
          </div>
        </div>

        <p className="mt-16 text-[11px] uppercase tracking-[0.25em] text-[#525252]">
          © {new Date().getFullYear()} GHVC Infotech Pvt. Ltd.
        </p>
      </div>
    </footer>
  );
}
