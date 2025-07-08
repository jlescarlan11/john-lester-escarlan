"use client";

import { signOut } from "next-auth/react";
import React from "react";

interface SignOutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({
  children = "Log Out",
  ...props
}) => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => signOut({ callbackUrl: "/" })}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default SignOutButton;
