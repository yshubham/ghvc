"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import type { RefObject } from "react";
import { useLayoutEffect } from "react";

/**
 * Vertical parallax tied to a trigger element's scroll span.
 * `strength` pushes the layer by `strength * 100` px across the trigger range.
 */
export function useParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  triggerRef: RefObject<HTMLElement | null>,
  strength = 0.2,
) {
  useLayoutEffect(() => {
    const el = ref.current;
    const trigger = triggerRef.current;
    if (!el || !trigger) return;

    registerGsap();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { y: 0 });
      return;
    }

    if (window.matchMedia("(max-width: 767px)").matches) {
      gsap.set(el, { y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      el,
      { y: -strength * 80 },
      {
        y: strength * 80,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, triggerRef, strength]);
}
