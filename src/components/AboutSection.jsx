import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Section from './Section';
import SketchUnderline from './SketchUnderline';

gsap.registerPlugin(ScrollTrigger);

const SVGLetter = ({ src, width = 80, height = 100, className = "" }) => (
  <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className={`inline-block ${className}`}>
    <image href={src} width={width} height={height} />
  </svg>
);

const AboutMeText = () => (
  <div className="flex gap-2 items-end">
    <SVGLetter src="/img/aboutsection/A.svg" width={60} height={80} className="about-letter" />
    <SVGLetter src="/img/aboutsection/b.svg" width={60} height={80} className="about-letter" />
    <SVGLetter src="/img/aboutsection/o.svg" width={60} height={80} className="about-letter" />
    <SVGLetter src="/img/aboutsection/u.svg" width={60} height={80} className="about-letter" />
    <SVGLetter src="/img/aboutsection/t.svg" width={60} height={80} className="about-letter" />
    <div className="mx-2" />
    <SVGLetter src="/img/aboutsection/M.svg" width={60} height={80} className="about-letter" />
    <SVGLetter src="/img/aboutsection/e.svg" width={60} height={80} className="about-letter" />
  </div>
);


export default function AboutSection({ scrollTo }) {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Avatar slides in from left
    gsap.from(".about-avatar", {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-avatar",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Text slides in from right
    gsap.from(".about-text", {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // SVG letters stagger
    gsap.from(".about-letter", {
      y: 30,
      opacity: 0,
      rotation: () => gsap.utils.random(-10, 10),
      stagger: 0.06,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".about-letter",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Description paragraphs
    gsap.from(".about-desc", {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-desc",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // DrawSVG effect on underline and corner strokes
    const drawTargets = sectionRef.current?.querySelectorAll(".about-draw-path");
    if (drawTargets) {
      drawTargets.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: path,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }

  }, { scope: sectionRef });

  return (
    <Section id="about" data-cursor-theme="dark" className="px-8 md:px-20 pt-20">
      <div ref={sectionRef} className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-stretch">

        {/* Portrait */}
        <div className="about-avatar relative h-full min-h-[500px] flex items-end">
          <img src="/img/aboutsection/kajul.svg" alt="Portrait" className="w-full h-full object-contain object-bottom" />
        </div>

        {/* Text */}
        <div className="about-text flex flex-col justify-center">
          <div className="mb-6">
            <AboutMeText />
          </div>
          <p className="text-white/80 text-lg font-heading mb-2">Muhajir Amrullah</p>
          <SketchUnderline width={140} pathClassName="about-draw-path" />
          <p className="about-desc mt-6 text-white/60 text-sm leading-7 max-w-md font-heading">
            Front-End Developer focused on building responsive, visually engaging,
            and user-centered web experiences. Experienced in developing and deploying
            websites from design to implementation, with additional expertise in{" "}
            <span className="text-white/90">UI/UX</span> and{" "}
            <span className="text-white/90">AI prompting</span>.
          </p>
          <p className="about-desc mt-3 text-white/60 text-sm leading-7 max-w-md font-heading">
            Currently expanding into <span className="text-white/90">Cyber Security</span>,
            particularly penetration testing, with a security-first mindset.
            Information Technology student at{" "}
            <span className="text-white/90">Universitas Brawijaya</span>.
          </p>
          <div className="about-desc mt-8 flex gap-4">
            <button
              onClick={() => scrollTo("Projects")}
              className="relative px-6 py-2 text-xs font-mono tracking-widest text-white group overflow-hidden"
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 36" preserveAspectRatio="none">
                <rect className="about-draw-path" x="1" y="1" width="118" height="34" rx="2"
                  stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
              </svg>
              <span className="relative">VIEW WORK →</span>
            </button>
            <button
              onClick={() => scrollTo("Contact")}
              className="text-xs font-mono tracking-widest text-white/40 hover:text-white/80 transition-colors px-4 py-2"
            >
              CONTACT ME
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
