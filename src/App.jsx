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
      <div data-cursor-theme="dark" className="bg-black">
        <svg viewBox="0 0 1440 120" className="w-full block" preserveAspectRatio="none">
          <path d="M0,0 C480,100 960,100 1440,0 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      <EducationSection />

      {/* Divider: white → dark */}
      <div data-cursor-theme="light" className="bg-white">
        <svg viewBox="0 0 1440 120" className="w-full block" preserveAspectRatio="none">
          <path d="M0,0 C480,100 960,100 1440,0 L1440,120 L0,120 Z" fill="black" />
        </svg>
      </div>

      <ToolsSection />
      <ExperienceSection />
      <CertificationSection />
      <ProjectsSection />
      <ArticleSection />

      {/* Divider: dark → white */}
      <div data-cursor-theme="dark" className="bg-black">
        <svg viewBox="0 0 1440 120" className="w-full block" preserveAspectRatio="none">
          <path d="M0,0 C480,100 960,100 1440,0 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      <ContactFooter />
    </div>
  );
}
