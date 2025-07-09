import React from "react";
import SectionHeader from "../common/SectionHeader";
import { educationLists } from "../_data/education";
import Timeline, { TimelineItem } from "../common/Timeline";

const educationTimeline: TimelineItem[] = educationLists.map(item => ({
  logo: item.logo,
  duration: item.duration,
  name: item.institution,
  title: item.degree,
  description: item.description,
}));

const EducationSection = () => (
  <section>
    <SectionHeader>Education</SectionHeader>
    <div>
      <Timeline items={educationTimeline} />
    </div>
  </section>
);

export default EducationSection;
