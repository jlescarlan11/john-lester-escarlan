import techStacks from "../common/techStacks";
import { TechCategory } from "../section/TechStack.types";

const techCategories: TechCategory[] = [
  {
    title: "Frontend",
    items: [
      techStacks.react,
      techStacks.html,
      techStacks.css,
      techStacks.javascript,
      techStacks.typescript,
      techStacks.tailwind,
      techStacks.nextjs,
      techStacks.redux,
    ],
  },
  {
    title: "Backend",
    items: [
      techStacks.nodejs,
      techStacks.express,
      techStacks.java,
      techStacks.springboot,
      techStacks.php,
      techStacks.laravel,
      techStacks.restful,
      techStacks.jwt,
    ],
  },
  {
    title: "Database",
    items: [
      techStacks.postgresql,
      techStacks.mysql,
      techStacks.mongodb,
      techStacks.firebase,
    ],
  },
  {
    title: "Tools",
    items: [
      techStacks.git,
      techStacks.github,
      techStacks.vscodium,
      techStacks.docker,
      techStacks.postman,
      techStacks.npm,
    ],
  },
  {
    title: "Testing",
    items: [
      techStacks.jest,
      techStacks.testinglibrary,
    ],
  },
  {
    title: "Currently Learning",
    items: [
      techStacks.astro,
      techStacks.graphql,
      techStacks.aws,
    ],
  },
];

export default techCategories;
