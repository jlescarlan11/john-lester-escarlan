import React from "react";
import Image from "next/image";

export interface TimelineItem {
  logo: string;
  duration: string;
  name: string;      // company or institution
  title: string;     // position or degree
  description: string;
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
          <div className="font-mono text-xs text-base-content">{item.title}</div>
          <div className="mt-2 text-base-content">{item.description}</div>
        </div>
        {index !== items.length - 1 && <hr className="bg-neutral" />}
      </li>
    ))}
  </ul>
);

export default Timeline; 