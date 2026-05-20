import { Section, SketchUnderline } from '../shared';

const contacts = [
  { label: "Email", value: "yourname@email.com" },
  { label: "GitHub", value: "github.com/yourusername" },
  { label: "LinkedIn", value: "linkedin.com/in/yourusername" },
];

export default function ContactSection({ fadeIn }) {
  return (
    <Section id="contact" className="px-8 md:px-20">
      <div className="max-w-6xl mx-auto w-full">
        <div {...fadeIn("contact", 0)}>
          <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Georgia', serif" }}>Contact</h2>
          <SketchUnderline width={100} />
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-16 items-center">
          <div {...fadeIn("contact", 0.15)}>
            <p className="text-white/50 text-sm leading-7 mb-8 max-w-sm">
              Got a project in mind or just want to say hi?
              Drop me a message — always open to interesting collaborations.
            </p>
            <div className="space-y-4">
              {contacts.map(({ label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="font-mono text-white/30 text-xs tracking-widest w-16">{label}</span>
                  <span className="text-white/70 text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative sketch element */}
          <div {...fadeIn("contact", 0.3)} className="flex justify-center">
            <svg viewBox="0 0 200 200" width="200" height="200" className="opacity-20">
              <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.8" fill="none" strokeDasharray="3 4" />
              <circle cx="100" cy="100" r="55" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="2 5" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="0.5" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="white" strokeWidth="0.5" />
              <path d="M100 100 L145 60 Q152 52 160 58 Q155 68 148 65 L100 100" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </Section>
  );
}
