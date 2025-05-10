import { checkSubscription } from "@/app/libs/subscription";
import SubscriptionButton from "../../_components/SubscriptionButton";

export default async function SettingsPage() {
  const isPro = await checkSubscription();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Billing</h1>

      <div className="bg-white dark:bg-[#242424] shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Subscription Plan</h2>
          <p className="text-sm text-zinc-500">
            You are currently on the{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {isPro ? "Pro" : "Free"}
            </span>{" "}
            plan.
          </p>
        </div>

        <div>
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
    </div>
  );
}
