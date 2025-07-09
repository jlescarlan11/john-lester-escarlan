export interface EducationData {
  institution: string;
  degree: string;
  duration: string;
  description: string[];
  logo: string;
}

export const educationLists: EducationData[] = [
  {
    institution: "University of the Philippines Cebu",
    degree: "Bachelor of Science in Computer Science",
    duration: "2025 - present",
    description: [
      "Building on my mathematical foundation to develop robust software solutions.",
      "Currently learning engineering principles, and system design.",
    ],
    logo: "/up-logo.svg",
  },
  {
    institution: "University of the Philippines Cebu",
    degree: "Bachelor of Science in Mathematics",
    duration: "2022 - 2025",
    description: [
      "Focused on computational methods, algorithm analysis, and mathematical modeling.",
      "Applied problem-solving skills to programming challenges.",
      "Developed strong logical reasoning abilities that directly translate to writing efficient code.",
    ],
    logo: "/up-logo.svg",
  },
];
