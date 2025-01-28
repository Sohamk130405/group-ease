import ConversationFallback from "@/components/conversation/ConversationFallback";
import ItemList from "@/components/ItemList/ItemList";
import React from "react";
import GroupSelection from "./_components/GroupSelection";

const Groups = () => {
  return (
    <>
      <ItemList title={"Groups"}>
        <GroupSelection />
      </ItemList>
      <ConversationFallback />
    </>
  );
};

export default Groups;
