import { useRef } from "react";
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

const EducationText = () => (
  <div className="flex gap-2 items-end">
    <SVGLetter src="/img/educationsection/E.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="/img/educationsection/d.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="/img/educationsection/u.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="/img/educationsection/c.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="/img/educationsection/a.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="/img/educationsection/t.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="/img/educationsection/i.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="/img/educationsection/o.svg" width={60} height={80} className="edu-letter" />
    <SVGLetter src="/img/educationsection/n.svg" width={60} height={80} className="edu-letter" />
  </div>
);

const educationData = [
  {
    title: 'Man 1 kota serang - Religious studies',
    description: [
      'I completed my high school education at MAN 1 Kota Serang, majoring in Religious Studies, where I developed both academic knowledge and personal growth.',
      'During my studies, I actively engaged in learning activities and built discipline, adaptability, and a strong commitment to continuous self-development.',
    ],
    logo: '/img/educationsection/Man1.svg',
  },
  {
    title: 'Brawijaya University - Information Technology',
    description: [
      'I am currently pursuing a Diploma degree in Information Technology at Universitas Brawijaya, where I continue to develop my knowledge in software development, system design, and modern technologies.',
      'Through academic projects and continuous learning, I actively strengthen both technical and problem-solving skills to support my growth in the technology field.',
    ],
    logo: '/img/educationsection/UB.svg',
  },
];

function EducationCard({ title, description, logo }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
        <img src={logo} alt={title} className="w-full h-full object-contain" />
      </div>
      <div className="max-w-2xl">
        <h3 className="text-lg md:text-xl font-semibold text-slate-950 mb-3 tracking-normal leading-tight">{mixedFont(title)}</h3>
        <div className="space-y-4 text-slate-700 text-sm leading-7">
          {description.map((line, idx) => (
            <p key={idx}>{mixedFont(line)}</p>
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

    // Arrow entrance
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

    // Education cards stagger
    gsap.from(".edu-card", {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".edu-card",
        start: "top 85%",
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
            src="/img/educationsection/tandapanah.svg"
            alt="arrow"
            className="edu-arrow w-16 h-16 opacity-70 rotate-[-30deg] mb-2"
          />
        </div>
        <div className="flex justify-end">
          <SketchUnderline width={170} color="#0f172a" />
        </div>
      </div>

      {/* Grid: kucing mentok kiri bawah, deskripsi di kanan */}
      <div className="w-full grid lg:grid-cols-[1fr_1fr] items-end">
        <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
          <img src="/img/educationsection/kucing.svg" alt="Education illustration" className="edu-cat absolute inset-0 w-full h-full object-cover object-bottom" />
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
