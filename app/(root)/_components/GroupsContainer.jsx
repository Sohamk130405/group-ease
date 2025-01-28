"use client";
import GroupPreview from "./GroupPreview";
import { fetchNotifiedGroups } from "@/lib/actions/groups";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const GroupsContainer = () => {
  const { data: session } = useSession();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchGroups = async () => {
      const { data } = await fetchNotifiedGroups(session.user.id);
      setGroups(data);
      setLoading(false);
    };
    session && fetchGroups();
  }, [session, setGroups]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {loading
          ? "Loading..."
          : groups.map((group) => (
              <GroupPreview key={group._id} group={group} className={"w-full"} />
            ))}
      </div>
    </div>
  );
};

export default GroupsContainer;
