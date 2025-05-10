import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
});

export function Logo() {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center justify-center gap-x-2 hidden md:flex">
        <Image src="/logo-blue.png" alt="Logo" height={30} width={30} />
        <p
          className={cn(
            "text-lg text-neutral-700 pt-1 dark:text-[#E4E4E4]",
            headingFont.className
          )}
        >
          Excuse Mate
        </p>
      </div>
    </Link>
  );
}
