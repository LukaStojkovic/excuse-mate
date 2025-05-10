import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-cyan-100 to-white dark:from-gray-900 dark:to-gray-800 px-6 text-center">
      <Sparkles className="w-12 h-12 text-cyan-500 mb-4 animate-bounce" />
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
        Oops! Page not found.
      </h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Even we couldn’t come up with an excuse for this one... But don’t worry,
        you can still go back and generate the best excuses ever.
      </p>
      <Link
        href="/chat"
        className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-full transition duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
}
