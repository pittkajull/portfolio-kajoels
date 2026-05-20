import { Section, SketchUnderline, SkillTag } from './shared';

const skillGroups = [
  {
    title: "Frontend",
    delay: 0.1,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript"],
  },
  {
    title: "Design",
    delay: 0.2,
    items: ["Figma", "UI/UX", "Responsive Design", "Prototyping", "Design Systems"],
  },
  {
    title: "Security",
    delay: 0.3,
    items: ["Penetration Testing", "Kali Linux", "Burp Suite", "OSINT", "Vulnerability Analysis"],
  },
];

export default function SkillsSection({ fadeIn }) {
  return (
    <Section id="skills" className="px-8 md:px-20">
      <div className="max-w-6xl mx-auto w-full">
        <div {...fadeIn("skills", 0)}>
          <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Georgia', serif" }}>Skills</h2>
          <SketchUnderline width={90} />
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-10">
          {skillGroups.map(({ title, delay, items }) => (
            <div key={title} {...fadeIn("skills", delay)}>
              <h3 className="font-mono text-white/40 text-xs tracking-widest mb-4">{title.toUpperCase()}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map(item => <SkillTag key={item} label={item} />)}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative horizontal line */}
        <div className="mt-16 w-full opacity-10">
          <svg viewBox="0 0 800 4" className="w-full" height="4">
            <path d="M0 2 Q200 1 400 2 Q600 3 800 2" stroke="white" strokeWidth="0.8" fill="none" strokeDasharray="4 3" />
          </svg>
        </div>
      </div>
    </Section>
  );
}
