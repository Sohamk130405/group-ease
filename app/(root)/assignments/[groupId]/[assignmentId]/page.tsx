"use client";
// import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Check, FileText, Pencil, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/features/user/api/use-current-user";
import AssignmmentDetailContainer from "@/features/assignments/components/AssignmentDetailContainer";
import { useGetAssignment } from "@/features/assignments/api/use-get-assignment";
import { Id } from "@/convex/_generated/dataModel";
import { useGetSubmissions } from "@/features/submissions/api/use-get-submissions";

const AssignmentIdPage = () => {
  const { assignmentId } = useParams();
  const { data } = useCurrentUser();
  const { data: assignment } = useGetAssignment({
    assignmentId: assignmentId as Id<"assignments">,
  });
  const isFaculty = data?.role === "faculty";

  const { data: submissions, isLoading } = useGetSubmissions({
    assignmentId: assignmentId as Id<"assignments">,
  });

  return (
    <AssignmmentDetailContainer>
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-2xl ">{assignment?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">{assignment?.content}</p>

          {/* Display Submissions Only for Faculty */}
          {isFaculty && !isLoading && (
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
                    {/* {submissions.map((submission) => (
                      <TableRow key={submission._id}>
                        <TableCell>{submission.name}</TableCell>
                        <TableCell>{submission.rollNo}</TableCell>
                        <TableCell>{submission.prn}</TableCell>
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
                          {editingId[submission.id] ? (
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
                          {editingId[submission.id] ? (
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="ml-2"
                              >
                                <Check />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="ml-2"
                              >
                                <X />
                              </Button>
                            </div>
                          ) : (
                            <Button variant="outline" size="icon">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))} */}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">No Submissions Yet</p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </AssignmmentDetailContainer>
  );
};

export default AssignmentIdPage;
