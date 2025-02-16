"use client";
import { useEffect, useState } from "react";
import { CreateGroupDialog } from "../features/group/components/create-group-modal";
const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), [setMounted]);
  if (!mounted) return null;
  return (
    <>
      <CreateGroupDialog />
    </>
  );
};

export default Modals;
