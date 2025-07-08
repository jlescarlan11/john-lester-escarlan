"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, Suspense } from "react";
import { useToast } from "../../_components/ToastContext";

function AuthErrorContent() {
  const params = useSearchParams();
  const error = params.get("error");
  const { showToast } = useToast();

  useEffect(() => {
    if (error === "AccessDenied") {
      showToast("error", "You are not authorized to access the admin panel.");
    } else if (error) {
      showToast("error", "An authentication error occurred.");
    }
  }, [error, showToast]);

  return (
    <div className="min-h-dvh flex items-center justify-center ">
      <div className="max-w-md w-full space-y-8 p-8  bg-base-200 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-error mb-2">Access Denied</h2>
          <p className="text-neutral-content/40 mb-6">
            {error === "AccessDenied"
              ? "You are not authorized to access the admin panel."
              : "An authentication error occurred."}
          </p>
        </div>
        <Link
          href="/auth/signin"
          className="w-full btn btn-primary font-medium"
          aria-label="Go back to Sign In page"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
