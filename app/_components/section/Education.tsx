import { educationLists } from "../_data/education";
import SectionHeader from "../common/SectionHeader";
import SectionIntro from "../common/SectionIntro";
import Timeline, { TimelineItem } from "../common/Timeline";

const educationTimeline: TimelineItem[] = educationLists.map((item) => ({
  logo: item.logo,
  duration: item.duration,
  name: item.institution,
  title: item.degree,
  description: item.description,
}));

const EducationSection = () => (
  <section id="education">
    <SectionHeader>Education</SectionHeader>
    <SectionIntro>
      Currently studying mathematics, which gives me a solid foundation for
      writing clean code and debugging complex problems. The logical thinking
      and attention to detail from math coursework translates directly to
      building reliable software.
    </SectionIntro>
    <div className="">
      <Timeline items={educationTimeline} />
    </div>
  </section>
);

export default EducationSection;
