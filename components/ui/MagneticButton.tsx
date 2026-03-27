"use client";

import { gsap, registerGsap } from "@/lib/gsap";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit";
  cursorLabel?: string;
  onClick?: () => void;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

const STRENGTH = 0.35;

export function MagneticButton({
  children,
  className = "",
  as = "button",
  href,
  type = "button",
  cursorLabel,
  onClick,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
  }, []);

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const rect = wrap.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(inner, {
      x: relX * STRENGTH,
      y: relY * STRENGTH,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    const inner = innerRef.current;
    if (!inner) return;
    gsap.to(inner, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.35)" });
  };

  const dataAttrs = cursorLabel ? { "data-cursor": cursorLabel } : {};

  const child = as === "a" ? (
    <a
      href={href}
      className={`inline-flex ${className}`}
      {...dataAttrs}
    >
      {children}
    </a>
  ) : (
    <button
      type={type}
      className={`inline-flex ${className}`}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      {...dataAttrs}
    >
      {children}
    </button>
  );

  return (
    <div
      ref={wrapRef}
      className="inline-flex rounded-full"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div ref={innerRef} className="will-change-transform">
        {child}
      </div>
    </div>
  );
}
