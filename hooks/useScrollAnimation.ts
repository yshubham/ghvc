"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import type { RefObject } from "react";
import { useLayoutEffect } from "react";

type Options = {
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

/**
 * Scroll-triggered fade + rise. Set scrub (e.g. 1) for scroll-linked motion.
 */
export function useScrollAnimation<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: Options = {},
) {
  const { start = "top 88%", end, scrub = false } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: scrub ? undefined : 1.05,
        ease: scrub ? "none" : "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: scrub === false ? false : scrub,
          once: scrub === false,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, start, end, scrub]);
}
