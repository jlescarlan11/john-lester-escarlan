import {
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaNodeJs,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import {
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiJest,
  SiJsonwebtokens,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNpm,
  SiPostgresql,
  SiPostman,
  SiRedux,
  SiSpringboot,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVscodium,
} from "react-icons/si";
import SectionHeader from "../common/SectionHeader";

const techCategories = [
  {
    title: "Frontend",
    items: [
      {
        name: "React",
        icon: <FaReact />,
        description: "3+ years building SPAs, hooks, and component libraries.",
      },
      {
        name: "HTML",
        icon: <FaHtml5 />,
        description: "Semantic, accessible markup for all projects.",
      },
      {
        name: "CSS",
        icon: <FaCss3Alt />,
        description:
          "Responsive layouts, custom animations, and utility classes.",
      },
      {
        name: "JavaScript",
        icon: <SiJavascript />,
        description: "ES6+, async/await, DOM manipulation, and APIs.",
      },
      {
        name: "TypeScript",
        icon: <SiTypescript />,
        description: "Strongly-typed React apps, backend APIs.",
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss />,
        description: "Rapid UI prototyping and custom themes.",
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs />,
        description: "SSR, SSG, API routes, and optimized images.",
      },
      {
        name: "Redux/Context API",
        icon: <SiRedux />,
        description: "State management for complex apps.",
      },
    ],
  },
  {
    title: "Backend",
    items: [
      {
        name: "Node.js",
        icon: <FaNodeJs />,
        description: "REST APIs, real-time apps, and CLI tools.",
      },
      {
        name: "Express.js",
        icon: <SiExpress />,
        description: "API routing, middleware, and authentication.",
      },
      {
        name: "Java",
        icon: <FaJava />,
        description: "Spring Boot microservices and enterprise apps.",
      },
      {
        name: "Spring Boot",
        icon: <SiSpringboot />,
        description: "RESTful APIs, security, and data access.",
      },
      {
        name: "PHP",
        icon: <FaPhp />,
        description: "Legacy systems and Laravel projects.",
      },
      {
        name: "Laravel",
        icon: <SiLaravel />,
        description: "MVC, Eloquent ORM, and REST APIs.",
      },
      {
        name: "RESTful APIs",
        icon: <SiPostman />,
        description: "Designed and consumed REST endpoints.",
      },
      {
        name: "Authentication (JWT)",
        icon: <SiJsonwebtokens />,
        description: "Secured APIs with JWT and session tokens.",
      },
    ],
  },
  {
    title: "Database",
    items: [
      {
        name: "PostgreSQL",
        icon: <SiPostgresql />,
        description: "Relational modeling, migrations, and queries.",
      },
      {
        name: "MySQL",
        icon: <SiMysql />,
        description: "Schema design, joins, and performance tuning.",
      },
      {
        name: "MongoDB",
        icon: <SiMongodb />,
        description: "NoSQL, aggregation, and flexible schemas.",
      },
      {
        name: "Firebase",
        icon: <SiFirebase />,
        description: "Realtime DB, Auth, and cloud functions.",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        name: "Git",
        icon: <FaGitAlt />,
        description: "Version control, branching, and collaboration.",
      },
      {
        name: "GitHub",
        icon: <FaGithub />,
        description: "Project hosting, Actions CI/CD, and PR reviews.",
      },
      {
        name: "VS Code",
        icon: <SiVscodium />,
        description: "Extensions, debugging, and productivity workflows.",
      },
      {
        name: "Docker",
        icon: <FaDocker />,
        description: "Containerized full-stack apps for dev & prod.",
      },
      {
        name: "Postman",
        icon: <SiPostman />,
        description: "API testing, automation, and documentation.",
      },
      {
        name: "npm/yarn",
        icon: <SiNpm />,
        description: "Package management and scripts for all projects.",
      },
    ],
  },
  {
    title: "Testing",
    items: [
      {
        name: "Jest",
        icon: <SiJest />,
        description: "Unit and integration tests for JS/TS codebases.",
      },
      {
        name: "React Testing Library",
        icon: <SiTestinglibrary />,
        description: "Component and UI testing for React apps.",
      },
    ],
  },
];

const TechStackSection = () => {
  return (
    <section className="py-8">
      <SectionHeader>Tech Stack</SectionHeader>
      <div className="space-y-4 mt-6">
        {techCategories.map((category) => (
          <div key={category.title}>
            <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((tech) => (
                <div
                  key={tech.name}
                  className="badge badge-neutral cursor-pointer relative group transition-all duration-200"
                  tabIndex={0}
                >
                  <span className="flex gap-1 items-center text-sm font-medium text-center">
                    <span className="text-lg">{tech.icon}</span>
                    {tech.name}
                  </span>
                  {/* Tooltip */}
                  <div className="absolute z-10 left-1/2 -translate-x-1/2 top-full mt-2 w-56 p-2 rounded shadow-lg bg-base-200 text-xs text-left opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto transition-all duration-200 border border-base-300">
                    {tech.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
