"use client";
import React, { useRef, useEffect } from "react";

type DeleteConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectTitle: string;
  loading?: boolean;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  projectTitle,
  loading = false,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!open && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [open]);

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!loading) {
      onConfirm();
    }
  };

  return (
    <dialog ref={dialogRef} className="modal" onClose={handleClose}>
      <div className="modal-box flex flex-col items-center text-center">
        <div className="py-4 w-full">
          <p className=" mb-4">Are you sure you want to delete the project</p>
          <p className="font-semibold text-lg text-error mb-4">
            &quot;{projectTitle}&quot;
          </p>
          <p className="text-xs text-error/50">
            This action cannot be undone. The project will be permanently
            removed from your portfolio.
          </p>
        </div>

        <div className="modal-action flex justify-between w-full">
          <button
            type="button"
            className="btn btn-neutral hover:bg-neutral-focus border-none flex-1 mr-2"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-error flex-1 ml-2"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? <span className="loading loading-dots loading-xs"></span> : "Delete Project"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteConfirmationModal; 