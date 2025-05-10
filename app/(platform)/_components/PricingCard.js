"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import { useState } from "react";

const pricingItems = [
  {
    plan: "Free",
    tagline: "Great for testing the waters.",
    quota: 5,
    features: [
      {
        text: "5 excuses per day",
        footnote: "Limit resets each day.",
      },
      {
        text: "Access to basic excuse tone only",
      },
      {
        text: "Access to basic category only",
      },
      {
        text: "Faster generation speed",
        negative: true,
      },
      {
        text: "Full category selection",
        negative: true,
      },
    ],
  },
  {
    plan: "Pro",
    tagline: "Unlimited excuses, unlimited control.",
    quota: "Unlimited",
    features: [
      {
        text: "Unlimited excuses",
        footnote: "No daily limits or login resets.",
      },
      {
        text: "Access to all excuse tones",
      },
      {
        text: "Full category selection",
      },
      {
        text: "Faster generation speed",
      },
      {
        text: "Early access to new features",
      },
    ],
  },
];

export default function PricingCard({ isPro = false }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");

      window.location.href = res.data.url;
    } catch (error) {
      console.log("Error subscribing to plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
      <TooltipProvider>
        {pricingItems.map(({ plan, tagline, quota, features }) => {
          const price = plan === "Free" ? 0 : 20;

          return (
            <div
              key={plan}
              className={cn(
                "relative rounded-2xl bg-white shadow-lg border transition-colors dark:bg-[#1C1C1C] dark:border-[#333]",
                {
                  "border-2 border-blue-600 shadow-blue-200 dark:shadow-blue-600 dark:border-blue-500":
                    plan === "Pro",
                  "border border-gray-200 dark:border-[#333]": plan !== "Pro",
                }
              )}
            >
              {plan === "Pro" && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white dark:from-blue-500 dark:to-cyan-500">
                  Upgrade now
                </div>
              )}

              <div className="p-5">
                <h3 className="my-3 text-center font-display text-3xl font-bold dark:text-white">
                  {plan}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{tagline}</p>
                <p className="my-5 font-display text-6xl font-semibold dark:text-white">
                  ${price}
                </p>
                <p className="text-gray-500 dark:text-gray-400">per month</p>
              </div>

              <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50 dark:border-[#333] dark:bg-[#181818]">
                <div className="flex items-center space-x-1">
                  <p className="text-gray-600 dark:text-gray-300">
                    {quota.toLocaleString()} chats/day included
                  </p>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger className="cursor-default ml-1.5">
                      <HelpCircle className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    </TooltipTrigger>
                    <TooltipContent className="w-80 p-2 dark:bg-[#2f2f2f] dark:text-white">
                      How many chats you can start per day.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <ul className="my-10 space-y-5 px-8">
                {features.map(({ text, footnote, negative }) => (
                  <li key={text} className="flex space-x-5">
                    <div className="flex-shrink-0">
                      {negative ? (
                        <Minus className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                      ) : (
                        <Check className="h-6 w-6 text-blue-500" />
                      )}
                    </div>
                    {footnote ? (
                      <div className="flex items-center space-x-1">
                        <p
                          className={cn("text-gray-600 dark:text-gray-300", {
                            "text-gray-400 dark:text-gray-500": negative,
                          })}
                        >
                          {text}
                        </p>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger className="cursor-default ml-1.5">
                            <HelpCircle className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-2 dark:bg-[#2f2f2f] dark:text-white">
                            {footnote}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ) : (
                      <p
                        className={cn("text-gray-600 dark:text-gray-300", {
                          "text-gray-400 dark:text-gray-500": negative,
                        })}
                      >
                        {text}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 dark:border-[#333]" />

              <div className="p-5">
                <Button
                  className="w-full cursor-pointer"
                  onClick={handleClick}
                  disabled={loading}
                >
                  {isPro ? "Manage Subscription" : "Upgrade now"}
                  <ArrowRight className="h-5 w-5 ml-1.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
