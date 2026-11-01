import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { Focus } from "@/components/portfolio/focus";
import { Projects } from "@/components/portfolio/projects";
import { Research } from "@/components/portfolio/research";
import { Experience } from "@/components/portfolio/experience";
import { Skills } from "@/components/portfolio/skills";
import { Contact, Footer } from "@/components/portfolio/contact";
import { PortfolioMotion } from "@/components/portfolio/motion";

export default function Home() {
  return (
    <>
      <Header home />
      <PortfolioMotion>
        <Hero />
        <Focus />
        <Projects />
        <Research />
        <Experience />
        <Skills />
        <Contact />
      </PortfolioMotion>
      <Footer />
    </>
  );
}
