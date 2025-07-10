import { prisma } from "@/prisma/client";
import techStacks from "../common/techStacks";
import { Project } from "../utils/fetchProjects";
import { educationLists } from "./education";
import { experienceLists } from "./experience";
import { contactInfo, profileData } from "./profile";
import techCategories from "./techStack";
import { aboutDescription } from "./about";

export const baseResumeData = {
  // Profile
  name: profileData.name,
  role: profileData.role,
  location: contactInfo.location,
  email: contactInfo.email,
  phone: contactInfo.phone,
  website: contactInfo.website,
  linkedin: contactInfo.linkedin,
  github: contactInfo.github,

  // About
  about: aboutDescription,

  // Education
  education: educationLists,

  // Experience
  experience: experienceLists,

  // Technologies (flattened for LaTeX)
  technologies: techCategories.map((cat) => ({
    title: cat.title,
    items: cat.items.map(
      (item) => techStacks[item.name.toLowerCase()]?.name || item.name
    ),
  })),

  // Certifications & Awards (dummy)
  certifications: [
    { year: "2024", title: "DOST JLSS Scholar" },
    { year: "2023", title: "University Scholar" },
    { year: "2022-2023", title: "College Scholar" },
    { year: "2021", title: "Best in Mathematics & Statistics" },
    { year: "2020", title: "Graduated with Honors" },
  ],
};

export type ResumeData = typeof baseResumeData & { projects: Project[] };

export async function getResumeData(): Promise<ResumeData> {
  // Fetch top 3 featured projects directly from the database
  const dbProjects = await prisma.project.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  // Convert Date fields to string for Project type compatibility
  const projects: Project[] = dbProjects.map((p) => ({
    ...p,
    createdAt:
      p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
    updatedAt:
      p.updatedAt instanceof Date ? p.updatedAt.toISOString() : p.updatedAt,
  }));
  return {
    ...baseResumeData,
    projects,
  };
}
