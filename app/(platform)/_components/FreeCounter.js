"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";
import React, { useEffect, useState } from "react";

export default function FreeCounter({ apiLimitCount, isPro = false }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (isPro) return null;

  const percentage = (apiLimitCount / MAX_FREE_COUNTS) * 100;

  return (
    <div className="px-2 pb-4">
      <Card className="bg-muted border dark:bg-[#1a1a1a] shadow-md rounded-2xl">
        <CardContent className="py-5 px-4">
          <div className="flex flex-col space-y-3 items-center text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Excuses Left
            </p>
            <Progress
              className="h-3 rounded-full bg-gray-300 dark:bg-gray-700"
              value={percentage}
            />
          </div>

          <p className="text-xs text-center text-gray-400 mt-2">
            Upgrade to Pro for unlimited excuses.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
