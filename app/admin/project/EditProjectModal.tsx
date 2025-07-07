"use client";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useToast } from "../../_components/ToastContext";

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

type EditProjectModalProps = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  onProjectUpdated: () => void;
};

const EditProjectModal: React.FC<EditProjectModalProps> = ({ 
  open, 
  onClose, 
  project, 
  onProjectUpdated 
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { showToast } = useToast();

  // Form state
  const [preview, setPreview] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation constants
  const MAX_TITLE_LENGTH = 55;
  const MAX_DESCRIPTION_LENGTH = 255;
  const MAX_TECHNOLOGIES_LENGTH = 200;

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!open && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [open]);

  // Populate form when project data is available
  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setLink(project.link);
      setTechnologies(project.technology.join(", "));
      setIsFeatured(project.isFeatured);
      setPreview(null);
      setError(null);
      setPreviewUrl(project.preview || null);
    }
  }, [project]);

  useEffect(() => {
    if (preview) {
      const url = URL.createObjectURL(preview);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (project && project.preview) {
      setPreviewUrl(project.preview);
    } else {
      setPreviewUrl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  const handleClose = () => {
    onClose();
    setPreview(null);
    setTitle("");
    setDescription("");
    setLink("");
    setTechnologies("");
    setIsFeatured(false);
    setError(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setPreviewUrl(null);
  };

  const validateForm = () => {
    if (title.length > MAX_TITLE_LENGTH) {
      setError(`Title must be ${MAX_TITLE_LENGTH} characters or less`);
      return false;
    }
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      setError(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`);
      return false;
    }
    if (technologies.length > MAX_TECHNOLOGIES_LENGTH) {
      setError(`Technologies must be ${MAX_TECHNOLOGIES_LENGTH} characters or less`);
      return false;
    }
    if (!title.trim() || !description.trim() || !link.trim() || !technologies.trim()) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) {
      setError("No project selected for editing");
      return;
    }
    setError(null);
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("link", link);
      formData.append("technology", technologies);
      formData.append("isFeatured", isFeatured.toString());
      if (preview) {
        formData.append("preview", preview);
      }
      const response = await axios.put(`/api/project/${project.id}`, formData);
      const result = response.data;
      if (!response.status || !result.success) {
        if (result.details && Array.isArray(result.details)) {
          const errorMessages = result.details.map((detail: { message: string }) => detail.message).join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(result.error || `HTTP ${response.status}`);
      }
      showToast("success", "Project updated successfully!");
      onProjectUpdated();
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to update project");
        showToast("error", err.message || "Failed to update project");
      } else {
        setError("Failed to update project");
        showToast("error", "Failed to update project");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!project) {
    return null;
  }

  return (
    <dialog ref={dialogRef} className="modal" onClose={handleClose}>
      <div className="modal-box max-w-lg p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Image Upload Area */}
        <div className="bg-neutral/40 flex flex-col items-center relative">
          {previewUrl ? (
            <div className="w-full relative">
              <Image
                src={previewUrl}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md shadow-md"
                style={{ filter: "brightness(0.8)" }}
                width={160}
                height={160}
              />
              <button
                type="button"
                className="absolute top-2 right-2 btn btn-primary w-8 h-8 flex items-center justify-center z-10"
                onClick={handleRemoveImage}
                aria-label="Remove image"
              >
                &times;
              </button>
            </div>
          ) : (
            <label className="w-full flex flex-col items-center justify-center cursor-pointer h-40 border-2 border-dashed border-accent/20 rounded-md bg-neutral/80 hover:bg-neutral/60 transition-colors">
              <span className="flex flex-col items-center gap-2">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16V8a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12l2 2 4-4m0 0l2 2m-2-2l-2 2"
                  />
                </svg>
                <span className="font-medium">Upload image as cover</span>
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
        {/* Form Area */}
        <form
          onSubmit={handleSubmit}
          className="px-8 pt-4 pb-6 flex flex-col gap-4 overflow-y-auto flex-1"
        >
          <h2 className="text-2xl font-bold text-center mb-2">Edit Project</h2>
          <div>
            <label className="block font-medium mb-1">Project Title:</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={MAX_TITLE_LENGTH}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description:</label>
            <textarea
              className="textarea textarea-bordered w-full min-h-[100px]"
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={MAX_DESCRIPTION_LENGTH}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Link:</label>
            <input
              type="url"
              className="input input-bordered w-full"
              value={link}
              onChange={e => setLink(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Technologies:</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={technologies}
              onChange={e => setTechnologies(e.target.value)}
              placeholder="React, TypeScript, Node.js"
              maxLength={MAX_TECHNOLOGIES_LENGTH}
              required
            />
          </div>
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={isFeatured}
                onChange={e => setIsFeatured(e.target.checked)}
              />
              <span className="font-medium">Featured Project</span>
            </label>
          </div>
          {error && (
            <div className="alert alert-error">
              <span className="whitespace-pre-wrap">{error}</span>
            </div>
          )}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="btn btn-neutral flex-1"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn flex-1 btn-primary"
              disabled={loading}
            >
              {loading ? <span className="loading loading-dots loading-xs"></span> : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditProjectModal; 