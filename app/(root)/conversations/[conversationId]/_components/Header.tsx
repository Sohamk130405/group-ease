import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  imageUrl: string;
  name: string;
}

const Header = ({ imageUrl, name }: HeaderProps) => {
  return (
    <Card className="w-full rounded-lg flex items-center p-2 justify-between">
      <div className="flex items-center gap-2">
        <Link href={"/conversations"} className="block lg:hidden">
          <CircleArrowLeft />
        </Link>
        <Avatar>
          <AvatarImage src={imageUrl} alt="avatar" />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{name}</h2>
      </div>
    </Card>
  );
};

export default Header;
