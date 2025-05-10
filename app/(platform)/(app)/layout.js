import { getApiLimitCount } from "@/lib/api-limit";
import { Sidebar } from "../_components/Sidebar";
import { checkSubscription } from "@/app/libs/subscription";

export default async function AppLayout({ children }) {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="flex h-screen">
      <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      <main className="flex-1 overflow-auto bg-background dark:bg-[#2C2C2C]">
        {children}
      </main>
    </div>
  );
}
