import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy · GHVC Infotech",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto min-h-[70vh] max-w-2xl px-6 py-32 md:px-10">
      <p className="section-label">Legal</p>
      <h1 className="mt-4 text-3xl font-medium tracking-tight text-zinc-50 md:text-4xl">
        Privacy notice
      </h1>
      <p className="mt-8 text-sm leading-relaxed text-zinc-400">
        This is a placeholder privacy page for the rebuilt GHVC Infotech site. Replace this copy with
        your finalized policy and data practices before production launch.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex text-sm uppercase tracking-[0.2em] text-cyan-300 hover:text-cyan-200"
      >
        ← Back home
      </Link>
    </div>
  );
}
