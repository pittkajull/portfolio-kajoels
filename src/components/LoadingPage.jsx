import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoadingPage({ onComplete }) {
  const overlayRef = useRef(null);
  const svgRef = useRef(null);
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch("./img/loading/loadingss.svg")
      .then((res) => res.text())
      .then((text) => {
        // Remove fixed width/height so it scales to container
        const cleaned = text.replace(/width="[^"]*"/, '').replace(/height="[^"]*"/, '');
        setSvgContent(cleaned);
      });
  }, []);

  useGSAP(() => {
    if (!svgContent) return;

    const svg = svgRef.current?.querySelector("svg");
    if (!svg) return;

    const paths = svg.querySelectorAll("path");

    // Set up stroke-dasharray for draw effect
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    // Init decorations hidden
    gsap.set(".loading-deco", { scale: 0, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
          onComplete,
        });
      },
    });

    // 1. White → Black background
    tl.to(overlayRef.current, {
      backgroundColor: "#000000",
      duration: 0.8,
      ease: "power2.inOut",
    })
    // 2. Draw each path progressively
    .to(paths, {
      strokeDashoffset: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "power2.inOut",
    })
    // 3. Decorations pop in
    .to(".loading-deco", {
      scale: 1,
      opacity: 1,
      stagger: 0.12,
      duration: 0.6,
      ease: "back.out(1.7)",
    }, "-=0.8")
    // 4. Hold briefly
    .to({}, { duration: 0.5 });
  }, { dependencies: [svgContent] });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Decorations */}
      <img
        src="./img/loading/monster.svg"
        alt=""
        className="loading-deco absolute top-6 left-4 sm:top-10 sm:left-10 w-16 sm:w-24 md:w-36 z-10"
      />
      <img
        src="./img/loading/cat.svg"
        alt=""
        className="loading-deco absolute bottom-6 right-4 sm:bottom-10 sm:right-10 w-14 sm:w-20 md:w-32 z-10"
      />

      {/* Loading SVG inline for stroke-draw animation */}
      <div
        ref={svgRef}
        className="relative z-20 w-[60vw] max-w-[500px]"
        dangerouslySetInnerHTML={{ __html: svgContent }}
        style={{ lineHeight: 0 }}
      />
    </div>
  );
}
