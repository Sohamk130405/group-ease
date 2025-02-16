import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Doc, Id } from "@/convex/_generated/dataModel";

interface GroupPreviewProps {
  group: {
    _id: Id<"groups">;
    _creationTime: number;
    type: string;
    branch: string;
    div: string;
    batch: number;
    sem: number;
    year: string;
    subject: string;
    createdBy: Id<"users">;
    user?: Doc<"users">;
  };
  isOwner: boolean;
  isFaculty: boolean;
}

const GroupPreview = ({ group, isOwner, isFaculty }: GroupPreviewProps) => {
  if (!group) return null;
  if (isFaculty) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {group.year} Year {group.branch} {group.div}
          </CardTitle>
          <CardDescription>{"No messages yet"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 w-full">
            <p className="text-sm font-medium border p-2 rounded-md w-fit whitespace-nowrap">
              Batch:{" "}
              <span className="text-sm text-muted-foreground">
                {group.batch}
              </span>
            </p>
            <p className="text-sm font-medium border p-2 rounded-md w-fit whitespace-nowrap">
              {group.subject}
            </p>
            <p className="text-sm font-medium border p-2 rounded-md w-fit whitespace-nowrap">
              {group.type}
            </p>
          </div>
          {!isOwner && (
            <p className="text-sm font-medium border p-2 rounded-md w-fit whitespace-nowrap">
              {group.user?.name}
            </p>
          )}
        </CardContent>

        <CardFooter>
          <Link
            href={`/conversations/${group._id}`}
            passHref
            className="w-full"
          >
            <Button className="w-full">
              <MessageSquare className="mr-2" /> Start Conversation
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{group.subject}</CardTitle>
        <CardDescription>{"No messages yet"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 w-full">
          <p className="text-sm font-medium border p-2 rounded-md w-fit whitespace-nowrap">
            Batch:{" "}
            <span className="text-sm text-muted-foreground">{group.batch}</span>
          </p>
          <p className="text-sm font-medium border p-2 rounded-md w-fit whitespace-nowrap">
            {group.type}
          </p>
          <p className="text-sm font-medium border p-2 rounded-md w-fit whitespace-nowrap">
            {group.user?.name}
          </p>
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
