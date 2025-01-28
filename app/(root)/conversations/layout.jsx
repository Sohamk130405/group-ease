import ItemList from "@/components/ItemList/ItemList";
import { fetchNotifiedGroups } from "@/lib/actions/groups";
import GroupsContainer from "../_components/GroupsContainer";

const Layout = async ({ children }) => {
  return (
    <>
      <ItemList title={"Conversations"}>
        <GroupsContainer />
      </ItemList>
      {children}
    </>
  );
};

export default Layout;
