"use client";

import Hint from "@/components/hint";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ChatBot from "@/components/chat-bot";
import { useCreateGroupModal } from "@/features/group/store/use-create-group-modal";
import { useCurrentUser } from "@/features/user/api/use-current-user";
import { useNavigation } from "@/hooks/use-navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { BotMessageSquare, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DesktopNav = () => {
  const paths = useNavigation();
  const { signOut } = useAuthActions();
  const [open, setOpen] = useCreateGroupModal();
  const { data } = useCurrentUser();
  const isFaculty = data?.role === "faculty";
  const [isChatBotOpen, setChatBotOpen] = useState(false);

  return (
    <>
      <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
        <nav>
          <ul className="flex flex-col items-center gap-4">
            {paths.map((path, id) => {
              if (path.name === "Groups" && !isFaculty) return;
              return (
                <li key={id} className="relative">
                  <Hint label={path.name} side="right">
                    <Button
                      size="icon"
                      variant={path.active ? "default" : "outline"}
                      asChild
                    >
                      <Link href={path.href}>{<path.icon />}</Link>
                    </Button>
                  </Hint>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex flex-col items-center gap-4">
          {data && data.role === "faculty" && (
            <Hint label="Create new group">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setOpen(!open)}
              >
                <Plus />
              </Button>
            </Hint>
          )}

          <Hint label="Chat Bot">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setChatBotOpen(true)}
            >
              <BotMessageSquare />
            </Button>
          </Hint>

          <ThemeToggle />
          <Hint label="Logout" side="right">
            <Button size="icon" variant="outline" onClick={signOut}>
              <LogOut />
            </Button>
          </Hint>
        </div>
      </Card>
      <ChatBot isOpen={isChatBotOpen} onClose={() => setChatBotOpen(false)} />
    </>
  );
};

export default DesktopNav;
