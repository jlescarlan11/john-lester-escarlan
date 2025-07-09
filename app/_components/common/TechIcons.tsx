import React from "react";
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
  FaAws,
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
  SiAstro,
  SiGraphql,
  SiDotnet,
} from "react-icons/si";

const iconMap: Record<string, React.ReactNode> = {
  FaReact: <FaReact />,
  FaHtml5: <FaHtml5 />,
  FaCss3Alt: <FaCss3Alt />,
  SiJavascript: <SiJavascript />,
  SiTypescript: <SiTypescript />,
  SiTailwindcss: <SiTailwindcss />,
  SiNextdotjs: <SiNextdotjs />,
  SiRedux: <SiRedux />,
  FaNodeJs: <FaNodeJs />,
  SiExpress: <SiExpress />,
  FaJava: <FaJava />,
  SiSpringboot: <SiSpringboot />,
  FaPhp: <FaPhp />,
  SiLaravel: <SiLaravel />,
  SiPostman: <SiPostman />,
  SiJsonwebtokens: <SiJsonwebtokens />,
  SiPostgresql: <SiPostgresql />,
  SiMysql: <SiMysql />,
  SiMongodb: <SiMongodb />,
  SiFirebase: <SiFirebase />,
  FaGitAlt: <FaGitAlt />,
  FaGithub: <FaGithub />,
  SiVscodium: <SiVscodium />,
  FaDocker: <FaDocker />,
  SiNpm: <SiNpm />,
  SiJest: <SiJest />,
  SiTestinglibrary: <SiTestinglibrary />,
  SiAstro: <SiAstro />,
  SiGraphql: <SiGraphql />,
  FaAws: <FaAws />,
  SiDotnet: <SiDotnet />,
};

interface TechIconsProps {
  icon: string;
  className?: string;
}

const TechIcons: React.FC<TechIconsProps> = ({ icon, className }) => {
  return <span className={className}>{iconMap[icon] || null}</span>;
};

export default TechIcons;
