"use client";
import ItemList from "@/components/item-list";
import { ReactNode } from "react";
import AssignmentsContainer from "@/features/assignments/components/AssignmentsContainer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ItemList title={"Assignmments"}>
        <AssignmentsContainer />
      </ItemList>
      {children}
    </>
  );
};

export default Layout;
