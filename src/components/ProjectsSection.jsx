import { useState } from 'react';
import { Section, SketchUnderline, SkillTag } from '../shared';

const projects = [
  {
    title: "Project Alpha",
    desc: "A responsive web app with focus on accessibility and performance optimization.",
    tags: ["React", "Tailwind"],
    year: "2024",
    delay: 0.1,
  },
  {
    title: "SecureBoard",
    desc: "Dashboard for monitoring and visualizing vulnerability scan results.",
    tags: ["Next.js", "TypeScript"],
    year: "2024",
    delay: 0.2,
  },
  {
    title: "UI System",
    desc: "Modular design system built from scratch with Figma and React.",
    tags: ["Figma", "React"],
    year: "2023",
    delay: 0.3,
  },
  {
    title: "PenTest Toolkit",
    desc: "Personal collection of scripts and utilities for security assessments.",
    tags: ["Python", "Bash"],
    year: "2024",
    delay: 0.15,
  },
  {
    title: "Portfolio v1",
    desc: "Previous iteration of personal portfolio with experimental animations.",
    tags: ["HTML", "CSS", "JS"],
    year: "2023",
    delay: 0.25,
  },
  {
    title: "AI Prompt Lab",
    desc: "Experiments in prompt engineering for development efficiency.",
    tags: ["AI", "Prompting"],
    year: "2025",
    delay: 0.35,
  },
];

function ProjectCard({ title, desc, tags, year }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative p-6 cursor-default transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="1" y="1" width="98" height="98" rx="2"
          stroke={hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)"}
          strokeWidth="0.5" fill="none" strokeLinecap="round"
          style={{ transition: "stroke 0.3s" }} />
        {hovered && <>
          <path d="M1 1 L8 1 M1 1 L1 8" stroke="white" strokeWidth="1" strokeLinecap="round" />
          <path d="M99 1 L92 1 M99 1 L99 8" stroke="white" strokeWidth="1" strokeLinecap="round" />
          <path d="M1 99 L8 99 M1 99 L1 92" stroke="white" strokeWidth="1" strokeLinecap="round" />
          <path d="M99 99 L92 99 M99 99 L99 92" stroke="white" strokeWidth="1" strokeLinecap="round" />
        </>}
      </svg>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-mono text-white text-sm tracking-wide">{title}</h3>
          <span className="font-mono text-white/30 text-xs">{year}</span>
        </div>
        <p className="text-white/50 text-xs leading-relaxed mb-4 font-light">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => <SkillTag key={t} label={t} />)}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ fadeIn }) {
  return (
    <Section id="projects" className="px-8 md:px-20">
      <div className="max-w-6xl mx-auto w-full">
        <div {...fadeIn("projects", 0)}>
          <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Georgia', serif" }}>Projects</h2>
          <SketchUnderline width={110} />
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(({ delay, ...project }) => (
            <div key={project.title} {...fadeIn("projects", delay)}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
