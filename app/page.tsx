import { SiteFooter } from "@/components/layout/SiteFooter";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Work />
      <About />
      <SiteFooter />
    </main>
  );
}
