"use client";
import { useState, useEffect, useCallback } from "react";
import AddProjectModal from "./AddProjectModal";
import EditProjectModal from "./EditProjectModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import axios from "axios";
import { useToast } from "../../_components/ToastContext";
import Breadcrumbs from "../../_components/Breadcrumbs";
import SearchInput from "../../_components/SearchInput";

interface Project {
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

const ProjectPageClient = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { showToast } = useToast();
  const [search, setSearch] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedProject(null);
  };
  const openDeleteModal = (project: Project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setProjectToDelete(null);
    setDeleteLoading(false);
  };

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/project");
      const result = response.data;
      if (result.success) {
        setProjects(result.data);
      } else {
        showToast("error", "Failed to fetch projects");
      }
    } catch (err) {
      console.log("fetchProjects error:", err);
      showToast("error", "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Delete project
  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`/api/project/${projectToDelete.id}`);
      const result = response.data;
      if (result.success) {
        setProjects(
          projects.filter((project) => project.id !== projectToDelete.id)
        );
        closeDeleteModal();
        showToast(
          "success",
          `Project "${projectToDelete.title}" deleted successfully`
        );
      } else {
        showToast("error", "Failed to delete project");
      }
    } catch {
      showToast("error", "Failed to delete project");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Handle project updates
  const handleProjectUpdated = () => {
    fetchProjects();
    showToast("success", "Projects loaded successfully");
  };

  // Load projects on component mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Refresh projects after adding new one
  const handleProjectAdded = () => {
    fetchProjects();
    showToast("success", "Projects loaded successfully");
  };

  // Filter projects by search term (case-insensitive, matches title)
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Breadcrumbs />
      <div className="mb-6">
        <h1 className="text-4xl font-bold">Project Management</h1>
      </div>
      <div className="flex gap-2 w-full justify-between sm:w-auto">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search projects..."
        />
        <button
          className="btn btn-primary"
          onClick={openModal}
          disabled={loading}
        >
          Add New Project
        </button>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, index) => (
              <tr key={project.id}>
                <th>{index + 1}</th>
                <td className="font-medium">{project.title}</td>
                <td>
                  {project.isFeatured ? (
                    <span className="badge badge-success">Featured</span>
                  ) : (
                    <span className="badge badge-neutral">Regular</span>
                  )}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => openEditModal(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => openDeleteModal(project)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!loading && filteredProjects.length === 0 && (
        <div className="text-center py-8">
          <p className="text-base-content/40">
            No projects found. Try a different search or add your first project!
          </p>
        </div>
      )}
      <AddProjectModal
        open={modalOpen}
        onClose={closeModal}
        onProjectAdded={handleProjectAdded}
      />
      <EditProjectModal
        open={editModalOpen}
        onClose={closeEditModal}
        project={selectedProject}
        onProjectUpdated={handleProjectUpdated}
      />
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteProject}
        projectTitle={projectToDelete?.title || ""}
        loading={deleteLoading}
      />
    </div>
  );
};

export default ProjectPageClient;
