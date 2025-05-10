"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ChatProvider } from "./contexts/ChatContext";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { dark } from "@clerk/themes";

export default function PlatformLayout({ children }) {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const actualTheme = localStorage.getItem("theme");
    setTheme(actualTheme || "system");
  }, [setTheme]);

  return (
    <ClerkProvider
      appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
    >
      <ChatProvider>{children}</ChatProvider>
    </ClerkProvider>
  );
}
