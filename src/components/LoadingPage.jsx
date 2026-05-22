import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const loadingLetters = [
  { src: "./img/loading/l.svg", alt: "l" },
  { src: "./img/loading/o.svg", alt: "o" },
  { src: "./img/loading/dapits.svg", alt: "a" },
  { src: "./img/loading/d.svg", alt: "d" },
  { src: "./img/loading/i-1.svg", alt: "i" },
  { src: "./img/loading/i.svg", alt: "i" },
  { src: "./img/loading/n.svg", alt: "n" },
  { src: "./img/loading/g.svg", alt: "g" },
];

export default function LoadingPage({ onComplete }) {
  const overlayRef = useRef(null);

  useGSAP(() => {
    gsap.set(".loading-letter", { y: 40, opacity: 0, rotation: 0, scale: 0.5 });
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

    // 1. White → Black background transition
    tl.to(overlayRef.current, {
      backgroundColor: "#000000",
      duration: 0.8,
      ease: "power2.inOut",
    })
    // 2. Letters pop in one by one
    .to(".loading-letter", {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: () => gsap.utils.random(-15, 15),
      stagger: 0.08,
      duration: 0.6,
      ease: "back.out(1.7)",
    })
    // 3. Decorations pop in
    .to(".loading-deco", {
      scale: 1,
      opacity: 1,
      stagger: 0.12,
      duration: 0.6,
      ease: "back.out(1.7)",
    }, "-=0.4")
    // 4. Hold briefly
    .to({}, { duration: 0.5 });
  }, { scope: overlayRef });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <img
          src="./img/loading/monster.svg"
          alt=""
          className="loading-deco absolute top-6 left-4 sm:top-10 sm:left-10 w-16 sm:w-24 md:w-36"
        />
        <img
          src="./img/loading/cat.svg"
          alt=""
          className="loading-deco absolute bottom-6 right-4 sm:bottom-10 sm:right-10 w-14 sm:w-20 md:w-32"
        />
      </div>

      {/* Loading letters */}
      <div className="loading-letters relative z-20 flex gap-1 sm:gap-2 items-end">
        {loadingLetters.map((letter) => (
          <img
            key={letter.alt + letter.src}
            src={letter.src}
            alt={letter.alt}
            className="loading-letter w-10 h-14 sm:w-14 sm:h-20 md:w-16 md:h-24"
          />
        ))}
      </div>
    </div>
  );
}
