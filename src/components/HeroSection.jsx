import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;

    // Main content fades out and moves up on scroll
    gsap.to(".hero-content", {
      y: -100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "60% top",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    // Decorative elements parallax at different speeds
    gsap.to(".hero-deco-hama", {
      y: -180,
      rotation: 15,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    gsap.to(".hero-deco-hiu", {
      y: -120,
      rotation: -10,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    // SVG letters stagger entrance
    gsap.from(".hero-letter", {
      y: 60,
      opacity: 0,
      rotation: () => gsap.utils.random(-15, 15),
      stagger: 0.08,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 0.3,
    });

    // Subtitle word-by-word reveal
    gsap.from(".hero-word", {
      y: 20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: "power2.out",
      delay: 1.2,
    });

    // Scroll indicator
    gsap.from(".hero-scroll-indicator", {
      opacity: 0,
      duration: 0.6,
      delay: 1.8,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="hero" data-cursor-theme="dark" className="min-h-screen flex items-center justify-center relative px-8">
      <div className="hero-content max-w-6xl w-full text-center">
        {/* Decorative elements */}
        <div className="hero-deco-hama absolute top-16 sm:top-20 left-4 sm:left-8 w-16 sm:w-24 h-16 sm:h-24 opacity-60">
          <img src="./img/herosection/hama.svg" alt="decoration" className="w-full h-full" />
        </div>

        <div className="hero-deco-hiu absolute bottom-24 sm:bottom-32 right-4 sm:right-8 w-20 sm:w-28 h-20 sm:h-28 opacity-60">
          <img src="./img/herosection/hiu.svg" alt="decoration" className="w-full h-full" />
        </div>

        {/* Main heading — mobile: single SVG, desktop: per-letter SVGs */}
        <div className="mb-8">
          {/* Mobile: single portfolio.svg */}
          <div className="flex justify-center items-end mb-6 overflow-hidden sm:hidden">
            <img src="./img/herosection/portfolio.svg" alt="Portfolio" className="hero-letter h-24 w-auto" />
          </div>
          {/* Desktop: per-letter SVGs */}
          <div className="hidden sm:flex justify-center items-end gap-1 mb-6 overflow-hidden">
            <img src="./img/herosection/P.svg" alt="P" className="hero-letter h-14 sm:h-20 md:h-32" />
            <img src="./img/herosection/o-1.svg" alt="o" className="hero-letter h-14 sm:h-20 md:h-32" />
            <img src="./img/herosection/r.svg" alt="r" className="hero-letter h-14 sm:h-20 md:h-32" />
            <img src="./img/herosection/t.svg" alt="t" className="hero-letter h-14 sm:h-20 md:h-32" />
            <img src="./img/herosection/f.svg" alt="f" className="hero-letter h-14 sm:h-20 md:h-32" />
            <img src="./img/herosection/o-1.svg" alt="o" className="hero-letter h-14 sm:h-20 md:h-32" />
            <img src="./img/herosection/l.svg" alt="l" className="hero-letter h-14 sm:h-20 md:h-32" />
            <img src="./img/herosection/i.svg" alt="i" className="hero-letter h-14 sm:h-20 md:h-32" />
            <img src="./img/herosection/o-1.svg" alt="o" className="hero-letter h-14 sm:h-20 md:h-32" />
          </div>
          {/* Underline — only on desktop (portfolio.svg already has its own) */}
          <div className="hidden sm:flex justify-center mb-8">
            <img src="./img/herosection/garisbawah.svg" alt="underline" className="h-2" />
          </div>
        </div>

        {/* Subtitle — word by word */}
        <p className="hero-subtitle text-white/60 text-sm sm:text-lg font-light tracking-wide max-w-2xl mx-auto">
          {"AI Engineer & Front-End Developer".split(" ").map((word, i) => (
            <span key={i} className="hero-word inline-block mr-1.5">{word}</span>
          ))}
        </p>
      </div>

      {/* Scroll indicator — outside hero-content so it sits at section bottom */}
      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </svg>
      </div>
    </section>
  );
}
