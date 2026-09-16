import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <About />
      <Skills />
      <Journey />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </PageShell>
  );
}
