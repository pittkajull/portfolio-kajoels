import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SVGLetter = ({ src, width = 50, height = 66, className = "" }) => (
  <svg viewBox={`0 0 ${width} ${height}`} className={`inline-block w-6 h-8 sm:w-8 sm:h-10 md:w-10 md:h-14 ${className}`}>
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
  { name: "LinkedIn", url: "https://www.linkedin.com/in/muhajir-amrullah-463915337", img: "./img/contactsection/linkedinblack.svg" },
  { name: "Instagram", url: "https://www.instagram.com/muhajiramrllh._", img: "./img/contactsection/igblack.svg" },
  { name: "GitHub", url: "https://github.com/pittkajull", img: "./img/contactsection/githubblack.svg" },
  { name: "TikTok", url: "https://www.tiktok.com/@user0123405056789101112", img: "./img/contactsection/tiktokblack.svg" },
  { name: "Medium", url: "https://medium.com/@muhajiramrullahub", img: "./img/contactsection/mediumblack.svg" },
  { name: "Linktree", url: "https://linktr.ee/muhajiramrullah", img: "./img/contactsection/linktreeblack.svg" },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

export default function ContactFooter() {
  const footerRef = useRef(null);

  useGSAP(() => {
    const footer = footerRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        once: true,
      },
      defaults: { ease: "back.out(2.5)" },
    });

    // Letters bounce in — big overshoot
    tl.from(".contact-letter", {
      y: 80,
      opacity: 0,
      scale: 0.3,
      rotation: () => gsap.utils.random(-25, 25),
      stagger: 0.06,
      duration: 0.8,
      ease: "back.out(3)",
    })
    // Underline draws in
    .from(".contact-underline", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.4")
    // Grid sections bounce up with elastic
    .from(".contact-link", {
      y: 60,
      opacity: 0,
      scale: 0.85,
      duration: 0.8,
      ease: "elastic.out(1.2, 0.4)",
    }, "-=0.3")
    // Footer text bounces in
    .from(".contact-footer-text", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(2)",
    }, "-=0.3");

    // Bounce on the curved white divider above footer
    const curve = document.querySelector(".footer-curve");
    if (curve) {
      gsap.from(curve, {
        scaleY: 0.3,
        scaleX: 1.08,
        transformOrigin: "center bottom",
        duration: 1,
        ease: "elastic.out(1.2, 0.35)",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          once: true,
        },
      });
    }
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} id="contact" data-cursor-theme="light" className="relative bg-white text-black px-8 md:px-20 pt-3 pb-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Contact heading — atur jarak ke bawah via mb-X di bawah ini */}
        <div className="mb-4">
          <div className="contact-title flex gap-1 items-end mb-2">
            <SVGLetter src="./img/contactsection/l.svg" className="contact-letter" />
            <SVGLetter src="./img/contactsection/e.svg" className="contact-letter" />
            <SVGLetter src="./img/contactsection/t.svg" className="contact-letter" />
            <div className="contact-letter" style={{ marginBottom: '1.2em' }}>
              <SVGLetter src="./img/contactsection/'.svg" />
            </div>
            <SVGLetter src="./img/contactsection/s.svg" className="contact-letter" />
            <div className="w-4" />
            <SVGLetter src="./img/contactsection/c.svg" className="contact-letter" />
            <SVGLetter src="./img/contactsection/o.svg" className="contact-letter" />
            <SVGLetter src="./img/contactsection/n.svg" className="contact-letter" />
            <SVGLetter src="./img/contactsection/n-1.svg" className="contact-letter" />
            <SVGLetter src="./img/contactsection/e-1.svg" className="contact-letter" />
            <SVGLetter src="./img/contactsection/c-1.svg" className="contact-letter" />
            <SVGLetter src="./img/contactsection/t-1.svg" className="contact-letter" />
          </div>
          <div className="contact-underline">
            <img src="./img/contactsection/garisbawah.svg" alt="" className="w-36 md:w-44 h-auto" />
          </div>
        </div>

        {/* Footer grid: logo+name+motto | nav | social | contact */}
        <div className="contact-link grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">

          {/* Logo + Site name + Motto */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img src="./img/logo/logohe1istblack.svg" alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
              <span className="text-2xl text-black"><span className="font-heading">he</span><span className="font-sans">1</span><span className="font-heading">st</span></span>
            </div>
            <p className="font-heading text-sm sm:text-base md:text-lg text-black/80 leading-relaxed">
              A personal portfolio built to showcase my work, projects, and journey as a developer.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg md:text-xl text-black mb-3">Navigation</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-heading text-sm sm:text-base md:text-lg text-black/80 hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media — icon only */}
          <div>
            <h4 className="font-heading text-lg md:text-xl text-black mb-3">Social Media</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  className="flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
                >
                  <img src={link.img} alt={link.name} className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg md:text-xl text-black mb-3">Contact</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:muhajiramrullahub@gmail.com" className="font-heading text-sm sm:text-base md:text-lg text-black/80 hover:text-black transition-colors">
                muhajiramrullahub@gmail.com
              </a>
              <a
                href="./cv/MuhajirAmrullah_CV.pdf"
                download="MuhajirAmrullah_CV.pdf"
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 w-fit border border-black/20 rounded-lg text-sm sm:text-base font-heading text-black/80 hover:text-black hover:border-black/40 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </a>
              <span className="font-heading text-sm sm:text-base md:text-lg text-black/80">
                Serang city, Banten, Indonesia
              </span>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="contact-footer-text flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-black/80 text-sm sm:text-lg md:text-xl tracking-widest">
            {mixedFont("© 2026 He1st.")}
          </span>
          <span className="text-black/80 text-sm sm:text-lg md:text-xl tracking-widest">
            {mixedFont("copyright protected by law.")}
          </span>
        </div>
      </div>
    </footer>
  );
}
