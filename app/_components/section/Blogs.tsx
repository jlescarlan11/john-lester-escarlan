"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "../common/SectionHeader";
import axios from "axios";
import { LuClock, LuExternalLink } from "react-icons/lu";
import Link from "next/link";
import SectionIntro from "../common/SectionIntro";

// Define Blog type based on actual API response
interface Blog {
  id: string;
  title: string;
  content: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    email: string;
  };
}

const BlogsSection = () => {
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setBlogData(res.data.data || []);
      } catch {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blogs">
      <SectionHeader>Blogs</SectionHeader>
      <SectionIntro>
        I write about solving real problems I encounter - whether debugging
        code, learning new skills, or tackling personal challenges. My posts
        focus on practical approaches that actually work.
      </SectionIntro>
      <div className="space-y-8">
        <ul className="list rounded-box shadow-md">
          {/* <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Latest blog this week
          </li> */}
          {loading && <li className="p-4">Loading...</li>}
          {error && <li className="p-4 text-red-500">{error}</li>}
          {!loading && !error && blogData.length === 0 && (
            <li className="p-4">No blogs found.</li>
          )}

          {!loading &&
            !error &&
            blogData.map((blog, idx) => (
              <li className="list-row" key={blog.id}>
                <div className="text-4xl font-thin opacity-30 tabular-nums">
                  {(idx + 1).toString().padStart(2, "0")}
                </div>
                <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content size-10 rounded-full">
                    <span className="">{blog.title.charAt(0)}</span>
                  </div>
                </div>
                <div className="list-col-grow">
                  <div>{blog.title}</div>
                  <div className="text-xs opacity-60 flex gap-1 items-center">
                    <span>
                      <LuClock />
                    </span>
                    {blog.readTime} min read
                  </div>
                </div>
                <p className="list-col-wrap text-xs line-clamp-2">
                  {blog.content}
                </p>

                <a
                  href={`https://blog-it-gamma.vercel.app/blogs/${blog.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-link"
                >
                  <LuExternalLink />
                </a>
              </li>
            ))}
        </ul>
        <div>
          <Link
            href="https://blog-it-gamma.vercel.app/profile/cmbnkpuc50000lb046mafuutr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary relative inline-block group"
          >
            View more blogs →
            <span
              className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
