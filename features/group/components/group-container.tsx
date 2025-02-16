import { useCurrentUser } from "@/features/user/api/use-current-user";
import { useGetGroups } from "../api/use-get-groups";
import GroupPreview from "./group-preview";

const GroupContainer = () => {
  const { data: groups, isLoading } = useGetGroups();
  const { data: user } = useCurrentUser();
  const isFaculty = user?.role === "faculty";
  return (
    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1">
      {isLoading
        ? "Loading..."
        : groups?.map((group) => (
            <GroupPreview key={group._id} group={group} isFaculty={isFaculty} />
          ))}
    </div>
  );
};

export default GroupContainer;
