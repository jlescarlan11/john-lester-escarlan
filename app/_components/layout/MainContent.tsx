import AboutSection from "../section/About";
import EducationSection from "../section/Education";
import ExperienceSection from "../section/Experience";
import PortfolioSection from "../section/Portfolio";

const MainContent = () => {
  return (
    <div className="space-y-16 ">
      <AboutSection />

      <EducationSection />
      <ExperienceSection />
      <PortfolioSection />
    </div>
  );
};

export default MainContent;
