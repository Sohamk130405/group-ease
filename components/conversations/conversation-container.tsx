import { ReactNode } from "react";
import { Card } from "../ui/card";

const ConversationContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="h-[calc(100svh-32px)] lg:h-full w-full p-2 flex flex-col gap-2">
      {children}
    </Card>
  );
};

export default ConversationContainer;
