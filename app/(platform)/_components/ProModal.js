"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "../hooks/useProModal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import axios from "axios";
import { useState } from "react";

const tools = [
  {
    text: "Unlimited chats",
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
];

export default function ProModal() {
  const proModal = useProModal();

  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
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
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Excuse Mate
              <Badge
                variant="premium"
                className="uppercase text-sm py-1 dark:text-white"
              >
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            You have reached your free limit.
          </DialogDescription>
          <div className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((t) => (
              <Card
                key={t.text}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <span className="text-sm font-semibold">{t.text}</span>
                  <Check className="text-primary w-5 h-5" />
                </div>
              </Card>
            ))}
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            className="w-full"
            disabled={loading}
            onClick={() => {
              onSubscribe();
              proModal.onClose();
            }}
            variant="premium"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 " />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
