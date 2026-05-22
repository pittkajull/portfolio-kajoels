import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoadingPage({ onComplete }) {
  const overlayRef = useRef(null);

  useGSAP(() => {
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

    // 1. Loading text pop in
    tl.from(".loading-text", {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(2)",
    })
    // 2. Decorations pop in
    .to(".loading-deco", {
      scale: 1,
      opacity: 1,
      stagger: 0.12,
      duration: 0.6,
      ease: "back.out(1.7)",
    }, "-=0.4")
    // 3. Hold briefly
    .to({}, { duration: 0.5 });
  }, { scope: overlayRef });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-black"
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

      {/* Loading text */}
      <img
        src="./img/loading/loadingss.svg"
        alt="Loading"
        className="loading-text relative z-20 w-[85vw] max-w-[700px] h-auto"
      />
    </div>
  );
}
