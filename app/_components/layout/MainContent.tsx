import React from "react";
import Card from "../ui/Card";
import AboutSection from "../section/About";
import TechStackSection from "../section/TechStack";

const MainContent = () => {
  return (
    <Card>
      <div className="space-y-8">
        <AboutSection />
        <TechStackSection />
      </div>
    </Card>
  );
};

export default MainContent;
