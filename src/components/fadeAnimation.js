export function createFadeIn(visibleSections) {
  return function fadeIn(id, delay = 0) {
    const visible = visibleSections[id];
    return {
      style: {
        opacity: visible ? 1 : 1,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      },
    };
  };
}
