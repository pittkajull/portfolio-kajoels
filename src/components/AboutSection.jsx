import { Section, SketchUnderline } from '../shared';

const SVGLetter = ({ src, width = 80, height = 100 }) => (
  <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="inline-block">
    <image href={src} width={width} height={height} />
  </svg>
);

const AboutMeText = () => (
  <div className="flex gap-2 items-end">
    <SVGLetter src="/img/herosection/A.svg" width={60} height={80} />
    <SVGLetter src="/img/herosection/b.svg" width={60} height={80} />
    <SVGLetter src="/img/herosection/o.svg" width={60} height={80} />
    <SVGLetter src="/img/herosection/u.svg" width={60} height={80} />
    <SVGLetter src="/img/herosection/t.svg" width={60} height={80} />
    <div className="mx-2" />
    <SVGLetter src="/img/herosection/M.svg" width={60} height={80} />
    <SVGLetter src="/img/herosection/e.svg" width={60} height={80} />
  </div>
);

const SketchAvatar = () => (
  <img src="/img/herosection/kajul.svg" alt="Portrait" className="w-full h-full" />
);

export default function AboutSection({ fadeIn, scrollTo }) {
  return (
    <Section id="about" className="px-8 md:px-20 pt-20">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Portrait */}
        <div {...fadeIn("about", 0)} className="flex justify-center">
          <div className="relative w-72 h-96">
            <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]" viewBox="0 0 320 420" fill="none">
              <path d="M10 10 Q8 8 12 2 Q20 0 318 2 Q322 4 320 10 L320 410 Q320 418 312 420 Q8 420 8 418 L8 10"
                stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" strokeLinecap="round" />
              <path d="M0 0 L30 0 M0 0 L0 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M320 0 L290 0 M320 0 L320 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M0 420 L30 420 M0 420 L0 390" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M320 420 L290 420 M320 420 L320 390" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <SketchAvatar />
          </div>
        </div>

        {/* Text */}
        <div {...fadeIn("about", 0.2)}>
          <div className="mb-6">
            <AboutMeText />
          </div>
          <SketchUnderline width={140} />
          <p className="mt-6 text-white/60 text-sm leading-7 max-w-md">
            Front-End Developer focused on building responsive, visually engaging,
            and user-centered web experiences. Experienced in developing and deploying
            websites from design to implementation, with additional expertise in{" "}
            <span className="text-white/90">UI/UX</span> and{" "}
            <span className="text-white/90">AI prompting</span>.
          </p>
          <p className="mt-3 text-white/60 text-sm leading-7 max-w-md">
            Currently expanding into <span className="text-white/90">Cyber Security</span>,
            particularly penetration testing, with a security-first mindset.
            Information Technology student at{" "}
            <span className="text-white/90">Universitas Brawijaya</span>.
          </p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => scrollTo("Projects")}
              className="relative px-6 py-2 text-xs font-mono tracking-widest text-white group overflow-hidden"
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 36" preserveAspectRatio="none">
                <rect x="1" y="1" width="118" height="34" rx="2"
                  stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
              </svg>
              <span className="relative">VIEW WORK →</span>
            </button>
            <button
              onClick={() => scrollTo("Contact")}
              className="text-xs font-mono tracking-widest text-white/40 hover:text-white/80 transition-colors px-4 py-2"
            >
              CONTACT ME
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
