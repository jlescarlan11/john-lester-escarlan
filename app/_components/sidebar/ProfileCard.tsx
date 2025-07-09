import Image from "next/image";
import Link from "next/link";
import { LuDownload } from "react-icons/lu";
import { profileData, socialLinks } from "../_data/profile";
import Card from "../ui/Card";

const ProfileCard = () => {
  return (
    <Card>
      <div className="space-y-2">
        <div className="gap-y-2 flex items-center lg:block gap-x-4">
          <div className="flex justify-center">
            <Image
              src={profileData.avatar}
              className="rounded-lg size-20 lg:size-32"
              alt="Profile"
            />
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-center text-xl font-semibold">
                {profileData.name}
              </p>
            </div>
            <div className="flex lg:justify-center">
              <div className=" badge badge-primary">{profileData.role}</div>
            </div>
          </div>
        </div>

        <div className=" border-b border-base-content/20 w-full mt-4"></div>
        <div className="flex items-center justify-center flex-wrap gap-x-4">
          {socialLinks.map((socialLink, index) => {
            const Icon = socialLink.icon;
            return (
              <Link
                key={index}
                href={socialLink.href}
                className="flex items-center gap-2 "
              >
                <Icon className="text-primary" />
              </Link>
            );
          })}
          <div className="flex justify-center">
            <a
              href="/resume.pdf"
              download
              className="btn btn-link flex items-center gap-2"
            >
              <LuDownload />
              Resume
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
