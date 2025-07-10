"use client";
import { navigationItems } from "../_data/sectionNav";
import Card from "../ui/Card";
import React, { useEffect, useState } from "react";

const SectionNav = () => {
  const [activeSection, setActiveSection] = useState<string>(
    navigationItems[0].id
  );

  useEffect(() => {
    const handleScroll = () => {
      const offsets = navigationItems.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: Math.abs(rect.top) };
      });
      // Find the section closest to the top (but not past it)
      const visible = offsets.reduce(
        (prev, curr) => (curr.top < prev.top ? curr : prev),
        offsets[0]
      );
      setActiveSection(visible.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card className="p-4! bg-base-100! lg:bg-base-200! rounded-t-none lg:rounded-2xl! lg:p-8! drop-shadow-sm!">
      <div className="space-y-4 ">
        <ul className="flex justify-center lg:justify-start flex-row lg:flex-col gap-2 lg:gap-1">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                className={`text-left flex gap-2 w-full transition-colors duration-300
                  ${activeSection === item.id ? "text-primary font-bold" : ""}
                  hover:text-secondary
                `}
                style={{ transitionProperty: "color, background-color" }}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? "true" : undefined}
              >
                <span className="hidden lg:block">
                  {activeSection === item.id ? "━━ " : "━ "}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default SectionNav;
