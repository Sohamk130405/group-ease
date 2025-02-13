import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Group Ease",
  description: "Dynamic Communication Platform For Students And Fuculty",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <ConvexAuthNextjsServerProvider>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster />
            </ThemeProvider>
          </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
      </body>
    </html>
  );
}
