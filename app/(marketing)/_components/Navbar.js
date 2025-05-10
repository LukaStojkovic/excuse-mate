import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export async function Navbar() {
  const user = await currentUser();

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white dark:bg-[#242424] flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          {!user?.id ? (
            <>
              <Button size="sm" variant="outline" asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Get Excuse Mate for free</Link>
              </Button>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link href="/chat">Make an Excuse</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
