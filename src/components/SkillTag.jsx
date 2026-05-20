export default function SkillTag({ label }) {
  return (
    <span className="relative inline-block font-mono text-xs text-white/80 px-3 py-1">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 28" preserveAspectRatio="none">
        <path d="M2 14 Q2 2 14 2 L86 2 Q98 2 98 14 Q98 26 86 26 L14 26 Q2 26 2 14 Z"
          stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round"
          strokeDasharray="2 1.5" />
      </svg>
      {label}
    </span>
  );
}
