import { BellRing, Check, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

const GroupPreview = ({ group, className }) => {
  if (!group) return null;

  return (
    <Card className={`w-[300px] ${className}!`}>
      <CardHeader>
        <CardTitle>{group.title}</CardTitle>
        <CardDescription>
          {group.lastReadMessageId || "No messages yet"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 border p-4 rounded-md">
          <BellRing />
          <div className="flex-1">
            <p className="text-sm font-medium">Push Notifications</p>
            <p className="text-sm text-muted-foreground">
              Enable to stay updated.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          <p className="text-sm font-medium">Subject: {group.subject}</p>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">Batch {group.batch}</p>
            <p className="text-sm text-muted-foreground">{group.type}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/conversations/${group._id}`} passHref className="w-full">
          <Button className="w-full">
            <MessageSquare className="mr-2" /> Start Conversation
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GroupPreview;
