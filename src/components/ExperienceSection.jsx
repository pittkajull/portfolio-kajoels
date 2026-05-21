import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SketchUnderline from './SketchUnderline';

gsap.registerPlugin(ScrollTrigger);

const SVGLetter = ({ src, width = 80, height = 100, className = "" }) => (
  <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className={`inline-block ${className}`}>
    <image href={src} width={width} height={height} />
  </svg>
);

// Auto split: angka → font-sans, huruf → font-heading
function mixedFont(text) {
  return text.split(/(\d+)/).map((part, i) =>
    /^\d+$/.test(part)
      ? <span key={i} className="font-sans">{part}</span>
      : <span key={i} className="font-heading">{part}</span>
  );
}

const ExperienceText = () => (
  <div className="flex gap-2 items-end">
    <SVGLetter src="/img/experiencesection/E.svg" width={60} height={80} className="exp-letter" />
    <SVGLetter src="/img/experiencesection/x.svg" width={60} height={80} className="exp-letter" />
    <SVGLetter src="/img/experiencesection/p.svg" width={60} height={80} className="exp-letter" />
    <SVGLetter src="/img/experiencesection/e-1.svg" width={60} height={80} className="exp-letter" />
    <SVGLetter src="/img/experiencesection/r.svg" width={60} height={80} className="exp-letter" />
    <SVGLetter src="/img/experiencesection/i.svg" width={60} height={80} className="exp-letter" />
    <SVGLetter src="/img/experiencesection/e-2.svg" width={60} height={80} className="exp-letter" />
    <SVGLetter src="/img/experiencesection/n.svg" width={60} height={80} className="exp-letter" />
    <SVGLetter src="/img/experiencesection/c.svg" width={60} height={80} className="exp-letter" />
    <SVGLetter src="/img/experiencesection/e-1.svg" width={60} height={80} className="exp-letter" />
  </div>
);

const kotakFrames = [
  "/img/experiencesection/kotak1.svg",
  "/img/experiencesection/kotak2.svg",
  "/img/experiencesection/kotak 3.svg",
];

const experienceData = [
  {
    title: 'Information Technology - Student Association',
    period: '2021 - 2023',
    description: 'Experienced in leadership, event management, and creative media through multiple large-scale university programs. Led teams, coordinated operations, managed events, and handled visual branding and execution. Recognized as Staff of The Month for active contribution and consistency. Developed strong skills in leadership, teamwork, communication, problem-solving, and project coordination.',
    logo: '/img/experiencesection/hmpsti.png',
    logoSize: 'w-64 h-64',
    photos: Array.from({ length: 15 }, (_, i) => `/img/experiencesection/hmpsti${i + 1}.jpeg`),
  },
  {
    title: 'Brawijaya University - Executive Student',
    period: '2023 - Present',
    description: 'Experienced in human resources, leadership, and event management through university organizations. Contributed to internal development, coordinated cross-functional teams, led program execution, and supported creative and operational activities. Strengthened skills in communication, teamwork, adaptability, and project management.',
    logo: '/img/experiencesection/ub.png',
    logoSize: 'w-48 h-48',
    photos: Array.from({ length: 10 }, (_, i) => `/img/experiencesection/em${i + 1}.jpeg`),
  },
  {
    title: 'Provoks - Multimedia',
    period: '2024 - Present',
    description: 'Contributed as a Multimedia Staff by creating and managing visual and digital content for organizational activities and events. Responsible for design, documentation, visual branding, and content publishing across media platforms. Strengthened skills in creativity, visual communication, teamwork, time management, and digital media production in a dynamic environment.',
    logo: '/img/experiencesection/provoks.png',
    logoSize: 'w-48 h-48',
    photos: ['/img/experiencesection/provoks1.jpeg'],
  },
];

function PhotoCarousel({ photos }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const visibleCount = 3;

  const handlePrev = () => {
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  // Get 3 visible photos wrapping around
  const visible = [];
  for (let i = 0; i < visibleCount; i++) {
    visible.push(photos[(photoIndex + i) % photos.length]);
  }

  return (
    <div className="exp-photos flex items-center gap-4">
      <button
        onClick={handlePrev}
        className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center transition hover:bg-white/15 flex-shrink-0"
      >
        <img src="/img/experiencesection/kiri.svg" alt="Previous" className="w-5 h-5" />
      </button>

      <div className="grid grid-cols-3 gap-4 flex-1">
        {visible.map((photo, idx) => {
          const frame = kotakFrames[(photoIndex + idx) % kotakFrames.length];
          return (
            <div key={idx} className="relative" style={{ aspectRatio: "307 / 211" }}>
              <img
                src={frame}
                alt=""
                className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center" style={{ padding: "12% 10%" }}>
                <img src={photo} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center transition hover:bg-white/15 flex-shrink-0"
      >
        <img src="/img/experiencesection/kanan.svg" alt="Next" className="w-5 h-5" />
      </button>
    </div>
  );
}

function ExperienceItem({ title, period, description, logo, logoSize = 'w-48 h-48', photos }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="exp-title font-mono text-[1.15rem] md:text-[1.35rem] font-semibold text-white leading-snug">
        {title}
      </h3>
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">
        <div className="flex-1 min-w-0">
          <p className="exp-period text-white/50 text-xs uppercase tracking-[0.3em]">{mixedFont(period)}</p>
          <p className="exp-desc mt-5 text-white/70 text-sm md:text-base leading-7">{description}</p>
        </div>
        {logo && (
          <div className={`exp-logo flex-shrink-0 ${logoSize} flex items-center justify-center`}>
            <img src={logo} alt={title} className="max-w-full max-h-full object-contain" />
          </div>
        )}
      </div>

      <PhotoCarousel photos={photos} />
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".exp-letter", {
      y: 30,
      opacity: 0,
      rotation: () => gsap.utils.random(-10, 10),
      stagger: 0.05,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".exp-letter",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    document.querySelectorAll(".exp-item").forEach((item) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "top 30%",
          scrub: 0.5,
        },
      });

      tl.from(item.querySelector(".exp-title"), {
        x: -40,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      }, 0)
      .from(item.querySelector(".exp-period"), {
        x: -20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      }, 0.1)
      .from(item.querySelector(".exp-desc"), {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      }, 0.15)
      .from(item.querySelector(".exp-logo"), {
        scale: 0.8,
        opacity: 0,
        rotation: 5,
        duration: 0.5,
        ease: "power2.out",
      }, 0.1)
      .from(item.querySelector(".exp-photos"), {
        y: 30,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      }, 0.25);
    });
  }, { scope: sectionRef });

  return (
    <section id="experience" data-cursor-theme="dark" className="relative bg-black text-white px-8 md:px-20 pt-20 pb-8">
      <div ref={sectionRef} className="max-w-6xl mx-auto w-full">
        <div className="mb-8">
          <div className="mb-6">
            <ExperienceText />
          </div>
          <SketchUnderline width={200} />
        </div>

        {/* Timeline: garis + items */}
        <div className="relative flex">
          {/* Garis timeline on the left */}
          <div className="relative flex-shrink-0 w-16">
            <img
              src="/img/experiencesection/garis.svg"
              alt=""
              className="absolute left-0 top-0 h-full w-auto pointer-events-none opacity-40"
            />
          </div>

          {/* Experience items */}
          <div className="flex-1 space-y-20">
            {experienceData.map((exp) => (
              <div key={exp.title} className="exp-item">
                <ExperienceItem {...exp} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
