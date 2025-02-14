import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MessageProps {
  senderName: string;
  senderImage: string;
  fromCurrentUser: boolean;
  content: string;
  createdAt: string;
}

const Message = ({
  senderName,
  senderImage,
  fromCurrentUser = false,
  content,
  createdAt,
}: MessageProps) => {
  return (
    <div
      className={cn("flex items-end", {
        "justify-end": fromCurrentUser,
        "order-2 items-start": !fromCurrentUser,
      })}
    >
      <div
        className={cn("rounded-lg px-4 py-2 max-w-[78%]", {
          "bg-primary text-primary-foreground": fromCurrentUser,
          "bg-secondary text-secondary-foreground": !fromCurrentUser,
        })}
      >
        {content && (
          <p className="text-wrap break-words whitespace-pre-wrap">{content}</p>
        )}
        <p
          className={cn("text-xs flex w-full my-1", {
            "text-primary-foreground justify-end": fromCurrentUser,
            "text-secondary-foreground justify-start": !fromCurrentUser,
          })}
        >
          {createdAt}
        </p>
      </div>
      <Avatar
        className={cn("size-8", {
          "order-2": fromCurrentUser,
          "order-1": !fromCurrentUser,
        })}
      >
        <AvatarImage src={senderImage} />
        <AvatarFallback>{senderName[0]}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Message;
