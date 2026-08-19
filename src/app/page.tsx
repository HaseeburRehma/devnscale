import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import LogoSlider from "@/components/sections/LogoSlider";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoSlider />
        <About />
        <Services />
        <Projects />
        <Process />
        <WhyUs />
        <Testimonial />
        <Faqs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
