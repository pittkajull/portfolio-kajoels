import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const kotakFrames = [
  "/img/experiencesection/kotak1.svg",
  "/img/experiencesection/kotak2.svg",
  "/img/experiencesection/kotak 3.svg",
];

const certifications = [
  {
    title: "Ethical Hacking",
    desc: "Fundamentals of ethical hacking, penetration testing methodologies, and security assessment techniques.",
    image: "/img/certificationsection/Sertifikat-EthicalHacking.png",
    portrait: false,
  },
  {
    title: "Kali Linux",
    desc: "Proficiency in Kali Linux distribution for security auditing, network analysis, and vulnerability assessment.",
    image: "/img/certificationsection/Sertifikat-KaliLinux.png",
    portrait: false,
  },
  {
    title: "Cisco IT Essentials",
    desc: "Core IT skills covering networking fundamentals, hardware, software, and cybersecurity basics.",
    image: "/img/certificationsection/Sertifikat-Cisco-ITCS.png",
    portrait: false,
  },
  {
    title: "Java Programming",
    desc: "Object-oriented programming concepts, Java syntax, and application development fundamentals.",
    image: "/img/certificationsection/Sertifikat-JAVA.jpeg",
    portrait: false,
  },
  {
    title: "Tahfidz Al-Quran",
    desc: "Certification of Quran memorization achievement through Islamic rohaniyah activities.",
    image: "/img/certificationsection/Sertifikat-Tasmi.png",
    portrait: false,
  },
  {
    title: "ROHIS Organization",
    desc: "Active contribution in Islamic spiritual organization at school, leading events and community programs.",
    image: "/img/certificationsection/Sertifikat-ROHIS.png",
    portrait: false,
  },
  {
    title: "English Meeting",
    desc: "Participation and facilitation of English-language meeting and discussion sessions.",
    image: "/img/certificationsection/Sertifikat-EM.png",
    portrait: true,
  },
  {
    title: "Techno CUP",
    desc: "Technology competition and innovation challenge showcasing technical and problem-solving skills.",
    image: "/img/certificationsection/Sertifikat-TechnoCUP.jpeg",
    portrait: false,
  },
];

function CertCard({ title, desc, image, frame, index, portrait }) {
  const tilt = ((index % 3) - 1) * 1.5;

  return (
    <div
      className="cert-card flex-shrink-0 cursor-default group"
      style={{ width: 300, transform: `rotate(${tilt}deg)` }}
    >
      <div className="relative" style={{ aspectRatio: portrait ? "211 / 307" : "307 / 211" }}>
        <img
          src={frame}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity duration-500"
          style={{
            transform: portrait ? "rotate(90deg)" : "none",
            transformOrigin: "center center",
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ padding: portrait ? "14% 11%" : "10% 9%" }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>

      <div className="mt-4 px-1">
        <h3 className="font-heading text-white text-base mb-1">{title}</h3>
        <p className="font-heading text-white/50 text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function CertificationSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    // Title entrance
    gsap.from(".cert-title-img", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cert-title-img",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Pin + scrub horizontal scroll
    const track = trackRef.current;
    const totalScroll = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: () => -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Cards entrance
    gsap.from(".cert-card", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="certification" data-cursor-theme="dark" className="relative bg-black text-white overflow-hidden">
      <div className="px-8 md:px-20 pt-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-8">
            <div className="mb-6">
              <img
                src="/img/certificationsection/certificates.svg"
                alt="Certification"
                className="cert-title-img h-16 md:h-20 w-auto"
              />
            </div>
            <svg viewBox="0 0 220 8" height="8" width={220} className="mt-1">
              <path
                d="M2 5 Q55 2 110 5 Q165 8 218 4"
                stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div ref={trackRef} className="flex gap-8 px-8 md:px-20 py-12 items-start select-none" style={{ width: "max-content" }}>
        {certifications.map((cert, i) => (
          <CertCard
            key={cert.title}
            {...cert}
            frame={kotakFrames[i % kotakFrames.length]}
            index={i}
            portrait={cert.portrait}
          />
        ))}
      </div>
    </section>
  );
}
