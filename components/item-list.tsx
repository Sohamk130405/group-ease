"use client";

import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { ReactNode } from "react";
import { useConversation } from "@/hooks/use-conversation";

interface ItemListProps {
  children: ReactNode;
  title: string;
  action?: string;
}

const ItemList = ({ children, title, action: Action }: ItemListProps) => {
  const { isActive } = useConversation();
  return (
    <Card
      className={cn(
        "hidden w-full h-full lg:flex-none lg:w-80 p-2 overflow-y-scroll no-scrollbar",
        {
          block: !isActive,
          "lg:block": isActive,
        }
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {Action ? Action : null}
      </div>
      <div className="h-full w-full flex flex-col items-center justify-start gap-2">
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
