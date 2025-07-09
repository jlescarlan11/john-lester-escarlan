import AboutSection from "../section/About";
import BlogsSection from "../section/Blogs";
import ContactSection from "../section/Contact";
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
      <BlogsSection />
      <ContactSection />
    </div>
  );
};

export default MainContent;
