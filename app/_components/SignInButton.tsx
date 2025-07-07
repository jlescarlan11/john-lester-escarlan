"use client";

import { signIn } from "next-auth/react";
import React from "react";

interface SignInButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  provider?: string;
  callbackUrl?: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({ 
  children = "Sign In", 
  provider = "google",
  callbackUrl = "/",
  ...props 
}) => {
  return (
    <button
      type="button"
      onClick={() => signIn(provider, { callbackUrl })}
      {...props}
    >
      {children}
    </button>
  );
};

export default SignInButton;
