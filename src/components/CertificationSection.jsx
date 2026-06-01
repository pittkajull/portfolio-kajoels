import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SketchUnderline from "./SketchUnderline";

gsap.registerPlugin(ScrollTrigger, Flip);

const kotakFrames = [
  "./img/experiencesection/kotak1.svg",
  "./img/experiencesection/kotak2.svg",
  "./img/experiencesection/kotak 3.svg",
];

const categories = [
  { key: "all", label: "All" },
  { key: "programming", label: "Programming" },
  { key: "organisasi", label: "Organisasi" },
  { key: "other", label: "Other" },
];

const certifications = [
  {
    title: "Ethical Hacking",
    desc: "Fundamentals of ethical hacking, penetration testing methodologies, and security assessment techniques.",
    image: "./img/certificationsection/Sertifikat-EthicalHacking.png",
    category: "programming",
  },
  {
    title: "Kali Linux",
    desc: "Proficiency in Kali Linux distribution for security auditing, network analysis, and vulnerability assessment.",
    image: "./img/certificationsection/Sertifikat-KaliLinux.png",
    category: "programming",
  },
  {
    title: "Cisco Introduction to Cybersecurity",
    desc: "Completed the Introduction to Cybersecurity program by Cisco Networking Academy, covering cybersecurity fundamentals, online threats, and digital security practices.",
    image: "./img/certificationsection/Sertifikat-Cisco-ITCS.png",
    category: "programming",
  },
  {
    title: "Java Programming",
    desc: "Object-oriented programming concepts, Java syntax, and application development fundamentals.",
    image: "./img/certificationsection/Sertifikat-JAVA.jpeg",
    category: "programming",
  },
  {
    title: "Ignite Academy Bootcamp",
    desc: "Participated in the Mini Bootcamp Cyber Security program, focusing on secure coding practices and the integration of web development with cybersecurity principles.",
    image: "./img/certificationsection/Sertifikat-IgniteAcademy.jpeg",
    category: "programming",
  },
  {
    title: "Practical AI for Productivity - Dicoding",
    desc: "Successfully completed the AI Praktis untuk Produktivitas course by Dicoding Indonesia, covering fundamental concepts of AI, Machine Learning, Prompt Engineering, and ethical use of AI.",
    image: "./img/certificationsection/Sertifikat-AIuntukproduktivitas-Dicoding.jpeg",
    category: "programming",
  },
  {
    title: "Learning Generative AI - Dicoding",
    desc: "Completed the Belajar Menggunakan Generative AI course by Dicoding Indonesia, gaining practical skills in generative AI technologies, prompt engineering, and responsible AI use.",
    image: "./img/certificationsection/Sertifikat-BelajarGENAI.jpeg",
    category: "programming",
  },
  {
    title: "Student Executive",
    desc: "Internship Staff at the Internal Human Resource Management Bureau of the Student Executive Board, Universitas Brawijaya.",
    image: "./img/certificationsection/Sertifikat-EM.png",
    category: "organisasi",
  },
  {
    title: "Techno CUP",
    desc: "Technology competition and innovation challenge showcasing technical and problem-solving skills.",
    image: "./img/certificationsection/Sertifikat-TechnoCUP.jpeg",
    category: "organisasi",
  },  
  {
    title: "ROHIS Organization",
    desc: "Active contribution in Islamic spiritual organization at school, leading events and community programs.",
    image: "./img/certificationsection/Sertifikat-ROHIS.png",
    category: "organisasi",
  },
  {
    title: "Tahfidz Al-Quran",
    desc: "Certification of Quran memorization achievement through Islamic rohaniyah activities.",
    image: "./img/certificationsection/Sertifikat-Tasmi.png",
    category: "other",
  },
];

function mixedFont(text) {
  return text.split(/(\d+%?)/).map((part, i) =>
    /^\d+%?$/.test(part)
      ? <span key={i} className="font-sans">{part}</span>
      : <span key={i} className="font-heading">{part}</span>
  );
}

function CertCard({ title, desc, image, category, index, onClick }) {
  const frame = kotakFrames[index % kotakFrames.length];

  return (
    <div
      data-category={category}
      className="cert-card group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="relative" style={{ aspectRatio: "307 / 211" }}>
        <img
          src={frame}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-500"
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ padding: "10% 9%" }}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-sm opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-white text-sm md:text-base">{mixedFont(title)}</h3>
        <p className="text-white/40 text-xs leading-relaxed mt-1">{mixedFont(desc)}</p>
      </div>
    </div>
  );
}

function CertModal({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={cert.image}
          alt={cert.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-6 text-center max-w-lg">
          <h3 className="font-heading text-white text-xl md:text-2xl mb-2">{cert.title}</h3>
          <p className="font-heading text-white/60 text-sm md:text-base leading-relaxed">{cert.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function CertificationSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const filterBarRef = useRef(null);
  const modalRef = useRef(null);
  const activeFilterRef = useRef("all");

  // Handle modal via DOM
  const openModal = (cert) => {
    modalRef.current = cert;
    renderModal(cert);
  };

  const closeModal = () => {
    modalRef.current = null;
    const existing = document.getElementById("cert-modal-overlay");
    if (existing) existing.remove();
    document.body.style.overflow = "";
  };

  const renderModal = (cert) => {
    const existing = document.getElementById("cert-modal-overlay");
    if (existing) existing.remove();
    if (!cert) return;

    document.body.style.overflow = "hidden";

    const overlay = document.createElement("div");
    overlay.id = "cert-modal-overlay";
    overlay.className = "fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm";
    overlay.onclick = closeModal;
    overlay.innerHTML = `
      <button id="cert-modal-close" class="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div class="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center" onclick="event.stopPropagation()">
        <img src="${cert.image}" alt="${cert.title}" class="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl" />
        <div class="mt-6 text-center max-w-lg">
          <h3 class="font-heading text-white text-xl md:text-2xl mb-2">${cert.title}</h3>
          <p class="font-heading text-white/60 text-sm md:text-base leading-relaxed">${cert.desc}</p>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.getElementById("cert-modal-close").onclick = closeModal;

    const onKey = (e) => {
      if (e.key === "Escape") { closeModal(); document.removeEventListener("keydown", onKey); }
    };
    document.addEventListener("keydown", onKey);
  };

  // Setup filtering via pure DOM (no React state)
  useEffect(() => {
    const grid = gridRef.current;
    const filterBar = filterBarRef.current;
    if (!grid || !filterBar) return;

    const buttons = filterBar.querySelectorAll(".filter-btn");
    const cards = grid.querySelectorAll(".cert-card");
    const pill = filterBar.querySelector(".filter-pill");

    // Slide pill to target button
    const movePill = (btn) => {
      if (!pill || !btn) return;
      const barRect = filterBar.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      gsap.to(pill, {
        x: btnRect.left - barRect.left,
        width: btnRect.width,
        duration: 0.4,
        ease: "back.out(1.5)",
      });
    };

    // Init pill on first button
    requestAnimationFrame(() => movePill(buttons[0]));

    const handleFilter = (e) => {
      const btn = e.currentTarget;
      const key = btn.dataset.filter;
      if (key === activeFilterRef.current) return;

      // Slide pill
      movePill(btn);

      // Update text colors
      buttons.forEach((b) => {
        const isActive = b.dataset.filter === key;
        b.classList.toggle("text-white", isActive);
        b.classList.toggle("text-white/60", !isActive);
      });

      // Flip animation
      const state = Flip.getState(cards);

      cards.forEach((card) => {
        const matches = key === "all" || card.dataset.category === key;
        card.style.display = matches ? "" : "none";
      });

      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        stagger: 0.04,
        onEnter: (elements) =>
          gsap.fromTo(elements,
            { opacity: 0, scale: 0.4, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
          ),
        onLeave: (elements) =>
          gsap.to(elements, {
            opacity: 0,
            scale: 0.4,
            y: -20,
            duration: 0.35,
            ease: "power3.in",
          }),
      });

      activeFilterRef.current = key;
    };

    buttons.forEach((btn) => btn.addEventListener("click", handleFilter));

    // Card click → modal
    cards.forEach((card, i) => {
      card.addEventListener("click", () => openModal(certifications[i]));
    });

    return () => {
      buttons.forEach((btn) => btn.removeEventListener("click", handleFilter));
    };
  }, []);

  useGSAP(() => {
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
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="certification" data-cursor-theme="dark" className="relative bg-black text-white overflow-hidden">
      <style>{`
        .cert-card {
          width: calc(33.333% - 22px);
          flex-shrink: 0;
        }
        @media (max-width: 1023px) {
          .cert-card { width: calc(50% - 16px); }
        }
        @media (max-width: 639px) {
          .cert-card { width: 100%; }
        }
      `}</style>

      <div className="px-8 md:px-20 py-20">
        <div className="max-w-6xl mx-auto w-full">

          {/* Header */}
          <div className="mb-10">
            <img
              src="./img/certificationsection/certificates.svg"
              alt="Certification"
              className="cert-title-img h-16 md:h-20 w-auto"
            />
            <SketchUnderline width={220} />
          </div>

          {/* Filter buttons with sliding pill */}
          <div ref={filterBarRef} className="relative flex flex-wrap gap-3 mb-12">
            <div className="filter-pill absolute top-0 left-0 h-full rounded-full bg-white/10 border border-white pointer-events-none" style={{ width: 0 }} />
            {categories.map((cat, i) => (
              <button
                key={cat.key}
                data-filter={cat.key}
                className={`filter-btn relative z-10 font-heading text-xs md:text-sm px-5 py-2 rounded-full transition-colors duration-300 ${
                  i === 0 ? "text-white" : "text-white/60 hover:text-white/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Flex grid */}
          <div ref={gridRef} className="cert-grid flex flex-wrap gap-4 md:gap-5">
            {certifications.map((cert, i) => (
              <CertCard
                key={cert.title}
                title={cert.title}
                desc={cert.desc}
                image={cert.image}
                category={cert.category}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
