"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/features/user/api/use-current-user";
import AssignmmentDetailContainer from "@/features/assignments/components/AssignmentDetailContainer";
import { useGetAssignment } from "@/features/assignments/api/use-get-assignment";
import { useUpdateAssignment } from "@/features/assignments/api/use-update-assignment"; // Import the update hook
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useGetSubmissions } from "@/features/submissions/api/use-get-submissions";
import SubmissionsTable from "@/features/submissions/components/submissions-table";
import { Separator } from "@/components/ui/separator";
import CreateSubmission from "@/features/submissions/components/create-submission";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Loader2, Paperclip, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { useGenerateUploadUrl } from "@/features/uploads/api/use-generate-upload-url";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedDeadline, setEditedDeadline] = useState(
    assignment?.deadline + ""
  );
  const [file, setFile] = useState<File | null>(null);
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const { mutate: updateAssignment, isPending: isUpdating } =
    useUpdateAssignment();

  useEffect(() => {
    const userSubmission = submissions?.find(
      (sub) => sub.userId === currentUser?._id
    );
    setCurrentUserSubmission(userSubmission);
  }, [submissions, currentUser]);

  useEffect(() => {
    if (assignment) {
      setEditedTitle(assignment.title);
      setEditedContent(assignment.content);
    }
  }, [assignment]);

  const handleResubmit = () => {
    setShowCreateSubmission(true);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSaveChanges = async () => {
    let fileId = undefined;
    try {
      if (file) {
        const url = await generateUploadUrl({ throwError: true });
        if (!url) throw new Error("Failed to get upload URL");

        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!result.ok) throw new Error("Failed to upload file");

        const { storageId } = await result.json();
        fileId = storageId;
      }
      updateAssignment(
        {
          assignmentId: assignmentId as Id<"assignments">,
          title: editedTitle,
          content: editedContent,
          deadline:
            Date.parse(editedDeadline) || (assignment?.deadline as number),
          file: fileId,
          fileType: file ? file.type : undefined,
        },
        {
          onSuccess: () => {
            setIsEditing(false);
            toast({ title: "Assignment updated successfully" });
          },
          onError: () => {
            toast({
              title: "Failed to update assignment",
              variant: "destructive",
            });
          },
        }
      );
    } catch {
      toast({
        title: "Failed to update assignment",
        variant: "destructive",
      });
    }
  };

  const totalVotes = assignment?.votes.length || 0;
  const votePercentage = (totalVotes / 80) * 100;
  const isImage = (file: File) => file.type.startsWith("image/");
  const isVideo = (file: File) => file.type.startsWith("video/");
  const removeFile = () => {
    setFile(null);
  };
  return (
    <AssignmmentDetailContainer>
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEditing ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full"
              />
            ) : (
              assignment?.title
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingAssignment || isLoadingSubmissions ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin w-10 h-10 text-primary" />
            </div>
          ) : (
            <>
              {isEditing ? (
                <div className="w-full mb-4 space-y-2">
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <Input
                    type="datetime-local"
                    id="deadline"
                    value={editedDeadline}
                    className="w-fit"
                    onChange={(e) => setEditedDeadline(e.target.value)}
                  />
                  <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  >
                    <Paperclip />
                    Update Attachment
                  </Button>
                  {file && (
                    <div className="relative w-64 h-40 rounded-xl overflow-hidden flex items-center justify-center shadow-md">
                      {isImage(file) ? (
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="object-contain w-full h-full"
                          height={720}
                          width={1200}
                        />
                      ) : isVideo(file) ? (
                        <video
                          src={URL.createObjectURL(file)}
                          autoPlay
                          className="object-contain w-full h-full"
                        ></video>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <FileText className="w-10 h-10 text-gray-600" />
                          <span className="text-sm text-gray-600">
                            {file?.name.split(".").pop()?.toUpperCase()}
                          </span>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 hover:bg-transparent"
                        onClick={removeFile}
                      >
                        <XCircle className="w-6 h-6 text-red-600" />
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mb-4 text-muted-foreground">
                  {assignment?.content}
                </p>
              )}

              {isFaculty && (
                <div className="mb-4">
                  <Button onClick={handleEditToggle} variant="outline">
                    {isEditing ? "Cancel" : "Edit Assignment"}
                  </Button>
                  {isEditing && (
                    <Button
                      className="ml-2"
                      onClick={handleSaveChanges}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  )}
                </div>
              )}

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

              {isFaculty && <SubmissionsTable submissions={submissions} />}
            </>
          )}
        </CardContent>
      </Card>
    </AssignmmentDetailContainer>
  );
};

export default AssignmentIdPage;
