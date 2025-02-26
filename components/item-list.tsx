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
  const { isActive, isCreateTab } = useConversation();
  return (
    <Card
      className={cn(
        "hidden w-full lg:flex-none lg:w-80 p-2 overflow-y-scroll no-scrollbar",
        {
          block: !isActive && !isCreateTab,
          "lg:block": isActive || isCreateTab,
        }
      )}
    >
      <div className="my-3 flex items-center justify-center">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {Action ? Action : null}
      </div>
      <div className="h-full w-full flex flex-col items-center justify-start gap-2  border-t pt-2">
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
