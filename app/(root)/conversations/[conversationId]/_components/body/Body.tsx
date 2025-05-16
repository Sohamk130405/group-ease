import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { Doc, Id } from "@/convex/_generated/dataModel";

interface BodyProps {
  messages: (Doc<"messages"> & {
    sender: Doc<"users"> | null;
  })[];

  currentUserId: Id<"users"> | undefined;
}

const Body = ({ messages, currentUserId }: BodyProps) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex overflow-y-scroll flex-col gap-2 p-3 no-scrollbar">
      {messages.map((message, i) => (
        <Message
          role={message.sender?.role}
          room={message.sender?.room}
          key={message._id}
          sender={message.sender}
          senderName={message.sender?.name}
          senderImage={message.sender?.image}
          content={message.text}
          fromCurrentUser={currentUserId === message.senderId}
          createdAt={message._creationTime}
          updatedAt={message.updatedAt}
          file={message.file}
          fileName={message.fileName}
          fileType={message.fileType}
          fileUrl={message.fileUrl}
          isCompact={i > 0 && messages[i - 1].senderId === message.senderId}
        />
      ))}
      <div ref={messageEndRef} /> {/* Add ref to the end of messages */}
    </div>
  );
};

export default Body;
