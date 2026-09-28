import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Education } from "@/components/home/Education";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { Impact } from "@/components/home/Impact";
import { OtherProjects } from "@/components/home/OtherProjects";
import { StackBar } from "@/components/home/StackBar";
import { Technologies } from "@/components/home/Technologies";

export default function Home() {
  return (
    <>
      <Hero />
      <StackBar />
      <FeaturedProjects />
      <Impact />
      <OtherProjects />
      <Technologies />
      <About />
      <Education />
      <Contact />
    </>
  );
}
