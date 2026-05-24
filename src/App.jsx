import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import SketchBg from './components/SketchBg';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import ToolsSection from './components/ToolsSection';
import ExperienceSection from './components/ExperienceSection';
import CertificationSection from './components/CertificationSection';
import ProjectsSection from './components/ProjectsSection';
import ArticleSection from './components/ArticleSection';
import ContactFooter from './components/ContactFooter';
import CustomCursor from './components/CustomCursor';
import LoadingPage from './components/LoadingPage';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navSections = ["about", "education", "tools", "experience", "certification", "projects", "articles", "contact"];

export default function App() {
  const [activeNav, setActiveNav] = useState("About");
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Section reveal animations (skip education — white curve transition looks broken with fade)
    gsap.utils.toArray("section").forEach((section) => {
      if (section.id === "education") return;
      gsap.from(section, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });

    navSections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveNav(id.charAt(0).toUpperCase() + id.slice(1)),
        onEnterBack: () => setActiveNav(id.charAt(0).toUpperCase() + id.slice(1)),
      });
    });
  }, { scope: containerRef });

  const scrollTo = (name) => {
    const el = document.getElementById(name.toLowerCase());
    if (el) {
      gsap.to(window, { duration: 1, scrollTo: { y: el, offsetY: 80 }, ease: "power2.inOut" });
    }
  };

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Courier New', Courier, monospace" }}>

      {loading && <LoadingPage onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <SketchBg />
      <Navbar active={activeNav} onNav={scrollTo} />

      <HeroSection />
      <AboutSection scrollTo={scrollTo} />

      {/* Divider: dark → white */}
      <div data-cursor-theme="dark" className="bg-black" style={{ lineHeight: 0, fontSize: 0 }}>
        <svg viewBox="0 0 1440 120" className="w-full block" preserveAspectRatio="none" style={{ display: "block" }}>
          <path d="M0,0 C480,100 960,100 1440,0 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      <EducationSection />

      {/* Divider: white → dark */}
      <div data-cursor-theme="light" className="bg-white" style={{ lineHeight: 0, fontSize: 0 }}>
        <svg viewBox="0 0 1440 120" className="w-full block" preserveAspectRatio="none" style={{ display: "block" }}>
          <path d="M0,0 C480,100 960,100 1440,0 L1440,120 L0,120 Z" fill="black" />
        </svg>
      </div>

      <ToolsSection />
      <ExperienceSection />
      <CertificationSection />
      <ProjectsSection />
      <ArticleSection />

      {/* Divider: dark → white */}
      <div data-cursor-theme="dark" className="bg-black footer-curve-wrap" style={{ lineHeight: 0, fontSize: 0 }}>
        <svg viewBox="0 0 1440 120" className="footer-curve w-full block" preserveAspectRatio="none" style={{ display: "block" }}>
          <path d="M0,0 C480,100 960,100 1440,0 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      <ContactFooter />
    </div>
  );
}
