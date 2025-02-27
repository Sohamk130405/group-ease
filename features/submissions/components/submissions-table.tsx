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
import { Doc } from "@/convex/_generated/dataModel";

interface SubmissionsProp {
  submissions:
    | (Doc<"submissions"> & {
        user: Doc<"users"> | null;
      })[]
    | undefined;
}

const SubmissionsTable = ({ submissions }: SubmissionsProp) => {
  const [editingId, setEditingId] = useState("");
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
            {submissions.map((submission) => (
              <TableRow key={submission._id}>
                <TableCell>{submission.user?.name}</TableCell>
                <TableCell>{submission.user?.rollNo}</TableCell>
                <TableCell>{submission.user?.prn}</TableCell>
                <TableCell>
                  <a
                    href={submission.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText />
                  </a>
                </TableCell>
                <TableCell>
                  {editingId === submission._id ? (
                    <Input
                      type="number"
                      value={submission.marks}
                      className="w-[80px]"
                    />
                  ) : (
                    submission.marks
                  )}
                </TableCell>
                <TableCell>
                  {editingId === submission._id ? (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="ml-2">
                        <Check />
                      </Button>
                      <Button variant="outline" size="sm" className="ml-2">
                        <X />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingId(submission._id)}
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
