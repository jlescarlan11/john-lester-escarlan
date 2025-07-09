import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { prisma } from "@/prisma/client";
import { z } from "zod";
import { getCache, setCache, clearProjectCache } from "../_cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(55, "Title must be 55 characters or less"),
  description: z.string().min(1, "Description is required").max(255, "Description must be 255 characters or less"),
  link: z.string().min(1, "Link is required").url("Please enter a valid URL (e.g., https://example.com)"),
  technology: z.string().min(1, "Technologies are required").max(200, "Technologies list is too long"),
  isFeatured: z.coerce.boolean().default(false),
});

// Initialize Supabase client
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    // Extract fields
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const link = formData.get("link") as string | null;
    const technology = formData.get("technology") as string | null;
    const isFeaturedRaw = formData.get("isFeatured");
    const isFeatured = String(isFeaturedRaw) === "true";
    const preview = formData.get("preview") as File | null;

    // Validate input
    const validationResult = projectSchema.safeParse({
      title,
      description,
      link,
      technology,
      isFeatured,
    });
    if (!validationResult.success) {
      return NextResponse.json({
        error: "Validation failed",
        details: validationResult.error.errors,
      }, { status: 400 });
    }

    // Parse technology into array
    const technologyArray = technology!.split(",").map(t => t.trim()).filter(Boolean);

    // Handle image upload if present
    let imageUrl = "";
    if (preview && preview.size > 0) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(preview.type)) {
        return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." }, { status: 400 });
      }
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (preview.size > maxSize) {
        return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 });
      }
      // Upload to Supabase
      const fileExt = preview.name.split(".").pop();
      const fileName = `project_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("project-preview")
        .upload(fileName, preview);
      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return NextResponse.json({ error: "Failed to upload image", details: uploadError.message }, { status: 500 });
      }
      imageUrl = `${supabaseUrl}/storage/v1/object/public/project-preview/${fileName}`;
    }

    // Create project in DB
    const newProject = await prisma.project.create({
      data: {
        title: title!,
        description: description!,
        link: link!,
        technology: technologyArray,
        isFeatured,
        preview: imageUrl || null,
      },
    });

    // Invalidate project cache
    clearProjectCache();

    return NextResponse.json({
      success: true,
      data: newProject,
      message: "Project created successfully",
    });
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json({
      error: "Failed to create project",
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}

export async function GET() {
  // Use the request URL as cache key (no params here, so static)
  const cacheKey = "/api/project";
  const cached = getCache(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    const response = { success: true, data: projects };
    setCache(cacheKey, response);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}
