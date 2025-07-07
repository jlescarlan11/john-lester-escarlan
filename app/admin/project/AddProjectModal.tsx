"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useToast } from "../../_components/ToastContext";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onProjectAdded?: () => void;
}

const MAX_TITLE_LENGTH = 55;
const MAX_DESCRIPTION_LENGTH = 255;
const MAX_TECHNOLOGIES_LENGTH = 200;

const AddProjectModal: React.FC<AddProjectModalProps> = ({ open, onClose, onProjectAdded }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [preview, setPreview] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [technology, setTechnology] = useState("");
  const [isFeatured, setIsFeatured] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!open && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [open]);

  useEffect(() => {
    if (preview) {
      const url = URL.createObjectURL(preview);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [preview]);

  const handleClose = () => {
    onClose();
    setPreview(null);
    setTitle("");
    setDescription("");
    setLink("");
    setTechnology("");
    setIsFeatured(true);
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
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
    if (technology.length > MAX_TECHNOLOGIES_LENGTH) {
      setError(`Technologies must be ${MAX_TECHNOLOGIES_LENGTH} characters or less`);
      return false;
    }
    if (!title.trim() || !description.trim() || !link.trim() || !technology.trim()) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("link", link);
      formData.append("technology", technology);
      formData.append("isFeatured", isFeatured.toString());
      if (preview) formData.append("preview", preview);
      const response = await axios.post("/api/project", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const result = response.data;
      if (!result.success) {
        if (result.details && Array.isArray(result.details)) {
          const errorMessages = result.details
            .map((detail: unknown) => {
              if (typeof detail === 'object' && detail !== null && 'message' in detail) {
                return (detail as { message: string }).message;
              }
              return '';
            })
            .filter(Boolean)
            .join(", ");
          showToast("error", errorMessages);
          throw new Error(errorMessages);
        }
        showToast("error", result.error || "Unknown error");
        throw new Error(result.error || "Unknown error");
      }
      showToast("success", "Project added successfully");
      if (onProjectAdded) onProjectAdded();
      handleClose();
    } catch (err: unknown) {
      let errorMessage = "Failed to create project";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setError(errorMessage);
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
                className="absolute top-2 right-2 btn  btn-primary    w-8 h-8 flex items-center justify-center z-10"
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
          <h2 className="text-2xl font-bold text-center mb-2">Add Project</h2>
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
              value={technology}
              onChange={e => setTechnology(e.target.value)}
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
              className="btn flex-1 btn-neutral"
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
              {loading ? <span className="loading loading-dots loading-xs"></span> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddProjectModal; 