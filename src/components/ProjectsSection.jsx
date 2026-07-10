import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SketchUnderline from "./SketchUnderline";

gsap.registerPlugin(ScrollTrigger);

const SVGLetter = ({ src, width = 60, height = 80, className = "" }) => (
  <svg viewBox={`0 0 ${width} ${height}`} className={`inline-block w-8 h-10 sm:w-10 sm:h-14 md:w-12 md:h-16 ${className}`}>
    <image href={src} width={width} height={height} />
  </svg>
);

const kotakFrames = [
  "./img/experiencesection/kotak1.svg",
  "./img/experiencesection/kotak2.svg",
  "./img/experiencesection/kotak 3.svg",
];

const techLogos = {
  "HTML": "./img/toolssection/html.svg",
  "CSS": "./img/toolssection/css.svg",
  "Tailwind": "./img/toolssection/tailwind.svg",
  "PHP": "./img/toolssection/php.svg",
  "MySQL": "./img/toolssection/mysql.svg",
  "Blade": "./img/toolssection/laravel.svg",
  "Laravel": "./img/toolssection/laravel.svg",
  "Dart": "./img/toolssection/dart.svg",
  "Flutter": "./img/toolssection/flutter.svg",
  "Firebase": "./img/toolssection/firebase.svg",
  "Python": "./img/toolssection/python.svg",
  "React": "./img/toolssection/React.svg",
  "TensorFlow": "./img/toolssection/tensorflow.svg",
  "Supabase": "./img/toolssection/supabase.svg",
  "Claude": "./img/toolssection/claude.svg",
  "GSAP": "./img/toolssection/GSAP.svg",
  "JavaScript": "./img/toolssection/Javascript.svg",
  "n8n": "./img/toolssection/n8n.svg",
  "Groq": "./img/toolssection/groq.svg",
  "Telegram": "./img/toolssection/telegram.svg",
  "Arduino": "./img/toolssection/arduino.svg",
  "GitHub": "./img/contactsection/github.svg",
  "Gemini": "./img/toolssection/gemini.svg",
  "Ngrok": "./img/toolssection/ngrok.svg",
};

const completedProjects = [
    {
    title: "SIMS",
    desc: "Smart Infusion Monitoring System — an IoT-based healthcare solution that digitizes and automates IV fluid monitoring in hospitals. Enables medical staff to track remaining infusion volume, detect flow blockages, and receive real-time alerts when fluid is about to run out, all through a web dashboard.",
    image: "./img/projectsection/SIMS.png",
    tech: ["Laravel", "HTML", "CSS", "MySQL", "PHP", "Tailwind", "React", "Arduino"],
    github: "https://github.com/pittkajull/SIMS-Dashboard-Infus.git",
    demo: "https://sims.engineer",
  },
  {
    title: "edelweys",
    desc: "Your AI health companion — here to chat about nutrition, exercise, sleep & more. Track your BMI, daily habits, and get personalized tips. Friendly, free, and always reminds you to see a doctor when needed.",
    image: "./img/projectsection/edelweys.png",
    tech: ["React", "Tailwind", "Supabase", "Python",],
    github: "https://github.com/pittkajull/edelweys.git",
    demo: "https://edelweys.tech",
  },
  {
    title: "Reincarnate",
    desc: "A thrift marketplace platform for buying and selling pre-loved items — from clothes, shoes, to hats. Features store management, product listings, and a shopping experience similar to e-commerce platforms like Shopee.",
    image: "./img/projectsection/Reincarnate.png",
    tech: ["Laravel", "HTML", "CSS", "MySQL", "PHP", "Blade"],
    github: "https://github.com/pittkajull/reincarnate.git",
    demo: "#",
  },
  {
    title: "Artnest",
    desc: "A social media platform for digital creators to showcase, share, and discover digital artwork. Built as a community-driven space where artists can connect and present their creative portfolios.",
    image: "./img/projectsection/Artnest.png",
    tech: ["CSS", "HTML", "Tailwind", "PHP", "MySQL"],
    github: "https://github.com/pittkajull/artnest.git",
    demo: "#",
  },
  {
    title: "Focusly",
    desc: "A focus and productivity app inspired by the Pomodoro technique, enhanced with pre-study relaxation sessions to calm the user before starting, and post-study appreciation moments to celebrate completion.",
    image: "./img/projectsection/Focusly.png",
    tech: ["Dart", "Flutter", "Firebase"],
    github: "https://github.com/pittkajull/focusly.git",
    demo: "#",
  },
  {
    title: "Class Billiard",
    desc: "A premium billiard lounge & cafe website featuring table reservations, menu browsing, team profiles, tournament showcases, and customer reviews — serving as both a marketing platform and booking portal.",
    image: "./img/projectsection/class-billiard.png",
    tech: ["CSS", "HTML", "Tailwind", "Blade", "Laravel", "PHP", "MySQL"],
    github: "https://github.com/pittkajull/class_billiard.git",
    demo: "https://classbilliard.com",
  },
  {
    title: "Pakbie",
    desc: "A website helping a local UMKM nasi goreng stall with digital financial bookkeeping, expense tracking, and business management tools to streamline daily operations.",
    image: "./img/projectsection/pakbie.png",
    tech: ["Laravel", "HTML", "CSS", "MySQL", "PHP", "Blade"],
    github: "https://github.com/pittkajull/umkmpakbie.git",
    demo: "#",
  },
  {
    title: "OS-Portfolio",
    desc: "An experimental portfolio project inspired by a desktop operating system, built with React and Tailwind CSS. Designed to create an interactive and playful experience through desktop-style navigation and window-based UI.",
    image: "./img/projectsection/OS-he1st.png",
    tech: ["React" , "Tailwind" , "Claude"],
    github: "https://github.com/pittkajull/he1st.git",
    demo: "https://os-he1st.vercel.app/",
  },
   {
    title: "CIPHER",
    desc: "CIPHER is an AI-powered interactive cybersecurity education game where users become cyber agents and solve realistic attack cases through evidence analysis and clue discovery. Guided by ARIA, an intelligent briefing officer powered by Gemini AI, players learn cybersecurity through immersive, gamified investigation experiences. Built with React, Tailwind CSS, GSAP, and Express.js with a security-first architecture.",
    image: "./img/projectsection/CIPHER.png",
    tech: ["React","Tailwind","GSAP","JavaScript"],
    github: "https://github.com/pittkajull/CIPHER.git",
    demo: "https://cipher-zeta-kohl.vercel.app/",
  },
  {
    title: "Nara - Automation AI Sosial Media Management",
    desc: "Developed Nara, an autonomous AI Social Media Strategist that replicates a professional content team's workflow using workflow automation and LLMs. The system performs topic selection, strategic planning, content writing, editing, automated publishing to Threads, performance analytics, and knowledge base versioning. Built using n8n, Supabase, Gemini API, Buffer, and GitHub to deliver a scalable, end-to-end AI content automation solution.",
    image: "./img/projectsection/Narabuffer.jpeg",
    tech: ["n8n","Supabase","Gemini","GitHub", "Ngrok"],
    github: "https://github.com/pittkajull/AI-Social-Media-Strategist.git",
    demo: "#",
  },
  {
    title: "Yuuki - The Sarkastic AI Agent",
    desc: "Yuuki is an AI-based Telegram bot designed not to be a cute assistant, but rather the most honest and annoying friend. Using n8n as a workflow orchestrator and Groq as an inference engine, Yuuki breaks the mold of standard, boring and overly formal AI assistants.",
    image: "./img/projectsection/Yuuki.png",
    tech: ["n8n","Groq","Telegram", "Ngrok"],
    demo: "https://t.me/kajoels_bot",
  },
  {
    title: "Watchdog - The 24/7 Website Guardian",
    desc: "An automated workflow designed to ensure 24/7 website availability. It uses scheduled triggers and conditional logic to verify server uptime. If the response is not up to standard (status 200 OK), the Telegram bot automatically sends an emergency alert to ensure service recovery is performed as quickly as possible.",
    image: "./img/projectsection/Watchdog.png",
    tech: ["n8n","Groq","Telegram", "Ngrok"],
    demo: "t.me/WatchdogSec_bot ",
  },
];

const ongoingProjects = [
  {
    title: "StockPP",
    desc: "An autonomous financial forecasting agent that automates the entire ML lifecycle for stock market analysis — from real-time data collection, preprocessing, training, to deployment. Uses Stacked LSTM with automated retraining and RMSE-based validation. Integrates Supabase for cloud persistence and FastAPI with model caching, reducing inference latency from ~5s to <50ms. Currently monitors 8 major stocks with ~15 automated retraining cycles per week, cutting manual analysis time by 90%.",
    image: "./img/projectsection/StockPP.png",
    tech: ["Python", "React", "TensorFlow", "Supabase", "Tailwind"],
    github: "https://github.com/pittkajull/StockPP.git",
    demo: "#",
    progress: 70,
    target: "Q3 2026",
  },
   {
    title: "MemoriMSDI",
    desc: "A cinematic memorial website dedicated to preserving the precious moments and memories of MSDI.",
    image: "./img/projectsection/memorimsdi.png",
    tech: ["React","Tailwind"],
    github: "https://github.com/pittkajull/memorimsdi.git",
    demo: "#",
    progress: 70,
    target: "Q3 2026",
  },

];

// Auto split: angka → font-sans, huruf → font-heading
function mixedFont(text) {
  return text.split(/(\d+%?)/).map((part, i) =>
    /^\d+%?$/.test(part)
      ? <span key={i} className="font-sans">{part}</span>
      : <span key={i} className="font-heading">{part}</span>
  );
}

function ProgressBar({ percent }) {
  const bars = [0, 10, 30, 50, 70, 100];
  const closest = bars.reduce((prev, curr) =>
    Math.abs(curr - percent) < Math.abs(prev - percent) ? curr : prev
  );
  const countRef = useRef(null);
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: percent,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => setDisplayPercent(Math.round(obj.val)),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [percent]);

  return (
    <div ref={countRef}>
      <img
        src={`./img/projectsection/bar${closest}p.svg`}
        alt={`${percent}% progress`}
        className="w-full h-auto"
      />
      <p className="text-white/40 text-[10px] mt-1 text-right">{mixedFont(`Progress ${displayPercent}%`)}</p>
    </div>
  );
}

function ProjectCard({ title, desc, image, tech, github, demo, progress, target, index }) {
  const baseTilt = ((index % 3) - 1) * 1;
  const frame = kotakFrames[index % kotakFrames.length];
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 10,
        transformPerspective: 800,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        rotate: baseTilt,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    card.addEventListener("mousemove", onMove, { passive: true });
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [baseTilt]);

  return (
    <div
      ref={cardRef}
      className="project-card group relative flex flex-col"
      style={{ transform: `rotate(${window.innerWidth < 768 ? 0 : baseTilt}deg)`, transformStyle: "preserve-3d" }}
    >
      {/* Thumbnail with kotak frame */}
      <div className="relative mb-4" style={{ aspectRatio: "307 / 211" }}>
        <img
          src={frame}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity duration-500"
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ padding: "10% 9%" }}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-sm opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>

      {/* Info */}
      <h3 className="text-white text-lg mb-2">{mixedFont(title)}</h3>
      <p className="text-white/50 text-xs leading-relaxed mb-3 flex-1">{mixedFont(desc)}</p>

      {/* Tech stack logos */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tech.map((t) => (
          <img
            key={t}
            src={techLogos[t]}
            alt={t}
            title={t}
            className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity duration-200"
          />
        ))}
      </div>

      {/* Progress bar for ongoing */}
      {progress !== undefined && (
        <div className="mb-3">
          <ProgressBar percent={progress} />
          {target && (
            <div className="flex items-center gap-1.5 mt-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-white/30 text-[10px]">{mixedFont(`Complete target ${target}`)}</span>
            </div>
          )}
        </div>
      )}

      {/* Links */}
      <div className="flex items-center gap-4 mt-auto pt-2">
        {github && github !== "#" && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/40 hover:text-white text-xs font-mono transition-colors"
          >
            GitHub ↗
          </a>
        )}
        {demo && demo !== "#" && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/40 hover:text-white text-xs font-mono transition-colors"
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectSubsection({ label, icon, iconClass = "h-8 md:h-9", projects }) {
  return (
    <div className="project-subsection">
      <div className="project-subtitle mt-12 mb-8">
        {icon ? (
          <img src={icon} alt={label} className={`${iconClass} w-auto`} />
        ) : (
          <h3 className="font-heading text-white/70 text-xl md:text-2xl">{label}</h3>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <ProjectCard key={proj.title} {...proj} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Title entrance
    gsap.from(".proj-letter", {
      y: 30,
      opacity: 0,
      rotation: () => gsap.utils.random(-10, 10),
      stagger: 0.05,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".project-title-img",
        start: "top 85%",
        once: true,
      },
    });

    // Subsection labels
    gsap.from(".project-subtitle", {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".project-subtitle",
        start: "top 85%",
        once: true,
      },
    });

    // Cards entrance
    gsap.from(".project-card", {
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".project-card",
        start: "top 85%",
        once: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="projects" data-cursor-theme="dark" className="relative bg-black text-white px-8 md:px-20 pt-20 pb-12">
      <div ref={sectionRef} className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <div className="mb-12">
          <div className="project-title-img flex gap-2 items-end mb-6">
            <SVGLetter src="./img/projectsection/p.svg" width={60} height={80} className="proj-letter" />
            <SVGLetter src="./img/projectsection/r.svg" width={60} height={80} className="proj-letter" />
            <SVGLetter src="./img/projectsection/o.svg" width={60} height={80} className="proj-letter" />
            <SVGLetter src="./img/projectsection/j.svg" width={60} height={80} className="proj-letter" />
            <SVGLetter src="./img/projectsection/e.svg" width={60} height={80} className="proj-letter" />
            <SVGLetter src="./img/projectsection/c.svg" width={60} height={80} className="proj-letter" />
            <SVGLetter src="./img/projectsection/t.svg" width={60} height={80} className="proj-letter" />
          </div>
          <SketchUnderline width={200} />
        </div>

        {/* Completed Projects */}
        <ProjectSubsection label="Completed" icon="./img/projectsection/completed.svg" iconClass="h-8 md:h-9" projects={completedProjects} />

        {/* Ongoing Projects */}
        <ProjectSubsection label="On Going" icon="./img/projectsection/ongoing.svg" iconClass="h-8 md:h-15" projects={ongoingProjects} />
      </div>
    </section>
  );
}
