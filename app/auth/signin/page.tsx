"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignInButton from "../../_components/SignInButton";
import { useToast } from "../../_components/ToastContext";

const SigninPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      const allowedEmail =
        process.env.NEXT_PUBLIC_ADMIN_EMAIL || "11@gmail.com";
      const userEmail = session.user?.email;

      if (userEmail && userEmail.toLowerCase() !== allowedEmail.toLowerCase()) {
        showToast(
          "error",
          `Access denied. Only ${allowedEmail} is authorized to access the admin panel.`
        );
        // Sign out the unauthorized user
        router.push("/api/auth/signout");
      } else if (
        userEmail &&
        userEmail.toLowerCase() === allowedEmail.toLowerCase()
      ) {
        // Authorized user, redirect to admin
        router.push("/admin");
      }
    }
  }, [session, status, router, showToast]);

  return (
    <div className="min-h-dvh flex items-center justify-center ">
      <div className="max-w-md w-full space-y-8 p-8  bg-base-200 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Admin Access</h2>
          <p className="text-neutral-content/40 mb-6">
            Only authorized administrators can access this area.
          </p>
        </div>
        <SignInButton
          className="w-full btn btn-primary font-medium"
          aria-label="Log in with Google"
        >
          Sign In with Google
        </SignInButton>
      </div>
    </div>
  );
};

export default SigninPage;
