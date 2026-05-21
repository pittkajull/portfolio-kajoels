const navLinks = ["About", "Education", "Tools", "Experience", "Certification", "Projects", "Articles", "Contact"];

export default function Navbar({ active, onNav }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{ background: "linear-gradient(to bottom, #000 60%, transparent)" }}>
      <span className="text-white font-mono text-sm tracking-widest opacity-70">PORTFOLIO</span>
      <ul className="flex gap-8">
        {navLinks.map(link => (
          <li key={link}>
            <button
              onClick={() => onNav(link)}
              className={`font-mono text-sm tracking-widest transition-all duration-200 relative group
                ${active === link ? "text-white" : "text-white/40 hover:text-white/80"}`}
            >
              {link}
              {active === link && (
                <svg className="absolute -bottom-1 left-0 w-full" height="3" viewBox="0 0 60 3">
                  <path d="M1 2 Q15 1 30 2 Q45 3 59 1" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
