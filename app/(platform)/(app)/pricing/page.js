import { checkSubscription } from "@/app/libs/subscription";
import PricingCard from "../../_components/PricingCard";

const Page = async () => {
  const isPro = await checkSubscription();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 mt-6 text-center max-w-5xl mx-auto">
          <div className="mx-auto sm:max-w-lg">
            <h1 className="text-4xl font-bold sm:text-5xl dark:text-white">
              Pricing
            </h1>
            <p className="mt-5 text-muted-foreground sm:text-md dark:text-gray-400">
              No matter your needs — just curious or crafting excuses like a pro
              — we’ve got the perfect plan for you.
            </p>
          </div>

          <PricingCard isPro={isPro} />
        </div>
      </div>
    </>
  );
};

export default Page;
