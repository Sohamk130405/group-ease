import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const useGetAssignments = ({ groupId }: { groupId: Id<"groups"> }) => {
  const data = useQuery(api.assignments.getByGroupId, { groupId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
