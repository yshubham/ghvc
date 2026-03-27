"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid || open ? "bg-[#0e0e0e]/92 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#e8e8e8]"
          >
            GHVC
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#a3a3a3] transition-colors hover:text-[#e8e8e8]"
            aria-expanded={open}
          >
            <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
            <span className="flex h-4 w-5 flex-col justify-between" aria-hidden>
              <span
                className={`h-px w-full origin-center bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full origin-center bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col bg-[#0a0a0a] px-6 transition-[transform,visibility] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "visible translate-y-0" : "invisible -translate-y-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex flex-1 flex-col items-center justify-center">
          <nav className="flex flex-col gap-1 text-center md:gap-2">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                className={`text-[clamp(2rem,6vw,4rem)] font-medium tracking-[-0.03em] text-[#e8e8e8] transition-[opacity,transform] duration-500 ease-out hover:text-[#a3a3a3] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p
            className={`mt-14 max-w-sm text-center text-sm text-[#737373] transition-opacity duration-500 ${
              open ? "opacity-100 delay-300" : "opacity-0"
            }`}
          >
            Digital marketing studio — New Delhi, worldwide.
          </p>
        </div>
      </div>
    </>
  );
}
