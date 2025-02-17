import { Card } from "../ui/card";

const ConversationFallback = () => {
  return (
    <Card className="hidden lg:flex h-full w-full p-2 items-center justify-center bg-secondary text-secondary-foreground">
      Select or search a group for conversation to get started!
    </Card>
  );
};

export default ConversationFallback;
