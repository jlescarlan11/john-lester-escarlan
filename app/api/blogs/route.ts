import { NextResponse } from "next/server";
import axios from "axios";
import { getCache, setCache } from "../_cache";

const BLOG_API_URL =
  "https://blog-it-gamma.vercel.app/api/blogs?email=jlescarlan11@gmail.com";
const CACHE_KEY = "/api/blogs";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export async function GET() {
  // Check cache first
  const cached = getCache(CACHE_KEY);
  if (cached) {
    return NextResponse.json({ success: true, data: cached });
  }
  try {
    const { data } = await axios.get(BLOG_API_URL);
    // Assume data.blogs is the array of blogs
    const blogs = Array.isArray(data.blogs) ? data.blogs.slice(0, 3) : [];
    // Set cache for 1 DAY
    setCache(CACHE_KEY, blogs, ONE_DAY_MS);
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
