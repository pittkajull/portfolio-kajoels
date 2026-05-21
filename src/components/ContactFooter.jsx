import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SVGLetter = ({ src, width = 60, height = 80, className = "" }) => (
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

const socialLinks = [
  { name: "GitHub", url: "https://github.com/pittkajull", icon: "GH" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/muhajir-amrullah22", icon: "LI" },
  { name: "Medium", url: "https://medium.com/@muhajiramrullahub", icon: "MD" },
  { name: "Email", url: "mailto:muhajiramrullahub@gmail.com", icon: "@" },
];

export default function ContactFooter() {
  const footerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        once: true,
      },
    });

    tl.from(".contact-letter", {
      y: 30,
      opacity: 0,
      rotation: () => gsap.utils.random(-10, 10),
      stagger: 0.05,
      duration: 0.6,
      ease: "back.out(1.7)",
    })
    .from(".contact-underline", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.3")
    .from(".contact-link", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
    }, "-=0.2")
    .from(".contact-divider", {
      scaleX: 0,
      transformOrigin: "center",
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.1")
    .from(".contact-footer-text", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.2");
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} id="contact" data-cursor-theme="light" className="relative bg-white text-black px-8 md:px-20 pt-20 pb-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Contact heading */}
        <div className="mb-12">
          <div className="contact-title flex gap-1 items-end mb-4">
            <SVGLetter src="/img/contactsection/l.svg" className="contact-letter" />
            <SVGLetter src="/img/contactsection/e.svg" className="contact-letter" />
            <SVGLetter src="/img/contactsection/t.svg" className="contact-letter" />
            <div className="contact-letter" style={{ marginBottom: '1.2em' }}>
              <SVGLetter src="/img/contactsection/'.svg" />
            </div>
            <SVGLetter src="/img/contactsection/s.svg" className="contact-letter" />
            <div className="w-4" />
            <SVGLetter src="/img/contactsection/c.svg" className="contact-letter" />
            <SVGLetter src="/img/contactsection/o.svg" className="contact-letter" />
            <SVGLetter src="/img/contactsection/n.svg" className="contact-letter" />
            <SVGLetter src="/img/contactsection/n-1.svg" className="contact-letter" />
            <SVGLetter src="/img/contactsection/e-1.svg" className="contact-letter" />
            <SVGLetter src="/img/contactsection/c-1.svg" className="contact-letter" />
            <SVGLetter src="/img/contactsection/t-1.svg" className="contact-letter" />
          </div>
          <div className="contact-underline">
            <img src="/img/contactsection/garisbawah.svg" alt="" className="w-48 md:w-56 h-auto" />
          </div>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-6 mb-16">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link group flex items-center gap-3 px-5 py-3 border border-black/15 rounded-lg hover:border-black/30 hover:bg-black/5 transition-all duration-200"
            >
              <span className="font-mono text-black/40 text-xs tracking-wider group-hover:text-black/70 transition-colors">
                {link.icon}
              </span>
              <span className="font-heading text-black/60 text-sm group-hover:text-black transition-colors">
                {link.name}
              </span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="contact-divider opacity-10 mb-8">
          <svg viewBox="0 0 800 4" className="w-full" height="4">
            <path d="M0 2 Q200 1 400 2 Q600 3 800 2" stroke="black" strokeWidth="0.8" fill="none" strokeDasharray="4 3" />
          </svg>
        </div>

        {/* Footer bottom */}
        <div className="contact-footer-text flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-black/20 text-xs tracking-widest">
            {mixedFont("© 2025 Muhajir Amrullah")}
          </span>
          <span className="font-mono text-black/20 text-xs tracking-widest">
            {mixedFont("Built with React + Tailwind")}
          </span>
        </div>
      </div>
    </footer>
  );
}
