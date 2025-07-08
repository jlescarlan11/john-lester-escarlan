import { navigationItems } from "../_data/sectionNav";
import Card from "../ui/Card";

const SectionNav = () => {
  return (
    <Card>
      <div className="space-y-4">
        <ul className="text-sm flex flex-col space-y-1">
          {navigationItems.map((item) => (
            <li
              key={item.id}
              //   bg-primary font-medium text-primary-content
              className=" rounded-full py-2 px-4"
            >
              {/* {activeSection === item.id ? "▶" : "▷"} */}
              <span className="mr-2">▷ </span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default SectionNav;
