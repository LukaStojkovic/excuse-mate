"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";
import { useChatContext } from "../contexts/ChatContext";
import { ProSelectItem } from "./ProSelectItem";

export default function OptionsPicker({ isPro = false }) {
  const { tone, setTone, category, setCategory } = useChatContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <TooltipProvider>
        <div>
          <label className="block text-sm mb-1 font-medium">Tone</label>
          <Select onValueChange={setTone} value={tone}>
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="funny">Funny</SelectItem>
              <ProSelectItem isPro={isPro} value="serious">
                Serious
              </ProSelectItem>
              <ProSelectItem isPro={isPro} value="sarcastic">
                Sarcastic
              </ProSelectItem>
              <ProSelectItem isPro={isPro} value="professional">
                Professional
              </ProSelectItem>
              <ProSelectItem isPro={isPro} value="angry">
                Angry
              </ProSelectItem>
              <ProSelectItem isPro={isPro} value="romantic">
                Romantic
              </ProSelectItem>
              <ProSelectItem isPro={isPro} value="overdramatic">
                Overdramatic
              </ProSelectItem>
              <ProSelectItem isPro={isPro} value="inspirational">
                Inspirational
              </ProSelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Category</label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="event">Missed Event</SelectItem>
              <ProSelectItem isPro={isPro} value="work">
                Work
              </ProSelectItem>
              <ProSelectItem isPro={isPro} value="school">
                School
              </ProSelectItem>
              <ProSelectItem isPro={isPro} value="relationship">
                Relationship
              </ProSelectItem>

              <ProSelectItem isPro={isPro} value="personal issues">
                Personal Issues
              </ProSelectItem>
              <ProSelectItem isPro={isPro} value="family">
                Family
              </ProSelectItem>
            </SelectContent>
          </Select>
        </div>
      </TooltipProvider>
    </div>
  );
}
