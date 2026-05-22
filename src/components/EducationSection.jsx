import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SketchUnderline from './SketchUnderline';

gsap.registerPlugin(ScrollTrigger);

const SVGLetter = ({ src, width = 80, height = 100, className = "" }) => (
  <svg viewBox={`0 0 ${width} ${height}`} className={`inline-block w-8 h-10 sm:w-10 sm:h-14 md:w-12 md:h-16 ${className}`}>
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

const EducationText = () => (
  <div className="flex gap-2 items-end">
    <SVGLetter src="./img/educationsection/E.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="./img/educationsection/d.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="./img/educationsection/u.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="./img/educationsection/c.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="./img/educationsection/a.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="./img/educationsection/t.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="./img/educationsection/i.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="./img/educationsection/o.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="./img/educationsection/n.svg" width={60} height={80} className="edu-letter" />
  </div>
);

const educationData = [
  {
    title: 'Man 1 kota serang - Religious studies',
    description: [
      'I completed my high school education at MAN 1 Kota Serang, majoring in Religious Studies, where I developed both academic knowledge and personal growth.',
      'During my studies, I actively engaged in learning activities and built discipline, adaptability, and a strong commitment to continuous self-development.',
    ],
    logo: './img/educationsection/Man1.svg',
  },
  {
    title: 'Brawijaya University - Information Technology',
    description: [
      'I am currently pursuing a Diploma degree in Information Technology at Universitas Brawijaya, where I continue to develop my knowledge in software development, system design, and modern technologies.',
      'Through academic projects and continuous learning, I actively strengthen both technical and problem-solving skills to support my growth in the technology field.',
    ],
    logo: './img/educationsection/UB.svg',
  },
];

function EducationCard({ title, description, logo }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="edu-logo flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
        <img src={logo} alt={title} className="w-full h-full object-contain" />
      </div>
      <div className="max-w-2xl">
        <h3 className="edu-card-title text-lg md:text-xl font-semibold text-slate-950 mb-3 tracking-normal leading-tight">{mixedFont(title)}</h3>
        <div className="space-y-4 text-slate-700 text-sm leading-7">
          {description.map((line, idx) => (
            <p key={idx} className="edu-card-desc">{mixedFont(line)}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EducationSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Cat image parallax — moves up slightly as you scroll past
    gsap.to(".edu-cat", {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: ".edu-cat",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // Cat subtle floating idle animation
    gsap.to(".edu-cat", {
      y: "+=8",
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // SVG letters stagger entrance
    gsap.from(".edu-letter", {
      y: 30,
      opacity: 0,
      rotation: () => gsap.utils.random(-10, 10),
      stagger: 0.05,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".edu-letter",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Arrow entrance + continuous pointing animation
    gsap.from(".edu-arrow", {
      x: -30,
      opacity: 0,
      rotation: -20,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".edu-arrow",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
    gsap.to(".edu-arrow", {
      rotation: -35,
      duration: 1.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 50%",
    });

    // Education cards — stagger with slide from alternating sides
    gsap.utils.toArray(".edu-card").forEach((card, i) => {
      gsap.from(card, {
        x: i % 2 === 0 ? -50 : 50,
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Logo scale + rotate entrance
    gsap.from(".edu-logo", {
      scale: 0,
      rotation: -180,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: ".edu-card",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Card titles slide in from right
    gsap.from(".edu-card-title", {
      x: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".edu-card",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Description paragraphs fade up staggered
    gsap.from(".edu-card-desc", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".edu-card",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="education" data-cursor-theme="light" className="relative bg-white text-slate-950">
      {/* Title */}
      <div className="max-w-6xl mx-auto w-full px-8 md:px-20 mb-10 text-right">
        <div className="mb-6 flex justify-end items-end gap-3">
          <EducationText />
          <img
            src="./img/educationsection/tandapanah.svg"
            alt="arrow"
            className="edu-arrow w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 opacity-70 rotate-[-30deg] mb-2"
          />
        </div>
        <div className="flex justify-end">
          <SketchUnderline width={170} color="#0f172a" />
        </div>
      </div>

      {/* Grid: kucing mentok kiri bawah, deskripsi di kanan */}
      <div className="w-full grid lg:grid-cols-[1fr_1fr] items-end">
        <div className="relative h-[280px] sm:h-[400px] lg:h-[600px] overflow-hidden">
          <img src="./img/educationsection/kucing.svg" alt="Education illustration" className="edu-cat absolute inset-0 w-full h-full object-cover object-bottom" />
        </div>

        <div className="space-y-10 px-8 md:px-20 py-10">
          {educationData.map((edu) => (
            <div key={edu.title} className="edu-card">
              <EducationCard {...edu} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
