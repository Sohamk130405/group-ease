import React from "react";
import Message from "./Message";

const Body = () => {
  const messages = [
    {
      senderName: "John Doe",
      senderImage: "https://randomuser.me/api/portraits",
      content: "Hello, how are you?",
      fromCurrentUser: true,
      createdAt: "2021-08-01 12:00 AM",
    },
    {
      senderName: "Morris Chad",
      senderImage: "https://randomuser.me/api/portraits",
      content: "I am fine, thank you.",
      fromCurrentUser: false,
      createdAt: "2021-08-01 12:00 AM",
    },
  ];
  return (
    <div className="flex-1 flex overflow-y-scroll flex-col gap-2 p-3 no-scrollbar">
      {messages.map(
        (
          { senderName, senderImage, fromCurrentUser, content, createdAt },
          index
        ) => (
          <Message
            key={index}
            senderName={senderName}
            senderImage={senderImage}
            content={content}
            fromCurrentUser={fromCurrentUser}
            createdAt={createdAt}
          />
        )
      )}
    </div>
  );
};

export default Body;
