import ItemList from "@/components/item-list";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ItemList title={"Conversations"}>
        <h1>Conversations</h1>
      </ItemList>
      {children}
    </>
  );
};

export default Layout;
