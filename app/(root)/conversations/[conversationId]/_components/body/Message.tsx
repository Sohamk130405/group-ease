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

interface MessageProps {
  senderName?: string;
  senderImage?: string;
  fromCurrentUser: boolean;
  content: string;
  createdAt: number;
  updatedAt: number;
  isCompact: boolean;
  status?: "sent" | "read";
}

const Message = ({
  senderName,
  senderImage,
  fromCurrentUser = false,
  content,
  createdAt,
  updatedAt,
  isCompact = false,
  status = "sent",
}: MessageProps) => {
  const isEdited = updatedAt > createdAt;

  return (
    <div
      className={cn("flex items-start gap-2 mb-1", {
        "justify-end": fromCurrentUser,
        "justify-start": !fromCurrentUser,
      })}
    >
      {!isCompact && !fromCurrentUser && (
        <Avatar className="w-6 h-6">
          <AvatarImage src={senderImage} />
          <AvatarFallback>{senderName?.[0] || "M"}</AvatarFallback>
        </Avatar>
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
          <span className="text-xs font-medium text-primary block mb-1">
            {senderName}
          </span>
        )}
        <p className="text-sm break-words whitespace-pre-wrap leading-5">
          {content}
        </p>
        <div className="flex items-center gap-1 mt-1 w-full">
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
