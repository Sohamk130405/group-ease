import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import FilePreview from "@/components/file-preview"; // Import the new component
import { Doc } from "@convex-dev/auth/server";
import ProfileDialog from "@/components/profile-dialog"; // add this import
import { useState } from "react"; // add this import

interface MessageProps {
  senderName?: string;
  senderImage?: string;
  fromCurrentUser: boolean;
  content: string;
  createdAt: number;
  updatedAt?: number;
  isCompact: boolean;
  status?: "sent" | "read";
  file?: string;
  fileName?: string;
  fileType?: string;
  fileUrl?: string;
  sender?: Doc<"users"> | undefined | null;
  room?: string;
  role?: "student" | "faculty";
}

const Message = ({
  sender,
  room,
  role,
  senderName,
  senderImage,
  fromCurrentUser = false,
  content,
  createdAt,
  updatedAt = 0,
  isCompact = false,
  status = "sent",
  file,
  fileName = "",
  fileType = "",
  fileUrl = "",
}: MessageProps) => {
  const isEdited = updatedAt > createdAt;
  const [profileOpen, setProfileOpen] = useState(false); // add dialog state

  return (
    <div
      className={cn("flex items-start gap-2 mb-1", {
        "justify-end": fromCurrentUser,
        "justify-start": !fromCurrentUser,
      })}
    >
      {!isCompact && !fromCurrentUser && (
        <>
          <button onClick={() => setProfileOpen(true)}>
            <Avatar className="w-6 h-6">
              <AvatarImage src={senderImage} />
              <AvatarFallback>{senderName?.[0] || "M"}</AvatarFallback>
            </Avatar>
          </button>
          <ProfileDialog
            open={profileOpen}
            onOpenChange={setProfileOpen}
            name={sender?.name || senderName || ""}
            image={sender?.image || senderImage}
            email={sender?.email}
            phone={sender?.phone}
            room={room}
            role={role}
          />
        </>
      )}
      <div
        className={cn(
          "max-w-[70%] px-3 py-2 rounded-lg relative",
          {
            "bg-primary text-primary-foreground": fromCurrentUser,
            "bg-secondary text-secondary-foreground": !fromCurrentUser,
          },
          isCompact ? "ml-8" : ""
        )}
      >
        {!fromCurrentUser && !isCompact && (
          <span className="text-xs text-primary font-semibold block mb-1 bg-opacity-10 px-2 py-1 rounded-lg">
            {senderName}
          </span>
        )}
        {/* Render FilePreview if file is present */}
        {file && fileType && (
          <FilePreview
            fileUrl={fileUrl}
            fileName={fileName}
            fileType={fileType}
          />
        )}
        <p
          className={cn("text-sm break-words  whitespace-pre-wrap leading-5", {
            "text-right": fromCurrentUser,
            "text-left": !fromCurrentUser,
          })}
        >
          {content}
        </p>

        <div className="flex items-center justify-between gap-1 mt-1 w-full">
          {isEdited && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="-mt-2">
                  <span className="text-[10px] opacity-70 ml-1">(edited)</span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">
                    Edited at {format(updatedAt, "HH:mm, MMM d, yyyy")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <span className="text-[10px] opacity-70 leading-none">
            {format(createdAt, "HH:mm")}
          </span>
          {fromCurrentUser &&
            (status === "read" ? (
              <CheckCheck className="size-3 text-primary-foreground" />
            ) : (
              <Check className="size-3 opacity-70" />
            ))}
        </div>

        {!isCompact && (
          <div
            className={cn("absolute w-0 h-0 border-8 border-solid top-0", {
              "border-primary border-r-transparent border-b-transparent -right-2":
                fromCurrentUser,
              "border-secondary border-l-transparent border-b-transparent -left-2":
                !fromCurrentUser,
            })}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
