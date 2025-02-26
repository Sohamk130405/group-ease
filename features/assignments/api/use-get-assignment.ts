import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const useGetAssignment = ({
  assignmentId,
}: {
  assignmentId: Id<"assignments">;
}) => {
  const data = useQuery(api.assignments.get, { assignmentId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
