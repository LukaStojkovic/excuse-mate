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

const Page = () => {
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

  const pricingItems = [
    {
      plan: "Free",
      tagline: "Perfect for casual chatting.",
      quota: 5,
      features: [
        {
          text: "5 chats per day",
          footnote: "Limit resets every 24 hours.",
        },
        {
          text: "Access to basic chat models",
        },
        {
          text: "Standard response speed",
        },
        {
          text: "Priority customer support",
          negative: true,
        },
        {
          text: "Advanced chat features",
          negative: true,
        },
      ],
    },
    {
      plan: "Pro",
      tagline: "For power users and businesses.",
      quota: "Unlimited",
      features: [
        {
          text: "Unlimited chats",
          footnote: "Enjoy unrestricted chatting anytime.",
        },
        {
          text: "Access to all chat models",
        },
        {
          text: "Faster response speed",
        },
        {
          text: "Priority customer support",
        },
        {
          text: "Advanced chat features",
        },
      ],
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 mt-12 text-center max-w-5xl mx-auto">
          <div className="mx-auto sm:max-w-lg">
            <h1 className="text-4xl font-bold sm:text-5xl dark:text-white">
              Pricing
            </h1>
            <p className="mt-5 text-muted-foreground sm:text-lg dark:text-gray-400">
              Whether you&apos;re just trying out our service or need more,
              we&apos;ve got you covered.
            </p>
          </div>

          <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
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
                        "border border-gray-200 dark:border-[#333]":
                          plan !== "Pro",
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
                      <p className="text-gray-500 dark:text-gray-400">
                        {tagline}
                      </p>
                      <p className="my-5 font-display text-6xl font-semibold dark:text-white">
                        ${price}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        per month
                      </p>
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
                                className={cn(
                                  "text-gray-600 dark:text-gray-300",
                                  {
                                    "text-gray-400 dark:text-gray-500":
                                      negative,
                                  }
                                )}
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
                              className={cn(
                                "text-gray-600 dark:text-gray-300",
                                {
                                  "text-gray-400 dark:text-gray-500": negative,
                                }
                              )}
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
                        Upgrade now
                        <ArrowRight className="h-5 w-5 ml-1.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
