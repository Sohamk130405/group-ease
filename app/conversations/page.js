"use client";
import { useState } from "react";
import { cn } from "@/lib/utils"; // ShadCN utility for conditional classes
import { Button } from "@/components/ui/button";

export default function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState(null); // Tracks selected conversation

  const conversations = [
    { id: 1, title: "Conversation 1" },
    { id: 2, title: "Conversation 2" },
    { id: 3, title: "Conversation 3" },
  ];

  const messages = [
    { id: 1, content: "Hello! How are you?" },
    { id: 2, content: "I'm good, thanks! What about you?" },
    { id: 3, content: "Doing great! Let's catch up soon." },
  ];

  return (
    <div className="h-screen grid lg:grid-cols-[1fr_2fr] grid-cols-1">
      {/* Conversations List */}
      <div
        className={cn(
          "border-r border-gray-200 p-4 overflow-y-auto h-screen lg:h-auto",
          selectedConversation ? "hidden lg:block" : "block"
        )}
      >
        <h2 className="text-lg font-semibold mb-4">Conversations</h2>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={cn(
              "p-3 mb-2 rounded-lg cursor-pointer hover:bg-primary",
              selectedConversation === conv.id && "bg-primary text-white"
            )}
            onClick={() => setSelectedConversation(conv.id)}
          >
            {conv.title}
          </div>
        ))}
      </div>

      {/* Messages Screen */}
      <div
        className={cn(
          "p-4 overflow-y-auto h-screen lg:h-auto",
          !selectedConversation ? "hidden lg:block" : "block"
        )}
      >
        {selectedConversation ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Messages</h2>
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setSelectedConversation(null)}
              >
                Back
              </Button>
            </div>
            <div>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3 mb-2 rounded-lg bg-primary text-sm text-white w-fit"
                >
                  {msg.content}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500">
            Select a conversation to view messages
          </p>
        )}
      </div>
    </div>
  );
}
