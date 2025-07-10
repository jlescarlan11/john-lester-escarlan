"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuDownload } from "react-icons/lu";
import { profileData, socialLinks } from "../_data/profile";
import Card from "../ui/Card";
import SectionNav from "./SectionNav";

const ProfileCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div ref={cardRef} className="relative">
      <Card
        className={`transition-all duration-300 p-6! z-20! sm:p-8! ease-in-out ${
          isExpanded ? "rounded-b-none border-b-0" : ""
        }`}
      >
        <div className="space-y-2">
          <div className="gap-y-2 flex items-start sm:items-center lg:block gap-x-4">
            <div className="flex justify-center">
              <Image
                src={profileData.avatar}
                className="rounded-lg size-20 lg:size-32"
                alt="Profile"
              />
            </div>
            <div className="flex flex-col gap-2  flex-1">
              <div className="flex items-start justify-between">
                <p className="lg:text-center text-sm sm:text-lg md:text-xl font-semibold">
                  {profileData.name}
                </p>
                {/* Arrow Button - right of name, only on mobile */}
                <button
                  className=" rounded-md hover:bg-base-300 transition-all duration-200 lg:hidden"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={
                    isExpanded ? "Collapse sections" : "Expand sections"
                  }
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </button>
              </div>
              <div className="flex lg:justify-center">
                <div className="badge badge-sm sm:badge-md badge-primary">
                  {profileData.role}
                </div>
              </div>
              {/* Social Links and Resume - always below role on mobile */}
              <div className="flex items-center gap-2 mt-1 lg:hidden">
                {socialLinks.map((socialLink, index) => {
                  const Icon = socialLink.icon;
                  return (
                    <Link
                      key={index}
                      href={socialLink.href}
                      className="flex items-center gap-2"
                    >
                      <Icon className="text-primary" />
                    </Link>
                  );
                })}
                <a
                  href="/resume.pdf"
                  download
                  className="btn btn-link flex items-center gap-2 p-0 min-h-0 h-auto"
                >
                  <LuDownload className="text-primary" />
                </a>
              </div>
            </div>
            {/* Remove the old Arrow Button and Social Links block here */}
          </div>

          {/* Bottom Social Links - Only visible on lg+ */}
          <div className="hidden lg:block">
            <div className="border-b border-base-content/20 w-full mt-4"></div>
            <div className="flex items-center justify-center flex-wrap gap-x-4">
              {socialLinks.map((socialLink, index) => {
                const Icon = socialLink.icon;
                return (
                  <Link
                    key={index}
                    href={socialLink.href}
                    className="flex items-center gap-2"
                  >
                    <Icon className="text-primary" />
                  </Link>
                );
              })}
              <div className="flex justify-center">
                <a
                  href="/resume.pdf"
                  download
                  className="btn btn-link flex items-center gap-2"
                >
                  <LuDownload />
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Accordion Section Navigation */}
      <div
        className={`overflow-hidden transition-all -mt-2 duration-300 z-10 ease-in-out text-xs! lg:hidden ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <SectionNav />
      </div>
    </div>
  );
};

export default ProfileCard;
