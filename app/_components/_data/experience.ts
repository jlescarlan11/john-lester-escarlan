export interface ExperienceData {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  logo: string;
}

export const experienceLists: ExperienceData[] = [
  {
    company: "Alliance Software Inc.",
    position: "Software Developer",
    duration: "Jan 2024 - Present",
    description:
      "Developing and maintaining web applications using modern technologies. Collaborating with cross-functional teams to deliver high-quality software solutions.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    logo: "/alliance-logo.svg",
  },
  {
    company: "Wind's Gate Philippines",
    position: "Frontend Developer",
    duration: "Jun 2023 - Dec 2023",
    description:
      "Built responsive user interfaces and implemented modern web development practices. Worked on Japanese client projects with focus on quality and performance.",
    technologies: ["React", "JavaScript", "CSS3", "HTML5", "Git"],
    logo: "/windsgate-logo.svg",
  },
];
