import ProfileCard from "../sidebar/ProfileCard";
import SectionNav from "../sidebar/SectionNav";

const Sidebar = () => {
  return (
    <div className="flex flex-col space-y-4">
      <ProfileCard />
      <SectionNav />
    </div>
  );
};

export default Sidebar;
