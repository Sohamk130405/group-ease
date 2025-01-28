import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const ChatInput = () => {
  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="flex gap-2 items-end w-full">
        <form className="w-full flex gap-2 items-end">
          <Textarea
            className="min-h-12 max-h-24"
            placeholder="Type a message..."
          />
        </form>
      </div>
    </Card>
  );
};

export default ChatInput;
