import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import { useCreateMessage } from "@/features/message/api/use-create-message";
import { FormEvent, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, XCircle, FileText } from "lucide-react";
import Image from "next/image";

interface ChatInputProps {
  groupId: Id<"groups">;
  senderId: Id<"users">;
}

const ChatInput = ({ groupId, senderId }: ChatInputProps) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { mutate: sendMessage, isPending } = useCreateMessage();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    // Handle file upload logic here
    sendMessage({ text, groupId, senderId });

    setText("");
    setFile(null);
  };

  // Check if the file is an image
  const isImage = (file: File) => file.type.startsWith("image/");

  return (
    <Card className="w-full p-4 relative border-none">
      <div className="flex flex-col gap-3 w-full">
        {/* File Preview */}
        {file && (
          <div className="relative w-64 h-40 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-md">
            {isImage(file) ? (
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="object-contain w-full h-full"
                height={720}
                width={1200}
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <FileText className="w-10 h-10 text-gray-600" />
                <span className="text-sm text-gray-600">
                  {file.name.split(".").pop()?.toUpperCase()}
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 hover:bg-transparent"
              onClick={removeFile}
            >
              <XCircle className="w-6 h-6 text-red-600" />
            </Button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full flex gap-2 items-center"
        >
          <Textarea
            className="min-h-12 max-h-24 rounded-3xl"
            placeholder="Type a message..."
            disabled={isPending}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />

          {/* Hidden File Input */}
          <input
            type="file"
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />

          {/* File Upload Button */}
          {false && (
            <Button
              className="rounded-full p-4 "
              size={"icon"}
              type="button"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <Paperclip />
            </Button>
          )}
          <Button className="rounded-full p-4" size={"icon"} type="submit">
            <Send />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatInput;
