"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";
import SectionHeader from "../common/SectionHeader";
import { useToast } from "../ToastContext";
import { fetchProjects, Project } from "../utils/fetchProjects";
import { navigationItems } from "../_data/sectionNav";
import techStacks from "../common/techStacks";
import TechIcons from "../common/TechIcons";
import SectionIntro from "../common/SectionIntro";

const PortfolioSection = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const sectionIndex = navigationItems.findIndex(
    (item) => item.id === "portfolio"
  );

  const fetchAndSetProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchProjects();
    if (result.success) {
      setProjects(result.data);
    } else {
      setError("Failed to fetch projects");
      showToast("error", "Failed to fetch projects");
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchAndSetProjects();
  }, [fetchAndSetProjects]);

  // Filter, sort, and select top 3 latest featured projects
  const featuredProjects = projects
    .filter((project) => project.isFeatured)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <section id="portfolio" className="pt-8 space-y-4">
      <SectionHeader>
        {navigationItems[sectionIndex]?.label || "Portfolio"}
      </SectionHeader>

      {loading && (
        <div className="text-center py-8">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 opacity-60">Loading projects...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-error">{error}</p>
          <p className="text-sm opacity-60 mt-2">
            Please try refreshing the page
          </p>
        </div>
      )}

      {!loading && !error && featuredProjects.length === 0 && (
        <div className="text-center py-8">
          <p className="opacity-60">No featured projects available</p>
        </div>
      )}

      <SectionIntro>
        Here are some web applications I&apos;ve built that solve real problems.
        Each project taught me something new about creating software that people
        find useful.
      </SectionIntro>

      {!loading && !error && featuredProjects.length > 0 && (
        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`relative md:grid md:grid-cols-5 justify-center items-center gap-4 md:gap-8 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image - order changes based on index */}
              <div
                className={`col-span-3 ${
                  index % 2 !== 0 ? "md:order-2" : ""
                } relative h-[225px]`}
              >
                <div className="absolute inset-0 bg-neutral/40 hover:opacity-0 transition-opacity duration-300 rounded-lg z-10"></div>
                <Image
                  width={550}
                  height={225}
                  src={
                    project.preview ||
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'%3E%3Crect width='500' height='500' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='16'%3ENo Preview%3C/text%3E%3C/svg%3E"
                  }
                  alt={`Preview image of ${project.title}`}
                  className="rounded-lg object-cover w-full h-full"
                  style={{ height: "225px" }}
                />
                {/* Overlay content for small screens - fully contained in image */}
                <div
                  className="md:hidden absolute inset-0 flex flex-col justify-center items-start bg-base-200/90 p-4 rounded-lg z-20 overflow-auto"
                  style={{ maxHeight: "225px" }}
                >
                  <span className="text-xs text-primary mb-2">
                    Featured Project
                  </span>
                  <h3 className="text-base sm:text-2xl font-bold mb-3 text-left">
                    {project.title}
                  </h3>
                  <div className=" text-xs sm:text-base mb-4 text-left opacity-90">
                    {project.description}
                  </div>
                  <ul className="flex gap-2 text-xs flex-wrap opacity-80 rounded sm:py-1 mb-4 justify-start">
                    {project.technology.map((tech, techIndex) => {
                      const techData = techStacks[tech];
                      if (!techData) return null;
                      return (
                        <div
                          key={techIndex}
                          className="badge badge-xs sm:badge-md badge-neutral cursor-pointer relative group transition-all duration-200 col-span-1"
                          tabIndex={0}
                        >
                          <span className="flex gap-1 items-center font-medium text-center">
                            <span>
                              <TechIcons icon={techData.icon} />
                            </span>
                            {techData.name}
                          </span>
                          {/* Tooltip */}
                          <div className="absolute z-10 left-1/2 -translate-x-1/2 top-full mt-2 w-56 p-2 rounded shadow-lg bg-base-200 text-xs text-left opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto transition-all duration-200 border border-base-300">
                            {techData.description}
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                  <div className="flex gap-4 sm:mt-2">
                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-link p-0 min-h-0 h-auto"
                        aria-label="External Link"
                      >
                        <LuExternalLink size={16} />
                      </Link>
                    )}
                    {/* Add more icons/links here if needed */}
                  </div>
                </div>
              </div>

              {/* Content - order changes based on index, only visible on md+ */}
              <div
                className={`hidden md:flex flex-col space-y-2 col-span-2 ${
                  index % 2 !== 0 ? "md:order-1 items-start" : "items-end"
                }`}
              >
                <div
                  className={`flex flex-col ${
                    index % 2 !== 0 ? "items-start" : "items-end"
                  }`}
                >
                  <span className="text-xs text-primary">Featured Project</span>
                  <h3
                    className={`flex flex-col text-xl font-semibold ${
                      index % 2 !== 0 ? "text-start" : "text-end"
                    }`}
                  >
                    {project.title}
                  </h3>
                </div>
                <div
                  className={`${
                    index % 2 !== 0 ? "-mr-20 ml-0" : "-ml-20 mr-0"
                  } bg-base-200 p-4 rounded-lg z-10 relative`}
                >
                  {project.description}
                </div>
                <ul
                  className={`flex gap-2 text-xs flex-wrap opacity-60 rounded py-1 ${
                    index % 2 !== 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  {project.technology.map((tech, techIndex) => {
                    const techData = techStacks[tech];
                    if (!techData) return null;
                    return (
                      <div
                        key={techIndex}
                        className="badge badge-sm sm:badge-md badge-neutral cursor-pointer relative group transition-all duration-200 col-span-1"
                        tabIndex={0}
                      >
                        <span className="flex gap-1 items-center font-medium text-center">
                          <span>
                            <TechIcons icon={techData.icon} />
                          </span>
                          {techData.name}
                        </span>
                        {/* Tooltip */}
                        <div className="absolute z-10 left-1/2 -translate-x-1/2 top-full mt-2 w-56 p-2 rounded shadow-lg bg-base-200 text-xs text-left opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto transition-all duration-200 border border-base-300">
                          {techData.description}
                        </div>
                      </div>
                    );
                  })}
                </ul>
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link"
                  >
                    <LuExternalLink />
                  </Link>
                )}
              </div>
            </div>
          ))}
          <div>
            <Link
              href="/archive"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary relative inline-block group"
            >
              View more in archive →
              <span
                className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
