"use client";

import { Sparkles, Star, Menu, Zap, Gem, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useClerk, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeButton } from "./ThemeButton";
import { useProModal } from "../hooks/useProModal";
import FreeCounter from "./FreeCounter";

export function Sidebar({ apiLimitCount = 0, isPro = false }) {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useClerk();
  const pathname = usePathname();
  const proModal = useProModal();

  const navItems = [
    { name: "Generate Excuse", icon: Sparkles, href: "/chat" },
    { name: "Recent Excuses", icon: Star, href: "/recent" },
    { name: "Pricing", icon: Gem, href: "/pricing" },
    { name: "Billing", icon: CreditCard, href: "/settings" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`h-screen bg-background border-r shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      } flex flex-col overflow-hidden dark:bg-[#242424]`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h1
          className={`text-xl font-bold transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          } whitespace-nowrap overflow-hidden`}
        >
          <Logo />
        </h1>
        <Button
          variant="ghost"
          className="cursor-pointer"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className={cn(
              `flex items-center gap-4 p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors`,
              pathname === item.href ? "bg-muted text-foreground" : ""
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span
              className={`transition-all duration-200 ${
                isOpen ? "opacity-100" : "opacity-0"
              } whitespace-nowrap overflow-hidden`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
      {isOpen && (
        <div className="mt-4">
          <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
        </div>
      )}
      <div className="flex flex-col justify-between mt-auto p-4 border-t bg-muted space-y-4">
        {!isPro && (
          <div className="bg-primary dark:bg-gradient-to-r dark:from-indigo-500 dark:to-cyan-500 text-white rounded-lg p-2 text-center cursor-pointer">
            {isOpen ? (
              <button
                onClick={proModal.onOpen}
                className="text-sm font-semibold cursor-pointer"
              >
                Upgrade to <span className="text-yellow-300">Pro</span> for more
                features!
              </button>
            ) : (
              <button onClick={proModal.onOpen} className="flex items-center ">
                <Zap className="h-4 w-4 text-yellow-300" />
              </button>
            )}
          </div>
        )}

        <ThemeButton />

        <div className="flex items-center gap-2">
          <UserButton />
          {isOpen && (
            <span className="text-neutral-800 dark:text-neutral-200 font-medium">
              {user?.fullName}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
