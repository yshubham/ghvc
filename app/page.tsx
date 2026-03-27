import { Hero } from "@/components/hero/Hero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AboutEditorial } from "@/components/sections/AboutEditorial";
import { HorizontalStrip } from "@/components/sections/HorizontalStrip";
import { StoryScenes } from "@/components/sections/StoryScenes";
import { WorkShowcase } from "@/components/sections/WorkShowcase";

export default function Home() {
  return (
    <main>
      <Hero />
      <StoryScenes />
      <WorkShowcase />
      <HorizontalStrip />
      <AboutEditorial />
      <SiteFooter />
    </main>
  );
}
