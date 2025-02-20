import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const useGetGroup = ({ id }: { id: Id<"groups"> }) => {
  const data = useQuery(api.groups.getById, { id });
  const isLoading = data === undefined;
  return { data, isLoading };
};
