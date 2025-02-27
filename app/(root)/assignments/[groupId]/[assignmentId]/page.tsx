"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/features/user/api/use-current-user";
import AssignmmentDetailContainer from "@/features/assignments/components/AssignmentDetailContainer";
import { useGetAssignment } from "@/features/assignments/api/use-get-assignment";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useGetSubmissions } from "@/features/submissions/api/use-get-submissions";
import SubmissionsTable from "@/features/submissions/components/submissions-table";
import { Separator } from "@/components/ui/separator";
import CreateSubmission from "@/features/submissions/components/create-submission";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react"; // Import Spinner Icon

type SubmissionType =
  | (Doc<"submissions"> & {
      user: Doc<"users"> | null;
    })
  | undefined
  | null;

const AssignmentIdPage = () => {
  const { assignmentId } = useParams();
  const { data: currentUser } = useCurrentUser();
  const { data: assignment, isLoading: isLoadingAssignment } = useGetAssignment(
    {
      assignmentId: assignmentId as Id<"assignments">,
    }
  );
  const isFaculty = currentUser?.role === "faculty";

  const { data: submissions, isLoading: isLoadingSubmissions } =
    useGetSubmissions({
      assignmentId: assignmentId as Id<"assignments">,
    });

  const [currentUserSubmission, setCurrentUserSubmission] =
    useState<SubmissionType>(null);
  const [showCreateSubmission, setShowCreateSubmission] = useState(false);

  useEffect(() => {
    const userSubmission = submissions?.find(
      (sub) => sub.userId === currentUser?._id
    );
    setCurrentUserSubmission(userSubmission);
  }, [submissions, currentUser]);

  const handleResubmit = () => {
    setShowCreateSubmission(true);
  };

  // Calculate votes
  const totalVotes = assignment?.votes.length || 0;
  const votePercentage = (totalVotes / 80) * 100;

  return (
    <AssignmmentDetailContainer>
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-2xl ">{assignment?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingAssignment || isLoadingSubmissions ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin w-10 h-10 text-primary" />
            </div>
          ) : (
            <>
              <p className="mb-4 text-muted-foreground">
                {assignment?.content}
              </p>

              {/* Display Votes in Progress Bar */}
              {isFaculty && (
                <div className="mb-4">
                  <p className="text-md font-semibold">
                    Votes for Extending Deadline: {totalVotes}
                  </p>
                  {votePercentage > 0 && (
                    <Progress value={votePercentage} className="w-full h-4" />
                  )}
                </div>
              )}

              {/* Check if user already submitted */}
              {!isFaculty &&
                (currentUserSubmission && !showCreateSubmission ? (
                  <>
                    <p className="text-lg font-semibold">Your Submission:</p>
                    {currentUserSubmission.fileUrl ? (
                      <Button asChild variant={"outline"}>
                        <Link
                          href={currentUserSubmission.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Submitted File
                        </Link>
                      </Button>
                    ) : (
                      <p>No file submitted.</p>
                    )}
                    <Button
                      className="ml-2 mt-4 border-primary"
                      onClick={handleResubmit}
                      variant="outline"
                    >
                      Resubmit
                    </Button>
                  </>
                ) : (
                  <CreateSubmission />
                ))}

              <Separator className="my-4" />

              {/* Display Submissions Only for Faculty */}
              {isFaculty && <SubmissionsTable submissions={submissions} />}
            </>
          )}
        </CardContent>
      </Card>
    </AssignmmentDetailContainer>
  );
};

export default AssignmentIdPage;
