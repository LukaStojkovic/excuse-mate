"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Settings, Zap } from "lucide-react";
import { useState } from "react";

export default function SubscriptionButton({ isPro = false }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const req = await axios.get("/api/stripe");

      window.location.href = req.data.url;
    } catch (err) {
      console.error("Error in SubscriptionButton:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={!isPro ? "premium" : "default"}
      disabled={loading}
      onClick={handleClick}
    >
      {!isPro ? (
        <Zap className="h-4 w-4 ml-2 " />
      ) : (
        <Settings className="h-4 w-4 ml-2 " />
      )}
      {isPro ? "Manage Subscription" : "Upgrade"}
    </Button>
  );
}
