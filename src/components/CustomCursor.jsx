import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const isTouchDevice = () =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

const SOURCES = {
  arrowWhite: "./img/cursor/whitecursor.svg",
  arrowBlack: "./img/cursor/blackcursor.svg",
  handWhite: "./img/cursor/handcursorwhite.svg",
  handBlack: "./img/cursor/handcursorblack.svg",
};

const HOTSPOTS = {
  arrow: { marginLeft: -5, marginTop: -5, size: 28 },
  hand: { marginLeft: -7, marginTop: -4, size: 36 },
};

export default function CustomCursor() {
  const [isTouch] = useState(() => isTouchDevice());
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);
  const isHovering = useRef(false);
  const isLight = useRef(false);
  const currentType = useRef("arrow");

  useEffect(() => {
    if (isTouch) return;
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    const setX = gsap.quickSetter(wrapper, "x", "px");
    const setY = gsap.quickSetter(wrapper, "y", "px");

    const updateImage = () => {
      const type = isHovering.current ? "hand" : "arrow";
      if (currentType.current !== type) {
        currentType.current = type;
        const hs = HOTSPOTS[type];
        img.style.marginLeft = hs.marginLeft + "px";
        img.style.marginTop = hs.marginTop + "px";
        img.style.width = hs.size + "px";
      }
      if (isHovering.current) {
        img.src = isLight.current ? SOURCES.handBlack : SOURCES.handWhite;
      } else {
        img.src = isLight.current ? SOURCES.arrowBlack : SOURCES.arrowWhite;
      }
    };

    const onMouseMove = (e) => {
      setX(e.clientX);
      setY(e.clientY);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      const section = el.closest("[data-cursor-theme]");
      if (section) {
        isLight.current = section.dataset.cursorTheme === "light";
      } else {
        const bg = getComputedStyle(el).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (m) {
            isLight.current = ((+m[1] * 299 + +m[2] * 587 + +m[3] * 114) / 1000) > 128;
          }
        }
      }
      updateImage();
    };

    const onMouseOver = (e) => {
      if (e.target.closest("button, a, [role='button'], input, select, textarea, label")) {
        isHovering.current = true;
        gsap.to(img, { scale: 1.15, duration: 0.2 });
        updateImage();
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest("button, a, [role='button'], input, select, textarea, label")) {
        isHovering.current = false;
        gsap.to(img, { scale: 1, duration: 0.2 });
        updateImage();
      }
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    // Hide cursor on all elements, not just body
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      style.remove();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ willChange: "transform" }}
    >
      <img
        ref={imgRef}
        src={SOURCES.arrowWhite}
        alt=""
        draggable={false}
        style={{
          width: 28,
          marginLeft: -5,
          marginTop: -5,
          display: "block",
        }}
      />
    </div>
  );
}
