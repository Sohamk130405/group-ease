import React from "react";
import Message from "./Message";
import { Doc, Id } from "@/convex/_generated/dataModel";

interface BodyProps {
  messages: (Doc<"messages"> & {
    sender: Doc<"users"> | null;
  })[];

  currentUserId: Id<"users"> | undefined;
}

const Body = ({ messages, currentUserId }: BodyProps) => {
  return (
    <div className="flex-1 flex overflow-y-scroll flex-col gap-2 p-3 no-scrollbar">
      {messages.map((message, i) => (
        <Message
          key={message._id}
          senderName={message.sender?.name}
          senderImage={message.sender?.image}
          content={message.text}
          fromCurrentUser={currentUserId === message.senderId}
          createdAt={message._creationTime}
          updatedAt={message.updatedAt}
          isCompact={i > 0 && messages[i - 1].senderId === message.senderId}
        />
      ))}
    </div>
  );
};

export default Body;
