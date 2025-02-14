import { ReactNode } from "react";
import MobileNav from "./nav/mobile-nav";
import DesktopNav from "./nav/desktop-nav";

const SidebarWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full p-4 flex flex-col lg:flex-row gap-4">
      <MobileNav />
      <DesktopNav />
      <main className="h-[calc(100%-80px)] lg:h-full w-full flex gap-4">
        {children}
      </main>
    </div>
  );
};

export default SidebarWrapper;
