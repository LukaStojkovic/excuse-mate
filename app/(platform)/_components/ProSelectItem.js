import { SelectItem } from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Zap } from "lucide-react";
import React from "react";

export function ProSelectItem({ value, children, isPro }) {
  const content = (
    <SelectItem disabled={!isPro} value={value}>
      {children} {!isPro && <Zap className="ml-1 inline h-4 w-4" />}
    </SelectItem>
  );

  if (isPro) return content;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>{content}</div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Upgrade to pro plan to use this feature.</p>
      </TooltipContent>
    </Tooltip>
  );
}
