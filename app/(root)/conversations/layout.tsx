"use client";
import ItemList from "@/components/item-list";
import GroupContainer from "@/features/group/components/group-container";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ItemList title={"Conversations"}>
        <GroupContainer />
      </ItemList>
      {children}
    </>
  );
};

export default Layout;
