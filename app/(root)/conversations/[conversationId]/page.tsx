"use client";
import ChatInput from "./_components/input/ChatInput";
import Body from "./_components/body/Body";
import Header from "./_components/Header";
import ConversationContainer from "@/features/conversation/components/conversation-container";
import { useGetGroup } from "@/features/group/api/use-get-group";
import { Id } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/features/user/api/use-current-user";
import { useParams } from "next/navigation";
import { useGetMessages } from "@/features/message/api/use-get-messages";

const ParticularConversation = () => {
  const { conversationId } = useParams();
  const { data: group, isLoading: isGroupLoading } = useGetGroup({
    id: conversationId as Id<"groups">,
  });
  const { data: user } = useCurrentUser();
  const { data: messages } = useGetMessages({
    groupId: conversationId as Id<"groups">,
  });

  const isOwner = group?.createdBy === user?._id;
  const name = isOwner
    ? `${group?.year} Year ${group?.branch} ${group?.div}`
    : `${group?.subject} ${group?.type}`;

  return (
    <ConversationContainer>
      {!isGroupLoading ? (
        <>
          <Header name={name} faculty={group?.user} />
          <Body messages={messages || []} currentUserId={user?._id} />
          <ChatInput
            groupId={conversationId as Id<"groups">}
            senderId={user?._id as Id<"users">}
          />
        </>
      ) : (
        "Loading"
      )}
    </ConversationContainer>
  );
};

export default ParticularConversation;
