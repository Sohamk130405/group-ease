import FileUpload from "@/components/file-upload";
import { useGenerateUploadUrl } from "@/features/uploads/api/use-generate-upload-url";
import { useToast } from "@/hooks/use-toast";
import { useCreateSubmission } from "../api/use-create-submission";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const CreateSubmission = () => {
  const { toast } = useToast();
  const { assignmentId } = useParams();
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();
  const { mutate: createSubmission } = useCreateSubmission();
  const handleSubmit = async (file: File | null) => {
    const values = {
      assignmentId: assignmentId as Id<"assignments">,
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
        await createSubmission(values, { throwError: true });
        toast({
          title: "Success",
          description: "Submission Created",
        });
        window.location.reload();
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong! Try again later",
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <FileUpload onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateSubmission;
