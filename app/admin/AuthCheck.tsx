import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { GET } from "../api/auth/[...nextauth]/route";

const AuthCheck = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(GET);
  if (!session) {
    redirect("/api/auth/signin/google");
    return null;
  }
  return <>{children}</>;
};

export default AuthCheck;
