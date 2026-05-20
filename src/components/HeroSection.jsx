import { useState, useEffect, useRef } from "react";
import { SketchBg, createFadeIn } from './shared';
import Navbar from './Navbar';
import { AboutSection, SkillsSection, ProjectsSection, ContactSection } from './sections';

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [visibleSections, setVisibleSections] = useState({});
  const containerRef = useRef(null);

  const fadeIn = createFadeIn(visibleSections);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [e.target.id]: true }));
            setActiveNav(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (name) => {
    document.getElementById(name.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Courier New', Courier, monospace" }}>

      <SketchBg />
      <Navbar active={activeNav} onNav={scrollTo} />

      <AboutSection fadeIn={fadeIn} scrollTo={scrollTo} />
      <SkillsSection fadeIn={fadeIn} />
      <ProjectsSection fadeIn={fadeIn} />
      <ContactSection fadeIn={fadeIn} />

      <footer className="border-t border-white/5 px-8 md:px-20 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-mono text-white/20 text-xs tracking-widest">© 2025</span>
          <span className="font-mono text-white/20 text-xs tracking-widest">BUILT WITH REACT + TAILWIND</span>
        </div>
      </footer>
    </div>
  );
}
