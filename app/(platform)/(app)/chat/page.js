import { checkSubscription } from "@/app/libs/subscription";
import ChatInput from "../../_components/ChatInput";
import OptionsPicker from "../../_components/OptionsPicker";

export default async function GenerateExcusePage() {
  const isPro = await checkSubscription();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
      <div className="flex flex-col items-center justify-center flex-1  rounded-2xl  p-8 w-full">
        <div className="flex flex-col text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#E4E4E4] mb-2 ">
            Welcome to Excuse Mate
          </h1>
          <p className="text-sm text-muted-foreground">
            Start by typing your reason for an excuse
          </p>
        </div>

        <OptionsPicker isPro={isPro} />
        <ChatInput />
      </div>
    </div>
  );
}
