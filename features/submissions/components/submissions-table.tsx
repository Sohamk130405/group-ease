import { Check, FileText, Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doc, Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { useUpdateSubmission } from "../api/use-update-submission";

interface SubmissionsProp {
  submissions:
    | (Doc<"submissions"> & {
        user: Doc<"users"> | null;
      })[]
    | undefined;
}

const SubmissionsTable = ({ submissions }: SubmissionsProp) => {
  const [editingId, setEditingId] = useState("");
  const [editedMarks, setEditedMarks] = useState<number | "">("");
  const { mutate: updateMarks, isPending } = useUpdateSubmission();
  // Handle input change
  const handleMarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMarks(Number(e.target.value));
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId("");
    setEditedMarks("");
  };

  // Submit edited marks
  const handleSubmit = async (id: Id<"submissions">) => {
    updateMarks({ marks: editedMarks as number, submissionId: id });
    handleCancel();
  };

  return (
    <>
      <h2 className="text-xl mb-4">Submissions</h2>
      {submissions && submissions.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>PRN</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions
              .sort((a, b) => (a.user?.rollNo ?? 0) - (b.user?.rollNo ?? 0))
              .map((submission) => (
                <TableRow key={submission._id}>
                  <TableCell>{submission.user?.name}</TableCell>
                  <TableCell>{submission.user?.rollNo}</TableCell>
                  <TableCell>{submission.user?.prn}</TableCell>
                  <TableCell>
                    <Link
                      href={submission.fileUrl as string}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText />
                    </Link>
                  </TableCell>
                  <TableCell>
                    {editingId === submission._id ? (
                      <Input
                        type="number"
                        value={editedMarks}
                        onChange={handleMarksChange}
                        className="w-[80px]"
                      />
                    ) : (
                      submission.marks
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === submission._id ? (
                      <div className="flex gap-2">
                        <Button
                          disabled={isPending}
                          variant="outline"
                          size="sm"
                          className="ml-2"
                          onClick={() => handleSubmit(submission._id)}
                        >
                          <Check />
                        </Button>
                        <Button
                          disabled={isPending}
                          variant="outline"
                          size="sm"
                          className="ml-2"
                          onClick={handleCancel}
                        >
                          <X />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        disabled={isPending}
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingId(submission._id);
                          setEditedMarks(submission.marks || "");
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-muted-foreground">No Submissions Yet</p>
      )}
    </>
  );
};

export default SubmissionsTable;
