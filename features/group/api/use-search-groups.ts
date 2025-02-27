import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

interface SearcProps {
  branch: string;
  div: string;
  sem: number;
  year: string;
}

export const useSearchGroups = ({ branch, div, sem, year }: SearcProps) => {
  const data = useQuery(api.groups.get, { branch, div, sem, year });
  const isLoading = data === undefined;
  return { data, isLoading };
};
