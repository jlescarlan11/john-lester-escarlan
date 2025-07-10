import Image from "next/image";
import React from "react";
import { LuArrowRight } from "react-icons/lu";
import techStacks from "../common/techStacks";
import TechIcons from "../common/TechIcons";

export interface TimelineItem {
  logo: string;
  duration: string;
  name: string; // company or institution
  title: string; // position or degree
  description: string[];
  technologies?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => (
  <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical">
    {items.map((item, index) => (
      <li key={index}>
        {index !== 0 && <hr className="bg-neutral" />}
        <div className="timeline-middle">
          <Image
            src={item.logo}
            width={64}
            height={64}
            className="rounded-full"
            alt={`${item.name} logo`}
          />
        </div>
        <div className="timeline-end mb-8 ml-4">
          <time className="font-mono italic text-xs">{item.duration}</time>
          <div className="text-lg font-black text-primary">{item.name}</div>
          <div className="font-mono text-xs text-base-content">
            {item.title}
          </div>

          {item.technologies && item.technologies.length > 0 && (
            <ul className="flex gap-2 text-xs flex-wrap opacity-60 rounded py-1 mt-2">
              {item.technologies.map((tech, techIndex) => {
                const techData = techStacks[tech];

                if (!techData) return null;
                return (
                  <div
                    key={techIndex}
                    className="badge badge-sm sm:badge-md badge-neutral cursor-pointer relative group transition-all duration-200 col-span-1"
                    tabIndex={0}
                  >
                    <span className="flex gap-1 items-center font-medium text-center">
                      <span>
                        <TechIcons icon={techData.icon} />
                      </span>
                      {techData.name}
                    </span>
                    {/* Tooltip */}
                    <div className="absolute z-10 left-1/2 -translate-x-1/2 top-full mt-2 w-56 p-2 rounded shadow-lg bg-base-200 text-xs text-left opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto transition-all duration-200 border border-base-300">
                      {techData.description}
                    </div>
                  </div>
                );
              })}
            </ul>
          )}
          <ul className="mt-2 text-base-content space-y-1">
            {item.description.map((line, i) => (
              <li key={i} className="flex items-center">
                <LuArrowRight className="mr-2 text-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        {index !== items.length - 1 && <hr className="bg-neutral" />}
      </li>
    ))}
  </ul>
);

export default Timeline;
