"use client";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../_components/Breadcrumbs";
import SectionHeader from "../_components/common/SectionHeader";
import { fetchProjects, Project } from "../_components/utils/fetchProjects";
import { LuExternalLink } from "react-icons/lu";
import Link from "next/link";
import SectionIntro from "../_components/common/SectionIntro";

const ArchivePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      setError("");
      const result = await fetchProjects();
      if (result.success) {
        setProjects(result.data);
      } else {
        setError("Failed to fetch projects");
      }
      setLoading(false);
    };
    fetchAllProjects();
  }, []);

  return (
    <div className="space-y-4">
      <Breadcrumbs />
      <SectionHeader>Project Archive</SectionHeader>
      <SectionIntro>
        A collection of projects that demonstrate my problem-solving approach
        and technical range. Each one tackled different challenges and taught me
        something new.
      </SectionIntro>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="text-center py-8">
                  Loading projects...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={4} className="text-center text-error py-8">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && projects.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8">
                  No projects found.
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              projects.map((project, idx) => (
                <tr key={project.id}>
                  <th>{idx + 1}</th>
                  <td className="font-medium">{project.title}</td>
                  <td className="line-clamp-1">{project.description}</td>
                  <td>
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
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArchivePage;
