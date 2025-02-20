import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const useGetMessages = ({ groupId }: { groupId: Id<"groups"> }) => {
  const data = useQuery(api.messages.getByGroupId, { groupId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
