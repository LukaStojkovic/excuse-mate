"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import React from "react";
import { useChatContext } from "../contexts/ChatContext";
import { Zap } from "lucide-react";

export default function OptionsPicker({ isPro = false }) {
  const { tone, setTone, category, setCategory } = useChatContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <TooltipProvider>
        <div>
          <label className="block text-sm mb-1 font-medium">Tone</label>
          <Select onValueChange={(tone) => setTone(tone)} value={tone}>
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="funny">Funny</SelectItem>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <SelectItem disabled={!isPro} value="serious">
                      Serious {!isPro && <Zap />}
                    </SelectItem>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade to pro plan to use this feature.</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <SelectItem disabled={!isPro} value="sarcastic">
                      Sarcastic {!isPro && <Zap />}
                    </SelectItem>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade to pro plan to use this feature.</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <SelectItem disabled={!isPro} value="professional">
                      Professional {!isPro && <Zap />}
                    </SelectItem>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade to pro plan to use this feature.</p>
                </TooltipContent>
              </Tooltip>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Category</label>
          <Select
            onValueChange={(category) => setCategory(category)}
            value={category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="event">Missed Event</SelectItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <SelectItem disabled={!isPro} value="work">
                      Work {!isPro && <Zap />}
                    </SelectItem>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade to pro plan to use this feature.</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <SelectItem disabled={!isPro} value="school">
                      School {!isPro && <Zap />}
                    </SelectItem>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade to pro plan to use this feature.</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <SelectItem disabled={!isPro} value="relationship">
                      Relationship {!isPro && <Zap />}
                    </SelectItem>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade to pro plan to use this feature.</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <SelectItem disabled={!isPro} value="other">
                      Other {!isPro && <Zap />}
                    </SelectItem>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade to pro plan to use this feature.</p>
                </TooltipContent>
              </Tooltip>
            </SelectContent>
          </Select>
        </div>
      </TooltipProvider>
    </div>
  );
}
