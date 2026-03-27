"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    registerGsap();
    const panel = panelRef.current;
    const linkWrap = linksRef.current;
    if (!panel || !linkWrap) return;
    const links = linkWrap.querySelectorAll("a");

    if (!hasMounted.current) {
      hasMounted.current = true;
      if (!open) return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    if (open) {
      tl.set(panel, { pointerEvents: "auto" })
        .fromTo(
          panel,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.75 },
        )
        .fromTo(
          links,
          { y: 56, opacity: 0, rotation: 1.5 },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.45",
        );
    } else {
      tl.set(panel, { pointerEvents: "none" })
        .to(links, {
          y: 28,
          opacity: 0,
          duration: 0.28,
          stagger: { each: 0.03, from: "end" },
          ease: "power2.in",
        })
        .to(
          panel,
          { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "power3.inOut" },
          "-=0.1",
        );
    }

    return () => {
      tl.kill();
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background,backdrop-filter,border-color] duration-500 ${
          scrolled || open
            ? "border-b border-white/[0.06] bg-[#0a0a0a]/72 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:h-[4.5rem] md:px-10">
          <a
            href="#top"
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-100"
            onClick={() => setOpen(false)}
          >
            GHVC
          </a>
          <MagneticButton
            as="button"
            type="button"
            className="items-center gap-3 border border-white/10 bg-white/[0.03] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-100 backdrop-blur-md transition-colors hover:border-cyan-400/40 hover:bg-white/[0.06]"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span className="flex items-center gap-2">
              <span className="flex h-[2px] w-5 flex-col justify-between">
                <span
                  className={`block h-[2px] w-full origin-center rounded-full bg-zinc-200 transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
                />
                <span
                  className={`mt-1.5 block h-[2px] w-full origin-center rounded-full bg-zinc-200 transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
                />
              </span>
              {open ? "Close" : "Menu"}
            </span>
          </MagneticButton>
        </div>
      </header>

      <div
        id="site-menu"
        ref={panelRef}
        className="pointer-events-none fixed inset-0 z-[55] flex flex-col justify-center bg-[var(--bg-deep)] px-8 md:px-16"
        style={{ clipPath: "inset(0 0 100% 0)" }}
        aria-hidden={!open}
      >
        <div
          ref={linksRef}
          className="mx-auto flex w-full max-w-3xl flex-col gap-2 md:gap-4"
        >
          {LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="View"
              className="group border-b border-white/[0.07] py-5 text-4xl font-medium tracking-tight text-zinc-100 transition-colors hover:text-cyan-300 md:py-6 md:text-6xl lg:text-7xl"
              onClick={() => setOpen(false)}
            >
              <span className="inline-flex items-baseline gap-4">
                <span className="text-sm font-normal text-zinc-500 md:text-base">
                  {item.label === "Work" ? "01" : item.label === "About" ? "02" : "03"}
                </span>
                <span className="text-gradient">{item.label}</span>
              </span>
            </a>
          ))}
        </div>
        <p className="mx-auto mt-16 max-w-3xl text-sm text-zinc-500">
          GHVC Infotech · Digital marketing, paid media, SEO, content &amp; social for brands that want
          to grow with proof.
        </p>
      </div>
    </>
  );
}
