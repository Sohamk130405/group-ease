"use client";
import React, { ChangeEvent, useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileText, Paperclip, XCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useCreateAssignment } from "@/features/assignments/api/use-create-assignment";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useGenerateUploadUrl } from "@/features/uploads/api/use-generate-upload-url";
import AssignmmentDetailContainer from "@/features/assignments/components/AssignmentDetailContainer";
import { NotifyAssignmentAndUsersProps, SendEmailTo } from "@/lib/send-emails";

type ValuesType = {
  title: string;
  content: string;
  deadline: number;
  groupId: Id<"groups">;
  file: Id<"_storage"> | undefined;
  fileType: string | undefined;
};

const CreateAssignment = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { groupId } = useParams();
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();
  const { mutate: createAssignment, isPending } = useCreateAssignment();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    if (!title || !content || !deadline) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    const values: ValuesType = {
      content,
      title,
      deadline: Date.parse(deadline),
      groupId: groupId as Id<"groups">,
      file: undefined,
      fileType: file?.type,
    };

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
        values.file = storageId;
      }
      await createAssignment(values, {
        throwError: true,
        onSuccess: async (assignmentData) => {
          SendEmailTo(assignmentData as NotifyAssignmentAndUsersProps);
          toast({
            title: "Success",
            description: "Assignment Created",
          });
          setTitle("");
          setContent("");
          setDeadline("");
          router.replace(
            `/assignments/${assignmentData?.assignmentDetails.assignmentLink}`
          );
        },
      });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong! Try again later",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, []);

  const removeFile = useCallback(() => {
    setFile(null);
  }, []);

  // Check if the file is an image or video
  const isImage = useCallback(
    (file: File) => file.type.startsWith("image/"),
    []
  );
  const isVideo = useCallback(
    (file: File) => file.type.startsWith("video/"),
    []
  );

  const filePreview = useMemo(() => {
    if (file) {
      if (isImage(file)) {
        return (
          <Image
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="object-contain w-full h-full"
            height={720}
            width={1200}
          />
        );
      } else if (isVideo(file)) {
        return (
          <video
            src={URL.createObjectURL(file)}
            autoPlay
            className="object-contain w-full h-full"
          ></video>
        );
      } else {
        return (
          <div className="flex flex-col items-center justify-center">
            <FileText className="w-10 h-10 text-gray-600" />
            <span className="text-sm text-gray-600">
              {file?.name.split(".").pop()?.toUpperCase()}
            </span>
          </div>
        );
      }
    }
    return null;
  }, [file, isImage, isVideo]);

  return (
    <AssignmmentDetailContainer>
      <div className="p-6 mx-auto max-w-4xl w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  placeholder="Enter description here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 flex-wrap">
                <Input
                  type="datetime-local"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
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
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <Paperclip />
                  Add Attachment
                </Button>

                <Button
                  className="text-white border-2 border-primary hover:border-white hover:bg-transparent  md:col-span-1"
                  type="submit"
                  variant={"outline"}
                  disabled={isPending}
                >
                  Create Assignment
                </Button>
              </div>
              {file && (
                <div className="relative w-64 h-40 rounded-xl overflow-hidden flex items-center justify-center shadow-md">
                  {filePreview}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1"
                    onClick={removeFile}
                  >
                    <XCircle className="w-6 h-6 text-red-600" />
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </AssignmmentDetailContainer>
  );
};

export default CreateAssignment;
