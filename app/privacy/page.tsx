import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy · GHVC Infotech",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto min-h-[70vh] max-w-2xl px-5 py-32 md:px-10">
      <p className="text-[11px] uppercase tracking-[0.4em] text-[#737373]">Legal</p>
      <h1 className="mt-4 text-3xl font-medium tracking-tight text-[#f5f5f5] md:text-4xl">
        Privacy notice
      </h1>
      <p className="mt-8 text-sm leading-relaxed text-[#a3a3a3]">
        Placeholder privacy page for the locomotive-style build. Replace with your final policy
        before launch.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex text-[11px] uppercase tracking-[0.28em] text-[#e8e8e8] hover:text-white"
      >
        ← Back home
      </Link>
    </div>
  );
}
