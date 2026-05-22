import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Section from './Section';
import SketchUnderline from './SketchUnderline';

gsap.registerPlugin(ScrollTrigger);

const SVGLetter = ({ src, width = 80, height = 100, className = "" }) => (
  <svg viewBox={`0 0 ${width} ${height}`} className={`inline-block w-8 h-10 sm:w-10 sm:h-14 md:w-12 md:h-16 ${className}`}>
    <image href={src} width={width} height={height} />
  </svg>
);

const ToolsText = () => (
  <div className="flex gap-2 items-end">
    <SVGLetter src="./img/toolssection/T.svg" width={60} height={80} className="tools-letter" />
    <SVGLetter src="./img/toolssection/o.svg" width={60} height={80} className="tools-letter" />
    <SVGLetter src="./img/toolssection/o-1.svg" width={60} height={80} className="tools-letter" />
    <SVGLetter src="./img/toolssection/l.svg" width={60} height={80} className="tools-letter" />
    <SVGLetter src="./img/toolssection/s.svg" width={60} height={80} className="tools-letter" />
    <div className="mx-2" />
    <SVGLetter src="./img/toolssection/&.svg" width={60} height={80} className="tools-letter" />
    <div className="mx-2" />
    <SVGLetter src="./img/toolssection/s-1.svg" width={60} height={80} className="tools-letter" />
    <SVGLetter src="./img/toolssection/o-2.svg" width={60} height={80} className="tools-letter" />
    <SVGLetter src="./img/toolssection/f.svg" width={60} height={80} className="tools-letter" />
    <SVGLetter src="./img/toolssection/T.svg" width={60} height={80} className="tools-letter" />
    <SVGLetter src="./img/toolssection/w.svg" width={60} height={80} className="tools-letter" />
    <SVGLetter src="./img/toolssection/a.svg" width={60} height={80} className="tools-letter" />
    <SVGLetter src="./img/toolssection/r.svg" width={60} height={80} className="tools-letter" />
    <SVGLetter src="./img/toolssection/e.svg" width={60} height={80} className="tools-letter" />
  </div>
);

const toolsData = [
  { name: "React", icon: "./img/toolssection/React.svg", category: "Frontend" },
  { name: "Figma", icon: "./img/toolssection/figma.svg", category: "Design" },
  { name: "VSCode", icon: "./img/toolssection/vscode.svg", category: "Editor" },
  { name: "Tailwind CSS", icon: "./img/toolssection/tailwind.svg", category: "Styling" },
  { name: "HTML", icon: "./img/toolssection/html.svg", category: "Markup" },
  { name: "MySQL", icon: "./img/toolssection/mysql.svg", category: "Database" },
  { name: "Postman", icon: "./img/toolssection/postman.svg", category: "Testing" },
  { name: "Claude", icon: "./img/toolssection/claude.svg", category: "AI" },
  { name: "Oracle Virtual Box", icon: "./img/toolssection/vb.svg", category: "Build" },
  { name: "CSS", icon: "./img/toolssection/css.svg", category: "Build" },
];

function ToolCard({ name, icon, category }) {
  return (
    <div className="tool-card flex flex-col items-center gap-4 p-6">
      <div className="w-16 h-16 flex items-center justify-center">
        <img src={icon} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="text-center">
        <p className="font-mono text-white text-sm">{name}</p>
        <p className="font-mono text-white/40 text-xs">{category}</p>
      </div>
    </div>
  );
}

export default function ToolsSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    // SVG letters stagger
    gsap.from(".tools-letter", {
      y: 30,
      opacity: 0,
      rotation: () => gsap.utils.random(-10, 10),
      stagger: 0.04,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".tools-letter",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Tool cards batch stagger — items that enter viewport together animate together
    ScrollTrigger.batch(".tool-card", {
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 50,
          opacity: 0,
          scale: 0.9,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true,
        });
      },
      onLeaveBack: (elements) => {
        gsap.to(elements, {
          y: 30,
          opacity: 0,
          scale: 0.95,
          stagger: 0.05,
          duration: 0.3,
          overwrite: true,
        });
      },
      start: "top 85%",
      end: "bottom 15%",
    });

    // Proximity scale grid — cards scale up based on cursor distance
    const grid = gridRef.current;
    if (!grid) return;

    const cards = gsap.utils.toArray(".tool-card");
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouch) {
      // Touch: tap to scale
      const handleTap = (e) => {
        const card = e.target.closest(".tool-card");
        if (!card) return;
        gsap.to(card, { scale: 1.3, duration: 0.2, ease: "power2.out" });
        gsap.to(card, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)", delay: 0.15 });
      };
      grid.addEventListener("touchstart", handleTap, { passive: true });
      return () => grid.removeEventListener("touchstart", handleTap);
    }

    // Desktop: proximity scale
    const maxDistance = 250;
    const maxScale = 1.6;

    const handleMouseMove = (e) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        const scale = gsap.utils.clamp(1, maxScale, gsap.utils.mapRange(0, maxDistance, maxScale, 1, distance));

        gsap.to(card, {
          scale: scale,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        gsap.to(card, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    grid.addEventListener("mousemove", handleMouseMove);
    grid.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      grid.removeEventListener("mousemove", handleMouseMove);
      grid.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: sectionRef });

  return (
    <Section id="tools" data-cursor-theme="dark" className="px-8 md:px-20">
      <div ref={sectionRef} className="max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <ToolsText />
        </div>
        <SketchUnderline width={240} />

        <div ref={gridRef} className="mt-12 grid grid-cols-3 md:grid-cols-5 gap-8">
          {toolsData.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </div>
      </div>
    </Section>
  );
}
