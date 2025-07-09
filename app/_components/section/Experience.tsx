import React from "react";
import SectionHeader from "../common/SectionHeader";
import { experienceLists } from "../_data/experience";
import Timeline, { TimelineItem } from "../common/Timeline";
import SectionIntro from "../common/SectionIntro";

const experienceTimeline: TimelineItem[] = experienceLists.map((item) => ({
  logo: item.logo,
  duration: item.duration,
  name: item.company,
  title: item.position,
  description: item.description,
}));

const ExperienceSection = () => (
  <section id="experience">
    <SectionHeader>Experience</SectionHeader>
    <SectionIntro>
      Here&apos;s where I&apos;ve worked and what I&apos;ve built. Each role
      taught me something new about writing better code and working with teams
      to ship products that people actually use.
    </SectionIntro>
    <div className="">
      <Timeline items={experienceTimeline} />
    </div>
  </section>
);

export default ExperienceSection;
