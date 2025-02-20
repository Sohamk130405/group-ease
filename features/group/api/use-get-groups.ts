import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export const useGetGroups = () => {
  const data = useQuery(api.groups.getMyGroups);
  const isLoading = data === undefined;
  return { data, isLoading };
};
