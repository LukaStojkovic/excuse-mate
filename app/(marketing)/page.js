import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function MarketingPage() {
  return (
    <div className="flex items-center justify-center flex-col  ">
      <div
        className={cn(
          `flex items-center justify-center flex-col`,
          headingFont.className
        )}
      >
        <div className="mb-6 flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white uppercase rounded-full shadow-md text-sm tracking-wide">
          <Medal className="w-5 h-5 mr-2 text-white" />
          No 1 excuse application
        </div>

        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 dark:text-[#E4E4E4]">
          Never Get Caught <br className="hidden md:block" />
          <span className="text-indigo-500">Off Guard Again</span>
        </h1>
        <div
          className="text-3xl md:text-6xl bg-gradient-to-r from-indigo-500 to-cyan-500
 text-white px-4 p-2 rounded-md pb-2 w-fit"
        >
          Excuse Mate
        </div>
      </div>
      <div
        className={cn(
          `text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto`,
          textFont.className
        )}
      >
        Create the perfect excuse on demand — in any tone, any time. AI-powered
        and ready when you are.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Excuse Mate for free</Link>
      </Button>
      <p className="text-xs mt-2 text-neutral-400">No credit card required.</p>
    </div>
  );
}
