import AppShell from "@/components/AppShell";
import Navbar from "@/components/navbar";
import SideNav from "@/components/sideNav";
import Hero from "@/pages/Hero";
import About from "@/pages/About";
import Skills from "@/pages/Skills";
import Experience from "@/pages/Experience";
import Projects from "@/pages/Projects";
import Scroll from "@/components/Scroll";
import Footer from "@/components/ui/Footer/Footer";

export default function Home() {
  return (
    <AppShell>
      <Navbar />
      <SideNav />
      <main className="relative z-10 w-full bg-background rounded-b-3xl shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Scroll />
        <Skills />
      </main>
      <Footer />
    </AppShell>
  );
}
