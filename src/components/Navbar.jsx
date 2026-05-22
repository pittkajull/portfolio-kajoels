import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = ["About", "Education", "Tools", "Experience", "Certification", "Projects", "Articles", "Contact"];

export default function Navbar({ active, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const navRef = useRef(null);
  const lastScroll = useRef(0);

  // Hide/show navbar on scroll direction
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      const current = window.scrollY;
      if (current < 50) {
        gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" });
      } else if (current > lastScroll.current && current > 100) {
        gsap.to(nav, { y: -100, duration: 0.3, ease: "power2.in" });
      } else {
        gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" });
      }
      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(linksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: "power2.out", delay: 0.1 }
      );
    }
  }, { dependencies: [menuOpen] });

  const handleNav = (link) => {
    onNav(link);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 md:py-5"
        style={{ background: "linear-gradient(to bottom, #000 60%, transparent)", willChange: "transform" }}
      >
        <span className="text-white font-mono text-xs md:text-sm tracking-widest opacity-70">PORTFOLIO</span>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <li key={link}>
              <button
                onClick={() => onNav(link)}
                className={`font-mono text-sm tracking-widest transition-all duration-200 relative group
                  ${active === link ? "text-white" : "text-white/40 hover:text-white/80"}`}
              >
                {link}
                {active === link && (
                  <svg className="absolute -bottom-1 left-0 w-full" height="3" viewBox="0 0 60 3">
                    <path d="M1 2 Q15 1 30 2 Q45 3 59 1" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-6 md:hidden"
        >
          {navLinks.map((link, i) => (
            <button
              key={link}
              ref={el => linksRef.current[i] = el}
              onClick={() => handleNav(link)}
              className={`font-mono text-lg tracking-widest transition-colors duration-200
                ${active === link ? "text-white" : "text-white/40"}`}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
