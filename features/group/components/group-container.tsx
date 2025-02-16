import { useCurrentUser } from "@/features/user/api/use-current-user";
import { useGetGroups } from "../api/use-get-groups";
import GroupPreview from "./group-preview";
import { Loader } from "lucide-react";

const GroupContainer = () => {
  const { data: groups, isLoading } = useGetGroups();
  const { data: user } = useCurrentUser();
  const isFaculty = user?.role === "faculty";
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loader className="size-5 animate-spin transition" />
        </div>
      ) : (
        groups?.map((group) => {
          const isOwner = user?._id == group.createdBy;
          return (
            <GroupPreview
              key={group._id}
              group={group}
              isOwner={isOwner}
              isFaculty={isFaculty}
            />
          );
        })
      )}
    </div>
  );
};

export default GroupContainer;
