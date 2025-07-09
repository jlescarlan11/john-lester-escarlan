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