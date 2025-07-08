import { navigationItems } from "../_data/sectionNav";
import Card from "../ui/Card";

const SectionNav = () => {
  return (
    <Card>
      <div className="space-y-4">
        <ul className="flex flex-col space-y-1">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button className={`text-left `}>━ {item.label}</button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default SectionNav;
