import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useCreateGroupModal = () => {
  return useAtom(modalState);
};
