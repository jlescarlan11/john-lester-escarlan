import AuthCheck from "./AuthCheck";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthCheck>
      <div className="container max-w-7xl mx-auto py-4 lg:py-8 px-4">
        {children}
      </div>
    </AuthCheck>
  );
}
