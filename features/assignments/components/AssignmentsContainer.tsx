import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PaperclipIcon,
  EyeIcon,
  CalendarIcon,
  ArrowBigUpDash,
  FolderPlus,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useGetAssignments } from "../api/use-get-assignments";
import { Id } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/features/user/api/use-current-user";
import { format } from "date-fns";
import { useUpvoteAssignment } from "../api/use-upvote-assignment";
import { useToast } from "@/hooks/use-toast";

const AssignmentsContainer = () => {
  const { data } = useCurrentUser();
  const isFaculty = data?.role === "faculty";
  const { groupId } = useParams();
  const { data: assignments, isLoading } = useGetAssignments({
    groupId: groupId as Id<"groups">,
  });
  const { toast } = useToast();
  const { mutate: upvote, isPending } = useUpvoteAssignment();

  const router = useRouter();
  const handleUpvote = (id: Id<"assignments">) => {
    upvote({ assignmentId: id });
    toast({ title: "Extend Deadline", description: "Voted Successfully" });
  };
  return (
    <>
      {isFaculty && (
        <Button className="col-span-1 w-fit mx-auto" asChild>
          <Link href={`/assignments/${groupId}/create`}>
            <FolderPlus />
            Create Assignment
          </Link>
        </Button>
      )}
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
        {!isLoading &&
          assignments?.map((assignment) => (
            <Card key={assignment._id} className="rounded-xl shadow-md">
              <CardHeader>
                <CardTitle>{assignment.title}</CardTitle>
                <p className="text-sm text-gray-600 flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" /> Deadline:{" "}
                  {format(assignment.deadline, "HH:mm, MMM d, yyyy")}
                </p>
              </CardHeader>
              <CardContent className="grid grid-cols-2 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="col-span-2"
                  onClick={() => window.open(assignment.fileUrl, "_blank")}
                >
                  <PaperclipIcon className="w-4 h-4 mr-1" /> View Attachment
                </Button>
                {!isFaculty && (
                  <Button
                    onClick={() => handleUpvote(assignment._id)}
                    variant="outline"
                    size="sm"
                    className="col-span-2"
                    disabled={
                      isPending ||
                      assignment.votes.includes(data?._id as Id<"users">)
                    }
                  >
                    <ArrowBigUpDash className="w-4 h-4 mr-1" />
                    {assignment.votes.includes(data?._id as Id<"users">)
                      ? "Already Voted"
                      : "Upvote Extend Deadline"}
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="col-span-2 border-primary"
                  onClick={() =>
                    router.push(`/assignments/${groupId}/${assignment._id}`)
                  }
                >
                  <EyeIcon className="w-4 h-4 mr-1" />{" "}
                  {isFaculty ? "View Submissions" : "More Info"}
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
};

export default AssignmentsContainer;
