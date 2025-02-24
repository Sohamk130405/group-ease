import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  name: string;
  faculty: Doc<"users"> | undefined | null;
}

const Header = ({ name, faculty }: HeaderProps) => {
  return (
    <Card className="w-full rounded-lg flex items-center p-2 justify-between">
      <div className="flex items-center gap-2">
        <Link href={"/conversations"} className="block lg:hidden">
          <CircleArrowLeft />
        </Link>
        <Avatar>
          <AvatarImage
            src={
              faculty?.image ||
              "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
            }
            alt="avatar"
          />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{name}</h2>
      </div>
    </Card>
  );
};

export default Header;
