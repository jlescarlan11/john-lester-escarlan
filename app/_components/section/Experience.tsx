import React from "react";
import SectionHeader from "../common/SectionHeader";
import { experienceLists } from "../_data/experience";
import Timeline, { TimelineItem } from "../common/Timeline";

const experienceTimeline: TimelineItem[] = experienceLists.map(item => ({
  logo: item.logo,
  duration: item.duration,
  name: item.company,
  title: item.position,
  description: item.description,
}));

const ExperienceSection = () => (
  <section>
    <SectionHeader>Experience</SectionHeader>
    <div>
      <Timeline items={experienceTimeline} />
    </div>
  </section>
);

export default ExperienceSection;
