import { BiModels } from "@/components/bi/BiModels";
import { Contact } from "@/components/home/Contact";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { Impact } from "@/components/home/Impact";
import { StackBar } from "@/components/home/StackBar";

export default function Home() {
  return (
    <>
      <Hero />
      <StackBar />
      <FeaturedProjects showAllLink />
      <BiModels />
      <Impact />
      <Contact />
    </>
  );
}
