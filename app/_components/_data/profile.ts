import ProfileAvatar from "@/public/profile-pic.jpg";
import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";

export const profileData = {
  avatar: ProfileAvatar,
  name: "John Lester Escarlan",
  role: "Software Developer",
  location: "Cebu City",
};

export const socialLinks = [
  {
    icon: LuGithub,
    href: "https://github.com/jlescarlan11",
  },
  {
    icon: LuLinkedin,
    href: "https://www.linkedin.com/in/john-lester-escarlan/",
  },
  { icon: LuMail, href: "mailto:jlescarlan11@gmail.com" },
];

export const contactInfo = {
  location: "Cebu City",
  email: "jnescarlan@up.edu.ph",
  phone: "995 7128 195",
  website: "https://john-lester-escarlan-portfolio.vercel.app/",
  linkedin: "https://www.linkedin.com/in/john-lester-escarlan/",
  github: "https://github.com/jlescarlan11"
};
