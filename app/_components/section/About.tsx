import React from "react";
import SectionHeader from "../common/SectionHeader";
import techs, { aboutDescription } from "../_data/about";
import TechIcons from "../common/TechIcons";

const AboutSection = () => {
  return (
    <section id="about" className="">
      <SectionHeader>About</SectionHeader>
      <div className="space-y-2">
        {aboutDescription.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
        <p>Here are the tools I use to build things that work:</p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className={`badge badge-sm sm:badge-md badge-neutral  cursor-pointer relative group transition-all duration-200 col-span-1`}
              tabIndex={0}
            >
              <span className="flex gap-1 items-center font-medium text-center">
                <span className="">
                  <TechIcons icon={tech.icon} />
                </span>
                {tech.name}
              </span>
              {/* Tooltip */}
              <div className="absolute z-10 left-1/2 -translate-x-1/2 top-full mt-2 w-56 p-2 rounded shadow-lg bg-base-200 text-xs text-left opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto transition-all duration-200 border border-base-300">
                {tech.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
