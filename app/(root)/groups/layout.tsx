"use client";
import ItemList from "@/components/item-list";
import GroupSearchContainer from "@/features/group/components/group-search-container";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ItemList title={"Groups"}>
        <GroupSearchContainer />
      </ItemList>
      {children}
    </>
  );
};

export default Layout;
