import ProfileCard from "../sidebar/ProfileCard";
import SectionNav from "../sidebar/SectionNav";

const Sidebar = () => {
  return (
    <div className="flex flex-col space-y-4 ">
      <ProfileCard />
      <div className="hidden lg:block">
        <SectionNav />
      </div>
    </div>
  );
};

export default Sidebar;
