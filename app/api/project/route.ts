import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(
      55,
      `Title must be 55 characters or less (currently ${
        z.string().length
      } characters)`
    ),
  description: z
    .string()
    .min(1, "Description is required")
    .max(
      255,
      `Description must be 255 characters or less (currently ${
        z.string().length
      } characters)`
    ),
  link: z
    .string()
    .min(1, "Link is required")
    .url("Please enter a valid URL (e.g., https://example.com)"),
  technology: z
    .string()
    .min(1, "Technologies are required")
    .max(200, "Technologies list is too long"),
  isFeatured: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = projectSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const technology = body.technology
    .split(",")
    .map((t: string) => t.trim().toLowerCase())
    .sort()
    .filter(Boolean);

  const newProject = await prisma.project.create({
    data: {
      title: body.title,
      description: body.description,
      link: body.link,
      technology: technology,
      isFeatured: body.isFeatured,
      preview: body.preview,
    },
  });

  return NextResponse.json(newProject, { status: 201 });
}
