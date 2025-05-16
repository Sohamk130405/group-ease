"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, Send } from "lucide-react";
import { getGeminiResponse } from "@/lib/gemini";

const ChatBot = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuerySubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse(""); // Clear previous response
    try {
      // Gemini SDK integration
      const geminiResponse = await getGeminiResponse(query);

      setResponse(geminiResponse || "No response received.");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setResponse("Error processing your query. : " + error.message);
    } finally {
      setLoading(false);
      setQuery(""); // Clear input field after submission
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BotMessageSquare className="w-5 h-5" />
            Chat Bot
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 min-h-[300px]">
          <div className="p-4 rounded-lg flex items-center gap-2 w-fit border">
            <BotMessageSquare />
            <p className="text-sm">Ask me anything!</p>
          </div>
          {loading ? (
            <div className="mt-2 p-2  rounded-lg shadow-sm">
              <p className="text-sm">Processing your query...</p>
            </div>
          ) : response ? (
            <div className="mt-2 p-2  rounded-lg shadow-sm overflow-y-auto max-h-[300px]">
              <p className="text-sm">{response}</p>
            </div>
          ) : null}

          <div className="flex items-center gap-2 mt-auto">
            <Input
              placeholder="Type your question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleQuerySubmit} disabled={loading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBot;
