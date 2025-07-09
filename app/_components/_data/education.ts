export interface EducationData {
  institution: string;
  degree: string;
  duration: string;
  description: string;
  logo: string;
}

export const educationLists: EducationData[] = [
  {
    institution: "University of the Philippines Cebu",
    degree: "Bachelor of Science in Computer Science",
    duration: "2025 - present",
    description:
      "Shifted from Mathematics to Computer Science to hone my technical skills",
    logo: "/up-logo.svg",
  },
  {
    institution: "University of the Philippines Cebu",
    degree: "Bachelor of Science in Mathematics",
    duration: "2022 - 2025",
    description:
      "Studied advanced mathematics with focus on computational methods and problem-solving. Developed strong analytical and logical thinking skills.",
    logo: "/up-logo.svg",
  },
];
