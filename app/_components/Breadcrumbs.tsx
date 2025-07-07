"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumbs = () => {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = idx === segments.length - 1;
    return (
      <li key={href}>
        {isLast ? (
          label
        ) : (
          <Link href={href}>{label}</Link>
        )}
      </li>
    );
  });

  return (
    <div className="breadcrumbs text-sm mb-4">
      <ul>
        <li><Link href="/">Home</Link></li>
        {crumbs}
      </ul>
    </div>
  );
};

export default Breadcrumbs; 