import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

export const useConversation = () => {
  const params = useParams();
  const pathname = usePathname();
  const isCreateTab = useMemo(() => pathname.includes("create"), [pathname]);
  const conversationId = useMemo(
    () => params?.conversationId || params?.assignmentId || "",
    [params?.conversationId, params?.assignmentId]
  );
  const isActive = useMemo(() => !!conversationId, [conversationId]);

  return { conversationId, isActive, isCreateTab };
};
