import Image from "next/image";
import Link from "next/link";
import { profileData, socialLinks } from "../_data/profile";
import Card from "../ui/Card";

const ProfileCard = () => {
  return (
    <Card>
      <div className="space-y-2">
        <div className="flex justify-center">
          <Image
            src={profileData.avatar}
            className="rounded-lg"
            alt="Profile"
            width={100}
            height={100}
          />
        </div>
        <div>
          <p className="text-center text-xl font-semibold">
            {profileData.name}
          </p>
        </div>
        <div className="flex justify-center">
          <div className=" badge badge-primary">{profileData.role}</div>
        </div>
        <div className="border-b border-base-content/20 w-full mt-4"></div>
        <div className="flex justify-center space-x-4">
          {socialLinks.map((socialLink, index) => {
            const Icon = socialLink.icon;
            return (
              <Link
                key={index}
                href={socialLink.href}
                className="flex items-center gap-2 "
              >
                <Icon />
              </Link>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
