export type TechItem = {
  name: string;
  icon: string; // Icon name as string, e.g., 'FaReact'
  description: string;
};

export type TechCategory = {
  title: string;
  items: TechItem[];
};
