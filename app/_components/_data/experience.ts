export interface ExperienceData {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
  logo: string;
}

export const experienceLists: ExperienceData[] = [
  {
    company: "Wind's Gate Philippines",
    position: "Part Time Monitoring Team",
    duration: "Jun 2025 - Dec 2025",
    description: [
      "Monitored and diagnosed system errors across databases, crypto, and various platforms.",
      "Learned Nihongo to interpret error messages and technical documentation.",
      "Identified patterns in system failures and documented solutions for the development team.",
    ],
    technologies: ["slack", "java"],
    logo: "/windsgate-logo.svg",
  },
  {
    company: "Alliance Software Inc.",
    position: "Software Developer Intern",
    duration: "Jun 2025 - July 2025",
    description: [
      "Developed and maintain web applications using C# and ASP.NET for client projects.",
      "Collaborate with cross-functional teams to deliver software solutions on schedule.",
      "Apply project management principles to ensure code quality and meet deadlines.",
    ],
    technologies: ["asp", "csharp", "bootstrap", "supabase"],
    logo: "/alliance-logo.svg",
  },
];
