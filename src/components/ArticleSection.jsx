import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SketchUnderline from "./SketchUnderline";

gsap.registerPlugin(ScrollTrigger);

const SVGLetter = ({ src, width = 60, height = 80, className = "" }) => (
  <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className={`inline-block ${className}`}>
    <image href={src} width={width} height={height} />
  </svg>
);

const kotakFrames = [
  "/img/experiencesection/kotak1.svg",
  "/img/experiencesection/kotak2.svg",
  "/img/experiencesection/kotak 3.svg",
];

const articles = [
  {
    title: "Eksploitasi & Mitigasi Samba 3.0.20: Write-up Simulasi Red Team & Blue Team",
    desc: "A cybersecurity lab simulation exploiting a vulnerability in Samba 3.0.20 using Metasploit and Nmap. Covers Red Team attack strategies — reconnaissance, exploitation, privilege escalation, and backdoor planting — alongside Blue Team defense through traffic detection with Wireshark and backdoor removal.",
    image: "/img/articelsection/samba.png",
    url: "https://medium.com/@muhajiramrullahub/eksploitasi-mitigasi-samba-3-0-20-write-up-simulasi-red-team-blue-team-40cf0e58595f",
    date: "May 2025",
    readTime: "8 min read",
    tag: "Cybersecurity",
  },
  {
    title: "Mission Accomplished: Cracking JWT & Capturing the Flag at Cybersecurity Bootcamp",
    desc: "A CTF challenge write-up from Ignite Academy's cybersecurity bootcamp. Documents penetration testing on the Sentinel authentication system — brute-forcing weak JWT signing keys with Hashcat, forging tokens to escalate privileges, and capturing the flag.",
    image: "/img/articelsection/jwt.png",
    url: "https://medium.com/@muhajiramrullahub/mission-accomplished-cracking-jwt-capturing-the-flag-at-cybersecurity-bootcamp-68b8626cd613",
    date: "April 2025",
    readTime: "6 min read",
    tag: "CTF",
  },
  {
    title: "Cara Cepat Pasang Gemini AI di Terminal (Official @google/gemini-cli)",
    desc: "A step-by-step tutorial on installing Google's official Gemini CLI tool via npm. Covers authentication with Google API key, managing folder trust settings, and using Gemini directly in the terminal for coding assistance.",
    image: "/img/articelsection/gemini.png",
    url: "https://medium.com/@muhajiramrullahub/cara-cepat-pasang-gemini-ai-di-terminal-official-google-gemini-cli-cd81d5b7b0a4",
    date: "March 2025",
    readTime: "4 min read",
    tag: "Tutorial",
  },
];

// Auto split: angka → font-sans, huruf → font-heading
function mixedFont(text) {
  return text.split(/(\d+)/).map((part, i) =>
    /^\d+$/.test(part)
      ? <span key={i} className="font-sans">{part}</span>
      : <span key={i} className="font-heading">{part}</span>
  );
}

function ArticleFeatured({ article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {/* Image with kotak frame */}
      <div className="relative mb-6" style={{ aspectRatio: "307 / 211" }}>
        <img
          src={kotakFrames[0]}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity duration-500"
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ padding: "10% 9%" }}>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover rounded-sm opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3">
        <span className="px-2 py-0.5 text-[10px] font-mono text-white/60 border border-white/15 rounded-full">
          {article.tag}
        </span>
        <span className="text-white/30 text-xs">{mixedFont(article.date)}</span>
        <span className="text-white/30 text-xs">{mixedFont(article.readTime)}</span>
      </div>

      {/* Title */}
      <h3 className="text-white text-xl md:text-2xl mb-3 group-hover:text-white/80 transition-colors">
        {mixedFont(article.title)}
      </h3>

      {/* Description */}
      <p className="text-white/50 text-sm leading-relaxed mb-4">
        {mixedFont(article.desc)}
      </p>

      {/* Link */}
      <span className="inline-flex items-center gap-1 text-white/40 group-hover:text-white text-xs font-mono transition-colors">
        Read on Medium ↗
      </span>
    </a>
  );
}

function ArticleListItem({ article, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-4 p-4 rounded-lg text-left transition-all duration-200 ${
        isActive
          ? "bg-white/5 border border-white/10"
          : "border border-transparent hover:bg-white/[0.03]"
      }`}
    >
      {/* Thumbnail with kotak frame */}
      <div className="flex-shrink-0 relative" style={{ width: 80, aspectRatio: "307 / 211" }}>
        <img
          src={kotakFrames[0]}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ padding: "12% 10%" }}>
          <img
            src={article.image}
            alt={article.title}
            className={`w-full h-full object-cover rounded-sm transition-all duration-300 ${
              isActive ? "opacity-100" : "opacity-50 grayscale hover:opacity-80 hover:grayscale-0"
            }`}
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white/30 text-[10px]">{mixedFont(article.date)}</span>
          <span className="text-white/20 text-[10px]">·</span>
          <span className="text-white/30 text-[10px]">{mixedFont(article.readTime)}</span>
        </div>
        <h4 className={`text-sm mb-1 line-clamp-2 transition-colors ${
          isActive ? "text-white" : "text-white/60"
        }`}>
          {mixedFont(article.title)}
        </h4>
        <p className="text-white/30 text-xs line-clamp-1">{mixedFont(article.desc)}</p>
      </div>
    </button>
  );
}

export default function ArticleSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    // Title entrance
    gsap.from(".article-letter", {
      y: 30,
      opacity: 0,
      rotation: () => gsap.utils.random(-10, 10),
      stagger: 0.05,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".article-title-img",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Content entrance
    gsap.from(".article-content", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".article-content",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="articles" data-cursor-theme="dark" className="relative bg-black text-white px-8 md:px-20 pt-20 pb-12">
      <div ref={sectionRef} className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <div className="mb-12">
          <div className="article-title-img flex gap-2 items-end mb-6">
            <SVGLetter src="/img/articelsection/A.svg" width={60} height={80} className="article-letter" />
            <SVGLetter src="/img/articelsection/r.svg" width={60} height={80} className="article-letter" />
            <SVGLetter src="/img/articelsection/t.svg" width={60} height={80} className="article-letter" />
            <SVGLetter src="/img/articelsection/i.svg" width={60} height={80} className="article-letter" />
            <SVGLetter src="/img/articelsection/c.svg" width={60} height={80} className="article-letter" />
            <SVGLetter src="/img/articelsection/l.svg" width={60} height={80} className="article-letter" />
            <SVGLetter src="/img/articelsection/e.svg" width={60} height={80} className="article-letter" />
          </div>
          <SketchUnderline width={200} />
        </div>

        {/* Two column layout */}
        <div className="article-content grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Featured article */}
          <div className="lg:col-span-7">
            <ArticleFeatured article={articles[activeIndex]} />
          </div>

          {/* Right: Article list */}
          <div className="lg:col-span-5 space-y-2">
            {articles.map((article, i) => (
              <ArticleListItem
                key={article.title}
                article={article}
                isActive={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* View All button */}
        <div className="mt-12 text-center">
          <a
            href="https://medium.com/@muhajiramrullahub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white/60 hover:text-white hover:border-white/40 font-mono text-sm transition-all duration-200"
          >
            View All Articles ↗
          </a>
        </div>
      </div>
    </section>
  );
}
