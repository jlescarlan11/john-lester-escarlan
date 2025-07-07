"use client";

import { signOut } from "next-auth/react";
import React from "react";

interface SignOutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ children = "Log Out", ...props }) => {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      {...props}
    >
      {children}
    </button>
  );
};

export default SignOutButton; 