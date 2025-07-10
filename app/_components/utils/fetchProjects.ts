import axios from "axios";

export interface Project {
  id: string;
  title: string;
  description: string;
  technology: string[];
  link: string;
  isFeatured: boolean;
  preview?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FetchProjectsResult {
  success: boolean;
  data: Project[];
  error?: string;
}

export async function fetchProjects(): Promise<FetchProjectsResult> {
  try {
    const response = await axios.get("/api/project");
    return response.data;
  } catch (error) {
    return {
      success: false,
      data: [],
      error: (error as Error).message || "Unknown error",
    };
  }
}

// Shared function to get top 3 featured projects, sorted by createdAt desc
export async function fetchFeaturedProjects(): Promise<Project[]> {
  const result = await fetchProjects();
  if (!result.success) return [];
  return result.data
    .filter((project) => project.isFeatured)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
} 