"use client";

import Hint from "@/components/hint";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useConversation } from "@/hooks/use-conversation";
import { useNavigation } from "@/hooks/use-navigation";
import { useAuthActions } from "@convex-dev/auth/react";

import { LogOut } from "lucide-react";
import Link from "next/link";

const MobileNav = () => {
  const paths = useNavigation();
  const { isActive } = useConversation();
  const { signOut } = useAuthActions();
  if (isActive) return null;
  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => (
            <li key={id} className="relative">
              <Hint label={path.name}>
                <Button
                  size="icon"
                  variant={path.active ? "default" : "outline"}
                  asChild
                >
                  <Link href={path.href}>{<path.icon />}</Link>
                </Button>
              </Hint>
            </li>
          ))}
          <li>
            <Hint label="Change Theme">
              <ThemeToggle />
            </Hint>
          </li>
          <li>
            <Hint label="Logout">
              <Button size="icon" variant="outline" onClick={signOut}>
                <LogOut />
              </Button>
            </Hint>
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
