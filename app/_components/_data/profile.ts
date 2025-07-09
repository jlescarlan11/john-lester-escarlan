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
